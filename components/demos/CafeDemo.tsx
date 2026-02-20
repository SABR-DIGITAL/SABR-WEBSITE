import React from 'react';
// Fix react-router-dom missing exports
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { Coffee, MapPin, Clock, ArrowLeft, UtensilsCrossed } from 'lucide-react';

const CafeDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#fdfbf7] text-[#4b3621] font-serif">
      {/* Floating Exit */}
      <Link to="/projects" className="fixed top-8 left-8 z-[100] bg-white border border-[#e5e0d8] px-6 py-3 rounded-full shadow-xl flex items-center gap-3 font-bold text-sm text-[#4b3621] hover:bg-slate-50 transition-all font-sans">
        <ArrowLeft size={18} /> Exit Demo
      </Link>

      {/* Local Nav */}
      <nav className="px-8 py-10 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          < Coffee size={32} />
          <span className="font-bold text-2xl uppercase tracking-widest">The Daily Grind</span>
        </div>
        <div className="hidden md:flex items-center gap-12 font-bold text-sm uppercase tracking-widest">
          <a href="#" className="hover:opacity-60">Menu</a>
          <a href="#" className="hover:opacity-60">Story</a>
          <a href="#" className="hover:opacity-60">Events</a>
        </div>
        <button className="px-8 py-3 border-2 border-[#4b3621] font-bold rounded-full uppercase text-xs tracking-widest hover:bg-[#4b3621] hover:text-white transition-all">
          Find Us
        </button>
      </nav>

      {/* Hero */}
      <section className="py-20 px-8 max-w-7xl mx-auto text-center">
        <h1 className="text-6xl md:text-8xl font-black mb-10 leading-tight">
          Hand-Roasted <br /> <span className="italic">Heart & Soul.</span>
        </h1>
        <p className="text-xl max-w-xl mx-auto mb-16 font-sans font-medium text-[#7a6451]">
          Fresh pastries, artisan coffee, and a cozy atmosphere in the heart of the village.
        </p>
        <div className="w-16 h-px bg-[#4b3621] mx-auto mb-16"></div>
        <div className="flex justify-center gap-16">
          <div className="flex flex-col items-center gap-2">
            <Clock size={24} />
            <span className="text-xs font-bold uppercase tracking-widest font-sans">Open Daily</span>
            <p className="text-sm font-sans">8am — 4pm</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <MapPin size={24} />
            <span className="text-xs font-bold uppercase tracking-widest font-sans">Locate Us</span>
            <p className="text-sm font-sans">12 High St, Wick</p>
          </div>
        </div>
      </section>

      {/* Menu Preview */}
      <section className="py-24 px-8 bg-[#f5f0e8]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-12 justify-center">
            <UtensilsCrossed size={20} />
            <h2 className="text-3xl font-black uppercase tracking-widest text-center">Our Favorites</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-sans">
            {[
              { name: 'Oat Flat White', price: '£3.80', desc: 'Sustainably sourced beans, velvety micro-foam.' },
              { name: 'Almond Croissant', price: '£4.20', desc: 'Twice-baked, house-made almond frangipane.' },
              { name: 'Avocado Smashed', price: '£9.50', desc: 'Chilli flakes, poached eggs, sourdough toast.' },
              { name: 'Biscoff Latte', price: '£4.50', desc: 'Indulgent, spiced caramel syrup, lotus crumb.' }
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="flex justify-between items-end border-b border-[#4b3621]/10 pb-2">
                  <h4 className="font-bold text-lg">{item.name}</h4>
                  <span className="font-black text-sm">{item.price}</span>
                </div>
                <p className="text-sm text-[#7a6451]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CafeDemo;