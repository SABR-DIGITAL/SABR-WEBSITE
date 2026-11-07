import React, { useEffect } from 'react';
import { motion as framerMotion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import PhysioNavbar, { triggerPhysioModal } from './PhysioNavbar';
import PhysioFooter from './PhysioFooter';
import { clinic, coreServices, fees } from './physioData';

// Fix motion types by casting to any
const motion = framerMotion as any;

const includedStandards = [
  'A clear written clinical diagnosis and recovery roadmap',
  'Your exercises filmed on your own phone for effortless home practice',
  'Direct telephone and email access to your treating physiotherapist',
  'Onward referral letters to your NHS GP or orthopaedic consultant when needed'
];

const PhysioPrices: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#0F2942] selection:bg-[#0D9488] selection:text-white overflow-x-hidden">
      <PhysioNavbar />

      {/* 1. SIGNATURE HEADER */}
      <section className="pt-24 sm:pt-32 md:pt-44 pb-12 sm:pb-16 md:pb-28 px-5 sm:px-6 md:px-10 bg-gradient-to-br from-[#F0FDFA] via-[#F8FAFC] to-[#EFF6FF]">
        <div className="max-w-[1380px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-end">
          <div className="lg:col-span-8">
            <p className="text-xs font-bold tracking-wider uppercase text-[#0D9488] mb-3">
              Treatments, Specialties &amp; Transparent UK Fees
            </p>
            <h1
              className="text-[clamp(2.1rem,5vw,4.25rem)] font-extrabold tracking-tight text-[#0F2942] leading-[1.06]"
              style={{ textWrap: 'balance' } as React.CSSProperties}
            >
              Specialist clinical care, <span className="text-[#0D9488]">clearly priced.</span>
            </h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="origin-left h-1 w-24 rounded-full bg-gradient-to-r from-[#0D9488] to-[#0284C7] mt-5 sm:mt-6"
            />
          </div>
          <p className="lg:col-span-4 text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed">
            No compulsory session blocks and no pressure to rebook. Pay per visit or claim directly through your UK private medical insurer across Bath, Bristol, and Cheltenham.
          </p>
        </div>
      </section>

      {/* 2. FLUID ALTERNATING TREATMENT CHAPTERS — Unboxed, calm, spacious */}
      <section className="py-16 sm:py-24 md:py-36 px-5 sm:px-6 md:px-10 bg-white">
        <div className="max-w-[1380px] mx-auto space-y-16 sm:space-y-28 md:space-y-40">
          {coreServices.map((service, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-12 lg:gap-20 items-center"
              >
                {/* Unboxed Image */}
                <div className={`lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={service.image}
                      alt={service.title}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-out"
                    />
                  </div>
                </div>

                {/* Unboxed Fluid Narrative */}
                <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <p className="text-xs font-bold tracking-wider uppercase text-[#0D9488] mb-2 sm:mb-3">
                    {service.number} &mdash; {service.category}
                  </p>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#0F2942] mb-4 sm:mb-5">
                    {service.title}
                  </h2>
                  <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
                    {service.fullDesc}
                  </p>

                  <div className="pt-5 sm:pt-6 border-t border-slate-200 flex items-center justify-between gap-4 sm:gap-6">
                    <div className="text-xs sm:text-sm font-medium text-slate-500">
                      <span>{service.duration}</span>
                      <span className="mx-2 sm:mx-2.5 text-[#0D9488]">&mdash;</span>
                      <strong className="text-base sm:text-lg font-extrabold text-[#0F2942] tabular-nums">
                        {service.price}
                      </strong>
                    </div>

                    <button
                      type="button"
                      onClick={() => triggerPhysioModal({ service: service.title })}
                      className="group inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0D9488] hover:text-[#0F2942] transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Book Session
                      <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* 3. OPEN FLUID FEE TARIFF — Hairlines only, zero outer box */}
      <section className="py-16 sm:py-24 md:py-36 px-5 sm:px-6 md:px-10 bg-gradient-to-br from-[#F0FDFA] via-[#F8FAFC] to-[#EFF6FF]">
        <div className="max-w-[1380px] mx-auto">
          <div className="max-w-2xl mb-10 sm:mb-16">
            <p className="text-xs font-bold tracking-wider uppercase text-[#0D9488] mb-3">
              2026 Appointment Tariff
            </p>
            <h2
              className="text-[clamp(2.25rem,4vw,3.5rem)] font-extrabold tracking-tight text-[#0F2942] leading-[1.08]"
              style={{ textWrap: 'balance' } as React.CSSProperties}
            >
              Self-pay fee <span className="text-[#0D9488]">schedule.</span>
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="origin-left h-1 w-24 rounded-full bg-gradient-to-r from-[#0D9488] to-[#0284C7] mt-5"
            />
          </div>

          <div className="border-t border-slate-300/80">
            {fees.map((fee, idx) => (
              <motion.div
                key={fee.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: idx * 0.05 }}
                className="py-7 sm:py-9 md:py-11 border-b border-slate-300/80 grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 md:gap-10 items-baseline"
              >
                <div className="md:col-span-4 flex items-baseline justify-between md:block gap-4">
                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-[#0F2942]">{fee.name}</h3>
                    <p className="text-xs font-bold tracking-wider uppercase text-[#0D9488] mt-1">
                      {fee.duration}
                    </p>
                  </div>
                  <span className="md:hidden text-xl font-extrabold text-[#0F2942] tabular-nums shrink-0">
                    {fee.price}
                  </span>
                </div>
                <p className="md:col-span-6 text-slate-600 text-sm sm:text-base leading-relaxed">{fee.detail}</p>
                <div className="hidden md:flex md:col-span-2 md:justify-end items-baseline gap-6">
                  <span className="text-2xl md:text-3xl font-extrabold text-[#0F2942] tabular-nums">
                    {fee.price}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. UNBOXED INCLUDED STANDARDS & UK INSURANCE */}
      <section className="py-16 sm:py-24 md:py-36 px-5 sm:px-6 md:px-10 bg-white">
        <div className="max-w-[1380px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 lg:gap-24">
          {/* Left: Included with every appointment */}
          <div className="lg:col-span-6">
            <p className="text-xs font-bold tracking-wider uppercase text-[#0D9488] mb-3">
              Clinical Standard
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#0F2942] mb-5 sm:mb-6">
              Included with <span className="text-[#0D9488]">every visit.</span>
            </h2>
            <div className="h-1 w-20 rounded-full bg-gradient-to-r from-[#0D9488] to-[#0284C7] mb-8 sm:mb-10" />

            <ul className="divide-y divide-slate-200 border-y border-slate-200">
              {includedStandards.map((item, idx) => (
                <li key={item} className="py-4 sm:py-5 flex items-baseline gap-4 sm:gap-5 text-sm sm:text-base text-slate-600">
                  <span className="text-xs font-bold text-[#0D9488] tabular-nums shrink-0">
                    0{idx + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Private Health Insurance */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold tracking-wider uppercase text-[#0284C7] mb-3">
                UK Private Medical Insurance
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#0F2942] mb-5 sm:mb-6">
                We invoice insurers <span className="text-[#0D9488]">directly.</span>
              </h2>
              <div className="h-1 w-20 rounded-full bg-gradient-to-r from-[#0D9488] to-[#0284C7] mb-8 sm:mb-10" />

              <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
                All three Pulteney Physiotherapy clinics in Bath, Bristol, and Cheltenham are recognised providers with the UK&rsquo;s leading medical insurers. Bring your policy number and authorisation code to your first visit and we take care of the rest.
              </p>

              <p className="text-xs sm:text-sm font-bold text-[#0F2942] tracking-wide mb-8 sm:mb-10">
                Bupa &mdash; AXA Health &mdash; Aviva &mdash; Vitality &mdash; WPA &mdash; Simplyhealth
              </p>
            </div>

            <div className="pt-6 sm:pt-8 border-t border-slate-200 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-between gap-4">
              <a
                href={`tel:${clinic.phoneHref}`}
                className="inline-flex items-center justify-center sm:justify-start gap-2 text-sm font-bold text-[#0F2942] hover:text-[#0D9488] transition-colors py-2 sm:py-0"
              >
                <Phone size={15} className="text-[#0D9488]" />
                {clinic.phoneDisplay}
              </a>
              <button
                type="button"
                onClick={() => triggerPhysioModal()}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#0D9488] hover:bg-[#0F2942] text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                Request an Appointment
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <PhysioFooter />
    </div>
  );
};

export default PhysioPrices;
