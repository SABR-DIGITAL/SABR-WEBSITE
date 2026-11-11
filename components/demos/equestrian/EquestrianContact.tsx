import React, { useEffect } from 'react';
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { ArrowUpRight, Clock, Compass, Mail, MapPin, Phone } from 'lucide-react';
import EquestrianNav from './EquestrianNav';
import EquestrianFooter from './EquestrianFooter';
import { Reveal, SectionLabel } from './EquestrianUI';
import { academy, openingHours, images } from './equestrianData';

const YARD_DAILY_RHYTHM = [
  {
    time: '06:45 – 08:15',
    activity: 'Morning Haynets & Turnout',
    note: 'Fen and the grooms turn the herds out onto the chalk paddocks and harrow the 60m school.'
  },
  {
    time: '08:30 – 12:30',
    activity: 'Morning Tuition & Downland Hacks',
    note: 'Private flatwork, adult returners, and ninety-minute ridgeway hacks. Best time to ring.'
  },
  {
    time: '12:30 – 14:00',
    activity: 'Midday Feeds & Tack Room Kettle',
    note: 'Quiet hour in the barn while horses enjoy their hay and coaches write up morning notes.'
  },
  {
    time: '14:00 – 20:00',
    activity: 'Afternoon Rides & Floodlit Schooling',
    note: 'Little Buds lead-rein after school, followed by evening dressage and pole clinics.'
  }
];

