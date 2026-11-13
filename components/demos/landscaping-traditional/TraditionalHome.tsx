import React, { useEffect, useState } from 'react';
import { motion as framerMotion } from 'framer-motion';
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import {
  ArrowRight,
  ArrowUpRight,
  Phone,
  MapPin,
  CheckCircle2,
  Plus,
  Minus,
} from 'lucide-react';
import TraditionalNavbar from './TraditionalNavbar';
import TraditionalFooter from './TraditionalFooter';
import {
  OAK_ASH_BRAND,
  PORTFOLIO_COLLECTIONS,
  SHOW_GARDENS,
  CORE_SERVICES,
  FAQS,
} from '../landscaping/landscapingData';

const motion = framerMotion as any;

// Dedicated Traditional hero photograph (Petworth English country garden with Yorkstone water rill)
export const TRADITIONAL_HERO_IMAGE =
  'https://dmhdaawgg48dl.cloudfront.net/wp-content/uploads/2024/10/yorkstone-rill-water-feature-english-country-petworth-sussex-1920x1280.jpg';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

export const TraditionalHome: React.FC = () => {
  const [selectedServiceId, setSelectedServiceId] = useState(CORE_SERVICES[0].id);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
  }, []);

  const activeService =
    CORE_SERVICES.find((s) => s.id === selectedServiceId) || CORE_SERVICES[0];

  const featuredWorks = PORTFOLIO_COLLECTIONS.slice(0, 4);

  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900 selection:bg-[#14532D] selection:text-white overflow-x-hidden">
      <TraditionalNavbar />

      {/* =================================================================== */}
      {/* 1. FULL-SCREEN TRADITIONAL HERITAGE HERO                            */}
      {/* =================================================================== */}
      <section className="relative h-screen min-h-[100svh] sm:min-h-[640px] w-full flex items-center justify-center overflow-hidden bg-zinc-950">
        <img
          src={TRADITIONAL_HERO_IMAGE}
          alt="Hand-dressed Yorkstone water rill and English country herbaceous borders in Petworth"
          referrerPolicy="no-referrer"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/70" />

        <div className="relative z-10 max-w-[1380px] w-full mx-auto px-5 sm:px-6 md:px-10 pt-24 pb-8 sm:pt-16 sm:pb-0 text-center flex flex-col items-center">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-[11px] sm:text-sm font-bold tracking-[0.16em] uppercase text-white/90 mb-3.5 sm:mb-4"
          >
            Oak &amp; Ash · Landscape Architecture &amp; Construction · Est. 1998
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2.1rem,6vw,5.25rem)] font-extrabold tracking-tight text-white leading-[1.06] max-w-4xl mb-5 sm:mb-6"
          >
            28 Years of Award-Winning{' '}
            <span className="text-[#16A34A]">Gardens.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed mb-7 sm:mb-9"
          >
            From initial garden design and 3D plans through to natural stone patios, pergolas, and seasonal planting — crafted under one roof across Wiltshire, Surrey, and London.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-5 w-full sm:w-auto max-w-xs sm:max-w-none"
          >
            <Link
              to="/demo/landscaping-traditional/contact"
              className="group inline-flex items-center justify-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 bg-[#16A34A] hover:bg-[#14532D] text-white text-sm font-bold rounded-md shadow-lg transition-colors duration-200 whitespace-nowrap"
            >
              Arrange a Free Site Visit
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              to="/demo/landscaping-traditional/gallery"
              className="inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 bg-white/15 hover:bg-white hover:text-[#14532D] backdrop-blur-md text-white border border-white/40 text-sm font-bold rounded-md transition-colors duration-200 whitespace-nowrap"
            >
              <MapPin size={16} className="text-[#16A34A]" />
              View Our Garden Projects
            </Link>
          </motion.div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 2. CREDENTIALS BAND (Deep Heritage Green #14532D)                   */}
      {/* =================================================================== */}
      <section className="bg-[#14532D] text-white py-7 px-5 sm:px-6 md:px-10">
        <div className="max-w-[1380px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 text-center lg:divide-x lg:divide-white/15">
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums">28+ Years</p>
            <p className="text-xs sm:text-sm text-white/75 mt-1">Established in 1998</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums">22 Medals</p>
            <p className="text-xs sm:text-sm text-white/75 mt-1">RHS Chelsea &amp; BALI Honours</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums">100% In-House</p>
            <p className="text-xs sm:text-sm text-white/75 mt-1">Employed Masons &amp; Gardeners</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums">Free Survey</p>
            <p className="text-xs sm:text-sm text-white/75 mt-1">Fixed-Price Written Quotes</p>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 3. DISCOVER OAK & ASH (Clean Split, Unframed Editorial Photos)      */}
      {/* =================================================================== */}
      <section className="py-16 sm:py-24 md:py-32 px-5 sm:px-6 md:px-10 bg-white">
        <div className="max-w-[1380px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="lg:col-span-5"
          >
            <p className="text-xs font-bold tracking-wider uppercase text-[#16A34A] mb-3">
              Design &amp; Build Under One Roof
            </p>
            <h2 className="text-[clamp(2rem,3.6vw,3.1rem)] font-extrabold tracking-tight text-zinc-900 leading-[1.1]">
              Complete garden transformations,{' '}
              <span className="text-[#14532D]">built to last.</span>
            </h2>
            <div className="h-[2px] w-16 bg-[#16A34A] mt-5 mb-6" />

            <p className="text-zinc-600 text-base leading-relaxed mb-6">
              Coordinating separate designers and contractors often fragments a vision. By uniting landscape architecture and construction within a single friendly practice, our permanent teams carry your garden from initial concept drawings right through to stone paving, pergolas, turfing, and seasonal planting.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                'Full site survey, 3D garden design & fixed-price quote',
                'Yorkstone, limestone & porcelain patios laid to BS 7533',
                'Bespoke timber & metalwork pergolas, fencing & outdoor kitchens',
                'RHS-qualified planting schemes, turfing & garden lighting',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm font-medium text-zinc-700">
                  <CheckCircle2 size={18} className="text-[#16A34A] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-4">
              <Link
                to="/demo/landscaping-traditional/contact"
                className="group inline-flex items-center justify-center gap-3 px-7 py-3.5 bg-[#14532D] hover:bg-[#16A34A] text-white text-sm font-semibold rounded-md transition-colors duration-200 whitespace-nowrap"
              >
                Book Your Consultation
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/demo/landscaping-traditional/about"
                className="inline-flex items-center justify-center sm:justify-start gap-2 text-sm font-bold text-[#14532D] hover:text-[#16A34A] transition-colors whitespace-nowrap py-2 sm:py-0"
              >
                Meet Our Landscaping Team
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </motion.div>

          {/* Dual Borderless Editorial Photographs */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8"
          >
            <figure className="group">
              <div className="aspect-[4/5] overflow-hidden bg-zinc-100">
                <img
                  src="https://dmhdaawgg48dl.cloudfront.net/wp-content/uploads/2024/11/metal-dining-set-boxwood-topiary-cottage-esher-surrey-960x960.jpg"
                  alt="Clipped boxwood topiary and Yorkstone dining terrace"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                />
              </div>
              <figcaption className="pt-4 border-b border-zinc-200 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#16A34A] block">
                  01 · Turnkey Practice
                </span>
                <span className="text-sm font-semibold text-zinc-900 mt-1 block">
                  Clipped Boxwood Topiary &amp; Yorkstone · Surrey
                </span>
              </figcaption>
            </figure>

            <figure className="group">
              <div className="aspect-[4/5] overflow-hidden bg-zinc-100">
                <img
                  src="https://dmhdaawgg48dl.cloudfront.net/wp-content/uploads/2024/12/curved-stone-pathway-iris-fern-modern-woodland-960x960.jpg"
                  alt="Curved woodland stone pathway and shade planting"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                />
              </div>
              <figcaption className="pt-4 border-b border-zinc-200 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#16A34A] block">
                  02 · Technical Mastery
                </span>
                <span className="text-sm font-semibold text-zinc-900 mt-1 block">
                  Natural Stone Woodland Path &amp; Borders · RHS Team
                </span>
              </figcaption>
            </figure>
          </motion.div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 4. CORE LANDSCAPING SERVICES (Open Interactive Index, No Nested Boxes) */}
      {/* =================================================================== */}
      <section className="py-16 sm:py-24 md:py-28 px-5 sm:px-6 md:px-10 bg-[#F7F7F5] border-y border-zinc-200">
        <div className="max-w-[1380px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs font-bold tracking-wider uppercase text-[#16A34A] mb-2">
                Every Discipline Under One Roof
              </p>
              <h2 className="text-[clamp(1.85rem,3.4vw,2.75rem)] font-extrabold tracking-tight text-zinc-900">
                Our Core Landscaping Services
              </h2>
            </div>
            <Link
              to="/demo/landscaping-traditional/services"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#14532D] hover:text-[#16A34A] transition-colors"
            >
              <span>View All 4 Services in Detail</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left: Clean Hairline Index List (No Floating Tab Boxes) */}
            <div className="lg:col-span-5 border-t border-zinc-300">
              {CORE_SERVICES.map((s) => {
                const isSelected = s.id === selectedServiceId;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedServiceId(s.id)}
                    className={`w-full py-5 border-b border-zinc-300 text-left flex items-center justify-between gap-4 transition-colors cursor-pointer group ${
                      isSelected ? 'text-[#14532D]' : 'text-zinc-700 hover:text-[#14532D]'
                    }`}
                  >
                    <div>
                      <span
                        className={`text-xs font-bold uppercase tracking-wider block mb-1 ${
                          isSelected ? 'text-[#16A34A]' : 'text-zinc-400 group-hover:text-[#16A34A]'
                        }`}
                      >
                        {s.index} · {s.kicker}
                      </span>
                      <span className="text-lg sm:text-xl font-bold block leading-snug">
                        {s.title}
                      </span>
                    </div>
                    <ArrowRight
                      size={18}
                      className={`shrink-0 transition-transform duration-200 ${
                        isSelected
                          ? 'text-[#16A34A] translate-x-1'
                          : 'text-zinc-400 group-hover:text-[#14532D] group-hover:translate-x-0.5'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Right: Borderless Open Spotlight (Photo + Copy) */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-6 aspect-[4/5] bg-zinc-200 overflow-hidden">
                <img
                  src={activeService.img}
                  alt={activeService.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="md:col-span-6 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#16A34A] block mb-2">
                    {activeService.index} · {activeService.kicker}
                  </span>
                  <h3 className="text-2xl font-extrabold text-zinc-900 mb-3">
                    {activeService.title}
                  </h3>
                  <p className="text-zinc-600 text-sm sm:text-base leading-relaxed mb-6">
                    {activeService.prose}
                  </p>
                  <ul className="space-y-2.5 pt-4 border-t border-zinc-200 mb-7">
                    {activeService.deliverables.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm font-medium text-zinc-800">
                        <CheckCircle2 size={15} className="text-[#16A34A] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to="/demo/landscaping-traditional/contact"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#14532D] hover:bg-[#16A34A] text-white text-sm font-semibold rounded-md transition-colors w-fit"
                >
                  <span>Enquire About {activeService.kicker}</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 5. SELECTED WORKS (Unboxed Open Portfolio Showcase)                 */}
      {/* =================================================================== */}
      <section className="py-16 sm:py-24 md:py-28 px-5 sm:px-6 md:px-10 bg-white">
        <div className="max-w-[1380px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4 pb-6 border-b border-zinc-200">
            <div>
              <p className="text-xs font-bold tracking-wider uppercase text-[#16A34A] mb-2">
                Selected Works
              </p>
              <h2 className="text-[clamp(1.85rem,3.4vw,2.75rem)] font-extrabold tracking-tight text-zinc-900">
                Our Garden Portfolios
              </h2>
            </div>
            <Link
              to="/demo/landscaping-traditional/gallery"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#14532D] hover:text-[#16A34A] transition-colors w-fit"
            >
              <span>View Complete Photo Gallery</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
            {featuredWorks.map((item) => (
              <Link
                key={item.index}
                to="/demo/landscaping-traditional/gallery"
                className="group block"
              >
                <div className="aspect-[16/10] overflow-hidden bg-zinc-100 mb-5">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  />
                </div>
                <div className="pb-6 border-b border-zinc-200">
                  <div className="flex items-center justify-between gap-4 mb-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#16A34A]">
                      {item.index} · {item.location}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#14532D] group-hover:text-[#16A34A] transition-colors">
                      Explore
                      <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 group-hover:text-[#14532D] transition-colors mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-600 leading-relaxed max-w-xl">
                    {item.summary}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 6. RHS CHELSEA SHOW GARDENS (Deep Heritage Green #14532D, Unboxed)  */}
      {/* =================================================================== */}
      <section className="py-16 sm:py-24 px-5 sm:px-6 md:px-10 bg-[#14532D] text-white">
        <div className="max-w-[1380px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-8 border-b border-white/20">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-white/80 mb-2">
                Royal Horticultural Society &amp; National Honours
              </p>
              <h2 className="text-[clamp(1.85rem,3.4vw,2.75rem)] font-extrabold tracking-tight text-white">
                Award-Winning Show Gardens
              </h2>
            </div>
            <p className="text-white/80 text-sm max-w-md leading-relaxed">
              Multiple Gold and Silver-Gilt medals at the RHS Chelsea Flower Show and BALI National Landscape Awards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {SHOW_GARDENS.map((garden) => (
              <Link
                key={garden.title}
                to="/demo/landscaping-traditional/gallery"
                className="group block"
              >
                <div className="aspect-square overflow-hidden bg-black/20 mb-4">
                  <img
                    src={garden.image}
                    alt={garden.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
                  />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-white/75 block mb-1">
                  RHS Chelsea · {garden.year}
                </span>
                <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-[#16A34A] transition-colors">
                  {garden.title}
                </h3>
                <p className="text-xs text-white/75 leading-relaxed">
                  {garden.detail}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 7. PRIVATE COMMISSIONS & FREQUENTLY ASKED QUESTIONS (Clean Rules)   */}
      {/* =================================================================== */}
      <section className="py-16 sm:py-24 px-5 sm:px-6 md:px-10 bg-[#F7F7F5]">
        <div className="max-w-[1380px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Clean Editorial Enquiry Block (Unboxed) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#16A34A] block mb-2">
                Private Commissions &amp; Local Gardens
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 leading-tight">
                We Handle Every Detail From First Sketch to Maturity.
              </h2>
            </div>

            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
              Whether transforming a country garden in Wiltshire, a family lawn in Surrey, or a courtyard in London, our friendly team provides a clear, fixed-price quote and one dedicated project manager throughout.
            </p>

            <div className="aspect-[16/10] overflow-hidden bg-zinc-200">
              <img
                src="https://dmhdaawgg48dl.cloudfront.net/wp-content/uploads/2025/02/reflection-pool-york-stone-courtyard-country-garden-petworth-760x760.jpg"
                alt="Yorkstone courtyard and reflection pool"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-2 pt-3 border-t border-zinc-300 text-sm">
              <a
                href={`tel:${OAK_ASH_BRAND.phoneHref}`}
                className="flex items-center justify-between py-2 font-bold text-[#14532D] hover:text-[#16A34A] transition-colors tabular-nums"
              >
                <span className="flex items-center gap-2">
                  <Phone size={16} className="text-[#16A34A]" />
                  Call Direct:
                </span>
                <span className="text-lg">{OAK_ASH_BRAND.phoneDisplay}</span>
              </a>
              <p className="text-xs text-zinc-500">
                Studio: {OAK_ASH_BRAND.studioName}, {OAK_ASH_BRAND.address}
              </p>
            </div>

            <Link
              to="/demo/landscaping-traditional/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 py-4 px-8 rounded-md bg-[#16A34A] hover:bg-[#14532D] text-white text-sm font-bold transition-colors"
            >
              <span>Request Your Free Site Visit</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Right: Open Hairline FAQ Accordion (Zero Individual Boxes) */}
          <div className="lg:col-span-7">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-[#16A34A] block mb-2">
                Client Guidance
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-900">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="border-t border-zinc-300">
              {FAQS.map((item, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={item.q} className="border-b border-zinc-300">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full py-5 sm:py-6 text-left flex items-center justify-between gap-4 cursor-pointer group"
                    >
                      <h3 className="text-base sm:text-lg font-bold text-zinc-900 group-hover:text-[#14532D] transition-colors leading-snug">
                        {item.q}
                      </h3>
                      <span className="text-[#16A34A] shrink-0">
                        {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="pb-6 text-sm sm:text-base text-zinc-600 leading-relaxed max-w-2xl">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <TraditionalFooter />
    </div>
  );
};

export default TraditionalHome;
