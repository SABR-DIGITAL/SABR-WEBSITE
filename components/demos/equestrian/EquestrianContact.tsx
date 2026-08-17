import React, { useEffect, useState } from 'react';
import { Phone, Mail, MapPin, Clock, Check } from 'lucide-react';
import EquestrianNav from './EquestrianNav';
import EquestrianFooter from './EquestrianFooter';
import { Reveal, SectionLabel, Bloom, Wash } from './EquestrianUI';
import { academy, openingHours, cardWashes } from './equestrianData';

interface Errors {
  name?: string;
  contact?: string;
  message?: string;
}

const directions = [
  'From Marlborough, take the A345 south and turn right at Woodborough.',
  'From Devizes, the A342 east, then the brown signs from Pewsey Wharf.',
  'The drive is opposite the postbox on Woodborough Lane. Gravel yard, first left.',
  'Pewsey station is nine minutes away by car.'
];

const EquestrianContact: React.FC = () => {
  const [form, setForm] = useState({ name: '', contact: '', about: 'A first lesson', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
  }, []);

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (!form.name.trim()) next.name = 'Please tell us your name.';
    if (!form.contact.trim()) next.contact = 'A phone number or email so we can reply.';
    if (form.message.trim().length < 4) next.message = 'A line or two about what you need.';
    setErrors(next);
    if (Object.keys(next).length === 0) setSent(true);
  };

  const fieldClass =
    'w-full bg-white border border-[#EADFD1] rounded-xl px-5 py-4 text-[15px] text-[#1E2A22] placeholder:text-[#A5AFA6] focus:outline-none focus:border-[#2F7D5B] transition-colors duration-300';

  return (
    <div className="min-h-screen bg-[#FFFAF3] font-inter text-[#1E2A22] selection:bg-[#E4577A] selection:text-[#FFFAF3] overflow-x-hidden">
      <EquestrianNav />

      {/* ── HEADER ─────────────────────────────────────────────────────── */}
      <section className="relative pt-24 md:pt-28 pb-10 md:pb-14 px-6 md:px-10">
        <Wash />
        <div className="relative max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <p className="eq-rise flex items-center gap-3 text-[10px] uppercase tracking-[0.42em] text-[#6B7A6F] mb-6">
              <Bloom size={16} />
              Contact
            </p>
            <h1
              className="eq-rise font-serif text-[clamp(2.3rem,6.4vw,4.6rem)] leading-[1] tracking-[-0.02em]"
              style={{ animationDelay: '90ms' }}
            >
              Ring the yard.
              <br />
              <span className="italic text-[#E4577A]">Somebody answers.</span>
            </h1>
          </div>
          <div className="lg:col-span-5">
            <p className="eq-rise text-lg text-[#4C5A50] leading-relaxed" style={{ animationDelay: '170ms' }}>
              The phone is in the tack room, so you get a coach rather than a call centre. Emails are
              answered the same day.
            </p>
          </div>
        </div>
      </section>

      {/* ── DETAILS + FORM ─────────────────────────────────────────────── */}
      <section className="px-6 md:px-10 pb-14 md:pb-20">
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Details */}
          <div className="lg:col-span-5">
            <div className="border-t border-[#EADFD1]">
              <Reveal>
                <a
                  href={`tel:${academy.phoneHref}`}
                  className="group grid grid-cols-[auto_1fr] gap-5 items-center py-6 border-b border-[#EADFD1]"
                >
                  <span className="w-11 h-11 rounded-full bg-[#2F7D5B] text-white flex items-center justify-center">
                    <Phone size={17} />
                  </span>
                  <span>
                    <span className="block text-[10px] uppercase tracking-[0.3em] text-[#6B7A6F] mb-1.5">
                      Telephone
                    </span>
                    <span className="block font-serif text-xl md:text-2xl group-hover:text-[#E4577A] transition-colors duration-300">
                      {academy.phoneDisplay}
                    </span>
                  </span>
                </a>
              </Reveal>

              <Reveal delay={0.06}>
                <a
                  href={`mailto:${academy.email}`}
                  className="group grid grid-cols-[auto_1fr] gap-5 items-center py-6 border-b border-[#EADFD1]"
                >
                  <span className="w-11 h-11 rounded-full bg-[#E4577A] text-white flex items-center justify-center">
                    <Mail size={17} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[10px] uppercase tracking-[0.3em] text-[#6B7A6F] mb-1.5">
                      Email
                    </span>
                    <span className="block font-serif text-lg md:text-xl break-words group-hover:text-[#E4577A] transition-colors duration-300">
                      {academy.email}
                    </span>
                  </span>
                </a>
              </Reveal>

              <Reveal delay={0.12}>
                <div className="grid grid-cols-[auto_1fr] gap-5 items-start py-6 border-b border-[#EADFD1]">
                  <span className="w-11 h-11 rounded-full bg-[#F2B23E] text-[#1E2A22] flex items-center justify-center">
                    <MapPin size={17} />
                  </span>
                  <div>
                    <span className="block text-[10px] uppercase tracking-[0.3em] text-[#6B7A6F] mb-1.5">
                      The yard
                    </span>
                    <address className="not-italic font-serif text-lg md:text-xl leading-snug">
                      {academy.addressLine1}
                      <br />
                      {academy.addressLine2} {academy.postcode}
                    </address>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="grid grid-cols-[auto_1fr] gap-5 items-start py-6 border-b border-[#EADFD1]">
                  <span className="w-11 h-11 rounded-full bg-[#79C0E0] text-[#1E2A22] flex items-center justify-center">
                    <Clock size={17} />
                  </span>
                  <div className="w-full">
                    <span className="block text-[10px] uppercase tracking-[0.3em] text-[#6B7A6F] mb-3">
                      Yard hours
                    </span>
                    <ul className="space-y-2">
                      {openingHours.map((row) => (
                        <li key={row.days} className="flex justify-between gap-6 text-[15px]">
                          <span className="text-[#1E2A22]">{row.days}</span>
                          <span className="text-[#6B7A6F] whitespace-nowrap">{row.hours}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <Reveal>
              <div
                className="rounded-[2rem] p-8 md:p-12 border border-white/70 shadow-[0_24px_60px_-44px_rgba(30,42,34,0.5)]"
                style={{ background: cardWashes[2] }}
              >
                {sent ? (
                  <div className="py-8 text-center">
                    <span className="mx-auto w-14 h-14 rounded-full bg-[#2F7D5B] text-white flex items-center justify-center mb-7">
                      <Check size={22} />
                    </span>
                    <h2 className="font-serif text-2xl md:text-3xl leading-tight mb-4">
                      Thank you, {form.name.split(' ')[0]}.
                    </h2>
                    <p className="text-[#4C5A50] leading-relaxed max-w-md mx-auto">
                      Your message is with the yard. We answer everything the same day.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSent(false);
                        setForm({ name: '', contact: '', about: 'A first lesson', message: '' });
                      }}
                      className="mt-9 inline-flex items-center gap-3 px-7 py-3.5 rounded-full border border-[#1E2A22]/20 text-[10px] uppercase tracking-[0.3em] hover:border-[#1E2A22] transition-colors duration-300"
                    >
                      Send another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={submit} noValidate>
                    <h2 className="font-serif text-2xl md:text-3xl leading-tight mb-2">
                      Send us a message
                    </h2>
                    <p className="text-[15px] text-[#4C5A50] leading-relaxed mb-9">
                      Three fields, and no newsletter at the end of it.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                      <div>
                        <label htmlFor="eq-name" className="block text-[10px] uppercase tracking-[0.3em] text-[#6B7A6F] mb-3">
                          Your name
                        </label>
                        <input
                          id="eq-name"
                          type="text"
                          value={form.name}
                          onChange={set('name')}
                          className={fieldClass}
                          placeholder="Hannah Whitfield"
                          autoComplete="name"
                        />
                        {errors.name && <p className="mt-2 text-[13px] text-[#E4577A]">{errors.name}</p>}
                      </div>
                      <div>
                        <label htmlFor="eq-contact" className="block text-[10px] uppercase tracking-[0.3em] text-[#6B7A6F] mb-3">
                          Phone or email
                        </label>
                        <input
                          id="eq-contact"
                          type="text"
                          value={form.contact}
                          onChange={set('contact')}
                          className={fieldClass}
                          placeholder="07700 900123"
                          autoComplete="tel"
                        />
                        {errors.contact && <p className="mt-2 text-[13px] text-[#E4577A]">{errors.contact}</p>}
                      </div>
                    </div>

                    <div className="mb-5">
                      <label htmlFor="eq-about" className="block text-[10px] uppercase tracking-[0.3em] text-[#6B7A6F] mb-3">
                        What is it about?
                      </label>
                      <select id="eq-about" value={form.about} onChange={set('about')} className={fieldClass}>
                        {[
                          'A first lesson',
                          'Lessons for a child',
                          'Adult returners course',
                          'A clinic or hack',
                          'Bringing my own horse',
                          'Something else'
                        ].map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-8">
                      <label htmlFor="eq-message" className="block text-[10px] uppercase tracking-[0.3em] text-[#6B7A6F] mb-3">
                        Message
                      </label>
                      <textarea
                        id="eq-message"
                        rows={5}
                        value={form.message}
                        onChange={set('message')}
                        className={`${fieldClass} resize-none`}
                        placeholder="My daughter is six and has never ridden. Are there Saturday slots?"
                      />
                      {errors.message && <p className="mt-2 text-[13px] text-[#E4577A]">{errors.message}</p>}
                    </div>

                    <button
                      type="submit"
                      className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 bg-[#1E2A22] text-[#FFFAF3] rounded-full text-[10px] uppercase tracking-[0.3em] hover:bg-[#E4577A] transition-colors duration-300"
                    >
                      Send to the yard
                    </button>
                    <p className="mt-5 text-[13px] text-[#6B7A6F]">
                      This is a demonstration site, so nothing is actually sent anywhere.
                    </p>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── MAP + DIRECTIONS ───────────────────────────────────────────── */}
      <section className="px-6 md:px-10 pb-16 md:pb-24">
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionLabel className="mb-6">Finding us</SectionLabel>
              <h2 className="font-serif text-[clamp(1.8rem,4.4vw,2.8rem)] leading-[1.05] tracking-[-0.02em] mb-8">
                Woodborough Lane, then the gravel drive.
              </h2>
            </Reveal>
            <div className="divide-y divide-[#EADFD1] border-y border-[#EADFD1]">
              {directions.map((line, i) => (
                <Reveal key={line} delay={i * 0.06}>
                  <div className="flex items-start gap-4 py-5">
                    <Bloom size={16} className="mt-0.5 shrink-0" />
                    <p className="text-[15px] text-[#4C5A50] leading-relaxed">{line}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <div className="rounded-[2rem] overflow-hidden border border-[#EADFD1] bg-[#F2EAE0]">
                <iframe
                  title={`Map showing ${academy.fullName}`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(academy.mapQuery)}&output=embed`}
                  width="100%"
                  height="460"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block w-full grayscale-[35%] hover:grayscale-0 transition-all duration-700"
                  style={{ border: 0 }}
                />
              </div>
            </Reveal>
          </div>
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

export default EquestrianContact;
