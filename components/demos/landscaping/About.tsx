import React, { useEffect } from 'react';
// Fix react-router-dom missing exports
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { motion as framerMotion } from 'framer-motion';
import { MoveLeft, Award, ShieldCheck, History } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import ExitPreviewButton from '../../ExitPreviewButton';

// Fix motion types by casting to any
const motion = framerMotion as any;

const About: React.FC = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="min-h-screen bg-[#F4F1EA] font-inter selection:bg-[#BC4B26] selection:text-white">
      <ExitPreviewButton />
      <Navbar />
      
      <section className="relative py-40 px-6 bg-[#1A3C28] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-[#BC4B26] font-black text-[12px] uppercase tracking-[0.8em] mb-8">Established 1976</p>
            <h1 className="font-oswald text-6xl md:text-9xl font-bold uppercase tracking-tighter leading-[0.85]">
              CRAFTED BY <br /> <span className="italic">LEGACY.</span>
            </h1>
          </motion.div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#BC4B26]/10 skew-x-[-12deg] translate-x-20"></div>
      </section>

      <section className="py-40 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <div className="space-y-12">
            <div className="w-16 h-1.5 bg-[#BC4B26]"></div>
            <h2 className="font-oswald text-4xl md:text-6xl font-bold text-[#1A3C28] uppercase tracking-tight">Three Generations of Excellence.</h2>
            <p className="text-[#4A403A] text-xl font-medium italic leading-relaxed opacity-90 border-l-4 border-[#BC4B26] pl-10">
              "Oak & Ash began with a single chainsaw and a passion for Wiltshire's ancient woodlands. Today, we manage thousands of acres with the same respect for the land."
            </p>
            <p className="text-[#4A403A]/70 leading-relaxed text-lg">
              Our methods have evolved from manual timber extraction to precision ecological management, but our core philosophy remains: leave the land better than we found it. We bridge the gap between architectural vision and forestry reality.
            </p>
            <div className="grid grid-cols-2 gap-10">
              <div className="p-8 bg-white border border-[#1A3C28]/5 shadow-xl rounded-sm">
                <History className="text-[#BC4B26] mb-4" />
                <h4 className="font-oswald font-bold text-lg uppercase tracking-widest text-[#1A3C28]">45+ Years</h4>
                <p className="text-[9px] text-[#4A403A] font-black uppercase tracking-widest opacity-40">Operational Legacy</p>
              </div>
              <div className="p-8 bg-white border border-[#1A3C28]/5 shadow-xl rounded-sm">
                <Award className="text-[#BC4B26] mb-4" />
                <h4 className="font-oswald font-bold text-lg uppercase tracking-widest text-[#1A3C28]">Accredited</h4>
                <p className="text-[9px] text-[#4A403A] font-black uppercase tracking-widest opacity-40">NPTC & LANTRA Certified</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200" 
              className="w-full grayscale shadow-[0_50px_100px_rgba(0,0,0,0.1)] rounded-sm"
              alt="Legacy Forestry"
            />
            <div className="absolute -bottom-10 -left-10 bg-[#BC4B26] p-12 text-white hidden md:block rounded-sm shadow-2xl">
              <ShieldCheck size={48} />
              <p className="mt-4 font-black uppercase text-[10px] tracking-widest">Fully Insured £10m</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default About;