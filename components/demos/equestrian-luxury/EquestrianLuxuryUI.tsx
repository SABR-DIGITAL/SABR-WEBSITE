import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import * as RouterDOM from 'react-router-dom';
const { Link, useLocation } = RouterDOM as any;
import { X } from 'lucide-react';
import { academy, images, openingHours } from '../equestrian/equestrianData';

export const LUXURY_VIDEO_SRC = '/assets/aistudio/gemini_generated_video_7de186c5_667a4438.mp4';

export const LUXURY_NAV_LINKS = [
  {
    name: 'HOME',
    path: '/demo/equestrian-luxury',
    image: images.hero
  },
  {
    name: 'TUITION',
    path: '/demo/equestrian-luxury/lessons',
    image: images.arena
  },
  {
    name: 'SCHOOLMASTERS',
    path: '/demo/equestrian-luxury/horses',
    image: images.meadow
  },
  {
    name: 'THE ESTATE',
    path: '/demo/equestrian-luxury/facilities',
    image: images.hacking
  },
  {
    name: 'CONTACT',
    path: '/demo/equestrian-luxury/contact',
    image: images.stables
  }
];

/**
 * Minimal, smooth scroll-reveal wrapper using IntersectionObserver + GPU-accelerated transitions
 */
export const LuxuryReveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}> = ({ children, delay = 0, className = '', y = 22 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        transform: visible ? 'translate3d(0, 0, 0)' : `translate3d(0, ${y}px, 0)`,
        opacity: visible ? 1 : 0
      }}
      className={`transition-[opacity,transform] duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[opacity,transform] ${className}`}
    >
      {children}
    </div>
  );
};

/**
 * Elegant Self-Writing Luxury Script Component:
 * Avoids CSS clip-path (which can clip or hide webfont glyphs on Windows Chromium GPUs)
 * and instead animates each cursive word sequentially left-to-right with a guaranteed
 * fallback timer so the text is always 100% visible across Mac, Windows PC, and mobile.
 */
