import React, { useEffect, useRef } from 'react';
import { Mail, ArrowUpRight, Clock3, MapPin, PoundSterling } from 'lucide-react';
// Fix react-router-dom missing exports
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EMAIL = 'Sabrdigitalwilts@gmail.com';
const WHATSAPP_DISPLAY = '07398 103339';
const WHATSAPP_INTL = '447398103339';

// Official WhatsApp glyph — lucide has no brand marks.
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.898 9.83 9.83 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.82 11.82 0 0 0 20.465 3.49" />
  </svg>
);

const details = [
  {
    icon: <Clock3 size={16} />,
    label: 'Reply time',
    value: 'Within 12 hours, seven days a week'
  },
  {
    icon: <MapPin size={16} />,
    label: 'Where we are',
    value: 'Wiltshire based, working with businesses UK wide'
  },
  {
    icon: <PoundSterling size={16} />,
    label: 'Quotes',
    value: 'Free, fixed in writing, no obligation to go ahead'
  }
];

const helpfulThings = [
  'What your business does and roughly who buys from you',
  'Whether this is a first website or a replacement for one you already have',
  'Any sites you like the look of',
  'When you would like to be live'
];

const ContactForm: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-reveal', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%'
        },
        y: 32,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: 'expo.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="contact-heading"
      className="bg-[#fdfbf7] pt-32 md:pt-48 pb-40 md:pb-56 px-6 md:px-10 lg:px-16 relative overflow-hidden"
    >
      {/* soft ambient wash, in keeping with the rest of the site */}
      <div className="pointer-events-none absolute -top-40 -right-32 w-[38rem] h-[38rem] rounded-full bg-blue-500/[0.06] blur-[120px]" />

      <div className="w-full max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">

          {/* LEFT — INTRO + STUDIO DETAILS */}
          <div className="lg:col-span-5">
            <p className="contact-reveal text-[9px] md:text-[11px] font-black uppercase tracking-[0.45em] text-blue-600 mb-6">
              Contact
            </p>
            <h1
              id="contact-heading"
              className="contact-reveal font-syne text-[clamp(2.5rem,8vw,4.5rem)] font-black text-slate-950 tracking-tighter uppercase leading-[0.92] mb-8"
            >
              Let&rsquo;s talk <br />
              <span className="text-shimmer-blue italic">about your site.</span>
            </h1>

            <p className="contact-reveal text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-md mb-12">
              Tell us what your business does and what you want the website to bring in. We will come back with an
              honest view of what it needs, what it costs and how long it will take. No forms to fill in, no sales call.
            </p>

            <dl className="contact-reveal border-t border-slate-200">
              {details.map((d) => (
                <div key={d.label} className="flex items-start gap-5 py-6 border-b border-slate-200">
                  <span className="mt-0.5 w-9 h-9 shrink-0 rounded-full bg-white border border-slate-100 flex items-center justify-center text-blue-600">
                    {d.icon}
                  </span>
                  <div>
                    <dt className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 mb-1.5">{d.label}</dt>
                    <dd className="text-slate-900 font-semibold leading-snug">{d.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>

          {/* RIGHT — CHANNELS */}
          <div className="lg:col-span-7 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              <a
                href={`https://wa.me/${WHATSAPP_INTL}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-reveal group relative flex flex-col justify-between gap-12 p-8 md:p-10 bg-white rounded-[2rem] border border-slate-100 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.25)] hover:shadow-[0_30px_60px_-25px_rgba(37,99,235,0.28)] hover:border-blue-200 hover:-translate-y-1.5 transition-all duration-500"
              >
                <div className="flex items-start justify-between">
                  <span className="w-14 h-14 rounded-2xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-colors duration-500">
                    <WhatsAppIcon className="w-7 h-7" />
                  </span>
                  <ArrowUpRight
                    size={24}
                    className="text-slate-200 group-hover:text-slate-900 group-hover:rotate-45 transition-all duration-500"
                  />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 mb-3">WhatsApp</p>
                  <p className="font-syne text-2xl md:text-[1.75rem] font-black text-slate-950 tracking-tight leading-none mb-3">
                    {WHATSAPP_DISPLAY}
                  </p>
                  <p className="text-sm text-slate-400 font-medium">Quickest way to reach us. Voice notes welcome.</p>
                </div>
              </a>

              <a
                href={`mailto:${EMAIL}?subject=Website%20enquiry`}
                className="contact-reveal group relative flex flex-col justify-between gap-12 p-8 md:p-10 bg-white rounded-[2rem] border border-slate-100 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.25)] hover:shadow-[0_30px_60px_-25px_rgba(37,99,235,0.28)] hover:border-blue-200 hover:-translate-y-1.5 transition-all duration-500"
              >
                <div className="flex items-start justify-between">
                  <span className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                    <Mail size={26} />
                  </span>
                  <ArrowUpRight
                    size={24}
                    className="text-slate-200 group-hover:text-slate-900 group-hover:rotate-45 transition-all duration-500"
                  />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 mb-3">Email</p>
                  <p className="font-syne text-lg md:text-xl font-black text-slate-950 tracking-tight leading-tight break-words mb-3">
                    {EMAIL}
                  </p>
                  <p className="text-sm text-slate-400 font-medium">Better for detail, photos and existing branding.</p>
                </div>
              </a>
            </div>

            {/* WHAT TO SEND */}
            <div className="contact-reveal mt-6 p-8 md:p-12 bg-slate-950 rounded-[2rem] text-white">
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-400 mb-8">
                Helpful things to mention
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                {helpfulThings.map((item, i) => (
                  <li key={item} className="flex items-start gap-4">
                    <span className="mt-0.5 shrink-0 font-syne text-[11px] font-black text-blue-400 tabular-nums">
                      0{i + 1}
                    </span>
                    <span className="text-slate-300 font-medium leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-10 pt-8 border-t border-white/10 text-slate-500 text-sm font-medium">
                None of it is essential. A one-line message is enough to get started.
              </p>
            </div>

            <p className="contact-reveal mt-8 text-center sm:text-left text-sm text-slate-400 font-medium">
              Prefer to see the work first? Have a look through{' '}
              <Link to="/projects" className="text-blue-600 font-bold hover:underline">our recent projects</Link>
              {' '}or the{' '}
              <Link to="/faq" className="text-blue-600 font-bold hover:underline">questions we get asked most</Link>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
