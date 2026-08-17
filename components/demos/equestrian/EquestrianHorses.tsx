import React, { useEffect } from 'react';
// Fix react-router-dom missing exports
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { ArrowRight } from 'lucide-react';
import EquestrianNav from './EquestrianNav';
import EquestrianFooter from './EquestrianFooter';
import { Reveal, SectionLabel, PhotoReveal, Bloom, Wash } from './EquestrianUI';
import { academy, horses, coaches, images, cardWashes, pastel, palette } from './equestrianData';

const care = [
  'Turned out every day the ground allows it',
  'Shod or trimmed every five weeks by the same farrier',
  'Teeth, backs and saddles checked twice a year',
  'Four lessons a day at most, and two days off a week'
];

const EquestrianHorses: React.FC = () => {
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
              Our horses
            </p>
            <h1
              className="eq-rise font-serif text-[clamp(2.3rem,6.4vw,4.6rem)] leading-[1] tracking-[-0.02em]"
              style={{ animationDelay: '90ms' }}
            >
              The ones doing
              <br />
              <span className="italic text-[#E4577A]">the teaching.</span>
            </h1>
          </div>
          <div className="lg:col-span-5">
            <p className="eq-rise text-lg text-[#4C5A50] leading-relaxed" style={{ animationDelay: '170ms' }}>
              Eight of our twenty-two. We match the horse to the rider before you arrive, not on the
              mounting block.
            </p>
          </div>
        </div>
      </section>

      {/* ── THE HORSES ─────────────────────────────────────────────────── */}
      <section className="px-6 md:px-10 pb-14 md:pb-20">
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
          {horses.map((horse, i) => (
            <Reveal key={horse.name} delay={(i % 4) * 0.07}>
              <article
                className="group h-full flex flex-col rounded-[1.5rem] overflow-hidden border border-white/70 shadow-[0_20px_46px_-36px_rgba(30,42,34,0.45)] transition-transform duration-500 hover:-translate-y-1"
                style={{ background: cardWashes[i % cardWashes.length] }}
              >
                <PhotoReveal
                  src={horse.photo}
                  alt={`${horse.name}, a ${horse.colour.toLowerCase()} ${horse.breed}`}
                  className="h-[clamp(230px,34vh,360px)]"
                  imgClassName="transition-transform duration-[1400ms] group-hover:scale-[1.05]"
                />

                <div className="flex flex-col flex-1 p-6 md:p-7">
                  <div className="flex items-baseline justify-between gap-4 mb-4">
                    <h2 className="font-serif text-2xl leading-none">{horse.name}</h2>
                    <span className="text-[10px] uppercase tracking-[0.24em] text-[#6B7A6F]">
                      {horse.height}
                    </span>
                  </div>

                  <dl className="text-[13px] border-y border-[#EADFD1]/80 divide-y divide-[#EADFD1]/80 mb-5">
                    {[
                      ['Breed', horse.breed],
                      ['Age', horse.age],
                      ['Best for', horse.bestFor]
                    ].map(([label, value]) => (
                      <div key={label} className="flex justify-between gap-4 py-2.5">
                        <dt className="text-[#6B7A6F] uppercase tracking-[0.18em] text-[10px] pt-0.5">
                          {label}
                        </dt>
                        <dd className="text-right text-[#1E2A22]">{value}</dd>
                      </div>
                    ))}
                  </dl>

                  <p className="text-[15px] text-[#4C5A50] leading-relaxed">{horse.character}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── COACHES ────────────────────────────────────────────────────── */}
      <section
        className="px-6 md:px-10 py-14 md:py-20"
        style={{
          background: `linear-gradient(180deg, ${palette.cream} 0%, ${pastel.sand} 32%, ${pastel.blush} 70%, ${palette.cream} 100%)`
        }}
      >
        <div className="max-w-[1500px] mx-auto">
          <Reveal className="max-w-2xl mb-10 md:mb-12">
            <SectionLabel className="mb-6">The people</SectionLabel>
            <h2 className="font-serif text-[clamp(1.9rem,4.6vw,3.2rem)] leading-[1.05] tracking-[-0.02em]">
              Four of us, all of us qualified.
            </h2>
          </Reveal>

          <div className="border-t border-[#EADFD1]">
            {coaches.map((coach, i) => (
              <Reveal key={coach.name} delay={i * 0.06}>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-7 border-b border-[#EADFD1]">
                  <div className="md:col-span-4">
                    <h3 className="font-serif text-xl md:text-[1.6rem] leading-tight mb-2">{coach.name}</h3>
                    <p className="text-[10px] uppercase tracking-[0.24em] text-[#6B7A6F] leading-relaxed">
                      {coach.role}
                    </p>
                  </div>
                  <div className="md:col-span-3">
                    <p className="text-[13px] uppercase tracking-[0.18em] text-[#2F7D5B] leading-relaxed">
                      {coach.focus}
                    </p>
                  </div>
                  <div className="md:col-span-5">
                    <p className="text-[15px] md:text-base text-[#4C5A50] leading-relaxed">{coach.bio}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW THEY LIVE ──────────────────────────────────────────────── */}
      <section className="px-6 md:px-10 py-14 md:py-20">
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <Reveal>
              <SectionLabel className="mb-6">How they live</SectionLabel>
              <h2 className="font-serif text-[clamp(1.9rem,4.6vw,3rem)] leading-[1.05] tracking-[-0.02em] mb-8">
                The horses come first. It is not a slogan.
              </h2>
            </Reveal>
            <div className="divide-y divide-[#EADFD1] border-y border-[#EADFD1]">
              {care.map((item, i) => (
                <Reveal key={item} delay={i * 0.06}>
                  <div className="flex items-start gap-4 py-5">
                    <Bloom size={17} className="mt-0.5 shrink-0" />
                    <p className="text-[15px] md:text-base text-[#4C5A50] leading-relaxed">{item}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.1}>
              <p className="mt-8 text-[15px] text-[#4C5A50] leading-relaxed max-w-lg">
                {academy.accreditation}, inspected every year. Walk round the yard before you book
                anything.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 grid grid-cols-2 gap-4 md:gap-6">
            <PhotoReveal
              src={images.bond}
              alt="A rider with her arms around a horse"
              className="rounded-[1.5rem] aspect-[3/4]"
            />
            <div className="space-y-4 md:space-y-6">
              <PhotoReveal
                src={images.barn}
                alt="Horses in the barn"
                className="rounded-[1.5rem] aspect-square"
                delay={0.08}
              />
              <PhotoReveal
                src={images.blossom}
                alt="Wildflowers beside the paddock"
                className="rounded-[1.5rem] aspect-[4/3]"
                delay={0.16}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── NEXT ───────────────────────────────────────────────────────── */}
      <section className="px-6 md:px-10 pb-16 md:pb-24">
        <div className="max-w-[1500px] mx-auto">
          <Reveal>
            <div className="rounded-[2rem] bg-[#1E2A22] text-[#FFFAF3] px-8 md:px-14 py-12 md:py-16 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-xl">
                <h2 className="font-serif text-[clamp(1.8rem,4.4vw,2.8rem)] leading-[1.05] tracking-[-0.02em] mb-4">
                  Tell us about the rider and we will pick the horse.
                </h2>
                <p className="text-white/60 leading-relaxed">
                  Age, height, how much you have ridden. That is all we need.
                </p>
              </div>
              <Link
                to="/demo/equestrian/book"
                className="group inline-flex items-center gap-3 pl-8 pr-6 py-4 bg-[#FFFAF3] text-[#1E2A22] rounded-full text-[10px] uppercase tracking-[0.3em] hover:bg-[#E4577A] hover:text-[#FFFAF3] transition-colors duration-300 shrink-0"
              >
                Book a lesson
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </Reveal>
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

export default EquestrianHorses;
