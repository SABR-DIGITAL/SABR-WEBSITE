import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Scissors, Star, Zap, Clock, ShieldCheck } from 'lucide-react';
import ExitPreviewButton from '../../ExitPreviewButton';
import BarberNavbar from './BarberNavbar';
import BarberTestimonials from './BarberTestimonials';
import BarberTeam from './BarberTeam';

const BarberHome: React.FC = () => {
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Intro animation timer
    const timer = setTimeout(() => setIntroComplete(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const services = [
    { name: "Skin Fade", price: "£30", desc: "Seamless gradient, razor finish." },
    { name: "Beard Sculpt", price: "£25", desc: "Hot towel, shape up, oil treatment." },
    { name: "Full Service", price: "£50", desc: "Cut, wash, beard, and facial." }
  ];

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-[#00D95F] selection:text-black overflow-hidden">
      <ExitPreviewButton />
      
      {/* INTRO ANIMATION */}
      <AnimatePresence>
        {!introComplete && (
          <motion.div 
            initial={{ y: 0 }}
            exit={{ y: '-100%', transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } }}
            className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center text-white"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4 mb-4"
            >
              <Scissors size={64} className="transform -rotate-45 text-[#00D95F]" />
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-6xl md:text-8xl font-black uppercase tracking-tighter"
            >
              Fresh<span className="text-[#00D95F]">Cuts</span>
            </motion.h1>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 200 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="h-2 bg-[#00D95F] mt-6 rounded-none"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <BarberNavbar />

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="space-y-6 relative z-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 rounded-none text-xs font-bold uppercase tracking-[0.2em] text-neutral-900 border-l-4 border-[#00D95F]">
              <ShieldCheck size={14} className="text-[#00D95F]" />
              <span>Certified Fresh</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-black">
              Look Sharp. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D95F] to-[#00ff73]">Stay Fresh.</span>
            </h1>
            
            <p className="text-lg text-neutral-500 font-medium max-w-md leading-relaxed border-l-2 border-neutral-200 pl-6">
              Modern grooming for the modern man. Precision cuts, expert styling, and an atmosphere that gets you right.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link 
                to="/demo/barber/book" 
                className="px-8 py-4 bg-[#00D95F] text-white text-sm font-black uppercase tracking-[0.15em] hover:bg-black transition-colors duration-300 flex items-center gap-4 group rounded-none"
              >
                Book Now <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/demo/barber/cuts" 
                className="px-8 py-4 border-2 border-black text-black text-sm font-black uppercase tracking-[0.15em] hover:bg-black hover:text-white transition-colors rounded-none"
              >
                Gallery
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="relative"
          >
            {/* Geometric Accents */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#00D95F]/10 z-0"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-black/5 z-0"></div>

            <div className="relative rounded-none overflow-hidden shadow-2xl border-4 border-white z-10">
              <img 
                src="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&q=80&w=1200" 
                alt="Modern Barber Shop" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              
              {/* Floating Badge */}
              <div className="absolute bottom-0 right-0 bg-[#00D95F] p-8">
                <Scissors size={32} className="text-white transform -rotate-45" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* QUICK SERVICES */}
      <section className="py-24 bg-neutral-50 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
             <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
               The <span className="text-[#00D95F]">Menu.</span>
             </h2>
             <Link to="/demo/barber/cuts" className="text-black font-bold uppercase tracking-widest hover:text-[#00D95F] transition-colors flex items-center gap-2">
                Full Price List <ArrowRight size={16} />
             </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white p-10 shadow-sm hover:shadow-xl transition-all duration-500 border-l-4 border-transparent hover:border-[#00D95F] relative overflow-hidden"
              >
                <h3 className="text-3xl font-black uppercase tracking-tight mb-2 relative z-10">{s.name}</h3>
                <p className="text-4xl font-black text-[#00D95F] mb-6 relative z-10">{s.price}</p>
                <p className="text-neutral-500 font-medium mb-8 relative z-10">{s.desc}</p>
                
                <Link to="/demo/barber/book" className="inline-flex items-center gap-2 font-bold uppercase tracking-widest text-xs border-b-2 border-black pb-1 hover:text-[#00D95F] hover:border-[#00D95F] transition-colors relative z-10">
                  Book This <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <BarberTestimonials />

      {/* BIG TEXT SECTION */}
      <section className="py-32 bg-[#00D95F] text-black overflow-hidden relative">
         <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <Zap size={64} className="mx-auto mb-8 text-white" />
            <h2 className="text-6xl md:text-[8vw] font-black uppercase tracking-tighter leading-none mb-12">
               Precision <br />
               <span className="text-white">Or Nothing.</span>
            </h2>
            <p className="text-xl md:text-2xl font-bold max-w-2xl mx-auto opacity-90 leading-relaxed">
               We don't just cut hair. We upgrade your entire look. 
            </p>
         </div>
         
         {/* Background pattern */}
         <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      </section>

      {/* TEAM SECTION */}
      <BarberTeam />

      {/* FOOTER */}
      <footer className="bg-white text-black pt-24 pb-12 px-6 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 md:col-span-2">
             <h4 className="text-4xl font-black uppercase tracking-tighter mb-8">Fresh<span className="text-[#00D95F]">Cuts</span></h4>
             <p className="text-neutral-500 max-w-sm font-medium">
                The premier destination for modern grooming. Established 2024.
             </p>
          </div>
          <div>
             <h5 className="font-bold uppercase tracking-widest mb-6 text-[#00D95F]">Explore</h5>
             <ul className="space-y-4 text-neutral-500 font-medium">
                <li><Link to="/demo/barber" className="hover:text-[#00D95F] transition-colors">Home</Link></li>
                <li><Link to="/demo/barber/cuts" className="hover:text-[#00D95F] transition-colors">Styles</Link></li>
                <li><Link to="/demo/barber/locations" className="hover:text-[#00D95F] transition-colors">Locations</Link></li>
                <li><Link to="/demo/barber/contact" className="hover:text-[#00D95F] transition-colors">Contact</Link></li>
             </ul>
          </div>
          <div>
             <h5 className="font-bold uppercase tracking-widest mb-6 text-[#00D95F]">Social</h5>
             <ul className="space-y-4 text-neutral-500 font-medium">
                <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#00D95F] transition-colors">Instagram</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#00D95F] transition-colors">Twitter</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#00D95F] transition-colors">Facebook</a></li>
             </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-neutral-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-400 uppercase tracking-widest font-bold">
           <p>© 2026 FreshCuts Barber Studio.</p>
           <p>Designed by SABR Digital.</p>
        </div>
      </footer>
    </div>
  );
};

export default BarberHome;
