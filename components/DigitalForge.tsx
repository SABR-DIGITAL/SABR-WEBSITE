
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Page } from '../App';
import { motion, useScroll, useTransform } from 'framer-motion';

interface DigitalForgeProps { navigateTo: (page: Page) => void; }

const DigitalForge: React.FC<DigitalForgeProps> = ({ navigateTo }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const beamScaleX = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v: number) => {
      progressRef.current = v;
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050608, 0.055);

    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.set(0, 0, 7.4);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: !isMobile,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));

    // Master group so everything shares one smooth parallax motion
    const world = new THREE.Group();
    scene.add(world);

    /* ------------------------------------------------------------------
     * 1. VOLUMETRIC HAZE — fake bloom behind the core for depth
     * ---------------------------------------------------------------- */
    const hazeGeo = new THREE.PlaneGeometry(26, 26);
    const hazeMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        varying vec2 vUv;
        void main() {
          vec2 p = vUv - 0.5;
          float d = length(p);
          float pulse = 0.86 + 0.14 * sin(uTime * 0.55);
          float core = smoothstep(0.42, 0.0, d) * 0.55 * pulse;
          float halo = smoothstep(0.5, 0.12, d) * 0.22;
          vec3 deep = vec3(0.05, 0.15, 0.55);
          vec3 bright = vec3(0.22, 0.55, 1.0);
          vec3 col = mix(deep, bright, core);
          gl_FragColor = vec4(col, (core + halo) * 0.9);
        }
      `
    });
    const haze = new THREE.Mesh(hazeGeo, hazeMat);
    haze.position.z = -5.5;
    world.add(haze);

    /* ------------------------------------------------------------------
     * 2. THE CORE — displaced sphere with a fresnel rim (real 3D volume)
     * ---------------------------------------------------------------- */
    const coreGeo = new THREE.IcosahedronGeometry(2.15, 6);
    const coreMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.FrontSide,
      uniforms: {
        uTime: { value: 0 },
        uIntensity: { value: 1.0 }
      },
      vertexShader: `
        uniform float uTime;
        varying vec3 vNormalW;
        varying vec3 vViewDir;
        varying float vWave;

        void main() {
          float t = uTime * 0.35;
          vec3 p = position;
          // Smooth, organic breathing — three overlapping waves keeps it fluid
          float wave =
            sin(p.x * 1.6 + t * 1.7) * 0.5 +
            sin(p.y * 1.9 - t * 1.3) * 0.35 +
            sin(p.z * 2.3 + t * 1.1) * 0.28;
          vWave = wave;
          p += normal * wave * 0.16;

          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          vNormalW = normalize(normalMatrix * normal);
          vViewDir = normalize(-mv.xyz);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        uniform float uIntensity;
        varying vec3 vNormalW;
        varying vec3 vViewDir;
        varying float vWave;

        void main() {
          float fres = 1.0 - clamp(dot(normalize(vNormalW), normalize(vViewDir)), 0.0, 1.0);
          float rim = pow(fres, 2.6);
          float inner = pow(fres, 6.0);
          vec3 deepBlue = vec3(0.03, 0.10, 0.42);
          vec3 electric = vec3(0.14, 0.40, 1.0);
          vec3 sky = vec3(0.42, 0.78, 1.0);
          vec3 col = mix(deepBlue, electric, rim);
          col = mix(col, sky, inner * 0.85);
          col += vec3(0.04, 0.10, 0.24) * (vWave * 0.5 + 0.5);
          gl_FragColor = vec4(col * uIntensity, rim * 0.85 + inner * 0.35);
        }
      `
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    world.add(core);

    /* ------------------------------------------------------------------
     * 3. ARCHITECTURE SHELL — counter-rotating wireframe lattice
     * ---------------------------------------------------------------- */
    const shellGeo = new THREE.IcosahedronGeometry(3.05, 2);
    const shellMat = new THREE.MeshBasicMaterial({
      color: '#3b82f6',
      wireframe: true,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const shell = new THREE.Mesh(shellGeo, shellMat);
    world.add(shell);

    const outerShellGeo = new THREE.IcosahedronGeometry(4.4, 1);
    const outerShellMat = new THREE.MeshBasicMaterial({
      color: '#38bdf8',
      wireframe: true,
      transparent: true,
      opacity: 0.06,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const outerShell = new THREE.Mesh(outerShellGeo, outerShellMat);
    world.add(outerShell);

    /* ------------------------------------------------------------------
     * 4. PARTICLE FIELD — soft glowing motes, twinkling in depth
     * ---------------------------------------------------------------- */
    const particlesCount = isMobile ? 2600 : 7000;
    const pGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const scales = new Float32Array(particlesCount);
    const phases = new Float32Array(particlesCount);

    const colorA = new THREE.Color('#1d4ed8');
    const colorB = new THREE.Color('#7dd3fc');

    for (let i = 0; i < particlesCount; i++) {
      // Two shells: a tight sphere hugging the core + a wide ambient cloud
      const onCore = i % 3 !== 0;
      const radius = onCore
        ? 3.3 + Math.random() * 0.5
        : 5.0 + Math.pow(Math.random(), 0.6) * 7.0;

      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * (onCore ? 1 : 0.55);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const mixed = colorA.clone().lerp(colorB, Math.random() * (onCore ? 1 : 0.5));
      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;

      scales[i] = (onCore ? 0.7 : 0.45) + Math.random() * 0.9;
      phases[i] = Math.random() * Math.PI * 2;
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pGeo.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
    pGeo.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
    pGeo.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));

    const pMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        // gl_PointSize is in device pixels, so scale with the render DPR
        uSize: { value: (isMobile ? 26.0 : 34.0) * renderer.getPixelRatio() }
      },
      vertexShader: `
        uniform float uTime;
        uniform float uSize;
        attribute vec3 aColor;
        attribute float aScale;
        attribute float aPhase;
        varying vec3 vColor;
        varying float vTwinkle;

        void main() {
          vec3 p = position;
          // Gentle orbital drift so the field never feels frozen
          float t = uTime * 0.25 + aPhase;
          p.x += sin(t) * 0.14;
          p.y += cos(t * 0.9) * 0.12;
          p.z += sin(t * 0.7) * 0.14;

          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = uSize * aScale * (1.0 / max(-mv.z, 0.1));

          vColor = aColor;
          vTwinkle = 0.55 + 0.45 * sin(uTime * 1.6 + aPhase * 3.0);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vTwinkle;

        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float alpha = smoothstep(0.5, 0.0, d);
          alpha = pow(alpha, 2.4);
          gl_FragColor = vec4(vColor * (0.75 + vTwinkle * 0.6), alpha * vTwinkle * 0.9);
        }
      `
    });

    const particles = new THREE.Points(pGeo, pMat);
    world.add(particles);

    /* ------------------------------------------------------------------
     * 5. ORBITAL RINGS — tilted, glowing, slow precession
     * ---------------------------------------------------------------- */
    const rings: THREE.Mesh[] = [];
    const ringConfigs = [
      { r: 3.6, tilt: Math.PI / 2.1, color: '#60a5fa', opacity: 0.30, speed: 0.16 },
      { r: 4.3, tilt: Math.PI / 3.0, color: '#38bdf8', opacity: 0.20, speed: -0.11 },
      { r: 5.2, tilt: Math.PI / 1.7, color: '#2563eb', opacity: 0.14, speed: 0.07 }
    ];
    const ringGeos: THREE.TorusGeometry[] = [];
    const ringMats: THREE.MeshBasicMaterial[] = [];

    ringConfigs.forEach((cfg) => {
      const geo = new THREE.TorusGeometry(cfg.r, 0.006, 8, 180);
      const mat = new THREE.MeshBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: cfg.opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const ring = new THREE.Mesh(geo, mat);
      ring.rotation.x = cfg.tilt;
      rings.push(ring);
      ringGeos.push(geo);
      ringMats.push(mat);
      world.add(ring);
    });

    /* ------------------------------------------------------------------
     * INTERACTION — silky mouse parallax + scroll dolly
     * ---------------------------------------------------------------- */
    const pointer = { x: 0, y: 0 };
    const smooth = { x: 0, y: 0, z: 7.4 };

    const handlePointerMove = (e: PointerEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    let animationId = 0;
    const clock = new THREE.Clock();
    let isVisible = true;

    const observer = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
    }, { threshold: 0.05 });

    if (containerRef.current) observer.observe(containerRef.current);

    const render = () => {
      const elapsed = clock.getElapsedTime();
      const progress = progressRef.current;

      hazeMat.uniforms.uTime.value = elapsed;
      coreMat.uniforms.uTime.value = elapsed;
      pMat.uniforms.uTime.value = elapsed;

      core.rotation.y = elapsed * 0.10;
      core.rotation.x = Math.sin(elapsed * 0.15) * 0.18;

      shell.rotation.y = -elapsed * 0.07;
      shell.rotation.x = Math.cos(elapsed * 0.11) * 0.14;
      shellMat.opacity = 0.10 + Math.abs(Math.sin(elapsed * 0.4)) * 0.08;

      outerShell.rotation.y = elapsed * 0.035;
      outerShell.rotation.z = -elapsed * 0.02;

      particles.rotation.y = elapsed * 0.045;
      particles.rotation.x = Math.sin(elapsed * 0.08) * 0.08;

      rings.forEach((ring, i) => {
        const cfg = ringConfigs[i];
        ring.rotation.z = elapsed * cfg.speed;
        ring.rotation.y = Math.sin(elapsed * cfg.speed * 0.6) * 0.4;
        ringMats[i].opacity = cfg.opacity * (0.6 + Math.abs(Math.sin(elapsed * 0.5 + i)) * 0.6);
      });

      // Breathing scale keeps the whole composition alive
      const breathe = 1 + Math.sin(elapsed * 0.8) * 0.015;
      core.scale.setScalar(breathe);

      // Camera: parallax toward the cursor, dolly in as the section scrolls through
      const targetX = pointer.x * 0.85;
      const targetY = -pointer.y * 0.55;
      const targetZ = 8.0 - progress * 1.6;

      smooth.x += (targetX - smooth.x) * 0.045;
      smooth.y += (targetY - smooth.y) * 0.045;
      smooth.z += (targetZ - smooth.z) * 0.06;

      camera.position.set(smooth.x, smooth.y, smooth.z);
      camera.lookAt(0, 0, 0);

      world.rotation.z = progress * 0.25;

      renderer.render(scene, camera);
    };

    const animate = () => {
      if (isVisible) render();
      animationId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    if (reducedMotion) {
      render();
    } else {
      animate();
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      observer.disconnect();
      cancelAnimationFrame(animationId);
      hazeGeo.dispose();
      hazeMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      shellGeo.dispose();
      shellMat.dispose();
      outerShellGeo.dispose();
      outerShellMat.dispose();
      pGeo.dispose();
      pMat.dispose();
      ringGeos.forEach(g => g.dispose());
      ringMats.forEach(m => m.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative py-32 md:py-48 bg-[#050608] overflow-hidden">

      {/* TOP TRON BEAM */}
      <motion.div
        style={{ scaleX: beamScaleX }}
        className="absolute top-0 left-0 right-0 h-[1px] bg-blue-500 shadow-[0_0_10px_#2563eb] origin-left z-20"
      />

      {/* DEPTH LAYER: aurora wash behind the WebGL scene */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-1/3 left-1/2 -translate-x-1/2 w-[120vw] h-[80vh] bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.22),transparent_65%)] blur-3xl"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vh] bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.14),transparent_70%)] blur-3xl"></div>
      </div>

      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 z-[1] opacity-95 pointer-events-none transform-gpu scale-110 lg:scale-125 will-change-transform"
      />

      {/* DEPTH LAYER: fine grid gives the scene architectural scale */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none opacity-[0.16]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(56,189,248,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.35) 1px, transparent 1px)',
          backgroundSize: '90px 90px',
          maskImage: 'radial-gradient(ellipse at center, black 5%, transparent 62%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 5%, transparent 62%)'
        }}
      ></div>

      {/* VIGNETTE: keeps the copy razor sharp over the visuals */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,6,8,0.55)_55%,#050608_88%)] pointer-events-none z-[3]"></div>

      <div className="max-w-4xl mx-auto px-8 md:px-12 flex flex-col items-center relative z-10 text-center">
        <div className="h-1 w-20 bg-blue-600 mb-12 md:mb-16 rounded-full shadow-[0_0_24px_rgba(37,99,235,0.9)]"></div>
        <h2 className="font-syne text-[clamp(2rem,8vw,4.5rem)] text-white font-black tracking-tighter uppercase leading-[0.85] mb-8 md:mb-10 drop-shadow-[0_8px_40px_rgba(0,0,0,0.65)]">
          CRAFTED. <br/><span className="text-blue-600 italic drop-shadow-[0_0_35px_rgba(37,99,235,0.55)]">NOT COMPILED.</span>
        </h2>
        <p className="text-slate-300 text-lg md:text-2xl font-medium max-w-3xl leading-relaxed mb-16 opacity-90 drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
          Our builds aren't standard templates. We craft every detail with meticulous care, ensuring your site is fast, reliable, and perfectly tailored to your business needs.
        </p>
        <button
          onClick={() => navigateTo('contact')}
          className="px-16 py-8 bg-blue-600 text-white font-black text-[13px] uppercase tracking-[0.5em] rounded-full hover:bg-white hover:text-slate-950 transition-all duration-500 shadow-[0_20px_60px_rgba(37,99,235,0.45)] hover:scale-105 active:scale-95 transform-gpu ring-2 ring-blue-600/20"
        >
          Work with us
        </button>
      </div>

      {/* BOTTOM TRON BEAM */}
      <motion.div
        style={{ scaleX: beamScaleX }}
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-blue-500 shadow-[0_0_10px_#2563eb] origin-left z-20"
      />
    </section>
  );
};

export default DigitalForge;
