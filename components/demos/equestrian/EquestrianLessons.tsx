import React, { useEffect } from 'react';
// Fix react-router-dom missing exports
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { ArrowRight, Check } from 'lucide-react';
import EquestrianNav from './EquestrianNav';
import EquestrianFooter from './EquestrianFooter';
import { Reveal, SectionLabel, PhotoReveal, Bloom, Wash } from './EquestrianUI';
import { lessons, lessonIncludes, images, cardWashes, pastel, palette } from './equestrianData';

const levels = [
  {
    name: 'Never ridden',
    detail: 'We start with how to sit, steer and stop.',
    picks: ['Little Buds lead-rein', 'Beginner group lesson', 'Private lesson']
  },
  {
    name: 'Ridden a bit',
    detail: 'Walk and trot sorted, canter next. Most riders spend a happy year here.',
    picks: ['Improvers group', 'Semi-private, two riders', 'Adult returners course']
  },
  {
    name: 'Confident',
    detail: 'Clinics for the one part you want to sharpen up.',
    picks: ['Jumping clinic', 'Flatwork & dressage clinic', 'Downland hack']
  }
];

const EquestrianLessons: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFAF3] font-inter text-[#1E2A22] selection:bg-[#E4577A] selection:text-[#FFFAF3] overflow-x-hidden">
      <EquestrianNav />

      {/* ── HEADER ─────────────────────────────────────────────────────── */}
      <section className="relative pt-24 md:pt-28 pb-10 md:pb-14 px-6 md:px-10">
        <Wash />
        <div className="relative max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <p className="eq-rise flex items-center gap-3 text-[10px] uppercase tracking-[0.42em] text-[#6B7A6F] mb-6">
              <Bloom size={16} />
              Lessons &amp; prices
            </p>
            <h1
              className="eq-rise font-serif text-[clamp(2.3rem,6.4vw,4.6rem)] leading-[1] tracking-[-0.02em]"
              style={{ animationDelay: '90ms' }}
            >
              Ten ways in.
              <br />
              <span className="italic text-[#E4577A]">No hidden extras.</span>
            </h1>
          </div>
          <div className="lg:col-span-5">
            <p
              className="eq-rise text-lg text-[#4C5A50] leading-relaxed"
              style={{ animationDelay: '170ms' }}
            >
              Hat, body protector and boots included. Book a block of six and you pay for five.
            </p>
          </div>
        </div>
      </section>

      {/* ── FULL PRICE LIST ────────────────────────────────────────────── */}
      <section className="px-6 md:px-10 pb-14 md:pb-20">
        <div className="max-w-[1500px] mx-auto">
          <div className="border-t border-[#EADFD1]">
            {lessons.map((lesson, i) => (
              <Reveal key={lesson.id} delay={Math.min(i, 6) * 0.04}>
                <div className="group grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-6 border-b border-[#EADFD1] items-start transition-colors duration-500 hover:bg-[#FFFCF7]">
                  <div className="md:col-span-4 flex items-start gap-4">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 w-2.5 h-2.5 rounded-full shrink-0 opacity-80"
                      style={{ backgroundColor: lesson.accent }}
                    />
                    <div>
                      <h2 className="font-serif text-xl md:text-[1.65rem] leading-tight">{lesson.name}</h2>
                      <p className="mt-2 text-[10px] uppercase tracking-[0.26em] text-[#6B7A6F]">
                        {lesson.who}
                      </p>
                    </div>
                  </div>

                  <div className="md:col-span-5">
                    <p className="text-[15px] md:text-base text-[#4C5A50] leading-relaxed">{lesson.detail}</p>
                  </div>

                  <div className="md:col-span-3 flex md:justify-end items-baseline gap-5">
                    <p className="text-[10px] uppercase tracking-[0.26em] text-[#6B7A6F] whitespace-nowrap">
                      {lesson.duration}
                    </p>
                    <p className="font-serif text-2xl md:text-3xl leading-none whitespace-nowrap">
                      {lesson.price}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.05}>
            <div
              className="mt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 rounded-[1.5rem] border border-white/70 px-8 py-7"
              style={{ background: cardWashes[1] }}
            >
              <p className="text-[15px] text-[#4C5A50] leading-relaxed max-w-xl">
                <span className="text-[#1E2A22]">Blocks of six:</span> pay for five. Same coach, same
                slot, twelve weeks to use them.
              </p>
              <Link
                to="/demo/equestrian/book"
                className="group inline-flex items-center gap-3 pl-7 pr-5 py-4 bg-[#1E2A22] text-[#FFFAF3] rounded-full text-[10px] uppercase tracking-[0.3em] hover:bg-[#E4577A] transition-colors duration-300 shrink-0"
              >
                Book a lesson
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── WHICH LESSON ───────────────────────────────────────────────── */}
      <section
        className="px-6 md:px-10 py-14 md:py-20"
        style={{
          background: `linear-gradient(180deg, ${palette.cream} 0%, ${pastel.mist} 32%, ${pastel.lilac} 70%, ${palette.cream} 100%)`
        }}
      >
        <div className="max-w-[1500px] mx-auto">
          <Reveal className="max-w-2xl mb-10 md:mb-12">
            <SectionLabel className="mb-6">Which one am I?</SectionLabel>
            <h2 className="font-serif text-[clamp(1.9rem,4.6vw,3.2rem)] leading-[1.05] tracking-[-0.02em]">
              Pick the row that sounds like you.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {levels.map((level, i) => {
              const colour = [palette.rose, palette.gold, palette.meadow][i % 3];
              return (
                <Reveal key={level.name} delay={i * 0.08}>
                  <div
                    className="h-full rounded-[1.75rem] p-8 md:p-10 flex flex-col border border-white/70 shadow-[0_20px_46px_-36px_rgba(30,42,34,0.45)] transition-transform duration-500 hover:-translate-y-1"
                    style={{ background: cardWashes[i % cardWashes.length] }}
                  >
                    <p className="inline-flex self-start items-center gap-2 rounded-full bg-[#FFFCF7]/85 border border-white px-3.5 py-1.5 text-[9px] uppercase tracking-[0.3em] text-[#4C5A50] mb-5">
                      Stage {i + 1}
                    </p>
                    <h3 className="font-serif text-2xl leading-tight mb-3">{level.name}</h3>
                    <p className="text-[15px] text-[#4C5A50] leading-relaxed mb-7">{level.detail}</p>
                    <ul className="mt-auto space-y-3 border-t border-[#EADFD1]/80 pt-6">
                      {level.picks.map((pick) => (
                        <li key={pick} className="flex items-start gap-3 text-[14px] text-[#1E2A22]">
                          <Check size={15} className="mt-0.5 shrink-0" style={{ color: colour }} />
                          {pick}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ────────────────────────────────────────────── */}
      <section className="px-6 md:px-10 py-14 md:py-20">
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <PhotoReveal
              src={images.lesson}
              alt="A young rider holding her horse before a lesson"
              className="rounded-[2rem] aspect-[4/3]"
            />
          </div>
          <div className="lg:col-span-6">
            <Reveal>
              <SectionLabel className="mb-6">Included as standard</SectionLabel>
              <h2 className="font-serif text-[clamp(1.9rem,4.6vw,3rem)] leading-[1.05] tracking-[-0.02em] mb-8">
                Nothing you have to buy first.
              </h2>
            </Reveal>
            <div className="divide-y divide-[#EADFD1] border-y border-[#EADFD1]">
              {lessonIncludes.map((item, i) => (
                <Reveal key={item} delay={i * 0.06}>
                  <div className="flex items-start gap-4 py-5">
                    <Bloom size={17} className="mt-0.5 shrink-0" />
                    <p className="text-[15px] md:text-base text-[#4C5A50] leading-relaxed">{item}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.1}>
              <Link
                to="/demo/equestrian/faqs"
                className="group inline-flex items-center gap-3 mt-9 text-[10px] uppercase tracking-[0.3em]"
              >
                Questions people ask
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <EquestrianFooter />

      <style>{`
        @keyframes eq-rise {
          from { opacity: 0; transform: translate3d(0, 22px, 0); }
          to { opacity: 1; transform: none; }
        }
        .eq-rise { animation: eq-rise 0.85s cubic-bezier(0.22, 1, 0.36, 1) both; }
        @media (prefers-reduced-motion: reduce) { .eq-rise { animation: none; } }
      `}</style>
    </div>
  );
};

export default EquestrianLessons;
