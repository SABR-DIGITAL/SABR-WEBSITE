// The five demo websites are separate route chunks: a visitor to the studio
// site only downloads a demo once they are about to look at it. Everything
// that wants to warm a demo ahead of a click (the projects gallery, the
// entry script for a direct /demo/... link) goes through this one map so the
// chunk is only ever requested once.
export type DemoId =
  | 'landscaping'
  | 'landscaping-traditional'
  | 'landscaping-luxury'
  | 'equestrian'
  | 'equestrian-vibrant'
  | 'equestrian-luxury'
  | 'physio'
  | 'spa'
  | 'cafe';

export const demoChunks: Record<DemoId, () => Promise<unknown>> = {
  landscaping: () => import('./landscaping/Home'),
  'landscaping-traditional': () => import('./landscaping-traditional/TraditionalHome'),
  'landscaping-luxury': () => import('./landscaping-luxury/LuxuryHome'),
  equestrian: () => import('./equestrian/EquestrianHome'),
  'equestrian-vibrant': () => import('./equestrian-vibrant/EquestrianVibrantSite'),
  'equestrian-luxury': () => import('./equestrian-luxury/EquestrianLuxuryHome'),
  physio: () => import('./physio/PhysioHome'),
  spa: () => import('./spa/SpaHome'),
  cafe: () => import('./cafe/CafeHome')
};

const warmed = new Set<DemoId>();

export const warmDemoChunk = (id: DemoId) => {
  if (warmed.has(id)) return;
  warmed.add(id);
  demoChunks[id]().catch(() => warmed.delete(id));
};

// "/web-design/demo/spa/suites" -> "spa"
export const demoIdFromPath = (pathname: string): DemoId | null => {
  const match = /\/demo\/([a-z-]+)/.exec(pathname);
  const id = match?.[1] as DemoId | undefined;
  return id && id in demoChunks ? id : null;
};
