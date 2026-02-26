import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const BarberTestimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Marcus T.",
      role: "Regular",
      text: "The cleanest fade I've had in years. The attention to detail is unmatched.",
      rating: 5
    },
    {
      name: "David L.",
      role: "First-time Client",
      text: "Incredible atmosphere. It's not just a haircut, it's a reset button for the week.",
      rating: 5
    },
    {
      name: "James P.",
      role: "Member",
      text: "Consistent quality every single time. The new green aesthetic is sharp too.",
      rating: 5
    }
  ];

  return (
    <section className="py-24 bg-white border-y border-neutral-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-black">
            Client <span className="text-[#00D95F]">Vibe.</span>
          </h2>
          <div className="flex items-center gap-2">
            <div className="flex text-[#00D95F]">
              {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
            </div>
            <span className="font-bold text-black uppercase tracking-wider">5.0 Average</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-neutral-50 p-10 border border-neutral-200 hover:border-[#00D95F] transition-colors duration-300 relative group"
            >
              <Quote className="absolute top-8 right-8 text-neutral-200 group-hover:text-[#00D95F]/20 transition-colors" size={48} />
              
              <div className="flex text-[#00D95F] mb-6">
                {[...Array(t.rating)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
              </div>
              
              <p className="text-xl font-medium text-neutral-800 mb-8 leading-relaxed">"{t.text}"</p>
              
              <div>
                <h4 className="font-black uppercase tracking-wider text-black">{t.name}</h4>
                <p className="text-xs font-bold uppercase tracking-widest text-[#00D95F]">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BarberTestimonials;
