import React, { useEffect, useRef } from 'react';

export interface StatsStage {
  headline: React.ReactNode;
  count: number;
  suffix?: string;
  quote: React.ReactNode;
  body: React.ReactNode;
  legend: [string, string];
}

export const DEFAULT_STAGE_1: StatsStage = {
  headline: (
    <>
      The cost of being <span className="italic text-[#e5535a]">overlooked.</span>
    </>
  ),
  count: 88,
  quote: (
    <>
      &ldquo;<em className="italic text-[#e5535a]">88 of every 100</em> won&rsquo;t come back after a bad website experience.&rdquo;
    </>
  ),
  body: (
    <>
      First impressions are formed in milliseconds. When a website takes too long to load, feels cluttered, or breaks down on mobile, high-intent prospects don&rsquo;t wait around &mdash; they bounce straight to a competitor, taking their trust, their budget, and their loyalty with them for good.
    </>
  ),
  legend: ['88 Lost', '12 Retained'],
};

export const DEFAULT_STAGE_2: StatsStage = {
  headline: (
    <>
      The power of an <span className="text-shimmer-blue italic">amazing experience.</span>
    </>
  ),
  count: 77,
  suffix: '%',
  quote: (
    <>
      &ldquo;<em className="italic text-emerald-600">77% of customers</em> will return if your website is easy to navigate and has a captivating factor.&rdquo;
    </>
  ),
  body: (
    <>
      Speed, clarity, and effortless navigation build instant trust. When visitors can find exactly what they need within seconds, they linger longer, explore further, and convert into loyal, paying clients &mdash; turning a single visit into a lasting relationship.
    </>
  ),
  legend: ['77 Retained', '23 General'],
};

interface StatsSectionProps {
  stage1?: StatsStage;
  stage2?: StatsStage;
  footnote?: React.ReactNode;
}

interface StickParticle {
  ax: number;
  ay: number;
  bx: number;
  by: number;
  sx: number;
  sy: number;
  dx: number;
  dy: number;
  d: number;
  ph: number;
  sz: number;
}

interface AmbientParticle {
  x: number;
  y: number;
  r: number;
  v: number;
  ph: number;
}

/*
 * Layout rules that must not depend on Tailwind's output order or on JS running:
 *
 * - The sticky stage is exactly 100vh tall. On phones that is the *large* viewport
 *   (browser toolbars collapsed), which never changes while scrolling, so the canvas
 *   is never resized or rebuilt mid-scroll. (The old `h-[100vh] h-[100dvh]` pair
 *   resolved to whichever class Tailwind happened to emit last.)
 *
 * - The bottom copy is positioned so that it always clears the browser toolbar even
 *   while the toolbar is expanded: `100vh - 100svh` is exactly the toolbar height on
 *   phones, so the text is kept at least 56px above the visible bottom edge in every
 *   toolbar state. On desktop that term is 0 and the offsets are unchanged.
 *
 * - Which copy (88 or 77) is on screen is driven by one `data-stage` attribute on the
 *   stage. Stage 1 is visible by default, before any JavaScript runs.
 *
 * - On touch devices the shimmer on the stage-2 headline is frozen to a static
 *   gradient. The infinite `background-position` animation on a `background-clip:
 *   text` element forces iOS Safari to repaint that text on every frame inside the
 *   pinned stage, fighting the canvas for the main thread.
 */
