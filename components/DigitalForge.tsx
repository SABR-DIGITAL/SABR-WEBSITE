
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Page } from '../App';
import { motion, useScroll, useTransform } from 'framer-motion';

interface DigitalForgeProps { navigateTo: (page: Page) => void; }

/* ────────────────────────────────────────────────────────────────────────────
 * CRAFTED. NOT COMPILED.
 *
 * The section is a scroll-driven camera pull-back, and the scale of it is the
 * whole idea: you arrive skimming the cloud tops of a blue world with oceans and
 * city lights, and by the time you leave you are far enough out to hold twenty
 * planets, their moons, their rings and the galactic plane behind them in one
 * frame. The camera retreats geometrically, so every stretch of scroll roughly
 * doubles what you can see.
 *
 * Nothing here follows the mouse. Scroll position is the only input, and it is
 * damped per frame so wheel notches and momentum never show up as judder.
 * ──────────────────────────────────────────────────────────────────────────── */

// Shared GLSL. A cheap hash (no sin) keeps three octaves of gradient noise
// affordable even when a planet is filling the whole screen.
const NOISE_GLSL = `
  vec3 hash33(vec3 p) {
    p = fract(p * vec3(0.1031, 0.1030, 0.0973));
    p += dot(p, p.yxz + 33.33);
    return fract((p.xxy + p.yxx) * p.zyx) * 2.0 - 1.0;
  }
  float gnoise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    vec3 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(dot(hash33(i + vec3(0.0, 0.0, 0.0)), f - vec3(0.0, 0.0, 0.0)),
              dot(hash33(i + vec3(1.0, 0.0, 0.0)), f - vec3(1.0, 0.0, 0.0)), u.x),
          mix(dot(hash33(i + vec3(0.0, 1.0, 0.0)), f - vec3(0.0, 1.0, 0.0)),
              dot(hash33(i + vec3(1.0, 1.0, 0.0)), f - vec3(1.0, 1.0, 0.0)), u.x), u.y),
      mix(mix(dot(hash33(i + vec3(0.0, 0.0, 1.0)), f - vec3(0.0, 0.0, 1.0)),
              dot(hash33(i + vec3(1.0, 0.0, 1.0)), f - vec3(1.0, 0.0, 1.0)), u.x),
          mix(dot(hash33(i + vec3(0.0, 1.0, 1.0)), f - vec3(0.0, 1.0, 1.0)),
              dot(hash33(i + vec3(1.0, 1.0, 1.0)), f - vec3(1.0, 1.0, 1.0)), u.x), u.y), u.z);
  }
  float fbm3(vec3 p) {
    float a = 0.5;
    float s = 0.0;
    // Three octaves, not four. The fourth carried a sixteenth of the amplitude
    // at eight times the frequency, which on any real screen is sub-pixel — it
    // cost a quarter of the noise budget and all it contributed was aliasing
    // that crawled as the camera moved.
    for (int i = 0; i < 3; i++) { s += a * gnoise(p); p *= 2.03; a *= 0.5; }
    return s;
  }
`;

// Every body uses the same vertex shader: object-space position for the surface
// noise, world normal for sunlight, view-space normal/position for the limb.
const BODY_VERT = `
  varying vec3 vObj;
  varying vec3 vWN;
  varying vec3 vVN;
  varying vec3 vVP;
  void main() {
    vObj = position;
    vWN = normalize(mat3(modelMatrix) * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vVP = mv.xyz;
    vVN = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * mv;
  }
`;

const SURFACE_FRAG = `
  uniform float uTime;
  uniform float uSeed;
  uniform float uBands;
  uniform float uStorm;
  uniform float uSea;
  uniform vec3 uDeep;
  uniform vec3 uMid;
  uniform vec3 uHot;
  uniform vec3 uAtmo;
  uniform vec3 uNight;
  uniform vec3 uLight;
  varying vec3 vObj;
  varying vec3 vWN;
  varying vec3 vVN;
  varying vec3 vVP;
  ${NOISE_GLSL}
  void main() {
    vec3 n = normalize(vObj);
    vec3 sp = n * 2.4 + vec3(uSeed * 7.3);

    // Squashing the noise along Y smears it into latitude belts, which is what
    // separates a gas giant from a rocky world. The two fields used to be
    // evaluated separately and then mixed, which meant every pixel of every
    // planet paid for both. Blending the sample domain instead of the two
    // results gives the same look from a single noise call — and this shader
    // covers the whole screen when the home world fills the frame, so it was
    // comfortably the most expensive thing on the page.
    float bandMix = clamp(uBands * 2.2, 0.0, 1.0);
    // Named "iso", not "flat" — flat is a reserved interpolation qualifier.
    float iso = mix(1.9, 1.0, bandMix);
    vec3 bp = vec3(sp.x * iso, sp.y * mix(1.9, 1.0 + uBands * 9.0, bandMix), sp.z * iso);
    float h = fbm3(bp + vec3(uTime * 0.03 * bandMix, 0.0, uTime * 0.012 * (1.0 - bandMix)));

    // Two ways to paint the same height field. A gas giant wants everything to
    // bleed together; a world with oceans wants a hard shoreline, which is what
    // makes it read as continents rather than as marbling.
    vec3 blended = mix(uDeep, uMid, smoothstep(-0.32, 0.30, h));
    blended = mix(blended, uHot, smoothstep(0.20, 0.65, h) * 0.9);

    vec3 ocean = mix(uDeep * 0.72, uDeep, smoothstep(-0.55, 0.02, h));
    vec3 ground = mix(uMid, uHot, smoothstep(0.05, 0.42, h));
    vec3 coasted = mix(ocean, ground, smoothstep(0.006, 0.05, h));

    vec3 col = mix(blended, coasted, uSea);

    // One great storm, drifting slowly around the equator.
    float ang = atan(n.z, n.x) + uTime * 0.05;
    float sd = length(vec2(cos(ang) - 0.62, n.y * 2.4 - 0.3));
    col = mix(col, uHot, smoothstep(0.6, 0.0, sd) * uStorm * 0.8);

    // Sunlight, with a soft terminator rather than a hard edge.
    float lam = dot(normalize(vWN), normalize(uLight));
    float day = smoothstep(-0.22, 0.45, lam);
    vec3 lit = col * (0.08 + day * 1.5);

    // Night side: something is living down there. Sparse and warm on a world
    // with cities, broad and cold on everything else — one noise field either
    // way, read at a different scale and threshold.
    float night = 1.0 - day;
    float lampNoise = fbm3(sp * mix(5.5, 7.5, uSea));
    float lamps = mix(
      smoothstep(0.55, 0.95, lampNoise),
      smoothstep(0.34, 0.80, lampNoise) * smoothstep(0.02, 0.12, h),
      uSea
    );
    lit += uNight * lamps * night * mix(0.6, 1.5, uSea);

    // Limb: looking through the most atmosphere at the edge of the disc.
    float fres = pow(1.0 - clamp(dot(normalize(vVN), normalize(-vVP)), 0.0, 1.0), 2.4);
    lit += uAtmo * fres * (0.24 + day * 1.3);

    gl_FragColor = vec4(lit, 1.0);
  }
`;

