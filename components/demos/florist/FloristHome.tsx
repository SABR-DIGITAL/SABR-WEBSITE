import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Gift, Sun, Flower2, Heart, Instagram } from 'lucide-react';
import FloristNavbar from './FloristNavbar';
import ExitPreviewButton from '../../ExitPreviewButton';

const FloristHome: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans selection:bg-[#A47864] selection:text-white overflow-x-hidden">
      <ExitPreviewButton />
      <FloristNavbar />

      {/* LOYALTY TREAT */}
      <motion.div 
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 1, type: 'spring' }}
        className="fixed bottom-32 right-8 z-[200] group cursor-pointer"
      >
        <div className="bg-[#F7EBA5] p-6 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-white flex flex-col items-center justify-center text-center w-28 h-28 hover:scale-110 transition-transform">
          <Gift size={20} className="text-[#A47864] mb-1" />
          <p className="text-[9px] font-black uppercase tracking-tighter text-[#A47864] leading-tight">Welcome Back</p>
          <p className="text-[10px] font-bold text-[#1A1A1A]">FREE ROSE</p>
          <div className="absolute bottom-full right-0 mb-4 w-48 bg-[#1A1A1A] text-[#F7EBA5] p-4 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-xs leading-relaxed shadow-xl">
            "Mention 'SABR Blooms' for a free single-stem rose with any bouquet purchase!"
          </div>
        </div>
      </motion.div>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#FDFBF7]">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,#F7EBA5_0%,transparent_50%)] opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,#A47864_0%,transparent_50%)] opacity-10"></div>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col lg:flex-row items-center gap-20">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="flex-1 text-center lg:text-left space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-100 shadow-sm">
              <Sun size={14} className="text-[#F7EBA5] fill-current" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Locally Grown & Hand-Picked</span>
            </div>
            <h1 className="font-serif text-6xl md:text-[8vw] leading-[0.9] text-[#1A1A1A] font-black tracking-tighter">
              Artistry In <br /> <span className="text-[#A47864] italic">Every</span> <br /> Petal.
            </h1>
            <p className="text-xl text-slate-500 font-medium max-w-lg leading-relaxed mx-auto lg:mx-0">
              Bespoke floral arrangements that tell your story. From wild garden styles to elegant bridal bouquets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Link to="/demo/florist/bouquets" className="px-12 py-6 bg-[#A47864] text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] shadow-xl hover:scale-105 transition-all text-center">
                The Bloom Menu
              </Link>
              <Link to="/demo/florist/contact" className="px-12 py-6 bg-white border border-[#A47864]/20 text-[#A47864] rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] hover:bg-slate-50 transition-all text-center">
                Send Flowers
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex-1 relative"
          >
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white group">
              <img 
                src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=1200" 
                alt="Beautiful Bouquet" 
                className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/40 to-transparent"></div>
              <div className="absolute bottom-10 left-10 right-10 p-6 bg-white/20 backdrop-blur-xl border border-white/20 rounded-3xl flex items-center justify-between text-white">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest opacity-80 mb-1">Today's Special</p>
                  <p className="font-bold text-xl uppercase tracking-tighter">Wildwood Rose</p>
                </div>
                <div className="w-12 h-12 bg-[#F7EBA5] rounded-full flex items-center justify-center text-[#1A1A1A]">
                  <Flower2 size={20} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-24 bg-[#1A1A1A] text-[#F7EBA5] text-center">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
           <h2 className="font-serif text-4xl font-bold">Visit Our Garden.</h2>
           <p className="text-white/40 italic">12 Petal Lane, Wiltshire • Open 9am - 6pm</p>
           <div className="flex justify-center gap-8 pt-8">
             <Instagram size={24} className="hover:text-white transition-colors cursor-pointer" />
             <Heart size={24} className="hover:text-white transition-colors cursor-pointer" />
           </div>
           <p className="text-[10px] font-black uppercase tracking-[0.8em] opacity-20">© 2025 BLOOM & STEM | SABR DIGITAL DEMO</p>
        </div>
      </footer>
    </div>
  );
};

export default FloristHome;