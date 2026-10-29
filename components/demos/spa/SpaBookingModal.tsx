import React, { useState } from 'react';
import { X, Calendar, Users, Sparkles, Check, ArrowRight, ShieldCheck, Clock, MapPin } from 'lucide-react';
import { motion as framerMotion, AnimatePresence } from 'framer-motion';
import { SPA_DATA, SpaSuite } from './spaData';
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

  const nights = 3;
  const roomTotal = selectedSuite.pricePerNight * nights;

  const addonPrices: Record<string, { label: string; price: number; desc: string }> = {
    'spa-pass': {
      label: 'Unlimited Thermal Spa & Mineral Pools Pass',
      price: 90,
      desc: 'Complimentary herbal teas, thermal robe and reserved heated lounger.'
    },
    'stone-ritual': {
      label: 'Couples Nordic Hot Stone Ritual (90 min)',
      price: 340,
      desc: 'Volcanic basalt stones and organic pine arnica massage.'
    },
    'tasting-dinner': {
      label: 'Food & Forest 8-Course Tasting Menu with Wine Pairing',
      price: 260,
      desc: 'Private chef table overlooking the dusk pine reserve.'
    },
    'transfer': {
      label: 'Private Luxury Electric SUV Transfer (London / Heathrow)',
      price: 180,
      desc: 'Chauffeur driven directly to your suite door.'
    }
  };

  const addonsTotal = addons.reduce((sum, key) => sum + (addonPrices[key]?.price || 0), 0);
  const grandTotal = roomTotal + addonsTotal;

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

          {/* MODAL CARD (SHARP SQUARES) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-4xl bg-[#0A0D0C] border border-white/15 shadow-2xl text-white overflow-hidden z-10 my-8"
          >
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between px-6 md:px-10 py-6 border-b border-white/10 bg-[#070908]">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-400"></div>
                <h3 className="font-cinzel text-base md:text-lg font-bold uppercase tracking-wider text-white">
                  VERDANT · DIRECT RESERVATION
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
                <div className="p-5 bg-[#0C100E] border border-white/10 space-y-4 shadow-xl">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => setShowCalendar(!showCalendar)}
                      className="flex items-center gap-3 px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/15 text-left w-full sm:w-auto cursor-pointer transition-colors"
                    >
                      <Calendar size={16} className="text-emerald-400 shrink-0" />
                      <div>
                        <span className="block text-[9px] uppercase font-mono tracking-widest text-white/50">STAY DATES</span>
                        <span className="text-xs font-mono font-bold text-white">
                          {checkIn} → {checkOut}
                        </span>
                      </div>
                    </button>

                    <div className="flex items-center gap-4 w-full sm:w-auto justify-end text-xs font-mono">
                      <div>
                        <label className="block text-[9px] uppercase text-white/50 tracking-wider mb-1">Adults</label>
                        <select
                          value={adults}
                          onChange={(e) => setAdults(Number(e.target.value))}
                          className="bg-[#141B18] border border-white/20 px-3 py-2 text-white focus:outline-none focus:border-emerald-400"
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
                          className="bg-[#141B18] border border-white/20 px-3 py-2 text-white focus:outline-none focus:border-emerald-400"
                        >
                          <option value={0}>0</option>
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* EMBEDDED CUSTOM DARK CALENDAR */}
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

                {/* SUITES SELECTION */}
                <div className="space-y-3">
                  <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-mono font-bold block">
                    STEP 01 · SELECT SUITE OR RESIDENCE
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {SPA_DATA.suites.map((s) => {
                      const isSelected = s.id === selectedSuiteId;
                      return (
                        <div
                          key={s.id}
                          onClick={() => setSelectedSuiteId(s.id)}
                          className={`p-5 border transition-all cursor-pointer flex gap-4 items-center ${
                            isSelected
                              ? 'bg-[#0E1511] border-emerald-400 shadow-xl'
                              : 'bg-[#0C100E] border-white/10 hover:border-white/25'
                          }`}
                        >
                          <img
                            src={s.heroImage}
                            alt={s.name}
                            className="w-20 h-20 object-cover border border-white/10 shrink-0"
                          />
                          <div className="space-y-1">
                            <h4 className="font-cinzel text-xs font-bold text-white uppercase line-clamp-1">
                              {s.name}
                            </h4>
                            <p className="text-[11px] font-mono text-emerald-400 font-bold uppercase">
                              {s.category}
                            </p>
                            <p className="text-[10px] text-white/50 font-mono">
                              {s.sizeSqm} M² · {s.capacity}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* ADDONS */}
                <div className="space-y-3">
                  <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-mono font-bold block">
                    STEP 02 · SELECT BESPOKE EXPERIENCES
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.entries(addonPrices).map(([key, item]) => {
                      const isChecked = addons.includes(key);
                      return (
                        <div
                          key={key}
                          onClick={() => toggleAddon(key)}
                          className={`p-4 border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                            isChecked
                              ? 'bg-[#0E1511] border-emerald-400/80'
                              : 'bg-[#0C100E] border-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className="pr-2">
                            <span className="text-xs font-semibold text-white block">{item.label}</span>
                            <span className="text-[10px] text-white/50 block font-light">{item.desc}</span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="font-mono text-xs uppercase text-emerald-400">
                              {isChecked ? 'Included' : 'Add'}
                            </span>
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
                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-white/50 block">SELECTED RESIDENCE</span>
                    <span className="font-cinzel text-base font-bold text-white uppercase">
                      {selectedSuite.name} <span className="text-xs font-mono text-emerald-400 font-normal">({nights} NIGHTS)</span>
                    </span>
                  </div>

                  <button
                    onClick={() => setStep('guest')}
                    className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-emerald-400 hover:text-slate-950 text-slate-950 font-bold text-xs uppercase tracking-[0.25em] transition-all cursor-pointer shadow-xl flex items-center justify-center gap-2 border border-white/20"
                  >
                    <span>CONTINUE TO GUEST INFO</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {step === 'guest' && (
              <form onSubmit={handleConfirmBooking} className="p-6 md:p-10 space-y-6 max-h-[80vh] overflow-y-auto">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-mono font-bold block">
                    STEP 03 · GUEST INFORMATION
                  </span>
                  <h4 className="font-cinzel text-xl font-bold uppercase text-white">
                    PRIMARY GUEST CONTACT
                  </h4>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-mono text-white/60 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="e.g. Lady Vivienne Montgomery"
                      className="w-full px-4 py-3 bg-[#141B18] border border-white/20 text-white text-xs focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-mono text-white/60 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        placeholder="vivienne@montgomery.co.uk"
                        className="w-full px-4 py-3 bg-[#141B18] border border-white/20 text-white text-xs focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-mono text-white/60 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        placeholder="+44 7911 123456"
                        className="w-full px-4 py-3 bg-[#141B18] border border-white/20 text-white text-xs focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white/[0.02] border border-white/10 text-xs font-mono space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white/50">Selected Residence:</span>
                    <span className="text-white font-bold">{selectedSuite.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Service Level:</span>
                    <span className="text-emerald-400 font-bold uppercase">Private Concierge Reservation</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep('details')}
                    className="text-xs font-mono text-white/60 hover:text-white uppercase tracking-wider"
                  >
                    ← BACK
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3.5 bg-white hover:bg-emerald-400 hover:text-slate-950 text-slate-950 font-bold text-xs uppercase tracking-[0.25em] transition-all cursor-pointer shadow-xl border border-white/20"
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
                  <p className="text-xs text-white/60 max-w-md mx-auto leading-relaxed">
                    A confirmation folio has been sent to {guestEmail || 'your email'}. Our concierge team will reach out to organize your arrival logistics.
                  </p>
                </div>

                <button
                  onClick={handleReset}
                  className="px-8 py-3.5 bg-white hover:bg-emerald-400 hover:text-slate-950 text-slate-950 font-bold text-xs uppercase tracking-[0.25em] transition-all cursor-pointer border border-white/20"
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
