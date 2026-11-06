import React, { useState, useEffect, useRef } from 'react';
import { MoveRight } from 'lucide-react';
import { Page } from '../App';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BuildJourney = [
  {
    id: '01',
    phase: 'Discovery',
    title: 'The Discovery & Planning',
    bullets: [
      'We learn about your business, services, and target audience.',
      'We review competitors to see what’s working in your market.',
      'You receive a clear project plan and full price breakdown.'
    ]
  },
  {
    id: '02',
    phase: 'Alignment',
    title: 'The Project Lock-In',
    bullets: [
      'Contracts are signed to confirm deliverables, timelines, and ownership.',
      'We collect the necessary details like images, brand colours, pricing ETC.',
      'A 25% deposit secures your build slot in our schedule.'
    ]
  },
  {
    id: '03',
    phase: 'Architecture',
    title: 'The Design & Build',
    bullets: [
      'We start to create your custom site tailored to your brand’s vision and style.',
      'Mobile optimisation and technical integrations are built in.',
      'You’ll receive live previews to track progress during development.'
    ]
  },
  {
    id: '04',
    phase: 'Refinement',
    title: 'The Review & Refinement',
    bullets: [
      'You review the build and request revisions within scope of the contract.',
      'We polish visuals, layout, and performance details.',
      'Once approved by you, the final 75% invoice is issued.'
    ]
  },
  {
    id: '05',
    phase: 'Handover',
    title: 'The Launch & Handover',
    bullets: [
      'Final payment clears before final deployment begins.',
      'You choose your preferred hosting and deployment path.',
      'You reap the rewards of your custom 1:1 digital asset.'
    ]
  }
];

const DeploymentOptions = {
  managed: {
    label: 'WE DO THE WORK',
    option: 'OPTION 01',
    quote: '"We host, update, and manage your site so you can focus on your trade."',
    points: [
      { id: '01', title: 'ALL BUILT', desc: 'Your site is finished and ready for customers.' },
      { id: '02', title: 'FAST HOSTING', desc: 'We host it on the best servers for speed.' },
      { id: '03', title: 'WE UPDATE IT', desc: 'We handle all the technical bits and security.' },
      { id: '04', title: 'EASY CHANGES', desc: 'Just tell us what to change and we do it.' },
      { id: '05', title: 'GROW WITH YOU', desc: 'Your site stays fresh and works on every phone.' }
    ]
  },
  ownership: {
    label: 'YOU TAKE THE KEYS',
    option: 'OPTION 02',
    quote: '"You own the site 100%. We give you the logins and you’re in control."',
    points: [
      { id: '01', title: 'ALL BUILT', desc: 'The site is finished and ready for transfer.' },
      { id: '02', title: 'FINAL BILL', desc: 'Once settled, we start the handover process.' },
      { id: '03', title: 'FULL ACCESS', desc: 'We give you all the passwords and logins.' },
      { id: '04', title: 'YOUR HOSTING', desc: 'You pay for your own hosting (we set it up).' },
      { id: '05', title: '100% YOURS', desc: 'You own every part of the site forever.' }
    ]
  }
} as const;

type DeploymentMode = keyof typeof DeploymentOptions;

