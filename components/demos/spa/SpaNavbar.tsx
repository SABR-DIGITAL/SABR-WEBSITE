import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { X, Calendar, ArrowRight } from 'lucide-react';
import { motion as framerMotion, AnimatePresence } from 'framer-motion';
import { SPA_DATA } from './spaData';
import SpaBookingModal from './SpaBookingModal';

const motion = framerMotion as any;

interface SpaNavbarProps {
  onOpenBooking?: () => void;
}

export const SpaMenuModal: React.FC<{ isOpen: boolean; onClose: () => void; onOpenBooking: () => void }> = ({
  isOpen,
  onClose,
  onOpenBooking
}) => {
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const menuSections = [
    {
      num: '01',
      title: 'ACCOMMODATION',
      path: '/demo/spa/suites',
      tagline: 'Private timber and glass residences nestled within 180 acres of ancient pines.',
      image: '/src/assets/images/verdant_pine_cottage_1793919178058.webp'
    },
    {
      num: '02',
      title: 'FOOD & BEVERAGE',
      path: '/demo/spa/dining',
      tagline: 'Seasonal woodland dining, open-hearth cooking, and botanical infusions.',
      image: '/src/assets/images/verdant_hearth_kitchen_1793919209436.webp'
    },
    {
      num: '03',
      title: 'SPA & WELLNESS',
      path: '/demo/spa/treatments',
      tagline: 'Geothermal mineral pools, volcanic basalt stone rituals, and cedar saunas.',
      image: '/src/assets/images/verdant_thermal_pool_1793919176502.webp'
    },
    {
      num: '04',
      title: 'ACTIVITIES & PARK',
      path: '/demo/spa/activities',
      tagline: 'Private equestrian trails, heated outdoor pools, woodland cycling, and clay tennis.',
      image: '/src/assets/images/verdant_forest_ebikes_1793919214449.webp'
    },
    {
      num: '05',
      title: 'PHILOSOPHY & AWARDS',
      path: '/demo/spa/philosophy',
      tagline: 'Sustainable timber and glass architecture preserving 180 acres of woodland reserve.',
      image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=90&w=2400'
    },
    {
      num: '06',
      title: 'TRANSFERS & CONCIERGE',
      path: '/demo/spa/transfers',
      tagline: 'Private helipad arrivals, chauffeur fleet transfers, and 24-hour concierge care.',
      image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=90&w=2400'
    }
  ];

  const currentActive = menuSections[activeCategory] || menuSections[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed inset-0 z-[130] bg-[#070908]/98 text-white flex flex-col justify-between overflow-y-auto pb-16 sm:pb-0 backdrop-blur-2xl"
        >
          {/* TOP BAR */}
          <div className="flex items-center justify-between px-4 sm:px-6 md:px-14 py-4 sm:py-8 border-b border-white/10">
            <button
              onClick={onClose}
              className="flex items-center gap-2 sm:gap-3 text-xs md:text-sm uppercase tracking-[0.22em] sm:tracking-[0.3em] font-medium text-white/70 hover:text-white transition-colors group cursor-pointer"
            >
              <X size={18} className="transition-transform group-hover:rotate-90 duration-300 text-emerald-400" />
              <span>CLOSE</span>
            </button>

            <Link
              to="/demo/spa"
              onClick={onClose}
              className="text-center group"
            >
              <span className="font-cinzel text-base sm:text-xl md:text-2xl tracking-[0.2em] sm:tracking-[0.32em] font-bold block text-white group-hover:text-emerald-400 transition-colors">
                {SPA_DATA.brand.name}
              </span>
              <span className="hidden sm:block text-[8px] uppercase tracking-[0.55em] text-white/50 font-mono">
                RELAX PARK & THERMAL SPA
              </span>
            </Link>

            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  onClose();
                  onOpenBooking();
                }}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-none bg-white hover:bg-emerald-400 hover:text-slate-950 text-slate-950 font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] transition-all cursor-pointer border border-white/20"
              >
                <Calendar size={12} />
                <span className="hidden sm:inline">RESERVE STAY</span>
                <span className="sm:hidden">BOOK</span>
              </button>
            </div>
          </div>

          {/* EDITORIAL SPLIT MENU CONTENT (NO SUB-OPTIONS, EACH ITEM IS ITS OWN SELECTION) */}
          <div className="max-w-7xl mx-auto w-full px-5 sm:px-6 md:px-14 py-6 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-24 items-center flex-1">
            {/* LEFT: MAIN NAV DIRECTORY */}
            <div className="lg:col-span-6 space-y-2 sm:space-y-5">
              {menuSections.map((section, idx) => {
                const isActive = activeCategory === idx;
                return (
                  <div
                    key={section.num}
                    onMouseEnter={() => setActiveCategory(idx)}
                    className="relative cursor-pointer group py-1 sm:py-2"
                  >
                    <div className="flex items-center gap-3.5 sm:gap-8">
                      <span className={`font-mono text-xs md:text-sm tracking-widest transition-colors duration-200 w-6 sm:w-8 shrink-0 ${
                        isActive ? 'text-emerald-400 font-bold' : 'text-white/30 group-hover:text-white/60'
                      }`}>
                        {section.num}
                      </span>

                      <Link
                        to={section.path}
                        onClick={onClose}
                        className={`font-cinzel text-base sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight transition-colors duration-200 sm:whitespace-nowrap leading-tight flex items-center gap-3 sm:gap-4 ${
                          isActive
                            ? 'text-white'
                            : 'text-white/45 hover:text-white/80'
                        }`}
                      >
                        <span>{section.title}</span>
                        {isActive && (
                          <span className="w-2 h-2 bg-emerald-400 inline-block shrink-0" />
                        )}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT: CLEAN 4K PREVIEW PHOTO & DIRECT PAGE LINK */}
            <div className="lg:col-span-6 space-y-5 sm:space-y-8">
              <Link
                to={currentActive.path}
                onClick={onClose}
                className="block relative overflow-hidden aspect-[16/10] bg-[#0C100E] group"
              >
                <img
                  key={currentActive.image}
                  src={currentActive.image}
                  alt={currentActive.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </Link>

              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 pt-1 sm:pt-2">
                <div className="space-y-1.5 sm:space-y-2 max-w-md">
                  <span className="text-[10px] uppercase tracking-[0.35em] text-emerald-400 font-mono font-bold block">
                    {currentActive.num} · {currentActive.title}
                  </span>
                  <p className="text-xs sm:text-sm text-white/65 font-light leading-relaxed">
                    {currentActive.tagline}
                  </p>
                </div>

                <Link
                  to={currentActive.path}
                  onClick={onClose}
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-emerald-400 hover:text-white transition-colors shrink-0"
                >
                  <span>OPEN PAGE</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>

          {/* BOTTOM BAR STRIP */}
          <div className="px-5 sm:px-6 md:px-14 py-4 sm:py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-2.5 sm:gap-4 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 font-mono">
              <span className="text-white">{SPA_DATA.brand.phone}</span>
              <span className="hidden sm:inline">·</span>
              <span className="text-[11px] sm:text-xs">{SPA_DATA.brand.address}</span>
            </div>
            <div className="flex items-center gap-4 text-white/70">
              <span className="text-[10px] uppercase tracking-widest font-mono text-emerald-400">
                SANCTUARY IN THE ANCIENT PINES · WILTSHIRE, UK
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const SpaNavbar: React.FC<SpaNavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 1024) return;
      const next = window.scrollY > 30;
      setIsScrolled((prev) => (prev !== next ? next : prev));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBookingClick = () => {
    if (onOpenBooking) {
      onOpenBooking();
    } else {
      setIsBookingModalOpen(true);
    }
  };

  const navContent = (
    <>
      <header
        style={{ transform: 'translate3d(0, 0, 0)', WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' }}
        className={`fixed top-0 left-0 w-full z-[100] py-3.5 sm:py-4 bg-[#070908] border-b border-white/10 lg:transition-colors lg:duration-500 ${
          isScrolled
            ? 'lg:bg-[#070908]/95 lg:backdrop-blur-xl lg:border-white/10 lg:shadow-2xl'
            : 'lg:bg-gradient-to-b lg:from-black/90 lg:via-black/40 lg:to-transparent lg:border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 grid grid-cols-3 items-center text-white select-none">
          {/* LEFT: MENU BUTTON */}
          <div className="flex items-center gap-6 md:gap-8 justify-start">
            <button
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
              className="flex items-center gap-3 text-xs md:text-sm font-semibold tracking-[0.25em] uppercase hover:text-emerald-400 transition-colors group cursor-pointer py-1.5"
            >
              <div className="flex flex-col gap-1.5 w-5">
                <span className="h-[1.5px] w-full bg-white group-hover:bg-emerald-400 transition-colors"></span>
                <span className="h-[1.5px] w-3.5 bg-white group-hover:bg-emerald-400 transition-colors"></span>
              </div>
              <span className="hidden sm:inline text-[11px] font-mono font-medium tracking-widest">MENU</span>
            </button>
          </div>

          {/* CENTER: LOGO */}
          <div className="flex justify-center text-center">
            <Link
              to="/demo/spa"
              className="flex flex-col items-center group text-center no-underline"
            >
              <span className="font-cinzel text-base sm:text-xl md:text-2xl tracking-[0.22em] sm:tracking-[0.32em] font-bold text-white group-hover:text-emerald-400 transition-colors inline-block whitespace-nowrap">
                {SPA_DATA.brand.name}
              </span>
            </Link>
          </div>

          {/* RIGHT: MODERN LUXURY CTA */}
          <div className="flex items-center justify-end">
            <button
              onClick={handleBookingClick}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-7 py-2 sm:py-2.5 rounded-none bg-white hover:bg-emerald-400 hover:text-slate-950 text-slate-950 font-bold text-[10px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.25em] transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.4)] cursor-pointer border border-white/20"
            >
              <Calendar size={12} className="text-emerald-700" />
              <span className="hidden sm:inline">RESERVE STAY</span>
              <span className="sm:hidden">BOOK</span>
            </button>
          </div>
        </div>
      </header>

      {/* FULLSCREEN EDITORIAL MENU */}
      <SpaMenuModal
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onOpenBooking={handleBookingClick}
      />

      {/* DIRECT BOOKING MODAL */}
      <SpaBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </>
  );

  return typeof document !== 'undefined' ? createPortal(navContent, document.body) : navContent;
};

export default SpaNavbar;
