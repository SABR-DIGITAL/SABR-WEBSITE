import React, { useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

export type GatewaySite = 'web-design' | 'ai-optimisation';
type Site = GatewaySite;

// How long the panel-fill takes. The destination site is only swapped in
// underneath once this has finished, so the growth is never cut short.
const EXIT_MS = 650;
// However slow the network, never leave someone staring at the expanded
// panel: past this, the handover goes ahead without waiting on the photo.
const IMAGE_WAIT_MS = 2500;

// Each destination's hero photo, exactly as its hero <picture> declares it.
// The gateway panels use the same srcset and sizes, so the browser has
// already picked, downloaded and decoded the very file the hero is about to
// ask for. These are the WebP candidates (every current browser decodes
// WebP); the <picture> elements keep the original JPEGs as a fallback. The
// extra 2560 step stops Retina laptops jumping straight to the 3840 file.
export const HERO: Record<Site, { src: string; srcSet: string }> = {
  'web-design': {
    src: '/images/hero-bg-1920.webp',
    srcSet:
      '/images/hero-bg-1280.webp 1280w, /images/hero-bg-1920.webp 1920w, /images/hero-bg-2560.webp 2560w, /images/hero-bg-3840.webp 3840w'
  },
  'ai-optimisation': {
    src: '/images/aio-panel-1735.webp',
    srcSet: '/images/aio-panel-1100.webp 1100w, /images/aio-panel-1735.webp 1735w'
  }
};

// JPEG fallbacks for the <picture> elements, for anything that cannot decode WebP.
export const HERO_JPEG: Record<Site, { src: string; srcSet: string }> = {
  'web-design': {
    src: '/images/hero-bg-1920.jpg',
    srcSet: '/images/hero-bg-1280.jpg 1280w, /images/hero-bg-1920.jpg 1920w, /images/hero-bg.jpg 3840w'
  },
  'ai-optimisation': {
    src: '/images/aio-panel-1735.jpg',
    srcSet: '/images/aio-panel-1100.jpg 1100w, /images/aio-panel-1735.jpg 1735w'
  }
};

const HREF: Record<Site, string> = {
  'web-design': '/web-design/',
  'ai-optimisation': '/ai-optimisation/'
};

const wait = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));

// Resolves once the hero photo is decoded and ready to paint in one frame,
// so it can never draw in progressively after the swap.
export const decodeHero = (site: Site) => {
  const img = new Image();
  img.sizes = '100vw';
  img.srcset = HERO[site].srcSet;
  img.src = HERO[site].src;
  const ready = typeof img.decode === 'function' ? img.decode() : Promise.resolve();
  return Promise.race([ready.catch(() => undefined), wait(IMAGE_WAIT_MS)]);
};

interface GatewayPageProps {
  loadSite?: Record<Site, () => Promise<{ default: React.ComponentType }>>;
  onEnter?: (site: Site, Component: React.ComponentType, href: string) => void;
}

