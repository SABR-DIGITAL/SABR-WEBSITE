
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { 
  Hexagon, 
  TrendingUp, 
  Home, 
  Clock, 
  Smartphone, 
  Diamond, 
  Zap,
  Sparkles
} from 'lucide-react';

const testimonials = [
  {
    logo: <Hexagon size={24} strokeWidth={2} />,
    text: "I used to rely purely on word-of-mouth. Now, the website brings in high-quality leads while I’m out on a job.",
    gradient: "from-blue-400 to-blue-600",
    glow: "rgba(37, 99, 235, 0.4)"
  },
  {
    logo: <TrendingUp size={24} strokeWidth={2} />,
    text: "We’re finally appearing at the top of Google for our local area. The visibility has been a total game-changer.",
    gradient: "from-blue-500 to-blue-700",
    glow: "rgba(37, 99, 235, 0.4)"
  },
  {
    logo: <Home size={24} strokeWidth={2} />,
    text: "Our old site was embarrassing. Now, I’m proud to send the link to new clients. It reflects the quality of work we do.",
    gradient: "from-blue-300 to-blue-500",
    glow: "rgba(37, 99, 235, 0.4)"
  },
  {
    logo: <Clock size={24} strokeWidth={2} />,
    text: "The new booking system has saved me hours of admin every week. No more back-and-forth emails.",
    gradient: "from-blue-400 to-blue-600",
    glow: "rgba(37, 99, 235, 0.4)"
  },
  {
    logo: <Smartphone size={24} strokeWidth={2} />,
    text: "Our new site works perfectly on a phone. Most of our customers find us via mobile. It’s been a real revelation.",
    gradient: "from-blue-500 to-blue-700",
    glow: "rgba(37, 99, 235, 0.4)"
  },
  {
    logo: <Diamond size={24} strokeWidth={2} />,
    text: "They didn't just build a website; they built a brand identity. We feel more confident than ever.",
    gradient: "from-blue-300 to-blue-500",
    glow: "rgba(37, 99, 235, 0.4)"
  },
  {
    logo: <Zap size={24} strokeWidth={2} />,
    text: "The site is incredibly fast and intuitive. Our customers have gone out of their way to tell us how easy it is.",
    gradient: "from-blue-400 to-blue-600",
    glow: "rgba(37, 99, 235, 0.4)"
  }
];

const allTestimonials = [...testimonials, ...testimonials, ...testimonials];

const TestimonialCarousel: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollEl = scrollRef.current;
      if (!scrollEl) return;

      const scrollWidth = scrollEl.scrollWidth;
      
      tweenRef.current = gsap.to(scrollEl, {
        x: -scrollWidth / 3,
        duration: 15, // Even faster (was 20)
        ease: "none",
        repeat: -1,
        force3D: true
      });

      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          tweenRef.current?.play();
        } else {
          tweenRef.current?.pause();
        }
      }, { threshold: 0.1 });

      observer.observe(scrollEl);

      return () => observer.disconnect();
    }, scrollRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = () => tweenRef.current?.pause();
  const handleMouseLeave = () => tweenRef.current?.play();

  return (
    <section className="bg-[#fdfbf7] py-12 md:py-16 border-b border-slate-100 overflow-hidden select-none relative">
      <div className="max-w-7xl mx-auto px-6 mb-10 text-left flex flex-col md:flex-row items-start md:items-end justify-between gap-6 relative z-10">
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <div className="h-[2px] w-12 bg-slate-950"></div>
            <span className="text-slate-950 font-black text-[10px] uppercase tracking-[1em]">YOUR QUOTES</span>
          </div>
          <h2 className="font-syne text-3xl md:text-5xl font-black text-slate-950 tracking-tighter uppercase leading-none">
            STATUS <span className="text-blue-600 italic">MATTERS.</span>
          </h2>
        </div>

        <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-xl shadow-sm border border-slate-100">
           <Sparkles size={14} className="text-blue-600 animate-pulse" />
           <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400">Verified Client Feedback</span>
        </div>
      </div>

      <div className="relative w-full overflow-hidden perspective-1000">
        <div 
          ref={scrollRef} 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="flex items-center gap-6 md:gap-10 whitespace-nowrap will-change-transform transform-gpu px-12 py-8"
        >
          {allTestimonials.map((item, idx) => (
            <div 
              key={idx} 
              className="relative shrink-0 w-[280px] md:w-[420px] h-[160px] md:h-[200px] group rounded-[2rem] md:rounded-[2.5rem] overflow-hidden transform transition-all duration-700 hover:scale-105 hover:-rotate-1 shadow-lg hover:shadow-2xl"
            >
              {/* VIBRANT GRADIENT BACKDROP */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-90 transition-opacity duration-700`}></div>
              
              {/* ARCHITECTURAL NOISE OVERLAY */}
              <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>

              {/* DYNAMIC GLOW */}
              <div 
                className="absolute -inset-4 blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-1000"
                style={{ backgroundColor: item.glow }}
              ></div>
              
              <div className="relative w-full h-full flex flex-col justify-between p-8 md:p-10 z-10 border border-white/20">
                <div className="text-white group-hover:scale-110 transition-transform duration-700 origin-left">
                  {React.cloneElement(item.logo as React.ReactElement, { size: 20 })}
                </div>

                <div className="relative">
                  <p className="text-white font-inter font-black text-base md:text-xl tracking-tighter whitespace-normal leading-[1.2] transition-all duration-700 italic">
                    "{item.text}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* EDGE GRADIENTS FOR LUXURY FADE */}
        <div className="absolute top-0 left-0 bottom-0 w-24 md:w-64 bg-gradient-to-r from-[#fdfbf7] to-transparent z-20 pointer-events-none"></div>
        <div className="absolute top-0 right-0 bottom-0 w-24 md:w-64 bg-gradient-to-l from-[#fdfbf7] to-transparent z-20 pointer-events-none"></div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