export const LuxuryScriptText: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: 'span' | 'p';
}> = ({ children, className = '', delay = 80, as = 'span' }) => {
  const ref = useRef<HTMLElement>(null);
  const [written, setWritten] = useState(false);

  useEffect(() => {
    const el = ref.current;
    // Guaranteed fallback timer so the script text always reveals even if IntersectionObserver
    // is delayed by a parent transform or offscreen container on Windows browsers.
    const fallbackTimer = window.setTimeout(() => {
      setWritten(true);
    }, 380);

    if (!el || typeof IntersectionObserver === 'undefined') {
      setWritten(true);
      return () => window.clearTimeout(fallbackTimer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWritten(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: '40px 0px 40px 0px' }
    );
    observer.observe(el);

    return () => {
      window.clearTimeout(fallbackTimer);
      observer.disconnect();
    };
  }, [children]);

  const Tag = as as any;
  const textContent = typeof children === 'string' ? children : null;
  const words = textContent ? textContent.split(' ') : null;

  return (
    <Tag
      ref={ref}
      style={{
        fontFamily: "'Dancing Script', 'Cormorant Garamond', Georgia, serif"
      }}
      className={`font-pinyon inline font-medium tracking-[0.02em] ${className}`}
    >
      {words
        ? words.map((word, idx) => (
            <React.Fragment key={idx}>
              <span
                style={{
                  transitionDelay: `${delay + idx * 140}ms`,
                  opacity: written ? 1 : 0.01,
                  transform: written
                    ? 'translate3d(0, 0, 0) skewX(0deg)'
                    : 'translate3d(-7px, 3px, 0) skewX(-5deg)'
                }}
                className="inline-block transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
              >
                {word}
              </span>
              {idx < words.length - 1 ? ' ' : ''}
            </React.Fragment>
          ))
        : children}
    </Tag>
  );
};

/**
 * Wind-Swept Horse Emblem in pure opaque white
 */
export const DressageRiderEmblem: React.FC<{ className?: string }> = ({
  className = 'w-28 sm:w-36 md:w-44 h-auto'
}) => (
  <>
    <svg width="0" height="0" className="sr-only" aria-hidden="true">
      <defs>
        <filter id="solid-white-horse-emblem" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1
                    0 0 0 0 1
                    0 0 0 0 1
                    0 0 0 4 0"
          />
        </filter>
      </defs>
    </svg>
    <img
      src="/assets/aistudio/Wind-Swept_Horse_in_White_Line_Art-removebg-preview_9a5a2385.png"
      alt="Bramble & Bay Equestrian Crest"
      width={482}
      height={410}
      loading="eager"
      decoding="sync"
      style={{ filter: 'url(#solid-white-horse-emblem)' }}
      className={`${className} object-contain select-none pointer-events-none opacity-100`}
    />
  </>
);

/**
 * Newton Hall Equestrian-inspired Crest & Dual-Font Lockup:
 * - Top: ESTD — [Wind-Swept White Horse Emblem] — 1998
 * - Middle: "Bramble" (High-Contrast Serif) + " & Bay" (Legible Self-Writing Luxury Script)
 * - Bottom: · E Q U E S T R I A N ·
 */
export const BrambleBayCrestLogo: React.FC<{
  darkText?: boolean;
  compact?: boolean;
  className?: string;
}> = ({ darkText = false, compact = false, className = '' }) => {
  const textColor = darkText ? 'text-[#0E1712]' : 'text-white';
  const subColor = darkText ? 'text-[#0E1712]/75' : 'text-white/85';

  if (compact) {
    return (
      <div className={`inline-flex flex-col items-center select-none ${textColor} ${className}`}>
        <div className="flex items-baseline leading-none">
          <span className="font-playfair text-xl sm:text-2xl font-medium tracking-[-0.02em]">
            Bramble
          </span>
          <LuxuryScriptText className="text-xl sm:text-2xl ml-1.5" delay={100}>
            &amp; Bay
          </LuxuryScriptText>
        </div>
        <span
          className={`text-[7.5px] sm:text-[8px] uppercase tracking-[0.48em] font-medium mt-1 ${subColor}`}
        >
          &middot; Equestrian &middot;
        </span>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col items-center text-center select-none ${textColor} ${className}`}
    >
      {/* Top Row: ESTD — [Horse Emblem] — 1998 */}
      <div className="flex items-center justify-center gap-4 sm:gap-7 md:gap-9 mb-2 sm:mb-3">
        <span
          className={`text-[10px] sm:text-[12px] md:text-[13px] uppercase tracking-[0.42em] font-medium ${subColor}`}
        >
          ESTD
        </span>
        <DressageRiderEmblem className="w-24 sm:w-32 md:w-40 lg:w-44 h-auto drop-shadow-[0_6px_24px_rgba(0,0,0,0.35)]" />
        <span
          className={`text-[10px] sm:text-[12px] md:text-[13px] uppercase tracking-[0.42em] font-medium ${subColor}`}
        >
          1998
        </span>
      </div>

      {/* Middle Row: High-Contrast Serif ("Bramble") + Legible Self-Writing Script ("& Bay") */}
      <div className="flex items-baseline justify-center leading-[0.95] drop-shadow-[0_8px_28px_rgba(0,0,0,0.4)]">
        <span className="font-playfair text-[clamp(2.6rem,7.2vw,5.6rem)] font-medium tracking-[-0.025em]">
          Bramble
        </span>
        <LuxuryScriptText
          delay={180}
          className="text-[clamp(2.55rem,7.2vw,5.6rem)] ml-2.5 sm:ml-3.5"
        >
          &amp; Bay
        </LuxuryScriptText>
      </div>

      {/* Bottom Row: · E Q U E S T R I A N · */}
      <p
        className={`mt-2 sm:mt-3 text-[10px] sm:text-[12px] md:text-[14px] uppercase tracking-[0.52em] sm:tracking-[0.62em] font-medium pl-[0.52em] ${subColor}`}
      >
        &middot; Equestrian &middot;
      </p>
    </div>
  );
};

/**
 * Premium Landscaping-style Hamburger Menu Layout across Desktop, Tablet, and Mobile
 */
export const EquestrianLuxuryNav: React.FC<{ transparentOnTop?: boolean }> = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(0);
  const location = useLocation ? useLocation() : { pathname: '' };

  useEffect(() => {
    setMenuOpen(false);
    const activeIndex = LUXURY_NAV_LINKS.findIndex((item) => item.path === location.pathname);
    if (activeIndex >= 0) {
      setHoveredIdx(activeIndex);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const navContent = (
    <>
      {/* Minimal Luxury Hamburger Trigger in Top-Right Corner — Welded to viewport */}
      <button
        type="button"
        onClick={() => setMenuOpen(true)}
        aria-label="Open navigation menu"
        style={{ transform: 'translate3d(0, 0, 0)', WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' }}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-10 z-[150] w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#F7F5F0] lg:bg-[#F7F5F0]/90 hover:bg-[#0E1712] text-[#0E1712] hover:text-[#F7F5F0] border border-[#0E1712]/15 shadow-[0_8px_30px_rgba(0,0,0,0.12)] lg:backdrop-blur-md flex flex-col items-center justify-center gap-[5px] lg:transition-colors lg:duration-500 cursor-pointer group"
      >
        <span className="w-4 sm:w-5 h-[1px] bg-current transition-all duration-300 group-hover:w-5 sm:group-hover:w-6" />
        <span className="w-4 sm:w-5 h-[1px] bg-current transition-all duration-300" />
        <span className="w-3 sm:w-3.5 h-[1px] bg-current self-end mr-[11px] sm:mr-[13px] transition-all duration-300 group-hover:w-4 sm:group-hover:w-5 group-hover:mr-0 group-hover:self-center" />
      </button>

      {/* Full-Screen 50/50 Split Menu Overlay (Desktop, Tablet & Mobile) */}
      <div
        className={`fixed inset-0 z-[250] flex flex-col md:flex-row transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          menuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-3'
        }`}
        aria-hidden={!menuOpen}
      >
        {/* Left Half: Warm Alabaster Minimalist Navigation Column */}
        <div className="w-full md:w-1/2 h-full bg-[#F7F5F0] flex flex-col justify-between items-center pt-5 pb-16 sm:py-10 md:py-12 px-6 sm:px-8 relative overflow-y-auto">
          {/* Thin Close X Button at Top */}
          <div className="w-full flex items-center justify-between md:justify-start md:pl-[34%]">
            <Link
              to="/demo/equestrian-luxury"
              onClick={() => setMenuOpen(false)}
              className="md:hidden text-xs font-light uppercase tracking-[0.32em] text-[#7A6B53]"
            >
              BRAMBLE &amp; BAY
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close navigation menu"
              className="p-2 text-[#7A6B53] hover:text-[#0E1712] transition-colors duration-300 cursor-pointer"
            >
              <X size={24} strokeWidth={1} />
            </button>
          </div>

          {/* Centered Vertical Navigation Links */}
          <nav
            aria-label="Main menu"
            className="flex flex-col items-center space-y-2.5 sm:space-y-4 md:space-y-5 my-auto py-3"
          >
            {LUXURY_NAV_LINKS.map((item, idx) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onClick={() => setMenuOpen(false)}
                  className={`text-[13px] sm:text-[15px] md:text-[17px] font-light tracking-[0.28em] uppercase transition-all duration-300 py-0.5 ${
                    isActive
                      ? 'text-[#7A6B53] font-normal'
                      : 'text-[#0E1712] hover:text-[#7A6B53] hover:tracking-[0.35em]'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Subtle Centered Contact Details at Bottom */}
          <div className="text-center space-y-1 text-[10px] sm:text-[11px] font-light tracking-[0.1em] text-[#525A54]">
            <a
              href={`tel:${academy.phoneHref}`}
              className="block hover:text-[#0E1712] transition-colors tabular-nums"
            >
              {academy.phoneDisplay}
            </a>
            <a
              href={`mailto:${academy.email}`}
              className="block hover:text-[#0E1712] transition-colors"
            >
              {academy.email}
            </a>
          </div>
        </div>

        {/* Right Half: Full-Bleed Equestrian Photograph with Centered White Horse Emblem */}
        <div className="hidden md:block md:w-1/2 h-full relative overflow-hidden bg-[#0B120E]">
          {LUXURY_NAV_LINKS.map((item, idx) => (
            <img
              key={item.name}
              src={item.image}
              alt={item.name}
              loading="eager"
              decoding="async"
              className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-[1100ms] ease-out ${
                idx === hoveredIdx ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-[#0B120E]/35" />
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-8">
            <DressageRiderEmblem className="w-28 lg:w-36 h-auto drop-shadow-[0_10px_28px_rgba(0,0,0,0.45)]" />
            <span className="mt-3 text-[9px] uppercase tracking-[0.48em] text-white/80 font-light">
              Bramble &amp; Bay &middot; Est. 1998
            </span>
          </div>
        </div>
      </div>
    </>
  );

  return typeof document !== 'undefined' ? createPortal(navContent, document.body) : navContent;
};

export const EquestrianLuxuryFooter: React.FC = () => (
  <footer className="bg-[#0B120E] text-white">
    <div className="max-w-[1360px] mx-auto px-6 sm:px-10 md:px-16 py-20 sm:py-28">
      <div className="flex flex-col items-center text-center pb-16 sm:pb-20 border-b border-white/10">
        <BrambleBayCrestLogo className="mb-6" />
        <p className="text-white/60 text-sm sm:text-base max-w-md font-light leading-relaxed">
          Four hundred acres of private Wiltshire chalk downland, twenty-two classically schooled horses, and unhurried private equitation.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-12 py-14 border-b border-white/10 text-center sm:text-left">
        <div>
          <p className="text-[9.5px] uppercase tracking-[0.38em] text-[#C5B393] mb-3">
            The Courtyard
          </p>
          <p className="text-sm text-white/75 font-light leading-relaxed">
            {academy.addressLine1}
            <br />
            {academy.addressLine2}, {academy.postcode}
          </p>
        </div>

        <div>
          <p className="text-[9.5px] uppercase tracking-[0.38em] text-[#C5B393] mb-3">
            The Tack Room
          </p>
          <a
            href={`tel:${academy.phoneHref}`}
            className="block font-playfair text-xl text-white hover:text-[#C5B393] transition-colors"
          >
            {academy.phoneDisplay}
          </a>
          <a
            href={`mailto:${academy.email}`}
            className="block text-sm text-white/60 hover:text-white font-light transition-colors mt-1 break-all"
          >
            {academy.email}
          </a>
        </div>

        <div>
          <p className="text-[9.5px] uppercase tracking-[0.38em] text-[#C5B393] mb-3">
            Schooling Hours
          </p>
          <ul className="space-y-1.5 text-xs text-white/70 font-light">
            {openingHours.slice(0, 3).map((row) => (
              <li key={row.days} className="flex justify-center sm:justify-between gap-3">
                <span className="text-white/50">{row.days}</span>
                <span>{row.hours}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-white/45 uppercase tracking-[0.28em]">
        <p>&copy; {new Date().getFullYear()} {academy.fullName}</p>
        <div className="flex flex-wrap justify-center gap-6">
          {LUXURY_NAV_LINKS.map((l) => (
            <Link key={l.path} to={l.path} className="hover:text-white transition-colors">
              {l.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  </footer>
);
