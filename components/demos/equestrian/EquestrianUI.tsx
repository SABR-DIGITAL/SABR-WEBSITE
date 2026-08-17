import React, { useCallback, useEffect, useState } from 'react';
import { motion as framerMotion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { headerWash, palette } from './equestrianData';

// Fix motion types by casting to any
const motion = framerMotion as any;

// THE HORSE
//
// One horse's head, bowed to the left, traced point by point off the reference
// drawing rather than drawn freehand — the coordinates below are the outline of
// that picture, sampled and run through a Catmull-Rom fit so each curve passes
// through every measured point instead of near it.
//
// Twelve strokes, no fills, in the order a hand would lay them down: the crest
// that gives the head its shape, the face and muzzle, the cheek and the throat,
// then the ear, the three brow marks, the eye and the mouth. The intro animates
// exactly this list; the logo mark renders the same coordinates small. There is
// one set of numbers, so the opening drawing and the brand mark cannot drift
// apart.
export const HORSE_VIEWBOX = '0 0 298 346';
export const HORSE_RATIO = 298 / 346;

export type HorseStroke = {
  /** Stable name — the intro targets strokes by this. */
  key: string;
  /** Line weight in viewBox units. The reference varies its pressure a lot:
   *  the crest, cheek and throat are heavy, everything inside is a hairline. */
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

// At 40px tall the three brow hatches and the mouth tick sit within a couple of
// pixels of each other and fuse into a smudge, so the mark drops them. The
// silhouette, ear and eye are identical to the drawing — it is the same horse
// with the pencil detail left off, which is what any hand-drawn logo does when
// it shrinks.
const LOGO_OMIT = ['browUp', 'browMid', 'browDown', 'mouth'];
export const HORSE_LOGO_STROKES = HORSE_STROKES.filter((s) => LOGO_OMIT.indexOf(s.key) === -1);

// Weights are authored in viewBox units, which stay proportional at any size —
// right for the big intro drawing. A logo is different: below ~60px the hairline
// has to hold at a constant *pixel* weight or it disappears, and the heavy lines
// have to stop growing or they bleed together. So the unit range 1.6–5.4 is
// compressed into 1.15–2.0 real pixels and converted back to units against the
// rendered height.
const W_MIN = 1.6;
const W_MAX = 5.4;
const PX_MIN = 1.15;
const PX_MAX = 2.0;
const logoStrokeUnits = (w: number, size: number) => {
  const px = PX_MIN + ((w - W_MIN) / (W_MAX - W_MIN)) * (PX_MAX - PX_MIN);
  return (px * 346) / size;
};

// The logo mark. `size` is the rendered height.
export const HorseMark: React.FC<{ size?: number; color?: string; className?: string }> = ({
  size = 40,
  color = palette.ink,
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

// A small floral cluster used as a divider and next to section labels. Three
// circles and a stem — enough to read as a flower, cheap enough to repeat.
export const Bloom: React.FC<{ size?: number; className?: string }> = ({ size = 18, className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={className}
    aria-hidden="true"
    focusable="false"
  >
    <circle cx="12" cy="7" r="3.2" fill={palette.rose} />
    <circle cx="6.6" cy="10.5" r="2.4" fill={palette.gold} />
    <circle cx="17.4" cy="10.5" r="2.4" fill={palette.lilac} />
    <path d="M12 11.5 C12 15 12 18 11 21" stroke={palette.meadow} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M11.4 16 C9 15.4 7.6 16.4 7 18" stroke={palette.meadow} strokeWidth="1.5" fill="none" strokeLinecap="round" />
  </svg>
);

// Every reveal on the site goes through here: one direction, one easing, once
// only. viewport.once means it can never be caught half-faded, and the initial
// state is only ever applied by framer-motion — if motion is reduced the whole
// thing renders plainly.
export const Reveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}> = ({ children, delay = 0, y = 26, className = '' }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.25 }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

// Small caps label with a bloom beside it. Used above every section heading.
export const SectionLabel: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ''
}) => (
  <p className={`flex items-center gap-3 text-[10px] uppercase tracking-[0.42em] text-[#6B7A6F] ${className}`}>
    <Bloom size={15} />
    {children}
  </p>
);

// A photograph that eases up to its natural scale as it arrives. Kept as one
// component so every image on the site behaves identically.
export const PhotoReveal: React.FC<{
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  delay?: number;
}> = ({ src, alt, className = '', imgClassName = '', priority = false, delay = 0 }) => (
  <motion.div
    className={`overflow-hidden bg-[#F2EAE0] ${className}`}
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.7, delay, ease: 'easeOut' }}
  >
    <motion.img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      {...(priority ? { fetchPriority: 'high' as const } : {})}
      className={`w-full h-full object-cover ${imgClassName}`}
      initial={{ scale: 1.12 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.5, delay, ease: [0.16, 1, 0.3, 1] }}
    />
  </motion.div>
);

export { palette };

// The soft light behind a section. One component so every page carries the same
// wash rather than each inventing its own set of gradients, and so the colour on
// this site is always diffuse — never a rectangle of paint.
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

// A slow carousel. It advances itself, stops while you are hovering or after you
// have touched a control, and the caption crossfades with the photograph so the
// whole thing moves as one piece. Arrows and dots both work; the counter tells
// you where you are without needing to count the dots.
export const Carousel: React.FC<{ slides: Slide[]; interval?: number; className?: string }> = ({
  slides,
  interval = 6200,
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
      {/* Sized against the viewport rather than by aspect ratio, so a wide
          photograph can never grow taller than the screen it sits on. */}
      <div className="relative overflow-hidden rounded-[1.75rem] md:rounded-[2.25rem] bg-[#F2EAE0] h-[clamp(330px,56vh,540px)]">
        <AnimatePresence initial={false}>
          <motion.img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.07 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.1, ease: 'easeInOut' }, scale: { duration: 7, ease: 'linear' } }}
          />
        </AnimatePresence>

        {/* Just enough shade at the foot of the frame for the caption to read. */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(30,42,34,0.62) 0%, rgba(30,42,34,0.10) 42%, rgba(30,42,34,0) 68%)'
          }}
        />

        <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.title}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="text-[#FFFAF3] max-w-md"
            >
              {slide.meta && (
                <p className="text-[9px] uppercase tracking-[0.36em] text-white/70 mb-3">{slide.meta}</p>
              )}
              <h3 className="font-serif text-[clamp(1.6rem,3.6vw,2.6rem)] leading-none mb-3">{slide.title}</h3>
              <p className="text-[14px] md:text-[15px] text-white/80 leading-relaxed">{slide.note}</p>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center gap-3 shrink-0">
            <span className="font-serif text-[#FFFAF3] text-lg mr-2 tabular-nums">
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
              className="w-11 h-11 rounded-full border border-white/40 text-[#FFFAF3] flex items-center justify-center hover:bg-[#FFFAF3] hover:text-[#1E2A22] transition-colors duration-300"
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
              className="w-11 h-11 rounded-full border border-white/40 text-[#FFFAF3] flex items-center justify-center hover:bg-[#FFFAF3] hover:text-[#1E2A22] transition-colors duration-300"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2">
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
            className="group h-1.5 rounded-full overflow-hidden flex-1 bg-[#EADFD1]"
          >
            <span
              className="block h-full rounded-full bg-[#2F7D5B] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ width: i === index ? '100%' : '0%' }}
            />
          </button>
        ))}
      </div>
    </div>
  );
};
