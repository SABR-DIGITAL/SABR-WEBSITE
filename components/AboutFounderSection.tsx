import React, { useEffect, useRef } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
// Fix react-router-dom missing exports
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Page, PAGE_PATHS } from '../App';

gsap.registerPlugin(ScrollTrigger);

interface AboutFounderSectionProps {
  navigateTo?: (page: Page) => void;
  /** Overrides for reusing this section on the AI Optimisation site. */
  headline?: React.ReactNode;
  body?: React.ReactNode;
  points?: string[];
  ctaLabel?: string;
  ctaTo?: string;
}

const DEFAULT_POINTS = [
  'Face to face in Wiltshire',
  '24/7 Fast support after launch',
  'Fixed pricing, no surprises',
  'Live in up to 10 days'
];

// Preload and pre-decode the founder portrait at module load time so it is
// already in memory and paints immediately without any decode delay.
if (typeof window !== 'undefined') {
  const preloadImg = new Image();
  preloadImg.decoding = 'async';
  preloadImg.src = '/assets/aistudio/image_c05e976f.webp';
  preloadImg.decode?.().catch(() => {});
}

const AboutFounderSection: React.FC<AboutFounderSectionProps> = ({
  navigateTo,
  headline,
  body,
  points = DEFAULT_POINTS,
  ctaLabel = 'Start Your Project With Us',
  ctaTo
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageColRef = useRef<HTMLDivElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const imgCol = imageColRef.current;
    const txtCol = textColRef.current;
    if (!section || !imgCol || !txtCol) return;

    const reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const canAnimate =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px)').matches;
    if (!canAnimate) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgCol,
        { x: -10, opacity: 0.82 },
        {
          x: 0,
          opacity: 1,
          duration: 0.32,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            once: true
          }
        }
      );

      gsap.fromTo(
        txtCol,
        { x: 10, opacity: 0.82 },
        {
          x: 0,
          opacity: 1,
          duration: 0.32,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            once: true
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-14 md:py-24 px-5 sm:px-6 lg:px-20 bg-[#fdfbf7] overflow-hidden border-t border-stone-200/60"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* LEFT COLUMN: Founder Portrait */}
          <div
            ref={imageColRef}
            className="lg:col-span-5 flex justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-[320px] sm:max-w-[380px] group">
              
              {/* Subtle decorative glow & backdrop accent (desktop only to save mobile GPU fill-rate) */}
              <div 
                aria-hidden="true" 
                className="hidden md:block absolute -inset-1.5 bg-gradient-to-tr from-emerald-600/15 via-stone-400/10 to-transparent rounded-lg blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-700"
              />

              {/* Founder Image Frame */}
              <div className="relative rounded-lg overflow-hidden bg-stone-900 border border-stone-300/90 shadow-lg aspect-[3/4]">
                <picture className="block w-full h-full">
                  <source srcSet="/assets/aistudio/image_c05e976f.webp" type="image/webp" />
                  <img
                    src="/assets/aistudio/image_c05e976f.webp"
                    alt="Raphael - Founder of SABR Digital in Wiltshire"
                    width={1069}
                    height={1472}
                    className="w-full h-full object-cover object-top md:transition-transform md:duration-700 md:group-hover:scale-[1.03]"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                  />
                </picture>

                {/* Subtle gradient vignette at the bottom */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-5 text-white">
                  <span className="font-syne text-base font-bold tracking-tight">
                    Raphael
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300">
                    Founder · SABR DIGITAL · Wiltshire
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: ABOUT SABR text */}
          <div
            ref={textColRef}
            className="lg:col-span-7 flex flex-col justify-center space-y-4 sm:space-y-5"
          >
            
            {/* EYEBROW */}
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-emerald-800 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              <span>ABOUT SABR</span>
            </div>

            {/* HEADLINE */}
            <h2 className="font-syne text-2xl sm:text-3xl lg:text-[2rem] font-bold text-slate-950 tracking-tight leading-[1.15]">
              {headline ?? (
                <>
                  My name is Raphael, and I am the founder of{' '}
                  <span className="text-shimmer-blue italic font-black uppercase">SABR DIGITAL.</span>
                </>
              )}
            </h2>

            {/* FOUNDER STATEMENT */}
            <p className="text-slate-600 font-inter text-sm sm:text-base leading-relaxed font-normal">
              {body ?? 'Rooted in Wiltshire, I founded SABR Digital with a straightforward conviction: ambitious local businesses deserve websites that command respect and outperform generic competitors. No sluggish WordPress templates or bloated agency retainers — every site is engineered from scratch with clean TypeScript, sub-second load times, and conversion architecture built to turn visitors into paying clients from day one.'}
            </p>

            {/* CORE STRENGTHS / DELIVERABLES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 pt-2 border-t border-stone-200/70">
              {points.map((point) => (
                <div key={point} className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  <span className="text-xs sm:text-[13px] font-semibold text-slate-800">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA BUTTON */}
            <div className="pt-2">
              <Link
                to={ctaTo ?? PAGE_PATHS.contact}
                onClick={() => !ctaTo && navigateTo && navigateTo('contact')}
                className="inline-flex items-center gap-2.5 px-7 py-3 bg-emerald-600 hover:bg-slate-950 text-white rounded-full font-semibold text-xs uppercase tracking-wider transition-colors duration-200 ease-out shadow-md active:scale-95"
              >
                <span>{ctaLabel}</span>
                <ArrowRight size={14} />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutFounderSection;
