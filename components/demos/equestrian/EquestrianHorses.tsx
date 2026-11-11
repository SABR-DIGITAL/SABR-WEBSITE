import React, { useEffect, useState } from 'react';
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { ArrowUpRight, Heart, Sparkles } from 'lucide-react';
import EquestrianNav from './EquestrianNav';
import EquestrianFooter from './EquestrianFooter';
import { Reveal, SectionLabel, Bloom } from './EquestrianUI';
import { horses, coaches } from './equestrianData';

type MatchFilter = 'all' | 'first-time' | 'returners' | 'dressage' | 'jumping';

const MATCH_FILTERS: {
  id: MatchFilter;
  label: string;
  rosieNote: string;
}[] = [
  {
    id: 'all',
    label: 'All Eight Horses',
    rosieNote:
      'Every horse at Bramble & Bay lives out in settled herds on our chalk paddocks and is matched carefully to your seat, height, and confidence.'
  },
  {
    id: 'first-time',
    label: 'First-Time & Young Riders',
    rosieNote:
      'For children and complete beginners, we choose ponies and cobs who stand like a rock at the mounting block and respond to the lightest voice aid.'
  },
  {
    id: 'returners',
    label: 'Adult Returners & Hacking',
    rosieNote:
      'Coming back to riding after years away calls for a rhythmic, forgiving partner who looks after your balance in the school and out on the downs.'
  },
  {
    id: 'dressage',
    label: 'Classical Flatwork & Dressage',
    rosieNote:
      'Our schoolmasters know shoulder-in, travers, and half-pass inside out — giving you the true feel of an elastic contact the moment your seat softens.'
  },
  {
    id: 'jumping',
    label: 'Poles & Showjumping',
    rosieNote:
      'Honest, rhythmic jumpers who help you see a stride from three canter steps away without ever rushing a fence.'
  }
];

