import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EMAIL = 'Sabrdigitalwilts@gmail.com';
const PHONE_DISPLAY = '07398 103339';
const PHONE_HREF = 'tel:+447398103339';
const WHATSAPP_URL =
  'https://wa.me/447398103339?text=Hi%20Raphael%2C%20I%E2%80%99d%20like%20to%20refer%20a%20business%20for%20a%20website.';

const WhatsAppLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.898 9.83 9.83 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.82 11.82 0 0 0 20.465 3.49" />
  </svg>
);

const STEPS = [
  {
    num: '01',
    title: 'Introduce Us',
    body: 'Drop us a quick email, text, or call with their business name—or simply ask them to mention your name when they first get in touch.'
  },
  {
    num: '02',
    title: 'We Build Their Site',
    body: 'We take care of the entire bespoke build or full redesign—design, copy, speed, and launch—from first chat to going live.'
  },
  {
    num: '03',
    title: 'You Get £100',
    body: 'As soon as their finished website launches and full payment clears, we transfer £100 directly into your bank account.'
  }
];

const CHANNELS = [
  {
    key: 'email',
    label: 'Email Us',
    value: EMAIL,
    hint: 'Opens your email app with “Website Referral” pre-filled',
    href: `mailto:${EMAIL}?subject=Website%20Referral`,
    external: false,
    tile: 'bg-[#059669] text-white',
    icon: <Mail className="w-6 h-6 md:w-7 md:h-7" strokeWidth={2.2} />,
    valueSize: 'text-[clamp(1.1rem,3vw,2.1rem)]'
  },
  {
    key: 'whatsapp',
    label: 'Message Us',
    value: `WhatsApp ${PHONE_DISPLAY}`,
    hint: 'Send a quick referral message anytime — replies within 12 hours',
    href: WHATSAPP_URL,
    external: true,
    tile: 'bg-[#25D366] text-white',
    icon: <WhatsAppLogo className="w-6 h-6 md:w-7 md:h-7" />,
    valueSize: 'text-[clamp(1.4rem,3.6vw,2.35rem)]'
  },
  {
    key: 'phone',
    label: 'Call Us',
    value: PHONE_DISPLAY,
    hint: 'Speak directly with Raphael — Monday to Sunday, 8am – 8pm',
    href: PHONE_HREF,
    external: false,
    tile: 'bg-slate-950 text-white',
    icon: <Phone className="w-6 h-6 md:w-7 md:h-7" strokeWidth={2.1} />,
    valueSize: 'text-[clamp(1.5rem,3.8vw,2.5rem)]'
  }
];

const FINE_PRINT = [
  {
    label: 'Open to everyone',
    text: 'Anyone can refer a business—you don’t need to have worked with us before.'
  },
  {
    label: 'Qualifying projects',
    text: 'Applies to full website builds and major redesigns for new clients not already speaking with us.'
  },
  {
    label: 'No cap',
    text: 'Introduce as many businesses as you wish—earn £100 for every completed, paid project.'
  }
];

const CountUpHundred: React.FC = () => {
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      setAmount(100);
      return;
    }

    let rafId = 0;
    const duration = 1350;
    const start = performance.now() + 180;

    const tick = (now: number) => {
      if (now < start) {
        rafId = window.requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAmount(Math.round(eased * 100));
      if (progress < 1) {
        rafId = window.requestAnimationFrame(tick);
      } else {
        setAmount(100);
      }
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, []);

  return <span className="tabular-nums">{amount}</span>;
};

