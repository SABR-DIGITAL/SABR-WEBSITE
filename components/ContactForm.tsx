import React from 'react';
import { Mail, ArrowUpRight } from 'lucide-react';

const EMAIL = 'Sabrdigitalwilts@gmail.com';
const WHATSAPP_DISPLAY = '07398 103339';
const WHATSAPP_INTL = '447398103339';
const INSTAGRAM_HANDLE = 'sabrdigital';

// Brand marks, hand-drawn as SVG — lucide carries no logos.
const WhatsAppLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.898 9.83 9.83 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.82 11.82 0 0 0 20.465 3.49" />
  </svg>
);

const InstagramLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5.5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

interface Channel {
  key: string;
  label: string;
  value: string;
  href: string;
  external: boolean;
  logo: React.ReactNode;
  /* Solid tile colours only. Nothing on this page is see-through. */
  tile: string;
  /* The number wants to be huge; an email address has to stay readable. */
  size: string;
}

const channels: Channel[] = [
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    value: WHATSAPP_DISPLAY,
    href: `https://wa.me/${WHATSAPP_INTL}`,
    external: true,
    logo: <WhatsAppLogo className="w-7 h-7 md:w-8 md:h-8" />,
    tile: 'bg-[#25D366] text-white',
    size: 'text-[clamp(1.85rem,7vw,3.5rem)]'
  },
  {
    key: 'email',
    label: 'Email',
    value: EMAIL,
    href: `mailto:${EMAIL}?subject=Website%20enquiry`,
    external: false,
    logo: <Mail className="w-7 h-7 md:w-8 md:h-8" strokeWidth={2.2} />,
    tile: 'bg-[#2563eb] text-white',
    size: 'text-[clamp(1.1rem,4.4vw,2.35rem)]'
  },
  {
    key: 'instagram',
    label: 'Instagram',
    value: `@${INSTAGRAM_HANDLE}`,
    href: `https://instagram.com/${INSTAGRAM_HANDLE}`,
    external: true,
    logo: <InstagramLogo className="w-7 h-7 md:w-8 md:h-8" />,
    tile: 'bg-slate-950 text-white',
    size: 'text-[clamp(1.6rem,6vw,3rem)]'
  }
];

const facts = ['Replies within 12 hours', 'Free fixed quotes', 'Call, video or message'];

// One screen, three ways to reach us, nothing else. Everything is painted at
// full opacity — the only movement is a single fade-and-rise on arrival, driven
// by CSS keyframes so it always finishes and always lands solid.
const ContactForm: React.FC = () => {
  return (
    <section
      aria-labelledby="contact-heading"
      className="bg-[#fdfbf7] min-h-screen flex items-center px-6 md:px-10 lg:px-16 pt-32 md:pt-40 pb-24 md:pb-32"
    >
      <div className="w-full max-w-5xl mx-auto">

        <p
          className="contact-rise text-[10px] md:text-[11px] font-black uppercase tracking-[0.5em] text-blue-600 mb-7"
          style={{ animationDelay: '0ms' }}
        >
          Contact
        </p>

        {/* Same scale and treatment as the projects page hero: black first line,
            shimmering blue italic second line. */}
        <h1
          id="contact-heading"
          className="contact-rise font-syne text-[clamp(2.5rem,10vw,5rem)] font-black text-slate-950 tracking-tighter uppercase leading-[0.9] mb-8"
          style={{ animationDelay: '70ms' }}
        >
          LET&rsquo;S <br />
          <span className="text-shimmer-blue italic">TALK.</span>
        </h1>

        <p
          className="contact-rise text-lg md:text-2xl text-slate-600 font-medium leading-snug max-w-xl mb-16 md:mb-20"
          style={{ animationDelay: '140ms' }}
        >
          Tell us what you need. You get a price and a timescale back.
        </p>

        <div className="border-b border-slate-200">
          {channels.map((c, i) => (
            <a
              key={c.key}
              href={c.href}
              {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="contact-rise group grid grid-cols-[auto_1fr_auto] items-center gap-5 md:gap-10 py-7 md:py-9 border-t border-slate-200"
              style={{ animationDelay: `${210 + i * 80}ms` }}
            >
              <span
                className={`w-14 h-14 md:w-16 md:h-16 shrink-0 rounded-2xl flex items-center justify-center ${c.tile} transition-transform duration-500 group-hover:scale-105`}
              >
                {c.logo}
              </span>

              <span className="min-w-0">
                <span className="block text-[9px] md:text-[10px] font-black uppercase tracking-[0.45em] text-slate-500 mb-2">
                  {c.label}
                </span>
                <span
                  className={`block font-syne font-black text-slate-950 tracking-[-0.03em] leading-none break-words transition-colors duration-300 group-hover:text-blue-600 ${c.size}`}
                >
                  {c.value}
                </span>
              </span>

              <ArrowUpRight
                size={28}
                className="shrink-0 text-slate-300 transition-all duration-500 group-hover:text-slate-950 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </a>
          ))}
        </div>

        <ul
          className="contact-rise mt-10 flex flex-wrap items-center gap-x-4 gap-y-3 text-[10px] md:text-[11px] font-black uppercase tracking-[0.35em] text-slate-500"
          style={{ animationDelay: '460ms' }}
        >
          {facts.map((f, i) => (
            <li key={f} className="flex items-center gap-4">
              {i > 0 && <span aria-hidden="true" className="w-1 h-1 rounded-full bg-slate-300" />}
              {f}
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        @keyframes contact-rise {
          from { opacity: 0; transform: translate3d(0, 20px, 0); }
          to   { opacity: 1; transform: none; }
        }
        .contact-rise {
          animation: contact-rise 0.75s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .contact-rise { animation: none; }
        }
      `}</style>
    </section>
  );
};

export default ContactForm;
