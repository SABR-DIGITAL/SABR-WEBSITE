import React, { useState, useEffect } from 'react';
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { ArrowUpRight } from 'lucide-react';
import SpaNavbar from './SpaNavbar';
import SpaFooter from './SpaFooter';
import SpaBookingModal from './SpaBookingModal';

export const SpaPhilosophy: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const pillars = [
    {
      num: '01',
      subtitle: '180 ACRES OF PROTECTED WOODLAND',
      title: 'ANCIENT PINE CANOPY',
      text: 'Every residence is placed carefully between mature pine trees without clearing native woodland. Elevated timber foundations protect delicate root networks so surrounding wildlife and flora thrive undisturbed.'
    },
    {
      num: '02',
      subtitle: 'NATURAL MAGNESIUM & SILICATES',
      title: 'GEOTHERMAL MINERAL SPRINGS',
      text: 'Our outdoor and indoor pools are fed continuously by deep thermal aquifers at 34°C to 38°C, offering gentle mineral relief for joints, muscles, and the nervous system throughout the year.'
    },
    {
      num: '03',
      subtitle: 'LOW-IMPACT CRAFTSMANSHIP',
      title: 'SUSTAINABLE TIMBER & STONE',
      text: 'Built from sustainably harvested British larch, cedar, and natural Welsh slate. Closed-loop geothermal heating and solar arrays provide 100% of our hot water and climate control.'
    },
    {
      num: '04',
      subtitle: 'EUROPEAN HOSPITALITY AWARD 2024 & 2025',
      title: 'QUIET ARCHITECTURAL EXCELLENCE',
      text: 'Recognised as Europe’s leading sustainable woodland spa retreat, celebrated for quiet biophilic design, seasonal estate dining, and unhurried thermal wellness.'
    }
  ];

  return (
    <div className="bg-[#070908] text-[#ECE7DF] min-h-screen font-sans selection:bg-emerald-500 selection:text-slate-950">
      <SpaNavbar onOpenBooking={() => setIsBookingOpen(true)} />

      {/* EDITORIAL HERO */}
      <section className="relative pt-28 pb-14 sm:pt-36 sm:pb-20 md:pt-48 md:pb-28 px-5 sm:px-6 md:px-14 border-b border-white/10 bg-[#070908]">
        <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
          <span className="text-[10px] uppercase tracking-[0.45em] text-emerald-400 font-mono font-bold block">
            SANCTUARY IDENTITY
          </span>
          <h1 className="font-cinzel text-3xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight text-white leading-[1.08]">
            NATURE IS NOT A PLACE TO VISIT. <br />
            <span className="font-cormorant italic font-normal text-emerald-400">
              IT IS HOME.
            </span>
          </h1>
          <p className="max-w-xl mx-auto text-sm text-white/60 font-light leading-relaxed pt-1 sm:pt-2">
            Conceived as a quiet architectural dialogue with the Wiltshire pine forest — where open space, warm timber, and geothermal waters replace the noise of everyday life.
          </p>
        </div>
      </section>

      {/* EDITORIAL SPLIT STORY */}
      <section className="py-16 sm:py-28 md:py-48 px-5 sm:px-6 md:px-14 max-w-6xl mx-auto border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-16 lg:gap-24 items-center">
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            <span className="text-[10px] uppercase tracking-[0.35em] text-emerald-400 font-mono block font-bold">
              01 · THE ARCHITECTURAL VISION
            </span>
            <h2 className="font-cinzel text-2xl sm:text-4xl font-bold uppercase tracking-tight text-white leading-tight">
              TIMBER, WATER, <br />
              AND SILENCE.
            </h2>
            <p className="text-sm text-white/60 font-light leading-relaxed">
              Designed by British and Scandinavian architects, Verdant was constructed without felling a single century-old pine. Expansive floor-to-ceiling glass dissolves the boundary between indoors and the surrounding woodland.
            </p>
            <p className="text-sm text-white/60 font-light leading-relaxed">
              Closed-loop geothermal energy, rainwater harvesting, and organic botanical gardens across our 180-acre estate sustain every residence in complete ecological balance.
            </p>
            <div className="pt-1 sm:pt-2">
              <Link
                to="/demo/spa/suites"
                className="inline-flex items-center justify-center w-full sm:w-auto gap-3 px-8 py-4 rounded-none bg-white hover:bg-emerald-400 hover:text-slate-950 text-slate-950 font-bold text-xs uppercase tracking-[0.25em] transition-all cursor-pointer"
              >
                <span>EXPLORE RESIDENCES</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative overflow-hidden aspect-[16/10] bg-[#0C100E]">
              <img
                src="https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=90&w=2400"
                alt="Timber and Glass Woodland Architecture"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* OPEN EDITORIAL 4 CORE PILLARS (UNBOXED, SPACIOUS) */}
      <section className="py-16 sm:py-28 md:py-48 px-5 sm:px-6 md:px-14 bg-[#070908]">
        <div className="max-w-6xl mx-auto space-y-12 sm:space-y-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 pb-6 sm:pb-8 border-b border-white/10">
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-[0.45em] text-emerald-400 font-mono block font-bold">
                02 · OUR FOUNDATIONS
              </span>
              <h3 className="font-cinzel text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white">
                THE FOUR PILLARS
              </h3>
            </div>
            <p className="max-w-md text-sm text-white/55 font-light leading-relaxed">
              Every detail at Verdant is guided by architectural restraint, natural mineral water, and unhurried woodland living.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10 sm:gap-y-20">
            {pillars.map((pillar) => (
              <div
                key={pillar.num}
                className="space-y-4 sm:space-y-5 pt-6 sm:pt-8 border-t border-white/10"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.22em] sm:tracking-[0.3em] font-mono text-emerald-400 font-bold">
                    {pillar.num} · {pillar.subtitle}
                  </span>
                </div>
                <h4 className="font-cinzel text-xl sm:text-3xl font-bold text-white uppercase">
                  {pillar.title}
                </h4>
                <p className="text-sm text-white/60 font-light leading-relaxed">
                  {pillar.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SpaFooter />

      <SpaBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
};

export default SpaPhilosophy;
