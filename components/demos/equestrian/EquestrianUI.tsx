import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion as framerMotion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { headerWash, palette } from './equestrianData';

const motion = framerMotion as any;

export const HORSE_VIEWBOX = '0 0 298 346';
export const HORSE_RATIO = 298 / 346;

export type HorseStroke = {
  key: string;
  w: number;
  d: string;
};

export const HORSE_STROKES: HorseStroke[] = [
  {
    key: 'crest',
    w: 4.6,
    d:
      'M 68 82 C 70.0 78.7, 75.3 68.7, 80 62 C 84.7 55.3, 89.3 48.0, 96 42 ' +
      'C 102.7 36.0, 113.0 30.0, 120 26 C 127.0 22.0, 130.0 21.0, 138 18 ' +
      'C 146.0 15.0, 157.3 9.0, 168 8 C 178.7 7.0, 193.0 9.7, 202 12 ' +
      'C 211.0 14.3, 215.7 18.3, 222 22 C 228.3 25.7, 234.7 29.7, 240 34 ' +
      'C 245.3 38.3, 249.7 43.0, 254 48 C 258.3 53.0, 262.3 59.7, 266 64 ' +
      'C 269.7 68.3, 273.3 70.3, 276 74 C 278.7 77.7, 280.0 81.7, 282 86 ' +
      'C 284.0 90.3, 287.0 97.7, 288 100'
  },
  {
    key: 'face',
    w: 2.0,
    d:
      'M 52 127 C 51.2 130.2, 47.5 140.3, 47 146 C 46.5 151.7, 47.3 156.3, 49 161 ' +
      'C 50.7 165.7, 54.0 167.5, 57 174 C 60.0 180.5, 64.2 189.3, 67 200 ' +
      'C 69.8 210.7, 71.8 227.5, 74 238 C 76.2 248.5, 78.2 256.2, 80 263 ' +
      'C 81.8 269.8, 84.2 276.3, 85 279'
  },
  {
    key: 'muzzle',
    w: 2.8,
    d:
      'M 85 279 C 86.5 281.7, 90.2 291.2, 94 295 C 97.8 298.8, 103.0 300.5, 108 302 ' +
      'C 113.0 303.5, 119.7 304.2, 124 304 C 128.3 303.8, 131.0 302.8, 134 301 ' +
      'C 137.0 299.2, 139.8 296.5, 142 293 C 144.2 289.5, 146.0 284.7, 147 280 ' +
      'C 148.0 275.3, 147.8 267.5, 148 265'
  },
  {
    key: 'cheek',
    w: 5.0,
    d:
      'M 149 112 C 152.0 114.2, 162.8 120.3, 167 125 C 171.2 129.7, 172.2 134.2, 174 140 ' +
      'C 175.8 145.8, 177.5 153.7, 178 160 C 178.5 166.3, 178.0 172.5, 177 178 ' +
      'C 176.0 183.5, 174.2 188.0, 172 193 C 169.8 198.0, 166.7 203.0, 164 208 ' +
      'C 161.3 213.0, 158.5 218.0, 156 223 C 153.5 228.0, 150.7 233.0, 149 238 ' +
      'C 147.3 243.0, 146.5 248.2, 146 253 C 145.5 257.8, 146.0 264.7, 146 267'
  },
  {
    key: 'throat',
    w: 5.4,
    d:
      'M 214 159 C 213.7 161.3, 213.7 167.3, 212 173 C 210.3 178.7, 207.0 186.8, 204 193 ' +
      'C 201.0 199.2, 197.3 204.2, 194 210 C 190.7 215.8, 186.8 222.2, 184 228 ' +
      'C 181.2 233.8, 179.2 239.2, 177 245 C 174.8 250.8, 172.7 257.2, 171 263 ' +
      'C 169.3 268.8, 167.8 274.7, 167 280 C 166.2 285.3, 165.8 289.3, 166 295 ' +
      'C 166.2 300.7, 167.0 307.8, 168 314 C 169.0 320.2, 171.0 328.0, 172 332 ' +
      'C 173.0 336.0, 173.7 337.0, 174 338'
  },
  {
    key: 'earTop',
    w: 2.2,
    d: 'M 8 125 C 12.0 122.3, 24.7 113.8, 32 109 C 39.3 104.2, 47.7 99.2, 52 96 C 56.3 92.8, 57.0 91.0, 58 90'
  },
  {
    key: 'earBase',
    w: 2.2,
    d: 'M 8 125 C 11.3 125.3, 21.7 126.7, 28 127 C 34.3 127.3, 41.8 126.8, 46 127 C 50.2 127.2, 51.8 127.8, 53 128'
  },
  {
    key: 'browUp',
    w: 1.6,
    d: 'M 72 120 C 73.7 118.2, 79.0 112.5, 82 109 C 85.0 105.5, 87.7 102.2, 90 99 C 92.3 95.8, 95.0 91.5, 96 90'
  },
  {
    key: 'browMid',
    w: 1.6,
    d: 'M 72 120 C 75.3 119.7, 85.3 119.8, 92 118 C 98.7 116.2, 106.7 111.5, 112 109 C 117.3 106.5, 122.0 104.0, 124 103'
  },
  {
    key: 'browDown',
    w: 1.6,
    d: 'M 72 120 C 74.3 121.3, 81.7 126.0, 86 128 C 90.3 130.0, 95.0 131.0, 98 132 C 101.0 133.0, 103.0 133.7, 104 134'
  },
  {
    key: 'eye',
    w: 1.8,
    d:
      'M 110 192 C 109.5 190.0, 107.7 183.7, 107 180 C 106.3 176.3, 105.5 173.0, 106 170 ' +
      'C 106.5 167.0, 108.2 163.8, 110 162 C 111.8 160.2, 115.3 158.2, 117 159 ' +
      'C 118.7 159.8, 119.7 164.2, 120 167 C 120.3 169.8, 119.7 173.2, 119 176 ' +
      'C 118.3 178.8, 116.5 182.7, 116 184'
  },
  {
    key: 'mouth',
    w: 1.6,
    d: 'M 124 287 C 122.0 287.7, 114.8 289.8, 112 291 C 109.2 292.2, 106.7 293.3, 107 294 C 107.3 294.7, 111.8 294.8, 114 295 C 116.2 295.2, 119.0 295.0, 120 295'
  }
];

