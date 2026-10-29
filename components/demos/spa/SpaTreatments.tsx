import React, { useState, useEffect } from 'react';
import * as RouterDOM from 'react-router-dom';
const { Link, useLocation } = RouterDOM as any;
import { 
  Sparkles, 
  Droplets, 
  Flame, 
  Wind, 
  Clock, 
  Check, 
  Calendar, 
  ArrowRight, 
  ShieldCheck, 
  X, 
  Heart 
} from 'lucide-react';
import { motion as framerMotion, AnimatePresence } from 'framer-motion';
import SpaNavbar from './SpaNavbar';
import SpaFooter from './SpaFooter';
import SpaBookingModal from './SpaBookingModal';
import { SPA_DATA, SpaTreatment } from './spaData';

const motion = framerMotion as any;

export const SpaTreatments: React.FC = () => {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [activeTreatmentModal, setActiveTreatmentModal] = useState<SpaTreatment | null>(null);
  const [treatmentBooked, setTreatmentBooked] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('11:00 AM');

  useEffect(() => {
    window.scrollTo(0, 0);
    const params = new URLSearchParams(location.search);
    const cat = params.get('cat');
    if (cat) {
      if (cat.toLowerCase() === 'banya') setSelectedCategory('Rituals');
      else setSelectedCategory(cat);
    }
  }, [location]);

  const categories = ['all', 'Rituals', 'Hydrotherapy', 'Facials', 'Massages'];

  const filteredTreatments = selectedCategory === 'all'
    ? SPA_DATA.treatments
    : SPA_DATA.treatments.filter((t) => t.category.toLowerCase() === selectedCategory.toLowerCase());

  const handleBookTreatment = (e: React.FormEvent) => {
    e.preventDefault();
    setTreatmentBooked(true);
    setTimeout(() => {
      setTreatmentBooked(false);
      setActiveTreatmentModal(null);
    }, 1500);
  };

  return (
    <div className="bg-[#070908] text-[#ECE7DF] min-h-screen font-sans selection:bg-emerald-500 selection:text-slate-950">
      <SpaNavbar onOpenBooking={() => setIsBookingOpen(true)} />

      {/* HERO BANNER */}
      <div className="relative pt-44 pb-24 px-6 md:px-14 bg-[#0A0D0C] border-b border-white/10">
        <div className="max-w-6xl mx-auto text-center space-y-6">
          <span className="text-[10px] uppercase tracking-[0.45em] text-emerald-400 font-mono font-bold block">
            THERMAL WELLNESS & PHYTO-RITUALS
          </span>
          <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-bold uppercase text-white tracking-wider">
            SPA & THERMAL BATHS
          </h1>
          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-white/60 font-light leading-relaxed">
            Holistic hydrotherapy, volcanic basalt rituals and organic botanical treatments formulated from 
            wild forest herbs, pine extracts and therapeutic geothermal mineral water.
          </p>

          {/* FILTER TABS (FLUID EDITORIAL TYPOGRAPHY, NO BOXES) */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 pt-8 border-t border-white/10">
            {categories.map((cat, idx) => {
              const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`group relative pb-2 text-xs font-mono uppercase tracking-[0.25em] transition-all cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? 'text-white font-bold'
                      : 'text-white/40 hover:text-white/80'
                  }`}
                >
                  <span className={`text-[10px] ${isSelected ? 'text-emerald-400 font-bold' : 'text-white/20'}`}>
                    0{idx + 1}
                  </span>
                  <span>{cat === 'all' ? 'All Treatments' : cat}</span>
                  {isSelected && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-400 shadow-[0_0_10px_#1df2a4]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* THERMAL FACILITIES OVERVIEW - CINEMATIC PHOTO-BACKED ARCHITECTURAL STRIP */}
      <div className="max-w-6xl mx-auto px-6 md:px-14 py-20">
        <div className="space-y-4 mb-8">
          <span className="text-[10px] uppercase tracking-[0.45em] text-emerald-400 font-mono font-bold block">
            SANCTUARY ARCHITECTURE
          </span>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
            THERMAL ZONES & MICROCLIMATES
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* GEOTHERMAL POOLS */}
          <div className="group relative overflow-hidden aspect-[4/5] bg-[#0C100E] border border-white/15 flex flex-col justify-end p-8 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=85&w=1200"
              alt="34°C Geothermal Pools"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20" />
            <div className="relative z-10 space-y-3">
              <span className="text-[9px] uppercase font-mono tracking-[0.35em] text-emerald-400 font-bold block">
                HYDRO ZONE · 34°C YEAR-ROUND
              </span>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold uppercase text-white leading-tight">
                34°C Geothermal Pools
              </h3>
              <p className="text-xs text-white/70 leading-relaxed font-light">
                Natural thermal spring water rich in therapeutic magnesium and zinc minerals with continuous outdoor forest immersion.
              </p>
            </div>
          </div>

          {/* FINNISH PINE SAUNA */}
          <div className="group relative overflow-hidden aspect-[4/5] bg-[#0C100E] border border-white/15 flex flex-col justify-end p-8 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=85&w=1200"
              alt="Finnish Pine Sauna"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20" />
            <div className="relative z-10 space-y-3">
              <span className="text-[9px] uppercase font-mono tracking-[0.35em] text-emerald-400 font-bold block">
                DRY HEARTH · 90°C CEDAR STEAM
              </span>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold uppercase text-white leading-tight">
                Finnish Pine Sauna
              </h3>
              <p className="text-xs text-white/70 leading-relaxed font-light">
                Wood-fired dry sauna with cedar aromatic infusions, oak venik whisking, and private glacial ice plunge basins.
              </p>
            </div>
          </div>

          {/* PHYTO SALT CAVE */}
          <div className="group relative overflow-hidden aspect-[4/5] bg-[#0C100E] border border-white/15 flex flex-col justify-end p-8 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=85&w=1200"
              alt="Phyto Salt Cave"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20" />
            <div className="relative z-10 space-y-3">
              <span className="text-[9px] uppercase font-mono tracking-[0.35em] text-emerald-400 font-bold block">
                HALOTHERAPY · AEROSOL AMBER
              </span>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold uppercase text-white leading-tight">
                Phyto Salt Cave
              </h3>
              <p className="text-xs text-white/70 leading-relaxed font-light">
                Microclimate crystal salt aerosol therapy for deep respiratory rejuvenation and restorative nervous system stillness.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* TREATMENTS MENU SHOWCASE (FLUID UNBOXED EDITORIAL GRID) */}
      <div className="max-w-6xl mx-auto px-6 md:px-14 pb-48">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          {filteredTreatments.map((treatment, idx) => (
            <div
              key={treatment.id}
              className="space-y-8 flex flex-col justify-between group"
            >
              {/* CLEAN PHOTOGRAPHY (NO FLOATING BADGE BOXES) */}
              <div className="relative aspect-[16/10] overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src={treatment.image}
                  alt={treatment.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>

              <div className="space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
                    <span className="uppercase tracking-[0.3em] font-bold">0{idx + 1} · {treatment.category}</span>
                    <span className="text-white/40 tracking-widest">{treatment.duration}</span>
                  </div>

                  <h3 className="font-cinzel text-2xl sm:text-3xl font-bold uppercase text-white tracking-wide leading-tight">
                    {treatment.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-white/65 font-light leading-relaxed pt-1">
                    {treatment.description}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-white/60 font-mono">
                    {(treatment.includes || []).map((b) => (
                      <div key={b} className="flex items-center gap-2">
                        <span className="w-1 h-1 bg-emerald-400" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-white/10">
                    <span className="font-mono text-xs text-white/40 uppercase tracking-widest">
                      {treatment.duration}
                    </span>
                    <button
                      onClick={() => setActiveTreatmentModal(treatment)}
                      className="inline-flex items-center gap-2 px-7 py-3.5 bg-white hover:bg-emerald-400 hover:text-slate-950 text-slate-950 font-bold text-xs uppercase tracking-[0.22em] transition-all cursor-pointer shadow-lg border border-white/20"
                    >
                      <span>RESERVE RITUAL</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TREATMENT BOOKING POPUP MODAL */}
      <AnimatePresence>
        {activeTreatmentModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-lg bg-[#0C100E] border border-white/15 rounded-none p-8 text-white space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.35em] text-emerald-400 font-mono font-bold block">
                    RESERVE APPOINTMENT
                  </span>
                  <h4 className="font-cinzel text-xl font-bold uppercase">{activeTreatmentModal.name}</h4>
                </div>
                <button
                  onClick={() => setActiveTreatmentModal(null)}
                  className="w-9 h-9 rounded-none bg-white/10 flex items-center justify-center text-white/70 hover:text-white border border-white/15"
                >
                  <X size={16} />
                </button>
              </div>

              {treatmentBooked ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-none bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                    <Check size={24} />
                  </div>
                  <h4 className="font-cinzel text-xl font-bold uppercase">Ritual Reserved</h4>
                  <p className="text-xs text-white/60">
                    Your appointment has been scheduled for {selectedTimeSlot}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookTreatment} className="space-y-4">
                  <div className="text-xs font-mono text-white/60 space-y-1 bg-white/5 p-4 rounded-none border border-white/10">
                    <div className="flex justify-between">
                      <span>Category:</span>
                      <span className="text-white font-bold">{activeTreatmentModal.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span className="text-emerald-400 font-bold">{activeTreatmentModal.duration}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-widest text-white/50 mb-2">
                      Preferred Time Slot
                    </label>
                    <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                      {['10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM', '05:00 PM', '06:30 PM'].map((slot) => (
                        <button
                          type="button"
                          key={slot}
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={`py-2.5 rounded-none border text-center transition-colors cursor-pointer ${
                            selectedTimeSlot === slot
                              ? 'bg-white text-slate-950 font-bold border-white'
                              : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-none bg-white hover:bg-emerald-400 hover:text-slate-950 text-slate-950 font-bold text-xs uppercase tracking-[0.25em] transition-all cursor-pointer shadow-xl border border-white/20"
                  >
                    CONFIRM SPA APPOINTMENT
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SpaFooter />

      <SpaBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
};

export default SpaTreatments;
