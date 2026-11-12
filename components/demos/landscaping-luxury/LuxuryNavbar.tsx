import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { X, Calendar, Phone } from 'lucide-react';
import { motion as framerMotion, AnimatePresence } from 'framer-motion';
import { OAK_ASH_BRAND, HERO_SLIDES } from '../landscaping/landscapingData';

const motion = framerMotion as any;

export const LuxuryNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredCol, setHoveredCol] = useState<number>(0);

  const menuChapters = [
    {
      num: '01',
      title: 'Estate Overview',
      subtitle: 'The Sanctuary',
      path: '/demo/landscaping-luxury',
      tagline: 'Twenty-eight years of award-winning garden design and master construction under one roof.',
      image: HERO_SLIDES[0]?.image || '/images/projects/landscaping-preview.webp',
    },
    {
      num: '02',
      title: 'Design & Build',
      subtitle: 'Four Disciplines',
      path: '/demo/landscaping-luxury/services',
      tagline: 'Spatial masterplanning, 3D architecture, Yorkstone masonry, bespoke pergolas, and mature planting.',
      image:
        'https://dmhdaawgg48dl.cloudfront.net/wp-content/uploads/2024/11/metal-dining-set-boxwood-topiary-cottage-esher-surrey-960x960.jpg',
    },
    {
      num: '03',
      title: 'Garden Portfolios',
      subtitle: 'Selected Works',
      path: '/demo/landscaping-luxury/gallery',
      tagline: 'Private country estates, town courtyards, reflection pools, and RHS Chelsea Gold Medal gardens.',
      image:
        'https://dmhdaawgg48dl.cloudfront.net/wp-content/uploads/2025/02/reflection-pool-york-stone-courtyard-country-garden-petworth-760x760.jpg',
    },
    {
      num: '04',
      title: 'Practice & Heritage',
      subtitle: 'Established 1998',
      path: '/demo/landscaping-luxury/about',
      tagline: 'Permanent in-house stonemasons, horticulturists, and RHS Chelsea medalists working as one team.',
      image:
        'https://dmhdaawgg48dl.cloudfront.net/wp-content/uploads/2024/12/corten-steel-pavilion-stone-path-salvia-woodland-960x960.jpg',
    },
    {
      num: '05',
      title: 'Commissions',
      subtitle: 'Private Desk',
      path: '/demo/landscaping-luxury/contact',
      tagline: 'Arrange a private site consultation across Wiltshire, the Cotswolds, Surrey, and London.',
      image:
        'https://dmhdaawgg48dl.cloudfront.net/wp-content/uploads/2024/10/yorkstone-rill-water-feature-english-country-petworth-sussex-1920x1280.jpg',
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 1024) return;
      const next = window.scrollY > 30;
      setIsScrolled((prev) => (prev !== next ? next : prev));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navContent = (
    <>
      <header
        style={{ transform: 'translate3d(0, 0, 0)', WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' }}
        className={`fixed top-0 left-0 w-full z-[120] py-3.5 sm:py-4 bg-[#0C0A08] border-b border-[#C8B88A]/25 lg:transition-colors lg:duration-500 ${
          isScrolled
            ? 'lg:bg-[#0C0A08]/95 lg:backdrop-blur-xl lg:border-[#C8B88A]/25 lg:shadow-2xl'
            : 'lg:bg-gradient-to-b lg:from-[#0C0A08]/90 lg:via-[#0C0A08]/45 lg:to-transparent lg:border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 md:px-12 grid grid-cols-3 items-center text-[#F4F1EA] select-none">
          {/* LEFT: ARCHITECTURAL INDEX TRIGGER */}
          <div className="flex items-center gap-3 sm:gap-6 justify-start">
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open architectural index"
              className="flex items-center gap-2 sm:gap-3 px-2.5 sm:px-3.5 py-1.5 sm:py-2 border border-[#C8B88A]/35 bg-[#14110D]/80 hover:border-[#C8B88A] hover:bg-[#1C1812] transition-all group cursor-pointer"
            >
              <div className="flex items-end gap-1 h-3 sm:h-3.5">
                <span className="w-[1.5px] h-full bg-[#C8B88A] group-hover:h-2 transition-all duration-300" />
                <span className="w-[1.5px] h-2 sm:h-2.5 bg-[#F4F1EA] group-hover:h-full transition-all duration-300" />
                <span className="w-[1.5px] h-2.5 sm:h-3 bg-[#C8B88A] group-hover:h-1.5 transition-all duration-300" />
              </div>
              <span className="text-[9px] sm:text-[11px] font-mono font-medium tracking-[0.2em] sm:tracking-[0.28em] uppercase text-[#F4F1EA] group-hover:text-[#C8B88A] transition-colors">
                INDEX
              </span>
            </button>
          </div>

          {/* CENTER: BRAND WORDMARK */}
          <div className="flex justify-center text-center">
            <Link
              to="/demo/landscaping-luxury"
              className="flex flex-col items-center group text-center no-underline"
            >
              <span className="font-cinzel text-[13px] sm:text-xl md:text-2xl tracking-[0.16em] sm:tracking-[0.34em] font-bold text-[#F4F1EA] group-hover:text-[#C8B88A] transition-colors inline-block whitespace-nowrap">
                {OAK_ASH_BRAND.name}
              </span>
              <span className="hidden md:block text-[7.5px] font-mono uppercase tracking-[0.45em] text-[#C8B88A] mt-0.5">
                EST. 1998 · WILTSHIRE
              </span>
            </Link>
          </div>

          {/* RIGHT: LUXURY TAN CTA */}
          <div className="flex items-center justify-end gap-4">
            <a
              href={`tel:${OAK_ASH_BRAND.phoneHref}`}
              className="hidden xl:inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.22em] text-[#C8B88A] hover:text-[#F4F1EA] transition-colors"
            >
              <Phone size={11} />
              <span>{OAK_ASH_BRAND.phoneDisplay}</span>
            </a>

            <Link
              to="/demo/landscaping-luxury/contact"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-6 py-1.5 sm:py-2.5 bg-[#C8B88A] hover:bg-[#D8CBA3] text-[#0C0A08] font-bold text-[9px] sm:text-xs uppercase tracking-[0.16em] sm:tracking-[0.24em] transition-all shadow-[0_4px_20px_rgba(0,0,0,0.45)] whitespace-nowrap"
            >
              <Calendar size={11} className="text-[#0C0A08] shrink-0" />
              <span className="hidden sm:inline">COMMISSION</span>
              <span className="sm:hidden">ENQUIRE</span>
            </Link>
          </div>
        </div>
      </header>

      {/* =================================================================== */}
      {/* BESPOKE 5-COLUMN ARCHITECTURAL DRAWER (Clean — screenshotted parts removed) */}
      {/* =================================================================== */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-4%' }}
            animate={{ opacity: 1, y: '0%' }}
            exit={{ opacity: 0, y: '-4%' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[220] bg-[#0C0A08] text-[#F4F1EA] flex flex-col overflow-y-auto pb-16 lg:pb-0"
          >
            {/* 1. TOP ARCHITECTURAL HEADER */}
            <div className="flex items-center justify-between px-4 sm:px-8 md:px-14 py-4 sm:py-6 border-b border-[#C8B88A]/20 bg-[#110E0B]">
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 border border-[#C8B88A]/40 hover:border-[#C8B88A] text-[10px] sm:text-xs font-mono uppercase tracking-[0.22em] sm:tracking-[0.28em] text-[#F4F1EA] hover:text-[#C8B88A] transition-colors group cursor-pointer"
              >
                <X
                  size={15}
                  className="transition-transform group-hover:rotate-90 duration-300 text-[#C8B88A]"
                />
                <span>CLOSE</span>
              </button>

              <Link
                to="/demo/landscaping-luxury"
                onClick={() => setIsMenuOpen(false)}
                className="text-center group"
              >
                <span className="font-cinzel text-sm sm:text-2xl tracking-[0.18em] sm:tracking-[0.3em] font-bold block text-[#F4F1EA] group-hover:text-[#C8B88A] transition-colors whitespace-nowrap">
                  {OAK_ASH_BRAND.name}
                </span>
              </Link>

              <Link
                to="/demo/landscaping-luxury/contact"
                onClick={() => setIsMenuOpen(false)}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-1.5 sm:py-2.5 bg-[#C8B88A] hover:bg-[#D8CBA3] text-[#0C0A08] font-bold text-[9.5px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.22em] transition-all"
              >
                <Calendar size={12} />
                <span className="hidden sm:inline">PRIVATE CONSULTATION</span>
                <span className="sm:hidden">BOOK</span>
              </Link>
            </div>

            {/* 2. 5-COLUMN VERTICAL ARCHITECTURAL PANELS */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-[#C8B88A]/20">
              {menuChapters.map((chapter, idx) => {
                const isHovered = hoveredCol === idx;

                return (
                  <Link
                    key={chapter.num}
                    to={chapter.path}
                    onClick={() => setIsMenuOpen(false)}
                    onMouseEnter={() => setHoveredCol(idx)}
                    className="group relative flex flex-col justify-end p-5 sm:p-8 lg:p-10 min-h-[112px] sm:min-h-[155px] lg:min-h-[520px] overflow-hidden bg-[#0E0C09] transition-colors"
                  >
                    {/* Full-bleed architectural photograph behind each column */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      <img
                        src={chapter.image}
                        alt={chapter.title}
                        loading="lazy"
                        decoding="async"
                        className={`w-full h-full object-cover transition-all duration-1000 ease-out ${
                          isHovered
                            ? 'opacity-50 scale-105'
                            : 'opacity-18 scale-100 grayscale-[35%]'
                        }`}
                      />
                      <div
                        className={`absolute inset-0 transition-opacity duration-500 ${
                          isHovered
                            ? 'bg-gradient-to-t from-[#0C0A08] via-[#0C0A08]/55 to-[#0C0A08]/35'
                            : 'bg-[#0C0A08]/78'
                        }`}
                      />
                    </div>

                    {/* Clean Bottom Title, Subtitle & Description (No top Roman/Chapter bar, no 'Enter Chapter') */}
                    <div className="relative z-10 space-y-2.5 sm:space-y-4">
                      <div>
                        <span className="block text-[9px] font-mono uppercase tracking-[0.3em] sm:tracking-[0.35em] text-[#C8B88A] mb-1 sm:mb-2">
                          {chapter.subtitle}
                        </span>
                        <h3 className="font-cinzel text-lg sm:text-2xl xl:text-3xl font-bold uppercase text-[#F4F1EA] group-hover:text-[#C8B88A] transition-colors leading-tight">
                          {chapter.title}
                        </h3>
                      </div>

                      <div
                        className={`h-[1px] bg-[#C8B88A] transition-all duration-500 ${
                          isHovered ? 'w-full' : 'w-10 opacity-50'
                        }`}
                      />

                      <p className="hidden sm:line-clamp-2 lg:line-clamp-3 text-xs text-[#F4F1EA]/70 font-light leading-relaxed">
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
    </>
  );

  return typeof document !== 'undefined' ? createPortal(navContent, document.body) : navContent;
};

export default LuxuryNavbar;
