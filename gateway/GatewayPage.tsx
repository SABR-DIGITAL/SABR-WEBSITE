import React from 'react';
import { ArrowRight } from 'lucide-react';

// The intro gateway. Two real, crawlable destinations exist in the markup
// from the very first paint. The title card on top is a decorative overlay
// only, driven entirely by CSS (no JS, no onComplete gate) and never takes
// pointer events, so the page is usable before, during and after it runs.
//
// The panels are deliberately static: no hover growth, no layout shift.
// Phones and tablets stack them top and bottom; desktop sits them side by side.
const GatewayPage: React.FC = () => {
  return (
    <div className="gw-root relative h-[100dvh] w-full overflow-hidden bg-[#0A0D14]">
      {/* Real document heading for assistive tech and search engines. The
          title-card wordmark below is decorative and hidden from both. */}
      <h1 className="sr-only">SABR Digital — Web Design and AI Optimisation, Wiltshire</h1>

      <main className="relative flex h-full w-full flex-col lg:flex-row">
        <section
          aria-labelledby="gw-design-heading"
          className="gw-panel relative flex h-1/2 w-full flex-col items-center justify-center overflow-hidden px-6 text-center lg:h-full lg:w-1/2"
        >
          {/* The studio site's own hero photograph, so this half reads as
              the existing site from the first glance. */}
          <img
            src="/images/hero-bg-1920.jpg"
            srcSet="/images/hero-bg-1280.jpg 1280w, /images/hero-bg-1920.jpg 1920w, /images/hero-bg.jpg 3840w"
            sizes="(min-width: 1024px) 50vw, 100vw"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/55 to-black/80" />

          <div className="relative z-10 flex flex-col items-center gap-5 lg:gap-8">
            <h2
              id="gw-design-heading"
              className="gw-title font-syne font-black uppercase leading-[0.95] tracking-tighter text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
            >
              Web Design<br />
              <span className="text-shimmer-blue italic">Studio.</span>
            </h2>
            <a
              href="/web-design/"
              className="group inline-flex items-center gap-2.5 rounded-xl bg-[#f5f2eb] px-7 py-3.5 text-xs font-semibold tracking-wide text-stone-900 shadow-lg transition-colors duration-300 hover:bg-white focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400/50 sm:text-sm"
            >
              Visit the web design studio
              <ArrowRight size={15} aria-hidden="true" className="text-emerald-700" />
            </a>
          </div>
        </section>

        <section
          aria-labelledby="gw-aio-heading"
          className="gw-panel relative flex h-1/2 w-full flex-col items-center justify-center overflow-hidden bg-[#0f241d] px-6 text-center lg:h-full lg:w-1/2"
        >
          {/* Emerald glow and a faint grid: depth without an image. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(70% 60% at 50% 50%, rgba(16,185,129,0.28) 0%, rgba(15,36,29,0) 70%), linear-gradient(180deg, #0f241d 0%, #07130f 100%)'
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
              backgroundSize: '44px 44px',
              maskImage: 'radial-gradient(60% 60% at 50% 50%, #000 0%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(60% 60% at 50% 50%, #000 0%, transparent 100%)'
            }}
          />

          <div className="relative z-10 flex flex-col items-center gap-5 lg:gap-8">
            <h2
              id="gw-aio-heading"
              className="gw-title font-syne font-black uppercase leading-[0.95] tracking-tighter text-white"
            >
              AI<br />
              <span className="text-shimmer-blue italic">Optimisation.</span>
            </h2>
            <a
              href="/ai-optimisation/"
              className="group inline-flex items-center gap-2.5 rounded-xl bg-emerald-500 px-7 py-3.5 text-xs font-semibold tracking-wide text-[#07130f] shadow-lg shadow-emerald-900/40 transition-colors duration-300 hover:bg-emerald-400 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300/50 sm:text-sm"
            >
              Visit AI Optimisation
              <ArrowRight size={15} aria-hidden="true" />
            </a>
          </div>
        </section>

        {/* Hairline seam between the two halves. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent lg:inset-y-0 lg:left-1/2 lg:right-auto lg:top-0 lg:h-full lg:w-px lg:bg-gradient-to-b"
        />
      </main>

      {/* Decorative title card, styled like the studio site's own intro:
          dark plate, a hairline, and the wordmark climbing out of its mask.
          The plate then splits — up/down on phones and tablets, left/right on
          desktop — to reveal the panels already sitting underneath. */}
      <div aria-hidden="true" className="gw-curtain pointer-events-none fixed inset-0 z-50 select-none">
        <div className="gw-half gw-half-a absolute bg-[#0A0D14]" />
        <div className="gw-half gw-half-b absolute bg-[#0A0D14]" />
        <div className="gw-card absolute inset-0 flex flex-col items-center justify-center px-6">
          <div
            className="gw-rule mb-8 h-px w-full max-w-[22rem] md:mb-12 md:max-w-[34rem]"
            style={{ background: 'linear-gradient(90deg, rgba(5,150,105,0) 0%, #10b981 50%, rgba(5,150,105,0) 100%)' }}
          />
          <span className="font-syne flex items-baseline justify-center gap-[0.22em] whitespace-nowrap text-[clamp(1.4rem,7.8vw,3.3rem)] font-black tracking-tighter sm:text-[clamp(2.1rem,8vw,6rem)]">
            <span className="block overflow-hidden">
              <span className="gw-word gw-word-1 block leading-none text-white">SABR</span>
            </span>
            <span className="block overflow-hidden">
              <span className="gw-word gw-word-2 block leading-none">
                <span className="text-shimmer-blue">DIGITAL</span>
              </span>
            </span>
          </span>
        </div>
      </div>

      <style>{`
        /* Each title is sized against its own panel (width AND height), not
           the viewport, so the longest word, OPTIMISATION., always sits well
           inside its box whatever the screen shape. 13 characters of Syne
           800 run to roughly 12em, so 5.6cqw keeps it at about 70% of the
           panel width; the cqh term protects short, wide stacked panels. */
        .gw-panel { container-type: size; }
        .gw-title {
          font-size: min(5.6cqw, 11cqh, 4.5rem);
          max-width: 100%;
          /* Room for the italic overhang so the last letter is never clipped. */
          padding-inline: 0.12em;
        }
        @supports not (container-type: size) {
          .gw-title { font-size: clamp(1.4rem, 5.5vw, 3.25rem); }
        }

        /* Stacked (phones and tablets): halves are top and bottom. */
        .gw-half-a { left: 0; right: 0; top: 0; height: 50%; }
        .gw-half-b { left: 0; right: 0; bottom: 0; height: 50%; }
        @keyframes gw-open-a { to { transform: translate3d(0, -100%, 0); } }
        @keyframes gw-open-b { to { transform: translate3d(0, 100%, 0); } }

        /* Side by side (desktop): halves are left and right. */
        @media (min-width: 1024px) {
          .gw-half-a { top: 0; bottom: 0; left: 0; right: auto; width: 50%; height: auto; }
          .gw-half-b { top: 0; bottom: 0; right: 0; left: auto; width: 50%; height: auto; }
          @keyframes gw-open-a { to { transform: translate3d(-100%, 0, 0); } }
          @keyframes gw-open-b { to { transform: translate3d(100%, 0, 0); } }
        }

        .gw-word { transform: translate3d(0, 116%, 0); }
        .gw-rule { transform: scaleX(0); }

        @keyframes gw-word { to { transform: translate3d(0, 0, 0); } }
        @keyframes gw-rule {
          0%   { transform: scaleX(0); animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
          55%  { transform: scaleX(1); }
          100% { transform: scaleX(1); }
        }
        @keyframes gw-card-out {
          to { opacity: 0; transform: translate3d(0, 0, 0) scale(1.03); }
        }

        .gw-rule   { animation: gw-rule 1.1s linear both; }
        .gw-word-1 { animation: gw-word 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both; }
        .gw-word-2 { animation: gw-word 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.28s both; }
        .gw-card   { animation: gw-card-out 0.3s cubic-bezier(0.55, 0, 1, 0.45) 1.1s both; }
        .gw-half-a { animation: gw-open-a 0.8s cubic-bezier(0.87, 0, 0.13, 1) 1.2s both; }
        .gw-half-b { animation: gw-open-b 0.8s cubic-bezier(0.87, 0, 0.13, 1) 1.2s both; }

        /* Once the halves are off screen, drop the whole overlay so it stops
           holding compositor layers for the rest of the visit. */
        @keyframes gw-done { to { visibility: hidden; } }
        .gw-curtain { animation: gw-done 0s linear 2.05s both; }

        .gw-half, .gw-word, .gw-rule, .gw-card { will-change: transform, opacity; }

        @media (prefers-reduced-motion: reduce) {
          .gw-curtain { display: none; }
        }
      `}</style>
    </div>
  );
};

export default GatewayPage;
