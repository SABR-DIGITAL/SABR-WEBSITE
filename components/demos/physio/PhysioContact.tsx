import React, { useState, useEffect } from 'react';
import { motion as framerMotion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import ExitPreviewButton from '../../ExitPreviewButton';
import PhysioNavbar from './PhysioNavbar';
import PhysioFooter from './PhysioFooter';
import { clinic, openingHours, fees, team, images } from './physioData';

// Fix motion types by casting to any
const motion = framerMotion as any;

const gettingHere = [
  {
    label: 'On foot',
    copy: 'Five minutes from Bath Spa station, two from Pulteney Bridge. The door is between the gallery and the bookshop.'
  },
  {
    label: 'Parking',
    copy: 'Metered bays on Argyle Street and Henrietta Street. The Podium car park is a four-minute walk.'
  },
  {
    label: 'Access',
    copy: 'The ground-floor room and the rehab studio are step-free. Tell us when you book and we will use them.'
  }
];

const inputClass =
  'w-full bg-transparent border-b border-[#E2DDD3] py-4 text-[#1D1C19] placeholder:text-[#A9A398] focus:outline-none focus:border-[#4A5D4E] transition-colors duration-300';

const PhysioContact: React.FC = () => {
  const [sent, setSent] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-[#F3F0EA] font-inter text-[#1D1C19] selection:bg-[#4A5D4E] selection:text-[#F3F0EA] overflow-x-hidden">
      <ExitPreviewButton />
      <PhysioNavbar />

      {/* HEADER */}
      <section className="pt-40 md:pt-52 pb-16 md:pb-24 px-6 md:px-10">
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <p className="text-[9px] uppercase tracking-[0.42em] text-[#4A5D4E] mb-8">Contact</p>
            <h1 className="font-serif text-[clamp(2.4rem,6vw,4.6rem)] tracking-[-0.02em]">
              Book in, or just ask us first.
            </h1>
          </div>
          <p className="lg:col-span-4 text-[#6E6A62] leading-relaxed">
            The phone is answered by whichever physiotherapist is between patients. Messages sent overnight are
            answered before nine the next working morning.
          </p>
        </div>
      </section>

      {/* DETAILS STRIP */}
      <section className="pb-20 md:pb-28 px-6 md:px-10">
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#E2DDD3] border border-[#E2DDD3]">
          <div className="bg-[#F3F0EA] p-8 md:p-10">
            <p className="text-[9px] uppercase tracking-[0.42em] text-[#4A5D4E] mb-5">Telephone</p>
            <a href={`tel:${clinic.phoneHref}`} className="font-serif text-2xl hover:text-[#4A5D4E] transition-colors">
              {clinic.phoneDisplay}
            </a>
            <p className="mt-4 text-sm text-[#6E6A62] leading-relaxed">Fastest way to get an urgent slot.</p>
          </div>

          <div className="bg-[#F3F0EA] p-8 md:p-10">
            <p className="text-[9px] uppercase tracking-[0.42em] text-[#4A5D4E] mb-5">Email</p>
            <a
              href={`mailto:${clinic.email}`}
              className="font-serif text-xl md:text-[1.35rem] break-words hover:text-[#4A5D4E] transition-colors"
            >
              {clinic.email}
            </a>
            <p className="mt-4 text-sm text-[#6E6A62] leading-relaxed">Good for insurance and referral paperwork.</p>
          </div>

          <div className="bg-[#F3F0EA] p-8 md:p-10">
            <p className="text-[9px] uppercase tracking-[0.42em] text-[#4A5D4E] mb-5">The clinic</p>
            <address className="not-italic font-serif text-xl md:text-[1.35rem] leading-snug">
              {clinic.addressLine1}
              <br />
              {clinic.addressLine2} {clinic.postcode}
            </address>
            <p className="mt-4 text-sm text-[#6E6A62] leading-relaxed">Ground floor, step-free entrance.</p>
          </div>

          <div className="bg-[#F3F0EA] p-8 md:p-10">
            <p className="text-[9px] uppercase tracking-[0.42em] text-[#4A5D4E] mb-5">Opening hours</p>
            <ul className="space-y-2.5">
              {openingHours.map((row) => (
                <li key={row.days} className="flex justify-between gap-4 text-sm">
                  <span className="text-[#1D1C19]">{row.days}</span>
                  <span className="text-[#6E6A62] whitespace-nowrap">{row.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FORM + SIDE PANEL */}
      <section className="pb-24 md:pb-32 px-6 md:px-10">
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">

          {/* FORM */}
          <div className="lg:col-span-7">
            <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.6rem)] tracking-[-0.02em] mb-4">
              Request an appointment
            </h2>
            <p className="text-[#6E6A62] leading-relaxed mb-12 max-w-xl">
              Tell us roughly what is going on and when you can get here. We will come back with two or three times
              that fit, not a booking system that fills your inbox.
            </p>

            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-[#E2DDD3] bg-[#FBFAF7] p-10 md:p-14"
                >
                  <span className="w-12 h-12 flex items-center justify-center bg-[#4A5D4E] text-[#F3F0EA] mb-7">
                    <Check size={22} />
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl mb-4">Thank you &mdash; that has come through.</h3>
                  <p className="text-[#6E6A62] leading-relaxed max-w-md">
                    In a live clinic site this would land in the practice inbox and be answered the same working day.
                    This page is a design demonstration, so nothing has actually been sent.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-9 text-[10px] uppercase tracking-[0.32em] text-[#4A5D4E] border-b border-[#4A5D4E]/40 pb-1 hover:border-[#4A5D4E] transition-colors"
                  >
                    Show the form again
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  className="space-y-9"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-9">
                    <div>
                      <label htmlFor="name" className="block text-[9px] uppercase tracking-[0.42em] text-[#4A5D4E] mb-1">
                        Your name
                      </label>
                      <input id="name" name="name" type="text" required placeholder="Jane Marshall" className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-[9px] uppercase tracking-[0.42em] text-[#4A5D4E] mb-1">
                        Phone
                      </label>
                      <input id="phone" name="phone" type="tel" required placeholder="07000 000000" className={inputClass} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-[9px] uppercase tracking-[0.42em] text-[#4A5D4E] mb-1">
                      Email
                    </label>
                    <input id="email" name="email" type="email" required placeholder="jane@example.co.uk" className={inputClass} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-9">
                    <div>
                      <label htmlFor="service" className="block text-[9px] uppercase tracking-[0.42em] text-[#4A5D4E] mb-1">
                        What you need
                      </label>
                      <select id="service" name="service" className={`${inputClass} cursor-pointer`} defaultValue={fees[0].name}>
                        {fees.map((fee) => (
                          <option key={fee.name} value={fee.name}>
                            {fee.name} &mdash; {fee.price}
                          </option>
                        ))}
                        <option value="Not sure">Not sure yet</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="physio" className="block text-[9px] uppercase tracking-[0.42em] text-[#4A5D4E] mb-1">
                        Preferred physiotherapist
                      </label>
                      <select id="physio" name="physio" className={`${inputClass} cursor-pointer`} defaultValue="No preference">
                        <option value="No preference">No preference</option>
                        {team.map((person) => (
                          <option key={person.name} value={person.name}>
                            {person.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-[9px] uppercase tracking-[0.42em] text-[#4A5D4E] mb-1">
                      What is the problem?
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      placeholder="Where it hurts, how long it has been going on, and which days suit you."
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-6 pt-2">
                    <button
                      type="submit"
                      className="group inline-flex items-center justify-center gap-5 px-10 py-5 bg-[#1D1C19] text-[#F3F0EA] text-[10px] uppercase tracking-[0.32em] hover:bg-[#4A5D4E] transition-colors duration-300"
                    >
                      Send request
                      <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                    </button>
                    <p className="text-xs text-[#6E6A62] leading-relaxed max-w-xs">
                      We keep what you tell us confidential and never pass it on.
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* SIDE */}
          <aside className="lg:col-span-5 space-y-10">
            <div className="aspect-[4/3] overflow-hidden bg-[#E2DDD3]">
              <img
                src={images.studio}
                alt="The rehabilitation studio"
                loading="lazy"
                width="1200"
                height="900"
                className="w-full h-full object-cover grayscale-[35%]"
              />
            </div>

            <div className="border-t border-[#E2DDD3]">
              {gettingHere.map((row) => (
                <div key={row.label} className="py-7 border-b border-[#E2DDD3]">
                  <p className="text-[9px] uppercase tracking-[0.42em] text-[#4A5D4E] mb-3">{row.label}</p>
                  <p className="text-[#6E6A62] leading-relaxed">{row.copy}</p>
                </div>
              ))}
            </div>

            <div className="bg-[#1D1C19] text-[#F3F0EA] p-9 md:p-11">
              <p className="text-[9px] uppercase tracking-[0.42em] text-white/40 mb-5">In pain today?</p>
              <p className="text-white/70 leading-relaxed mb-8">
                We hold slots back each morning for people who cannot wait. Ring rather than email &mdash; those
                appointments go on the phone.
              </p>
              <a
                href={`tel:${clinic.phoneHref}`}
                className="inline-flex items-center gap-4 font-serif text-2xl md:text-[1.75rem] hover:text-[#B9C7B4] transition-colors"
              >
                {clinic.phoneDisplay}
              </a>
            </div>
          </aside>
        </div>
      </section>

      <PhysioFooter />
    </div>
  );
};

export default PhysioContact;
