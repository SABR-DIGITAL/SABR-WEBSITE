import React, { useState, useEffect } from 'react';
import { motion as framerMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SpaNavbar from './SpaNavbar';
import SpaFooter from './SpaFooter';
import SpaBookingModal from './SpaBookingModal';
import { SPA_DATA } from './spaData';

const motion = framerMotion as any;

export const SpaSuites: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedSuiteForBooking, setSelectedSuiteForBooking] = useState<string>(SPA_DATA.suites[0].id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openBooking = (suiteId: string) => {
    setSelectedSuiteForBooking(suiteId);
    setIsBookingOpen(true);
  };

  return (
    <div className="bg-[#070908] text-[#ECE7DF] min-h-screen font-sans selection:bg-emerald-500 selection:text-slate-950">
      <SpaNavbar onOpenBooking={() => setIsBookingOpen(true)} />

      {/* HERO BANNER */}
      <section className="relative pt-28 pb-14 sm:pt-36 sm:pb-20 md:pt-52 md:pb-32 px-5 sm:px-6 md:px-14 bg-[#070908] border-b border-white/10">
        <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
          <span className="text-[10px] uppercase tracking-[0.45em] text-emerald-400 font-mono font-bold block">
            LIVING SPACES & RESIDENCES
          </span>
          <h1 className="font-cinzel text-3xl sm:text-6xl md:text-7xl font-bold uppercase text-white tracking-wider">
            SUITES & VILLAS
          </h1>
          <p className="max-w-xl mx-auto text-sm sm:text-base text-white/60 font-light leading-relaxed">
            Crafted from natural timber, limestone, and floor-to-ceiling glass, each residence offers quiet immersion within our 180-acre pine reserve.
          </p>
        </div>
      </section>

      {/* ALL RESIDENCES IN ONE CONTINUOUS ALTERNATING LEFT / RIGHT SCROLL SHOWCASE */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 md:px-14 py-16 sm:py-28 md:py-56 space-y-16 sm:space-y-32 md:space-y-64">
        {SPA_DATA.suites.map((suite, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <motion.div
              key={suite.id}
              id={suite.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-16 lg:gap-24 items-center"
            >
              {/* 4K PHOTOGRAPHY (CLEAN, NO TINY THUMBNAILS) */}
              <div className={`lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="relative overflow-hidden aspect-[16/10] bg-[#0C100E] group">
                  <img
                    src={suite.heroImage}
                    alt={suite.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* SUITE EDITORIAL DETAILS */}
              <div className={`lg:col-span-5 space-y-6 sm:space-y-8 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="space-y-2.5 sm:space-y-3">
                  <span className="font-mono text-xs text-emerald-400 uppercase tracking-[0.28em] font-bold block">
                    0{idx + 1} · {suite.capacity}
                  </span>
                  <h2 className="font-cinzel text-2xl sm:text-4xl font-bold uppercase tracking-tight text-white">
                    {suite.name}
                  </h2>
                  <p className="font-cormorant text-xl sm:text-2xl italic text-white/85">
                    {suite.tagline}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-white/65 font-light leading-relaxed">
                  {suite.description}
                </p>

                {/* LARGER, CLEARLY READABLE SPECIFICATIONS UNDER LIVING AREA 68 M2 */}
                <div className="grid grid-cols-2 gap-5 sm:gap-8 py-6 sm:py-8 border-y border-white/10">
                  {suite.features.map((f) => (
                    <div key={f.label} className="space-y-1.5 sm:space-y-2">
                      <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.18em] sm:tracking-[0.22em] text-emerald-400/90 block">
                        {f.label}
                      </span>
                      <span className="text-base sm:text-xl font-cinzel font-bold text-white block">
                        {f.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* LARGER, READABLE AMENITIES */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-sm sm:text-base text-white/80 font-light">
                  {suite.amenities.slice(0, 4).map((a) => (
                    <span key={a}>{a}</span>
                  ))}
                </div>

                {/* RESERVE CTA */}
                <div className="pt-1 sm:pt-2">
                  <button
                    onClick={() => openBooking(suite.id)}
                    className="inline-flex items-center justify-center w-full sm:w-auto gap-3 px-8 py-4 rounded-none bg-white hover:bg-emerald-400 hover:text-slate-950 text-slate-950 font-bold text-xs uppercase tracking-[0.25em] transition-all cursor-pointer"
                  >
                    <span>RESERVE RESIDENCE</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </section>

      <SpaFooter />

      <SpaBookingModal
        isOpen={isBookingOpen}
        initialSuiteId={selectedSuiteForBooking}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
};

export default SpaSuites;