const ReferralsPage: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const root = rootRef.current;
    if (!root) return;

    const reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.ref-glide-group').forEach((group) => {
        const items = group.querySelectorAll('.ref-glide-item');
        if (!items.length) return;
        gsap.fromTo(
          items,
          { y: 26, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.72,
            stagger: 0.1,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
            scrollTrigger: {
              trigger: group,
              start: 'top 92%',
              once: true
            }
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      aria-labelledby="referrals-heading"
      className="bg-[#fdfbf7] min-h-screen pt-24 md:pt-48 pb-24 md:pb-48 px-5 md:px-10 lg:px-16 overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto">

        {/* HERO HEADER */}
        <header className="mb-16 md:mb-32">
          <p
            className="ref-rise mb-4 md:mb-6 text-[9px] md:text-[11px] font-black uppercase tracking-[0.45em] text-emerald-700"
            style={{ animationDelay: '0ms' }}
          >
            Referrals
          </p>

          <h1
            id="referrals-heading"
            className="ref-rise font-syne text-[clamp(2.15rem,8.2vw,5rem)] font-black text-slate-950 tracking-tighter uppercase leading-[0.92] mb-8 md:mb-12"
            style={{ animationDelay: '80ms' }}
          >
            REFER A CLIENT <br />
            <span className="text-shimmer-blue italic inline-block pr-2">
              EARN £<CountUpHundred />.
            </span>
          </h1>

          <div
            className="ref-rise max-w-3xl border-l-[4px] md:border-l-[8px] border-emerald-100 pl-5 md:pl-14"
            style={{ animationDelay: '160ms' }}
          >
            <p className="text-base md:text-xl lg:text-2xl text-slate-500 font-medium italic leading-relaxed">
              You don’t need to be a past client to introduce someone. If you know a business looking for a brand-new site or a major redesign, send them our way—and once their new website launches, we’ll send you £100.
            </p>
          </div>
        </header>

        {/* HOW IT WORKS — Open Editorial Columns Separated by Hairline Rules (Zero Clamped Boxes) */}
        <div className="ref-glide-group mb-20 md:mb-36">
          <div className="ref-glide-item flex items-center gap-4 mb-10 md:mb-14">
            <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.45em] text-emerald-700">
              How It Works
            </span>
            <span className="flex-1 h-px bg-slate-200/90" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 lg:gap-20 py-4 md:py-8 border-b border-slate-200/90 pb-14 md:pb-20">
            {STEPS.map((step) => (
              <div key={step.num} className="ref-glide-item flex flex-col items-start">
                <span className="font-syne text-4xl md:text-5xl font-black text-emerald-600/85 tracking-tighter leading-none mb-5 md:mb-7 tabular-nums">
                  {step.num}
                </span>
                <h2 className="font-syne text-xl md:text-2xl font-black uppercase tracking-tight text-slate-950 mb-3 md:mb-4">
                  {step.title}
                </h2>
                <p className="text-sm md:text-base text-slate-600 font-normal leading-[1.8]">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* DIRECT REFERRAL CHANNELS — Spacious Open Rows */}
        <div className="ref-glide-group mb-20 md:mb-36">
          <div className="ref-glide-item flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 md:mb-14">
            <div>
              <p className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.45em] text-emerald-700 mb-3">
                Ready To Introduce Someone?
              </p>
              <h2 className="font-syne text-2xl sm:text-3xl md:text-4xl font-black text-slate-950 uppercase tracking-tight leading-none">
                SEND A REFERRAL <span className="text-shimmer-blue italic">DIRECTLY.</span>
              </h2>
            </div>
            <p className="text-xs md:text-sm text-slate-500 italic">
              Just share their name and business—we’ll handle everything from there.
            </p>
          </div>

          <div className="border-b border-slate-200">
            {CHANNELS.map((c) => (
              <a
                key={c.key}
                href={c.href}
                {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="ref-glide-item group grid grid-cols-[auto_1fr_auto] items-center gap-5 md:gap-10 py-8 md:py-11 border-t border-slate-200"
              >
                <span
                  className={`w-14 h-14 md:w-16 md:h-16 shrink-0 rounded-2xl flex items-center justify-center ${c.tile} transition-transform duration-500 group-hover:scale-105`}
                >
                  {c.icon}
                </span>

                <span className="min-w-0">
                  <span className="block text-[9px] md:text-[10px] font-black uppercase tracking-[0.45em] text-slate-500 mb-1.5 md:mb-2">
                    {c.label}
                  </span>
                  <span
                    className={`block font-inter font-semibold text-slate-950 tracking-[-0.02em] tabular-nums leading-tight break-words transition-colors duration-300 group-hover:text-emerald-600 ${c.valueSize}`}
                  >
                    {c.value}
                  </span>
                  <span className="block text-xs md:text-sm text-slate-400 mt-1.5">
                    {c.hint}
                  </span>
                </span>

                <ArrowUpRight
                  size={28}
                  className="shrink-0 text-slate-300 transition-all duration-500 group-hover:text-slate-950 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </a>
            ))}
          </div>
        </div>

        {/* THE FINE PRINT — Calm, Open Typographic Strip Underneath */}
        <footer className="ref-glide-group pt-4">
          <p className="ref-glide-item text-[9.5px] md:text-[10px] font-black uppercase tracking-[0.42em] text-slate-400 mb-8 md:mb-10">
            The Fine Print
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-14">
            {FINE_PRINT.map((item) => (
              <div key={item.label} className="ref-glide-item space-y-2">
                <h3 className="text-xs font-black uppercase tracking-[0.22em] text-slate-800">
                  {item.label}
                </h3>
                <p className="text-xs md:text-[13px] text-slate-500 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </footer>

      </div>

      <style>{`
        @keyframes ref-rise {
          from { opacity: 0; transform: translate3d(0, 20px, 0); }
          to   { opacity: 1; transform: none; }
        }
        .ref-rise {
          animation: ref-rise 0.75s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .ref-rise { animation: none; }
        }
      `}</style>
    </section>
  );
};

export default ReferralsPage;
