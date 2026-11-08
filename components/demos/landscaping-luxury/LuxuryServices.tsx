import React, { useEffect, useRef } from 'react';
import * as RouterDOM from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import LuxuryNavbar from './LuxuryNavbar';
import LuxuryFooter from './LuxuryFooter';
import { markLuxuryInternalNav } from './LuxuryHome';
import LuxuryCountUp from './LuxuryCountUp';
import { CORE_SERVICES } from '../landscaping/landscapingData';

gsap.registerPlugin(ScrollTrigger);
const Link = (RouterDOM as any).Link || (RouterDOM as any).default?.Link;

export const LuxuryServices: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    markLuxuryInternalNav();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;
    const reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.prestige-glide').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 48, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              once: true,
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>('.prestige-stat-group').forEach((group) => {
        const items = group.querySelectorAll('.prestige-stat-item');
        const bars = group.querySelectorAll('.prestige-stat-bar');

        gsap.fromTo(
          items,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: group,
              start: 'top 88%',
              once: true,
            },
          }
        );

        gsap.fromTo(
          bars,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 1.6,
            stagger: 0.18,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: group,
              start: 'top 88%',
              once: true,
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>('.prestige-curtain').forEach((wrap) => {
        const img = wrap.querySelector('img');
        gsap.fromTo(
          wrap,
          { clipPath: 'inset(12% 6% 12% 6%)', opacity: 0.2 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            duration: 1.45,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: wrap,
              start: 'top 88%',
              once: true,
            },
          }
        );
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.18 },
            {
              scale: 1,
              duration: 1.65,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: wrap,
                start: 'top 88%',
                once: true,
              },
            }
          );
        }
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-[#0C0A08] text-[#F4F1EA] font-sans overflow-x-hidden"
    >
      <LuxuryNavbar />

      <section className="pt-32 sm:pt-44 pb-16 sm:pb-28 px-5 sm:px-6 md:px-14 border-b border-[#C8B88A]/15">
        <div className="max-w-6xl mx-auto space-y-8 prestige-glide">
          <span className="block text-[10px] font-mono uppercase tracking-[0.45em] text-[#C8B88A]">
            DESIGN &amp; MASTER CONSTRUCTION
          </span>
          <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-bold text-[#F4F1EA] uppercase tracking-tight leading-[1.06]">
            EVERY DISCIPLINE, <br />
            <span className="font-cormorant italic font-normal text-[#C8B88A]">
              UNDER ONE ROOF.
            </span>
          </h1>
          <p className="text-[#F4F1EA]/65 text-sm sm:text-base md:text-lg font-light leading-[1.85] max-w-2xl">
            From initial spatial drawings through to structural stonework, planting, and seasonal stewardship, every stage is delivered by our permanent in-house specialists.
          </p>

          {/* Animated Counting Practice Metrics Strip */}
          <div className="prestige-stat-group pt-8 border-t border-[#C8B88A]/20 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-4xl">
            <div className="prestige-stat-item">
              <div className="font-cinzel text-3xl sm:text-4xl font-bold text-[#C8B88A]">
                <LuxuryCountUp end={4} padZero duration={1600} />
              </div>
              <div className="h-[1px] w-full bg-[#C8B88A]/15 my-2 overflow-hidden">
                <div className="prestige-stat-bar h-full w-full bg-[#C8B88A]" />
              </div>
              <div className="text-[10px] font-mono uppercase tracking-[0.26em] text-[#F4F1EA]/55">
                Core Disciplines
              </div>
            </div>
            <div className="prestige-stat-item">
              <div className="font-cinzel text-3xl sm:text-4xl font-bold text-[#C8B88A]">
                <LuxuryCountUp end={28} suffix="+" duration={1850} />
              </div>
              <div className="h-[1px] w-full bg-[#C8B88A]/15 my-2 overflow-hidden">
                <div className="prestige-stat-bar h-full w-full bg-[#C8B88A]" />
              </div>
              <div className="text-[10px] font-mono uppercase tracking-[0.26em] text-[#F4F1EA]/55">
                Years Est.
              </div>
            </div>
            <div className="prestige-stat-item">
              <div className="font-cinzel text-3xl sm:text-4xl font-bold text-[#C8B88A]">
                <LuxuryCountUp end={22} duration={2000} />
              </div>
              <div className="h-[1px] w-full bg-[#C8B88A]/15 my-2 overflow-hidden">
                <div className="prestige-stat-bar h-full w-full bg-[#C8B88A]" />
              </div>
              <div className="text-[10px] font-mono uppercase tracking-[0.26em] text-[#F4F1EA]/55">
                RHS &amp; BALI Awards
              </div>
            </div>
            <div className="prestige-stat-item">
              <div className="font-cinzel text-3xl sm:text-4xl font-bold text-[#C8B88A]">
                <LuxuryCountUp end={100} suffix="%" duration={2150} />
              </div>
              <div className="h-[1px] w-full bg-[#C8B88A]/15 my-2 overflow-hidden">
                <div className="prestige-stat-bar h-full w-full bg-[#C8B88A]" />
              </div>
              <div className="text-[10px] font-mono uppercase tracking-[0.26em] text-[#F4F1EA]/55">
                In-House Build
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-32 px-5 sm:px-6 md:px-14 max-w-6xl mx-auto space-y-24 sm:space-y-36">
        {CORE_SERVICES.map((service, idx) => (
          <div
            key={service.id}
            id={service.id}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-16 lg:gap-24 items-center"
          >
            <div className={`lg:col-span-6 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
              <div className="prestige-curtain overflow-hidden aspect-[4/3] bg-[#16130E] border border-[#C8B88A]/25">
                <img
                  src={service.img}
                  alt={service.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className={`prestige-glide lg:col-span-6 space-y-6 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
              <span className="block text-[10px] font-mono uppercase tracking-[0.38em] text-[#C8B88A]">
                <LuxuryCountUp end={idx + 1} padZero duration={1400} /> · {service.kicker}
              </span>
              <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-[#F4F1EA] uppercase leading-tight">
                {service.title}
              </h2>
              <p className="text-[#F4F1EA]/65 text-sm sm:text-base font-light leading-[1.85]">
                {service.prose}
              </p>

              <div className="border-t border-[#C8B88A]/20 pt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.deliverables.map((item) => (
                  <div
                    key={item}
                    className="text-xs font-mono text-[#D8CBA3]/85 py-1.5 border-b border-white/5"
                  >
                    · {item}
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  to="/demo/landscaping-luxury/contact"
                  className="inline-flex items-center gap-3 px-7 py-3.5 bg-[#C8B88A] hover:bg-[#D8CBA3] text-[#0C0A08] font-bold text-xs uppercase tracking-[0.24em] transition-all"
                >
                  <span>COMMISSION {service.kicker}</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>

      <LuxuryFooter />
    </div>
  );
};

export default LuxuryServices;
