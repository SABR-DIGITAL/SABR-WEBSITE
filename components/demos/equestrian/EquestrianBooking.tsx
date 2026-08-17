import React, { useEffect, useMemo, useState } from 'react';
// Fix react-router-dom missing exports
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { motion as framerMotion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Phone } from 'lucide-react';
import EquestrianNav from './EquestrianNav';
import EquestrianFooter from './EquestrianFooter';
import { Reveal, Bloom, HorseMark, Wash } from './EquestrianUI';
import { academy, lessons, cardWashes, palette } from './equestrianData';

// Fix motion types by casting to any
const motion = framerMotion as any;

const experienceLevels = [
  'Never ridden before',
  'Ridden a few times',
  'Walk and trot',
  'Cantering confidently',
  'Jumping and hacking out'
];

const days = ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const times = ['Morning', 'Early afternoon', 'After school', 'Evening'];

interface Errors {
  [key: string]: string | undefined;
}

const STEPS = ['Lesson', 'Rider', 'Details'];

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
    if (which === 0 && !form.lessonId) next.lessonId = 'Choose a lesson to carry on.';
    if (which === 1) {
      if (!form.riderName.trim()) next.riderName = 'Who is riding?';
      if (!form.riderAge.trim()) next.riderAge = 'We need an age to pick the right horse.';
      if (!form.experience) next.experience = 'Tell us how much they have ridden.';
      if (!form.day) next.day = 'Pick a day that usually works.';
      if (!form.time) next.time = 'And roughly what time.';
    }
    if (which === 2) {
      if (!form.contactName.trim()) next.contactName = 'Your name, please.';
      if (!form.phone.trim()) next.phone = 'A number the yard can ring.';
      if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
        next.email = 'That email does not look right.';
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
    'w-full bg-white border border-[#EADFD1] rounded-xl px-5 py-4 text-[15px] text-[#1E2A22] placeholder:text-[#A5AFA6] focus:outline-none focus:border-[#2F7D5B] transition-colors duration-300';
  const labelClass = 'block text-[10px] uppercase tracking-[0.3em] text-[#6B7A6F] mb-3';
  const errorClass = 'mt-2 text-[13px] text-[#E4577A]';

  const chipClass = (active: boolean) =>
    `px-5 py-3 rounded-full text-[13px] border transition-colors duration-300 ${
      active
        ? 'bg-[#1E2A22] text-[#FFFAF3] border-[#1E2A22]'
        : 'bg-white text-[#4C5A50] border-[#EADFD1] hover:border-[#2F7D5B]'
    }`;

  return (
    <div className="min-h-screen bg-[#FFFAF3] font-inter text-[#1E2A22] selection:bg-[#E4577A] selection:text-[#FFFAF3] overflow-x-hidden">
      <EquestrianNav />

      <section className="relative pt-24 md:pt-28 pb-10 md:pb-12 px-6 md:px-10">
        <Wash />
        <div className="relative max-w-[1000px] mx-auto text-center">
          <p className="eq-rise flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.42em] text-[#6B7A6F] mb-6">
            <Bloom size={16} />
            Book a lesson
          </p>
          <h1
            className="eq-rise font-serif text-[clamp(2.2rem,6vw,4rem)] leading-[1.02] tracking-[-0.02em] mb-5"
            style={{ animationDelay: '90ms' }}
          >
            {booked ? 'That is in the book.' : 'Three questions, then we ring you.'}
          </h1>
          <p
            className="eq-rise max-w-xl mx-auto text-lg text-[#4C5A50] leading-relaxed"
            style={{ animationDelay: '170ms' }}
          >
            {booked
              ? 'We confirm your slot by telephone, usually within the hour.'
              : 'Nothing is charged online. We match the horse and confirm the time by phone.'}
          </p>
        </div>
      </section>

      <section className="px-6 md:px-10 pb-16 md:pb-24">
        <div className="max-w-[1000px] mx-auto">
          {booked ? (
            /* ── CONFIRMATION ───────────────────────────────────────── */
            <Reveal>
              <div
                className="rounded-[2rem] p-8 md:p-14 border border-white/70 shadow-[0_24px_60px_-44px_rgba(30,42,34,0.5)]"
                style={{ background: cardWashes[3] }}
              >
                <div className="flex items-center gap-4 mb-10">
                  <span className="w-14 h-14 rounded-full bg-[#2F7D5B] text-white flex items-center justify-center shrink-0">
                    <Check size={22} />
                  </span>
                  <div>
                    <p className="font-serif text-2xl leading-none">Request received</p>
                    <p className="mt-2 text-[13px] text-[#6B7A6F]">
                      Reference BB-{String(form.riderName.trim().length + 140)}
                      {form.day.slice(0, 2).toUpperCase()}
                    </p>
                  </div>
                </div>

                <dl className="border-t border-[#EADFD1] divide-y divide-[#EADFD1] mb-10">
                  {[
                    ['Lesson', chosen ? `${chosen.name} · ${chosen.duration} · ${chosen.price}` : '—'],
                    ['Rider', `${form.riderName} · age ${form.riderAge}`],
                    ['Experience', form.experience],
                    ['Preferred slot', `${form.day}, ${form.time.toLowerCase()}`],
                    ['We will ring', `${form.contactName} on ${form.phone}`],
                    ...(form.email.trim() ? [['Email', form.email]] : []),
                    ...(form.notes.trim() ? [['Notes', form.notes]] : [])
                  ].map(([label, value]) => (
                    <div key={label as string} className="grid grid-cols-1 md:grid-cols-[10rem_1fr] gap-2 md:gap-6 py-4">
                      <dt className="text-[10px] uppercase tracking-[0.28em] text-[#6B7A6F] pt-1">{label}</dt>
                      <dd className="text-[15px] md:text-base text-[#1E2A22] leading-relaxed">{value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href={`tel:${academy.phoneHref}`}
                    className="inline-flex items-center gap-3 pl-7 pr-6 py-4 bg-[#1E2A22] text-[#FFFAF3] rounded-full text-[10px] uppercase tracking-[0.3em] hover:bg-[#E4577A] transition-colors duration-300"
                  >
                    <Phone size={15} /> {academy.phoneDisplay}
                  </a>
                  <Link
                    to="/demo/equestrian"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-[#1E2A22]/20 text-[10px] uppercase tracking-[0.3em] hover:border-[#1E2A22] transition-colors duration-300"
                  >
                    Back to the yard
                  </Link>
                </div>

                <p className="mt-8 text-[13px] text-[#6B7A6F]">
                  This is a demonstration site, so no booking has actually been made.
                </p>
              </div>
            </Reveal>
          ) : (
            <>
              {/* ── PROGRESS ─────────────────────────────────────────── */}
              <div className="flex items-center gap-3 md:gap-5 mb-10">
                {STEPS.map((label, i) => (
                  <React.Fragment key={label}>
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] transition-colors duration-500 ${
                          i <= step ? 'bg-[#1E2A22] text-[#FFFAF3]' : 'bg-white text-[#A5AFA6] border border-[#EADFD1]'
                        }`}
                      >
                        {i < step ? <Check size={13} /> : i + 1}
                      </span>
                      <span
                        className={`text-[10px] uppercase tracking-[0.28em] transition-colors duration-500 ${
                          i <= step ? 'text-[#1E2A22]' : 'text-[#A5AFA6]'
                        }`}
                      >
                        {label}
                      </span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <span className="flex-1 h-px bg-[#EADFD1] relative overflow-hidden">
                        <span
                          className="absolute inset-y-0 left-0 bg-[#2F7D5B] transition-all duration-700"
                          style={{ width: i < step ? '100%' : '0%' }}
                        />
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <div
                className="rounded-[2rem] p-7 md:p-12 border border-white/70 shadow-[0_24px_60px_-44px_rgba(30,42,34,0.5)]"
                style={{ background: cardWashes[2] }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* STEP 1 — LESSON */}
                    {step === 0 && (
                      <div>
                        <h2 className="font-serif text-2xl md:text-3xl leading-tight mb-2">
                          Which lesson?
                        </h2>
                        <p className="text-[15px] text-[#4C5A50] leading-relaxed mb-8">
                          Not sure? Choose the beginner group and we will move you if it is wrong.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {lessons.map((lesson) => {
                            const active = form.lessonId === lesson.id;
                            return (
                              <button
                                key={lesson.id}
                                type="button"
                                onClick={() => update('lessonId', lesson.id)}
                                aria-pressed={active}
                                className={`text-left rounded-[1.25rem] p-6 border transition-all duration-300 ${
                                  active
                                    ? 'bg-white border-[#2F7D5B] shadow-[0_18px_40px_-24px_rgba(30,42,34,0.35)]'
                                    : 'bg-[#FFFCF7] border-[#EADFD1] hover:border-[#2F7D5B]/60'
                                }`}
                              >
                                <div className="flex items-start justify-between gap-4 mb-3">
                                  <span className="font-serif text-lg md:text-xl leading-tight">
                                    {lesson.name}
                                  </span>
                                  <span
                                    className="w-4 h-4 rounded-full shrink-0 mt-1"
                                    style={{
                                      backgroundColor: active ? palette.meadow : lesson.accent,
                                      opacity: active ? 1 : 0.45
                                    }}
                                  />
                                </div>
                                <p className="text-[13px] text-[#6B7A6F] mb-4">
                                  {lesson.who} &middot; {lesson.duration}
                                </p>
                                <p className="font-serif text-xl">{lesson.price}</p>
                              </button>
                            );
                          })}
                        </div>
                        {errors.lessonId && <p className={errorClass}>{errors.lessonId}</p>}
                      </div>
                    )}

                    {/* STEP 2 — RIDER */}
                    {step === 1 && (
                      <div>
                        <h2 className="font-serif text-2xl md:text-3xl leading-tight mb-2">
                          Who is riding?
                        </h2>
                        <p className="text-[15px] text-[#4C5A50] leading-relaxed mb-8">
                          {chosen ? `${chosen.name}, ${chosen.duration}, ${chosen.price}.` : ''} This is how
                          we choose the horse.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-[1fr_10rem] gap-5 mb-6">
                          <div>
                            <label htmlFor="rider-name" className={labelClass}>
                              Rider&rsquo;s name
                            </label>
                            <input
                              id="rider-name"
                              type="text"
                              value={form.riderName}
                              onChange={(e) => update('riderName', e.target.value)}
                              className={fieldClass}
                              placeholder="Mia Whitfield"
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
                              placeholder="7"
                            />
                            {errors.riderAge && <p className={errorClass}>{errors.riderAge}</p>}
                          </div>
                        </div>

                        <div className="mb-6">
                          <span className={labelClass}>How much have they ridden?</span>
                          <div className="flex flex-wrap gap-3">
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <span className={labelClass}>Best day</span>
                            <div className="flex flex-wrap gap-3">
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
                            <span className={labelClass}>Best time</span>
                            <div className="flex flex-wrap gap-3">
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

                    {/* STEP 3 — DETAILS */}
                    {step === 2 && (
                      <div>
                        <h2 className="font-serif text-2xl md:text-3xl leading-tight mb-2">
                          Where do we ring?
                        </h2>
                        <p className="text-[15px] text-[#4C5A50] leading-relaxed mb-8">
                          One call to confirm the slot and the horse, and it is booked.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                          <div>
                            <label htmlFor="contact-name" className={labelClass}>
                              Your name
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

                        <div className="mb-5">
                          <label htmlFor="contact-email" className={labelClass}>
                            Email (optional)
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

                        <div className="mb-8">
                          <label htmlFor="contact-notes" className={labelClass}>
                            Anything we should know?
                          </label>
                          <textarea
                            id="contact-notes"
                            rows={4}
                            value={form.notes}
                            onChange={(e) => update('notes', e.target.value)}
                            className={`${fieldClass} resize-none`}
                            placeholder="She is nervous around big horses, and we have our own hat."
                          />
                        </div>

                        <div className="bg-white rounded-[1.25rem] border border-[#EADFD1] p-6">
                          <div className="flex items-center gap-3 mb-4">
                            <HorseMark size={38} color={palette.meadow} />
                            <p className="text-[10px] uppercase tracking-[0.3em] text-[#6B7A6F]">
                              Your request
                            </p>
                          </div>
                          <p className="text-[15px] text-[#4C5A50] leading-relaxed">
                            <span className="text-[#1E2A22]">{chosen?.name}</span> for {form.riderName || 'your rider'}
                            {form.riderAge ? `, age ${form.riderAge}` : ''}
                            {form.day ? `, ${form.day.toLowerCase()}` : ''}
                            {form.time ? ` ${form.time.toLowerCase()}` : ''}. {chosen?.price} on the day.
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* ── CONTROLS ───────────────────────────────────────── */}
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  {step > 0 && (
                    <button
                      type="button"
                      onClick={back}
                      className="group inline-flex items-center gap-3 px-7 py-4 rounded-full border border-[#1E2A22]/20 text-[10px] uppercase tracking-[0.3em] hover:border-[#1E2A22] transition-colors duration-300"
                    >
                      <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform duration-300" />
                      Back
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={next}
                    className="group inline-flex items-center gap-3 pl-8 pr-6 py-4 bg-[#1E2A22] text-[#FFFAF3] rounded-full text-[10px] uppercase tracking-[0.3em] hover:bg-[#E4577A] transition-colors duration-300"
                  >
                    {step === 2 ? 'Send the request' : 'Carry on'}
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                  <p className="text-[13px] text-[#6B7A6F] ml-auto">
                    Or ring the yard on{' '}
                    <a href={`tel:${academy.phoneHref}`} className="text-[#1E2A22] underline decoration-[#E4577A] underline-offset-4">
                      {academy.phoneDisplay}
                    </a>
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      <EquestrianFooter />

      <style>{`
        @keyframes eq-rise {
          from { opacity: 0; transform: translate3d(0, 22px, 0); }
          to { opacity: 1; transform: none; }
        }
        .eq-rise { animation: eq-rise 0.85s cubic-bezier(0.22, 1, 0.36, 1) both; }
        @media (prefers-reduced-motion: reduce) { .eq-rise { animation: none; } }
      `}</style>
    </div>
  );
};

export default EquestrianBooking;
