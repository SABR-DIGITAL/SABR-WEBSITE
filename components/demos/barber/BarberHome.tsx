
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Scissors, 
  ArrowRight, 
  ChevronDown,
  Cpu,
  Zap,
  ShieldAlert,
  ChevronRight,
  Database,
  Terminal,
  Activity
} from 'lucide-react';
import ExitPreviewButton from '../../ExitPreviewButton';
import BarberNavbar from './BarberNavbar';

const BarberHome: React.FC = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.4], [0.3, 0]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const techSpecs = [
    { system: "ARCHITECTURAL CUT", tolerance: "0.1mm Precision", duration: "45m Ritual", spec: "v2.4 High-Taper" },
    { system: "SCULPTED BEARD", tolerance: "Zero-Gap Detail", duration: "30m Ritual", spec: "Micro-Alignment" },
    { system: "THE FULL OVERHAUL", tolerance: "Full Structural", duration: "90m Ritual", spec: "Complete Build" },
    { system: "SKIN CALIBRATION", tolerance: "Nano-Exfoliation", duration: "20m Ritual", spec: "Thermal Care" }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-[#E0E0E0] font-inter selection:bg-[#7F00FF] selection:text-white overflow-x-hidden relative">
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-[100] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      <ExitPreviewButton />
      <BarberNavbar />

      {/* HERO SECTION - HIGH FASHION STATEMENT */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1599351431247-f137afbacdf9?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover brightness-[0.5] contrast-[1.2] grayscale" 
            alt="Macro geometric haircut portrait with split lighting"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#3E007A]/20"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050505]"></div>
        </motion.div>

        <motion.h1 
          style={{ opacity: logoOpacity }}
          className="absolute z-10 font-syne text-[20vw] font-black text-white/30 tracking-[0.1em] pointer-events-none select-none uppercase scale-x-125"
        >
          VERTEX
        </motion.h1>

        <div className="max-w-7xl mx-auto w-full relative z-20 px-6 text-center lg:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "circOut" }}
            className="space-y-8"
          >
            <div className="flex flex-col gap-4">
              <span className="text-[#7F00FF] font-black text-[10px] uppercase tracking-[1em] mb-4">Precision Without Compromise</span>
              <h2 className="font-syne text-5xl md:text-8xl leading-none text-[#F1E6FF] font-black tracking-tighter uppercase max-w-4xl">
                ENGINEERING <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#7F00FF] italic">SILHOUETTES.</span>
              </h2>
            </div>
            
            <p className="text-xl text-white/40 font-medium italic max-w-xl leading-relaxed mx-auto lg:mx-0">
              Where high-fashion architecture meets the ritual of the blade. Every stroke is a calculated move toward perfection.
            </p>

            <div className="pt-12">
              <Link to="/demo/barber/book" className="inline-flex items-center gap-6 px-16 py-8 border border-[#7F00FF] text-[#F1E6FF] font-black text-[11px] uppercase tracking-[0.8em] group hover:bg-[#7F00FF] hover:text-white transition-all duration-700 shadow-[0_0_40px_rgba(127,0,255,0.2)]">
                ACCESS THE STUDIO <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 right-10 text-right hidden md:block">
           <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">Status: Nominal</p>
           <div className="flex items-center gap-3 justify-end mt-2">
              <div className="w-1.5 h-1.5 bg-[#7F00FF] rounded-full animate-pulse"></div>
              <span className="text-[9px] font-black text-[#7F00FF] uppercase tracking-[0.2em]">Accepting New Units</span>
           </div>
        </div>
      </section>

      {/* TECH-SPEC MENU */}
      <section className="py-64 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-start">
          <div className="space-y-12 sticky top-48">
            <span className="text-[#7F00FF] font-black text-[11px] uppercase tracking-[0.8em]">System Architecture</span>
            <h3 className="font-syne text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85]">TECHNICAL <br /> <span className="text-white/20">SPECS.</span></h3>
            <p className="text-lg text-white/40 font-medium leading-relaxed max-w-md">
              Our service matrix is defined by extreme tolerances and high-grade materials. We don't just cut; we calibrate.
            </p>
            <div className="flex items-center gap-6 pt-6">
               <div className="w-14 h-14 bg-[#7F00FF]/10 flex items-center justify-center border border-[#7F00FF]/30 text-[#7F00FF]">
                  <Activity size={24} />
               </div>
               <p className="text-[10px] font-black uppercase tracking-widest text-[#7F00FF]">Active Monitoring Enabled</p>
            </div>
          </div>

          <div className="space-y-4">
            {techSpecs.map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group p-10 bg-white/5 border border-white/5 hover:border-[#7F00FF]/50 transition-all duration-700 cursor-pointer relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:text-[#7F00FF] group-hover:opacity-20 transition-all">
                  <Database size={48} />
                </div>
                <div className="flex flex-col gap-8 relative z-10">
                  <div className="flex justify-between items-start">
                    <h4 className="font-syne text-3xl font-black uppercase tracking-tight group-hover:text-[#7F00FF] transition-colors">{s.system}</h4>
                    <span className="text-[10px] font-mono text-white/20">0x{i+1}C</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
                    <div className="space-y-2">
                       <p className="text-[9px] font-black uppercase tracking-widest text-white/20">Tolerance</p>
                       <p className="text-sm font-bold text-[#F1E6FF]">{s.tolerance}</p>
                    </div>
                    <div className="space-y-2">
                       <p className="text-[9px] font-black uppercase tracking-widest text-white/20">Protocol Time</p>
                       <p className="text-sm font-bold text-[#F1E6FF]">{s.duration}</p>
                    </div>
                    <div className="space-y-2 hidden md:block">
                       <p className="text-[9px] font-black uppercase tracking-widest text-white/20">Kernel</p>
                       <p className="text-sm font-bold text-[#F1E6FF]">{s.spec}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ANATOMY TIMELINE - SCROLL TRIGGERED WIREFRAMES */}
      <section className="py-64 px-6 bg-[#080808]">
        <div className="max-w-7xl mx-auto text-center mb-32">
           <h3 className="font-syne text-5xl md:text-8xl font-black uppercase tracking-tighter mb-6">THE ANATOMY.</h3>
           <p className="text-white/20 font-black text-[10px] uppercase tracking-[1em]">Scroll to Assemble Process</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-48">
          {[
            { id: "01", title: "TOPOLOGICAL SURVEY", desc: "Digital mapping of bone structure and growth vectors.", icon: <Cpu /> },
            { id: "02", title: "STRUCTURAL DEPTH", desc: "Removing mass to reveal the underlying architectural form.", icon: <Terminal /> },
            { id: "03", title: "EDGE CALIBRATION", desc: "Defining the perimeter with 0.1mm surgical steel.", icon: <Scissors /> },
            { id: "04", title: "FINAL DEPLOYMENT", desc: "Application of organic sealants and structural matte finishes.", icon: <Zap /> }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.8 }}
              className="flex flex-col md:flex-row items-center gap-16 md:gap-24 text-center md:text-left"
            >
              <div className="w-32 h-32 border border-[#7F00FF]/40 rounded-full flex items-center justify-center text-[#7F00FF] shadow-[0_0_30px_rgba(127,0,255,0.1)] shrink-0 relative">
                 <div className="absolute -top-4 -right-4 bg-[#7F00FF] text-[#050505] w-10 h-10 flex items-center justify-center font-black text-xs">{item.id}</div>
                 {/* Fixed type error for cloneElement props */}
                 {React.cloneElement(item.icon as React.ReactElement<any>, { size: 48, strokeWidth: 1 })}
              </div>
              <div className="space-y-6">
                <h4 className="font-syne text-4xl font-black uppercase tracking-tighter text-[#F1E6FF]">{item.title}</h4>
                <p className="text-xl text-white/30 font-medium italic max-w-lg leading-relaxed">"{item.desc}"</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER - MASSIVE V */}
      <footer className="py-64 relative overflow-hidden bg-[#050505]">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 font-syne text-[60vw] font-black text-[#7F00FF]/5 leading-none pointer-events-none select-none">V</div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-3 gap-24 items-end">
          <div className="space-y-10">
            <h4 className="font-syne text-2xl font-black text-white tracking-[0.4em] uppercase">VERTEX</h4>
            <p className="text-white/20 text-xs font-bold uppercase tracking-[0.2em] leading-loose">
              LAT: 51.5074° N <br />
              LON: 0.1278° W <br />
              SYS: CLD-ELT v4.0
            </p>
          </div>
          
          <div className="text-center space-y-8">
            <div className="flex justify-center gap-10">
               <div className="w-1 h-1 bg-[#7F00FF] rounded-full"></div>
               <div className="w-1 h-1 bg-white/20 rounded-full"></div>
               <div className="w-1 h-1 bg-white/20 rounded-full"></div>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[1em] text-white/10">Precision Since 2012</p>
          </div>

          <div className="text-center md:text-right space-y-10">
            <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="text-[#7F00FF] font-black text-[9px] uppercase tracking-[0.8em] hover:text-white transition-colors">Return to Apex</button>
            <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/10">© 2025 VERTEX ARCHITECTURAL | SABR DIGITAL</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BarberHome;