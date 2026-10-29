import React, { useState } from 'react';
import * as RouterDOM from 'react-router-dom';
import { Phone, Menu, X, ArrowRight } from 'lucide-react';

const Link = (RouterDOM as any).Link || (RouterDOM as any).default?.Link;
const useLocation = (RouterDOM as any).useLocation || (RouterDOM as any).default?.useLocation;

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation ? useLocation() : { pathname: '' };

  const navLinks = [
    { name: 'Home', path: '/demo/landscaping' },
    { name: 'Services', path: '/demo/landscaping/services' },
    { name: 'About', path: '/demo/landscaping/about' },
    { name: 'Gallery', path: '/demo/landscaping/gallery' },
    { name: 'Contact', path: '/demo/landscaping/contact' },
  ];

  return (
    <header className="w-full relative z-[110] font-sans">
      {/* Top Utility Strip */}
      <div className="bg-[#162E20] text-stone-200 py-2.5 px-6 md:px-12 text-xs border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#E08A5B] font-bold">
              EST. 1988 · WILTSHIRE &amp; COTSWOLDS
            </span>
            <span className="text-white/20 hidden sm:inline" aria-hidden="true">/</span>
            <span className="text-stone-300 hidden sm:inline text-[11px]">Bespoke Patios, Stonework &amp; Garden Design</span>
          </div>
          <div className="flex items-center gap-6">
            <a 
              href="tel:01672552140" 
              className="flex items-center gap-2 text-[11px] font-semibold text-stone-200 hover:text-white transition-colors"
            >
              <Phone size={13} className="text-[#E08A5B]" />
              <span>01672 552 140</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-white/95 backdrop-blur-md py-4 px-6 md:px-12 border-b border-stone-200/80 sticky top-0 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand Wordmark */}
          <Link to="/demo/landscaping" className="flex flex-col group shrink-0 focus:outline-none">
            <span className="font-serif text-2xl md:text-3xl font-extrabold tracking-tight text-[#162E20] group-hover:text-[#C86A3D] transition-colors leading-none">
              OAK &amp; ASH
            </span>
            <span className="text-[9px] uppercase font-bold tracking-[0.35em] text-[#C86A3D] mt-1">
              ARCHITECTURAL LANDSCAPES
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-[12px] uppercase font-semibold tracking-[0.25em] transition-all py-1 relative ${
                    isActive ? 'text-[#162E20] font-bold' : 'text-stone-600 hover:text-[#C86A3D]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C86A3D] rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA Button & Mobile Trigger */}
          <div className="flex items-center gap-4">
            <Link
              to="/demo/landscaping/contact"
              className="hidden sm:inline-flex items-center gap-2 px-6 py-3 bg-[#C86A3D] hover:bg-[#162E20] text-white font-semibold text-xs uppercase tracking-wider rounded-lg transition-all duration-300 shadow-md hover:scale-105 active:scale-95"
            >
              <span>Get Free Quote</span>
              <ArrowRight size={14} />
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2.5 bg-stone-100 hover:bg-stone-200 text-[#162E20] rounded-lg border border-stone-200 transition-colors focus:outline-none"
              aria-label="Open mobile navigation menu"
            >
              <Menu size={22} />
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[200] bg-stone-900/40 backdrop-blur-sm lg:hidden flex justify-end">
          <div className="w-full max-w-sm bg-[#FBF9F5] h-full flex flex-col p-8 shadow-2xl overflow-y-auto">
            
            <div className="flex justify-between items-center pb-6 border-b border-stone-200">
              <div className="flex flex-col">
                <span className="font-serif text-xl font-black text-[#162E20]">OAK &amp; ASH</span>
                <span className="text-[8px] font-mono uppercase tracking-[0.25em] text-[#C86A3D]">Master Landscaping</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg bg-stone-200/80 text-stone-800 hover:text-black transition-colors"
                aria-label="Close navigation"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col gap-6 py-10">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-serif text-2xl font-bold transition-colors ${
                      isActive ? 'text-[#C86A3D]' : 'text-[#162E20] hover:text-[#C86A3D]'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <div className="mt-auto pt-8 border-t border-stone-200 space-y-4">
              <a
                href="tel:01672552140"
                className="flex items-center gap-3 p-3 bg-white rounded-lg border border-stone-200 text-[#162E20] font-semibold text-sm"
              >
                <Phone size={16} className="text-[#C86A3D]" />
                <span>01672 552 140</span>
              </a>

              <Link
                to="/demo/landscaping/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 bg-[#C86A3D] text-white font-semibold text-center text-xs uppercase tracking-wider rounded-lg block shadow-md"
              >
                Request Free Site Consultation
              </Link>
            </div>

          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;