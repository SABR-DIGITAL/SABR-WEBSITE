import React, { useEffect, useState } from 'react';
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { ArrowUpRight, Check, Mail } from 'lucide-react';
import {
  EquestrianLuxuryNav,
  EquestrianLuxuryFooter,
  LuxuryReveal,
  LuxuryScriptText
} from './EquestrianLuxuryUI';
import {
  academy,
  lessons,
  horses,
  facilities
} from '../equestrian/equestrianData';

const ROMAN_NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

/* ────────────────────────────────────────────────────────────────────────── */
/* 1. SYMMETRICAL MINIMALIST TUITION & BOOKINGS PAGE                          */
/* ────────────────────────────────────────────────────────────────────────── */
export const EquestrianLuxuryLessons: React.FC = () => {
  const [filterGroup, setFilterGroup] = useState<'all' | 'flatwork' | 'jumping' | 'foundations'>('all');
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [preferredSlot, setPreferredSlot] = useState<string>('09:30 Morning School');
  const [riderName, setRiderName] = useState<string>('');
  const [riderPhone, setRiderPhone] = useState<string>('');
  const [bookedId, setBookedId] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
  }, []);

  // Filtered sets always preserve even symmetry (6 or 2 items in a 2-column grid)
  const visibleLessons =
    filterGroup === 'all'
      ? lessons
      : filterGroup === 'flatwork'
      ? [lessons[1], lessons[3]] // Improvers Flatwork & Private Classical
      : filterGroup === 'jumping'
      ? [lessons[2], lessons[4]] // Showjumping & Cross-Country + Downland Hack
      : [lessons[0], lessons[5]]; // Lead-Rein & Pony Morning

  const handleQuickHold = (e: React.FormEvent, lessonId: string) => {
    e.preventDefault();
    if (!riderName.trim() || !riderPhone.trim()) return;
    setBookedId(lessonId);
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#0E1712] font-inter selection:bg-[#0E1712] selection:text-[#F7F5F0]">
      <EquestrianLuxuryNav />

      {/* Symmetrical Centered Header */}
      <section className="pt-20 sm:pt-28 pb-12 sm:pb-16 px-6 sm:px-10 md:px-16">
        <div className="max-w-[1320px] mx-auto text-center">
          <LuxuryReveal>
            <p className="text-[10px] uppercase tracking-[0.46em] text-[#7A6B53] mb-3">
              Pewsey Vale &middot; Private Equitation
            </p>
            <h1 className="font-playfair text-[clamp(2.2rem,5vw,4.1rem)] leading-[1.08] tracking-[-0.02em] text-[#0E1712] font-normal mb-3">
              Tuition &amp;{' '}
              <LuxuryScriptText
                delay={140}
                className="text-[1.12em] text-[#7A6B53]"
              >
                Private Bookings.
              </LuxuryScriptText>
            </h1>
            <p className="text-sm sm:text-[15px] text-[#525A54] max-w-xl mx-auto font-light leading-[1.8]">
              Every session is taught by a BHS-accredited instructor and capped strictly at four riders so the arena remains calm, symmetrical, and unhurried.
            </p>
          </LuxuryReveal>

          {/* Symmetrical 4-Part Filter Bar */}
          <LuxuryReveal delay={100} className="mt-10 sm:mt-12 flex justify-center">
            <div className="inline-grid grid-cols-2 sm:grid-cols-4 border-y border-[#0E1712]/12 divide-x divide-[#0E1712]/10 w-full max-w-3xl">
              {[
                { key: 'all', label: 'All Six Rides', sub: 'Full Directory' },
                { key: 'flatwork', label: 'Flatwork & Private', sub: 'Classical Seat' },
                { key: 'jumping', label: 'Jumping & Turf', sub: 'Poles & Downland' },
                { key: 'foundations', label: 'Foundations', sub: 'Young Riders' }
              ].map((tab) => {
                const active = filterGroup === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => {
                      setFilterGroup(tab.key as any);
                      setSelectedLessonId(null);
                    }}
                    className={`py-4 px-3 text-center transition-colors duration-300 cursor-pointer ${
                      active
                        ? 'bg-[#0E1712] text-[#F7F5F0]'
                        : 'bg-transparent text-[#0E1712] hover:bg-[#0E1712]/5'
                    }`}
                  >
                    <span className="block text-[10px] uppercase tracking-[0.28em] font-medium mb-1">
                      {tab.label}
                    </span>
                    <span
                      className={`block font-playfair italic text-sm sm:text-base leading-snug ${
                        active ? 'text-[#D8C7A8]' : 'text-[#6A5B43]'
                      }`}
                    >
                      {tab.sub}
                    </span>
                  </button>
                );
              })}
            </div>
          </LuxuryReveal>
        </div>
      </section>

      {/* Symmetrical 2-Column Architectural Booking Grid */}
      <section className="pb-20 sm:pb-28 px-6 sm:px-10 md:px-16">
        <div className="max-w-[1320px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-16 gap-y-14 sm:gap-y-20">
          {visibleLessons.map((lesson, idx) => {
            const isDrawerOpen = selectedLessonId === lesson.id;
            const isBooked = bookedId === lesson.id;

            return (
              <LuxuryReveal
                key={lesson.id}
                delay={(idx % 2) * 90}
                className="group flex flex-col justify-between border-t border-[#0E1712]/15 pt-7"
              >
                <div>
                  {/* Symmetrical Top Meta Row */}
                  <div className="flex items-baseline justify-between gap-4 mb-4">
                    <span className="font-playfair italic text-base text-[#7A6B53]">
                      {ROMAN_NUMERALS[idx] || `0${idx + 1}`} &middot;{' '}
                      <span className="not-italic text-[10px] uppercase tracking-[0.34em] font-inter">
                        {lesson.category}
                      </span>
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.32em] text-[#0E1712]/70">
                      {lesson.duration}
                    </span>
                  </div>

                  {/* Symmetrical Unboxed Image Stage */}
                  <div className="relative overflow-hidden aspect-[16/10] bg-[#E6E2D8] mb-6">
                    <img
                      src={lesson.photo}
                      alt={lesson.name}
                      loading="eager"
                      decoding="async"
                      className="w-full h-full object-cover object-center transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                    />
                  </div>

                  {/* Symmetrical Title & Subline */}
                  <div className="text-center px-2 mb-5">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#7A6B53] mb-2">
                      {lesson.who}
                    </p>
                    <h2 className="font-playfair text-2xl sm:text-3xl text-[#0E1712] leading-snug mb-3">
                      {lesson.name}
                    </h2>
                    <p className="text-[14px] text-[#525A54] font-light leading-[1.8] max-w-md mx-auto">
                      {lesson.detail}
                    </p>
                  </div>
                </div>

                <div>
                  {/* Symmetrical 2-Column Specification Bar */}
                  <div className="grid grid-cols-2 border-y border-[#0E1712]/12 divide-x divide-[#0E1712]/12 text-center py-3.5 mb-5">
                    <div className="px-2">
                      <span className="block text-[9px] uppercase tracking-[0.3em] text-[#7A6B53] mb-0.5">
                        Setting
                      </span>
                      <span className="block font-playfair text-xs sm:text-sm text-[#0E1712] truncate">
                        {lesson.setting}
                      </span>
                    </div>
                    <div className="px-2">
                      <span className="block text-[9px] uppercase tracking-[0.3em] text-[#7A6B53] mb-0.5">
                        Focus
                      </span>
                      <span className="block font-playfair text-xs sm:text-sm text-[#0E1712] truncate">
                        {lesson.highlights[0]}
                      </span>
                    </div>
                  </div>

                  {/* Symmetrical Action Row */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setBookedId(null);
                        setSelectedLessonId(isDrawerOpen ? null : lesson.id);
                      }}
                      className={`py-3.5 px-4 text-[10px] uppercase tracking-[0.28em] font-medium transition-colors cursor-pointer text-center ${
                        isDrawerOpen
                          ? 'bg-[#7A6B53] text-white'
                          : 'bg-[#0E1712] hover:bg-[#1c2c23] text-white'
                      }`}
                    >
                      {isDrawerOpen ? 'Close Booking' : 'Reserve Slot'}
                    </button>
                    <Link
                      to="/demo/equestrian-luxury/contact"
                      className="py-3.5 px-4 border border-[#0E1712]/25 hover:border-[#0E1712] text-[#0E1712] text-[10px] uppercase tracking-[0.28em] font-medium transition-colors inline-flex items-center justify-center gap-1.5"
                    >
                      <span>Tack Room</span>
                      <ArrowUpRight size={13} />
                    </Link>
                  </div>

                  {/* Minimalist Inline Symmetrical Reservation Drawer */}
                  {isDrawerOpen && (
                    <div className="mt-4 pt-5 border-t border-[#0E1712]/15 bg-[#EFECE4]/75 p-5 transition-all">
                      {isBooked ? (
                        <div className="text-center py-3 space-y-2">
                          <span className="w-7 h-7 rounded-full bg-[#0E1712] text-white inline-flex items-center justify-center">
                            <Check size={14} />
                          </span>
                          <p className="font-playfair text-lg text-[#0E1712]">
                            Provisional Hold Recorded
                          </p>
                          <p className="text-xs text-[#525A54] font-light">
                            Thank you, {riderName}. Rosie will ring {riderPhone} to confirm your {preferredSlot} session.
                          </p>
                        </div>
                      ) : (
                        <form onSubmit={(e) => handleQuickHold(e, lesson.id)} className="space-y-3.5">
                          <div className="grid grid-cols-3 gap-2">
                            {['09:30 Morning', '12:30 Midday', '15:30 Afternoon'].map((slot) => (
                              <button
                                key={slot}
                                type="button"
                                onClick={() => setPreferredSlot(slot)}
                                className={`py-2 px-2 text-[9.5px] uppercase tracking-[0.2em] border transition-colors cursor-pointer ${
                                  preferredSlot === slot
                                    ? 'bg-[#0E1712] text-white border-[#0E1712]'
                                    : 'bg-transparent text-[#0E1712] border-[#0E1712]/20'
                                }`}
                              >
                                {slot}
                              </button>
                            ))}
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            <input
                              type="text"
                              required
                              value={riderName}
                              onChange={(e) => setRiderName(e.target.value)}
                              placeholder="Rider Name"
                              className="bg-[#F7F5F0] border border-[#0E1712]/20 px-3.5 py-2.5 text-xs text-[#0E1712] focus:outline-none focus:border-[#0E1712]"
                            />
                            <input
                              type="tel"
                              required
                              value={riderPhone}
                              onChange={(e) => setRiderPhone(e.target.value)}
                              placeholder="Telephone"
                              className="bg-[#F7F5F0] border border-[#0E1712]/20 px-3.5 py-2.5 text-xs text-[#0E1712] focus:outline-none focus:border-[#0E1712]"
                            />
                          </div>
                          <button
                            type="submit"
                            className="w-full py-3 bg-[#0E1712] text-white text-[10px] uppercase tracking-[0.3em] cursor-pointer"
                          >
                            Confirm Provisional Hold
                          </button>
                        </form>
                      )}
                    </div>
                  )}
                </div>
              </LuxuryReveal>
            );
          })}
        </div>
      </section>

      <EquestrianLuxuryFooter />
    </div>
  );
};

