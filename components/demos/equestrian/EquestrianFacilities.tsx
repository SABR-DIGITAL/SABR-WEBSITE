import React, { useEffect } from 'react';
// Fix react-router-dom missing exports
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { ArrowRight, Car, Coffee, Clock, Footprints } from 'lucide-react';
import EquestrianNav from './EquestrianNav';
import EquestrianFooter from './EquestrianFooter';
import { Reveal, SectionLabel, Bloom, Wash, Carousel } from './EquestrianUI';
import { academy, facilities, images, cardWashes, pastel, palette } from './equestrianData';

const firstVisit = [
  {
    icon: <Car size={17} />,
    title: 'Arrive twenty minutes early',
    detail: 'Park in the gravel yard on your left. Horseboxes turn at the far end.'
  },
  {
    icon: <Footprints size={17} />,
    title: 'Kit fitting in the tack room',
    detail: 'Hat and boots fitted, stirrups set, and you meet your horse.'
  },
  {
    icon: <Clock size={17} />,
    title: 'Your lesson starts on the clock',
    detail: 'On time both ends. The next rider is already tacking up.'
  },
  {
    icon: <Coffee size={17} />,
    title: 'Tea in the viewing room',
    detail: 'Stay as long as you like. Your coach will come and find you.'
  }
];

// The old six-photograph mosaic is a carousel now — same pictures, one at a
// time, captioned, and moving on its own.
const gallery = [
  {
    src: images.jumpingTwo,
    alt: 'A horse and rider jumping in the grass paddock',
    title: 'The jumping paddock',
    note: 'Eighteen fences on grass, from cross-poles to 1.05m.',
    meta: 'Summer term'
  },
  {
    src: images.tackRoom,
    alt: 'Saddles stacked in the tack room',
    title: 'The tack room',
    note: 'Hats, body protectors and boots in every size, fitted by us.',
    meta: 'Kit to borrow'
  },
  {
    src: images.hacking,
    alt: 'Two riders hacking out along a chalk bridleway',
    title: 'Four hundred acres',
    note: 'Chalk downland and bridleways straight off the yard.',
    meta: 'Hacking'
  },
  {
    src: images.flatwork,
    alt: 'A rider schooling on the flat',
    title: 'The indoor school',
    note: 'Mirrors down the long side. Rain has never stopped a lesson.',
    meta: '40m × 20m'
  },
  {
    src: images.children,
    alt: 'Two children walking towards a horse in the paddock',
    title: 'Own-a-pony mornings',
    note: 'Grooming, mucking out, a lesson and a hot chocolate.',
    meta: 'School holidays'
  },
  {
    src: images.meadow,
    alt: 'Wildflower meadow at the edge of the hacking',
    title: 'The top of the drive',
    note: 'Where the downs start, and the whole vale drops away below.',
    meta: 'The view'
  }
];

