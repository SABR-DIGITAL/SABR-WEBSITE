import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Twitter } from 'lucide-react';

const BarberTeam: React.FC = () => {
  const team = [
    {
      name: "Alex",
      role: "Head Barber",
      image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&q=80&w=800",
    },
    {
      name: "Jordan",
      role: "Stylist",
      image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=800",
    },
    {
      name: "Kai",
      role: "Colorist",
      image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&q=80&w=800",
    }
  ];

  return (
    <section className="py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-16 text-center">
          The <span className="text-[#00D95F]">Squad.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden"
            >
              <div className="aspect-[3/4] overflow-hidden bg-neutral-900 grayscale group-hover:grayscale-0 transition-all duration-500">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" 
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <h3 className="text-3xl font-black uppercase tracking-tighter">{member.name}</h3>
                <p className="text-[#00D95F] font-bold uppercase tracking-widest text-sm mb-4">{member.role}</p>
                <div className="flex gap-4">
                    <a href="#" onClick={(e) => e.preventDefault()} className="p-2 bg-white/10 hover:bg-[#00D95F] hover:text-black rounded-full transition-colors"><Instagram size={16} /></a>
                    <a href="#" onClick={(e) => e.preventDefault()} className="p-2 bg-white/10 hover:bg-[#00D95F] hover:text-black rounded-full transition-colors"><Twitter size={16} /></a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BarberTeam;
