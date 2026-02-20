
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, Music, Users, Sparkles, Globe, ArrowRight, Zap, Target } from 'lucide-react';
import ExitPreviewButton from '../../ExitPreviewButton';
import EventsNavbar from './EventsNavbar';
import EventsFooter from './EventsFooter';

const EventsHome: React.FC = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.5], [0.2, 0]);

  useEffect(() => window.scrollTo(0, 0), []);

  const divisions = [
    { title: "CORPORATE SYNERGY", desc: "High-stakes production for global brand leaders.", icon: <Globe />, type: "Division 01" },
    { title: "LUXURY CELEBRATION", desc: "Architectural weddings and private estate galas.", icon: <Sparkles />, type: "Division 02" },
    { title: "NIGHTLIFE KINETICS", desc: "Immersive high-energy sound and light systems.", icon: <Music />, type: "Division 03" },
    { title: "BRAND ACTIVATION", desc: "Cinematic product launches and press rituals.", icon: <Target />, type: "Division 04" }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-[#E0E0E0] font-inter selection:bg-[#D4AF37] selection:text-black overflow-x-hidden relative">
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none z-[100] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      <ExitPreviewButton />
      <EventsNavbar />

      {/* HERO SECTION */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1514525253361-bee8718a300c?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover brightness-[0.4] contrast-[1.1] grayscale-[20%]" 
            alt="Cinematic event lighting"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/40 to-[#050505]"></div>
        </motion.div>

        <motion.h1 
          style={{ opacity: logoOpacity }}
          className="absolute z-10 font-syne text-[18vw] font-black text-white/20 tracking-[0.2em] pointer-events-none select-none uppercase"
        >
          VANTAGE
        </motion.h1>

        <div className="max-w-7xl mx-auto w-full relative z-20 px-6 text-center lg:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "circOut" }}
            className="space-y-10"
          >
            <div className="flex flex-col gap-4">
              <span className="text-[#D4AF37] font-black text-[10px] uppercase tracking-[1.2em] mb-4">Orchestrating Prestige</span>
              <h2 className="font-syne text-5xl md:text-9xl leading-[0.85] text-white font-black tracking-tighter uppercase max-w-5xl">
                EXECUTING <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#D4AF37] to-white italic">VISION.</span>
              </h2>
            </div>
            
            <p className="text-xl text-white/30 font-medium italic max-w-xl leading-relaxed mx-auto lg:mx-0">
              "We don't just plan events; we architect experiences. Every transition is a calculated move toward unforgettable precision."
            </p>

            <div className="pt-12 flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <Link to="/demo/events/book" className="px-16 py-8 bg-[#D4AF37] text-black font-black text-[11px] uppercase tracking-[0.8em] group hover:bg-white transition-all duration-700 shadow-[0_0_50px_rgba(212,175,55,0.2)]">
                START PRODUCTION
              </Link>
              <Link to="/demo/events/portfolio" className="px-16 py-8 border border-white/10 text-white font-black text-[11px] uppercase tracking-[0.8em] hover:bg-white hover:text-black transition-all duration-700">
                VIEW ARCHIVE
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 right-10 text-right hidden md:block">
           <p className="text-[9px] font-black text-white/10 uppercase tracking-[0.4em]">SYS_TIME: {new Date().toLocaleTimeString()}</p>
           <div className="flex items-center gap-3 justify-end mt-2 opacity-40">
              <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse"></div>
              <span className="text-[9px] font-black text-[#D4AF37] uppercase tracking-[0.2em]">Global Signal Active</span>
           </div>
        </div>
      </section>

      {/* DIVISIONS SECTION */}
      <section className="py-64 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-start">
          <div className="space-y-12 sticky top-48">
            <span className="text-[#D4AF37] font-black text-[11px] uppercase tracking-[0.8em]">Revenue Matrix</span>
            <h3 className="font-syne text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85]">SYSTEM <br /> <span className="text-white/10">DIVISIONS.</span></h3>
            <p className="text-lg text-white/30 font-medium italic leading-relaxed max-w-md">
              Our operational ecosystem is categorized into four elite sectors. We provide full-spectrum production, from initial concept to the final closing bow.
            </p>
            <div className="flex items-center gap-6 pt-6">
               <div className="w-14 h-14 bg-[#D4AF37]/5 flex items-center justify-center border border-[#D4AF37]/20 text-[#D4AF37]">
                  <Zap size={24} />
               </div>
               <p className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37]">High Velocity Execution Enabled</p>
            </div>
          </div>

          <div className="space-y-6">
            {divisions.map((d, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group p-12 bg-white/[0.02] border border-white/5 hover:border-[#D4AF37]/40 transition-all duration-700 cursor-pointer relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-all transform scale-150">
                   {d.icon}
                </div>
                <div className="flex flex-col gap-6 relative z-10">
                  <div className="flex justify-between items-start">
                    <h4 className="font-syne text-3xl font-black uppercase tracking-tight group-hover:text-[#D4AF37] transition-colors">{d.title}</h4>
                    <span className="text-[10px] font-mono text-white/10">{d.type}</span>
                  </div>
                  <p className="text-white/40 font-medium italic group-hover:text-white/60 transition-colors">"{d.desc}"</p>
                  <div className="pt-6 border-t border-white/5 flex items-center gap-4 text-[#D4AF37] font-black text-[9px] uppercase tracking-[0.5em] opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                     Explore Specs <ArrowRight size={14} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* METRIC STRIP */}
      <div className="bg-[#0A0A0A] py-32 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-20">
          {[
            { val: "1.2k+", label: "UNITS DELIVERED" },
            { val: "85m+", label: "TOTAL AUDIENCE" },
            { val: "22", label: "COUNTRIES SERVICED" },
            { val: "100%", label: "SUCCESS RATIO" }
          ].map((m, i) => (
            <div key={i} className="text-center space-y-4">
              <h4 className="font-syne text-5xl md:text-6xl font-black text-white">{m.val}</h4>
              <p className="text-[10px] font-black uppercase tracking-[0.6em] text-[#D4AF37]">{m.label}</p>
            </div>
          ))}
        </div>
      </div>

      <EventsFooter />
    </div>
  );
};

export default EventsHome;
