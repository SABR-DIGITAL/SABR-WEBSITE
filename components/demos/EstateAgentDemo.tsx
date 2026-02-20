import React from 'react';
// Fix react-router-dom missing exports
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { Home, Search, Map, ArrowLeft, Camera, Phone, User } from 'lucide-react';

const EstateAgentDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-[#001f3f] font-sans">
      {/* Floating Exit */}
      <Link to="/projects" className="fixed top-8 left-8 z-[100] bg-white border border-slate-200 px-6 py-3 rounded-full shadow-xl flex items-center gap-3 font-bold text-sm text-black hover:bg-slate-50 transition-all">
        <ArrowLeft size={18} /> Exit Demo
      </Link>

      {/* Header */}
      <header className="px-10 py-10 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <div className="p-2 border-2 border-[#001f3f] rounded-lg">
            <Home size={32} />
          </div>
          <span className="font-black text-2xl uppercase tracking-[0.1em]">Summit Realty</span>
        </div>
        <div className="hidden lg:flex items-center gap-12 font-black text-[10px] uppercase tracking-[0.5em] text-slate-400">
          <a href="#" className="hover:text-[#001f3f]">Buy</a>
          <a href="#" className="hover:text-[#001f3f]">Sell</a>
          <a href="#" className="hover:text-[#001f3f]">Valuation</a>
          <a href="#" className="hover:text-[#001f3f]">About</a>
        </div>
        <button className="flex items-center gap-3 px-8 py-3 bg-[#001f3f] text-white font-black text-[10px] uppercase tracking-widest rounded-md hover:bg-slate-800 transition-colors">
          <User size={16} /> Client Login
        </button>
      </header>

      {/* Hero */}
      <section className="relative py-32 px-10 text-center overflow-hidden">
        <div className="absolute inset-0 bg-slate-50 z-0"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="text-[#001f3f]/40 font-black text-[10px] uppercase tracking-[0.8em] mb-10 block">Architecture of Ownership</span>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-[0.85] mb-16">
            Find Your <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#001f3f] to-slate-400">Luxury Sanctuary.</span>
          </h1>
          <div className="bg-white p-4 rounded-2xl shadow-2xl border border-slate-100 flex flex-col md:flex-row items-center gap-4 max-w-3xl mx-auto">
            <div className="flex-1 flex items-center gap-4 px-6 py-4 border-r border-slate-100">
               <Search className="text-slate-400" />
               <input type="text" placeholder="Enter postcode or area..." className="w-full font-bold focus:outline-none" />
            </div>
            <button className="w-full md:w-auto px-12 py-5 bg-[#001f3f] text-white font-black uppercase tracking-widest rounded-xl flex items-center justify-center gap-3">
               Search <ArrowLeft className="rotate-180" size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-24 px-10 max-w-7xl mx-auto">
         <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-black uppercase tracking-tighter">New Arrivals</h2>
              <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-2">The latest premium listings</p>
            </div>
            <button className="text-[10px] font-black uppercase tracking-[0.4em] text-[#001f3f] flex items-center gap-3">
              View Map <Map size={18} />
            </button>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[1, 2, 3].map(i => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-[4/3] bg-slate-100 rounded-[2rem] mb-6 overflow-hidden relative">
                   <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all"></div>
                   <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-lg font-black text-[10px] uppercase tracking-widest shadow-xl">
                      Featured
                   </div>
                   <div className="absolute bottom-6 left-6 text-white z-10">
                      <p className="text-2xl font-black uppercase tracking-tighter">£1,450,000</p>
                   </div>
                   <div className="w-full h-full flex items-center justify-center text-slate-300">
                      <Camera size={64} strokeWidth={1} />
                   </div>
                </div>
                <h4 className="text-xl font-black uppercase tracking-tight">The Old Mill House</h4>
                <p className="text-slate-400 font-bold text-sm">4 Beds • 3 Baths • Wiltshire, SN1</p>
                <div className="mt-6 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                   <button className="text-[10px] font-black uppercase tracking-widest text-[#001f3f] border-b-2 border-[#001f3f] pb-1">View Details</button>
                   <Phone size={16} className="text-slate-300 hover:text-[#001f3f]" />
                </div>
              </div>
            ))}
         </div>
      </section>
    </div>
  );
};

export default EstateAgentDemo;