import React, { useState, useEffect, useRef } from 'react';
import { MoveRight, Cpu, PenTool, Eye, Rocket, Search } from 'lucide-react';
import { Page } from '../App';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Same five steps, same words. What changed is the shape: one hairline running
// down the page with the steps hung off it, instead of five full-height slabs
// with glowing icons and glass cards. Reads in a third of the scrolling.
const BuildJourney = [
  {
    id: '01',
    icon: <Search size={18} />,
    title: 'The Discovery & Planning',
    color: '#2563eb',
    bullets: [
      'We learn about your business, services, and target audience.',
      'We review competitors to see what’s working in your market.',
      'You receive a clear project plan and full price breakdown.'
    ]
  },
  {
    id: '02',
    icon: <PenTool size={18} />,
    title: 'The Project Lock-In',
    color: '#2563eb',
    bullets: [
      'Contracts are signed to confirm deliverables, timelines, and ownership.',
      'We collect the necessary details like images, brand colours, pricing ETC.',
      'A 25% deposit secures your build slot in our schedule.'
    ]
  },
  {
    id: '03',
    icon: <Cpu size={18} />,
    title: 'The Design & Build',
    color: '#2563eb',
    bullets: [
      'We start to create your custom site tailored to your brand’s vision and style.',
      'Mobile optimisation and technical integrations are built in.',
      'You’ll receive live previews to track progress during development.'
    ]
  },
  {
    id: '04',
    icon: <Eye size={18} />,
    title: 'The Review & Refinement',
    color: '#2563eb',
    bullets: [
      'You review the build and request revisions within scope of the contract.',
      'We polish visuals, layout, and performance details.',
      'Once approved by you, the final 75% invoice is issued.'
    ]
  },
  {
    id: '05',
    icon: <Rocket size={18} />,
    title: 'The Launch & Handover',
    color: '#2563eb',
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
      { id: 1, title: 'ALL BUILT', desc: 'Your site is finished and ready for customers.' },
      { id: 2, title: 'FAST HOSTING', desc: 'We host it on the best servers for speed.' },
      { id: 3, title: 'WE UPDATE IT', desc: 'We handle all the technical bits and security.' },
      { id: 4, title: 'EASY CHANGES', desc: 'Just tell us what to change and we do it.' },
      { id: 5, title: 'GROW WITH YOU', desc: 'Your site stays fresh and works on every phone.' }
    ]
  },
  ownership: {
    label: 'YOU TAKE THE KEYS',
    option: 'OPTION 02',
    quote: '"You own the site 100%. We give you the logins and you’re in control."',
    points: [
      { id: 1, title: 'ALL BUILT', desc: 'The site is finished and ready for transfer.' },
      { id: 2, title: 'FINAL BILL', desc: 'Once settled, we start the handover process.' },
      { id: 3, title: 'FULL ACCESS', desc: 'We give you all the passwords and logins.' },
      { id: 4, title: 'YOUR HOSTING', desc: 'You pay for your own hosting (we set it up).' },
      { id: 5, title: '100% YOURS', desc: 'You own every part of the site forever.' }
    ]
  }
} as const;

type DeploymentMode = keyof typeof DeploymentOptions;

