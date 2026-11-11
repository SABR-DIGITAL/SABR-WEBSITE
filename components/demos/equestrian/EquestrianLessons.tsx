import React, { useEffect, useState } from 'react';
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { ArrowUpRight, Check, Clock, MapPin, Phone } from 'lucide-react';
import EquestrianNav from './EquestrianNav';
import EquestrianFooter from './EquestrianFooter';
import { Reveal, SectionLabel, PhotoReveal, Bloom } from './EquestrianUI';
import { academy, lessons, lessonIncludes, images } from './equestrianData';

const CATEGORIES = [
  'All Sessions',
  'Foundations & Children',
  'Flatwork & Private',
  'Jumping & Clinics',
  'Downland Hacking'
] as const;

const LESSON_HORSES: Record<string, string> = {
  'little-buds': 'Poppy (12.2hh) & Pip (11.2hh)',
  'beginner-group': 'Poppy, Marmalade & Clover',
  'own-a-pony': 'Pip, Poppy & Marmalade',
  private: 'Bluebell, Sorrel or Juniper',
  'semi-private': 'Bluebell, Clover & Sorrel',
  returners: 'Clover (14.2hh) & Bluebell (15.1hh)',
  improvers: 'Bluebell, Sorrel & Hawthorn',
  dressage: 'Juniper (16.2hh KWPN) & Bluebell',
  jumping: 'Hawthorn (16.1hh ISH) & Marmalade',
  hack: 'Clover, Bluebell & Sorrel'
};

const LESSON_RHYTHM = [
  {
    time: '15 mins before',
    title: 'Meet in the Barn',
    note: 'Borrow a fitted hat & boots, greet your horse in their loosebox, and check stirrups.'
  },
  {
    time: '00 – 10 mins',
    title: 'Long-Rein Warm-Up',
    note: 'Unhurried walk and stretching circles so horse and rider settle into rhythm.'
  },
  {
    time: '10 – 45 mins',
    title: 'Focused Tuition',
    note: 'Capped at four riders maximum so every transition and corner is coached.'
  },
  {
    time: 'After Dismount',
    title: 'Coffee & Coach Notes',
    note: 'Untack in the barn and receive written progress notes in the viewing lounge.'
  }
];

