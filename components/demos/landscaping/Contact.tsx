import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './Navbar';
import Footer from './Footer';

gsap.registerPlugin(ScrollTrigger);

export const Contact: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    postcode: '',
    service: 'Full Design & Build',
    budget: '£50,000 – £100,000',
    message: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const root = pageRef.current;
    if (!root) return;
    const reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.lux-contact-reveal',
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.1,
          ease: 'power3.out',
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
      className="bg-[#FAF9F5] text-[#1C211D] min-h-screen font-sans selection:bg-[#5B6450] selection:text-white overflow-x-hidden"
    >
      <Navbar />

      {/* PRIMARY EDITORIAL CONTACT SECTION — MODELED AFTER SABR DIGITAL'S MINIMALIST CONTACT LAYOUT */}
      <section className="pt-24 pb-16 sm:pt-36 sm:pb-32 md:pt-44 md:pb-40 px-5 sm:px-10 md:px-14 lg:px-20">
        <div className="max-w-5xl mx-auto">
          {/* Kicker */}
          <div className="lux-contact-reveal flex items-center gap-3 mb-5 sm:mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5B6450]" />
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.32em] sm:tracking-[0.35em] text-[#5B6450]">
              Contact / Private Commissions
            </span>
          </div>

          {/* Large Editorial Display Heading */}
          <h1 className="lux-contact-reveal font-cormorant text-5xl sm:text-7xl md:text-8xl font-normal text-[#1C211D] leading-[0.98] tracking-tight mb-5 sm:mb-8">
            Let’s <span className="italic text-[#5B6450]">Talk.</span>
          </h1>

          {/* Concise Subcopy */}
          <p className="lux-contact-reveal text-sm sm:text-lg md:text-xl text-[#4A504B] font-light max-w-xl mb-10 sm:mb-20 leading-[1.75]">
            Tell us about your garden. We will come back with a clear plan, a complimentary site consultation, and a fixed-price build proposal.
          </p>

          {/* Three Full-Width Horizontal Hairline Rows (Zero Boxes — Matches Reference Image 11) */}
          <div className="lux-contact-reveal border-t border-[#D8D4CA]">
            {/* Row 1: Telephone */}
            <a
              href="tel:01672552140"
              className="group flex flex-col md:flex-row md:items-center justify-between py-6 sm:py-9 md:py-12 border-b border-[#D8D4CA] transition-colors"
            >
              <div className="flex items-center gap-3.5 sm:gap-4 mb-2 md:mb-0">
                <svg
                  className="w-4 h-4 text-[#5B6450] shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.4}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.26em] sm:tracking-[0.28em] text-[#848982]">
                  Telephone
                </span>
              </div>
              <div className="flex items-center justify-between md:justify-end gap-4 sm:gap-8">
                <span className="font-cormorant text-3xl sm:text-5xl md:text-6xl text-[#1C211D] group-hover:text-[#5B6450] transition-colors tracking-tight tabular-nums">
                  01672 552 140
                </span>
                <span className="text-lg sm:text-xl text-[#848982] group-hover:text-[#5B6450] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 shrink-0">
                  ↗
                </span>
              </div>
            </a>

            {/* Row 2: Email */}
            <a
              href="mailto:enquiries@oakandashgardens.co.uk"
              className="group flex flex-col md:flex-row md:items-center justify-between py-6 sm:py-9 md:py-12 border-b border-[#D8D4CA] transition-colors"
            >
              <div className="flex items-center gap-3.5 sm:gap-4 mb-2 md:mb-0">
                <svg
                  className="w-4 h-4 text-[#5B6450] shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.4}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.26em] sm:tracking-[0.28em] text-[#848982]">
                  Email
                </span>
              </div>
              <div className="flex items-center justify-between md:justify-end gap-3 sm:gap-8 min-w-0">
                <span className="font-cormorant text-lg sm:text-4xl md:text-5xl text-[#1C211D] group-hover:text-[#5B6450] transition-colors tracking-tight break-all sm:break-normal">
                  enquiries@oakandashgardens.co.uk
                </span>
                <span className="text-lg sm:text-xl text-[#848982] group-hover:text-[#5B6450] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 shrink-0">
                  ↗
                </span>
              </div>
            </a>

            {/* Row 3: Studio Location */}
            <div className="flex flex-col md:flex-row md:items-center justify-between py-6 sm:py-9 md:py-12 border-b border-[#D8D4CA]">
              <div className="flex items-center gap-3.5 sm:gap-4 mb-2 md:mb-0">
                <svg
                  className="w-4 h-4 text-[#5B6450] shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.4}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.26em] sm:tracking-[0.28em] text-[#848982]">
                  Design Studio
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between md:justify-end gap-2 sm:gap-8">
                <span className="font-cormorant text-xl sm:text-4xl md:text-5xl text-[#1C211D] tracking-tight">
                  259 High Street, Marlborough, SN8 1AA
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.24em] sm:tracking-[0.28em] text-[#5B6450]">
                  Mon – Fri · 8:30 – 17:30
                </span>
              </div>
            </div>
          </div>

          {/* Quiet Inline Facts Strip + Optional Written Brief Toggle */}
          <div className="lux-contact-reveal mt-10 sm:mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-x-6 sm:gap-x-8 gap-y-2 text-[9px] sm:text-[10px] uppercase tracking-[0.24em] sm:tracking-[0.26em] text-[#848982]">
              <span>Replies within 24 hours</span>
              <span className="hidden sm:inline">·</span>
              <span>Complimentary site visit</span>
              <span className="hidden sm:inline">·</span>
              <span>Wiltshire, Surrey &amp; London</span>
            </div>

            <button
              type="button"
              onClick={() => setShowEnquiryForm(!showEnquiryForm)}
              className="inline-flex items-center gap-4 text-[10px] sm:text-[11px] uppercase tracking-[0.26em] sm:tracking-[0.28em] text-[#1C211D] pb-1.5 border-b border-[#1C211D] hover:text-[#5B6450] hover:border-[#5B6450] transition-colors self-start sm:self-auto cursor-pointer"
            >
              <span>{showEnquiryForm ? 'Hide Written Brief' : 'Send a Written Project Brief'}</span>
              <span>{showEnquiryForm ? '−' : '+'}</span>
            </button>
          </div>

          {/* EXPANDABLE UNBOXED UNDERLINE-ONLY PROJECT BRIEF FORM */}
          {showEnquiryForm && (
            <div className="mt-16 sm:mt-20 pt-12 sm:pt-16 border-t border-[#D8D4CA]">
              {submitted ? (
                <div className="py-10 sm:py-12">
                  <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-[#5B6450] mb-4">
                    Enquiry Received
                  </p>
                  <h2 className="font-cormorant text-3xl sm:text-5xl text-[#1C211D] mb-4">
                    Thank You,{' '}
                    <span className="italic text-[#5B6450]">
                      {formData.name || 'for Enquiring'}.
                    </span>
                  </h2>
                  <p className="text-[#4A504B] text-sm sm:text-[15px] leading-[1.85] font-light max-w-lg mb-8">
                    Our Principal Designer will review your brief and contact you within one working day to arrange your private site consultation.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-[#1C211D] pb-1.5 border-b border-[#1C211D] cursor-pointer"
                  >
                    Send Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-10 sm:space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 sm:gap-y-10">
                    <div>
                      <label className="block text-[9px] sm:text-[10px] uppercase tracking-[0.28em] text-[#848982] mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Lord / Lady / Mr / Ms..."
                        className="w-full bg-transparent border-b border-[#D8D4CA] focus:border-[#1C211D] py-3 text-[#1C211D] text-sm sm:text-base font-light focus:outline-none transition-colors placeholder:text-[#B5B2A8]"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] sm:text-[10px] uppercase tracking-[0.28em] text-[#848982] mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@domain.co.uk"
                        className="w-full bg-transparent border-b border-[#D8D4CA] focus:border-[#1C211D] py-3 text-[#1C211D] text-sm sm:text-base font-light focus:outline-none transition-colors placeholder:text-[#B5B2A8]"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] sm:text-[10px] uppercase tracking-[0.28em] text-[#848982] mb-2">
                        Telephone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="07700 900 000"
                        className="w-full bg-transparent border-b border-[#D8D4CA] focus:border-[#1C211D] py-3 text-[#1C211D] text-sm sm:text-base font-light focus:outline-none transition-colors placeholder:text-[#B5B2A8]"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] sm:text-[10px] uppercase tracking-[0.28em] text-[#848982] mb-2">
                        Property Postcode / Area *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.postcode}
                        onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                        placeholder="e.g. SN8, SW3, GU28"
                        className="w-full bg-transparent border-b border-[#D8D4CA] focus:border-[#1C211D] py-3 text-[#1C211D] text-sm sm:text-base font-light focus:outline-none transition-colors placeholder:text-[#B5B2A8]"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] sm:text-[10px] uppercase tracking-[0.28em] text-[#848982] mb-2">
                        Commission Scope
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full bg-transparent border-b border-[#D8D4CA] focus:border-[#1C211D] py-3 text-[#1C211D] text-sm sm:text-base font-light focus:outline-none transition-colors"
                      >
                        <option value="Full Design & Build">Full Garden Design &amp; Build</option>
                        <option value="Build From Architect Plans">Construction from Existing Plans</option>
                        <option value="Soft Landscaping & Planting">Planting &amp; Soft Landscaping</option>
                        <option value="Garden Aftercare">Ongoing Estate &amp; Garden Aftercare</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[9px] sm:text-[10px] uppercase tracking-[0.28em] text-[#848982] mb-2">
                        Indicative Investment
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full bg-transparent border-b border-[#D8D4CA] focus:border-[#1C211D] py-3 text-[#1C211D] text-sm sm:text-base font-light focus:outline-none transition-colors"
                      >
                        <option value="£25,000 – £50,000">£25,000 – £50,000</option>
                        <option value="£50,000 – £100,000">£50,000 – £100,000</option>
                        <option value="£100,000 – £250,000">£100,000 – £250,000</option>
                        <option value="£250,000+">£250,000+ (Country Estate / Large Commission)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] sm:text-[10px] uppercase tracking-[0.28em] text-[#848982] mb-2">
                      About Your Garden
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Briefly describe your plot, architectural style, or desired timeframe..."
                      className="w-full bg-transparent border-b border-[#D8D4CA] focus:border-[#1C211D] py-3 text-[#1C211D] text-sm sm:text-base font-light focus:outline-none transition-colors resize-none placeholder:text-[#B5B2A8]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-4 text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-[#1C211D] pb-2 border-b border-[#1C211D] hover:text-[#5B6450] hover:border-[#5B6450] transition-colors cursor-pointer"
                  >
                    <span>Submit Commission Brief</span>
                    <span>→</span>
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;