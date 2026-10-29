import React, { useState, useEffect } from 'react';
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { Calendar, Users, Check, Sparkles, ArrowRight, ShieldCheck, ArrowLeft, Star, ChevronDown } from 'lucide-react';
import { motion as framerMotion, AnimatePresence } from 'framer-motion';
import SpaNavbar from './SpaNavbar';
import SpaFooter from './SpaFooter';
import SpaCustomCalendar from './SpaCustomCalendar';
import { SPA_DATA, SpaSuite } from './spaData';

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
  const nights = 3;
  const suiteTotal = selectedSuite.pricePerNight * nights;

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
  const grandTotal = suiteTotal + addonsTotal;

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
      <div className="relative pt-44 pb-20 px-6 md:px-14 bg-[#0A0D0C] border-b border-white/10">
        <div className="max-w-6xl mx-auto text-center space-y-6">
          <span className="text-[10px] uppercase tracking-[0.45em] text-emerald-400 font-mono font-bold block">
            DIRECT RESERVATION PORTAL
          </span>
          <h1 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-bold uppercase text-white tracking-wider">
            BOOK YOUR STAY
          </h1>
          <p className="text-xs sm:text-sm text-white/60 max-w-lg mx-auto font-light leading-relaxed">
            Best rate guaranteed with complimentary thermal mineral spa access and welcome organic herbal tea flight.
          </p>

          {/* STEP INDICATOR */}
          <div className="flex items-center justify-center gap-4 pt-6 text-xs uppercase tracking-widest font-mono">
            <span className={step === 'selection' ? 'text-emerald-400 font-bold' : 'text-white/40'}>
              01. Choose Suite
            </span>
            <span className="text-white/20">&rarr;</span>
            <span className={step === 'details' ? 'text-emerald-400 font-bold' : 'text-white/40'}>
              02. Guest Details
            </span>
            <span className="text-white/20">&rarr;</span>
            <span className={step === 'confirmed' ? 'text-emerald-400 font-bold' : 'text-white/40'}>
              03. Confirmation
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-14 py-20">
        {step === 'selection' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* LEFT: SUITE SELECTOR & ADDONS */}
            <div className="lg:col-span-8 space-y-10">
              {/* DATES & GUEST BAR (SHARP SQUARES) */}
              <div className="p-6 bg-[#0C100E] border border-white/10 space-y-4 shadow-xl">
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

                {/* CUSTOM CALENDAR DRAWER */}
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
                          if (inDate !== outDate) setShowCalendar(false);
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* SUITES SELECTION LIST */}
              <div className="space-y-4">
                <h3 className="font-cinzel text-lg font-bold text-white uppercase tracking-wider">
                  SELECT YOUR SUITE OR VILLA
                </h3>
                <div className="space-y-4">
                  {SPA_DATA.suites.map((suite) => {
                    const isSelected = suite.id === selectedSuiteId;
                    return (
                      <div
                        key={suite.id}
                        onClick={() => setSelectedSuiteId(suite.id)}
                        className={`p-6 border transition-all cursor-pointer flex flex-col md:flex-row gap-6 items-center shadow-xl ${
                          isSelected
                            ? 'bg-[#0E1511] border-emerald-400'
                            : 'bg-[#0C100E] border-white/10 hover:border-white/25'
                        }`}
                      >
                        <img
                          src={suite.heroImage}
                          alt={suite.name}
                          className="w-full md:w-48 h-32 object-cover border border-white/10"
                        />
                        <div className="flex-1 space-y-2 text-left w-full">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-bold">
                              {suite.category}
                            </span>
                            <span className="font-mono text-xs uppercase tracking-wider text-white/60">
                              {suite.sizeSqm} M² · {suite.capacity}
                            </span>
                          </div>
                          <h4 className="font-cinzel text-lg font-bold text-white uppercase">
                            {suite.name}
                          </h4>
                          <p className="text-xs text-white/60 font-light line-clamp-2">
                            {suite.description}
                          </p>
                          <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400/80 pt-1">
                            <Check size={12} />
                            <span>Private sauna, thermal pool access & forest terrace</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ADD-ONS */}
              <div className="space-y-4">
                <h3 className="font-cinzel text-lg font-bold text-white uppercase tracking-wider">
                  BESPOKE ADD-ONS & CONCIERGE PREFERENCES
                </h3>
                <div className="space-y-3">
                  {Object.entries(addonPrices).map(([key, item]) => {
                    const isChecked = addons.includes(key);
                    return (
                      <div
                        key={key}
                        onClick={() => toggleAddon(key)}
                        className={`p-5 border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                          isChecked
                            ? 'bg-[#0E1511] border-emerald-400/80'
                            : 'bg-[#0C100E] border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div>
                          <span className="text-xs font-semibold text-white block">{item.label}</span>
                          <span className="text-[10px] text-white/50 block font-light">{item.desc}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs uppercase text-emerald-400">
                            {isChecked ? 'Selected' : 'Add to Stay'}
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

            {/* RIGHT: SUMMARY STICKY SIDEBAR (SHARP SQUARES) */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 bg-[#0C100E] border border-white/15 p-6 sm:p-8 space-y-6 shadow-2xl">
                <h3 className="font-cinzel text-lg font-bold text-white uppercase pb-4 border-b border-white/10">
                  RESERVATION SUMMARY
                </h3>

                <div className="space-y-3 text-xs font-mono">
                  <div className="flex justify-between text-white/70">
                    <span>Living Space</span>
                    <span className="text-white font-bold">{selectedSuite.name}</span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>Stay Duration</span>
                    <span className="text-white">3 Nights</span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>Inclusions</span>
                    <span className="text-emerald-400">Thermal Spa & Breakfast</span>
                  </div>

                  {addons.length > 0 && (
                    <div className="pt-2 border-t border-white/10 space-y-1 text-white/50 text-[11px]">
                      {addons.map((k) => (
                        <div key={k} className="flex justify-between">
                          <span className="truncate pr-2">{addonPrices[k]?.label}</span>
                          <span className="text-emerald-400">Included</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="pt-4 border-t border-white/10 flex justify-between font-bold text-xs text-white">
                    <span>Concierge Service</span>
                    <span className="text-emerald-400 font-mono">Direct Reservation</span>
                  </div>
                </div>

                <button
                  onClick={() => setStep('details')}
                  className="w-full py-4 bg-white hover:bg-emerald-400 hover:text-slate-950 text-slate-950 font-bold text-xs uppercase tracking-[0.25em] transition-all cursor-pointer shadow-xl flex items-center justify-center gap-2 border border-white/20"
                >
                  <span>CONTINUE TO DETAILS</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 'details' && (
          <div className="max-w-2xl mx-auto bg-[#0C100E] border border-white/15 p-8 sm:p-12 shadow-2xl">
            <form onSubmit={handleFinish} className="space-y-6">
              <div className="border-b border-white/10 pb-4">
                <span className="text-[10px] uppercase tracking-[0.35em] text-emerald-400 font-mono font-bold block mb-1">
                  STEP 02
                </span>
                <h3 className="font-cinzel text-2xl font-bold text-white uppercase">
                  GUEST DETAILS & ARRIVAL
                </h3>
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

                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-mono text-white/60 mb-2">
                    Special Requests / Dietary
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Pillow preference (goose down), champagne on ice upon arrival..."
                    className="w-full px-4 py-3 bg-[#141B18] border border-white/20 text-white text-xs placeholder:text-white/30 focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setStep('selection')}
                  className="inline-flex items-center gap-2 text-xs font-mono text-white/60 hover:text-white uppercase tracking-wider"
                >
                  <ArrowLeft size={14} />
                  <span>BACK TO SUITE</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-4 bg-white hover:bg-emerald-400 hover:text-slate-950 text-slate-950 font-bold text-xs uppercase tracking-[0.25em] transition-all cursor-pointer shadow-xl border border-white/20"
                >
                  {isSubmitting ? 'CONFIRMING...' : 'CONFIRM RESERVATION'}
                </button>
              </div>
            </form>
          </div>
        )}

        {step === 'confirmed' && (
          <div className="max-w-xl mx-auto text-center bg-[#0C100E] border border-white/15 p-10 sm:p-14 space-y-6 shadow-2xl">
            <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <Check size={28} />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.35em] text-emerald-400 font-mono font-bold block">
                BOOKING CONFIRMED · REF #VER-{Math.floor(100000 + Math.random() * 900000)}
              </span>
              <h3 className="font-cinzel text-3xl font-bold uppercase text-white">
                WE AWAIT YOUR ARRIVAL
              </h3>
              <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed">
                A formal reservation itinerary and GPS arrival guide has been sent to {guestEmail || 'your email'}.
              </p>
            </div>

            <div className="p-6 bg-white/[0.02] border border-white/10 text-left text-xs font-mono space-y-2">
              <div className="flex justify-between">
                <span className="text-white/50">Residence:</span>
                <span className="text-white font-bold">{selectedSuite.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Check-in:</span>
                <span className="text-white">{checkIn} (15:00)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Check-out:</span>
                <span className="text-white">{checkOut} (11:00)</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-white/10 font-bold">
                <span className="text-white/50">Status:</span>
                <span className="text-emerald-400 font-mono uppercase">Direct Concierge Request Confirmed</span>
              </div>
            </div>

            <Link
              to="/demo/spa"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-emerald-400 hover:text-slate-950 text-slate-950 font-bold text-xs uppercase tracking-[0.25em] transition-all border border-white/20 cursor-pointer"
            >
              <span>RETURN TO SANCTUARY HOME</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </div>

      <SpaFooter />
    </div>
  );
};

export default SpaBooking;
