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
const warmedMedia = new Set<string>();
const keptVideoElements: HTMLVideoElement[] = [];

const warmVideoAsset = (src: string, poster?: string) => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  if (poster && !warmedMedia.has(poster)) {
    warmedMedia.add(poster);
    const img = new Image();
    img.decoding = 'async';
    (img as any).fetchPriority = 'high';
    img.src = poster;
  }
  if (warmedMedia.has(src)) return;
  warmedMedia.add(src);

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'video';
  link.type = 'video/mp4';
  link.href = src;
  link.setAttribute('fetchpriority', 'high');
  document.head.appendChild(link);

  const vid = document.createElement('video');
  vid.preload = 'auto';
  vid.muted = true;
  vid.defaultMuted = true;
  vid.playsInline = true;
  vid.src = src;
  try {
    vid.load();
  } catch {
    // Ignore load errors in non-media environments
  }
  keptVideoElements.push(vid);
};

const warmImageAsset = (src: string) => {
  if (typeof window === 'undefined' || warmedMedia.has(src)) return;
  warmedMedia.add(src);
  const img = new Image();
  img.decoding = 'async';
  (img as any).fetchPriority = 'high';
  img.src = src;
  if (typeof img.decode === 'function') {
    img.decode().catch(() => {});
  }
};

export const warmDemoChunk = (id: DemoId) => {
  if (id === 'landscaping') {
    warmVideoAsset(
      '/images/projects/landscaping-minimal-hero-4k.mp4',
      '/images/projects/landscaping-minimal-video-poster.jpg'
    );
  } else if (id === 'landscaping-luxury') {
    warmImageAsset('/images/projects/landscaping-preview.webp');
  } else if (id === 'equestrian-luxury') {
    warmVideoAsset('/assets/aistudio/gemini_generated_video_7de186c5_667a4438.mp4');
  }

  if (warmed.has(id)) return;
  warmed.add(id);
  demoChunks[id]().catch(() => warmed.delete(id));
};

// Proactively start buffering the Minimalistic Landscaping hero video and Luxury Landscaping hero photo
// shortly after initial page load so clicking into either demo starts with zero latency.
if (typeof window !== 'undefined') {
  const prewarmKeyDemos = () => {
    warmImageAsset('/images/projects/landscaping-preview.webp');
    warmVideoAsset(
      '/images/projects/landscaping-minimal-hero-4k.mp4',
      '/images/projects/landscaping-minimal-video-poster.jpg'
    );
  };
  if (document.readyState === 'complete') {
    window.setTimeout(prewarmKeyDemos, 150);
  } else {
    window.addEventListener('load', () => window.setTimeout(prewarmKeyDemos, 150), { once: true });
  }
}

// "/web-design/demo/spa/suites" -> "spa"
export const demoIdFromPath = (pathname: string): DemoId | null => {
  const match = /\/demo\/([a-z-]+)/.exec(pathname);
  const id = match?.[1] as DemoId | undefined;
  return id && id in demoChunks ? id : null;
};
