
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
    gradient: "from-blue-600 to-indigo-700",
    glow: "rgba(37, 99, 235, 0.4)"
  },
  {
    logo: <TrendingUp size={24} strokeWidth={2} />,
    text: "We’re finally appearing at the top of Google for our local area. The visibility has been a total game-changer.",
    gradient: "from-indigo-600 to-purple-700",
    glow: "rgba(79, 70, 229, 0.4)"
  },
  {
    logo: <Home size={24} strokeWidth={2} />,
    text: "Our old site was embarrassing. Now, I’m proud to send the link to new clients. It reflects the quality of work we do.",
    gradient: "from-cyan-500 to-blue-600",
    glow: "rgba(6, 182, 212, 0.4)"
  },
  {
    logo: <Clock size={24} strokeWidth={2} />,
    text: "The new booking system has saved me hours of admin every week. No more back-and-forth emails.",
    gradient: "from-violet-600 to-fuchsia-700",
    glow: "rgba(124, 58, 237, 0.4)"
  },
  {
    logo: <Smartphone size={24} strokeWidth={2} />,
    text: "Our new site works perfectly on a phone. Most of our customers find us via mobile. It’s been a real revelation.",
    gradient: "from-blue-500 to-cyan-500",
    glow: "rgba(59, 130, 246, 0.4)"
  },
  {
    logo: <Diamond size={24} strokeWidth={2} />,
    text: "They didn't just build a website; they built a brand identity. We feel more confident than ever.",
    gradient: "from-purple-600 to-indigo-600",
    glow: "rgba(147, 51, 234, 0.4)"
  },
  {
    logo: <Zap size={24} strokeWidth={2} />,
    text: "The site is incredibly fast and intuitive. Our customers have gone out of their way to tell us how easy it is.",
    gradient: "from-blue-700 to-violet-800",
    glow: "rgba(37, 99, 235, 0.4)"
  }
];

const allTestimonials = [...testimonials, ...testimonials, ...testimonials];

const TestimonialCarousel: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    const scrollWidth = scrollEl.scrollWidth;
    
    tweenRef.current = gsap.to(scrollEl, {
      x: -scrollWidth / 3,
      duration: 32, 
      ease: "none",
      repeat: -1,
    });

    return () => {
      tweenRef.current?.kill();
    };
  }, []);

  const handleMouseEnter = () => tweenRef.current?.pause();
  const handleMouseLeave = () => tweenRef.current?.play();

  return (
    <section className="bg-[#fdfbf7] py-20 border-b border-slate-100 overflow-hidden select-none relative">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-left flex flex-col md:flex-row items-start md:items-end justify-between gap-8 relative z-10">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-[2px] w-12 bg-slate-950"></div>
            <span className="text-slate-950 font-black text-[11px] uppercase tracking-[1em]">YOUR QUOTES</span>
          </div>
          <h2 className="font-syne text-4xl md:text-6xl font-black text-slate-950 tracking-tighter uppercase leading-none">
            STATUS <span className="text-blue-600 italic">MATTERS.</span>
          </h2>
        </div>

        <div className="flex items-center gap-4 px-6 py-4 bg-white rounded-2xl shadow-sm border border-slate-100">
           <Sparkles size={16} className="text-blue-600 animate-pulse" />
           <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Verified Client Feedback</span>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <div 
          ref={scrollRef} 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="flex items-center gap-10 whitespace-nowrap will-change-transform transform-gpu px-12 py-10"
        >
          {allTestimonials.map((item, idx) => (
            <div 
              key={idx} 
              className="relative shrink-0 w-[320px] md:w-[460px] h-[180px] md:h-[220px] group rounded-[2.5rem] overflow-hidden transform transition-all duration-700 hover:scale-105 hover:-rotate-1"
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
              
              <div className="relative w-full h-full flex flex-col justify-between p-10 md:p-12 z-10 border border-white/20">
                <div className="text-white group-hover:scale-110 transition-transform duration-700 origin-left">
                  {item.logo}
                </div>

                <div className="relative">
                  <p className="text-white font-inter font-black text-lg md:text-2xl tracking-tighter whitespace-normal leading-[1.25] transition-all duration-700 italic">
                    "{item.text}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* EDGE GRADIENTS FOR LUXURY FADE */}
        <div className="absolute top-0 left-0 bottom-0 w-32 md:w-80 bg-gradient-to-r from-[#fdfbf7] to-transparent z-20 pointer-events-none"></div>
        <div className="absolute top-0 right-0 bottom-0 w-32 md:w-80 bg-gradient-to-l from-[#fdfbf7] to-transparent z-20 pointer-events-none"></div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
