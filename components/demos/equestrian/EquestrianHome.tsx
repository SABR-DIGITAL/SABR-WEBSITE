import React, { useEffect, useState } from 'react';
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { ArrowRight, ArrowUpRight, Phone } from 'lucide-react';
import EquestrianNav from './EquestrianNav';
import EquestrianFooter from './EquestrianFooter';
import { Reveal, SectionLabel, PhotoReveal, HoofPrintTrail } from './EquestrianUI';
import {
  academy,
  lessons,
  horses,
  testimonials,
  images
} from './equestrianData';

const pillars = [
  {
    num: '01',
    title: 'Four riders maximum',
    body: 'Every group lesson is capped at four riders so your coach sees every transition, corner, and fence approach.'
  },
  {
    num: '02',
    title: 'Twenty-two schoolmasters',
    body: 'From gentle Welsh lead-rein ponies to KWPN and Irish Sport Horse schoolmasters matched carefully to your balance.'
  },
  {
    num: '03',
    title: 'Four hundred private acres',
    body: 'Step directly out of the yard gate onto ancient Wiltshire chalk turf and ridgeway tracks without crossing a road.'
  },
  {
    num: '04',
    title: 'All-weather arenas',
    body: 'A 60m × 25m floodlit sand-and-fibre outdoor arena, a covered indoor school, and a six-acre grass showjumping paddock.'
  }
];

