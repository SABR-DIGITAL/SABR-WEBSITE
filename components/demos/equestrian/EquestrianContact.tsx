import React, { useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import EquestrianNav from './EquestrianNav';
import EquestrianFooter from './EquestrianFooter';
import { Reveal, SectionLabel } from './EquestrianUI';
import { academy, openingHours } from './equestrianData';

// Minimalist, Warm Contact Page:
// No "Send us a message" box — only Telephone, Email, The Yard, Yard Hours, and Instagram & Facebook.
const EquestrianContact: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
  }, []);

  return (
    <div className="relative min-h-screen bg-[#FAF6EE] font-inter text-[#1E2822] selection:bg-[#2D5A43] selection:text-[#FAF6EE] overflow-x-hidden flex flex-col justify-between">
      <EquestrianNav />

      <main className="relative z-10 pt-24 sm:pt-32 md:pt-44 pb-16 sm:pb-24 md:pb-36 px-5 sm:px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto">
          {/* ── HEADER ─────────────────────────────────────────────────── */}
          <div className="max-w-3xl mb-10 sm:mb-16 md:mb-20">
            <Reveal>
              <SectionLabel className="mb-4 sm:mb-5">Contact</SectionLabel>
              <h1 className="font-serif text-[clamp(2.2rem,5.8vw,4.8rem)] leading-[1.04] tracking-[-0.02em] mb-5 sm:mb-6">
                Ring the yard.
                <br />
                <span className="italic text-[#2D5A43]">Somebody answers.</span>
              </h1>
              <p className="text-[15px] sm:text-[16px] md:text-[17px] text-[#5F665E] leading-[1.8] sm:leading-[1.85] max-w-xl">
                The telephone sits in the tack room rather than an office, so you speak directly with a coach.
              </p>
            </Reveal>
          </div>

          {/* ── FIVE ESSENTIAL CHANNELS ONLY (WARM, UNBOXED) ────────────── */}
          <div className="space-y-4 sm:space-y-6">
            {/* 01 · TELEPHONE */}
            <Reveal>
              <a
                href={`tel:${academy.phoneHref}`}
                className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-6 sm:py-8 px-6 sm:px-7 md:px-10 rounded-3xl bg-white/75 backdrop-blur-[2px] hover:bg-white items-center transition-all duration-300 shadow-[0_12px_35px_-24px_rgba(30,40,34,0.16)]"
              >
                <div className="md:col-span-4 flex items-center gap-3.5 sm:gap-4">
                  <span className="w-10 h-10 rounded-full bg-[#E8F0EB] text-[#2D5A43] font-serif text-sm flex items-center justify-center shrink-0">
                    01
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.32em] text-[#2D5A43] font-medium">
                    Telephone
                  </span>
                </div>
                <div className="md:col-span-6">
                  <span className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#1E2822] group-hover:text-[#2D5A43] transition-colors">
                    {academy.phoneDisplay}
                  </span>
                </div>
                <div className="md:col-span-2 flex md:justify-end">
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#E8F0EB] text-[#2D5A43] group-hover:bg-[#2D5A43] group-hover:text-[#FAF6EE] text-[10px] uppercase tracking-[0.26em] transition-colors">
                    <span>Call Yard</span>
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              </a>
            </Reveal>

            {/* 02 · EMAIL */}
            <Reveal delay={0.05}>
              <a
                href={`mailto:${academy.email}`}
                className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-6 sm:py-8 px-6 sm:px-7 md:px-10 rounded-3xl bg-white/75 backdrop-blur-[2px] hover:bg-white items-center transition-all duration-300 shadow-[0_12px_35px_-24px_rgba(30,40,34,0.16)]"
              >
                <div className="md:col-span-4 flex items-center gap-3.5 sm:gap-4">
                  <span className="w-10 h-10 rounded-full bg-[#E8F0EB] text-[#2D5A43] font-serif text-sm flex items-center justify-center shrink-0">
                    02
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.32em] text-[#2D5A43] font-medium">
                    Email
                  </span>
                </div>
                <div className="md:col-span-6">
                  <span className="font-serif text-lg sm:text-2xl md:text-3xl text-[#1E2822] group-hover:text-[#2D5A43] transition-colors break-all">
                    {academy.email}
                  </span>
                </div>
                <div className="md:col-span-2 flex md:justify-end">
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#E8F0EB] text-[#2D5A43] group-hover:bg-[#2D5A43] group-hover:text-[#FAF6EE] text-[10px] uppercase tracking-[0.26em] transition-colors">
                    <span>Email</span>
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              </a>
            </Reveal>

            {/* 03 · THE YARD */}
            <Reveal delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-6 sm:py-8 px-6 sm:px-7 md:px-10 rounded-3xl bg-white/75 backdrop-blur-[2px] items-center shadow-[0_12px_35px_-24px_rgba(30,40,34,0.16)]">
                <div className="md:col-span-4 flex items-center gap-3.5 sm:gap-4">
                  <span className="w-10 h-10 rounded-full bg-[#E8F0EB] text-[#2D5A43] font-serif text-sm flex items-center justify-center shrink-0">
                    03
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.32em] text-[#2D5A43] font-medium">
                    The Yard
                  </span>
                </div>
                <div className="md:col-span-8">
                  <address className="not-italic font-serif text-xl sm:text-2xl md:text-3xl text-[#1E2822] leading-snug">
                    {academy.addressLine1}
                    <br />
                    {academy.addressLine2}, {academy.postcode}
                  </address>
                </div>
              </div>
            </Reveal>

            {/* 04 · YARD HOURS */}
            <Reveal delay={0.15}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-6 sm:py-8 px-6 sm:px-7 md:px-10 rounded-3xl bg-white/75 backdrop-blur-[2px] items-start shadow-[0_12px_35px_-24px_rgba(30,40,34,0.16)]">
                <div className="md:col-span-4 flex items-center gap-3.5 sm:gap-4">
                  <span className="w-10 h-10 rounded-full bg-[#E8F0EB] text-[#2D5A43] font-serif text-sm flex items-center justify-center shrink-0">
                    04
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.32em] text-[#2D5A43] font-medium">
                    Yard Hours
                  </span>
                </div>
                <div className="md:col-span-6">
                  <ul className="space-y-3">
                    {openingHours.map((row) => (
                      <li
                        key={row.days}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 text-[14px] sm:text-[15px]"
                      >
                        <span className="font-serif text-lg sm:text-xl text-[#1E2822]">{row.days}</span>
                        <span className="text-[#5F665E]">{row.hours}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            {/* 05 · INSTAGRAM & FACEBOOK */}
            <Reveal delay={0.2}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-6 sm:py-8 px-6 sm:px-7 md:px-10 rounded-3xl bg-white/75 backdrop-blur-[2px] items-center shadow-[0_12px_35px_-24px_rgba(30,40,34,0.16)]">
                <div className="md:col-span-4 flex items-center gap-3.5 sm:gap-4">
                  <span className="w-10 h-10 rounded-full bg-[#E8F0EB] text-[#2D5A43] font-serif text-sm flex items-center justify-center shrink-0">
                    05
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.32em] text-[#2D5A43] font-medium">
                    Instagram &amp; Facebook
                  </span>
                </div>
                <div className="md:col-span-8 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-6">
                  <a
                    href={academy.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-between sm:justify-start gap-3 px-5 sm:px-6 py-3.5 rounded-full bg-[#E8F0EB] text-[#2D5A43] hover:bg-[#2D5A43] hover:text-[#FAF6EE] transition-colors"
                  >
                    <span className="font-serif text-lg sm:text-xl">Instagram ({academy.instagramHandle})</span>
                    <ArrowUpRight size={16} className="shrink-0" />
                  </a>
                  <a
                    href={academy.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-between sm:justify-start gap-3 px-5 sm:px-6 py-3.5 rounded-full bg-[#E8F0EB] text-[#2D5A43] hover:bg-[#2D5A43] hover:text-[#FAF6EE] transition-colors"
                  >
                    <span className="font-serif text-lg sm:text-xl">Facebook</span>
                    <ArrowUpRight size={16} className="shrink-0" />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </main>

      <EquestrianFooter />
    </div>
  );
};

export default EquestrianContact;
