import React, { useState, useEffect, useRef } from 'react';
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { motion as framerMotion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  ArrowUpRight,
  Plus,
  Minus,
} from 'lucide-react';
import LuxuryNavbar from './LuxuryNavbar';
import LuxuryFooter from './LuxuryFooter';
import LuxuryCountUp from './LuxuryCountUp';
import {
  OAK_ASH_BRAND,
  HERO_SLIDES,
  PORTFOLIO_COLLECTIONS,
  SHOW_GARDENS,
  CORE_SERVICES,
  FAQS,
} from '../landscaping/landscapingData';

const motion = framerMotion as any;
gsap.registerPlugin(ScrollTrigger);

// Track whether the visitor navigated internally within the luxury demo
export const markLuxuryInternalNav = () => {
  if (typeof window !== 'undefined') {
    (window as any).__oakAshLuxuryInternalNav = true;
  }
};

export const LuxuryHome: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [heroIndex, setHeroIndex] = useState(0);
  const [secondarySlidesReady, setSecondarySlidesReady] = useState(false);
  const [activePortfolioIdx, setActivePortfolioIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
  }, []);

  // Mount secondary hero slides only after the initial hero entrance has completed
  // so opening the page never decodes 4 high-res photos simultaneously.
  useEffect(() => {
    const readyTimer = window.setTimeout(() => {
      setSecondarySlidesReady(true);
    }, 1400);
    return () => window.clearTimeout(readyTimer);
  }, []);

  // Gentle auto-advance on the hero slideshow
  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, []);

  // Below-the-fold scroll choreography — deferred until after the hero entrance
  // so opening the site has zero main-thread layout contention.
  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;

    const reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    let ctx: gsap.Context | null = null;
    const initTimer = window.setTimeout(() => {
      ctx = gsap.context(() => {
        // 1. Smooth upward glide on editorial blocks below the fold
        gsap.utils.toArray<HTMLElement>('.prestige-glide').forEach((el) => {
          gsap.fromTo(
            el,
            { y: 36, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.05,
              ease: 'power3.out',
              force3D: true,
              scrollTrigger: {
                trigger: el,
                start: 'top 88%',
                once: true,
              },
            }
          );
        });

        // 2. Staggered stat items pop & progress bar sweep
        gsap.utils.toArray<HTMLElement>('.prestige-stat-group').forEach((group) => {
          const items = group.querySelectorAll('.prestige-stat-item');
          const bars = group.querySelectorAll('.prestige-stat-bar');

          gsap.fromTo(
            items,
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.95,
              stagger: 0.12,
              ease: 'power3.out',
              force3D: true,
              scrollTrigger: {
                trigger: group,
                start: 'top 88%',
                once: true,
              },
            }
          );

          gsap.fromTo(
            bars,
            { scaleX: 0, transformOrigin: 'left center' },
            {
              scaleX: 1,
              duration: 1.35,
              stagger: 0.14,
              ease: 'expo.out',
              force3D: true,
              scrollTrigger: {
                trigger: group,
                start: 'top 88%',
                once: true,
              },
            }
          );
        });

        // 3. GPU-friendly image reveal on below-the-fold feature frames
        gsap.utils.toArray<HTMLElement>('.prestige-curtain').forEach((wrap) => {
          gsap.fromTo(
            wrap,
            { y: 28, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.1,
              ease: 'power3.out',
              force3D: true,
              scrollTrigger: {
                trigger: wrap,
                start: 'top 88%',
                once: true,
              },
            }
          );
        });

        // 4. Tan hairline sweep
        gsap.utils.toArray<HTMLElement>('.prestige-rule').forEach((line) => {
          gsap.fromTo(
            line,
            { scaleX: 0, transformOrigin: 'left center' },
            {
              scaleX: 1,
              duration: 1.15,
              ease: 'expo.out',
              force3D: true,
              scrollTrigger: {
                trigger: line,
                start: 'top 90%',
                once: true,
              },
            }
          );
        });
      }, root);
    }, 220);

    return () => {
      window.clearTimeout(initTimer);
      ctx?.revert();
    };
  }, []);

  const activePortfolio =
    PORTFOLIO_COLLECTIONS[activePortfolioIdx] || PORTFOLIO_COLLECTIONS[0];

  const visibleSlides = secondarySlidesReady ? HERO_SLIDES : HERO_SLIDES.slice(0, 1);

  return (
    <div
      ref={pageRef}
      className="bg-[#0C0A08] text-[#F4F1EA] min-h-screen selection:bg-[#C8B88A] selection:text-[#0C0A08] font-sans relative"
    >
      <LuxuryNavbar />

      {/* =================================================================== */}
      {/* 1. CLEAN UNOBSTRUCTED FULL-BLEED HERO                               */}
      {/* =================================================================== */}
      <section className="relative h-screen min-h-[100svh] flex flex-col justify-end pb-20 sm:pb-28 md:pb-32 px-5 sm:px-12 md:px-20 overflow-hidden bg-[#0C0A08]">
        {visibleSlides.map((slide, idx) => {
          const isCurrent = idx === heroIndex;
          return (
            <div
              key={slide.image}
              className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out ${
                isCurrent ? 'opacity-100 z-0' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                loading={idx === 0 ? 'eager' : 'lazy'}
                decoding={idx === 0 ? 'sync' : 'async'}
                fetchPriority={idx === 0 ? 'high' : undefined}
                className="w-full h-full object-cover opacity-75 transform-gpu"
              />
              {/* Soft obsidian gradient for effortless legibility without any box or frame */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0A08] via-[#0C0A08]/35 to-[#0C0A08]/55" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0C0A08]/75 via-[#0C0A08]/20 to-transparent" />
            </div>
          );
        })}

        {/* ONLY THE 4 REQUESTED LINES IN THE OPTIMAL EDITORIAL FOCAL POSITION */}
        {/* Animated via single-pass compositor-thread CSS keyframes (animation-fill-mode: both) so the text never flashes or stutters and only appears once */}
        <div className="relative z-20 max-w-7xl mx-auto w-full">
          <div className="max-w-4xl space-y-4 sm:space-y-6">
            <span className="lux-hero-kicker-once block text-[9px] sm:text-xs font-mono uppercase tracking-[0.28em] sm:tracking-[0.48em] text-[#C8B88A]">
              EST. 1998 · WILTSHIRE, SURREY &amp; LONDON
            </span>

            <h1
              style={{ textShadow: '0 12px 32px rgba(0, 0, 0, 0.55)' }}
              className="font-cinzel text-[2.1rem] sm:text-6xl md:text-7xl lg:text-[5.6rem] font-bold uppercase text-[#F4F1EA] leading-[0.98] sm:leading-[0.96] tracking-tight"
            >
              <span className="block overflow-hidden pb-1">
                <span
                  style={{ animationDelay: '40ms' }}
                  className="lux-mask-line-once block"
                >
                  TWENTY-EIGHT
                </span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span
                  style={{ animationDelay: '150ms' }}
                  className="lux-mask-line-once block"
                >
                  YEARS OF RARE
                </span>
              </span>
              <span className="block overflow-hidden pt-1">
                <span
                  style={{ animationDelay: '260ms' }}
                  className="lux-mask-line-once block font-cormorant italic font-normal normal-case tracking-normal text-[#C8B88A] text-[2.5rem] sm:text-7xl lg:text-[6.2rem]"
                >
                  Award-Winning Gardens.
                </span>
              </span>
            </h1>
          </div>
        </div>

        <style>{`
          @keyframes luxHeroKickerOnce {
            0% {
              opacity: 0;
              transform: translate3d(0, 14px, 0);
            }
            100% {
              opacity: 1;
              transform: translate3d(0, 0, 0);
            }
          }
          @keyframes luxMaskLineOnce {
            0% {
              opacity: 0;
              transform: translate3d(0, 102%, 0);
            }
            100% {
              opacity: 1;
              transform: translate3d(0, 0, 0);
            }
          }
          .lux-hero-kicker-once {
            animation: luxHeroKickerOnce 0.85s cubic-bezier(0.22, 1, 0.36, 1) 0ms 1 both;
            will-change: transform, opacity;
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
          }
          .lux-mask-line-once {
            animation: luxMaskLineOnce 0.95s cubic-bezier(0.22, 1, 0.36, 1) 1 both;
            will-change: transform, opacity;
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
          }
          @media (prefers-reduced-motion: reduce) {
            .lux-hero-kicker-once,
            .lux-mask-line-once {
              animation: none !important;
              opacity: 1 !important;
              transform: none !important;
            }
          }
        `}</style>
      </section>

      {/* =================================================================== */}
      {/* 2. THE PRACTICE (With Live Counting Numbers & Animated Progress)    */}
      {/* =================================================================== */}
      <section className="relative py-16 sm:py-32 md:py-48 px-5 sm:px-6 md:px-14 bg-[#0C0A08] border-b border-[#C8B88A]/15">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-16 lg:gap-24 items-center">
          <div className="prestige-glide lg:col-span-6 space-y-6 sm:space-y-8">
            <span className="text-[10px] uppercase tracking-[0.45em] text-[#C8B88A] font-mono font-bold block">
              <LuxuryCountUp end={1} padZero /> · THE PRACTICE
            </span>

            <h2 className="font-cinzel text-2xl sm:text-5xl font-bold uppercase tracking-tight text-[#F4F1EA] leading-[1.14] sm:leading-[1.12]">
              TWENTY-EIGHT YEARS OF <br />
              AWARD-WINNING GARDENS. <br />
              <span className="font-cormorant italic font-normal text-[#C8B88A]">
                CRAFTED UNDER ONE ROOF.
              </span>
            </h2>

            <div className="prestige-rule h-[1px] w-24 bg-[#C8B88A]" />

            <p className="text-sm sm:text-base text-[#F4F1EA]/65 font-light leading-[1.85] max-w-lg">
              From the initial consultation and spatial masterplan through to natural stone masonry, bespoke metalwork, and mature planting, our permanent in-house teams handle every stage of your garden transformation without third-party friction.
            </p>

            {/* ANIMATED COUNTING STATS */}
            <div className="prestige-stat-group pt-7 sm:pt-8 border-t border-[#C8B88A]/20 grid grid-cols-3 gap-4 sm:gap-8">
              <div className="prestige-stat-item">
                <div className="font-cinzel text-2xl sm:text-5xl font-bold text-[#C8B88A]">
                  <LuxuryCountUp end={28} suffix="+" duration={1900} />
                </div>
                <div className="h-[1px] w-full bg-[#C8B88A]/15 my-2 sm:my-2.5 overflow-hidden">
                  <div className="prestige-stat-bar h-full w-full bg-[#C8B88A]" />
                </div>
                <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.16em] sm:tracking-[0.26em] text-[#F4F1EA]/55">
                  Years Est.
                </div>
              </div>

              <div className="prestige-stat-item">
                <div className="font-cinzel text-2xl sm:text-5xl font-bold text-[#C8B88A]">
                  <LuxuryCountUp end={22} duration={2000} />
                </div>
                <div className="h-[1px] w-full bg-[#C8B88A]/15 my-2 sm:my-2.5 overflow-hidden">
                  <div className="prestige-stat-bar h-full w-full bg-[#C8B88A]" />
                </div>
                <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.16em] sm:tracking-[0.26em] text-[#F4F1EA]/55">
                  RHS &amp; BALI
                </div>
              </div>

              <div className="prestige-stat-item">
                <div className="font-cinzel text-2xl sm:text-5xl font-bold text-[#C8B88A]">
                  <LuxuryCountUp end={100} suffix="%" duration={2100} />
                </div>
                <div className="h-[1px] w-full bg-[#C8B88A]/15 my-2 sm:my-2.5 overflow-hidden">
                  <div className="prestige-stat-bar h-full w-full bg-[#C8B88A]" />
                </div>
                <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.16em] sm:tracking-[0.26em] text-[#F4F1EA]/55">
                  In-House
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-4 sm:gap-8">
              <Link
                to="/demo/landscaping-luxury/services"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#C8B88A] hover:bg-[#D8CBA3] text-[#0C0A08] font-bold text-xs uppercase tracking-[0.25em] transition-all"
              >
                <span>EXPLORE DESIGN &amp; BUILD</span>
                <ArrowRight size={13} />
              </Link>
              <Link
                to="/demo/landscaping-luxury/about"
                className="text-xs uppercase tracking-[0.25em] font-mono text-[#C8B88A] hover:text-[#F4F1EA] transition-colors text-center sm:text-left py-2 sm:py-0"
              >
                OUR HERITAGE →
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="prestige-curtain relative overflow-hidden aspect-[16/11] bg-[#16130E] border border-[#C8B88A]/25 group">
              <img
                src="https://dmhdaawgg48dl.cloudfront.net/wp-content/uploads/2024/11/metal-dining-set-boxwood-topiary-cottage-esher-surrey-960x960.jpg"
                alt="Clipped boxwood topiary and Yorkstone dining terrace"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
            <p className="prestige-glide text-[10px] font-mono uppercase tracking-[0.28em] text-[#C8B88A]/80 mt-4">
              <LuxuryCountUp end={1} padZero /> · Clipped Boxwood Topiary &amp; Hand-Laid Yorkstone Terrace · Surrey
            </p>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 3. CURATED PORTFOLIOS (Fluid Tabs + Interactive Showcase)           */}
      {/* =================================================================== */}
      <section className="relative py-16 sm:py-32 md:py-48 px-5 sm:px-6 md:px-14 bg-[#110E0B] border-b border-[#C8B88A]/15">
        <div className="max-w-6xl mx-auto space-y-12 sm:space-y-20">
          <div className="prestige-glide flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#C8B88A]/20">
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-[0.45em] text-[#C8B88A] font-mono font-bold block">
                <LuxuryCountUp end={2} padZero /> · SELECTED WORKS (<LuxuryCountUp end={6} padZero /> COLLECTIONS)
              </span>
              <h2 className="font-cinzel text-2xl sm:text-5xl font-bold uppercase tracking-tight text-[#F4F1EA]">
                GARDEN PORTFOLIOS
              </h2>
            </div>

            {/* FLUID TABS */}
            <div className="flex items-center gap-5 sm:gap-8 overflow-x-auto pb-1 no-scrollbar">
              {PORTFOLIO_COLLECTIONS.map((item, idx) => {
                const isActive = activePortfolioIdx === idx;
                return (
                  <button
                    key={item.index}
                    type="button"
                    onClick={() => setActivePortfolioIdx(idx)}
                    className={`group relative pb-3 text-xs font-mono uppercase tracking-[0.2em] transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                      isActive ? 'text-[#F4F1EA] font-bold' : 'text-[#F4F1EA]/40 hover:text-[#C8B88A]'
                    }`}
                  >
                    <span className={`text-[10px] ${isActive ? 'text-[#C8B88A] font-bold' : 'text-[#C8B88A]/40'}`}>
                      {item.index}
                    </span>
                    <span>{item.title.split(' ')[0]}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C8B88A]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ACTIVE PORTFOLIO SPOTLIGHT */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePortfolio.index}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-14 lg:gap-20 items-center"
            >
              <div className="lg:col-span-7">
                <div className="relative overflow-hidden aspect-[16/10] bg-[#16130E] border border-[#C8B88A]/25 group">
                  <img
                    src={activePortfolio.image}
                    alt={activePortfolio.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-2.5">
                  <span className="font-mono text-xs text-[#C8B88A] uppercase tracking-[0.28em] font-bold block">
                    {activePortfolio.index} · {activePortfolio.location}
                  </span>
                  <h3 className="font-cinzel text-2xl sm:text-4xl font-bold uppercase tracking-tight text-[#F4F1EA]">
                    {activePortfolio.title}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-[#F4F1EA]/65 font-light leading-[1.85]">
                  {activePortfolio.summary}
                </p>

                <div className="pt-4 border-t border-[#C8B88A]/20 flex flex-wrap items-center gap-6">
                  <Link
                    to="/demo/landscaping-luxury/gallery"
                    className="inline-flex items-center gap-3 px-7 py-3.5 bg-[#C8B88A] hover:bg-[#D8CBA3] text-[#0C0A08] font-bold text-xs uppercase tracking-[0.24em] transition-all"
                  >
                    <span>VIEW COMPLETE ARCHIVE</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* FULL 6-PORTFOLIO ARCHITECTURAL GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-8 border-t border-[#C8B88A]/20">
            {PORTFOLIO_COLLECTIONS.map((item, idx) => (
              <div
                key={item.index}
                onClick={() => setActivePortfolioIdx(idx)}
                className="prestige-glide group cursor-pointer flex flex-col"
              >
                <div className="w-full aspect-[4/5] overflow-hidden bg-[#16130E] border border-[#C8B88A]/20 group-hover:border-[#C8B88A] transition-colors">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                  />
                </div>
                <div className="pt-4 pb-3 border-b border-[#C8B88A]/20 flex items-baseline justify-between gap-3">
                  <div className="flex items-baseline gap-3 min-w-0">
                    <span className="font-mono text-xs text-[#C8B88A] shrink-0">
                      <LuxuryCountUp end={idx + 1} padZero duration={1400 + idx * 150} />
                    </span>
                    <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#F4F1EA] group-hover:text-[#C8B88A] transition-colors truncate uppercase">
                      {item.title}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D8CBA3]/60 shrink-0">
                    {item.location}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 4. FOUR ARCHITECTURAL DISCIPLINES (Heavy Curtain Glide)             */}
      {/* =================================================================== */}
      <section className="py-16 sm:py-32 md:py-48 px-5 sm:px-6 md:px-14 bg-[#0C0A08] border-b border-[#C8B88A]/15">
        <div className="max-w-6xl mx-auto space-y-16 sm:space-y-32">
          <div className="prestige-glide flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#C8B88A]/20">
            <div>
              <span className="text-[10px] uppercase tracking-[0.45em] text-[#C8B88A] font-mono font-bold block mb-3">
                <LuxuryCountUp end={3} padZero /> · TURNKEY PRACTICE (<LuxuryCountUp end={4} padZero /> DISCIPLINES)
              </span>
              <h2 className="font-cinzel text-2xl sm:text-5xl font-bold uppercase tracking-tight text-[#F4F1EA]">
                DESIGN &amp; MASTER CONSTRUCTION
              </h2>
            </div>
            <Link
              to="/demo/landscaping-luxury/services"
              className="text-xs font-mono uppercase tracking-[0.25em] text-[#C8B88A] hover:text-[#F4F1EA] transition-colors"
            >
              ALL 4 DISCIPLINES →
            </Link>
          </div>

          {CORE_SERVICES.slice(0, 2).map((service, idx) => (
            <div
              key={service.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-16 lg:gap-24 items-center"
            >
              <div className={`lg:col-span-6 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="prestige-curtain overflow-hidden aspect-[4/3] bg-[#16130E] border border-[#C8B88A]/25">
                  <img
                    src={service.img}
                    alt={service.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className={`prestige-glide lg:col-span-6 space-y-6 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                <span className="text-[10px] font-mono uppercase tracking-[0.38em] text-[#C8B88A] block">
                  <LuxuryCountUp end={idx + 1} padZero /> · {service.kicker}
                </span>
                <h3 className="font-cinzel text-2xl sm:text-4xl font-bold text-[#F4F1EA] uppercase leading-tight">
                  {service.title}
                </h3>
                <div className="prestige-rule h-[1px] w-20 bg-[#C8B88A]" />
                <p className="text-[#F4F1EA]/65 text-sm sm:text-base font-light leading-[1.85]">
                  {service.prose}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-[#C8B88A]/20">
                  {service.deliverables.map((d) => (
                    <div key={d} className="text-xs font-mono text-[#D8CBA3]/85 py-1">
                      · {d}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =================================================================== */}
      {/* 5. RHS CHELSEA SHOW GARDENS                                         */}
      {/* =================================================================== */}
      <section className="py-16 sm:py-32 md:py-44 px-5 sm:px-6 md:px-14 bg-[#110E0B] border-b border-[#C8B88A]/15">
        <div className="max-w-6xl mx-auto">
          <div className="prestige-glide flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-20 gap-6 pb-8 border-b border-[#C8B88A]/20">
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.42em] text-[#C8B88A] block">
                <LuxuryCountUp end={4} padZero /> · ROYAL HORTICULTURAL SOCIETY HONOURS
              </span>
              <h2 className="font-cinzel text-2xl sm:text-5xl font-bold text-[#F4F1EA] uppercase tracking-tight">
                AWARD-WINNING SHOW GARDENS
              </h2>
            </div>
            <p className="text-[#F4F1EA]/55 text-xs sm:text-sm font-light max-w-md leading-relaxed">
              Multiple Gold and Silver-Gilt medals at the RHS Chelsea Flower Show and BALI National Landscape Awards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {SHOW_GARDENS.map((garden, idx) => (
              <Link
                key={garden.title}
                to="/demo/landscaping-luxury/gallery"
                className="prestige-glide group flex flex-col h-full"
              >
                <div className="overflow-hidden aspect-square bg-[#16130E] border border-[#C8B88A]/20 group-hover:border-[#C8B88A] transition-colors mb-5">
                  <img
                    src={garden.image}
                    alt={garden.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                  />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-[#C8B88A] block mb-1.5">
                  RHS Chelsea · <LuxuryCountUp end={Number(garden.year)} duration={1600 + idx * 150} />
                </span>
                <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#F4F1EA] group-hover:text-[#C8B88A] transition-colors uppercase mb-1.5">
                  {garden.title}
                </h3>
                <p className="text-xs font-light text-[#F4F1EA]/55 leading-relaxed">
                  {garden.detail}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 6. PRIVATE COMMISSIONS & FREQUENTLY ASKED QUESTIONS                 */}
      {/* =================================================================== */}
      <section className="py-16 sm:py-32 md:py-44 px-5 sm:px-6 md:px-14 bg-[#0C0A08]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-14 lg:gap-20 items-start">
          {/* Left: Private Commissions Desk */}
          <div className="prestige-glide lg:col-span-5 space-y-6 sm:space-y-8 border border-[#C8B88A]/30 bg-[#120F0B] p-6 sm:p-10">
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#C8B88A] block">
                <LuxuryCountUp end={5} padZero /> · PRIVATE COMMISSIONS
              </span>
              <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-[#F4F1EA] uppercase leading-tight">
                FROM FIRST SKETCH TO MATURITY.
              </h2>
            </div>

            <p className="text-[#F4F1EA]/65 text-sm font-light leading-[1.85]">
              Whether transforming a country estate in Wiltshire, a family lawn in Surrey, or a secluded courtyard in Fulham, our studio provides a calm, transparent experience with a single dedicated project director throughout.
            </p>

            <div className="space-y-4 pt-6 border-t border-[#C8B88A]/20">
              <div>
                <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#C8B88A] block mb-1">
                  DIRECT ENQUIRIES
                </span>
                <a
                  href={`tel:${OAK_ASH_BRAND.phoneHref}`}
                  className="font-cinzel text-2xl text-[#F4F1EA] hover:text-[#C8B88A] transition-colors tabular-nums block"
                >
                  {OAK_ASH_BRAND.phoneDisplay}
                </a>
                <a
                  href={`mailto:${OAK_ASH_BRAND.email}`}
                  className="text-xs text-[#F4F1EA]/60 hover:text-[#F4F1EA] transition-colors break-all block mt-1"
                >
                  {OAK_ASH_BRAND.email}
                </a>
              </div>

              <div className="pt-2">
                <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#C8B88A] block mb-1">
                  DESIGN STUDIO &amp; STONE YARD
                </span>
                <p className="font-cormorant italic text-xl text-[#F4F1EA]">
                  {OAK_ASH_BRAND.studioName}, {OAK_ASH_BRAND.address}
                </p>
              </div>
            </div>

            <Link
              to="/demo/landscaping-luxury/contact"
              className="w-full inline-flex items-center justify-center gap-3 py-4 px-7 bg-[#C8B88A] hover:bg-[#D8CBA3] text-[#0C0A08] font-bold text-xs uppercase tracking-[0.26em] transition-all"
            >
              <span>BOOK PRIVATE CONSULTATION</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          {/* Right: Luxury Accordion */}
          <div className="prestige-glide lg:col-span-7">
            <div className="mb-8 sm:mb-10 space-y-2.5">
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#C8B88A] block">
                CLIENT GUIDANCE
              </span>
              <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-[#F4F1EA] uppercase">
                FREQUENTLY ASKED QUESTIONS
              </h2>
            </div>

            <div className="border-t border-[#C8B88A]/20">
              {FAQS.map((item, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={item.q} className="border-b border-[#C8B88A]/20">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full py-5 sm:py-6 text-left flex items-center justify-between gap-6 group cursor-pointer"
                    >
                      <h3 className="font-cormorant text-xl sm:text-2xl font-normal text-[#F4F1EA] group-hover:text-[#C8B88A] transition-colors leading-snug">
                        {item.q}
                      </h3>
                      <span className="text-[#C8B88A] shrink-0">
                        {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                      </span>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-out ${
                        isOpen ? 'max-h-72 pb-6 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <p className="text-[#F4F1EA]/65 text-sm sm:text-base font-light leading-[1.85]">
                        {item.a}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <LuxuryFooter />
    </div>
  );
};

export default LuxuryHome;
