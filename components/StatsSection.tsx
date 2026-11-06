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

    let lastBuildW = 0;
    let lastBuildH = 0;

    function sample(txt: string, yTop: number, yBot: number): [number, number][] {
      const o = document.createElement('canvas');
      const s = 0.5;
      o.width = Math.max(1, Math.floor(W * s));
      o.height = Math.max(1, Math.floor(H * s));
      const x = o.getContext('2d');

      const centerY = (yTop + yBot) * 0.5;
      const maxSpanY = Math.max(72, yBot - yTop);

      if (!x) return [[W / 2, centerY]];

      const isMobile = W < 700;
      // Size the glyph so its cap height comfortably fits inside maxSpanY with generous breathing room
      const fs = Math.min(isMobile ? W * 0.54 : W * 0.34, maxSpanY / 0.8) * s;
      x.fillStyle = '#fff';
      x.font = (isMobile ? '800 ' : '900 ') + fs + 'px Inter,Arial,sans-serif';
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

    function build() {
      if (!stage || !cv || !ctx) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = stage.clientWidth || window.innerWidth;
      H = stage.clientHeight || window.innerHeight;
      lastBuildW = W;
      lastBuildH = H;
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, W, H);

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
    }

    function draw(t: number) {
      if (!ctx || !fl) return;
      const p = cur;
      const isMobile = W < 700;
      const shk = Math.sin(clamp((p - 0.35) / 0.2) * Math.PI);
      const shakeAmp = isMobile ? 1.0 : 2.5;
      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        Math.sin(cur * 720) * shk * shakeAmp * dpr,
        Math.cos(cur * 880) * shk * shakeAmp * dpr
      );

      // Motion-trail fade onto pure white canvas background
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = isMobile ? 'rgba(255, 255, 255, 0.55)' : 'rgba(255, 255, 255, 0.34)';
      ctx.fillRect(-30, -30, W + 60, H + 60);

      // Colour: Crimson Red (88) -> Classic SABR Emerald Green (77)
      const isGreen = p >= 0.5;
      const hue = isGreen ? 160 : 358;
      const sat = isGreen ? 86 : 76;
      const lig = isGreen ? 35 : 42;

      const fh = isMobile ? 10.5 : 17.5;
      const u = fh / 20;

      for (let i = 0; i < N; i++) {
        const q = P[i];
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

        const al = 0.95 - 0.7 * e2 * (1 - e3);
        ctx.globalAlpha = al;

        const mv = Math.max(e2 * (1 - e2), e3 * (1 - e3)) * 4;
        const sw = Math.sin(t * 0.0028 + q.ph) * ((isMobile ? 0.025 : 0.12) + (isMobile ? 0.55 : 0.88) * mv);
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
        a.y -= a.v * 0.5;
        if (a.y < -5) a.y = H + 5;
        ctx.globalAlpha = 0.09 + 0.07 * Math.sin(t * 0.0004 + a.ph);
        ctx.fillRect(a.x + Math.sin(t * 0.00025 + a.ph) * 8, a.y, a.r, a.r);
      }
      ctx.globalAlpha = 1;

      const fr = Math.max(0, 1 - Math.abs(p - 0.36) * 30);
      const fg = Math.max(0, 1 - Math.abs(p - 0.64) * 30);
      fl.style.background = fg > fr ? '#059669' : '#ff4d3d';
      fl.style.opacity = String(Math.max(fr, fg) * 0.04);
    }

    function ui(p: number) {
      if (!t1 || !t2 || !q1 || !q2) return;
      // Seamless handoff between Stage 1 (88) and Stage 2 (77) with no long blank gap
      const showStage1 = p < 0.46;
      const showStage2 = p >= 0.54;

      t1.style.opacity = showStage1 ? '1' : '0';
      t1.style.transform = showStage1 ? 'translate3d(0,0,0)' : 'translate3d(0,-10px,0)';
      q1.style.opacity = showStage1 ? '1' : '0';
      q1.style.transform = showStage1 ? 'translate3d(0,0,0)' : 'translate3d(0,12px,0)';

      t2.style.opacity = showStage2 ? '1' : '0';
      t2.style.transform = showStage2 ? 'translate3d(0,0,0)' : 'translate3d(0,-10px,0)';
      q2.style.opacity = showStage2 ? '1' : '0';
      q2.style.transform = showStage2 ? 'translate3d(0,0,0)' : 'translate3d(0,12px,0)';
    }

    function prog(): boolean {
      if (!track) return false;
      const r = track.getBoundingClientRect();
      const vh = window.innerHeight || H || 800;
      const max = Math.max(1, track.offsetHeight - vh);
      // Hold 88 steady as the section enters the screen (r.top > 0), then progress 0 -> 1 through the sticky track
      tgt = clamp(-r.top / max);
      // Active whenever the track is within 1.5 viewports of the screen
      return r.bottom > -vh * 0.5 && r.top < vh * 1.8;
    }

    function loop(t: number) {
      // Read scroll position directly inside rAF so iOS Safari momentum scrolling never defers updates
      const isNear = prog();
      if (isNear) {
        const isMobile = W < 700;
        const step = isMobile ? 0.11 : 0.055;
        cur += (tgt - cur) * step;
        if (Math.abs(tgt - cur) < 0.0001) cur = tgt;
        draw(t);
        ui(cur);
      } else {
        cur = tgt;
      }
      rafId = requestAnimationFrame(loop);
    }

    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!stage) return;
        const newW = stage.clientWidth || window.innerWidth;
        const newH = stage.clientHeight || window.innerHeight;
        // Ignore minor mobile address-bar height changes (< 120px) when width hasn't changed
        if (newW === lastBuildW && Math.abs(newH - lastBuildH) < 120) {
          return;
        }
        build();
        prog();
        for (let w = 0; w < 4; w++) {
          draw(performance.now());
        }
        ui(cur);
      }, 150);
    };

    window.addEventListener('scroll', prog, { passive: true });
    window.addEventListener('resize', handleResize);

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      build();
      prog();
      cur = tgt;
      // Pre-paint 6 frames on mount so the canvas has a crisp, fully opaque 88 before the user ever scrolls here
      for (let w = 0; w < 6; w++) {
        draw(0);
      }
      ui(cur);
      rafId = requestAnimationFrame(loop);

      if ((document as any).fonts?.ready) {
        (document as any).fonts.ready.then(() => {
          build();
          prog();
          for (let w = 0; w < 6; w++) {
            draw(performance.now());
          }
          ui(cur);
        });
      }
    }

    return () => {
      window.removeEventListener('scroll', prog);
      window.removeEventListener('resize', handleResize);
      if (resizeTimer) clearTimeout(resizeTimer);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section className="relative bg-white text-slate-900 pt-10 sm:pt-14 md:pt-20 pb-20 sm:pb-28 md:pb-36">
      {/* 360vh Scroll Track (260vh scrollable distance = 2x longer / 50% slower to scroll than 130vh) */}
      <div ref={trackRef} className="relative h-[360vh] bg-white">
        {/* Sticky Stage — GPU-promoted so iOS Safari composites it immediately during momentum scroll */}
        <div
          ref={stageRef}
          className="sticky top-0 h-[100vh] h-[100dvh] w-full overflow-hidden bg-white transform-gpu"
          style={{ WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' }}
        >
          {/* Stick-Figure Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full block transform-gpu"
          />

          {/* Subtle Flash Overlay */}
          <div
            ref={flashRef}
            className="absolute inset-0 pointer-events-none opacity-0 z-10"
          />

          {/* STAGE 1 TOP TITLE: Minimalistic, bold luxury serif, well below navbar and well above 88 */}
          <div
            ref={t1Ref}
            className="absolute left-0 right-0 top-[68px] sm:top-[92px] md:top-[102px] lg:top-[108px] px-5 sm:px-8 text-center max-w-5xl mx-auto opacity-100 translate-y-0 transition-opacity duration-300 pointer-events-none z-20 transform-gpu"
          >
            <h2 className="font-serif text-[clamp(1.35rem,2.8vw,2.45rem)] font-semibold tracking-tight text-slate-900 leading-[1.12]">
              {stage1.headline}
            </h2>
          </div>

          {/* STAGE 2 TOP TITLE: Minimalistic, bold luxury serif with classic SABR Digital shimmer, well below navbar and well above 77 */}
          <div
            ref={t2Ref}
            className="absolute left-0 right-0 top-[68px] sm:top-[92px] md:top-[102px] lg:top-[108px] px-5 sm:px-8 text-center max-w-5xl mx-auto opacity-0 pointer-events-none transition-opacity duration-300 z-20 transform-gpu"
          >
            <h2 className="font-serif text-[clamp(1.35rem,2.8vw,2.45rem)] font-semibold tracking-tight text-slate-900 leading-[1.12]">
              {stage2.headline}
            </h2>
          </div>

          {/* STAGE 1 BOTTOM TEXT: Raised ~15% higher on mobile so the full paragraph clears the iPhone Safari bottom bar */}
          <div
            ref={q1Ref}
            className="absolute left-0 right-0 bottom-[clamp(124px,18vh,164px)] sm:bottom-[68px] md:bottom-[80px] lg:bottom-[92px] px-5 sm:px-[6vw] text-center max-w-[820px] mx-auto opacity-100 translate-y-0 transition-opacity duration-300 pointer-events-none z-20 transform-gpu"
          >
            <div className="font-serif text-[clamp(15px,1.85vw,23px)] leading-[1.32] font-normal text-slate-900 mb-2">
              {stage1.quote}
            </div>
            <p className="text-[11.5px] sm:text-xs md:text-[14px] text-slate-600 leading-relaxed max-w-2xl mx-auto">
              {stage1.body}
            </p>
          </div>

          {/* STAGE 2 BOTTOM TEXT: Raised ~15% higher on mobile so the full paragraph clears the iPhone Safari bottom bar */}
          <div
            ref={q2Ref}
            className="absolute left-0 right-0 bottom-[clamp(124px,18vh,164px)] sm:bottom-[68px] md:bottom-[80px] lg:bottom-[92px] px-5 sm:px-[6vw] text-center max-w-[820px] mx-auto opacity-0 pointer-events-none transition-opacity duration-300 z-20 transform-gpu"
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
