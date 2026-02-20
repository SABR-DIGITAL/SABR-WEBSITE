
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Send, Instagram, Phone, Mail, MapPin, Clock, Users, Terminal, Activity, Database } from 'lucide-react';
import { Link } from 'react-router-dom';
import ExitPreviewButton from '../../ExitPreviewButton';
import BarberNavbar from './BarberNavbar';

const BarberContact: React.FC = () => {
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => setIsSent(true), 1200);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#E0E0E0] font-inter selection:bg-[#7F00FF] selection:text-white relative overflow-hidden">
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-[100] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      <ExitPreviewButton />
      <BarberNavbar />

      <section className="pt-64 pb-48 px-6 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="space-y-20"
          >
            <div className="space-y-10">
              <div className="w-20 h-1 bg-[#7F00FF]"></div>
              <h1 className="font-syne text-7xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85]">SEND <br /><span className="text-white/20 italic">SIGNAL.</span></h1>
              <p className="text-xl text-white/40 font-medium italic border-l-4 border-[#7F00FF]/30 pl-10 leading-relaxed max-w-md">
                "Technical discourse initialized. We monitor all frequencies for premium partnership and site inquiries."
              </p>
            </div>

            <div className="space-y-12">
               <div className="flex gap-8 items-start group">
                  <div className="w-14 h-14 bg-white/[0.02] border border-white/5 flex items-center justify-center text-[#7F00FF] group-hover:bg-[#7F00FF] group-hover:text-white transition-all duration-500">
                     <Terminal size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-2">Communication Point</p>
                    <p className="text-3xl font-syne font-bold tracking-tight">STUDIO@VERTEX.SYS</p>
                  </div>
               </div>
               <div className="flex gap-8 items-start group">
                  <div className="w-14 h-14 bg-white/[0.02] border border-white/5 flex items-center justify-center text-[#7F00FF] group-hover:bg-[#7F00FF] group-hover:text-white transition-all duration-500">
                     <Instagram size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-2">Visual Feed</p>
                    <p className="text-3xl font-syne font-bold tracking-tight">@VERTEX_PRECISION</p>
                  </div>
               </div>
            </div>

            <div className="pt-12 border-t border-white/5 flex items-center gap-12 text-[9px] font-black uppercase tracking-[0.5em] text-white/10">
               <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-[#7F00FF] rounded-full animate-ping"></div>
                  <span>Uplink Active</span>
               </div>
               <span>SYS_SECURE: 256bit</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="bg-white/[0.02] border border-white/5 p-10 md:p-20 backdrop-blur-3xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none rotate-12">
               <Activity size={500} strokeWidth={1} />
            </div>

            <AnimatePresence mode="wait">
              {isSent ? (
                <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-24 space-y-12 relative z-10">
                  <div className="w-24 h-24 border-2 border-[#7F00FF] flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(127,0,255,0.2)]">
                     <CheckCircle size={48} className="text-[#7F00FF]" />
                  </div>
                  <div className="space-y-6">
                    <h3 className="font-syne text-4xl font-black uppercase tracking-tighter text-[#F1E6FF]">TRANSMISSION RECEIVED.</h3>
                    <p className="text-xl text-white/30 italic font-medium">"Your signal has been prioritized. Response incoming within 01 business epoch."</p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-12 relative z-10">
                   <div className="space-y-2">
                      <h3 className="font-syne text-4xl font-black uppercase tracking-tight">ENQUIRY MODULE.</h3>
                      <div className="w-12 h-1 bg-[#7F00FF]"></div>
                   </div>

                   <div className="space-y-8">
                      <div className="group space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 ml-2">Identity Signature</label>
                        <input required type="text" placeholder="Full Name / Org" className="w-full bg-white/5 border border-white/10 p-6 text-white focus:outline-none focus:border-[#7F00FF] transition-all font-bold text-lg rounded-none uppercase" />
                      </div>
                      <div className="group space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 ml-2">Contact Vector</label>
                        <input required type="email" placeholder="Email / Signal Handle" className="w-full bg-white/5 border border-white/10 p-6 text-white focus:outline-none focus:border-[#7F00FF] transition-all font-bold text-lg rounded-none" />
                      </div>
                      <div className="group space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 ml-2">Information Payload</label>
                        <textarea rows={4} placeholder="Detailed inquiry content..." className="w-full bg-white/5 border border-white/10 p-6 text-white focus:outline-none focus:border-[#7F00FF] transition-all font-bold text-lg rounded-none resize-none" />
                      </div>
                   </div>

                   <button type="submit" className="w-full py-10 bg-white/[0.02] border border-[#7F00FF] text-[#F1E6FF] font-black uppercase tracking-[1em] text-[13px] hover:bg-[#7F00FF] hover:text-[#050505] transition-all duration-700 shadow-2xl active:scale-95 group flex items-center justify-center gap-6">
                      INITIALIZE SEND <Send size={20} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
                   </button>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* METADATA FOOTER */}
      <div className="max-w-7xl mx-auto px-6 py-24 opacity-10 flex items-center justify-between pointer-events-none">
         <Database size={24} />
         <p className="text-[8px] font-black uppercase tracking-[2em]">ENCRYPTED_SIGNAL_STREAM</p>
         <Database size={24} />
      </div>
    </div>
  );
};

export default BarberContact;
