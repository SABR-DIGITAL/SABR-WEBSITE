import React, { useEffect, useState } from 'react';
import { motion as framerMotion, AnimatePresence } from 'framer-motion';
import { Plus, ArrowRight, Phone } from 'lucide-react';
import PhysioNavbar, { triggerPhysioModal } from './PhysioNavbar';
import PhysioFooter from './PhysioFooter';
import { clinic, fees } from './physioData';

// Fix motion types by casting to any
const motion = framerMotion as any;

const whatToExpectSteps = [
  {
    step: '01',
    title: 'UK Direct Access',
    desc: 'Book directly at Bath, Bristol, or Cheltenham without waiting for a GP referral. If using private medical insurance, simply ring your insurer first for an authorisation code.'
  },
  {
    step: '02',
    title: '50-Minute First Assessment',
    desc: 'We listen to your story, perform a thorough orthopaedic and movement examination, explain our diagnosis in plain English, and start hands-on treatment on day one.'
  },
  {
    step: '03',
    title: 'Personalised Rehab Plan',
    desc: 'You leave with three or four targeted exercises filmed on your phone and a clear written recovery roadmap. Most patients complete their recovery in four to six sessions.'
  }
];

const groups = [
  {
    label: 'Before Your Visit',
    items: [
      {
        q: 'Do I need a referral from my NHS GP before booking?',
        a: 'No. Under UK Direct Access rules, you can book straight in with our Chartered Physiotherapists at Bath, Bristol, or Cheltenham. Only certain private medical insurance policies ask for a GP note.'
      },
      {
        q: 'How quickly can I get an appointment?',
        a: 'We generally have space within 24 to 48 hours across all three clinics, including 7:30am morning slots, evening sessions until 8:00pm, and Saturday mornings. We also hold two urgent acute-pain slots every morning.'
      },
      {
        q: 'What should I wear to my session?',
        a: 'Comfortable clothing you can move easily in. Shorts and trainers are ideal for knee, hip, or running assessments; a vest top works well for neck or shoulder care. Private changing rooms and spare shorts are available in every clinic.'
      }
    ]
  },
  {
    label: 'Treatment & Rehabilitation',
    items: [
      {
        q: 'What happens during the 50-minute initial assessment?',
        a: 'Your physiotherapist takes a full history, examines your joint and movement mechanics, explains clearly what is causing the discomfort, begins hands-on manual therapy in the room, and sets up your tailored rehabilitation programme.'
      },
      {
        q: 'How many appointments will I need?',
        a: 'Most musculoskeletal aches and sports injuries resolve within four to six appointments. Post-operative joint replacements or ligament reconstructions take longer, and we outline a realistic timeline at your first visit.'
      },
      {
        q: 'Which clinic has the heated hydrotherapy pool?',
        a: 'Our 34°C indoor hydrotherapy pool is at our Bath — Pulteney Bridge Clinic. Patients visiting our Bristol (Clifton) or Cheltenham (Montpellier) clinics are also welcome to book hydrotherapy sessions in Bath as part of their care.'
      }
    ]
  },
  {
    label: 'Fees, Insurance & Access',
    items: [
      {
        q: 'What do appointments cost?',
        a: `An initial 50-minute assessment is ${fees[0].price} and 30-minute follow-ups are ${fees[1].price}. Specialist 50-minute sports biomechanics sessions are ${fees[2].price} and hydrotherapy sessions are ${fees[3].price}.`
      },
      {
        q: 'Which UK private medical insurers do you invoice directly?',
        a: 'We are recognised by Bupa, AXA Health, Aviva, Vitality, WPA, and Simplyhealth, and we invoice them directly so there is nothing to pay on the day (subject to any policy excess).'
      },
      {
        q: 'Is there step-free access and parking at all three clinics?',
        a: 'Yes. All three clinics in Bath, Bristol, and Cheltenham have step-free ground-floor treatment rooms. Our Cheltenham clinic has dedicated patient parking at the rear, while Bath and Bristol have pay-and-display bays right outside.'
      }
    ]
  }
];

