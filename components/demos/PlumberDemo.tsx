import React from 'react';
// Fix react-router-dom missing exports
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { Droplet, Phone, Zap, ShieldCheck, ArrowLeft, Clock } from 'lucide-react';

const PlumberDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-[#001f3f] font-sans">
      {/* Floating Exit */}
      <Link to="/projects" className="fixed top-8 left-8 z-[100] bg-white border border-slate-200 px-6 py-3 rounded-full shadow-xl flex items-center gap-3 font-bold text-sm text-black hover:bg-slate-50 transition-all">
        <ArrowLeft size={18} /> Exit Demo
      </Link>

      {/* Local Nav */}
      <nav className="bg-[#001f3f] text-white px-8 py-5 flex items-center justify-between sticky top-0 z-[50]">
        <div className="flex items-center gap-3">
          <Droplet className="text-blue-400" fill="currentColor" size={28} />
          <span className="font-extrabold text-xl tracking-tighter">FastResponse Plumb</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-white/70">
          <a href="#" className="hover:text-white">Emergency</a>
          <a href="#" className="hover:text-white">Repairs</a>
          <a href="#" className="hover:text-white">Boilers</a>
        </div>
        <a href="tel:0800123456" className="px-6 py-3 bg-blue-500 rounded-md font-black flex items-center gap-3 animate-pulse shadow-lg shadow-blue-500/20">
          <Phone size={18} /> Emergency 24/7
        </a>
      </nav>

      {/* Hero */}
      <section className="py-24 px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="flex items-center gap-2 text-blue-600 font-black uppercase text-[10px] tracking-[0.4em] mb-6">
            <Zap size={14} /> 60 Minute Arrival Guarantee
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-8">
            Wiltshire's Most <br /><span className="text-blue-500 underline decoration-8 decoration-blue-100 underline-offset-8">Trusted</span> Plumbers.
          </h1>
          <p className="text-xl text-slate-500 font-medium mb-12 leading-relaxed">
            From burst pipes to boiler installs. We're locally based, fully insured, and fixed-price. No call-out fees, ever.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
             <button className="px-10 py-6 bg-[#001f3f] text-white font-black rounded-xl text-sm uppercase tracking-widest shadow-2xl flex items-center justify-center gap-4">
               Book Non-Emergency
             </button>
             <div className="flex items-center gap-4 px-8 py-6 border-2 border-slate-100 rounded-xl">
               <ShieldCheck className="text-green-500" />
               <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Gas Safe Registered</p>
             </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
           <div className="p-10 bg-blue-50 rounded-3xl flex flex-col items-center text-center">
              <Clock className="text-blue-600 mb-4" size={32} />
              <h4 className="text-2xl font-black mb-2">24/7</h4>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Rapid Response</p>
           </div>
           <div className="p-10 bg-slate-50 rounded-3xl flex flex-col items-center text-center">
              <Zap className="text-amber-500 mb-4" size={32} />
              <h4 className="text-2xl font-black mb-2">Fixed</h4>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Upfront Pricing</p>
           </div>
           <div className="col-span-2 p-10 bg-slate-900 rounded-3xl text-white flex items-center justify-between">
              <div>
                <h4 className="text-xl font-bold mb-1">Check Our Reviews</h4>
                <p className="text-blue-400 font-black text-xs uppercase tracking-widest">4.9/5 Trustpilot Rating</p>
              </div>
              <div className="flex gap-1">
                 {[1,2,3,4,5].map(i => <div key={i} className="w-2 h-2 rounded-full bg-blue-500"></div>)}
              </div>
           </div>
        </div>
      </section>

      {/* Floating CTA for Mobile */}
      <div className="md:hidden fixed bottom-8 left-8 right-8 z-[100]">
        <button className="w-full py-6 bg-blue-600 text-white font-black uppercase text-sm tracking-[0.4em] rounded-2xl shadow-3xl flex items-center justify-center gap-4">
          <Phone /> Call For Help Now
        </button>
      </div>
    </div>
  );
};

export default PlumberDemo;