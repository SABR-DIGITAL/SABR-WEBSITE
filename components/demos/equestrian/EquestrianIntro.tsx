import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { academy, palette } from './equestrianData';
import { HORSE_STROKES, HORSE_VIEWBOX } from './EquestrianUI';

// Plays once per page load. Clicking through to another page and back does not
// replay it, which is how a real visitor would want it to behave.
let introPlayed = false;

const FAILSAFE_MS = 7000;

// When each of the twelve strokes starts drawing and how long it takes. The
// order is the order a hand would work in: the crest gives the head its shape,
// the face and muzzle come down and round, the cheek and throat fall away —
// then the ear pricks up, the brow marks flick in, and the eye and mouth land
// last, which is the moment the drawing starts looking back at you.
//
// Several of them overlap on purpose. One line finishing before the next begins
// reads as a machine ticking through a list; a second line setting off while the
// first is still travelling reads as someone drawing.
const SCHEDULE: { key: string; at: number; dur: number; ease: string }[] = [
  { key: 'crest', at: 0, dur: 1.4, ease: 'power1.inOut' },
  { key: 'face', at: 0.75, dur: 0.95, ease: 'power1.inOut' },
  { key: 'cheek', at: 1.0, dur: 0.95, ease: 'power1.inOut' },
  { key: 'throat', at: 1.45, dur: 1.05, ease: 'power1.inOut' },
  { key: 'muzzle', at: 1.5, dur: 0.6, ease: 'power2.out' },
  { key: 'earTop', at: 1.95, dur: 0.33, ease: 'power2.out' },
  { key: 'earBase', at: 2.08, dur: 0.28, ease: 'power2.out' },
  { key: 'browUp', at: 2.3, dur: 0.22, ease: 'power2.out' },
  { key: 'browMid', at: 2.38, dur: 0.22, ease: 'power2.out' },
  { key: 'browDown', at: 2.46, dur: 0.22, ease: 'power2.out' },
  { key: 'eye', at: 2.6, dur: 0.28, ease: 'power2.out' },
  { key: 'mouth', at: 2.78, dur: 0.22, ease: 'power2.out' }
];

