import React, { useLayoutEffect, useRef, useState } from 'react';

interface IntroPortalProps {
  onComplete: () => void;
}

// Hard stop. However badly anything else goes, the site becomes reachable.
const FAILSAFE_MS = 7200;
// How long we will wait for Syne before starting. Long enough that the webfont
// almost always wins, short enough that nobody notices the pause.
const FONT_WAIT_MS = 900;

// A title card, not a light show.
//
// This version is driven entirely by CSS keyframes, and that is the point.
// The previous one animated the two words with GSAP's yPercent on top of an
// inline percentage transform. GSAP reads the existing transform back out of
// the computed matrix as pixels, so the inline 116% became a pixel y offset
// that stayed applied underneath the tween — the words animated from 232%
// to 116% and never appeared. Percentages in one system, matrices in another.
//
// Keyframes cannot make that mistake: the hidden state IS the first keyframe,
// the browser owns the interpolation, and animation-fill-mode holds both ends.
// It also drops GSAP off the critical path, so a slow chunk can no longer
// leave the wordmark stuck behind its mask.
//
// Timing, from the moment the sequence starts:
//   0.00  the hairline opens outward
//   0.30  SABR climbs out from behind its mask
//   0.46  DIGITAL follows
//   0.30  the whole lockup settles from 1.055 to 1 across 3.4s
//   1.25  the caption drifts up
//   2.85  the caption steps back, the hairline closes
//   3.05  the plate lifts, the type riding up faster than the plate does
//   4.40  done
const IntroPortal: React.FC<IntroPortalProps> = ({ onComplete }) => {
  const [go, setGo] = useState(false);

  // Held in refs so nothing here depends on a re-render. The guard means the
  // handover happens exactly once, whichever of the three routes gets there
  // first: the curtain finishing, the reduced-motion hold, or the failsafe.
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const doneRef = useRef(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    onCompleteRef.current();
  };

  // Layout effect, not effect: this runs before the browser paints.
  useLayoutEffect(() => {
    const failsafe = window.setTimeout(finish, FAILSAFE_MS);

    const reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Anyone who has asked for less movement gets the card held still and then
    // handed over. The stylesheet below flattens every animation for them, so
    // all that is needed here is the timer.
    if (reduceMotion) {
      setGo(true);
      const hold = window.setTimeout(finish, 1500);
      return () => {
        window.clearTimeout(hold);
        window.clearTimeout(failsafe);
      };
    }

    // Syne loads with display=swap. Starting before it lands would show the
    // wordmark change width mid-rise, which is exactly the flicker to avoid.
    // Whichever comes first — fonts ready, or the cap — starts the sequence.
    let started = false;
    let cap = 0;
    const start = () => {
      if (started) return;
      started = true;
      window.clearTimeout(cap);
      setGo(true);
    };

    const fonts = (document as any).fonts;
    if (fonts && typeof fonts.ready?.then === 'function') {
      cap = window.setTimeout(start, FONT_WAIT_MS);
      fonts.ready.then(start).catch(start);
    } else {
      start();
    }

    return () => {
      window.clearTimeout(cap);
      window.clearTimeout(failsafe);
    };
    // Mount only — see the refs above.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // animationend bubbles, so check it is the curtain on this element and not a
  // word arriving underneath it.
  const handleAnimationEnd = (event: React.AnimationEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    if (event.animationName.indexOf('ip-curtain') === -1) return;
    finish();
  };

  return (
    <div
      onAnimationEnd={handleAnimationEnd}
      className={`ip-root fixed inset-0 z-[4000] bg-[#0A0D14] overflow-hidden font-syne select-none ${
        go ? 'ip-go' : ''
      }`}
    >
      {/* Lens vignette — depth, so the plate does not read as flat black. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(115% 115% at 50% 45%, rgba(10,13,20,0) 38%, rgba(0,0,0,0.65) 100%)'
        }}
      />

      <div className="ip-stage relative h-full w-full flex flex-col items-center justify-center px-6">
        <div
          aria-hidden="true"
          className="ip-rule w-full max-w-[22rem] md:max-w-[34rem] h-px mb-8 md:mb-12"
          style={{
            background:
              'linear-gradient(90deg, rgba(37,99,235,0) 0%, #2563eb 50%, rgba(37,99,235,0) 100%)'
          }}
        />

        {/* The size lives on the h1 so the em-based gap between the two words
            scales with the type instead of with the inherited body size. */}
        <h1 className="ip-lockup flex items-baseline justify-center gap-[0.22em] whitespace-nowrap text-[clamp(2.1rem,9vw,6rem)] font-black tracking-tighter">
          <span className="block overflow-hidden">
            <span className="ip-word ip-word-1 block text-white leading-none">SABR</span>
          </span>
          <span className="block overflow-hidden">
            {/* The shimmer sits on an inner span so it keeps its own infinite
                background animation while the wrapper does the rising. */}
            <span className="ip-word ip-word-2 block leading-none">
              <span className="text-shimmer-blue">DIGITAL</span>
            </span>
          </span>
        </h1>

        <p className="ip-caption mt-8 md:mt-12 text-[9px] md:text-[11px] font-bold uppercase tracking-[0.55em] text-[#8A93A6] text-center">
          Web design studio
        </p>
      </div>

      <style>{`
        /* First-paint state. No word, rule or caption is ever visible before
           the sequence owns it, and no script is needed to make that true. */
        .ip-word { transform: translate3d(0, 116%, 0); }
        .ip-rule { transform: scaleX(0); }
        .ip-caption { opacity: 0; }

        .ip-root, .ip-stage, .ip-word, .ip-rule, .ip-lockup, .ip-caption {
          will-change: transform, opacity;
        }

        @keyframes ip-word {
          from { transform: translate3d(0, 116%, 0); }
          to   { transform: translate3d(0, 0, 0); }
        }

        /* One animation for the whole life of the hairline: expo out as it
           opens, a hold, then a smooth close on the way out. */
        @keyframes ip-rule {
          0%     { transform: scaleX(0); animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
          42.25% { transform: scaleX(1); animation-timing-function: linear; }
          80.28% { transform: scaleX(1); animation-timing-function: cubic-bezier(0.65, 0, 0.35, 1); }
          100%   { transform: scaleX(0); }
        }

        /* A push-in slow enough that you feel it rather than see it. */
        @keyframes ip-settle {
          from { transform: scale(1.055); }
          to   { transform: scale(1); }
        }

        @keyframes ip-caption {
          0%     { opacity: 0; transform: translate3d(0, 14px, 0); animation-timing-function: cubic-bezier(0.33, 1, 0.68, 1); }
          55.81% { opacity: 1; transform: translate3d(0, 0, 0); animation-timing-function: linear; }
          74.42% { opacity: 1; transform: translate3d(0, 0, 0); animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45); }
          100%   { opacity: 0; transform: translate3d(0, 0, 0); }
        }

        /* The type rides up faster than the plate, so the exit reads as one
           continuous movement rather than a fade followed by a wipe. */
        @keyframes ip-stage {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(0, -14%, 0); }
        }

        @keyframes ip-curtain {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(0, -100%, 0); }
        }

        .ip-go .ip-rule    { animation: ip-rule 3.55s linear both; }
        .ip-go .ip-word-1  { animation: ip-word 1.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both; }
        .ip-go .ip-word-2  { animation: ip-word 1.8s cubic-bezier(0.16, 1, 0.3, 1) 0.46s both; }
        .ip-go .ip-lockup  { animation: ip-settle 3.4s cubic-bezier(0.33, 1, 0.68, 1) 0.3s both; }
        .ip-go .ip-caption { animation: ip-caption 2.15s linear 1.25s both; }
        .ip-go .ip-stage   { animation: ip-stage 1.35s cubic-bezier(0.87, 0, 0.13, 1) 3.05s both; }
        .ip-go.ip-root     { animation: ip-curtain 1.35s cubic-bezier(0.87, 0, 0.13, 1) 3.05s both; }

        @media (prefers-reduced-motion: reduce) {
          .ip-word, .ip-rule, .ip-caption { transform: none; opacity: 1; }
          .ip-go .ip-rule, .ip-go .ip-word-1, .ip-go .ip-word-2,
          .ip-go .ip-lockup, .ip-go .ip-caption, .ip-go .ip-stage,
          .ip-go.ip-root { animation: none; }
          .ip-root, .ip-stage, .ip-word, .ip-rule, .ip-lockup, .ip-caption { will-change: auto; }
        }
      `}</style>
    </div>
  );
};

export default IntroPortal;