const ATMO_FRAG = `
  uniform vec3 uAtmo;
  uniform vec3 uLight;
  varying vec3 vWN;
  varying vec3 vVN;
  varying vec3 vVP;
  void main() {
    float fres = pow(1.0 - clamp(dot(normalize(vVN), normalize(-vVP)), 0.0, 1.0), 3.1);
    float day = smoothstep(-0.35, 0.55, dot(normalize(vWN), normalize(uLight)));
    gl_FragColor = vec4(uAtmo * fres * (0.20 + day * 1.9), fres);
  }
`;

const CLOUD_FRAG = `
  uniform float uTime;
  uniform float uSeed;
  uniform vec3 uLight;
  varying vec3 vObj;
  varying vec3 vWN;
  ${NOISE_GLSL}
  void main() {
    vec3 n = normalize(vObj);
    float c = fbm3(n * 3.4 + vec3(uTime * 0.05 + uSeed, 0.0, 0.0));
    float a = smoothstep(0.10, 0.52, c);
    float day = smoothstep(-0.2, 0.5, dot(normalize(vWN), normalize(uLight)));
    gl_FragColor = vec4(vec3(0.80, 0.91, 1.0) * (0.12 + day * 1.15), a * 0.5);
  }
`;

const RING_FRAG = `
  uniform float uInner;
  uniform float uOuter;
  uniform float uSeed;
  uniform vec3 uColA;
  uniform vec3 uColB;
  uniform vec3 uLight;
  varying vec3 vObj;
  varying vec3 vWN;
  ${NOISE_GLSL}
  void main() {
    float r = length(vObj.xy);
    float t = clamp((r - uInner) / max(uOuter - uInner, 0.0001), 0.0, 1.0);

    // Thousands of separate ringlets, plus two clean gaps.
    float ringlets = 0.45 + 0.55 * smoothstep(-0.15, 0.35, fbm3(vec3(t * 26.0, uSeed * 3.0, 0.0)));
    float a = smoothstep(0.0, 0.05, t) * (1.0 - smoothstep(0.88, 1.0, t)) * ringlets;
    a *= 1.0 - 0.85 * smoothstep(0.035, 0.0, abs(t - 0.40));
    a *= 1.0 - 0.6 * smoothstep(0.02, 0.0, abs(t - 0.72));

    // Ice catches the light, so the sunward half of the ring is brighter.
    float day = 0.45 + 0.55 * smoothstep(-0.6, 0.6, dot(normalize(vWN), normalize(uLight)));
    gl_FragColor = vec4(mix(uColA, uColB, t) * (0.5 + day), a * 0.8);
  }
`;

interface Moon { r: number; dist: number; speed: number; col: string; }

interface PlanetSpec {
  name: string;
  radius: number;
  orbit: number;         // 0 = the world you start on, at the centre
  orbitSpeed: number;
  phase: number;
  inclination: number;
  axialTilt: number;
  spin: number;
  segments: number;
  deep: string;
  mid: string;
  hot: string;
  atmo: string;
  night: string;
  sea: number;           // 0 gas giant marbling, 1 hard coastlines
  bands: number;         // 0 rocky, 1 banded gas giant
  storm: number;
  seed: number;
  clouds?: boolean;
  ring?: { inner: number; outer: number; tilt: number; colA: string; colB: string };
  moons?: Moon[];
}

/* Twenty worlds in three belts.
 *
 * You start on the first one — oceans, continents, weather, warm lights on the
 * night side — and everything after it is a step further out: an inner belt you
 * meet as the camera lifts off, a scattering of small worlds beyond it, then an
 * outer belt on steeply inclined orbits that only resolves once you are far
 * enough away to see the whole thing at once.
 *
 * Blue is the spine — the home world, the ice giants, the nebulae — and the rest
 * is deliberately loud: crimson, magenta, saffron, jade, fuchsia, amber. At full
 * pull-back you are looking at a field of colour, which is the point. */
