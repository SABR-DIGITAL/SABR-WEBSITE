import React, { useEffect, useState } from 'react';
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { motion as framerMotion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Check, Clock, MapPin, Phone } from 'lucide-react';
import EquestrianNav from './EquestrianNav';
import EquestrianFooter from './EquestrianFooter';
import { Reveal, SectionLabel, PhotoReveal } from './EquestrianUI';
import { academy, lessons, lessonIncludes, images } from './equestrianData';

const motion = framerMotion as any;

const CATEGORIES = [
  'All Sessions',
  'Foundations & Children',
  'Flatwork & Private',
  'Jumping & Clinics',
  'Downland Hacking'
] as const;

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

      {/* ── WARM EDITORIAL HEADER ────────────────────────────────────────── */}
      <section className="relative z-10 pt-24 sm:pt-32 md:pt-40 pb-10 sm:pb-12 md:pb-16 px-5 sm:px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto">
          <Reveal>
            <SectionLabel className="mb-4 sm:mb-5">Lessons &amp; Clinics</SectionLabel>
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-end">
            <div className="lg:col-span-8">
              <Reveal delay={0.05}>
                <h1 className="font-serif text-[clamp(2.2rem,5.8vw,4.8rem)] leading-[1.05] tracking-[-0.02em]">
                  Quiet, structured coaching.
                  <br />
                  <span className="italic text-[#2D5A43]">Never more than four in a ride.</span>
                </h1>
              </Reveal>
            </div>
            <div className="lg:col-span-4">
              <Reveal delay={0.12}>
                <p className="text-[15px] sm:text-[16px] text-[#5F665E] leading-[1.8] sm:leading-[1.85]">
                  Every session is taught by a BHS-accredited coach and paired with a schoolmaster suited to your height, balance, and confidence.
                </p>
              </Reveal>
            </div>
          </div>

          {/* ── INTERACTIVE CATEGORY FILTER PILLS ──────────────────────── */}
          <Reveal delay={0.16} className="mt-8 sm:mt-12 flex flex-wrap items-center gap-2 sm:gap-3">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.26em] font-medium transition-all duration-300 ${
                    active
                      ? 'bg-[#2D5A43] text-[#FAF6EE] shadow-md'
                      : 'bg-white/80 text-[#5F665E] hover:bg-[#E8F0EB] hover:text-[#2D5A43]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </Reveal>
        </div>
      </section>

      {/* ── VISUAL LESSON STREAM (ENGAGING, WARM & UNCLUTTERED) ──────────── */}
      <section className="relative z-10 px-5 sm:px-6 md:px-12 pb-16 sm:pb-24 md:pb-32">
        <div className="max-w-[1440px] mx-auto space-y-5 sm:space-y-6">
          {filteredLessons.map((lesson, i) => (
            <article
              key={lesson.id}
              className="group rounded-3xl bg-white/85 hover:bg-white p-5 sm:p-6 md:p-8 lg:p-10 transition-colors duration-300 shadow-[0_14px_40px_-26px_rgba(30,40,34,0.18)]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center">
                {/* Left: Correlated Lesson Photograph */}
                <div className="lg:col-span-4 overflow-hidden rounded-2xl aspect-[16/10] bg-[#E8E2D5]">
                  <img
                    src={lesson.photo}
                    alt={lesson.name}
                    loading={i < 3 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="w-full h-full object-cover block"
                  />
                </div>

                {/* Middle: Title, Badges, Description & Highlights */}
                <div className="lg:col-span-5">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-2.5 sm:mb-3">
                    <span className="px-3.5 py-1 rounded-full bg-[#E8F0EB] text-[#2D5A43] text-[10px] uppercase tracking-[0.24em] font-medium">
                      {lesson.category}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.22em] text-[#5F665E]">
                      &middot; {lesson.who}
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl md:text-3xl text-[#1E2822] group-hover:text-[#2D5A43] transition-colors mb-2.5 sm:mb-3">
                    {lesson.name}
                  </h2>

                  <p className="text-[14px] sm:text-[15px] md:text-[16px] text-[#5F665E] leading-[1.75] sm:leading-[1.8] mb-4 sm:mb-5">
                    {lesson.detail}
                  </p>

                  <div className="flex flex-wrap gap-x-5 gap-y-2">
                    {lesson.highlights.map((h) => (
                      <span key={h} className="inline-flex items-center gap-2 text-[13px] text-[#2D5A43]">
                        <span className="w-4 h-4 rounded-full bg-[#E8F0EB] flex items-center justify-center shrink-0">
                          <Check size={10} />
                        </span>
                        <span className="text-[#454D46]">{h}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Duration, Arena & Book CTA */}
                <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-4 pt-3 sm:pt-4 lg:pt-0">
                  <div className="lg:text-right space-y-1.5">
                    <div className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] text-[#2D5A43] font-medium">
                      <Clock size={14} />
                      <span>{lesson.duration}</span>
                    </div>
                    <div className="flex items-center lg:justify-end gap-1.5 text-[12px] text-[#5F665E]">
                      <MapPin size={13} className="text-[#2D5A43] shrink-0" />
                      <span>{lesson.setting}</span>
                    </div>
                  </div>

                  <Link
                    to="/demo/equestrian/book"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#2D5A43] text-[#FAF6EE] text-[10px] uppercase tracking-[0.28em] font-medium hover:bg-[#234734] transition-colors shrink-0"
                  >
                    <span>Book This Lesson</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── INCLUDED WITH EVERY LESSON (OPEN SPACE, NO BOXES) ────────────── */}
      <section className="relative z-10 py-14 sm:py-20 md:py-28 px-5 sm:px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto">
          <Reveal>
            <SectionLabel className="mb-4 sm:mb-5">The Yard Standard</SectionLabel>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.3rem)] leading-[1.1] tracking-[-0.02em] mb-10 sm:mb-16">
              Included with every session.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
            {lessonIncludes.map((item, i) => (
              <Reveal key={item} delay={i * 0.07}>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#E8F0EB] text-[#2D5A43] font-serif text-sm mb-4 sm:mb-5">
                  0{i + 1}
                </span>
                <p className="font-serif text-lg sm:text-xl leading-relaxed text-[#1E2822]">{item}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHOTOGRAPH & GUIDANCE SPLIT ──────────────────────────────────── */}
      <section className="relative z-10 py-14 sm:py-20 md:py-28 px-5 sm:px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <PhotoReveal
              src={images.bond}
              alt="Rider standing with her horse in the barn doorway"
              className="aspect-[16/11] w-full"
            />
          </div>
          <div className="lg:col-span-6">
            <Reveal>
              <SectionLabel className="mb-4 sm:mb-5">Personal Advice</SectionLabel>
              <h2 className="font-serif text-[clamp(2rem,4vw,3.3rem)] leading-[1.08] tracking-[-0.02em] mb-5 sm:mb-6">
                Not sure which lesson fits best?
              </h2>
              <p className="text-[15px] sm:text-[16px] text-[#5F665E] leading-[1.8] sm:leading-[1.85] mb-8 sm:mb-10 max-w-xl">
                Ring Rosie or Fen in the tack room, or send a lesson request. Tell us how recently you rode and what you would like to work on, and we will advise the right session and horse.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3.5 sm:gap-4">
                <Link
                  to="/demo/equestrian/book"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#2D5A43] text-[#FAF6EE] text-[11px] uppercase tracking-[0.28em] font-medium hover:bg-[#234734] transition-colors"
                >
                  <span>Book a Lesson</span>
                  <ArrowUpRight size={15} />
                </Link>
                <a
                  href={`tel:${academy.phoneHref}`}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#E8F0EB] text-[#2D5A43] text-[11px] uppercase tracking-[0.28em] font-medium hover:bg-[#dce8e0] transition-colors"
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
