import React, { useState, useEffect } from 'react';
import * as RouterDOM from 'react-router-dom';
const { useLocation } = RouterDOM as any;
import { Check, ArrowRight, X } from 'lucide-react';
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
      <section className="relative pt-28 pb-14 sm:pt-36 sm:pb-20 md:pt-48 md:pb-28 px-5 sm:px-6 md:px-14 bg-[#070908] border-b border-white/10">
        <div className="max-w-5xl mx-auto text-center space-y-4 sm:space-y-6">
          <span className="text-[10px] uppercase tracking-[0.45em] text-emerald-400 font-mono font-bold block">
            GASTRONOMY & WOODLAND LOUNGES
          </span>
          <h1 className="font-cinzel text-3xl sm:text-6xl md:text-7xl font-bold uppercase text-white tracking-wider">
            FOOD & BEVERAGE
          </h1>
          <p className="max-w-xl mx-auto text-sm sm:text-base text-white/60 font-light leading-relaxed">
            From seasonal woodland dining at Food & Forest to open-flame cooking at The Hearth, our four dining rooms celebrate estate-grown produce and regional British farms.
          </p>
        </div>
      </section>

      {/* ALL DINING VENUES IN ONE CONTINUOUS ALTERNATING LEFT/RIGHT SCROLL SHOWCASE */}
      <section className="max-w-7xl mx-auto px-5 sm:px-6 md:px-14 py-16 sm:py-28 md:py-48 space-y-16 sm:space-y-32 md:space-y-44">
        {SPA_DATA.diningVenues.map((venue, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <motion.div
              key={venue.id}
              id={venue.id}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-16 lg:gap-24 items-center pb-16 sm:pb-28 md:pb-36 border-b border-white/10 last:border-b-0 last:pb-0"
            >
              {/* CLEAN 4K VENUE PHOTOGRAPHY */}
              <div className={`lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="relative overflow-hidden aspect-[16/10] bg-[#0C100E] group">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* VENUE EDITORIAL DETAILS */}
              <div className={`lg:col-span-5 space-y-6 sm:space-y-8 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="space-y-2.5 sm:space-y-3">
                  <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest block">
                    0{idx + 1} · {venue.hours} · {venue.dressCode}
                  </span>
                  <h2 className="font-cinzel text-2xl sm:text-4xl font-bold uppercase tracking-tight text-white">
                    {venue.name}
                  </h2>
                  <p className="font-cormorant text-xl italic text-white/80">
                    {venue.cuisine}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-white/65 font-light leading-relaxed">
                  {venue.description}
                </p>

                {venue.signatureDish && (
                  <div className="py-5 sm:py-6 border-y border-white/10 space-y-2">
                    <span className="text-xs uppercase font-mono tracking-[0.25em] text-white/45 block">
                      SIGNATURE DISH
                    </span>
                    <p className="font-cormorant italic text-xl sm:text-2xl text-white/95">
                      {venue.signatureDish}
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap gap-x-6 sm:gap-x-8 gap-y-2 text-xs sm:text-sm text-white/75 font-mono">
                  {venue.highlights.map((h) => (
                    <span key={h}>{h}</span>
                  ))}
                </div>

                <div className="pt-1 sm:pt-2">
                  <button
                    onClick={() => setTableModalVenue(venue.name)}
                    className="inline-flex items-center justify-center w-full sm:w-auto gap-3 px-8 py-4 rounded-none bg-white hover:bg-emerald-400 hover:text-slate-950 text-slate-950 font-bold text-xs uppercase tracking-[0.25em] transition-all cursor-pointer"
                  >
                    <span>RESERVE A TABLE</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* TABLE RESERVATION MODAL */}
      <AnimatePresence>
        {tableModalVenue && (
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
                    TABLE RESERVATION
                  </span>
                  <h4 className="font-cinzel text-xl font-bold uppercase mt-1">{tableModalVenue}</h4>
                </div>
                <button
                  onClick={() => setTableModalVenue(null)}
                  className="w-9 h-9 rounded-none bg-white/5 flex items-center justify-center text-white/70 hover:text-white border border-white/10 cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {tableBooked ? (
                <div className="py-10 text-center space-y-3">
                  <div className="w-12 h-12 rounded-none bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                    <Check size={24} />
                  </div>
                  <h4 className="font-cinzel text-xl font-bold uppercase">Table Reserved</h4>
                  <p className="text-xs text-white/60">
                    Your reservation for {partySize} at {dinnerTime} has been confirmed.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookTable} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] uppercase font-mono tracking-widest text-white/50 mb-2">
                        Party Size
                      </label>
                      <select
                        value={partySize}
                        onChange={(e) => setPartySize(e.target.value)}
                        className="w-full bg-[#070908] border-b border-white/20 px-0 py-3 text-xs font-mono text-white focus:outline-none focus:border-emerald-400"
                      >
                        <option value="1 Guest">1 Guest</option>
                        <option value="2 Guests">2 Guests</option>
                        <option value="4 Guests">4 Guests</option>
                        <option value="6 Guests">6 Guests</option>
                        <option value="8+ Guests">8+ Guests (Private Table)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-mono tracking-widest text-white/50 mb-2">
                        Seating Time
                      </label>
                      <select
                        value={dinnerTime}
                        onChange={(e) => setDinnerTime(e.target.value)}
                        className="w-full bg-[#070908] border-b border-white/20 px-0 py-3 text-xs font-mono text-white focus:outline-none focus:border-emerald-400"
                      >
                        <option value="18:00">18:00 (Early Evening)</option>
                        <option value="19:30">19:30 (Evening Service)</option>
                        <option value="21:00">21:00 (Late Seating)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-widest text-white/50 mb-2">
                      Dietary Preferences or Requests
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Vegetarian, sommelier wine pairing, celebration notes..."
                      className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-none bg-white hover:bg-emerald-400 hover:text-slate-950 text-slate-950 font-bold text-xs uppercase tracking-[0.25em] transition-all cursor-pointer"
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
