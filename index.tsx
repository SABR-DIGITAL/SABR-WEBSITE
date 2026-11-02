
import React, { Suspense, lazy, useLayoutEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './styles/tailwind.css';
import GatewayPage, { type GatewaySite } from './gateway/GatewayPage';
import { markGatewayHandoff } from './components/introSkip';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Three independent sites share this one deploy, split by URL prefix. Each
// one owns its own single Router (with a matching basename), so exactly one
// mounts per page load — React Router forbids nesting Routers, and this also
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

const siteForPath = (path: string): GatewaySite | null =>
  path === '/ai-optimisation' || path.startsWith('/ai-optimisation/')
    ? 'ai-optimisation'
    : path === '/web-design' || path.startsWith('/web-design/')
    ? 'web-design'
    : null;

const initialSite = siteForPath(window.location.pathname);
const InitialSite = initialSite ? lazy(loadSite[initialSite]) : null;
// Which site is on screen right now — changes once, on a gateway handover.
let currentSite: GatewaySite | null = initialSite;

// On the gateway, fetch both destination sites once the intro has played and
// the browser is idle, so whichever one the visitor picks opens from cache.
if (!initialSite) {
  const warm = () => {
    loadSite['web-design']().catch(() => undefined);
    loadSite['ai-optimisation']().catch(() => undefined);
  };
  window.setTimeout(() => {
    const idle = (window as any).requestIdleCallback;
    if (typeof idle === 'function') idle(warm, { timeout: 2000 });
    else warm();
  }, 2200);
}

// How long the expanded gateway panel takes to fade off the top of the
// destination site once that site has painted underneath it.
const HANDOFF_FADE_MS = 450;

// Picking a side on the gateway never leaves this page. A real navigation
// always has a gap — the old document is torn down before the new one paints
// — and that gap is the grey flash. Instead the destination site is rendered
// right here, underneath the gateway's now full-screen panel. Its hero is the
// same photo with the same overlay, so when the panel fades off the top there
// is nothing to see change except the navbar, text and buttons easing in.
const Shell: React.FC = () => {
  const [entered, setEntered] = useState<{ site: GatewaySite; Component: React.ComponentType } | null>(null);
  const [gatewayFading, setGatewayFading] = useState(false);
  const [gatewayGone, setGatewayGone] = useState(false);
  const fadeTimer = useRef(0);

  const enter = (site: GatewaySite, Component: React.ComponentType, href: string) => {
    markGatewayHandoff();
    currentSite = site;
    window.history.pushState(null, '', href);
    window.scrollTo(0, 0);
    if (site === 'web-design') (window as any).__sabrStartFluidBg?.();
    setEntered({ site, Component });
  };

  // Once the destination has committed underneath, wait for two frames so it
  // has genuinely been painted, then fade the gateway panel off the top.
  useLayoutEffect(() => {
    if (!entered) return;
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
  }, [entered]);

  if (InitialSite) return <InitialSite />;

  const Destination = entered?.Component;
  return (
    <>
      {Destination && <Destination />}
      {!gatewayGone && (
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
    </>
  );
};

// The handover above pushes a history entry rather than loading a page, so
// Back from a destination site would otherwise leave that site's router
// staring at "/". Whenever the URL moves to a different one of the three
// sites than the one on screen, load it properly.
window.addEventListener('popstate', () => {
  if (siteForPath(window.location.pathname) !== currentSite) window.location.reload();
});

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
