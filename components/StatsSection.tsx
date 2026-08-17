
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// THE RISK OF SILENCE
//
// Same three statistics, same cream-and-blue vibe as before — the drama is all
// in how it arrives. Each figure is a ring that draws itself round while the
// number counts up, a lit dot rides the end of the stroke, and a shockwave
// leaves the ring the moment it lands. Nothing in here tracks the pointer and
// there is no grid: the rings are the only movement on the section.

const RING_RADIUS = 86;
const CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

interface StatProps {
  percentage: number;
  label: string;
  sub: string;
  /** Stroke colours — the ring runs from the first to the second. */
  from: string;
  to: string;
  index: number;
}

const StatRing: React.FC<StatProps> = ({ percentage, label, sub, from, to, index }) => {
  const [count, setCount] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const arcRef = useRef<SVGCircleElement>(null);
  const tipRef = useRef<SVGGElement>(null);
  const waveRef = useRef<HTMLSpanElement>(null);
  const gradientId = `stat-grad-${index}`;

  useEffect(() => {
    const reduce =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const arc = arcRef.current;
    const endOffset = CIRCUMFERENCE * (1 - percentage / 100);

    // With motion turned down, everything simply is where it lands.
    if (reduce) {
      setCount(percentage);
      if (arc) arc.style.strokeDashoffset = String(endOffset);
      gsap.set(rootRef.current, { opacity: 1, y: 0, scale: 1 });
      gsap.set(tipRef.current, { rotate: -90 + (percentage / 100) * 360 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(arc, { strokeDashoffset: CIRCUMFERENCE });
      gsap.set(tipRef.current, { rotate: -90, transformOrigin: '50% 50%' });

      ScrollTrigger.create({
        trigger: rootRef.current,
        start: 'top 82%',
        fastScrollEnd: true,
        onEnter: () => {
          const tl = gsap.timeline({ delay: index * 0.16 });

          // The whole tile arrives, straight on — no tilt.
          tl.fromTo(
            rootRef.current,
            { opacity: 0, y: 64, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: 1.15, ease: 'expo.out', force3D: true },
            0
          );

          // The stroke draws, the dot rides its end, the number keeps pace.
          tl.to(arc, { strokeDashoffset: endOffset, duration: 2.1, ease: 'power3.inOut' }, 0.12);
          tl.to(
            tipRef.current,
            { rotate: -90 + (percentage / 100) * 360, duration: 2.1, ease: 'power3.inOut' },
            0.12
          );
          tl.to(
            { val: 0 },
            {
              val: percentage,
              duration: 2.1,
              ease: 'power3.inOut',
              onUpdate: function () {
                setCount(Math.round(this.targets()[0].val));
              }
            },
            0.12
          );

          // And it lands: one shockwave out of the ring.
          tl.fromTo(
            waveRef.current,
            { opacity: 0.55, scale: 0.82 },
            { opacity: 0, scale: 1.45, duration: 1.5, ease: 'power2.out' },
            1.95
          );
        }
      });
    }, rootRef);

    return () => ctx.revert();
  }, [percentage, index]);

  return (
    <div
      ref={rootRef}
      className="stat-tile group flex flex-col items-center gap-8 opacity-0"
      style={{ transform: 'translateZ(0)' }}
    >
      <div className="relative w-52 h-52 md:w-56 md:h-56 lg:w-60 lg:h-60 grid place-items-center">
        {/* Soft light under the ring, always breathing. */}
        <span
          aria-hidden="true"
          className="stat-breathe absolute inset-6 rounded-full blur-[38px] opacity-35 group-hover:opacity-70 transition-opacity duration-700"
          style={{ background: `radial-gradient(circle, ${from} 0%, transparent 68%)` }}
        />

        {/* The shockwave, fired once as the count lands. */}
        <span
          ref={waveRef}
          aria-hidden="true"
          className="absolute inset-0 rounded-full opacity-0"
          style={{ border: `1px solid ${from}` }}
        />

        {/* A dashed collar, turning very slowly. */}
        <span
          aria-hidden="true"
          className="stat-spin absolute inset-[-14px] rounded-full border border-dashed border-slate-200 group-hover:border-blue-300 transition-colors duration-700"
        />

        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full -rotate-90">
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={from} />
              <stop offset="100%" stopColor={to} />
            </linearGradient>
          </defs>
          <circle
            cx="100"
            cy="100"
            r={RING_RADIUS}
            fill="none"
            stroke="#E7EEF8"
            strokeWidth="7"
          />
          <circle
            ref={arcRef}
            cx="100"
            cy="100"
            r={RING_RADIUS}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE}
          />
        </svg>

        {/* The lit dot that rides the end of the stroke. */}
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full pointer-events-none">
          <g ref={tipRef}>
            <circle cx="100" cy={100 - RING_RADIUS} r="7" fill={from} opacity="0.22" />
            <circle cx="100" cy={100 - RING_RADIUS} r="3.4" fill={from} />
          </g>
        </svg>

        <div className="relative z-10 text-center">
          <div className="font-syne text-5xl md:text-6xl font-black tracking-tighter tabular-nums text-slate-950">
            {count}
            <span className="text-xl ml-1 font-bold" style={{ color: from }}>
              %
            </span>
          </div>
          <div
            className="mt-3 h-[3px] w-8 mx-auto rounded-full group-hover:w-16 transition-all duration-700"
            style={{ backgroundColor: from }}
          />
        </div>
      </div>

      <div className="text-center max-w-[280px]">
        <h4 className="text-slate-950 font-black text-[15px] md:text-[16px] uppercase tracking-[0.5em] mb-4 group-hover:text-blue-600 transition-colors duration-500">
          {label}
        </h4>
        <p className="text-slate-400 font-bold text-[13px] leading-relaxed tracking-tight italic opacity-80 group-hover:opacity-100 transition-opacity duration-500">
          &ldquo;{sub}&rdquo;
        </p>
      </div>
    </div>
  );
};

