import React from 'react';
import * as RouterDOM from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Page, PAGE_PATHS } from '../App';
import { warmDemoChunk, type DemoId } from './demos/demoChunks';
import { HERO_SLIDES } from './demos/landscaping/landscapingData';
import { images as physioImages } from './demos/physio/physioData';

const { Link } = RouterDOM as any;

interface OurWorkCarouselProps {
  navigateTo?: (page: Page) => void;
}

interface WorkCarouselItem {
  key: string;
  demoId: DemoId;
  label: string;
  alt: string;
  path: string;
  renderHeroMedia: () => React.ReactNode;
}

const LUXURY_EQUESTRIAN_HERO =
  '/images/projects/equestrian-luxury-frame.jpg';
const VIBRANT_EQUESTRIAN_HERO =
  '/assets/aistudio/Gemini_Generated_Image_sma90vsma90vsma9_300587b3.jpg';
const LUXURY_LANDSCAPING_HERO =
  HERO_SLIDES[0]?.image || '/images/projects/landscaping-preview.webp';

/**
 * Ordered so that:
 * - Equestrian V1 (01 Luxury) comes before Equestrian V2 (02 Vibrant), matching the project page order.
 * - The two Equestrian demos are separated both within the list and across the loop wrap-around.
 */
const CAROUSEL_ITEMS: WorkCarouselItem[] = [
  {
    key: 'equestrian-luxury',
    demoId: 'equestrian-luxury',
    label: 'Equestrian V1',
    alt: 'Bramble & Bay Luxury Equestrian hero frame',
    path: '/demo/equestrian-luxury',
    renderHeroMedia: () => (
      <img
        src={LUXURY_EQUESTRIAN_HERO}
        alt="Bramble & Bay Luxury Equestrian hero"
        loading="eager"
        decoding="async"
        className="w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-[1.03]"
      />
    )
  },
  {
    key: 'landscaping-luxury',
    demoId: 'landscaping-luxury',
    label: 'Landscaping',
    alt: 'Oak & Ash Luxury Landscaping hero photograph',
    path: '/demo/landscaping-luxury',
    renderHeroMedia: () => (
      <img
        src={LUXURY_LANDSCAPING_HERO}
        alt="Oak & Ash Luxury Landscaping hero"
        loading="eager"
        decoding="async"
        className="w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-[1.03]"
      />
    )
  },
  {
    key: 'physio',
    demoId: 'physio',
    label: 'Physiotherapy',
    alt: 'Pulteney Physiotherapy hero photograph',
    path: '/demo/physio',
    renderHeroMedia: () => (
      <img
        src={physioImages.hero}
        alt="Pulteney Physiotherapy hero"
        loading="eager"
        decoding="async"
        className="w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-[1.03]"
      />
    )
  },
  {
    key: 'equestrian-vibrant',
    demoId: 'equestrian-vibrant',
    label: 'Equestrian V2',
    alt: 'Bramble & Bay Vibrant Equestrian hero photograph',
    path: '/demo/equestrian-vibrant',
    renderHeroMedia: () => (
      <img
        src={VIBRANT_EQUESTRIAN_HERO}
        alt="Bramble & Bay Vibrant Equestrian hero"
        loading="eager"
        decoding="async"
        className="w-full h-full object-cover object-[center_45%] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-[1.03]"
      />
    )
  },
  {
    key: 'cafe',
    demoId: 'cafe',
    label: 'Cafe',
    alt: 'The Hearth Cafe hero photograph',
    path: '/demo/cafe',
    renderHeroMedia: () => (
      <img
        src="/images/projects/cafe-hero.webp"
        alt="The Hearth Cafe hero"
        loading="eager"
        decoding="async"
        className="w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-[1.03]"
      />
    )
  }
];

const OurWorkCarousel: React.FC<OurWorkCarouselProps> = ({ navigateTo }) => {
  const loopItems = [...CAROUSEL_ITEMS, ...CAROUSEL_ITEMS];

  return (
    <section
      aria-label="Our Work Demo Carousel"
      className="relative py-12 sm:py-16 md:py-20 bg-[#fdfbf7] border-t border-stone-200/60 overflow-hidden"
    >
      {/* Minimalist Header Row with "OUR WORK" (classic shimmer green on WORK) and "VIEW ALL DEMOS" */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-16 mb-7 sm:mb-10 flex items-center justify-between gap-4">
        <h2 className="font-syne text-2xl sm:text-4xl md:text-5xl font-black text-slate-950 uppercase tracking-tighter leading-none">
          OUR <span className="text-shimmer-blue italic pr-2">WORK</span>
        </h2>

        <Link
          to={PAGE_PATHS.work}
          onClick={() => navigateTo?.('work')}
          className="group inline-flex items-center gap-2.5 px-4 sm:px-5 py-2.5 bg-emerald-600 hover:bg-slate-950 text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.24em] transition-colors duration-200 shrink-0"
        >
          <span>VIEW ALL DEMOS</span>
          <ArrowUpRight
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </div>

      {/* Minimalist Continuous Hero Photo Carousel */}
      <div className="relative w-full overflow-hidden">
        <div className="sabr-work-marquee flex items-start gap-4 sm:gap-6 w-max px-5 sm:px-8">
          {loopItems.map((item, idx) => (
            <Link
              key={`${item.key}-${idx}`}
              to={item.path}
              aria-label={`${item.label} — ${item.alt}`}
              onMouseEnter={() => warmDemoChunk(item.demoId)}
              onTouchStart={() => warmDemoChunk(item.demoId)}
              onClick={() => {
                if (item.key === 'landscaping-luxury' && typeof window !== 'undefined') {
                  (window as any).__oakAshLuxuryInternalNav = false;
                }
              }}
              className="group/card w-[270px] sm:w-[360px] md:w-[410px] shrink-0 flex flex-col items-start focus:outline-none"
            >
              {/* Pure Hero Image / First Video Frame Only */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-stone-900 border border-stone-200/80">
                {item.renderHeroMedia()}
              </div>

              {/* Minimalistic Green 'Open Demo' Button + Minimal Demo Name Next To It */}
              <div className="pt-3 w-full flex items-center gap-3">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-600 group-hover/card:bg-slate-950 text-white text-[9.5px] sm:text-[10px] font-bold uppercase tracking-[0.22em] transition-colors duration-200 shrink-0">
                  <span>Open Demo</span>
                  <ArrowUpRight
                    size={12}
                    className="transition-transform duration-300 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5"
                  />
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 truncate">
                  {item.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes sabrWorkMarquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .sabr-work-marquee {
          animation: sabrWorkMarquee 22s linear infinite;
          will-change: transform;
        }
        @media (max-width: 640px) {
          .sabr-work-marquee {
            animation-duration: 13s;
          }
        }
        .sabr-work-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default OurWorkCarousel;
