import React, { useEffect, useRef } from 'react';
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import {
  ArrowRight,
  ArrowUpRight,
  Check
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Page, PAGE_PATHS } from '../App';

gsap.registerPlugin(ScrollTrigger);

interface WhyUsPageProps {
  navigateTo: (page: Page) => void;
}

const KeyStats = [
  {
    value: '0.05s',
    label: 'First Impression Window',
    detail: 'How quickly a visitor forms a gut judgement on your business after your page loads.'
  },
  {
    value: '75%',
    label: 'Credibility From Design',
    detail: 'Of people admit they judge a company’s trustworthiness purely by how its website looks.'
  },
  {
    value: '< 1s',
    label: 'Bespoke Load Speed',
    detail: 'Target load time on our custom builds — stopping the 3-second mobile drop-off cold.'
  },
  {
    value: '≤ 10 Days',
    label: 'From Chat To Live',
    detail: 'Most sites go live in up to 10 days with one fixed written quote and 100% ownership.'
  }
];

const CorePillars = [
  {
    id: '01',
    phase: 'Credibility & Trust',
    title: 'First impressions decide everything',
    summary:
      'Your website isn’t just an online leaflet — it’s how people judge the standard of your work before they ever pick up the phone. When someone lands on an outdated page, a clunky menu, or a layout that breaks on their phone, they quietly assume the service behind it is the same and move on to a competitor who looks the part.',
    points: [
      'A sharp, modern shopfront that makes your business look established from the first second',
      'Designed around how real people read and decide — guiding visitors naturally toward getting in touch',
      'Direct collaboration with Raphael from start to finish, with zero agency middlemen'
    ]
  },
  {
    id: '02',
    phase: 'Custom Engineering',
    title: 'Zero bloated templates, 100% hand-built code',
    summary:
      'Off-the-shelf page builders and cheap WordPress themes rely on heavy plugins and tangled code that slow your site to a crawl. We write every SABR Digital website from scratch in clean code, so it feels instant and never breaks after an update.',
    points: [
      'Instant load speeds: Clean code removes the lag that makes half of mobile visitors leave within three seconds',
      'Built to convert: Clear headlines, effortless quote forms, and one-tap phone links placed right where customers look',
      'Flawless on every screen: Tested on real iPhones, Androids, tablets, and desktops before launch'
    ]
  },
  {
    id: '03',
    phase: 'Google SEO',
    title: 'Showing up in local searches',
    summary:
      'For Wiltshire and UK businesses, being on page two might as well be invisible. Instead of bolting on an SEO plugin as an afterthought, we build proper search foundations straight into the structure of your site.',
    points: [
      'Clean HTML structure and page headings that Google can read and index without friction',
      'Local business markup tuned for your town and surrounding service areas',
      'Top-tier speed scores (Core Web Vitals) that give you a genuine edge over slower template competitors'
    ]
  },
  {
    id: '04',
    phase: 'AI Search (AIO & GEO)',
    title: 'Ready for AI search & recommendations',
    summary:
      'More customers are now asking ChatGPT, Google Gemini, and Perplexity who to hire instead of scrolling through ten blue links. If those AI tools can’t clearly read what you do, where you’re based, and why you’re trusted, your business won’t get mentioned.',
    points: [
      'Clear, factual site structure built so AI assistants can quote and recommend your business accurately',
      'Behind-the-scenes schema data that spells out your services, location, and credentials in plain terms',
      'Future-proof setup so you stay easy to find as search shifts from keywords to AI answers'
    ]
  }
];

