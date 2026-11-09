import React, { useEffect, useState } from 'react';
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { ArrowUpRight, Minus, Phone, Plus } from 'lucide-react';
import EquestrianNav from './EquestrianNav';
import EquestrianFooter from './EquestrianFooter';
import { Reveal, SectionLabel } from './EquestrianUI';
import { academy, faqs } from './equestrianData';

const categories = [
  {
    id: 'First Visits & Attire',
    num: '01',
    title: 'First Visits & Attire',
    note: 'Choosing the right initial session, what to wear, and arriving at the yard.'
  },
  {
    id: 'The Horses & Coaching',
    num: '02',
    title: 'The Horses & Coaching',
    note: 'How we match riders to horses, welfare guidelines, and bringing your own horse.'
  },
  {
    id: 'Yard Protocol & Weather',
    num: '03',
    title: 'Yard Protocol & Weather',
    note: 'All-weather indoor schooling, viewing gallery access, and estate etiquette.'
  }
];

const EquestrianFaqs: React.FC = () => {
  const [openKey, setOpenKey] = useState<string | null>(faqs[0]?.q || null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
  }, []);

  let globalCounter = 0;

  return (
    <div className="relative min-h-screen bg-[#FAF6EE] font-inter text-[#1E2822] selection:bg-[#2D5A43] selection:text-[#FAF6EE]">
      <EquestrianNav />

      {/* ── WARM EDITORIAL HEADER ────────────────────────────────────────── */}
      <section className="relative z-10 pt-24 sm:pt-32 md:pt-40 pb-12 sm:pb-16 md:pb-24 px-5 sm:px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto">
          <Reveal>
            <SectionLabel className="mb-4 sm:mb-5">Frequently Asked Questions</SectionLabel>
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-end">
            <div className="lg:col-span-8">
              <Reveal delay={0.05}>
                <h1 className="font-serif text-[clamp(2.2rem,5.8vw,4.8rem)] leading-[1.04] tracking-[-0.02em]">
                  Everything people
                  <br />
                  <span className="italic text-[#2D5A43]">ring up to ask.</span>
                </h1>
              </Reveal>
            </div>
            <div className="lg:col-span-4">
              <Reveal delay={0.12}>
                <p className="text-[15px] sm:text-[16px] text-[#5F665E] leading-[1.8] sm:leading-[1.85]">
                  Organized by first-visit preparation, horse matching, and yard protocol. If yours is not here, the phone is in the tack room.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── FORMULATED CATEGORIZED FAQ SECTIONS ──────────────────────────── */}
      <section className="relative z-10 px-5 sm:px-6 md:px-12 pb-16 sm:pb-24 md:pb-32">
        <div className="max-w-[1440px] mx-auto space-y-14 sm:space-y-20 md:space-y-24">
          {categories.map((cat) => {
            const catFaqs = faqs.filter((f) => f.category === cat.id);
            return (
              <div
                key={cat.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-16 items-start"
              >
                <div className="lg:col-span-4">
                  <Reveal>
                    <span className="inline-block px-3.5 py-1 rounded-full bg-[#E8F0EB] text-[#2D5A43] text-[10px] uppercase tracking-[0.28em] font-medium mb-3 sm:mb-4">
                      Section {cat.num}
                    </span>
                    <h2 className="font-serif text-2xl md:text-3xl text-[#1E2822] mb-2.5 sm:mb-3">
                      {cat.title}
                    </h2>
                    <p className="text-[14px] sm:text-[15px] text-[#5F665E] leading-[1.75] sm:leading-[1.8] max-w-sm">
                      {cat.note}
                    </p>
                  </Reveal>
                </div>

                <div className="lg:col-span-8 space-y-3">
                  {catFaqs.map((faq) => {
                    globalCounter += 1;
                    const indexNum = String(globalCounter).padStart(2, '0');
                    const isOpen = openKey === faq.q;
                    return (
                      <Reveal key={faq.q} delay={0.04}>
                        <div
                          className={`rounded-2xl transition-colors duration-300 px-5 sm:px-6 ${
                            isOpen ? 'bg-white shadow-[0_14px_35px_-24px_rgba(30,40,34,0.18)]' : 'bg-white/65 hover:bg-white/90'
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => setOpenKey(isOpen ? null : faq.q)}
                            aria-expanded={isOpen}
                            className="w-full py-5 sm:py-6 flex items-start justify-between gap-4 sm:gap-6 text-left group"
                          >
                            <div className="flex items-baseline gap-3 sm:gap-4">
                              <span className="font-serif text-sm text-[#2D5A43] tabular-nums shrink-0">
                                {indexNum}
                              </span>
                              <span className="font-serif text-lg sm:text-xl md:text-2xl text-[#1E2822] leading-snug group-hover:text-[#2D5A43] transition-colors">
                                {faq.q}
                              </span>
                            </div>
                            <span className="mt-1 w-8 h-8 rounded-full bg-[#E8F0EB] flex items-center justify-center shrink-0 text-[#2D5A43] transition-colors">
                              {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                            </span>
                          </button>

                          <div
                            className={`grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                              isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                            }`}
                          >
                            <div className="overflow-hidden">
                              <p className="pb-5 sm:pb-6 pl-0 md:pl-9 pr-2 sm:pr-4 md:pr-10 text-[14px] sm:text-[15px] md:text-[16px] text-[#5F665E] leading-[1.8] sm:leading-[1.85]">
                                {faq.a}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Direct Assistance Card */}
        <div className="max-w-[1440px] mx-auto mt-14 sm:mt-20">
          <Reveal>
            <div className="rounded-3xl bg-[#2D5A43] text-[#FAF6EE] p-7 sm:p-10 md:p-16 flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8">
              <div>
                <p className="text-[10px] uppercase tracking-[0.34em] text-[#CFE3D6] mb-3">
                  Personal Advice
                </p>
                <h3 className="font-serif text-2xl md:text-3xl leading-snug mb-2">
                  Still deciding which session or horse suits best?
                </h3>
                <p className="text-white/80 text-[14px] sm:text-[15px] leading-relaxed">
                  Speak with Rosie or Fen in the tack room, or request a callback when booking.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3.5 sm:gap-4 shrink-0">
                <Link
                  to="/demo/equestrian/book"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#FAF6EE] text-[#1E2822] text-[11px] uppercase tracking-[0.28em] font-medium hover:bg-white transition-colors"
                >
                  <span>Book a Lesson</span>
                  <ArrowUpRight size={15} />
                </Link>
                <a
                  href={`tel:${academy.phoneHref}`}
                  className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full border border-white/30 text-[#FAF6EE] text-[11px] uppercase tracking-[0.28em] hover:bg-white/10 transition-colors"
                >
                  <Phone size={14} />
                  <span>{academy.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <EquestrianFooter />
    </div>
  );
};

export default EquestrianFaqs;
