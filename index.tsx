
import React, { Suspense, lazy, useEffect, useLayoutEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './styles/tailwind.css';
import GatewayPage, { decodeHero, HERO, HERO_JPEG, type GatewaySite } from './gateway/GatewayPage';
import { markGatewayHandoff, registerSiteSwitcher } from './components/introSkip';
import { demoIdFromPath, warmDemoChunk } from './components/demos/demoChunks';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Three independent sites share this one deploy, split by URL prefix. Each
// one owns its own single Router (with a matching basename), so exactly one
// mounts at a time — React Router forbids nesting Routers, and this also
// matches the brief: these must read as separate websites, not sections of
// one app.
//
// The two destination sites are lazy chunks, so a visitor only downloads the
// site they are on. The gateway is tiny and stays in the entry bundle, so the
// front door paints without waiting on a second request.
const loadSite = {
  'web-design': () => import('./App'),
  'ai-optimisation': () => import('./aio/AIOApp')
} as const;

const siteForPath = (path: string): GatewaySite | null => {
  if (path === '/ai-optimisation' || path.startsWith('/ai-optimisation/')) {
    // AI Optimisation is currently Coming Soon and not publicly accessible;
    // redirect direct URL visits back to the root gateway.
    if (typeof window !== 'undefined' && window.history?.replaceState) {
      window.history.replaceState(null, '', '/');
    }
    return null;
  }
  return path === '/web-design' || path.startsWith('/web-design/') ? 'web-design' : null;
};

const initialSite = siteForPath(window.location.pathname);
const InitialSite = initialSite ? lazy(loadSite[initialSite]) : null;

// A direct link into one of the demo websites needs two chunks: the studio
// site and that demo. Request the demo now, alongside the studio chunk, rather
// than only once the studio has arrived and rendered its router.
if (initialSite === 'web-design') {
  const demo = demoIdFromPath(window.location.pathname);
  if (demo) warmDemoChunk(demo);
}
// Which site is on screen right now — updated on gateway handover and site switches.
let currentSite: GatewaySite | null = initialSite;

// Warm the web-design destination chunk and pre-decode its hero image once the
// initial view is settled and the browser is idle.
{
  const warmAll = () => {
    loadSite['web-design']().catch(() => undefined);
    decodeHero('web-design').catch(() => undefined);
  };
  window.setTimeout(() => {
    const idle = (window as any).requestIdleCallback;
    if (typeof idle === 'function') idle(warmAll, { timeout: 2000 });
    else warmAll();
  }, 1800);
}

// How long the expanded gateway panel takes to fade off the top of the
// destination site once that site has painted underneath it.
const HANDOFF_FADE_MS = 450;

// Timing for the lateral swoosh glide when switching between Web Design and AIO.
const SWOOSH_GLIDE_MS = 710;
const SWOOSH_FADE_MS = 240;

type SwooshPhase = 'start' | 'gliding' | 'swapped' | 'fading';

interface SwooshState {
  target: GatewaySite;
  phase: SwooshPhase;
}

const Shell: React.FC = () => {
  const [entered, setEntered] = useState<{
    site: GatewaySite;
    Component: React.ComponentType;
    key: number;
  } | null>(null);
  const [gatewayFading, setGatewayFading] = useState(false);
  const [gatewayGone, setGatewayGone] = useState(Boolean(initialSite));
  const [swoosh, setSwoosh] = useState<SwooshState | null>(null);

  const fadeTimer = useRef(0);
  const swooshTimers = useRef<number[]>([]);
  const switchingRef = useRef(false);

  const clearSwooshTimers = () => {
    swooshTimers.current.forEach((id) => window.clearTimeout(id));
    swooshTimers.current = [];
  };

  const enter = (site: GatewaySite, Component: React.ComponentType, href: string) => {
    if (site === 'ai-optimisation') return;
    markGatewayHandoff();
    currentSite = site;
    window.history.pushState(null, '', href);
    window.scrollTo(0, 0);
    if (site === 'web-design') (window as any).__sabrStartFluidBg?.();
    setEntered({ site, Component, key: Date.now() });
  };

  // Smooth lateral swoosh glide between Web Design (Left) and AI Optimisation (Right).
  const switchSite = useRef((target: GatewaySite, href: string, pushHistory = true) => {
    if (target === 'ai-optimisation') return;
    if (switchingRef.current || currentSite === target) return;
    switchingRef.current = true;
    clearSwooshTimers();

    const reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    Promise.all([loadSite[target](), decodeHero(target)])
      .then(([mod]) => {
        if (reduceMotion) {
          markGatewayHandoff();
          currentSite = target;
          if (pushHistory) window.history.pushState(null, '', href);
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
          if (target === 'web-design') (window as any).__sabrStartFluidBg?.();
          setGatewayGone(true);
          setEntered({ site: target, Component: mod.default, key: Date.now() });
          switchingRef.current = false;
          return;
        }

        // 1. Mount the Swoosh Overlay off-screen on the destination side
        setSwoosh({ target, phase: 'start' });

        // 2. Two frames later, trigger the hardware-accelerated swoosh glide across the viewport
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setSwoosh({ target, phase: 'gliding' });

            // 3. Once the destination hero panel has glided to full screen (0, 0),
            //    swap the underlying site at scroll (0, 0) while covered by the panel.
            const tSwap = window.setTimeout(() => {
              markGatewayHandoff();
              currentSite = target;
              if (pushHistory) window.history.pushState(null, '', href);
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
              if (target === 'web-design') (window as any).__sabrStartFluidBg?.();
              setGatewayGone(true);
              setEntered({ site: target, Component: mod.default, key: Date.now() });
              setSwoosh({ target, phase: 'swapped' });

              // 4. Wait two paint frames for the new site's hero to commit underneath,
              //    then fade out the overlay while the new navbar & hero text animate in.
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  setSwoosh({ target, phase: 'fading' });
                  const tDone = window.setTimeout(() => {
                    setSwoosh(null);
                    switchingRef.current = false;
                  }, SWOOSH_FADE_MS + 30);
                  swooshTimers.current.push(tDone);
                });
              });
            }, SWOOSH_GLIDE_MS);

            swooshTimers.current.push(tSwap);
          });
        });
      })
      .catch(() => {
        switchingRef.current = false;
        window.location.assign(href);
      });
  });

  useEffect(() => {
    registerSiteSwitcher((target, href) => switchSite.current(target, href, true));
    const onPopState = () => {
      const next = siteForPath(window.location.pathname);
      if (next && next !== currentSite) {
        switchSite.current(next, window.location.pathname + window.location.search + window.location.hash, false);
      } else if (!next && currentSite !== null) {
        window.location.reload();
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => {
      registerSiteSwitcher(null);
      window.removeEventListener('popstate', onPopState);
      clearSwooshTimers();
    };
  }, []);

  // Once the destination has committed underneath the initial gateway, wait
  // for two frames so it has genuinely been painted, then fade the gateway
  // panel off the top.
  useLayoutEffect(() => {
    if (!entered || gatewayGone) return;
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        setGatewayFading(true);
        fadeTimer.current = window.setTimeout(() => setGatewayGone(true), HANDOFF_FADE_MS + 50);
      });
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      window.clearTimeout(fadeTimer.current);
    };
  }, [entered, gatewayGone]);

  const Destination = entered?.Component;
  const isGlidingOrPast =
    swoosh && (swoosh.phase === 'gliding' || swoosh.phase === 'swapped' || swoosh.phase === 'fading');
  // AI Optimisation lives on the right (swooshes in from +100% -> 0%);
  // Web Design Studio lives on the left (swooshes in from -100% -> 0%).
  const isFromRight = swoosh?.target === 'ai-optimisation';
  const offscreenX = isFromRight ? '100%' : '-100%';
  const innerParallaxStart = isFromRight ? '-16%' : '16%';

  return (
    <>
      {Destination ? <Destination key={entered.key} /> : InitialSite ? <InitialSite /> : null}

      {!gatewayGone && !InitialSite && (
        <div
          aria-hidden={entered ? true : undefined}
          className={entered ? 'pointer-events-none fixed inset-0 z-[5000]' : undefined}
          style={
            entered
              ? {
                  opacity: gatewayFading ? 0 : 1,
                  transition: `opacity ${HANDOFF_FADE_MS}ms cubic-bezier(0.33, 1, 0.68, 1)`,
                  willChange: 'opacity'
                }
              : undefined
          }
        >
          <GatewayPage loadSite={loadSite} onEnter={enter} />
        </div>
      )}

      {swoosh && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[6000] overflow-hidden"
          style={{
            opacity: swoosh.phase === 'fading' ? 0 : 1,
            transition:
              swoosh.phase === 'fading'
                ? `opacity ${SWOOSH_FADE_MS}ms cubic-bezier(0.33, 1, 0.68, 1)`
                : undefined,
            willChange: 'opacity'
          }}
        >
          {/* Soft depth dimmer over the outgoing page while the swoosh glides across */}
          {swoosh.phase !== 'swapped' && swoosh.phase !== 'fading' && (
            <div
              className="absolute inset-0 bg-[#05080b]/60"
              style={{
                opacity: isGlidingOrPast ? 1 : 0,
                transition: 'opacity 480ms cubic-bezier(0.33, 1, 0.68, 1)',
                willChange: 'opacity'
              }}
            />
          )}

          {/* Blade 1: Leading emerald/obsidian swoosh wave */}
          <div
            className="absolute inset-0"
            style={{
              background: isFromRight
                ? 'linear-gradient(90deg, rgba(16,185,129,0.35) 0%, #0b241c 14%, #0A0D14 100%)'
                : 'linear-gradient(270deg, rgba(16,185,129,0.35) 0%, #0b241c 14%, #0A0D14 100%)',
              transform: isGlidingOrPast ? 'translate3d(0%, 0, 0)' : `translate3d(${offscreenX}, 0, 0)`,
              transition: isGlidingOrPast
                ? 'transform 540ms cubic-bezier(0.76, 0, 0.24, 1)'
                : undefined,
              willChange: 'transform'
            }}
          />

          {/* Blade 2: Destination site hero world with glowing emerald seam and inner parallax */}
          <div
            className="absolute inset-0 overflow-hidden bg-[#0A0D14]"
            style={{
              transform: isGlidingOrPast ? 'translate3d(0%, 0, 0)' : `translate3d(${offscreenX}, 0, 0)`,
              transition: isGlidingOrPast
                ? 'transform 660ms cubic-bezier(0.22, 1, 0.36, 1) 45ms'
                : undefined,
              willChange: 'transform'
            }}
          >
            <picture>
              <source type="image/webp" srcSet={HERO[swoosh.target].srcSet} sizes="100vw" />
              <img
                src={HERO_JPEG[swoosh.target].src}
                srcSet={HERO_JPEG[swoosh.target].srcSet}
                sizes="100vw"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                style={{
                  transform: isGlidingOrPast
                    ? 'translate3d(0%, 0, 0) scale(1)'
                    : `translate3d(${innerParallaxStart}, 0, 0) scale(1.05)`,
                  transition: isGlidingOrPast
                    ? 'transform 660ms cubic-bezier(0.22, 1, 0.36, 1) 45ms'
                    : undefined,
                  willChange: 'transform'
                }}
              />
            </picture>
            {swoosh.target === 'web-design' ? (
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/45 to-black/75" />
            ) : (
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(7,19,15,0.55) 0%, rgba(7,19,15,0.72) 55%, rgba(7,19,15,0.88) 100%)'
                }}
              />
            )}

            {/* Leading glowing emerald edge seam */}
            <div
              className={`absolute top-0 bottom-0 w-[2px] ${
                isFromRight ? 'left-0' : 'right-0'
              } bg-gradient-to-b from-transparent via-emerald-400 to-transparent shadow-[0_0_28px_3px_rgba(16,185,129,0.8)]`}
            />
          </div>
        </div>
      )}
    </>
  );
};

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    {/* A `null` fallback would show the browser's own blank canvas while the
        lazy chunk fetches and parses — on the two destination sites, which
        land straight on a full-bleed dark hero, that gap is exactly what
        reads as a flash against the colour that's about to arrive. Painting
        the same dark shell immediately removes the gap rather than racing
        it. The gateway handover never suspends: its chunk is loaded first. */}
    <Suspense fallback={<div className="fixed inset-0 bg-[#0A0D14]" />}>
      <Shell />
    </Suspense>
  </React.StrictMode>
);
