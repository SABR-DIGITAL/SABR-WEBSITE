export const TOTAL_FRAMES = 88;
export const SCROLL_POSTER_URL = '/images/projects/equestrian-vibrant-scroll-poster.webp';

// 14 evenly spaced coarse keyframes across the gallop for instant scroll response (<250ms)
const COARSE_INDICES = [0, 7, 14, 21, 28, 35, 42, 49, 56, 63, 70, 77, 84, 87];
const COARSE_SET = new Set(COARSE_INDICES);
const MAX_DYNAMIC_BITMAPS = 14;

type DecodedFrame = ImageBitmap | HTMLImageElement;

const frameBlobs: (Blob | null)[] = new Array(TOTAL_FRAMES).fill(null);
const coarseBitmaps = new Map<number, DecodedFrame>();
const dynamicBitmaps = new Map<number, DecodedFrame>();
const pendingBlobFetches = new Map<number, Promise<Blob | null>>();
const pendingDecodes = new Map<string, Promise<DecodedFrame | null>>();

let currentModeIsMobile: boolean | null = null;
let prewarmStarted = false;
let streamStarted = false;
let posterFallbackImg: HTMLImageElement | null = null;

if (typeof window !== 'undefined') {
  posterFallbackImg = new Image();
  posterFallbackImg.decoding = 'async';
  (posterFallbackImg as any).fetchPriority = 'high';
  posterFallbackImg.src = SCROLL_POSTER_URL;
  posterFallbackImg.decode?.().catch(() => {});
}

export const getScrollFrameUrl = (idx: number): string => {
  const clamped = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(idx)));
  return `/images/projects/equestrian-scroll-frames/f_${String(clamped).padStart(3, '0')}.webp`;
};

const closeDecoded = (frame: DecodedFrame) => {
  if (typeof ImageBitmap !== 'undefined' && frame instanceof ImageBitmap) {
    try {
      frame.close();
    } catch {
      // Already closed
    }
  }
};

const flushDecodedBitmapsForModeChange = (nextIsMobile: boolean) => {
  if (currentModeIsMobile !== null && currentModeIsMobile !== nextIsMobile) {
    coarseBitmaps.forEach(closeDecoded);
    coarseBitmaps.clear();
    dynamicBitmaps.forEach(closeDecoded);
    dynamicBitmaps.clear();
    pendingDecodes.clear();
  }
  currentModeIsMobile = nextIsMobile;
};

const fetchFrameBlob = (idx: number, highPriority = false): Promise<Blob | null> => {
  if (idx < 0 || idx >= TOTAL_FRAMES) return Promise.resolve(null);
  const existingBlob = frameBlobs[idx];
  if (existingBlob) return Promise.resolve(existingBlob);

  const pending = pendingBlobFetches.get(idx);
  if (pending) return pending;

  const url = getScrollFrameUrl(idx);
  const promise = fetch(url, {
    cache: 'force-cache',
    ...(highPriority ? { priority: 'high' } : {})
  } as RequestInit)
    .then((res) => (res.ok ? res.blob() : null))
    .then((blob) => {
      if (blob && blob.size > 0) {
        frameBlobs[idx] = blob;
        return blob;
      }
      return null;
    })
    .catch(() => null)
    .finally(() => {
      pendingBlobFetches.delete(idx);
    });

  pendingBlobFetches.set(idx, promise);
  return promise;
};

const decodeBlobToFrame = async (
  idx: number,
  blob: Blob,
  isMobile: boolean
): Promise<DecodedFrame | null> => {
  if (typeof createImageBitmap === 'function') {
    try {
      if (isMobile) {
        return await createImageBitmap(blob, {
          resizeWidth: 1600,
          resizeHeight: 900,
          resizeQuality: 'high'
        });
      }
      return await createImageBitmap(blob);
    } catch {
      // Fallback to <img> decode below
    }
  }

  return new Promise<DecodedFrame | null>((resolve) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = getScrollFrameUrl(idx);
  });
};

