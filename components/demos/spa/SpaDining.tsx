import React, { useState, useEffect } from 'react';
import * as RouterDOM from 'react-router-dom';
const { Link, useLocation } = RouterDOM as any;
import { Utensils, Flame, Sparkles, Clock, Wine, Check, ArrowRight, X } from 'lucide-react';
import { motion as framerMotion, AnimatePresence } from 'framer-motion';
import SpaNavbar from './SpaNavbar';
import SpaFooter from './SpaFooter';
import SpaBookingModal from './SpaBookingModal';
import { SPA_DATA } from './spaData';

const motion = framerMotion as any;

export const SpaDining: React.FC = () => {
  const location = useLocation();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [tableModalVenue, setTableModalVenue] = useState<string | null>(null);
  const [tableBooked, setTableBooked] = useState(false);
  const [partySize, setPartySize] = useState('2 Guests');
  const [dinnerTime, setDinnerTime] = useState('19:30');

  useEffect(() => {
    window.scrollTo(0, 0);
    const params = new URLSearchParams(location.search);
    const venueId = params.get('venue');
    if (venueId) {
      setTimeout(() => {
        const el = document.getElementById(venueId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 200);
    }
  }, [location]);

  const handleBookTable = (e: React.FormEvent) => {
    e.preventDefault();
    setTableBooked(true);
    setTimeout(() => {
      setTableBooked(false);
      setTableModalVenue(null);
    }, 1500);
  };

  return (
    <div className="bg-[#070908] text-[#ECE7DF] min-h-screen font-sans selection:bg-emerald-500 selection:text-slate-950">
      <SpaNavbar onOpenBooking={() => setIsBookingOpen(true)} />

      {/* HERO BANNER */}
      <div className="relative pt-44 pb-24 px-6 md:px-14 bg-[#0A0D0C] border-b border-white/10">
        <div className="max-w-6xl mx-auto text-center space-y-6">
          <span className="text-[10px] uppercase tracking-[0.45em] text-emerald-400 font-mono font-bold block">
            CULINARY SANCTUARY & FOREST BARS
          </span>
          <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-bold uppercase text-white tracking-wider">
            FOOD & BEVERAGE
          </h1>
          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-white/60 font-light leading-relaxed">
            From Michelin-caliber foraged gastronomy at Food & Forest to open beechwood hearth grilling at Pich, 
            our dining venues celebrate the organic harvest of our private woods and regional British heritage farms.
          </p>

          {/* FLUID VENUES SHORTCUT BAR (NO ROBOTIC BOXES) */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 pt-8 border-t border-white/10">
            {SPA_DATA.diningVenues.map((v, idx) => (
              <a
                key={v.id}
                href={`#${v.id}`}
                className="group text-xs font-mono uppercase tracking-[0.25em] text-white/50 hover:text-white transition-colors flex items-center gap-2"
              >
                <span className="text-emerald-400 font-bold text-[10px]">0{idx + 1}</span>
                <span className="group-hover:border-b border-emerald-400 pb-0.5">{v.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* DINING VENUES SHOWCASE */}
      <div className="max-w-6xl mx-auto px-6 md:px-14 py-24 space-y-24">
        {SPA_DATA.diningVenues.map((venue, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div
              key={venue.id}
              id={venue.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center p-8 sm:p-14 bg-[#0C100E] border border-white/10 shadow-2xl"
            >
              <div className={`lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="relative overflow-hidden aspect-[16/10] max-h-[380px] border border-white/10 group shadow-xl">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-bold">
                      {venue.cuisine}
                    </span>
                    <h4 className="font-cinzel text-2xl font-bold uppercase mt-1">{venue.name}</h4>
                  </div>
                </div>
              </div>

              <div className={`lg:col-span-5 space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="space-y-2">
                  <span className="font-mono text-xs text-emerald-400 font-bold uppercase">
                    {venue.hours} · {venue.dressCode}
                  </span>
                  <h3 className="font-cinzel text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
                    {venue.name}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-white/65 font-light leading-relaxed">
                  {venue.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-white/10">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-white/40 block font-bold">
                    VENUE HIGHLIGHTS
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {venue.highlights.map((h) => (
                      <div key={h} className="flex items-center gap-2 text-xs text-white/80">
                        <Check size={13} className="text-emerald-400 shrink-0" />
                        <span className="truncate">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-4 border-t border-white/10">
                  <button
                    onClick={() => setTableModalVenue(venue.name)}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-none bg-white hover:bg-emerald-400 hover:text-slate-950 text-slate-950 font-bold text-xs uppercase tracking-[0.25em] transition-all cursor-pointer shadow-lg border border-white/20"
                  >
                    <span>RESERVE TABLE</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* TABLE RESERVATION MODAL */}
      <AnimatePresence>
        {tableModalVenue && (
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
                    TABLE RESERVATION
                  </span>
                  <h4 className="font-cinzel text-xl font-bold uppercase">{tableModalVenue}</h4>
                </div>
                <button
                  onClick={() => setTableModalVenue(null)}
                  className="w-9 h-9 rounded-none bg-white/10 flex items-center justify-center text-white/70 hover:text-white border border-white/15"
                >
                  <X size={16} />
                </button>
              </div>

              {tableBooked ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-none bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                    <Check size={24} />
                  </div>
                  <h4 className="font-cinzel text-xl font-bold uppercase">Table Reserved</h4>
                  <p className="text-xs text-white/60">
                    Your reservation for {partySize} at {dinnerTime} has been confirmed.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookTable} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-mono tracking-widest text-white/50 mb-2">
                        Party Size
                      </label>
                      <select
                        value={partySize}
                        onChange={(e) => setPartySize(e.target.value)}
                        className="w-full bg-[#141B18] border border-white/20 rounded-none px-4 py-3 text-xs font-mono text-white focus:outline-none focus:border-emerald-400"
                      >
                        <option value="1 Guest">1 Guest</option>
                        <option value="2 Guests">2 Guests</option>
                        <option value="4 Guests">4 Guests</option>
                        <option value="6 Guests">6 Guests</option>
                        <option value="8+ Guests (VIP Table)">8+ Guests (VIP Table)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-mono tracking-widest text-white/50 mb-2">
                        Seating Time
                      </label>
                      <select
                        value={dinnerTime}
                        onChange={(e) => setDinnerTime(e.target.value)}
                        className="w-full bg-[#141B18] border border-white/20 rounded-none px-4 py-3 text-xs font-mono text-white focus:outline-none focus:border-emerald-400"
                      >
                        <option value="18:00">18:00 (Early Forest Seating)</option>
                        <option value="19:30">19:30 (Prime Dinner)</option>
                        <option value="21:00">21:00 (Late Gastronomy)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-widest text-white/50 mb-2">
                      Special Dietary Notes / Wine Pairing Requests
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Vegetarian, Sommelier Grand Cru pairing, Anniversary celebration..."
                      className="w-full bg-[#141B18] border border-white/20 rounded-none px-4 py-3 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-none bg-white hover:bg-emerald-400 hover:text-slate-950 text-slate-950 font-bold text-xs uppercase tracking-[0.25em] transition-all cursor-pointer shadow-xl border border-white/20"
                  >
                    CONFIRM TABLE RESERVATION
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

export default SpaDining;
