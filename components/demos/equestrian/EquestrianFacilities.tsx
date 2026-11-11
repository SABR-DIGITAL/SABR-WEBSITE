import React, { useEffect, useState } from 'react';
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { ArrowUpRight, Compass, Phone, Sun } from 'lucide-react';
import EquestrianNav from './EquestrianNav';
import EquestrianFooter from './EquestrianFooter';
import { Reveal, SectionLabel, PhotoReveal } from './EquestrianUI';
import { academy, facilities, images } from './equestrianData';

const SEASONS = [
  {
    id: 'spring',
    season: 'Spring (Mar – May)',
    headline: 'Primroses along the lane & first grass jumping clinics.',
    footing: '60m waxed arena & fresh spring turf on the lower ridgeway',
    atmosphere:
      'As the chalk downs dry out, we open the six-acre showjumping paddock and take our first morning hacks through the beech spinneys above Pewsey.',
    loungeNote: 'Hot cross buns & fresh coffee on the viewing gallery table.'
  },
  {
    id: 'summer',
    season: 'Summer (Jun – Aug)',
    headline: 'Long golden-hour hacks until 8.00pm across open turf.',
    footing: 'Springy old chalk turf & dust-free watered sand school',
    atmosphere:
      'The American barn stays cool and breezy even at midday, and evening rides step straight out of the back gate for ninety-minute sunset canters.',
    loungeNote: 'Barn doors wide open to the courtyard & iced elderflower cordial.'
  },
  {
    id: 'autumn',
    season: 'Autumn (Sep – Nov)',
    headline: 'Copper beech woods & crisp morning dressage schooling.',
    footing: 'All-weather waxed fibre outdoor school & sheltered ridge tracks',
    atmosphere:
      'Our favourite time on the downs — the horses are fit from summer, the air is cool, and the views across the Pewsey Vale stretch for twenty miles.',
    loungeNote: 'Hot flask of spiced apple & freshly oiled winter tack in the barn.'
  },
  {
    id: 'winter',
    season: 'Winter (Dec – Feb)',
    headline: 'Floodlit evening flatwork & warm bran mashes at dusk.',
    footing: 'Covered indoor school & frost-resistant waxed sand arena',
    atmosphere:
      'Lessons continue comfortably in all weathers in our covered school, while the horses stay cosy in deep straw looseboxes with heated wash bays.',
    loungeNote: 'Woodburner lit in the viewing lounge & hot chocolate after every ride.'
  }
];

const firstVisitMoments = [
  {
    num: '01',
    title: 'Arrive fifteen minutes early',
    detail:
      'Turn into the gravel courtyard opposite the postbox on Woodborough Lane and pop into the tack room to say hello.'
  },
  {
    num: '02',
    title: 'Borrow a fitted hat & boots',
    detail:
      'No need to buy riding kit for your first lessons — we fit a PAS 015 helmet, body protector, and smooth-soled boots for you.'
  },
  {
    num: '03',
    title: 'Meet your horse in the barn',
    detail:
      'Your horse will be waiting in the American barn so you can say hello, brush them down, and check stirrup lengths before mounting.'
  },
  {
    num: '04',
    title: 'Coffee in the viewing lounge',
    detail:
      'Whoever brought you can watch from a warm sofa with a fresh coffee while your coach writes up your lesson notes.'
  }
];

