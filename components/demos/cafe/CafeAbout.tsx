
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Flower2, Heart, Award, ShieldCheck, Sparkles, Map } from 'lucide-react';
import ExitPreviewButton from '../../ExitPreviewButton';
import CafeNavbar from './CafeNavbar';
import CafeFooter from './CafeFooter';

const CafeAbout: React.FC = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="min-h-screen bg-[#FFF9F5] font-sans selection:bg-[#A4715E] selection:text-white overflow-x-hidden">
      <ExitPreviewButton />
      <CafeNavbar />

      <section className="pt-56 pb-32 px-6 text-center">
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 0.8 }} 
          className="text-[#A4715E] font-black text-[12px] uppercase tracking-[1em] mb-8"
        >
          Our Heritage
        </motion.p>
        <motion.h1 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-serif text-6xl md:text-[10vw] font-black uppercase tracking-tighter text-[#4A403A] leading-none"
        >
          TRUE <span className="text-[#A4715E] italic">CRAFT.</span>
        </motion.h1 >
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-40">
        <div className="flex flex-col lg:flex-row gap-32 items-center mb-72">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-3/5 space-y-12"
          >
            <div className="w-16 h-2 bg-[#A4715E]"></div>
            <h2 className="font-serif text-6xl md:text-8xl font-black text-[#4A403A] uppercase tracking-tighter leading-none">Born in Wiltshire. <br /> <span className="text-[#A4715E] italic">Raised in Wick.</span></h2>
            <p className="text-[#A4715E]/70 text-2xl font-medium italic border-l-4 border-[#FDE2E4] pl-10 leading-relaxed">
              "The Hearth started as a single coffee cart in a rainy public park. We believed that even in the rain, a perfect roast could bring people together."
            </p>
            <p className="text-[#4A403A]/60 leading-relaxed text-lg max-w-2xl">
              Our journey has been fueled by a simple obsession: find the best beans, bake the best bread, and build a space where time feels like it's standing still. We don't just serve coffee; we host your morning ritual.
            </p>
            <div className="flex items-center gap-6">
               <div className="w-12 h-12 bg-[#FDE2E4] rounded-full flex items-center justify-center text-[#A4715E]"><Sparkles size={20} /></div>
               <p className="text-[10px] font-black uppercase tracking-widest text-[#4A403A]/40">Est. 2012 by Julianne Vance</p>
            </div>
          </motion.div>
          
          <div className="w-full lg:w-2/5 relative">
             <div className="absolute -inset-10 bg-[#A4715E]/5 rounded-full blur-[80px] opacity-40"></div>
             {/* Optimized image container to ensure no blank placeholders */}
             <motion.div 
               whileHover={{ scale: 1.02 }}
               className="relative aspect-[4/5] rounded-[4rem] overflow-hidden shadow-3xl border-[16px] border-white group"
             >
                <img 
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1200" 
                  alt="Cafe Ambiance" 
                  className="w-full h-full object-cover transition-all duration-1000" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4A403A]/50 to-transparent"></div>
             </motion.div>
             <div className="absolute -bottom-10 -left-10 bg-white p-12 rounded-[3rem] shadow-2xl border-4 border-[#FDE2E4] hidden md:block">
                <Heart size={32} className="text-[#A4715E] mb-4" />
                <p className="font-serif text-2xl font-bold text-[#4A403A]">Founder <br /> Led.</p>
             </div>
          </div>
        </div>

        {/* Philosophy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-72">
           <div className="p-16 bg-white rounded-[4rem] border border-[#A4715E]/5 shadow-xl text-center space-y-8 hover:-translate-y-4 transition-transform duration-500">
              <div className="w-20 h-20 bg-[#FDE2E4] text-[#A4715E] flex items-center justify-center rounded-[2rem] mx-auto"><Flower2 size={28} /></div>
              <h4 className="font-serif text-3xl font-bold text-[#4A403A]">Pure Sourcing</h4>
              <p className="text-base text-[#A4715E]/60 italic leading-relaxed">"We work exclusively with Wiltshire farmers who share our vision for organic, sustainable harvesting."</p>
           </div>
           <div className="p-16 bg-white rounded-[4rem] border border-[#A4715E]/5 shadow-xl text-center space-y-8 hover:-translate-y-4 transition-transform duration-500">
              <div className="w-20 h-20 bg-[#FDE2E4] text-[#A4715E] flex items-center justify-center rounded-[2rem] mx-auto"><Award size={28} /></div>
              <h4 className="font-serif text-3xl font-bold text-[#4A403A]">Master Roast</h4>
              <p className="text-base text-[#A4715E]/60 italic leading-relaxed">"Our baristas undergo a rigorous 6-month certification before they touch the house espresso machine."</p>
           </div>
           <div className="p-16 bg-white rounded-[4rem] border border-[#A4715E]/5 shadow-xl text-center space-y-8 hover:-translate-y-4 transition-transform duration-500">
              <div className="w-20 h-20 bg-[#FDE2E4] text-[#A4715E] flex items-center justify-center rounded-[2rem] mx-auto"><ShieldCheck size={28} /></div>
              <h4 className="font-serif text-3xl font-bold text-[#4A403A]">Safe Haven</h4>
              <p className="text-base text-[#A4715E]/60 italic leading-relaxed">"The Hearth is a space for everyone. No laptops after 5 PM, just conversation and community."</p>
           </div>
        </div>

        {/* Visual Storytelling - Removed failing image holder to maintain visual density */}
        <div className="space-y-40">
           <div className="flex flex-col lg:flex-row gap-24 items-center">
              <div className="w-full lg:w-2/5 space-y-8">
                 <span className="text-[#A4715E] font-black text-[10px] uppercase tracking-[0.5em]">Environment</span>
                 <h3 className="font-serif text-5xl font-black text-[#4A403A] uppercase tracking-tighter">THE <br /> <span className="text-[#A4715E] italic">SANCTUARY.</span></h3>
                 <p className="text-[#4A403A]/60 text-lg leading-relaxed italic">
                   "Our furniture is hand-carved from local ash, and our walls are finished with raw lime plaster. Every element breathes."
                 </p>
              </div>
              <div className="w-full lg:w-3/5">
                 <div className="aspect-video rounded-[4rem] overflow-hidden shadow-2xl border-[12px] border-white relative group">
                    <img 
                      src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1200" 
                      className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-[2s]" 
                      alt="Interior Architecture" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      <section className="py-48 bg-[#FDE2E4] relative overflow-hidden text-center">
         <div className="max-w-4xl mx-auto px-6 space-y-12 relative z-10">
            <h2 className="font-serif text-4xl md:text-7xl font-black text-[#A4715E] uppercase tracking-tighter leading-none">JOIN OUR <br /> <span className="text-[#4A403A] italic">COMMUNITY.</span></h2>
            <p className="text-[#A4715E] text-xl md:text-2xl font-medium italic opacity-70">"Become part of our village ritual. We're always looking for kind souls to join the team."</p>
            <div className="pt-10">
               <Link to="/demo/cafe/contact" className="px-16 py-8 bg-[#4A403A] text-white rounded-2xl font-black text-[12px] uppercase tracking-widest shadow-2xl hover:scale-110 transition-transform">Work With Us</Link>
            </div>
         </div>
         <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none flex items-center justify-center">
            <Map size={800} />
         </div>
      </section>

      <CafeFooter />
    </div>
  );
};

export default CafeAbout;
