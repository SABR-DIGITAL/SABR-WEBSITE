import React, { useState, useEffect } from 'react';
import { motion as framerMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SpaNavbar from './SpaNavbar';
import SpaFooter from './SpaFooter';
import SpaBookingModal from './SpaBookingModal';
import { SPA_DATA } from './spaData';

const motion = framerMotion as any;

export const SpaActivities: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#070908] text-[#ECE7DF] min-h-screen font-sans selection:bg-emerald-500 selection:text-slate-950">
      <SpaNavbar onOpenBooking={() => setIsBookingOpen(true)} />

      {/* HERO BANNER (CLEAN, NO CLICKABLE FILTER OPTIONS) */}
      <section className="relative pt-28 pb-14 sm:pt-36 sm:pb-20 md:pt-52 md:pb-32 px-5 sm:px-6 md:px-14 bg-[#070908] border-b border-white/10">
        <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
          <span className="text-[10px] uppercase tracking-[0.45em] text-emerald-400 font-mono font-bold block">
            THE PRIVATE RESERVE
          </span>
          <h1 className="font-cinzel text-3xl sm:text-6xl md:text-7xl font-bold uppercase text-white tracking-wider">
            ACTIVITIES & RECREATION
          </h1>
          <p className="max-w-xl mx-auto text-sm sm:text-base text-white/60 font-light leading-relaxed">
            Unhurried outdoor experiences across 180 acres of private pine woodland, from morning equestrian rides to clay court tennis and glasshouse yoga.
          </p>
        </div>
      </section>

      {/* ALL ACTIVITIES IN ONE CONTINUOUS ALTERNATING LEFT / RIGHT SCROLL SHOWCASE */}
      <section className="py-16 sm:py-28 md:py-56 px-5 sm:px-6 md:px-14 max-w-6xl mx-auto space-y-16 sm:space-y-32 md:space-y-64">
        {SPA_DATA.activities.map((act, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <motion.div
              key={act.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-16 lg:gap-24 items-center"
            >
              {/* CLEAN 4K CORRELATED IMAGE COLUMN */}
              <div className={`lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="relative overflow-hidden aspect-[16/10] bg-[#0C100E] group">
                  <img
                    src={act.image}
                    alt={act.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* CONTENT COLUMN */}
              <div className={`lg:col-span-5 space-y-6 sm:space-y-8 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="space-y-3 sm:space-y-4">
                  <span className="text-xs font-mono text-emerald-400 uppercase tracking-[0.3em] font-bold block">
                    {act.number} · PRIVATE ESTATE
                  </span>
                  <h2 className="font-cinzel text-2xl sm:text-4xl font-bold uppercase tracking-tight text-white leading-tight">
                    {act.title}
                  </h2>
                  <p className="font-cormorant text-xl sm:text-2xl italic text-white/85">
                    {act.subtitle}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-white/65 font-light leading-relaxed">
                  {act.description}
                </p>

                <div className="py-5 sm:py-6 border-y border-white/10 flex flex-wrap gap-x-6 sm:gap-x-8 gap-y-2 text-xs sm:text-sm text-white/80 font-light">
                  {act.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>

                <div className="pt-1 sm:pt-2">
                  <button
                    onClick={() => setIsBookingOpen(true)}
                    className="inline-flex items-center justify-center w-full sm:w-auto gap-3 px-8 py-4 rounded-none bg-white hover:bg-emerald-400 hover:text-slate-950 text-slate-950 font-bold text-xs uppercase tracking-[0.25em] transition-all cursor-pointer"
                  >
                    <span>RESERVE EXPERIENCE</span>
                    <ArrowUpRight size={14} />
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
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
};

export default SpaActivities;
