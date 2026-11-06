import React, { useState, useEffect } from 'react';
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { Calendar, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion as framerMotion, AnimatePresence } from 'framer-motion';
import SpaNavbar from './SpaNavbar';
import SpaFooter from './SpaFooter';
import SpaCustomCalendar from './SpaCustomCalendar';
import { SPA_DATA } from './spaData';

const motion = framerMotion as any;

export const SpaBooking: React.FC = () => {
  const [selectedSuiteId, setSelectedSuiteId] = useState<string>(SPA_DATA.suites[0].id);
  const [checkIn, setCheckIn] = useState('2025-06-12');
  const [checkOut, setCheckOut] = useState('2025-06-15');
  const [showCalendar, setShowCalendar] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [addons, setAddons] = useState<string[]>(['spa-pass']);
  const [step, setStep] = useState<'selection' | 'details' | 'confirmed'>('selection');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const selectedSuite = SPA_DATA.suites.find((s) => s.id === selectedSuiteId) || SPA_DATA.suites[0];

  const addonPrices: Record<string, { label: string; desc: string }> = {
    'spa-pass': {
      label: 'Full Thermal Spa & Mineral Pools Access',
      desc: 'Complimentary botanical infusions, linen robes, and heated poolside loungers.'
    },
    'stone-ritual': {
      label: 'Couples Nordic Basalt Hot Stone Ritual (90 Minutes)',
      desc: 'Warm volcanic river stones with organic pine and cedarwood oils.'
    },
    'tasting-dinner': {
      label: 'Seven-Course Woodland Tasting Menu at Food & Forest',
      desc: 'Evening tasting menu with sommelier wine pairing overlooking the pine reserve.'
    },
    'transfer': {
      label: 'Private Chauffeur Transfer (London or Heathrow)',
      desc: 'Door-to-door collection in our Mercedes-Maybach or Range Rover fleet.'
    }
  };

  const toggleAddon = (key: string) => {
    if (addons.includes(key)) {
      setAddons(addons.filter((k) => k !== key));
    } else {
      setAddons([...addons, key]);
    }
  };

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('confirmed');
    }, 900);
  };

  return (
    <div className="bg-[#070908] text-[#ECE7DF] min-h-screen font-sans selection:bg-emerald-500 selection:text-slate-950">
      <SpaNavbar />

      {/* BANNER */}
      <section className="relative pt-28 pb-14 sm:pt-36 sm:pb-20 md:pt-52 md:pb-28 px-5 sm:px-6 md:px-14 bg-[#070908] border-b border-white/10">
        <div className="max-w-5xl mx-auto text-center space-y-4 sm:space-y-6">
          <span className="text-[10px] uppercase tracking-[0.45em] text-emerald-400 font-mono font-bold block">
            DIRECT RESERVATIONS
          </span>
          <h1 className="font-cinzel text-3xl sm:text-6xl font-bold uppercase text-white tracking-wider">
            RESERVE YOUR STAY
          </h1>
          <p className="text-sm sm:text-base text-white/60 max-w-lg mx-auto font-light leading-relaxed">
            Every reservation includes full access to our geothermal mineral pools, cedar saunas, and morning woodland breakfast.
          </p>

          {/* STEP INDICATOR */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-4 sm:pt-6 text-[10px] sm:text-xs uppercase tracking-widest font-mono">
            <span className={step === 'selection' ? 'text-emerald-400 font-bold' : 'text-white/35'}>
              01 · Residence
            </span>
            <span className="text-white/20">—</span>
            <span className={step === 'details' ? 'text-emerald-400 font-bold' : 'text-white/35'}>
              02 · Guest Details
            </span>
            <span className="text-white/20">—</span>
            <span className={step === 'confirmed' ? 'text-emerald-400 font-bold' : 'text-white/35'}>
              03 · Confirmation
            </span>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 sm:px-6 md:px-14 py-16 sm:py-24 md:py-40">
        {step === 'selection' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 lg:gap-24 items-start">
            {/* LEFT: SUITE SELECTOR & ADDONS (NO SMALL PHOTOS) */}
            <div className="lg:col-span-8 space-y-12 sm:space-y-20">
              {/* DATES & GUEST BAR */}
              <div className="pb-8 sm:pb-10 border-b border-white/10 space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <button
                    type="button"
                    onClick={() => setShowCalendar(!showCalendar)}
                    className="flex items-center gap-4 py-2 text-left cursor-pointer group"
                  >
                    <Calendar size={18} className="text-emerald-400 shrink-0" />
                    <div>
                      <span className="block text-[10px] uppercase font-mono tracking-widest text-white/45">
                        ARRIVAL & DEPARTURE
                      </span>
                      <span className="text-sm sm:text-base font-mono text-white group-hover:text-emerald-400 transition-colors">
                        {checkIn} → {checkOut}
                      </span>
                    </div>
                  </button>

                  <div className="flex items-center gap-8 text-xs font-mono">
                    <div>
                      <label className="block text-[10px] uppercase text-white/45 tracking-widest mb-1">Adults</label>
                      <select
                        value={adults}
                        onChange={(e) => setAdults(Number(e.target.value))}
                        className="bg-[#070908] border-b border-white/20 py-2 text-sm text-white focus:outline-none focus:border-emerald-400"
                      >
                        <option value={1}>1 Adult</option>
                        <option value={2}>2 Adults</option>
                        <option value={3}>3 Adults</option>
                        <option value={4}>4 Adults</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase text-white/45 tracking-widest mb-1">Children</label>
                      <select
                        value={children}
                        onChange={(e) => setChildren(Number(e.target.value))}
                        className="bg-[#070908] border-b border-white/20 py-2 text-sm text-white focus:outline-none focus:border-emerald-400"
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
                      className="overflow-hidden pt-4"
                    >
                      <SpaCustomCalendar
                        checkIn={checkIn}
                        checkOut={checkOut}
                        onChange={(inDate, outDate) => {
                          setCheckIn(inDate);
                          setCheckOut(outDate);
                          if (inDate !== outDate) setShowCalendar(false);
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* SUITES SELECTION LIST (TYPOGRAPHIC ONLY — NO SMALL HARD-TO-SEE PHOTOS) */}
              <div className="space-y-6 sm:space-y-8">
                <span className="text-[10px] uppercase tracking-[0.35em] text-emerald-400 font-mono font-bold block">
                  01 · SELECT YOUR RESIDENCE
                </span>
                <div className="divide-y divide-white/10 border-y border-white/10">
                  {SPA_DATA.suites.map((suite, idx) => {
                    const isSelected = suite.id === selectedSuiteId;
                    return (
                      <div
                        key={suite.id}
                        onClick={() => setSelectedSuiteId(suite.id)}
                        className="py-7 sm:py-10 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 group"
                      >
                        <div className="space-y-2.5 sm:space-y-3 max-w-xl">
                          <div className="flex items-center gap-4">
                            <span className="text-xs uppercase font-mono tracking-[0.25em] text-emerald-400 font-bold">
                              0{idx + 1} · {suite.sizeSqm} M² · {suite.capacity}
                            </span>
                          </div>
                          <h4 className="font-cinzel text-xl sm:text-3xl font-bold text-white uppercase">
                            {suite.name}
                          </h4>
                          <p className="text-sm text-white/60 font-light leading-relaxed">
                            {suite.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <span className={`font-mono text-xs uppercase tracking-[0.25em] ${isSelected ? 'text-emerald-400 font-bold' : 'text-white/40 group-hover:text-white'}`}>
                            {isSelected ? 'Selected' : 'Select'}
                          </span>
                          <div
                            className={`w-5 h-5 border flex items-center justify-center ${
                              isSelected ? 'bg-emerald-400 border-emerald-400 text-slate-950' : 'border-white/30'
                            }`}
                          >
                            {isSelected && <Check size={12} strokeWidth={3} />}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ADD-ONS */}
              <div className="space-y-6 sm:space-y-8">
                <span className="text-[10px] uppercase tracking-[0.35em] text-emerald-400 font-mono font-bold block">
                  02 · TAILORED EXPERIENCES
                </span>
                <div className="divide-y divide-white/10 border-y border-white/10">
                  {Object.entries(addonPrices).map(([key, item]) => {
                    const isChecked = addons.includes(key);
                    return (
                      <div
                        key={key}
                        onClick={() => toggleAddon(key)}
                        className="py-6 sm:py-7 transition-all cursor-pointer flex items-center justify-between gap-4 sm:gap-6"
                      >
                        <div className="space-y-1.5">
                          <span className="text-sm sm:text-base font-medium text-white block">{item.label}</span>
                          <span className="text-xs sm:text-sm text-white/55 block font-light">{item.desc}</span>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="font-mono text-xs uppercase tracking-widest text-emerald-400">
                            {isChecked ? 'Included' : 'Add'}
                          </span>
                          <div
                            className={`w-5 h-5 border flex items-center justify-center ${
                              isChecked ? 'bg-emerald-400 border-emerald-400 text-slate-950' : 'border-white/30'
                            }`}
                          >
                            {isChecked && <Check size={12} strokeWidth={3} />}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* RIGHT: SUMMARY STICKY COLUMN */}
            <div className="lg:col-span-4">
              <div className="sticky top-32 pt-8 border-t border-white/20 space-y-6 sm:space-y-8">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.35em] text-emerald-400 font-mono font-bold block">
                    RESERVATION SUMMARY
                  </span>
                  <h3 className="font-cinzel text-2xl font-bold text-white uppercase">
                    {selectedSuite.name}
                  </h3>
                  <span className="text-sm font-mono text-white/60 block">
                    {selectedSuite.sizeSqm} m² · {selectedSuite.capacity}
                  </span>
                </div>

                <div className="space-y-4 text-xs font-mono py-6 border-y border-white/10">
                  <div className="flex justify-between text-white/60">
                    <span>Dates</span>
                    <span className="text-white">{checkIn} → {checkOut}</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Guests</span>
                    <span className="text-white">{adults} Adults{children > 0 ? `, ${children} Children` : ''}</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Inclusions</span>
                    <span className="text-emerald-400">Thermal Spa & Breakfast</span>
                  </div>

                  {addons.length > 0 && (
                    <div className="pt-4 border-t border-white/10 space-y-2 text-white/50 text-[11px]">
                      {addons.map((k) => (
                        <div key={k} className="flex justify-between">
                          <span className="truncate pr-2">{addonPrices[k]?.label}</span>
                          <span className="text-emerald-400">Added</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setStep('details')}
                  className="w-full py-4 bg-white hover:bg-emerald-400 hover:text-slate-950 text-slate-950 font-bold text-xs uppercase tracking-[0.25em] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>CONTINUE TO GUEST DETAILS</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 'details' && (
          <div className="max-w-xl mx-auto space-y-8 sm:space-y-10">
            <form onSubmit={handleFinish} className="space-y-6 sm:space-y-8">
              <div className="border-b border-white/10 pb-6 space-y-2">
                <span className="text-[10px] uppercase tracking-[0.35em] text-emerald-400 font-mono font-bold block">
                  STEP 02
                </span>
                <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white uppercase">
                  GUEST DETAILS & ARRIVAL
                </h3>
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
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

                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-mono text-white/50 mb-2">
                    Special Requests or Dietary Notes
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Arrival time, dietary preferences, or pillow selection..."
                    className="w-full py-3 bg-transparent border-b border-white/20 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setStep('selection')}
                  className="inline-flex items-center justify-center sm:justify-start gap-2 text-xs font-mono text-white/60 hover:text-white uppercase tracking-wider cursor-pointer py-2 sm:py-0"
                >
                  <ArrowLeft size={14} />
                  <span>BACK</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-10 py-4 bg-white hover:bg-emerald-400 hover:text-slate-950 text-slate-950 font-bold text-xs uppercase tracking-[0.25em] transition-all cursor-pointer"
                >
                  {isSubmitting ? 'CONFIRMING...' : 'COMPLETE RESERVATION'}
                </button>
              </div>
            </form>
          </div>
        )}

        {step === 'confirmed' && (
          <div className="max-w-xl mx-auto text-center space-y-8 py-10 sm:py-12 border-y border-white/10">
            <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <Check size={28} />
            </div>

            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-[0.35em] text-emerald-400 font-mono font-bold block">
                RESERVATION CONFIRMED
              </span>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold uppercase text-white">
                WE LOOK FORWARD TO WELCOMING YOU
              </h3>
              <p className="text-sm text-white/60 font-light leading-relaxed">
                A formal reservation itinerary and directions have been sent to {guestEmail || 'your email'}.
              </p>
            </div>

            <div className="py-6 border-y border-white/10 text-left text-xs font-mono space-y-3">
              <div className="flex justify-between">
                <span className="text-white/50">Residence</span>
                <span className="text-white font-bold">{selectedSuite.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Check-In</span>
                <span className="text-white">{checkIn} (From 15:00)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Check-Out</span>
                <span className="text-white">{checkOut} (Until 11:00)</span>
              </div>
            </div>

            <Link
              to="/demo/spa"
              className="inline-flex items-center justify-center w-full sm:w-auto gap-3 px-8 py-4 bg-white hover:bg-emerald-400 hover:text-slate-950 text-slate-950 font-bold text-xs uppercase tracking-[0.25em] transition-all cursor-pointer"
            >
              <span>RETURN TO SANCTUARY HOME</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </section>

      <SpaFooter />
    </div>
  );
};

export default SpaBooking;