const setDynamicLru = (idx: number, frame: DecodedFrame) => {
  if (dynamicBitmaps.has(idx)) {
    const prev = dynamicBitmaps.get(idx)!;
    dynamicBitmaps.delete(idx);
    if (prev !== frame) closeDecoded(prev);
  }
  dynamicBitmaps.set(idx, frame);

  while (dynamicBitmaps.size > MAX_DYNAMIC_BITMAPS) {
    const oldestKey = dynamicBitmaps.keys().next().value;
    if (oldestKey === undefined) break;
    const evicted = dynamicBitmaps.get(oldestKey);
    dynamicBitmaps.delete(oldestKey);
    if (evicted) closeDecoded(evicted);
  }
};

export const ensureFrameDecoded = (
  idx: number,
  isMobile: boolean,
  highPriority = false,
  onReady?: () => void
): Promise<DecodedFrame | null> => {
  if (idx < 0 || idx >= TOTAL_FRAMES) return Promise.resolve(null);
  flushDecodedBitmapsForModeChange(isMobile);

  const cachedCoarse = coarseBitmaps.get(idx);
  if (cachedCoarse) {
    return Promise.resolve(cachedCoarse);
  }

  const cachedDynamic = dynamicBitmaps.get(idx);
  if (cachedDynamic) {
    // Refresh LRU position
    dynamicBitmaps.delete(idx);
    dynamicBitmaps.set(idx, cachedDynamic);
    return Promise.resolve(cachedDynamic);
  }

  const key = `${idx}:${isMobile ? 'm' : 'd'}`;
  const existingDecode = pendingDecodes.get(key);
  if (existingDecode) {
    if (onReady) {
      existingDecode.then((frame) => {
        if (frame) onReady();
      });
    }
    return existingDecode;
  }

  const promise = (async () => {
    const blob = await fetchFrameBlob(idx, highPriority);
    if (!blob) return null;

    // Mode might have changed while fetching blob
    if (currentModeIsMobile !== null && currentModeIsMobile !== isMobile) {
      return null;
    }

    const frame = await decodeBlobToFrame(idx, blob, isMobile);
    if (!frame) return null;

    if (currentModeIsMobile !== null && currentModeIsMobile !== isMobile) {
      closeDecoded(frame);
      return null;
    }

    if (COARSE_SET.has(idx)) {
      const old = coarseBitmaps.get(idx);
      if (old && old !== frame) closeDecoded(old);
      coarseBitmaps.set(idx, frame);
    } else {
      setDynamicLru(idx, frame);
    }

    if (onReady) onReady();
    return frame;
  })().finally(() => {
    pendingDecodes.delete(key);
  });

  pendingDecodes.set(key, promise);
  return promise;
};

const streamRemainingBlobsInBackground = async () => {
  if (streamStarted || typeof window === 'undefined') return;
  streamStarted = true;

  const remaining: number[] = [];
  for (let i = 0; i < TOTAL_FRAMES; i += 1) {
    if (!COARSE_SET.has(i) && !frameBlobs[i]) {
      remaining.push(i);
    }
  }

  const BATCH_SIZE = 6;
  for (let i = 0; i < remaining.length; i += BATCH_SIZE) {
    const chunk = remaining.slice(i, i + BATCH_SIZE);
    await Promise.all(chunk.map((idx) => fetchFrameBlob(idx, false)));
  }
};

