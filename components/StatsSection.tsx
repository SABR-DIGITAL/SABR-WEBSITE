import React, { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// The grid gets its own compositor layer and paint containment, so the dot
// animation repaints only this small area. The padding (offset by a negative
// margin) leaves room for the glows so they are not clipped at the edges.
const DOT_GRID_CLASS =
  'grid grid-cols-10 gap-1.5 sm:gap-2 md:gap-2.5 place-items-center p-2.5 -m-2.5 sm:p-3 sm:-m-3 [contain:layout_paint] will-change-transform';

interface DotProps {
  className: string;
  fill: string;
  glow: string;
  fillOn: boolean;
  glowOn: boolean;
  scale: number;
  opacity: number;
}

// A white base with a coloured fill and a soft glow stacked on top. Animating
// the opacity of those layers looks the same as tweening background-color and
// box-shadow, but costs far less to draw.
const Dot: React.FC<DotProps> = ({ className, fill, glow, fillOn, glowOn, scale, opacity }) => (
  <span
    className={`${className} relative block w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4`}
    style={{ transform: `scale(${scale})`, opacity }}
  >
    <span
      className="dot-glow absolute -inset-1.5 sm:-inset-2.5 rounded-full pointer-events-none"
      style={{ background: `radial-gradient(circle, ${glow} 30%, transparent 70%)`, opacity: glowOn ? 1 : 0 }}
    />
    <span className="absolute inset-0 rounded-full bg-white" />
    <span
      className="dot-fill absolute inset-0 rounded-full"
      style={{ backgroundColor: fill, opacity: fillOn ? 1 : 0 }}
    />
  </span>
);

export const StatsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stage1Ref = useRef<HTMLDivElement>(null);
  const stage2Ref = useRef<HTMLDivElement>(null);
  const dots1Ref = useRef<HTMLDivElement>(null);
  const dots2Ref = useRef<HTMLDivElement>(null);

  const activeStageRef = useRef<1 | 2>(1);

  // The counters are written straight to the DOM. Driving them through React
  // state re-rendered this whole section, all 200 dots included, on every
  // animation frame, which was the main source of lag here.
  const count1Ref = useRef<HTMLSpanElement>(null);
  const count2Ref = useRef<HTMLSpanElement>(null);

  const hasPlayed1Ref = useRef(false);
  const hasPlayed2Ref = useRef(false);

  // Running dot timelines, killed before a replay so overlapping runs never
  // fight over the same dots.
  const dotsTl1Ref = useRef<gsap.core.Timeline | null>(null);
  const dotsTl2Ref = useRef<gsap.core.Timeline | null>(null);

  // STAGE 1 ANIMATION: Counts up to 88, turns 88 dots RED, 12 remain WHITE.
  // Only transform and opacity are tweened. Colour changes are cross-fades of a
  // pre-coloured fill layer and glows are pre-drawn gradients, so nothing
  // expensive (box-shadow blur, background-color) is repainted per frame.
  const runStage1Animation = useCallback(() => {
    const root = dots1Ref.current;
    if (!root) return;
    const dots: HTMLElement[] = Array.prototype.slice.call(root.querySelectorAll<HTMLElement>('.customer-dot-1'));
    const lost = dots.slice(0, 88);
    const retained = dots.slice(88);
    const fills = (els: HTMLElement[]) => els.map((d) => d.querySelector('.dot-fill'));
    const glows = (els: HTMLElement[]) => els.map((d) => d.querySelector('.dot-glow'));

    dotsTl1Ref.current?.kill();
    gsap.set(dots, { scale: 1, force3D: false });
    gsap.set(fills(lost), { opacity: 0 });
    gsap.set(retained, { scale: 1.15 });
    gsap.set(glows(retained), { opacity: 0.85 });

    const counterProxy = { count: 0 };
    const tl = gsap.timeline({ defaults: { force3D: false } });
    dotsTl1Ref.current = tl;

    tl.to(counterProxy, {
      count: 88,
      duration: 1.4,
      ease: 'power2.out',
      onUpdate: () => {
        if (count1Ref.current) count1Ref.current.textContent = String(Math.round(counterProxy.count));
      }
    });

    const stagger = { each: 0.014, from: 'start' as const, ease: 'power1.out' };
    tl.to(fills(lost), { opacity: 1, duration: 0.35, stagger }, 0.05)
      .to(lost, { scale: 0.85, duration: 0.35, stagger }, 0.05);

    tl.to(retained, { scale: 1.25, duration: 0.35, stagger: 0.025, ease: 'back.out(2)' }, '-=0.5')
      .to(glows(retained), { opacity: 1, duration: 0.35, stagger: 0.025 }, '<')
      .to(retained, { scale: 1.15, duration: 0.25 });
  }, []);

  // STAGE 2 ANIMATION: Counts up to 77, turns 77 dots radiant GREEN, 23 remain neutral WHITE
  const runStage2Animation = useCallback(() => {
    const root = dots2Ref.current;
    if (!root) return;
    const dots: HTMLElement[] = Array.prototype.slice.call(root.querySelectorAll<HTMLElement>('.customer-dot-2'));
    const returning = dots.slice(0, 77);
    const others = dots.slice(77);
    const fills = returning.map((d) => d.querySelector('.dot-fill'));
    const glows = returning.map((d) => d.querySelector('.dot-glow'));

    dotsTl2Ref.current?.kill();
    gsap.set(dots, { opacity: 0.8, scale: 0.9, force3D: false });
    gsap.set([...fills, ...glows], { opacity: 0 });

    const counterProxy = { count: 0 };
    const tl = gsap.timeline({ defaults: { force3D: false } });
    dotsTl2Ref.current = tl;

    tl.to(counterProxy, {
      count: 77,
      duration: 1.4,
      ease: 'power2.out',
      onUpdate: () => {
        if (count2Ref.current) count2Ref.current.textContent = `${Math.round(counterProxy.count)}%`;
      }
    });

    const stagger = { each: 0.014, from: 'start' as const, ease: 'power1.out' };
    tl.to(returning, { scale: 1.15, opacity: 1, duration: 0.35, stagger }, 0.05)
      .to(fills, { opacity: 1, duration: 0.35, stagger }, 0.05)
      .to(glows, { opacity: 1, duration: 0.35, stagger }, 0.05);

    tl.to(others, { opacity: 0.5, duration: 0.3 }, 0.1);
  }, []);

  // SEQUENTIAL CROSS-FADE: Stage 1 fades fully out, THEN stage 2 fades in — no overlap, no jump
  const transitionTo = useCallback((targetStage: 1 | 2) => {
    // No "already transitioning" lock: if the visitor scrolls back mid-fade,
    // the running tweens are killed and the fade reverses from where it is,
    // instead of being ignored and leaving the wrong stage on screen.
    if (activeStageRef.current === targetStage) return;
    activeStageRef.current = targetStage;

    const outEl = targetStage === 2 ? stage1Ref.current : stage2Ref.current;
    const inEl = targetStage === 2 ? stage2Ref.current : stage1Ref.current;
    const runInAnimation = targetStage === 2 ? runStage2Animation : runStage1Animation;

    gsap.killTweensOf([stage1Ref.current, stage2Ref.current]);

    const tl = gsap.timeline();

    tl.to(outEl, {
      opacity: 0,
      duration: 0.4,
      ease: 'power1.inOut',
      pointerEvents: 'none'
    }).set(inEl, { pointerEvents: 'auto' }, '>').to(
      inEl,
      {
        opacity: 1,
        duration: 0.45,
        ease: 'power1.out',
        onStart: runInAnimation
      },
      '>'
    );
  }, [runStage1Animation, runStage2Animation]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // 1. Initial trigger when section enters viewport: Start Stage 1 animation
    const checkInitial = () => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top <= windowHeight * 0.75 && !hasPlayed1Ref.current) {
        hasPlayed1Ref.current = true;
        runStage1Animation();
      }
    };
    checkInitial();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasPlayed1Ref.current) {
            hasPlayed1Ref.current = true;
            runStage1Animation();
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(el);

    // 2. ScrollTrigger for pinned center transition:
    // When the section is centered on screen, scrolling past center point glides Stage 1 out and Stage 2 in
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          // Switch to Stage 2 once the user scrolls past ~42% through the pinned runway
          if (self.progress >= 0.42 && activeStageRef.current !== 2) {
            transitionTo(2);
          } else if (self.progress < 0.42 && activeStageRef.current !== 1) {
            transitionTo(1);
          }
        }
      });
    }, el);

    return () => {
      observer.disconnect();
      ctx.revert();
      dotsTl1Ref.current?.kill();
      dotsTl2Ref.current?.kill();
    };
  }, [runStage1Animation, transitionTo]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[175vh] bg-[#fcfaf7] border-b border-stone-200/50"
    >
      {/* Sticky viewport-centered stage: locks the content cleanly in center while scrolling past */}
      <div className="sticky top-0 h-[100dvh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-20 py-3 sm:py-6 overflow-hidden">
        
        {/* STACKED GRID CONTAINER: Both stages share identical footprint so there is zero layout jump */}
        <div className="grid grid-cols-1 grid-rows-1 w-full max-w-5xl mx-auto">
          
          {/* ========================================================= */}
          {/* STAGE 1: BAD WEBSITE (88/100 Drop-off, Red Dots)          */}
          {/* ========================================================= */}
          <div
            ref={stage1Ref}
            className="col-start-1 row-start-1 w-full space-y-2.5 sm:space-y-4 md:space-y-7 will-change-[opacity]"
          >
            {/* SECTION HEADLINE */}
            <div className="text-center">
              <h2 className="font-serif text-[clamp(1.45rem,4.5vw,3.2rem)] font-normal text-slate-900 tracking-tight leading-[1.08]">
                The cost of being overlooked.
              </h2>
            </div>

            {/* COMPACT TWO-COLUMN ROW */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-5 md:gap-12 items-center">
              
              {/* LEFT: 100 CUSTOMER DOTS MATRIX (88 Red Dots, 12 White) */}
              <div className="md:col-span-5 flex flex-col items-center justify-center">
                <div
                  ref={dots1Ref}
                  onClick={runStage1Animation}
                  title="Click to replay visitor drop-off animation"
                  className="p-3 sm:p-4 md:p-6 bg-[#0e1117] rounded-xl sm:rounded-2xl border border-stone-800 shadow-xl cursor-pointer select-none hover:border-stone-700 transition-colors"
                >
                  <div className={DOT_GRID_CLASS}>
                    {Array.from({ length: 100 }).map((_, i) => {
                      const isLost = i < 88;
                      return (
                        <Dot
                          key={i}
                          className="customer-dot-1"
                          fill="#ef4444"
                          glow="rgba(255, 255, 255, 0.85)"
                          fillOn={isLost}
                          glowOn={!isLost}
                          scale={isLost ? 0.85 : 1.15}
                          opacity={0.9}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Micro Indicator: Red = 88 Lost, White = 12 Retained */}
                <div className="flex items-center gap-4 sm:gap-6 mt-1.5 sm:mt-3 text-[10px] sm:text-[11px] font-mono text-stone-600">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500 shadow-sm" />
                    <span className="text-red-600 font-semibold">88 Lost</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white border border-stone-400 shadow-sm" />
                    <span className="text-slate-800 font-semibold">12 Retained</span>
                  </div>
                </div>
              </div>

              {/* RIGHT: THE STATISTIC */}
              <div className="md:col-span-7 space-y-1.5 sm:space-y-2.5 md:space-y-3.5 text-center md:text-left">
                <div className="flex items-baseline justify-center md:justify-start gap-1.5 sm:gap-2">
                  <span className="font-serif text-4xl sm:text-6xl md:text-8xl font-light text-slate-900 tracking-tight leading-none tabular-nums">
                    <span ref={count1Ref}>0</span>
                  </span>
                  <span className="font-serif text-xl sm:text-3xl md:text-5xl text-red-600 font-light">
                    / 100
                  </span>
                </div>

                <p className="font-serif text-base sm:text-xl md:text-3xl lg:text-[2rem] text-slate-900 font-normal leading-snug">
                  &ldquo;88 of every 100 won’t come back after a bad website experience.&rdquo;
                </p>

                <p className="font-inter text-slate-600 text-xs sm:text-sm md:text-base font-normal leading-relaxed max-w-xl mx-auto md:mx-0">
                  First impressions are formed in milliseconds. When a website takes too long to load, feels cluttered, or breaks down on mobile, high-intent prospects don&rsquo;t wait around — they bounce straight to a competitor, taking their trust, their budget, and their loyalty with them for good.
                </p>
              </div>

            </div>
          </div>

          {/* ========================================================= */}
          {/* STAGE 2: GOOD WEBSITE (77% Return, Green Dots)            */}
          {/* ========================================================= */}
          <div
            ref={stage2Ref}
            className="col-start-1 row-start-1 w-full space-y-2.5 sm:space-y-4 md:space-y-7 opacity-0 pointer-events-none will-change-[opacity]"
          >
            {/* SECTION HEADLINE */}
            <div className="text-center">
              <h2 className="font-serif text-[clamp(1.45rem,4.5vw,3.2rem)] font-normal text-slate-900 tracking-tight leading-[1.08]">
                The power of an amazing experience.
              </h2>
            </div>

            {/* COMPACT TWO-COLUMN ROW - EXACT SAME LAYOUT AS COUNTERPART */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-5 md:gap-12 items-center">

              {/* LEFT: 100 CUSTOMER DOTS MATRIX (77 Green Dots, 23 White) */}
              <div className="md:col-span-5 flex flex-col items-center justify-center">
                <div
                  ref={dots2Ref}
                  onClick={runStage2Animation}
                  title="Click to replay return visitor animation"
                  className="p-3 sm:p-4 md:p-6 bg-[#0e1117] rounded-xl sm:rounded-2xl border border-stone-800 shadow-xl cursor-pointer select-none hover:border-emerald-900/60 transition-colors"
                >
                  <div className={DOT_GRID_CLASS}>
                    {Array.from({ length: 100 }).map((_, i) => {
                      const isReturn = i < 77;
                      return (
                        <Dot
                          key={i}
                          className="customer-dot-2"
                          fill="#10b981"
                          glow="rgba(16, 185, 129, 0.9)"
                          fillOn={isReturn}
                          glowOn={isReturn}
                          scale={isReturn ? 1.15 : 0.85}
                          opacity={isReturn ? 1 : 0.6}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Micro Indicator: Green = 77 Retained, White = 23 Other */}
                <div className="flex items-center gap-4 sm:gap-6 mt-1.5 sm:mt-3 text-[10px] sm:text-[11px] font-mono text-stone-600">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-500 shadow-sm" />
                    <span className="text-emerald-600 font-semibold">77 Retained</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white border border-stone-400 shadow-sm" />
                    <span className="text-slate-800 font-semibold">23 General</span>
                  </div>
                </div>
              </div>

              {/* RIGHT: THE 77% STATISTIC */}
              <div className="md:col-span-7 space-y-1.5 sm:space-y-2.5 md:space-y-3.5 text-center md:text-left">
                <div className="flex items-baseline justify-center md:justify-start gap-1.5 sm:gap-2">
                  <span className="font-serif text-4xl sm:text-6xl md:text-8xl font-light text-slate-900 tracking-tight leading-none tabular-nums">
                    <span ref={count2Ref}>0%</span>
                  </span>
                  <span className="font-serif text-xl sm:text-3xl md:text-5xl text-emerald-600 font-light">
                    / 100
                  </span>
                </div>

                <p className="font-serif text-base sm:text-xl md:text-3xl lg:text-[2rem] text-slate-900 font-normal leading-snug">
                  &ldquo;77% of customers will return if your website is easy to navigate and has a captivating factor.&rdquo;
                </p>

                <p className="font-inter text-slate-600 text-xs sm:text-sm md:text-base font-normal leading-relaxed max-w-xl mx-auto md:mx-0">
                  Speed, clarity, and effortless navigation build instant trust. When visitors can find exactly what they need within seconds, they linger longer, explore further, and convert into loyal, paying clients — turning a single visit into a lasting relationship.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default StatsSection;