const EquestrianLessons: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Sessions');

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
  }, []);

  const filteredLessons =
    selectedCategory === 'All Sessions'
      ? lessons
      : lessons.filter((l) => l.category === selectedCategory);

  return (
    <div className="relative min-h-screen bg-[#FAF6EE] font-inter text-[#1E2822] selection:bg-[#2D5A43] selection:text-[#FAF6EE]">
      <EquestrianNav />

      {/* ── WARM SUNLIT COUNTRY HEADER + "AN HOUR AT THE YARD" RHYTHM ──────── */}
      <section className="relative z-10 pt-24 sm:pt-32 md:pt-36 pb-8 sm:pb-12 px-4 sm:px-6 md:px-12 border-b border-[#2D5A43]/12">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center">
            <div className="lg:col-span-7">
              <Reveal>
                <SectionLabel className="mb-3.5 sm:mb-5">Lessons &amp; Clinics</SectionLabel>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="font-serif text-[clamp(2.05rem,5.2vw,4.4rem)] leading-[1.04] tracking-[-0.02em] text-[#1E2822] mb-4">
                  Quiet, structured coaching.
                  <br />
                  <span className="italic text-[#2D5A43]">Never more than four in a ride.</span>
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-[14px] sm:text-[16px] text-[#5F665E] leading-[1.75] max-w-xl">
                  Every session is taught by a BHS-accredited coach and paired with a schoolmaster suited to your height, balance, and confidence.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={0.14}>
                <div className="overflow-hidden rounded-2xl sm:rounded-3xl aspect-[16/10] bg-[#E8E2D5] border border-[#2D5A43]/12 shadow-[0_18px_42px_-26px_rgba(30,40,34,0.22)]">
                  <img
                    src={images.arena}
                    alt="Two riders schooling horses in the outdoor arena"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-full object-cover object-center block"
                  />
                </div>
              </Reveal>
            </div>
          </div>

          {/* ── NON-GENERIC FEATURE: HOW A LESSON UNFOLDS AT BRAMBLE & BAY ──── */}
          <Reveal delay={0.16} className="mt-7 sm:mt-10">
            <div className="rounded-2xl sm:rounded-3xl bg-[#F3EDE0] border border-[#2D5A43]/12 p-4 sm:p-6">
              <div className="flex items-center justify-between gap-2 mb-3.5">
                <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#2D5A43] font-medium">
                  The Rhythm of Every Ride &middot; What to Expect
                </p>
                <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-serif italic text-[#5F665E]">
                  <Bloom size={13} /> Unhurried from mounting block to dismount
                </span>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
                {LESSON_RHYTHM.map((step, i) => (
                  <div
                    key={step.title}
                    className="rounded-xl sm:rounded-2xl bg-[#FAF6EE] p-3 sm:p-4 border border-[#2D5A43]/10"
                  >
                    <span className="inline-block text-[10px] uppercase tracking-[0.16em] text-[#2D5A43] font-medium mb-1">
                      0{i + 1} &middot; {step.time}
                    </span>
                    <h2 className="font-serif text-base sm:text-lg text-[#1E2822] leading-snug mb-1">
                      {step.title}
                    </h2>
                    <p className="text-[11px] sm:text-[12px] text-[#5F665E] leading-relaxed">
                      {step.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* ── INTERACTIVE CATEGORY FILTER BAR ──────────────────────────── */}
          <Reveal delay={0.2} className="mt-6 sm:mt-8 flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-[12px] font-medium transition-all duration-200 cursor-pointer ${
                    active
                      ? 'bg-[#2D5A43] text-[#FAF6EE] shadow-sm'
                      : 'bg-white text-[#454D46] hover:bg-[#E8F0EB] hover:text-[#2D5A43] border border-[#2D5A43]/12'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </Reveal>
        </div>
      </section>

      {/* ── COMPACT MOBILE & SPACIOUS DESKTOP LESSON DIRECTORY ──────────── */}
      <section className="relative z-10 px-4 sm:px-6 md:px-12 py-7 sm:py-12 md:py-16">
        <div className="max-w-[1400px] mx-auto space-y-3.5 sm:space-y-5">
          {filteredLessons.map((lesson) => {
            const matchedHorses = LESSON_HORSES[lesson.id] || 'Matched from our 22 schoolmasters';
            return (
              <article
                key={lesson.id}
                className="group rounded-2xl sm:rounded-3xl bg-white p-3.5 sm:p-6 md:p-7 border border-[#2D5A43]/12 transition-colors duration-300 shadow-[0_12px_32px_-24px_rgba(30,40,34,0.16)]"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-6 lg:gap-8 items-center">
                  {/* Left: Full-Horse Lesson Photograph — Compact on Mobile */}
                  <div className="lg:col-span-4 relative overflow-hidden rounded-xl sm:rounded-2xl aspect-[16/9] lg:aspect-[16/10] max-h-[150px] sm:max-h-[210px] lg:max-h-none bg-[#E8E2D5]">
                    <img
                      src={lesson.photo}
                      alt={lesson.name}
                      loading="eager"
                      decoding="async"
                      className="w-full h-full object-cover object-center block"
                    />
                    <span className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-full bg-[#FAF6EE]/95 text-[#1E2822] text-[10px] font-medium shadow-sm max-w-[90%] truncate">
                      Ridden on: {matchedHorses}
                    </span>
                  </div>

                  {/* Middle: Compact Header, Concise Detail & Inline Highlights */}
                  <div className="lg:col-span-5 min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                      <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-[#2D5A43] font-semibold">
                        {lesson.category}
                      </span>
                      <span className="text-[10px] sm:text-[11px] text-[#5F665E]">
                        &middot; {lesson.who}
                      </span>
                    </div>

                    <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-[#1E2822] group-hover:text-[#2D5A43] transition-colors leading-tight mb-1.5 sm:mb-2">
                      {lesson.name}
                    </h2>

                    <p className="text-[13px] sm:text-[15px] text-[#5F665E] leading-[1.5] sm:leading-[1.7] line-clamp-2 sm:line-clamp-none mb-2 sm:mb-3.5">
                      {lesson.detail}
                    </p>

                    <div className="flex flex-wrap gap-x-3 sm:gap-x-5 gap-y-1">
                      {lesson.highlights.map((h) => (
                        <span
                          key={h}
                          className="inline-flex items-center gap-1.5 text-[11px] sm:text-[13px] text-[#2D5A43]"
                        >
                          <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#E8F0EB] flex items-center justify-center shrink-0">
                            <Check size={9} />
                          </span>
                          <span className="text-[#454D46]">{h}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right / Bottom Bar: Single-Row Compact Bar on Mobile so no scrolling is needed */}
                  <div className="lg:col-span-3 flex flex-row lg:flex-col items-center lg:items-end justify-between gap-2.5 pt-2.5 sm:pt-3.5 lg:pt-0 border-t border-[#2D5A43]/10 lg:border-t-0 min-w-0">
                    <div className="lg:text-right space-y-0.5 min-w-0">
                      <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-[12px] text-[#2D5A43] font-medium">
                        <Clock size={12} className="shrink-0" />
                        <span className="truncate">{lesson.duration}</span>
                      </div>
                      <div className="flex items-center lg:justify-end gap-1 text-[11px] sm:text-[12px] text-[#5F665E] min-w-0">
                        <MapPin size={12} className="text-[#2D5A43] shrink-0" />
                        <span className="truncate">{lesson.setting}</span>
                      </div>
                    </div>

                    <Link
                      to="/demo/equestrian/book"
                      className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#2D5A43] text-[#FAF6EE] text-[10px] sm:text-[11px] uppercase tracking-[0.16em] sm:tracking-[0.22em] font-medium hover:bg-[#234734] transition-colors shrink-0"
                    >
                      <span>Book Lesson</span>
                      <ArrowUpRight size={13} />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ── INCLUDED WITH EVERY LESSON (WARM SAGE BAND) ─────────────────── */}
      <section className="relative z-10 py-12 sm:py-18 md:py-22 px-4 sm:px-6 md:px-12 bg-[#E8F0EB]/65 border-y border-[#2D5A43]/10">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <SectionLabel className="mb-3 sm:mb-4">The Yard Standard</SectionLabel>
            <h2 className="font-serif text-[clamp(1.85rem,4vw,3.2rem)] leading-[1.1] tracking-[-0.02em] mb-8 sm:mb-12">
              Included with every session.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {lessonIncludes.map((item, i) => (
              <Reveal
                key={item}
                delay={i * 0.06}
                className="bg-white/95 rounded-2xl p-5 sm:p-6 border border-[#2D5A43]/10"
              >
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#F3EDE0] text-[#2D5A43] font-serif text-xs font-medium mb-3">
                  0{i + 1}
                </span>
                <p className="font-serif text-base sm:text-lg leading-relaxed text-[#1E2822]">{item}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHOTOGRAPH & TACK ROOM ADVICE SPLIT ──────────────────────────── */}
      <section className="relative z-10 py-12 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <PhotoReveal
              src={images.bond}
              alt="Rider standing with her horse in the barn doorway"
              className="aspect-[16/10] w-full"
            />
          </div>
          <div className="lg:col-span-6">
            <Reveal>
              <SectionLabel className="mb-3.5 sm:mb-5">Personal Advice</SectionLabel>
              <h2 className="font-serif text-[clamp(1.9rem,4vw,3.3rem)] leading-[1.08] tracking-[-0.02em] mb-4 sm:mb-5">
                Not sure which lesson fits best?
              </h2>
              <p className="text-[14px] sm:text-[16px] text-[#5F665E] leading-[1.75] sm:leading-[1.85] mb-6 sm:mb-8 max-w-xl">
                Ring Rosie or Fen in the tack room, or send a lesson request. Tell us how recently you rode and what you would like to work on, and we will advise the right session and horse.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
                <Link
                  to="/demo/equestrian/book"
                  className="group inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-full bg-[#2D5A43] text-[#FAF6EE] text-[11px] uppercase tracking-[0.22em] font-medium hover:bg-[#234734] transition-colors"
                >
                  <span>Book a Lesson</span>
                  <ArrowUpRight size={15} />
                </Link>
                <a
                  href={`tel:${academy.phoneHref}`}
                  className="inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-full bg-[#E8F0EB] text-[#2D5A43] text-[11px] uppercase tracking-[0.22em] font-medium hover:bg-[#dce8e0] transition-colors"
                >
                  <Phone size={14} />
                  <span>{academy.phoneDisplay}</span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <EquestrianFooter />
    </div>
  );
};

export default EquestrianLessons;
