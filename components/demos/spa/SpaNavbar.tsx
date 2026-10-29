import React, { useState, useEffect } from 'react';
import * as RouterDOM from 'react-router-dom';
const { Link, useLocation } = RouterDOM as any;
import { Menu, X, ChevronRight, Calendar, Sparkles, MapPin, ArrowRight, ArrowUpRight } from 'lucide-react';
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
      tagline: 'Private architectural suites & villas embedded into ancient pines',
      subitems: [
        { label: 'All Suites & Villas', path: '/demo/spa/suites' },
        { label: 'Pine Glass Cottages', path: '/demo/spa/suites?cat=cottages' },
        { label: 'Lakeside Chalets', path: '/demo/spa/suites?cat=chalet' },
        { label: 'Presidential Villas', path: '/demo/spa/suites?cat=villas' }
      ],
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=85&w=1400'
    },
    {
      num: '02',
      title: 'FOOD & BEVERAGE',
      path: '/demo/spa/dining',
      tagline: 'Michelin-level foraged gastronomy & beechwood open-fire grilling',
      subitems: [
        { label: 'Food & Forest Restaurant', path: '/demo/spa/dining?venue=food-forest' },
        { label: 'Pich Wood-Fire Kitchen', path: '/demo/spa/dining?venue=pich-fire' },
        { label: 'Thermal Pool Bar', path: '/demo/spa/dining?venue=pool-bar' },
        { label: 'Phyto Herbal Lounge', path: '/demo/spa/dining?venue=phyto-bar' }
      ],
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=85&w=1400'
    },
    {
      num: '03',
      title: 'SPA & WELLNESS',
      path: '/demo/spa/treatments',
      tagline: 'Deep geothermal baths, Nordic hot stone rituals & Finnish forest saunas',
      subitems: [
        { label: 'Thermal Mineral Pool', path: '/demo/spa/treatments?cat=Hydrotherapy' },
        { label: 'Nordic Hot Stone Rituals', path: '/demo/spa/treatments?cat=Rituals' },
        { label: 'Finnish Forest Sauna', path: '/demo/spa/treatments?cat=banya' },
        { label: 'Botanical Facials', path: '/demo/spa/treatments?cat=Facials' }
      ],
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=85&w=1400'
    },
    {
      num: '04',
      title: 'ACTIVITIES & PARK',
      path: '/demo/spa/activities',
      tagline: 'Private equestrian trails, heated panorama pools & clay courts',
      subitems: [
        { label: 'Forest Equestrian Trails', path: '/demo/spa/activities?act=equestrian' },
        { label: 'Heated Panorama Pools', path: '/demo/spa/activities?act=thermal-pools' },
        { label: 'Electric Forest Bicycles', path: '/demo/spa/activities?act=ebikes' },
        { label: 'Glass Yoga Pavilion', path: '/demo/spa/activities?act=yoga' }
      ],
      image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=85&w=1400'
    },
    {
      num: '05',
      title: 'PHILOSOPHY & AWARDS',
      path: '/demo/spa/philosophy',
      tagline: 'Sustainable biophilic architecture honoring 180 hectares of reserve',
      subitems: [
        { label: 'Our Forest Philosophy', path: '/demo/spa/philosophy' },
        { label: 'Architecture & Nature', path: '/demo/spa/philosophy' },
        { label: 'Sustainable Foundations', path: '/demo/spa/philosophy' },
        { label: 'European Spa Awards', path: '/demo/spa/philosophy' }
      ],
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=85&w=1400'
    },
    {
      num: '06',
      title: 'TRANSFERS & CONCIERGE',
      path: '/demo/spa/transfers',
      tagline: 'Direct private helipad access, Maybach transfers & 24/7 VIP concierge',
      subitems: [
        { label: 'Helipad & Flight Clearance', path: '/demo/spa/transfers' },
        { label: 'Chauffeur Maybach Fleet', path: '/demo/spa/transfers' },
        { label: 'VIP Concierge & Inquiries', path: '/demo/spa/contact' },
        { label: 'Estate Address & Location', path: '/demo/spa/contact' }
      ],
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=85&w=1400'
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
          className="fixed inset-0 z-[130] bg-[#070908]/98 text-white flex flex-col justify-between overflow-y-auto backdrop-blur-2xl"
        >
          {/* TOP BAR */}
          <div className="flex items-center justify-between px-6 md:px-14 py-8 border-b border-white/10">
            <button
              onClick={onClose}
              className="flex items-center gap-3 text-xs md:text-sm uppercase tracking-[0.3em] font-medium text-white/70 hover:text-white transition-colors group cursor-pointer"
            >
              <X size={20} className="transition-transform group-hover:rotate-90 duration-300 text-emerald-400" />
              <span>CLOSE</span>
            </button>

            <Link
              to="/demo/spa"
              onClick={onClose}
              className="text-center group"
            >
              <span className="font-cinzel text-xl md:text-2xl tracking-[0.32em] font-bold block text-white group-hover:text-emerald-400 transition-colors">
                {SPA_DATA.brand.name}
              </span>
              <span className="text-[8px] uppercase tracking-[0.55em] text-white/50 block font-mono">
                RELAX PARK & THERMAL SPA
              </span>
            </Link>

            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  onClose();
                  onOpenBooking();
                }}
                className="hidden sm:inline-flex items-center gap-2 px-6 py-2.5 rounded-none bg-white hover:bg-emerald-400 hover:text-slate-950 text-slate-950 font-bold text-xs uppercase tracking-[0.25em] transition-all cursor-pointer shadow-lg border border-white/20"
              >
                <Calendar size={13} />
                <span>RESERVE STAY</span>
              </button>
            </div>
          </div>

          {/* EDITORIAL SPLIT MENU CONTENT - ZERO LAYOUT SHIFT */}
          <div className="max-w-7xl mx-auto w-full px-6 md:px-14 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center flex-1">
            {/* LEFT: MAIN NAV DIRECTORY WITH FIXED RHYTHMIC SPACING (NO ACCORDION JITTER) */}
            <div className="lg:col-span-6 space-y-2 sm:space-y-3">
              {menuSections.map((section, idx) => {
                const isActive = activeCategory === idx;
                return (
                  <div
                    key={section.num}
                    onMouseEnter={() => setActiveCategory(idx)}
                    className="relative cursor-pointer group py-1.5 sm:py-2"
                  >
                    <div className="flex items-center gap-4 sm:gap-6">
                      <span className={`font-mono text-xs md:text-sm tracking-widest transition-colors duration-200 w-7 sm:w-8 shrink-0 ${
                        isActive ? 'text-emerald-400 font-bold drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]' : 'text-white/30 group-hover:text-white/60'
                      }`}>
                        {section.num}
                      </span>
                      
                      <Link
                        to={section.path}
                        onClick={onClose}
                        className={`font-cinzel text-lg sm:text-2xl lg:text-3xl font-bold uppercase tracking-tight transition-colors duration-200 whitespace-nowrap leading-tight flex items-center gap-3 ${
                          isActive
                            ? 'text-white'
                            : 'text-white/35 hover:text-white/80'
                        }`}
                      >
                        <span>{section.title}</span>
                        {isActive && (
                          <span className="w-1.5 h-1.5 bg-emerald-400 shadow-[0_0_8px_#10B981] inline-block shrink-0" />
                        )}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT: DYNAMIC PREVIEW PHOTO & SUB-ITEMS (FIXED PANEL, NO JITTER) */}
            <div className="lg:col-span-6">
              <div className="bg-[#0C100E] border border-white/15 p-6 md:p-8 space-y-6 shadow-2xl relative">
                {/* PHOTO PREVIEW */}
                <div className="relative overflow-hidden aspect-[16/9] border border-white/10 bg-[#111614]">
                  <img
                    key={currentActive.image}
                    src={currentActive.image}
                    alt={currentActive.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[9px] uppercase tracking-[0.35em] text-emerald-400 font-mono font-bold block">
                      DIRECTORY {currentActive.num}
                    </span>
                    <h4 className="font-cinzel text-xl font-bold uppercase text-white tracking-wide">
                      {currentActive.title}
                    </h4>
                  </div>
                </div>

                {/* TAGLINE & SUBITEMS LINKS */}
                <div className="space-y-4">
                  <p className="text-xs text-white/60 font-light leading-relaxed">
                    {currentActive.tagline}
                  </p>

                  <div className="border-t border-white/10 pt-4">
                    <span className="text-[9px] uppercase tracking-[0.3em] text-emerald-400 font-mono font-bold block mb-3">
                      EXPLORE DESTINATIONS
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                      {currentActive.subitems.map((sub) => (
                        <Link
                          key={sub.label}
                          to={sub.path}
                          onClick={onClose}
                          className="py-1 text-xs text-white/70 hover:text-emerald-400 font-mono uppercase tracking-wider flex items-center justify-between group transition-colors border-b border-white/5 pb-1.5"
                        >
                          <span className="truncate">{sub.label}</span>
                          <ChevronRight size={13} className="text-emerald-400/70 shrink-0 ml-1 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <Link
                      to={currentActive.path}
                      onClick={onClose}
                      className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-emerald-400 hover:text-white transition-colors"
                    >
                      <span>VIEW FULL SECTION</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM BAR STRIP */}
          <div className="px-6 md:px-14 py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
            <div className="flex items-center gap-3 font-mono">
              <span className="text-white">{SPA_DATA.brand.phone}</span>
              <span>·</span>
              <span>{SPA_DATA.brand.address}</span>
            </div>
            <div className="flex items-center gap-4 text-white/70">
              <span className="text-[10px] uppercase tracking-widest font-mono text-emerald-400">
                SANCTUARY IN THE ANCIENT PINES · WILTSHIRE
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
      setIsScrolled(window.scrollY > 30);
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

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[100] transition-[background-color,border-color,padding,backdrop-filter] duration-500 will-change-transform transform-gpu ${
          isScrolled
            ? 'bg-[#070908]/95 backdrop-blur-xl border-b border-white/10 py-4 shadow-2xl'
            : 'bg-gradient-to-b from-black/90 via-black/40 to-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-3 items-center text-white select-none">
          {/* LEFT: MENU BUTTON & LANG */}
          <div className="flex items-center gap-6 md:gap-8 justify-start">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex items-center gap-3 text-xs md:text-sm font-semibold tracking-[0.25em] uppercase hover:text-emerald-400 transition-colors group cursor-pointer"
            >
              <div className="flex flex-col gap-1.5 w-5">
                <span className="h-[1.5px] w-full bg-white group-hover:bg-emerald-400 transition-colors"></span>
                <span className="h-[1.5px] w-3.5 bg-white group-hover:bg-emerald-400 transition-colors"></span>
              </div>
              <span className="hidden sm:inline text-[11px] font-mono font-medium tracking-widest">MENU</span>
            </button>

            <div className="hidden lg:flex items-center gap-2 text-[10px] font-mono tracking-widest text-white/50 border-l border-white/10 pl-6">
              <span className="text-white font-bold cursor-pointer">EN</span>
              <span>/</span>
              <span className="hover:text-white cursor-pointer transition-colors">UA</span>
              <span>/</span>
              <span className="hover:text-white cursor-pointer transition-colors">FR</span>
            </div>
          </div>

          {/* CENTER: LOGO */}
          <div className="flex justify-center text-center">
            <Link
              to="/demo/spa"
              className="flex flex-col items-center group text-center no-underline"
            >
              <span className="font-cinzel text-lg sm:text-xl md:text-2xl tracking-[0.32em] font-bold text-white group-hover:text-emerald-400 transition-colors inline-block whitespace-nowrap">
                {SPA_DATA.brand.name}
              </span>
            </Link>
          </div>

          {/* RIGHT: MODERN LUXURY CTA (CRISP ARCHITECTURAL SQUARE BUTTON) */}
          <div className="flex items-center justify-end">
            <button
              onClick={handleBookingClick}
              className="inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 rounded-none bg-white hover:bg-emerald-400 hover:text-slate-950 text-slate-950 font-bold text-[10px] sm:text-xs uppercase tracking-[0.25em] transition-all shadow-[0_4px_20px_rgba(0,0,0,0.4)] cursor-pointer border border-white/20"
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
};

export default SpaNavbar;
