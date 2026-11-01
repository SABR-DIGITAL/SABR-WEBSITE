type Site = 'web-design' | 'ai-optimisation';

// True when this page load came straight from the studio's other website
// (the SABR DIGITAL switcher, or any cross-link between the two). The title
// card plays on arrival from the gateway or from outside; hopping between the
// two sites goes straight to the content. Same-origin navigations always send
// the full referrer under this site's Referrer-Policy, so no extra wiring is
// needed on the links themselves.
export const cameFromOtherSite = (current: Site): boolean => {
  try {
    if (!document.referrer) return false;
    const from = new URL(document.referrer);
    if (from.origin !== window.location.origin) return false;
    const other = current === 'web-design' ? '/ai-optimisation' : '/web-design';
    return from.pathname === other || from.pathname.startsWith(other + '/');
  } catch {
    return false;
  }
};
