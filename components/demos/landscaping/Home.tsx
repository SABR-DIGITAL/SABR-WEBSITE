import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as RouterDOM from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowUpRight,
  Plus,
  Minus,
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

gsap.registerPlugin(ScrollTrigger);

const Link = (RouterDOM as any).Link || (RouterDOM as any).default?.Link;
const useLocation = (RouterDOM as any).useLocation || (RouterDOM as any).default?.useLocation;

import { HERO_SLIDES } from './landscapingData';
export { HERO_SLIDES };

export const MINIMAL_HERO_VIDEO_SRC =
  '/images/projects/landscaping-minimal-hero-4k.mp4';
export const MINIMAL_HERO_VIDEO_POSTER =
  '/images/projects/landscaping-minimal-video-poster.jpg';

const PORTFOLIO_COLLECTIONS = [
  {
    index: '01',
    title: 'Family Gardens',
    location: 'Wiltshire & Surrey',
    image:
      'https://dmhdaawgg48dl.cloudfront.net/wp-content/uploads/2024/10/york-stone-patio-conservatory-hedges-classic-notting-hill-960x960.jpg',
  },
  {
    index: '02',
    title: 'Contemporary Gardens',
    location: 'Stone & Pergolas',
    image:
      'https://dmhdaawgg48dl.cloudfront.net/wp-content/uploads/2024/10/pool-patio-palm-trees-putting-green-modern-oxshott-surrey-760x760.jpg',
  },
  {
    index: '03',
    title: 'Courtyard Gardens',
    location: 'Town Sanctuaries',
    image:
      'https://dmhdaawgg48dl.cloudfront.net/wp-content/uploads/2024/11/plunge-pool-stone-patio-floating-stairs-modern-hampstead-760x760.jpg',
  },
  {
    index: '04',
    title: 'Roof Terraces',
    location: 'Elevated Living',
    image:
      'https://dmhdaawgg48dl.cloudfront.net/wp-content/uploads/2024/11/rooftop-terrace-dining-table-composite-decking-slate-planters-760x760.jpg',
  },
  {
    index: '05',
    title: 'Award-Winning Gardens',
    location: 'RHS & BALI Honours',
    image:
      'https://dmhdaawgg48dl.cloudfront.net/wp-content/uploads/2025/02/reflection-pool-york-stone-courtyard-country-garden-petworth-760x760.jpg',
  },
  {
    index: '06',
    title: 'Water & Reflection',
    location: 'Rills & Still Pools',
    image:
      'https://dmhdaawgg48dl.cloudfront.net/wp-content/uploads/2024/11/slate-wall-floating-walkway-water-feature-contemporary-kingston-760x760.jpg',
  },
];

const SHOW_GARDENS = [
  {
    year: '2022',
    title: 'Chelsea Gold Sanctuary',
    detail: 'Corten steel pavilion, riven stone path & woodland Salvia',
    image:
      'https://dmhdaawgg48dl.cloudfront.net/wp-content/uploads/2024/12/corten-steel-pavilion-stone-path-salvia-woodland-960x960.jpg',
  },
  {
    year: '2022',
    title: 'Naturalistic Crescent Pool',
    detail: 'Hand-dressed Yorkstone stepping stones, ferns & irises',
    image:
      'https://dmhdaawgg48dl.cloudfront.net/wp-content/uploads/2024/12/stone-path-crescent-pool-fern-iris-naturalistic-960x960.jpg',
  },
  {
    year: '2021',
    title: 'Silver-Gilt Woodland Walk',
    detail: 'Steam-bent cedar screen, limestone treads & white hydrangeas',
    image:
      'https://dmhdaawgg48dl.cloudfront.net/wp-content/uploads/2024/12/wavy-timber-screen-stone-step-pathway-ferns-sumac-hydrangeas-960x960.jpg',
  },
  {
    year: '2018',
    title: 'Chelsea Gold Arid Garden',
    detail: 'Quarry boulder outcrops, gravel trail & drought-resilient flora',
    image:
      'https://dmhdaawgg48dl.cloudfront.net/wp-content/uploads/2024/12/aquarium-dome-barrel-cactus-succulent-spanish-moss-pathway-960x960.jpg',
  },
];

