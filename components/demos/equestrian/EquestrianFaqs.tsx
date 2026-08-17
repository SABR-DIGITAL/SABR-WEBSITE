import React, { useEffect, useState } from 'react';
// Fix react-router-dom missing exports
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { ArrowRight, Minus, Phone, Plus } from 'lucide-react';
import EquestrianNav from './EquestrianNav';
import EquestrianFooter from './EquestrianFooter';
import { Reveal, PhotoReveal, Bloom, Wash } from './EquestrianUI';
import { academy, faqs, images, cardWashes } from './equestrianData';

// The questions used to sit at the bottom of the price list, where nobody
// looking for a price wanted to scroll past them. They have their own page now.
const EquestrianFaqs: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFAF3] font-inter text-[#1E2A22] selection:bg-[#E4577A] selection:text-[#FFFAF3] overflow-x-hidden">
      <EquestrianNav />

      {/* ── HEADER ─────────────────────────────────────────────────────── */}
      <section className="relative pt-24 md:pt-28 pb-10 md:pb-14 px-6 md:px-10">
        <Wash />
        <div className="relative max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <p className="eq-rise flex items-center gap-3 text-[10px] uppercase tracking-[0.42em] text-[#6B7A6F] mb-6">
              <Bloom size={16} />
              FAQ&rsquo;s
            </p>
            <h1
              className="eq-rise font-serif text-[clamp(2.3rem,6.4vw,4.6rem)] leading-[1] tracking-[-0.02em]"
              style={{ animationDelay: '90ms' }}
            >
              Everything people
              <br />
              <span className="italic text-[#E4577A]">ring up to ask.</span>
            </h1>
          </div>
          <div className="lg:col-span-5">
            <p className="eq-rise text-lg text-[#4C5A50] leading-relaxed" style={{ animationDelay: '170ms' }}>
              Eight answers, straight. If yours is not here, the phone is in the tack room.
            </p>
          </div>
        </div>
      </section>

      {/* ── THE QUESTIONS ──────────────────────────────────────────────── */}
      <section className="px-6 md:px-10 pb-14 md:pb-20">
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left: one photograph and the telephone, so the page is not a wall
              of text on its own. */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <Reveal>
              <PhotoReveal
                src={images.children}
                alt="Two children walking towards a horse in the paddock"
                className="rounded-[2rem] h-[clamp(260px,42vh,420px)] mb-8"
              />
              <a
                href={`tel:${academy.phoneHref}`}
                className="group flex items-center gap-4 rounded-[1.5rem] border border-white/70 px-6 py-5 transition-transform duration-500 hover:-translate-y-0.5"
                style={{ background: cardWashes[0] }}
              >
                <span className="w-11 h-11 rounded-full bg-[#FFFCF7]/85 border border-white flex items-center justify-center text-[#2F7D5B] shrink-0">
                  <Phone size={17} />
                </span>
                <span>
                  <span className="block text-[9px] uppercase tracking-[0.3em] text-[#6B7A6F] mb-1.5">
                    Ring the yard
                  </span>
                  <span className="block font-serif text-xl group-hover:text-[#E4577A] transition-colors duration-300">
                    {academy.phoneDisplay}
                  </span>
                </span>
              </a>
            </Reveal>
          </div>

          {/* Right: the accordion. One open at a time, and the open row lifts
              onto a pale wash so you can see where you are. */}
          <div className="lg:col-span-8">
            <div className="border-t border-[#EADFD1]">
              {faqs.map((faq, i) => {
                const isOpen = open === i;
                return (
                  <Reveal key={faq.q} delay={Math.min(i, 6) * 0.05}>
                    <div
                      className="border-b border-[#EADFD1] transition-all duration-500 rounded-b-[1.25rem]"
                      style={isOpen ? { background: cardWashes[i % cardWashes.length] } : undefined}
                    >
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        className="w-full flex items-start justify-between gap-6 text-left py-6 px-0 md:px-6 group"
                      >
                        <span className="flex items-start gap-4">
                          <span className="font-serif text-[11px] text-[#6B7A6F] pt-2 tabular-nums">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="font-serif text-lg md:text-[1.4rem] leading-snug group-hover:text-[#E4577A] transition-colors duration-300">
                            {faq.q}
                          </span>
                        </span>
                        <span className="mt-1 w-9 h-9 rounded-full border border-[#EADFD1] bg-[#FFFCF7]/70 flex items-center justify-center shrink-0 text-[#2F7D5B] transition-transform duration-500 group-hover:rotate-90">
                          {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                        </span>
                      </button>
                      <div
                        className={`grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="pb-7 pl-0 md:pl-16 pr-6 md:pr-16 text-[15px] md:text-base text-[#4C5A50] leading-relaxed">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={0.08}>
              <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 rounded-[1.75rem] bg-[#1E2A22] text-[#FFFAF3] px-8 py-8">
                <div>
                  <h2 className="font-serif text-2xl md:text-[1.9rem] leading-tight mb-2">
                    Still not sure which lesson?
                  </h2>
                  <p className="text-white/60 text-[15px] leading-relaxed">
                    Tell us about the rider and we will pick both the lesson and the horse.
                  </p>
                </div>
                <Link
                  to="/demo/equestrian/book"
                  className="group inline-flex items-center gap-3 pl-7 pr-5 py-4 bg-[#FFFAF3] text-[#1E2A22] rounded-full text-[10px] uppercase tracking-[0.3em] hover:bg-[#E4577A] hover:text-[#FFFAF3] transition-colors duration-300 shrink-0"
                >
                  Book a lesson
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <EquestrianFooter />

      <style>{`
        @keyframes eq-rise {
          from { opacity: 0; transform: translate3d(0, 22px, 0); }
          to { opacity: 1; transform: none; }
        }
        .eq-rise { animation: eq-rise 0.85s cubic-bezier(0.22, 1, 0.36, 1) both; }
        @media (prefers-reduced-motion: reduce) { .eq-rise { animation: none; } }
      `}</style>
    </div>
  );
};

export default EquestrianFaqs;
