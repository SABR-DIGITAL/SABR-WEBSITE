import React, { useEffect, useRef } from 'react';
import * as RouterDOM from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

gsap.registerPlugin(ScrollTrigger);

const Link = (RouterDOM as any).Link || (RouterDOM as any).default?.Link;

export const About: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
      gsap.utils.toArray<HTMLElement>('.lux-glide').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              once: true,
            },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const principles = [
    {
      num: '01',
      title: 'Design & Build Under One Roof',
      desc: 'One accountable practice guides your survey, 3D concept drawings, stonework, planting, and lighting without third-party friction.',
    },
    {
      num: '02',
      title: 'Permanent In-House Craftsmen',
      desc: 'Our employed teams of qualified stonemasons, horticulturists, and site foremen construct your garden with quiet precision.',
    },
    {
      num: '03',
      title: 'RHS & BALI Medal Standards',
      desc: 'Multiple RHS Chelsea Flower Show Gold Medals and BALI Principal Awards reflect the enduring quality of our finishing.',
    },
    {
      num: '04',
      title: 'Responsible Materiality',
      desc: 'We partner with ethical stone quarries, FSC timber mills, and peat-free nurseries while recycling site materials responsibly.',
    },
  ];

  const leadership = [
    {
      name: 'David Henderson',
      role: 'Founder & Managing Director',
      experience: '28+ Years in Landscape Architecture',
      bio: 'Founded the practice in 1998 to unite creative garden design with rigorous civil and stone construction under one roof. Oversees every residential estate commission.',
    },
    {
      name: 'Claire Sutton (RHS)',
      role: 'Head of Garden Design & Horticulture',
      experience: 'RHS Chelsea Gold Medalist',
      bio: 'Leads our spatial design studio and curated planting schemes, pairing architectural evergreen structure with naturalistic multi-seasonal borders.',
    },
    {
      name: 'James Bailey',
      role: 'Construction & Contracts Director',
      experience: '20 Years Site Leadership',
      bio: 'Directs our permanent in-house teams of stonemasons, joiners, and landscape engineers, ensuring every terrace, water feature, and pergola exceeds British Standards.',
    },
  ];

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-[#FAF9F5] text-[#1C211D] font-sans selection:bg-[#5B6450] selection:text-white overflow-x-hidden"
    >
      <Navbar />

      {/* MINIMALIST EDITORIAL HEADER */}
      <section className="pt-24 sm:pt-36 md:pt-48 pb-12 sm:pb-24 md:pb-32 px-5 sm:px-10 md:px-14 lg:px-24 border-b border-[#E4E0D7]">
        <div className="max-w-5xl mx-auto space-y-5 sm:space-y-8 lux-glide">
          <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.34em] sm:tracking-[0.38em] text-[#5B6450]">
            Established 1998 · Practice &amp; Heritage
          </span>
          <h1 className="font-cormorant text-4xl sm:text-6xl md:text-7xl font-light text-[#1C211D] tracking-tight leading-[1.06]">
            Twenty-eight years of{' '}
            <span className="italic text-[#5B6450]">enduring landscapes.</span>
          </h1>
          <p className="text-[#5A5953] text-sm sm:text-base md:text-lg font-light leading-[1.8] sm:leading-[1.9] max-w-2xl">
            Formed in 1998, Oak &amp; Ash specialises in the architectural design and construction of private domestic gardens across Wiltshire, Surrey, and London.
          </p>
        </div>
      </section>

      {/* STORY & UNBOXED FIGURES */}
      <section className="py-16 sm:py-28 md:py-40 px-5 sm:px-10 md:px-14 lg:px-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-16 lg:gap-24 items-center">
          <div className="lux-glide lg:col-span-6 space-y-5 sm:space-y-8">
            <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.34em] sm:tracking-[0.36em] text-[#5B6450]">
              Our Philosophy
            </span>
            <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-light text-[#1C211D] leading-[1.15]">
              Well-designed and constructed gardens, executed to the smallest detail.
            </h2>
            <p className="text-[#5A5953] text-sm sm:text-base font-light leading-[1.8] sm:leading-[1.9]">
              Over nearly three decades, our studio has earned a reputation for delivering finely crafted outdoor spaces completed on schedule and within budget. Whether designing from a blank canvas in-house or building alongside independent landscape architects, our focus on structural integrity and botanical depth never wavers.
            </p>

            {/* Open Hairline Figures — Zero Boxes */}
            <div className="pt-5 sm:pt-8 border-t border-[#D8D4CA] grid grid-cols-3 gap-4 sm:gap-8">
              <div>
                <div className="font-cormorant text-3xl sm:text-5xl font-light text-[#1C211D] tabular-nums">
                  28+
                </div>
                <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.26em] text-[#7A7972] mt-1.5 sm:mt-2">
                  Years Est.
                </div>
              </div>
              <div>
                <div className="font-cormorant text-3xl sm:text-5xl font-light text-[#1C211D] tabular-nums">
                  22
                </div>
                <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.26em] text-[#7A7972] mt-1.5 sm:mt-2">
                  RHS &amp; BALI
                </div>
              </div>
              <div>
                <div className="font-cormorant text-3xl sm:text-5xl font-light text-[#1C211D] tabular-nums">
                  100%
                </div>
                <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.26em] text-[#7A7972] mt-1.5 sm:mt-2">
                  In-House
                </div>
              </div>
            </div>
          </div>

          {/* Pure Unbadged Image */}
          <div className="lux-glide lg:col-span-6">
            <div className="overflow-hidden aspect-[4/3] bg-[#E5E2D9]">
              <img
                src="https://dmhdaawgg48dl.cloudfront.net/wp-content/uploads/2024/12/corten-steel-pavilion-stone-path-salvia-woodland-960x960.jpg"
                alt="RHS Chelsea Gold Medal show garden"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* THE FOUR PILLARS — OPEN UNBOXED COLUMNS */}
      <section className="py-16 sm:py-28 md:py-36 px-5 sm:px-10 md:px-14 lg:px-24 bg-[#F3F1EB] border-y border-[#E4E0D7]">
        <div className="max-w-7xl mx-auto">
          <div className="lux-glide mb-10 sm:mb-20 space-y-2 sm:space-y-3">
            <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.34em] sm:tracking-[0.36em] text-[#5B6450]">
              Practice Standards
            </span>
            <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-light text-[#1C211D]">
              The Four Pillars of Every Commission
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
            {principles.map((p) => (
              <div
                key={p.num}
                className="lux-glide pt-5 sm:pt-7 border-t border-[#CFCBC0] space-y-3 sm:space-y-4"
              >
                <span className="font-cormorant italic text-2xl text-[#5B6450] block">
                  {p.num}
                </span>
                <h3 className="font-cormorant text-2xl font-normal text-[#1C211D]">
                  {p.title}
                </h3>
                <p className="text-[#5A5953] text-sm font-light leading-[1.85]">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STUDIO LEADERSHIP — OPEN UNBOXED COLUMNS */}
      <section className="py-16 sm:py-28 md:py-40 px-5 sm:px-10 md:px-14 lg:px-24 max-w-7xl mx-auto">
        <div className="lux-glide flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-20 gap-5 sm:gap-8">
          <div className="space-y-2 sm:space-y-3">
            <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.34em] sm:tracking-[0.36em] text-[#5B6450]">
              Studio Leadership
            </span>
            <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-light text-[#1C211D]">
              The Specialists Behind Your Garden
            </h2>
          </div>
          <Link
            to="/demo/landscaping/contact"
            className="inline-flex items-center gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.28em] sm:tracking-[0.3em] text-[#1C211D] hover:text-[#5B6450] pb-2 border-b border-[#1C211D] hover:border-[#5B6450] transition-colors w-fit"
          >
            <span>Arrange a Studio Meeting</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-14">
          {leadership.map((member, idx) => (
            <div
              key={member.name}
              className="lux-glide pt-5 sm:pt-8 border-t border-[#D8D4CA] space-y-3 sm:space-y-4"
            >
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.28em] sm:tracking-[0.3em] text-[#5B6450] block">
                0{idx + 1} &nbsp;·&nbsp; {member.experience}
              </span>
              <h3 className="font-cormorant text-2xl sm:text-3xl font-normal text-[#1C211D]">
                {member.name}
              </h3>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#7A7972]">
                {member.role}
              </p>
              <p className="text-[#5A5953] text-sm font-light leading-[1.85] pt-1 sm:pt-2">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;