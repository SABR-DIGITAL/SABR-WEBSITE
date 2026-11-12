import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import * as RouterDOM from 'react-router-dom';
import { motion as framerMotion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Calendar, X } from 'lucide-react';
import LuxuryCountUp from '../landscaping-luxury/LuxuryCountUp';
import {
  academy,
  facilities,
  horses,
  images,
  lessons,
  openingHours,
  type Horse,
  type Lesson
} from '../equestrian/equestrianData';

const { Link, useLocation } = RouterDOM as any;
const motion = framerMotion as any;

// New 4K grain-free hero image supplied by the user
export const VIBRANT_HERO_IMAGE = '/assets/aistudio/Gemini_Generated_Image_sma90vsma90vsma9_300587b3.jpg';

// Preload and decode the 4K hero image & menu column photographs immediately on module load
if (typeof window !== 'undefined') {
  [
    VIBRANT_HERO_IMAGE,
    images.arena,
    images.jumping,
    images.meadow,
    images.stables,
    images.hacking
  ].forEach((src, index) => {
    const img = new Image();
    img.decoding = index === 0 ? 'sync' : 'async';
    if (index < 4) {
      (img as any).fetchPriority = 'high';
    }
    img.src = src;
    img.decode?.().catch(() => {});
  });
}

// 5-Column Vertical Menu Chapters (Matching Screenshot 2 layout, with fitted full-horse / estate photos)
const MENU_CHAPTERS = [
  {
    num: '01',
    subtitle: 'THE SANCTUARY',
    title: 'ESTATE OVERVIEW',
    path: '/demo/equestrian-vibrant',
    tagline: 'Four hundred acres of Wiltshire chalk turf, showjumping paddocks, and classical instruction.',
    image: images.arena,
    objectPos: 'center center'
  },
  {
    num: '02',
    subtitle: 'FOUR DISCIPLINES',
    title: 'LESSONS & CLINICS',
    path: '/demo/equestrian-vibrant/lessons',
    tagline: 'Affiliated showjumping grids, mirrored dressage sessions, and private one-to-one seat tuition.',
    image: images.jumping,
    objectPos: 'center center'
  },
  {
    num: '03',
    subtitle: 'SELECTED EQUINES',
    title: 'SCHOOLMASTERS',
    path: '/demo/equestrian-vibrant/horses',
    tagline: 'Twenty-two home-schooled horses and ponies matched carefully to every rider’s seat and stage.',
    image: images.meadow,
    objectPos: 'center center'
  },
  {
    num: '04',
    subtitle: 'ESTABLISHED 1998',
    title: 'ARENAS & YARD',
    path: '/demo/equestrian-vibrant/facilities',
    tagline: 'Our 60m waxed fibre school, six-acre grass jumping ring, and twenty-two stall American barn.',
    image: images.stables,
    objectPos: 'center center'
  },
  {
    num: '05',
    subtitle: 'PRIVATE DESK',
    title: 'COMMISSIONS & RIDES',
    path: '/demo/equestrian-vibrant/contact',
    tagline: 'Arrange a private riding assessment, clinic slot, or escorted chalk downland hack in Wiltshire.',
    image: images.hacking,
    objectPos: 'center center'
  }
];

/**
 * Pure Vector Equestrian Brand Logos — No boxes, no descriptions, real vector emblems + logotypes
 */
const EQUESTRIAN_BRAND_LOGOS: React.FC[] = [
  // 1. LeMieux — Signature Horse Emblem + Editorial Serif Wordmark
  () => (
    <svg viewBox="0 0 210 52" className="h-9 sm:h-11 w-auto fill-current" aria-label="LeMieux">
      <path
        d="M26 11c5-4 11-4 14 0 2 3 1 8-2 11l6 14h-4l-5-11c-4 2-9 2-13 0l-4 11h-4l5-14c-3-3-4-8 0-11 2-2 5-1 7 0z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="29" cy="17" r="1.8" />
      <text x="54" y="34" fontFamily="Cormorant Garamond, Georgia, serif" fontSize="30" fontStyle="italic" fontWeight="600" letterSpacing="1">
        LeMieux
      </text>
    </svg>
  ),
  // 2. ARIAT — Three-Horseshoe Shield Crest + Bold Geometric Wordmark
  () => (
    <svg viewBox="0 0 195 52" className="h-9 sm:h-11 w-auto fill-current" aria-label="Ariat">
      <g fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="24" cy="26" r="15" />
        <path d="M19 20a5 5 0 0 1 10 0M17 29a5 5 0 0 1 7-4M24 25a5 5 0 0 1 7 4" />
      </g>
      <text x="50" y="34" fontFamily="Cinzel, serif" fontSize="25" fontWeight="700" letterSpacing="6">
        ARIAT
      </text>
    </svg>
  ),
  // 3. DEVOUCOUX — French Saddlery Stirrup Crest + Wordmark
  () => (
    <svg viewBox="0 0 250 52" className="h-9 sm:h-11 w-auto fill-current" aria-label="Devoucoux Biarritz">
      <path
        d="M24 10c7 0 12 6 12 14v12H12V24c0-8 5-14 12-14zm-7 22h14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
      />
      <text x="48" y="32" fontFamily="Cinzel, serif" fontSize="21" fontWeight="600" letterSpacing="4.5">
        DEVOUCOUX
      </text>
    </svg>
  ),
  // 4. CHARLES OWEN — Royal Crown Crest + Heritage Wordmark
  () => (
    <svg viewBox="0 0 265 52" className="h-9 sm:h-11 w-auto fill-current" aria-label="Charles Owen">
      <path
        d="M12 33l3-14 7 6 6-9 6 9 7-6 3 14H12zm2 4h30"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <text x="54" y="32" fontFamily="Cinzel, serif" fontSize="20" fontWeight="600" letterSpacing="3.5">
        CHARLES OWEN
      </text>
    </svg>
  ),
  // 5. PIKEUR — Twin Snaffle Ring Mark + Wordmark
  () => (
    <svg viewBox="0 0 195 52" className="h-9 sm:h-11 w-auto fill-current" aria-label="Pikeur">
      <g fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="19" cy="26" r="8" />
        <circle cx="33" cy="26" r="8" />
      </g>
      <text x="52" y="34" fontFamily="Cinzel, serif" fontSize="23" fontWeight="700" letterSpacing="5">
        PIKEUR
      </text>
    </svg>
  ),
  // 6. HOLLAND COOPER — HC Monogram Crest + Wordmark
  () => (
    <svg viewBox="0 0 285 52" className="h-9 sm:h-11 w-auto fill-current" aria-label="Holland Cooper">
      <rect x="10" y="12" width="28" height="28" rx="14" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <text x="17" y="31" fontFamily="Cinzel, serif" fontSize="13" fontWeight="700">
        HC
      </text>
      <text x="48" y="32" fontFamily="Cinzel, serif" fontSize="19" fontWeight="600" letterSpacing="3.5">
        HOLLAND COOPER
      </text>
    </svg>
  ),
  // 7. FAIRFAX — Master Saddlers Arch Emblem + Wordmark
  () => (
    <svg viewBox="0 0 205 52" className="h-9 sm:h-11 w-auto fill-current" aria-label="Fairfax Saddles">
      <path
        d="M14 36c0-13 8-22 14-22s14 9 14 22M19 30h18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
      />
      <text x="52" y="33" fontFamily="Cinzel, serif" fontSize="22" fontWeight="700" letterSpacing="4.5">
        FAIRFAX
      </text>
    </svg>
  ),
  // 8. BAILEYS — Wheat Sheaf Emblem + Wordmark
  () => (
    <svg viewBox="0 0 200 52" className="h-9 sm:h-11 w-auto fill-current" aria-label="Baileys">
      <path
        d="M24 12v28M17 18c4 2 7 5 7 9M31 18c-4 2-7 5-7 9M17 27c4 2 7 5 7 9M31 27c-4 2-7 5-7 9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
      />
      <text x="46" y="33" fontFamily="Cormorant Garamond, Georgia, serif" fontSize="30" fontWeight="700" letterSpacing="2">
        BAILEYS
      </text>
    </svg>
  )
];