const PhysioFAQ: React.FC = () => {
  const [open, setOpen] = useState<string | null>('0-0');

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#0F2942] selection:bg-[#0D9488] selection:text-white overflow-x-hidden">
      <PhysioNavbar />

      {/* 1. SIGNATURE HEADER ("Everything you need to know before your visit.") */}
      <section className="pt-24 sm:pt-32 md:pt-44 pb-12 sm:pb-16 md:pb-28 px-5 sm:px-6 md:px-10 bg-gradient-to-br from-[#F0FDFA] via-[#F8FAFC] to-[#EFF6FF]">
        <div className="max-w-[1380px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-end">
          <div className="lg:col-span-8">
            <p className="text-xs font-bold tracking-wider uppercase text-[#0D9488] mb-3">
              Patient Information, Direct Access &amp; FAQs
            </p>
            <h1
              className="text-[clamp(2.1rem,5vw,4.25rem)] font-extrabold tracking-tight text-[#0F2942] leading-[1.06]"
              style={{ textWrap: 'balance' } as React.CSSProperties}
            >
              Everything you need to know <span className="text-[#0D9488]">before your visit.</span>
            </h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="origin-left h-1 w-24 rounded-full bg-gradient-to-r from-[#0D9488] to-[#0284C7] mt-5 sm:mt-6"
            />
          </div>
          <p className="lg:col-span-4 text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed">
            Have a question not covered below? Ring our central reception on{' '}
            <a href={`tel:${clinic.phoneHref}`} className="font-bold text-[#0284C7] hover:underline">
              {clinic.phoneDisplay}
            </a>{' '}
            and speak directly with one of our physiotherapists.
          </p>
        </div>
      </section>

      {/* 2. WHAT TO EXPECT — Floating, unboxed luxury columns */}
      <section className="py-16 sm:py-24 md:py-36 px-5 sm:px-6 md:px-10 bg-white">
        <div className="max-w-[1380px] mx-auto">
          <div className="max-w-2xl mb-12 sm:mb-20">
            <p className="text-xs font-bold tracking-wider uppercase text-[#0D9488] mb-3">
              What To Expect
            </p>
            <h2
              className="text-[clamp(2.25rem,4vw,3.5rem)] font-extrabold tracking-tight text-[#0F2942] leading-[1.08]"
              style={{ textWrap: 'balance' } as React.CSSProperties}
            >
              Your recovery journey, <span className="text-[#0D9488]">step by step.</span>
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
            {whatToExpectSteps.map((s, idx) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                className="flex flex-col items-start pt-6 sm:pt-8 border-t border-slate-200"
              >
                <span className="text-xs font-bold tracking-[0.22em] text-[#0D9488] tabular-nums mb-3 sm:mb-4">
                  {s.step}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0F2942] mb-3 sm:mb-4">
                  {s.title}
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. OPEN EDITORIAL FAQ ACCORDIONS — Zero boxes, spacious hairlines */}
      <section className="py-16 sm:py-24 md:py-40 px-5 sm:px-6 md:px-10 bg-gradient-to-br from-[#F0FDFA] via-[#F8FAFC] to-[#EFF6FF]">
        <div className="max-w-[1380px] mx-auto space-y-16 sm:space-y-24 md:space-y-32">
          {groups.map((group, gi) => (
            <div key={group.label} className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-10 lg:gap-16 items-start">
              <div className="lg:col-span-4 lg:sticky lg:top-32">
                <p className="text-xs font-bold tracking-wider uppercase text-[#0D9488] mb-2">
                  0{gi + 1} &mdash; Patient Guide
                </p>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#0F2942]">
                  {group.label}
                </h2>
                <div className="h-1 w-16 rounded-full bg-gradient-to-r from-[#0D9488] to-[#0284C7] mt-4" />
              </div>

              <div className="lg:col-span-8 border-t border-slate-300/80">
                {group.items.map((item, ii) => {
                  const id = `${gi}-${ii}`;
                  const isOpen = open === id;
                  return (
                    <div key={item.q} className="border-b border-slate-300/80">
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : id)}
                        aria-expanded={isOpen}
                        className="w-full flex items-center justify-between gap-4 sm:gap-8 text-left py-6 sm:py-8 md:py-9 group cursor-pointer"
                      >
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-[#0F2942] group-hover:text-[#0D9488] transition-colors">
                          {item.q}
                        </h3>
                        <span
                          className={`shrink-0 w-9 h-9 flex items-center justify-center transition-all duration-300 ${
                            isOpen
                              ? 'rotate-45 bg-[#0D9488] text-white'
                              : 'text-[#0F2942] group-hover:text-[#0D9488]'
                          }`}
                        >
                          <Plus size={18} />
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="pb-7 sm:pb-9 pr-2 sm:pr-12 text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed max-w-3xl">
                              {item.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. UNBOXED LUXURY CLOSING SECTION */}
      <section className="py-16 sm:py-24 md:py-32 px-5 sm:px-6 md:px-10 bg-white">
        <div className="max-w-[1380px] mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-8 sm:gap-12">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-wider uppercase text-[#0D9488] mb-3">
              Complimentary 15-Minute Screen
            </p>
            <h2
              className="text-[clamp(2.25rem,4vw,3.5rem)] font-extrabold tracking-tight text-[#0F2942] leading-[1.08]"
              style={{ textWrap: 'balance' } as React.CSSProperties}
            >
              Still unsure if physiotherapy <span className="text-[#0D9488]">is right for you?</span>
            </h2>
            <p className="mt-4 sm:mt-5 text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed">
              Ring us or book a free 15-minute injury screen at Bath, Bristol, or Cheltenham.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3.5 sm:gap-5 shrink-0">
            <a
              href={`tel:${clinic.phoneHref}`}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 border border-slate-300 text-[#0F2942] hover:border-[#0F2942] text-sm font-bold transition-colors whitespace-nowrap"
            >
              <Phone size={15} className="text-[#0D9488]" />
              {clinic.phoneDisplay}
            </a>
            <button
              type="button"
              onClick={() => triggerPhysioModal()}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#0D9488] hover:bg-[#0F2942] text-white text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
            >
              Request an Appointment
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      <PhysioFooter />
    </div>
  );
};

export default PhysioFAQ;
