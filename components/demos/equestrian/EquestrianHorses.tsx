import React, { useEffect } from 'react';
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { motion as framerMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import EquestrianNav from './EquestrianNav';
import EquestrianFooter from './EquestrianFooter';
import { Reveal, SectionLabel } from './EquestrianUI';
import { horses, coaches, Horse } from './equestrianData';

const motion = framerMotion as any;

const EquestrianHorses: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
  }, []);

  const horsePairs: Horse[][] = [];
  for (let i = 0; i < horses.length; i += 2) {
    horsePairs.push(horses.slice(i, i + 2));
  }

  return (
    <div className="relative min-h-screen bg-[#FAF6EE] font-inter text-[#1E2822] selection:bg-[#2D5A43] selection:text-[#FAF6EE] overflow-x-hidden">
      <EquestrianNav />

      {/* ── WARM EDITORIAL HEADER ────────────────────────────────────────── */}
      <section className="relative z-10 pt-24 sm:pt-32 md:pt-40 pb-10 sm:pb-12 md:pb-16 px-5 sm:px-6 md:px-12">
        <div className="max-w-[1240px] mx-auto">
          <Reveal>
            <SectionLabel className="mb-4 sm:mb-5">The Horses</SectionLabel>
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-end">
            <div className="lg:col-span-8">
              <Reveal delay={0.05}>
                <h1 className="font-serif text-[clamp(2.2rem,5.4vw,4.4rem)] leading-[1.04] tracking-[-0.02em]">
                  Eight of our twenty-two,
                  <br />
                  <span className="italic text-[#2D5A43]">from 11.2hh to 16.2hh.</span>
                </h1>
              </Reveal>
            </div>
            <div className="lg:col-span-4">
              <Reveal delay={0.12}>
                <p className="text-[15px] text-[#5F665E] leading-[1.8]">
                  Every horse at Bramble &amp; Bay lives out in settled herds on our chalk paddocks and is matched carefully to your seat.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── MINIMALISTIC TWO-PER-ROW SCROLL-REVEAL HORSE PAIRS ───────────── */}
      <section className="relative z-10 px-5 sm:px-6 md:px-12 pb-16 sm:pb-20 md:pb-28">
        <div className="max-w-[1240px] mx-auto space-y-12 sm:space-y-16 md:space-y-20">
          {horsePairs.map((pair, pairIndex) => (
            <motion.div
              key={pair.map((h) => h.name).join('-')}
              initial={{ opacity: 0, y: 38 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14"
            >
              {pair.map((horse, idxInPair) => (
                <motion.article
                  key={horse.name}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.85,
                    delay: idxInPair * 0.14,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                >
                  {/* Clean, compact portrait photograph */}
                  <div className="overflow-hidden rounded-2xl bg-[#E8E2D5] aspect-[16/11] mb-4 sm:mb-5">
                    <motion.img
                      src={horse.photo}
                      alt={`${horse.name} — ${horse.colour} ${horse.breed}`}
                      loading={pairIndex === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.05 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 1.35, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>

                  {/* Minimalist header: Name + specs on left, Ride <Horse> box on right */}
                  <div className="flex flex-wrap items-start justify-between gap-3 sm:gap-4 mb-2.5">
                    <div className="min-w-0">
                      <h2 className="font-serif text-2xl md:text-3xl text-[#1E2822] leading-none">
                        {horse.name}
                      </h2>
                      <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.24em] text-[#2D5A43] mt-2">
                        {horse.height} &middot; {horse.breed} &middot; {horse.age}
                      </p>
                    </div>

                    <Link
                      to="/demo/equestrian/book"
                      className="group inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-[#E8F0EB] text-[#2D5A43] hover:bg-[#2D5A43] hover:text-[#FAF6EE] text-[10px] uppercase tracking-[0.24em] sm:tracking-[0.26em] font-medium transition-colors shrink-0"
                    >
                      <span>Ride {horse.name}</span>
                      <ArrowUpRight
                        size={13}
                        className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      />
                    </Link>
                  </div>

                  {/* Single concise sentence of character */}
                  <p className="text-[14px] md:text-[15px] text-[#5F665E] leading-relaxed">
                    {horse.character}
                  </p>
                </motion.article>
              ))}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── THE COACHING & WELFARE TEAM ──────────────────────────────────── */}
      <section className="relative z-10 py-14 sm:py-16 md:py-24 px-5 sm:px-6 md:px-12">
        <div className="max-w-[1240px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-end mb-10 sm:mb-14">
            <div className="lg:col-span-7">
              <Reveal>
                <SectionLabel className="mb-4">The People</SectionLabel>
                <h2 className="font-serif text-[clamp(2rem,4vw,3.2rem)] leading-[1.08] tracking-[-0.02em]">
                  Who teaches you.
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-5">
              <Reveal delay={0.08}>
                <p className="text-[15px] text-[#5F665E] leading-[1.8]">
                  All coaching at Bramble &amp; Bay is led by permanent, BHS-qualified instructors.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
            {coaches.map((coach, i) => (
              <Reveal key={coach.name} delay={i * 0.07}>
                <h3 className="font-serif text-2xl text-[#1E2822] mb-1">{coach.name}</h3>
                <p className="text-[10px] uppercase tracking-[0.24em] text-[#2D5A43] mb-3">
                  {coach.role}
                </p>
                <p className="text-[14px] text-[#5F665E] leading-[1.75]">{coach.bio}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <EquestrianFooter />
    </div>
  );
};

export default EquestrianHorses;