/**
 * Unboxed Vector Logo Marquee (Pure logos, zero cards, zero text captions)
 */
const BrandLogoMarquee: React.FC = () => {
  const doubled = [...EQUESTRIAN_BRAND_LOGOS, ...EQUESTRIAN_BRAND_LOGOS];

  return (
    <section
      aria-label="Official Equestrian Brand Partners"
      className="relative bg-[#FAF7F0] py-9 sm:py-12 border-b border-[#0D82DF]/15 overflow-hidden select-none"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#FAF7F0] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#FAF7F0] to-transparent z-10" />

      <div className="bb-logo-marquee flex items-center gap-14 sm:gap-24 w-max px-8">
        {doubled.map((LogoComponent, idx) => (
          <div
            key={idx}
            className="text-[#11161C]/70 hover:text-[#0D82DF] transition-colors duration-300 shrink-0 flex items-center justify-center"
          >
            <LogoComponent />
          </div>
        ))}
      </div>
    </section>
  );
};

/**
 * 5-Column Vertical Architectural Hamburger Menu Drawer (Exact layout of Screenshot 2,
 * with bright, crisp, fitted full-height photography in each of the 5 columns)
 */
const VibrantMenuDrawer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [hoveredCol, setHoveredCol] = useState<number>(1);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: '-3%' }}
          animate={{ opacity: 1, y: '0%' }}
          exit={{ opacity: 0, y: '-3%' }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[220] bg-[#0E131A] text-white flex flex-col overflow-y-auto lg:overflow-hidden"
        >
          {/* 1. TOP BAR (Matching Screenshot 2: bordered CLOSE on left, Brand in center, Consultation CTA on right) */}
          <div className="shrink-0 flex items-center justify-between px-4 sm:px-8 md:px-12 py-3.5 sm:py-5 border-b border-white/15 bg-[#0C1017]">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-1.5 sm:py-2 border border-white/30 hover:border-white text-[10px] sm:text-xs font-mono uppercase tracking-[0.24em] text-white transition-colors group cursor-pointer"
            >
              <X
                size={14}
                className="transition-transform group-hover:rotate-90 duration-300 text-[#60B5FF]"
              />
              <span>CLOSE</span>
            </button>

            <Link
              to="/demo/equestrian-vibrant"
              onClick={onClose}
              className="text-center group"
            >
              <span className="font-cinzel text-sm sm:text-xl md:text-2xl tracking-[0.22em] sm:tracking-[0.32em] font-bold block text-white group-hover:text-[#60B5FF] transition-colors whitespace-nowrap">
                BRAMBLE &amp; BAY
              </span>
            </Link>

            <Link
              to="/demo/equestrian-vibrant/contact"
              onClick={onClose}
              className="inline-flex items-center gap-2 px-3.5 sm:px-6 py-2 sm:py-2.5 bg-[#0D82DF] hover:bg-white hover:text-[#11161C] text-white font-bold text-[9.5px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.22em] transition-colors whitespace-nowrap"
            >
              <Calendar size={12} />
              <span className="hidden sm:inline">PRIVATE CONSULTATION</span>
              <span className="sm:hidden">BOOK</span>
            </Link>
          </div>

          {/* 2. 5-COLUMN VERTICAL PANELS WITH FITTED FULL-HEIGHT PHOTOS */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-white/15 min-h-0">
            {MENU_CHAPTERS.map((chapter, idx) => {
              const isHovered = hoveredCol === idx;

              return (
                <Link
                  key={chapter.num}
                  to={chapter.path}
                  onClick={onClose}
                  onMouseEnter={() => setHoveredCol(idx)}
                  className="group relative flex flex-col justify-end p-5 sm:p-7 lg:p-9 min-h-[145px] sm:min-h-[180px] lg:h-full overflow-hidden bg-[#0E131A]"
                >
                  {/* Fitted Full-Column Photograph */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <img
                      src={chapter.image}
                      alt={chapter.title}
                      loading="eager"
                      decoding="async"
                      style={{ objectPosition: chapter.objectPos }}
                      className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                        isHovered
                          ? 'opacity-95 scale-[1.03]'
                          : 'opacity-75 scale-100'
                      }`}
                    />
                    {/* Subtle bottom legibility scrim so the photo stays vivid and clear */}
                    <div
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        isHovered
                          ? 'bg-gradient-to-t from-black/80 via-black/25 to-transparent'
                          : 'bg-gradient-to-t from-black/85 via-black/40 to-black/15'
                      }`}
                    />
                  </div>

                  {/* Bottom Editorial Title, Hairline & Tagline */}
                  <div className="relative z-10 space-y-2.5 sm:space-y-3.5">
                    <div>
                      <span className="block text-[9px] font-mono uppercase tracking-[0.32em] text-[#8CCBFF] mb-1.5 drop-shadow-xs">
                        {chapter.subtitle}
                      </span>
                      <h3 className="font-cinzel text-lg sm:text-2xl xl:text-[1.7rem] font-bold uppercase text-white leading-[1.12] drop-shadow-sm">
                        {chapter.title}
                      </h3>
                    </div>

                    <div
                      className={`h-[1px] bg-white/85 transition-all duration-500 ${
                        isHovered ? 'w-full' : 'w-12 opacity-60'
                      }`}
                    />

                    <p className="hidden sm:line-clamp-2 lg:line-clamp-3 text-xs text-white/85 font-light leading-relaxed drop-shadow-xs">
                      {chapter.tagline}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/**
 * Top Hamburger Menu Navbar
 * Positioned compactly at the very top edge (`top-0 py-3 sm:py-3.5`) so that on the hero
 * it sits high in the open blue sky, well away from "FIND YOUR STRIDE".
 */
const VibrantNavbar: React.FC<{ isHomeHero?: boolean }> = ({ isHomeHero = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 1024) return;
      const next = window.scrollY > 36;
      setIsScrolled((prev) => (prev !== next ? next : prev));
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const solidBar = !isHomeHero || isScrolled;

  const navContent = (
    <>
      <header
        style={{ transform: 'translate3d(0, 0, 0)', WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' }}
        className={`fixed top-0 left-0 w-full z-[100] py-3 sm:py-3.5 lg:transition-colors lg:duration-300 ${
          solidBar
            ? 'bg-white border-b border-[#11161C]/10 text-[#11161C] shadow-[0_2px_16px_rgba(17,22,28,0.04)]'
            : 'bg-white lg:bg-transparent border-b border-[#11161C]/10 lg:border-transparent text-[#11161C] lg:text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3.5 sm:px-8 md:px-12 flex items-center justify-between sm:grid sm:grid-cols-3 gap-2 select-none">
          {/* LEFT: HAMBURGER MENU BUTTON */}
          <div className="flex items-center justify-start shrink-0">
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
              className={`flex items-center gap-1.5 sm:gap-3 text-xs font-semibold uppercase lg:transition-colors group cursor-pointer py-1 ${
                solidBar
                  ? 'text-[#11161C] hover:text-[#0D82DF]'
                  : 'text-[#11161C] lg:text-white hover:text-[#0D82DF] lg:hover:text-white/80'
              }`}
            >
              <div className="flex flex-col gap-1 sm:gap-1.5 w-4 sm:w-5">
                <span
                  className={`h-[1.5px] w-full lg:transition-colors ${
                    solidBar
                      ? 'bg-[#11161C] group-hover:bg-[#0D82DF]'
                      : 'bg-[#11161C] lg:bg-white group-hover:bg-[#0D82DF] lg:group-hover:bg-white'
                  }`}
                />
                <span
                  className={`h-[1.5px] w-2.5 sm:w-3.5 lg:transition-colors ${
                    solidBar
                      ? 'bg-[#11161C] group-hover:bg-[#0D82DF]'
                      : 'bg-[#11161C] lg:bg-white group-hover:bg-[#0D82DF] lg:group-hover:bg-white'
                  }`}
                />
              </div>
              <span className="text-[9px] sm:text-[11px] font-mono font-medium tracking-[0.16em] sm:tracking-widest">
                MENU
              </span>
            </button>
          </div>

          {/* CENTER: SINGLE-LINE BRAND WORDMARK */}
          <div className="flex justify-center text-center min-w-0">
            <Link
              to="/demo/equestrian-vibrant"
              className="flex flex-col items-center group text-center no-underline"
            >
              <span
                className={`font-cinzel text-[11.5px] sm:text-lg md:text-xl tracking-[0.14em] sm:tracking-[0.3em] font-bold lg:transition-colors whitespace-nowrap ${
                  solidBar
                    ? 'text-[#11161C] group-hover:text-[#0D82DF]'
                    : 'text-[#11161C] lg:text-white group-hover:text-[#0D82DF] lg:group-hover:text-white/90'
                }`}
              >
                BRAMBLE &amp; BAY
              </span>
            </Link>
          </div>

          {/* RIGHT: MINIMAL LUXURY CTA */}
          <div className="flex items-center justify-end shrink-0">
            <Link
              to="/demo/equestrian-vibrant/contact"
              className={`inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-5 py-1.5 sm:py-2 font-bold text-[8.5px] sm:text-[11px] uppercase tracking-[0.13em] sm:tracking-[0.2em] lg:transition-colors whitespace-nowrap ${
                solidBar
                  ? 'bg-[#0D82DF] text-white hover:bg-[#11161C]'
                  : 'bg-[#0D82DF] text-white lg:bg-white lg:text-[#11161C] hover:bg-[#11161C] lg:hover:bg-[#FAF7F0]'
              }`}
            >
              <span>RESERVE RIDE</span>
            </Link>
          </div>
        </div>
      </header>

      <VibrantMenuDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );

  return typeof document !== 'undefined' ? createPortal(navContent, document.body) : navContent;
};

/**
 * Minimalist Luxury Footer (Warm Cream, Vibrant Blue & Crisp Ink Typography)
 */
const VibrantFooter: React.FC = () => (
  <footer className="bg-[#FAF7F0] text-[#11161C] pt-20 sm:pt-28 pb-24 px-5 sm:px-8 md:px-14 border-t border-[#11161C]/12">
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#11161C]/12">
        <div className="md:col-span-5 space-y-5">
          <span className="text-[10px] font-mono uppercase tracking-[0.38em] text-[#0D82DF] block">
            EST. {academy.established} · PEWSEY VALE, WILTSHIRE
          </span>
          <h2 className="font-cinzel text-2xl sm:text-4xl font-bold uppercase tracking-tight text-[#11161C]">
            BRAMBLE &amp; BAY
          </h2>
          <p className="text-sm text-[#11161C]/70 font-light leading-[1.8] max-w-sm">
            Classical equitation, affiliated showjumping on springy chalk turf, and four hundred acres of traffic-free Wiltshire downland.
          </p>
        </div>

        <div className="md:col-span-3 space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#0D82DF] block mb-4">
            DIRECTORY
          </span>
          <ul className="space-y-2.5">
            {MENU_CHAPTERS.map((s) => (
              <li key={s.path}>
                <Link
                  to={s.path}
                  className="text-xs font-mono uppercase tracking-[0.2em] text-[#11161C]/75 hover:text-[#0D82DF] transition-colors"
                >
                  {s.num} · {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4 space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#0D82DF] block mb-4">
            TACK ROOM &amp; HOURS
          </span>
          <p className="text-sm font-light text-[#11161C]/80">
            {academy.addressLine1}, {academy.addressLine2} {academy.postcode}
          </p>
          <p className="font-cinzel text-lg font-bold text-[#0D82DF]">
            <a href={`tel:${academy.phoneHref}`}>{academy.phoneDisplay}</a>
          </p>
          <div className="pt-3 space-y-1.5 text-xs font-light text-[#11161C]/70">
            {openingHours.map((oh) => (
              <div key={oh.days} className="flex justify-between gap-4 border-b border-[#11161C]/10 pb-1">
                <span>{oh.days}</span>
                <span>{oh.hours}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono uppercase tracking-[0.24em] text-[#11161C]/55">
        <span>© {new Date().getFullYear()} BRAMBLE &amp; BAY RIDING ACADEMY</span>
        <span className="text-[#0D82DF]">BRITISH HORSE SOCIETY APPROVED CENTRE</span>
      </div>
    </div>
  </footer>
);

const VibrantShell: React.FC<{ children: React.ReactNode; isHomeHero?: boolean }> = ({
  children,
  isHomeHero = false
}) => {
  useEffect(() => {
    document.title = 'Bramble & Bay | Riding & Showjumping Academy — Wiltshire';
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#11161C] selection:bg-[#0D82DF] selection:text-white overflow-x-hidden">
      <VibrantNavbar isHomeHero={isHomeHero} />
      <main>{children}</main>
      <VibrantFooter />
      <style>{`
        @keyframes bbLogoMarquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .bb-logo-marquee {
          animation: bbLogoMarquee 36s linear infinite;
        }
        .bb-logo-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

const DISCIPLINE_SHOWCASE = [
  {
    index: '01',
    tabLabel: 'Showjumping',
    location: 'Six-Acre Turf Paddock',
    title: 'Showjumping & Gymnastic Grids',
    summary:
      'From welcoming 60cm courses to affiliated 1.10m tracks set across six acres of springy chalk turf. Senior Coach Tom Neave leads course walks, related distances, and rhythmic jumping sessions in groups of no more than four riders.',
    image: images.jumping,
    path: '/demo/equestrian-vibrant/lessons'
  },
  {
    index: '02',
    tabLabel: 'Classical Flatwork',
    location: '60m × 25m Mirrored Arena',
    title: 'Classical Seat & Dressage',
    summary:
      'Schooled on our resident Warmblood, Connemara, and Thoroughbred schoolmasters inside our floodlit waxed sand-and-fibre arena. Develop an independent seat, quiet hands, and effortless lateral work.',
    image: images.arena,
    path: '/demo/equestrian-vibrant/lessons'
  },
  {
    index: '03',
    tabLabel: 'Downland Hacking',
    location: '400 Private Chalk Acres',
    title: 'Ridgeway & Pewsey Vale Canters',
    summary:
      'Step straight out of the courtyard gate onto four hundred acres of ancient Wiltshire chalk turf without touching a single road. Long grass tracks, beech spinneys, and panoramic ridgeway views.',
    image: images.hacking,
    path: '/demo/equestrian-vibrant/lessons'
  },
  {
    index: '04',
    tabLabel: 'Young Riders',
    location: 'The American Barn',
    title: 'Pony Club & Stable Mornings',
    summary:
      'Unhurried weekend horsemanship, lead-rein sessions with dedicated handlers, and joyful first jumping rallies on our kindest Welsh and native ponies.',
    image: images.leadRein,
    path: '/demo/equestrian-vibrant/lessons'
  }
];

/**
 * 1. HOME PAGE
 * - Full-viewport 4K hero containing ONLY the new grain-free FIND YOUR STRIDE image.
 * - Generous sky-blue buffer at the top so the navbar (Hamburger menu, BRAMBLE & BAY, CTA) is never close to the hero title.
 * - Unboxed vector brand logo marquee underneath.
 */
export const EquestrianVibrantHome: React.FC = () => {
  const [activeDisciplineIdx, setActiveDisciplineIdx] = useState(0);
  const activeDiscipline = DISCIPLINE_SHOWCASE[activeDisciplineIdx] || DISCIPLINE_SHOWCASE[0];

  return (
    <VibrantShell isHomeHero>
      {/* =================================================================== */}
      {/* 1. 4K HERO IMAGE — OPTIMIZED FOR MOBILE, TABLET & DESKTOP           */}
      {/* - Mobile & Tablet: 100% horizontal width visible (no cut-off on     */}
      {/*   "FIND YOUR STRIDE") with excess top blue sky trimmed cleanly.     */}
      {/* - Desktop: Half the sky gap between navbar & title, full jump shown.*/}
      {/* =================================================================== */}
      <section className="relative w-full lg:h-screen lg:min-h-[680px] bg-white lg:bg-[#1385E0] pt-[49px] sm:pt-[55px] lg:pt-0 overflow-hidden select-none">
        <div className="relative w-full aspect-[11/9.7] sm:aspect-[11/9.8] lg:aspect-auto lg:h-full overflow-hidden bg-[#1385E0]">
          <img
            src={VIBRANT_HERO_IMAGE}
            alt="Find Your Stride — Showjumper clearing a fence against a vibrant blue sky"
            loading="eager"
            fetchPriority="high"
            decoding="sync"
            className="w-full h-full object-cover object-[center_44%] sm:object-[center_45%] lg:object-[center_42%] block"
          />
        </div>
      </section>

      {/* =================================================================== */}
      {/* 2. REAL VECTOR BRAND LOGO MARQUEE (ZERO BOXES, ZERO TEXT CAPTIONS)  */}
      {/* =================================================================== */}
      <BrandLogoMarquee />

      {/* =================================================================== */}
      {/* 3. THE ACADEMY — Open Editorial Split + Live Counting Numbers       */}
      {/* =================================================================== */}
      <section className="py-20 sm:py-32 md:py-44 px-5 sm:px-8 md:px-14 bg-[#FAF7F0] border-b border-[#11161C]/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 lg:gap-24 items-center">
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <span className="text-[10px] uppercase tracking-[0.42em] text-[#0D82DF] font-mono font-bold block">
              01 · THE RIDING CLUB · PEWSEY VALE
            </span>

            <h1 className="font-cinzel text-2xl sm:text-5xl font-bold uppercase tracking-tight text-[#11161C] leading-[1.12]">
              BOLD RIDING, <br />
              OPEN SKIES &amp; <br />
              <span className="font-cormorant italic font-normal text-[#0D82DF] normal-case text-3xl sm:text-6xl">
                True Partnership.
              </span>
            </h1>

            <div className="h-[1px] w-24 bg-[#0D82DF]" />

            <p className="text-sm sm:text-base text-[#11161C]/75 font-light leading-[1.85] max-w-lg">
              Set across four hundred acres of sunlit Wiltshire chalk downland, Bramble &amp; Bay pairs the energy of a modern showjumping and dressage club with the warmth of a traditional country yard. Every ride is capped at four horses so you spend your hour in rhythm, not waiting in line.
            </p>

            {/* UNBOXED COUNTING NUMBERS WITH HAIRLINE RULES */}
            <div className="pt-8 border-t border-[#11161C]/12 grid grid-cols-3 gap-6 sm:gap-10">
              <div>
                <div className="font-cinzel text-2xl sm:text-5xl font-bold text-[#0D82DF]">
                  <LuxuryCountUp end={400} duration={1800} />
                </div>
                <div className="h-[1px] w-full bg-[#0D82DF]/25 my-2.5" />
                <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.22em] text-[#11161C]/65">
                  Private Acres
                </div>
              </div>

              <div>
                <div className="font-cinzel text-2xl sm:text-5xl font-bold text-[#0D82DF]">
                  <LuxuryCountUp end={22} duration={1900} />
                </div>
                <div className="h-[1px] w-full bg-[#0D82DF]/25 my-2.5" />
                <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.22em] text-[#11161C]/65">
                  Schoolmasters
                </div>
              </div>

              <div>
                <div className="font-cinzel text-2xl sm:text-5xl font-bold text-[#0D82DF]">
                  <LuxuryCountUp end={18} duration={2000} />
                </div>
                <div className="h-[1px] w-full bg-[#0D82DF]/25 my-2.5" />
                <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.22em] text-[#11161C]/65">
                  Turf Fences
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-8">
              <Link
                to="/demo/equestrian-vibrant/lessons"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#0D82DF] hover:bg-[#11161C] text-white font-bold text-xs uppercase tracking-[0.24em] transition-colors"
              >
                <span>EXPLORE TUITION</span>
                <ArrowRight size={13} />
              </Link>
              <Link
                to="/demo/equestrian-vibrant/horses"
                className="text-xs uppercase tracking-[0.25em] font-mono text-[#0D82DF] hover:text-[#11161C] transition-colors"
              >
                MEET THE HERD →
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative overflow-hidden aspect-[16/11] bg-white group">
              <img
                src={images.jumping}
                alt="Showjumper clearing an oxer on the grass paddock"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
            <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-[#0D82DF] mt-4">
              01 · Six-Acre Turf Showjumping Ring · Pewsey Vale
            </p>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 4. CURATED DISCIPLINES — Fluid Underline Tabs on Crisp White        */}
      {/* =================================================================== */}
      <section className="py-20 sm:py-32 md:py-44 px-5 sm:px-8 md:px-14 bg-white border-b border-[#11161C]/10">
        <div className="max-w-6xl mx-auto space-y-14 sm:space-y-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#11161C]/12">
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-[0.42em] text-[#0D82DF] font-mono font-bold block">
                02 · CURATED DISCIPLINES (04 PROGRAMMES)
              </span>
              <h2 className="font-cinzel text-2xl sm:text-5xl font-bold uppercase tracking-tight text-[#11161C]">
                IN THE SADDLE
              </h2>
            </div>

            {/* FLUID UNDERLINE TABS (NO PILLS OR BOXES) */}
            <div className="flex items-center gap-6 sm:gap-9 overflow-x-auto pb-1 no-scrollbar">
              {DISCIPLINE_SHOWCASE.map((item, idx) => {
                const isActive = activeDisciplineIdx === idx;
                return (
                  <button
                    key={item.index}
                    type="button"
                    onClick={() => setActiveDisciplineIdx(idx)}
                    className={`relative pb-3 text-xs font-mono uppercase tracking-[0.2em] transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                      isActive
                        ? 'text-[#11161C] font-bold'
                        : 'text-[#11161C]/45 hover:text-[#0D82DF]'
                    }`}
                  >
                    <span className={`text-[10px] ${isActive ? 'text-[#0D82DF] font-bold' : 'text-[#11161C]/35'}`}>
                      {item.index}
                    </span>
                    <span>{item.tabLabel}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0D82DF]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeDiscipline.index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 lg:gap-20 items-center"
            >
              <div className="lg:col-span-7">
                <div className="relative overflow-hidden aspect-[16/10] bg-[#FAF7F0] group">
                  <img
                    src={activeDiscipline.image}
                    alt={activeDiscipline.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-2.5">
                  <span className="font-mono text-xs text-[#0D82DF] uppercase tracking-[0.28em] font-bold block">
                    {activeDiscipline.index} · {activeDiscipline.location}
                  </span>
                  <h3 className="font-cinzel text-2xl sm:text-4xl font-bold uppercase tracking-tight text-[#11161C]">
                    {activeDiscipline.title}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-[#11161C]/70 font-light leading-[1.85]">
                  {activeDiscipline.summary}
                </p>

                <div className="pt-5 border-t border-[#11161C]/12 flex items-center gap-6">
                  <Link
                    to={activeDiscipline.path}
                    className="inline-flex items-center gap-3 px-7 py-3.5 bg-[#0D82DF] hover:bg-[#11161C] text-white font-bold text-xs uppercase tracking-[0.24em] transition-colors"
                  >
                    <span>VIEW SESSIONS</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 5. RESIDENT HORSES — Vibrant Sky Blue Architectural Portrait Band   */}
      {/* =================================================================== */}
      <section className="py-20 sm:py-32 md:py-44 px-5 sm:px-8 md:px-14 bg-[#0D82DF] text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 sm:mb-20 gap-6 pb-8 border-b border-white/25">
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.42em] text-white/80 block">
                03 · TWENTY-TWO RESIDENT EQUINES
              </span>
              <h2 className="font-cinzel text-2xl sm:text-5xl font-bold text-white uppercase tracking-tight">
                MEET THE SCHOOLMASTERS
              </h2>
            </div>
            <Link
              to="/demo/equestrian-vibrant/horses"
              className="text-xs font-mono uppercase tracking-[0.26em] text-white hover:opacity-80 transition-opacity"
            >
              FULL HERD LEDGER (08) →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[horses[3], horses[2], horses[5], horses[6]].map((horse) => (
              <Link
                key={horse.name}
                to="/demo/equestrian-vibrant/horses"
                className="group flex flex-col"
              >
                <div className="overflow-hidden aspect-[4/5] bg-[#0964AE] mb-5">
                  <img
                    src={horse.photo}
                    alt={horse.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                  />
                </div>
                <div className="pb-3 border-b border-white/25 flex items-baseline justify-between gap-3">
                  <span className="font-cinzel text-lg sm:text-xl font-bold text-white uppercase">
                    {horse.name}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/80">
                    {horse.height} · {horse.breed}
                  </span>
                </div>
                <p className="text-xs font-light text-white/85 leading-relaxed pt-3">
                  {horse.character}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 6. THE ESTATE — Open Alternating Split on Warm Cream                */}
      {/* =================================================================== */}
      <section className="py-20 sm:py-32 md:py-44 px-5 sm:px-8 md:px-14 bg-[#FAF7F0]">
        <div className="max-w-6xl mx-auto space-y-20 sm:space-y-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#11161C]/12">
            <div>
              <span className="text-[10px] uppercase tracking-[0.42em] text-[#0D82DF] font-mono font-bold block mb-3">
                04 · THE GROUNDS &amp; ARENAS
              </span>
              <h2 className="font-cinzel text-2xl sm:text-5xl font-bold uppercase tracking-tight text-[#11161C]">
                DESIGNED FOR SOUNDNESS &amp; JOY
              </h2>
            </div>
            <Link
              to="/demo/equestrian-vibrant/facilities"
              className="text-xs font-mono uppercase tracking-[0.25em] text-[#0D82DF] hover:text-[#11161C] transition-colors"
            >
              TOUR ALL 5 STOPS →
            </Link>
          </div>

          {facilities.slice(0, 2).map((fac, idx) => (
            <div
              key={fac.index}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-16 lg:gap-24 items-center"
            >
              <div className={`lg:col-span-6 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="overflow-hidden aspect-[4/3] bg-white">
                  <img
                    src={fac.photo}
                    alt={fac.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className={`lg:col-span-6 space-y-6 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                <span className="text-[10px] font-mono uppercase tracking-[0.38em] text-[#0D82DF] block">
                  {fac.index} · {fac.subtitle}
                </span>
                <h3 className="font-cinzel text-2xl sm:text-4xl font-bold text-[#11161C] uppercase leading-tight">
                  {fac.title}
                </h3>
                <div className="h-[1px] w-20 bg-[#0D82DF]" />
                <p className="text-[#11161C]/70 text-sm sm:text-base font-light leading-[1.85]">
                  {fac.detail}
                </p>
                <p className="pt-4 border-t border-[#11161C]/12 text-xs font-mono uppercase tracking-[0.22em] text-[#0D82DF]">
                  {fac.note}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </VibrantShell>
  );
};

/**
 * 2. LESSONS & CLINICS PAGE — Clean Unboxed Ledger in Cream, White & Vibrant Blue
 */
export const EquestrianVibrantLessons: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const categories = ['All', 'Foundations & Children', 'Flatwork & Private', 'Jumping & Clinics', 'Downland Hacking'];

  const filtered =
    selectedCategory === 'All'
      ? lessons
      : lessons.filter((l) => l.category === selectedCategory);

  return (
    <VibrantShell>
      <section className="pt-32 sm:pt-40 pb-16 px-5 sm:px-8 md:px-14 bg-[#FAF7F0] border-b border-[#11161C]/12">
        <div className="max-w-6xl mx-auto">
          <span className="text-[10px] font-mono uppercase tracking-[0.42em] text-[#0D82DF] block mb-4">
            01 · TUITION &amp; CLINICS
          </span>
          <h1 className="font-cinzel text-3xl sm:text-6xl font-bold uppercase tracking-tight text-[#11161C] leading-[1.05] mb-6">
            LESSONS &amp; <span className="font-cormorant italic font-normal text-[#0D82DF] normal-case">Showjumping.</span>
          </h1>
          <p className="text-sm sm:text-base text-[#11161C]/70 font-light max-w-2xl leading-[1.85]">
            Every group session is capped at four riders in our 60m school or six-acre turf paddock. Choose a discipline below to view session timings.
          </p>

          <div className="flex items-center gap-6 sm:gap-9 overflow-x-auto pt-10 pb-1 border-b border-[#11161C]/12 no-scrollbar">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative pb-3 text-xs font-mono uppercase tracking-[0.2em] transition-colors cursor-pointer whitespace-nowrap ${
                    active ? 'text-[#0D82DF] font-bold' : 'text-[#11161C]/50 hover:text-[#11161C]'
                  }`}
                >
                  <span>{cat}</span>
                  {active && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0D82DF]" />}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-5 sm:px-8 md:px-14 bg-white">
        <div className="max-w-6xl mx-auto divide-y divide-[#11161C]/12">
          {filtered.map((lesson: Lesson, idx: number) => (
            <div
              key={lesson.id}
              className="py-10 sm:py-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
            >
              <div className="lg:col-span-5">
                <div className="aspect-[16/10] overflow-hidden bg-[#FAF7F0]">
                  <img
                    src={lesson.photo}
                    alt={lesson.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono uppercase tracking-[0.28em] text-[#0D82DF]">
                  <span>
                    {String(idx + 1).padStart(2, '0')} · {lesson.category}
                  </span>
                  <span>{lesson.duration} · {lesson.setting}</span>
                </div>
                <h2 className="font-cinzel text-2xl sm:text-3xl font-bold uppercase text-[#11161C]">
                  {lesson.name}
                </h2>
                <p className="text-sm text-[#11161C]/70 font-light leading-[1.8]">
                  {lesson.detail}
                </p>
                <div className="pt-3 flex flex-wrap items-center justify-between gap-4 border-t border-[#11161C]/10">
                  <span className="text-xs font-mono text-[#11161C]/60">
                    {lesson.who}
                  </span>
                  <Link
                    to="/demo/equestrian-vibrant/contact"
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.24em] text-[#0D82DF] hover:text-[#11161C] font-bold"
                  >
                    <span>RESERVE THIS RIDE</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </VibrantShell>
  );
};

/**
 * 3. SCHOOLMASTERS PAGE
 */
export const EquestrianVibrantHorses: React.FC = () => (
  <VibrantShell>
    <section className="pt-32 sm:pt-40 pb-16 px-5 sm:px-8 md:px-14 bg-[#FAF7F0] border-b border-[#11161C]/12">
      <div className="max-w-6xl mx-auto">
        <span className="text-[10px] font-mono uppercase tracking-[0.42em] text-[#0D82DF] block mb-4">
          02 · THE RESIDENT HERD
        </span>
        <h1 className="font-cinzel text-3xl sm:text-6xl font-bold uppercase tracking-tight text-[#11161C] leading-[1.05] mb-6">
          TWENTY-TWO <span className="font-cormorant italic font-normal text-[#0D82DF] normal-case">Schoolmasters.</span>
        </h1>
        <p className="text-sm sm:text-base text-[#11161C]/70 font-light max-w-2xl leading-[1.85]">
          From 11.2hh Welsh Mountain ponies to 16.2hh Warmbloods and Irish Sport Horses, our horses live out in settled herds and teach with quiet generosity.
        </p>
      </div>
    </section>

    <section className="py-16 sm:py-24 px-5 sm:px-8 md:px-14 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {horses.map((horse: Horse, idx: number) => (
          <div key={horse.name} className="flex flex-col">
            <div className="aspect-[4/5] overflow-hidden bg-[#FAF7F0] mb-4">
              <img
                src={horse.photo}
                alt={horse.name}
                loading="lazy"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="pb-2.5 border-b border-[#11161C]/15 flex items-baseline justify-between gap-2">
              <span className="font-cinzel text-lg font-bold uppercase text-[#11161C]">
                {String(idx + 1).padStart(2, '0')} · {horse.name}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#0D82DF]">
                {horse.height}
              </span>
            </div>
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#11161C]/55 mt-2">
              {horse.breed} · {horse.discipline}
            </p>
            <p className="text-xs font-light text-[#11161C]/75 leading-relaxed mt-2">
              {horse.character}
            </p>
          </div>
        ))}
      </div>
    </section>
  </VibrantShell>
);

/**
 * 4. FACILITIES PAGE
 */
export const EquestrianVibrantFacilities: React.FC = () => (
  <VibrantShell>
    <section className="pt-32 sm:pt-40 pb-16 px-5 sm:px-8 md:px-14 bg-[#FAF7F0] border-b border-[#11161C]/12">
      <div className="max-w-6xl mx-auto">
        <span className="text-[10px] font-mono uppercase tracking-[0.42em] text-[#0D82DF] block mb-4">
          03 · FOUR HUNDRED PRIVATE ACRES
        </span>
        <h1 className="font-cinzel text-3xl sm:text-6xl font-bold uppercase tracking-tight text-[#11161C] leading-[1.05] mb-6">
          THE ESTATE &amp; <span className="font-cormorant italic font-normal text-[#0D82DF] normal-case">Arenas.</span>
        </h1>
      </div>
    </section>

    <section className="py-16 sm:py-28 px-5 sm:px-8 md:px-14 bg-white">
      <div className="max-w-6xl mx-auto space-y-20 sm:space-y-28">
        {facilities.map((fac, idx) => (
          <div
            key={fac.index}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-16 items-center"
          >
            <div className={`lg:col-span-6 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
              <div className="aspect-[16/10] overflow-hidden bg-[#FAF7F0]">
                <img
                  src={fac.photo}
                  alt={fac.alt}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className={`lg:col-span-6 space-y-5 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
              <span className="text-[10px] font-mono uppercase tracking-[0.36em] text-[#0D82DF] block">
                {fac.index} · {fac.subtitle}
              </span>
              <h2 className="font-cinzel text-2xl sm:text-4xl font-bold uppercase text-[#11161C]">
                {fac.title}
              </h2>
              <div className="h-[1px] w-20 bg-[#0D82DF]" />
              <p className="text-sm sm:text-base font-light text-[#11161C]/75 leading-[1.85]">
                {fac.detail}
              </p>
              <p className="pt-3 border-t border-[#11161C]/12 text-xs font-mono uppercase tracking-[0.2em] text-[#0D82DF]">
                {fac.note}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  </VibrantShell>
);

/**
 * 5. CONTACT & BOOKING PAGE — Open Minimalist Form with Underline Inputs
 */
export const EquestrianVibrantContact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <VibrantShell>
      <section className="pt-32 sm:pt-40 pb-24 px-5 sm:px-8 md:px-14 bg-[#FAF7F0]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-start">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] font-mono uppercase tracking-[0.42em] text-[#0D82DF] block">
              04 · TACK ROOM DESK
            </span>
            <h1 className="font-cinzel text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#11161C] leading-[1.08]">
              RESERVE <br />
              <span className="font-cormorant italic font-normal text-[#0D82DF] normal-case text-4xl sm:text-6xl">
                Your Ride.
              </span>
            </h1>
            <div className="h-[1px] w-20 bg-[#0D82DF]" />
            <p className="text-sm sm:text-base font-light text-[#11161C]/75 leading-[1.85]">
              Speak directly with Fen and our coaching team in the Pewsey Vale. Tell us your riding stage and preferred days, and we will confirm your horse match and arena time.
            </p>
            <div className="pt-6 border-t border-[#11161C]/12 space-y-2">
              <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#0D82DF]">
                DIRECT TELEPHONE
              </p>
              <a
                href={`tel:${academy.phoneHref}`}
                className="block font-cinzel text-2xl font-bold text-[#11161C] hover:text-[#0D82DF]"
              >
                {academy.phoneDisplay}
              </a>
              <p className="text-xs font-light text-[#11161C]/65">
                {academy.addressLine1}, {academy.addressLine2}, {academy.postcode}
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white p-8 sm:p-12 border border-[#11161C]/10">
            {submitted ? (
              <div className="py-12 space-y-5">
                <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#0D82DF] block">
                  ENQUIRY RECEIVED
                </span>
                <h2 className="font-cinzel text-2xl sm:text-3xl font-bold uppercase text-[#11161C]">
                  WE WILL BE IN TOUCH SHORTLY.
                </h2>
                <p className="text-sm font-light text-[#11161C]/70 leading-relaxed">
                  Our tack room team replies the same day with available slots and your matched schoolmaster.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-7 py-3 bg-[#0D82DF] text-white text-xs font-bold uppercase tracking-[0.24em] cursor-pointer"
                >
                  SEND ANOTHER REQUEST
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-[0.28em] text-[#11161C]/60 mb-2">
                      RIDER NAME
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      className="w-full py-3 bg-transparent border-b border-[#11161C]/25 text-sm focus:outline-none focus:border-[#0D82DF]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-[0.28em] text-[#11161C]/60 mb-2">
                      TELEPHONE OR EMAIL
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="07... or email address"
                      className="w-full py-3 bg-transparent border-b border-[#11161C]/25 text-sm focus:outline-none focus:border-[#0D82DF]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-[0.28em] text-[#11161C]/60 mb-2">
                      PREFERRED DISCIPLINE
                    </label>
                    <select className="w-full py-3 bg-transparent border-b border-[#11161C]/25 text-sm focus:outline-none focus:border-[#0D82DF]">
                      <option>Showjumping &amp; Gridwork Clinic</option>
                      <option>Private Classical Flatwork</option>
                      <option>400-Acre Chalk Downland Hack</option>
                      <option>Adult Returners Course</option>
                      <option>Young Riders &amp; Stable Morning</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-[0.28em] text-[#11161C]/60 mb-2">
                      EXPERIENCE LEVEL
                    </label>
                    <select className="w-full py-3 bg-transparent border-b border-[#11161C]/25 text-sm focus:outline-none focus:border-[#0D82DF]">
                      <option>Confident Walk, Trot, Canter &amp; Jumping</option>
                      <option>Balanced Walk, Trot &amp; Canter</option>
                      <option>Returning Adult Rider</option>
                      <option>First-Time Beginner</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-[0.28em] text-[#11161C]/60 mb-2">
                    NOTES &amp; PREFERRED DAYS
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Height, preferred days of the week, or any questions..."
                    className="w-full py-3 bg-transparent border-b border-[#11161C]/25 text-sm focus:outline-none focus:border-[#0D82DF]"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-3 px-9 py-4 bg-[#0D82DF] hover:bg-[#11161C] text-white text-xs font-bold uppercase tracking-[0.26em] transition-colors cursor-pointer"
                >
                  <span>REQUEST LESSON SLOT</span>
                  <ArrowRight size={14} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </VibrantShell>
  );
};

export default EquestrianVibrantHome;
