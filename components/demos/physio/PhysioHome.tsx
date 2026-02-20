import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  MoveRight,
  Sparkles,
  ShieldCheck,
  Activity,
  Smile,
  Leaf,
  Target,
  Zap,
  Dna,
  Binary,
  Microscope
} from 'lucide-react';
import ExitPreviewButton from '../../ExitPreviewButton';
import PhysioNavbar from './PhysioNavbar';
import PhysioFooter from './PhysioFooter';

const PhysioHome: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
  }, []);

  return (
    <div className="min-h-screen bg-[#f8faf9] font-inter selection:bg-emerald-200 selection:text-emerald-900 overflow-x-hidden">
      <ExitPreviewButton />
      <PhysioNavbar />

      {/* ARCHITECTURAL HERO */}
      <section className="relative min-h-[90vh] lg:min-h-screen flex flex-col items-center justify-center pt-32 pb-48 px-6 text-center overflow-hidden transform-gpu">
        <div className="absolute inset-0 pointer-events-none overflow-hidden will-change-transform">
           <Activity size={800} className="absolute -top-60 -left-60 text-emerald-600/5 rotate-12" />
           <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-emerald-100/20 blur-[120px] rounded-full"></div>
           <Leaf size={600} className="absolute -bottom-40 -right-40 text-emerald-600/5 -rotate-12" />
           <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:40px_40px]"></div>
        </div>

        <div className="max-w-6xl mx-auto space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-5 py-2 bg-emerald-100/80 backdrop-blur-md rounded-full border border-emerald-200 shadow-sm"
          >
            <Sparkles size={14} className="text-emerald-600" />
            <span className="text-emerald-700 font-bold text-[10px] uppercase tracking-widest">Expert Recovery in Bath</span>
          </motion.div>

          <div className="space-y-4">
            <h1 className="font-serif text-[clamp(2.5rem,10vw,7rem)] leading-[0.9] text-emerald-950 font-bold tracking-tighter transform-gpu">
              <motion.span 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                className="block"
              >
                PHYSICAL <span className="text-emerald-600 italic">FLOW.</span>
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="block text-emerald-900/20"
              >
                ACTIVE CARE.
              </motion.span>
            </h1>
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-emerald-800/70 font-medium max-w-xl mx-auto leading-relaxed"
          >
            Meticulously engineered recovery for the high-performance human. Precision medical care in the heart of Bath.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-5 justify-center pt-4"
          >
            <Link to="/demo/physio/contact" className="px-10 py-6 bg-emerald-700 text-white rounded-2xl font-bold text-[13px] tracking-wide shadow-xl hover:bg-emerald-800 transition-all flex items-center justify-center gap-4 group transform-gpu">
              SYNC APPOINTMENT <MoveRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ASYMMETRICAL CLINICAL BLUEPRINT SECTION - TOTALLY UNIQUE LAYOUT */}
      <section className="py-40 px-6 bg-emerald-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40vw] h-full bg-emerald-900/20 border-l border-emerald-800/30 hidden lg:block"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-0">
            
            {/* Left: The Technical Intel Column */}
            <div className="w-full lg:w-1/3 lg:pr-20 space-y-16">
              <div className="space-y-4">
                <span className="text-emerald-400 font-bold text-[10px] uppercase tracking-[0.6em]">System Architecture</span>
                <h2 className="font-serif text-5xl md:text-7xl font-bold leading-[0.9] tracking-tighter">High-Grade <span className="text-emerald-400 italic">Care.</span></h2>
              </div>
              
              <div className="space-y-10 border-t border-emerald-800/50 pt-16">
                <div className="group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-emerald-900 flex items-center justify-center text-emerald-400 border border-emerald-800 group-hover:bg-emerald-400 group-hover:text-emerald-950 transition-colors">
                      <Target size={16} />
                    </div>
                    <h4 className="font-serif text-2xl font-bold">Precision Mapping</h4>
                  </div>
                  <p className="text-emerald-100/40 text-sm leading-relaxed italic border-l border-emerald-800 pl-4">"Diagnostic-first focus to identify the core vector of discomfort."</p>
                </div>

                <div className="group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-emerald-900 flex items-center justify-center text-emerald-400 border border-emerald-800 group-hover:bg-emerald-400 group-hover:text-emerald-950 transition-colors">
                      <Zap size={16} />
                    </div>
                    <h4 className="font-serif text-2xl font-bold">Rapid Intake</h4>
                  </div>
                  <p className="text-emerald-100/40 text-sm leading-relaxed italic border-l border-emerald-800 pl-4">"Start your calibrated recovery roadmap within 72 hours of first sync."</p>
                </div>
              </div>
            </div>

            {/* Right: The High-Viz Clinical Visuals */}
            <div className="w-full lg:w-2/3 lg:pl-12">
              <div className="relative">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="aspect-[16/10] bg-emerald-900 rounded-[3rem] overflow-hidden border border-emerald-800/50 relative group"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200" 
                    className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-[2s]" 
                    alt="Clinical surgical team"
                  />
                  <div className="absolute inset-0 bg-emerald-950/40 mix-blend-multiply pointer-events-none group-hover:opacity-0 transition-opacity"></div>
                </motion.div>

                {/* Overlapping Sharp Detail Cards */}
                <motion.div 
                  initial={{ x: 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="absolute -bottom-10 -right-4 md:-right-10 bg-white p-10 md:p-14 rounded-[3.5rem] shadow-3xl max-w-sm hidden sm:block border-8 border-emerald-950"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600"><Smile size={20} /></div>
                    <span className="text-emerald-950 font-black text-[9px] uppercase tracking-widest">Client Centric</span>
                  </div>
                  <h3 className="font-serif text-3xl font-bold text-emerald-950 leading-tight mb-4">Warmth meets <br /> expertise.</h3>
                  <p className="text-emerald-800/50 text-sm font-medium italic">"We engineer durability for high-performance humans in Bath."</p>
                </motion.div>
                
                {/* Floating Technical Stats */}
                <div className="absolute top-10 right-10 flex flex-col gap-4 opacity-50 hidden lg:flex">
                   <div className="flex items-center gap-3 px-4 py-2 bg-emerald-400 text-emerald-950 rounded-full font-black text-[8px] uppercase tracking-[0.2em]">HCPC Certified</div>
                   <div className="flex items-center gap-3 px-4 py-2 bg-white/10 text-white rounded-full font-black text-[8px] uppercase tracking-[0.2em] border border-white/20">MCSP Verified</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* THE STRUCTURAL LOGIC GRID - SHARP & ASYMMETRICAL */}
      <section className="py-40 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="mb-32 flex flex-col md:flex-row items-end justify-between gap-12">
            <div className="space-y-4">
              <span className="text-emerald-600 font-bold text-[10px] uppercase tracking-[0.6em]">The Recovery Formula</span>
              <h2 className="font-serif text-5xl md:text-8xl font-bold text-emerald-950 tracking-tighter uppercase leading-[0.85]">STRUCTURAL <br /><span className="text-emerald-600 italic">LOGIC.</span></h2>
            </div>
            <p className="text-emerald-800/60 text-lg md:text-xl font-medium italic border-l-4 border-emerald-100 pl-10 max-w-sm">
              "We decompose physical restrictions into solvable mechanical equations."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10">
            {/* Grid Item 1 - Chronic Relief */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="md:col-span-8 p-12 bg-emerald-50 rounded-[4rem] border border-emerald-100 flex flex-col md:flex-row gap-12 items-center group transition-all"
            >
              <div className="w-full md:w-1/3 aspect-square bg-white rounded-[3rem] shadow-sm flex items-center justify-center text-emerald-600 overflow-hidden relative">
                 <Dna size={80} strokeWidth={1} className="opacity-10 absolute -top-4 -left-4" />
                 <Heart size={48} strokeWidth={1.5} className="relative z-10 group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="flex-1 space-y-6">
                <h3 className="font-serif text-3xl font-bold text-emerald-950">Chronic Relief</h3>
                <p className="text-emerald-800/60 font-medium italic leading-relaxed text-lg">"Targeting deep-seated restrictions with advanced spinal protocols and neuro-muscular reset techniques."</p>
                <div className="flex gap-4">
                   <span className="px-4 py-2 bg-white rounded-xl text-[9px] font-black uppercase tracking-widest text-emerald-800">Spinal Mapping</span>
                   <span className="px-4 py-2 bg-white rounded-xl text-[9px] font-black uppercase tracking-widest text-emerald-800">Neural Sync</span>
                </div>
              </div>
            </motion.div>

            {/* Grid Item 2 - Performance */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="md:col-span-4 p-12 bg-white rounded-[4rem] border border-emerald-100 flex flex-col justify-between group transition-all shadow-sm"
            >
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-8">
                 <Activity size={28} />
              </div>
              <div className="space-y-4">
                <h3 className="font-serif text-3xl font-bold text-emerald-950">Kinetic Flow</h3>
                <p className="text-emerald-800/50 font-medium italic leading-relaxed">"Optimizing the intersection of joint fluidity and power output."</p>
              </div>
            </motion.div>

            {/* Grid Item 3 - Durability */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="md:col-span-4 p-12 bg-emerald-950 text-white rounded-[4rem] border border-emerald-900 flex flex-col justify-between group transition-all"
            >
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-emerald-400 mb-8 border border-white/10">
                 <ShieldCheck size={28} />
              </div>
              <div className="space-y-4">
                <h3 className="font-serif text-3xl font-bold">Durability</h3>
                <p className="text-emerald-100/40 font-medium italic leading-relaxed">"Hardening the structure against future injury cycles through load management."</p>
              </div>
            </motion.div>

            {/* Grid Item 4 - High Tech Clinic Stats */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="md:col-span-8 p-12 bg-emerald-50 rounded-[4rem] border border-emerald-100 flex flex-col md:flex-row gap-12 items-center group transition-all"
            >
              <div className="flex-1 space-y-6">
                <h3 className="font-serif text-3xl font-bold text-emerald-950">Bio-Mechanical Hub</h3>
                <p className="text-emerald-800/60 font-medium italic leading-relaxed text-lg">"Our studio utilizes high-fidelity analysis to bridge the gap between medical data and daily comfort."</p>
                <Link to="/demo/physio/prices" className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-emerald-700 hover:text-emerald-950 transition-colors">
                  Explore Session Specs <MoveRight size={14} />
                </Link>
              </div>
              <div className="w-full md:w-1/3 aspect-square bg-emerald-900 rounded-[3rem] shadow-xl flex items-center justify-center text-emerald-400 p-8 border-[12px] border-emerald-950">
                 <Binary size={60} strokeWidth={1} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* METRIC STRIP - SHARP & MINIMAL */}
      <section className="py-20 px-6 border-y border-emerald-50 bg-[#f8faf9]">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
           {[
             { icon: <Dna />, label: "Precision Diagnostics" },
             { icon: <Microscope />, label: "Clinical Excellence" },
             { icon: <Binary />, label: "Data-Led Recovery" },
             { icon: <Target />, label: "Targeted Results" }
           ].map((item, i) => (
             <div key={i} className="flex items-center gap-4">
                {/* Fixed type error for cloneElement props */}
                {React.cloneElement(item.icon as React.ReactElement<any>, { size: 24, strokeWidth: 1.5 })}
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-950">{item.label}</span>
             </div>
           ))}
        </div>
      </section>

      <PhysioFooter />
    </div>
  );
};

export default PhysioHome;