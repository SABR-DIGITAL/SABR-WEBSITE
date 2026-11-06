import React, { useEffect, useMemo, useState } from 'react';
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { motion as framerMotion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Phone } from 'lucide-react';
import EquestrianNav from './EquestrianNav';
import EquestrianFooter from './EquestrianFooter';
import { Reveal, SectionLabel, HorseMark } from './EquestrianUI';
import { academy, lessons, palette } from './equestrianData';

const motion = framerMotion as any;

const experienceLevels = [
  'Complete beginner',
  'Ridden a few times',
  'Balanced in walk & trot',
  'Cantering confidently',
  'Jumping / lateral work'
];

const days = ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const times = ['Morning', 'Early Afternoon', 'After School', 'Evening'];

interface Errors {
  [key: string]: string | undefined;
}

const STEPS = ['01 · Lesson', '02 · Rider', '03 · Contact'];

const EquestrianBooking: React.FC = () => {
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [booked, setBooked] = useState(false);

  const [form, setForm] = useState({
    lessonId: '',
    riderName: '',
    riderAge: '',
    experience: '',
    day: '',
    time: '',
    contactName: '',
    phone: '',
    email: '',
    notes: ''
  });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
  }, []);

  const chosen = useMemo(() => lessons.find((l) => l.id === form.lessonId), [form.lessonId]);

  const update = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (which: number): boolean => {
    const next: Errors = {};
    if (which === 0 && !form.lessonId) next.lessonId = 'Please select a session to continue.';
    if (which === 1) {
      if (!form.riderName.trim()) next.riderName = 'Please enter the rider’s name.';
      if (!form.riderAge.trim()) next.riderAge = 'Please enter the rider’s age so we can match a horse.';
      if (!form.experience) next.experience = 'Please select the rider’s current experience.';
      if (!form.day) next.day = 'Please choose a preferred day.';
      if (!form.time) next.time = 'Please choose a preferred time of day.';
    }
    if (which === 2) {
      if (!form.contactName.trim()) next.contactName = 'Please enter your name.';
      if (!form.phone.trim()) next.phone = 'Please provide a telephone number for the tack room.';
      if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
        next.email = 'Please enter a valid email address.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const next = () => {
    if (!validate(step)) return;
    if (step < 2) {
      setStep(step + 1);
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      return;
    }
    setBooked(true);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const back = () => {
    setErrors({});
    setStep(Math.max(0, step - 1));
  };

  const fieldClass =
    'w-full bg-white rounded-2xl border border-[#2D5A43]/15 px-5 py-4 text-[16px] text-[#1E2822] placeholder:text-[#98A097] focus:outline-none focus:border-[#2D5A43] transition-colors duration-300';
  const labelClass = 'block text-[10px] uppercase tracking-[0.3em] text-[#2D5A43] font-medium mb-2.5';
  const errorClass = 'mt-2 text-[12px] text-[#9E3B3B]';

  const chipClass = (active: boolean) =>
    `px-5 py-3 rounded-full text-[12px] uppercase tracking-[0.2em] transition-all duration-300 ${
      active
        ? 'bg-[#2D5A43] text-[#FAF6EE] shadow-sm'
        : 'bg-white text-[#5F665E] hover:bg-[#E8F0EB] hover:text-[#2D5A43]'
    }`;

  return (
    <div className="relative min-h-screen bg-[#FAF6EE] font-inter text-[#1E2822] selection:bg-[#2D5A43] selection:text-[#FAF6EE] overflow-x-hidden">
      <EquestrianNav />

      <section className="relative z-10 pt-24 sm:pt-32 md:pt-40 pb-8 sm:pb-10 px-5 sm:px-6 md:px-12">
        <div className="max-w-[1100px] mx-auto">
          <Reveal>
            <SectionLabel className="mb-4 sm:mb-5">Book a Lesson</SectionLabel>
            <h1 className="font-serif text-[clamp(2.1rem,5.4vw,4.4rem)] leading-[1.05] tracking-[-0.02em] mb-4">
              {booked ? 'Your request is with the tack room.' : 'Arrange a session.'}
            </h1>
            <p className="max-w-xl text-[15px] sm:text-[16px] text-[#5F665E] leading-[1.8] sm:leading-[1.85]">
              {booked
                ? 'One of our coaches will ring you shortly to confirm your horse and exact arena time.'
                : 'Tell us which lesson you would like and a little about the rider so we can prepare the right horse.'}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative z-10 px-5 sm:px-6 md:px-12 pb-16 sm:pb-24 md:pb-36">
        <div className="max-w-[1100px] mx-auto">
          {booked ? (
            <Reveal>
              <div className="rounded-3xl bg-white/85 backdrop-blur-sm p-6 sm:p-8 md:p-14 shadow-[0_20px_50px_-30px_rgba(30,40,34,0.2)]">
                <div className="flex items-center gap-4 mb-8 sm:mb-10">
                  <span className="w-12 h-12 rounded-full bg-[#2D5A43] text-[#FAF6EE] flex items-center justify-center shrink-0">
                    <Check size={20} />
                  </span>
                  <div>
                    <p className="font-serif text-xl sm:text-2xl leading-none">Request Received</p>
                    <p className="mt-1.5 text-[11px] uppercase tracking-[0.28em] text-[#2D5A43]">
                      Reference BB-{String(form.riderName.trim().length + 210)}
                      {form.day.slice(0, 2).toUpperCase()}
                    </p>
                  </div>
                </div>

                <dl className="space-y-4 mb-10 sm:mb-12">
                  {[
                    ['Selected Session', chosen ? `${chosen.name} · ${chosen.duration}` : '—'],
                    ['Rider', `${form.riderName} · Age ${form.riderAge}`],
                    ['Riding Experience', form.experience],
                    ['Preferred Window', `${form.day}, ${form.time}`],
                    ['Telephone Contact', `${form.contactName} · ${form.phone}`],
                    ...(form.email.trim() ? [['Email', form.email]] : []),
                    ...(form.notes.trim() ? [['Notes', form.notes]] : [])
                  ].map(([label, value]) => (
                    <div key={label as string} className="grid grid-cols-1 md:grid-cols-[13rem_1fr] gap-1.5 sm:gap-2 md:gap-8 py-2">
                      <dt className="text-[10px] uppercase tracking-[0.28em] text-[#2D5A43] font-medium pt-1">{label}</dt>
                      <dd className="text-[15px] md:text-[16px] text-[#1E2822]">{value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3.5 sm:gap-4">
                  <Link
                    to="/demo/equestrian"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#2D5A43] text-[#FAF6EE] text-[11px] uppercase tracking-[0.28em] font-medium hover:bg-[#234734] transition-colors"
                  >
                    <span>Return to Home</span>
                  </Link>
                  <a
                    href={`tel:${academy.phoneHref}`}
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#E8F0EB] text-[#2D5A43] text-[11px] uppercase tracking-[0.28em] font-medium hover:bg-[#dce8e0] transition-colors"
                  >
                    <Phone size={14} />
                    <span>{academy.phoneDisplay}</span>
                  </a>
                </div>
              </div>
            </Reveal>
          ) : (
            <>
              {/* ── STEP INDICATOR PILLS ───────────────────────────────── */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-8 sm:mb-10">
                {STEPS.map((label, i) => (
                  <span
                    key={label}
                    className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-[10px] uppercase tracking-[0.22em] sm:tracking-[0.28em] font-medium transition-colors ${
                      i === step
                        ? 'bg-[#2D5A43] text-[#FAF6EE]'
                        : i < step
                        ? 'bg-[#E8F0EB] text-[#2D5A43]'
                        : 'bg-white/70 text-[#98A097]'
                    }`}
                  >
                    {label}
                  </span>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* STEP 1 — LESSON */}
                  {step === 0 && (
                    <div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {lessons.map((lesson) => {
                          const active = form.lessonId === lesson.id;
                          return (
                            <button
                              key={lesson.id}
                              type="button"
                              onClick={() => update('lessonId', lesson.id)}
                              aria-pressed={active}
                              className={`text-left p-5 sm:p-6 rounded-3xl transition-all duration-300 ${
                                active
                                  ? 'bg-[#2D5A43] text-[#FAF6EE] shadow-lg'
                                  : 'bg-white/80 hover:bg-white text-[#1E2822] shadow-[0_10px_30px_-22px_rgba(30,40,34,0.18)]'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-3 mb-2">
                                <span
                                  className={`px-3 py-1 rounded-full text-[9px] uppercase tracking-[0.24em] ${
                                    active ? 'bg-white/20 text-white' : 'bg-[#E8F0EB] text-[#2D5A43]'
                                  }`}
                                >
                                  {lesson.who}
                                </span>
                                <span
                                  className={`text-[11px] uppercase tracking-[0.22em] shrink-0 ${
                                    active ? 'text-white/80' : 'text-[#5F665E]'
                                  }`}
                                >
                                  {lesson.duration}
                                </span>
                              </div>
                              <p className="font-serif text-xl md:text-2xl mb-2">{lesson.name}</p>
                              <p
                                className={`text-[14px] leading-relaxed ${
                                  active ? 'text-white/85' : 'text-[#5F665E]'
                                }`}
                              >
                                {lesson.detail}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                      {errors.lessonId && <p className={errorClass}>{errors.lessonId}</p>}
                    </div>
                  )}

                  {/* STEP 2 — RIDER */}
                  {step === 1 && (
                    <div className="rounded-3xl bg-white/80 backdrop-blur-sm p-6 sm:p-7 md:p-12 space-y-6 sm:space-y-8 shadow-[0_16px_40px_-28px_rgba(30,40,34,0.18)]">
                      <div className="grid grid-cols-1 md:grid-cols-[1fr_12rem] gap-5 sm:gap-6">
                        <div>
                          <label htmlFor="rider-name" className={labelClass}>
                            Rider&rsquo;s Name
                          </label>
                          <input
                            id="rider-name"
                            type="text"
                            value={form.riderName}
                            onChange={(e) => update('riderName', e.target.value)}
                            className={fieldClass}
                            placeholder="e.g. Clara Whitfield"
                          />
                          {errors.riderName && <p className={errorClass}>{errors.riderName}</p>}
                        </div>
                        <div>
                          <label htmlFor="rider-age" className={labelClass}>
                            Age
                          </label>
                          <input
                            id="rider-age"
                            type="text"
                            inputMode="numeric"
                            value={form.riderAge}
                            onChange={(e) => update('riderAge', e.target.value)}
                            className={fieldClass}
                            placeholder="e.g. 12 or Adult"
                          />
                          {errors.riderAge && <p className={errorClass}>{errors.riderAge}</p>}
                        </div>
                      </div>

                      <div>
                        <span className={labelClass}>Current Riding Experience</span>
                        <div className="flex flex-wrap gap-2 sm:gap-2.5 mt-3">
                          {experienceLevels.map((level) => (
                            <button
                              key={level}
                              type="button"
                              onClick={() => update('experience', level)}
                              aria-pressed={form.experience === level}
                              className={chipClass(form.experience === level)}
                            >
                              {level}
                            </button>
                          ))}
                        </div>
                        {errors.experience && <p className={errorClass}>{errors.experience}</p>}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                        <div>
                          <span className={labelClass}>Preferred Day</span>
                          <div className="flex flex-wrap gap-2 sm:gap-2.5 mt-3">
                            {days.map((day) => (
                              <button
                                key={day}
                                type="button"
                                onClick={() => update('day', day)}
                                aria-pressed={form.day === day}
                                className={chipClass(form.day === day)}
                              >
                                {day}
                              </button>
                            ))}
                          </div>
                          {errors.day && <p className={errorClass}>{errors.day}</p>}
                        </div>
                        <div>
                          <span className={labelClass}>Preferred Time</span>
                          <div className="flex flex-wrap gap-2 sm:gap-2.5 mt-3">
                            {times.map((time) => (
                              <button
                                key={time}
                                type="button"
                                onClick={() => update('time', time)}
                                aria-pressed={form.time === time}
                                className={chipClass(form.time === time)}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                          {errors.time && <p className={errorClass}>{errors.time}</p>}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 3 — CONTACT */}
                  {step === 2 && (
                    <div className="rounded-3xl bg-white/80 backdrop-blur-sm p-6 sm:p-7 md:p-12 space-y-6 sm:space-y-7 shadow-[0_16px_40px_-28px_rgba(30,40,34,0.18)]">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                        <div>
                          <label htmlFor="contact-name" className={labelClass}>
                            Your Name
                          </label>
                          <input
                            id="contact-name"
                            type="text"
                            value={form.contactName}
                            onChange={(e) => update('contactName', e.target.value)}
                            className={fieldClass}
                            placeholder="Hannah Whitfield"
                            autoComplete="name"
                          />
                          {errors.contactName && <p className={errorClass}>{errors.contactName}</p>}
                        </div>
                        <div>
                          <label htmlFor="contact-phone" className={labelClass}>
                            Telephone
                          </label>
                          <input
                            id="contact-phone"
                            type="tel"
                            value={form.phone}
                            onChange={(e) => update('phone', e.target.value)}
                            className={fieldClass}
                            placeholder="07700 900123"
                            autoComplete="tel"
                          />
                          {errors.phone && <p className={errorClass}>{errors.phone}</p>}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="contact-email" className={labelClass}>
                          Email Address (Optional)
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          value={form.email}
                          onChange={(e) => update('email', e.target.value)}
                          className={fieldClass}
                          placeholder="hannah@example.co.uk"
                          autoComplete="email"
                        />
                        {errors.email && <p className={errorClass}>{errors.email}</p>}
                      </div>

                      <div>
                        <label htmlFor="contact-notes" className={labelClass}>
                          Rider Notes or Horse Preference (Optional)
                        </label>
                        <textarea
                          id="contact-notes"
                          rows={3}
                          value={form.notes}
                          onChange={(e) => update('notes', e.target.value)}
                          className={`${fieldClass} resize-none`}
                          placeholder="Any horse preference or notes for your coach."
                        />
                      </div>

                      <div className="p-4 sm:p-5 rounded-2xl bg-[#E8F0EB] flex items-center gap-4">
                        <HorseMark size={34} color={palette.green} className="shrink-0" />
                        <p className="text-[14px] text-[#1E2822] leading-relaxed">
                          <span className="font-medium text-[#2D5A43]">{chosen?.name}</span> ({chosen?.duration}) for{' '}
                          <span className="font-medium">{form.riderName || 'your rider'}</span>
                          {form.day ? ` · ${form.day}` : ''}
                          {form.time ? `, ${form.time}` : ''}.
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* ── CONTROLS ───────────────────────────────────────────── */}
              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-between gap-4">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                  {step > 0 && (
                    <button
                      type="button"
                      onClick={back}
                      className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-white text-[11px] uppercase tracking-[0.28em] text-[#1E2822] hover:bg-[#E8F0EB] transition-colors"
                    >
                      <ArrowLeft size={14} />
                      <span>Back</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={next}
                    className="inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full bg-[#2D5A43] text-[#FAF6EE] text-[11px] uppercase tracking-[0.28em] font-medium hover:bg-[#234734] transition-colors shadow-md"
                  >
                    <span>{step === 2 ? 'Confirm Lesson Request' : 'Continue'}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

                <p className="text-[13px] text-[#5F665E] text-center sm:text-left">
                  Prefer to book by telephone? Ring{' '}
                  <a href={`tel:${academy.phoneHref}`} className="text-[#2D5A43] font-medium underline underline-offset-4">
                    {academy.phoneDisplay}
                  </a>
                </p>
              </div>
            </>
          )}
        </div>
      </section>

      <EquestrianFooter />
    </div>
  );
};

export default EquestrianBooking;