const EquestrianContact: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
  }, []);

  return (
    <div className="relative min-h-screen bg-[#FAF6EE] font-inter text-[#1E2822] selection:bg-[#2D5A43] selection:text-[#FAF6EE] flex flex-col justify-between">
      <EquestrianNav />

      <main className="relative z-10 pt-24 sm:pt-32 md:pt-36 pb-16 sm:pb-24 md:pb-28 px-4 sm:px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          {/* ── HEADER WITH GLIDE-IN ───────────────────────────────────── */}
          <div className="max-w-3xl mb-8 sm:mb-12">
            <Reveal>
              <SectionLabel className="mb-3.5 sm:mb-5">The Tack Room Desk</SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="font-serif text-[clamp(2.1rem,5.4vw,4.5rem)] leading-[1.04] tracking-[-0.02em] mb-4">
                Ring the yard.
                <br />
                <span className="italic text-[#2D5A43]">Somebody answers.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[14px] sm:text-[16px] text-[#5F665E] leading-[1.75] max-w-xl">
                The telephone sits in the tack room rather than a call centre, so you speak directly with Rosie, Fen, or one of our senior coaches.
              </p>
            </Reveal>
          </div>

          {/* ── WARM 2-COLUMN TACK ROOM DESK & COURTYARD DIRECTIONS ─────── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch mb-10 sm:mb-14">
            {/* Left Column: Warm Parchment Direct Contact + Full-Horse Downland Photo */}
            <div className="lg:col-span-6 flex flex-col justify-between rounded-3xl bg-[#F3EDE0] border border-[#2D5A43]/12 p-5 sm:p-8 md:p-10 space-y-6">
              <div className="space-y-4">
                <Reveal delay={0.08}>
                  <a
                    href={`tel:${academy.phoneHref}`}
                    className="group block rounded-2xl bg-white hover:bg-[#E8F0EB]/60 p-5 sm:p-6 transition-colors border border-[#2D5A43]/12 shadow-sm"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#2D5A43] font-medium">
                        <Phone size={13} />
                        <span>01 &middot; Direct Tack Room Line</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2D5A43] text-[#FAF6EE] text-[10px] uppercase tracking-[0.18em] font-medium">
                        <span>Call Now</span>
                        <ArrowUpRight size={12} />
                      </span>
                    </div>
                    <p className="font-serif text-2xl sm:text-4xl text-[#1E2822]">
                      {academy.phoneDisplay}
                    </p>
                    <p className="text-[12px] sm:text-[13px] text-[#5F665E] mt-1.5">
                      If we are in the arena teaching, leave your name and we will ring back as soon as the ride dismounts.
                    </p>
                  </a>
                </Reveal>

                <Reveal delay={0.12}>
                  <a
                    href={`mailto:${academy.email}`}
                    className="group block rounded-2xl bg-white hover:bg-[#E8F0EB]/60 p-5 sm:p-6 transition-colors border border-[#2D5A43]/12 shadow-sm"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#2D5A43] font-medium">
                        <Mail size={13} />
                        <span>02 &middot; Yard Email</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F0EB] text-[#2D5A43] text-[10px] uppercase tracking-[0.18em] font-medium">
                        <span>Email Us</span>
                        <ArrowUpRight size={12} />
                      </span>
                    </div>
                    <p className="font-serif text-lg sm:text-2xl md:text-3xl text-[#1E2822] break-all">
                      {academy.email}
                    </p>
                  </a>
                </Reveal>
              </div>

              <Reveal delay={0.16}>
                <div className="overflow-hidden rounded-2xl aspect-[16/10] bg-[#E8E2D5] border border-[#2D5A43]/10">
                  <img
                    src={images.hacking}
                    alt="Horses out on the open Wiltshire chalk downland pastures"
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover object-center block"
                  />
                </div>
              </Reveal>
            </div>

            {/* Right Column: Courtyard Address, Country Lane Landmarks, Hours & Socials */}
            <div className="lg:col-span-6 rounded-3xl bg-white p-5 sm:p-8 md:p-10 border border-[#2D5A43]/12 shadow-[0_16px_45px_-28px_rgba(30,40,34,0.16)] flex flex-col justify-between space-y-6">
              {/* 03 · THE YARD ADDRESS & LANDMARKS */}
              <Reveal delay={0.1}>
                <div className="pb-6 border-b border-[#2D5A43]/12">
                  <span className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#2D5A43] font-medium mb-2.5">
                    <MapPin size={13} />
                    <span>03 &middot; Finding the Courtyard Gate</span>
                  </span>
                  <address className="not-italic font-serif text-xl sm:text-2xl md:text-3xl text-[#1E2822] leading-snug mb-3">
                    {academy.addressLine1}
                    <br />
                    {academy.addressLine2}, {academy.postcode}
                  </address>

                  <div className="rounded-2xl bg-[#FAF6EE] p-3.5 sm:p-4 border border-[#2D5A43]/10 text-[13px] text-[#454D46] space-y-1.5">
                    <p className="font-medium text-[#2D5A43] inline-flex items-center gap-1.5">
                      <Compass size={13} />
                      <span>Country Lane Directions:</span>
                    </p>
                    <p className="leading-relaxed">
                      Cross the Kennet &amp; Avon Canal bridge in Pewsey onto Woodborough Lane. Follow the beech hedging for 1.2 miles and turn into the wide gravel courtyard opposite the red Georgian postbox.
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* 04 · YARD HOURS */}
              <Reveal delay={0.14}>
                <div className="pb-6 border-b border-[#2D5A43]/12">
                  <span className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#2D5A43] font-medium mb-3">
                    <Clock size={13} />
                    <span>04 &middot; Yard &amp; Schooling Hours</span>
                  </span>
                  <ul className="space-y-2">
                    {openingHours.map((row) => (
                      <li
                        key={row.days}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-0.5 sm:gap-2 py-2 px-3.5 rounded-xl bg-[#FAF6EE]"
                      >
                        <span className="font-serif text-base sm:text-lg text-[#1E2822]">{row.days}</span>
                        <span className="text-[13px] sm:text-[14px] text-[#2D5A43] font-medium">{row.hours}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              {/* 05 · SOCIAL CHANNELS & DIRECT BOOKING */}
              <Reveal delay={0.18}>
                <div>
                  <span className="block text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#2D5A43] font-medium mb-3">
                    05 &middot; Daily Yard Dispatches &amp; Booking
                  </span>
                  <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3">
                    <Link
                      to="/demo/equestrian/book"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#2D5A43] text-[#FAF6EE] hover:bg-[#1E2822] text-[11px] uppercase tracking-[0.18em] font-medium transition-colors"
                    >
                      <span>Book a Lesson Online</span>
                      <ArrowUpRight size={14} className="shrink-0" />
                    </Link>
                    <a
                      href={academy.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#E8F0EB] text-[#2D5A43] hover:bg-[#2D5A43] hover:text-[#FAF6EE] text-[13px] font-serif transition-colors"
                    >
                      <span>Instagram ({academy.instagramHandle})</span>
                      <ArrowUpRight size={14} className="shrink-0" />
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* ── NON-GENERIC FEATURE: A DAY ON THE YARD TIMETABLE ─────────── */}
          <Reveal delay={0.2}>
            <div className="rounded-3xl bg-white p-5 sm:p-8 md:p-10 border border-[#2D5A43]/12 shadow-[0_14px_36px_-26px_rgba(30,40,34,0.14)]">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#2D5A43] font-medium mb-1">
                    Life at Bramble Farm
                  </p>
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#1E2822]">
                    How a typical day runs on the yard.
                  </h2>
                </div>
                <p className="text-[12px] sm:text-[13px] text-[#5F665E]">
                  Visitors are welcome to pop into the tack room during schooling hours.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
                {YARD_DAILY_RHYTHM.map((slot) => (
                  <div
                    key={slot.time}
                    className="rounded-2xl bg-[#FAF6EE] p-4 sm:p-5 border border-[#2D5A43]/10"
                  >
                    <span className="inline-block px-2.5 py-1 rounded-full bg-[#F3EDE0] text-[#6E5034] text-[10px] font-medium mb-2.5">
                      {slot.time}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl text-[#1E2822] mb-1.5">
                      {slot.activity}
                    </h3>
                    <p className="text-[12px] sm:text-[13px] text-[#5F665E] leading-relaxed">
                      {slot.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </main>

      <EquestrianFooter />
    </div>
  );
};

export default EquestrianContact;
