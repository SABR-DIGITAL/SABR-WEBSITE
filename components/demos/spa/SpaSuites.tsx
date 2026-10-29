import React, { useState, useEffect } from 'react';
import * as RouterDOM from 'react-router-dom';
const { Link, useLocation } = RouterDOM as any;
import { motion as framerMotion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  ArrowRight, 
  Calendar, 
  Sparkles, 
  Users, 
  Maximize2, 
  Compass, 
  Eye, 
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import SpaNavbar from './SpaNavbar';
import SpaFooter from './SpaFooter';
import SpaBookingModal from './SpaBookingModal';
import { SPA_DATA, SpaSuite } from './spaData';

const motion = framerMotion as any;

export const SpaSuites: React.FC = () => {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedSuiteForBooking, setSelectedSuiteForBooking] = useState<string>(SPA_DATA.suites[0].id);
  const [activeGallerySuite, setActiveGallerySuite] = useState<SpaSuite | null>(null);
  const [galleryImgIdx, setGalleryImgIdx] = useState<number>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const params = new URLSearchParams(location.search);
    const cat = params.get('cat');
    if (cat) setSelectedCategory(cat);
  }, [location]);

  const filteredSuites = selectedCategory === 'all'
    ? SPA_DATA.suites
    : SPA_DATA.suites.filter((s) => s.category === selectedCategory);

  const openBooking = (suiteId: string) => {
    setSelectedSuiteForBooking(suiteId);
    setIsBookingOpen(true);
  };

  const openGallery = (suite: SpaSuite) => {
    setActiveGallerySuite(suite);
    setGalleryImgIdx(0);
  };

  return (
    <div className="bg-[#070908] text-[#ECE7DF] min-h-screen font-sans selection:bg-emerald-500 selection:text-slate-950">
      <SpaNavbar onOpenBooking={() => setIsBookingOpen(true)} />

      {/* HERO BANNER */}
      <div className="relative pt-44 pb-24 px-6 md:px-14 bg-[#0A0D0C] border-b border-white/10">
        <div className="max-w-6xl mx-auto text-center space-y-6">
          <span className="text-[10px] uppercase tracking-[0.45em] text-emerald-400 font-mono font-bold block">
            LIVING SPACES & RESIDENCES
          </span>
          <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-bold uppercase text-white tracking-wider">
            SUITES & VILLAS
          </h1>
          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-white/60 font-light leading-relaxed">
            Every residence is crafted from sustainable timber, limestone, and floor-to-ceiling panoramic glass, 
            immersing you in the pine reserve while preserving absolute thermal luxury.
          </p>

          {/* CATEGORY FILTER TABS (FLUID EDITORIAL TYPOGRAPHY, NO BOXES) */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 pt-8 border-t border-white/10">
            {[
              { id: 'all', label: 'All Residences' },
              { id: 'cottages', label: 'Pine Glass Cottages' },
              { id: 'chalet', label: 'Lakeside Chalets' },
              { id: 'rooms', label: 'Forest Suites' },
              { id: 'villas', label: 'Presidential Villas' }
            ].map((tab, idx) => {
              const isSelected = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`group relative pb-2 text-xs font-mono uppercase tracking-[0.25em] transition-all cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? 'text-white font-bold'
                      : 'text-white/40 hover:text-white/80'
                  }`}
                >
                  <span className={`text-[10px] ${isSelected ? 'text-emerald-400 font-bold' : 'text-white/20'}`}>
                    0{idx + 1}
                  </span>
                  <span>{tab.label}</span>
                  {isSelected && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-400 shadow-[0_0_10px_#1df2a4]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* SUITES LIST */}
      <div className="max-w-6xl mx-auto px-6 md:px-14 py-24 space-y-24">
        {filteredSuites.map((suite, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div
              key={suite.id}
              id={suite.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center p-8 sm:p-14 bg-[#0C100E] border border-white/10 shadow-2xl"
            >
              {/* IMAGE GALLERY CAROUSEL TRIGGER */}
              <div className={`lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="relative overflow-hidden aspect-[16/10] max-h-[380px] border border-white/10 group shadow-xl">
                  <img
                    src={suite.heroImage}
                    alt={suite.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  {/* VIEW FULL GALLERY BUTTON */}
                  <button
                    onClick={() => openGallery(suite)}
                    className="absolute bottom-6 left-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-none bg-black/80 hover:bg-black/95 backdrop-blur-md text-white text-xs font-semibold uppercase tracking-wider border border-white/20 transition-colors cursor-pointer"
                  >
                    <Eye size={14} className="text-emerald-400" />
                    <span>View Gallery ({suite.gallery.length} Photos)</span>
                  </button>

                  <div className="absolute top-6 right-6 px-4 py-1.5 rounded-none bg-white/10 backdrop-blur-md text-emerald-400 font-mono font-bold text-xs uppercase tracking-widest border border-white/15">
                    {suite.category.toUpperCase()}
                  </div>
                </div>

                {/* MINI THUMBNAILS */}
                <div className="grid grid-cols-4 gap-3 mt-3">
                  {suite.gallery.slice(0, 4).map((img, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setActiveGallerySuite(suite);
                        setGalleryImgIdx(i);
                      }}
                      className="overflow-hidden aspect-[4/3] border border-white/10 hover:border-emerald-400/50 cursor-pointer transition-colors"
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              {/* SUITE CONTENT */}
              <div className={`lg:col-span-5 space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-white/50">
                    <span>{suite.sizeSqm} M²</span>
                    <span>·</span>
                    <span>{suite.capacity}</span>
                  </div>
                  <h3 className="font-cinzel text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
                    {suite.name}
                  </h3>
                  <p className="font-cormorant text-lg italic text-slate-300">
                    "{suite.tagline}"
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-white/65 font-light leading-relaxed">
                  {suite.description}
                </p>

                {/* SPECIFICATIONS GRID */}
                <div className="grid grid-cols-2 gap-3 py-3 border-y border-white/10">
                  {suite.features.map((f) => (
                    <div key={f.label} className="text-xs font-mono">
                      <span className="text-white/40 block text-[10px] uppercase">{f.label}</span>
                      <span className="text-white font-semibold">{f.value}</span>
                    </div>
                  ))}
                </div>

                {/* AMENITIES */}
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-mono font-bold block">
                    INCLUDED AMENITIES
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {suite.amenities.slice(0, 4).map((a) => (
                      <div key={a} className="flex items-center gap-2 text-xs text-white/80">
                        <Check size={13} className="text-emerald-400 shrink-0" />
                        <span className="truncate">{a}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RESERVE CTA (SHARP BUTTON) */}
                <div className="pt-4 flex items-center justify-between gap-4 border-t border-white/10">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-bold block">
                      STATUS
                    </span>
                    <span className="font-mono text-xs uppercase text-white/80">
                      Available for Booking
                    </span>
                  </div>

                  <button
                    onClick={() => openBooking(suite.id)}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-none bg-white hover:bg-emerald-400 hover:text-slate-950 text-slate-950 font-bold text-xs uppercase tracking-[0.25em] transition-all cursor-pointer shadow-lg border border-white/20"
                  >
                    <span>RESERVE SUITE</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeGallerySuite && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-8">
            <button
              onClick={() => setActiveGallerySuite(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-none bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white cursor-pointer z-50 transition-colors"
            >
              <X size={22} />
            </button>

            <div className="relative max-w-5xl w-full flex flex-col items-center space-y-4">
              <div className="relative w-full aspect-[16/10] max-h-[70vh] border border-white/10 overflow-hidden bg-black">
                <img
                  src={activeGallerySuite.gallery[galleryImgIdx]}
                  alt="Gallery"
                  className="w-full h-full object-cover"
                />

                {/* PREV/NEXT ARROWS */}
                <button
                  onClick={() => setGalleryImgIdx((prev) => (prev === 0 ? activeGallerySuite.gallery.length - 1 : prev - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-none bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 cursor-pointer"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => setGalleryImgIdx((prev) => (prev + 1) % activeGallerySuite.gallery.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-none bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 cursor-pointer"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              <div className="flex items-center justify-between w-full text-xs font-mono text-white/70">
                <span className="font-cinzel text-base font-bold text-white uppercase">{activeGallerySuite.name}</span>
                <span className="text-emerald-400">{galleryImgIdx + 1} / {activeGallerySuite.gallery.length}</span>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      <SpaFooter />

      <SpaBookingModal
        isOpen={isBookingOpen}
        initialSuiteId={selectedSuiteForBooking}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
};

export default SpaSuites;