const EquestrianHome: React.FC = () => {
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
  }, []);

  const featuredLessons = [lessons[0], lessons[1], lessons[3], lessons[8], lessons[9]];
  const featuredHorses = [horses[0], horses[1], horses[2], horses[3]];
  const activeLesson = featuredLessons[activeLessonIndex] || featuredLessons[0];

  return (
    <div className="relative min-h-screen bg-[#FAF6EE] font-inter text-[#1E2822] selection:bg-[#2D5A43] selection:text-[#FAF6EE]">
      <HoofPrintTrail />
      <EquestrianNav transparentOnTop />

      {/* ── FULL-SCREEN LUXURY HERO (MINIMALISTIC TITLE ONLY, INSTANT MOBILE SCROLL) ─────── */}
      <section className="relative z-10 h-[100svh] md:h-screen md:min-h-[640px] w-full overflow-hidden bg-[#1E2822] flex items-end md:items-center pb-14 sm:pb-20 md:pb-0">
        <div className="absolute inset-0">
          <img
            src={images.hero}
            alt="Horse and rider cantering in the outdoor arena at Bramble & Bay"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover object-[58%_center] sm:object-center block"
          />
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(18,28,22,0.42) 0%, rgba(18,28,22,0.22) 45%, rgba(18,28,22,0.72) 100%)'
          }}
        />

        <div className="relative z-10 max-w-[1440px] w-full mx-auto px-5 sm:px-6 md:px-12 md:pt-12">
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.34em] sm:tracking-[0.42em] font-semibold text-[#CFE3D6] mb-3.5 sm:mb-5">
            Bramble &amp; Bay &middot; Pewsey Vale, Wiltshire
          </p>

          <h1 className="font-serif text-[#FAF6EE] text-[clamp(2.35rem,6.6vw,6.2rem)] leading-[1.04] tracking-[-0.025em] max-w-4xl">
            <span className="block font-semibold text-white">
              Classical Equitation.
            </span>
            <span className="block italic font-normal text-[#CFE3D6] mt-1 md:mt-2">
              Four hundred private acres.
            </span>
          </h1>
        </div>
      </section>

      {/* ── SECTION 01: THE ACADEMY PHILOSOPHY ───────────────────────────── */}
      <section className="relative z-10 py-16 sm:py-24 md:py-36 px-5 sm:px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-end mb-12 sm:mb-20">
            <div className="lg:col-span-7">
              <Reveal>
                <SectionLabel className="mb-4 sm:mb-5">The Academy Philosophy</SectionLabel>
                <h2 className="font-serif text-[clamp(2rem,4.6vw,3.9rem)] leading-[1.08] tracking-[-0.02em]">
                  Unhurried country riding,
                  <br />
                  <span className="italic text-[#2D5A43]">taught properly from day one.</span>
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-5">
              <Reveal delay={0.1}>
                <p className="text-[15px] sm:text-[16px] text-[#5F665E] leading-[1.8] sm:leading-[1.85]">
                  We do not run nose-to-tail riding lessons. Whether you are putting a five-year-old on the lead-rein, returning to the saddle after twenty years, or schooling shoulder-in on a warmblood, every session is warm, unhurried, and personal.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.num} delay={i * 0.08}>
                <p className="font-serif text-lg italic text-[#2D5A43] mb-2 sm:mb-3">{pillar.num}</p>
                <h3 className="font-serif text-xl sm:text-2xl leading-snug mb-2 sm:mb-3 text-[#1E2822]">{pillar.title}</h3>
                <p className="text-[14px] sm:text-[15px] text-[#5F665E] leading-[1.8]">{pillar.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 02: IN THE BARN & ARENA ──────────────────────────────── */}
      <section className="relative z-10 pb-16 sm:pb-24 md:pb-36 px-5 sm:px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <PhotoReveal
              src={images.lesson}
              alt="Coach and young rider grooming a chestnut horse in the wooden stables"
              className="aspect-[16/11] w-full"
            />
          </div>
          <div className="lg:col-span-5">
            <Reveal>
              <SectionLabel className="mb-4 sm:mb-5">Partnership First</SectionLabel>
              <h2 className="font-serif text-[clamp(1.85rem,3.8vw,3.2rem)] leading-[1.1] tracking-[-0.015em] mb-5 sm:mb-6">
                The same coach and the same horse each week.
              </h2>
              <p className="text-[15px] sm:text-[16px] text-[#5F665E] leading-[1.8] sm:leading-[1.85] mb-7 sm:mb-8">
                Good riding starts in the stable before you ever put a foot in the stirrup. Rather than swapping horses every Saturday, we pair you with a schoolmaster suited to your confidence and give you time to groom, tack up, and build a real bond.
              </p>
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3.5 sm:gap-4">
                <Link
                  to="/demo/equestrian/lessons"
                  className="group inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-full bg-[#2D5A43] text-[#FAF6EE] text-[11px] uppercase tracking-[0.26em] hover:bg-[#234734] transition-all"
                >
                  <span>View Our Lessons</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <Link
                  to="/demo/equestrian/horses"
                  className="group inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-full bg-[#E8F0EB] text-[#2D5A43] text-[11px] uppercase tracking-[0.26em] hover:bg-[#dce8e0] transition-all"
                >
                  <span>Meet the Horses</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── SECTION 03: LESSONS & CLINICS (GLITCH-FREE STACKED PREVIEW) ──── */}
      <section className="relative z-10 py-16 sm:py-24 md:py-32 px-5 sm:px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-10 sm:mb-16">
            <Reveal>
              <SectionLabel className="mb-4 sm:mb-5">Lessons &amp; Clinics</SectionLabel>
              <h2 className="font-serif text-[clamp(2rem,4.6vw,3.9rem)] leading-[1.08] tracking-[-0.02em]">
                Ten ways to ride with us.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Link
                to="/demo/equestrian/lessons"
                className="group inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.28em] text-[#2D5A43] font-medium hover:text-[#1E2822] transition-colors"
              >
                <span>See all ten lessons</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-start">
            {/* Left: Pre-mounted Photograph Stack — zero unmount/remount or scroll glitch */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <div className="relative overflow-hidden rounded-2xl aspect-[16/10] sm:aspect-[4/5] bg-[#E8E2D5] shadow-[0_20px_50px_-28px_rgba(30,40,34,0.22)]">
                {featuredLessons.map((lesson, idx) => {
                  const isCurrent = idx === activeLessonIndex;
                  return (
                    <img
                      key={lesson.id}
                      src={lesson.photo}
                      alt={lesson.name}
                      loading="eager"
                      decoding="async"
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-out ${
                        isCurrent ? 'opacity-100 z-[1]' : 'opacity-0 z-0 pointer-events-none'
                      }`}
                    />
                  );
                })}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 z-[2] pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(24,36,29,0.72) 0%, rgba(24,36,29,0.12) 45%, rgba(24,36,29,0) 100%)'
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 z-[3] p-5 sm:p-7 text-[#FAF6EE]">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#CFE3D6] mb-1.5">
                    {activeLesson.setting} &middot; {activeLesson.duration}
                  </p>
                  <p className="font-serif text-xl sm:text-2xl leading-snug">{activeLesson.name}</p>
                </div>
              </div>
            </div>

            {/* Right: Open, Unboxed Editorial Typography List */}
            <div className="lg:col-span-7 divide-y divide-[#2D5A43]/15">
              {featuredLessons.map((lesson, i) => {
                const isActive = i === activeLessonIndex;
                return (
                  <div
                    key={lesson.id}
                    onPointerEnter={(e) => {
                      if (e.pointerType === 'mouse') {
                        setActiveLessonIndex(i);
                      }
                    }}
                    className="py-5 sm:py-7 first:pt-0 last:pb-0 transition-colors"
                  >
                    <Link
                      to="/demo/equestrian/lessons"
                      className="group block"
                    >
                      <div className="flex items-baseline justify-between gap-4 sm:gap-6">
                        <div className="flex items-baseline gap-3.5 sm:gap-5">
                          <span
                            className={`font-serif text-sm tabular-nums transition-colors shrink-0 ${
                              isActive ? 'text-[#2D5A43]' : 'text-[#5F665E]/60'
                            }`}
                          >
                            0{i + 1}
                          </span>
                          <div>
                            <h3
                              className={`font-serif text-xl sm:text-2xl md:text-3xl leading-snug transition-colors ${
                                isActive ? 'text-[#2D5A43]' : 'text-[#1E2822] group-hover:text-[#2D5A43]'
                              }`}
                            >
                              {lesson.name}
                            </h3>
                            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] sm:tracking-[0.24em] text-[#5F665E] mt-1">
                              {lesson.who} &middot; {lesson.duration}
                            </p>
                          </div>
                        </div>

                        <ArrowUpRight
                          size={18}
                          className={`shrink-0 transition-all duration-300 ${
                            isActive
                              ? 'text-[#2D5A43] translate-x-0.5 -translate-y-0.5'
                              : 'text-[#5F665E]/50 group-hover:text-[#2D5A43]'
                          }`}
                        />
                      </div>

                      <p
                        className={`pl-0 sm:pl-9 pr-0 sm:pr-6 text-[14px] sm:text-[15px] leading-[1.75] sm:leading-[1.8] transition-all duration-300 ${
                          isActive ? 'text-[#1E2822] mt-2.5 sm:mt-3 opacity-100' : 'text-[#5F665E] mt-2 opacity-80'
                        }`}
                      >
                        {lesson.detail}
                      </p>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 04: THE HORSES (MINIMALISTIC, COMPACT 2-PER-ROW) ─────── */}
      <section className="relative z-10 py-16 sm:py-24 md:py-32 px-5 sm:px-6 md:px-12">
        <div className="max-w-[1240px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-10 sm:mb-14">
            <Reveal>
              <SectionLabel className="mb-4 sm:mb-5">The Horses</SectionLabel>
              <h2 className="font-serif text-[clamp(2rem,4.6vw,3.9rem)] leading-[1.08] tracking-[-0.02em]">
                Chosen for temperament,
                <br />
                <span className="italic text-[#2D5A43]">schooled with kindness.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Link
                to="/demo/equestrian/horses"
                className="group inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full bg-[#2D5A43] text-[#FAF6EE] text-[11px] uppercase tracking-[0.28em] hover:bg-[#234734] transition-colors duration-300 w-full sm:w-auto"
              >
                <span>Meet All Eight Horses</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-14 gap-y-10 sm:gap-y-14">
            {featuredHorses.map((horse, i) => (
              <Reveal key={horse.name} delay={(i % 2) * 0.12}>
                <article>
                  <PhotoReveal
                    src={horse.photo}
                    alt={`${horse.name}, ${horse.colour} ${horse.breed}`}
                    className="aspect-[16/11] w-full mb-4 sm:mb-5"
                  />

                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 mb-2.5">
                    <div>
                      <h3 className="font-serif text-2xl md:text-3xl text-[#1E2822] leading-none">
                        {horse.name}
                      </h3>
                      <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] sm:tracking-[0.24em] text-[#2D5A43] mt-2">
                        {horse.height} &middot; {horse.breed} &middot; {horse.age}
                      </p>
                    </div>

                    <Link
                      to="/demo/equestrian/book"
                      className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#E8F0EB] text-[#2D5A43] hover:bg-[#2D5A43] hover:text-[#FAF6EE] text-[10px] uppercase tracking-[0.26em] font-medium transition-colors shrink-0 w-fit"
                    >
                      <span>Ride {horse.name}</span>
                      <ArrowUpRight size={13} />
                    </Link>
                  </div>

                  <p className="text-[14px] md:text-[15px] text-[#5F665E] leading-relaxed">
                    {horse.character}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 05: THE YARD & DOWNLAND (100% MATCHING PHOTOS) ──────── */}
      <section className="relative z-10 py-16 sm:py-24 md:py-32 px-5 sm:px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5">
              <Reveal>
                <SectionLabel className="mb-4 sm:mb-5">The Yard &amp; Estate</SectionLabel>
                <h2 className="font-serif text-[clamp(1.95rem,4vw,3.5rem)] leading-[1.08] tracking-[-0.02em] mb-5 sm:mb-6">
                  Airy oak stabling beneath the chalk downs.
                </h2>
                <p className="text-[15px] sm:text-[16px] text-[#5F665E] leading-[1.8] sm:leading-[1.85] mb-8 sm:mb-10">
                  Our American barn, 60m floodlit sand arena, grass showjumping paddock, and heated viewing lounge sit right at the foot of the Pewsey Vale — with four hundred acres of open turf stretching out behind the back gate.
                </p>

                <Link
                  to="/demo/equestrian/facilities"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#2D5A43] text-[#FAF6EE] text-[11px] uppercase tracking-[0.28em] hover:bg-[#234734] transition-colors duration-300 w-full sm:w-auto"
                >
                  <span>Tour The Yard</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Reveal>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <PhotoReveal
                  src={images.stables}
                  alt="Sunlit American barn aisle with loosebox stalls on both sides and a horse standing calmly"
                  className="aspect-[16/11] sm:aspect-[4/5] w-full mb-3"
                />
                <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.26em] text-[#2D5A43] px-1">
                  The American Barn &amp; Looseboxes
                </p>
              </div>
              <div className="sm:mt-12">
                <PhotoReveal
                  src={images.hacking}
                  alt="Horses out on the open misty Wiltshire chalk downland pastures"
                  className="aspect-[16/11] sm:aspect-[4/5] w-full mb-3"
                  delay={0.12}
                />
                <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.26em] text-[#2D5A43] px-1">
                  400 Acres of Open Chalk Downland
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 06: RIDER VOICES (OPEN & UNBOXED) ────────────────────── */}
      <section className="relative z-10 py-16 sm:py-24 md:py-32 px-5 sm:px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto">
          <Reveal>
            <SectionLabel className="mb-4 sm:mb-5">Rider Voices</SectionLabel>
            <h2 className="font-serif text-[clamp(1.95rem,4vw,3.5rem)] leading-[1.08] tracking-[-0.02em] mb-10 sm:mb-16">
              Heard from the viewing gallery.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 lg:gap-16">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08} className="flex flex-col justify-between">
                <div>
                  <span className="block font-serif text-4xl sm:text-5xl leading-none text-[#2D5A43]/35 mb-3 sm:mb-4">
                    &ldquo;
                  </span>
                  <p className="font-serif text-lg sm:text-xl md:text-2xl leading-relaxed text-[#1E2822] mb-6 sm:mb-8">
                    {t.quote}
                  </p>
                </div>
                <div>
                  <p className="text-[12px] uppercase tracking-[0.28em] text-[#2D5A43] font-medium">
                    {t.name}
                  </p>
                  <p className="text-[13px] text-[#5F665E] mt-1">{t.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING INVITATION ───────────────────────────────────────────── */}
      <section className="relative z-10 px-5 sm:px-6 md:px-12 pb-20 sm:pb-28 md:pb-36">
        <div className="max-w-[1440px] mx-auto rounded-3xl bg-[#2D5A43] text-[#FAF6EE] p-7 sm:p-10 md:p-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            <div className="lg:col-span-8">
              <p className="text-[10px] uppercase tracking-[0.38em] text-[#CFE3D6] mb-3 sm:mb-4">
                Come &amp; Ride With Us
              </p>
              <h2 className="font-serif text-[clamp(2rem,5vw,4.2rem)] leading-[1.05] tracking-[-0.02em] mb-5 sm:mb-6">
                Tell us about the rider.
                <br />
                <span className="italic text-[#CFE3D6]">We will match the horse.</span>
              </h2>
              <p className="text-white/80 text-[15px] sm:text-[16px] leading-[1.75] sm:leading-[1.8] max-w-xl">
                Every booking is confirmed personally from the tack room so we can pair you with the right coach and schoolmaster before you arrive.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3.5 sm:gap-4 lg:items-end">
              <Link
                to="/demo/equestrian/book"
                className="group inline-flex items-center justify-center gap-4 px-9 py-4 rounded-full bg-[#FAF6EE] text-[#1E2822] text-[11px] uppercase tracking-[0.28em] font-medium hover:bg-white transition-colors duration-300 w-full sm:w-auto"
              >
                <span>Book a Lesson</span>
                <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <a
                href={`tel:${academy.phoneHref}`}
                className="inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full border border-white/30 text-[#FAF6EE] text-[11px] uppercase tracking-[0.28em] hover:bg-white/10 transition-colors duration-300 w-full sm:w-auto"
              >
                <Phone size={14} />
                <span>{academy.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <EquestrianFooter />
    </div>
  );
};

export default EquestrianHome;
