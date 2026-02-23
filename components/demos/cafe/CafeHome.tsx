import React, { useEffect, useState } from 'react';
// Fix react-router-dom missing exports
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { motion as framerMotion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { 
  Coffee, 
  ArrowRight, 
  ChevronDown,
  Gift,
  Star,
  Flower2,
  Utensils,
  Calendar,
  Sparkles,
  Quote,
  Instagram,
  Heart,
  Users
} from 'lucide-react';
import ExitPreviewButton from '../../ExitPreviewButton';
import CafeNavbar from './CafeNavbar';
import CafeFooter from './CafeFooter';

// Fix motion types by casting to any
const motion = framerMotion as any;

const testimonials = [
  { 
    text: "The best avocado toast in Wiltshire, hands down. The atmosphere is like a warm hug.", 
    author: "Elena R.", 
    role: "Local Creative",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
  },
  { 
    text: "A slice of Paris in our little village. Their flat white is perfection.", 
    author: "James T.", 
    role: "Coffee Enthusiast",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  },
  { 
    text: "We hosted our engagement brunch here. The team made every detail magic.", 
    author: "Sarah L.", 
    role: "Loyal Patron",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
  }
];

const featuredDishes = [
  { 
    title: "Velvet Flat White", 
    category: "Barista Selection", 
    img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=800",
    price: "£3.80"
  },
  { 
    title: "Almond Frangipane", 
    category: "Fresh Pastry", 
    img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800",
    price: "£4.20"
  },
  { 
    title: "Avocado Sourdough", 
    category: "Brunch Plates", 
    img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800",
    price: "£9.50"
  }
];

const CafeHome: React.FC = () => {
  const [testiIndex, setTestiIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    let delayedCall: gsap.core.Tween;
    const rotateTestimonials = () => {
      setTestiIndex(prev => (prev + 1) % testimonials.length);
      delayedCall = gsap.delayedCall(5, rotateTestimonials);
    };
    
    delayedCall = gsap.delayedCall(5, rotateTestimonials);
    
    return () => {
      delayedCall?.kill();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF9F5] font-sans selection:bg-[#A4715E] selection:text-white overflow-x-hidden">
      <ExitPreviewButton />
      <CafeNavbar />

      {/* FLOATING BOOKING TAB */}
      <motion.div 
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-[100] hidden lg:block"
      >
        <Link to="/demo/cafe/book" className="bg-[#A4715E] text-white py-10 px-4 rounded-l-3xl flex flex-col items-center gap-6 shadow-2xl hover:bg-[#4A403A] transition-all group">
          <Calendar size={20} className="group-hover:scale-110 transition-transform" />
          <span className="[writing-mode:vertical-lr] text-[10px] font-black uppercase tracking-[0.4em]">Book A Table</span>
        </Link>
      </motion.div>

      {/* HERO SECTION - CINEMATIC PARALLAX */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-full transform-gpu will-change-transform"
          >
            <img 
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=2000" 
              className="w-full h-full object-cover brightness-[0.75]" 
              alt="High-end brunch table setting"
              loading="eager"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#FFF9F5]"></div>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 text-center lg:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="max-w-4xl space-y-12 transform-gpu will-change-[opacity,transform]"
          >
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20">
              <Flower2 size={16} className="text-[#FDE2E4]" />
              <span className="text-white font-black text-[10px] uppercase tracking-[0.5em]">Parisian Patisserie & Brunch</span>
            </div>
            <h1 className="font-serif text-6xl md:text-[clamp(4rem,9vw,8rem)] leading-[0.85] text-white font-black tracking-tighter">
              SAVOUR THE <br /> <span className="text-[#FDE2E4] italic">MOMENT.</span>
            </h1>
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start pt-6">
              <Link to="/demo/cafe/menu" className="px-14 py-8 bg-[#A4715E] text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] shadow-[0_20px_50px_rgba(164,113,94,0.3)] hover:bg-white hover:text-[#A4715E] transition-all duration-500 text-center group overflow-hidden relative">
                <span className="relative z-10">View Our Menu</span>
                <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500"></div>
              </Link>
              <Link to="/demo/cafe/book" className="px-14 py-8 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] hover:bg-white hover:text-[#4A403A] transition-all duration-500 text-center">
                Reservations
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center gap-2"
        >
          <span className="text-[8px] uppercase tracking-[0.5em] font-black">Explore Our Story</span>
          <ChevronDown size={20} />
        </motion.div>
      </section>

      {/* FEATURED DISHES GRID */}
      <section className="py-40 px-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col md:flex-row justify-between items-end gap-12 mb-24"
        >
          <div className="space-y-4">
            <span className="text-[#A4715E] font-black text-[11px] uppercase tracking-[0.6em]">The Culinary Selection</span>
            <h2 className="font-serif text-5xl md:text-6xl font-black text-[#4A403A] tracking-tighter uppercase leading-none">CHEF'S <br /><span className="text-[#A4715E] italic">SIGNATURES.</span></h2>
          </div>
          <p className="text-[#A4715E]/60 text-lg italic max-w-sm border-l-2 border-[#FDE2E4] pl-10">"Every dish is a canvas. We source our flour from local mills and our fruit from Wiltshire orchards."</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {featuredDishes.map((dish: any, i: number) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -20 }}
              className="group relative aspect-[3/4] rounded-[3.5rem] overflow-hidden shadow-2xl border-[12px] border-white cursor-pointer"
            >
              <img src={dish.img} alt={dish.title} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4A403A]/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
              <div className="absolute bottom-10 left-10 text-white">
                <span className="text-[9px] font-black uppercase tracking-[0.4em] opacity-60 mb-2 block">{dish.category}</span>
                <h3 className="font-serif text-3xl font-bold tracking-tight mb-2">{dish.title}</h3>
                <p className="text-[#FDE2E4] font-bold text-xl">{dish.price}</p>
              </div>
              <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/30">
                  <ArrowRight size={20} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SEASONAL BANNER - PARALLAX SCROLL EFFECT */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0 bg-cover bg-center scale-110"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=2000')",
            backgroundAttachment: 'fixed'
          }}
        ></motion.div>
        <div className="absolute inset-0 bg-[#4A403A]/60 backdrop-blur-[1px]"></div>
        <div className="relative z-10 text-center space-y-10 px-6">
           <span className="text-white font-black text-[12px] uppercase tracking-[1em]">Seasonal Highlight</span>
           <h2 className="font-serif text-5xl md:text-7xl text-[#FDE2E4] font-black uppercase tracking-tighter leading-none">THE ROSE <br /> <span className="text-white italic">PATISSERIE.</span></h2>
           <div className="pt-6">
            <Link to="/demo/cafe/menu" className="inline-block px-12 py-6 bg-white text-[#A4715E] rounded-full font-black text-[10px] uppercase tracking-widest hover:scale-110 transition-transform duration-500 shadow-2xl">Discover The Collection</Link>
           </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="py-48 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-150px" }}
            className="flex flex-col lg:flex-row items-center gap-24"
          >
            <div className="w-full lg:w-1/2 space-y-12">
              <h2 className="font-serif text-5xl md:text-7xl font-black text-[#4A403A] tracking-tighter uppercase leading-[0.85]">
                CRAFTED <br /> <span className="text-[#A4715E] italic">SPACES.</span>
              </h2>
              <p className="text-xl text-[#A4715E]/70 font-medium italic border-l-4 border-[#FDE2E4] pl-10 leading-relaxed max-w-lg">
                Our flagship cafe is an ode to architectural warmth. Think honed marble counters, natural linens, and the soft scent of freshly ground beans.
              </p>
              <div className="space-y-8 pt-6">
                {[
                  { icon: <Utensils size={18} />, text: "Artisanal Local Sourcing" },
                  { icon: <Coffee size={18} />, text: "Direct Trade Speciality Brews" },
                  { icon: <Sparkles size={18} />, text: "Hand-Crafted Patisserie" }
                ].map((item, j) => (
                  <div key={j} className="flex items-center gap-8 group">
                    <div className="w-14 h-14 bg-[#FDE2E4] text-[#A4715E] flex items-center justify-center rounded-2xl group-hover:scale-110 group-hover:bg-[#A4715E] group-hover:text-white transition-all duration-500 shadow-md">
                      {item.icon}
                    </div>
                    <span className="text-[12px] font-black uppercase tracking-widest text-[#4A403A] group-hover:text-[#A4715E] transition-colors">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full lg:w-1/2 relative">
              <div className="relative aspect-square rounded-[4rem] overflow-hidden shadow-3xl group">
                <img 
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1200" 
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" 
                  alt="Cafe Interior Ambiance"
                />
                <div className="absolute inset-0 bg-[#A4715E]/10 mix-blend-overlay"></div>
              </div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-10 -right-10 bg-[#FDE2E4] p-12 rounded-[3.5rem] shadow-2xl border-[8px] border-white hidden md:block"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Star size={20} className="text-[#A4715E] fill-current" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#A4715E]">Atmosphere</span>
                </div>
                <p className="font-serif text-3xl font-bold text-[#4A403A] tracking-tighter">Curated <br /> Tranquility.</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PRIVATE HIRE SECTION */}
      <section className="py-48 bg-[#0D0D0D] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 p-32 opacity-[0.03] pointer-events-none">
          <Sparkles size={600} />
        </div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-250px" }}
            className="space-y-12"
          >
            <div className="w-20 h-1 bg-[#A4715E]"></div>
            <h2 className="font-serif text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">THE <br /> <span className="text-[#FDE2E4] italic">PRIVATE</span> CLUB.</h2>
            <p className="text-white/40 text-xl font-medium italic leading-relaxed max-w-xl">
              "Available for private events, editorial shoots, and intimate celebrations. Our space becomes your canvas for unforgettable memories."
            </p>
            <div className="flex flex-wrap gap-4">
               {['Weddings', 'Brand Launches', 'Private Dinners', 'Film Shoots'].map(tag => (
                 <span key={tag} className="px-8 py-4 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest hover:border-[#A4715E] transition-colors cursor-default">{tag}</span>
               ))}
            </div>
            <Link to="/demo/cafe/contact" className="inline-flex items-center gap-6 px-14 py-8 bg-[#A4715E] text-white font-black rounded-3xl text-[12px] uppercase tracking-[0.4em] hover:bg-white hover:text-[#4A403A] transition-all duration-500 shadow-2xl group">
              Enquire Now <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
             <div className="rounded-[4rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)] group border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200" 
                className="w-full grayscale-[40%] group-hover:grayscale-0 transition-all duration-[2s]" 
                alt="Private Dining Event Space" 
              />
             </div>
             <div className="absolute -bottom-10 -left-10 bg-white p-12 rounded-[3.5rem] shadow-3xl hidden md:block">
               <div className="flex items-center gap-3 mb-2">
                 <Users size={14} className="text-[#A4715E]" />
                 <p className="text-[#A4715E] font-black text-[10px] uppercase tracking-widest">Capacity</p>
               </div>
               <p className="text-[#4A403A] font-serif text-4xl font-bold tracking-tighter uppercase leading-none">Up to 60 <br />Guests.</p>
             </div>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIAL SLIDER */}
      <section className="py-48 bg-[#FFF9F5] border-y border-[#A4715E]/10">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="w-20 h-20 bg-[#FDE2E4] text-[#A4715E] flex items-center justify-center rounded-full mx-auto mb-16 shadow-lg">
            <Quote size={32} />
          </div>
          <div className="relative min-h-[300px] flex items-center justify-center overflow-hidden mb-12">
            <AnimatePresence mode="wait">
              <motion.div 
                key={testiIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="space-y-12"
              >
                <p className="font-serif text-3xl md:text-5xl text-[#4A403A] italic leading-tight tracking-tight">"{testimonials[testiIndex].text}"</p>
                <div className="flex flex-col items-center gap-6">
                  <img src={testimonials[testiIndex].img} className="w-20 h-20 rounded-full border-4 border-white shadow-xl" alt={testimonials[testiIndex].author} />
                  <div>
                    <p className="text-[#A4715E] font-black text-sm uppercase tracking-[0.5em] mb-1">{testimonials[testiIndex].author}</p>
                    <p className="text-[#4A403A]/30 text-[10px] font-black uppercase tracking-widest">{testimonials[testiIndex].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex justify-center gap-4">
            {testimonials.map((_: any, i: number) => (
              <button 
                key={i} 
                onClick={() => setTestiIndex(i)}
                className={`h-2 rounded-full transition-all duration-500 ${testiIndex === i ? 'bg-[#A4715E] w-12' : 'bg-[#A4715E]/20 w-4'}`}
              ></button>
            ))}
          </div>
        </div>
      </section>

      {/* INSTAGRAM STRIP - CLEANED AND ROBUST */}
      <section className="py-32 bg-[#FFF9F5] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16 flex items-center justify-between">
           <div>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="block group">
              <h2 className="font-serif text-4xl font-bold text-[#4A403A] tracking-tighter group-hover:text-[#A4715E] transition-colors">Follow The Hearth.</h2>
              <p className="text-[#A4715E] font-bold text-xs uppercase tracking-widest">@TheHearthWiltshire</p>
            </a>
           </div>
           <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-[#A4715E] font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-transform">
             Our Feed <Instagram size={20} />
           </a>
        </div>
        <div className="flex gap-10 animate-shimmer-scroll">
          {[
            "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&q=80&w=800",
          ].map((img, i) => (
            <a key={i} href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="min-w-[350px] aspect-square rounded-[2.5rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl border-[6px] border-white group relative">
              <img src={img} alt={`The Hearth Instagram ${i}`} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" loading="lazy" />
              <div className="absolute inset-0 bg-[#A4715E]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Heart size={40} className="text-white fill-current" />
              </div>
            </a>
          ))}
        </div>
      </section>

      <CafeFooter />

      <style>{`
        @keyframes shimmer-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-shimmer-scroll {
          animation: shimmer-scroll 80s linear infinite;
          width: fit-content;
          display: flex;
        }
        .animate-shimmer-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default CafeHome;