const SnakeTimeline: React.FC<{ navigateTo: (page: Page) => void }> = ({ navigateTo }) => {
  const [deploymentMode, setDeploymentMode] = useState<DeploymentMode>('managed');
  const rootRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      // Alternate whole stages gliding in: left (0), right (1), left (2), right (3), left (4)
      gsap.utils.toArray<HTMLElement>('.process-stage').forEach((stage, index) => {
        const fromLeft = index % 2 === 0;
        const startX = fromLeft ? -85 : 85;
        const topLine = stage.querySelector('.stage-top-line');
        const stageContent = stage.querySelector('.stage-glide-body');
        const dot = stage.querySelector('.stage-dot');

        if (topLine) {
          gsap.fromTo(
            topLine,
            { scaleX: 0, transformOrigin: fromLeft ? 'left center' : 'right center' },
            {
              scaleX: 1,
              duration: 1.35,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: stage,
                start: 'top 84%',
                once: true
              }
            }
          );
        }

        if (stageContent) {
          gsap.fromTo(
            stageContent,
            { x: startX, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1.35,
              ease: 'power3.out',
              force3D: true,
              clearProps: 'transform',
              scrollTrigger: {
                trigger: stage,
                start: 'top 82%',
                once: true
              }
            }
          );
        }

        if (dot) {
          gsap.fromTo(
            dot,
            { scale: 0.4, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.85,
              ease: 'back.out(2)',
              scrollTrigger: {
                trigger: stage,
                start: 'top 82%',
                once: true
              }
            }
          );
        }
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const active = DeploymentOptions[deploymentMode];

  return (
    <div
      ref={rootRef}
      className="bg-[#fdfbf7] min-h-screen text-slate-950 overflow-x-hidden selection:bg-emerald-600/20"
    >
      {/* =================================================================== */}
      {/* 1. MINIMALIST ARCHITECTURAL HERO                                    */}
      {/* =================================================================== */}
      <section className="px-6 md:px-12 lg:px-20 pt-36 md:pt-48 pb-24 md:pb-36">
        <div className="max-w-6xl mx-auto">
          <p className="pt-rise text-[10px] md:text-[11px] font-black uppercase tracking-[0.5em] text-emerald-600 mb-8">
            The Process
          </p>
          <h1
            className="pt-rise font-syne text-[clamp(2.75rem,10vw,5.5rem)] font-black text-slate-950 tracking-tighter uppercase leading-[0.88] mb-10"
            style={{ animationDelay: '70ms' }}
          >
            THE <br />
            <span className="text-shimmer-blue italic">SYSTEM.</span>
          </h1>
          <p
            className="pt-rise max-w-xl text-lg md:text-2xl text-slate-500 font-medium leading-relaxed"
            style={{ animationDelay: '140ms' }}
          >
            Five clear stages from first conversation to launch. Built around open communication, fixed pricing, and zero guesswork.
          </p>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 2. SPACIOUS UNBOXED 5-STAGE TIMELINE                                */}
      {/* =================================================================== */}
      <section className="px-6 md:px-12 lg:px-20 pb-32 md:pb-48">
        <div ref={stepsRef} className="max-w-6xl mx-auto relative">
          <div>
            {BuildJourney.map((step) => (
              <div
                key={step.id}
                className="process-stage relative md:pl-14 lg:pl-20 py-16 md:py-24"
              >
                {/* Animated Top Hairline */}
                <div
                  aria-hidden="true"
                  className="stage-top-line absolute left-0 right-0 top-0 h-px bg-slate-200"
                />

                {/* Minimal Green Dot (No Trailing Line) */}
                <div
                  aria-hidden="true"
                  className="stage-dot hidden md:block absolute -left-[4.5px] top-24 w-2.5 h-2.5 rounded-full bg-emerald-600"
                />

                <div className="stage-glide-body grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start will-change-transform">
                  {/* Left Column: Monumental Step Index & Title */}
                  <div className="lg:col-span-5">
                    <div className="flex items-center gap-4 mb-5">
                      <span className="font-syne text-sm md:text-base font-black text-emerald-600 tabular-nums">
                        {step.id}
                      </span>
                      <span className="w-8 h-px bg-slate-300" />
                      <span className="text-[10px] font-black uppercase tracking-[0.45em] text-slate-400">
                        {step.phase}
                      </span>
                    </div>

                    <h2 className="font-syne text-3xl sm:text-4xl md:text-[2.5rem] font-black uppercase tracking-tighter leading-[0.96] text-slate-950">
                      {step.title}
                    </h2>
                  </div>

                  {/* Right Column: Clean Unboxed Hairline Deliverables */}
                  <ul className="lg:col-span-7 divide-y divide-slate-200/80 border-b border-slate-200/80">
                    {step.bullets.map((bullet, idx) => (
                      <li
                        key={idx}
                        className="flex items-baseline gap-6 py-5 first:pt-0"
                      >
                        <span className="font-mono text-[11px] font-bold text-emerald-600/80 tabular-nums shrink-0">
                          0{idx + 1}
                        </span>
                        <p className="text-base md:text-lg text-slate-600 font-normal leading-relaxed">
                          {bullet}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 3. MINIMALIST DARK HANDOVER SECTION — "PICK YOUR PATH"              */}
      {/* =================================================================== */}
      <section className="relative bg-[#0A0D14] text-white py-28 md:py-40">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
          {/* Header */}
          <div className="mb-20 md:mb-28 flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-white/10">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-400 mb-6">
                After Launch
              </p>
              <h2 className="font-syne text-[clamp(2.25rem,6vw,4.25rem)] font-black uppercase tracking-tighter leading-[0.9]">
                PICK YOUR <br />
                <span className="text-shimmer-blue italic">PATH.</span>
              </h2>
            </div>

            {/* Minimalist Unboxed Underline Switcher */}
            <div
              role="tablist"
              aria-label="Deployment options"
              className="flex flex-wrap gap-8 md:gap-12"
            >
              {(Object.keys(DeploymentOptions) as DeploymentMode[]).map((mode) => {
                const option = DeploymentOptions[mode];
                const isActive = deploymentMode === mode;
                return (
                  <button
                    key={mode}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setDeploymentMode(mode)}
                    className={`group text-left pb-4 border-b-2 transition-all duration-500 cursor-pointer focus:outline-none ${
                      isActive
                        ? 'border-emerald-400 text-white'
                        : 'border-white/15 text-white/40 hover:text-white/75 hover:border-white/35'
                    }`}
                  >
                    <span className="block text-[9px] font-black uppercase tracking-[0.45em] text-emerald-400 mb-2">
                      {option.option}
                    </span>
                    <span className="font-syne text-xl md:text-2xl font-black uppercase tracking-tight">
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Path Content — Open & Minimalist */}
          <div key={deploymentMode} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-5 path-in">
              <p className="text-xl md:text-2xl font-light italic text-white/80 leading-relaxed mb-10">
                {active.quote}
              </p>
              <button
                type="button"
                onClick={() => navigateTo('contact')}
                className="group inline-flex items-center gap-4 pl-8 pr-6 py-4 rounded-full bg-white text-slate-950 font-black uppercase text-[10px] md:text-[11px] tracking-[0.3em] hover:bg-emerald-500 hover:text-slate-950 transition-all duration-300 cursor-pointer"
              >
                <span>Start Your Project</span>
                <MoveRight
                  size={17}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </button>
            </div>

            <ul className="lg:col-span-7 divide-y divide-white/10 border-t border-b border-white/10">
              {active.points.map((point, idx) => (
                <li
                  key={point.id}
                  className="path-in py-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-8"
                  style={{ animationDelay: `${idx * 65}ms` }}
                >
                  <div className="flex items-baseline gap-5">
                    <span className="font-mono text-xs text-emerald-400 tabular-nums">
                      {point.id}
                    </span>
                    <span className="font-syne text-lg md:text-xl font-black uppercase tracking-tight text-white">
                      {point.title}
                    </span>
                  </div>
                  <span className="text-sm text-white/55 sm:text-right pl-9 sm:pl-0">
                    {point.desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <style>{`
        .text-shimmer-blue {
          background: linear-gradient(90deg, #059669 0%, #34d399 25%, #ffffff 50%, #6ee7b7 75%, #059669 100%);
          background-size: 200% auto;
          color: #059669;
          background-clip: text;
          text-fill-color: transparent;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: emerald-shine 5s linear infinite;
        }
        @keyframes emerald-shine { to { background-position: 200% center; } }

        @keyframes pt-rise {
          from { opacity: 0; transform: translate3d(0, 22px, 0); }
          to { opacity: 1; transform: none; }
        }
        .pt-rise { animation: pt-rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .path-in { animation: pt-rise 0.65s cubic-bezier(0.22, 1, 0.36, 1) both; }

        @media (prefers-reduced-motion: reduce) {
          .pt-rise, .path-in { animation: none; }
          .text-shimmer-blue { animation: none; }
        }
      `}</style>
    </div>
  );
};

export default SnakeTimeline;
