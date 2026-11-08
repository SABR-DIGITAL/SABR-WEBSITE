import React, { useRef } from 'react';
import { Page, PAGE_PATHS } from '../App';
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { ArrowRight } from 'lucide-react';
import { HERO } from '../gateway/GatewayPage';

interface HeroProps { 
  navigateTo: (page: Page) => void; 
  startAnimation?: boolean;
}

const Hero: React.FC<HeroProps> = ({ navigateTo, startAnimation = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="relative h-[100dvh] flex items-center px-6 lg:px-24 overflow-hidden bg-[#0b0d10]">
      {/* Background Image with Lighter Top Overlay */}
      <div className="absolute inset-0 z-0 transform-gpu">
        {/* Same candidates as HERO['web-design'] in gateway/GatewayPage.tsx, so the
            file the gateway panel (or index.html's preload) already fetched is
            exactly the one this element asks for. */}
        <picture>
          <source type="image/webp" srcSet={HERO['web-design'].srcSet} sizes="100vw" />
          <img
            src="/images/hero-bg-1920.webp"
            srcSet="/images/hero-bg-1280.webp 1280w, /images/hero-bg-1920.webp 1920w, /images/hero-bg-2560.webp 2560w, /images/hero-bg-3840.webp 3840w"
            sizes="100vw"
            width={1920}
            height={1080}
            alt="Misty Wiltshire countryside at sunrise - SABR Digital Web Design Studio"
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </picture>
        {/* Lightened overlay at top to let the sunrise landscape breathe */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/45 to-black/75"></div>
      </div>

      {/* Vertically Centered Content Container with Unveil Sequence */}
      <div className={`relative z-10 w-full max-w-4xl mx-auto sm:mx-0 flex flex-col items-center sm:items-start text-center sm:text-left justify-center gap-6 md:gap-8 pt-8 ${startAnimation ? 'hero-revealed' : 'hero-hidden'}`}>
        
        {/* HERO TITLE: Masked cinematic unveil */}
        <div className="overflow-hidden py-1">
          <h1 className="hero-unveil-title font-syne text-[clamp(2.6rem,7vw,4.4rem)] font-black leading-[0.98] tracking-[-0.035em] text-white will-change-[transform,opacity,filter] transform-gpu">
            <span className="inline-block [text-shadow:0_3px_14px_rgba(0,0,0,0.55)]">
              Rooted in <span className="text-shimmer-blue italic font-black">Wiltshire.</span>
            </span>
          </h1>
        </div>

        {/* SUBTEXT: Masked glide & fade unveil */}
        <div className="hero-subtext-container max-w-2xl overflow-hidden py-0.5">
          <p className="hero-unveil-subtext font-inter text-lg sm:text-xl md:text-2xl text-stone-100 font-normal leading-relaxed tracking-normal [text-shadow:0_2px_8px_rgba(0,0,0,0.6)] will-change-[transform,opacity,filter] transform-gpu">
            Custom designs for Ambitous brands.
          </p>
        </div>

        {/* ACTION BUTTONS: Smooth fade-and-float unveil with instant interactive hovers */}
        <div className="hero-unveil-cta flex flex-col sm:flex-row gap-4 items-center sm:items-start pt-2 will-change-[transform,opacity] transform-gpu">
          {/* Primary Warm Off-White Button */}
          <Link 
            to={PAGE_PATHS.contact}
            onClick={() => navigateTo('contact')}
            className="w-full sm:w-auto px-7 py-3.5 bg-[#f5f2eb] hover:bg-white text-stone-900 rounded-xl font-semibold text-xs sm:text-sm tracking-wide transition-[transform,background-color,box-shadow] duration-150 ease-out shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer transform-gpu will-change-transform"
          >
            <span>Start Your Project</span>
            <ArrowRight size={15} />
          </Link>

          {/* Outlined Ghost Button */}
          <Link 
            to={PAGE_PATHS.work}
            onClick={() => navigateTo('work')}
            className="w-full sm:w-auto px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white/95 border border-white/25 hover:border-white/40 rounded-xl font-medium text-xs sm:text-sm tracking-wide transition-[transform,background-color,border-color] duration-150 ease-out backdrop-blur-sm hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 cursor-pointer transform-gpu will-change-transform"
          >
            <span>The Work</span>
          </Link>
        </div>

      </div>

      <style>{`
        .hero-hidden .hero-unveil-title,
        .hero-hidden .hero-unveil-subtext,
        .hero-hidden .hero-unveil-cta {
          opacity: 0;
          visibility: hidden;
        }

        .hero-unveil-title {
          opacity: 0;
          transform: translate3d(0, 115%, 0);
          filter: blur(8px);
        }
        .hero-revealed .hero-unveil-title {
          animation: heroTitleUnveil 0.95s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
        }

        .hero-unveil-subtext {
          opacity: 0;
          transform: translate3d(0, 26px, 0);
          filter: blur(4px);
        }
        .hero-revealed .hero-unveil-subtext {
          animation: heroSubtextUnveil 0.88s cubic-bezier(0.16, 1, 0.3, 1) 0.26s both;
        }

        .hero-unveil-cta {
          opacity: 0;
          transform: translate3d(0, 22px, 0);
        }
        .hero-revealed .hero-unveil-cta {
          animation: heroCtaUnveil 0.82s cubic-bezier(0.16, 1, 0.3, 1) 0.42s both;
        }

        @keyframes heroTitleUnveil {
          0% {
            opacity: 0;
            transform: translate3d(0, 115%, 0);
            filter: blur(8px);
          }
          40% {
            opacity: 0.75;
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
            filter: blur(0px);
          }
        }

        @keyframes heroSubtextUnveil {
          0% {
            opacity: 0;
            transform: translate3d(0, 26px, 0);
            filter: blur(4px);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
            filter: blur(0px);
          }
        }

        @keyframes heroCtaUnveil {
          0% {
            opacity: 0;
            transform: translate3d(0, 22px, 0);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-unveil-title,
          .hero-unveil-subtext,
          .hero-unveil-cta {
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
            animation: none !important;
            visibility: visible !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
