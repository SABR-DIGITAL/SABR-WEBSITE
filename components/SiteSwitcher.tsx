import React, { useEffect, useId, useRef, useState } from 'react';
import { ChevronDown, ArrowUpRight } from 'lucide-react';
import { triggerSiteSwitch, type Site } from './introSkip';
import { decodeHero } from '../gateway/GatewayPage';

const OTHER: Record<Site, { target: Site; label: string; tagline: string; href: string }> = {
  'web-design': {
    target: 'ai-optimisation',
    label: 'AI Optimisation',
    tagline: 'Get found by AI tools',
    href: '/ai-optimisation/'
  },
  'ai-optimisation': {
    target: 'web-design',
    label: 'Web Design Studio',
    tagline: 'Websites for small businesses',
    href: '/web-design/'
  }
};

interface SiteSwitcherProps {
  current: Site;
  // Light text for when the bar sits over a dark hero, dark text otherwise.
  onDark?: boolean;
  // Optional label rendered inside the button so tapping the wordmark or arrow opens the menu.
  children?: React.ReactNode;
}

// The small arrow beside the SABR DIGITAL wordmark. It opens a one-item menu
// that lines up under the wordmark (the caller's wrapper is the positioning
// context, so it never runs off a narrow screen). Starts downloading and
// decoding the other site as soon as the visitor shows interest in the arrow,
// so the swoosh glide opens instantaneously from cache.
const warmed = new Set<Site>();
const warmOther = (current: Site) => {
  const target: Site = current === 'web-design' ? 'ai-optimisation' : 'web-design';
  // AI Optimisation is currently Coming Soon and locked from access
  if (target === 'ai-optimisation') return;
  if (warmed.has(target)) return;
  warmed.add(target);
  Promise.all([import('../App'), decodeHero(target)]).catch(() => {
    warmed.delete(target);
  });
};

const SiteSwitcher: React.FC<SiteSwitcherProps> = ({ current, onDark = false, children }) => {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const other = OTHER[current];
  const isComingSoon = other.target === 'ai-optimisation';

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className="flex items-center">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onPointerEnter={() => warmOther(current)}
        onFocus={() => warmOther(current)}
        onTouchStart={() => warmOther(current)}
        aria-expanded={open}
        aria-controls={menuId}
        aria-label="Switch SABR Digital website"
        className={
          children
            ? 'group inline-flex items-center gap-1.5 rounded-lg text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 cursor-pointer'
            : `flex h-7 w-7 items-center justify-center rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 cursor-pointer ${
                onDark ? 'text-emerald-300 hover:bg-white/10' : 'text-emerald-700 hover:bg-emerald-50'
              }`
        }
      >
        {children}
        <span
          className={
            children
              ? `inline-flex h-7 w-7 items-center justify-center rounded-full transition-colors duration-200 ${
                  onDark ? 'text-emerald-300 group-hover:bg-white/10' : 'text-emerald-700 group-hover:bg-emerald-50'
                }`
              : 'inline-flex items-center justify-center'
          }
        >
          <ChevronDown
            size={18}
            strokeWidth={2.5}
            className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          />
        </span>
      </button>

      <div
        id={menuId}
        className={`absolute left-0 top-full z-[300] mt-3 w-72 max-w-[calc(100vw-3rem)] origin-top rounded-2xl border border-stone-200/80 bg-white p-2 shadow-xl transition-[opacity,transform] duration-200 ${open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'}`}
      >
        {isComingSoon ? (
          <div
            role="status"
            aria-disabled="true"
            aria-label={`${other.label} — Coming Soon`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="flex flex-col items-start gap-2.5 rounded-xl border border-emerald-500/25 bg-gradient-to-br from-[#07130f] via-[#0b1f18] to-[#0A0D14] px-4 py-3.5 text-left select-none cursor-not-allowed shadow-sm"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/45 bg-emerald-500/20 px-2.5 py-1 font-syne text-[9px] font-black uppercase tracking-[0.18em] text-emerald-300 shadow-[0_0_14px_rgba(16,185,129,0.35)]">
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-80" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              Coming Soon
            </span>
            <div>
              <span className="block font-syne text-xs sm:text-[13px] font-black uppercase tracking-[0.03em] text-white leading-snug">
                {other.label}
              </span>
              <span className="mt-0.5 block text-[11px] text-emerald-200/75 leading-snug">
                {other.tagline}
              </span>
            </div>
          </div>
        ) : (
          <a
            href={other.href}
            onClick={(e) => {
              setOpen(false);
              triggerSiteSwitch(other.target, other.href, e);
            }}
            className="group flex items-center justify-between gap-4 rounded-xl px-4 py-3 text-left transition-colors hover:bg-emerald-50 focus:outline-none focus-visible:bg-emerald-50"
          >
            <span>
              <span className="block font-syne text-sm font-black uppercase tracking-[0.04em] text-slate-950">
                {other.label}
              </span>
              <span className="mt-0.5 block text-xs text-slate-500">{other.tagline}</span>
            </span>
            <ArrowUpRight
              size={18}
              aria-hidden="true"
              className="shrink-0 text-emerald-600 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        )}
      </div>
    </div>
  );
};

export default SiteSwitcher;
