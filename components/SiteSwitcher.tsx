import React, { useEffect, useId, useRef, useState } from 'react';
import { ChevronDown, ArrowUpRight } from 'lucide-react';

type Site = 'web-design' | 'ai-optimisation';

const OTHER: Record<Site, { label: string; tagline: string; href: string }> = {
  'web-design': {
    label: 'AI Optimisation',
    tagline: 'Get found by AI tools',
    href: '/ai-optimisation/'
  },
  'ai-optimisation': {
    label: 'Web Design Studio',
    tagline: 'Websites for small businesses',
    href: '/web-design/'
  }
};

interface SiteSwitcherProps {
  current: Site;
  // Light text for when the bar sits over a dark hero, dark text otherwise.
  onDark?: boolean;
}

// The small arrow beside the SABR DIGITAL wordmark. It opens a one-item menu
// that lines up under the wordmark (the caller's wrapper is the positioning
// context, so it never runs off a narrow screen). The menu points
// at the studio's other website. A plain <a> on purpose: the other
// site is a different app with its own router, so it needs a full page load.
// Starts downloading the other site as soon as the visitor shows interest in
// the arrow, so the switch itself opens from cache.
let warmed = false;
const warmOther = (current: Site) => {
  if (warmed) return;
  warmed = true;
  const load = current === 'web-design' ? import('../aio/AIOApp') : import('../App');
  load.catch(() => { warmed = false; });
};

const SiteSwitcher: React.FC<SiteSwitcherProps> = ({ current, onDark = false }) => {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const other = OTHER[current];

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
        className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 ${
          onDark ? 'text-emerald-300 hover:bg-white/10' : 'text-emerald-700 hover:bg-emerald-50'
        }`}
      >
        <ChevronDown
          size={18}
          strokeWidth={2.5}
          className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        id={menuId}
        className={`absolute left-0 top-full z-[300] mt-3 w-64 max-w-[calc(100vw-3rem)] origin-top rounded-2xl border border-stone-200/80 bg-white p-2 shadow-xl transition-[opacity,transform] duration-200 ${open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'}`}
      >
        <a
          href={other.href}
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
      </div>
    </div>
  );
};

export default SiteSwitcher;
