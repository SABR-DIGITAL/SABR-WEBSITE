import React, { useEffect } from 'react';
import { motion as framerMotion } from 'framer-motion';
// Fix react-router-dom missing exports
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import PhysioNavbar from './PhysioNavbar';
import PhysioFooter from './PhysioFooter';
import { clinic, images } from './physioData';

// Fix motion types by casting to any
const motion = framerMotion as any;

const rise = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const treatments = [
  {
    index: '01',
    title: 'Hands-on treatment',
    image: images.handsOn,
    copy: 'Joint mobilisation, soft tissue work, dry needling and taping. Used to settle pain quickly so you can start moving again, never as a treatment on its own.'
  },
  {
    index: '02',
    title: 'Assessment and diagnosis',
    image: images.assessment,
    copy: 'Fifty minutes to find out what is actually going on, including a look at any scans you already have. You leave with a diagnosis in plain English and a plan on paper.'
  },
  {
    index: '03',
    title: 'Rehabilitation',
    image: images.studio,
    copy: 'Loading, strength and return-to-sport work in our studio next door. This is the part that stops the problem coming back in six months.'
  }
];

const steps = [
  {
    number: '01',
    title: 'Get in touch',
    copy: 'Call, email or book online. You do not need a GP referral to see us, and we will tell you honestly if we are not the right people.'
  },
  {
    number: '02',
    title: 'Full assessment',
    copy: 'Fifty minutes with one physiotherapist who stays with you for the whole course of treatment. No rotating through the team.'
  },
  {
    number: '03',
    title: 'Treatment and a plan',
    copy: 'Hands-on work in the room, then a short set of exercises that fit around your week rather than the other way round.'
  },
  {
    number: '04',
    title: 'Back to it',
    copy: 'Most people need four to six appointments. We discharge you when you are ready and leave the door open if it flares.'
  }
];

const stories = [
  {
    quote: 'I had put up with the shoulder for two years and assumed surgery was next. Six sessions later I was back swimming at the Rec.',
    name: 'Helen M.',
    detail: 'Rotator cuff pain',
    place: 'Widcombe'
  },
  {
    quote: 'Daniel watched me run, changed two things, and the shin pain that had ruined my last three attempts at a marathon simply went.',
    name: 'Chris T.',
    detail: 'Shin splints, marathon training',
    place: 'Larkhall'
  },
  {
    quote: 'After my knee replacement the hospital gave me a sheet of exercises. Here they actually watched me do them and fixed what I was getting wrong.',
    name: 'Brian K.',
    detail: 'Post-operative knee rehab',
    place: 'Combe Down'
  }
];

const credentials = [
  'HCPC registered',
  'Chartered Society of Physiotherapy',
  'Recognised by Bupa, AXA and Aviva',
  'No GP referral needed'
];

