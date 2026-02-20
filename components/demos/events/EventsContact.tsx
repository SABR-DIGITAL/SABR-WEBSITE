
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, Database, Globe, Music } from 'lucide-react';
import ExitPreviewButton from '../../ExitPreviewButton';
import EventsNavbar from './EventsNavbar';
import EventsFooter from './EventsFooter';

const EventsContact: React.FC = () => {
  const [isSent, setIsSent] = useState(false);

  useEffect(() => window.scrollTo(0, 0), []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => setIsSent(true), 1200);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#E0E0E0] font-inter selection:bg-[#D4AF37] selection:text-black relative overflow-hidden">
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none z-[100] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      <ExitPreviewButton />
      <EventsNavbar />

      <section className="pt-64 pb-48 px-6 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2 }} className="space-y-20">
            <div className="space-y-10">
              <div className="w-20 h-1 bg-[#D4AF37]"></div>
              <h1 className="font-syne text-7xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85]">SEND <br /><span className="text-white/10 italic">SIGNAL.</span></h1>
              <p className="text-xl text-white/30 font-medium italic border-l-4 border-[#D4AF37]/30 pl-10 leading-relaxed max-w-md">
                "Technical discourse initialized. We monitor all frequencies for global production and elite celebration inquiries."
              </p>
            </div>

            <div className="space-y-12">
               <div className="flex gap-8 items-start group">
                  <div className="w-14 h-14 bg-white/[0.02] border border-white/5 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-500">
                     <Globe size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/10 mb-2">Comms Hub</p>
                    <p className="text-3xl font-syne font-bold tracking-tight">GLOBAL@VANTAGE.ELITE</p>
                  </div>
               </div>
               <div className="flex gap-8 items-start group">
                  <div className="w-14 h-14 bg-white/[0.02] border border-white/5 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-500">
                     <Music size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/10 mb-2">Visual Feed</p>
                    <p className="text-3xl font-syne font-bold tracking-tight">@VANTAGE_PROD</p>
                  </div>
               </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2 }} className="bg-white/[0.01] border border-white/5 p-12 md:p-20 backdrop-blur-3xl relative">
            <AnimatePresence mode="wait">
              {isSent ? (
                <div className="text-center py-24 space-y-12 relative z-10">
                  <div className="w-24 h-24 border border-[#D4AF37] flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(212,175,55,0.1)]">
                     <CheckCircle size={48} className="text-[#D4AF37]" />
                  </div>
                  <h3 className="font-syne text-4xl font-black uppercase tracking-tighter text-white">RECEIVED.</h3>
                  <p className="text-xl text-white/20 italic font-medium">"Signal prioritized. Response incoming within 01 business epoch."</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-12 relative z-10">
                   <div className="space-y-4">
                      <h3 className="font-syne text-4xl font-black uppercase tracking-tight">INQUIRY MODULE.</h3>
                      <div className="w-12 h-1 bg-[#D4AF37]/40"></div>
                   </div>

                   <div className="space-y-8">
                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.5em] text-white/10 ml-2">Identity Signature</label>
                        <input required type="text" placeholder="Full Name / Brand" className="w-full bg-white/5 border border-white/5 p-6 text-white focus:outline-none focus:border-[#D4AF37] transition-all font-bold text-lg rounded-none uppercase" />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.5em] text-white/10 ml-2">Communication Point</label>
                        <input required type="email" placeholder="Email / Uplink Handle" className="w-full bg-white/5 border border-white/5 p-6 text-white focus:outline-none focus:border-[#D4AF37] transition-all font-bold text-lg rounded-none" />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.5em] text-white/10 ml-2">Information Payload</label>
                        <textarea rows={4} placeholder="Production details..." className="w-full bg-white/5 border border-white/5 p-6 text-white focus:outline-none focus:border-[#D4AF37] transition-all font-bold text-lg rounded-none resize-none" />
                      </div>
                   </div>

                   <button type="submit" className="w-full py-10 bg-[#D4AF37] text-black font-black uppercase tracking-[1em] text-[13px] hover:bg-white transition-all duration-700 shadow-2xl active:scale-95 group flex items-center justify-center gap-6">
                      INITIALIZE SEND <Send size={20} />
                   </button>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <EventsFooter />
    </div>
  );
};

export default EventsContact;
