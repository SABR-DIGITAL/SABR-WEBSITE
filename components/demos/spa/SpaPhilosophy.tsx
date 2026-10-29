import React, { useState, useEffect } from 'react';
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { motion as framerMotion } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowUpRight, 
  Leaf, 
  Sparkles, 
  ShieldCheck, 
  Award, 
  Droplets, 
  TreePine, 
  Sun,
  Compass
} from 'lucide-react';
import SpaNavbar from './SpaNavbar';
import SpaFooter from './SpaFooter';
import SpaBookingModal from './SpaBookingModal';
import { SPA_DATA } from './spaData';

const motion = framerMotion as any;

export const SpaPhilosophy: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const pillars = [
    {
      icon: TreePine,
      title: 'ANCIENT PINE CANOPY',
      subtitle: '180 Hectares of Untouched Reserve',
      text: 'Every structure is placed organically between trees without clearing native forest. Cantilevered foundations protect delicate root networks, allowing biodiversity to flourish undisturbed.'
    },
    {
      icon: Droplets,
      title: 'GEOTHERMAL MINERAL SPRINGS',
      subtitle: 'Rich in Natural Magnesium & Silicates',
      text: 'Our thermal pools are replenished continuously by deep subsurface thermal aquifers at 34°C–38°C, providing natural mineral relief for the joints and muscular system.'
    },
    {
      icon: Leaf,
      title: 'SUSTAINABLE TIMBER ARCHITECTURE',
      subtitle: 'Zero Carbon Footprint Design',
      text: 'Constructed from locally sourced Scottish larch and Welsh slate. Passive solar alignment and geothermal heat loops power 100% of our heating and water filtration systems.'
    },
    {
      icon: Award,
      title: 'EUROPEAN LUXURY RECOGNITION',
      subtitle: 'Award of Excellence 2024 & 2025',
      text: 'Voted Best Sustainable Forest Resort in Western Europe, honored for pioneering wellness architecture, private gastronomy, and silent retreat experiences.'
    }
  ];

  return (
    <div className="bg-[#070908] text-[#ECE7DF] min-h-screen font-sans selection:bg-emerald-500 selection:text-slate-950">
      <SpaNavbar onOpenBooking={() => setIsBookingOpen(true)} />

      {/* EDITORIAL HERO */}
      <section className="relative pt-44 pb-24 px-6 md:px-14 border-b border-white/10 overflow-hidden bg-[#0A0D0C]">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-[10px] uppercase tracking-[0.45em] text-emerald-400 font-mono font-bold block">
            SANCTUARY IDENTITY
          </span>
          <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight text-white leading-[1.08]">
            NATURE IS NOT A PLACE TO VISIT. <br />
            <span className="font-cormorant italic font-normal text-emerald-400">
              IT IS HOME.
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-xs sm:text-base text-white/60 font-light tracking-wide leading-relaxed pt-2">
            Verdant was conceived as an architectural dialogue with the Wiltshire forest — a sanctuary where stillness, geothermal waters, and modern restraint replace the noise of the world.
          </p>
        </div>
      </section>

      {/* EDITORIAL SPLIT STORY */}
      <section className="py-28 px-6 md:px-14 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.35em] text-emerald-400 font-mono block font-bold">
              THE ARCHITECTURAL VISION
            </span>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
              TIMBER, WATER, <br />
              AND SILENCE.
            </h2>
            <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
              Designed by renowned Scandinavian and British architects, Verdant was built without cutting down a single century-old pine. Large glass facades dissolve the barrier between inside and outside, bathing each living quarter in filtered natural woodland light.
            </p>
            <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
              We employ closed-loop geothermal energy, rainwater harvesting, and organic herb cultivation right across our 180-acre estate, ensuring true ecological harmony.
            </p>
            <div className="pt-4">
              <Link
                to="/demo/spa/suites"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-none bg-white hover:bg-emerald-400 hover:text-slate-950 text-slate-950 font-bold text-xs uppercase tracking-[0.25em] transition-all cursor-pointer shadow-lg border border-white/20"
              >
                <span>EXPLORE RESIDENCES</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative overflow-hidden aspect-[4/3] border border-white/10 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1200"
                alt="Forest Architecture"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* DYNAMIC EDITORIAL 4 CORE PILLARS */}
      <section className="py-32 px-6 md:px-14 bg-[#0A0D0C] border-y border-white/10 relative overflow-hidden">
        <div className="max-w-6xl mx-auto space-y-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-white/10">
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-[0.45em] text-emerald-400 font-mono block font-bold">
                OUR FOUNDATIONS & HERITAGE
              </span>
              <h3 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white">
                THE 4 CORE PILLARS
              </h3>
            </div>
            <p className="max-w-md text-xs sm:text-sm text-white/50 font-light leading-relaxed">
              Every detail at Verdant is anchored in organic architectural reverence, natural mineral hydrology, and uncompromised European luxury.
            </p>
          </div>

          {/* ASYMMETRICAL STAGGERED EDITORIAL SHOWCASE */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* PILLAR 1: LARGE HERO FEATURE */}
            <div className="lg:col-span-7 bg-[#0C100E] border border-white/15 p-8 sm:p-12 space-y-6 relative overflow-hidden group hover:border-emerald-500/40 transition-all shadow-2xl">
              <div className="flex items-center justify-between">
                <span className="font-cinzel text-5xl sm:text-6xl font-bold text-white/10 group-hover:text-emerald-500/20 transition-colors">
                  01
                </span>
                <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
                  <TreePine size={22} />
                </div>
              </div>
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-emerald-400 font-bold block">
                  180 HECTARES OF UNTOUCHED RESERVE
                </span>
                <h4 className="font-cinzel text-2xl sm:text-3xl font-bold text-white uppercase">
                  ANCIENT PINE CANOPY
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                Every structure is placed organically between trees without clearing native forest. Cantilevered timber foundations protect delicate root networks, allowing biodiversity and ancient larch groves to flourish undisturbed.
              </p>
              <div className="pt-4 border-t border-white/10 flex flex-wrap gap-3 font-mono text-[10px] text-white/50 uppercase">
                <span className="px-3 py-1 bg-white/5 border border-white/10 text-emerald-400">Zero Tree Felling</span>
                <span className="px-3 py-1 bg-white/5 border border-white/10">Root Protection Matrix</span>
                <span className="px-3 py-1 bg-white/5 border border-white/10">Silent Zone Radius</span>
              </div>
            </div>

            {/* PILLAR 2: STAGGERED COLUMN WITH EMPHASIS */}
            <div className="lg:col-span-5 lg:mt-12 bg-[#0E1512] border border-emerald-500/25 p-8 sm:p-10 space-y-6 relative overflow-hidden group hover:border-emerald-400 transition-all shadow-2xl">
              <div className="flex items-center justify-between">
                <span className="font-cinzel text-5xl sm:text-6xl font-bold text-emerald-500/15 group-hover:text-emerald-500/30 transition-colors">
                  02
                </span>
                <div className="w-12 h-12 bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
                  <Droplets size={22} />
                </div>
              </div>
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-emerald-400 font-bold block">
                  RICH IN NATURAL MAGNESIUM & SILICATES
                </span>
                <h4 className="font-cinzel text-2xl font-bold text-white uppercase">
                  GEOTHERMAL SPRINGS
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                Our thermal pools are replenished continuously by deep subsurface thermal aquifers at 34°C–38°C, providing natural mineral relief for the muscular and nervous systems.
              </p>
              <div className="pt-2">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold">
                  <span>34°C–38°C Natural Flow Rate</span>
                </div>
              </div>
            </div>

            {/* PILLAR 3: SLENDER BALANCED OFFSET */}
            <div className="lg:col-span-5 bg-[#0C100E] border border-white/15 p-8 sm:p-10 space-y-6 relative overflow-hidden group hover:border-emerald-500/40 transition-all shadow-2xl">
              <div className="flex items-center justify-between">
                <span className="font-cinzel text-5xl sm:text-6xl font-bold text-white/10 group-hover:text-emerald-500/20 transition-colors">
                  03
                </span>
                <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
                  <Leaf size={22} />
                </div>
              </div>
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-emerald-400 font-bold block">
                  ZERO CARBON FOOTPRINT PHILOSOPHY
                </span>
                <h4 className="font-cinzel text-2xl font-bold text-white uppercase">
                  SUSTAINABLE ARCHITECTURE
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                Constructed from locally sourced Scottish larch and Welsh slate. Passive solar alignment and geothermal heat loops power 100% of our heating and water filtration systems.
              </p>
              <div className="pt-2 font-mono text-[11px] text-white/40">
                <span>100% Geothermal & Solar Powered</span>
              </div>
            </div>

            {/* PILLAR 4: WIDE EDITORIAL CONCLUSION */}
            <div className="lg:col-span-7 lg:-mt-12 bg-[#0C100E] border border-white/15 p-8 sm:p-12 space-y-6 relative overflow-hidden group hover:border-emerald-500/40 transition-all shadow-2xl">
              <div className="flex items-center justify-between">
                <span className="font-cinzel text-5xl sm:text-6xl font-bold text-white/10 group-hover:text-emerald-500/20 transition-colors">
                  04
                </span>
                <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
                  <Award size={22} />
                </div>
              </div>
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-emerald-400 font-bold block">
                  AWARD OF EXCELLENCE 2024 & 2025
                </span>
                <h4 className="font-cinzel text-2xl sm:text-3xl font-bold text-white uppercase">
                  EUROPEAN LUXURY RECOGNITION
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                Voted Best Sustainable Forest Resort in Western Europe, honored for pioneering wellness architecture, private Michelin-calibre wood-fired gastronomy, and silent sensory retreat experiences.
              </p>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="font-mono text-xs text-white/50 uppercase">
                  Grand Prix de l'Hôtellerie Durable
                </span>
                <span className="text-xs font-mono text-emerald-400 uppercase font-bold">
                  ★ Five Star Forest Reserve
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <SpaFooter />

      <SpaBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
};

export default SpaPhilosophy;
