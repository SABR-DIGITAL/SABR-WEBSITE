import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import LuxuryNavbar from './LuxuryNavbar';
import LuxuryFooter from './LuxuryFooter';
import { markLuxuryInternalNav } from './LuxuryHome';
import LuxuryCountUp from './LuxuryCountUp';
import { OAK_ASH_BRAND } from '../landscaping/landscapingData';

export const LuxuryContact: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    postcode: '',
    service: 'Full Design & Build',
    budget: '£100,000 – £250,000',
    message: '',
  });

  useEffect(() => {
    markLuxuryInternalNav();
    window.scrollTo(0, 0);
    const root = pageRef.current;
    if (!root) return;
    const reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.prestige-contact-reveal',
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.15,
          stagger: 0.1,
          ease: 'power3.out',
        }
      );

      gsap.fromTo(
        '.prestige-stat-bar',
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 1.6,
          stagger: 0.18,
          ease: 'expo.out',
          delay: 0.25,
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-[#0C0A08] text-[#F4F1EA] font-sans overflow-x-hidden"
    >
      <LuxuryNavbar />

      <section className="pt-32 sm:pt-44 pb-20 sm:pb-32 px-5 sm:px-6 md:px-14">
        <div className="max-w-5xl mx-auto">
          <span className="prestige-contact-reveal block text-[10px] font-mono uppercase tracking-[0.45em] text-[#C8B88A] mb-6">
            PRIVATE COMMISSIONS · WILTSHIRE, SURREY &amp; LONDON
          </span>

          <h1 className="prestige-contact-reveal font-cinzel text-5xl sm:text-7xl md:text-8xl font-bold text-white uppercase leading-[0.98] mb-6">
            LET&rsquo;S <span className="font-cormorant italic font-normal text-[#C8B88A]">TALK.</span>
          </h1>

          <p className="prestige-contact-reveal text-white/65 text-base sm:text-lg font-light max-w-xl mb-12 leading-[1.85]">
            Tell us about your garden. Our Principal Director will arrange a private site consultation and prepare a fixed-fee architectural proposal.
          </p>

          {/* Animated Counting Studio Guarantees */}
          <div className="prestige-contact-reveal pt-8 pb-12 border-t border-[#C8B88A]/20 grid grid-cols-3 gap-6 sm:gap-10 max-w-2xl mb-8">
            <div>
              <div className="font-cinzel text-3xl sm:text-4xl font-bold text-[#C8B88A]">
                <LuxuryCountUp end={24} suffix="h" duration={1700} />
              </div>
              <div className="h-[1px] w-full bg-[#C8B88A]/15 my-2 overflow-hidden">
                <div className="prestige-stat-bar h-full w-full bg-[#C8B88A]" />
              </div>
              <div className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#F4F1EA]/55">
                Direct Response
              </div>
            </div>
            <div>
              <div className="font-cinzel text-3xl sm:text-4xl font-bold text-[#C8B88A]">
                <LuxuryCountUp end={28} suffix="+" duration={1900} />
              </div>
              <div className="h-[1px] w-full bg-[#C8B88A]/15 my-2 overflow-hidden">
                <div className="prestige-stat-bar h-full w-full bg-[#C8B88A]" />
              </div>
              <div className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#F4F1EA]/55">
                Years Est.
              </div>
            </div>
            <div>
              <div className="font-cinzel text-3xl sm:text-4xl font-bold text-[#C8B88A]">
                <LuxuryCountUp end={100} suffix="%" duration={2100} />
              </div>
              <div className="h-[1px] w-full bg-[#C8B88A]/15 my-2 overflow-hidden">
                <div className="prestige-stat-bar h-full w-full bg-[#C8B88A]" />
              </div>
              <div className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#F4F1EA]/55">
                Fixed-Fee Quotes
              </div>
            </div>
          </div>

          {/* Direct Luxury Rows */}
          <div className="prestige-contact-reveal border-t border-white/15 mb-20">
            <a
              href={`tel:${OAK_ASH_BRAND.phoneHref}`}
              className="group flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-white/15 transition-colors"
            >
              <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#C8B88A] mb-2 md:mb-0">
                <LuxuryCountUp end={1} padZero /> · DIRECT TELEPHONE
              </span>
              <span className="font-cinzel text-3xl sm:text-5xl text-white group-hover:text-[#C8B88A] transition-colors tabular-nums">
                {OAK_ASH_BRAND.phoneDisplay} ↗
              </span>
            </a>

            <a
              href={`mailto:${OAK_ASH_BRAND.email}`}
              className="group flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-white/15 transition-colors"
            >
              <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#C8B88A] mb-2 md:mb-0">
                <LuxuryCountUp end={2} padZero /> · PRIVATE DESK
              </span>
              <span className="font-cormorant italic text-2xl sm:text-4xl text-white group-hover:text-[#C8B88A] transition-colors break-all">
                {OAK_ASH_BRAND.email} ↗
              </span>
            </a>

            <div className="flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-white/15">
              <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#C8B88A] mb-2 md:mb-0">
                <LuxuryCountUp end={3} padZero /> · DESIGN STUDIO
              </span>
              <span className="font-cormorant text-2xl sm:text-4xl text-white">
                {OAK_ASH_BRAND.address}
              </span>
            </div>
          </div>

          {/* Commission Form */}
          <div className="prestige-contact-reveal border border-[#C8B88A]/30 bg-[#120F0B] p-7 sm:p-12">
            {submitted ? (
              <div className="py-10 space-y-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#C8B88A] block">
                  COMMISSION BRIEF RECEIVED
                </span>
                <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#F4F1EA] uppercase">
                  THANK YOU, {formData.name || 'FOR ENQUIRING'}.
                </h2>
                <p className="text-[#F4F1EA]/65 text-sm sm:text-base font-light max-w-lg leading-[1.85]">
                  Our Principal Designer will review your brief and contact you within one working day to arrange your private estate consultation.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-7 py-3.5 bg-[#C8B88A] text-[#0C0A08] text-xs font-bold uppercase tracking-[0.24em] cursor-pointer"
                >
                  SEND ANOTHER BRIEF
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#C8B88A] block">
                    WRITTEN BRIEF
                  </span>
                  <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-white uppercase">
                    REGISTER A PRIVATE COMMISSION
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-[0.28em] text-[#C8B88A] mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Lord / Lady / Mr / Ms..."
                      className="w-full bg-transparent border-b border-white/20 focus:border-[#C8B88A] py-3 text-white text-sm font-light focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-[0.28em] text-[#C8B88A] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@domain.co.uk"
                      className="w-full bg-transparent border-b border-white/20 focus:border-[#C8B88A] py-3 text-white text-sm font-light focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-[0.28em] text-[#C8B88A] mb-2">
                      Telephone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="07700 900 000"
                      className="w-full bg-transparent border-b border-white/20 focus:border-[#C8B88A] py-3 text-white text-sm font-light focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-[0.28em] text-[#C8B88A] mb-2">
                      Property Postcode / Area *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.postcode}
                      onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                      placeholder="e.g. SN8, SW3, GU28"
                      className="w-full bg-transparent border-b border-white/20 focus:border-[#C8B88A] py-3 text-white text-sm font-light focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-[0.28em] text-[#C8B88A] mb-2">
                      Commission Scope
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-[#120F0B] border-b border-white/20 focus:border-[#C8B88A] py-3 text-white text-sm font-light focus:outline-none"
                    >
                      <option value="Full Design & Build">Full Garden Design &amp; Build</option>
                      <option value="Build From Architect Plans">Construction from Existing Plans</option>
                      <option value="Soft Landscaping & Planting">Planting &amp; Soft Landscaping</option>
                      <option value="Garden Aftercare">Ongoing Estate &amp; Garden Aftercare</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-[0.28em] text-[#C8B88A] mb-2">
                      Indicative Investment
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-[#120F0B] border-b border-white/20 focus:border-[#C8B88A] py-3 text-white text-sm font-light focus:outline-none"
                    >
                      <option value="£50,000 – £100,000">£50,000 – £100,000</option>
                      <option value="£100,000 – £250,000">£100,000 – £250,000</option>
                      <option value="£250,000+">£250,000+ (Country Estate)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-[0.28em] text-[#C8B88A] mb-2">
                    About Your Estate / Garden
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly describe your plot, architectural style, or desired timeframe..."
                    className="w-full bg-transparent border-b border-white/20 focus:border-[#C8B88A] py-3 text-white text-sm font-light focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-8 py-4 bg-[#C8B88A] hover:bg-[#D8CBA3] text-[#0C0A08] font-bold text-xs uppercase tracking-[0.26em] transition-all cursor-pointer"
                >
                  SUBMIT COMMISSION BRIEF →
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <LuxuryFooter />
    </div>
  );
};

export default LuxuryContact;