/* ────────────────────────────────────────────────────────────────────────── */
/* 2. SYMMETRICAL MINIMALIST SCHOOLMASTERS PAGE                               */
/* ────────────────────────────────────────────────────────────────────────── */
export const EquestrianLuxuryHorses: React.FC = () => {
  const [wing, setWing] = useState<'all' | 'dressage' | 'jumping' | 'downland'>('all');

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
  }, []);

  // Always returns an even number (8 or 2/4) so the 2-column grid remains 100% symmetrical
  const displayedHorses =
    wing === 'all'
      ? horses
      : wing === 'dressage'
      ? [horses[6], horses[3]] // Juniper & Hawthorn
      : wing === 'jumping'
      ? [horses[2], horses[4]] // Bluebell & Sovereign
      : [horses[0], horses[5], horses[1], horses[7]]; // Bramble, Sorrel, Coppice, Thistle

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#0E1712] font-inter selection:bg-[#0E1712] selection:text-[#F7F5F0]">
      <EquestrianLuxuryNav />

      {/* Symmetrical Centered Header */}
      <section className="pt-20 sm:pt-28 pb-12 sm:pb-16 px-6 sm:px-10 md:px-16">
        <div className="max-w-[1320px] mx-auto text-center">
          <LuxuryReveal>
            <p className="text-[10px] uppercase tracking-[0.46em] text-[#7A6B53] mb-3">
              The Stable Ledger &middot; Twenty-Two Horses
            </p>
            <h1 className="font-playfair text-[clamp(2.2rem,5vw,4.1rem)] leading-[1.08] tracking-[-0.02em] text-[#0E1712] font-normal mb-3">
              Resident{' '}
              <LuxuryScriptText
                delay={140}
                className="text-[1.12em] text-[#7A6B53]"
              >
                Schoolmasters.
              </LuxuryScriptText>
            </h1>
            <p className="text-sm sm:text-[15px] text-[#525A54] max-w-xl mx-auto font-light leading-[1.8]">
              Turned out daily on chalk pasture and schooled on the flat by our senior instructors. Matched thoughtfully to your seat, height, and confidence.
            </p>
          </LuxuryReveal>

          {/* Symmetrical 4-Tab Wing Selector */}
          <LuxuryReveal delay={100} className="mt-10 sm:mt-12 flex justify-center">
            <div className="inline-grid grid-cols-2 sm:grid-cols-4 border-y border-[#0E1712]/12 divide-x divide-[#0E1712]/10 w-full max-w-3xl">
              {[
                { key: 'all', label: 'All Eight Horses', sub: 'Full Courtyard' },
                { key: 'dressage', label: 'Classical Dressage', sub: 'Lateral & Medium' },
                { key: 'jumping', label: 'Jumping & Arena', sub: 'Courses & Poles' },
                { key: 'downland', label: 'Downland & Cobs', sub: 'Confidence & Turf' }
              ].map((tab) => {
                const active = wing === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setWing(tab.key as any)}
                    className={`py-4 px-3 text-center transition-colors duration-300 cursor-pointer ${
                      active
                        ? 'bg-[#0E1712] text-[#F7F5F0]'
                        : 'bg-transparent text-[#0E1712] hover:bg-[#0E1712]/5'
                    }`}
                  >
                    <span className="block text-[10px] uppercase tracking-[0.28em] font-medium mb-1">
                      {tab.label}
                    </span>
                    <span
                      className={`block font-playfair italic text-sm sm:text-base leading-snug ${
                        active ? 'text-[#D8C7A8]' : 'text-[#6A5B43]'
                      }`}
                    >
                      {tab.sub}
                    </span>
                  </button>
                );
              })}
            </div>
          </LuxuryReveal>
        </div>
      </section>

      {/* Symmetrical 2-Column Studbook Grid */}
      <section className="pb-20 sm:pb-28 px-6 sm:px-10 md:px-16">
        <div className="max-w-[1320px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-16 gap-y-14 sm:gap-y-20">
          {displayedHorses.map((horse, i) => (
            <LuxuryReveal
              key={horse.name}
              delay={(i % 2) * 90}
              className="group flex flex-col justify-between border-t border-[#0E1712]/15 pt-7"
            >
              <div>
                {/* Symmetrical Loosebox Header */}
                <div className="flex items-baseline justify-between gap-4 mb-4">
                  <span className="text-[10px] uppercase tracking-[0.34em] text-[#7A6B53]">
                    Loosebox 0{i + 1} &middot; {horse.colour}
                  </span>
                  <span className="font-playfair italic text-sm text-[#0E1712]/80">
                    {horse.height}
                  </span>
                </div>

                {/* Unboxed Whole-Horse Portrait */}
                <div className="overflow-hidden aspect-[4/3] bg-[#E6E2D8] mb-6">
                  <img
                    src={horse.photo}
                    alt={`${horse.name} — ${horse.colour} ${horse.breed}`}
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover object-center transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                  />
                </div>

                {/* Symmetrical Name & Lineage */}
                <div className="text-center px-2 mb-5">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#7A6B53] mb-2">
                    {horse.bloodline}
                  </p>
                  <h2 className="font-playfair text-2xl sm:text-3xl text-[#0E1712] mb-3">
                    {horse.name}
                  </h2>
                  <p className="text-[14px] text-[#525A54] font-light leading-[1.8] max-w-md mx-auto">
                    {horse.character}
                  </p>
                </div>
              </div>

              <div>
                {/* Symmetrical 3-Column Studbook Strip */}
                <div className="grid grid-cols-3 border-y border-[#0E1712]/12 divide-x divide-[#0E1712]/12 text-center py-3.5 mb-5">
                  <div className="px-2">
                    <span className="block text-[8.5px] uppercase tracking-[0.28em] text-[#7A6B53] mb-0.5">
                      Breed
                    </span>
                    <span className="block font-playfair text-xs sm:text-sm text-[#0E1712] truncate">
                      {horse.breed}
                    </span>
                  </div>
                  <div className="px-2">
                    <span className="block text-[8.5px] uppercase tracking-[0.28em] text-[#7A6B53] mb-0.5">
                      Age
                    </span>
                    <span className="block font-playfair text-xs sm:text-sm text-[#0E1712] truncate">
                      {horse.age}
                    </span>
                  </div>
                  <div className="px-2">
                    <span className="block text-[8.5px] uppercase tracking-[0.28em] text-[#7A6B53] mb-0.5">
                      Discipline
                    </span>
                    <span className="block font-playfair text-xs sm:text-sm text-[#0E1712] truncate">
                      {horse.discipline.split('·')[0]}
                    </span>
                  </div>
                </div>

                {/* Symmetrical Quirk & Request Link */}
                <div className="flex items-center justify-between gap-4 pt-1">
                  <p className="text-xs text-[#525A54] italic font-light truncate">
                    &ldquo;{horse.quirk}&rdquo;
                  </p>
                  <Link
                    to="/demo/equestrian-luxury/contact"
                    className="group/btn inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#0E1712] hover:text-[#7A6B53] font-medium shrink-0 pb-1 border-b border-[#0E1712]/30 hover:border-[#7A6B53] transition-colors"
                  >
                    <span>Request {horse.name}</span>
                    <ArrowUpRight size={13} />
                  </Link>
                </div>
              </div>
            </LuxuryReveal>
          ))}
        </div>
      </section>

      <EquestrianLuxuryFooter />
    </div>
  );
};

