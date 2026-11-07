import React, { useEffect } from 'react';
import { motion as framerMotion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import PhysioNavbar, { triggerPhysioModal } from './PhysioNavbar';
import PhysioFooter from './PhysioFooter';
import { team, ukLocations } from './physioData';

// Fix motion types by casting to any
const motion = framerMotion as any;

const clinicalValues = [
  {
    number: '01',
    title: 'One Physiotherapist, Start to Finish',
    copy: 'You see the same HCPC-registered specialist at every visit. No repeating your medical story to a new face each week.'
  },
  {
    number: '02',
    title: '50-Minute First Assessments',
    copy: 'Proper time to listen to your history, test your movement thoroughly, explain our diagnosis in plain English, and begin treatment on day one.'
  },
  {
    number: '03',
    title: 'Honest Clinical Discharge',
    copy: 'Our goal is to get you independent and back to what you love in four to six sessions — never to keep you rebooking unnecessarily.'
  }
];

const PhysioTeam: React.FC = () => {
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
              Our Clinical Team &amp; 3 UK Clinics
            </p>
            <h1
              className="text-[clamp(2.1rem,5vw,4.25rem)] font-extrabold tracking-tight text-[#0F2942] leading-[1.06]"
              style={{ textWrap: 'balance' } as React.CSSProperties}
            >
              Experienced specialists across <span className="text-[#0D9488]">Bath, Bristol &amp; Cheltenham.</span>
            </h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="origin-left h-1 w-24 rounded-full bg-gradient-to-r from-[#0D9488] to-[#0284C7] mt-5 sm:mt-6"
            />
          </div>
          <p className="lg:col-span-4 text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed">
            Every clinician at Pulteney Physiotherapy holds senior NHS or elite sports experience, is registered with the Health and Care Professions Council (HCPC), and is a Chartered Member of the CSP.
          </p>
        </div>
      </section>

      {/* 2. TEAM DIRECTORY — Sharp square-shaped portraits, zero curved edges, unboxed */}
      <section className="py-16 sm:py-24 md:py-36 px-5 sm:px-6 md:px-10 bg-white">
        <div className="max-w-[1380px] mx-auto">
          <div className="max-w-2xl mb-12 sm:mb-20">
            <p className="text-xs font-bold tracking-wider uppercase text-[#0D9488] mb-3">
              Meet Your Clinicians
            </p>
            <h2
              className="text-[clamp(2.25rem,4vw,3.5rem)] font-extrabold tracking-tight text-[#0F2942] leading-[1.08]"
              style={{ textWrap: 'balance' } as React.CSSProperties}
            >
              Chartered physiotherapists &amp; <span className="text-[#0D9488]">rehab leads.</span>
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="origin-left h-1 w-24 rounded-full bg-gradient-to-r from-[#0D9488] to-[#0284C7] mt-5"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 lg:gap-x-20 gap-y-14 sm:gap-y-20 md:gap-y-28">
            {team.map((person, idx) => (
              <motion.article
                key={person.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.75, delay: (idx % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col"
              >
                {/* Sharp square portrait — rounded-none */}
                <div className="aspect-square overflow-hidden bg-slate-100 rounded-none mb-6 sm:mb-8">
                  <img
                    src={person.photo}
                    alt={person.name}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                  />
                </div>

                <p className="text-xs font-bold tracking-wider uppercase text-[#0D9488] mb-2">
                  {person.location}
                </p>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-[#0F2942] mb-1.5">
                  {person.name}
                </h3>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 sm:mb-5">
                  {person.role}
                </p>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-5 sm:mb-6">
                  {person.bio}
                </p>

                <div className="mt-auto pt-4 sm:pt-5 border-t border-slate-200 flex items-center justify-between gap-4">
                  <span className="text-xs font-medium text-slate-500">{person.focus}</span>
                  <button
                    type="button"
                    onClick={() => triggerPhysioModal()}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#0D9488] hover:text-[#0F2942] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    Book with {person.name.split(' ')[0]}
                    <ArrowRight size={14} />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. OUR 3 UK CLINICS — Sharp square-edged architectural blocks */}
      <section className="py-16 sm:py-24 md:py-36 px-5 sm:px-6 md:px-10 bg-gradient-to-br from-[#F0FDFA] via-[#F8FAFC] to-[#EFF6FF]">
        <div className="max-w-[1380px] mx-auto">
          <div className="max-w-2xl mb-12 sm:mb-20">
            <p className="text-xs font-bold tracking-wider uppercase text-[#0D9488] mb-3">
              Three UK Clinics
            </p>
            <h2
              className="text-[clamp(2.25rem,4vw,3.5rem)] font-extrabold tracking-tight text-[#0F2942] leading-[1.08]"
              style={{ textWrap: 'balance' } as React.CSSProperties}
            >
              Our South West &amp; <span className="text-[#0D9488]">Cotswolds locations.</span>
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="origin-left h-1 w-24 rounded-full bg-gradient-to-r from-[#0D9488] to-[#0284C7] mt-5"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 sm:gap-12 lg:gap-14">
            {ukLocations.map((loc, idx) => (
              <motion.div
                key={loc.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                className="flex flex-col"
              >
                {/* Sharp square-edged image */}
                <div className="aspect-square overflow-hidden bg-slate-100 rounded-none mb-5 sm:mb-7">
                  <img
                    src={loc.image}
                    alt={loc.clinicName}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-out"
                  />
                </div>

                <p className="text-xs font-bold tracking-wider uppercase text-[#0D9488] mb-2">
                  {loc.city} &mdash; {loc.postcode}
                </p>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F2942] mb-2">{loc.clinicName}</h3>
                <p className="text-sm text-slate-600 mb-3">
                  {loc.address}, {loc.postcode}
                </p>
                <p className="text-xs text-slate-500 leading-relaxed mb-5 sm:mb-6">{loc.parkingAndAccess}</p>

                <div className="mt-auto pt-4 sm:pt-5 border-t border-slate-300/80 flex items-center justify-between gap-4">
                  <a
                    href={`tel:${loc.phoneHref}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F2942] hover:text-[#0D9488]"
                  >
                    <Phone size={13} className="text-[#0D9488]" />
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

      {/* 4. OUR PRACTICE STANDARDS — Floating, unboxed luxury columns */}
      <section className="py-16 sm:py-24 md:py-36 px-5 sm:px-6 md:px-10 bg-white">
        <div className="max-w-[1380px] mx-auto">
          <div className="max-w-2xl mb-12 sm:mb-20">
            <p className="text-xs font-bold tracking-wider uppercase text-[#0D9488] mb-3">
              Our Practice Standards
            </p>
            <h2
              className="text-[clamp(2.25rem,4vw,3.5rem)] font-extrabold tracking-tight text-[#0F2942] leading-[1.08]"
              style={{ textWrap: 'balance' } as React.CSSProperties}
            >
              How we run <span className="text-[#0D9488]">every clinic.</span>
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="origin-left h-1 w-24 rounded-full bg-gradient-to-r from-[#0D9488] to-[#0284C7] mt-5"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-14 lg:gap-20">
            {clinicalValues.map((val, idx) => (
              <motion.div
                key={val.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                className="flex flex-col items-start pt-6 sm:pt-8 border-t border-slate-200"
              >
                <span className="text-xs font-bold tracking-[0.22em] text-[#0D9488] tabular-nums mb-3 sm:mb-4">
                  {val.number}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0F2942] mb-3 sm:mb-4">
                  {val.title}
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{val.copy}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PhysioFooter />
    </div>
  );
};

export default PhysioTeam;