// The opening: a single line draws the horse's head, the name settles underneath
// it, and the whole card glides away. Stroke, transform and opacity only —
// nothing here forces a layout pass mid-animation.
const EquestrianIntro: React.FC = () => {
  const [mounted] = useState(() => !introPlayed);
  const [hidden, setHidden] = useState(introPlayed);

  const plateRef = useRef<HTMLDivElement>(null);
  const artRef = useRef<SVGSVGElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    if (!mounted) return;
    introPlayed = true;

    const plate = plateRef.current;
    const art = artRef.current;
    const rule = ruleRef.current;
    const word = wordRef.current;
    const caption = captionRef.current;
    if (!plate || !art || !rule || !word || !caption) {
      setHidden(true);
      return;
    }

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      setHidden(true);
    };
    const failsafe = window.setTimeout(finish, FAILSAFE_MS);

    const reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const lines = art.querySelectorAll<SVGPathElement>('path');

      if (reduceMotion) {
        gsap.set(lines, { strokeDashoffset: 0 });
        gsap.set([word, caption, rule], { opacity: 1, y: 0 });
        gsap.to(plate, { opacity: 0, duration: 0.5, delay: 1.1, onComplete: finish });
        return;
      }

      gsap.set([word, caption], { opacity: 0, y: 18 });
      gsap.set(rule, { scaleX: 0 });

      const tl = gsap.timeline({ defaults: { force3D: true } });
      timeline.current = tl;

      const scheduled: SVGPathElement[] = [];

      SCHEDULE.forEach((step) => {
        const path = art.querySelector<SVGPathElement>(`.hs-${step.key}`);
        if (!path) return;
        scheduled.push(path);
        tl.to(path, { strokeDashoffset: 0, duration: step.dur, ease: step.ease }, step.at);
      });

      // Every stroke starts hidden behind its dash offset, so a stroke added to
      // the geometry without a matching line in SCHEDULE would simply never
      // appear — an invisible piece of the horse, with nothing to show it had
      // gone missing. Anything unscheduled draws itself in with the details.
      const unscheduled = Array.prototype.filter.call(
        lines,
        (path: SVGPathElement) => scheduled.indexOf(path) === -1
      ) as SVGPathElement[];
      if (unscheduled.length) {
        tl.to(unscheduled, { strokeDashoffset: 0, duration: 0.4, ease: 'power2.out' }, 2.6);
      }

      // The name arrives underneath the finished drawing.
      tl.to(rule, { scaleX: 1, duration: 0.9, ease: 'expo.out' }, 2.7);
      tl.to(word, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 2.85);
      tl.to(caption, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 3.05);

      // Everything glides up together and the card leaves.
      tl.to(plate, { yPercent: -100, duration: 1.15, ease: 'expo.inOut', onComplete: finish }, 3.75);
    }, plate);

    return () => {
      window.clearTimeout(failsafe);
      ctx.revert();
    };
    // Runs once — see the module flag above.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!mounted || hidden) return null;

  const skip = () => {
    // A tap takes you straight to the site rather than sitting through it.
    timeline.current?.progress(1);
    setHidden(true);
  };

  return (
    <div
      ref={plateRef}
      onClick={skip}
      className="fixed inset-0 z-[1200] bg-[#FFFAF3] flex flex-col items-center justify-center px-8 cursor-pointer will-change-transform"
      aria-hidden="true"
    >
      {/* A soft floral wash so the card is not a flat block of cream. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 55% at 22% 18%, rgba(228,87,122,0.10) 0%, rgba(255,250,243,0) 70%), radial-gradient(55% 50% at 82% 78%, rgba(242,178,62,0.14) 0%, rgba(255,250,243,0) 70%), radial-gradient(45% 45% at 78% 12%, rgba(121,192,224,0.12) 0%, rgba(255,250,243,0) 70%)'
        }}
      />

      {/* Sized off the viewport height, because the head is taller than it is
          wide — that keeps the whole drawing plus the name in view on a laptop
          and on a phone without either running off the bottom. Stroke weights
          come from the geometry itself, in viewBox units, so the heavy crest and
          the hairline brow keep their relationship at any size. The explicit
          aspect ratio is belt and braces: an SVG with a definite height and an
          auto width should resolve from the viewBox, but stating it means the
          drawing can never collapse to zero width inside a flex column on an
          engine that gets that wrong. */}
      <svg
        ref={artRef}
        viewBox={HORSE_VIEWBOX}
        className="relative h-[min(44vh,300px)] w-auto aspect-[298/346] shrink-0"
        fill="none"
        stroke={palette.ink}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {HORSE_STROKES.map((s) => (
          <path
            key={s.key}
            className={`hs-${s.key}`}
            d={s.d}
            strokeWidth={s.w}
            pathLength={1}
            style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
          />
        ))}
      </svg>

      <div
        ref={ruleRef}
        className="relative mt-6 md:mt-8 h-px w-[min(70vw,320px)] origin-center will-change-transform"
        style={{
          background: `linear-gradient(90deg, rgba(228,87,122,0) 0%, ${palette.rose} 50%, rgba(228,87,122,0) 100%)`
        }}
      />

      <div ref={wordRef} className="relative mt-6 md:mt-8 text-center will-change-transform">
        <p className="font-serif text-[clamp(1.7rem,7vw,3.1rem)] leading-none tracking-[-0.01em] text-[#1E2A22]">
          {academy.name}
        </p>
      </div>

      <p
        ref={captionRef}
        className="relative mt-4 text-[9px] md:text-[10px] uppercase tracking-[0.5em] text-[#6B7A6F] text-center will-change-transform"
      >
        Riding Academy &middot; Wiltshire
      </p>
    </div>
  );
};

export default EquestrianIntro;
