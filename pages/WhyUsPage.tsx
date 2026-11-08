import React, { useEffect, useRef } from 'react';
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import {
  ArrowRight,
  ArrowUpRight,
  MoveRight,
  CheckCircle2
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Page, PAGE_PATHS } from '../App';
import { HERO } from '../gateway/GatewayPage';

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
    value: '2–3 Wks',
    label: 'From Chat To Live',
    detail: 'Direct with the founder, one fixed written quote, and 100% ownership from day one.'
  }
];

const CorePillars = [
  {
    id: '01',
    phase: 'Credibility & Trust',
    title: 'First Impressions Decide Everything',
    summary:
      'Your website isn’t just an online leaflet — it’s how people judge the standard of your work before they ever pick up the phone. If someone lands on an outdated page, a awkward menu, or a layout that breaks on their phone, they quietly assume the service behind it is the same and move on to a competitor who looks the part.',
    points: [
      'A sharp, modern shopfront that makes your business look established from the first second',
      'Designed around how real people read and decide — guiding visitors naturally toward getting in touch',
      'Direct collaboration with Raphael from start to finish, with zero agency middlemen'
    ]
  },
  {
    id: '02',
    phase: 'Custom Engineering',
    title: 'Zero Bloated Templates, 100% Hand-Built Code',
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
    title: 'Showing Up In Local Searches',
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
    title: 'Ready For AI Search & Recommendations',
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

    const ctx = gsap.context(() => {
      // Light animation for the stats strip
      gsap.fromTo(
        '.wu-stat-item',
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.wu-stats-strip',
            start: 'top 88%',
            once: true
          }
        }
      );

      // Light, smooth reveal for each open pillar row
      gsap.utils.toArray<HTMLElement>('.wu-pillar-row').forEach((row) => {
        const line = row.querySelector('.wu-row-line');
        const body = row.querySelector('.wu-row-body');

        if (line) {
          gsap.fromTo(
            line,
            { scaleX: 0 },
            {
              scaleX: 1,
              transformOrigin: 'left center',
              duration: 0.75,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: row,
                start: 'top 88%',
                once: true
              }
            }
          );
        }

        if (body) {
          gsap.fromTo(
            body,
            { opacity: 0, y: 22 },
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: row,
                start: 'top 86%',
                once: true
              }
            }
          );
        }
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="bg-[#fdfbf7] min-h-screen text-slate-950 pt-32 md:pt-48 pb-36 md:pb-48 overflow-x-hidden selection:bg-emerald-600/20"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        
        {/* =================================================================== */}
        {/* 1. PAGE HEADER (Matches Projects & Process)                         */}
        {/* =================================================================== */}
        <div className="mb-14 md:mb-20">
          <p
            className="wu-rise mb-6 text-[9px] md:text-[11px] font-black uppercase tracking-[0.45em] text-emerald-700"
            style={{ animationDelay: '0ms' }}
          >
            Why us?
          </p>
          <h1
            className="wu-rise font-syne text-[clamp(2.5rem,10vw,5rem)] font-black text-slate-950 tracking-tighter uppercase leading-[0.9] mb-10"
            style={{ animationDelay: '80ms' }}
          >
            BUILT TO <br />
            <span className="text-shimmer-blue italic">WIN WORK.</span>
          </h1>
          <div
            className="wu-rise max-w-3xl border-l-[6px] md:border-l-[8px] border-emerald-100 pl-8 md:pl-14"
            style={{ animationDelay: '160ms' }}
          >
            <p className="text-lg md:text-xl lg:text-2xl text-slate-500 font-medium italic leading-relaxed">
              Hand-built websites for Wiltshire and UK businesses that want to look the part, load in under a second, and turn visitors into real enquiries.
            </p>
          </div>
        </div>

        {/* =================================================================== */}
        {/* 2. SABRDIGITAL.CO.UK HOMEPAGE PREVIEW WINDOW (Oak & Ash style)      */}
        {/* =================================================================== */}
        <div
          className="wu-rise mb-20 md:mb-28"
          style={{ animationDelay: '220ms' }}
        >
          <div className="group/card relative w-full rounded-[1.25rem] sm:rounded-[1.5rem] overflow-hidden bg-white border border-slate-200 shadow-[0_30px_70px_-35px_rgba(15,23,42,0.42)] hover:shadow-[0_45px_100px_-35px_rgba(15,23,42,0.52)] transition-shadow duration-700">
            
            {/* TOP BROWSER CHROME BAR */}
            <div className="shrink-0 flex items-center gap-3 px-4 sm:px-6 py-3 sm:py-3.5 bg-[#F6F7F9] border-b border-slate-200">
              <span className="flex items-center gap-1.5 shrink-0">
                <span className="block w-2.5 h-2.5 rounded-full bg-[#DFE3E9]" />
                <span className="block w-2.5 h-2.5 rounded-full bg-[#DFE3E9]" />
                <span className="block w-2.5 h-2.5 rounded-full bg-[#DFE3E9]" />
              </span>

              <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/70 text-[8.5px] sm:text-[9.5px] font-syne font-black uppercase tracking-wider shrink-0">
                STUDIO · FLAGSHIP
              </span>

              <span className="flex-1 min-w-0 h-7 px-3.5 rounded-md bg-white border border-slate-200/90 flex items-center justify-between gap-2">
                <span className="truncate text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                  sabrdigital.co.uk
                </span>
                <span className="hidden sm:inline-flex items-center gap-1.5 text-[8.5px] font-bold uppercase tracking-[0.2em] text-emerald-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Studio
                </span>
              </span>
            </div>

            {/* MIDDLE SCREEN — ACTUAL SABR DIGITAL HOME SCREEN */}
            <div className="relative overflow-hidden aspect-[16/10] sm:aspect-[16/9] bg-[#0b0d10] select-none">
              <picture>
                <source type="image/webp" srcSet={HERO['web-design'].srcSet} sizes="100vw" />
                <img
                  src="/images/hero-bg-1920.webp"
                  srcSet="/images/hero-bg-1280.webp 1280w, /images/hero-bg-1920.webp 1920w, /images/hero-bg-2560.webp 2560w, /images/hero-bg-3840.webp 3840w"
                  sizes="100vw"
                  width={1920}
                  height={1080}
                  alt="sabrdigital.co.uk homepage preview - Rooted in Wiltshire"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover/card:scale-[1.03]"
                />
              </picture>

              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/45 to-black/75" />

              {/* Top Replica Navbar */}
              <div className="relative z-10 flex items-center justify-between px-5 sm:px-10 md:px-14 pt-4 sm:pt-7">
                <div className="flex flex-col items-start">
                  <span className="font-syne text-xs sm:text-base md:text-lg tracking-[0.05em] font-black text-white flex items-center">
                    SABR <span className="text-shimmer-blue ml-1.5">DIGITAL</span>
                  </span>
                  <span className="text-[5.5px] sm:text-[6.5px] uppercase font-bold tracking-[0.35em] text-emerald-300 -mt-0.5">
                    Wiltshire Web Design Studio
                  </span>
                </div>

                <div className="hidden md:flex items-center gap-7">
                  <span className="text-[9px] uppercase tracking-[0.3em] text-stone-200 font-semibold">Projects</span>
                  <span className="text-[9px] uppercase tracking-[0.3em] text-stone-200 font-semibold">Process</span>
                  <span className="text-[9px] uppercase tracking-[0.3em] text-emerald-400 font-semibold">Why Us?</span>
                  <span className="text-[9px] uppercase tracking-[0.3em] text-stone-200 font-semibold">FAQ</span>
                  <span className="px-4 py-1.5 rounded-full bg-[#f5f2eb] text-stone-900 text-[9px] uppercase tracking-[0.2em] font-semibold shadow-sm">
                    Contact
                  </span>
                </div>
              </div>

              {/* Center-Left Replica Hero Content */}
              <div className="absolute inset-0 z-10 flex flex-col justify-center items-center sm:items-start text-center sm:text-left px-6 sm:px-12 md:px-20 pt-6">
                <h2 className="font-syne text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[0.98] tracking-[-0.035em] text-white [text-shadow:0_3px_14px_rgba(0,0,0,0.55)] mb-3 sm:mb-4">
                  Rooted in <span className="text-shimmer-blue italic font-black">Wiltshire.</span>
                </h2>
                <p className="font-inter text-xs sm:text-base md:text-xl text-stone-100 font-normal leading-relaxed [text-shadow:0_2px_8px_rgba(0,0,0,0.6)] mb-4 sm:mb-6 max-w-xl">
                  Custom designs for Ambitous brands.
                </p>
                <div className="flex flex-row gap-2.5 sm:gap-3.5 items-center">
                  <Link
                    to={PAGE_PATHS.contact}
                    onClick={() => navigateTo('contact')}
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-[#f5f2eb] hover:bg-white text-stone-900 rounded-lg sm:rounded-xl font-semibold text-[10px] sm:text-xs tracking-wide shadow-lg flex items-center gap-2 transition-transform hover:scale-[1.02]"
                  >
                    <span>Start Your Project</span>
                    <ArrowRight size={13} />
                  </Link>
                  <Link
                    to={PAGE_PATHS.work}
                    onClick={() => navigateTo('work')}
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-white/10 hover:bg-white/20 text-white/95 border border-white/25 rounded-lg sm:rounded-xl font-medium text-[10px] sm:text-xs tracking-wide backdrop-blur-sm transition-transform hover:scale-[1.02]"
                  >
                    <span>The Work</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* BOTTOM CAPTION STRIP */}
            <div className="shrink-0 flex items-center justify-between gap-4 px-4 sm:px-7 py-3.5 sm:py-4.5 bg-white border-t border-slate-200">
              <span className="flex items-center gap-3 min-w-0">
                <span className="block w-1.5 h-5 sm:h-6 rounded-full bg-emerald-600 shrink-0" />
                <span className="font-syne text-xs sm:text-base font-black uppercase tracking-tight text-slate-950 truncate">
                  SABR Digital
                </span>
                <span className="text-[8px] sm:text-[9.5px] font-extrabold uppercase tracking-[0.18em] text-slate-500 truncate">
                  · Hand-Built In Wiltshire · Fixed Pricing
                </span>
              </span>

              <Link
                to={PAGE_PATHS.home}
                onClick={() => navigateTo('home')}
                className="inline-flex items-center gap-1.5 text-[8.5px] sm:text-[9.5px] font-black uppercase tracking-[0.26em] text-emerald-700 hover:text-slate-950 transition-colors shrink-0"
              >
                <span>sabrdigital.co.uk</span>
                <ArrowUpRight size={13} strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* 3. OPEN UNBOXED STATISTICS STRIP (Why Custom Web Design Pays Off)   */}
        {/* =================================================================== */}
        <section aria-label="Web design impact statistics" className="wu-stats-strip mb-20 md:mb-28 py-10 md:py-14 border-y border-slate-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {KeyStats.map((stat) => (
              <div key={stat.label} className="wu-stat-item flex flex-col justify-between">
                <div>
                  <span className="block font-syne text-4xl sm:text-5xl font-black tracking-tighter text-slate-950 mb-2">
                    {stat.value}
                  </span>
                  <span className="block text-[10px] font-black uppercase tracking-[0.32em] text-emerald-700 mb-3">
                    {stat.label}
                  </span>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {stat.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* =================================================================== */}
        {/* 4. COMPACT 4-PILLAR EDITORIAL SECTION (Zero Boxes, Open Layout)     */}
        {/* =================================================================== */}
        <section className="mb-20 md:mb-28">
          <div className="mb-12 md:mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <p className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.45em] text-emerald-700 mb-4">
                The Four Pillars
              </p>
              <h2 className="font-syne text-[clamp(2rem,5.5vw,3.6rem)] font-black text-slate-950 tracking-tighter uppercase leading-[0.94]">
                WHY AMBITIOUS BRANDS <br />
                <span className="text-shimmer-blue italic">BUILD WITH US.</span>
              </h2>
            </div>
            <Link
              to={PAGE_PATHS.work}
              onClick={() => navigateTo('work')}
              className="group inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.32em] text-slate-950 hover:text-emerald-700 transition-colors shrink-0"
            >
              <span>See our 5 live client demos</span>
              <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div>
            {CorePillars.map((pillar) => (
              <div
                key={pillar.id}
                className="wu-pillar-row relative py-12 md:py-16 last:border-b last:border-slate-200"
              >
                {/* Animated Top Hairline */}
                <div
                  aria-hidden="true"
                  className="wu-row-line absolute left-0 right-0 top-0 h-px bg-slate-200"
                />

                <div className="wu-row-body grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
                  {/* Left Column: Pillar Number & Title */}
                  <div className="lg:col-span-5">
                    <div className="flex items-center gap-3.5 mb-3.5">
                      <span className="font-syne text-sm font-black text-emerald-600 tabular-nums">
                        {pillar.id}
                      </span>
                      <span className="w-7 h-px bg-slate-300" />
                      <span className="text-[9.5px] font-black uppercase tracking-[0.38em] text-slate-400">
                        {pillar.phase}
                      </span>
                    </div>
                    <h3 className="font-syne text-2xl sm:text-3xl font-black uppercase tracking-tighter leading-[0.98] text-slate-950">
                      {pillar.title}
                    </h3>
                  </div>

                  {/* Right Column: Human-written summary + concise points */}
                  <div className="lg:col-span-7 space-y-5">
                    <p className="text-base md:text-[17px] text-slate-600 leading-relaxed">
                      {pillar.summary}
                    </p>
                    <ul className="space-y-2.5 pt-1">
                      {pillar.points.map((pt) => (
                        <li
                          key={pt}
                          className="flex items-start gap-3 text-sm font-semibold text-slate-800"
                        >
                          <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =================================================================== */}
        {/* 5. BOTTOM CTA SECTION                                               */}
        {/* =================================================================== */}
        <div className="pt-8 md:pt-12 text-center">
          <p className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.45em] text-emerald-700 mb-6">
            Ready when you are
          </p>
          <h2 className="font-syne text-[clamp(2.5rem,10vw,5rem)] font-black text-slate-950 tracking-tighter uppercase leading-[0.9] mb-10 md:mb-12">
            LET&rsquo;S BUILD <br />
            <span className="text-shimmer-blue italic">YOUR SITE.</span>
          </h2>
          <Link
            to={PAGE_PATHS.contact}
            onClick={() => navigateTo('contact')}
            className="group/cta inline-flex items-center gap-5 pl-9 pr-2 py-2 rounded-full bg-emerald-600 hover:bg-slate-950 transition-colors duration-500 shadow-[0_25px_60px_-25px_rgba(5,150,105,0.45)]"
          >
            <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.35em] text-white">
              Start your project
            </span>
            <span className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-slate-950 transition-transform duration-500 group-hover/cta:translate-x-1">
              <MoveRight size={20} strokeWidth={2.5} />
            </span>
          </Link>
        </div>

      </div>

      <style>{`
        @keyframes wu-rise {
          from { opacity: 0; transform: translate3d(0, 22px, 0); }
          to   { opacity: 1; transform: none; }
        }
        .wu-rise {
          animation: wu-rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .wu-rise { animation: none; }
        }
      `}</style>
    </div>
  );
};

export default WhyUsPage;