const WhyUsPage: React.FC<WhyUsPageProps> = ({ navigateTo }) => {
  const rootRef = useRef<HTMLDivElement>(null);

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

    // Only run scroll triggers on desktop so mobile renders immediately with zero scroll lag
    const canAnimate =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px)').matches;
    if (!canAnimate) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.wu-stat-item',
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.07,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.wu-stats-strip',
            start: 'top 90%',
            once: true
          }
        }
      );

      gsap.utils.toArray<HTMLElement>('.wu-pillar-row').forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 88%',
              once: true
            }
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="bg-[#fdfbf7] min-h-screen text-slate-900 font-inter pt-24 md:pt-48 pb-24 md:pb-48 px-5 md:px-10 lg:px-16 overflow-x-hidden selection:bg-emerald-600/20"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* =================================================================== */}
        {/* 1. PAGE HERO HEADER (Matches Projects, Process, FAQ & Contact)      */}
        {/* =================================================================== */}
        <header className="mb-14 md:mb-32">
          <p
            className="wu-rise mb-3.5 md:mb-6 text-[9px] md:text-[11px] font-black uppercase tracking-[0.45em] text-emerald-700"
            style={{ animationDelay: '0ms' }}
          >
            Why Us?
          </p>
          <h1
            className="wu-rise font-syne text-[clamp(2.25rem,10vw,5rem)] font-black text-slate-950 tracking-tighter uppercase leading-[0.9] mb-6 md:mb-12"
            style={{ animationDelay: '80ms' }}
          >
            BUILT TO <br />
            <span className="text-shimmer-blue italic">WIN WORK.</span>
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
        {/* 2. CLEAN STATISTICS STRIP                                           */}
        {/* =================================================================== */}
        <section
          aria-label="Web design impact statistics"
          className="wu-stats-strip mb-16 sm:mb-24 md:mb-28 py-8 sm:py-12 border-y border-slate-200/90"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
            {KeyStats.map((stat) => (
              <div key={stat.label} className="wu-stat-item flex flex-col">
                <span className="font-inter text-3xl sm:text-4xl font-semibold tracking-tight text-slate-950 tabular-nums mb-1.5">
                  {stat.value}
                </span>
                <span className="text-xs font-semibold text-emerald-700 mb-2">
                  {stat.label}
                </span>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {stat.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* =================================================================== */}
        {/* 3. FOUR PILLARS (Minimalistic, nicely spaced, easy to read)         */}
        {/* =================================================================== */}
        <section className="mb-20 sm:mb-28">
          <div className="mb-10 sm:mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700 mb-2.5">
                How We Make A Difference
              </p>
              <h2 className="font-inter text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-950 tracking-tight leading-snug">
                Four reasons ambitious businesses build with us
              </h2>
            </div>
            <Link
              to={PAGE_PATHS.work}
              onClick={() => navigateTo('work')}
              className="group inline-flex items-center gap-2 text-sm font-medium text-emerald-700 hover:text-slate-950 transition-colors shrink-0"
            >
              <span>Browse our live client demos</span>
              <ArrowUpRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-200/90 border-t border-b border-slate-200/90">
            {CorePillars.map((pillar) => (
              <article
                key={pillar.id}
                className="wu-pillar-row py-10 sm:py-14 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-start"
              >
                {/* Left Column: Number, Category & Straight Heading */}
                <div className="lg:col-span-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-semibold text-emerald-700 tabular-nums">
                      {pillar.id}
                    </span>
                    <span className="w-5 h-px bg-slate-300" />
                    <span className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                      {pillar.phase}
                    </span>
                  </div>
                  <h3 className="font-inter text-xl sm:text-2xl font-semibold tracking-tight leading-snug text-slate-950">
                    {pillar.title}
                  </h3>
                </div>

                {/* Right Column: Clear Summary & Bullet Points */}
                <div className="lg:col-span-7 space-y-5">
                  <p className="text-[15px] sm:text-base text-slate-600 leading-relaxed">
                    {pillar.summary}
                  </p>
                  <ul className="space-y-3 pt-1">
                    {pillar.points.map((pt) => (
                      <li
                        key={pt}
                        className="flex items-start gap-3 text-sm sm:text-[15px] text-slate-800 leading-relaxed"
                      >
                        <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                          <Check size={13} strokeWidth={2.5} />
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
