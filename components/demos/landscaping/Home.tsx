import React, { useEffect, useRef, useState } from 'react';
// Fix react-router-dom missing exports
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { motion as framerMotion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Quote, MoveLeft } from 'lucide-react';
import Navbar from './Navbar';
import ExitPreviewButton from '../../ExitPreviewButton';

// Fix motion types by casting to any
const motion = framerMotion as any;

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "They did an amazing job clearing our land and preparing the site for our new development. Their management plan was flawless and the execution was highly professional.",
    author: "Kevin Young",
    company: "Walker & Young Developments"
  },
  {
    quote: "A masterclass in ecological land management. Oak & Ash transformed our overgrown woodland into a thriving, accessible asset for our private estate.",
    author: "Sarah Jenkins",
    company: "Highwood Estates"
  },
  {
    quote: "Precision, reliability, and architectural vision. The team delivered a complex hardscaping and forestry project with incredible attention to detail.",
    author: "David Harrison",
    company: "Harrison Build Group"
  }
];

const Home: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const sideImgRef = useRef<HTMLDivElement>(null);
  const testimonialSectionRef = useRef<HTMLDivElement>(null);
  const testimonialBgRef = useRef<HTMLDivElement>(null);
  
  const [testiIndex, setTestiIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Hero Parallax
      gsap.to(bgRef.current, {
        y: '20%',
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        }
      });

      gsap.to(sideImgRef.current, {
        y: '-10%',
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      });

      // Testimonial Background Parallax (The Mountain Image)
      gsap.fromTo(testimonialBgRef.current, 
        { y: '-15%' },
        {
          y: '15%',
          ease: 'none',
          scrollTrigger: {
            trigger: testimonialSectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          }
        }
      );
    });

    // Auto-rotate testimonials
    const timer = setInterval(() => {
      setTestiIndex(prev => (prev + 1) % testimonials.length);
    }, 6000);

    return () => {
      ctx.revert();
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F4F1EA] font-inter selection:bg-[#BC4B26] selection:text-white pb-0 overflow-x-hidden">
      <ExitPreviewButton />
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} id="home" className="relative min-h-[90vh] flex flex-col items-center justify-center pt-12 lg:pt-0 overflow-visible px-6 md:px-12">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div 
            ref={bgRef}
            className="absolute -inset-y-[30%] inset-x-0 bg-cover bg-center bg-no-repeat grayscale-[15%] brightness-[0.6] transform-gpu will-change-transform"
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1600')"
            }}
          >
            <div className="absolute inset-0 bg-[#1A3C28]/30"></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col lg:flex-row items-center gap-12 xl:gap-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "circOut" }}
            className="flex-1 space-y-4 md:space-y-6 text-center lg:text-left z-20"
          >
            <p className="text-[#BC4B26] font-black text-[12px] md:text-[14px] uppercase tracking-[0.8em]">Since 1976</p>
            <h1 className="text-white font-oswald text-4xl sm:text-5xl md:text-6xl lg:text-[clamp(3rem,6vw,5rem)] font-bold leading-[1.1] tracking-tight uppercase max-w-xl mx-auto lg:mx-0">
              FORESTRY & <br /> 
              <span className="bg-[#F4F1EA] text-[#1A3C28] px-4 py-1 inline-block mt-2">LAND MGMT.</span>
            </h1>
          </motion.div>

          <div className="flex-1 relative w-full lg:min-h-[500px] flex items-center justify-center lg:justify-end">
            <div 
              ref={sideImgRef}
              className="relative w-full aspect-[4/3] lg:max-w-xl rounded-sm overflow-hidden shadow-2xl z-10 hidden md:block transform-gpu will-change-transform"
            >
              <img 
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200" 
                className="w-full h-[120%] object-cover absolute top-[-10%]" 
                alt="Forestry Road" 
              />
            </div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#F4F1EA] p-8 md:p-12 lg:p-14 w-full md:max-w-md shadow-[0_40px_100px_rgba(0,0,0,0.2)] z-[50] lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:-left-12 xl:-left-20 border border-[#1A3C28]/5 pointer-events-auto"
            >
              <div className="w-10 h-1 bg-[#BC4B26] mb-6"></div>
              <h2 className="text-[#1A3C28] font-oswald text-2xl md:text-3xl font-bold uppercase tracking-tight mb-4">GET A FREE QUOTE</h2>
              <p className="text-[#4A403A] text-sm font-medium mb-8 leading-relaxed opacity-80">
                "We provide professional forestry, clearance and architectural landscaping services across the UK. Request your fixed-price site consultation today."
              </p>
              <div className="mb-8">
                <p className="text-[10px] uppercase font-black tracking-widest text-[#BC4B26] mb-1">Direct Line</p>
                <p className="text-[#1A3C28] font-black text-xl">123-456-7890</p>
              </div>
              <Link 
                to="/demo/landscaping/contact"
                className="relative z-[60] w-full py-5 bg-[#BC4B26] text-white font-black text-[10px] uppercase tracking-[0.4em] flex items-center justify-center gap-4 hover:bg-[#1A3C28] transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg cursor-pointer"
              >
                Free Quote <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-32 md:py-48 px-6 md:px-12 bg-[#F4F1EA]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 space-y-4">
            <p className="text-[#BC4B26] font-black text-[10px] uppercase tracking-[0.6em]">Professional Solutions</p>
            <h2 className="text-[#1A3C28] font-oswald text-3xl md:text-5xl font-bold uppercase tracking-tight">Forestry Services</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              { title: "Forestry Mulching", img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800" },
              { title: "Management Plans", img: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=800" },
              { title: "Timber Harvesting", img: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=800" }
            ].map((s: any, i: number) => (
              <Link to="/demo/landscaping/contact" key={i}>
                <motion.div 
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 40 }}
                  transition={{ duration: 0.8, delay: i * 0.15 }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{ y: -10 }}
                  className="group relative aspect-square overflow-hidden cursor-pointer shadow-xl rounded-sm transform-gpu"
                >
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1s]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-[#BC4B26]/0 group-hover:bg-[#BC4B26] transition-colors duration-500">
                    <h3 className="text-white font-oswald text-xl font-bold uppercase tracking-tight">{s.title}</h3>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 md:py-48 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 lg:gap-32">
          <div className="w-full md:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative p-10 md:p-14 bg-[#F4F1EA] border border-[#1A3C28]/5 shadow-2xl rounded-sm"
            >
              <div className="overflow-hidden mb-10 rounded-sm bg-slate-200">
                <img src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=800" alt="Forestry Team" className="w-full h-auto grayscale" />
              </div>
              <h3 className="text-[#1A3C28] font-oswald text-3xl font-bold uppercase tracking-tight mb-4">Professional Expertise</h3>
              <p className="text-[#4A403A] text-sm leading-relaxed mb-8 opacity-70">
                "Our team combines decades of environmental knowledge with modern architectural building techniques."
              </p>
              <Link to="/demo/landscaping/contact" className="text-[#BC4B26] font-black text-[10px] uppercase tracking-[0.4em] flex items-center gap-3 group">
                Work With Us <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          </div>
          <div className="w-full md:w-1/2 space-y-10">
            <h2 className="text-[#1A3C28] font-oswald text-4xl md:text-5xl lg:text-5xl font-bold uppercase tracking-tighter leading-none">OAK & ASH <br /> <span className="text-[#BC4B26] italic">LEGACY.</span></h2>
            <p className="text-[#4A403A] text-xl leading-relaxed opacity-80 border-l-4 border-[#BC4B26] pl-10">
              Founded in 1976, we have managed some of the most complex forestry and private estate landscaping projects in the United Kingdom.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div>
                <p className="text-4xl md:text-5xl font-bold text-[#1A3C28] mb-2 font-oswald">1,200+</p>
                <p className="text-[10px] font-black text-[#4A403A] uppercase tracking-widest opacity-40">Projects Completed</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-bold text-[#1A3C28] mb-2 font-oswald">45+</p>
                <p className="text-[10px] font-black text-[#4A403A] uppercase tracking-widest opacity-40">Expert Crew Members</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Perfectly Symmetrical & Fixed Height to prevent cutting */}
      <section ref={testimonialSectionRef} className="relative py-40 md:py-56 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div 
            ref={testimonialBgRef}
            className="absolute -inset-y-[40%] inset-x-0 bg-cover bg-center bg-no-repeat grayscale brightness-[0.3] transform-gpu will-change-transform"
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=1600')"
            }}
          ></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex items-center justify-center">
          <div className="bg-white/95 backdrop-blur-md w-full max-w-4xl min-h-[500px] md:min-h-[580px] flex flex-col justify-center items-center text-center relative border border-white/20 shadow-2xl rounded-sm transform-gpu overflow-hidden px-10 md:px-24 py-16">
            
            <div className="w-16 h-16 md:w-20 md:h-20 bg-[#BC4B26] rounded-full flex items-center justify-center text-white shadow-2xl mb-8 md:mb-12 shrink-0 relative z-20">
              <Quote size={32} />
            </div>
            
            <div className="relative w-full flex-grow flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={testiIndex}
                  initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -15, filter: 'blur(8px)' }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full flex flex-col items-center justify-center"
                >
                  <p className="text-[#1A3C28] text-xl md:text-3xl lg:text-[2.4rem] font-medium leading-tight italic mb-8 md:mb-12 opacity-95 max-w-3xl">
                    "{testimonials[testiIndex].quote}"
                  </p>
                  
                  <div className="space-y-2 mt-auto">
                    <p className="text-[#BC4B26] font-black text-[12px] uppercase tracking-[0.5em]">
                      {testimonials[testiIndex].author}
                    </p>
                    <p className="text-[#4A403A] text-[10px] font-black uppercase tracking-[0.6em] opacity-40">
                      {testimonials[testiIndex].company}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex gap-3 mt-10 shrink-0 relative z-20">
              {testimonials.map((_: any, i: number) => (
                <div 
                  key={i} 
                  className={`h-1.5 rounded-full transition-all duration-700 ${testiIndex === i ? 'bg-[#BC4B26] w-10' : 'bg-[#1A3C28]/10 w-2'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Work Gallery */}
      <section id="gallery" className="py-32 md:py-48 px-6 md:px-12 bg-[#F4F1EA] overflow-hidden">
        <div className="max-w-7xl mx-auto mb-20 text-center">
          <h2 className="text-[#1A3C28] font-oswald text-4xl md:text-6xl font-bold uppercase tracking-tight">Work Gallery</h2>
        </div>
        <div className="flex gap-8 overflow-x-auto pb-10 no-scrollbar snap-x px-4">
          {[
            "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&get=80&w=1200",
            "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=1600"
          ].map((img, i) => (
            <div key={i} className="min-w-[320px] md:min-w-[600px] aspect-video rounded-sm overflow-hidden snap-center shadow-xl border border-white/10 group">
              <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.2s] ease-out" />
            </div>
          ))}
        </div>
      </section>

      {/* Contact Footer */}
      <footer className="bg-[#1A3C28] py-24 md:py-32 px-6 md:px-12 text-white border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-20">
          <div className="space-y-10">
            <div className="flex flex-col">
              <span className="font-oswald font-bold text-3xl uppercase tracking-tighter leading-none">OAK & ASH</span>
              <span className="font-black text-[10px] uppercase tracking-[0.4em] text-[#BC4B26]">LANDSCAPING</span>
            </div>
            <p className="text-white/40 text-sm font-medium leading-relaxed max-w-xs">Providing expert forestry and land management solutions across the UK since 1976.</p>
          </div>
          <div className="space-y-8">
            <h4 className="font-oswald font-bold text-xl uppercase tracking-tight">Our Location</h4>
            <p className="text-white/60 text-sm font-medium leading-relaxed border-l border-white/10 pl-6">The Old Timber Yard <br /> Wiltshire Forest, SN1 <br /> United Kingdom</p>
          </div>
          <div className="space-y-8">
            <h4 className="font-oswald font-bold text-xl uppercase tracking-tight">Contact</h4>
            <div className="space-y-2">
              <p className="text-white/60 text-sm font-medium">studio@oakandash.demo</p>
              <p className="text-[#BC4B26] font-bold text-lg">123-456-7890</p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">© 2025 OAK & ASH LANDSCAPING | BUILT BY SABR DIGITAL</p>
          <Link to="/projects" className="text-[9px] font-black uppercase tracking-[0.4em] text-white flex items-center gap-3 hover:text-[#BC4B26] transition-colors group">
            <MoveLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Exit Demo
          </Link>
        </div>
      </footer>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Home;