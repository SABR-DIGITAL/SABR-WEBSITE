import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Mail, Phone, MapPin, Instagram, Twitter, Facebook } from 'lucide-react';
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
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-[#00D95F] selection:text-black flex flex-col">
      <ExitPreviewButton />
      <BarberNavbar />

      <section className="pt-32 pb-24 px-6 max-w-7xl mx-auto w-full flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-start">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <div>
              <span className="inline-block py-2 px-4 bg-neutral-100 text-neutral-900 font-bold text-[10px] uppercase tracking-[0.2em] mb-6 border-l-4 border-[#00D95F]">
                Contact
              </span>
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-black mb-8 leading-none uppercase">
                Get In <span className="text-[#00D95F]">Touch.</span>
              </h1>
              <p className="text-lg text-neutral-500 font-medium max-w-md leading-relaxed">
                For appointments, private sessions, or general enquiries, please do not hesitate to reach out.
              </p>
            </div>

            <div className="space-y-8 pt-8 border-t border-neutral-100">
              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-14 h-14 bg-neutral-100 rounded-none flex items-center justify-center text-neutral-900 group-hover:bg-[#00D95F] group-hover:text-black transition-all duration-300">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">Email Us</p>
                  <p className="text-xl font-black tracking-tight group-hover:text-[#00D95F] transition-colors">hello@freshcuts.com</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-14 h-14 bg-neutral-100 rounded-none flex items-center justify-center text-neutral-900 group-hover:bg-[#00D95F] group-hover:text-black transition-all duration-300">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">Call Us</p>
                  <p className="text-xl font-black tracking-tight group-hover:text-[#00D95F] transition-colors">020 7123 4567</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-14 h-14 bg-neutral-100 rounded-none flex items-center justify-center text-neutral-900 group-hover:bg-[#00D95F] group-hover:text-black transition-all duration-300">
                  <Instagram size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">Follow Us</p>
                  <p className="text-xl font-black tracking-tight group-hover:text-[#00D95F] transition-colors">@freshcuts_ldn</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-neutral-50 p-10 md:p-16 border border-neutral-200 relative overflow-hidden"
          >
            {/* Decor Blob */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#00D95F]/10 rounded-full blur-3xl pointer-events-none"></div>

            {isSent ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                className="text-center py-20 flex flex-col items-center justify-center h-full"
              >
                <div className="w-20 h-20 bg-[#00D95F]/10 rounded-full flex items-center justify-center text-[#00D95F] mb-8 animate-bounce">
                  <CheckCircle size={40} />
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tight mb-4">Message Sent!</h3>
                <p className="text-neutral-500 max-w-xs mx-auto font-medium">We'll get back to you shortly. Stay sharp.</p>
                <button 
                  onClick={() => setIsSent(false)} 
                  className="mt-8 px-8 py-3 bg-neutral-200 text-neutral-900 font-bold uppercase tracking-widest rounded-none hover:bg-neutral-300 transition-colors text-xs"
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-neutral-400 mb-2 pl-4">Your Name</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full bg-white border-2 border-neutral-100 p-5 rounded-none text-lg font-bold outline-none focus:border-[#00D95F] transition-all placeholder:text-neutral-300" 
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-neutral-400 mb-2 pl-4">Email Address</label>
                  <input 
                    required 
                    type="email" 
                    placeholder="john@example.com" 
                    className="w-full bg-white border-2 border-neutral-100 p-5 rounded-none text-lg font-bold outline-none focus:border-[#00D95F] transition-all placeholder:text-neutral-300" 
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-neutral-400 mb-2 pl-4">Message</label>
                  <textarea 
                    required 
                    rows={4} 
                    placeholder="How can we help?" 
                    className="w-full bg-white border-2 border-neutral-100 p-5 rounded-none text-lg font-bold outline-none focus:border-[#00D95F] transition-all placeholder:text-neutral-300 resize-none" 
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full py-5 bg-black text-white font-black uppercase tracking-widest rounded-none hover:bg-[#00D95F] transition-colors shadow-lg flex items-center justify-center gap-3 group"
                >
                  Send Message <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-neutral-100 py-12 text-center">
        <div className="flex justify-center gap-8 mb-8 text-neutral-400">
           <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#00D95F] transition-colors cursor-pointer"><Instagram size={20} /></a>
           <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#00D95F] transition-colors cursor-pointer"><Twitter size={20} /></a>
           <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#00D95F] transition-colors cursor-pointer"><Facebook size={20} /></a>
        </div>
        <p className="text-xs uppercase tracking-widest text-neutral-400 font-bold">© 2026 FreshCuts Barber Studio</p>
      </footer>
    </div>
  );
};

export default BarberContact;
