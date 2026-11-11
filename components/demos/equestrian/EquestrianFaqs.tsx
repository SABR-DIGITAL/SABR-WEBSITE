import React, { useEffect, useState } from 'react';
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { ArrowUpRight, Check, Minus, Phone, Plus, ShieldCheck } from 'lucide-react';
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

const BOOT_ROOM_ITEMS = [
  {
    badge: 'Borrowed Free at the Yard',
    title: 'Hats, Boots & Body Protectors',
    items: [
      'Current PAS 015 / VG1 riding hats fitted by Fen',
      'Smooth-soled jodhpur boots with a proper heel',
      'BETA Level 3 body protectors for jumping & children'
    ]
  },
  {
    badge: 'Wear From Home',
    title: 'Comfortable Riding Layers',
    items: [
      'Breeches, jodhpurs, or thick leggings without an inner seam',
      'A collared shirt, sweatshirt, or close-fitting jumper',
      'Long socks & light riding or gardening gloves'
    ]
  },
  {
    badge: 'For Spectators & Family',
    title: 'In the Viewing Gallery',
    items: [
      'Heated indoor gallery looking straight into the school',
      'Fresh bean-to-cup coffee, Yorkshire tea & biscuits',
      'Country boots recommended if walking out to the paddocks'
    ]
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

      {/* ── WARM RIDER HANDBOOK HEADER + BOOT ROOM KIT CHECKLIST ───────────── */}
      <section className="relative z-10 pt-24 sm:pt-32 md:pt-36 pb-10 sm:pb-14 px-4 sm:px-6 md:px-12 border-b border-[#2D5A43]/12">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <SectionLabel className="mb-3.5 sm:mb-4">Rider Handbook &amp; FAQs</SectionLabel>
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-end mb-8 sm:mb-12">
            <div className="lg:col-span-8">
              <Reveal delay={0.05}>
                <h1 className="font-serif text-[clamp(2.05rem,5.2vw,4.3rem)] leading-[1.04] tracking-[-0.02em] text-[#1E2822]">
                  Everything people
                  <br />
                  <span className="italic text-[#2D5A43]">ring the tack room to ask.</span>
                </h1>
              </Reveal>
            </div>
            <div className="lg:col-span-4">
              <Reveal delay={0.12}>
                <p className="text-[14px] sm:text-[16px] text-[#5F665E] leading-[1.75]">
                  Organized by first-visit preparation, horse matching, and yard protocol. If yours is not here, the telephone sits in the tack room.
                </p>
              </Reveal>
            </div>
          </div>

          {/* ── NON-GENERIC FEATURE: THE BOOT ROOM & FIRST-VISIT KIT GUIDE ── */}
          <Reveal delay={0.16}>
            <div className="rounded-3xl bg-[#F3EDE0] border border-[#2D5A43]/12 p-5 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-full bg-[#2D5A43] text-[#FAF6EE] flex items-center justify-center shrink-0">
                    <ShieldCheck size={15} />
                  </span>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.22em] text-[#2D5A43] font-medium">
                      The Tack Room Boot Library
                    </p>
                    <h2 className="font-serif text-lg sm:text-xl text-[#1E2822]">
                      What to wear for your first lesson (no need to buy kit beforehand)
                    </h2>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                {BOOT_ROOM_ITEMS.map((col) => (
                  <div
                    key={col.title}
                    className="rounded-2xl bg-[#FAF6EE] p-4 sm:p-5 border border-[#2D5A43]/10"
                  >
                    <span className="inline-block text-[10px] uppercase tracking-[0.18em] text-[#2D5A43] font-semibold mb-1">
                      {col.badge}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl text-[#1E2822] mb-3">
                      {col.title}
                    </h3>
                    <ul className="space-y-2">
                      {col.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-[13px] sm:text-[14px] text-[#454D46] leading-snug"
                        >
                          <span className="w-4 h-4 rounded-full bg-[#E8F0EB] text-[#2D5A43] flex items-center justify-center shrink-0 mt-0.5">
                            <Check size={10} />
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CATEGORIZED WARM COUNTRY ACCORDION SECTIONS ──────────────────── */}
      <section className="relative z-10 px-4 sm:px-6 md:px-12 py-12 sm:py-18 md:py-24">
        <div className="max-w-[1400px] mx-auto space-y-10 sm:space-y-16">
          {categories.map((cat) => {
            const catFaqs = faqs.filter((f) => f.category === cat.id);
            return (
              <div
                key={cat.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-14 items-start pt-6 border-t border-[#2D5A43]/12 first:border-t-0 first:pt-0"
              >
                <div className="lg:col-span-4">
                  <Reveal>
                    <span className="inline-block text-[10px] uppercase tracking-[0.24em] text-[#2D5A43] font-medium mb-2">
                      Chapter {cat.num}
                    </span>
                    <h2 className="font-serif text-2xl md:text-3xl text-[#1E2822] mb-2">
                      {cat.title}
                    </h2>
                    <p className="text-[13px] sm:text-[15px] text-[#5F665E] leading-[1.7] max-w-sm">
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
                          className={`rounded-2xl transition-colors duration-300 px-4 sm:px-6 border ${
                            isOpen
                              ? 'bg-[#F3EDE0] text-[#1E2822] border-[#2D5A43]/25 shadow-sm'
                              : 'bg-white hover:bg-white/95 text-[#1E2822] border-[#2D5A43]/10'
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => setOpenKey(isOpen ? null : faq.q)}
                            aria-expanded={isOpen}
                            className="w-full py-4 sm:py-5 flex items-start justify-between gap-3 sm:gap-5 text-left group cursor-pointer"
                          >
                            <div className="flex items-baseline gap-3 sm:gap-4 min-w-0">
                              <span className="font-serif text-xs sm:text-sm tabular-nums shrink-0 text-[#2D5A43]">
                                {indexNum}
                              </span>
                              <span className="font-serif text-base sm:text-xl md:text-2xl leading-snug text-[#1E2822] group-hover:text-[#2D5A43] transition-colors">
                                {faq.q}
                              </span>
                            </div>
                            <span
                              className={`mt-0.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                                isOpen
                                  ? 'bg-[#2D5A43] text-[#FAF6EE]'
                                  : 'bg-[#E8F0EB] text-[#2D5A43]'
                              }`}
                            >
                              {isOpen ? <Minus size={13} /> : <Plus size={13} />}
                            </span>
                          </button>

                          <div
                            className={`grid transition-all duration-300 ease-out ${
                              isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                            }`}
                          >
                            <div className="overflow-hidden">
                              <p className="pb-4 sm:pb-5 pl-0 md:pl-8 pr-2 sm:pr-6 text-[13px] sm:text-[15px] leading-[1.75] text-[#454D46]">
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
        <div className="max-w-[1400px] mx-auto mt-12 sm:mt-16">
          <Reveal>
            <div className="rounded-3xl bg-[#E8F0EB] text-[#1E2822] border border-[#2D5A43]/15 p-6 sm:p-10 md:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#2D5A43] font-medium mb-2">
                  Personal Advice
                </p>
                <h3 className="font-serif text-2xl md:text-3xl leading-snug mb-1.5">
                  Still deciding which session or horse suits best?
                </h3>
                <p className="text-[#5F665E] text-[14px] sm:text-[15px] leading-relaxed">
                  Speak with Rosie or Fen in the tack room, or request a callback when booking.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 shrink-0">
                <Link
                  to="/demo/equestrian/book"
                  className="inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-full bg-[#2D5A43] text-[#FAF6EE] text-[11px] uppercase tracking-[0.22em] font-medium hover:bg-[#1E2822] transition-colors"
                >
                  <span>Book a Lesson</span>
                  <ArrowUpRight size={15} />
                </Link>
                <a
                  href={`tel:${academy.phoneHref}`}
                  className="inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-full bg-white text-[#2D5A43] text-[11px] uppercase tracking-[0.22em] font-medium hover:bg-[#FAF6EE] transition-colors"
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