const PLANETS: PlanetSpec[] = [
  /* ── the world you leave ─────────────────────────────────────────────── */
  {
    name: 'TERRA',
    radius: 3.0, orbit: 0, orbitSpeed: 0, phase: 0, inclination: 0,
    axialTilt: 0.24, spin: 0.05, segments: 128,
    deep: '#04225c', mid: '#1f9150', hot: '#e3c489', atmo: '#4cc2ff', night: '#ffb85c',
    sea: 1, bands: 0, storm: 0, seed: 1.7, clouds: true,
    moons: [{ r: 0.42, dist: 5.7, speed: 0.30, col: '#e9edf3' }]
  },

  /* ── inner belt ──────────────────────────────────────────────────────── */
  {
    name: 'VERMILION',
    radius: 0.9, orbit: 8.4, orbitSpeed: 0.092, phase: 0.7, inclination: 0.09,
    axialTilt: 0.38, spin: 0.24, segments: 44,
    deep: '#3c0512', mid: '#e0342a', hot: '#ffd166', atmo: '#ff7a59', night: '#ff8a4c',
    sea: 0.55, bands: 0.06, storm: 0.35, seed: 4.1
  },
  {
    name: 'HALIDE',
    radius: 1.15, orbit: 12.2, orbitSpeed: 0.076, phase: 2.1, inclination: -0.13,
    axialTilt: 0.44, spin: 0.21, segments: 52,
    deep: '#04223d', mid: '#22b8d6', hot: '#eafeff', atmo: '#67e8f9', night: '#a5f3fc',
    sea: 0.3, bands: 0.05, storm: 0.2, seed: 6.6,
    ring: { inner: 1.8, outer: 3.1, tilt: 0.34, colA: '#a5f3fc', colB: '#1e6fa8' }
  },
  {
    name: 'VESSEL',
    radius: 2.0, orbit: 16.8, orbitSpeed: 0.061, phase: 3.8, inclination: 0.17,
    axialTilt: 0.15, spin: 0.17, segments: 64,
    deep: '#0b0b45', mid: '#4f46e5', hot: '#cbd5ff', atmo: '#818cf8', night: '#a5b4fc',
    sea: 0, bands: 0.45, storm: 0.7, seed: 9.3,
    moons: [
      { r: 0.22, dist: 3.1, speed: 0.58, col: '#dbeafe' },
      { r: 0.14, dist: 4.2, speed: -0.38, col: '#a5b4fc' }
    ]
  },
  {
    name: 'GREENHOUSE',
    radius: 1.35, orbit: 22.4, orbitSpeed: 0.049, phase: 5.4, inclination: -0.21,
    axialTilt: 0.5, spin: 0.14, segments: 56,
    deep: '#02241d', mid: '#10b981', hot: '#b6ffd8', atmo: '#34d399', night: '#6ee7b7',
    sea: 0.85, bands: 0.06, storm: 0.25, seed: 13.9, clouds: true,
    moons: [{ r: 0.18, dist: 2.5, speed: 0.46, col: '#bbf7d0' }]
  },
  {
    name: 'CINDER',
    radius: 2.5, orbit: 29.0, orbitSpeed: 0.038, phase: 1.2, inclination: 0.11,
    axialTilt: 0.34, spin: 0.11, segments: 64,
    deep: '#2a0433', mid: '#c026d3', hot: '#ffd1ff', atmo: '#e879f9', night: '#f0abfc',
    sea: 0, bands: 0.55, storm: 0.95, seed: 20.2,
    ring: { inner: 3.3, outer: 5.2, tilt: -0.5, colA: '#fbcfe8', colB: '#7e22ce' }
  },
  {
    name: 'LANTERN',
    radius: 1.0, orbit: 36.5, orbitSpeed: 0.030, phase: 4.6, inclination: 0.28,
    axialTilt: 0.6, spin: 0.28, segments: 44,
    deep: '#331603', mid: '#f59e0b', hot: '#fff3b0', atmo: '#fbbf24', night: '#fde68a',
    sea: 0.4, bands: 0.12, storm: 0.5, seed: 27.5,
    moons: [{ r: 0.13, dist: 1.9, speed: 0.74, col: '#fde68a' }]
  },
  {
    name: 'AZURE',
    radius: 1.8, orbit: 45.0, orbitSpeed: 0.025, phase: 2.9, inclination: -0.3,
    axialTilt: 0.2, spin: 0.15, segments: 56,
    deep: '#032d38', mid: '#06b6d4', hot: '#ccfbf1', atmo: '#22d3ee', night: '#67e8f9',
    sea: 0, bands: 0.38, storm: 0.45, seed: 31.8,
    ring: { inner: 2.9, outer: 4.3, tilt: 0.6, colA: '#cffafe', colB: '#0e7490' }
  },
  {
    name: 'ROSELLE',
    radius: 1.25, orbit: 54.5, orbitSpeed: 0.020, phase: 0.3, inclination: 0.36,
    axialTilt: 0.46, spin: 0.19, segments: 44,
    deep: '#3d0620', mid: '#fb7185', hot: '#ffe4e6', atmo: '#fda4af', night: '#fecdd3',
    sea: 0.7, bands: 0.08, storm: 0.3, seed: 37.4,
    moons: [{ r: 0.15, dist: 2.2, speed: 0.52, col: '#ffe4e6' }]
  },

  /* ── the small worlds between the belts ──────────────────────────────── */
  {
    name: 'FLINT',
    radius: 0.7, orbit: 62.0, orbitSpeed: 0.017, phase: 3.3, inclination: -0.42,
    axialTilt: 0.7, spin: 0.33, segments: 32,
    deep: '#1b1533', mid: '#7c8cff', hot: '#e9ecff', atmo: '#a5b4fc', night: '#c7d2fe',
    sea: 0.5, bands: 0.04, storm: 0.15, seed: 41.2
  },
  {
    name: 'SORREL',
    radius: 0.82, orbit: 70.0, orbitSpeed: 0.015, phase: 5.9, inclination: 0.47,
    axialTilt: 0.28, spin: 0.3, segments: 32,
    deep: '#2f2a04', mid: '#a3e635', hot: '#f7ffd6', atmo: '#bef264', night: '#d9f99d',
    sea: 0.6, bands: 0.05, storm: 0.2, seed: 45.7
  },

  /* ── outer belt: steep orbits, big bodies, loud colour ───────────────── */
  {
    name: 'CORAL DRIFT',
    radius: 3.4, orbit: 80.0, orbitSpeed: 0.0130, phase: 1.8, inclination: -0.5,
    axialTilt: 0.3, spin: 0.09, segments: 56,
    deep: '#3a1002', mid: '#fb923c', hot: '#ffedd5', atmo: '#fdba74', night: '#fed7aa',
    sea: 0, bands: 0.5, storm: 0.65, seed: 50.3
  },
  {
    name: 'ULTRAMARINE',
    radius: 2.6, orbit: 94.0, orbitSpeed: 0.0112, phase: 4.1, inclination: 0.55,
    axialTilt: 0.5, spin: 0.12, segments: 48,
    deep: '#020b3a', mid: '#2563eb', hot: '#bfdbfe', atmo: '#60a5fa', night: '#93c5fd',
    sea: 0, bands: 0.3, storm: 0.4, seed: 55.1,
    ring: { inner: 3.9, outer: 6.2, tilt: -0.38, colA: '#dbeafe', colB: '#1d4ed8' }
  },
  {
    name: 'SAFFRON',
    radius: 4.0, orbit: 110.0, orbitSpeed: 0.0096, phase: 0.9, inclination: -0.34,
    axialTilt: 0.22, spin: 0.08, segments: 56,
    deep: '#3d2c02', mid: '#eab308', hot: '#fef9c3', atmo: '#facc15', night: '#fde047',
    sea: 0, bands: 0.62, storm: 0.85, seed: 60.8
  },
  {
    name: 'JADE',
    radius: 2.9, orbit: 128.0, orbitSpeed: 0.0083, phase: 3.6, inclination: 0.62,
    axialTilt: 0.42, spin: 0.11, segments: 48,
    deep: '#04261f', mid: '#14b8a6', hot: '#ccfbf1', atmo: '#2dd4bf', night: '#5eead4',
    sea: 0.75, bands: 0.08, storm: 0.3, seed: 66.4, clouds: true,
    moons: [{ r: 0.3, dist: 4.6, speed: 0.4, col: '#ccfbf1' }]
  },
  {
    name: 'FUCHSIA',
    radius: 4.6, orbit: 146.0, orbitSpeed: 0.0071, phase: 5.2, inclination: -0.58,
    axialTilt: 0.36, spin: 0.07, segments: 56,
    deep: '#2f0524', mid: '#ec4899', hot: '#fce7f3', atmo: '#f472b6', night: '#f9a8d4',
    sea: 0, bands: 0.48, storm: 0.9, seed: 72.9,
    ring: { inner: 6.4, outer: 10.2, tilt: 0.44, colA: '#fbcfe8', colB: '#9d174d' },
    moons: [{ r: 0.34, dist: 12.4, speed: 0.26, col: '#fce7f3' }]
  },
  {
    name: 'COBALT',
    radius: 3.6, orbit: 164.0, orbitSpeed: 0.0062, phase: 2.4, inclination: 0.4,
    axialTilt: 0.18, spin: 0.1, segments: 48,
    deep: '#030c3f', mid: '#3b82f6', hot: '#dbeafe', atmo: '#93c5fd', night: '#bfdbfe',
    sea: 0.35, bands: 0.28, storm: 0.35, seed: 79.2,
    moons: [{ r: 0.28, dist: 5.4, speed: 0.32, col: '#dbeafe' }]
  },
  {
    name: 'AMBERLIGHT',
    radius: 5.2, orbit: 182.0, orbitSpeed: 0.0054, phase: 4.8, inclination: -0.66,
    axialTilt: 0.48, spin: 0.06, segments: 56,
    deep: '#401a02', mid: '#f97316', hot: '#ffedd5', atmo: '#fb923c', night: '#fdba74',
    sea: 0, bands: 0.58, storm: 0.8, seed: 86.5,
    moons: [
      { r: 0.36, dist: 7.6, speed: 0.3, col: '#ffedd5' },
      { r: 0.24, dist: 9.9, speed: -0.22, col: '#fed7aa' }
    ]
  },
  {
    name: 'NOVA VIOLET',
    radius: 4.2, orbit: 198.0, orbitSpeed: 0.0047, phase: 1.1, inclination: 0.7,
    axialTilt: 0.54, spin: 0.08, segments: 48,
    deep: '#23044a', mid: '#8b5cf6', hot: '#ede9fe', atmo: '#a78bfa', night: '#c4b5fd',
    sea: 0, bands: 0.4, storm: 0.7, seed: 93.1,
    ring: { inner: 5.8, outer: 9.0, tilt: -0.62, colA: '#ede9fe', colB: '#5b21b6' }
  },
  {
    name: 'GLASSHOUSE',
    radius: 3.1, orbit: 212.0, orbitSpeed: 0.0041, phase: 3.0, inclination: -0.24,
    axialTilt: 0.32, spin: 0.13, segments: 44,
    deep: '#022f45', mid: '#38bdf8', hot: '#e0f2fe', atmo: '#7dd3fc', night: '#bae6fd',
    sea: 0.8, bands: 0.07, storm: 0.25, seed: 99.6, clouds: true
  }
];

