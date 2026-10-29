import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
// Fix react-router-dom missing exports
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { Page, PAGE_PATHS } from '../App';

interface AboutFounderSectionProps {
  navigateTo?: (page: Page) => void;
}

const AboutFounderSection: React.FC<AboutFounderSectionProps> = ({ navigateTo }) => {
  return (
    <section id="about" className="relative py-14 md:py-20 px-6 lg:px-20 bg-[#fdfbf7] overflow-hidden border-t border-stone-200/60">
      <div className="max-w-6xl mx-auto relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* LEFT COLUMN: Founder Portrait (Raphael in Navy Suit) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] group">
              
              {/* Subtle decorative glow & backdrop accent */}
              <div 
                aria-hidden="true" 
                className="absolute -inset-1.5 bg-gradient-to-tr from-emerald-600/15 via-stone-400/10 to-transparent rounded-lg blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-700"
              />

              {/* Founder Image Frame - More square with clean modern radius */}
              <div className="relative rounded-lg overflow-hidden bg-stone-900 border border-stone-300/90 shadow-[0_12px_36px_-12px_rgba(0,0,0,0.15)] aspect-[3/4]">
                <img
                  src="/assets/aistudio/image_c05e976f.png"
                  alt="Raphael - Founder of SABR Digital in Wiltshire"
                  className="w-full h-full object-cover object-top transform transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />

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

          {/* RIGHT COLUMN: ABOUT SABR - Compact to match photo height */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-4 sm:space-y-5">
            
            {/* EYEBROW */}
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-emerald-800 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              <span>ABOUT SABR</span>
            </div>

            {/* HEADLINE: Compact, high-impact typography - Not all capitals, SABR DIGITAL stays uppercase */}
            <h2 className="font-syne text-2xl sm:text-3xl lg:text-[2rem] font-bold text-slate-950 tracking-tight leading-[1.15]">
              My name is Raphael, and I am the founder of{' '}
              <span className="text-shimmer-blue italic font-black uppercase">SABR DIGITAL.</span>
            </h2>

            {/* FOUNDER STATEMENT: Concise, focused narrative */}
            <p className="text-slate-600 font-inter text-sm sm:text-base leading-relaxed font-normal">
              Rooted in Wiltshire, I founded SABR Digital with a straightforward conviction: ambitious local businesses deserve websites that command respect and outperform generic competitors. No sluggish WordPress templates or bloated agency retainers — every site is engineered from scratch with clean TypeScript, sub-second load times, and conversion architecture built to turn visitors into paying clients from day one.
            </p>

            {/* CORE STRENGTHS / DELIVERABLES: Exact 4 requested points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 pt-2 border-t border-stone-200/70">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span className="text-xs sm:text-[13px] font-semibold text-slate-800">
                  Face to face in Wiltshire
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span className="text-xs sm:text-[13px] font-semibold text-slate-800">
                  24/7 Fast support after launch
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span className="text-xs sm:text-[13px] font-semibold text-slate-800">
                  Fixed pricing, no surprises
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span className="text-xs sm:text-[13px] font-semibold text-slate-800">
                  Live in weeks, not months
                </span>
              </div>
            </div>

            {/* CTA BUTTON */}
            <div className="pt-2">
              <Link
                to={PAGE_PATHS.contact}
                onClick={() => navigateTo && navigateTo('contact')}
                className="inline-flex items-center gap-2.5 px-7 py-3 bg-emerald-600 hover:bg-slate-950 text-white rounded-full font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-md hover:scale-105 active:scale-95"
              >
                <span>Start Your Project With Us</span>
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
