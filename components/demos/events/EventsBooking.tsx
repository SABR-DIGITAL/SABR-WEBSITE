
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, Activity, Database, Calendar } from 'lucide-react';
import ExitPreviewButton from '../../ExitPreviewButton';
import EventsNavbar from './EventsNavbar';
import EventsFooter from './EventsFooter';

const EventsBooking: React.FC = () => {
  const [isSent, setIsSent] = useState(false);
  const [formData, setFormData] = useState({ type: '', scope: 'SILVER', epoch: '' });

  useEffect(() => window.scrollTo(0, 0), []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => setIsSent(true), 1500);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#E0E0E0] font-inter selection:bg-[#D4AF37] selection:text-black">
      <ExitPreviewButton />
      <EventsNavbar />

      <section className="pt-64 pb-48 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-24 items-start">
          
          <div className="lg:col-span-1 space-y-12">
            <div className="space-y-6">
              <span className="text-[#D4AF37] font-black text-[10px] uppercase tracking-[1.2em]">Synchronization</span>
              <h1 className="font-syne text-6xl md:text-7xl font-black uppercase tracking-tighter leading-none">THE <br /> <span className="text-white/10 italic">PROTOCOL.</span></h1>
            </div>

            <div className="p-10 border border-white/5 bg-white/[0.01] backdrop-blur-3xl space-y-10 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-20"></div>
               <div className="flex items-center justify-between opacity-30">
                  <span className="text-[9px] font-black uppercase tracking-[0.5em]">Active Uplink</span>
                  <Activity size={14} className="text-[#D4AF37] animate-pulse" />
               </div>
               <div className="space-y-6">
                  <p className="text-[9px] font-black uppercase tracking-widest text-white/20">Production Load</p>
                  <div className="w-full h-[2px] bg-white/5 relative">
                     <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 0.85 }} className="absolute inset-0 bg-[#D4AF37] origin-left"></motion.div>
                  </div>
                  <p className="text-xs font-bold uppercase text-[#D4AF37]/60 italic">"Global site capacity at 85%. Ready for new unit allocation."</p>
               </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {isSent ? (
                <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/[0.01] border border-[#D4AF37]/30 p-24 text-center space-y-12 backdrop-blur-3xl">
                  <div className="w-24 h-24 border border-[#D4AF37] flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(212,175,55,0.1)]">
                     <CheckCircle size={40} className="text-[#D4AF37]" />
                  </div>
                  <div className="space-y-6">
                    <h3 className="font-syne text-5xl font-black uppercase tracking-tighter">DATA LOCKED.</h3>
                    <p className="text-xl text-white/20 italic font-medium max-w-md mx-auto leading-relaxed">
                      "Project signal captured. A lead architect will contact your communications node within 24 hours."
                    </p>
                  </div>
                  <Link to="/demo/events" className="inline-block px-16 py-6 border border-[#D4AF37]/50 text-[#D4AF37] font-black text-[10px] uppercase tracking-[0.8em] hover:bg-[#D4AF37] hover:text-black transition-all">Return to Hub</Link>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-16">
                  <div className="space-y-10">
                     <div className="flex items-center gap-6">
                        <div className="w-8 h-8 border border-[#D4AF37] flex items-center justify-center text-[10px] font-black">01</div>
                        <h4 className="font-syne text-3xl font-black uppercase tracking-tight">EVENT CLASSIFICATION.</h4>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {['CORPORATE GALA', 'LUXURY WEDDING', 'BRAND ACTIVATION', 'PRIVATE FESTIVAL'].map(t => (
                          <button key={t} type="button" onClick={() => setFormData({...formData, type: t})} className={`p-10 border text-left transition-all duration-700 ${formData.type === t ? 'bg-[#D4AF37] border-[#D4AF37] text-black shadow-2xl' : 'bg-white/5 border-white/5 hover:border-[#D4AF37]/40'}`}>
                             <h5 className="font-syne text-xl font-black uppercase tracking-tight">{t}</h5>
                          </button>
                        ))}
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-24 pt-16 border-t border-white/5">
                    <div className="space-y-10">
                       <div className="flex items-center gap-6">
                          <div className="w-8 h-8 border border-[#D4AF37] flex items-center justify-center text-[10px] font-black">02</div>
                          <h4 className="font-syne text-2xl font-black uppercase tracking-tight">TEMPORAL WINDOW.</h4>
                       </div>
                       <input required type="date" className="w-full bg-white/5 border-b border-white/10 p-6 text-[#E0E0E0] focus:outline-none focus:border-[#D4AF37] font-bold text-lg rounded-none uppercase" />
                    </div>
                    <div className="space-y-10">
                       <div className="flex items-center gap-6">
                          <div className="w-8 h-8 border border-[#D4AF37] flex items-center justify-center text-[10px] font-black">03</div>
                          <h4 className="font-syne text-2xl font-black uppercase tracking-tight">SCOPE MATRIX.</h4>
                       </div>
                       <div className="grid grid-cols-2 gap-3">
                          {['BRONZE', 'SILVER', 'GOLD', 'PLATINUM'].map(s => (
                            <button key={s} type="button" onClick={() => setFormData({...formData, scope: s})} className={`py-4 text-[10px] font-black uppercase tracking-widest border transition-all ${formData.scope === s ? 'bg-[#D4AF37] border-[#D4AF37] text-black shadow-xl' : 'bg-transparent text-white/20 border-white/5'}`}>{s}</button>
                          ))}
                       </div>
                    </div>
                  </div>

                  <button type="submit" className="w-full py-12 bg-white/[0.02] border border-[#D4AF37] text-[#D4AF37] font-black uppercase tracking-[1em] text-[15px] hover:bg-[#D4AF37] hover:text-black transition-all duration-700 shadow-2xl active:scale-[0.98]">
                    INITIALIZE TRANSMISSION
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <EventsFooter />
    </div>
  );
};

export default EventsBooking;
