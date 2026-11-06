import React, { useEffect, useState } from 'react';
import * as RouterDOM from 'react-router-dom';
const { Link, useLocation } = RouterDOM as any;
import { MapPin, Phone, Clock, ArrowRight, Navigation, Star, Coffee, ChevronDown, Instagram } from 'lucide-react';
import CafeNavbar from './CafeNavbar';
import CafeFooter from './CafeFooter';
import { CAFE_LOCATIONS, type CafeLocationItem } from './CafeHome';
import { useCafeGlide, CAFE_GLIDE_STYLES } from './useCafeGlide';

const CafeLocations: React.FC = () => {
  const location = useLocation();
  const [activeLoc, setActiveLoc] = useState<CafeLocationItem>(() => {
    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get('loc'));
    return CAFE_LOCATIONS.find((l) => l.id === id) || CAFE_LOCATIONS[0];
  });

  useCafeGlide(activeLoc.id);

  useEffect(() => {
    window.scrollTo(0, 0);
    const params = new URLSearchParams(location.search);
    const id = Number(params.get('loc'));
    const found = CAFE_LOCATIONS.find((l) => l.id === id);
    if (found) setActiveLoc(found);
  }, [location.search]);

  const scrollToEstates = () => {
    const el = document.getElementById('estates');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9F5] font-sans selection:bg-[#A4715E] selection:text-white overflow-x-hidden">
      <CafeNavbar />

      {/* IMMERSIVE MAP & PHOTOGRAPHY HERO */}
      <section className="relative min-h-screen w-full overflow-hidden bg-[#2D2520] pt-28 pb-20 flex items-center">
        {/* Instant high-resolution photography backdrop so hero paints in 0ms */}
        <img
          src={activeLoc.img}
          alt={activeLoc.name}
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          loading="eager"
          decoding="sync"
        />

        {/* Interactive Map Embed */}
        <div className="absolute inset-0 w-full h-full">
          <iframe
            key={activeLoc.id}
            title={`Map of ${activeLoc.name}`}
            src={activeLoc.embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            className="w-full h-full opacity-85 brightness-[0.88]"
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/65 via-black/20 to-black/35" />

        {/* Floating Info Card */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-6">
          <div className="cafe-glide-left w-full max-w-md bg-[#FFF9F5]/95 backdrop-blur-2xl p-8 sm:p-12 rounded-[3rem] shadow-[0_40px_90px_rgba(0,0,0,0.35)] border border-white space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-[0.04] pointer-events-none">
              <Coffee size={160} strokeWidth={1} />
            </div>

            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#A4715E]/15 rounded-full border border-[#A4715E]/25">
                <MapPin size={12} className="text-[#A4715E]" />
                <span className="text-[#A4715E] font-black text-[9px] uppercase tracking-widest">
                  {activeLoc.badge}
                </span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl font-black text-[#4A403A] tracking-tighter uppercase leading-none">
                {activeLoc.name}
              </h1>
              <p className="text-sm text-[#4A403A]/70 italic leading-relaxed">{activeLoc.description}</p>
            </div>

            <div className="space-y-4 border-t border-[#A4715E]/15 pt-5">
              <div className="flex gap-3.5 items-start">
                <Navigation size={18} className="text-[#A4715E] mt-0.5 shrink-0" />
                <div>
                  <p className="text-[#4A403A] font-bold text-base leading-tight">{activeLoc.address}</p>
                  <p className="text-[#4A403A]/65 font-medium italic text-sm">{activeLoc.city}</p>
                </div>
              </div>
              <div className="flex gap-3.5 items-center">
                <Clock size={18} className="text-[#A4715E] shrink-0" />
                <p className="text-[11px] font-black uppercase tracking-widest text-[#4A403A]/85">
                  {activeLoc.hours}
                </p>
              </div>
              <div className="flex gap-3.5 items-center">
                <Phone size={18} className="text-[#A4715E] shrink-0" />
                <a
                  href={`tel:${activeLoc.phone.replace(/\s+/g, '')}`}
                  className="text-sm font-bold text-[#4A403A] hover:text-[#A4715E] transition-colors"
                >
                  {activeLoc.phone}
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <a
                href={activeLoc.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-[#A4715E] text-white font-black text-[11px] uppercase tracking-[0.35em] rounded-2xl hover:bg-[#4A403A] transition-all shadow-lg flex items-center justify-center gap-3"
              >
                <span>Get Directions</span>
                <ArrowRight size={16} />
              </a>
              <div className="flex gap-3">
                <Link
                  to="/demo/cafe/menu"
                  className="flex-1 py-4 bg-white border border-[#A4715E]/25 text-[#4A403A] font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-[#FDE2E4] transition-all text-center"
                >
                  View Menu
                </Link>
                <Link
                  to="/demo/cafe/book"
                  className="flex-1 py-4 bg-[#4A403A] text-white font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-[#A4715E] transition-all text-center"
                >
                  Reserve
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          type="button"
          onClick={scrollToEstates}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-[#4A403A] bg-[#FFF9F5]/90 backdrop-blur-md px-6 py-3 rounded-full border border-[#A4715E]/20 shadow-lg flex items-center gap-2 hover:bg-[#A4715E] hover:text-white transition-all cursor-pointer"
        >
          <span className="text-[9px] uppercase tracking-[0.4em] font-black">All Flagship Houses</span>
          <ChevronDown size={16} />
        </button>

        {/* Floating Social Icons */}
        <div className="absolute bottom-8 right-6 sm:right-10 flex flex-col gap-4 z-30">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-12 h-12 bg-[#FFF9F5]/95 backdrop-blur-xl border border-[#A4715E]/20 rounded-full flex items-center justify-center text-[#4A403A] hover:bg-[#A4715E] hover:text-white transition-all shadow-lg"
          >
            <Instagram size={18} />
          </a>
          <a
            href={`tel:${activeLoc.phone.replace(/\s+/g, '')}`}
            aria-label="Call Location"
            className="w-12 h-12 bg-[#FFF9F5]/95 backdrop-blur-xl border border-[#A4715E]/20 rounded-full flex items-center justify-center text-[#4A403A] hover:bg-[#A4715E] hover:text-white transition-all shadow-lg"
          >
            <Phone size={18} />
          </a>
        </div>
      </section>

      {/* ALL LOCATIONS GRID */}
      <section id="estates" className="py-36 bg-[#FFF9F5] border-y border-[#A4715E]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-20">
            <div className="space-y-4 cafe-glide-left">
              <span className="text-[#A4715E] font-black text-[11px] uppercase tracking-[0.6em] block">
                Heritage Selection
              </span>
              <h2 className="font-serif text-4xl md:text-6xl font-black text-[#4A403A] tracking-tighter uppercase leading-none">
                THE <br /> <span className="text-[#A4715E] italic">ESTATES.</span>
              </h2>
            </div>
            <div className="hidden md:flex gap-1 text-[#A4715E] cafe-glide-right">
              {[...Array(5)].map((_, j) => (
                <Star key={j} size={15} fill="currentColor" />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {CAFE_LOCATIONS.map((loc, idx) => {
              const isSelected = activeLoc.id === loc.id;
              return (
                <div
                  key={loc.id}
                  style={{ transitionDelay: `${idx * 110}ms` }}
                  onClick={() => {
                    setActiveLoc(loc);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`cafe-glide-up group cursor-pointer rounded-[3rem] overflow-hidden bg-white border-4 shadow-xl transition-all duration-500 hover:-translate-y-2 ${
                    isSelected ? 'border-[#A4715E]' : 'border-white'
                  }`}
                >
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img
                      src={loc.img}
                      alt={loc.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="eager"
                      decoding="async"
                    />
                    {isSelected && (
                      <div className="absolute top-4 right-4 bg-[#A4715E] text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2 shadow-md">
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> Viewing Now
                      </div>
                    )}
                  </div>
                  <div className="p-8 space-y-5">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className="text-[9px] font-black uppercase tracking-widest text-[#A4715E] block mb-1">
                          {loc.badge}
                        </span>
                        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A403A] tracking-tight group-hover:text-[#A4715E] transition-colors">
                          {loc.name}
                        </h3>
                      </div>
                      <div className="w-10 h-10 bg-[#FDE2E4] rounded-full flex items-center justify-center text-[#A4715E] shrink-0">
                        <Navigation size={16} />
                      </div>
                    </div>
                    <p className="text-sm text-[#4A403A]/65 italic leading-relaxed">{loc.description}</p>
                    <div className="space-y-1.5 pt-2 border-t border-[#A4715E]/10">
                      <p className="text-[#4A403A] font-bold text-sm">
                        {loc.address}, {loc.city}
                      </p>
                      <p className="text-[#A4715E] font-black text-[10px] uppercase tracking-widest">{loc.hours}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CafeFooter />
      <style>{CAFE_GLIDE_STYLES}</style>
    </div>
  );
};

export default CafeLocations;