export const prewarmVibrantScrollFrames = () => {
  if (typeof window === 'undefined') return;
  const isMobile = window.innerWidth < 1024;
  flushDecodedBitmapsForModeChange(isMobile);

  if (prewarmStarted && coarseBitmaps.size >= COARSE_INDICES.length) return;
  prewarmStarted = true;

  (async () => {
    // 1. Decode first frame with highest priority so canvas is live instantaneously
    await ensureFrameDecoded(0, isMobile, true);

    // 2. Decode remaining 13 coarse keyframes in parallel batches of 4
    const restCoarse = COARSE_INDICES.slice(1);
    for (let i = 0; i < restCoarse.length; i += 4) {
      const batch = restCoarse.slice(i, i + 4);
      await Promise.all(batch.map((idx) => ensureFrameDecoded(idx, isMobile, true)));
    }

    // 3. Stream all intermediate compressed WebP blobs cleanly into RAM
    void streamRemainingBlobsInBackground();
  })();
};

const findNearestDecoded = (targetIdx: number): DecodedFrame | null => {
  let bestFrame: DecodedFrame | null = null;
  let bestDist = Infinity;

  dynamicBitmaps.forEach((frame, idx) => {
    const d = Math.abs(idx - targetIdx);
    if (d < bestDist) {
      bestDist = d;
      bestFrame = frame;
    }
  });

  coarseBitmaps.forEach((frame, idx) => {
    const d = Math.abs(idx - targetIdx);
    if (d < bestDist) {
      bestDist = d;
      bestFrame = frame;
    }
  });

  if (bestFrame) return bestFrame;
  if (posterFallbackImg && posterFallbackImg.complete && posterFallbackImg.naturalWidth > 0) {
    return posterFallbackImg;
  }
  return null;
};

const drawCoverFrame = (
  ctx: CanvasRenderingContext2D,
  source: DecodedFrame,
  canvasW: number,
  canvasH: number
) => {
  const srcW =
    source instanceof HTMLImageElement ? source.naturalWidth : source.width;
  const srcH =
    source instanceof HTMLImageElement ? source.naturalHeight : source.height;
  if (!srcW || !srcH || !canvasW || !canvasH) return;

  const imgRatio = srcW / srcH;
  const canvasRatio = canvasW / canvasH;

  let drawW = canvasW;
  let drawH = canvasH;
  let dx = 0;
  let dy = 0;

  if (canvasRatio > imgRatio) {
    drawW = canvasW;
    drawH = canvasW / imgRatio;
    dx = 0;
    dy = (canvasH - drawH) * 0.45;
  } else {
    drawH = canvasH;
    drawW = canvasH * imgRatio;
    dx = (canvasW - drawW) * 0.5;
    dy = 0;
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(source, dx, dy, drawW, drawH);
};

export const drawScrollFrame = (
  ctx: CanvasRenderingContext2D,
  targetIdx: number,
  canvasW: number,
  canvasH: number,
  isMobile: boolean,
  onDecodeReady?: () => void
): boolean => {
  const clamped = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(targetIdx)));
  flushDecodedBitmapsForModeChange(isMobile);

  const exact = coarseBitmaps.get(clamped) || dynamicBitmaps.get(clamped);
  if (exact) {
    if (dynamicBitmaps.has(clamped)) {
      dynamicBitmaps.delete(clamped);
      dynamicBitmaps.set(clamped, exact);
    }
    drawCoverFrame(ctx, exact, canvasW, canvasH);

    // Pre-decode small neighborhood ahead/behind current scroll position for 60fps silky smoothness
    const lookahead = [clamped + 1, clamped + 2, clamped + 3, clamped - 1];
    for (const neighbor of lookahead) {
      if (
        neighbor >= 0 &&
        neighbor < TOTAL_FRAMES &&
        !coarseBitmaps.has(neighbor) &&
        !dynamicBitmaps.has(neighbor)
      ) {
        void ensureFrameDecoded(neighbor, isMobile, false);
      }
    }
    return true;
  }

  // Draw nearest ready frame immediately while exact frame decodes asynchronously
  const nearest = findNearestDecoded(clamped);
  if (nearest) {
    drawCoverFrame(ctx, nearest, canvasW, canvasH);
  }

  void ensureFrameDecoded(clamped, isMobile, true, onDecodeReady);
  void ensureFrameDecoded(clamped + 1, isMobile, false);
  return false;
};