const EquestrianFacilities: React.FC = () => {
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
              The yard
            </p>
            <h1
              className="eq-rise font-serif text-[clamp(2.3rem,6.4vw,4.6rem)] leading-[1] tracking-[-0.02em]"
              style={{ animationDelay: '90ms' }}
            >
              Sixteen acres,
              <br />
              <span className="italic text-[#E4577A]">four hundred beyond it.</span>
            </h1>
          </div>
          <div className="lg:col-span-5">
            <p className="eq-rise text-lg text-[#4C5A50] leading-relaxed" style={{ animationDelay: '170ms' }}>
              {academy.addressLine1}, {academy.addressLine2}. Twelve minutes from Marlborough.
            </p>
          </div>
        </div>
      </section>

      {/* ── WIDE PHOTOGRAPH ────────────────────────────────────────────── */}
      <section className="px-6 md:px-10 pb-14 md:pb-20">
        <div className="max-w-[1500px] mx-auto">
          <div className="eq-wipe rounded-[1.75rem] md:rounded-[2.5rem] overflow-hidden h-[clamp(280px,52vh,520px)] bg-[#F2EAE0]">
            <img
              src={images.arena}
              alt="A rider working in the outdoor arena at Bramble &amp; Bay"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="eq-drift w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── FACILITIES LIST ────────────────────────────────────────────── */}
      <section className="px-6 md:px-10 pb-14 md:pb-20">
        <div className="max-w-[1500px] mx-auto">
          <Reveal className="max-w-2xl mb-10 md:mb-12">
            <SectionLabel className="mb-6">What is here</SectionLabel>
            <h2 className="font-serif text-[clamp(1.9rem,4.6vw,3.2rem)] leading-[1.05] tracking-[-0.02em]">
              Everything a lesson needs, and a warm room to wait in.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {facilities.map((item, i) => (
              <Reveal key={item.title} delay={(i % 3) * 0.07}>
                <div
                  className="h-full rounded-[1.5rem] p-8 flex flex-col border border-white/70 shadow-[0_20px_46px_-36px_rgba(30,42,34,0.45)] transition-transform duration-500 hover:-translate-y-1"
                  style={{ background: cardWashes[i % cardWashes.length] }}
                >
                  <span className="font-serif text-[11px] tracking-[0.3em] text-[#6B7A6F] mb-6">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-serif text-xl md:text-[1.4rem] leading-tight mb-3">{item.title}</h3>
                  <p className="text-[15px] text-[#4C5A50] leading-relaxed">{item.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY CAROUSEL ───────────────────────────────────────────── */}
      <section
        className="px-6 md:px-10 py-14 md:py-20"
        style={{
          background: `linear-gradient(180deg, ${palette.cream} 0%, ${pastel.sage} 34%, ${pastel.sand} 72%, ${palette.cream} 100%)`
        }}
      >
        <div className="max-w-[1500px] mx-auto">
          <Reveal className="max-w-2xl mb-10 md:mb-12">
            <SectionLabel className="mb-6">Around the place</SectionLabel>
            <h2 className="font-serif text-[clamp(1.9rem,4.6vw,3.2rem)] leading-[1.05] tracking-[-0.02em]">
              A summer term, more or less.
            </h2>
          </Reveal>

          <Reveal>
            <Carousel slides={gallery} />
          </Reveal>
        </div>
      </section>

      {/* ── FIRST VISIT ────────────────────────────────────────────────── */}
      <section className="px-6 md:px-10 py-14 md:py-20">
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <Reveal>
              <SectionLabel className="mb-6">Your first visit</SectionLabel>
              <h2 className="font-serif text-[clamp(1.9rem,4.6vw,3rem)] leading-[1.05] tracking-[-0.02em] mb-6">
                What actually happens when you get here.
              </h2>
              <p className="text-[#4C5A50] leading-relaxed mb-8 max-w-md">
                Nobody is left standing in a yard wondering where to go.
              </p>
              <Link
                to="/demo/equestrian/contact"
                className="group inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em]"
              >
                Directions and parking
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="border-t border-[#EADFD1]">
              {firstVisit.map((step, i) => (
                <Reveal key={step.title} delay={i * 0.07}>
                  <div className="flex items-start gap-6 py-6 border-b border-[#EADFD1]">
                    <span className="w-11 h-11 rounded-full border border-[#EADFD1] bg-[#FFFCF7]/70 flex items-center justify-center text-[#2F7D5B] shrink-0">
                      {step.icon}
                    </span>
                    <div>
                      <h3 className="font-serif text-lg md:text-xl mb-2">{step.title}</h3>
                      <p className="text-[15px] text-[#4C5A50] leading-relaxed">{step.detail}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
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

        @keyframes eq-wipe {
          from { clip-path: inset(0 0 100% 0); }
          to { clip-path: inset(0 0 0% 0); }
        }
        .eq-wipe { animation: eq-wipe 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both; }

        @keyframes eq-drift {
          0% { transform: scale(1.05) translate3d(0, 0, 0); }
          50% { transform: scale(1.11) translate3d(-1.2%, -1%, 0); }
          100% { transform: scale(1.05) translate3d(0, 0, 0); }
        }
        .eq-drift { animation: eq-drift 28s ease-in-out infinite; will-change: transform; }

        @media (prefers-reduced-motion: reduce) {
          .eq-rise, .eq-wipe, .eq-drift { animation: none; }
        }
      `}</style>
    </div>
  );
};

export default EquestrianFacilities;
