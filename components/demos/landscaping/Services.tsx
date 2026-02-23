import React, { useEffect } from 'react';
// Fix react-router-dom missing exports
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { motion as framerMotion } from 'framer-motion';
import { Hammer, Sprout, Trees, ArrowRight, MoveLeft } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import ExitPreviewButton from '../../ExitPreviewButton';

// Fix motion types by casting to any
const motion = framerMotion as any;

const Services: React.FC = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  const detailedServices = [
    {
      title: "Forestry Mulching",
      desc: "High-efficiency brush and land clearing using state-of-the-art mulching heads. We turn unwanted vegetation into nutrient-rich ground cover.",
      img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200",
      features: ["Site Clearance", "Invasive Species Control", "Fire Mitigation"]
    },
    {
      title: "Management Plans",
      desc: "Long-term ecological and timber value strategies for private estates and commercial woodlands. We ensure your land thrives for generations.",
      img: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=1200",
      features: ["Ecological Surveys", "Timber Valuation", "Grant Applications"]
    },
    {
      title: "Timber Harvesting",
      desc: "Sustainably managed tree removal and extraction. Our team uses low-impact machinery to protect the forest floor while maximizing yield.",
      img: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=1200",
      features: ["Selective Thinning", "Hazardous Tree Removal", "Extraction & Transport"]
    }
  ];

  return (
    <div className="min-h-screen bg-[#F4F1EA] font-inter">
      <ExitPreviewButton />
      <Navbar />
      
      <section className="relative py-32 px-6 bg-[#1A3C28] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} className="text-[#BC4B26] font-black text-[12px] uppercase tracking-[0.8em] mb-6">Expertise</motion.p>
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="font-oswald text-5xl md:text-8xl font-bold uppercase tracking-tighter">OUR SERVICES.</motion.h1>
        </div>
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <Trees size={400} className="absolute -bottom-20 -right-20" />
        </div>
      </section>

      <section className="py-40 px-6 max-w-7xl mx-auto">
        <div className="space-y-40">
          {detailedServices.map((service: any, i: number) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-20 items-center`}
            >
              <div className="w-full lg:w-1/2 overflow-hidden shadow-2xl grayscale-[20%] hover:grayscale-0 transition-all duration-[1s] rounded-sm">
                <img src={service.img} alt={service.title} className="w-full aspect-video object-cover" />
              </div>
              <div className="w-full lg:w-1/2 space-y-8">
                <h2 className="font-oswald text-4xl font-bold text-[#1A3C28] uppercase">{service.title}</h2>
                <p className="text-[#4A403A] text-xl font-medium italic border-l-4 border-[#BC4B26] pl-8 leading-relaxed opacity-80">{service.desc}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
                  {service.features.map((f: any) => (
                    <div key={f} className="flex items-center gap-4 text-[#1A3C28] font-black text-[10px] uppercase tracking-widest bg-white p-6 border border-[#1A3C28]/5 shadow-sm rounded-sm">
                      <div className="w-2 h-2 bg-[#BC4B26] rounded-full"></div>
                      {f}
                    </div>
                  ))}
                </div>
                <Link to="/demo/landscaping/contact" className="inline-flex items-center gap-4 px-10 py-5 bg-[#1A3C28] text-white font-black text-[10px] uppercase tracking-widest hover:bg-[#BC4B26] transition-all rounded-sm shadow-xl">
                  Request Service <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Services;