import React, { useEffect, useRef, useState } from 'react';
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import {
  BrambleBayCrestLogo,
  DressageRiderEmblem,
  EquestrianLuxuryNav,
  EquestrianLuxuryFooter,
  LUXURY_VIDEO_SRC,
  LuxuryReveal,
  LuxuryScriptText
} from './EquestrianLuxuryUI';
import { academy, horses, images } from '../equestrian/equestrianData';

const COURTYARD_HOURS = [
  {
    time: '06:30',
    title: 'First Hay & Morning Mist',
    script: 'The Courtyard Wakes',
    note: 'Warm meadow hay nets are hung along the twenty-two brick looseboxes while mist lifts off the chalk combe behind the barn.',
    detail: '22 Stables · Heated Tack Room · Solarium Bays',
    image: images.stables,
    link: '/demo/equestrian-luxury/facilities',
    linkText: 'Explore the Courtyard'
  },
  {
    time: '09:30',
    title: 'The 60m Mirrored School',
    script: 'Classical Flatwork',
    note: 'Private one-to-one dressage and lateral work on waxed Andrews Bowen fibre-sand, with full-length mirrors and wireless audio coaching.',
    detail: '60m × 25m Floodlit Arena · Max 4 Riders',
    image: images.arena,
    link: '/demo/equestrian-luxury/lessons',
    linkText: 'View Tuition Ledger'
  },
  {
    time: '14:00',
    title: 'The Pewsey Vale Ridgeway',
    script: 'Four Hundred Acres',
    note: 'Step straight out of the south stable gate onto springy chalk turf, beech spinneys, and panoramic canter tracks with zero roadwork.',
    detail: '400 Private Acres · Direct Bridleway Access',
    image: images.hacking,
    link: '/demo/equestrian-luxury/facilities',
    linkText: 'Walk the Estate'
  },
  {
    time: '17:30',
    title: 'Warm Mash & Saddlery',
    script: 'Evening Quiet',
    note: 'Horses are washed down under infrared lamps and rugged for the night while riders review video notes over coffee in the glass gallery.',
    detail: 'Heated Viewing Gallery · Bridle Fitting',
    image: images.tackRoom,
    link: '/demo/equestrian-luxury/contact',
    linkText: 'Speak with the Tack Room'
  }
];

const LIQUID_CHAPTERS = [
  {
    roman: 'I',
    eyebrow: 'Private Equitation',
    title: 'Unhurried seat, quiet hands.',
    script: 'Classical Tuition',
    body: 'We never crowd an arena. Every session is capped at four riders—or taught entirely one-to-one—so you can feel the horse’s back, refine half-halts, and school through novice to medium movements without haste.',
    meta: '45–60 Minute Private & Small-Group Rides',
    photo: images.flatwork,
    path: '/demo/equestrian-luxury/lessons',
    cta: 'View Symmetrical Tuition Ledger'
  },
  {
    roman: 'II',
    eyebrow: 'Open Chalk Turf',
    title: 'Four hundred acres without a single road.',
    script: 'Downland Hacking',
    body: 'Our south courtyard gate opens directly onto private Wiltshire chalk downland. Ride out at daybreak through ancient beech hangers and long, elastic turf gallops overlooking the Pewsey Vale.',
    meta: '90-Minute & Two-Hour Guided Estate Rides',
    photo: images.hacking,
    path: '/demo/equestrian-luxury/facilities',
    cta: 'Discover the Grounds'
  }
];