/* ────────────────────────────────────────────────────────────────────────── */
/* 3. LIQUID MINIMALIST ESTATE & FACILITIES PAGE                              */
/* ────────────────────────────────────────────────────────────────────────── */
export const EquestrianLuxuryFacilities: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#0E1712] font-inter selection:bg-[#0E1712] selection:text-[#F7F5F0]">
      <EquestrianLuxuryNav />

      <section className="pt-20 sm:pt-28 pb-12 sm:pb-16 px-6 sm:px-10 md:px-16">
        <div className="max-w-[1320px] mx-auto text-center">
          <LuxuryReveal>
            <p className="text-[10px] uppercase tracking-[0.46em] text-[#7A6B53] mb-3">
              The Estate &amp; Grounds
            </p>
            <h1 className="font-playfair text-[clamp(2.2rem,5vw,4.1rem)] leading-[1.1] tracking-[-0.02em] max-w-3xl mx-auto font-normal">
              Sixteen acres of stabling beneath{' '}
              <LuxuryScriptText
                delay={140}
                className="text-[1.12em] text-[#7A6B53] px-1"
              >
                four hundred acres
              </LuxuryScriptText>{' '}
              of chalk turf.
            </h1>
          </LuxuryReveal>
        </div>
      </section>

      <section className="py-10 sm:py-16 pb-24 sm:pb-32 px-6 sm:px-10 md:px-16">
        <div className="max-w-[1320px] mx-auto space-y-20 sm:space-y-28">
          {facilities.map((fac, idx) => (
            <LuxuryReveal
              key={fac.title}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-14 items-center"
            >
              <div className={`lg:col-span-7 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="overflow-hidden aspect-[16/10] bg-[#E6E2D8] group">
                  <img
                    src={fac.photo}
                    alt={fac.alt}
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover object-center block transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                  />
                </div>
              </div>
              <div
                className={`lg:col-span-5 ${
                  idx % 2 === 1 ? 'lg:order-1 lg:pr-6' : 'lg:pl-6'
                }`}
              >
                <p className="text-[10px] uppercase tracking-[0.38em] text-[#7A6B53] mb-2">
                  {fac.index} &middot; {fac.subtitle}
                </p>
                <h2 className="font-playfair text-2xl sm:text-4xl text-[#0E1712] mb-2">
                  {fac.title}
                </h2>
                <div className="mb-4">
                  <LuxuryScriptText delay={160} className="text-2xl text-[#6A5B43]">
                    Pewsey Vale Estate
                  </LuxuryScriptText>
                </div>
                <p className="text-sm sm:text-[15px] text-[#525A54] font-light leading-[1.85] mb-6">
                  {fac.detail}
                </p>
                <p className="text-[10.5px] uppercase tracking-[0.28em] text-[#0E1712]/70 pt-4 border-t border-[#0E1712]/12">
                  {fac.note}
                </p>
              </div>
            </LuxuryReveal>
          ))}
        </div>
      </section>

      <EquestrianLuxuryFooter />
    </div>
  );
};

/* ────────────────────────────────────────────────────────────────────────── */
/* 4. SABR-FORMAT LUXURY CONTACT PAGE (IN BRAMBLE & BAY AESTHETIC)            */
/* ────────────────────────────────────────────────────────────────────────── */
const WhatsAppMark: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.898 9.83 9.83 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.82 11.82 0 0 0 20.465 3.49" />
  </svg>
);

const InstagramMark: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden="true" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5.5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

const LUXURY_CHANNELS = [
  {
    key: 'whatsapp',
    label: 'WhatsApp the Tack Room',
    value: academy.phoneDisplay,
    href: 'https://wa.me/441672890412',
    external: true,
    logo: <WhatsAppMark className="w-6 h-6 md:w-7 md:h-7" />,
    tile: 'bg-[#0E1712] text-[#F7F5F0]',
    size: 'text-[clamp(1.65rem,4.5vw,2.85rem)]'
  },
  {
    key: 'email',
    label: 'Courtyard Email',
    value: academy.email,
    href: `mailto:${academy.email}?subject=Private%20Riding%20Enquiry`,
    external: false,
    logo: <Mail className="w-6 h-6 md:w-7 md:h-7" strokeWidth={1.8} />,
    tile: 'bg-[#7A6B53] text-[#F7F5F0]',
    size: 'text-[clamp(1.15rem,3.3vw,2.25rem)]'
  },
  {
    key: 'instagram',
    label: 'Estate Journal',
    value: '@brambleandbay',
    href: 'https://instagram.com',
    external: true,
    logo: <InstagramMark className="w-6 h-6 md:w-7 md:h-7" />,
    tile: 'bg-[#1D2B22] text-[#C5B393]',
    size: 'text-[clamp(1.5rem,4vw,2.55rem)]'
  }
];

const LUXURY_FACTS = [
  'Replies within 4 hours',
  'Matched to your seat & horse',
  'Pewsey Vale, SN9 5JX'
];

export const EquestrianLuxuryContact: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#0E1712] font-inter selection:bg-[#0E1712] selection:text-[#F7F5F0] flex flex-col justify-between">
      <EquestrianLuxuryNav />

      <section
        aria-labelledby="luxury-contact-heading"
        className="px-6 md:px-10 lg:px-16 pt-24 md:pt-36 pb-20 md:pb-28"
      >
        <div className="w-full max-w-6xl mx-auto">
          {/* Header Block — SABR Contact Structure in Bramble & Bay Typography & Palette */}
          <div className="mb-16 md:mb-24">
            <p
              className="luxury-contact-rise mb-5 text-[10px] md:text-[11px] uppercase tracking-[0.46em] text-[#7A6B53] font-medium"
              style={{ animationDelay: '0ms' }}
            >
              PRIVATE ENQUIRIES &middot; PEWSEY VALE
            </p>

            <h1
              id="luxury-contact-heading"
              className="luxury-contact-rise font-playfair text-[clamp(2.6rem,8.5vw,5.2rem)] font-normal text-[#0E1712] tracking-[-0.025em] leading-[0.98] mb-10"
              style={{ animationDelay: '70ms' }}
            >
              SPEAK WITH <br />
              <LuxuryScriptText
                delay={180}
                className="text-[1.08em] text-[#7A6B53] tracking-normal mt-1"
              >
                the Tack Room.
              </LuxuryScriptText>
            </h1>

            <div
              className="luxury-contact-rise max-w-3xl border-l-[4px] md:border-l-[6px] border-[#C5B393] pl-6 md:pl-12"
              style={{ animationDelay: '140ms' }}
            >
              <p className="font-playfair italic text-lg md:text-xl lg:text-2xl text-[#525A54] font-normal leading-relaxed">
                Tell us the rider, the day, and the pace you have in mind. You get a personal horse pairing and arena time back.
              </p>
            </div>
          </div>

          {/* Three Direct Channels — SABR Ledger Layout */}
          <div className="border-b border-[#0E1712]/15">
            {LUXURY_CHANNELS.map((c, i) => (
              <a
                key={c.key}
                href={c.href}
                {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="luxury-contact-rise group grid grid-cols-[auto_1fr_auto] items-center gap-5 md:gap-10 py-7 md:py-9 border-t border-[#0E1712]/15"
                style={{ animationDelay: `${210 + i * 80}ms` }}
              >
                <span
                  className={`w-14 h-14 md:w-16 md:h-16 shrink-0 rounded-2xl flex items-center justify-center ${c.tile} transition-transform duration-500 group-hover:scale-105`}
                >
                  {c.logo}
                </span>

                <span className="min-w-0">
                  <span className="block text-[9.5px] md:text-[10px] uppercase tracking-[0.42em] text-[#7A6B53] mb-2">
                    {c.label}
                  </span>
                  <span
                    className={`block font-playfair font-normal text-[#0E1712] tracking-[-0.015em] tabular-nums leading-tight break-words transition-colors duration-300 group-hover:text-[#7A6B53] ${c.size}`}
                  >
                    {c.value}
                  </span>
                </span>

                <ArrowUpRight
                  size={28}
                  strokeWidth={1.4}
                  className="shrink-0 text-[#0E1712]/35 transition-all duration-500 group-hover:text-[#0E1712] group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </a>
            ))}
          </div>

          {/* Bottom Facts Strip */}
          <ul
            className="luxury-contact-rise mt-10 flex flex-wrap items-center gap-x-4 gap-y-3 text-[10px] md:text-[11px] uppercase tracking-[0.36em] text-[#525A54]"
            style={{ animationDelay: '460ms' }}
          >
            {LUXURY_FACTS.map((f, i) => (
              <li key={f} className="flex items-center gap-4">
                {i > 0 && <span aria-hidden="true" className="w-1 h-1 rounded-full bg-[#7A6B53]" />}
                {f}
              </li>
            ))}
          </ul>
        </div>

        <style>{`
          @keyframes luxury-contact-rise {
            from { opacity: 0; transform: translate3d(0, 20px, 0); }
            to   { opacity: 1; transform: none; }
          }
          .luxury-contact-rise {
            animation: luxury-contact-rise 0.75s cubic-bezier(0.22, 1, 0.36, 1) both;
          }
          @media (prefers-reduced-motion: reduce) {
            .luxury-contact-rise { animation: none; }
          }
        `}</style>
      </section>

      <EquestrianLuxuryFooter />
    </div>
  );
};
