
import React, { useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import { gsap } from 'gsap';

const reviews = [
  {
    business: "Landscaping & Groundworks",
    text: "\"Enquiries tripled since launch. Mobile speed is now our primary edge.\"",
    color: "bg-[#E0F2FE]", // Sky 100
    textColor: "text-[#0369A1]",
    accent: "bg-[#0369A1]/10",
  },
  {
    business: "Bespoke Carpentry",
    text: "\"Captures the elite essence of our craft perfectly. A true digital asset.\"",
    color: "bg-[#DBEAFE]", // Blue 100
    textColor: "text-[#1E40AF]",
    accent: "bg-[#1E40AF]/10",
  },
  {
    business: "Specialist Roofing",
    text: "\"Remarkable ROI. The technical foundation is far superior to any agency.\"",
    color: "bg-[#BFDBFE]", // Blue 200
    textColor: "text-[#1E3A8A]",
    accent: "bg-[#1E3A8A]/10",
  },
  {
    business: "Engineering Solutions",
    text: "\"An exceptionally sharp aesthetic. The user flow is absolutely flawless.\"",
    color: "bg-[#93C5FD]", // Blue 300
    textColor: "text-[#1E3A8A]",
    accent: "bg-white/30",
  },
  {
    business: "Elite Interior Design",
    text: "\"Transformed how high-net-worth clients perceive our brand value.\"",
    color: "bg-[#60A5FA]", // Blue 400
    textColor: "text-white",
    accent: "bg-white/20",
  }
];

const allReviews = [...reviews, ...reviews, ...reviews];

const ReviewSection: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      const carouselWidth = carousel.scrollWidth;
      // High-velocity infinite scroll
      const tween = gsap.to(carousel, {
        x: -carouselWidth / 3,
        duration: 12, // Faster movement
        ease: "none",
        repeat: -1,
      });

      // Complete halt on hover
      const handleMouseEnter = () => tween.pause();
      const handleMouseLeave = () => tween.play();

      carousel.addEventListener('mouseenter', handleMouseEnter);
      carousel.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        carousel.removeEventListener('mouseenter', handleMouseEnter);
        carousel.removeEventListener('mouseleave', handleMouseLeave);
        tween.kill();
      };
    }
  }, []);

  return (
    <section className="py-32 px-6 bg-[#fdfbf7] border-y border-slate-100 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto mb-20">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-8">
          <div className="max-w-xl text-center md:text-left border-l-[6px] border-blue-600 pl-8">
            <span className="text-[10px] uppercase tracking-[0.8em] text-blue-600 font-black mb-4 block">SUCCESS METRICS</span>
            <h2 className="font-syne text-4xl md:text-6xl text-slate-950 font-black tracking-tighter leading-[1] uppercase">
              CLIENT <br /><span className="text-blue-600 italic">RESULTS.</span>
            </h2>
          </div>
          <div className="flex items-center gap-3 px-8 py-4 bg-white rounded-2xl shadow-sm border border-slate-100">
             <Sparkles size={16} className="text-blue-600" />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Verified Performance</span>
          </div>
        </div>
      </div>

      <div className="relative w-full overflow-hidden py-10 z-10">
        <div 
          ref={carouselRef} 
          className="flex gap-10 whitespace-nowrap will-change-transform transform-gpu"
        >
          {allReviews.map((rev, idx) => (
            <div 
              key={idx} 
              className={`inline-block w-[320px] md:w-[400px] h-[320px] md:h-[380px] shrink-0 ${rev.color} p-10 md:p-12 rounded-[3.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.03)] border border-white/20 transition-all duration-500 hover:scale-[1.05] group relative overflow-hidden flex flex-col justify-between`}
            >
              {/* Background Architectural Shimmer */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 flex flex-col h-full justify-center items-center text-center">
                {/* Large Minimalist Testimonial with Syne font for impact */}
                <p className={`${rev.textColor} text-xl md:text-3xl font-syne font-black leading-[1.2] tracking-tight whitespace-normal mb-8`}>
                  {rev.text}
                </p>
                
                {/* Standardized Industry Label Position */}
                <div className="mt-4 flex justify-center w-full">
                  <div className={`px-5 py-2 rounded-full ${rev.accent} backdrop-blur-md border border-white/10`}>
                    <h4 className={`font-inter font-black text-[9px] uppercase tracking-[0.4em] ${rev.textColor} opacity-90`}>
                      {rev.business}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Visual Edge Masks for Luxury Fade */}
      <div className="absolute top-0 left-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-[#fdfbf7] to-transparent z-20 pointer-events-none"></div>
      <div className="absolute top-0 right-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-[#fdfbf7] to-transparent z-20 pointer-events-none"></div>
    </section>
  );
};

export default ReviewSection;
