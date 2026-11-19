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

const VIBRANT_HERO_IMAGE_URL =
  '/assets/aistudio/Gemini_Generated_Image_sma90vsma90vsma9_300587b3.jpg';

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
const readyVideoBlobs = new Map<string, string>();

export const getReadyVideoSrc = (src: string): string => readyVideoBlobs.get(src) || src;

const warmVideoAsset = (src: string, poster?: string) => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  if (poster && !warmedMedia.has(poster)) {
    warmedMedia.add(poster);
    const img = new Image();
    img.decoding = 'async';
    (img as any).fetchPriority = 'high';
    img.src = poster;
    img.decode?.().catch(() => {});
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

  // Also cache the video binary into a local Blob URL so clicking a demo plays immediately from RAM
  if (typeof fetch === 'function' && typeof URL !== 'undefined' && typeof URL.createObjectURL === 'function') {
    fetch(src, { cache: 'force-cache', priority: 'high' } as RequestInit)
      .then((res) => (res.ok ? res.blob() : null))
      .then((blob) => {
        if (blob && blob.size > 0 && !readyVideoBlobs.has(src)) {
          readyVideoBlobs.set(src, URL.createObjectURL(blob));
        }
      })
      .catch(() => {});
  }
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
  } else if (id === 'equestrian-vibrant') {
    warmImageAsset(VIBRANT_HERO_IMAGE_URL);
  }

  if (warmed.has(id)) return;
  warmed.add(id);
  demoChunks[id]().catch(() => warmed.delete(id));
};

// Proactively start buffering key demo hero videos and posters shortly after initial page load
// so clicking into any video demo starts playback on frame 0 with zero latency.
if (typeof window !== 'undefined') {
  const prewarmKeyDemos = () => {
    warmImageAsset('/images/projects/landscaping-preview.webp');
    warmImageAsset(VIBRANT_HERO_IMAGE_URL);
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