const STATS_CSS = `
.stats-stage { height: 100vh; }
.stats-stage .stats-s1 {
  opacity: 1;
  transform: translate3d(0, 0, 0);
  transition: opacity 0.32s cubic-bezier(0.16, 1, 0.3, 1), transform 0.32s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: opacity, transform;
  pointer-events: none;
}
.stats-stage .stats-s2 {
  opacity: 0;
  transform: translate3d(0, 10px, 0);
  transition: opacity 0.32s cubic-bezier(0.16, 1, 0.3, 1), transform 0.32s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: opacity, transform;
  pointer-events: none;
}
.stats-stage[data-stage="2"] .stats-s1 {
  opacity: 0;
  transform: translate3d(0, -10px, 0);
  pointer-events: none;
}
.stats-stage[data-stage="2"] .stats-s2 {
  opacity: 1;
  transform: translate3d(0, 0, 0);
  pointer-events: none;
}
.stats-stage .stats-bottom {
  bottom: clamp(124px, 18vh, 164px);
}
@supports (height: 100svh) {
  .stats-stage .stats-bottom {
    bottom: max(clamp(124px, 18vh, 164px), calc(100vh - 100svh + 56px));
  }
}
@media (min-width: 640px) {
  .stats-stage .stats-bottom { bottom: 68px; }
}
@media (min-width: 768px) {
  .stats-stage .stats-bottom { bottom: 80px; }
}
@media (min-width: 1024px) {
  .stats-stage .stats-bottom { bottom: 92px; }
}
@media (hover: none) {
  .stats-stage .text-shimmer-blue,
  .stats-stage .text-shimmer-emerald {
    animation: none;
    will-change: auto;
    background-position: 150% center;
  }
}
`;