const LOGO_OMIT = ['browUp', 'browMid', 'browDown', 'mouth'];
export const HORSE_LOGO_STROKES = HORSE_STROKES.filter((s) => LOGO_OMIT.indexOf(s.key) === -1);

const W_MIN = 1.6;
const W_MAX = 5.4;
const PX_MIN = 1.15;
const PX_MAX = 2.0;
const logoStrokeUnits = (w: number, size: number) => {
  const px = PX_MIN + ((w - W_MIN) / (W_MAX - W_MIN)) * (PX_MAX - PX_MIN);
  return (px * 346) / size;
};

export const HorseMark: React.FC<{ size?: number; color?: string; className?: string }> = ({
  size = 40,
  color = palette.green,
  className = ''
}) => (
  <svg
    viewBox={HORSE_VIEWBOX}
    width={Math.round(size * HORSE_RATIO)}
    height={size}
    className={className}
    fill="none"
    stroke={color}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    {HORSE_LOGO_STROKES.map((s) => (
      <path key={s.key} d={s.d} strokeWidth={logoStrokeUnits(s.w, size)} />
    ))}
  </svg>
);

// Small horseshoe emblem used beside section labels.
export const Bloom: React.FC<{ size?: number; className?: string }> = ({ size = 16, className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={`text-[#2D5A43] ${className}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M7 4.5C4.8 7.2 4 10.6 4.5 14.2C5.1 18.4 8.2 21 12 21C15.8 21 18.9 18.4 19.5 14.2C20 10.6 19.2 7.2 17 4.5" />
    <path d="M9.5 6C8.2 8.2 7.7 10.8 8.1 13.6C8.5 16.3 10 18 12 18C14 18 15.5 16.3 15.9 13.6C16.3 10.8 15.8 8.2 14.5 6" />
  </svg>
);

// Detailed, anatomical classical horseshoe & hoof print oriented pointing DOWNWARD (+Y)
// so that 0deg rotation points straight down the page and tangent rotation aligns the toe with the walk direction.
const DetailedHorseshoeSvg: React.FC<{ className?: string; isLeft?: boolean }> = ({
  className = '',
  isLeft = true
}) => (
  <svg
    viewBox="0 0 140 165"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    style={{ transform: isLeft ? 'none' : 'scaleX(-1)' }}
  >
    {/* Soft inner hoof sole & frog impression */}
    <path
      d="M52 30 L70 86 L88 30 C82 28, 76 32, 70 46 C64 32, 58 28, 52 30 Z"
      fill="currentColor"
      fillOpacity="0.16"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeOpacity="0.38"
      strokeLinejoin="round"
    />
    <path
      d="M44 52 C40 76, 48 104, 70 108 C92 104, 100 76, 96 52"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeDasharray="4 4"
      strokeOpacity="0.32"
      strokeLinecap="round"
    />

    {/* Forged Iron Horseshoe Outer & Inner Web */}
    <path
      d="M34 18
         C26 16, 20 22, 22 32
         C13 58, 12 90, 23 116
         C33 136, 50 148, 70 148
         C90 148, 107 136, 117 116
         C128 90, 127 58, 118 32
         C120 22, 114 16, 106 18
         C98 20, 96 28, 98 36
         C105 60, 105 86, 96 107
         C89 121, 80 128, 70 128
         C60 128, 51 121, 44 107
         C35 86, 35 60, 42 36
         C44 28, 42 20, 34 18 Z"
      fill="currentColor"
      fillOpacity="0.28"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinejoin="round"
    />

    {/* Heel Calkins (folded-over heel tabs at the top of each branch) */}
    <rect
      x="22"
      y="18"
      width="18"
      height="8"
      rx="3"
      transform="rotate(-12 31 22)"
      fill="currentColor"
      fillOpacity="0.45"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <rect
      x="100"
      y="18"
      width="18"
      height="8"
      rx="3"
      transform="rotate(12 109 22)"
      fill="currentColor"
      fillOpacity="0.45"
      stroke="currentColor"
      strokeWidth="1.6"
    />

    {/* Toe Clip at the bottom apex */}
    <path
      d="M58 147 L70 158 L82 147 Z"
      fill="currentColor"
      fillOpacity="0.55"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />

    {/* Left & Right Fullering Grooves (recessed channels for nails) */}
    <path
      d="M28 44 C22 66, 22 92, 31 112"
      stroke="currentColor"
      strokeWidth="5.5"
      strokeOpacity="0.24"
      strokeLinecap="round"
    />
    <path
      d="M112 44 C118 66, 118 92, 109 112"
      stroke="currentColor"
      strokeWidth="5.5"
      strokeOpacity="0.24"
      strokeLinecap="round"
    />

    {/* 8 Rectangular Nail Holes (4 along left branch, 4 along right branch) */}
    <g fill="currentColor" fillOpacity="0.85">
      <rect x="24" y="48" width="5" height="7" rx="1" transform="rotate(8 26.5 51.5)" />
      <rect x="21.5" y="65" width="5" height="7" rx="1" transform="rotate(2 24 68.5)" />
      <rect x="22" y="82" width="5" height="7" rx="1" transform="rotate(-7 24.5 85.5)" />
      <rect x="25.5" y="99" width="5" height="7" rx="1" transform="rotate(-16 28 102.5)" />

      <rect x="111" y="48" width="5" height="7" rx="1" transform="rotate(-8 113.5 51.5)" />
      <rect x="113.5" y="65" width="5" height="7" rx="1" transform="rotate(-2 116 68.5)" />
      <rect x="113" y="82" width="5" height="7" rx="1" transform="rotate(7 115.5 85.5)" />
      <rect x="109.5" y="99" width="5" height="7" rx="1" transform="rotate(16 112 102.5)" />
    </g>
  </svg>
);

// Full-page equine horseshoe trail that walks across the page (right -> left -> right -> left)
// and actively follows the user's scroll position.
export const HoofPrintTrail: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [docSize, setDocSize] = useState({ width: 1280, height: 3200 });
  const [walkerY, setWalkerY] = useState(650);
  const targetYRef = useRef(650);
  const walkerYRef = useRef(650);

  useEffect(() => {
    const measure = () => {
      const parentH = containerRef.current?.parentElement?.offsetHeight || 0;
      const h = Math.max(parentH, window.innerHeight * 1.5, 2400);
      const w = window.innerWidth || 1280;
      setDocSize({ width: w, height: h });
    };

    measure();
    const ro =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => measure()) : null;
    if (ro && containerRef.current?.parentElement) {
      ro.observe(containerRef.current.parentElement);
    }
    window.addEventListener('resize', measure, { passive: true });

    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  useEffect(() => {
    let rafId = 0;

    const onScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      // Target sits inside the lower portion of the user's viewport so the horse
      // walks right behind/with the user as they scroll down.
      targetYRef.current = scrollY + window.innerHeight * 0.82;
    };

    onScroll();
    walkerYRef.current = targetYRef.current;
    setWalkerY(walkerYRef.current);

    const tick = () => {
      const diff = targetYRef.current - walkerYRef.current;
      if (Math.abs(diff) > 1.5) {
        // Smooth, unhurried walking pursuit speed so the footsteps visibly follow the user
        const stepDelta = Math.sign(diff) * Math.min(Math.abs(diff) * 0.065, 22);
        walkerYRef.current += stepDelta;
        setWalkerY(walkerYRef.current);
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Build the S-curve walking steps from top to bottom of the page:
  // Starts on the right (~82%), glides across to the left (~18%), back to the right (~82%), and back to the left.
  const STRIDE_Y = 235;
  const START_Y = 280;
  const END_Y = Math.max(START_Y + STRIDE_Y * 4, docSize.height - 380);
  const WAVE_PERIOD = 2100; // px per full right-to-left-to-right cycle
  const k = (2 * Math.PI) / WAVE_PERIOD;
  const vw = docSize.width;
  const isMobile = vw < 640;
  const lateralHoofOffsetPx = isMobile ? 22 : vw < 768 ? 34 : 58; // natural left/right leg spread
  const waveAmpPct = isMobile ? 28 : 34;

  const footprints: {
    id: number;
    xPx: number;
    yPx: number;
    rotDeg: number;
    isLeft: boolean;
  }[] = [];

  let idx = 0;
  for (let y = START_Y; y <= END_Y; y += STRIDE_Y) {
    const phase = (y - START_Y) * k;
    // Centerline in % of viewport width: 50% + waveAmpPct * cos(phase)
    const centerXPct = 50 + waveAmpPct * Math.cos(phase);
    const centerXPx = (centerXPct / 100) * vw;

    // Derivative dx/dy in pixels per pixel of vertical travel
    const dxDy = -(waveAmpPct / 100) * vw * k * Math.sin(phase);
    // Rotation angle so a downward-pointing horseshoe aligns with tangent (dxDy, 1)
    const tangentRad = Math.atan2(-dxDy, 1);
    const tangentDeg = (tangentRad * 180) / Math.PI;

    // Perpendicular normal vector to offset left vs right hoof
    const isLeft = idx % 2 === 0;
    const sign = isLeft ? -1 : 1;
    const normalX = Math.cos(tangentRad) * sign * lateralHoofOffsetPx;
    const normalY = Math.sin(tangentRad) * sign * (lateralHoofOffsetPx * 0.35);

    footprints.push({
      id: idx,
      xPx: centerXPx + normalX,
      yPx: y + normalY,
      rotDeg: tangentDeg + (isLeft ? -4 : 4),
      isLeft
    });
    idx += 1;
  }

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[4] overflow-hidden select-none"
    >
      {footprints.map((fp) => {
        const distFromWalker = walkerY - fp.yPx;
        const isStepped = distFromWalker >= -40;
        // Freshly stepped prints near the user's current scroll are slightly richer
        const isFreshStep = isStepped && distFromWalker >= -40 && distFromWalker < 480;
        const opacity = !isStepped ? 0 : isFreshStep ? 0.22 : 0.14;
        const scale = !isStepped ? 0.82 : isFreshStep ? 1.04 : 0.98;

        return (
          <div
            key={fp.id}
            className="absolute text-[#2D5A43] transition-all duration-700 ease-out will-change-transform"
            style={{
              left: `${fp.xPx}px`,
              top: `${fp.yPx}px`,
              opacity,
              transform: `translate3d(-50%, -50%, 0) rotate(${fp.rotDeg.toFixed(1)}deg) scale(${scale})`
            }}
          >
            <DetailedHorseshoeSvg
              isLeft={fp.isLeft}
              className="w-16 h-20 sm:w-24 sm:h-28 md:w-36 md:h-40 lg:w-44 lg:h-48"
            />
          </div>
        );
      })}
    </div>
  );
};

export const Reveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}> = ({ children, className = '' }) => (
  <div className={className}>
    {children}
  </div>
);

export const SectionLabel: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ''
}) => (
  <p className={`inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.34em] text-[#2D5A43] font-medium ${className}`}>
    <Bloom size={15} />
    <span>{children}</span>
  </p>
);

export const PhotoReveal: React.FC<{
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  delay?: number;
}> = ({ src, alt, className = '', imgClassName = '', priority = false }) => (
  <div
    className={`overflow-hidden rounded-2xl md:rounded-3xl bg-[#E8E2D5] shadow-[0_20px_50px_-28px_rgba(30,40,34,0.22)] ${className}`}
  >
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      {...(priority ? { fetchPriority: 'high' as const } : {})}
      className={`w-full h-full object-cover block ${imgClassName}`}
    />
  </div>
);

export { palette };

export const Wash: React.FC<{ background?: string; className?: string }> = ({
  background = headerWash,
  className = ''
}) => (
  <div
    aria-hidden="true"
    className={`pointer-events-none absolute inset-0 ${className}`}
    style={{ background }}
  />
);

export interface Slide {
  src: string;
  alt: string;
  title: string;
  note: string;
  meta?: string;
}

export const Carousel: React.FC<{ slides: Slide[]; interval?: number; className?: string }> = ({
  slides,
  interval = 6500,
  className = ''
}) => {
  const [index, setIndex] = useState(0);
  const [held, setHeld] = useState(false);

  const count = slides.length;
  const go = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count]
  );

  useEffect(() => {
    if (held || count < 2) return;
    const reduce =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), interval);
    return () => window.clearInterval(id);
  }, [held, count, interval]);

  const slide = slides[index];

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      aria-roledescription="carousel"
    >
      <div className="relative overflow-hidden rounded-3xl bg-[#E8E2D5] h-[clamp(360px,62vh,620px)]">
        <AnimatePresence initial={false}>
          <motion.img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.1, ease: 'easeInOut' }, scale: { duration: 7, ease: 'linear' } }}
          />
        </AnimatePresence>

        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(30,40,34,0.72) 0%, rgba(30,40,34,0.18) 45%, rgba(30,40,34,0) 75%)'
          }}
        />

        <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.title}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="text-[#FAF6EE] max-w-lg"
            >
              {slide.meta && (
                <p className="text-[10px] uppercase tracking-[0.36em] text-white/70 mb-3">{slide.meta}</p>
              )}
              <h3 className="font-serif text-[clamp(1.6rem,3.4vw,2.5rem)] leading-tight mb-2">{slide.title}</h3>
              <p className="text-[14px] md:text-[15px] text-white/85 leading-relaxed">{slide.note}</p>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center gap-3 shrink-0">
            <span className="font-serif text-[#FAF6EE] text-base mr-2 tabular-nums">
              {String(index + 1).padStart(2, '0')}
              <span className="text-white/50"> / {String(count).padStart(2, '0')}</span>
            </span>
            <button
              type="button"
              aria-label="Previous"
              onClick={() => {
                setHeld(true);
                go(index - 1);
              }}
              className="w-11 h-11 rounded-full border border-white/40 text-[#FAF6EE] flex items-center justify-center hover:bg-[#FAF6EE] hover:text-[#1E2822] transition-colors duration-300"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => {
                setHeld(true);
                go(index + 1);
              }}
              className="w-11 h-11 rounded-full border border-white/40 text-[#FAF6EE] flex items-center justify-center hover:bg-[#FAF6EE] hover:text-[#1E2822] transition-colors duration-300"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            aria-label={`Go to ${s.title}`}
            aria-current={i === index}
            onClick={() => {
              setHeld(true);
              go(i);
            }}
            className="group h-1.5 rounded-full overflow-hidden flex-1 bg-[#E2DDD2]"
          >
            <span
              className="block h-full rounded-full bg-[#2D5A43] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ width: i === index ? '100%' : '0%' }}
            />
          </button>
        ))}
      </div>
    </div>
  );
};
