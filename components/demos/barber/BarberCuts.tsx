
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scissors, Search, User, Target, Layers, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ExitPreviewButton from '../../ExitPreviewButton';
import BarberNavbar from './BarberNavbar';

const portfolio = [
  { id: 1, title: "STRUCTURAL LOW FADE", system: "Linear Vector v1", intensity: "98%", img: "https://images.unsplash.com/photo-1599351431247-f137afbacdf9?auto=format&fit=crop&q=80&w=800" },
  { id: 2, title: "ANGULAR BEARD SCULPT", system: "Edge Alignment", intensity: "100%", img: "https://images.unsplash.com/photo-1593702275677-f9147a4027b0?auto=format&fit=crop&q=80&w=800" },
  { id: 3, title: "TEXTURED KERNEL CROP", system: "Depth Matrix", intensity: "92%", img: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=800" },
  { id: 4, title: "ASYMMETRIC BURST", system: "Focal Point 0x4", intensity: "96%", img: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=800" },
  { id: 5, title: "MONOLITHIC TAPER", system: "Shadow Control", intensity: "99%", img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800" },
  { id: 6, title: "CYBERPUNK CONTOUR", system: "High-Viz Blade", intensity: "100%", img: "https://images.unsplash.com/photo-1622286332618-f2802b9c54c3?auto=format&fit=crop&q=80&w=800" },
  { id: 7, title: "NANO-ALIGNMENT", system: "Static Trim", intensity: "94%", img: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=800" },
  { id: 8, title: "PRISM POMPADOUR", system: "Volume Build", intensity: "97%", img: "https://images.unsplash.com/photo-1618331835717-801e976710b2?auto=format&fit=crop&q=80&w=800" }
];

const BarberCuts: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-[#E0E0E0] font-inter selection:bg-[#7F00FF] selection:text-white pb-64">
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-[100] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      <ExitPreviewButton />
      <BarberNavbar />

      <section className="pt-64 pb-32 px-6 text-center lg:text-left max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-end justify-between gap-16">
          <div className="space-y-10">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} className="text-[#7F00FF] font-black text-[11px] uppercase tracking-[1em]">Visual Archive</motion.div>
            <motion.h1 
              initial={{ y: 30, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              className="font-syne text-7xl md:text-[11vw] font-black uppercase tracking-tighter leading-none"
            >
              PRECISION <br /><span className="text-white/10 italic">MODELS.</span>
            </motion.h1>
          </div>
          <div className="max-w-sm space-y-6 pb-6 border-l border-white/5 pl-10 hidden lg:block">
             <p className="text-white/40 font-medium italic text-lg leading-relaxed">
               "A data-driven collection of structural hair architecture. Every unit is engineered for maximum geometric impact."
             </p>
             <div className="flex items-center gap-3">
                <Target size={14} className="text-[#7F00FF]" />
                <span className="text-[10px] font-black uppercase tracking-widest text-[#7F00FF]/50">Focus: High Precision</span>
             </div>
          </div>
        </div>
      </section>

      {/* MASONRY FLOATING GALLERY */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
        {portfolio.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (idx % 3) * 0.2 }}
            className={`group relative overflow-hidden bg-[#0D0D0D] border border-white/5 shadow-2xl transition-all duration-700 hover:border-[#7F00FF]/50 ${idx % 2 === 0 ? 'md:mt-24' : ''}`}
          >
            {/* SCANNING LINE EFFECT */}
            <div className="absolute inset-0 z-30 pointer-events-none opacity-0 group-hover:opacity-100 overflow-hidden">
               <div className="w-full h-1 bg-[#7F00FF] shadow-[0_0_20px_#7F00FF] animate-scanner"></div>
            </div>

            <div className="aspect-[3/4] overflow-hidden grayscale contrast-[1.1] brightness-[0.7] group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-[1.5s] ease-out">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
            </div>

            {/* Micro-Metadata Overlay */}
            <div className="absolute top-6 left-6 z-20 text-[8px] font-black uppercase tracking-[0.4em] text-white/20 group-hover:text-[#7F00FF] transition-colors">
              UNIT_REF: 00{item.id}_X
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity"></div>
            
            <div className="absolute inset-x-0 bottom-0 p-10 space-y-6 translate-y-6 group-hover:translate-y-0 transition-transform duration-700">
              <h3 className="font-syne text-3xl font-black uppercase tracking-tight text-[#E0E0E0]">{item.title}</h3>
              <div className="grid grid-cols-2 gap-8 pt-6 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                <div className="space-y-2">
                   <p className="text-[8px] font-black uppercase tracking-widest text-white/30">Process</p>
                   <p className="text-xs font-bold uppercase">{item.system}</p>
                </div>
                <div className="space-y-2">
                   <p className="text-[8px] font-black uppercase tracking-widest text-white/30">Integrity</p>
                   <p className="text-xs font-bold text-[#7F00FF] uppercase">{item.intensity}</p>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-10 right-10 opacity-0 group-hover:opacity-100 transition-opacity">
               <div className="w-10 h-10 border border-[#7F00FF]/50 flex items-center justify-center text-[#7F00FF]">
                  <ArrowUpRight size={18} />
               </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* PORTFOLIO FOOTER */}
      <section className="py-64 text-center">
         <div className="max-w-xl mx-auto space-y-12">
            <Layers size={40} className="mx-auto text-white/10" />
            <h4 className="font-syne text-4xl font-black uppercase tracking-tighter">DATASET COMPLETE.</h4>
            <Link to="/demo/barber/book" className="inline-block px-16 py-7 border border-[#7F00FF] text-[#7F00FF] font-black text-[10px] uppercase tracking-[0.8em] hover:bg-[#7F00FF] hover:text-white transition-all shadow-[0_0_30px_rgba(127,0,255,0.2)]">
              INITIALIZE BUILD
            </Link>
         </div>
      </section>

      <style>{`
        @keyframes scanner {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(1000%); }
        }
        .animate-scanner {
          animation: scanner 2s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default BarberCuts;
