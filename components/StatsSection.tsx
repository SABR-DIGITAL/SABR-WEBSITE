import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const StatsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stage1Ref = useRef<HTMLDivElement>(null);
  const stage2Ref = useRef<HTMLDivElement>(null);
  const dots1Ref = useRef<HTMLDivElement>(null);
  const dots2Ref = useRef<HTMLDivElement>(null);

  const [activeStage, setActiveStage] = useState<1 | 2>(1);
  const activeStageRef = useRef<1 | 2>(1);

  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  const hasPlayed1Ref = useRef(false);
  const hasPlayed2Ref = useRef(false);
  const isTransitioningRef = useRef(false);

  // STAGE 1 ANIMATION: Counts up to 88, turns 88 dots RED, 12 remain WHITE
  const runStage1Animation = useCallback(() => {
    const dots = dots1Ref.current?.querySelectorAll('.customer-dot-1');
    const abandonDots = dots ? Array.from(dots).slice(0, 88) : [];
    const retainedDots = dots ? Array.from(dots).slice(88) : [];

    if (dots) {
      gsap.set(dots, { backgroundColor: '#ffffff', opacity: 0.9, scale: 1 });
      if (retainedDots.length) {
        gsap.set(retainedDots, {
          backgroundColor: '#ffffff',
          boxShadow: '0 0 10px rgba(255, 255, 255, 0.85)',
          scale: 1.15
        });
      }
    }

    const counterProxy = { count: 0 };
    const tl = gsap.timeline();

    tl.to(counterProxy, {
      count: 88,
      duration: 1.4,
      ease: 'power2.out',
      onUpdate: () => setCount1(Math.round(counterProxy.count))
    });

    if (abandonDots.length) {
      tl.to(
        abandonDots,
        {
          backgroundColor: '#ef4444',
          scale: 0.85,
          opacity: 0.9,
          duration: 0.35,
          stagger: { each: 0.014, from: 'start', ease: 'power1.out' }
        },
        0.05
      );
    }

    if (retainedDots.length) {
      tl.to(
        retainedDots,
        {
          scale: 1.25,
          backgroundColor: '#ffffff',
          boxShadow: '0 0 14px rgba(255, 255, 255, 0.95)',
          duration: 0.35,
          stagger: 0.025,
          ease: 'back.out(2)'
        },
        '-=0.5'
      ).to(retainedDots, { scale: 1.15, duration: 0.25 });
    }
  }, []);

  // STAGE 2 ANIMATION: Counts up to 74, turns 74 dots radiant GREEN, 26 remain neutral WHITE
  const runStage2Animation = useCallback(() => {
    const dots = dots2Ref.current?.querySelectorAll('.customer-dot-2');
    const returnDots = dots ? Array.from(dots).slice(0, 74) : [];
    const otherDots = dots ? Array.from(dots).slice(74) : [];

    if (dots) {
      gsap.set(dots, { backgroundColor: '#ffffff', opacity: 0.8, scale: 0.9 });
    }

    const counterProxy = { count: 0 };
    const tl = gsap.timeline();

    tl.to(counterProxy, {
      count: 74,
      duration: 1.4,
      ease: 'power2.out',
      onUpdate: () => setCount2(Math.round(counterProxy.count))
    });

    if (returnDots.length) {
      tl.to(
        returnDots,
        {
          backgroundColor: '#10b981', // Emerald green
          boxShadow: '0 0 12px rgba(16, 185, 129, 0.9)',
          scale: 1.15,
          opacity: 1,
          duration: 0.35,
          stagger: { each: 0.014, from: 'start', ease: 'power1.out' }
        },
        0.05
      );
    }

    if (otherDots.length) {
      tl.to(
        otherDots,
        {
          backgroundColor: '#ffffff',
          scale: 0.9,
          opacity: 0.5,
          duration: 0.3
        },
        0.1
      );
    }
  }, []);

  // GENTLE GLIDE TRANSITION BETWEEN STAGES
  const transitionTo = useCallback((targetStage: 1 | 2) => {
    if (activeStageRef.current === targetStage || isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    activeStageRef.current = targetStage;
    setActiveStage(targetStage);

    if (targetStage === 2) {
      // Glide Stage 1 out upward
      gsap.to(stage1Ref.current, {
        y: -30,
        opacity: 0,
        duration: 0.45,
        ease: 'power2.inOut',
        pointerEvents: 'none'
      });

      // Glide Stage 2 in from below
      gsap.fromTo(
        stage2Ref.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          ease: 'power2.out',
          pointerEvents: 'auto',
          onStart: () => {
            runStage2Animation();
          },
          onComplete: () => {
            isTransitioningRef.current = false;
          }
        }
      );
    } else {
      // Glide Stage 2 out downward
      gsap.to(stage2Ref.current, {
        y: 30,
        opacity: 0,
        duration: 0.45,
        ease: 'power2.inOut',
        pointerEvents: 'none'
      });

      // Glide Stage 1 in from above
      gsap.fromTo(
        stage1Ref.current,
        { y: -30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          ease: 'power2.out',
          pointerEvents: 'auto',
          onStart: () => {
            runStage1Animation();
          },
          onComplete: () => {
            isTransitioningRef.current = false;
          }
        }
      );
    }
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
    };
  }, [runStage1Animation, transitionTo]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[175vh] bg-[#fcfaf7] border-b border-stone-200/50"
    >
      {/* Sticky viewport-centered stage: locks the content cleanly in center while scrolling past */}
      <div className="sticky top-0 h-screen flex flex-col justify-center items-center px-6 lg:px-20 overflow-hidden">
        
        {/* STACKED GRID CONTAINER: Both stages share identical footprint so there is zero layout jump */}
        <div className="grid grid-cols-1 grid-rows-1 w-full max-w-5xl mx-auto">
          
          {/* ========================================================= */}
          {/* STAGE 1: BAD WEBSITE (88/100 Drop-off, Red Dots)          */}
          {/* ========================================================= */}
          <div
            ref={stage1Ref}
            className="col-start-1 row-start-1 w-full space-y-6 md:space-y-7 transition-all will-change-transform"
          >
            {/* SECTION HEADLINE */}
            <div className="text-center">
              <h2 className="font-serif text-[clamp(2rem,4.5vw,3.2rem)] font-normal text-slate-900 tracking-tight leading-[1.05]">
                The cost of being overlooked.
              </h2>
            </div>

            {/* COMPACT TWO-COLUMN ROW */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
              
              {/* LEFT: 100 CUSTOMER DOTS MATRIX (88 Red Dots, 12 White) */}
              <div className="md:col-span-5 flex flex-col items-center justify-center">
                <div
                  ref={dots1Ref}
                  onClick={runStage1Animation}
                  title="Click to replay visitor drop-off animation"
                  className="p-5 sm:p-6 bg-[#0e1117] rounded-2xl border border-stone-800 shadow-xl cursor-pointer select-none hover:border-stone-700 transition-colors"
                >
                  <div className="grid grid-cols-10 gap-2 sm:gap-2.5 place-items-center">
                    {Array.from({ length: 100 }).map((_, i) => {
                      const isLost = i < 88;
                      return (
                        <span
                          key={i}
                          className="customer-dot-1 block w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full transition-transform will-change-transform"
                          style={{
                            backgroundColor: isLost ? '#ef4444' : '#ffffff',
                            boxShadow: !isLost ? '0 0 10px rgba(255, 255, 255, 0.85)' : undefined,
                            transform: !isLost ? 'scale(1.15)' : 'scale(0.85)',
                            opacity: 0.9
                          }}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Micro Indicator: Red = 88 Lost, White = 12 Retained */}
                <div className="flex items-center gap-6 mt-3 text-[11px] font-mono text-stone-600">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm" />
                    <span className="text-red-600 font-semibold">88 Lost</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-white border border-stone-400 shadow-sm" />
                    <span className="text-slate-800 font-semibold">12 Retained</span>
                  </div>
                </div>
              </div>

              {/* RIGHT: THE STATISTIC */}
              <div className="md:col-span-7 space-y-3.5 text-center md:text-left">
                <div className="flex items-baseline justify-center md:justify-start gap-2">
                  <span className="font-serif text-6xl sm:text-7xl md:text-8xl font-light text-slate-900 tracking-tight leading-none tabular-nums">
                    {count1}
                  </span>
                  <span className="font-serif text-3xl sm:text-4xl md:text-5xl text-red-600 font-light">
                    / 100
                  </span>
                </div>

                <p className="font-serif text-2xl sm:text-3xl lg:text-[2rem] text-slate-900 font-normal leading-snug">
                  &ldquo;88 of every 100 won’t come back after a bad website experience.&rdquo;
                </p>

                <p className="font-inter text-slate-600 text-sm sm:text-base font-normal leading-relaxed max-w-xl">
                  First impressions are formed in milliseconds. When a website takes seconds to load or feels clumsy on mobile, high-intent prospects move on to a competitor without second thought.
                </p>
              </div>

            </div>
          </div>

          {/* ========================================================= */}
          {/* STAGE 2: GOOD WEBSITE (74% Return, Green Dots)            */}
          {/* ========================================================= */}
          <div
            ref={stage2Ref}
            className="col-start-1 row-start-1 w-full space-y-6 md:space-y-7 opacity-0 pointer-events-none transition-all will-change-transform"
          >
            {/* SECTION HEADLINE */}
            <div className="text-center">
              <h2 className="font-serif text-[clamp(2rem,4.5vw,3.2rem)] font-normal text-slate-900 tracking-tight leading-[1.05]">
                The power of mobile-first design.
              </h2>
            </div>

            {/* COMPACT TWO-COLUMN ROW - EXACT SAME LAYOUT AS COUNTERPART */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
              
              {/* LEFT: 100 CUSTOMER DOTS MATRIX (74 Green Dots, 26 White) */}
              <div className="md:col-span-5 flex flex-col items-center justify-center">
                <div
                  ref={dots2Ref}
                  onClick={runStage2Animation}
                  title="Click to replay return visitor animation"
                  className="p-5 sm:p-6 bg-[#0e1117] rounded-2xl border border-stone-800 shadow-xl cursor-pointer select-none hover:border-emerald-900/60 transition-colors"
                >
                  <div className="grid grid-cols-10 gap-2 sm:gap-2.5 place-items-center">
                    {Array.from({ length: 100 }).map((_, i) => {
                      const isReturn = i < 74;
                      return (
                        <span
                          key={i}
                          className="customer-dot-2 block w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full transition-transform will-change-transform"
                          style={{
                            backgroundColor: isReturn ? '#10b981' : '#ffffff',
                            boxShadow: isReturn ? '0 0 12px rgba(16, 185, 129, 0.9)' : undefined,
                            transform: isReturn ? 'scale(1.15)' : 'scale(0.85)',
                            opacity: isReturn ? 1 : 0.6
                          }}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Micro Indicator: Green = 74 Retained, White = 26 Other */}
                <div className="flex items-center gap-6 mt-3 text-[11px] font-mono text-stone-600">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm" />
                    <span className="text-emerald-600 font-semibold">74 Retained</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-white border border-stone-400 shadow-sm" />
                    <span className="text-slate-800 font-semibold">26 General</span>
                  </div>
                </div>
              </div>

              {/* RIGHT: THE 74% STATISTIC */}
              <div className="md:col-span-7 space-y-3.5 text-center md:text-left">
                <div className="flex items-baseline justify-center md:justify-start gap-2">
                  <span className="font-serif text-6xl sm:text-7xl md:text-8xl font-light text-slate-900 tracking-tight leading-none tabular-nums">
                    {count2}%
                  </span>
                  <span className="font-serif text-3xl sm:text-4xl md:text-5xl text-emerald-600 font-light">
                    / 100
                  </span>
                </div>

                <p className="font-serif text-2xl sm:text-3xl lg:text-[2rem] text-slate-900 font-normal leading-snug">
                  &ldquo;74% of users are more likely to return to a website if it is mobile-friendly and easy to use.&rdquo;
                </p>

                <p className="font-inter text-slate-600 text-sm sm:text-base font-normal leading-relaxed max-w-xl">
                  Speed, clarity, and intuitive mobile ergonomics inspire instant trust. When prospects find what they need in seconds, they stay longer, explore deeper, and convert into paying clients.
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* SUBTLE INTERACTIVE STAGE CONTROLS */}
        <div className="flex items-center justify-center gap-3 pt-6 select-none">
          <button
            type="button"
            onClick={() => transitionTo(1)}
            className={`px-4 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeStage === 1
                ? 'bg-red-500/15 text-red-700 border border-red-500/30 font-bold shadow-sm'
                : 'bg-white/80 text-stone-500 border border-stone-200 hover:text-stone-800'
            }`}
          >
            <span>1. Bad Experience · 88% Lost</span>
          </button>
          <button
            type="button"
            onClick={() => transitionTo(2)}
            className={`px-4 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeStage === 2
                ? 'bg-emerald-500/15 text-emerald-700 border border-emerald-500/30 font-bold shadow-sm'
                : 'bg-white/80 text-stone-500 border border-stone-200 hover:text-stone-800'
            }`}
          >
            <span>2. Mobile-Friendly · 74% Return</span>
          </button>
        </div>

      </div>
    </section>
  );
};

export default StatsSection;
