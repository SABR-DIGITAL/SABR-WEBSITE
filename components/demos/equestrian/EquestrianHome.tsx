import React, { useEffect } from 'react';
// Fix react-router-dom missing exports
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { ArrowRight, Clock, MapPin, Users, ShieldCheck } from 'lucide-react';
import EquestrianNav from './EquestrianNav';
import EquestrianFooter from './EquestrianFooter';
import EquestrianIntro from './EquestrianIntro';
import { Reveal, SectionLabel, PhotoReveal, Bloom, HorseMark, Wash, Carousel } from './EquestrianUI';
import {
  academy,
  lessons,
  horses,
  facilities,
  testimonials,
  disciplines,
  images,
  galleryStrip,
  cardWashes,
  pastel,
  palette
} from './equestrianData';

// Four reasons, one line each.
const promises = [
  {
    icon: <Users size={19} />,
    title: 'Four riders, never more',
    detail: 'You ride. You do not queue.',
    colour: palette.rose
  },
  {
    icon: <ShieldCheck size={19} />,
    title: 'Hat and boots included',
    detail: 'Fitted by us, lent free.',
    colour: palette.gold
  },
  {
    icon: <Clock size={19} />,
    title: 'Lessons all year',
    detail: 'Indoor school. Nothing cancelled.',
    colour: palette.sky
  },
  {
    icon: <MapPin size={19} />,
    title: '400 acres out the gate',
    detail: 'Downland from the yard. No boxing up.',
    colour: palette.meadow
  }
];

const facts = [
  { figure: academy.established, label: 'Family run since' },
  { figure: 'Twenty-two', label: 'Horses and ponies' },
  { figure: 'BHS', label: 'Approved centre' }
];

// The carousel runs off the same eight horses as the horses page, so nothing can
// drift out of step.
const horseSlides = horses.map((horse) => ({
  src: horse.photo,
  alt: `${horse.name}, a ${horse.colour.toLowerCase()} ${horse.breed}`,
  title: horse.name,
  note: horse.character,
  meta: `${horse.height} · ${horse.bestFor}`
}));

