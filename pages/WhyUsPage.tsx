import React, { useEffect, useRef, useState } from 'react';
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import {
  ArrowRight,
  ArrowUpRight,
  Check
} from 'lucide-react';
import { Page, PAGE_PATHS } from '../App';

interface WhyUsPageProps {
  navigateTo: (page: Page) => void;
}

interface StatConfig {
  prefix?: string;
  target: number;
  decimals: number;
  suffix: string;
  label: string;
  detail: string;
}

const KeyStats: StatConfig[] = [
  {
    target: 0.05,
    decimals: 2,
    suffix: 's',
    label: 'First Impression Window',
    detail: 'How quickly a visitor forms a gut judgement on your business after your page loads.'
  },
  {
    target: 75,
    decimals: 0,
    suffix: '%',
    label: 'Credibility From Design',
    detail: 'Of people admit they judge a company’s trustworthiness purely by how its website looks.'
  },
  {
    prefix: '< ',
    target: 1,
    decimals: 0,
    suffix: 's',
    label: 'Bespoke Load Speed',
    detail: 'Target load time on our custom builds — stopping the 3-second mobile drop-off cold.'
  },
  {
    prefix: '≤ ',
    target: 10,
    decimals: 0,
    suffix: ' Days',
    label: 'From Chat To Live',
    detail: 'Most sites go live in up to 10 days with one fixed written quote and 100% ownership.'
  }
];

const CountUpStat: React.FC<{ stat: StatConfig; index: number }> = ({ stat, index }) => {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      setCurrent(stat.target);
      return;
    }

    let rafId = 0;
    const startCount = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      const duration = 1350;
      const delay = index * 90;
      const startTime = performance.now() + delay;

      const tick = (now: number) => {
        if (now < startTime) {
          rafId = requestAnimationFrame(tick);
          return;
        }
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Smooth cubic ease-out
        const eased = 1 - Math.pow(1 - progress, 3);
        setCurrent(stat.target * eased);
        if (progress < 1) {
          rafId = requestAnimationFrame(tick);
        } else {
          setCurrent(stat.target);
        }
      };

      rafId = requestAnimationFrame(tick);
    };

    if (typeof IntersectionObserver === 'undefined') {
      startCount();
      return () => cancelAnimationFrame(rafId);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          startCount();
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [stat.target, index]);

  const formattedNumber =
    stat.decimals > 0
      ? current.toFixed(stat.decimals)
      : stat.target === 1 && current < 0.95
      ? current.toFixed(1)
      : String(Math.round(current));

  return (
    <div ref={ref} className="wu-stat-item flex flex-col">
      <span className="font-inter text-3xl sm:text-4xl font-semibold tracking-tight text-slate-950 tabular-nums mb-1.5">
        {stat.prefix || ''}
        {formattedNumber}
        {stat.suffix}
      </span>
      <span className="text-xs font-semibold text-emerald-700 mb-1.5">
        {stat.label}
      </span>
      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
        {stat.detail}
      </p>
    </div>
  );
};

const CorePillars = [
  {
    id: '01',
    phase: 'Credibility & Trust',
    title: 'First impressions decide everything',
    summary:
      'Visitors judge the standard of your work before they ever ring you. An outdated or clunky site quietly sends high-value leads straight to a competitor.',
    points: [
      'Modern shopfront that looks established from the first second',
      'Layouts mapped to guide visitors naturally toward getting in touch',
      'Direct collaboration with Raphael — zero agency middlemen'
    ]
  },
  {
    id: '02',
    phase: 'Custom Engineering',
    title: 'Zero bloated templates, 100% hand-built code',
    summary:
      'Page builders and cheap themes choke on heavy plugins. We write every site from scratch in clean code so it loads instantly and never breaks.',
    points: [
      'Sub-second load speeds that stop the 3-second mobile drop-off',
      'Effortless quote forms and one-tap call links where customers look',
      'Tested across real iPhones, Androids, tablets, and desktops'
    ]
  },
  {
    id: '03',
    phase: 'Google SEO',
    title: 'Showing up in local searches',
    summary:
      'For Wiltshire and UK businesses, page two is invisible. We bake technical search foundations straight into the core structure of your site.',
    points: [
      'Clean semantic HTML5 headings that Google indexes without friction',
      'Local business schema tuned for your town and service areas',
      'Top Core Web Vitals scores to outrank slower template sites'
    ]
  },
  {
    id: '04',
    phase: 'AI Search (AIO & GEO)',
    title: 'Ready for AI search & recommendations',
    summary:
      'More customers now ask ChatGPT, Gemini, and Perplexity who to hire. We structure your site so AI engines can verify and recommend you.',
    points: [
      'Factual entity structure that AI assistants quote accurately',
      'Schema markup spelling out your services, area, and credentials',
      'Future-proofed as discovery shifts from keywords to AI answers'
    ]
  }
];

