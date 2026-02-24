
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Page } from '../App';
import { Sparkles, ArrowRight } from 'lucide-react';

interface HeroProps { 
  navigateTo: (page: Page) => void; 
  startAnimation?: boolean;
}

const phrases = [
  "SABR builds high-performing sites that help your business grow.",
  "Meticulously crafted for perfect detail and better results.",
  "Professional online experiences designed for tomorrow's business.",
  "Websites optimized to turn visitors into long-term customers."
];

const Hero: React.FC<HeroProps> = ({ navigateTo, startAnimation = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const phraseRef = useRef<HTMLParagraphElement>(null);
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    if (!startAnimation) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "expo.out", force3D: true }
      });
      
      tl.fromTo(".hero-title-top", 
        { opacity: 0, y: 40, filter: 'blur(15px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2 }
      );

      tl.fromTo(".hero-work-block", 
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 1.5 },
        "-=1.0"
      );

      tl.fromTo(".hero-reveal-bottom", 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.08 },
        "-=1.2"
      );

      let delayedCall: gsap.core.Tween;

      const rotatePhrases = () => {
        if (!phraseRef.current) return;
        
        gsap.to(phraseRef.current, {
          opacity: 0,
          y: -15,
          duration: 0.4,
          ease: "power2.in",
          onComplete: () => {
            setPhraseIndex((prev) => (prev + 1) % phrases.length);
            gsap.fromTo(phraseRef.current, 
              { opacity: 0, y: 15 },
              { opacity: 1, y: 0, duration: 0.6, ease: "expo.out", force3D: true, onComplete: () => {
                delayedCall = gsap.delayedCall(5.5, rotatePhrases);
              }}
            );
          }
        });
      };

      delayedCall = gsap.delayedCall(5.5, rotatePhrases);

      return () => {
        delayedCall?.kill();
      };
    }, containerRef);

    return () => ctx.revert();
  }, [startAnimation]);

  return (
    <section ref={containerRef} className="relative h-[100dvh] flex flex-col items-center sm:items-start px-6 lg:px-24 overflow-hidden bg-[#fdfbf7]">
      <div className="h-24 md:h-32 shrink-0 w-full"></div>

      <div className="flex-1 w-full flex flex-col items-center sm:items-start justify-start gap-6 md:gap-10 pb-12 md:pb-24">
        <div className="w-full flex flex-col items-center sm:items-start">
          <h1 className="font-syne text-[clamp(1.1rem,4.4vw,4.4rem)] leading-[1.05] tracking-[-0.04em] uppercase flex flex-col items-center sm:items-start text-center sm:text-left text-[#050608] w-full transform-gpu will-change-transform">
            <span className="hero-title-top font-extrabold mb-4 md:mb-6 pl-0 opacity-0">Built to Perform</span>
            <div className="hero-work-block relative w-screen ml-[-24px] lg:ml-[-96px] flex items-center justify-center sm:justify-start overflow-hidden will-change-[clip-path]" style={{ clipPath: 'inset(0 100% 0 0)' }}>
              {/* Updated gradient to match Navbar 'text-shimmer-blue' exactly for perfect sync */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#2563eb] via-[#38bdf8] via-[#ffffff] via-[#38bdf8] to-[#2563eb] -z-10 animate-hyper-shimmer bg-[length:200%_auto] will-change-[background-position]"></div>
              <span className="pl-0 sm:pl-6 lg:pl-24 pr-0 sm:pr-4 md:pr-10 py-5 md:py-8 block text-white tracking-tighter whitespace-nowrap text-[clamp(0.9rem,4vw,4rem)]">Designed to Dominate</span>
            </div>
          </h1>
        </div>

        <div className="hero-reveal-bottom w-full flex flex-col items-center sm:items-start gap-10 md:gap-14 transform-gpu opacity-0">
          {/* FIXED HEIGHT CONTAINER WITH LARGER MINIMALIST FONT */}
          <div className="h-[120px] md:h-[160px] flex items-center max-w-4xl overflow-hidden">
            <p ref={phraseRef} className="font-inter text-2xl md:text-4xl text-slate-800 font-medium leading-[1.1] tracking-[-0.02em] text-center sm:text-left will-change-[opacity,transform]">
              {phrases[phraseIndex]}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
            <button 
              onClick={() => navigateTo('contact')}
              className="relative px-16 py-8 md:py-9 bg-blue-600 text-white font-black text-[11px] md:text-[12px] uppercase tracking-[0.4em] rounded-2xl transition-all duration-500 shadow-[0_20px_40px_rgba(37,99,235,0.2)] flex items-center justify-center gap-4 group hover:bg-blue-700 hover:-translate-y-2 hover:rotate-[-1deg] active:scale-95 transform-gpu overflow-hidden"
            >
              {/* QUIRKY HOVER BG EFFECT */}
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
              <span className="relative z-10 flex items-center gap-4">
                Start Project
                <Sparkles size={16} className="group-hover:rotate-[120deg] group-hover:scale-150 transition-all duration-700" />
              </span>
            </button>
            <button 
              onClick={() => navigateTo('work')}
              className="px-16 py-8 md:py-9 bg-white border border-slate-200 text-slate-950 font-black text-[11px] md:text-[12px] uppercase tracking-[0.4em] rounded-2xl transition-all duration-500 flex items-center justify-center gap-3 group hover:border-blue-600 hover:text-blue-600 hover:-translate-y-2 hover:rotate-[1deg] hover:shadow-2xl active:scale-95 transform-gpu"
            >
              The Work
              <ArrowRight size={16} className="group-hover:translate-x-4 group-hover:scale-125 transition-all duration-500" />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes hyper-shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        .animate-hyper-shimmer {
          animation: hyper-shimmer 5s linear infinite;
          transform: translateZ(0);
          opacity: 0.95;
        }
      `}</style>
    </section>
  );
};

export default Hero;