const STATS: Omit<StatProps, 'index'>[] = [
  {
    percentage: 38,
    label: 'TRUST',
    sub: 'of people judge your business credibility based on your website at a glance.',
    from: '#2563EB',
    to: '#60A5FA'
  },
  {
    percentage: 70,
    label: 'RESEARCH',
    sub: 'of customers check a website before visiting, even if they found you on social media.',
    from: '#06B6D4',
    to: '#67E8F9'
  },
  {
    percentage: 88,
    label: 'EXPERIENCE',
    sub: "won't return after a bad website experience—even if your physical craft is great.",
    from: '#4F46E5',
    to: '#818CF8'
  }
];

const StatsSection: React.FC = () => {
  return (
    <section
      className="relative py-24 md:py-28 px-6 bg-[#fdfbf7] border-y border-slate-100 overflow-hidden"
    >
      {/* Background: two soft, still washes. No grid, and nothing that reacts to
          the pointer — the rings are the only thing moving in here. */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="risk-orb risk-orb-a absolute -top-24 -left-16 w-[46vw] h-[46vw] rounded-full" />
        <div className="risk-orb risk-orb-b absolute -bottom-32 -right-10 w-[40vw] h-[40vw] rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="mb-16 md:mb-20 text-center flex flex-col items-center">
          <div className="risk-eyebrow flex items-center gap-4 mb-7">
            <span className="h-[2px] w-10 bg-blue-600 origin-right risk-rule" />
            <span className="text-blue-600 font-black text-[11px] uppercase tracking-[0.8em]">
              USER PSYCHOLOGY
            </span>
            <span className="h-[2px] w-10 bg-blue-600 origin-left risk-rule" />
          </div>

          <h2 className="font-syne text-[clamp(2rem,8vw,4.5rem)] font-black text-slate-950 tracking-tighter uppercase leading-[0.88]">
            <span className="risk-mask">
              <span className="risk-mask-in">THE RISK OF</span>
            </span>
            <span className="risk-mask">
              <span className="risk-mask-in" style={{ animationDelay: '150ms' }}>
                <span className="risk-shimmer italic">SILENCE.</span>
              </span>
            </span>
          </h2>

          <p className="risk-fade mt-7 max-w-xl text-slate-500 font-bold text-[13px] md:text-sm leading-relaxed tracking-tight">
            An empty search result is a decision made without you in the room.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 lg:gap-24 justify-items-center items-start">
          {STATS.map((stat, i) => (
            <StatRing key={stat.label} {...stat} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        .risk-orb { filter: blur(70px); opacity: 0.5; }
        .risk-orb-a { background: radial-gradient(circle, rgba(37,99,235,0.22), transparent 65%); }
        .risk-orb-b { background: radial-gradient(circle, rgba(6,182,212,0.18), transparent 68%); }

        /* Heading: each line out of its own mask, then the rules draw outwards. */
        .risk-mask { display: block; overflow: hidden; padding-bottom: 0.1em; margin-bottom: -0.1em; }
        @keyframes risk-mask-rise {
          from { transform: translate3d(0, 108%, 0); }
          to { transform: none; }
        }
        .risk-mask-in { display: block; animation: risk-mask-rise 1.15s cubic-bezier(0.22, 1, 0.36, 1) both; }

        @keyframes risk-rule-in {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        .risk-rule { display: block; animation: risk-rule-in 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.35s both; }

        @keyframes risk-fade-in {
          from { opacity: 0; transform: translate3d(0, 16px, 0); }
          to { opacity: 1; transform: none; }
        }
        .risk-eyebrow { animation: risk-fade-in 0.8s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .risk-fade { animation: risk-fade-in 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.55s both; }

        /* SILENCE. gets the light moving through it. */
        .risk-shimmer {
          background: linear-gradient(90deg, #2563eb 0%, #38bdf8 22%, #2563eb 46%, #4f46e5 70%, #2563eb 100%);
          background-size: 220% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: #2563eb;
          animation: risk-shine 6s linear infinite;
        }
        @keyframes risk-shine { to { background-position: 220% center; } }

        @keyframes stat-breathe {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.14); opacity: 0.55; }
        }
        .stat-breathe { animation: stat-breathe 7s ease-in-out infinite; }

        @keyframes stat-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .stat-spin { animation: stat-spin 44s linear infinite; }

        @media (prefers-reduced-motion: reduce) {
          .stat-breathe, .stat-spin, .risk-shimmer,
          .risk-mask-in, .risk-rule, .risk-eyebrow, .risk-fade { animation: none; }
          .risk-shimmer { -webkit-text-fill-color: #2563eb; }
        }
      `}</style>
    </section>
  );
};

export default StatsSection;