// How far the camera travels. The distance is interpolated geometrically rather
// than linearly, because apparent size goes as 1/distance: a straight lerp would
// blow past the home world in the first few percent of the scroll and then crawl
// for the rest. Multiplying instead means every stretch of the scroll roughly
// doubles what you can see, which is what "out to the universe" actually feels
// like.
const NEAR_DIST = 4.3;
const FAR_DIST = 340;

// Deliberately close to linear: the camera has to answer the very first notch
// of the wheel, and with the distance itself interpolated geometrically the
// timeline wants no extra shaping on top of that. This only rounds off the first
// and last few percent, so the pull-back neither starts nor stops with a jolt.
const easeScroll = (t: number) => {
  const s = Math.min(Math.max(t, 0), 1);
  return s * s * (3 - 2 * s) * 0.25 + s * 0.75;
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const DigitalForge: React.FC<DigitalForgeProps> = ({ navigateTo }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);

  // Where the timeline sits against the page. Progress 0 lands when the top of
  // the section has climbed a fifth of the way up the screen — early enough that
  // the lift-off has begun before it pins, late enough that you are not missing
  // the opening while it is still a sliver at the bottom. Progress 1 lands as the
  // stage's bottom edge reaches the bottom of the screen.
  //
  // The section is 400svh against a 100svh stage: 78svh of that travel happens
  // on the way in, and the remaining 300svh — three full screens of scroll — is
  // spent pinned, which is where the bulk of the pull-back lives.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end end']
  });

  // The copy holds still on the way in, then drifts and shrinks across the whole
  // pinned stretch as the camera falls away from it.
  const copyY = useTransform(scrollYProgress, [0.2, 1], [0, -90]);
  const copyScale = useTransform(scrollYProgress, [0.2, 1], [1, 0.88]);
  const hintOpacity = useTransform(scrollYProgress, [0.22, 0.34], [1, 0]);

  useEffect(() => {
    // Scroll position is handed to the render loop and nowhere else: nothing in
    // the DOM is written from the scroll callback, so a fast scroll cannot pile
    // up style writes on the main thread.
    const unsubscribe = scrollYProgress.on('change', (v: number) => {
      progressRef.current = v;
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    const section = containerRef.current;
    if (!canvas || !stage || !section) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    const scene = new THREE.Scene();
    // The far plane has to clear a camera that ends up 340 units out looking at a
    // starfield another 1100 beyond that.
    const camera = new THREE.PerspectiveCamera(68, 1, 0.2, 3000);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'high-performance'
    });
    // The surface shaders are noise-heavy, so the pixel ratio is capped well
    // below the display's — this is a backdrop, not a render target.
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.15 : 1.5));

    const disposables: { dispose: () => void }[] = [];
    const track = <T extends { dispose: () => void }>(x: T) => { disposables.push(x); return x; };

    // The system, and the sun that lights it from off to one side.
    const system = new THREE.Group();
    scene.add(system);
    const SUN = new THREE.Vector3(-150, 62, -95);

    /* ── STARFIELD ──────────────────────────────────────────────────────────
       A shell far enough out that the camera never leaves it, even at 340 units.
       These points are drawn at a fixed pixel size rather than attenuated with
       distance: real stars do not swell as you approach them, and a size that
       changes with every frame's camera move is a reliable source of shimmer. */
    const starCount = isMobile ? 1300 : 2800;
    const starGeo = track(new THREE.BufferGeometry());
    {
      const pos = new Float32Array(starCount * 3);
      const col = new Float32Array(starCount * 3);
      const scl = new Float32Array(starCount);
      const pha = new Float32Array(starCount);
      const warm = new THREE.Color('#fff5e0');
      const cold = new THREE.Color('#8ab6ff');
      for (let i = 0; i < starCount; i++) {
        const r = 620 + Math.random() * 880;
        const phi = Math.acos(2 * Math.random() - 1);
        const theta = Math.random() * Math.PI * 2;
        pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        pos[i * 3 + 1] = r * Math.cos(phi);
        pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
        const c = cold.clone().lerp(warm, Math.pow(Math.random(), 2.2));
        col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
        scl[i] = 0.55 + Math.pow(Math.random(), 2.4) * 2.1;
        pha[i] = Math.random() * Math.PI * 2;
      }
      starGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      starGeo.setAttribute('aColor', new THREE.BufferAttribute(col, 3));
      starGeo.setAttribute('aScale', new THREE.BufferAttribute(scl, 1));
      starGeo.setAttribute('aPhase', new THREE.BufferAttribute(pha, 1));
    }
    const POINT_VERT = `
      uniform float uTime; uniform float uSize;
      attribute vec3 aColor; attribute float aScale; attribute float aPhase;
      varying vec3 vColor; varying float vTw;
      void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = uSize * aScale;
        vColor = aColor;
        vTw = 0.45 + 0.55 * sin(uTime * 1.3 + aPhase * 4.0);
      }
    `;
    const POINT_FRAG = `
      varying vec3 vColor; varying float vTw;
      void main() {
        float d = length(gl_PointCoord - vec2(0.5));
        if (d > 0.5) discard;
        float a = pow(smoothstep(0.5, 0.0, d), 2.6);
        gl_FragColor = vec4(vColor * (0.7 + vTw), a * vTw);
      }
    `;
    const starMat = track(new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 }, uSize: { value: 1.5 * renderer.getPixelRatio() } },
      vertexShader: POINT_VERT,
      fragmentShader: POINT_FRAG
    }));
    scene.add(new THREE.Points(starGeo, starMat));

    /* ── THE GALACTIC PLANE ─────────────────────────────────────────────────
       A second, flattened field of stars crossing the planets' plane at an angle.
       Close in it is a sparse sky; by the time the camera is hundreds of units
       out it has resolved into a band, which is most of what sells the last
       stretch of the pull-back as leaving the neighbourhood entirely. */
    const bandCount = isMobile ? 1400 : 3200;
    const bandGeo = track(new THREE.BufferGeometry());
    {
      const pos = new Float32Array(bandCount * 3);
      const col = new Float32Array(bandCount * 3);
      const scl = new Float32Array(bandCount);
      const pha = new Float32Array(bandCount);
      // Loud on purpose: the band is where the colour in the wide shot comes from.
      const hues = ['#bfdbfe', '#67e8f9', '#f0abfc', '#fde68a', '#ffffff', '#a5b4fc', '#fda4af'];
      const colours = hues.map((h) => new THREE.Color(h));
      for (let i = 0; i < bandCount; i++) {
        const r = 70 + Math.pow(Math.random(), 0.62) * 830;
        const a = Math.random() * Math.PI * 2;
        // Two gaussian-ish draws give a plane that is dense in the middle and
        // frays at the edges, rather than a hard-edged slab.
        const y = ((Math.random() + Math.random() + Math.random()) / 1.5 - 1) * 34;
        pos[i * 3] = Math.cos(a) * r;
        pos[i * 3 + 1] = y;
        pos[i * 3 + 2] = Math.sin(a) * r;
        const c = colours[(Math.random() * colours.length) | 0];
        col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
        scl[i] = 0.45 + Math.pow(Math.random(), 2.0) * 1.5;
        pha[i] = Math.random() * Math.PI * 2;
      }
      bandGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      bandGeo.setAttribute('aColor', new THREE.BufferAttribute(col, 3));
      bandGeo.setAttribute('aScale', new THREE.BufferAttribute(scl, 1));
      bandGeo.setAttribute('aPhase', new THREE.BufferAttribute(pha, 1));
    }
    const bandMat = track(new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 }, uSize: { value: 1.35 * renderer.getPixelRatio() } },
      vertexShader: POINT_VERT,
      fragmentShader: POINT_FRAG
    }));
    const band = new THREE.Points(bandGeo, bandMat);
    band.rotation.set(0.16, 0, 0.38);
    scene.add(band);

    /* ── NEBULAE ────────────────────────────────────────────────────────────
       Three billboards, all far enough away that the camera never reaches them,
       in three different palettes. Close in they read as a faint coloured haze
       behind the home world; wide open they are the backdrop. */
    const colorOf = (hex: string) => new THREE.Color(hex);
    const NEBULA_FRAG = `
      uniform float uTime; uniform vec3 uA; uniform vec3 uB; uniform vec3 uC;
      uniform float uAlpha; uniform float uSeed;
      varying vec2 vUv;
      ${NOISE_GLSL}
      void main() {
        vec2 p = vUv - 0.5;
        float clouds = fbm3(vec3(vUv * 4.2 + uSeed, uTime * 0.01)) * 0.5 + 0.5;
        float body = smoothstep(0.52, 0.02, length(p * vec2(1.0, 1.5)));
        vec3 col = mix(uA, uB, clouds);
        col = mix(col, uC, smoothstep(0.45, 0.88, clouds));
        gl_FragColor = vec4(col, body * clouds * uAlpha);
      }
    `;
    const NEBULA_VERT = `
      varying vec2 vUv;
      void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
    `;
    const nebulae = ([
      { w: 1500, h: 1040, pos: [340, 150, -820], rot: 0.34, a: '#0a1c78', b: '#4a17a8', c: '#0e5fa8', alpha: 0.4, seed: 0 },
      { w: 1180, h: 880, pos: [-560, -230, -700], rot: -0.5, a: '#5c1050', b: '#a8215f', c: '#e0654f', alpha: 0.3, seed: 3.7 },
      { w: 1040, h: 760, pos: [-760, 300, 140], rot: 0.86, a: '#06403f', b: '#0f7d86', c: '#5fd6c8', alpha: 0.26, seed: 7.2 }
    ] as const).map((n) => {
      const geo = track(new THREE.PlaneGeometry(n.w, n.h));
      const mat = track(new THREE.ShaderMaterial({
        transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 }, uSeed: { value: n.seed }, uAlpha: { value: n.alpha },
          uA: { value: colorOf(n.a) }, uB: { value: colorOf(n.b) }, uC: { value: colorOf(n.c) }
        },
        vertexShader: NEBULA_VERT,
        fragmentShader: NEBULA_FRAG
      }));
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(n.pos[0], n.pos[1], n.pos[2]);
      scene.add(mesh);
      return { mesh, mat, roll: n.rot };
    });

    /* ── SUN + FLARE ────────────────────────────────────────────────────── */
    const sunGeo = track(new THREE.PlaneGeometry(150, 150));
    const sunMat = track(new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        varying vec2 vUv;
        void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
      `,
      fragmentShader: `
        uniform float uTime;
        varying vec2 vUv;
        void main() {
          vec2 p = vUv - 0.5;
          float d = length(p);
          float core = smoothstep(0.055, 0.0, d);
          float glow = pow(smoothstep(0.42, 0.0, d), 2.4);
          float breathe = 0.9 + 0.1 * sin(uTime * 0.7);
          // Anamorphic streak, the one deliberately cinematic touch.
          float streak = smoothstep(0.05, 0.0, abs(p.y)) * smoothstep(0.46, 0.0, abs(p.x));
          vec3 col = mix(vec3(0.42, 0.72, 1.0), vec3(1.0, 0.97, 0.90), core + glow * 0.5);
          gl_FragColor = vec4(col, (core + glow * 0.42 + streak * 0.4) * breathe);
        }
      `
    }));
    const sun = new THREE.Mesh(sunGeo, sunMat);
    sun.position.copy(SUN);
    scene.add(sun);

    /* ── DUST IN THE ORBITAL PLANE ──────────────────────────────────────────
       Reaches out past the last of the inner belt, so the middle of the
       pull-back has something between the planets rather than empty black. */
    const dustCount = isMobile ? 900 : 2400;
    const dustGeo = track(new THREE.BufferGeometry());
    {
      const pos = new Float32Array(dustCount * 3);
      const scl = new Float32Array(dustCount);
      const pha = new Float32Array(dustCount);
      for (let i = 0; i < dustCount; i++) {
        const r = 5 + Math.pow(Math.random(), 0.7) * 62;
        const a = Math.random() * Math.PI * 2;
        pos[i * 3] = Math.cos(a) * r;
        pos[i * 3 + 1] = (Math.random() - 0.5) * (1.2 + r * 0.06);
        pos[i * 3 + 2] = Math.sin(a) * r;
        scl[i] = 0.3 + Math.random() * 0.8;
        pha[i] = Math.random() * Math.PI * 2;
      }
      dustGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      dustGeo.setAttribute('aScale', new THREE.BufferAttribute(scl, 1));
      dustGeo.setAttribute('aPhase', new THREE.BufferAttribute(pha, 1));
    }
    const dustMat = track(new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 }, uSize: { value: 90 * renderer.getPixelRatio() } },
      vertexShader: `
        uniform float uTime; uniform float uSize;
        attribute float aScale; attribute float aPhase;
        varying float vTw;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = uSize * aScale / max(-mv.z, 1.0);
          vTw = 0.4 + 0.6 * sin(uTime * 0.9 + aPhase * 3.0);
        }
      `,
      fragmentShader: `
        varying float vTw;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float a = pow(smoothstep(0.5, 0.0, d), 2.2);
          gl_FragColor = vec4(vec3(0.52, 0.74, 1.0) * (0.6 + vTw), a * vTw * 0.5);
        }
      `
    }));
    const dust = new THREE.Points(dustGeo, dustMat);
    system.add(dust);

    /* ── THE BODIES ─────────────────────────────────────────────────────── */
    interface Body {
      spec: PlanetSpec;
      pivot: THREE.Group;        // spun to walk the planet round its orbit
      group: THREE.Group;        // the planet and everything travelling with it
      surface: THREE.Mesh;
      lightMats: THREE.ShaderMaterial[];
      moonPivots: { group: THREE.Group; speed: number }[];
    }

    const bodies: Body[] = [];

    PLANETS.forEach((spec) => {
      const incl = new THREE.Group();
      incl.rotation.x = spec.inclination;
      system.add(incl);

      const pivot = new THREE.Group();
      incl.add(pivot);

      const group = new THREE.Group();
      group.position.x = spec.orbit;
      group.rotation.z = spec.axialTilt;
      pivot.add(group);

      const segs = isMobile ? Math.max(20, Math.round(spec.segments * 0.55)) : spec.segments;
      const geo = track(new THREE.SphereGeometry(spec.radius, segs, Math.round(segs * 0.6)));
      const surfaceMat = track(new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uSeed: { value: spec.seed },
          uBands: { value: spec.bands },
          uStorm: { value: spec.storm },
          uDeep: { value: colorOf(spec.deep) },
          uMid: { value: colorOf(spec.mid) },
          uHot: { value: colorOf(spec.hot) },
          uAtmo: { value: colorOf(spec.atmo) },
          uNight: { value: colorOf(spec.night) },
          uSea: { value: spec.sea },
          uLight: { value: new THREE.Vector3(1, 0, 0) }
        },
        vertexShader: BODY_VERT,
        fragmentShader: SURFACE_FRAG
      }));
      const surface = new THREE.Mesh(geo, surfaceMat);
      group.add(surface);

      const lightMats: THREE.ShaderMaterial[] = [surfaceMat];

      // Atmosphere: a slightly larger shell that only shows at the limb.
      const atmoGeo = track(new THREE.SphereGeometry(spec.radius * 1.055, segs, Math.round(segs * 0.5)));
      const atmoMat = track(new THREE.ShaderMaterial({
        transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
        uniforms: {
          uAtmo: { value: colorOf(spec.atmo) },
          uLight: { value: new THREE.Vector3(1, 0, 0) }
        },
        vertexShader: BODY_VERT,
        fragmentShader: ATMO_FRAG
      }));
      group.add(new THREE.Mesh(atmoGeo, atmoMat));
      lightMats.push(atmoMat);

      if (spec.clouds) {
        const cloudGeo = track(new THREE.SphereGeometry(spec.radius * 1.018, segs, Math.round(segs * 0.6)));
        const cloudMat = track(new THREE.ShaderMaterial({
          transparent: true, depthWrite: false,
          uniforms: {
            uTime: { value: 0 },
            uSeed: { value: spec.seed * 2.1 },
            uLight: { value: new THREE.Vector3(1, 0, 0) }
          },
          vertexShader: BODY_VERT,
          fragmentShader: CLOUD_FRAG
        }));
        const clouds = new THREE.Mesh(cloudGeo, cloudMat);
        clouds.name = 'clouds';
        group.add(clouds);
        lightMats.push(cloudMat);
      }

      if (spec.ring) {
        const ringGeo = track(new THREE.RingGeometry(spec.ring.inner, spec.ring.outer, 192, 4));
        const ringMat = track(new THREE.ShaderMaterial({
          transparent: true, depthWrite: false, side: THREE.DoubleSide,
          uniforms: {
            uInner: { value: spec.ring.inner },
            uOuter: { value: spec.ring.outer },
            uSeed: { value: spec.seed },
            uColA: { value: colorOf(spec.ring.colA) },
            uColB: { value: colorOf(spec.ring.colB) },
            uLight: { value: new THREE.Vector3(1, 0, 0) }
          },
          vertexShader: BODY_VERT,
          fragmentShader: RING_FRAG
        }));
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = -Math.PI / 2 + spec.ring.tilt;
        group.add(ring);
        lightMats.push(ringMat);
      }

      const moonPivots: { group: THREE.Group; speed: number }[] = [];
      (spec.moons || []).forEach((moon, mi) => {
        const mPivot = new THREE.Group();
        mPivot.rotation.x = 0.2 + mi * 0.35;
        group.add(mPivot);
        const mGeo = track(new THREE.SphereGeometry(moon.r, 20, 14));
        const mMat = track(new THREE.ShaderMaterial({
          uniforms: {
            uTime: { value: 0 },
            uSeed: { value: spec.seed + mi * 3.7 },
            uBands: { value: 0 },
            uStorm: { value: 0 },
            uDeep: { value: colorOf('#0b1220') },
            uMid: { value: colorOf(moon.col) },
            uHot: { value: colorOf('#ffffff') },
            uAtmo: { value: colorOf(moon.col) },
            uNight: { value: colorOf(moon.col) },
            uSea: { value: 0 },
            uLight: { value: new THREE.Vector3(1, 0, 0) }
          },
          vertexShader: BODY_VERT,
          fragmentShader: SURFACE_FRAG
        }));
        const mesh = new THREE.Mesh(mGeo, mMat);
        mesh.position.x = moon.dist;
        mPivot.add(mesh);
        moonPivots.push({ group: mPivot, speed: moon.speed });
        lightMats.push(mMat);
      });

      /* The orbit itself, drawn as a hairline so the system reads as a system.
         Thickness grows with the radius: a fixed 0.024-unit ring out at orbit
         212 lands under a pixel wide, and a sub-pixel additive line crawls and
         sparkles as the camera moves, which reads as judder. Past orbit 60 the
         trail is dropped altogether — by the time those worlds are on screen
         the camera is far enough out that the lines would be a wire mesh. */
      if (spec.orbit > 0 && spec.orbit <= 60) {
        const halfWidth = Math.max(0.012, spec.orbit * 0.0022);
        const trailGeo = track(new THREE.RingGeometry(spec.orbit - halfWidth, spec.orbit + halfWidth, 256, 1));
        const trailMat = track(new THREE.MeshBasicMaterial({
          color: spec.atmo, transparent: true, opacity: 0.16,
          blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide
        }));
        const trail = new THREE.Mesh(trailGeo, trailMat);
        trail.rotation.x = -Math.PI / 2;
        incl.add(trail);
      }

      bodies.push({ spec, pivot, group, surface, lightMats, moonPivots });
    });

    /* ── SCROLL-DRIVEN CAMERA ───────────────────────────────────────────── */
    const worldPos = new THREE.Vector3();
    const lightDir = new THREE.Vector3();
    const clock = new THREE.Clock();
    let animationId = 0;
    let isVisible = true;
    // Elapsed time is accumulated by hand from the same getDelta() the damping
    // uses: THREE.Clock.getElapsedTime() consumes the delta internally, so
    // calling both in one frame would hand the damping a zero every time.
    let elapsed = 0;
    // The damped copy of the scroll position. Primed on the first frame so the
    // section does not swing in from zero if you land on it mid-page.
    let smoothed = -1;
    // Time banked towards the next ambient frame. See the settle check below.
    let ambient = 0;

    const observer = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
    }, { threshold: 0 });
    observer.observe(section);

    const render = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      elapsed += dt;
      const t = reducedMotion ? 0 : elapsed;

      /* A wheel notch is a step change in scroll position, and this camera
         multiplies whatever it is given — an eighth of the track is a doubling
         of distance — so a raw scroll value shows up as a visible jolt, and
         momentum scrolling at the bottom of the pin shows up as chatter. The
         target is therefore chased with an exponential decay rather than used
         directly. Written with exp(-dt * k) so the rate is the same whether
         the browser is running at 60Hz or 144Hz. */
      const target = progressRef.current;
      // A jump of more than a quarter of the track in a single frame is not a
      // scroll, it is a link or a restored position — snap rather than fly.
      if (smoothed < 0 || Math.abs(target - smoothed) > 0.25) smoothed = target;
      else smoothed += (target - smoothed) * (1 - Math.exp(-dt * 7.5));
      const zoom = easeScroll(smoothed);

      /* While the camera is settled, nothing on screen needs sixty frames a
         second: the orbits turn at a hundredth of a radian per second and the
         twinkle is barely over a hertz. So a stationary shot is drawn at 30fps
         and the GPU is left alone for the other half of the time. The instant
         the scroll moves this goes back to every frame — which is exactly when
         the browser's compositor and this scene would otherwise be fighting
         over the same GPU, and that fight is what a scroll stutter is. */
      ambient += dt;
      if (Math.abs(target - smoothed) < 0.0004 && ambient < 1 / 30) return;
      ambient = 0;

      starMat.uniforms.uTime.value = t;
      bandMat.uniforms.uTime.value = t;
      dustMat.uniforms.uTime.value = t;
      sunMat.uniforms.uTime.value = t;
      nebulae.forEach((n) => { n.mat.uniforms.uTime.value = t; });

      bodies.forEach((body) => {
        const { spec } = body;
        body.pivot.rotation.y = spec.phase + t * spec.orbitSpeed;
        body.surface.rotation.y = t * spec.spin;

        body.group.children.forEach((child) => {
          if (child.name === 'clouds') child.rotation.y = -t * spec.spin * 0.55;
        });
        body.moonPivots.forEach((m) => { m.group.rotation.y = t * m.speed; });

        // Every body is lit from wherever the sun actually is relative to it,
        // so the terminators all point the right way.
        body.group.getWorldPosition(worldPos);
        lightDir.copy(SUN).sub(worldPos).normalize();
        body.lightMats.forEach((mat) => {
          if (mat.uniforms.uLight) mat.uniforms.uLight.value.copy(lightDir);
          if (mat.uniforms.uTime) mat.uniforms.uTime.value = t;
        });
      });

      /* The pull-back. Distance is interpolated geometrically rather than
         linearly, because apparent size goes as 1/distance: a straight lerp
         from 4 to 340 leaves the home world behind in the first two percent of
         the scroll and then crawls. Multiplying instead means every equal
         stretch of scroll roughly doubles what is on screen, which is what
         "zooming out from Earth" actually feels like. */
      const dist = NEAR_DIST * Math.pow(FAR_DIST / NEAR_DIST, zoom);
      // Height and orbit rise with the distance, so the tilt is the same shot
      // at every scale instead of flattening out as you retreat.
      const height = dist * lerp(0.035, 0.33, zoom);
      const swing = lerp(0.0, 0.75, zoom);
      camera.position.set(
        Math.sin(swing) * dist,
        height + (reducedMotion ? 0 : Math.sin(t * 0.25) * 0.06 * (1 - zoom)),
        Math.cos(swing) * dist
      );
      camera.lookAt(0, 0, 0);

      // A touch of dolly-zoom: the field narrows as the camera falls away.
      const fov = lerp(68, 40, zoom);
      if (Math.abs(camera.fov - fov) > 0.01) {
        camera.fov = fov;
        camera.updateProjectionMatrix();
      }

      // The whole system drifts, and tips towards plan view as you pull out.
      system.rotation.y = t * 0.008 + zoom * 0.22;
      system.rotation.x = zoom * 0.06;

      // Keep the flare and the nebulae facing the lens, each with its own roll.
      sun.quaternion.copy(camera.quaternion);
      nebulae.forEach((n) => {
        n.mesh.quaternion.copy(camera.quaternion);
        n.mesh.rotateZ(n.roll);
      });

      renderer.render(scene, camera);
    };

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      if (!isVisible) {
        // Drain the clock while the section is off screen, otherwise the first
        // frame back would be handed the whole absence as one delta.
        clock.getDelta();
        return;
      }
      render();
    };

    const handleResize = () => {
      const { width, height } = stage.getBoundingClientRect();
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      cancelAnimationFrame(animationId);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#02040a] h-[400svh]"
    >
      {/* 400svh against a 100svh stage. The offset below starts the camera when
          the section's top reaches 80% of the viewport — a fifth of the way up
          the screen, so the first turn of the wheel already moves it — and the
          remaining 300svh is spent pinned, which is three full screens of
          scroll to get from the cloud tops of the home world out past the last
          orbit. The section still ends exactly where the stage does, so
          the next section follows it with no black gap. */}
      <div ref={stageRef} className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full z-[1]"
        />

        {/* Vignette, so the copy stays razor sharp over a busy sky. */}
        <div className="absolute inset-0 z-[2] pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(2,4,10,0.72)_0%,rgba(2,4,10,0.35)_45%,rgba(2,4,10,0.85)_100%)]"></div>

        <div className="absolute inset-0 z-[3] flex flex-col items-center justify-center px-8 md:px-12 text-center">
          {/* willChange keeps this block on its own compositor layer for the
              whole scroll. Without it the browser promotes and demotes the layer
              as the transform starts and stops, and re-rasterising a screenful
              of heavy type mid-scroll is exactly what a stutter is. */}
          <motion.div
            style={{ y: copyY, scale: copyScale, willChange: 'transform' }}
            className="max-w-4xl"
          >
            <div className="h-1 w-20 bg-blue-600 mb-10 md:mb-14 mx-auto rounded-full shadow-[0_0_24px_rgba(37,99,235,0.9)]"></div>
            <h2 className="font-syne text-[clamp(2rem,8vw,4.5rem)] text-white font-black tracking-tighter uppercase leading-[0.85] mb-7 md:mb-9 drop-shadow-[0_8px_40px_rgba(0,0,0,0.85)]">
              CRAFTED. <br/><span className="text-blue-500 italic drop-shadow-[0_0_35px_rgba(37,99,235,0.65)]">NOT COMPILED.</span>
            </h2>
            <p className="text-slate-300 text-lg md:text-2xl font-medium max-w-3xl mx-auto leading-relaxed mb-12 md:mb-14 drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)]">
              Our builds aren't standard templates. We craft every detail with meticulous care, ensuring your site is fast, reliable, and perfectly tailored to your business needs.
            </p>
            <button
              onClick={() => navigateTo('contact')}
              className="px-12 md:px-16 py-6 md:py-8 bg-blue-600 text-white font-black text-[13px] uppercase tracking-[0.5em] rounded-full hover:bg-white hover:text-slate-950 transition-all duration-500 shadow-[0_20px_60px_rgba(37,99,235,0.45)] hover:scale-105 active:scale-95 transform-gpu ring-2 ring-blue-600/20"
            >
              Work with us
            </button>
          </motion.div>
        </div>

        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-7 left-1/2 -translate-x-1/2 z-[4] pointer-events-none flex flex-col items-center gap-3"
        >
          <span className="font-mono text-[9px] tracking-[0.4em] text-sky-200/50">SCROLL TO PULL BACK</span>
          <span className="forge-drop block w-px h-9 bg-gradient-to-b from-sky-200/60 to-transparent"></span>
        </motion.div>
      </div>

      <style>{`
        @keyframes forge-drop {
          0% { transform: scaleY(0); transform-origin: top; opacity: 0; }
          40% { transform: scaleY(1); transform-origin: top; opacity: 1; }
          100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
        }
        .forge-drop { animation: forge-drop 2.1s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .forge-drop { animation: none; } }
      `}</style>
    </section>
  );
};

export default DigitalForge;