const EquestrianLuxuryHome: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeHourIdx, setActiveHourIdx] = useState(1);
  const [activeHorseIdx, setActiveHorseIdx] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
  }, []);

  // Strictly enforce instant, silent playback (0 volume, muted) across all devices
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = true;
    vid.defaultMuted = true;
    vid.volume = 0;
    const playPromise = vid.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {});
    }
  }, []);

  const featuredHorses = [horses[6], horses[2], horses[3], horses[5]]; // Juniper, Bluebell, Hawthorn, Sorrel
  const currentHorse = featuredHorses[activeHorseIdx] || featuredHorses[0];
  const currentHour = COURTYARD_HOURS[activeHourIdx] || COURTYARD_HOURS[0];

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#0E1712] font-inter selection:bg-[#0E1712] selection:text-[#F7F5F0] overflow-x-hidden">
      <EquestrianLuxuryNav transparentOnTop />

      {/* ── FULL-VIEWPORT SILENT VIDEO HERO (NEWTON HALL CREST & PLACEMENT) ── */}
      {/* Mobile video stage is ~28% taller (aspect-[4/3] with centered cover) so there is minimal black space while keeping 100% of the horse & rider in view */}
      <section className="relative w-full min-h-[100svh] lg:h-screen lg:min-h-[640px] bg-[#0B120E] flex flex-col justify-center items-center overflow-hidden pt-4 sm:pt-12 lg:pt-0 pb-6 lg:pb-0">
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto lg:absolute lg:inset-0 overflow-hidden bg-[#0B120E]">
          <video
            ref={videoRef}
            src={LUXURY_VIDEO_SRC}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            {...({ fetchPriority: 'high' } as any)}
            onLoadedMetadata={(e) => {
              e.currentTarget.muted = true;
              e.currentTarget.volume = 0;
            }}
            onVolumeChange={(e) => {
              if (!e.currentTarget.muted || e.currentTarget.volume !== 0) {
                e.currentTarget.muted = true;
                e.currentTarget.volume = 0;
              }
            }}
            className="w-full h-full object-cover object-center scale-[1.035] transform-gpu block"
          />

          {/* Subtle forest-obsidian veil for crisp white crest legibility */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(12, 24, 17, 0.34) 0%, rgba(11, 18, 14, 0.56) 100%)'
            }}
          />

          {/* Seamless top & bottom edge masks on mobile/tablet — completely eliminates any bottom yellow video edge line */}
          <div
            aria-hidden="true"
            className="lg:hidden absolute inset-x-0 -top-1 h-12 bg-gradient-to-b from-[#0B120E] via-[#0B120E]/75 to-transparent pointer-events-none z-10"
          />
          <div
            aria-hidden="true"
            className="lg:hidden absolute inset-x-0 -bottom-1 h-14 bg-gradient-to-t from-[#0B120E] via-[#0B120E]/85 to-transparent pointer-events-none z-10"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -bottom-1 h-2.5 bg-[#0B120E] lg:hidden pointer-events-none z-10"
          />

          {/* Centered Newton Hall-Style Crest Overlay inside Desktop/Tablet Video */}
          <div className="hidden sm:flex absolute inset-0 z-20 flex-col items-center justify-center px-6 text-center pointer-events-none">
            <BrambleBayCrestLogo />
          </div>
        </div>

        {/* Mobile Crest Placement: Positioned cleanly right below the taller video stage */}
        <div className="sm:hidden relative z-20 px-5 pt-2 text-center flex flex-col items-center">
          <BrambleBayCrestLogo />
          <p className="mt-3 text-[12px] text-white/65 font-light max-w-xs leading-relaxed">
            Pewsey Vale, Wiltshire &middot; Four hundred private acres of classical equitation.
          </p>
        </div>

        {/* Subtle Bottom Scroll Cue on Desktop/Tablet */}
        <a
          href="#estate-manifesto"
          aria-label="Scroll to explore Bramble & Bay"
          className="hidden sm:inline-flex items-center gap-2 absolute bottom-7 left-1/2 -translate-x-1/2 z-20 text-[10px] uppercase tracking-[0.38em] text-white/70 hover:text-white transition-colors"
        >
          <span>Pewsey Vale &middot; Wiltshire</span>
          <ChevronDown size={14} className="animate-bounce" />
        </a>
      </section>

      {/* ── CHAPTER I: LIQUID EDITORIAL MANIFESTO & WHISPER FIGURES ──────── */}
      <section
        id="estate-manifesto"
        className="py-16 sm:py-24 md:py-28 px-6 sm:px-10 md:px-16"
      >
        <div className="max-w-[1320px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
            <LuxuryReveal className="lg:col-span-8">
              <p className="text-[10px] uppercase tracking-[0.44em] text-[#7A6B53] mb-4">
                01 &middot; The Sanctuary &middot; Est. {academy.established}
              </p>
              <h1 className="font-playfair text-[clamp(1.95rem,4.2vw,3.65rem)] leading-[1.16] tracking-[-0.02em] text-[#0E1712] font-normal">
                Where classical seat meets{' '}
                <LuxuryScriptText
                  delay={180}
                  className="text-[1.14em] text-[#7A6B53] px-1"
                >
                  four hundred acres
                </LuxuryScriptText>{' '}
                of quiet Wiltshire chalk.
              </h1>
            </LuxuryReveal>

            <LuxuryReveal delay={120} className="lg:col-span-4 lg:pb-1">
              <p className="text-[14px] sm:text-[15px] text-[#525A54] font-light leading-[1.8]">
                Tucked beneath the southern escarpment of the Pewsey Vale, Bramble &amp; Bay is a private equestrian estate built for riders who value feel, lineage, and unhurried time in the saddle.
              </p>
            </LuxuryReveal>
          </div>

          {/* Liquid Unboxed Whisper Ledger — Static clean typography (no self-writing animation on Acres/Horses/Ratio/School) */}
          <LuxuryReveal delay={200} className="mt-14 sm:mt-20 pt-10 sm:pt-12 border-t border-[#0E1712]/10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-6 sm:gap-x-12">
              {[
                { figure: '400', unit: 'Acres', label: 'Private Ridgeway Turf' },
                { figure: '22', unit: 'Horses', label: 'Schooled Resident Herd' },
                { figure: '1 : 4', unit: 'Ratio', label: 'Maximum Arena Group' },
                { figure: '60m', unit: 'School', label: 'Mirrored Waxed Fibre-Sand' }
              ].map((stat) => (
                <div key={stat.label} className="group">
                  <div className="flex items-baseline gap-2.5 mb-1.5">
                    <span className="font-playfair text-3xl sm:text-4xl md:text-[2.75rem] text-[#0E1712] tracking-tight">
                      {stat.figure}
                    </span>
                    <span className="font-playfair italic text-xl sm:text-2xl text-[#7A6B53]">
                      {stat.unit}
                    </span>
                  </div>
                  <p className="text-[9.5px] sm:text-[10px] uppercase tracking-[0.34em] text-[#525A54]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </LuxuryReveal>
        </div>
      </section>

      {/* ── CHAPTER II: INTERACTIVE RHYTHM OF THE COURTYARD ─────────────── */}
      <section className="py-14 sm:py-22 md:py-26 px-6 sm:px-10 md:px-16 bg-[#EFECE4]/70">
        <div className="max-w-[1320px] mx-auto">
          <LuxuryReveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
            <div>
              <p className="text-[10px] uppercase tracking-[0.44em] text-[#7A6B53] mb-2.5">
                02 &middot; Daily Rhythm
              </p>
              <h2 className="font-playfair text-[clamp(1.75rem,3.4vw,2.9rem)] text-[#0E1712] leading-tight">
                Hours of the{' '}
                <LuxuryScriptText delay={140} className="text-[1.15em] text-[#7A6B53]">
                  Courtyard.
                </LuxuryScriptText>
              </h2>
            </div>

            {/* Minimal Liquid Time Selector */}
            <div
              role="tablist"
              aria-label="Courtyard hours"
              className="flex flex-wrap items-center gap-5 sm:gap-8 border-b border-[#0E1712]/12 pb-2"
            >
              {COURTYARD_HOURS.map((item, idx) => {
                const active = idx === activeHourIdx;
                return (
                  <button
                    key={item.time}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveHourIdx(idx)}
                    className={`relative pb-2.5 text-left transition-colors duration-300 cursor-pointer ${
                      active ? 'text-[#0E1712]' : 'text-[#525A54]/60 hover:text-[#0E1712]'
                    }`}
                  >
                    <span className="font-playfair text-base sm:text-lg tracking-wider block">
                      {item.time}
                    </span>
                    <span
                      className={`absolute left-0 right-0 -bottom-[1px] h-[1.5px] bg-[#7A6B53] transition-transform duration-500 origin-left ${
                        active ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </LuxuryReveal>

          {/* Fluid Unboxed Split Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            <div className="lg:col-span-7 relative overflow-hidden aspect-[16/10] bg-[#E3DFD3]">
              {COURTYARD_HOURS.map((item, idx) => (
                <img
                  key={item.time}
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    idx === activeHourIdx
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-[1.04] pointer-events-none'
                  }`}
                />
              ))}
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-[#0B120E]/80 backdrop-blur-md px-4 py-2 text-white">
                <span className="text-[9.5px] uppercase tracking-[0.34em] text-[#C5B393]">
                  {currentHour.time} &middot; {currentHour.detail}
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 lg:pl-4">
              <p className="text-[10px] uppercase tracking-[0.36em] text-[#7A6B53] mb-2">
                {currentHour.script}
              </p>
              <h3 className="font-playfair text-2xl sm:text-3xl text-[#0E1712] mb-4">
                {currentHour.title}
              </h3>
              <p className="text-[14.5px] sm:text-[15px] text-[#525A54] font-light leading-[1.85] mb-8">
                {currentHour.note}
              </p>
              <Link
                to={currentHour.link}
                className="group inline-flex items-center gap-3 text-[10.5px] uppercase tracking-[0.34em] text-[#0E1712] hover:text-[#7A6B53] transition-colors pb-2 border-b border-[#0E1712]/25 hover:border-[#7A6B53]"
              >
                <span>{currentHour.linkText}</span>
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHAPTER III: FLUID STAGGERED EDITORIAL TRIPTYCH ─────────────── */}
      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-10 md:px-16">
        <div className="max-w-[1320px] mx-auto space-y-20 sm:space-y-28">
          {LIQUID_CHAPTERS.map((chap, idx) => (
            <LuxuryReveal
              key={chap.roman}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-14 items-center"
            >
              <div
                className={`lg:col-span-7 ${
                  idx % 2 === 1 ? 'lg:order-2' : ''
                }`}
              >
                <div className="group overflow-hidden aspect-[16/10] bg-[#E6E2D8]">
                  <img
                    src={chap.photo}
                    alt={chap.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                  />
                </div>
              </div>

              <div
                className={`lg:col-span-5 ${
                  idx % 2 === 1 ? 'lg:order-1 lg:pr-6' : 'lg:pl-6'
                }`}
              >
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-playfair italic text-lg text-[#7A6B53]">
                    {chap.roman}.
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.38em] text-[#7A6B53]">
                    {chap.eyebrow}
                  </span>
                </div>

                <h2 className="font-playfair text-[clamp(1.75rem,3.1vw,2.65rem)] text-[#0E1712] leading-[1.15] mb-4">
                  {chap.title}
                </h2>

                <p className="text-[14.5px] text-[#525A54] font-light leading-[1.85] mb-6">
                  {chap.body}
                </p>

                <p className="text-[10px] uppercase tracking-[0.3em] text-[#0E1712]/60 mb-7">
                  {chap.meta}
                </p>

                <Link
                  to={chap.path}
                  className="group inline-flex items-center gap-3 text-[10.5px] uppercase tracking-[0.32em] text-[#0E1712] hover:text-[#7A6B53] transition-colors pb-2 border-b border-[#0E1712]/25 hover:border-[#7A6B53]"
                >
                  <span>{chap.cta}</span>
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </div>
            </LuxuryReveal>
          ))}
        </div>
      </section>

      {/* ── CHAPTER IV: INTERACTIVE LOOSEBOX PREVIEW ("FROM THE STABLE DOOR") */}
      <section className="py-16 sm:py-24 md:py-30 px-6 sm:px-10 md:px-16 bg-white">
        <div className="max-w-[1320px] mx-auto">
          <LuxuryReveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-14">
            <div>
              <p className="text-[10px] uppercase tracking-[0.44em] text-[#7A6B53] mb-2.5">
                03 &middot; The Stable Ledger
              </p>
              <h2 className="font-playfair text-[clamp(1.8rem,3.5vw,3rem)] text-[#0E1712] leading-tight">
                Selected{' '}
                <LuxuryScriptText delay={140} className="text-[1.15em] text-[#7A6B53]">
                  Schoolmasters.
                </LuxuryScriptText>
              </h2>
            </div>

            <Link
              to="/demo/equestrian-luxury/horses"
              className="group inline-flex items-center gap-2.5 text-[10.5px] uppercase tracking-[0.32em] text-[#0E1712] hover:text-[#7A6B53] transition-colors pb-1.5 border-b border-[#0E1712]/20"
            >
              <span>View All Eight Horses</span>
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </LuxuryReveal>

          {/* Liquid Name Tabs */}
          <LuxuryReveal delay={80} className="flex flex-wrap items-center gap-6 sm:gap-12 border-b border-[#0E1712]/10 pb-4 mb-10 sm:mb-12">
            {featuredHorses.map((horse, idx) => {
              const active = idx === activeHorseIdx;
              return (
                <button
                  key={horse.name}
                  type="button"
                  onClick={() => setActiveHorseIdx(idx)}
                  className={`group flex items-baseline gap-2.5 cursor-pointer transition-all duration-300 ${
                    active ? 'text-[#0E1712]' : 'text-[#525A54]/45 hover:text-[#0E1712]/80'
                  }`}
                >
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#7A6B53]">
                    0{idx + 1}
                  </span>
                  <span className="font-playfair text-xl sm:text-3xl tracking-tight">
                    {horse.name}
                  </span>
                </button>
              );
            })}
          </LuxuryReveal>

          {/* Selected Horse Liquid Profile (Static clean bloodline label — no script animation overkill) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-14 items-center">
            <div className="lg:col-span-6 relative overflow-hidden aspect-[4/3] bg-[#EAE6DC]">
              {featuredHorses.map((horse, idx) => (
                <img
                  key={horse.name}
                  src={horse.photo}
                  alt={`${horse.name} — ${horse.colour} ${horse.breed}`}
                  loading="lazy"
                  decoding="async"
                  className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    idx === activeHorseIdx
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-[1.03] pointer-events-none'
                  }`}
                />
              ))}
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.38em] text-[#7A6B53] mb-2">
                  {currentHorse.height} &middot; {currentHorse.colour} {currentHorse.breed} &middot; {currentHorse.age}
                </p>
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <h3 className="font-playfair text-3xl sm:text-5xl text-[#0E1712]">
                    {currentHorse.name}
                  </h3>
                  <span className="text-xs sm:text-sm uppercase tracking-[0.26em] text-[#7A6B53] font-medium">
                    {currentHorse.bloodline}
                  </span>
                </div>
              </div>

              <p className="text-[15px] text-[#525A54] font-light leading-[1.85]">
                {currentHorse.character}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-[#0E1712]/10">
                <div>
                  <p className="text-[9.5px] uppercase tracking-[0.34em] text-[#7A6B53] mb-1.5">
                    Ideal Rider Match
                  </p>
                  <p className="text-xs sm:text-sm text-[#0E1712] font-light leading-relaxed">
                    {currentHorse.bestFor}
                  </p>
                </div>
                <div>
                  <p className="text-[9.5px] uppercase tracking-[0.34em] text-[#7A6B53] mb-1.5">
                    In the Loosebox
                  </p>
                  <p className="text-xs sm:text-sm text-[#525A54] italic font-light leading-relaxed">
                    &ldquo;{currentHorse.quirk}&rdquo;
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/demo/equestrian-luxury/contact"
                  className="group inline-flex items-center gap-3 text-[10.5px] uppercase tracking-[0.34em] text-[#0E1712] hover:text-[#7A6B53] transition-colors pb-2 border-b border-[#0E1712]/30 hover:border-[#7A6B53]"
                >
                  <span>Enquire to Ride {currentHorse.name}</span>
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHAPTER V: DARK FOREST SANCTUARY INVITATION ──────────────────── */}
      <section className="py-20 sm:py-28 px-6 sm:px-10 md:px-16 bg-[#0E1712] text-white">
        <LuxuryReveal className="max-w-[980px] mx-auto text-center flex flex-col items-center">
          <DressageRiderEmblem className="w-24 sm:w-32 h-auto mb-6" />
          <p className="text-[10px] uppercase tracking-[0.44em] text-[#C5B393] mb-4">
            Private Equitation &middot; Pewsey Vale
          </p>
          <h2 className="font-playfair text-[clamp(1.85rem,3.8vw,3.2rem)] leading-[1.2] text-white font-normal max-w-2xl mb-4">
            &ldquo;Every ride begins in a quiet courtyard, with the right horse already rugged and waiting.&rdquo;
          </h2>
          <p className="text-xs uppercase tracking-[0.34em] text-[#C5B393] mb-10">
            Clara Whitfield &middot; Head Instructor
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-10">
            <Link
              to="/demo/equestrian-luxury/contact"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-[#F7F5F0] hover:bg-[#C5B393] text-[#0E1712] text-[10px] uppercase tracking-[0.34em] font-medium transition-colors"
            >
              <span>Speak with the Tack Room</span>
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
            <Link
              to="/demo/equestrian-luxury/lessons"
              className="group inline-flex items-center gap-2.5 text-[10.5px] uppercase tracking-[0.34em] text-white/80 hover:text-[#C5B393] transition-colors py-2 border-b border-white/25 hover:border-[#C5B393]"
            >
              <span>Explore Symmetrical Tuition</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </LuxuryReveal>
      </section>

      <EquestrianLuxuryFooter />
    </div>
  );
};

export default EquestrianLuxuryHome;