const PhysioHome: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
  }, []);

  return (
    <div className="min-h-screen bg-[#F3F0EA] font-inter text-[#1D1C19] selection:bg-[#4A5D4E] selection:text-[#F3F0EA] overflow-x-hidden">
      <PhysioNavbar />

      {/* HERO — the navbar is fixed and about 97px tall unscrolled (a 41px
          lockup inside py-7), so the top padding is 112px: enough to clear it
          and nothing more. Anything larger leaves a band of empty paper between
          the navbar and the photograph, which is the first thing you see. */}
      <section className="pt-28 pb-20 md:pb-28 px-6 md:px-10">
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">

          <motion.div initial="hidden" animate="visible" variants={rise} className="lg:col-span-7">
            <p className="text-[9px] md:text-[10px] uppercase tracking-[0.42em] text-[#4A5D4E] mb-8">
              Chartered physiotherapy &middot; Bath
            </p>
            <h1 className="font-serif text-[clamp(2.6rem,7vw,5.2rem)] tracking-[-0.02em] text-[#1D1C19] mb-10">
              Back to the thing<br />
              you stopped doing.
            </h1>
            <p className="text-lg md:text-xl text-[#6E6A62] leading-relaxed max-w-xl mb-12">
              A small clinic on Argyle Street for people with pain that has outstayed its welcome. One physiotherapist,
              start to finish, and a plan that fits the life you actually lead.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/demo/physio/contact"
                className="group inline-flex items-center justify-center gap-4 px-10 py-5 bg-[#1D1C19] text-[#F3F0EA] text-[10px] uppercase tracking-[0.32em] hover:bg-[#4A5D4E] transition-colors duration-300"
              >
                Book an assessment
                <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>
              <Link
                to="/demo/physio/prices"
                className="inline-flex items-center justify-center px-10 py-5 border border-[#1D1C19]/20 text-[10px] uppercase tracking-[0.32em] hover:border-[#1D1C19] transition-colors duration-300"
              >
                Treatments &amp; fees
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-[#E2DDD3]">
              <img
                src={images.hero}
                alt="Movement and rehabilitation session at the clinic"
                className="w-full h-full object-cover grayscale-[35%]"
                loading="eager"
                fetchPriority="high"
                width="1200"
                height="1500"
                decoding="async"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden sm:block bg-[#FBFAF7] border border-[#E2DDD3] px-7 py-6">
              <p className="text-[9px] uppercase tracking-[0.42em] text-[#4A5D4E] mb-2">The clinic</p>
              <p className="font-serif text-lg leading-snug">
                {clinic.addressLine1}, {clinic.addressLine2}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CREDENTIALS MARQUEE — CONTINUOUS RIGHT TO LEFT */}
      <section
        aria-label="Clinic credentials"
        className="border-y border-[#E2DDD3] bg-[#FBFAF7] overflow-hidden py-6 md:py-7"
      >
        <div className="flex w-max physio-marquee">
          {[0, 1, 2, 3].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy !== 0}>
              {credentials.map((item) => (
                <div key={item} className="flex items-center whitespace-nowrap">
                  <span className="px-8 md:px-14 text-[9px] md:text-[10px] uppercase tracking-[0.24em] text-[#6E6A62]">
                    {item}
                  </span>
                  <span className="w-[3px] h-[3px] rounded-full bg-[#4A5D4E]/50" />
                </div>
              ))}
            </div>
          ))}
        </div>

        <style>{`
          @keyframes physio-marquee-scroll {
            from { transform: translate3d(0, 0, 0); }
            to { transform: translate3d(-50%, 0, 0); }
          }
          .physio-marquee {
            animation: physio-marquee-scroll 60s linear infinite;
            will-change: transform;
          }
          .physio-marquee:hover { animation-play-state: paused; }
          @media (prefers-reduced-motion: reduce) {
            .physio-marquee { animation: none; }
          }
        `}</style>
      </section>

      {/* STATEMENT */}
      <section className="py-28 md:py-40 px-6 md:px-10">
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <p className="lg:col-span-3 text-[9px] uppercase tracking-[0.42em] text-[#4A5D4E] pt-4">
            Why people come here
          </p>
          <div className="lg:col-span-9">
            <p className="font-serif text-[clamp(1.5rem,3vw,2.6rem)] leading-[1.35] tracking-[-0.01em] text-[#1D1C19] max-w-4xl">
              Most people arrive having been told to rest, take painkillers and wait. That works for about a fortnight.
              What it does not do is explain why the pain started, or make sure it does not come back.
            </p>
            <p className="mt-10 text-lg text-[#6E6A62] leading-relaxed max-w-2xl">
              We give you a proper hour at the start, find the cause rather than the symptom, and then do the unglamorous
              work of loading the tissue back up until it can handle your life again. It is not quick, but it lasts.
            </p>
          </div>
        </div>
      </section>

      {/* TREATMENTS */}
      <section className="pb-28 md:pb-40 px-6 md:px-10">
        <div className="max-w-[1500px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-[#E2DDD3]">
            <h2 className="font-serif text-[clamp(2rem,4.5vw,3.4rem)] tracking-[-0.02em]">What treatment looks like</h2>
            <Link
              to="/demo/physio/prices"
              className="group inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-[#4A5D4E] shrink-0"
            >
              See all treatments and fees
              <ArrowUpRight size={15} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
            {treatments.map((t, i) => (
              <motion.article
                key={t.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={rise}
                transition={{ delay: i * 0.08 }}
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#E2DDD3] mb-8 group">
                  <img
                    src={t.image}
                    alt={t.title}
                    loading="lazy"
                    width="1200"
                    height="900"
                    className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.2s] ease-out"
                    decoding="async"
                  />
                </div>
                <p className="text-[9px] uppercase tracking-[0.42em] text-[#4A5D4E] mb-4">{t.index}</p>
                <h3 className="font-serif text-2xl md:text-[1.75rem] mb-4">{t.title}</h3>
                <p className="text-[#6E6A62] leading-relaxed">{t.copy}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-[#FBFAF7] py-28 md:py-40 px-6 md:px-10 border-y border-[#E2DDD3]">
        <div className="max-w-[1500px] mx-auto">
          <div className="max-w-2xl mb-20">
            <p className="text-[9px] uppercase tracking-[0.42em] text-[#4A5D4E] mb-7">From first call to discharge</p>
            <h2 className="font-serif text-[clamp(2rem,4.5vw,3.4rem)] tracking-[-0.02em]">
              Four appointments, on average, before people forget they had a problem.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#E2DDD3] border border-[#E2DDD3]">
            {steps.map((step) => (
              <div key={step.number} className="bg-[#FBFAF7] p-9 md:p-11">
                <p className="font-serif text-4xl text-[#4A5D4E]/30 mb-8">{step.number}</p>
                <h3 className="font-serif text-xl mb-4">{step.title}</h3>
                <p className="text-[#6E6A62] text-[15px] leading-relaxed">{step.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RECOVERY STORIES */}
      <section className="py-28 md:py-40 px-6 md:px-10">
        <div className="max-w-[1500px] mx-auto">
          <h2 className="font-serif text-[clamp(2rem,4.5vw,3.4rem)] tracking-[-0.02em] mb-16 pb-8 border-b border-[#E2DDD3]">
            In their words
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#E2DDD3] border border-[#E2DDD3]">
            {stories.map((story) => (
              <figure key={story.name} className="bg-[#F3F0EA] p-10 md:p-12 flex flex-col justify-between gap-10">
                <blockquote className="font-serif text-xl md:text-[1.4rem] leading-[1.5] text-[#1D1C19]">
                  &ldquo;{story.quote}&rdquo;
                </blockquote>
                <figcaption>
                  <p className="text-[15px] text-[#1D1C19] mb-1">{story.name}</p>
                  <p className="text-[13px] text-[#6E6A62]">{story.detail}</p>
                  <p className="mt-4 text-[9px] uppercase tracking-[0.42em] text-[#4A5D4E]">{story.place}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FULL BLEED STUDIO */}
      <section className="relative h-[60vh] md:h-[75vh] overflow-hidden">
        <img
          src={images.studio}
          alt="Rehabilitation studio at the clinic"
          loading="lazy"
          width="1600"
          height="1000"
          className="absolute inset-0 w-full h-full object-cover grayscale-[45%]"
          decoding="async"
        />
        <div className="absolute inset-0 bg-[#1D1C19]/45" />
        <div className="relative h-full max-w-[1500px] mx-auto px-6 md:px-10 flex flex-col justify-end pb-16 md:pb-24">
          <p className="text-[9px] uppercase tracking-[0.42em] text-[#F3F0EA]/70 mb-6">The rehab studio</p>
          <h2 className="font-serif text-[clamp(1.8rem,4vw,3rem)] text-[#F3F0EA] max-w-2xl tracking-[-0.02em]">
            A room of your own for the part most clinics skip.
          </h2>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#F3F0EA] py-28 md:py-40 px-6 md:px-10">
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <h2 className="font-serif text-[clamp(2rem,5vw,3.8rem)] tracking-[-0.02em] mb-8">
              Tell us where it hurts.
            </h2>
            <p className="text-lg text-[#6E6A62] leading-relaxed max-w-xl">
              Appointments from 7.30am, and a same-week slot most weeks. If you are not sure whether physiotherapy is
              the right answer, ring and ask &mdash; the advice is free.
            </p>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-4">
            <Link
              to="/demo/physio/contact"
              className="group flex items-center justify-between gap-6 px-9 py-7 bg-[#1D1C19] text-[#F3F0EA] hover:bg-[#4A5D4E] transition-colors duration-300"
            >
              <span className="text-[10px] uppercase tracking-[0.32em]">Book an assessment</span>
              <ArrowRight size={17} className="group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
            <a
              href={`tel:${clinic.phoneHref}`}
              className="flex items-center justify-between gap-6 px-9 py-7 border border-[#1D1C19]/20 hover:border-[#1D1C19] transition-colors duration-300"
            >
              <span className="text-[10px] uppercase tracking-[0.32em]">Call the clinic</span>
              <span className="font-serif text-lg">{clinic.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </section>

      <PhysioFooter />
    </div>
  );
};

export default PhysioHome;