// The intro gateway. Two real, crawlable destinations exist in the markup
// from the very first paint. The title card on top is a decorative overlay
// only, driven entirely by CSS (no JS, no onComplete gate) and never takes
// pointer events, so the page is usable before, during and after it runs.
//
// Picking a side is one continuous move with no page load in it: the
// chosen panel's heading and button fade away while the panel grows to fill
// the viewport (up/down when stacked, left/right side by side) and the
// other slides off. index.tsx then renders that site underneath — same photo,
// same overlay, same framing — and fades this panel off the top of it, so
// all that visibly changes is the site's navbar, text and buttons fading in.
// The links stay real <a> tags: with modifier keys, or if the handover fails
// for any reason, they behave as ordinary links.
const GatewayPage: React.FC<GatewayPageProps> = ({ loadSite, onEnter }) => {
  const [exit, setExit] = useState<Site | null>(null);
  const exitingRef = useRef<Site | null>(null);

  const select = (site: Site) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (exitingRef.current) return;
    exitingRef.current = site;
    setExit(site);

    const href = HREF[site];
    const reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!loadSite || !onEnter) {
      window.setTimeout(() => window.location.assign(href), reduceMotion ? 0 : EXIT_MS);
      return;
    }

    Promise.all([loadSite[site](), decodeHero(site), wait(reduceMotion ? 0 : EXIT_MS)])
      .then(([mod]) => onEnter(site, mod.default, href))
      .catch(() => window.location.assign(href));
  };

  return (
    <div
      className={`gw-root relative h-[100dvh] w-full overflow-hidden bg-[#0A0D14] ${
        exit ? `gw-exit-${exit}` : ''
      }`}
    >
      {/* Real document heading for assistive tech and search engines. The
          title-card wordmark below is decorative and hidden from both. */}
      <h1 className="sr-only">SABR Digital — Web Design and AI Optimisation, Wiltshire</h1>

      <main className="relative h-full w-full">
        <section
          aria-labelledby="gw-design-heading"
          className="gw-panel gw-panel-web relative flex flex-col items-center justify-center overflow-hidden px-6 text-center"
        >
          {/* The studio site's own hero photograph, so this half reads as
              the existing site from the first glance. */}
          <picture>
            <source type="image/webp" srcSet={HERO['web-design'].srcSet} sizes="100vw" />
            <img
              src={HERO_JPEG['web-design'].src}
              srcSet={HERO_JPEG['web-design'].srcSet}
              sizes="100vw"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </picture>
          {/* Same overlay strength as the web design studio's own hero
              (components/Hero.tsx), so picking this side hands off to an
              identical frame instead of a visible jump in contrast. */}
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/45 to-black/75" />

          <div className="gw-copy relative z-10 flex flex-col items-center gap-5 lg:gap-8">
            <h2
              id="gw-design-heading"
              className="gw-title font-syne font-black uppercase leading-[0.95] tracking-tighter text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
            >
              Web Design<br />
              <span className="text-shimmer-blue italic">Studio.</span>
            </h2>
            <a
              href="/web-design/"
              onClick={select('web-design')}
              className="group inline-flex items-center gap-2.5 rounded-xl bg-[#f5f2eb] px-7 py-3.5 text-xs font-semibold tracking-wide text-stone-900 shadow-lg transition-colors duration-300 hover:bg-white focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400/50 sm:text-sm"
            >
              Visit the web design studio
              <ArrowRight size={15} aria-hidden="true" className="text-emerald-700" />
            </a>
          </div>
        </section>

        <section
          aria-labelledby="gw-aio-heading"
          aria-disabled="true"
          className="gw-panel gw-panel-aio relative flex flex-col items-center justify-center overflow-hidden bg-[#0f241d] px-6 text-center select-none"
        >
          {/* The AI Optimisation site's own hero image. */}
          <picture>
            <source type="image/webp" srcSet={HERO['ai-optimisation'].srcSet} sizes="100vw" />
            <img
              src={HERO_JPEG['ai-optimisation'].src}
              srcSet={HERO_JPEG['ai-optimisation'].srcSet}
              sizes="100vw"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
              decoding="async"
            />
          </picture>
          {/* Same overlay strength as the AI Optimisation site's own hero
              (aio/pages/AIOHome.tsx), so the panel keeps its rich emerald depth. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(7,19,15,0.58) 0%, rgba(7,19,15,0.76) 55%, rgba(7,19,15,0.92) 100%)'
            }}
          />

          {/* Subtle radial emerald aura behind the SABR Coming Soon banner */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 50% 54%, rgba(16,185,129,0.22) 0%, rgba(5,150,105,0.06) 42%, transparent 70%)'
            }}
          />

          {/* Diagonal SABR-themed top-right corner banner — mathematically centered on the 45° corner bisector */}
          <div
            aria-hidden="true"
            className="gw-copy pointer-events-none absolute right-[-72px] top-[50px] z-20 flex h-[36px] w-[280px] rotate-45 items-center justify-center overflow-hidden border-y-2 border-emerald-300/70 bg-gradient-to-r from-[#040c09] via-[#062c21] to-[#040c09] shadow-[0_0_32px_rgba(16,185,129,0.65),inset_0_1px_0_rgba(255,255,255,0.2)] sm:right-[-84px] sm:top-[66px] sm:h-[44px] sm:w-[344px]"
          >
            <div className="gw-banner-sheen absolute inset-0 opacity-80" />
            <span className="relative z-10 flex items-center justify-center gap-2.5 font-syne text-[10px] font-black uppercase tracking-[0.22em] text-white drop-shadow-[0_2px_8px_rgba(16,185,129,0.6)] sm:text-xs sm:tracking-[0.24em]">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-85" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
              </span>
              <span>
                COMING <span className="text-emerald-300">SOON</span>
              </span>
              <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
            </span>
          </div>

          <div className="gw-copy relative z-10 flex flex-col items-center justify-center text-center">
            <h2
              id="gw-aio-heading"
              className="gw-title font-syne font-black uppercase leading-[0.95] tracking-tighter text-white text-center drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
            >
              <span className="block text-center">AI</span>
              <span className="block text-center text-shimmer-blue italic">Optimisation.</span>
            </h2>
          </div>
        </section>

        {/* Hairline seam between the two halves. Fades once a side is picked
            so it doesn't sit as a stray line across the growing panel. */}
        <div
          aria-hidden="true"
          className="gw-seam pointer-events-none absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent lg:inset-y-0 lg:left-1/2 lg:right-auto lg:top-0 lg:h-full lg:w-px lg:bg-gradient-to-b"
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

        /* The real panels. Each is pinned to its own edge so that growing it
           to fill the screen (on pick) never has to move its own origin —
           only the sibling has to get out of the way. Width/height transition
           alongside the sibling's transform, so the pick reads as one
           continuous slide rather than a resize plus a separate exit. */
        .gw-panel {
          position: absolute;
          left: 0;
          right: 0;
          transition: width 0.65s cubic-bezier(0.76, 0, 0.24, 1), height 0.65s cubic-bezier(0.76, 0, 0.24, 1),
            transform 0.65s cubic-bezier(0.76, 0, 0.24, 1);
          will-change: width, height, transform;
        }
        .gw-panel-web { top: 0; height: 50%; }
        .gw-panel-aio { bottom: 0; height: 50%; }

        @media (min-width: 1024px) {
          .gw-panel { left: auto; right: auto; top: 0; bottom: 0; height: auto; }
          .gw-panel-web { left: 0; width: 50%; }
          .gw-panel-aio { right: 0; width: 50%; }
        }

        /* Picked web design: its panel grows to fill, AI Optimisation's
           panel slides fully out of the way in the same direction it already
           sits in (down on narrow screens, right on wide ones). */
        .gw-exit-web-design .gw-panel-web { height: 100%; }
        .gw-exit-web-design .gw-panel-aio { transform: translate3d(0, 100%, 0); }
        @media (min-width: 1024px) {
          .gw-exit-web-design .gw-panel-web { width: 100%; }
          .gw-exit-web-design .gw-panel-aio { transform: translate3d(100%, 0, 0); }
        }

        /* Picked AI Optimisation: the mirror image. */
        .gw-exit-ai-optimisation .gw-panel-aio { height: 100%; }
        .gw-exit-ai-optimisation .gw-panel-web { transform: translate3d(0, -100%, 0); }
        @media (min-width: 1024px) {
          .gw-exit-ai-optimisation .gw-panel-aio { width: 100%; }
          .gw-exit-ai-optimisation .gw-panel-web { transform: translate3d(-100%, 0, 0); }
        }

        /* The panel's own heading and button step back first, so by the time
           it fills the screen it is just the photo — exactly the frame the
           destination hero starts from. */
        .gw-copy { transition: opacity 0.28s cubic-bezier(0.33, 1, 0.68, 1), transform 0.28s cubic-bezier(0.33, 1, 0.68, 1); }
        .gw-root[class*="gw-exit-"] .gw-copy { opacity: 0; transform: translate3d(0, -8px, 0); }

        .gw-root[class*="gw-exit-"] .gw-seam { opacity: 0; transition: opacity 0.2s linear; }
        .gw-root[class*="gw-exit-"] a { pointer-events: none; }

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

        @keyframes gw-sheen {
          0%   { transform: translate3d(-120%, 0, 0) skewX(-20deg); }
          55%  { transform: translate3d(220%, 0, 0) skewX(-20deg); }
          100% { transform: translate3d(220%, 0, 0) skewX(-20deg); }
        }
        .gw-banner-sheen {
          background: linear-gradient(90deg, transparent 0%, rgba(52, 211, 153, 0.16) 50%, transparent 100%);
          animation: gw-sheen 4.2s cubic-bezier(0.22, 1, 0.36, 1) infinite;
          will-change: transform;
        }

        .gw-half, .gw-word, .gw-rule, .gw-card { will-change: transform, opacity; }

        @media (prefers-reduced-motion: reduce) {
          .gw-curtain { display: none; }
          .gw-panel, .gw-seam, .gw-copy { transition: none; }
          .gw-banner-sheen { animation: none; }
        }
      `}</style>
    </div>
  );
};

export default GatewayPage;
