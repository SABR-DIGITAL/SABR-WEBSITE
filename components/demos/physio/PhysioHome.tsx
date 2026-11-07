import React, { useEffect, useState } from 'react';
import { motion as framerMotion, AnimatePresence } from 'framer-motion';
// Fix react-router-dom missing exports
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Phone,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import PhysioNavbar, { triggerPhysioModal } from './PhysioNavbar';
import PhysioFooter from './PhysioFooter';
import {
  clinic,
  images,
  coreServices,
  ukLocations,
  painAreas,
  spotlightSlides,
  patientTestimonials
} from './physioData';

// Fix motion types by casting to any
const motion = framerMotion as any;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

const PhysioHome: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedPainId, setSelectedPainId] = useState(painAreas[0].id);
  const [slidePaused, setSlidePaused] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
  }, []);

  useEffect(() => {
    if (slidePaused) return;
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % spotlightSlides.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [slidePaused]);

  const activePain = painAreas.find((p) => p.id === selectedPainId) || painAreas[0];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#0F2942] selection:bg-[#0D9488] selection:text-white overflow-x-hidden">
      <PhysioNavbar />

      {/* 1. FULL-SCREEN HERO — Full viewport image, "We're here to help you." above "Your Healing Journey.", and two CTAs below */}
      <section className="relative h-screen min-h-[100svh] sm:min-h-[680px] w-full flex items-center justify-center overflow-hidden">
        <img
          src={images.hero}
          alt="Pulteney Physiotherapy rehabilitation studio"
          referrerPolicy="no-referrer"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover object-center scale-[1.02]"
        />
        {/* Measured luxury contrast scrim so typography is crisp and effortless to read */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F2942]/65 via-[#0F2942]/55 to-[#0F2942]/80" />

        <div className="relative z-10 max-w-[1380px] w-full mx-auto px-5 sm:px-6 md:px-10 pt-16 text-center flex flex-col items-center">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs sm:text-sm md:text-base font-semibold tracking-[0.18em] uppercase text-[#5EEAD4] mb-4 sm:mb-5"
          >
            We&rsquo;re here to help you.
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2.4rem,7vw,6rem)] font-extrabold tracking-tight text-white leading-[1.04] sm:leading-[1.02] mb-8 sm:mb-12"
          >
            Your Healing <span className="text-[#2DD4BF]">Journey.</span>
          </motion.h1>

          {/* Two CTAs directly below Your Healing Journey. */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 sm:gap-5 w-full sm:w-auto max-w-xs sm:max-w-none"
          >
            <Link
              to="/demo/physio/contact"
              className="group inline-flex items-center justify-center gap-3 px-7 sm:px-9 py-4 bg-[#0D9488] hover:bg-white hover:text-[#0F2942] text-white text-sm font-semibold tracking-wide transition-all duration-300 whitespace-nowrap"
            >
              Request an Appointment
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              to="/demo/physio/contact"
              className="inline-flex items-center justify-center gap-2.5 px-7 sm:px-9 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 text-sm font-semibold tracking-wide transition-all duration-300 whitespace-nowrap"
            >
              <MapPin size={16} className="text-[#5EEAD4]" />
              Our 3 UK Clinics
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. DISCOVER PULTENEY PHYSIOTHERAPY — Directly below hero, unboxed pure photography + spacious luxury typography */}
      <section className="py-16 sm:py-24 md:py-40 px-5 sm:px-6 md:px-10 bg-white">
        <div className="max-w-[1380px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 lg:gap-20 items-center">
          {/* Left Narrative */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
            className="lg:col-span-5"
          >
            <p className="text-xs font-bold tracking-wider uppercase text-[#0D9488] mb-3">
              Discover
            </p>
            <h2
              className="text-[clamp(2.25rem,4vw,3.5rem)] font-extrabold tracking-tight text-[#0F2942] leading-[1.08]"
              style={{ textWrap: 'balance' } as React.CSSProperties}
            >
              Chartered care, <span className="text-[#0D9488]">built around you.</span>
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="origin-left h-1 w-24 rounded-full bg-gradient-to-r from-[#0D9488] to-[#0284C7] mt-6 mb-8"
            />

            <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-10">
              Across Bath, Bristol, and Cheltenham, our HCPC-registered physiotherapists give you the time to be heard properly, a clear diagnosis in plain English, and one-to-one rehabilitation in calm, purpose-built studios.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-4 sm:gap-6">
              <button
                type="button"
                onClick={() => triggerPhysioModal()}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#0F2942] hover:bg-[#0D9488] text-white text-sm font-semibold transition-colors duration-300 cursor-pointer whitespace-nowrap"
              >
                Request an Appointment
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <Link
                to="/demo/physio/team"
                className="inline-flex items-center justify-center sm:justify-start gap-2 text-sm font-bold text-[#0D9488] hover:text-[#0F2942] transition-colors whitespace-nowrap py-2 sm:py-0"
              >
                Meet Our Clinicians
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </motion.div>

          {/* Right Dual Unboxed Photographs — Zero boxes underneath the images */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8"
          >
            <div className="aspect-[4/5] overflow-hidden bg-slate-100">
              <img
                src={images.handsOn}
                alt="Hands-on cervical and shoulder manual therapy"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-out"
              />
            </div>
            <div className="aspect-[4/5] overflow-hidden bg-slate-100 sm:mt-12">
              <img
                src={images.hydro}
                alt="Heated indoor hydrotherapy pool at our Bath clinic"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-out"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. THREE PROGRAMME OPTIONS (AgeWell & Balance Studio, Athletic & Running Partnerships, Workplace Care — Kept as requested) */}
      <section
        className="py-16 sm:py-24 md:py-32 px-5 sm:px-6 md:px-10 bg-gradient-to-br from-[#F0FDFA] via-[#F8FAFC] to-[#EFF6FF]"
        onMouseEnter={() => setSlidePaused(true)}
        onMouseLeave={() => setSlidePaused(false)}
      >
        <div className="max-w-[1380px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-10">
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-1.5 sm:gap-2 p-1.5 bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl">
              {spotlightSlides.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setActiveSlide(idx)}
                  className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-left sm:text-center transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                    activeSlide === idx
                      ? 'bg-[#0F2942] text-white shadow-sm'
                      : 'text-slate-600 hover:text-[#0F2942]'
                  }`}
                >
                  {slide.programName}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                type="button"
                aria-label="Previous programme"
                onClick={() =>
                  setActiveSlide((prev) => (prev - 1 + spotlightSlides.length) % spotlightSlides.length)
                }
                className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#0F2942] hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                aria-label="Next programme"
                onClick={() => setActiveSlide((prev) => (prev + 1) % spotlightSlides.length)}
                className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#0F2942] hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#0F2942] via-[#133B5C] to-[#0D9488] text-white shadow-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={spotlightSlides[activeSlide].id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 items-stretch"
              >
                <div className="lg:col-span-7 p-6 sm:p-12 md:p-16 flex flex-col justify-center">
                  <p className="text-xs font-semibold tracking-wider uppercase text-teal-200 mb-3">
                    {spotlightSlides[activeSlide].tag}
                  </p>
                  <h3
                    className="text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4 sm:mb-5"
                    style={{ textWrap: 'balance' } as React.CSSProperties}
                  >
                    {spotlightSlides[activeSlide].headline}
                  </h3>
                  <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-xl mb-5 sm:mb-6">
                    {spotlightSlides[activeSlide].description}
                  </p>
                  <p className="text-xs sm:text-sm font-medium text-teal-200 mb-6 sm:mb-8">
                    {spotlightSlides[activeSlide].metric}
                  </p>
                  <div>
                    <Link
                      to={spotlightSlides[activeSlide].ctaPath}
                      className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-7 py-3.5 bg-white text-[#0F2942] hover:bg-teal-50 text-sm font-bold transition-colors whitespace-nowrap shrink-0"
                    >
                      {spotlightSlides[activeSlide].ctaLabel}
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-[400px] bg-slate-800">
                  <img
                    src={spotlightSlides[activeSlide].image}
                    alt={spotlightSlides[activeSlide].programName}
                    referrerPolicy="no-referrer"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#0F2942]/60 via-transparent to-transparent" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 5. OUR CLINICAL SERVICES — Smooth, fluid, unboxed editorial showcase */}
      <section className="py-16 sm:py-24 md:py-40 px-5 sm:px-6 md:px-10 bg-white">
        <div className="max-w-[1380px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-12 sm:mb-20">
            <div>
              <p className="text-xs font-bold tracking-wider uppercase text-[#0D9488] mb-3">
                What We Offer
              </p>
              <h2
                className="text-[clamp(2.25rem,4vw,3.5rem)] font-extrabold tracking-tight text-[#0F2942] leading-[1.08]"
                style={{ textWrap: 'balance' } as React.CSSProperties}
              >
                Our Clinical <span className="text-[#0D9488]">Services.</span>
              </h2>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="origin-left h-1 w-24 rounded-full bg-gradient-to-r from-[#0D9488] to-[#0284C7] mt-5"
              />
            </div>
            <Link
              to="/demo/physio/prices"
              className="group inline-flex items-center gap-2 text-sm font-bold text-[#0284C7] hover:text-[#0F2942] transition-colors whitespace-nowrap shrink-0"
            >
              Explore Full Treatment Guide &amp; Fees
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Spacious, Unboxed 2-Column Editorial Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 lg:gap-x-20 gap-y-14 sm:gap-y-20 md:gap-y-24">
            {coreServices.map((service, idx) => (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.75, delay: (idx % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 mb-5 sm:mb-7">
                  <img
                    src={service.image}
                    alt={service.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                  />
                </div>

                <div className="flex items-center justify-between gap-4 text-xs font-bold text-[#0D9488] mb-3">
                  <span>
                    {service.number} &middot; {service.category}
                  </span>
                  <span className="text-[#0F2942] tabular-nums">{service.price}</span>
                </div>

                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-[#0F2942] group-hover:text-[#0D9488] transition-colors mb-3">
                  {service.title}
                </h3>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                  {service.shortDesc}
                </p>

                <div className="mt-auto pt-4 border-t border-slate-200/80 flex items-center justify-between gap-3">
                  <span className="text-xs font-medium text-slate-400">{service.duration}</span>
                  <button
                    type="button"
                    onClick={() => triggerPhysioModal({ service: service.title })}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#0F2942] group-hover:text-[#0D9488] transition-colors cursor-pointer"
                  >
                    Book {service.title}
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. HOW CAN PULTENEY HELP? — Fluid, Unboxed Interactive Symptom Guide */}
      <section className="py-16 sm:py-24 md:py-36 px-5 sm:px-6 md:px-10 bg-gradient-to-br from-[#F0FDFA] via-[#F8FAFC] to-[#EFF6FF]">
        <div className="max-w-[1380px] mx-auto">
          <div className="max-w-2xl mb-10 sm:mb-16">
            <p className="text-xs font-bold tracking-wider uppercase text-[#0D9488] mb-3">
              How Can Pulteney Help?
            </p>
            <h2
              className="text-[clamp(2.25rem,4vw,3.5rem)] font-extrabold tracking-tight text-[#0F2942] leading-[1.08]"
              style={{ textWrap: 'balance' } as React.CSSProperties}
            >
              We are here <span className="text-[#0D9488]">for you.</span>
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="origin-left h-1 w-24 rounded-full bg-gradient-to-r from-[#0D9488] to-[#0284C7] mt-5"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-20 items-start">
            {/* Left Unboxed Minimalist List */}
            <div className="lg:col-span-5 divide-y divide-slate-200/80 border-y border-slate-200/80">
              {painAreas.map((area, index) => {
                const isSelected = area.id === selectedPainId;
                return (
                  <button
                    key={area.id}
                    type="button"
                    onClick={() => setSelectedPainId(area.id)}
                    className="w-full py-4 sm:py-5 text-left flex items-center justify-between gap-4 group cursor-pointer transition-colors"
                  >
                    <div className="flex items-baseline gap-4">
                      <span
                        className={`text-xs font-bold tabular-nums transition-colors ${
                          isSelected ? 'text-[#0D9488]' : 'text-slate-400 group-hover:text-[#0F2942]'
                        }`}
                      >
                        0{index + 1}
                      </span>
                      <span
                        className={`text-base sm:text-lg md:text-xl font-bold tracking-tight transition-colors ${
                          isSelected ? 'text-[#0D9488]' : 'text-[#0F2942] group-hover:text-[#0D9488]'
                        }`}
                      >
                        {area.region}
                      </span>
                    </div>
                    <ArrowRight
                      size={16}
                      className={`shrink-0 transition-all duration-300 ${
                        isSelected
                          ? 'text-[#0D9488] translate-x-1'
                          : 'text-slate-300 group-hover:text-[#0F2942]'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Right Fluid Unboxed Narrative */}
            <div className="lg:col-span-7 lg:pl-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePain.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="text-xs font-bold tracking-wider uppercase text-[#0284C7] mb-2">
                    {activePain.recommendedService} &middot; Typical recovery: {activePain.typicalRecovery}
                  </p>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#0F2942] mb-4">
                    {activePain.region}
                  </h3>
                  <p className="text-sm font-medium text-slate-500 mb-5 sm:mb-6">
                    {activePain.subtitle}
                  </p>
                  <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed mb-7 sm:mb-8">
                    {activePain.howWeHelp}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2 text-xs font-semibold text-[#0F2942] pt-5 sm:pt-6 border-t border-slate-200/80 mb-8 sm:mb-10">
                    {activePain.commonCauses.map((cause, i) => (
                      <React.Fragment key={cause}>
                        <span>{cause}</span>
                        {i < activePain.commonCauses.length - 1 && (
                          <span className="text-[#0D9488]" aria-hidden="true">
                            &mdash;
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => triggerPhysioModal({ service: activePain.recommendedService })}
                    className="group inline-flex items-center justify-center w-full sm:w-auto gap-3 px-8 py-4 bg-[#0D9488] hover:bg-[#0F2942] text-white text-sm font-semibold transition-colors cursor-pointer"
                  >
                    Book Assessment for {activePain.region}
                    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 7. HERE IS WHAT THEY ARE SAYING — Clean, luxury, unboxed & generously spaced */}
      <section className="py-16 sm:py-24 md:py-40 px-5 sm:px-6 md:px-10 bg-white">
        <div className="max-w-[1380px] mx-auto">
          <div className="max-w-2xl mb-12 sm:mb-20">
            <p className="text-xs font-bold tracking-wider uppercase text-[#0D9488] mb-3">
              Come Heal With Us &middot; Patient Stories
            </p>
            <h2
              className="text-[clamp(2.25rem,4vw,3.5rem)] font-extrabold tracking-tight text-[#0F2942] leading-[1.08]"
              style={{ textWrap: 'balance' } as React.CSSProperties}
            >
              Here is what <span className="text-[#0D9488]">they are saying.</span>
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="origin-left h-1 w-24 rounded-full bg-gradient-to-r from-[#0D9488] to-[#0284C7] mt-5"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 sm:gap-14 lg:gap-20">
            {patientTestimonials.slice(0, 3).map((item, idx) => (
              <motion.figure
                key={item.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col justify-between pt-6 sm:pt-8 border-t border-slate-200"
              >
                <blockquote className="text-base sm:text-lg md:text-xl text-[#0F2942] font-medium leading-relaxed mb-7 sm:mb-10">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <figcaption>
                  <p className="text-base font-extrabold text-[#0F2942]">{item.name}</p>
                  <p className="text-xs font-semibold text-[#0D9488] mt-1">
                    {item.condition} &mdash; {item.clinic}
                  </p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* 8. THREE UK CLINIC LOCATIONS — Unboxed, sharp-edged architectural layout */}
      <section className="py-16 sm:py-24 md:py-36 px-5 sm:px-6 md:px-10 bg-gradient-to-br from-[#F0FDFA] via-[#F8FAFC] to-[#EFF6FF] border-t border-slate-200/80">
        <div className="max-w-[1380px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-12 sm:mb-20">
            <div>
              <p className="text-xs font-bold tracking-wider uppercase text-[#0D9488] mb-3">
                Three UK Locations &middot; South West &amp; Cotswolds
              </p>
              <h2
                className="text-[clamp(2.25rem,4vw,3.5rem)] font-extrabold tracking-tight text-[#0F2942] leading-[1.08]"
                style={{ textWrap: 'balance' } as React.CSSProperties}
              >
                Find a Pulteney clinic <span className="text-[#0D9488]">near you.</span>
              </h2>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="origin-left h-1 w-24 rounded-full bg-gradient-to-r from-[#0D9488] to-[#0284C7] mt-5"
              />
            </div>
            <Link
              to="/demo/physio/contact"
              className="group inline-flex items-center gap-2 text-sm font-bold text-[#0284C7] hover:text-[#0F2942] transition-colors whitespace-nowrap"
            >
              Full Clinic Directions &amp; Booking
              <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 sm:gap-12 lg:gap-14">
            {ukLocations.map((loc, idx) => (
              <motion.div
                key={loc.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                className="group flex flex-col"
              >
                <div className="aspect-[16/10] overflow-hidden bg-slate-100 mb-5 sm:mb-6">
                  <img
                    src={loc.image}
                    alt={loc.clinicName}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                  />
                </div>

                <p className="text-xs font-bold tracking-wider uppercase text-[#0D9488] mb-2">
                  {loc.city} &middot; {loc.postcode}
                </p>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F2942] mb-2">
                  {loc.clinicName}
                </h3>
                <p className="text-sm text-slate-600 mb-5 sm:mb-6">
                  {loc.address}, {loc.postcode}
                </p>

                <div className="mt-auto pt-4 sm:pt-5 border-t border-slate-200/80 flex items-center justify-between gap-4">
                  <a
                    href={`tel:${loc.phoneHref}`}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#0F2942] hover:text-[#0D9488] transition-colors"
                  >
                    <Phone size={14} className="text-[#0D9488]" />
                    {loc.phoneDisplay}
                  </a>
                  <button
                    type="button"
                    onClick={() => triggerPhysioModal({ clinicId: loc.id })}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0D9488] hover:text-[#0F2942] transition-colors cursor-pointer"
                  >
                    Book at {loc.city}
                    <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PhysioFooter />
    </div>
  );
};

export default PhysioHome;
