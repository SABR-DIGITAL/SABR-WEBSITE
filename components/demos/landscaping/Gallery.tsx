import React, { useEffect } from 'react';
// Fix react-router-dom missing exports
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { motion as framerMotion } from 'framer-motion';
import { MoveLeft, Camera, ZoomIn } from 'lucide-react';
import Navbar from './Navbar';
import ExitPreviewButton from '../../ExitPreviewButton';

// Fix motion types by casting to any
const motion = framerMotion as any;

const Gallery: React.FC = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  const projects = [
    { title: "Private Estate Clearance", category: "Forestry", img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1200" },
    { title: "Commercial Woodland Thinning", category: "Management", img: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=1200" },
    { title: "Architectural Paving Build", category: "Landscaping", img: "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&q=80&w=1200" },
    { title: "Riverbank Restoration", category: "Ecology", img: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=1200" },
    { title: "Old Mill Restoration", category: "Estate Management", img: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=1200" },
    { title: "Wilderness Management", category: "Forestry", img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1200" }
  ];

  return (
    <div className="min-h-screen bg-[#F4F1EA] font-sans">
      <ExitPreviewButton />
      <Navbar />
      
      <section className="py-32 px-6 border-b border-[#1A3C28]/10">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="w-12 h-1 bg-[#BC4B26] mb-8"></div>
          <h1 className="font-syne text-5xl md:text-8xl font-black text-[#1A3C28] uppercase tracking-tighter mb-8">WORK GALLERY.</h1>
          <p className="text-[#4A403A] text-lg font-medium italic max-w-2xl">
            "A visual record of our commitment to excellence in land management and architectural landscaping across the United Kingdom."
          </p>
        </div>
      </section>

      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects.map((project: any, i: number) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-video overflow-hidden shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-1000">
                <img src={project.img} alt={project.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ZoomIn className="text-white" size={40} strokeWidth={1} />
                </div>
              </div>
              <div className="pt-8">
                <span className="text-[#BC4B26] font-black text-[9px] uppercase tracking-[0.4em] block mb-2">{project.category}</span>
                <h3 className="font-syne text-xl font-black text-[#1A3C28] uppercase">{project.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-40 bg-[#1A3C28] text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-syne text-4xl font-black uppercase mb-10">Start Your Legacy Project.</h2>
          <Link to="/demo/landscaping/contact" className="px-16 py-8 bg-[#BC4B26] text-white font-black text-[12px] uppercase tracking-[0.5em] hover:bg-white hover:text-[#1A3C28] transition-all inline-block">
            Get a Consultation
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Gallery;