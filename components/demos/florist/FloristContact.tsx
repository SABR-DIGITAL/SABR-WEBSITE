import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowRight, Phone, MapPin } from 'lucide-react';
import FloristNavbar from './FloristNavbar';
import ExitPreviewButton from '../../ExitPreviewButton';

const FloristContact: React.FC = () => {
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => setIsSent(true), 1000);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans">
      <ExitPreviewButton />
      <FloristNavbar />

      <section className="py-40 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {isSent ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-20 rounded-[3rem] shadow-xl border border-slate-50 text-center space-y-8"
              >
                <div className="w-20 h-20 bg-[#A47864] text-[#F7EBA5] flex items-center justify-center rounded-full mx-auto shadow-2xl">
                  <CheckCircle size={40} />
                </div>
                <h2 className="font-serif text-4xl font-black text-[#1A1A1A]">Signal Received.</h2>
                <p className="text-xl text-slate-500 italic">"We've received your note. We'll be in touch shortly to talk about your flowers."</p>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-16">
                <header className="text-center space-y-4">
                   <h1 className="font-serif text-5xl md:text-8xl font-black text-[#1A1A1A] tracking-tighter leading-none">Say It With <br /><span className="text-[#A47864] italic">Flowers.</span></h1>
                   <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.6em]">Drop us a note below</p>
                </header>

                <form onSubmit={handleSubmit} className="bg-white p-12 md:p-20 rounded-[3rem] shadow-xl border border-slate-50 space-y-12">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-4">
                         <label className="text-[10px] uppercase tracking-[0.6em] text-slate-400 font-black block pl-4">Your Name</label>
                         <input required type="text" placeholder="Full name" className="w-full bg-[#FDFBF7] border-slate-100 rounded-2xl p-6 text-[#1A1A1A] focus:outline-none focus:border-[#A47864] transition-all font-bold shadow-sm" />
                      </div>
                      <div className="space-y-4">
                         <label className="text-[10px] uppercase tracking-[0.6em] text-slate-400 font-black block pl-4">Your Email</label>
                         <input required type="email" placeholder="email@address.com" className="w-full bg-[#FDFBF7] border-slate-100 rounded-2xl p-6 text-[#1A1A1A] focus:outline-none focus:border-[#A47864] transition-all font-bold shadow-sm" />
                      </div>
                   </div>
                   <div className="space-y-4">
                      <label className="text-[10px] uppercase tracking-[0.6em] text-slate-400 font-black block pl-4">The Occasion</label>
                      <textarea rows={4} placeholder="Wedding, anniversary, or just because..." className="w-full bg-[#FDFBF7] border-slate-100 rounded-2xl p-6 text-[#1A1A1A] focus:outline-none focus:border-[#A47864] transition-all font-bold shadow-sm resize-none" />
                   </div>
                   <button type="submit" className="w-full py-10 bg-[#A47864] text-white font-black uppercase tracking-[0.8em] text-[15px] rounded-[2rem] flex items-center justify-center gap-6 shadow-2xl hover:bg-[#1A1A1A] transition-all">
                      Send Signal <ArrowRight size={24} />
                   </button>
                </form>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-left">
                  <div className="p-8 bg-white border border-slate-50 rounded-[2.5rem] flex items-center gap-6">
                    <div className="w-12 h-12 bg-[#F7EBA5] rounded-full flex items-center justify-center text-[#A47864]"><Phone size={20} /></div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Call The Studio</p>
                      <p className="text-xl font-bold text-[#1A1A1A]">07123 456 789</p>
                    </div>
                  </div>
                  <div className="p-8 bg-white border border-slate-50 rounded-[2.5rem] flex items-center gap-6">
                    <div className="w-12 h-12 bg-[#F7EBA5] rounded-full flex items-center justify-center text-[#A47864]"><MapPin size={20} /></div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">The Workshop</p>
                      <p className="text-xl font-bold text-[#1A1A1A]">12 Petal Lane, Wiltshire</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default FloristContact;