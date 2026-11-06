import React, { useState, useEffect, useRef } from 'react';
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { motion as framerMotion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowRight, 
  ArrowUpRight, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';
import SpaNavbar from './SpaNavbar';
import SpaFooter from './SpaFooter';
import SpaBookingModal from './SpaBookingModal';
import { SPA_DATA } from './spaData';

const motion = framerMotion as any;
gsap.registerPlugin(ScrollTrigger);

// =====================================================================
// LUXURY DRAW INTRO (Slow, Measured, Elegant Stroke-Reveal, No Flash)
// =====================================================================
const LuxuryDrawIntro: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'drawing' | 'revealed' | 'fadeout'>('drawing');

  useEffect(() => {
    // 1. Slow, meditative draw phase
    const t1 = setTimeout(() => {
      setPhase('revealed');
    }, 1800);

    // 2. Hold momentarily in full glory
    const t2 = setTimeout(() => {
      setPhase('fadeout');
    }, 2800);

    // 3. Complete fade out and reveal hero with zero flash
    const t3 = setTimeout(() => {
      onComplete();
    }, 3500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 'fadeout' ? 0 : 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[200] bg-[#070908] flex flex-col items-center justify-center pointer-events-none select-none"
    >
      <div className="text-center px-6 space-y-6 max-w-xl mx-auto">
        {/* DRAWING ARCHITECTURAL EMBLEM */}
        <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 64 64" fill="none">
            {/* Outer Square Architectural Frame Draw */}
            <motion.rect
              x="6"
              y="6"
              width="52"
              height="52"
              stroke="#10B981"
              strokeWidth="1.2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.6, ease: 'easeInOut' }}
            />
            {/* Inner Diamond / Pine Axis */}
            <motion.polygon
              points="32,14 50,32 32,50 14,32"
              stroke="#34D399"
              strokeWidth="0.8"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.8 }}
              transition={{ duration: 1.8, delay: 0.3, ease: 'easeInOut' }}
            />
            {/* Center Monogram Accent */}
            <motion.circle
              cx="32"
              cy="32"
              r="3"
              fill="#10B981"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            />
          </svg>
        </div>

        {/* ELEGANT LINE DRAW */}
        <div className="w-48 h-px mx-auto bg-gradient-to-r from-transparent via-emerald-400 to-transparent relative overflow-hidden">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
            className="w-20 h-full bg-white blur-sm"
          />
        </div>

        {/* TEXT REVEAL */}
        <div className="space-y-2 overflow-hidden">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-[9px] uppercase tracking-[0.55em] text-emerald-400 font-mono font-bold block"
          >
            SANCTUARY IN THE PINES · 2025
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, letterSpacing: '0.1em', y: 15 }}
            animate={{ opacity: 1, letterSpacing: '0.35em', y: 0 }}
            transition={{ duration: 1.4, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-cinzel text-3xl sm:text-4xl text-white font-bold uppercase"
          >
            VERDANT
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="font-cormorant italic text-sm text-slate-300 tracking-wider"
          >
            Thermal Spa & Private Pine Reserve
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

const SpaHome: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedBookingSuiteId, setSelectedBookingSuiteId] = useState<string>(SPA_DATA.suites[0].id);

  // Intro reveal state - persistent across internal page navigation
  const [introFinished, setIntroFinished] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('verdant_intro_seen') === 'true';
    }
    return false;
  });

  const handleIntroComplete = () => {
    setIntroFinished(true);
    try {
      sessionStorage.setItem('verdant_intro_seen', 'true');
    } catch (e) {
      // ignore
    }
  };

  // Accommodation Tab
  const [activeSuiteIdx, setActiveSuiteIdx] = useState<number>(0);
  const currentSuite = SPA_DATA.suites[activeSuiteIdx];

  // Dining Active
  const [activeDiningIdx, setActiveDiningIdx] = useState<number>(0);
  const currentDining = SPA_DATA.diningVenues[activeDiningIdx];

  // Activity Slider
  const [activityIdx, setActivityIdx] = useState<number>(0);

  // GSAP animation refs
  const heroRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);
  const accommodationRef = useRef<HTMLDivElement>(null);
  const diningRef = useRef<HTMLDivElement>(null);

  // Run animations ONLY after intro is finished, avoiding any premature flash!
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!introFinished) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-title-main',
        { opacity: 0, y: 35, letterSpacing: '0.15em' },
        { opacity: 1, y: 0, letterSpacing: '0.28em', duration: 1.6, ease: 'power3.out', delay: 0.1 }
      );

      gsap.fromTo(
        '.hero-subtitle-main',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.4, ease: 'power2.out', delay: 0.3 }
      );

      gsap.fromTo(
        '.philo-heading',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: philosophyRef.current,
            start: 'top 80%'
          }
        }
      );
    });

    return () => {
      ctx.revert();
    };
  }, [introFinished]);

  const openBookingWithSuite = (suiteId?: string) => {
    if (suiteId) setSelectedBookingSuiteId(suiteId);
    setIsBookingOpen(true);
  };

  const handleNextActivity = () => {
    setActivityIdx((prev) => (prev + 1) % SPA_DATA.activities.length);
  };

  const handlePrevActivity = () => {
    setActivityIdx((prev) => (prev === 0 ? SPA_DATA.activities.length - 1 : prev - 1));
  };

  return (
    <div className="bg-[#070908] text-[#ECE7DF] min-h-screen selection:bg-emerald-500 selection:text-slate-950 font-sans relative overflow-x-hidden">
      {/* SLOW LUXURY DRAW INTRO ANIMATION - ONLY 1 TIME PER SESSION */}
      <AnimatePresence>
        {!introFinished && (
          <LuxuryDrawIntro onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      <SpaNavbar onOpenBooking={() => openBookingWithSuite()} />

      {/* =================================================================== */}
      {/* 1. ULTRA-MINIMALIST LUXURY HERO (NO BARS, NO STRIPS, FULL PHOTO)   */}
      {/* =================================================================== */}
      <section
        ref={heroRef}
        className="relative h-screen min-h-[100svh] sm:min-h-[640px] max-h-[1050px] flex flex-col justify-center items-center px-5 sm:px-6 md:px-14 overflow-hidden"
      >
        {/* BACKGROUND IMAGE WITH LUXURY MOOD TONES */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=85&w=2200"
            alt="Verdant Relax Park Atmosphere"
            className="w-full h-full object-cover opacity-60 transition-transform duration-[14000ms] hover:scale-105"
          />
          {/* Subtle dark gradient overlay - lets the photo breathe */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070908] via-black/20 to-black/70" />
        </div>

        {/* CENTER PURE MINIMALIST HERO DISPLAY (BANG IN THE CENTRE) */}
        <div className={`relative z-10 max-w-5xl mx-auto w-full text-center flex flex-col items-center justify-center transition-opacity duration-700 ${introFinished ? 'opacity-100' : 'opacity-0'}`}>
          <h1 className="hero-title-main font-cinzel text-4xl sm:text-8xl md:text-9xl lg:text-[9.5rem] font-bold tracking-[0.18em] sm:tracking-[0.24em] uppercase text-white drop-shadow-2xl leading-none">
            VERDANT
          </h1>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 2. THE SANCTUARY (Open, Unboxed Architectural Editorial)            */}
      {/* =================================================================== */}
      <section
        id="sanctuary"
        ref={philosophyRef}
        className="relative py-16 sm:py-28 md:py-60 px-5 sm:px-6 md:px-14 bg-[#070908] border-b border-white/10"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-16 lg:gap-24 items-center">
          {/* LEFT: EDITORIAL PHILOSOPHY TEXT */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-10">
            <span className="text-[10px] uppercase tracking-[0.45em] text-emerald-400 font-mono font-bold block">
              01 · THE SANCTUARY
            </span>

            <h2 className="philo-heading font-cinzel text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white leading-[1.15]">
              NATURE IS NOT A <br />
              PLACE TO VISIT. <br />
              <span className="font-cormorant italic font-normal text-emerald-400">
                IT IS HOME.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-white/65 font-light leading-relaxed max-w-md">
              Set within 180 acres of private Wiltshire pine forest, Verdant is a quiet architectural sanctuary of warm timber, natural limestone, and geothermal mineral waters.
            </p>

            <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-4 sm:gap-8">
              <Link
                to="/demo/spa/suites"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-none bg-white hover:bg-emerald-400 hover:text-slate-950 text-slate-950 font-bold text-xs uppercase tracking-[0.25em] transition-all cursor-pointer"
              >
                <span>EXPLORE RESIDENCES</span>
                <ArrowRight size={13} />
              </Link>
              <Link
                to="/demo/spa/philosophy"
                className="text-xs uppercase tracking-[0.25em] font-mono text-white/60 hover:text-emerald-400 transition-colors text-center sm:text-left py-2 sm:py-0"
              >
                OUR PHILOSOPHY →
              </Link>
            </div>
          </div>

          {/* RIGHT: 4K CORRELATED TIMBER & GLASS WOODLAND ARCHITECTURE */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden aspect-[16/10] bg-[#0C100E] group">
              <img
                src="/src/assets/images/verdant_pine_cottage_1793919178058.jpg"
                alt="Timber and Glass Forest Architecture"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 3. LIVING SPACES (Open, Spacious Suite Showcase)                    */}
      {/* =================================================================== */}
      <section
        id="accommodation"
        ref={accommodationRef}
        className="relative py-16 sm:py-28 md:py-60 px-5 sm:px-6 md:px-14 bg-[#070908] border-b border-white/10"
      >
        <div className="max-w-6xl mx-auto space-y-12 sm:space-y-24">
          {/* SECTION HEADER */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 pb-6 sm:pb-8 border-b border-white/10">
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-[0.45em] text-emerald-400 font-mono font-bold block">
                02 · LIVING SPACES
              </span>
              <h2 className="font-cinzel text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white">
                RESIDENCES & VILLAS
              </h2>
            </div>

            {/* FLUID SUITE TABS */}
            <div className="flex items-center gap-6 sm:gap-12 overflow-x-auto pb-1 no-scrollbar">
              {SPA_DATA.suites.map((s, idx) => {
                const isActive = activeSuiteIdx === idx;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActiveSuiteIdx(idx)}
                    className={`group relative pb-3 text-xs font-mono uppercase tracking-[0.22em] sm:tracking-[0.25em] transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                      isActive
                        ? 'text-white font-bold'
                        : 'text-white/40 hover:text-white/80'
                    }`}
                  >
                    <span className={`text-[10px] ${isActive ? 'text-emerald-400 font-bold' : 'text-white/20'}`}>
                      0{idx + 1}
                    </span>
                    <span>{s.name.split(' ')[0]}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-emerald-400" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ACTIVE SUITE DISPLAY */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSuite.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-16 lg:gap-24 items-center"
            >
              {/* 4K PHOTOGRAPHY */}
              <div className="lg:col-span-7">
                <div className="relative overflow-hidden aspect-[16/10] bg-[#0C100E] group">
                  <img
                    src={currentSuite.heroImage}
                    alt={currentSuite.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* DETAILS */}
              <div className="lg:col-span-5 space-y-6 sm:space-y-8">
                <div className="space-y-2.5 sm:space-y-3">
                  <span className="font-mono text-xs text-emerald-400 uppercase tracking-[0.28em] font-bold block">
                    0{activeSuiteIdx + 1} · {currentSuite.capacity}
                  </span>
                  <h3 className="font-cinzel text-2xl sm:text-4xl font-bold uppercase tracking-tight text-white">
                    {currentSuite.name}
                  </h3>
                  <p className="font-cormorant text-xl sm:text-2xl italic text-white/85">
                    {currentSuite.tagline}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-white/65 font-light leading-relaxed">
                  {currentSuite.description}
                </p>

                {/* LARGER, CLEARLY READABLE SPECIFICATIONS UNDER LIVING AREA 68 M2 */}
                <div className="grid grid-cols-2 gap-5 sm:gap-8 py-6 sm:py-8 border-y border-white/10">
                  {currentSuite.features.slice(0, 4).map((f) => (
                    <div key={f.label} className="space-y-1.5 sm:space-y-2">
                      <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.18em] sm:tracking-[0.22em] text-emerald-400/90 block">
                        {f.label}
                      </span>
                      <span className="text-base sm:text-xl font-cinzel font-bold text-white block">
                        {f.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* ACTION BUTTONS */}
                <div className="pt-1 sm:pt-2 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-4 sm:gap-8">
                  <button
                    onClick={() => openBookingWithSuite(currentSuite.id)}
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-none bg-white hover:bg-emerald-400 hover:text-slate-950 text-slate-950 font-bold text-xs uppercase tracking-[0.25em] transition-all cursor-pointer"
                  >
                    <span>RESERVE RESIDENCE</span>
                    <ArrowRight size={13} />
                  </button>
                  <Link
                    to="/demo/spa/suites"
                    className="text-xs font-mono uppercase tracking-[0.2em] text-white/60 hover:text-emerald-400 transition-colors text-center sm:text-left py-2 sm:py-0"
                  >
                    VIEW ALL SUITES →
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 4. THERMAL SPA & WELLNESS (Alternating Left / Right Scroll)         */}
      {/* =================================================================== */}
      <section
        id="treatments"
        className="relative py-16 sm:py-28 md:py-60 px-5 sm:px-6 md:px-14 bg-[#070908] border-b border-white/10"
      >
        <div className="max-w-6xl mx-auto space-y-14 sm:space-y-36">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 pb-6 sm:pb-8 border-b border-white/10">
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-[0.45em] text-emerald-400 font-mono font-bold block">
                03 · THERMAL SPA & WELLNESS
              </span>
              <h2 className="font-cinzel text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white">
                RESTORATIVE RITUALS
              </h2>
            </div>
            <Link
              to="/demo/spa/treatments"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-emerald-400 hover:text-white transition-colors group"
            >
              <span>EXPLORE ALL TREATMENTS</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* ALTERNATING LEFT / RIGHT SCROLL SHOWCASE */}
          <div className="space-y-16 sm:space-y-32 md:space-y-56">
            {SPA_DATA.treatments.map((t, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-16 lg:gap-24 items-center"
                >
                  <div className={`lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="relative overflow-hidden aspect-[16/10] bg-[#0C100E] group">
                      <img
                        src={t.image}
                        alt={t.name}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  <div className={`lg:col-span-5 space-y-5 sm:space-y-8 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
                        <span className="tracking-[0.22em] sm:tracking-[0.3em] uppercase font-bold">0{idx + 1} · {t.category}</span>
                        <span className="text-white/60 tracking-widest text-xs sm:text-sm">{t.duration}</span>
                      </div>

                      <h3 className="font-cinzel text-2xl sm:text-4xl font-bold text-white uppercase tracking-tight leading-tight">
                        {t.name}
                      </h3>

                      <p className="text-sm sm:text-base text-white/65 font-light leading-relaxed">
                        {t.description}
                      </p>
                    </div>

                    <div className="pt-4 sm:pt-6 border-t border-white/10 flex items-center justify-between gap-4">
                      <span className="text-xs sm:text-sm text-white/70 font-light">
                        {t.includes[0]}
                      </span>

                      <Link
                        to="/demo/spa/treatments"
                        className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-white hover:text-emerald-400 transition-colors group/btn font-bold shrink-0"
                      >
                        <span>RESERVE</span>
                        <ArrowRight size={13} className="text-emerald-400 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 5. WOOD-FIRED DINING & LOUNGES                                      */}
      {/* =================================================================== */}
      <section
        id="dining"
        ref={diningRef}
        className="relative py-16 sm:py-28 md:py-60 px-5 sm:px-6 md:px-14 bg-[#070908] border-b border-white/10"
      >
        <div className="max-w-6xl mx-auto space-y-12 sm:space-y-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 pb-6 sm:pb-8 border-b border-white/10">
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-[0.45em] text-emerald-400 font-mono font-bold block">
                04 · GASTRONOMY & CELLAR
              </span>
              <h2 className="font-cinzel text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white">
                SEASONAL DINING
              </h2>
            </div>
            <Link
              to="/demo/spa/dining"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-emerald-400 hover:text-white transition-colors group"
            >
              <span>VIEW ALL FOUR VENUES</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* FLUID HORIZONTAL TYPOGRAPHIC SELECTOR */}
          <div className="flex items-center gap-6 sm:gap-12 overflow-x-auto pb-4 border-b border-white/10 no-scrollbar">
            {SPA_DATA.diningVenues.map((d, idx) => {
              const isSelected = activeDiningIdx === idx;
              return (
                <button
                  key={d.id}
                  onClick={() => setActiveDiningIdx(idx)}
                  className={`group relative pb-3 text-xs font-mono uppercase tracking-[0.22em] sm:tracking-[0.25em] transition-all cursor-pointer whitespace-nowrap flex items-center gap-2.5 ${
                    isSelected
                      ? 'text-white font-bold'
                      : 'text-white/40 hover:text-white/80'
                  }`}
                >
                  <span className={`text-[10px] ${isSelected ? 'text-emerald-400 font-bold' : 'text-white/20'}`}>
                    0{idx + 1}
                  </span>
                  <span>{d.name}</span>
                  {isSelected && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-emerald-400" />
                  )}
                </button>
              );
            })}
          </div>

          {/* ACTIVE DINING SHOWCASE */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-16 lg:gap-24 items-center">
            <div className="lg:col-span-5 space-y-6 sm:space-y-8 order-2 lg:order-1">
              <div className="space-y-3">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block">
                  {currentDining.hours} · {currentDining.cuisine}
                </span>
                <h3 className="font-cinzel text-2xl sm:text-4xl font-bold uppercase tracking-tight text-white">
                  {currentDining.name}
                </h3>
                <p className="text-sm sm:text-base text-white/65 font-light leading-relaxed pt-1 sm:pt-2">
                  {currentDining.description}
                </p>
              </div>

              {currentDining.signatureDish && (
                <div className="py-5 sm:py-6 border-y border-white/10 space-y-2">
                  <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-white/40 block">
                    SIGNATURE DISH
                  </span>
                  <p className="font-cormorant italic text-xl sm:text-2xl text-white/90">
                    {currentDining.signatureDish}
                  </p>
                </div>
              )}

              <div className="pt-1 sm:pt-2">
                <Link
                  to={`/demo/spa/dining?venue=${currentDining.id}`}
                  className="inline-flex items-center justify-center w-full sm:w-auto gap-3 px-8 py-4 rounded-none bg-white text-slate-950 font-bold text-xs uppercase tracking-[0.25em] hover:bg-emerald-400 hover:text-slate-950 transition-all"
                >
                  <span>RESERVE A TABLE</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="relative overflow-hidden aspect-[16/10] bg-[#0C100E] group">
                <img
                  src={currentDining.image}
                  alt={currentDining.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 6. PARK ACTIVITIES SLIDER                                           */}
      {/* =================================================================== */}
      <section className="relative py-16 sm:py-28 md:py-60 px-5 sm:px-6 md:px-14 bg-[#070908]">
        <div className="max-w-6xl mx-auto space-y-12 sm:space-y-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 sm:gap-8 pb-6 sm:pb-8 border-b border-white/10">
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-[0.45em] text-emerald-400 font-mono font-bold block">
                05 · THE PRIVATE RESERVE
              </span>
              <h2 className="font-cinzel text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white">
                ACTIVITIES & RECREATION
              </h2>
            </div>
            <div className="flex items-center gap-4 self-end sm:self-auto">
              <button
                onClick={handlePrevActivity}
                aria-label="Previous activity"
                className="w-11 h-11 border border-white/15 hover:border-white/40 flex items-center justify-center text-white cursor-pointer transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleNextActivity}
                aria-label="Next activity"
                className="w-11 h-11 border border-white/15 hover:border-white/40 flex items-center justify-center text-white cursor-pointer transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-16 lg:gap-24 items-center">
            <div className="lg:col-span-7">
              <div className="relative overflow-hidden aspect-[16/10] bg-[#0C100E]">
                <img
                  src={SPA_DATA.activities[activityIdx].image}
                  alt={SPA_DATA.activities[activityIdx].title}
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                />
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6 sm:space-y-8">
              <div className="space-y-3">
                <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest block">
                  {SPA_DATA.activities[activityIdx].number} / 05 · PRIVATE ESTATE
                </span>
                <h3 className="font-cinzel text-2xl sm:text-4xl font-bold uppercase tracking-tight text-white">
                  {SPA_DATA.activities[activityIdx].title}
                </h3>
                <p className="font-cormorant text-xl sm:text-2xl italic text-white/85">
                  {SPA_DATA.activities[activityIdx].subtitle}
                </p>
              </div>

              <p className="text-sm sm:text-base text-white/65 font-light leading-relaxed">
                {SPA_DATA.activities[activityIdx].description}
              </p>

              <div className="pt-4 border-t border-white/10">
                <Link
                  to="/demo/spa/activities"
                  className="inline-flex items-center justify-center w-full sm:w-auto gap-3 px-8 py-4 rounded-none bg-white text-slate-950 font-bold text-xs uppercase tracking-[0.25em] hover:bg-emerald-400 hover:text-slate-950 transition-colors"
                >
                  <span>EXPLORE ALL ACTIVITIES</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <SpaFooter />

      {/* BOOKING MODAL */}
      <SpaBookingModal
        isOpen={isBookingOpen}
        initialSuiteId={selectedBookingSuiteId}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
};

export default SpaHome;
