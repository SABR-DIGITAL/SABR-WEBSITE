import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, ArrowRight, Navigation } from 'lucide-react';
import ExitPreviewButton from '../../ExitPreviewButton';
import BarberNavbar from './BarberNavbar';

const BarberLocations: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeLocation, setActiveLocation] = useState(0);

  const locations = [
    { 
      id: 1, 
      name: "Mayfair Atelier", 
      address: "42 Savile Row, London", 
      postcode: "W1S 3QB",
      phone: "020 7123 4567",
      mapQuery: "Savile+Row+London",
      image: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&q=80&w=800"
    },
    { 
      id: 2, 
      name: "Shoreditch Loft", 
      address: "128 Redchurch St, London", 
      postcode: "E2 7DP",
      phone: "020 7987 6543",
      mapQuery: "Redchurch+Street+London",
      image: "https://images.unsplash.com/photo-1521590832169-dca1f55b2d82?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-[#00D95F] selection:text-black flex flex-col">
      <ExitPreviewButton />
      <BarberNavbar />

      <section className="pt-32 pb-12 px-6 max-w-7xl mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block py-2 px-4 bg-neutral-100 text-neutral-900 font-bold text-[10px] uppercase tracking-[0.2em] mb-6 border-l-4 border-[#00D95F]">
            Destinations
          </span>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-black uppercase">
            Our <span className="text-[#00D95F]">Studios.</span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 h-full min-h-[600px]">
          {/* Location List */}
          <div className="lg:col-span-1 space-y-6">
            {locations.map((loc, idx) => (
              <motion.button
                key={loc.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setActiveLocation(idx)}
                className={`w-full text-left p-8 rounded-none transition-all duration-300 border-2 group ${
                  activeLocation === idx 
                    ? 'bg-black text-white border-black shadow-xl scale-105' 
                    : 'bg-white text-neutral-900 border-neutral-100 hover:border-[#00D95F]'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-black uppercase tracking-tight">{loc.name}</h3>
                  {activeLocation === idx && <div className="w-3 h-3 bg-[#00D95F] rounded-full animate-pulse"></div>}
                </div>
                
                <div className="space-y-2 opacity-80 text-sm font-medium mb-6">
                  <p className="flex items-center gap-2"><MapPin size={14} /> {loc.address}</p>
                  <p className="flex items-center gap-2"><Navigation size={14} /> {loc.postcode}</p>
                  <p className="flex items-center gap-2"><Phone size={14} /> {loc.phone}</p>
                </div>

                <div className={`text-xs font-black uppercase tracking-widest flex items-center gap-2 ${activeLocation === idx ? 'text-[#00D95F]' : 'text-neutral-400 group-hover:text-[#00D95F]'}`}>
                  View Map <ArrowRight size={14} />
                </div>
              </motion.button>
            ))}

            <div className="p-8 bg-[#00D95F] rounded-none mt-8 text-black">
              <h4 className="font-black uppercase tracking-tight text-xl mb-2">Opening Hours</h4>
              <ul className="space-y-2 text-sm font-bold">
                <li className="flex justify-between border-b border-black/10 pb-2"><span>Mon - Fri</span> <span>10:00 - 20:00</span></li>
                <li className="flex justify-between border-b border-black/10 pb-2"><span>Saturday</span> <span>09:00 - 18:00</span></li>
                <li className="flex justify-between"><span>Sunday</span> <span>Closed</span></li>
              </ul>
            </div>
          </div>

          {/* Map/Image Area */}
          <motion.div 
            className="lg:col-span-2 bg-neutral-100 overflow-hidden relative shadow-2xl border-4 border-white"
            key={activeLocation}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '500px', height: '100%' }}
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps?q=${locations[activeLocation].mapQuery}&output=embed`}
              className="grayscale hover:grayscale-0 transition-all duration-700"
            ></iframe>

            <div className="absolute bottom-8 left-8 bg-white p-2 shadow-lg transform rotate-2 hover:rotate-0 transition-transform duration-300 hidden md:block border border-neutral-200">
              <img 
                src={locations[activeLocation].image} 
                alt={locations[activeLocation].name} 
                className="w-32 h-32 object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BarberLocations;
