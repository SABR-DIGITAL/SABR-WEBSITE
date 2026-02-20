
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Coffee, Flower2, Utensils, Heart, Leaf, Wheat, ShieldCheck } from 'lucide-react';
import ExitPreviewButton from '../../ExitPreviewButton';
import CafeNavbar from './CafeNavbar';
import CafeFooter from './CafeFooter';

const CafeMenu: React.FC = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  const categories = [
    {
      name: "Coffee & House Drinks",
      icon: <Coffee />,
      img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=1200",
      items: [
        { name: "Velvet Flat White", desc: "Double shot house espresso, silky micro-foam.", price: "£3.80", tags: ['VG'] },
        { name: "Single Origin V60", desc: "Rotating seasonal single origin, brewed clean.", price: "£4.50", tags: ['V', 'VG', 'GF'] },
        { name: "Vanilla Bean Latte", desc: "Infused with Madagascar vanilla bean paste.", price: "£4.20", tags: ['VG'] }
      ]
    },
    {
      name: "The Botanical Collection",
      icon: <Leaf />,
      img: "https://images.unsplash.com/photo-1576092762791-dd9e2220abd1?auto=format&fit=crop&q=80&w=1200",
      items: [
        { name: "Organic Earl Grey Blue", desc: "Hand-picked black tea with Calabrian bergamot petals.", price: "£3.50", tags: ['VG', 'GF'] },
        { name: "Wild Garden Mint", desc: "Infused with fresh garden sprigs and local honey.", price: "£3.80", tags: ['V', 'GF'] },
        { name: "Rose & Lychee White", desc: "A delicate floral infusion with cold-pressed lychee.", price: "£4.50", tags: ['VG', 'GF'] }
      ]
    },
    {
      name: "Brunch Plates",
      icon: <Utensils />,
      img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=1200",
      items: [
        { name: "Avocado Sourdough", desc: "Poached eggs, chili, lime, local sourdough.", price: "£9.50", tags: ['V'] },
        { name: "Garden Shakshuka", desc: "Baked eggs, spiced tomato, wilted spinach.", price: "£11.00", tags: ['V', 'GF'] },
        { name: "French Toast Brioche", desc: "Seasonal berries, mascarpone, maple.", price: "£10.50", tags: ['V'] }
      ]
    },
    {
      name: "Desserts & Cakes",
      icon: <Flower2 />,
      img: "https://images.unsplash.com/photo-1535141192574-5d4897c826a0?auto=format&fit=crop&q=80&w=1200",
      items: [
        { name: "Almond Frangipane", desc: "Twice-baked with house-made almond filling.", price: "£4.20", tags: ['V'] },
        { name: "Lemon & Pistachio", desc: "Polenta cake with citrus glaze and crumbs.", price: "£3.80", tags: ['V', 'GF'] },
        { name: "The Hearth Brownie", desc: "Valrhona chocolate, gooey center, sea salt.", price: "£3.50", tags: ['V'] }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFF9F5] font-sans selection:bg-[#A4715E] selection:text-white overflow-x-hidden">
      <ExitPreviewButton />
      <CafeNavbar />

      <section className="pt-56 pb-20 px-6 text-center">
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 0.8 }} 
          className="text-[#A4715E] font-black text-[12px] uppercase tracking-[1em] mb-8"
        >
          Winter Editorial Selection
        </motion.p>
        <motion.h1 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          className="font-serif text-6xl md:text-[12vw] font-black uppercase tracking-tighter text-[#4A403A] leading-none"
        >
          THE <span className="text-[#A4715E] italic">MENU.</span>
        </motion.h1 >
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-40">
        <div className="space-y-48">
          {categories.map((cat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-20"
            >
              <div className="flex flex-col items-center gap-6">
                <div className="w-12 h-px bg-[#A4715E]/40"></div>
                <h3 className="font-serif text-4xl md:text-5xl font-bold text-[#A4715E] tracking-tight">{cat.name}</h3>
                <p className="text-[10px] font-black uppercase tracking-[0.6em] text-[#4A403A]/20">Chef's Signature Selection</p>
              </div>

              <div className="grid grid-cols-1 gap-16">
                {cat.items.map((item, j) => (
                  <div key={j} className="group flex flex-col items-center text-center space-y-4 relative">
                    <div className="flex justify-center items-end gap-10 w-full max-w-2xl">
                       <h4 className="font-serif text-3xl md:text-4xl font-bold text-[#4A403A] group-hover:text-[#A4715E] transition-colors">{item.name}</h4>
                       <div className="flex-1 border-b border-dotted border-[#A4715E]/20 mb-3"></div>
                       <span className="font-bold text-2xl text-[#A4715E]">{item.price}</span>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                       <p className="text-base text-[#4A403A]/60 font-medium italic max-w-lg">{item.desc}</p>
                       <div className="flex gap-4">
                          {item.tags.map(t => (
                            <span key={t} className="text-[9px] font-black text-[#A4715E]/40 tracking-widest">{t}</span>
                          ))}
                       </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative pt-10">
                 <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#FDE2E4] rounded-full blur-[60px] opacity-60"></div>
                 <div className="aspect-video rounded-[4rem] overflow-hidden shadow-3xl border-[12px] border-white group relative">
                    <img 
                      src={cat.img} 
                      alt={cat.name} 
                      className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all"></div>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-40 grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-y border-[#A4715E]/10">
           <div className="flex items-center gap-4 justify-center opacity-40">
              <Leaf size={14} className="text-[#A4715E]" />
              <span className="text-[10px] font-black uppercase tracking-widest">Vegetarian (V)</span>
           </div>
           <div className="flex items-center gap-4 justify-center opacity-40">
              <Wheat size={14} className="text-[#A4715E]" />
              <span className="text-[10px] font-black uppercase tracking-widest">Vegan (VG)</span>
           </div>
           <div className="flex items-center gap-4 justify-center opacity-40">
              <ShieldCheck size={14} className="text-[#A4715E]" />
              <span className="text-[10px] font-black uppercase tracking-widest">Gluten Free (GF)</span>
           </div>
           <div className="flex items-center gap-4 justify-center opacity-40">
              <Heart size={14} className="text-[#A4715E]" />
              <span className="text-[10px] font-black uppercase tracking-widest">Locally Sourced</span>
           </div>
        </div>

        <div className="mt-40 p-20 bg-[#1A1A1A] rounded-[4rem] text-center space-y-10 border-4 border-[#A4715E]/20 shadow-3xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(164,113,94,0.1),transparent)] pointer-events-none"></div>
          <div className="absolute inset-0 opacity-10 grayscale brightness-200">
             <img src="https://images.unsplash.com/photo-1559925393-8be0ec41b50d?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Background Texture" />
          </div>
          <Heart size={48} className="mx-auto text-[#FDE2E4] relative z-10" />
          <h3 className="font-serif text-5xl font-bold text-white tracking-tighter relative z-10">Kitchen Care.</h3>
          <p className="text-[#FDE2E4]/60 font-medium italic text-xl leading-relaxed max-w-2xl mx-auto relative z-10">
            "Allergen management is our priority. Our kitchen handles nuts, dairy, and gluten. Please inform your server of any severe sensitivities before ordering."
          </p>
          <div className="pt-6 relative z-10">
             <Link to="/demo/cafe/book" className="px-16 py-8 bg-white text-[#1A1A1A] rounded-2xl font-black text-[12px] uppercase tracking-[0.4em] hover:bg-[#A4715E] hover:text-white transition-all shadow-xl">Reserve A Table</Link>
          </div>
        </div>
      </section>

      <CafeFooter />
    </div>
  );
};

export default CafeMenu;
