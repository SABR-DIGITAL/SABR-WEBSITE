
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Mail, Phone, MapPin, Instagram, Sparkles, Send } from 'lucide-react';
import ExitPreviewButton from '../../ExitPreviewButton';
import CafeNavbar from './CafeNavbar';
import CafeFooter from './CafeFooter';

const CafeContact: React.FC = () => {
  const [isSent, setIsSent] = useState(false);

  useEffect(() => window.scrollTo(0, 0), []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => setIsSent(true), 1200);
  };

  return (
    <div className="min-h-screen bg-[#FFF9F5] font-sans selection:bg-[#A4715E] selection:text-white overflow-x-hidden">
      <ExitPreviewButton />
      <CafeNavbar />

      <section className="pt-56 pb-32 px-6 text-center">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} className="text-[#A4715E] font-black text-[12px] uppercase tracking-[1em] mb-8">Establish A Connection</motion.p>
        <motion.h1 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          className="font-serif text-6xl md:text-[10vw] font-black uppercase tracking-tighter text-[#4A403A] leading-none"
        >
          SAY <span className="text-[#A4715E] italic">HELLO.</span>
        </motion.h1 >
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-48">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-20"
          >
            <div className="space-y-12">
               <div className="w-20 h-1 bg-[#A4715E]"></div>
               <h2 className="font-serif text-5xl md:text-6xl font-bold text-[#4A403A] uppercase tracking-tighter leading-none">We'd love to <br /> host you.</h2>
               <p className="text-[#A4715E]/70 text-2xl font-medium italic border-l-4 border-[#FDE2E4] pl-10 leading-relaxed max-w-lg">
                 "Whether you're planning an event, inquiring about our beans, or just sharing the love—our inbox is open."
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#A4715E]/40">Email Studio</p>
                  <p className="text-2xl font-bold text-[#4A403A] hover:text-[#A4715E] transition-colors cursor-pointer break-words">hello@thehearth.cafe</p>
               </div>
               <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#A4715E]/40">Direct Line</p>
                  <p className="text-2xl font-bold text-[#4A403A] hover:text-[#A4715E] transition-colors cursor-pointer">07123 456 789</p>
               </div>
            </div>

            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="block relative aspect-square md:aspect-video rounded-[4rem] overflow-hidden shadow-3xl border-[12px] border-white group">
               <img src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" alt="Cafe exterior window view" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#4A403A]/60 to-transparent"></div>
               <div className="absolute bottom-10 left-10 text-white flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20">
                     <Instagram size={24} />
                  </div>
                  <span className="font-bold tracking-widest uppercase text-xs">@TheHearthWiltshire</span>
               </div>
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-12 md:p-20 rounded-[5rem] shadow-[0_50px_150px_rgba(164,113,94,0.1)] border border-[#A4715E]/5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none rotate-12">
               <Send size={400} strokeWidth={1} />
            </div>

            <AnimatePresence mode="wait">
              {isSent ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  className="text-center py-24 space-y-12"
                >
                  <div className="w-24 h-24 bg-[#A4715E] text-white flex items-center justify-center rounded-full mx-auto shadow-[0_20px_50px_rgba(164,113,94,0.4)] animate-bounce">
                    <CheckCircle size={48} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-serif text-4xl font-bold text-[#4A403A]">Message Sent.</h3>
                    <p className="text-[#A4715E]/60 italic font-medium text-xl leading-relaxed">"We've caught your note. One of our team will be in touch within a few heartbeats."</p>
                  </div>
                  <div className="pt-6">
                    <Link to="/demo/cafe" className="px-14 py-6 bg-[#4A403A] text-white rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-[#A4715E] transition-all">Back to Home</Link>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-12 relative z-10">
                   <div className="space-y-4">
                      <h3 className="font-serif text-4xl font-bold text-[#4A403A] tracking-tighter">Inquiry Form</h3>
                      <div className="w-12 h-1 bg-[#FDE2E4]"></div>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-4">
                         <label className="text-[10px] uppercase tracking-[0.6em] text-[#A4715E]/40 font-black block pl-4">Your Name</label>
                         <input required type="text" placeholder="Full name" className="w-full bg-[#FFF9F5] border border-transparent rounded-3xl p-8 text-[#4A403A] focus:outline-none focus:border-[#A4715E] focus:bg-white transition-all font-bold text-lg shadow-sm" />
                      </div>
                      <div className="space-y-4">
                         <label className="text-[10px] uppercase tracking-[0.6em] text-[#A4715E]/40 font-black block pl-4">Email Address</label>
                         <input required type="email" placeholder="you@example.com" className="w-full bg-[#FFF9F5] border border-transparent rounded-3xl p-8 text-[#4A403A] focus:outline-none focus:border-[#A4715E] focus:bg-white transition-all font-bold text-lg shadow-sm" />
                      </div>
                   </div>
                   
                   <div className="space-y-4">
                      <label className="text-[10px] uppercase tracking-[0.6em] text-[#A4715E]/40 font-black block pl-4">Subject</label>
                      <select required className="w-full bg-[#FFF9F5] border border-transparent rounded-3xl p-8 text-[#4A403A] focus:outline-none focus:border-[#A4715E] focus:bg-white transition-all font-bold text-lg shadow-sm appearance-none cursor-pointer">
                         <option>General Inquiry</option>
                         <option>Private Hire / Events</option>
                         <option>Special Orders & Cakes</option>
                         <option>Wholesale Partnerships</option>
                      </select>
                   </div>
                   
                   <div className="space-y-4">
                      <label className="text-[10px] uppercase tracking-[0.6em] text-[#A4715E]/40 font-black block pl-4">Your Message</label>
                      <textarea rows={5} placeholder="How can we help?" className="w-full bg-[#FFF9F5] border border-transparent rounded-3xl p-8 text-[#4A403A] focus:outline-none focus:border-[#A4715E] focus:bg-white transition-all font-bold text-lg shadow-sm resize-none" />
                   </div>
                   
                   <button type="submit" className="w-full py-12 bg-[#4A403A] text-white font-black uppercase tracking-[0.8em] text-[16px] rounded-[3rem] flex items-center justify-center gap-6 shadow-[0_25px_60px_rgba(74,64,58,0.3)] hover:bg-[#A4715E] transition-all duration-500 transform active:scale-95 group overflow-hidden relative">
                      <span className="relative z-10">Send Message</span>
                      <ArrowRight size={24} className="relative z-10 group-hover:translate-x-3 transition-transform" />
                      <div className="absolute inset-0 bg-[#A4715E] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500"></div>
                   </button>
                   
                   <div className="flex items-center justify-center gap-3 text-[#A4715E]/30">
                      <Sparkles size={14} />
                      <span className="text-[9px] font-black uppercase tracking-[0.4em]">Response within 24 business hours</span>
                   </div>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <CafeFooter />
    </div>
  );
};

export default CafeContact;