export const StatsSection: React.FC<StatsSectionProps> = ({
  stage1 = DEFAULT_STAGE_1,
  stage2 = DEFAULT_STAGE_2,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const t1Ref = useRef<HTMLDivElement>(null);
  const t2Ref = useRef<HTMLDivElement>(null);
  const q1Ref = useRef<HTMLDivElement>(null);
  const q2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    const cv = canvasRef.current;
    const fl = flashRef.current;
    const t1 = t1Ref.current;
    const t2 = t2Ref.current;
    const q1 = q1Ref.current;
    const q2 = q2Ref.current;

    if (!track || !stage || !cv || !fl || !t1 || !t2 || !q1 || !q2) {
      return;
    }

    // The stage is painted edge-to-edge white every frame, so the bitmap never
    // needs an alpha channel. An opaque canvas skips the per-frame blend with
    // the white stage behind it when the browser composites the page.
    const ctx = cv.getContext('2d', { alpha: false });
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let dpr = 1;
    let P: StickParticle[] = [];
    let N = 0;
    let cur = 0;
    let tgt = 0;
    let amb: AmbientParticle[] = [];
    let rafId = 0;
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    let lastT = 0;
    let lastDrawT = 0;
    let frame = 0;
    // Frames that must be drawn regardless of the idle frame-skip (trail settle, recovery).
    let forceDraw = 0;
    let wasMoving = false;
    let pendingRebuild = false;
    let disposed = false;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Particles are grouped into a few colour/alpha buckets so each frame issues a handful of
    // stroke() calls instead of one per figure.
    const BUCKETS = 10;
    let buckets: number[][] = [];
    // One reusable offscreen canvas for glyph sampling: iOS Safari has a hard budget for
    // total canvas memory per page, so we never allocate a fresh one per rebuild.
    const sampler = document.createElement('canvas');

    // Adaptive resolution: if a phone cannot push a frame in time, drop the canvas
    // pixel ratio (never the figure count or the look) until it can.
    let costEma = 0;
    let costSamples = 0;

    const clamp = (x: number) => Math.max(0, Math.min(1, x));
    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const phase = (p: number, s: number, w: number, d: number) =>
      ease(clamp(((p - s) / w) * 1.5 - d * 0.5));

    let lastBuildW = 0;
    let lastBuildH = 0;

    function sample(txt: string, yTop: number, yBot: number): [number, number][] {
      const o = sampler;
      const s = 0.5;
      o.width = Math.max(1, Math.floor(W * s));
      o.height = Math.max(1, Math.floor(H * s));
      const x = o.getContext('2d', { willReadFrequently: true } as CanvasRenderingContext2DSettings);

      const centerY = (yTop + yBot) * 0.5;
      const maxSpanY = Math.max(72, yBot - yTop);

      if (!x) return [[W / 2, centerY]];

      const isMobile = W < 700;
      // Size the glyph so its cap height comfortably fits inside maxSpanY with generous breathing room
      const fs = Math.min(isMobile ? W * 0.54 : W * 0.34, maxSpanY / 0.8) * s;
      x.clearRect(0, 0, o.width, o.height);
      x.fillStyle = '#fff';
      x.font = (isMobile ? '800 ' : '900 ') + fs + 'px Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
      x.textAlign = 'center';
      x.textBaseline = 'middle';
      x.fillText(txt, o.width / 2, centerY * s);

      const data = x.getImageData(0, 0, o.width, o.height).data;
      const gx = (isMobile ? 7.5 : 10.5) * s;
      const gy = (isMobile ? 12.5 : 17.5) * s;

      // Collect points row-by-row so we can prune grazing 1-figure tip rows on rounded glyphs like "88"
      const rows: [number, number][][] = [];
      for (let y = 0, row = 0; y < o.height; y += gy, row++) {
        const rowPts: [number, number][] = [];
        for (let xx = row % 2 ? gx / 2 : 0; xx < o.width; xx += gx) {
          const ix = Math.round(xx);
          const iy = Math.round(y);
          if (ix < o.width && iy < o.height && data[(iy * o.width + ix) * 4 + 3] > 128) {
            rowPts.push([xx / s, y / s]);
          }
        }
        if (rowPts.length > 0) {
          rows.push(rowPts);
        }
      }

      // Ensure the top and bottom caps of "88" have at least ~4 figures per digit (8 total across both digits)
      // instead of a single lone stick figure on the extreme tangent of the curve.
      const minCapPoints = txt === '88' ? 7 : 4;
      while (rows.length > 4 && rows[0].length < minCapPoints) {
        rows.shift();
      }
      while (rows.length > 4 && rows[rows.length - 1].length < minCapPoints) {
        rows.pop();
      }

      const pts: [number, number][] = [];
      let minY = Infinity;
      let maxY = -Infinity;
      for (let r = 0; r < rows.length; r++) {
        for (let c = 0; c < rows[r].length; c++) {
          const pt = rows[r][c];
          if (pt[1] < minY) minY = pt[1];
          if (pt[1] > maxY) maxY = pt[1];
          pts.push(pt);
        }
      }

      if (pts.length === 0) return [[W / 2, centerY]];

      // Mathematically guarantee that the sampled points fit strictly inside [yTop, yBot]
      // and are centered at centerY so overlap is impossible on any viewport or aspect ratio.
      const actualSpanY = Math.max(1, maxY - minY);
      const actualCenterY = (minY + maxY) * 0.5;
      const scale = actualSpanY > maxSpanY ? maxSpanY / actualSpanY : 1;
      const cx = W * 0.5;

      for (let i = 0; i < pts.length; i++) {
        pts[i][0] = cx + (pts[i][0] - cx) * scale;
        pts[i][1] = centerY + (pts[i][1] - actualCenterY) * scale;
      }

      for (let i = pts.length - 1; i > 0; i--) {
        const j = (Math.random() * (i + 1)) | 0;
        const tmp = pts[i];
        pts[i] = pts[j];
        pts[j] = tmp;
      }

      return pts;
    }

    function computeSafeBand(): [number, number] {
      if (!t1 || !t2 || !q1 || !q2) {
        return [H * 0.24, H * 0.56];
      }
      const isMobile = W < 700;
      const fhHalf = isMobile ? 6 : 10;
      // Generous padding above and below 88/77 so they never crowd the top title or bottom quote
      const padTop = fhHalf + Math.max(isMobile ? 32 : 48, H * (isMobile ? 0.042 : 0.055));
      const padBot = fhHalf + Math.max(isMobile ? 34 : 52, H * (isMobile ? 0.045 : 0.06));

      const t1Bottom = t1.offsetTop + t1.offsetHeight;
      const t2Bottom = t2.offsetTop + t2.offsetHeight;
      const measuredTitleBottom = Math.max(t1Bottom, t2Bottom, isMobile ? 118 : 162);

      const mobileBottomOffset = Math.max(128, Math.round(H * 0.18));
      const q1Top = q1.offsetTop > 0 ? q1.offsetTop : H - q1.offsetHeight - (isMobile ? mobileBottomOffset : 88);
      const q2Top = q2.offsetTop > 0 ? q2.offsetTop : H - q2.offsetHeight - (isMobile ? mobileBottomOffset : 88);
      const measuredQuoteTop = Math.min(q1Top, q2Top, H - (isMobile ? 245 : 210));

      const yTop = measuredTitleBottom + padTop;
      const yBot = Math.max(yTop + 72, measuredQuoteTop - padBot);
      return [yTop, yBot];
    }

    // Size the bitmap for the current pixel ratio and clear it to the stage's white.
    function applyCanvasSize() {
      if (!cv || !ctx) return;
      cv.width = Math.max(1, Math.round(W * dpr));
      cv.height = Math.max(1, Math.round(H * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, W, H);
    }

    function build() {
      if (!stage || !cv || !ctx) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      costEma = 0;
      costSamples = 0;
      W = stage.clientWidth || window.innerWidth;
      H = stage.clientHeight || window.innerHeight;
      lastBuildW = W;
      lastBuildH = H;
      applyCanvasSize();

      const [yTop, yBot] = computeSafeBand();
      const A = sample('88', yTop, yBot);
      const B = sample('77', yTop, yBot);
      N = Math.max(A.length, B.length);
      P = [];
      amb = [];

      const ambCount = W < 700 ? 60 : 120;
      for (let k = 0; k < ambCount; k++) {
        amb.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: 0.5 + Math.random() * 1.1,
          v: 0.032 + Math.random() * 0.14,
          ph: Math.random() * 6.283,
        });
      }

      const isMobile = W < 700;
      const centerY = (yTop + yBot) * 0.5;
      for (let i = 0; i < N; i++) {
        const a = A[i % A.length];
        const b = B[i % B.length];
        const ang = Math.random() * 6.283;
        const r = isMobile
          ? Math.min(W, H) * (0.12 + Math.random() * 0.14)
          : Math.max(W, H) * (0.35 + Math.random() * 0.35);
        P.push({
          ax: a[0],
          ay: a[1],
          bx: b[0],
          by: b[1],
          sx: W / 2 + Math.cos(ang) * r,
          sy: centerY + Math.sin(ang) * r,
          dx: (Math.random() - 0.25) * W * (isMobile ? 0.38 : 0.55),
          dy: -(Math.random() * H * (isMobile ? 0.34 : 0.46) + H * 0.07),
          d: Math.random(),
          ph: Math.random() * 6.283,
          sz: 1 + Math.random() * 1.6,
        });
      }

      buckets = Array.from({ length: BUCKETS }, () => [] as number[]);
      for (let i = 0; i < N; i++) {
        buckets[Math.min(BUCKETS - 1, Math.floor(P[i].d * BUCKETS))].push(i);
      }
    }

    let lastFlBg = '';
    let lastFlOp = '';
    // `dt` is the time since the previous drawn frame
    function draw(t: number, dt: number) {
      if (!ctx || !fl) return;
      const p = cur;
      const isMobile = W < 700;
      const shk = Math.sin(clamp((p - 0.35) / 0.2) * Math.PI);
      const shakeAmp = reduceMotion ? 0 : isMobile ? 1.0 : 2.5;
      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        Math.sin(cur * 720) * shk * shakeAmp * dpr,
        Math.cos(cur * 880) * shk * shakeAmp * dpr
      );

      // Clean motion-trail fade onto pure white canvas background
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
      ctx.fillStyle = isMobile ? 'rgba(255, 255, 255, 0.45)' : 'rgba(255, 255, 255, 0.32)';
      ctx.fillRect(-30, -30, W + 60, H + 60);

      // Colour: Crimson Red (88) -> Classic SABR Emerald Green (77)
      const isGreen = p >= 0.5;
      const hue = isGreen ? 160 : 358;
      const sat = isGreen ? 86 : 76;
      const lig = isGreen ? 35 : 42;

      const fh = isMobile ? 10.5 : 17.5;
      const u = fh / 20;

      ctx.lineWidth = Math.max(1, u * 1.1);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      for (let bi = 0; bi < buckets.length; bi++) {
        const bucket = buckets[bi];
        if (bucket.length === 0) continue;
        const bd = (bi + 0.5) / BUCKETS;
        const be2 = phase(p, 0.28, 0.22, bd);
        const be3 = phase(p, 0.52, 0.22, bd);
        ctx.globalAlpha = Math.max(0.2, 0.95 - 0.7 * be2 * (1 - be3));
        ctx.strokeStyle = 'hsl(' + hue + ',' + sat + '%,' + (lig + (bd - 0.5) * 28) + '%)';
        ctx.beginPath();

        for (let k = 0; k < bucket.length; k++) {
          const q = P[bucket[k]];
          // 88 is already assembled from p = 0 so the user immediately sees 88 the instant the section enters view
          const e1 = 1;
          const e2 = phase(p, 0.28, 0.22, q.d);
          const e3 = phase(p, 0.52, 0.22, q.d);
          const baseWob = isMobile ? 0.15 : 2.4;
          const burstWob = isMobile ? 4.5 : 8;
          const wob = Math.sin(t * 0.0006 + q.ph) * (baseWob + burstWob * e2 * (1 - e3));

          let x = lerp(q.sx, q.ax, e1) + q.dx * e2 + wob;
          let y = lerp(q.sy, q.ay, e1) + q.dy * e2 + Math.cos(t * 0.00048 + q.ph) * wob;
          x = lerp(x, q.bx, e3);
          y = lerp(y, q.by, e3);

          // Idle shimmer when assembled (very steady on mobile so 88 stays sharp)
          let calm = e1 * (1 - e2) + e3;
          calm = Math.min(1, calm);
          const calmAmp = isMobile ? 0.12 : 0.75;
          x += Math.sin(t * 0.0008 + q.ph) * calm * calmAmp;
          y += Math.cos(t * 0.0008 + q.ph) * calm * calmAmp;

          const mv = Math.max(e2 * (1 - e2), e3 * (1 - e3)) * 4;
          const sw = Math.sin(t * 0.0028 + q.ph) * ((isMobile ? 0.025 : 0.12) + (isMobile ? 0.55 : 0.88) * mv);
          const tp = y - fh / 2;

          ctx.moveTo(x + 2.1 * u, tp + 3.2 * u);
          ctx.arc(x, tp + 3.2 * u, 2.1 * u, 0, 6.283);
          ctx.moveTo(x, tp + 5.4 * u);
          ctx.lineTo(x, tp + 12 * u);
          ctx.moveTo(x - 2.8 * u - sw * 1.5 * u, tp + 10.2 * u);
          ctx.lineTo(x, tp + 7.2 * u);
          ctx.lineTo(x + 2.8 * u + sw * 1.5 * u, tp + 10.2 * u);
          ctx.moveTo(x - 1.6 * u + sw * 2.6 * u, tp + 18.6 * u);
          ctx.lineTo(x, tp + 12 * u);
          ctx.lineTo(x + 1.6 * u - sw * 2.6 * u, tp + 18.6 * u);
        }
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      ctx.fillStyle = 'hsl(' + hue + ',55%,40%)';
      const drift = Math.min(6, dt / 16.67);
      for (let j = 0; j < amb.length; j++) {
        const a = amb[j];
        a.y -= a.v * 0.5 * drift;
        if (a.y < -5) a.y = H + 5;
        ctx.globalAlpha = 0.09 + 0.07 * Math.sin(t * 0.0004 + a.ph);
        ctx.fillRect(a.x + Math.sin(t * 0.00025 + a.ph) * 8, a.y, a.r, a.r);
      }
      ctx.globalAlpha = 1;

      // The 4% colour wash is imperceptible on a phone screen, and every change to it is
      // another full-screen layer update for the browser to schedule while scrolling.
      if (isMobile) return;
      const fr = Math.max(0, 1 - Math.abs(p - 0.36) * 30);
      const fg = Math.max(0, 1 - Math.abs(p - 0.64) * 30);
      const flBg = fg > fr ? '#059669' : '#ff4d3d';
      const flOp = String(Math.round(Math.max(fr, fg) * 0.04 * 1000) / 1000);
      if (flBg !== lastFlBg) fl.style.background = lastFlBg = flBg;
      if (flOp !== lastFlOp) fl.style.opacity = lastFlOp = flOp;
    }

    // Which copy is on screen is one attribute on the stage, resolved by CSS. Stage 1 is
    // the default before any script runs. A small hysteresis stops the swap flickering
    // if the scroll position settles right on the midpoint.
    let shownStage = stage.dataset.stage === '2' ? 2 : 1;
    function ui(p: number) {
      if (!stage) return;
      const next = shownStage === 1 ? (p >= 0.505 ? 2 : 1) : p < 0.495 ? 1 : 2;
      if (next === shownStage) return;
      shownStage = next;
      stage.dataset.stage = String(next);
    }

    function prog(): boolean {
      if (!track || !stage) return false;
      const r = track.getBoundingClientRect();
      const vh = window.innerHeight || H || 800;
      // The stage stays pinned until the track's bottom meets the stage's bottom, so the
      // scrollable distance is track height minus *stage* height — not minus the window
      // height, which changes every time a phone's toolbar collapses or expands.
      const max = Math.max(1, track.offsetHeight - (stage.offsetHeight || H || vh));
      // Hold 88 steady as the section enters the screen (r.top > 0), then progress 0 -> 1 through the sticky track
      tgt = clamp(-r.top / max);
      // Active whenever the track is near or within view
      return r.bottom > -vh * 0.8 && r.top < vh * 2.0;
    }

    let inView = false;
    let observer: IntersectionObserver | null = null;

    function paintNow(t: number, times: number) {
      for (let w = 0; w < times; w++) draw(t, 16.67);
      lastDrawT = t;
    }

    function startLoop() {
      if (!rafId && !disposed) {
        lastT = performance.now();
        rafId = requestAnimationFrame(loop);
      }
    }

    function loop(t: number) {
      if (disposed) return;
      if (!inView && forceDraw <= 0) {
        rafId = 0;
        return;
      }
      // Re-arm first so a thrown exception in one frame can never stop the animation.
      rafId = requestAnimationFrame(loop);
      try {
        frame++;
        const isNear = prog();
        // Frame-rate independent smoothing
        const dt = lastT ? Math.min(100, t - lastT) : 16.67;
        lastT = t;

        if (!isNear) {
          cur = tgt;
          ui(cur);
          wasMoving = false;
          if (pendingRebuild) {
            pendingRebuild = false;
            build();
            paintNow(t, 2);
          }
          return;
        }

        const isMobile = W < 700;
        const isUpward = tgt < cur;
        const diff = Math.abs(tgt - cur);
        // Responsive, butter-smooth lerp step on all devices without stalling,
        // tuned specifically so scrolling upwards snaps immediately to the user's motion
        let base = isMobile ? 0.28 : 0.18;
        if (isUpward) {
          base = isMobile ? 0.48 : 0.36;
        }
        if (diff > 0.02) {
          base = Math.min(0.78, base + (diff - 0.02) * 3.2);
        }
        const step = 1 - Math.pow(1 - base, dt / 16.67);
        const moving = diff > 0.0002;
        if (moving) {
          cur += (tgt - cur) * step;
          if (Math.abs(tgt - cur) < 0.0004) cur = tgt;
        } else if (wasMoving) {
          forceDraw = Math.max(forceDraw, 6);
        }
        wasMoving = moving;
        ui(cur);

        if (forceDraw > 0) forceDraw--;

        const drawDt = lastDrawT ? Math.min(200, t - lastDrawT) : 16.67;
        lastDrawT = t;
        const t0 = performance.now();
        draw(t, drawDt);

        if (isMobile) {
          const cost = performance.now() - t0;
          costEma = costSamples === 0 ? cost : costEma * 0.9 + cost * 0.1;
          costSamples++;
          if (costSamples > 25 && costEma > 14 && dpr > 1) {
            dpr = 1;
            applyCanvasSize();
            paintNow(t, 2);
            costEma = 0;
            costSamples = 0;
          }
        }
      } catch {
        // Keep the loop alive; the next frame will try again.
      }
    }

    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!stage || disposed) return;
        const newW = stage.clientWidth || window.innerWidth;
        const newH = stage.clientHeight || window.innerHeight;
        // The stage is 100vh so phone toolbar changes never alter it; ignore any residual
        // sub-120px height jitter when the width hasn't changed.
        if (newW === lastBuildW && Math.abs(newH - lastBuildH) < 120) {
          return;
        }
        build();
        prog();
        paintNow(performance.now(), 2);
        ui(cur);
      }, 150);
    };

    // If the browser throws the canvas bitmap away (iOS does this under memory pressure,
    // and when a tab comes back from the background) paint it again straight away.
    const recover = () => {
      if (disposed) return;
      lastT = 0;
      forceDraw = Math.max(forceDraw, 3);
      if (inView) startLoop();
    };
    const onContextRestored = () => {
      if (disposed || !ctx) return;
      applyCanvasSize();
      prog();
      cur = tgt;
      paintNow(performance.now(), 2);
      ui(cur);
      recover();
    };
    const onVisibility = () => {
      if (!document.hidden) recover();
    };

    const onScroll = () => {
      const isNear = prog();
      if (isNear) {
        inView = true;
        startLoop();
      } else if (inView) {
        startLoop();
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    window.addEventListener('pageshow', recover);
    document.addEventListener('visibilitychange', onVisibility);
    cv.addEventListener('contextrestored', onContextRestored);

    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          inView = entry ? entry.isIntersecting : true;
          if (inView) {
            prog();
            startLoop();
          }
        },
        { rootMargin: '1000px 0px 1000px 0px' }
      );
      observer.observe(track);
    } else {
      inView = true;
    }

    // Always build: the animation is driven purely by the user's own scroll, so it still runs
    // with iOS "Reduce Motion" on (the camera shake is disabled in that case instead).
    build();
    prog();
    cur = tgt;
    // Pre-paint on mount so the canvas holds a crisp, fully opaque 88 before the user ever scrolls here
    paintNow(0, 2);
    ui(cur);
    if (inView) startLoop();

    // Re-sample once the Inter webfont is available (the font stylesheet loads async, so
    // fonts.ready alone can resolve too early). If the section is already on screen, defer
    // the rebuild until it is off screen so the figures never visibly jump.
    const fonts = (document as any).fonts;
    if (fonts?.load) {
      Promise.all([fonts.load('900 100px Inter'), fonts.load('800 100px Inter')])
        .then((faces: unknown[][]) => {
          if (disposed) return;
          if (!faces.some((f) => f && f.length)) return;
          if (prog()) {
            pendingRebuild = true;
            return;
          }
          build();
          paintNow(performance.now(), 2);
          ui(cur);
        })
        .catch(() => {});
    }

    return () => {
      disposed = true;
      if (observer) observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      window.removeEventListener('pageshow', recover);
      document.removeEventListener('visibilitychange', onVisibility);
      cv.removeEventListener('contextrestored', onContextRestored);
      if (resizeTimer) clearTimeout(resizeTimer);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section className="relative bg-white text-slate-900 pt-10 sm:pt-14 md:pt-20 pb-20 sm:pb-28 md:pb-36">
      <style>{STATS_CSS}</style>
      {/* 360vh Scroll Track (260vh scrollable distance = 2x longer / 50% slower to scroll than 130vh) */}
      <div ref={trackRef} className="relative h-[360vh] bg-white">
        {/* Sticky Stage — exactly 100vh (see STATS_CSS); no forced GPU layer: on iOS Safari a
            composited sticky layer can stop the canvas repainting until momentum scrolling ends */}
        <div
          ref={stageRef}
          data-stage="1"
          className="stats-stage sticky top-0 w-full overflow-hidden bg-white"
        >
          {/* Stick-Figure Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full block bg-white"
          />

          {/* Subtle Flash Overlay (desktop only; see draw()) */}
          <div
            ref={flashRef}
            className="absolute inset-0 pointer-events-none opacity-0 z-10"
          />

          {/* STAGE 1 TOP TITLE: Minimalistic, bold luxury serif, well below navbar and well above 88 */}
          <div
            ref={t1Ref}
            className="stats-s1 absolute left-0 right-0 top-[68px] sm:top-[92px] md:top-[102px] lg:top-[108px] px-5 sm:px-8 text-center max-w-5xl mx-auto pointer-events-none z-20"
          >
            <h2 className="font-serif text-[clamp(1.35rem,2.8vw,2.45rem)] font-semibold tracking-tight text-slate-900 leading-[1.12]">
              {stage1.headline}
            </h2>
          </div>

          {/* STAGE 2 TOP TITLE: Minimalistic, bold luxury serif with classic SABR Digital shimmer, well below navbar and well above 77 */}
          <div
            ref={t2Ref}
            className="stats-s2 absolute left-0 right-0 top-[68px] sm:top-[92px] md:top-[102px] lg:top-[108px] px-5 sm:px-8 text-center max-w-5xl mx-auto pointer-events-none z-20"
          >
            <h2 className="font-serif text-[clamp(1.35rem,2.8vw,2.45rem)] font-semibold tracking-tight text-slate-900 leading-[1.12]">
              {stage2.headline}
            </h2>
          </div>

          {/* STAGE 1 BOTTOM TEXT: offset from the bottom is set in STATS_CSS so it always clears the phone's browser toolbar */}
          <div
            ref={q1Ref}
            className="stats-s1 stats-bottom absolute left-0 right-0 px-5 sm:px-[6vw] text-center max-w-[820px] mx-auto pointer-events-none z-20"
          >
            <div className="font-serif text-[clamp(15px,1.85vw,23px)] leading-[1.32] font-normal text-slate-900 mb-2">
              {stage1.quote}
            </div>
            <p className="text-[11.5px] sm:text-xs md:text-[14px] text-slate-600 leading-relaxed max-w-2xl mx-auto">
              {stage1.body}
            </p>
          </div>

          {/* STAGE 2 BOTTOM TEXT: offset from the bottom is set in STATS_CSS so it always clears the phone's browser toolbar */}
          <div
            ref={q2Ref}
            className="stats-s2 stats-bottom absolute left-0 right-0 px-5 sm:px-[6vw] text-center max-w-[820px] mx-auto pointer-events-none z-20"
          >
            <div className="font-serif text-[clamp(15px,1.85vw,23px)] leading-[1.32] font-normal text-slate-900 mb-2">
              {stage2.quote}
            </div>
            <p className="text-[11.5px] sm:text-xs md:text-[14px] text-slate-600 leading-relaxed max-w-2xl mx-auto">
              {stage2.body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
