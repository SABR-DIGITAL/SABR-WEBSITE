import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Page } from '../App';
import { ArrowRight } from 'lucide-react';

interface HeroProps { 
  navigateTo: (page: Page) => void; 
  startAnimation?: boolean;
}

const Hero: React.FC<HeroProps> = ({ navigateTo, startAnimation = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startAnimation) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "expo.out", force3D: true }
      });
      
      tl.fromTo(".hero-title-top", 
        { opacity: 0, y: 35, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1 }
      );

      tl.fromTo(".hero-reveal-bottom",
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 },
        "-=0.6"
      );
    }, containerRef);

    return () => ctx.revert();
  }, [startAnimation]);

  return (
    <section ref={containerRef} className="relative h-[100dvh] flex items-center px-6 lg:px-24 overflow-hidden bg-[#0b0d10]">
      {/* Background Image with Lighter Top Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-bg.jpg"
          alt="Misty Wiltshire countryside at sunrise"
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Lightened overlay at top to let the sunrise landscape breathe */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/45 to-black/75"></div>
      </div>

      {/* Vertically Centered Content Container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto sm:mx-0 flex flex-col items-center sm:items-start text-center sm:text-left justify-center gap-6 md:gap-8 pt-8">
        

        {/* HERO TITLE: Dense, bold, not all capitals */}
        <h1 className="font-syne text-[clamp(2.6rem,7vw,4.4rem)] font-black leading-[0.98] tracking-[-0.035em] text-white transform-gpu will-change-transform">
          <span className="hero-title-top inline-block opacity-0 drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
            Rooted in <span className="text-shimmer-blue italic font-black">Wiltshire.</span>
          </span>
        </h1>

        {/* SUBTEXT: Reduced by 20%, clean legible font */}
        <div className="hero-reveal-bottom opacity-0 max-w-2xl">
          <p className="font-inter text-lg sm:text-xl md:text-2xl text-stone-100 font-normal leading-relaxed tracking-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
            Custom designs for Ambitous brands.
          </p>
        </div>

        {/* ACTION BUTTONS: One warm off-white solid + one refined ghost button, smaller, softer radius */}
        <div className="hero-reveal-bottom opacity-0 flex flex-col sm:flex-row gap-4 items-center sm:items-start pt-2">
          {/* Primary Warm Off-White Button */}
          <button 
            onClick={() => navigateTo('contact')}
            className="w-full sm:w-auto px-7 py-3.5 bg-[#f5f2eb] hover:bg-white text-stone-900 rounded-xl font-semibold text-xs sm:text-sm tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <span>Start Your Project</span>
            <ArrowRight size={15} />
          </button>

          {/* Outlined Ghost Button */}
          <button 
            onClick={() => navigateTo('work')}
            className="w-full sm:w-auto px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white/95 border border-white/25 hover:border-white/40 rounded-xl font-medium text-xs sm:text-sm tracking-wide transition-all duration-300 backdrop-blur-sm hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>The Work</span>
          </button>
        </div>

      </div>
    </section>
  );
};

export default Hero;