const WhyUsPage: React.FC<WhyUsPageProps> = ({ navigateTo }) => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      ref={rootRef}
      className="bg-[#fdfbf7] min-h-screen text-slate-900 font-inter pt-24 md:pt-48 pb-20 md:pb-36 px-5 md:px-10 lg:px-16 overflow-x-hidden selection:bg-emerald-600/20"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* =================================================================== */}
        {/* 1. PAGE HERO HEADER (Matches Projects, Process, FAQ & Contact)      */}
        {/* =================================================================== */}
        <header className="mb-12 md:mb-24">
          <p
            className="wu-rise mb-3.5 md:mb-6 text-[9px] md:text-[11px] font-black uppercase tracking-[0.45em] text-emerald-700"
            style={{ animationDelay: '0ms' }}
          >
            Why Us?
          </p>
          <h1
            className="wu-rise font-syne text-[clamp(2rem,8.5vw,5rem)] font-black text-slate-950 tracking-tighter uppercase leading-[0.9] mb-6 md:mb-10"
            style={{ animationDelay: '80ms' }}
          >
            BUILT TO <br />
            <span className="text-shimmer-blue italic inline-block pr-2">WIN WORK.</span>
          </h1>
          <div
            className="wu-rise max-w-3xl border-l-[4px] md:border-l-[8px] border-emerald-100 pl-5 md:pl-14"
            style={{ animationDelay: '160ms' }}
          >
            <p className="text-base md:text-xl lg:text-2xl text-slate-500 font-medium italic leading-relaxed">
              We design and hand-code fast, clear websites for Wiltshire and UK businesses. No bloated templates, no agency middlemen, and most sites go live in up to 10 days.
            </p>
          </div>
        </header>

        {/* =================================================================== */}
        {/* 2. CLEAN STATISTICS STRIP WITH COUNT-UP ANIMATION                   */}
        {/* =================================================================== */}
        <section
          aria-label="Web design impact statistics"
          className="wu-stats-strip mb-12 sm:mb-16 md:mb-20 py-7 sm:py-10 border-y border-slate-200/90"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
            {KeyStats.map((stat, idx) => (
              <CountUpStat key={stat.label} stat={stat} index={idx} />
            ))}
          </div>
        </section>

        {/* =================================================================== */}
        {/* 3. FOUR PILLARS (Condensed 2x2 grid — compact, clean & easy to read) */}
        {/* =================================================================== */}
        <section className="mb-14 sm:mb-20">
          <div className="mb-7 sm:mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700 mb-1.5">
                How We Make A Difference
              </p>
              <h2 className="font-inter text-xl sm:text-2xl md:text-3xl font-semibold text-slate-950 tracking-tight leading-snug">
                Four reasons ambitious businesses build with us
              </h2>
            </div>
            <Link
              to={PAGE_PATHS.work}
              onClick={() => navigateTo('work')}
              className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-emerald-700 hover:text-slate-950 transition-colors shrink-0"
            >
              <span>Browse our live client demos</span>
              <ArrowUpRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-14 gap-y-6 sm:gap-y-8 border-t border-b border-slate-200/90 py-6 sm:py-8">
            {CorePillars.map((pillar) => (
              <article
                key={pillar.id}
                className="wu-pillar-row flex flex-col justify-between pb-5 sm:pb-6 md:pb-2 border-b md:border-b-0 last:border-b-0 border-slate-200/70"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="text-xs font-semibold text-emerald-700 tabular-nums">
                      {pillar.id}
                    </span>
                    <span className="w-4 h-px bg-slate-300" />
                    <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                      {pillar.phase}
                    </span>
                  </div>
                  <h3 className="font-inter text-lg sm:text-xl font-semibold tracking-tight leading-snug text-slate-950 mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3.5">
                    {pillar.summary}
                  </p>
                  <ul className="space-y-1.5">
                    {pillar.points.map((pt) => (
                      <li
                        key={pt}
                        className="flex items-start gap-2.5 text-xs sm:text-[13.5px] text-slate-800 leading-snug"
                      >
                        <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                          <Check size={11} strokeWidth={2.5} />
                        </span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* =================================================================== */}
        {/* 4. SIMPLE, CLEAN BOTTOM CALL TO ACTION                              */}
        {/* =================================================================== */}
        <section className="pt-4 sm:pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-8">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700 mb-2.5">
              Ready when you are
            </p>
            <h2 className="font-inter text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-950 tracking-tight leading-snug mb-3">
              Let’s talk about your website.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Send a message for honest advice and one fixed price in writing — with your new site live in up to 10 days.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 shrink-0">
            <Link
              to={PAGE_PATHS.contact}
              onClick={() => navigateTo('contact')}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-emerald-600 hover:bg-slate-950 text-white text-sm font-semibold transition-colors shadow-sm"
            >
              <span>Start your project</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              to={PAGE_PATHS.work}
              onClick={() => navigateTo('work')}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 text-slate-800 text-sm font-medium transition-colors"
            >
              <span>View demos</span>
            </Link>
          </div>
        </section>

      </div>

      <style>{`
        @keyframes wu-rise {
          from { opacity: 0; transform: translate3d(0, 16px, 0); }
          to   { opacity: 1; transform: none; }
        }
        .wu-rise {
          animation: wu-rise 0.65s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .wu-rise { animation: none; }
        }
      `}</style>
    </div>
  );
};

export default WhyUsPage;