const EquestrianFacilities: React.FC = () => {
  const [activeStop, setActiveStop] = useState<number>(0);
  const [activeSeason, setActiveSeason] = useState<string>('spring');

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
  }, []);

  const currentFacility = facilities[activeStop] || facilities[0];
  const currentSeason = SEASONS.find((s) => s.id === activeSeason) || SEASONS[0];

  return (
    <div className="relative min-h-screen bg-[#FAF6EE] font-inter text-[#1E2822] selection:bg-[#2D5A43] selection:text-[#FAF6EE]">
      <EquestrianNav />

      {/* ── WARM ESTATE HEADER +ARCHITECTURAL TALLY ──────────────────────── */}
      <section className="relative z-10 pt-24 sm:pt-32 md:pt-36 pb-10 sm:pb-14 px-4 sm:px-6 md:px-12 border-b border-[#2D5A43]/12">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <SectionLabel className="mb-3.5 sm:mb-5">The Yard &amp; Estate</SectionLabel>
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-end mb-8 sm:mb-10">
            <div className="lg:col-span-8">
              <Reveal delay={0.05}>
                <h1 className="font-serif text-[clamp(2.1rem,5.4vw,4.5rem)] leading-[1.04] tracking-[-0.02em]">
                  Sixteen acres of stabling.
                  <br />
                  <span className="italic text-[#2D5A43]">Four hundred of chalk turf.</span>
                </h1>
              </Reveal>
            </div>
            <div className="lg:col-span-4">
              <Reveal delay={0.12}>
                <p className="text-[14px] sm:text-[16px] text-[#5F665E] leading-[1.75] sm:leading-[1.85]">
                  Laid out at the foot of the Pewsey downs so horses move calmly from loosebox to arena or open downland without ever touching a public road.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Warm Country Estate Specification Strip — Zero text overflow on mobile */}
          <Reveal delay={0.16}>
            <div className="rounded-2xl sm:rounded-3xl bg-[#F3EDE0] border border-[#2D5A43]/12 p-4 sm:p-7 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                { val: '22 Stalls', label: 'American Oak Barn & Hot Wash Bays' },
                { val: '60m × 25m', label: 'Floodlit Waxed Sand & Fibre Arena' },
                { val: '6 Acres', label: 'Springy Chalk Turf Jumping Paddock' },
                { val: '400 Acres', label: 'Direct Bridleways · Zero Roadwork' }
              ].map((stat) => (
                <div key={stat.val} className="border-l-2 border-[#2D5A43]/25 pl-3 sm:pl-4 min-w-0">
                  <p className="font-serif text-xl sm:text-3xl text-[#1E2822] leading-tight mb-1">
                    {stat.val}
                  </p>
                  <p className="text-[11px] sm:text-[13px] text-[#5F665E] leading-snug">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── NON-GENERIC FEATURE 1: INTERACTIVE "WALK THE YARD" MAP EXPLORER ─ */}
      <section className="relative z-10 px-4 sm:px-6 md:px-12 py-10 sm:py-16 md:py-20">
        <div className="max-w-[1400px] mx-auto">
          <Reveal className="mb-6 sm:mb-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <p className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#2D5A43] font-medium mb-2">
                  <Compass size={14} />
                  <span>Interactive Estate Walk &middot; Five Stops Around Bramble Farm</span>
                </p>
                <h2 className="font-serif text-[clamp(1.75rem,3.6vw,2.8rem)] leading-[1.1] text-[#1E2822]">
                  Step through the yard from courtyard to ridgeway.
                </h2>
              </div>

              {/* Stop Selector Tabs */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {facilities.map((fac, idx) => {
                  const active = idx === activeStop;
                  return (
                    <button
                      key={fac.index}
                      type="button"
                      onClick={() => setActiveStop(idx)}
                      className={`px-3 sm:px-4 py-2 rounded-full text-[11px] sm:text-[12px] font-medium transition-all cursor-pointer ${
                        active
                          ? 'bg-[#2D5A43] text-[#FAF6EE] shadow-sm'
                          : 'bg-white text-[#454D46] hover:bg-[#E8F0EB] border border-[#2D5A43]/12'
                      }`}
                    >
                      {fac.index} &middot; {fac.title.split(' ').slice(0, 3).join(' ')}
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* Featured Interactive Stop Display */}
          <div className="rounded-3xl bg-white p-4 sm:p-8 md:p-10 border border-[#2D5A43]/12 shadow-[0_18px_45px_-28px_rgba(30,40,34,0.18)] grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center mb-12 sm:mb-16">
            <div className="lg:col-span-7 overflow-hidden rounded-2xl aspect-[16/10] bg-[#E8E2D5]">
              <img
                key={currentFacility.photo}
                src={currentFacility.photo}
                alt={currentFacility.alt}
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover object-center block"
              />
            </div>

            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3EDE0] text-[#6E5034] text-[10px] uppercase tracking-[0.2em] font-medium mb-3.5">
                <span>Stop {currentFacility.index} of 05</span>
                <span>&middot;</span>
                <span>{currentFacility.subtitle}</span>
              </div>

              <h3 className="font-serif text-[clamp(1.65rem,3.2vw,2.6rem)] leading-[1.1] text-[#1E2822] mb-3.5">
                {currentFacility.title}
              </h3>

              <p className="text-[14px] sm:text-[15px] text-[#5F665E] leading-[1.75] sm:leading-[1.85] mb-5">
                {currentFacility.detail}
              </p>

              <div className="rounded-2xl bg-[#FAF6EE] p-4 border border-[#2D5A43]/10 mb-5">
                <span className="block text-[9px] uppercase tracking-[0.2em] text-[#2D5A43] font-medium mb-1">
                  Yard Specifications &amp; Footing
                </span>
                <p className="text-[13px] sm:text-[14px] font-medium text-[#1E2822]">
                  {currentFacility.note}
                </p>
              </div>

              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveStop((activeStop - 1 + facilities.length) % facilities.length)}
                  className="text-[11px] uppercase tracking-[0.2em] text-[#2D5A43] font-medium hover:underline cursor-pointer"
                >
                  &larr; Previous Stop
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStop((activeStop + 1) % facilities.length)}
                  className="text-[11px] uppercase tracking-[0.2em] text-[#2D5A43] font-medium hover:underline cursor-pointer"
                >
                  Next Stop &rarr;
                </button>
              </div>
            </div>
          </div>

          {/* Complete 5-Stop Visual Overview Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {facilities.slice(0, 3).map((item, i) => (
              <Reveal
                key={item.title}
                delay={i * 0.06}
                className="rounded-3xl bg-white p-4 sm:p-5 border border-[#2D5A43]/10 flex flex-col justify-between"
              >
                <div>
                  <div className="overflow-hidden rounded-2xl aspect-[16/10] bg-[#E8E2D5] mb-4">
                    <img
                      src={item.photo}
                      alt={item.alt}
                      loading="eager"
                      decoding="async"
                      className="w-full h-full object-cover object-center block"
                    />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#2D5A43] font-medium">
                    {item.index} &middot; {item.subtitle}
                  </span>
                  <h3 className="font-serif text-xl text-[#1E2822] mt-1 mb-2">{item.title}</h3>
                  <p className="text-[13px] text-[#5F665E] leading-relaxed mb-3">{item.detail}</p>
                </div>
                <p className="text-[11px] font-medium text-[#2D5A43] pt-3 border-t border-[#2D5A43]/10">
                  {item.note}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── NON-GENERIC FEATURE 2: RIDING THROUGH THE FOUR SEASONS ──────── */}
      <section className="relative z-10 py-12 sm:py-18 md:py-22 px-4 sm:px-6 md:px-12 bg-[#F3EDE0] border-y border-[#2D5A43]/12">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-7 sm:mb-9">
            <div>
              <p className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#2D5A43] font-medium mb-2">
                <Sun size={14} />
                <span>Year-Round Country Riding</span>
              </p>
              <h2 className="font-serif text-[clamp(1.85rem,3.8vw,3.1rem)] leading-[1.08] text-[#1E2822]">
                How the yard changes with the seasons.
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {SEASONS.map((s) => {
                const active = s.id === activeSeason;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setActiveSeason(s.id)}
                    className={`px-4 py-2 rounded-full text-[11px] sm:text-[12px] font-medium transition-all cursor-pointer ${
                      active
                        ? 'bg-[#2D5A43] text-[#FAF6EE] shadow-sm'
                        : 'bg-[#FAF6EE] text-[#454D46] hover:bg-white border border-[#2D5A43]/12'
                    }`}
                  >
                    {s.season}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-3xl bg-[#FAF6EE] p-5 sm:p-8 md:p-10 border border-[#2D5A43]/12 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#2D5A43] font-medium">
                {currentSeason.season}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#1E2822] mt-1.5 mb-3">
                {currentSeason.headline}
              </h3>
              <p className="text-[14px] sm:text-[16px] text-[#5F665E] leading-[1.75] sm:leading-[1.85]">
                {currentSeason.atmosphere}
              </p>
            </div>
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              <div className="rounded-2xl bg-white p-4 border border-[#2D5A43]/10">
                <span className="block text-[9px] uppercase tracking-[0.2em] text-[#2D5A43] font-medium mb-1">
                  Going &amp; Arena Surface
                </span>
                <p className="text-[13px] sm:text-[14px] font-medium text-[#1E2822]">
                  {currentSeason.footing}
                </p>
              </div>
              <div className="rounded-2xl bg-[#E8F0EB]/70 p-4 border border-[#2D5A43]/10">
                <span className="block text-[9px] uppercase tracking-[0.2em] text-[#2D5A43] font-medium mb-1">
                  In the Viewing Gallery
                </span>
                <p className="text-[13px] sm:text-[14px] font-medium text-[#1E2822]">
                  {currentSeason.loungeNote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── YOUR FIRST VISIT AT THE YARD ─────────────────────────────────── */}
      <section className="relative z-10 py-14 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionLabel className="mb-3.5 sm:mb-5">A Warm Welcome</SectionLabel>
              <h2 className="font-serif text-[clamp(1.9rem,4vw,3.3rem)] leading-[1.08] tracking-[-0.02em] mb-4 sm:mb-5">
                How your first visit works.
              </h2>
              <p className="text-[14px] sm:text-[16px] text-[#5F665E] leading-[1.75] sm:leading-[1.85] mb-6">
                Coming to a new yard for the first time should feel relaxed and welcoming. Here is what happens from the moment you turn down the drive.
              </p>
              <PhotoReveal
                src={images.barn}
                alt="Horses looking out over the wooden rails inside our timber barn"
                className="aspect-[16/10] w-full mb-6"
              />
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
                <Link
                  to="/demo/equestrian/book"
                  className="inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-full bg-[#2D5A43] text-[#FAF6EE] text-[11px] uppercase tracking-[0.22em] font-medium hover:bg-[#234734] transition-colors"
                >
                  <span>Book a First Lesson</span>
                  <ArrowUpRight size={15} />
                </Link>
                <a
                  href={`tel:${academy.phoneHref}`}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#E8F0EB] text-[#2D5A43] text-[11px] uppercase tracking-[0.22em] font-medium hover:bg-[#dce8e0] transition-colors"
                >
                  <Phone size={14} />
                  <span>{academy.phoneDisplay}</span>
                </a>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {firstVisitMoments.map((item, i) => (
              <Reveal
                key={item.num}
                delay={i * 0.06}
                className="bg-white rounded-3xl p-5 sm:p-7 border border-[#2D5A43]/10 shadow-sm"
              >
                <span className="w-10 h-10 rounded-full bg-[#F3EDE0] text-[#2D5A43] font-serif text-sm font-medium flex items-center justify-center mb-4">
                  {item.num}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#1E2822] mb-2">
                  {item.title}
                </h3>
                <p className="text-[14px] sm:text-[15px] text-[#5F665E] leading-[1.7]">
                  {item.detail}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <EquestrianFooter />
    </div>
  );
};

export default EquestrianFacilities;
