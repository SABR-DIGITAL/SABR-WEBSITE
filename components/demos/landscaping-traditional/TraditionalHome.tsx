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
  HERO_SLIDES,
  PORTFOLIO_COLLECTIONS,
  SHOW_GARDENS,
  CORE_SERVICES,
  FAQS,
} from '../landscaping/landscapingData';

const motion = framerMotion as any;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
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

  return (
    <div className="min-h-screen bg-[#F5F9F6] font-sans text-[#112A1B] selection:bg-[#15803D] selection:text-white overflow-x-hidden">
      <TraditionalNavbar />

      {/* =================================================================== */}
      {/* 1. FULL-SCREEN TRADITIONAL GREEN HERO (Physio-Inspired Layout)      */}
      {/* =================================================================== */}
      <section className="relative h-screen min-h-[100svh] sm:min-h-[640px] w-full flex items-center justify-center overflow-hidden">
        <img
          src={HERO_SLIDES[0].image}
          alt={HERO_SLIDES[0].alt}
          referrerPolicy="no-referrer"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A2213]/75 via-[#0F2E1C]/65 to-[#0A2213]/85" />

        <div className="relative z-10 max-w-[1380px] w-full mx-auto px-5 sm:px-6 md:px-10 pt-24 pb-8 sm:pt-16 sm:pb-0 text-center flex flex-col items-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-[11px] sm:text-sm md:text-base font-bold tracking-[0.14em] sm:tracking-[0.18em] uppercase text-[#86EFAC] mb-3.5 sm:mb-4"
          >
            Oak &amp; Ash · Landscape Architecture &amp; Construction · Est. 1998
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2rem,6vw,5.25rem)] font-extrabold tracking-tight text-white leading-[1.08] sm:leading-[1.06] max-w-4xl mb-5 sm:mb-6"
          >
            28 Years of Award-Winning <span className="text-[#4ADE80]">Gardens.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-lg md:text-xl text-emerald-50/90 max-w-2xl leading-relaxed mb-7 sm:mb-9"
          >
            From initial garden design and 3D plans through to natural stone patios, pergolas, and seasonal planting — crafted under one roof across Wiltshire, Surrey, and London.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-5 w-full sm:w-auto max-w-xs sm:max-w-none"
          >
            <Link
              to="/demo/landscaping-traditional/contact"
              className="group inline-flex items-center justify-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 bg-[#16A34A] hover:bg-white hover:text-[#14532D] text-white text-sm font-bold rounded-lg shadow-lg transition-all duration-200 whitespace-nowrap"
            >
              Arrange a Free Site Visit
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              to="/demo/landscaping-traditional/gallery"
              className="inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 bg-white/15 hover:bg-white/25 backdrop-blur-md text-white border border-white/35 text-sm font-bold rounded-lg transition-all duration-200 whitespace-nowrap"
            >
              <MapPin size={16} className="text-[#86EFAC]" />
              View Our Garden Projects
            </Link>
          </motion.div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 2. GREEN TRUST & CREDENTIALS STRIP (Below Hero)                     */}
      {/* =================================================================== */}
      <section className="bg-[#14532D] text-white py-6 px-5 sm:px-6 md:px-10 border-b border-emerald-800">
        <div className="max-w-[1380px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-[#86EFAC] tabular-nums">28+ Years</p>
            <p className="text-xs sm:text-sm text-emerald-100/85 mt-0.5">Established in 1998</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-[#86EFAC] tabular-nums">22 Medals</p>
            <p className="text-xs sm:text-sm text-emerald-100/85 mt-0.5">RHS Chelsea &amp; BALI Honours</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-[#86EFAC] tabular-nums">100% In-House</p>
            <p className="text-xs sm:text-sm text-emerald-100/85 mt-0.5">Employed Masons &amp; Gardeners</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-[#86EFAC] tabular-nums">Free Survey</p>
            <p className="text-xs sm:text-sm text-emerald-100/85 mt-0.5">Fixed-Price Written Quotes</p>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 3. DISCOVER OAK & ASH (2-Column Split with Dual Garden Photos)      */}
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
            <p className="text-xs font-bold tracking-wider uppercase text-[#15803D] mb-3">
              Design &amp; Build Under One Roof
            </p>
            <h2 className="text-[clamp(2rem,3.6vw,3.1rem)] font-extrabold tracking-tight text-[#112A1B] leading-[1.1]">
              Complete garden transformations, <span className="text-[#15803D]">built to last.</span>
            </h2>
            <div className="h-1 w-20 rounded-full bg-[#16A34A] mt-5 mb-6" />

            <p className="text-slate-600 text-base leading-relaxed mb-6">
              Coordinating separate designers and contractors often fragments a vision. By uniting landscape architecture and construction within a single friendly practice, our permanent teams carry your garden from initial concept drawings right through to stone paving, pergolas, turfing, and seasonal planting.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                'Full site survey, 3D garden design & fixed-price quote',
                'Yorkstone, limestone & porcelain patios laid to BS 7533',
                'Bespoke timber & metalwork pergolas, fencing & outdoor kitchens',
                'RHS-qualified planting schemes, turfing & garden lighting',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm font-medium text-slate-700">
                  <CheckCircle2 size={18} className="text-[#16A34A] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-4">
              <Link
                to="/demo/landscaping-traditional/contact"
                className="group inline-flex items-center justify-center gap-3 px-7 py-3.5 bg-[#14532D] hover:bg-[#15803D] text-white text-sm font-semibold rounded-lg transition-colors duration-200 whitespace-nowrap"
              >
                Book Your Consultation
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/demo/landscaping-traditional/about"
                className="inline-flex items-center justify-center sm:justify-start gap-2 text-sm font-bold text-[#15803D] hover:text-[#14532D] transition-colors whitespace-nowrap py-2 sm:py-0"
              >
                Meet Our Landscaping Team
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </motion.div>

          {/* Dual Photographs (Same Oak & Ash images) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            <div className="rounded-xl overflow-hidden bg-emerald-50 border border-emerald-900/10 shadow-sm">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="https://dmhdaawgg48dl.cloudfront.net/wp-content/uploads/2024/11/metal-dining-set-boxwood-topiary-cottage-esher-surrey-960x960.jpg"
                  alt="Clipped boxwood topiary and Yorkstone dining terrace"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 bg-white">
                <p className="text-xs font-bold uppercase tracking-wider text-[#15803D]">
                  01 · Turnkey Practice
                </p>
                <p className="text-sm font-semibold text-[#112A1B] mt-0.5">
                  Clipped Boxwood Topiary &amp; Yorkstone · Surrey
                </p>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden bg-emerald-50 border border-emerald-900/10 shadow-sm">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="https://dmhdaawgg48dl.cloudfront.net/wp-content/uploads/2024/12/curved-stone-pathway-iris-fern-modern-woodland-960x960.jpg"
                  alt="Curved woodland stone pathway and shade planting"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 bg-white">
                <p className="text-xs font-bold uppercase tracking-wider text-[#15803D]">
                  02 · Technical Mastery
                </p>
                <p className="text-sm font-semibold text-[#112A1B] mt-0.5">
                  Natural Stone Woodland Path &amp; Borders · RHS Team
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 4. INTERACTIVE SERVICES EXPLORER (Physio Pain-Explorer Style)       */}
      {/* =================================================================== */}
      <section className="py-16 sm:py-24 px-5 sm:px-6 md:px-10 bg-[#EFF6F1] border-y border-emerald-900/10">
        <div className="max-w-[1380px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-xs font-bold tracking-wider uppercase text-[#15803D] mb-2">
                Every Discipline Under One Roof
              </p>
              <h2 className="text-[clamp(1.85rem,3.4vw,2.75rem)] font-extrabold tracking-tight text-[#112A1B]">
                Our Core Landscaping Services
              </h2>
            </div>
            <Link
              to="/demo/landscaping-traditional/services"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#15803D] hover:text-[#14532D] transition-colors"
            >
              <span>View All 4 Services in Detail</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Interactive Service Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {CORE_SERVICES.map((s) => {
              const isSelected = s.id === selectedServiceId;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedServiceId(s.id)}
                  className={`p-4 rounded-xl text-left transition-all duration-200 border cursor-pointer ${
                    isSelected
                      ? 'bg-[#14532D] text-white border-[#14532D] shadow-md'
                      : 'bg-white text-[#112A1B] border-emerald-900/10 hover:border-[#15803D]'
                  }`}
                >
                  <span
                    className={`text-xs font-bold uppercase tracking-wider block mb-1 ${
                      isSelected ? 'text-[#86EFAC]' : 'text-[#15803D]'
                    }`}
                  >
                    {s.index}. {s.kicker}
                  </span>
                  <span className="text-base font-bold block leading-snug">{s.title}</span>
                </button>
              );
            })}
          </div>

          {/* Selected Service Card */}
          <div className="bg-white rounded-2xl border border-emerald-900/15 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-6 aspect-[16/10] lg:aspect-auto bg-emerald-50">
              <img
                src={activeService.img}
                alt={activeService.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
              <span className="text-xs font-bold uppercase tracking-wider text-[#15803D] mb-2">
                {activeService.index} · {activeService.kicker}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#112A1B] mb-4">
                {activeService.title}
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                {activeService.prose}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-5 border-t border-slate-100 mb-8">
                {activeService.deliverables.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm font-medium text-slate-800">
                    <CheckCircle2 size={16} className="text-[#16A34A] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div>
                <Link
                  to="/demo/landscaping-traditional/contact"
                  className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#15803D] hover:bg-[#14532D] text-white text-sm font-semibold rounded-lg transition-colors"
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
      {/* 5. GARDEN PORTFOLIOS (6 Easy-to-Browse Traditional Cards)           */}
      {/* =================================================================== */}
      <section className="py-16 sm:py-24 px-5 sm:px-6 md:px-10 bg-white">
        <div className="max-w-[1380px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-xs font-bold tracking-wider uppercase text-[#15803D] mb-2">
                Selected Works
              </p>
              <h2 className="text-[clamp(1.85rem,3.4vw,2.75rem)] font-extrabold tracking-tight text-[#112A1B]">
                Our Garden Portfolios
              </h2>
            </div>
            <Link
              to="/demo/landscaping-traditional/gallery"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-emerald-800/20 text-[#14532D] hover:bg-emerald-50 text-sm font-semibold transition-colors w-fit"
            >
              <span>View Complete Photo Gallery</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PORTFOLIO_COLLECTIONS.map((item) => (
              <Link
                key={item.index}
                to="/demo/landscaping-traditional/gallery"
                className="group bg-[#F8FBF9] rounded-xl overflow-hidden border border-emerald-900/10 hover:border-[#15803D]/50 shadow-sm hover:shadow-md transition-all flex flex-col"
              >
                <div className="aspect-[4/3] overflow-hidden bg-emerald-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold text-[#15803D] mb-2">
                      <span>{item.index}. {item.location}</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#112A1B] group-hover:text-[#15803D] transition-colors mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-emerald-900/10 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#14532D]">
                    <span>Browse Gardens</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 6. RHS CHELSEA SHOW GARDENS (Forest Green Showcase)                 */}
      {/* =================================================================== */}
      <section className="py-16 sm:py-24 px-5 sm:px-6 md:px-10 bg-[#14532D] text-white">
        <div className="max-w-[1380px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-8 border-b border-emerald-700/60">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#86EFAC] mb-2">
                Royal Horticultural Society &amp; National Honours
              </p>
              <h2 className="text-[clamp(1.85rem,3.4vw,2.75rem)] font-extrabold tracking-tight text-white">
                Award-Winning Show Gardens
              </h2>
            </div>
            <p className="text-emerald-100/85 text-sm max-w-md leading-relaxed">
              Multiple Gold and Silver-Gilt medals at the RHS Chelsea Flower Show and BALI National Landscape Awards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SHOW_GARDENS.map((garden) => (
              <Link
                key={garden.title}
                to="/demo/landscaping-traditional/gallery"
                className="group bg-[#0F2E1C] rounded-xl overflow-hidden border border-emerald-700/50 hover:border-[#86EFAC] transition-colors flex flex-col"
              >
                <div className="aspect-square overflow-hidden bg-emerald-950">
                  <img
                    src={garden.image}
                    alt={garden.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#86EFAC] mb-1">
                    RHS Chelsea · {garden.year}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-[#86EFAC] transition-colors">
                    {garden.title}
                  </h3>
                  <p className="text-xs text-emerald-100/75 leading-relaxed">
                    {garden.detail}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 7. FREQUENTLY ASKED QUESTIONS & DIRECT QUOTE CALLOUT                */}
      {/* =================================================================== */}
      <section className="py-16 sm:py-24 px-5 sm:px-6 md:px-10 bg-[#F5F9F6]">
        <div className="max-w-[1380px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Direct Quote Card */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-emerald-900/15 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#15803D] block mb-2">
                Private Commissions &amp; Local Gardens
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#112A1B] leading-tight">
                We Handle Every Detail From First Sketch to Maturity.
              </h2>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Whether transforming a country garden in Wiltshire, a family lawn in Surrey, or a courtyard in London, our friendly team provides a clear, fixed-price quote and one dedicated project manager throughout.
            </p>

            <div className="aspect-[16/10] rounded-xl overflow-hidden bg-emerald-100">
              <img
                src="https://dmhdaawgg48dl.cloudfront.net/wp-content/uploads/2025/02/reflection-pool-york-stone-courtyard-country-garden-petworth-760x760.jpg"
                alt="Yorkstone courtyard and reflection pool"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-3 pt-2 border-t border-slate-100 text-sm">
              <a
                href={`tel:${OAK_ASH_BRAND.phoneHref}`}
                className="flex items-center justify-between py-2 font-bold text-[#14532D] hover:text-[#15803D] tabular-nums"
              >
                <span className="flex items-center gap-2">
                  <Phone size={16} className="text-[#16A34A]" />
                  Call Direct:
                </span>
                <span className="text-lg">{OAK_ASH_BRAND.phoneDisplay}</span>
              </a>
              <p className="text-xs text-slate-500">
                Studio: {OAK_ASH_BRAND.studioName}, {OAK_ASH_BRAND.address}
              </p>
            </div>

            <Link
              to="/demo/landscaping-traditional/contact"
              className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-lg bg-[#15803D] hover:bg-[#14532D] text-white text-sm font-bold shadow-sm transition-colors"
            >
              <span>Request Your Free Site Visit</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Right: Easy-to-Read FAQ Accordion */}
          <div className="lg:col-span-7">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-[#15803D] block mb-2">
                Client Guidance
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#112A1B]">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3">
              {FAQS.map((item, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={item.q}
                    className="bg-white rounded-xl border border-emerald-900/10 overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-emerald-50/40 transition-colors"
                    >
                      <h3 className="text-base sm:text-lg font-bold text-[#112A1B] leading-snug">
                        {item.q}
                      </h3>
                      <span className="w-8 h-8 rounded-lg bg-emerald-50 text-[#15803D] flex items-center justify-center shrink-0">
                        {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100">
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
