import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ExitPreviewButton from '../../ExitPreviewButton';
import BarberNavbar from './BarberNavbar';

const portfolio = [
  { id: 1, title: "Precision Fade", category: "Signature", img: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&q=80&w=800" },
  { id: 2, title: "Royal Shave", category: "Grooming", img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800" },
  { id: 3, title: "Textured Crop", category: "Modern", img: "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&q=80&w=800" },
  { id: 4, title: "Noir Pompadour", category: "Classic", img: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=800" },
  { id: 5, title: "The Executive", category: "Business", img: "https://images.unsplash.com/photo-1599351431247-f137afbacdf9?auto=format&fit=crop&q=80&w=800" },
  { id: 6, title: "Minimalist", category: "Essential", img: "https://images.unsplash.com/photo-1534304393181-a16d912020a1?auto=format&fit=crop&q=80&w=800" },
];

const BarberCuts: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-[#00D95F] selection:text-black">
      <ExitPreviewButton />
      <BarberNavbar />

      <section className="pt-32 pb-16 px-6 max-w-7xl mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block py-2 px-4 bg-neutral-100 text-neutral-900 font-bold text-[10px] uppercase tracking-[0.2em] mb-6 border-l-4 border-[#00D95F]">
            The Collection
          </span>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 text-black uppercase">
            Curated <span className="text-[#00D95F]">Styles.</span>
          </h1>
          <p className="text-lg text-neutral-500 max-w-2xl mx-auto leading-relaxed font-medium">
            A showcase of our finest work. Each cut a testament to precision and style.
          </p>
        </motion.div>
      </section>

      {/* GALLERY GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {portfolio.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative cursor-pointer"
            >
              <Link to="/demo/barber/book" className="block h-full">
                <div className="aspect-[4/5] overflow-hidden bg-neutral-100 mb-6 relative border-b-4 border-transparent group-hover:border-[#00D95F] transition-all duration-300">
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors z-10 duration-500"></div>
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transform group-hover:scale-105 transition-all duration-700 ease-in-out" 
                  />
                  
                  {/* Floating Action Button */}
                  <div className="absolute bottom-6 right-6 z-20 w-12 h-12 bg-[#00D95F] rounded-none flex items-center justify-center text-white shadow-xl scale-0 group-hover:scale-100 transition-transform duration-300">
                    <ArrowUpRight size={20} />
                  </div>
                </div>

                <div className="flex justify-between items-end px-2">
                  <div>
                    <p className="text-[#00D95F] font-bold text-xs uppercase tracking-widest mb-1">{item.category}</p>
                    <h3 className="text-2xl font-black uppercase tracking-tight">{item.title}</h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <Link 
            to="/demo/barber/book" 
            className="inline-block px-12 py-5 bg-black text-white font-black uppercase tracking-widest hover:bg-[#00D95F] transition-all shadow-xl transform hover:-translate-y-1 rounded-none"
          >
            Book Your Look
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-neutral-100 py-12 text-center">
        <p className="text-xs uppercase tracking-widest text-neutral-400 font-bold">© 2026 FreshCuts Barber Studio</p>
      </footer>
    </div>
  );
};

export default BarberCuts;