const FAQS = [
  {
    q: 'Do you handle both the garden design and the construction in-house?',
    a: 'Yes. Every stage—from the initial site survey and 3D architectural masterplan to stone masonry, bespoke pergolas, lighting, and seasonal planting—is completed by our own permanent designers, horticulturists, and craftsmen.',
  },
  {
    q: 'Do you work with sustainable and environmentally responsible materials?',
    a: 'We source natural Yorkstone, limestone, and FSC-certified hardwoods from ethical suppliers, divert site waste away from landfill through specialist recycling partners, and design peat-free, pollinator-rich planting schemes.',
  },
  {
    q: 'When is the best time of year to begin planning a garden build?',
    a: 'Structural landscaping and groundworks proceed year-round. Many clients begin design consultations three to six months ahead of their ideal season, and larger estate builds can be phased smoothly around your schedule.',
  },
  {
    q: 'Which regions do you cover?',
    a: 'From our Wiltshire studio and London base, we design and construct private gardens across Wiltshire, the Cotswolds, Bath, Surrey, West Sussex, and Greater London.',
  },
  {
    q: 'Can you build a garden designed by an independent landscape architect?',
    a: 'Alongside our in-house design commissions, we regularly act as principal landscape contractor for established garden designers and architects, translating their drawings into RHS medal-standard builds.',
  },
  {
    q: 'How are design fees and construction budgets structured?',
    a: 'Following a complimentary initial consultation at your property, we provide a fixed-fee design proposal. Once concepts are approved, you receive a fully itemised construction schedule with transparent stage payments.',
  },
];