const EquestrianHome: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFAF3] font-inter text-[#1E2A22] selection:bg-[#E4577A] selection:text-[#FFFAF3] overflow-x-hidden">
      <EquestrianIntro />
      <EquestrianNav />

      {/* ── HERO ───────────────────────────────────────────────────────────
          A split masthead rather than a centred stack. The headline holds the
          left with the facts on hairlines directly beneath it, and the right is
          a cluster with depth to it: one big photograph, a second tucked into
          its corner, a turning rosette and a floating line about opening times.
          The picture is sized against the viewport rather than by an aspect
          ratio, so the type and the whole photograph share the first screen. */}
      <section className="relative pt-20 md:pt-24 pb-12 md:pb-16 px-6 md:px-10">
        <Wash />

        <div className="relative max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* The words. */}
          <div className="lg:col-span-6 xl:col-span-5">
            <p className="eq-rise flex items-center gap-3 text-[10px] uppercase tracking-[0.42em] text-[#6B7A6F] mb-7">
              <Bloom size={15} />
              Est. {academy.established} &middot; the Pewsey Vale
            </p>

            <h1 className="font-serif text-[clamp(2.6rem,6.6vw,5rem)] leading-[0.96] tracking-[-0.025em] mb-7">
              <span className="eq-line">
                <span className="eq-line-in">Four hundred acres.</span>
              </span>
              <span className="eq-line">
                <span className="eq-line-in" style={{ animationDelay: '130ms' }}>
                  Four riders <span className="italic text-[#E4577A]">a lesson.</span>
                </span>
              </span>
            </h1>

            <p
              className="eq-rise max-w-md text-lg text-[#4C5A50] leading-relaxed mb-9"
              style={{ animationDelay: '340ms' }}
            >
              A family riding school on the downland, twenty-two horses, and the same coach every
              week.
            </p>

            <div
              className="eq-rise flex flex-wrap items-center gap-4"
              style={{ animationDelay: '440ms' }}
            >
              <Link
                to="/demo/equestrian/book"
                className="group inline-flex items-center gap-3 pl-8 pr-6 py-4 bg-[#1E2A22] text-[#FFFAF3] rounded-full text-[10px] uppercase tracking-[0.3em] hover:bg-[#E4577A] transition-colors duration-300"
              >
                Book a first lesson
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                to="/demo/equestrian/lessons"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-[#1E2A22]/20 text-[10px] uppercase tracking-[0.3em] hover:border-[#1E2A22] transition-colors duration-300"
              >
                Lessons from £26
              </Link>
            </div>

            {/* Three facts on hairlines, folded into the column instead of
                sitting in a band of their own further down the page. */}
            <div
              className="eq-rise mt-10 grid grid-cols-3 border-t border-[#EADFD1] divide-x divide-[#EADFD1]"
              style={{ animationDelay: '540ms' }}
            >
              {facts.map((fact) => (
                <div key={fact.label} className="pt-5 pr-3 pl-4 first:pl-0">
                  <p className="font-serif text-[1.2rem] md:text-[1.55rem] leading-none mb-2">
                    {fact.figure}
                  </p>
                  <p className="text-[9px] uppercase tracking-[0.26em] text-[#6B7A6F] leading-relaxed">
                    {fact.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* The pictures. */}
          <div className="lg:col-span-6 xl:col-span-7 relative">
            <div className="eq-wipe relative rounded-[1.75rem] md:rounded-[2.5rem] overflow-hidden bg-[#F2EAE0] h-[clamp(330px,56vh,580px)]">
              <img
                src={images.hero}
                alt="A rider out on the downs above Bramble &amp; Bay"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="eq-drift w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(196deg, rgba(255,250,243,0.22) 0%, rgba(255,250,243,0) 42%, rgba(30,42,34,0.18) 100%)'
                }}
              />

              {/* A second photograph tucked into the corner of the first. */}
              <div
                className="eq-rise absolute bottom-5 left-5 md:bottom-7 md:left-7 w-[clamp(96px,11vw,146px)] h-[clamp(120px,14vw,182px)] rounded-[1rem] md:rounded-[1.25rem] overflow-hidden border-[5px] border-[#FFFAF3] shadow-[0_22px_50px_-26px_rgba(30,42,34,0.6)]"
                style={{ animationDelay: '760ms' }}
              >
                <img
                  src={images.children}
                  alt="Two children leading a pony in from the field"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* The rosette. Slow enough that you notice it rather than watch it. */}
            <div
              className="eq-rise absolute -top-3 right-3 md:-top-5 md:right-8 z-10 w-[clamp(84px,9vw,118px)] h-[clamp(84px,9vw,118px)] rounded-full bg-[#FFFAF3] shadow-[0_20px_44px_-24px_rgba(30,42,34,0.55)] grid place-items-center"
              style={{ animationDelay: '900ms' }}
            >
              <svg viewBox="0 0 100 100" aria-hidden="true" className="eq-spin absolute inset-0 w-full h-full">
                <defs>
                  <path
                    id="eq-rosette-path"
                    d="M50,50 m-35,0 a35,35 0 1,1 70,0 a35,35 0 1,1 -70,0"
                    fill="none"
                  />
                </defs>
                <text fill="#6B7A6F" fontSize="9.2" letterSpacing="2.1">
                  {/* Sized to go once round the circle: the full accreditation
                      line is far too long, so it is abbreviated here. */}
                  <textPath href="#eq-rosette-path" startOffset="0">
                    {`BHS APPROVED · EST. ${academy.established} · `}
                  </textPath>
                </text>
              </svg>
              <HorseMark size={30} color={palette.meadow} />
            </div>

            <div
              className="eq-rise eq-float absolute -bottom-5 right-4 md:right-10 flex items-center gap-3 bg-[#FFFAF3]/95 backdrop-blur-sm rounded-full pl-4 pr-6 py-3 shadow-[0_22px_50px_-26px_rgba(30,42,34,0.45)]"
              style={{ animationDelay: '1020ms' }}
            >
              <HorseMark size={32} color={palette.meadow} />
              <span className="text-[9px] uppercase tracking-[0.28em] text-[#4C5A50]">
                Lessons seven days a week
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT IS TAUGHT ─────────────────────────────────────────────────
          One pale wash running the width of the page, five words across it.
          It says what happens here in about a second and it is the only place
          all five colours appear at once. */}
      <section aria-label="What we teach" className="px-6 md:px-10 pt-6 md:pt-10">
        <div
          className="max-w-[1500px] mx-auto rounded-full py-5 md:py-6 px-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
          style={{
            background: `linear-gradient(96deg, ${pastel.blush} 0%, ${pastel.sand} 26%, ${pastel.cream} 50%, ${pastel.mist} 74%, ${pastel.lilac} 100%)`
          }}
        >
          {disciplines.map((word, i) => (
            <React.Fragment key={word}>
              {i > 0 && <Bloom size={13} className="opacity-70" />}
              <span className="eq-ribbon text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-[#4C5A50]" style={{ animationDelay: `${i * 90}ms` }}>
                {word}
              </span>
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ── GALLERY STRIP ──────────────────────────────────────────────── */}
      <section className="py-8 md:py-12 overflow-hidden" aria-label="Photographs from the yard">
        <div className="flex w-max eq-marquee">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
              {galleryStrip.map((shot) => (
                <figure
                  key={`${copy}-${shot.src}`}
                  className="w-[220px] md:w-[300px] shrink-0 px-2 md:px-3"
                >
                  <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-[#F2EAE0]">
                    <img
                      src={shot.src}
                      alt={copy === 0 ? shot.alt : ''}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </figure>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY PEOPLE STAY ────────────────────────────────────────────── */}
      <section className="px-6 md:px-10 py-14 md:py-20">
        <div className="max-w-[1500px] mx-auto">
          <Reveal className="max-w-2xl mb-10 md:mb-14">
            <SectionLabel className="mb-6">Why people stay</SectionLabel>
            <h2 className="font-serif text-[clamp(1.9rem,4.6vw,3.2rem)] leading-[1.05] tracking-[-0.02em]">
              A small yard that takes teaching seriously.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-6">
            {promises.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <div
                  className="group h-full rounded-[1.5rem] p-7 md:p-8 border border-white/70 shadow-[0_18px_44px_-34px_rgba(30,42,34,0.4)] transition-transform duration-500 hover:-translate-y-1"
                  style={{ background: cardWashes[i % cardWashes.length] }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-6 bg-[#FFFCF7]/80 border border-white transition-transform duration-500 group-hover:-translate-y-0.5"
                    style={{ color: item.colour }}
                  >
                    {item.icon}
                  </div>
                  <h3 className="font-serif text-xl md:text-[1.4rem] leading-tight mb-2">{item.title}</h3>
                  <p className="text-[15px] text-[#4C5A50] leading-relaxed">{item.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── LESSONS PREVIEW ──────────────────────────────────────────────── */}
      <section className="px-6 md:px-10 pb-14 md:pb-20">
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <Reveal>
              <SectionLabel className="mb-6">Lessons</SectionLabel>
              <h2 className="font-serif text-[clamp(1.9rem,4.6vw,3.2rem)] leading-[1.05] tracking-[-0.02em] mb-5">
                Somewhere to start, whatever age you are.
              </h2>
              <p className="text-[#4C5A50] leading-relaxed mb-8 max-w-sm">
                Six lessons for the cost of five. No hidden extras.
              </p>
              <Link
                to="/demo/equestrian/lessons"
                className="group inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-[#1E2A22]"
              >
                All ten lesson types
                <span className="w-8 h-px bg-[#E4577A] group-hover:w-12 transition-all duration-300" />
              </Link>
            </Reveal>

            <Reveal delay={0.1} className="mt-12 hidden lg:block">
              <PhotoReveal
                src={images.leadRein}
                alt="A child being led on a pony in the arena"
                className="rounded-[2rem] aspect-[5/4]"
              />
            </Reveal>
          </div>

          <div className="lg:col-span-7 space-y-3">
            {lessons.slice(0, 6).map((lesson, i) => (
              <Reveal key={lesson.id} delay={i * 0.05}>
                <Link
                  to="/demo/equestrian/lessons"
                  className="group flex items-center gap-5 md:gap-7 rounded-[1.25rem] border border-white/70 pl-5 pr-6 md:pl-7 md:pr-8 py-5 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_22px_50px_-34px_rgba(30,42,34,0.45)]"
                  style={{ background: cardWashes[i % cardWashes.length] }}
                >
                  <span
                    aria-hidden="true"
                    className="shrink-0 w-1.5 h-10 md:h-12 rounded-full opacity-70"
                    style={{ backgroundColor: lesson.accent }}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block font-serif text-xl md:text-[1.55rem] leading-tight group-hover:text-[#E4577A] transition-colors duration-300">
                      {lesson.name}
                    </span>
                    <span className="mt-1.5 block text-[9px] uppercase tracking-[0.26em] text-[#6B7A6F]">
                      {lesson.who} &middot; {lesson.duration}
                    </span>
                  </span>
                  <span className="font-serif text-2xl md:text-[1.9rem] leading-none shrink-0">
                    {lesson.price}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE HORSES, AS A CAROUSEL ───────────────────────────────────── */}
      <section
        className="px-6 md:px-10 py-14 md:py-20"
        style={{
          background: `linear-gradient(180deg, ${palette.cream} 0%, ${pastel.sage} 34%, ${pastel.mist} 72%, ${palette.cream} 100%)`
        }}
      >
        <div className="max-w-[1500px] mx-auto">
          <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10 md:mb-12">
            <div className="max-w-xl">
              <SectionLabel className="mb-6">The horses</SectionLabel>
              <h2 className="font-serif text-[clamp(1.9rem,4.6vw,3.2rem)] leading-[1.05] tracking-[-0.02em]">
                Twenty-two of them. Eight you will meet first.
              </h2>
            </div>
            <Link
              to="/demo/equestrian/horses"
              className="group inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] shrink-0"
            >
              Meet the whole yard
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Reveal>

          <Reveal>
            <Carousel slides={horseSlides} />
          </Reveal>
        </div>
      </section>

      {/* ── THE YARD ───────────────────────────────────────────────────── */}
      <section className="px-6 md:px-10 py-14 md:py-20">
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <Reveal>
              <SectionLabel className="mb-6">The yard</SectionLabel>
              <h2 className="font-serif text-[clamp(1.9rem,4.6vw,3.2rem)] leading-[1.05] tracking-[-0.02em] mb-9">
                Three arenas, one very good view.
              </h2>
            </Reveal>

            <div className="flex flex-wrap gap-3">
              {facilities.map((item, i) => (
                <Reveal key={item.title} delay={i * 0.05}>
                  <span
                    className="inline-flex items-center gap-3 rounded-full border border-white/70 pl-4 pr-5 py-3 text-[13px] md:text-sm text-[#1E2A22]"
                    style={{ background: cardWashes[i % cardWashes.length] }}
                  >
                    <Bloom size={13} />
                    {item.title}
                  </span>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <Link
                to="/demo/equestrian/facilities"
                className="group inline-flex items-center gap-3 mt-10 text-[10px] uppercase tracking-[0.3em]"
              >
                Look round the yard
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Reveal>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 grid grid-cols-2 gap-4 md:gap-6">
            <PhotoReveal
              src={images.stables}
              alt="A horse looking out between two stable doors"
              className="rounded-[1.5rem] aspect-[3/4] col-span-1"
            />
            <div className="space-y-4 md:space-y-6">
              <PhotoReveal
                src={images.arena}
                alt="A rider schooling in the outdoor arena"
                className="rounded-[1.5rem] aspect-square"
                delay={0.08}
              />
              <PhotoReveal
                src={images.meadow}
                alt="Wildflower meadow on the edge of the downs"
                className="rounded-[1.5rem] aspect-[4/3]"
                delay={0.16}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── VOICES ─────────────────────────────────────────────────────── */}
      <section className="px-6 md:px-10 pb-14 md:pb-20">
        <div className="max-w-[1500px] mx-auto">
          <Reveal className="mb-8 md:mb-12">
            <SectionLabel className="mb-6">In their words</SectionLabel>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {testimonials.map((item, i) => (
              <Reveal key={item.name} delay={i * 0.08}>
                <figure
                  className="h-full rounded-[1.75rem] p-8 md:p-9 flex flex-col border border-white/70 shadow-[0_18px_44px_-34px_rgba(30,42,34,0.4)]"
                  style={{ background: cardWashes[(i + 1) % cardWashes.length] }}
                >
                  <Bloom size={20} className="mb-6" />
                  <blockquote className="font-serif text-[1.35rem] md:text-[1.6rem] leading-[1.3] mb-8">
                    &ldquo;{item.short}&rdquo;
                  </blockquote>
                  <figcaption className="mt-auto flex items-center gap-3">
                    <span aria-hidden="true" className="w-7 h-px shrink-0 bg-[#E4577A]" />
                    <span className="text-[10px] uppercase tracking-[0.28em] text-[#4C5A50]">
                      {item.name}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING CALL ───────────────────────────────────────────────── */}
      <section className="px-6 md:px-10 pb-16 md:pb-24">
        <div className="max-w-[1500px] mx-auto">
          <Reveal>
            <div className="relative rounded-[2rem] overflow-hidden">
              <img
                src={images.sunset}
                alt="Horses in the field at sunset"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(104deg, rgba(30,42,34,0.90) 0%, rgba(30,42,34,0.58) 46%, rgba(121,192,224,0.34) 78%, rgba(228,87,122,0.30) 100%)'
                }}
              />
              <div className="relative px-8 md:px-16 py-14 md:py-20 max-w-2xl text-[#FFFAF3]">
                <HorseMark size={56} color="#FFFAF3" className="mb-8" />
                <h2 className="font-serif text-[clamp(1.9rem,5vw,3.4rem)] leading-[1.02] tracking-[-0.02em] mb-8">
                  Come and meet the horses.
                </h2>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/demo/equestrian/book"
                    className="group inline-flex items-center gap-3 pl-8 pr-6 py-4 bg-[#FFFAF3] text-[#1E2A22] rounded-full text-[10px] uppercase tracking-[0.3em] hover:bg-[#E4577A] hover:text-[#FFFAF3] transition-colors duration-300"
                  >
                    Book a lesson
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                  <a
                    href={`tel:${academy.phoneHref}`}
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/40 text-[10px] uppercase tracking-[0.3em] hover:border-white transition-colors duration-300"
                  >
                    {academy.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <EquestrianFooter />

      <style>{`
        /* Header entrances use fill-mode animations rather than scroll triggers,
           so nothing can be left stranded at opacity 0. */
        @keyframes eq-rise {
          from { opacity: 0; transform: translate3d(0, 22px, 0); }
          to { opacity: 1; transform: none; }
        }
        .eq-rise { animation: eq-rise 0.85s cubic-bezier(0.22, 1, 0.36, 1) both; }

        /* The headline arrives a line at a time from behind its own baseline.
           The padding pair keeps descenders from being clipped by the mask. */
        .eq-line { display: block; overflow: hidden; padding-bottom: 0.14em; margin-bottom: -0.14em; }
        @keyframes eq-line-rise {
          from { transform: translate3d(0, 110%, 0); }
          to { transform: none; }
        }
        .eq-line-in {
          display: block;
          animation: eq-line-rise 1.15s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes eq-wipe {
          from { clip-path: inset(0 0 100% 0); }
          to { clip-path: inset(0 0 0% 0); }
        }
        .eq-wipe { animation: eq-wipe 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both; }

        /* A very slow drift, so the first screen is never completely static. */
        @keyframes eq-drift {
          0% { transform: scale(1.06) translate3d(0, 0, 0); }
          50% { transform: scale(1.13) translate3d(-1.4%, -1.2%, 0); }
          100% { transform: scale(1.06) translate3d(0, 0, 0); }
        }
        .eq-drift { animation: eq-drift 28s ease-in-out infinite; will-change: transform; }

        @keyframes eq-float {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -6px, 0); }
        }
        .eq-float { animation: eq-rise 0.85s cubic-bezier(0.22, 1, 0.36, 1) both, eq-float 6s ease-in-out 1.6s infinite; }

        /* The rosette lettering turns once every 40s — slow enough to read. */
        @keyframes eq-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .eq-spin { animation: eq-spin 40s linear infinite; transform-origin: 50% 50%; }

        @keyframes eq-ribbon-in {
          from { opacity: 0; transform: translate3d(0, 10px, 0); }
          to { opacity: 1; transform: none; }
        }
        .eq-ribbon { animation: eq-ribbon-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) both; }

        @keyframes eq-marquee-scroll {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }
        .eq-marquee { animation: eq-marquee-scroll 64s linear infinite; will-change: transform; }
        .eq-marquee:hover { animation-play-state: paused; }

        @media (prefers-reduced-motion: reduce) {
          .eq-rise, .eq-wipe, .eq-drift, .eq-ribbon, .eq-line-in { animation: none; }
          .eq-float { animation: none; }
          .eq-spin { animation: none; }
          .eq-marquee { animation: none; }
        }
      `}</style>
    </div>
  );
};

export default EquestrianHome;
