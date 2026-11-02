type Site = 'web-design' | 'ai-optimisation';

// Set when the gateway hands over to a destination site inside the same page
// (see index.tsx). There is no new page load in that case, so the referrer
// check below cannot see it.
let gatewayHandoff = false;
export const markGatewayHandoff = () => {
  gatewayHandoff = true;
};
export const isGatewayHandoff = () => gatewayHandoff;

// True when this page load came from somewhere else inside SABR Digital: the
// split-screen gateway (whose own panel-fill animation already plays the
// transition, so the title card would just be a second, redundant intro) or
// the studio's other website. The title card plays only on a genuinely fresh
// arrival — a bookmark, a search result, an external link. Same-origin
// navigations always send the full referrer under this site's
// Referrer-Policy, so no extra wiring is needed on the links themselves.
export const arrivedFromWithinSite = (current: Site): boolean => {
  if (gatewayHandoff) return true;
  try {
    if (!document.referrer) return false;
    const from = new URL(document.referrer);
    if (from.origin !== window.location.origin) return false;
    if (from.pathname === '/') return true;
    const other = current === 'web-design' ? '/ai-optimisation' : '/web-design';
    return from.pathname === other || from.pathname.startsWith(other + '/');
  } catch {
    return false;
  }
};
