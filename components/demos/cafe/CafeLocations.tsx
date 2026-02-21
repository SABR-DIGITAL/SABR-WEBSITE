
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Clock, ArrowRight, Navigation, Star, Heart, Coffee, ChevronDown, Instagram } from 'lucide-react';
import ExitPreviewButton from '../../ExitPreviewButton';
import CafeNavbar from './CafeNavbar';
import CafeFooter from './CafeFooter';

const locations = [
  {
    id: 1,
    name: "Hearth Bath City",
    address: "Milsom Street",
    city: "Bath, BA1",
    country: "United Kingdom",
    hours: "Mon–Sun: 9am – 7pm",
    phone: "07987 654 321",
    embedUrl: "https://www.google.com/maps?q=Milsom+Street+Bath&layer=c&cbll=51.3837,-2.3615&cbp=11,0,0,0,0&output=svembed",
    img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 2,
    name: "Cotswold Sanctuary",
    address: "Market Square",
    city: "Chipping Campden, GL55",
    country: "United Kingdom",
    hours: "Mon–Sat: 8am – 5pm",
    phone: "07555 123 456",
    embedUrl: "https://www.google.com/maps?q=Market+Square+Chipping+Campden&layer=c&cbll=52.0514,-1.7770&cbp=11,0,0,0,0&output=svembed",
    img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=600"
  }
];

const CafeLocations: React.FC = () => {
  const [activeLoc, setActiveLoc] = useState(locations[0]);

  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="min-h-screen bg-[#FFF9F5] font-sans selection:bg-[#A4715E] selection:text-white overflow-x-hidden">
      <ExitPreviewButton />
      <CafeNavbar />

      {/* IMMERSIVE STREET VIEW HERO */}
      <section className="relative h-screen w-full overflow-hidden bg-slate-900">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeLoc.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 w-full h-full"
          >
            <iframe
              src={activeLoc.embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="eager"
              className="grayscale-[20%] brightness-[0.85] transition-all duration-1000"
            />
          </motion.div>
        </AnimatePresence>

        {/* Cinematic Gradient Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>

        {/* Floating Info Card */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="absolute top-1/2 left-6 md:left-20 -translate-y-1/2 z-20 w-full max-w-sm md:max-w-md"
        >
          <div className="bg-white/80 backdrop-blur-3xl p-10 md:p-14 rounded-[3.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.3)] border border-white/50 space-y-10 group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
              <Coffee size={200} strokeWidth={1} />
            </div>

            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#A4715E]/10 rounded-full border border-[#A4715E]/20">
                <MapPin size={12} className="text-[#A4715E]" />
                <span className="text-[#A4715E] font-black text-[9px] uppercase tracking-widest">Active Site</span>
              </div>
              <h1 className="font-serif text-5xl font-black text-[#4A403A] tracking-tighter uppercase leading-none">{activeLoc.name}</h1>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <Navigation size={18} className="text-[#A4715E] mt-1" />
                <div>
                  <p className="text-[#4A403A] font-bold text-lg leading-tight">{activeLoc.address}</p>
                  <p className="text-[#4A403A]/60 font-medium italic">{activeLoc.city}, {activeLoc.country}</p>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <Clock size={18} className="text-[#A4715E]" />
                <p className="text-[11px] font-black uppercase tracking-widest text-[#4A403A]/80">{activeLoc.hours}</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 pt-4">
              <button className="w-full py-5 bg-[#A4715E] text-white font-black text-[11px] uppercase tracking-[0.4em] rounded-2xl hover:bg-[#4A403A] transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3">
                Get Directions <ArrowRight size={16} />
              </button>
              <div className="flex gap-4">
                <Link to="/demo/cafe/menu" className="flex-1 py-4 bg-white border border-[#A4715E]/20 text-[#4A403A] font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-[#FDE2E4] transition-all text-center">View Menu</Link>
                <Link to="/demo/cafe/book" className="flex-1 py-4 bg-[#4A403A] text-white font-black text-[10px] uppercase tracking-widest rounded-2xl hover:opacity-90 transition-all text-center">Reserve</Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-[8px] uppercase tracking-[0.5em] font-black">Our Other Houses</span>
          <ChevronDown size={20} />
        </motion.div>

        {/* Floating Social Icons */}
        <div className="absolute bottom-10 right-10 flex flex-col gap-6 z-30">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-[#A4715E] transition-all">
            <Instagram size={20} />
          </a>
          <a href="tel:07123456789" className="w-12 h-12 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-[#A4715E] transition-all">
            <Phone size={20} />
          </a>
        </div>
      </section>

      {/* SECONDARY LOCATIONS SLIDER */}
      <section className="py-40 bg-[#FFF9F5] border-y border-[#A4715E]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-24">
            <div className="space-y-4">
              <span className="text-[#A4715E] font-black text-[11px] uppercase tracking-[0.6em]">Heritage Selection</span>
              <h2 className="font-serif text-4xl md:text-6xl font-black text-[#4A403A] tracking-tighter uppercase leading-none">THE <br /> <span className="text-[#A4715E] italic">ESTATES.</span></h2>
            </div>
            <div className="hidden md:flex gap-1 text-[#FDE2E4]">
              {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="currentColor" />)}
            </div>
          </div>

          <div className="flex gap-12 overflow-x-auto pb-20 no-scrollbar snap-x cursor-grab active:cursor-grabbing">
            {locations.map((loc) => (
              <motion.div 
                key={loc.id}
                whileHover={{ y: -20 }}
                onClick={() => {
                  setActiveLoc(loc);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`min-w-[320px] md:min-w-[450px] group cursor-pointer snap-center rounded-[3.5rem] overflow-hidden bg-white border-8 shadow-2xl transition-all duration-700 ${activeLoc.id === loc.id ? 'border-[#A4715E]' : 'border-white'}`}
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img src={loc.img} alt={loc.name} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all"></div>
                  {activeLoc.id === loc.id && (
                    <div className="absolute top-6 right-6 bg-[#A4715E] text-white px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div> Viewing Now
                    </div>
                  )}
                </div>
                <div className="p-10 space-y-6">
                  <div className="flex justify-between items-start">
                    <h3 className="font-serif text-3xl font-bold text-[#4A403A] tracking-tight group-hover:text-[#A4715E] transition-colors">{loc.name}</h3>
                    <div className="w-10 h-10 bg-[#FDE2E4] rounded-full flex items-center justify-center text-[#A4715E]">
                      <Navigation size={18} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[#4A403A]/60 font-medium text-sm leading-relaxed">{loc.address}, {loc.city}</p>
                    <p className="text-[#A4715E] font-black text-[10px] uppercase tracking-widest">{loc.hours}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CafeFooter />

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default CafeLocations;