export const Home: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const location = useLocation ? useLocation() : { key: 'default' };
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
  }, []);

  // Start the looping 4K hero video immediately on open/reload
  useLayoutEffect(() => {
    const vid = heroVideoRef.current;
    if (!vid) return;
    vid.muted = true;
    vid.defaultMuted = true;
    vid.volume = 0;
    try {
      vid.currentTime = 0;
    } catch {
      // Ignore if metadata is still initializing; autoPlay begins at 0
    }
    const playPromise = vid.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {});
    }
  }, [location.key]);

  // Smooth, glide-like scroll animations below the fold (deferred slightly so video starts at 60fps on frame 0)
  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;

    const reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    let ctx: gsap.Context | null = null;
    const initTimer = window.setTimeout(() => {
      ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>('.lux-glide').forEach((el) => {
          gsap.fromTo(
            el,
            { y: 36, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.15,
              ease: 'power3.out',
              force3D: true,
              scrollTrigger: {
                trigger: el,
                start: 'top 88%',
                once: true,
              },
            }
          );
        });

        gsap.utils.toArray<HTMLElement>('.lux-line').forEach((line) => {
          gsap.fromTo(
            line,
            { scaleX: 0, transformOrigin: 'left center' },
            {
              scaleX: 1,
              duration: 1.25,
              ease: 'expo.out',
              force3D: true,
              scrollTrigger: {
                trigger: line,
                start: 'top 90%',
                once: true,
              },
            }
          );
        });
      }, root);
    }, 180);

    return () => {
      window.clearTimeout(initTimer);
      ctx?.revert();
    };
  }, []);

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-[#FAF9F5] text-[#1C211D] font-sans selection:bg-[#5B6450] selection:text-white overflow-x-hidden"
    >
      <Navbar />

      {/* =================================================================== */}
      {/* SECTION 1: FULL-SCREEN MINIMALIST VIDEO HERO                        */}
      {/* =================================================================== */}
      <section className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-[#F3F1EB]">
        <div
          className="absolute inset-0 z-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${MINIMAL_HERO_VIDEO_POSTER})` }}
        >
          <video
            ref={heroVideoRef}
            src={MINIMAL_HERO_VIDEO_SRC}
            poster={MINIMAL_HERO_VIDEO_POSTER}
            autoPlay
            loop
            muted
            playsInline
            disablePictureInPicture
            disableRemotePlayback
            controlsList="nodownload nofullscreen noremoteplayback"
            preload="auto"
            {...({ fetchPriority: 'high' } as any)}
            onLoadedMetadata={(e) => {
              e.currentTarget.muted = true;
              e.currentTarget.volume = 0;
            }}
            onVolumeChange={(e) => {
              if (!e.currentTarget.muted || e.currentTarget.volume !== 0) {
                e.currentTarget.muted = true;
                e.currentTarget.volume = 0;
              }
            }}
            className="w-full h-full object-cover object-center block transform-gpu pointer-events-none select-none"
          />
        </div>

        {/* Bottom-Center Architectural Micro-Typography & Vertical Hairline */}
        <div
          className="absolute inset-x-0 bottom-12 sm:bottom-7 z-20 flex flex-col items-center text-center pointer-events-none px-4"
          style={{ textShadow: '0 2px 14px rgba(0, 0, 0, 0.55)' }}
        >
          <p className="text-[9px] sm:text-[10px] md:text-[11px] font-light uppercase tracking-[0.26em] sm:tracking-[0.34em] text-white/95 leading-relaxed">
            LANDSCAPE ARCHITECTURE &nbsp;·&nbsp; CONSTRUCTION
            <br />
            WILTSHIRE &amp; LONDON
          </p>
          <span className="block w-[1px] h-4 sm:h-7 bg-[#E5D7AE]/90 my-2 sm:my-3 shadow-sm" />
          <span className="text-[8px] sm:text-[9px] font-light uppercase tracking-[0.34em] sm:tracking-[0.36em] text-white/90">
            EST 1998
          </span>
        </div>
      </section>

      {/* =================================================================== */}
      {/* SECTION 2: QUIET EDITORIAL STATEMENT                                */}
      {/* =================================================================== */}
      <section className="py-16 sm:py-28 md:py-44 px-5 sm:px-10 md:px-14 lg:px-24 bg-[#FAF9F5]">
        <div className="max-w-5xl mx-auto">
          <div className="lux-glide space-y-6 sm:space-y-10">
            <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.34em] sm:tracking-[0.38em] text-[#5B6450]">
              Oak &amp; Ash · Landscape Architecture
            </span>

            <h1 className="font-cormorant text-3xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-light text-[#1C211D] leading-[1.12] tracking-tight">
              Twenty-eight years of award-winning garden design and master construction,{' '}
              <span className="italic text-[#5B6450]">crafted under one roof.</span>
            </h1>

            <div className="lux-line h-[1px] w-full bg-[#DFDCD2]" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-10 pt-2 items-start md:items-end">
              <p className="md:col-span-7 text-[#5A5953] text-sm sm:text-base md:text-lg font-light leading-[1.8] sm:leading-[1.9]">
                From the initial consultation and spatial masterplan through to natural stone masonry, bespoke metalwork, and mature planting, our permanent in-house teams handle every stage of your garden transformation without third-party friction.
              </p>
              <div className="md:col-span-5 flex md:justify-end">
                <Link
                  to="/demo/landscaping/contact"
                  className="inline-flex items-center gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.28em] sm:tracking-[0.32em] text-[#1C211D] hover:text-[#5B6450] pb-2 border-b border-[#1C211D] hover:border-[#5B6450] transition-colors duration-300 group"
                >
                  <span>Arrange a Consultation</span>
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* SECTION 3: CURATED GARDEN PORTFOLIOS (100% SYMMETRICAL & ALIGNED)   */}
      {/* =================================================================== */}
      <section className="py-16 sm:py-28 md:py-36 px-5 sm:px-10 md:px-14 lg:px-24 bg-[#F3F1EB] border-t border-[#E4E0D7]">
        <div className="max-w-7xl mx-auto">
          <div className="lux-glide flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-20 gap-5 sm:gap-8">
            <div className="space-y-2 sm:space-y-3">
              <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.34em] sm:tracking-[0.36em] text-[#5B6450]">
                Selected Works
              </span>
              <h2 className="font-cormorant text-3xl sm:text-5xl md:text-6xl font-light text-[#1C211D] tracking-tight">
                Garden Portfolios
              </h2>
            </div>
            <Link
              to="/demo/landscaping/gallery"
              className="inline-flex items-center gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.28em] sm:tracking-[0.3em] text-[#1C211D] hover:text-[#5B6450] pb-2 border-b border-[#1C211D]/40 hover:border-[#5B6450] transition-colors w-fit"
            >
              <span>View Complete Archive</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          {/* Symmetrical 2-col (tablet) / 3-col (desktop) Grid — No Overlapping Text, Equal Heights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-10 gap-y-10 sm:gap-y-16 items-stretch">
            {PORTFOLIO_COLLECTIONS.map((item) => (
              <Link
                key={item.index}
                to="/demo/landscaping/gallery"
                className="lux-glide group flex flex-col h-full overflow-hidden"
              >
                {/* Identical 4:5 Aspect Ratio Image */}
                <div className="w-full aspect-[4/5] overflow-hidden bg-[#E5E2D9] shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                  />
                </div>

                {/* Symmetrical Fixed-Baseline Hairline Caption Block */}
                <div className="pt-4 sm:pt-5 pb-3.5 sm:pb-4 border-b border-[#D8D4CA] flex items-baseline justify-between gap-3 mt-auto min-w-0">
                  <div className="flex items-baseline gap-2.5 sm:gap-3 min-w-0">
                    <span className="font-cormorant italic text-base sm:text-lg text-[#7A7E72] shrink-0">
                      {item.index}
                    </span>
                    <h3 className="font-cormorant text-xl sm:text-2xl xl:text-[1.55rem] font-normal text-[#1C211D] group-hover:text-[#5B6450] transition-colors truncate">
                      {item.title}
                    </h3>
                  </div>
                  <span className="text-[9px] xl:text-[10px] uppercase tracking-[0.18em] xl:tracking-[0.22em] text-[#7A7972] shrink-0 text-right">
                    {item.location}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* SECTION 4: DESIGN & BUILD UNDER ONE ROOF                            */}
      {/* =================================================================== */}
      <section className="py-16 sm:py-32 md:py-44 px-5 sm:px-10 md:px-14 lg:px-24 bg-[#FAF9F5] border-t border-[#E4E0D7]">
        <div className="max-w-7xl mx-auto space-y-16 sm:space-y-32 md:space-y-44">
          {/* Split Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-14 lg:gap-24 items-center">
            <div className="lux-glide lg:col-span-5 space-y-5 sm:space-y-8">
              <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.34em] sm:tracking-[0.36em] text-[#5B6450]">
                01 &nbsp;/&nbsp; Turnkey Practice
              </span>
              <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-light text-[#1C211D] leading-[1.15]">
                A Full Garden Design &amp; Build Service.
              </h2>
              <div className="lux-line h-[1px] w-16 bg-[#5B6450]" />
              <p className="text-[#5A5953] text-sm sm:text-base font-light leading-[1.8] sm:leading-[1.9]">
                Coordinating separate designers and contractors often fragments a vision. By uniting landscape architecture and construction within a single studio, we carry your garden from initial concept drawings through to stone paving, bespoke joinery, planting, and ambient lighting with complete accountability.
              </p>
              <div className="pt-1 sm:pt-2">
                <Link
                  to="/demo/landscaping/services"
                  className="inline-flex items-center gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.28em] sm:tracking-[0.3em] text-[#1C211D] hover:text-[#5B6450] pb-2 border-b border-[#1C211D] hover:border-[#5B6450] transition-colors"
                >
                  <span>Explore Design &amp; Build</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>

            <div className="lux-glide lg:col-span-7">
              <div className="overflow-hidden aspect-[16/11] bg-[#E5E2D9]">
                <img
                  src="https://dmhdaawgg48dl.cloudfront.net/wp-content/uploads/2024/11/metal-dining-set-boxwood-topiary-cottage-esher-surrey-960x960.jpg"
                  alt="Clipped boxwood topiary and Yorkstone dining terrace"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.26em] text-[#7A7972] mt-3 sm:mt-4">
                Clipped Boxwood Topiary &amp; Hand-Laid Yorkstone Terrace · Surrey
              </p>
            </div>
          </div>

          {/* Split Row 2 (Reversed on Desktop) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-14 lg:gap-24 items-center">
            <div className="lux-glide lg:col-span-7 order-2 lg:order-1">
              <div className="overflow-hidden aspect-[16/11] bg-[#E5E2D9]">
                <img
                  src="https://dmhdaawgg48dl.cloudfront.net/wp-content/uploads/2024/12/curved-stone-pathway-iris-fern-modern-woodland-960x960.jpg"
                  alt="Curved woodland stone pathway and shade planting"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.26em] text-[#7A7972] mt-3 sm:mt-4">
                Natural Stone Woodland Path, Ferns &amp; Perennial Borders · RHS Medal Team
              </p>
            </div>

            <div className="lux-glide lg:col-span-5 space-y-5 sm:space-y-8 order-1 lg:order-2">
              <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.34em] sm:tracking-[0.36em] text-[#5B6450]">
                02 &nbsp;/&nbsp; Technical Mastery
              </span>
              <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-light text-[#1C211D] leading-[1.15]">
                Crafting Award-Winning Gardens Since 1998.
              </h2>
              <div className="lux-line h-[1px] w-16 bg-[#5B6450]" />
              <p className="text-[#5A5953] text-sm sm:text-base font-light leading-[1.8] sm:leading-[1.9]">
                Our reputation across the RHS Chelsea Flower Show, BALI, and the Society of Garden Designers rests on the calibre of our people. Every stonemason, horticulturist, and site foreman is permanently employed by our practice, ensuring quiet precision in every mitred joint, drainage gradient, and botanical border.
              </p>
              <div className="pt-1 sm:pt-2">
                <Link
                  to="/demo/landscaping/about"
                  className="inline-flex items-center gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.28em] sm:tracking-[0.3em] text-[#1C211D] hover:text-[#5B6450] pb-2 border-b border-[#1C211D] hover:border-[#5B6450] transition-colors"
                >
                  <span>About Our Practice</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* SECTION 5: RHS CHELSEA SHOW GARDENS                                 */}
      {/* =================================================================== */}
      <section className="py-16 sm:py-32 md:py-40 px-5 sm:px-10 md:px-14 lg:px-24 bg-[#1C211D] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="lux-glide flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-20 gap-5 sm:gap-8 pb-6 sm:pb-10 border-b border-white/15">
            <div className="space-y-2 sm:space-y-3">
              <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.32em] sm:tracking-[0.36em] text-[#A5AE98]">
                Royal Horticultural Society &amp; National Honours
              </span>
              <h2 className="font-cormorant text-3xl sm:text-5xl md:text-6xl font-light text-white tracking-tight">
                Award-Winning Show Gardens
              </h2>
            </div>
            <p className="text-[#A8A69E] text-xs sm:text-sm font-light max-w-md leading-relaxed">
              Multiple Gold and Silver-Gilt medals at the RHS Chelsea Flower Show and BALI National Landscape Awards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
            {SHOW_GARDENS.map((garden) => (
              <Link
                key={garden.title}
                to="/demo/landscaping/gallery"
                className="lux-glide group flex flex-col h-full"
              >
                <div className="overflow-hidden aspect-square bg-[#272D28] mb-4 sm:mb-5">
                  <img
                    src={garden.image}
                    alt={garden.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                  />
                </div>
                <div className="space-y-1.5 mt-auto">
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.26em] sm:tracking-[0.28em] text-[#A5AE98] block">
                    RHS Chelsea · {garden.year}
                  </span>
                  <h3 className="font-cormorant text-xl sm:text-2xl font-normal text-white group-hover:text-[#C8B88A] transition-colors">
                    {garden.title}
                  </h3>
                  <p className="text-xs font-light text-[#9E9D95] leading-relaxed">
                    {garden.detail}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Unboxed Text Accreditation Strip */}
          <div className="lux-glide mt-12 sm:mt-24 pt-6 sm:pt-12 border-t border-white/15 grid grid-cols-2 lg:flex lg:flex-wrap items-center justify-between gap-4 sm:gap-8 text-[9px] sm:text-[10px] uppercase tracking-[0.22em] sm:tracking-[0.3em] text-[#9E9D95]">
            <span>RHS Chelsea Gold Medalists</span>
            <span className="hidden lg:inline text-white/20">·</span>
            <span>BALI Principal Award Winners</span>
            <span className="hidden lg:inline text-white/20">·</span>
            <span>Society of Garden Designers</span>
            <span className="hidden lg:inline text-white/20">·</span>
            <span>Professional Landscapers</span>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* SECTION 6: STUDIO & PRIVATE COMMISSIONS                             */}
      {/* =================================================================== */}
      <section className="py-16 sm:py-32 md:py-44 px-5 sm:px-10 md:px-14 lg:px-24 bg-[#F3F1EB]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-16 lg:gap-24 items-center">
          <div className="lux-glide lg:col-span-6 space-y-6 sm:space-y-10">
            <div className="space-y-2.5 sm:space-y-4">
              <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.34em] sm:tracking-[0.36em] text-[#5B6450]">
                Private Commissions
              </span>
              <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-light text-[#1C211D] leading-[1.12]">
                We Handle Every Detail From First Sketch to Maturity.
              </h2>
            </div>

            <p className="text-[#5A5953] text-sm sm:text-base font-light leading-[1.8] sm:leading-[1.9]">
              Whether transforming a country estate in Wiltshire, a family lawn in Surrey, or a secluded courtyard in Fulham, our studio provides a calm, transparent experience with a single dedicated project director throughout.
            </p>

            {/* Unboxed Hairline Studio Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 pt-5 sm:pt-8 border-t border-[#D8D4CA]">
              <div className="space-y-1.5 sm:space-y-2">
                <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.26em] sm:tracking-[0.28em] text-[#7A7972]">
                  Direct Enquiries
                </span>
                <a
                  href="tel:01672552140"
                  className="block font-cormorant text-2xl text-[#1C211D] hover:text-[#5B6450] transition-colors tabular-nums"
                >
                  01672 552 140
                </a>
                <a
                  href="mailto:enquiries@oakandashgardens.co.uk"
                  className="block text-xs font-light text-[#5A5953] hover:text-[#1C211D] transition-colors break-all"
                >
                  enquiries@oakandashgardens.co.uk
                </a>
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.26em] sm:tracking-[0.28em] text-[#7A7972]">
                  Design Studio &amp; Stone Yard
                </span>
                <p className="font-cormorant text-2xl text-[#1C211D]">
                  The Old Stone Mill
                </p>
                <p className="text-xs font-light text-[#5A5953]">
                  High Street, Marlborough, SN8 1AA
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/demo/landscaping/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 border border-[#1C211D] text-[#1C211D] hover:bg-[#1C211D] hover:text-white text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.32em] transition-all duration-500"
              >
                <span>Book a Private Consultation</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>

          <div className="lux-glide lg:col-span-6">
            <div className="overflow-hidden aspect-[4/5] bg-[#E5E2D9]">
              <img
                src="https://dmhdaawgg48dl.cloudfront.net/wp-content/uploads/2025/02/reflection-pool-york-stone-courtyard-country-garden-petworth-760x760.jpg"
                alt="Yorkstone courtyard and reflection pool"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* SECTION 7: FREQUENTLY ASKED QUESTIONS                               */}
      {/* =================================================================== */}
      <section className="py-16 sm:py-32 md:py-44 px-5 sm:px-10 md:px-14 lg:px-24 bg-[#FAF9F5] border-t border-[#E4E0D7]">
        <div className="max-w-4xl mx-auto">
          <div className="lux-glide mb-12 sm:mb-16 space-y-2.5 sm:space-y-3">
            <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.34em] sm:tracking-[0.36em] text-[#5B6450]">
              Client Guidance
            </span>
            <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-light text-[#1C211D] tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="lux-glide border-t border-[#D8D4CA]">
            {FAQS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={item.q} className="border-b border-[#D8D4CA]">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full py-6 sm:py-7 text-left flex items-center justify-between gap-6 sm:gap-8 group cursor-pointer"
                  >
                    <h3 className="font-cormorant text-xl sm:text-2xl md:text-[1.65rem] font-normal text-[#1C211D] group-hover:text-[#5B6450] transition-colors leading-snug">
                      {item.q}
                    </h3>
                    <span className="text-[#5B6450] shrink-0 transition-transform duration-300">
                      {isOpen ? <Minus size={18} strokeWidth={1.2} /> : <Plus size={18} strokeWidth={1.2} />}
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-out ${
                      isOpen ? 'max-h-72 pb-6 sm:pb-8 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-[#5A5953] text-sm sm:text-base font-light leading-[1.85] sm:leading-[1.9] max-w-3xl">
                      {item.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;