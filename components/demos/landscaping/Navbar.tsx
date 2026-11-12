import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import * as RouterDOM from 'react-router-dom';
import { X } from 'lucide-react';

const Link = (RouterDOM as any).Link || (RouterDOM as any).default?.Link;
const useLocation = (RouterDOM as any).useLocation || (RouterDOM as any).default?.useLocation;

const MENU_ITEMS = [
  {
    name: 'HOME',
    path: '/demo/landscaping',
    image:
      'https://dmhdaawgg48dl.cloudfront.net/wp-content/uploads/2024/10/york-stone-patio-conservatory-hedges-classic-notting-hill-960x960.jpg',
  },
  {
    name: 'ABOUT',
    path: '/demo/landscaping/about',
    image:
      'https://dmhdaawgg48dl.cloudfront.net/wp-content/uploads/2025/02/reflection-pool-york-stone-courtyard-country-garden-petworth-760x760.jpg',
  },
  {
    name: 'GARDENS',
    path: '/demo/landscaping/gallery',
    image:
      'https://dmhdaawgg48dl.cloudfront.net/wp-content/uploads/2024/10/pool-patio-palm-trees-putting-green-modern-oxshott-surrey-1920x1280.jpg',
  },
  {
    name: 'DESIGN',
    path: '/demo/landscaping/services',
    image:
      'https://dmhdaawgg48dl.cloudfront.net/wp-content/uploads/2024/11/metal-dining-set-boxwood-topiary-cottage-esher-surrey-960x960.jpg',
  },
  {
    name: 'BUILD',
    path: '/demo/landscaping/services',
    image:
      'https://dmhdaawgg48dl.cloudfront.net/wp-content/uploads/2024/11/plunge-pool-stone-patio-floating-stairs-modern-hampstead-760x760.jpg',
  },
  {
    name: 'PLANTING',
    path: '/demo/landscaping/services',
    image:
      'https://dmhdaawgg48dl.cloudfront.net/wp-content/uploads/2024/12/curved-stone-pathway-iris-fern-modern-woodland-960x960.jpg',
  },
  {
    name: 'MAINTENANCE',
    path: '/demo/landscaping/services',
    image:
      'https://dmhdaawgg48dl.cloudfront.net/wp-content/uploads/2024/10/tiered-slate-retaining-wall-cherry-blossom-japanese-putney-760x760.jpg',
  },
  {
    name: 'CONTACT',
    path: '/demo/landscaping/contact',
    image:
      'https://dmhdaawgg48dl.cloudfront.net/wp-content/uploads/2024/10/yorkstone-rill-water-feature-english-country-petworth-sussex-1920x1280.jpg',
  },
];

// Geometric architectural garden emblem (matches the white emblem in screenshot 2)
export const GardenEmblem: React.FC<{ className?: string }> = ({ className = 'w-14 h-14 text-white' }) => (
  <svg viewBox="0 0 64 64" fill="currentColor" className={className} aria-hidden="true">
    {/* Vertical stem */}
    <rect x="30.5" y="10" width="3" height="44" />
    {/* Left leaf block with rounded opposite corners */}
    <path d="M8 22 H28 V38 C28 41.3 25.3 44 22 44 H8 V28 C8 24.7 10.7 22 14 22 Z" />
    <ellipse cx="18" cy="33" rx="5.5" ry="2.8" fill="#5B6450" transform="rotate(-24 18 33)" />
    {/* Right square architectural block */}
    <rect x="36" y="22" width="20" height="22" />
    <rect x="42.5" y="28.5" width="7" height="9" fill="#5B6450" />
  </svg>
);

export const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(0);
  const location = useLocation ? useLocation() : { pathname: '' };

  useEffect(() => {
    setMenuOpen(false);
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
        className="fixed top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-10 z-[150] w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white lg:bg-white/90 hover:bg-[#1C211D] text-[#1C211D] hover:text-white border border-[#E2DFD7] shadow-[0_8px_30px_rgba(0,0,0,0.08)] lg:backdrop-blur-md flex flex-col items-center justify-center gap-[5px] lg:transition-colors lg:duration-500 cursor-pointer group"
      >
        <span className="w-4 sm:w-5 h-[1px] bg-current transition-transform duration-300 group-hover:w-5 sm:group-hover:w-6" />
        <span className="w-4 sm:w-5 h-[1px] bg-current transition-transform duration-300" />
        <span className="w-3 sm:w-3.5 h-[1px] bg-current self-end mr-[11px] sm:mr-[13px] transition-all duration-300 group-hover:w-4 sm:group-hover:w-5 group-hover:mr-0 group-hover:self-center" />
      </button>

      {/* Full-Screen 50/50 Split Menu Overlay (Matches Screenshot 2 on Desktop, Tablet & Mobile) */}
      <div
        className={`fixed inset-0 z-[250] flex flex-col md:flex-row transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          menuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-3'
        }`}
        aria-hidden={!menuOpen}
      >
        {/* Left Half: Pure White Minimalist Navigation Column */}
        <div className="w-full md:w-1/2 h-full bg-white flex flex-col justify-between items-center pt-5 pb-16 sm:py-10 md:py-12 px-6 sm:px-8 relative overflow-y-auto">
          {/* Thin Close X Button at Top */}
          <div className="w-full flex items-center justify-between md:justify-start md:pl-[34%]">
            <span className="md:hidden text-xs font-light uppercase tracking-[0.28em] text-[#5B6450]">
              OAK &amp; ASH
            </span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close navigation menu"
              className="p-2 text-[#6B735E] hover:text-[#1C211D] transition-colors duration-300 cursor-pointer"
            >
              <X size={24} strokeWidth={1} />
            </button>
          </div>

          {/* Centered Vertical Navigation Links */}
          <nav aria-label="Main menu" className="flex flex-col items-center space-y-2 sm:space-y-3.5 md:space-y-4 my-auto py-3">
            {MENU_ITEMS.map((item, idx) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onClick={() => setMenuOpen(false)}
                  className={`text-[13px] sm:text-[15px] md:text-[17px] font-light tracking-[0.26em] uppercase transition-all duration-300 py-0.5 ${
                    isActive
                      ? 'text-[#5B6450] font-normal'
                      : 'text-[#3A3E37] hover:text-[#6B735E] hover:tracking-[0.32em]'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Subtle Centered Contact Details at Bottom */}
          <div className="text-center space-y-1 text-[10px] sm:text-[11px] font-light tracking-[0.08em] text-[#7D8078]">
            <a
              href="tel:01672552140"
              className="block hover:text-[#1C211D] transition-colors tabular-nums"
            >
              01672 552 140
            </a>
            <a
              href="mailto:enquiries@oakandashgardens.co.uk"
              className="block hover:text-[#1C211D] transition-colors"
            >
              enquiries@oakandashgardens.co.uk
            </a>
          </div>
        </div>

        {/* Right Half: Full-Bleed Garden Photograph with Centered White Emblem */}
        <div className="hidden md:block md:w-1/2 h-full relative overflow-hidden bg-[#1C211D]">
          {MENU_ITEMS.map((item, idx) => (
            <img
              key={item.name}
              src={item.image}
              alt={item.name}
              loading="lazy"
              decoding="async"
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1100ms] ease-out ${
                idx === hoveredIdx ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <GardenEmblem className="w-14 h-14 lg:w-16 lg:h-16 text-white drop-shadow-md" />
          </div>
        </div>
      </div>
    </>
  );

  return typeof document !== 'undefined' ? createPortal(navContent, document.body) : navContent;
};

export default Navbar;