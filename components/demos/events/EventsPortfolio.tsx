
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Layers, ArrowUpRight, Search } from 'lucide-react';
import ExitPreviewButton from '../../ExitPreviewButton';
import EventsNavbar from './EventsNavbar';
import EventsFooter from './EventsFooter';

const caseStudies = [
  { id: 1, title: "LUCID DREAM GALA", venue: "The Royal Exchange", guests: "800 Units", budget: "£450k", img: "https://images.unsplash.com/photo-1514525253361-bee8718a300c?auto=format&fit=crop&q=80&w=800" },
  { id: 2, title: "CHROME FESTIVAL", venue: "Warehouse 01", guests: "2.5k Units", budget: "£1.2m", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800" },
  { id: 3, title: "AMBER WEDDING", venue: "Wiltshire Estate", guests: "250 Units", budget: "£180k", img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800" },
  { id: 4, title: "NEXUS LAUNCH", venue: "Global HQ", guests: "1.2k Units", budget: "£600k", img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800" },
  { id: 5, title: "OBSIDIAN NIGHTS", venue: "Private Penthouse", guests: "50 Units", budget: "£95k", img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800" },
  { id: 6, title: "ECHO SYMPOSIUM", venue: "The Glass House", guests: "500 Units", budget: "£320k", img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800" }
];

const EventsPortfolio: React.FC = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="min-h-screen bg-[#050505] text-[#E0E0E0] font-inter selection:bg-[#D4AF37] selection:text-black pb-32">
      <ExitPreviewButton />
      <EventsNavbar />

      <section className="pt-64 pb-32 px-6 max-w-7xl mx-auto text-center lg:text-left">
        <div className="flex flex-col lg:flex-row items-end justify-between gap-16">
          <div className="space-y-10">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} className="text-[#D4AF37] font-black text-[11px] uppercase tracking-[1em]">Visual Archive</motion.div>
            <motion.h1 
              initial={{ y: 30, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              className="font-syne text-7xl md:text-[11vw] font-black uppercase tracking-tighter leading-none"
            >
              EVENT <br /><span className="text-white/10 italic">BLUEPRINTS.</span>
            </motion.h1>
          </div>
          <div className="max-w-sm space-y-6 pb-6 border-l border-white/5 pl-10 hidden lg:block text-left">
             <p className="text-white/20 font-medium italic text-lg leading-relaxed">
               "A data-driven collection of cinematic production history. Every case study represents a total mastery of logistics and aesthetics."
             </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
        {caseStudies.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (idx % 3) * 0.15 }}
            className={`group relative overflow-hidden bg-white/[0.01] border border-white/5 shadow-2xl transition-all duration-700 hover:border-[#D4AF37]/40 ${idx % 2 === 0 ? 'md:mt-24' : ''}`}
          >
            {/* SCANNING LINE EFFECT */}
            <div className="absolute inset-0 z-30 pointer-events-none opacity-0 group-hover:opacity-100 overflow-hidden">
               <div className="w-full h-1 bg-[#D4AF37] shadow-[0_0_20px_#D4AF37] animate-scanner"></div>
            </div>

            <div className="aspect-[3/4] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-[1.5s] ease-out brightness-[0.7] group-hover:brightness-100">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
            </div>

            <div className="absolute top-6 left-6 z-20 text-[8px] font-black uppercase tracking-[0.4em] text-[#D4AF37] opacity-60">
              U_REF: CS-00{item.id}_X
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-90"></div>
            
            <div className="absolute inset-x-0 bottom-0 p-10 space-y-6">
              <h3 className="font-syne text-3xl font-black uppercase tracking-tight text-[#E0E0E0]">{item.title}</h3>
              <div className="grid grid-cols-2 gap-8 pt-6 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                <div className="space-y-1">
                   <p className="text-[8px] font-black uppercase tracking-widest text-[#D4AF37]/50">Capacity</p>
                   <p className="text-xs font-bold uppercase">{item.guests}</p>
                </div>
                <div className="space-y-1">
                   <p className="text-[8px] font-black uppercase tracking-widest text-[#D4AF37]/50">Managed Budget</p>
                   <p className="text-xs font-bold uppercase">{item.budget}</p>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-10 right-10 opacity-0 group-hover:opacity-100 transition-opacity">
               <div className="w-10 h-10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                  <ArrowUpRight size={18} />
               </div>
            </div>
          </motion.div>
        ))}
      </section>

      <section className="py-64 text-center">
         <div className="max-w-xl mx-auto space-y-12 px-6">
            <Layers size={40} className="mx-auto text-white/5" />
            <h4 className="font-syne text-4xl font-black uppercase tracking-tighter">DATASET COMPLETE.</h4>
            <Link to="/demo/events/book" className="inline-block px-16 py-7 border border-[#D4AF37]/50 text-[#D4AF37] font-black text-[10px] uppercase tracking-[0.8em] hover:bg-[#D4AF37] hover:text-black transition-all shadow-[0_0_30px_rgba(212,175,55,0.2)]">
              INITIALIZE SYNC
            </Link>
         </div>
      </section>

      <EventsFooter />

      <style>{`
        @keyframes scanner { 0% { transform: translateY(-100%); } 100% { transform: translateY(1000%); } }
        .animate-scanner { animation: scanner 3s linear infinite; }
      `}</style>
    </div>
  );
};

export default EventsPortfolio;
