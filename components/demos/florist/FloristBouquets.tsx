import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import FloristNavbar from './FloristNavbar';
import ExitPreviewButton from '../../ExitPreviewButton';

const bouquets = [
  { name: "Wildwood Grace", price: "£45", desc: "A seasonal mix of field-grown flowers and eucalyptus.", img: "https://images.unsplash.com/photo-1591886760670-71d42423dd9f?auto=format&fit=crop&q=80&w=800" },
  { name: "Onyx Elegance", price: "£65", desc: "Dark calla lilies and deep red roses for a dramatic statement.", img: "https://images.unsplash.com/photo-1563241527-3004b7be0fab?auto=format&fit=crop&q=80&w=800" },
  { name: "Mocha Dream", price: "£55", desc: "Earthy tones of dried pampas and toffee-colored garden roses.", img: "https://images.unsplash.com/photo-1519340241574-2dec49daa04c?auto=format&fit=crop&q=80&w=800" },
  { name: "Champagne Fizz", price: "£50", desc: "Soft cream peonies and gold-tipped foliage.", img: "https://images.unsplash.com/photo-1523694559145-8010470bc43f?auto=format&fit=crop&q=80&w=800" },
  { name: "Morning Dew", price: "£40", desc: "Bright tulips and fresh greens to wake up any room.", img: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=800" },
  { name: "Sunset Serenade", price: "£60", desc: "Warm oranges, soft pinks, and vibrant sunflowers.", img: "https://images.unsplash.com/photo-1496062031456-07b8f162a322?auto=format&fit=crop&q=80&w=800" }
];

const FloristBouquets: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans selection:bg-[#A47864] selection:text-white">
      <ExitPreviewButton />
      <FloristNavbar />

      <section className="py-40 px-6">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-24 space-y-6">
            <h1 className="font-serif text-5xl md:text-8xl text-[#1A1A1A] font-black tracking-tighter uppercase leading-none">The Bloom <br /><span className="text-[#A47864] italic">Menu.</span></h1>
            <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.6em]">Curated arrangements for every occasion</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {bouquets.map((b, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="aspect-[4/5] bg-slate-100 rounded-[2.5rem] overflow-hidden mb-8 shadow-sm border border-slate-50 relative">
                  <img src={b.img} alt={b.name} className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-[1.2s] group-hover:scale-110" />
                  <div className="absolute top-6 right-6">
                    <div className="w-12 h-12 bg-white/30 backdrop-blur-xl rounded-full flex items-center justify-center text-white shadow-xl opacity-0 group-hover:opacity-100 transition-opacity">
                      <ShoppingBag size={20} />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-end mb-4 border-b border-slate-100 pb-2">
                  <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">{b.name}</h3>
                  <span className="text-lg font-bold text-[#A47864]">{b.price}</span>
                </div>
                <p className="text-sm text-slate-500 font-medium italic opacity-80">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-24 bg-[#1A1A1A] text-[#F7EBA5] text-center">
        <Link to="/demo/florist/contact" className="px-16 py-8 bg-[#A47864] text-white rounded-full font-black text-[11px] uppercase tracking-widest hover:bg-white hover:text-[#1A1A1A] transition-all shadow-2xl inline-block">
          Order Bespoke Bouquet
        </Link>
      </footer>
    </div>
  );
};

export default FloristBouquets;