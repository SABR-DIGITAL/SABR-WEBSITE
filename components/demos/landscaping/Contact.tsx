import React, { useState, useEffect } from 'react';
import * as RouterDOM from 'react-router-dom';
import * as FramerMotion from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, MoveLeft, Sprout, Sun } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import ExitPreviewButton from '../../ExitPreviewButton';

// Robust export resolution
const { Link } = RouterDOM as any;
const { motion, AnimatePresence } = FramerMotion as any;

const Contact: React.FC = () => {
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setIsSent(true);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] font-inter selection:bg-[#BC4B26] selection:text-white pb-32">
      <ExitPreviewButton />
      <Navbar />

      {/* Hero Header */}
      <section className="relative h-[45vh] flex items-center pt-24 px-8 overflow-hidden">
        <div className="absolute inset-0 z-0 scale-105 grayscale brightness-[0.3]">
          <img 
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1600" 
            alt="Forestry Work" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#1A3C28]/40"></div>
        </div>
        <div className="max-w-7xl mx-auto w-full relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-3 px-6 py-2 bg-[#BC4B26]/20 backdrop-blur-md rounded-full border border-white/20 mb-8"
          >
            <Sun size={14} className="text-[#BC4B26]" />
            <span className="text-white font-black text-[10px] uppercase tracking-[0.5em]">Consultations Available</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-white font-oswald text-5xl md:text-8xl font-bold tracking-tight uppercase leading-none"
          >
            START YOUR <br /> <span className="text-[#BC4B26] italic">JOURNEY.</span>
          </motion.h1>
        </div>
      </section>

      <section className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          
          {/* Left: Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "expo.out" }}
            viewport={{ once: true }}
            className="space-y-16"
          >
            <div>
              <div className="w-12 h-1.5 bg-[#BC4B26] mb-10"></div>
              <h2 className="text-[#1A3C28] font-oswald text-4xl md:text-5xl font-bold uppercase tracking-tight mb-8">Let's talk land.</h2>
              <p className="text-[#4A403A] text-lg leading-relaxed italic max-w-md border-l-4 border-[#BC4B26]/20 pl-8 opacity-80">
                "From site clearance to architectural garden builds, our specialist team provides fixed-price quotes with expert guidance."
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-8 group p-8 bg-white/50 border border-[#1A3C28]/5 hover:bg-white hover:shadow-2xl transition-all duration-500 rounded-sm transform-gpu hover:-translate-y-1">
                <div className="w-16 h-16 bg-[#1A3C28] flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-[#BC4B26] font-black text-[9px] uppercase tracking-[0.4em] mb-1">Direct Line</p>
                  <p className="text-[#1A3C28] font-black text-2xl font-inter">123-456-7890</p>
                </div>
              </div>

              <div className="flex items-center gap-8 group p-8 bg-white/50 border border-[#1A3C28]/5 hover:bg-white hover:shadow-2xl transition-all duration-500 rounded-sm transform-gpu hover:-translate-y-1">
                <div className="w-16 h-16 bg-[#1A3C28] flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-[#BC4B26] font-black text-[9px] uppercase tracking-[0.4em] mb-1">Email Studio</p>
                  <p className="text-[#1A3C28] font-black text-xl break-all">studio@oakandash.demo</p>
                </div>
              </div>
            </div>

            {/* Architectural Map Preview */}
            <div className="relative h-80 grayscale overflow-hidden border border-[#1A3C28]/10 group shadow-2xl rounded-sm transform-gpu">
              <img 
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?auto=format&fit=crop&q=80&w=800" 
                alt="Wiltshire Map" 
                className="w-full h-full object-cover opacity-30 transition-transform duration-[2s] group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-[#1A3C28]/5">
                 <div className="p-8 bg-white shadow-2xl flex items-center gap-4 rounded-sm">
                    <div className="w-10 h-10 bg-[#BC4B26] flex items-center justify-center text-white"><MapPin size={20} /></div>
                    <p className="text-[#1A3C28] font-black text-[10px] uppercase tracking-[0.4em]">Based in Wiltshire, United Kingdom</p>
                 </div>
              </div>
            </div>
          </motion.div>

          {/* Right: The Form */}
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: "expo.out" }}
            viewport={{ once: true }}
            className="bg-white p-10 md:p-20 shadow-[0_50px_100px_rgba(0,0,0,0.1)] relative border-t-8 border-[#BC4B26] rounded-sm transform-gpu"
          >
            <AnimatePresence mode="wait">
              {isSent ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20 flex flex-col items-center gap-10"
                >
                  <div className="w-24 h-24 bg-[#1A3C28] text-white flex items-center justify-center shadow-2xl animate-bounce">
                    <CheckCircle size={48} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-[#1A3C28] font-oswald text-3xl font-bold uppercase tracking-tight">ENQUIRY RECEIVED</h3>
                    <p className="text-[#4A403A] font-medium italic opacity-70">"Thank you. Our land management specialist will contact you within 24 hours."</p>
                  </div>
                  <Link to="/demo/landscaping" className="px-12 py-5 bg-[#BC4B26] text-white font-black text-[10px] uppercase tracking-widest hover:bg-[#1A3C28] transition-all">Return to Home</Link>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} 
                  className="space-y-12 relative z-10"
                >
                  <div className="space-y-8">
                    <h3 className="text-[#1A3C28] font-oswald text-2xl font-bold uppercase tracking-tight border-b border-[#1A3C28]/5 pb-6">Request A Site Visit</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-4">
                        <label className="text-[10px] uppercase tracking-[0.6em] text-[#4A403A] font-black block">Full Name</label>
                        <input required type="text" placeholder="John Oak" className="w-full bg-[#F4F1EA]/30 border-b border-[#1A3C28]/20 p-4 text-[#1A3C28] focus:outline-none focus:border-[#BC4B26] transition-all font-bold text-lg" />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] uppercase tracking-[0.6em] text-[#4A403A] font-black block">Project Location</label>
                        <input required type="text" placeholder="Postcode / Area" className="w-full bg-[#F4F1EA]/30 border-b border-[#1A3C28]/20 p-4 text-[#1A3C28] focus:outline-none focus:border-[#BC4B26] transition-all font-bold text-lg" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-[0.6em] text-[#4A403A] font-black block">Specialist Service</label>
                    <select required className="w-full bg-[#F4F1EA]/30 border-b border-[#1A3C28]/20 p-4 text-[#1A3C28] focus:outline-none focus:border-[#BC4B26] transition-all font-bold appearance-none">
                      <option value="">Select Service...</option>
                      <option value="mulching">Forestry Mulching</option>
                      <option value="harvesting">Timber Harvesting</option>
                      <option value="planning">Management Planning</option>
                      <option value="landscape">Full Architectural Landscape</option>
                    </select>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-[0.6em] text-[#4A403A] font-black block">Message / Scope</label>
                    <textarea rows={4} placeholder="Describe the land and your objectives..." className="w-full bg-[#F4F1EA]/30 border-b border-[#1A3C28]/20 p-4 text-[#1A3C28] focus:outline-none focus:border-[#BC4B26] transition-all font-bold text-lg resize-none" />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-8 bg-[#BC4B26] text-white font-black uppercase tracking-[0.6em] text-[13px] flex items-center justify-center gap-6 transition-all transform active:scale-95 shadow-2xl hover:bg-[#1A3C28]"
                  >
                    Send Enquiry <Send size={20} />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;