import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Music, Users, Sparkles, Globe, Target, Cpu, MessageSquare, Zap, ShieldCheck } from 'lucide-react';
import ExitPreviewButton from '../../ExitPreviewButton';
import EventsNavbar from './EventsNavbar';
import EventsFooter from './EventsFooter';

const packages = [
  { name: "BRONZE", label: "ESSENTIALS", price: "POA", color: "border-slate-500/30", features: ["Basic Planning", "Supplier Coordination", "On-Day Sync"] },
  { name: "SILVER", label: "ENHANCED", price: "POA", color: "border-slate-300/40", features: ["Design & Decor", "Entertainment Sourcing", "Logistics Management", "Sound Systems"] },
  { name: "GOLD", label: "PREMIUM", price: "POA", color: "border-[#D4AF37]/50", features: ["Full Creative Direction", "Production Build", "Guest Experience Design", "LED Screen Matrix"] },
  { name: "PLATINUM", label: "ULTRA LUXURY", price: "POA", color: "border-[#D4AF37]", features: ["Bespoke Everything", "Celebrity Talent Booking", "Cinematic Staging", "VIP Concierge Team"] }
];

const EventsServices: React.FC = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="min-h-screen bg-[#050505] text-[#E0E0E0] font-inter selection:bg-[#D4AF37] selection:text-black">
      <ExitPreviewButton />
      <EventsNavbar />

      <section className="pt-64 pb-32 px-6 max-w-7xl mx-auto text-center lg:text-left">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} className="text-[#D4AF37] font-black text-[11px] uppercase tracking-[1em] mb-8">Production Capability</motion.div>
        <h1 className="font-syne text-6xl md:text-[9vw] font-black uppercase tracking-tighter leading-none mb-20">ELITE <br /><span className="text-white/10 italic">SOLUTIONS.</span></h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-10 border ${pkg.color} bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-700 space-y-10 group relative`}
            >
              <div className="space-y-2">
                 <p className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37] opacity-60">{pkg.label}</p>
                 <h3 className="font-syne text-3xl font-black tracking-tight">{pkg.name}</h3>
              </div>
              <ul className="space-y-4 pt-10 border-t border-white/5">
                {pkg.features.map((f, j) => (
                  <li key={j} className="flex gap-4 items-center text-xs font-bold text-white/30 group-hover:text-white/60 transition-colors">
                    <div className="w-1 h-1 bg-[#D4AF37] rounded-full"></div> {f}
                  </li>
                ))}
              </ul>
              <div className="pt-10">
                 <p className="text-2xl font-syne font-black">{pkg.price}</p>
                 <p className="text-[9px] font-black uppercase tracking-widest text-white/10">Fixed Fee Structure</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CORE CAPABILITIES */}
      <section className="py-48 px-6 bg-[#080808]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-24">
          <div className="lg:col-span-1 space-y-10">
             <div className="w-20 h-1 bg-[#D4AF37]"></div>
             <h2 className="font-syne text-5xl font-black uppercase tracking-tighter leading-tight text-white">BEYOND <br />PLANNING.</h2>
             <p className="text-xl text-white/30 italic leading-relaxed">"We control the entire spectrum. From the power grid to the guest list, we engineer zero-fail environments."</p>
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-12">
             {[
               { icon: <Cpu />, title: "TECH LOGISTICS", desc: "Rigging, sound, and visual engineering." },
               { icon: <Users />, title: "VIP CONCIERGE", desc: "High-level guest management and privacy." },
               { icon: <MessageSquare />, title: "COMMUNICATIONS", desc: "On-site radio networks and data feeds." },
               { icon: <ShieldCheck />, title: "RISK MITIGATION", desc: "Full H&S protocols and site security." }
             ].map((item, idx) => (
               <div key={idx} className="flex gap-8 group">
                  <div className="w-16 h-16 bg-[#D4AF37]/5 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-500 shrink-0">
                    {/* Fixed type error for cloneElement props */}
                    {React.cloneElement(item.icon as React.ReactElement<any>, { size: 28, strokeWidth: 1.5 })}
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-syne text-xl font-black uppercase tracking-tight">{item.title}</h4>
                    <p className="text-sm font-medium italic text-white/30">"{item.desc}"</p>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      <EventsFooter />
    </div>
  );
};

export default EventsServices;