const SnakeTimeline: React.FC<{ navigateTo: (page: Page) => void }> = ({ navigateTo }) => {
  const [deploymentMode, setDeploymentMode] = useState<DeploymentMode>('managed');
  const rootRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
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
      // The rail fills as you read down the five steps.
      const rail = railRef.current;
      const steps = stepsRef.current;
      if (rail && steps) {
        gsap.fromTo(
          rail,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: steps,
              start: 'top 70%',
              end: 'bottom 65%',
              scrub: 0.8
            }
          }
        );
      }

      // Each step lifts in once, on its own trigger. The hidden state is applied
      // here rather than in the markup, so if the script never runs the page is
      // still fully readable.
      gsap.utils.toArray<HTMLElement>('.step-row').forEach((row) => {
        const parts = row.querySelectorAll<HTMLElement>('.step-part');
        gsap.set(parts, { y: 22, opacity: 0 });
        gsap.to(parts, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.07,
          ease: 'power3.out',
          force3D: true,
          scrollTrigger: { trigger: row, start: 'top 86%', once: true, fastScrollEnd: true }
        });
      });

      gsap.utils.toArray<HTMLElement>('.fade-up').forEach((el) => {
        gsap.set(el, { y: 24, opacity: 0 });
        gsap.to(el, {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          force3D: true,
          scrollTrigger: { trigger: el, start: 'top 90%', once: true, fastScrollEnd: true }
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const active = DeploymentOptions[deploymentMode];

  return (
    <div
      ref={rootRef}
      className="bg-[#fdfbf7] min-h-screen text-slate-950 overflow-x-hidden selection:bg-blue-600/30"
    >
      {/* HERO — same wording, same scale as the other page headers. */}
      <section className="px-6 md:px-10 lg:px-16 pt-32 md:pt-44 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto">
          <p className="pt-rise text-[10px] font-bold uppercase tracking-[0.5em] text-slate-400 mb-8">
            The process
          </p>
          <h1
            className="pt-rise font-syne text-[clamp(2.5rem,10vw,5rem)] font-black text-slate-950 tracking-tighter uppercase leading-[0.9] mb-8"
            style={{ animationDelay: '70ms' }}
          >
            THE <br />
            <span className="text-shimmer-blue italic">SYSTEM.</span>
          </h1>
          <p
            className="pt-rise max-w-xl text-lg md:text-xl text-slate-500 leading-relaxed"
            style={{ animationDelay: '140ms' }}
          >
            Experience our 5 simple steps to a better website. We build powerful sites designed to
            help your business win.
          </p>
        </div>
      </section>

      {/* THE FIVE STEPS — one rail, five rows, no slabs. */}
      <section className="px-6 md:px-10 lg:px-16 pb-24 md:pb-32">
        <div ref={stepsRef} className="max-w-6xl mx-auto relative">
          {/* Static hairline plus the blue line that fills over it. */}
          <div
            aria-hidden="true"
            className="absolute left-[15px] md:left-[19px] top-3 bottom-3 w-px bg-slate-200"
          />
          <div
            ref={railRef}
            aria-hidden="true"
            className="absolute left-[15px] md:left-[19px] top-3 bottom-3 w-px bg-blue-600 origin-top will-change-transform"
          />

          <div className="space-y-14 md:space-y-20">
            {BuildJourney.map((step) => (
              <div key={step.id} className="step-row relative pl-14 md:pl-20">
                {/* Marker */}
                <div className="step-part absolute left-0 top-1 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#fdfbf7] border border-slate-200 flex items-center justify-center text-blue-600">
                  {step.icon}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-12 items-start">
                  <div className="lg:col-span-5">
                    <span className="step-part block font-oswald text-[11px] font-bold tracking-[0.45em] text-slate-400 mb-3">
                      {step.id}
                    </span>
                    <h2 className="step-part font-syne text-2xl md:text-[2rem] font-black uppercase tracking-tighter leading-[1.05] text-slate-950">
                      {step.title}
                    </h2>
                  </div>

                  <ul className="lg:col-span-7 lg:pt-1">
                    {step.bullets.map((bullet, idx) => (
                      <li
                        key={idx}
                        className="step-part flex gap-4 items-baseline py-3 border-b border-slate-200/80 last:border-b-0"
                      >
                        <span
                          aria-hidden="true"
                          className="shrink-0 w-4 h-px translate-y-[-0.35em]"
                          style={{ backgroundColor: step.color }}
                        />
                        <p className="text-[15px] md:text-base text-slate-600 leading-relaxed">
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

      {/* PICK YOUR PATH — back to the original: a full-bleed black band, the
          heading centred with hairlines either side of the question, the two
          OPTION cards on the left and the numbered badges on the right.
          What is different is that it fits on one screen. In the original both
          paths were stacked down the page, five numbered rows each, so you had
          to scroll through roughly two and a half screens to see the choice.
          Here the card you pick *is* the switch — it lights up with the white
          border and the dot exactly as OPTION 02 did — and only that path's
          five points are on the right. Everything vertical is clamped against
          vh, so on a short laptop screen the whole thing squeezes rather than
          spilling over the fold. */}
      <section className="relative bg-[#0A0D14] text-white">
        <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16 min-h-[100svh] flex flex-col justify-center pt-[clamp(2.5rem,6vh,5rem)] pb-[clamp(2.5rem,6vh,4rem)]">
          <div className="fade-up text-center">
            <h2 className="font-syne text-[clamp(1.8rem,5.4vw,3.2rem)] font-black uppercase tracking-tighter leading-[0.9]">
              PICK YOUR <br />
              <span className="text-shimmer-blue italic">PATH.</span>
            </h2>
            <div className="mt-[clamp(0.8rem,2vh,1.5rem)] flex items-center justify-center gap-4 md:gap-6">
              <span aria-hidden="true" className="h-px w-8 md:w-16 bg-white/15" />
              <p className="text-[8.5px] md:text-[10px] font-bold uppercase tracking-[0.4em] text-white/40">
                HOW DO YOU WANT TO RUN YOUR BUSINESS?
              </p>
              <span aria-hidden="true" className="h-px w-8 md:w-16 bg-white/15" />
            </div>
          </div>

          <div className="mt-[clamp(1.25rem,3.5vh,3rem)] grid grid-cols-1 lg:grid-cols-12 gap-[clamp(1rem,2.5vh,2rem)] lg:gap-14">
            {/* The two cards. These are the tablist. */}
            <div
              role="tablist"
              aria-label="Deployment options"
              className="lg:col-span-5 flex flex-col gap-[clamp(0.7rem,1.8vh,1.1rem)]"
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
                    className={`fade-up text-left rounded-[1.5rem] md:rounded-[1.75rem] px-5 md:px-8 py-[clamp(0.9rem,2.2vh,1.6rem)] border transition-colors duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 ${
                      isActive
                        ? 'border-white bg-[#111A2B]'
                        : 'border-white/10 bg-white/[0.02] hover:border-white/30'
                    }`}
                  >
                    <span className="flex items-center justify-between gap-4">
                      <span
                        className={`text-[9px] md:text-[10px] font-bold uppercase tracking-[0.45em] transition-colors duration-500 ${
                          isActive ? 'text-white/50' : 'text-blue-500'
                        }`}
                      >
                        {option.option}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`w-2.5 h-2.5 rounded-full bg-white transition-opacity duration-500 ${
                          isActive ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                    </span>
                    <span className="mt-2.5 block font-syne text-[clamp(1.2rem,3vw,1.85rem)] font-black uppercase tracking-tighter leading-[0.98]">
                      {option.label}
                    </span>
                    <span className="mt-2 block italic text-[clamp(0.8rem,1.5vw,0.95rem)] leading-relaxed text-white/45">
                      {option.quote}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* The chosen path. Keyed on the mode so the five rows run their own
                little entrance each time the card changes. */}
            <ul
              key={deploymentMode}
              className="lg:col-span-7 flex flex-col justify-center gap-[clamp(0.4rem,1.5vh,1.15rem)]"
            >
              {active.points.map((point, idx) => (
                <li
                  key={point.id}
                  className="path-in flex items-start gap-4 md:gap-6"
                  style={{ animationDelay: `${idx * 55}ms` }}
                >
                  <span
                    aria-hidden="true"
                    className="shrink-0 grid place-items-center w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl border border-white/10 bg-white/[0.03] font-syne text-base md:text-lg font-black text-blue-500"
                  >
                    {point.id}
                  </span>
                  <span className="block pt-0.5">
                    <span className="block font-syne text-[clamp(0.95rem,2.1vw,1.35rem)] font-black uppercase tracking-tight leading-none">
                      {point.title}
                    </span>
                    <span className="mt-1.5 block italic text-[clamp(0.8rem,1.5vw,0.95rem)] leading-snug text-white/45">
                      {point.desc}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* The close of the page. It used to hover over the whole document on
              a portal, which meant it followed you through every section; it now
              sits in the flow at the very bottom, inside the space the band was
              already reserving for it, so PICK YOUR PATH still fits one screen. */}
          <div className="mt-[clamp(1.5rem,3.5vh,2.75rem)] flex justify-center">
            <button
              type="button"
              onClick={() => navigateTo('contact')}
              className="cta-hover group inline-flex items-center gap-3 md:gap-4 pl-6 md:pl-8 pr-5 md:pr-6 py-3.5 md:py-4 rounded-full bg-white text-slate-950 font-bold uppercase text-[10px] md:text-[11px] tracking-[0.25em] whitespace-nowrap shadow-[0_18px_45px_-12px_rgba(0,0,0,0.55)] hover:bg-blue-600 hover:text-white transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
            >
              CONTACT US NOW
              <MoveRight
                size={17}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </button>
          </div>
        </div>
      </section>

      <style>{`
        .text-shimmer-blue {
          background: linear-gradient(90deg, #2563eb 0%, #38bdf8 25%, #2563eb 50%, #38bdf8 75%, #2563eb 100%);
          background-size: 200% auto;
          color: #2563eb;
          background-clip: text;
          text-fill-color: transparent;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: blue-shine 5s linear infinite;
        }
        @keyframes blue-shine { to { background-position: 200% center; } }

        /* Header and switched content use fill-mode animations rather than
           scroll triggers, so they can never be left stuck at opacity 0. */
        @keyframes pt-rise {
          from { opacity: 0; transform: translate3d(0, 20px, 0); }
          to { opacity: 1; transform: none; }
        }
        .pt-rise { animation: pt-rise 0.75s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .path-in { animation: pt-rise 0.6s cubic-bezier(0.22, 1, 0.36, 1) both; }

        /* The closing button lifts into place a beat after the page settles, so
           it does not arrive on top of the header animation. */
        @keyframes cta-hover-in {
          from { opacity: 0; transform: translate3d(0, 40%, 0); }
          to { opacity: 1; transform: none; }
        }
        .cta-hover {
          animation: cta-hover-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.55s both;
        }

        @media (prefers-reduced-motion: reduce) {
          .pt-rise, .path-in, .cta-hover { animation: none; }
          .text-shimmer-blue { animation: none; }
        }
      `}</style>
    </div>
  );
};

export default SnakeTimeline;
