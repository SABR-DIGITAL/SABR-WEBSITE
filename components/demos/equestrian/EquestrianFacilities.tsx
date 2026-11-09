import React, { useEffect } from 'react';
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { ArrowUpRight, Phone } from 'lucide-react';
import EquestrianNav from './EquestrianNav';
import EquestrianFooter from './EquestrianFooter';
import { Reveal, SectionLabel, PhotoReveal } from './EquestrianUI';
import { academy, facilities, images } from './equestrianData';

const firstVisitMoments = [
  {
    num: '01',
    title: 'Arrive fifteen minutes early',
    detail: 'Turn into the gravel courtyard opposite the postbox on Woodborough Lane and pop into the tack room to say hello.'
  },
  {
    num: '02',
    title: 'Borrow a fitted hat & boots',
    detail: 'No need to buy riding kit for your first lessons — we fit a PAS 015 helmet, body protector, and smooth-soled boots for you.'
  },
  {
    num: '03',
    title: 'Meet your horse in the barn',
    detail: 'Your horse will be waiting in the American barn so you can say hello, brush them down, and check stirrup lengths before mounting.'
  },
  {
    num: '04',
    title: 'Coffee in the viewing lounge',
    detail: 'Whoever brought you can watch from a warm sofa with a fresh coffee while your coach writes up your lesson notes.'
  }
];

const EquestrianFacilities: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
  }, []);

  return (
    <div className="relative min-h-screen bg-[#FAF6EE] font-inter text-[#1E2822] selection:bg-[#2D5A43] selection:text-[#FAF6EE]">
      <EquestrianNav />

      {/* ── WARM EDITORIAL HEADER ────────────────────────────────────────── */}
      <section className="relative z-10 pt-24 sm:pt-32 md:pt-40 pb-12 sm:pb-16 md:pb-24 px-5 sm:px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto">
          <Reveal>
            <SectionLabel className="mb-4 sm:mb-5">The Yard &amp; Estate</SectionLabel>
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-end">
            <div className="lg:col-span-8">
              <Reveal delay={0.05}>
                <h1 className="font-serif text-[clamp(2.2rem,5.8vw,4.8rem)] leading-[1.04] tracking-[-0.02em]">
                  Sixteen acres of stabling.
                  <br />
                  <span className="italic text-[#2D5A43]">Four hundred of chalk turf.</span>
                </h1>
              </Reveal>
            </div>
            <div className="lg:col-span-4">
              <Reveal delay={0.12}>
                <p className="text-[15px] sm:text-[16px] text-[#5F665E] leading-[1.8] sm:leading-[1.85]">
                  Laid out at the foot of the Pewsey downs so horses move calmly from loosebox to arena or open downland without ever touching a public road.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── VISUAL CHAPTERS OF THE YARD (EVERY PHOTO MATCHES ITS WORDING) ── */}
      <section className="relative z-10 px-5 sm:px-6 md:px-12 pb-16 sm:pb-24 md:pb-32">
        <div className="max-w-[1440px] mx-auto space-y-16 sm:space-y-24 md:space-y-32">
          {facilities.map((item, i) => {
            const isEven = i % 2 === 1;
            return (
              <div
                key={item.title}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-16 items-center"
              >
                <div className={`lg:col-span-7 ${isEven ? 'lg:order-2' : ''}`}>
                  <PhotoReveal
                    src={item.photo}
                    alt={item.alt}
                    priority={i === 0}
                    className="aspect-[16/10] w-full"
                  />
                </div>

                <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : ''}`}>
                  <Reveal>
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#E8F0EB] text-[#2D5A43] text-[10px] uppercase tracking-[0.28em] font-medium mb-4 sm:mb-5">
                      {item.index} &middot; {item.subtitle}
                    </span>
                    <h2 className="font-serif text-[clamp(1.75rem,3.6vw,3rem)] leading-[1.1] tracking-[-0.015em] text-[#1E2822] mb-4 sm:mb-5">
                      {item.title}
                    </h2>
                    <p className="text-[15px] sm:text-[16px] text-[#5F665E] leading-[1.8] sm:leading-[1.85] mb-4 sm:mb-6">
                      {item.detail}
                    </p>
                    <p className="text-[13px] font-medium text-[#2D5A43]">
                      {item.note}
                    </p>
                  </Reveal>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── YOUR FIRST VISIT AT THE YARD (NO BOXES, WARM STORY SPLIT) ────── */}
      <section className="relative z-10 py-16 sm:py-24 md:py-32 px-5 sm:px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <Reveal>
              <SectionLabel className="mb-4 sm:mb-5">A Warm Welcome</SectionLabel>
              <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] leading-[1.08] tracking-[-0.02em] mb-5 sm:mb-6">
                How your first visit works.
              </h2>
              <p className="text-[15px] sm:text-[16px] text-[#5F665E] leading-[1.8] sm:leading-[1.85] mb-6 sm:mb-8">
                Coming to a new yard for the first time should feel relaxed and welcoming. Here is what happens from the moment you turn down the drive.
              </p>
              <PhotoReveal
                src={images.barn}
                alt="Horses looking out over the wooden rails inside our timber barn"
                className="aspect-[4/3] w-full mb-6 sm:mb-8"
              />
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3.5 sm:gap-4">
                <Link
                  to="/demo/equestrian/book"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#2D5A43] text-[#FAF6EE] text-[11px] uppercase tracking-[0.28em] font-medium hover:bg-[#234734] transition-colors"
                >
                  <span>Book a First Lesson</span>
                  <ArrowUpRight size={15} />
                </Link>
                <a
                  href={`tel:${academy.phoneHref}`}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-[#E8F0EB] text-[#2D5A43] text-[11px] uppercase tracking-[0.26em] font-medium hover:bg-[#dce8e0] transition-colors"
                >
                  <Phone size={14} />
                  <span>{academy.phoneDisplay}</span>
                </a>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7 space-y-8 sm:space-y-10 lg:pt-8">
            {firstVisitMoments.map((item, i) => (
              <Reveal key={item.num} delay={i * 0.08}>
                <div className="flex items-start gap-4 sm:gap-6">
                  <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#E8F0EB] text-[#2D5A43] font-serif text-sm sm:text-base flex items-center justify-center shrink-0 mt-1">
                    {item.num}
                  </span>
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-[#1E2822] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[15px] sm:text-[16px] text-[#5F665E] leading-[1.75] sm:leading-[1.8] max-w-xl">
                      {item.detail}
                    </p>
                  </div>
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

export default EquestrianFacilities;
