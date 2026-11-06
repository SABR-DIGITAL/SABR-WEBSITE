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

    const ctx = cv.getContext('2d');
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let dpr = 1;
    let P: StickParticle[] = [];
    let N = 0;
    let shown = true;
    let cur = 0;
    let tgt = 0;
    let amb: AmbientParticle[] = [];
    let rafId = 0;
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;

    const clamp = (x: number) => Math.max(0, Math.min(1, x));
    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const phase = (p: number, s: number, w: number, d: number) =>
      ease(clamp(((p - s) / w) * 1.5 - d * 0.5));

    function sample(txt: string): [number, number][] {
      const o = document.createElement('canvas');
      const s = 0.5;
      o.width = Math.max(1, Math.floor(W * s));
      o.height = Math.max(1, Math.floor(H * s));
      const x = o.getContext('2d');

      // Strictly bounded vertical safe zone between the top title and bottom text
      const yTop = Math.max(170, H * 0.23);
      const yBot = Math.min(H - 190, H * 0.63);
      const centerY = (yTop + yBot) * 0.5;
      const safeHeight = Math.max(130, yBot - yTop - 36);

      if (!x) return [[W / 2, centerY]];

      const fs = Math.min(W * 0.42, safeHeight / 0.74) * s;
      x.fillStyle = '#fff';
      x.font = '900 ' + fs + 'px Inter,Arial Black,Arial,sans-serif';
      x.textAlign = 'center';
      x.textBaseline = 'middle';
      x.fillText(txt, o.width / 2, centerY * s);

      const data = x.getImageData(0, 0, o.width, o.height).data;
      const gx = (W < 700 ? 7.2 : 10.5) * s;
      const gy = (W < 700 ? 12 : 17.5) * s;

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
      for (let r = 0; r < rows.length; r++) {
        for (let c = 0; c < rows[r].length; c++) {
          pts.push(rows[r][c]);
        }
      }

      for (let i = pts.length - 1; i > 0; i--) {
        const j = (Math.random() * (i + 1)) | 0;
        const tmp = pts[i];
        pts[i] = pts[j];
        pts[j] = tmp;
      }

      return pts.length > 0 ? pts : [[W / 2, centerY]];
    }

    function build() {
      if (!stage || !cv || !ctx) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = stage.clientWidth || window.innerWidth;
      H = stage.clientHeight || window.innerHeight;
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, W, H);

      const A = sample('88');
      const B = sample('77');
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

      for (let i = 0; i < N; i++) {
        const a = A[i % A.length];
        const b = B[i % B.length];
        const ang = Math.random() * 6.283;
        const r = Math.max(W, H) * (0.5 + Math.random() * 0.5);
        P.push({
          ax: a[0],
          ay: a[1],
          bx: b[0],
          by: b[1],
          sx: W / 2 + Math.cos(ang) * r,
          sy: H / 2 + Math.sin(ang) * r,
          dx: (Math.random() - 0.25) * W * 0.55,
          dy: -(Math.random() * H * 0.5 + H * 0.08),
          d: Math.random(),
          ph: Math.random() * 6.283,
          sz: 1 + Math.random() * 1.6,
        });
      }
    }

    function draw(t: number) {
      if (!ctx || !fl) return;
      const p = cur;
      const shk = Math.sin(clamp((p - 0.35) / 0.2) * Math.PI);
      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        Math.sin(cur * 720) * shk * 2.5 * dpr,
        Math.cos(cur * 880) * shk * 2.5 * dpr
      );

      // Motion-trail fade onto pure white canvas background
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.32)';
      ctx.fillRect(-30, -30, W + 60, H + 60);

      // Colour: Crimson Red (88) -> Classic SABR Emerald Green (77)
      const isGreen = p >= 0.5;
      const hue = isGreen ? 160 : 358;
      const sat = isGreen ? 86 : 76;
      const lig = isGreen ? 35 : 42;

      const fh = W < 700 ? 11.5 : 18;
      const u = fh / 20;

      for (let i = 0; i < N; i++) {
        const q = P[i];
        // Slowed phases by ~20% for smoother, unhurried transitions
        const e1 = phase(p, 0.01, 0.16, q.d);
        const e2 = phase(p, 0.36, 0.17, q.d);
        const e3 = phase(p, 0.53, 0.17, q.d);
        const wob = Math.sin(t * 0.0012 + q.ph) * (3 + 8 * e2 * (1 - e3));

        let x = lerp(q.sx, q.ax, e1) + q.dx * e2 + wob;
        let y = lerp(q.sy, q.ay, e1) + q.dy * e2 + Math.cos(t * 0.00096 + q.ph) * wob;
        x = lerp(x, q.bx, e3);
        y = lerp(y, q.by, e3);

        // Idle shimmer when assembled (20% slower)
        let calm = e1 * (1 - e2) + e3;
        calm = Math.min(1, calm);
        x += Math.sin(t * 0.0016 + q.ph) * calm * 0.8;
        y += Math.cos(t * 0.0016 + q.ph) * calm * 0.8;

        let al = 0.95 - 0.7 * e2 * (1 - e3);
        if (e1 < 1) al *= 0.35 + 0.65 * e1;
        ctx.globalAlpha = al;

        const mv = Math.max(e1 * (1 - e1), e2 * (1 - e2), e3 * (1 - e3)) * 4;
        const sw = Math.sin(t * 0.0056 + q.ph) * (0.12 + 0.88 * mv);
        const tp = y - fh / 2;

        ctx.strokeStyle = 'hsl(' + hue + ',' + sat + '%,' + (lig + (q.d - 0.5) * 28) + '%)';
        ctx.lineWidth = Math.max(1, u * 1.1);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        ctx.beginPath();
        ctx.arc(x, tp + 3.2 * u, 2.1 * u, 0, 6.283);
        ctx.moveTo(x, tp + 5.4 * u);
        ctx.lineTo(x, tp + 12 * u);
        ctx.moveTo(x - 2.8 * u - sw * 1.5 * u, tp + 10.2 * u);
        ctx.lineTo(x, tp + 7.2 * u);
        ctx.lineTo(x + 2.8 * u + sw * 1.5 * u, tp + 10.2 * u);
        ctx.moveTo(x - 1.6 * u + sw * 2.6 * u, tp + 18.6 * u);
        ctx.lineTo(x, tp + 12 * u);
        ctx.lineTo(x + 1.6 * u - sw * 2.6 * u, tp + 18.6 * u);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      ctx.fillStyle = 'hsl(' + hue + ',55%,40%)';
      for (let j = 0; j < amb.length; j++) {
        const a = amb[j];
        a.y -= a.v;
        if (a.y < -5) a.y = H + 5;
        ctx.globalAlpha = 0.09 + 0.07 * Math.sin(t * 0.0008 + a.ph);
        ctx.fillRect(a.x + Math.sin(t * 0.0005 + a.ph) * 8, a.y, a.r, a.r);
      }
      ctx.globalAlpha = 1;

      const fr = Math.max(0, 1 - Math.abs(p - 0.39) * 30);
      const fg = Math.max(0, 1 - Math.abs(p - 0.68) * 30);
      fl.style.background = fg > fr ? '#059669' : '#ff4d3d';
      fl.style.opacity = String(Math.max(fr, fg) * 0.04);
    }

    function ui(p: number) {
      if (!t1 || !t2 || !q1 || !q2) return;
      // Visible immediately at top of section so there is no empty gap when entering
      const showStage1 = p >= 0.04 && p < 0.45;
      const showStage2 = p > 0.64;

      t1.style.opacity = showStage1 ? '1' : '0';
      t1.style.transform = showStage1 ? 'translateY(0px)' : 'translateY(-10px)';
      q1.style.opacity = showStage1 ? '1' : '0';
      q1.style.transform = showStage1 ? 'translateY(0px)' : 'translateY(12px)';

      t2.style.opacity = showStage2 ? '1' : '0';
      t2.style.transform = showStage2 ? 'translateY(0px)' : 'translateY(-10px)';
      q2.style.opacity = showStage2 ? '1' : '0';
      q2.style.transform = showStage2 ? 'translateY(0px)' : 'translateY(12px)';
    }

    function prog() {
      if (!track) return;
      const r = track.getBoundingClientRect();
      const max = Math.max(1, track.offsetHeight - window.innerHeight);
      // Begin assembling 88 while scrolling into the section so there is no empty top gap
      const lead = window.innerHeight * 0.45;
      tgt = clamp((lead - r.top) / (max + lead * 0.6));
    }

    function loop(t: number) {
      if (shown) {
        // Slowed interpolation by ~20% (from 0.09 to 0.072)
        cur += (tgt - cur) * 0.072;
        if (Math.abs(tgt - cur) < 0.0002) cur = tgt;
        draw(t);
        ui(cur);
      }
      rafId = requestAnimationFrame(loop);
    }

    let observer: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries) => {
        if (entries[0]) {
          shown = entries[0].isIntersecting;
        }
      });
      observer.observe(stage);
    }

    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        build();
        prog();
      }, 150);
    };

    window.addEventListener('scroll', prog, { passive: true });
    window.addEventListener('resize', handleResize);

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      build();
      prog();
      cur = tgt;
      rafId = requestAnimationFrame(loop);
    }

    return () => {
      window.removeEventListener('scroll', prog);
      window.removeEventListener('resize', handleResize);
      if (resizeTimer) clearTimeout(resizeTimer);
      if (observer) observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section className="relative bg-white text-slate-900 -mt-4 -mb-10 sm:-mb-14">
      {/* Compact 230vh Scroll Track */}
      <div ref={trackRef} className="relative h-[230vh] bg-white">
        {/* Sticky Stage */}
        <div
          ref={stageRef}
          className="sticky top-0 h-[100vh] h-[100dvh] w-full overflow-hidden bg-white"
        >
          {/* Stick-Figure Canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

          {/* Subtle Flash Overlay */}
          <div
            ref={flashRef}
            className="absolute inset-0 pointer-events-none opacity-0 z-10"
          />

          {/* STAGE 1 TOP TITLE: Minimalistic, bold luxury serif, well below navbar and well above 88 */}
          <div
            ref={t1Ref}
            className="absolute left-0 right-0 top-[102px] sm:top-[112px] md:top-[118px] px-5 sm:px-8 text-center max-w-4xl mx-auto opacity-0 -translate-y-2.5 transition-all duration-700 pointer-events-none z-20"
          >
            <h2 className="font-serif text-[clamp(1.55rem,3.4vw,2.85rem)] font-semibold tracking-tight text-slate-900 leading-[1.1]">
              {stage1.headline}
            </h2>
          </div>

          {/* STAGE 2 TOP TITLE: Minimalistic, bold luxury serif with classic SABR Digital shimmer, well below navbar and well above 77 */}
          <div
            ref={t2Ref}
            className="absolute left-0 right-0 top-[102px] sm:top-[112px] md:top-[118px] px-5 sm:px-8 text-center max-w-4xl mx-auto opacity-0 -translate-y-2.5 transition-all duration-700 pointer-events-none z-20"
          >
            <h2 className="font-serif text-[clamp(1.55rem,3.4vw,2.85rem)] font-semibold tracking-tight text-slate-900 leading-[1.1]">
              {stage2.headline}
            </h2>
          </div>

          {/* STAGE 1 BOTTOM TEXT: Positioned below 88 with zero overlap */}
          <div
            ref={q1Ref}
            className="absolute left-0 right-0 top-[65%] sm:top-[66%] px-5 sm:px-[6vw] text-center max-w-[820px] mx-auto opacity-0 translate-y-3 transition-all duration-700 pointer-events-none z-20"
          >
            <div className="font-serif text-[clamp(17px,2.1vw,26px)] leading-[1.35] font-normal text-slate-900 mb-2.5">
              {stage1.quote}
            </div>
            <p className="text-xs sm:text-sm md:text-[15px] text-slate-600 leading-relaxed max-w-2xl mx-auto">
              {stage1.body}
            </p>
          </div>

          {/* STAGE 2 BOTTOM TEXT: Positioned below 77 with zero overlap */}
          <div
            ref={q2Ref}
            className="absolute left-0 right-0 top-[65%] sm:top-[66%] px-5 sm:px-[6vw] text-center max-w-[820px] mx-auto opacity-0 translate-y-3 transition-all duration-700 pointer-events-none z-20"
          >
            <div className="font-serif text-[clamp(17px,2.1vw,26px)] leading-[1.35] font-normal text-slate-900 mb-2.5">
              {stage2.quote}
            </div>
            <p className="text-xs sm:text-sm md:text-[15px] text-slate-600 leading-relaxed max-w-2xl mx-auto">
              {stage2.body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
