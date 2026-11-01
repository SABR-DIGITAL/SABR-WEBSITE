
import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './styles/tailwind.css';
import GatewayPage from './gateway/GatewayPage';

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
const path = window.location.pathname;
const Root: React.ComponentType = path === '/ai-optimisation' || path.startsWith('/ai-optimisation/')
  ? lazy(() => import('./aio/AIOApp'))
  : path === '/web-design' || path.startsWith('/web-design/')
  ? lazy(() => import('./App'))
  : GatewayPage;

// On the gateway, fetch both destination sites once the intro has played and
// the browser is idle, so whichever one the visitor picks opens from cache.
if (Root === GatewayPage) {
  const warm = () => {
    import('./App').catch(() => undefined);
    import('./aio/AIOApp').catch(() => undefined);
  };
  window.setTimeout(() => {
    const idle = (window as any).requestIdleCallback;
    if (typeof idle === 'function') idle(warm, { timeout: 2000 });
    else warm();
  }, 2200);
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Suspense fallback={null}>
      <Root />
    </Suspense>
  </React.StrictMode>
);
