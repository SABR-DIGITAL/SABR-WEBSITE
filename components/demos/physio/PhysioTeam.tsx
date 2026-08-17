import React, { useEffect } from 'react';
import { motion as framerMotion } from 'framer-motion';
// Fix react-router-dom missing exports
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { ArrowRight } from 'lucide-react';
import PhysioNavbar from './PhysioNavbar';
import PhysioFooter from './PhysioFooter';
import { clinic, team } from './physioData';

// Fix motion types by casting to any
const motion = framerMotion as any;

const principles = [
  {
    title: 'One physio, start to finish',
    copy: 'You see the same person every appointment. Nobody has to read someone else&rsquo;s notes and guess.'
  },
  {
    title: 'Fifty minutes to begin with',
    copy: 'Long enough to take a proper history, examine you properly and explain what we found before you leave.'
  },
  {
    title: 'We discharge people',
    copy: 'When you no longer need us we say so. Rebooking forever is good for a clinic and bad for a patient.'
  }
];

const PhysioTeam: React.FC = () => {
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
            <p className="text-[9px] uppercase tracking-[0.42em] text-[#4A5D4E] mb-8">Our team</p>
            <h1 className="font-serif text-[clamp(2.4rem,6vw,4.6rem)] tracking-[-0.02em]">
              Four people. That is the whole clinic.
            </h1>
          </div>
          <p className="lg:col-span-4 text-[#6E6A62] leading-relaxed">
            Every one of us is registered with the Health and Care Professions Council and a member of the Chartered
            Society of Physiotherapy. Ask to see the certificates &mdash; they are on the wall.
          </p>
        </div>
      </section>

      {/* TEAM GRID */}
      <section className="pb-24 md:pb-32 px-6 md:px-10">
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {team.map((person, i) => (
            <motion.article
              key={person.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: (i % 2) * 0.08 }}
              className="group"
            >
              <div className="aspect-[4/5] overflow-hidden bg-[#E2DDD3] mb-8">
                <img
                  src={person.photo}
                  alt={person.name}
                  loading="lazy"
                  width="900"
                  height="1125"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[1.2s] ease-out"
                  decoding="async"
                />
              </div>
              <h2 className="font-serif text-[1.75rem] md:text-3xl mb-2">{person.name}</h2>
              <p className="text-[9px] uppercase tracking-[0.36em] text-[#4A5D4E] mb-6">{person.role}</p>
              <p className="text-[#6E6A62] leading-relaxed mb-7 max-w-lg">{person.bio}</p>
              <div className="pt-6 border-t border-[#E2DDD3] max-w-lg">
                <p className="text-[9px] uppercase tracking-[0.36em] text-[#4A5D4E] mb-2">Usually sees</p>
                <p className="text-[15px] text-[#1D1C19]">{person.focus}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="bg-[#FBFAF7] border-y border-[#E2DDD3] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-[1500px] mx-auto">
          <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] tracking-[-0.02em] mb-14 max-w-2xl">
            How we run the place
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#E2DDD3] border border-[#E2DDD3]">
            {principles.map((p) => (
              <div key={p.title} className="bg-[#FBFAF7] p-9 md:p-12">
                <h3 className="font-serif text-xl md:text-2xl mb-5">{p.title}</h3>
                <p
                  className="text-[#6E6A62] leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: p.copy }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-36 px-6 md:px-10">
        <div className="max-w-[1500px] mx-auto flex flex-col lg:flex-row gap-10 lg:items-end lg:justify-between">
          <div>
            <h2 className="font-serif text-[clamp(1.8rem,4vw,3rem)] tracking-[-0.02em] mb-5">
              Not sure who you should see?
            </h2>
            <p className="text-[#6E6A62] max-w-xl leading-relaxed">
              Tell us what the problem is when you call and we will put you with whoever knows it best. If that is not
              us at all, we will say so.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <a
              href={`tel:${clinic.phoneHref}`}
              className="inline-flex items-center justify-center px-9 py-5 border border-[#1D1C19]/20 text-[10px] uppercase tracking-[0.32em] hover:border-[#1D1C19] transition-colors duration-300"
            >
              {clinic.phoneDisplay}
            </a>
            <Link
              to="/demo/physio/contact"
              className="group inline-flex items-center justify-center gap-4 px-9 py-5 bg-[#1D1C19] text-[#F3F0EA] text-[10px] uppercase tracking-[0.32em] hover:bg-[#4A5D4E] transition-colors duration-300"
            >
              Book an assessment
              <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      <PhysioFooter />
    </div>
  );
};

export default PhysioTeam;
