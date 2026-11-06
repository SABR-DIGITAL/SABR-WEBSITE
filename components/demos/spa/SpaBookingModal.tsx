import React, { useState } from 'react';
import { X, Calendar, Check, ArrowRight } from 'lucide-react';
import { motion as framerMotion, AnimatePresence } from 'framer-motion';
import { SPA_DATA } from './spaData';
import SpaCustomCalendar from './SpaCustomCalendar';

const motion = framerMotion as any;

interface SpaBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSuiteId?: string;
  initialSuiteId?: string;
}

const SpaBookingModal: React.FC<SpaBookingModalProps> = ({
  isOpen,
  onClose,
  defaultSuiteId,
  initialSuiteId
}) => {
  const initial = initialSuiteId || defaultSuiteId || SPA_DATA.suites[0].id;
  const [selectedSuiteId, setSelectedSuiteId] = useState<string>(initial);
  const [checkIn, setCheckIn] = useState<string>('2025-06-12');
  const [checkOut, setCheckOut] = useState<string>('2025-06-15');
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [addons, setAddons] = useState<string[]>(['spa-pass']);
  const [step, setStep] = useState<'details' | 'guest' | 'confirmed'>('details');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedSuite =
    SPA_DATA.suites.find((s) => s.id === selectedSuiteId) || SPA_DATA.suites[0];

  const addonPrices: Record<string, { label: string; desc: string }> = {
    'spa-pass': {
      label: 'Full Thermal Spa & Mineral Pools Access',
      desc: 'Complimentary botanical teas, linen robes, and heated loungers.'
    },
    'stone-ritual': {
      label: 'Couples Nordic Basalt Hot Stone Ritual (90 min)',
      desc: 'Warm volcanic basalt stones and organic pine massage.'
    },
    'tasting-dinner': {
      label: 'Seven-Course Woodland Tasting Menu at Food & Forest',
      desc: 'Evening chef table with sommelier pairing.'
    },
    'transfer': {
      label: 'Private Chauffeur Transfer (London or Heathrow)',
      desc: 'Door-to-door chauffeur service to your residence.'
    }
  };

  const toggleAddon = (key: string) => {
    if (addons.includes(key)) {
      setAddons(addons.filter((k) => k !== key));
    } else {
      setAddons([...addons, key]);
    }
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('confirmed');
    }, 800);
  };

  const handleReset = () => {
    setStep('details');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[140] flex items-center justify-center p-4 md:p-6 overflow-y-auto font-sans">
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-md"
          />

          {/* MODAL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 12 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-3xl bg-[#070908] border border-white/15 shadow-2xl text-white overflow-hidden z-10 my-8"
          >
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between px-6 md:px-10 py-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-emerald-400"></div>
                <h3 className="font-cinzel text-base md:text-lg font-bold uppercase tracking-wider text-white">
                  VERDANT · RESERVE YOUR STAY
                </h3>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer border border-white/10"
              >
                <X size={18} />
              </button>
            </div>

            {step === 'details' && (
              <div className="p-6 md:p-10 space-y-8 max-h-[80vh] overflow-y-auto">
                {/* DATES & GUESTS BAR */}
                <div className="pb-6 border-b border-white/10 space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => setShowCalendar(!showCalendar)}
                      className="flex items-center gap-3 py-2 text-left cursor-pointer group"
                    >
                      <Calendar size={16} className="text-emerald-400 shrink-0" />
                      <div>
                        <span className="block text-[9px] uppercase font-mono tracking-widest text-white/50">STAY DATES</span>
                        <span className="text-xs font-mono font-bold text-white group-hover:text-emerald-400 transition-colors">
                          {checkIn} → {checkOut}
                        </span>
                      </div>
                    </button>

                    <div className="flex items-center gap-6 text-xs font-mono">
                      <div>
                        <label className="block text-[9px] uppercase text-white/50 tracking-wider mb-1">Adults</label>
                        <select
                          value={adults}
                          onChange={(e) => setAdults(Number(e.target.value))}
                          className="bg-[#070908] border-b border-white/20 py-1.5 text-white focus:outline-none focus:border-emerald-400"
                        >
                          <option value={1}>1 Adult</option>
                          <option value={2}>2 Adults</option>
                          <option value={3}>3 Adults</option>
                          <option value={4}>4 Adults</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[9px] uppercase text-white/50 tracking-wider mb-1">Children</label>
                        <select
                          value={children}
                          onChange={(e) => setChildren(Number(e.target.value))}
                          className="bg-[#070908] border-b border-white/20 py-1.5 text-white focus:outline-none focus:border-emerald-400"
                        >
                          <option value={0}>0</option>
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {showCalendar && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden pt-2"
                      >
                        <SpaCustomCalendar
                          checkIn={checkIn}
                          checkOut={checkOut}
                          onChange={(inDate, outDate) => {
                            setCheckIn(inDate);
                            setCheckOut(outDate);
                            if (inDate !== outDate) {
                              setShowCalendar(false);
                            }
                          }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* SUITES SELECTION (CLEAN TYPOGRAPHY, NO TINY PHOTOS) */}
                <div className="space-y-4">
                  <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-mono font-bold block">
                    01 · SELECT RESIDENCE
                  </span>
                  <div className="divide-y divide-white/10 border-y border-white/10">
                    {SPA_DATA.suites.map((s) => {
                      const isSelected = s.id === selectedSuiteId;
                      return (
                        <div
                          key={s.id}
                          onClick={() => setSelectedSuiteId(s.id)}
                          className="py-5 transition-all cursor-pointer flex items-center justify-between gap-4"
                        >
                          <div className="space-y-1">
                            <h4 className="font-cinzel text-sm sm:text-base font-bold text-white uppercase">
                              {s.name}
                            </h4>
                            <p className="text-xs text-emerald-400/90 font-mono">
                              {s.sizeSqm} M² · {s.capacity}
                            </p>
                          </div>
                          <div
                            className={`w-4 h-4 border flex items-center justify-center shrink-0 ${
                              isSelected ? 'bg-emerald-400 border-emerald-400 text-slate-950' : 'border-white/30'
                            }`}
                          >
                            {isSelected && <Check size={10} strokeWidth={3} />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* ADDONS */}
                <div className="space-y-4">
                  <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-mono font-bold block">
                    02 · OPTIONAL EXPERIENCES
                  </span>
                  <div className="divide-y divide-white/10 border-y border-white/10">
                    {Object.entries(addonPrices).map(([key, item]) => {
                      const isChecked = addons.includes(key);
                      return (
                        <div
                          key={key}
                          onClick={() => toggleAddon(key)}
                          className="py-4 transition-all cursor-pointer flex items-center justify-between gap-4"
                        >
                          <div className="pr-2 space-y-1">
                            <span className="text-xs sm:text-sm font-medium text-white block">{item.label}</span>
                            <span className="text-xs text-white/50 block font-light">{item.desc}</span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <div
                              className={`w-4 h-4 border flex items-center justify-center ${
                                isChecked ? 'bg-emerald-400 border-emerald-400 text-slate-950' : 'border-white/30'
                              }`}
                            >
                              {isChecked && <Check size={10} strokeWidth={3} />}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* FOOTER ACTION BAR */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-white/45 block">SELECTED RESIDENCE</span>
                    <span className="font-cinzel text-base font-bold text-white uppercase">
                      {selectedSuite.name} <span className="text-xs font-mono text-emerald-400 font-normal">· {selectedSuite.sizeSqm} m²</span>
                    </span>
                  </div>

                  <button
                    onClick={() => setStep('guest')}
                    className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-emerald-400 hover:text-slate-950 text-slate-950 font-bold text-xs uppercase tracking-[0.25em] transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>CONTINUE</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {step === 'guest' && (
              <form onSubmit={handleConfirmBooking} className="p-6 md:p-10 space-y-6 max-h-[80vh] overflow-y-auto">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-mono font-bold block">
                    03 · GUEST DETAILS
                  </span>
                  <h4 className="font-cinzel text-xl font-bold uppercase text-white">
                    PRIMARY GUEST CONTACT
                  </h4>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-mono text-white/50 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="Vivienne Montgomery"
                      className="w-full py-3 bg-transparent border-b border-white/20 text-white text-sm focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-mono text-white/50 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        placeholder="vivienne@domain.co.uk"
                        className="w-full py-3 bg-transparent border-b border-white/20 text-white text-sm focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-mono text-white/50 mb-2">
                        Telephone Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        placeholder="+44 7911 123456"
                        className="w-full py-3 bg-transparent border-b border-white/20 text-white text-sm focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep('details')}
                    className="text-xs font-mono text-white/60 hover:text-white uppercase tracking-wider cursor-pointer"
                  >
                    ← BACK
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3.5 bg-white hover:bg-emerald-400 hover:text-slate-950 text-slate-950 font-bold text-xs uppercase tracking-[0.25em] transition-all cursor-pointer"
                  >
                    {isSubmitting ? 'CONFIRMING...' : 'COMPLETE RESERVATION'}
                  </button>
                </div>
              </form>
            )}

            {step === 'confirmed' && (
              <div className="p-8 sm:p-12 text-center space-y-6">
                <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <Check size={24} />
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.35em] text-emerald-400 font-mono font-bold block">
                    RESERVATION CONFIRMED
                  </span>
                  <h3 className="font-cinzel text-2xl font-bold uppercase text-white">
                    WE LOOK FORWARD TO WELCOMING YOU
                  </h3>
                  <p className="text-sm text-white/60 max-w-md mx-auto font-light leading-relaxed">
                    A confirmation itinerary has been sent to {guestEmail || 'your email'}.
                  </p>
                </div>

                <button
                  onClick={handleReset}
                  className="px-8 py-3.5 bg-white hover:bg-emerald-400 hover:text-slate-950 text-slate-950 font-bold text-xs uppercase tracking-[0.25em] transition-all cursor-pointer"
                >
                  CLOSE
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SpaBookingModal;
