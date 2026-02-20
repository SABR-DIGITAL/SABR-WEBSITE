import React from 'react';
// Fix react-router-dom missing exports
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { Scissors, Star, Shield, ArrowLeft, Instagram, ExternalLink } from 'lucide-react';

const BarberDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-[#d4af37] selection:text-black overflow-x-hidden">
      {/* Floating Exit */}
      <Link to="/projects" className="fixed top-8 left-8 z-[100] bg-white border border-slate-200 px-6 py-3 rounded-full shadow-xl flex items-center gap-3 font-bold text-sm text-black hover:bg-slate-50 transition-all">
        <ArrowLeft size={18} /> Exit Demo
      </Link>

      {/* Header */}
      <header className="px-10 py-12 flex flex-col items-center gap-8 border-b border-white/5">
        <div className="flex items-center gap-4">
          <Scissors size={40} className="text-[#d4af37]" />
          <h1 className="text-4xl font-black uppercase tracking-[0.2em]">Jack's Cuts</h1>
        </div>
        <nav className="flex items-center gap-12 text-[10px] font-black uppercase tracking-[0.5em] text-white/40">
          <a href="#" className="hover:text-[#d4af37]">Services</a>
          <a href="#" className="hover:text-[#d4af37]">Barbers</a>
          <a href="#" className="hover:text-[#d4af37]">Shop</a>
          <a href="#" className="hover:text-[#d4af37]">Contact</a>
        </nav>
      </header>

      {/* Hero */}
      <section className="py-24 px-10 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[#d4af37]/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="relative z-10">
          <span className="text-[#d4af37] font-black text-[10px] uppercase tracking-[0.8em] mb-8 block">Est. 2012 — London</span>
          <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-12">
            SHARP LOOKS <br /> <span className="text-transparent border-t border-b border-[#d4af37] py-2">NO EXCUSES.</span>
          </h2>
          <div className="flex flex-col items-center gap-10">
            <button className="px-12 py-6 bg-[#d4af37] text-black font-black uppercase text-xs tracking-[0.4em] rounded-sm hover:scale-110 transition-transform shadow-[0_0_50px_rgba(212,175,55,0.3)]">
              Book The Chair
            </button>
            <div className="flex items-center gap-6">
               <Instagram className="text-white/20 hover:text-[#d4af37] transition-colors cursor-pointer" />
               <div className="w-1 h-1 rounded-full bg-white/20"></div>
               <span className="text-[10px] uppercase font-black tracking-widest text-white/40">Highly Rated on Google</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 px-10 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-black uppercase tracking-[0.4em] mb-16 text-center underline decoration-[#d4af37] decoration-4 underline-offset-8">The Menu</h3>
          <div className="space-y-10">
            {[
              { name: 'Standard Fade', time: '45 Mins', price: '£32' },
              { name: 'Beard Sculpt', time: '20 Mins', price: '£18' },
              { name: 'The Ritual (Full Service)', time: '75 Mins', price: '£65' },
              { name: 'Buzz Cut', time: '15 Mins', price: '£22' }
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between group cursor-pointer border-b border-white/5 pb-8">
                 <div className="flex flex-col gap-1">
                    <h4 className="text-xl font-bold uppercase tracking-tight group-hover:text-[#d4af37] transition-colors">{s.name}</h4>
                    <p className="text-[10px] uppercase font-black tracking-widest text-white/30">{s.time}</p>
                 </div>
                 <div className="flex items-center gap-4">
                    <span className="text-2xl font-black">{s.price}</span>
                    <ExternalLink size={16} className="text-white/20" />
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BarberDemo;