const EquestrianHorses: React.FC = () => {
  const [activeMatch, setActiveMatch] = useState<MatchFilter>('all');

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
  }, []);

  const visibleHorses =
    activeMatch === 'all'
      ? horses
      : horses.filter((h) => h.matchTags.includes(activeMatch));

  const currentMatcher =
    MATCH_FILTERS.find((m) => m.id === activeMatch) || MATCH_FILTERS[0];

  return (
    <div className="relative min-h-screen bg-[#FAF6EE] font-inter text-[#1E2822] selection:bg-[#2D5A43] selection:text-[#FAF6EE]">
      <EquestrianNav />

      {/* ── STABLE LEDGER HEADER (ZERO OVERFLOW ON ALL VIEWPORTS) ─────────── */}
      <section className="relative z-10 pt-24 sm:pt-32 md:pt-36 pb-8 sm:pb-12 px-4 sm:px-6 md:px-12 border-b border-[#2D5A43]/12">
        <div className="max-w-[1360px] mx-auto">
          <Reveal>
            <SectionLabel className="mb-3.5 sm:mb-5">The Stable Ledger</SectionLabel>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-end">
            <div className="lg:col-span-7">
              <Reveal delay={0.05}>
                <h1 className="font-serif text-[clamp(2.1rem,5.2vw,4.4rem)] leading-[1.05] tracking-[-0.02em]">
                  Eight of our twenty-two,
                  <br />
                  <span className="italic text-[#2D5A43]">from 11.2hh to 16.2hh.</span>
                </h1>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={0.12}>
                <p className="text-[14px] sm:text-[15px] text-[#5F665E] leading-[1.75] sm:leading-[1.8] mb-5">
                  Rather than swapping horses every Saturday, we pair you with a schoolmaster suited to your confidence so a genuine partnership can grow.
                </p>

                {/* Warm Country Tally Strip — Responsive 3-column layout with safe tracking so text never overflows */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 rounded-2xl bg-[#F3EDE0] p-3 sm:p-4 border border-[#2D5A43]/12">
                  {[
                    { k: '22', l: 'School Horses' },
                    { k: '11.2–16.2', l: 'Hands High' },
                    { k: '400 ac', l: 'Daily Turnout' }
                  ].map((s, idx) => (
                    <div
                      key={s.l}
                      className={`min-w-0 ${
                        idx > 0 ? 'border-l border-[#2D5A43]/12 pl-2.5 sm:pl-3.5' : 'pl-1'
                      }`}
                    >
                      <p className="font-serif text-lg sm:text-2xl text-[#1E2822] leading-tight tabular-nums truncate">
                        {s.k}
                      </p>
                      <p className="text-[10px] sm:text-[11px] font-medium text-[#2D5A43] leading-snug mt-0.5 break-words">
                        {s.l}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>

          {/* ── INTERACTIVE "FIND YOUR PARTNER" HORSE MATCHER ──────────────── */}
          <Reveal delay={0.16} className="mt-8 sm:mt-10">
            <div className="rounded-2xl sm:rounded-3xl bg-white/90 border border-[#2D5A43]/12 p-4 sm:p-6 shadow-[0_14px_34px_-26px_rgba(30,40,34,0.16)]">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#2D5A43]/10">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-full bg-[#E8F0EB] text-[#2D5A43] flex items-center justify-center shrink-0">
                    <Sparkles size={14} />
                  </span>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.24em] text-[#2D5A43] font-medium">
                      Interactive Horse Matcher
                    </p>
                    <p className="font-serif text-base sm:text-lg text-[#1E2822]">
                      Who are we matching a horse for today?
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  {MATCH_FILTERS.map((f) => {
                    const active = activeMatch === f.id;
                    return (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setActiveMatch(f.id)}
                        className={`px-3.5 sm:px-4 py-2 rounded-full text-[11px] sm:text-[12px] font-medium transition-all duration-200 cursor-pointer ${
                          active
                            ? 'bg-[#2D5A43] text-[#FAF6EE] shadow-sm'
                            : 'bg-[#FAF6EE] text-[#454D46] hover:bg-[#E8F0EB] hover:text-[#2D5A43]'
                        }`}
                      >
                        {f.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[13px] sm:text-[14px] text-[#5F665E]">
                <p className="italic font-serif text-[15px] sm:text-[16px] text-[#1E2822]">
                  &ldquo;{currentMatcher.rosieNote}&rdquo;{' '}
                  <span className="not-italic text-[11px] uppercase tracking-[0.18em] text-[#2D5A43] ml-1.5">
                    — Rosie, Principal Coach
                  </span>
                </p>
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#2D5A43] font-medium shrink-0">
                  Showing {visibleHorses.length} {visibleHorses.length === 1 ? 'horse' : 'horses'}
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── BESPOKE STALL DOOR NAMEPLATE CARDS (WARM & PERSONAL) ──────────── */}
      <section className="relative z-10 px-4 sm:px-6 md:px-12 py-10 sm:py-16 md:py-20">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {visibleHorses.map((horse, idx) => {
            const stallNumber = horses.findIndex((h) => h.name === horse.name) + 1;
            return (
              <Reveal key={horse.name} delay={(idx % 2) * 0.06}>
                <article className="group rounded-3xl bg-white p-4 sm:p-6 border border-[#2D5A43]/12 shadow-[0_16px_40px_-28px_rgba(30,40,34,0.16)] flex flex-col justify-between h-full">
                  <div>
                    {/* Warm Brass-Style Stall Door Nameplate Bar */}
                    <div className="flex items-center justify-between gap-2 px-3.5 py-2 mb-3.5 rounded-xl bg-[#F3EDE0] border border-[#D8CEBE] text-[#1E2822]">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-2 h-2 rounded-full bg-[#8C6239] shrink-0" />
                        <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] font-medium text-[#6E5034] truncate">
                          Loosebox 0{stallNumber} &middot; {horse.bloodline}
                        </span>
                      </div>
                      <span className="text-[11px] font-serif italic text-[#2D5A43] shrink-0">
                        {horse.height}
                      </span>
                    </div>

                    {/* Full-Horse Photograph Window */}
                    <div className="relative overflow-hidden rounded-2xl bg-[#E8E2D5] aspect-[16/10] mb-4 sm:mb-5">
                      <img
                        src={horse.photo}
                        alt={`${horse.name} — ${horse.colour} ${horse.breed}`}
                        loading="eager"
                        decoding="async"
                        className="w-full h-full object-cover object-center block transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-[#FAF6EE]/95 text-[#1E2822] text-[10px] font-medium shadow-sm">
                        {horse.temperament}
                      </span>
                    </div>

                    {/* Header: Name + Breed on left, Ride CTA on right */}
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div className="min-w-0">
                        <h2 className="font-serif text-2xl sm:text-3xl text-[#1E2822] leading-none">
                          {horse.name}
                        </h2>
                        <p className="text-[11px] sm:text-[12px] text-[#2D5A43] font-medium mt-1.5">
                          {horse.colour} {horse.breed} &middot; {horse.age}
                        </p>
                      </div>

                      <Link
                        to="/demo/equestrian/book"
                        className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#2D5A43] text-[#FAF6EE] hover:bg-[#1E2822] text-[10px] uppercase tracking-[0.18em] font-medium transition-colors shrink-0"
                      >
                        <span>Request {horse.name}</span>
                        <ArrowUpRight size={13} />
                      </Link>
                    </div>

                    <p className="text-[14px] sm:text-[15px] text-[#454D46] leading-relaxed mb-4">
                      {horse.character}
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-3.5 border-t border-[#2D5A43]/10">
                    {/* Discipline & Best For Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12px]">
                      <div className="bg-[#FAF6EE] rounded-xl px-3.5 py-2.5">
                        <span className="block text-[9px] uppercase tracking-[0.18em] text-[#2D5A43] mb-0.5">
                          Schooling &amp; Level
                        </span>
                        <span className="font-medium text-[#1E2822]">{horse.schooling}</span>
                      </div>
                      <div className="bg-[#FAF6EE] rounded-xl px-3.5 py-2.5">
                        <span className="block text-[9px] uppercase tracking-[0.18em] text-[#2D5A43] mb-0.5">
                          Ideal Partner For
                        </span>
                        <span className="font-medium text-[#1E2822]">{horse.bestFor}</span>
                      </div>
                    </div>

                    {/* Personal Barn Quirk Note */}
                    <div className="rounded-xl bg-[#E8F0EB]/65 px-3.5 py-2.5 flex items-start gap-2.5 text-[12px] sm:text-[13px] text-[#1E2822]">
                      <Heart size={13} className="text-[#2D5A43] shrink-0 mt-0.5" />
                      <p className="leading-snug">
                        <span className="font-medium text-[#2D5A43]">In the barn: </span>
                        {horse.quirk}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── WARM PARCHMENT YARD TEAM & HORSE WELFARE SECTION ──────────────── */}
      <section className="relative z-10 py-14 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 bg-[#F3EDE0] border-t border-[#2D5A43]/12">
        <div className="max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-end mb-10 sm:mb-12">
            <div className="lg:col-span-7">
              <Reveal>
                <SectionLabel className="mb-3.5">The People in the Tack Room</SectionLabel>
                <h2 className="font-serif text-[clamp(1.95rem,4vw,3.3rem)] leading-[1.08] tracking-[-0.02em] text-[#1E2822]">
                  Who teaches you &amp; cares for the herd.
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-5">
              <Reveal delay={0.08}>
                <p className="text-[14px] sm:text-[15px] text-[#5F665E] leading-[1.8]">
                  All coaching at Bramble &amp; Bay is led by permanent, BHS-qualified instructors alongside our full-time welfare and saddlery manager.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {coaches.map((coach, i) => (
              <Reveal
                key={coach.name}
                delay={i * 0.06}
                className="rounded-3xl bg-[#FAF6EE] border border-[#2D5A43]/12 p-5 sm:p-6 flex flex-col justify-between shadow-[0_12px_30px_-24px_rgba(30,40,34,0.14)]"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#2D5A43] font-medium">
                      0{i + 1} &middot; Yard Team
                    </span>
                    <Bloom size={14} />
                  </div>
                  <h3 className="font-serif text-2xl text-[#1E2822] mb-1">{coach.name}</h3>
                  <p className="text-[11px] font-medium text-[#2D5A43] mb-3 leading-snug">
                    {coach.role}
                  </p>
                  <p className="text-[13px] sm:text-[14px] text-[#5F665E] leading-[1.7] mb-4">
                    {coach.bio}
                  </p>
                </div>

                <div className="pt-3.5 border-t border-[#2D5A43]/10 space-y-2">
                  <p className="font-serif italic text-[14px] text-[#1E2822] leading-snug">
                    {coach.quote}
                  </p>
                  <p className="text-[11px] text-[#2D5A43]">
                    {coach.softSpot}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <EquestrianFooter />
    </div>
  );
};

export default EquestrianHorses;
