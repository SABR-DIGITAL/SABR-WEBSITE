import React, { useEffect, useRef } from 'react';
import * as RouterDOM from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import LuxuryNavbar from './LuxuryNavbar';
import LuxuryFooter from './LuxuryFooter';
import { markLuxuryInternalNav } from './LuxuryHome';
import LuxuryCountUp from './LuxuryCountUp';
import { PRINCIPLES, LEADERSHIP } from '../landscaping/landscapingData';

gsap.registerPlugin(ScrollTrigger);
const Link = (RouterDOM as any).Link || (RouterDOM as any).default?.Link;

export const LuxuryAbout: React.FC = () => {
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
          { y: 44, opacity: 0 },
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
            stagger: 0.16,
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
        <div className="max-w-6xl mx-auto space-y-6 prestige-glide">
          <span className="block text-[10px] font-mono uppercase tracking-[0.45em] text-[#C8B88A]">
            ESTABLISHED <LuxuryCountUp end={1998} duration={1600} /> · PRACTICE &amp; HERITAGE
          </span>
          <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-bold text-[#F4F1EA] uppercase leading-[1.06]">
            TWENTY-EIGHT YEARS OF <br />
            <span className="font-cormorant italic font-normal text-[#C8B88A]">
              ENDURING LANDSCAPES.
            </span>
          </h1>
          <p className="text-[#F4F1EA]/65 text-sm sm:text-base md:text-lg font-light leading-[1.85] max-w-2xl">
            Formed in 1998, Oak &amp; Ash specialises in the architectural design and construction of private domestic gardens across Wiltshire, Surrey, and London.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-32 px-5 sm:px-6 md:px-14 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 lg:gap-24 items-center">
          <div className="prestige-glide lg:col-span-6 space-y-6">
            <span className="block text-[10px] font-mono uppercase tracking-[0.38em] text-[#C8B88A]">
              OUR PHILOSOPHY
            </span>
            <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-[#F4F1EA] uppercase leading-tight">
              WELL-DESIGNED AND CONSTRUCTED GARDENS, EXECUTED TO THE SMALLEST DETAIL.
            </h2>
            <p className="text-[#F4F1EA]/65 text-sm sm:text-base font-light leading-[1.85]">
              Over nearly three decades, our studio has earned a reputation for delivering finely crafted outdoor spaces completed on schedule and within budget. Whether designing from a blank canvas in-house or building alongside independent landscape architects, our focus on structural integrity and botanical depth never wavers.
            </p>

            {/* ANIMATED COUNTING STATS (Screenshot 1) */}
            <div className="prestige-stat-group pt-8 border-t border-[#C8B88A]/20 grid grid-cols-3 gap-6">
              <div className="prestige-stat-item">
                <div className="font-cinzel text-3xl sm:text-5xl font-bold text-[#C8B88A] tabular-nums">
                  <LuxuryCountUp end={28} suffix="+" duration={1900} />
                </div>
                <div className="h-[1px] w-full bg-[#C8B88A]/15 my-2.5 overflow-hidden">
                  <div className="prestige-stat-bar h-full w-full bg-[#C8B88A]" />
                </div>
                <div className="text-[10px] font-mono uppercase tracking-[0.26em] text-[#F4F1EA]/55">
                  Years Est.
                </div>
              </div>
              <div className="prestige-stat-item">
                <div className="font-cinzel text-3xl sm:text-5xl font-bold text-[#C8B88A] tabular-nums">
                  <LuxuryCountUp end={22} duration={2000} />
                </div>
                <div className="h-[1px] w-full bg-[#C8B88A]/15 my-2.5 overflow-hidden">
                  <div className="prestige-stat-bar h-full w-full bg-[#C8B88A]" />
                </div>
                <div className="text-[10px] font-mono uppercase tracking-[0.26em] text-[#F4F1EA]/55">
                  RHS &amp; BALI
                </div>
              </div>
              <div className="prestige-stat-item">
                <div className="font-cinzel text-3xl sm:text-5xl font-bold text-[#C8B88A] tabular-nums">
                  <LuxuryCountUp end={100} suffix="%" duration={2100} />
                </div>
                <div className="h-[1px] w-full bg-[#C8B88A]/15 my-2.5 overflow-hidden">
                  <div className="prestige-stat-bar h-full w-full bg-[#C8B88A]" />
                </div>
                <div className="text-[10px] font-mono uppercase tracking-[0.26em] text-[#F4F1EA]/55">
                  In-House
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="prestige-curtain overflow-hidden aspect-[4/3] bg-[#16130E] border border-[#C8B88A]/25">
              <img
                src="https://dmhdaawgg48dl.cloudfront.net/wp-content/uploads/2024/12/corten-steel-pavilion-stone-path-salvia-woodland-960x960.jpg"
                alt="RHS Chelsea Gold Medal show garden"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-32 px-5 sm:px-6 md:px-14 bg-[#110E0B] border-y border-[#C8B88A]/15">
        <div className="max-w-6xl mx-auto">
          <div className="prestige-glide mb-16 space-y-3">
            <span className="block text-[10px] font-mono uppercase tracking-[0.38em] text-[#C8B88A]">
              PRACTICE STANDARDS
            </span>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#F4F1EA] uppercase">
              THE FOUR PILLARS OF EVERY COMMISSION
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRINCIPLES.map((p, idx) => (
              <div
                key={p.num}
                className="prestige-glide pt-6 border-t border-[#C8B88A]/35 space-y-4"
              >
                <span className="font-mono text-xs text-[#C8B88A] block">
                  <LuxuryCountUp end={idx + 1} padZero duration={1400 + idx * 180} />
                </span>
                <h3 className="font-cinzel text-xl font-bold text-[#F4F1EA] uppercase">
                  {p.title}
                </h3>
                <p className="text-[#F4F1EA]/60 text-sm font-light leading-[1.85]">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-32 px-5 sm:px-6 md:px-14 max-w-6xl mx-auto">
        <div className="prestige-glide flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <span className="block text-[10px] font-mono uppercase tracking-[0.38em] text-[#C8B88A]">
              STUDIO LEADERSHIP
            </span>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#F4F1EA] uppercase">
              THE SPECIALISTS BEHIND YOUR GARDEN
            </h2>
          </div>
          <Link
            to="/demo/landscaping-luxury/contact"
            className="inline-flex items-center gap-3 px-7 py-3.5 bg-[#C8B88A] hover:bg-[#D8CBA3] text-[#0C0A08] font-bold text-xs uppercase tracking-[0.24em] transition-all w-fit"
          >
            <span>ARRANGE STUDIO MEETING</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {LEADERSHIP.map((member, idx) => {
            const yearsMatch = /(\d+)/.exec(member.experience);
            const yearsVal = yearsMatch ? Number(yearsMatch[1]) : 20;
            return (
              <div
                key={member.name}
                className="prestige-glide pt-6 border-t border-[#C8B88A]/20 space-y-3"
              >
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C8B88A] block">
                  <LuxuryCountUp end={idx + 1} padZero /> · <LuxuryCountUp end={yearsVal} duration={1800} /> Years Experience
                </span>
                <h3 className="font-cinzel text-2xl font-bold text-[#F4F1EA] uppercase">
                  {member.name}
                </h3>
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#D8CBA3]">
                  {member.role}
                </p>
                <p className="text-[#F4F1EA]/60 text-sm font-light leading-[1.85] pt-2">
                  {member.bio}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <LuxuryFooter />
    </div>
  );
};

export default LuxuryAbout;
