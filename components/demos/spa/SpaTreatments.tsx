import React, { useState, useEffect } from 'react';
import { Check, ArrowRight, X } from 'lucide-react';
import { motion as framerMotion, AnimatePresence } from 'framer-motion';
import SpaNavbar from './SpaNavbar';
import SpaFooter from './SpaFooter';
import SpaBookingModal from './SpaBookingModal';
import { SPA_DATA, SpaTreatment } from './spaData';

const motion = framerMotion as any;

export const SpaTreatments: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [activeTreatmentModal, setActiveTreatmentModal] = useState<SpaTreatment | null>(null);
  const [treatmentBooked, setTreatmentBooked] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('11:00 AM');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

      {/* HERO BANNER (CLEAN, NO CLICKABLE FILTER TABS) */}
      <section className="relative pt-28 pb-14 sm:pt-36 sm:pb-20 md:pt-52 md:pb-32 px-5 sm:px-6 md:px-14 bg-[#070908] border-b border-white/10">
        <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
          <span className="text-[10px] uppercase tracking-[0.45em] text-emerald-400 font-mono font-bold block">
            THERMAL WELLNESS & BOTANICAL RITUALS
          </span>
          <h1 className="font-cinzel text-3xl sm:text-6xl md:text-7xl font-bold uppercase text-white tracking-wider">
            SPA & THERMAL BATHS
          </h1>
          <p className="max-w-xl mx-auto text-sm sm:text-base text-white/60 font-light leading-relaxed">
            Mineral-rich geothermal pools, cedarwood steam saunas, and restorative bodywork formulated with wild pine and botanical extracts.
          </p>
        </div>
      </section>

      {/* ALL TREATMENTS IN ONE CONTINUOUS ALTERNATING LEFT / RIGHT SCROLL SHOWCASE */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 md:px-14 py-16 sm:py-28 md:py-56 space-y-16 sm:space-y-32 md:space-y-64">
        {SPA_DATA.treatments.map((treatment, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <motion.div
              key={treatment.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-16 lg:gap-24 items-center"
            >
              {/* 4K CORRELATED IMAGE COLUMN */}
              <div className={`lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="relative aspect-[16/10] overflow-hidden bg-[#0C100E] group">
                  <img
                    src={treatment.image}
                    alt={treatment.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* TREATMENT EDITORIAL COLUMN */}
              <div className={`lg:col-span-5 space-y-6 sm:space-y-8 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
                    <span className="uppercase tracking-[0.22em] sm:tracking-[0.3em] font-bold">
                      0{idx + 1} · {treatment.category}
                    </span>
                    <span className="text-white/60 tracking-widest text-xs sm:text-sm font-medium">
                      {treatment.duration}
                    </span>
                  </div>

                  <h2 className="font-cinzel text-2xl sm:text-4xl font-bold uppercase text-white tracking-tight leading-tight">
                    {treatment.name}
                  </h2>

                  <p className="text-sm sm:text-base text-white/65 font-light leading-relaxed">
                    {treatment.description}
                  </p>
                </div>

                {/* LARGER, CLEARER INCLUSIONS */}
                <div className="py-5 sm:py-6 border-y border-white/10 space-y-2.5 sm:space-y-3">
                  <span className="text-[11px] font-mono uppercase tracking-[0.28em] text-white/45 block">
                    RITUAL INCLUSIONS
                  </span>
                  <div className="flex flex-col gap-2 text-sm sm:text-base text-white/85 font-light">
                    {(treatment.includes || []).map((inc) => (
                      <span key={inc}>{inc}</span>
                    ))}
                  </div>
                </div>

                <div className="pt-1 sm:pt-2">
                  <button
                    onClick={() => setActiveTreatmentModal(treatment)}
                    className="inline-flex items-center justify-center w-full sm:w-auto gap-3 px-8 py-4 bg-white hover:bg-emerald-400 hover:text-slate-950 text-slate-950 font-bold text-xs uppercase tracking-[0.25em] transition-all cursor-pointer"
                  >
                    <span>RESERVE RITUAL</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* TREATMENT BOOKING POPUP MODAL */}
      <AnimatePresence>
        {activeTreatmentModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-lg bg-[#0A0D0C] border border-white/15 rounded-none p-8 sm:p-10 text-white space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.35em] text-emerald-400 font-mono font-bold block">
                    RESERVE APPOINTMENT
                  </span>
                  <h4 className="font-cinzel text-xl font-bold uppercase mt-1">{activeTreatmentModal.name}</h4>
                </div>
                <button
                  onClick={() => setActiveTreatmentModal(null)}
                  className="w-9 h-9 rounded-none bg-white/5 flex items-center justify-center text-white/70 hover:text-white border border-white/10 cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {treatmentBooked ? (
                <div className="py-10 text-center space-y-3">
                  <div className="w-12 h-12 rounded-none bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                    <Check size={24} />
                  </div>
                  <h4 className="font-cinzel text-xl font-bold uppercase">Ritual Reserved</h4>
                  <p className="text-xs text-white/60">
                    Your appointment has been scheduled for {selectedTimeSlot}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookTreatment} className="space-y-6">
                  <div className="text-xs font-mono text-white/60 space-y-2 py-4 border-b border-white/10">
                    <div className="flex justify-between">
                      <span>Category</span>
                      <span className="text-white">{activeTreatmentModal.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration</span>
                      <span className="text-emerald-400">{activeTreatmentModal.duration}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-widest text-white/50 mb-3">
                      Preferred Time
                    </label>
                    <div className="grid grid-cols-3 gap-3 text-xs font-mono">
                      {['10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM', '05:00 PM', '06:30 PM'].map((slot) => (
                        <button
                          type="button"
                          key={slot}
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={`py-3 rounded-none border text-center transition-colors cursor-pointer ${
                            selectedTimeSlot === slot
                              ? 'bg-white text-slate-950 font-bold border-white'
                              : 'bg-transparent border-white/15 text-white/70 hover:border-white/40'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-none bg-white hover:bg-emerald-400 hover:text-slate-950 text-slate-950 font-bold text-xs uppercase tracking-[0.25em] transition-all cursor-pointer"
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
