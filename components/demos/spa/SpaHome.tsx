import React, { useState, useEffect, useRef } from 'react';
import * as RouterDOM from 'react-router-dom';
const { Link, useNavigate } = RouterDOM as any;
import { motion as framerMotion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowRight, 
  ArrowUpRight, 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Sparkles, 
  Droplets, 
  Flame, 
  Wind, 
  Sun, 
  MapPin, 
  Check, 
  Clock, 
  Compass,
  ArrowDown
} from 'lucide-react';
import SpaNavbar from './SpaNavbar';
import SpaFooter from './SpaFooter';
import SpaBookingModal from './SpaBookingModal';
import { SPA_DATA, SpaSuite, DiningVenue, ActivityItem } from './spaData';

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
  const navigate = useNavigate();
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

  // Dining Hover / Active
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
        className="relative h-screen min-h-[640px] max-h-[1050px] flex flex-col justify-center items-center px-6 md:px-14 overflow-hidden"
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
          <h1 className="hero-title-main font-cinzel text-6xl sm:text-8xl md:text-9xl lg:text-[9.5rem] font-bold tracking-[0.24em] uppercase text-white drop-shadow-2xl leading-none">
            VERDANT
          </h1>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 2. THE SANCTUARY (Clean Architectural Spacing)                      */}
      {/* =================================================================== */}
      <section
        id="sanctuary"
        ref={philosophyRef}
        className="relative py-32 md:py-44 px-6 md:px-14 bg-[#0A0D0C] border-b border-white/5 overflow-hidden"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* LEFT: EDITORIAL PHILOSOPHY TEXT */}
          <div className="lg:col-span-7 space-y-8">
            <span className="text-[10px] uppercase tracking-[0.45em] text-emerald-400 font-mono font-bold block">
              THE SANCTUARY
            </span>

            <h2 className="philo-heading font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white leading-[1.15]">
              NATURE IS NOT A <br />
              PLACE TO VISIT. <br />
              <span className="font-cormorant italic font-normal text-emerald-400">
                IT IS HOME.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed max-w-xl">
              Verdant is the genuine thermal spa-hotel retreat in the middle of ancient pine woods.
              An authentic private living space crafted from sustainable timber and Welsh slate, where every breath restores calm.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-6">
              <Link
                to="/demo/spa/suites"
                className="inline-flex items-center gap-3 px-8 py-3.5 rounded-none bg-white hover:bg-emerald-400 hover:text-slate-950 text-slate-950 font-bold text-xs uppercase tracking-[0.25em] transition-all cursor-pointer shadow-lg border border-white/20"
              >
                <span>EXPLORE ALL SUITES</span>
                <ArrowRight size={13} />
              </Link>
              <Link
                to="/demo/spa/philosophy"
                className="text-xs uppercase tracking-[0.25em] font-mono text-white/60 hover:text-emerald-400 transition-colors"
              >
                OUR PHILOSOPHY →
              </Link>
            </div>
          </div>

          {/* RIGHT: SHARP ARCHITECTURAL PHOTO */}
          <div className="lg:col-span-5 relative">
            <div className="relative overflow-hidden aspect-[16/11] max-h-[380px] border border-white/10 bg-[#0C100E] shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1200"
                alt="Architecture in Nature"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                <span className="text-[9px] uppercase tracking-[0.35em] text-emerald-400 font-mono font-bold">
                  SUSTAINABLE TIMBER & GLASS
                </span>
                <p className="font-cormorant text-xl italic text-white mt-0.5">
                  180 Hectares of Pure Pine Canopy
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 3. LIVING SPACES (Fluid Interactive Suite Showcase)                */}
      {/* =================================================================== */}
      <section
        id="accommodation"
        ref={accommodationRef}
        className="relative py-32 md:py-44 px-6 md:px-14 bg-[#070908] border-b border-white/5"
      >
        <div className="max-w-6xl mx-auto space-y-14">
          {/* SECTION HEADER */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <span className="text-[10px] uppercase tracking-[0.45em] text-emerald-400 font-mono font-bold block mb-2">
                LIVING SPACES
              </span>
              <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white">
                ACCOMMODATION
              </h2>
            </div>

            {/* FLUID SUITE TABS (ZERO BOXES, CLEAN EDITORIAL TYPOGRAPHY) */}
            <div className="flex items-center gap-6 sm:gap-10 overflow-x-auto pb-1 no-scrollbar">
              {SPA_DATA.suites.map((s, idx) => {
                const isActive = activeSuiteIdx === idx;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActiveSuiteIdx(idx)}
                    className={`group relative pb-2.5 text-xs sm:text-sm font-mono uppercase tracking-[0.25em] transition-all cursor-pointer whitespace-nowrap flex items-center gap-2.5 ${
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
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-400 shadow-[0_0_10px_#1df2a4]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ACTIVE SUITE DISPLAY (FLUID EDITORIAL SPLIT, NO HEAVY BOX-IN-A-BOX) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSuite.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
            >
              {/* IMAGE */}
              <div className="lg:col-span-6">
                <div className="relative overflow-hidden aspect-[16/11] border border-white/15 shadow-2xl group">
                  <img
                    src={currentSuite.heroImage}
                    alt={currentSuite.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 px-3.5 py-1.5 bg-black/75 backdrop-blur-md border border-white/15 text-[10px] uppercase font-mono tracking-wider text-emerald-400 font-bold">
                    {currentSuite.category}
                  </div>
                </div>
              </div>

              {/* DETAILS */}
              <div className="lg:col-span-6 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-white/50 uppercase">
                      {currentSuite.sizeSqm} M² · {currentSuite.capacity}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-bold">
                      {currentSuite.category.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="font-cinzel text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
                    {currentSuite.name}
                  </h3>
                  <p className="font-cormorant text-xl italic text-slate-300">
                    "{currentSuite.tagline}"
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-white/65 font-light leading-relaxed">
                  {currentSuite.description}
                </p>

                {/* AMENITIES */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                  {currentSuite.amenities.slice(0, 4).map((a) => (
                    <div key={a} className="flex items-center gap-2 text-xs text-white/75 font-mono">
                      <span className="w-1.5 h-1.5 bg-emerald-400 shrink-0" />
                      <span className="truncate">{a}</span>
                    </div>
                  ))}
                </div>

                {/* ACTION BUTTONS */}
                <div className="pt-4 flex flex-wrap items-center gap-6">
                  <button
                    onClick={() => openBookingWithSuite(currentSuite.id)}
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-none bg-white hover:bg-emerald-400 hover:text-slate-950 text-slate-950 font-bold text-xs uppercase tracking-[0.25em] transition-all cursor-pointer shadow-xl border border-white/20"
                  >
                    <span>RESERVE {currentSuite.name.split(' ')[0]}</span>
                    <ArrowRight size={13} />
                  </button>
                  <Link
                    to={`/demo/spa/suites?cat=${currentSuite.category}`}
                    className="text-xs font-mono uppercase tracking-[0.2em] text-white/60 hover:text-emerald-400 transition-colors"
                  >
                    VIEW SPECIFICATIONS →
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 4. THERMAL SPA & WELLNESS                                           */}
      {/* =================================================================== */}
      <section
        id="treatments"
        className="relative py-36 md:py-48 px-6 md:px-14 bg-[#0A0D0C] border-b border-white/5"
      >
        <div className="max-w-6xl mx-auto space-y-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
            <div>
              <span className="text-[10px] uppercase tracking-[0.45em] text-emerald-400 font-mono font-bold block mb-3">
                THERMAL SPA & WELLNESS
              </span>
              <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white">
                RESTORATIVE RITUALS
              </h2>
            </div>
            <Link
              to="/demo/spa/treatments"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-emerald-400 hover:text-white transition-colors group pb-1"
            >
              <span>EXPLORE ALL TREATMENTS</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* FLUID EDITORIAL RITUALS (ZERO BOXES, CLEAN EDITORIAL FRAMING) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
            {SPA_DATA.treatments.map((t, idx) => (
              <div
                key={t.id}
                className="group space-y-8 flex flex-col justify-between"
              >
                {/* PHOTOGRAPHY (CLEAN NATURAL FRAMING, NO FLOATING BADGE BOXES) */}
                <div className="relative overflow-hidden aspect-[16/10] shadow-2xl border border-white/10">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>

                {/* EDITORIAL CONTENT */}
                <div className="space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-emerald-400/80">
                      <span className="tracking-[0.3em] uppercase">0{idx + 1} · {t.category}</span>
                      <span className="text-white/40 tracking-wider">{t.duration}</span>
                    </div>

                    <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white uppercase tracking-wide leading-snug">
                      {t.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-white/65 font-light leading-relaxed pt-1">
                      {t.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-white/50 font-mono">
                      {(t.includes || []).slice(0, 2).map((inc, i) => (
                        <span key={i} className="flex items-center gap-2">
                          <span className="w-1 h-1 bg-emerald-400" />
                          <span>{inc}</span>
                        </span>
                      ))}
                    </div>

                    <Link
                      to="/demo/spa/treatments"
                      className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-white hover:text-emerald-400 transition-colors group/btn font-bold shrink-0 ml-4"
                    >
                      <span>RESERVE RITUAL</span>
                      <ArrowRight size={13} className="text-emerald-400 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 5. CULINARY HEARTH & DINING                                         */}
      {/* =================================================================== */}
      <section
        id="dining"
        ref={diningRef}
        className="relative py-32 md:py-44 px-6 md:px-14 bg-[#070908] border-b border-white/5"
      >
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <span className="text-[10px] uppercase tracking-[0.45em] text-emerald-400 font-mono font-bold block mb-2">
                GASTRONOMY & CELLAR
              </span>
              <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white">
                WOOD-FIRED DINING
              </h2>
            </div>
            <Link
              to="/demo/spa/dining"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-emerald-400 hover:text-white transition-colors group"
            >
              <span>VIEW ALL 4 VENUES</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* FLUID HORIZONTAL TYPOGRAPHIC SELECTOR (NO BOXED BUTTONS) */}
          <div className="flex items-center gap-6 sm:gap-10 md:gap-14 overflow-x-auto pb-4 border-b border-white/10 no-scrollbar">
            {SPA_DATA.diningVenues.map((d, idx) => {
              const isSelected = activeDiningIdx === idx;
              return (
                <button
                  key={d.id}
                  onClick={() => setActiveDiningIdx(idx)}
                  className={`group relative pb-3 text-xs sm:text-sm font-mono uppercase tracking-[0.25em] transition-all cursor-pointer whitespace-nowrap flex items-center gap-2.5 ${
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
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-400 shadow-[0_0_8px_#10B981]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* ACTIVE DINING SHOWCASE (FLUID ASYMMETRICAL EDITORIAL LAYOUT) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-3">
                <span className="text-xs font-mono text-emerald-400 uppercase font-bold tracking-widest">
                  {currentDining.hours} · {currentDining.cuisine}
                </span>
                <h3 className="font-cinzel text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
                  {currentDining.name}
                </h3>
                <p className="text-xs sm:text-sm text-white/65 font-light leading-relaxed pt-2">
                  {currentDining.description}
                </p>
              </div>

              {/* SIGNATURE DISH & HIGHLIGHTS */}
              {currentDining.signatureDish && (
                <div className="p-6 bg-[#0C100E] border-l-2 border-emerald-400 space-y-1">
                  <span className="text-[9px] uppercase font-mono tracking-[0.3em] text-emerald-400 font-bold block">
                    CHEF'S SIGNATURE
                  </span>
                  <p className="font-cinzel text-sm sm:text-base text-white/90 font-medium">
                    {currentDining.signatureDish}
                  </p>
                </div>
              )}

              <div className="pt-2">
                <Link
                  to={`/demo/spa/dining?venue=${currentDining.id}`}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-none bg-white text-slate-950 font-bold text-xs uppercase tracking-[0.25em] hover:bg-emerald-400 hover:text-slate-950 transition-all border border-white/20 shadow-xl"
                >
                  <span>RESERVE TABLE AT {currentDining.name.split(' ')[0]}</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative overflow-hidden aspect-[16/11] border border-white/15 shadow-2xl group">
                <img
                  src={currentDining.image}
                  alt={currentDining.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-6 text-white font-mono text-[10px] tracking-widest uppercase">
                  {currentDining.dressCode} · RESERVATIONS RECOMMENDED
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 6. PARK ACTIVITIES SLIDER                                           */}
      {/* =================================================================== */}
      <section className="relative py-32 md:py-44 px-6 md:px-14 bg-[#0A0D0C] border-b border-white/5">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <span className="text-[10px] uppercase tracking-[0.45em] text-emerald-400 font-mono font-bold block mb-2">
                THE RESERVE EXPEDITIONS
              </span>
              <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white">
                ACTIVITIES & RECREATION
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrevActivity}
                className="w-10 h-10 bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white cursor-pointer transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleNextActivity}
                className="w-10 h-10 bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white cursor-pointer transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="relative overflow-hidden aspect-[16/10] border border-white/10 shadow-2xl">
                <img
                  src={SPA_DATA.activities[activityIdx].image}
                  alt={SPA_DATA.activities[activityIdx].title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <span className="font-mono text-xs text-emerald-400 font-bold">
                ACTIVITY {SPA_DATA.activities[activityIdx].number} / 05
              </span>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
                {SPA_DATA.activities[activityIdx].title}
              </h3>
              <p className="font-cormorant text-lg italic text-slate-300">
                "{SPA_DATA.activities[activityIdx].subtitle}"
              </p>
              <p className="text-xs sm:text-sm text-white/65 font-light leading-relaxed">
                {SPA_DATA.activities[activityIdx].description}
              </p>
              <div className="pt-2">
                <Link
                  to="/demo/spa/activities"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-none bg-white text-slate-950 font-bold text-xs uppercase tracking-[0.25em] hover:bg-emerald-400 hover:text-slate-950 transition-colors border border-white/20"
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
