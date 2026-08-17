import React, { useEffect } from 'react';
import { motion as framerMotion } from 'framer-motion';
// Fix react-router-dom missing exports
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { ArrowRight } from 'lucide-react';
import PhysioNavbar from './PhysioNavbar';
import PhysioFooter from './PhysioFooter';
import { clinic, fees, images } from './physioData';

// Fix motion types by casting to any
const motion = framerMotion as any;

const included = [
  'A written summary of what we found and what we are doing about it',
  'Your exercises filmed on your own phone, so you copy the right thing',
  'Messages between appointments answered by the physio who saw you',
  'An honest referral onward if you need a scan, a GP or a surgeon'
];

const conditions = [
  'Lower back pain and sciatica',
  'Neck pain and headaches',
  'Shoulder pain and frozen shoulder',
  'Knee pain, including after replacement',
  'Achilles and other tendon problems',
  'Running and cycling injuries',
  'Post-operative rehabilitation',
  'Hypermobility and joint instability',
  'Arthritis and staying active with it',
  'Falls, balance and strength in later life'
];

const PhysioPrices: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
  }, []);

  return (
    <div className="min-h-screen bg-[#F3F0EA] font-inter text-[#1D1C19] selection:bg-[#4A5D4E] selection:text-[#F3F0EA] overflow-x-hidden">
      <PhysioNavbar />

      {/* HEADER */}
      <section className="pt-40 md:pt-52 pb-16 md:pb-24 px-6 md:px-10">
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <p className="text-[9px] uppercase tracking-[0.42em] text-[#4A5D4E] mb-8">Treatments &amp; fees</p>
            <h1 className="font-serif text-[clamp(2.4rem,6vw,4.6rem)] tracking-[-0.02em]">
              Everything costs what it says here.
            </h1>
          </div>
          <p className="lg:col-span-4 text-[#6E6A62] leading-relaxed">
            No packages, no minimum course of treatment and no pressure to rebook. Pay at the end of each appointment by
            card or bank transfer.
          </p>
        </div>
      </section>

      {/* FEE LIST */}
      <section className="pb-24 md:pb-32 px-6 md:px-10">
        <div className="max-w-[1500px] mx-auto border-t border-[#E2DDD3]">
          {fees.map((fee, i) => (
            <motion.div
              key={fee.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.06 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 py-9 md:py-11 border-b border-[#E2DDD3] group hover:bg-[#FBFAF7] transition-colors duration-300 md:px-6 md:-mx-6"
            >
              <div className="md:col-span-4">
                <h2 className="font-serif text-2xl md:text-[1.75rem] mb-2">{fee.name}</h2>
                <p className="text-[9px] uppercase tracking-[0.42em] text-[#4A5D4E]">{fee.duration}</p>
              </div>
              <p className="md:col-span-6 text-[#6E6A62] leading-relaxed">{fee.detail}</p>
              <p className="md:col-span-2 font-serif text-3xl md:text-4xl md:text-right text-[#1D1C19]">{fee.price}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHAT'S INCLUDED + IMAGE */}
      <section className="pb-24 md:pb-32 px-6 md:px-10">
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] tracking-[-0.02em] mb-10">
              What the fee includes
            </h2>
            <ul className="border-t border-[#E2DDD3]">
              {included.map((item) => (
                <li key={item} className="py-6 border-b border-[#E2DDD3] text-[#6E6A62] leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="aspect-[5/4] overflow-hidden bg-[#E2DDD3]">
              <img
                src={images.care}
                alt="Hands-on care during an appointment"
                loading="lazy"
                width="1200"
                height="960"
                className="w-full h-full object-cover grayscale-[35%]"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* INSURANCE */}
      <section className="bg-[#FBFAF7] border-y border-[#E2DDD3] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <p className="text-[9px] uppercase tracking-[0.42em] text-[#4A5D4E] mb-7">Private health cover</p>
            <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] tracking-[-0.02em]">
              We invoice most insurers directly.
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-6 text-[#6E6A62] leading-relaxed max-w-2xl">
            <p>
              We are recognised by Bupa, AXA Health, Aviva, WPA and Vitality. Ring your insurer first, get an
              authorisation number and bring it with you &mdash; then there is nothing for you to pay on the day.
            </p>
            <p>
              If you are claiming through a solicitor or an employer scheme, tell us when you book and we will send the
              paperwork where it needs to go.
            </p>
            <p>
              Missed appointments and cancellations inside 24 hours are charged at the full rate. It is a small clinic,
              and an empty slot is a slot someone else needed.
            </p>
          </div>
        </div>
      </section>

      {/* CONDITIONS */}
      <section className="py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-[1500px] mx-auto">
          <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] tracking-[-0.02em] mb-14">
            Things we see most weeks
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-[#E2DDD3] border border-[#E2DDD3]">
            {conditions.map((c) => (
              <p key={c} className="bg-[#F3F0EA] px-7 py-8 text-[15px] text-[#1D1C19] leading-snug">
                {c}
              </p>
            ))}
          </div>
          <p className="mt-10 text-[#6E6A62] max-w-2xl leading-relaxed">
            Not on the list? Ring anyway. If it is not something we treat well, we will say so and point you at someone
            who does.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-10 pb-28 md:pb-40">
        <div className="max-w-[1500px] mx-auto bg-[#1D1C19] text-[#F3F0EA] px-8 md:px-16 py-16 md:py-24 flex flex-col lg:flex-row gap-10 lg:items-center lg:justify-between">
          <div>
            <h2 className="font-serif text-[clamp(1.8rem,4vw,3rem)] tracking-[-0.02em] mb-4">
              Book an initial assessment
            </h2>
            <p className="text-white/50 max-w-lg leading-relaxed">
              Fifty minutes, {fees[0].price}, and usually available the same week. Call {clinic.phoneDisplay} or send us a
              message.
            </p>
          </div>
          <Link
            to="/demo/physio/contact"
            className="group inline-flex items-center gap-5 px-10 py-5 bg-[#F3F0EA] text-[#1D1C19] text-[10px] uppercase tracking-[0.32em] hover:bg-[#4A5D4E] hover:text-[#F3F0EA] transition-colors duration-300 shrink-0 self-start"
          >
            Get in touch
            <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
        </div>
      </section>

      <PhysioFooter />
    </div>
  );
};

export default PhysioPrices;
