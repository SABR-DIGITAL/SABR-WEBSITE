import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import * as RouterDOM from 'react-router-dom';
const { Link, useLocation } = RouterDOM as any;
import { ArrowUpRight, Menu, Phone, X } from 'lucide-react';
import { academy, navLinks, palette } from './equestrianData';
import { HorseMark } from './EquestrianUI';

interface EquestrianNavProps {
  transparentOnTop?: boolean;
}

const EquestrianNav: React.FC<EquestrianNavProps> = ({ transparentOnTop = false }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
  );
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    const onScroll = () => {
      if (window.innerWidth < 1024) return;
      const next = window.scrollY > 24;
      setScrolled((prev) => (prev !== next ? next : prev));
    };
    onResize();
    onScroll();
    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isLightOnHero = isDesktop && transparentOnTop && !scrolled && !open;

  const navContent = (
    <>
      <header
        style={{ transform: 'translate3d(0,0,0)', WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' }}
        className={`fixed top-0 left-0 right-0 z-[150] h-16 sm:h-20 flex items-center lg:transition-colors lg:duration-200 ${
          isLightOnHero
            ? 'bg-gradient-to-b from-[#1E2822]/60 via-[#1E2822]/20 to-transparent border-b border-transparent'
            : 'bg-[#FAF6EE] lg:bg-[#FAF6EE]/95 lg:backdrop-blur-md border-b border-[#2D5A43]/15 shadow-[0_8px_30px_-20px_rgba(30,40,34,0.18)]'
        }`}
      >
        <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between gap-4 sm:gap-6">
          <Link to="/demo/equestrian" className="group inline-flex items-center gap-3 sm:gap-3.5 min-w-0">
            <span
              className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shrink-0 ${
                isLightOnHero
                  ? 'bg-white/15 backdrop-blur-sm'
                  : 'bg-[#E8F0EB]'
              }`}
            >
              <HorseMark
                size={26}
                color={isLightOnHero ? '#FAF6EE' : palette.green}
                className="transition-transform duration-500 group-hover:scale-105"
              />
            </span>
            <div className="min-w-0">
              <span
                className={`block font-serif text-lg sm:text-xl md:text-2xl tracking-[-0.01em] leading-none truncate ${
                  isLightOnHero ? 'text-[#FAF6EE]' : 'text-[#1E2822]'
                }`}
              >
                {academy.name}
              </span>
              <span
                className={`block text-[8px] sm:text-[9px] uppercase tracking-[0.26em] sm:tracking-[0.32em] mt-1 truncate ${
                  isLightOnHero ? 'text-white/75' : 'text-[#2D5A43]'
                }`}
              >
                Pewsey Vale &middot; Wiltshire
              </span>
            </div>
          </Link>

          <nav aria-label="Main" className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-full text-[11px] uppercase tracking-[0.26em] transition-all duration-300 ${
                    isLightOnHero
                      ? active
                        ? 'bg-white/20 text-white font-medium'
                        : 'text-white/85 hover:text-white hover:bg-white/10'
                      : active
                      ? 'bg-[#2D5A43] text-[#FAF6EE] font-medium'
                      : 'text-[#5F665E] hover:text-[#2D5A43] hover:bg-[#E8F0EB]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-5">
            <a
              href={`tel:${academy.phoneHref}`}
              className={`inline-flex items-center gap-2 text-[12px] tracking-[0.14em] font-medium ${
                isLightOnHero
                  ? 'text-white/90 hover:text-white'
                  : 'text-[#2D5A43] hover:text-[#1E2822]'
              }`}
            >
              <Phone size={14} />
              <span>{academy.phoneDisplay}</span>
            </a>

            <Link
              to="/demo/equestrian/book"
              className={`group inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-[10px] uppercase tracking-[0.28em] font-medium ${
                isLightOnHero
                  ? 'bg-[#2D5A43] text-[#FAF6EE] hover:bg-[#244936] shadow-lg'
                  : 'bg-[#2D5A43] text-[#FAF6EE] hover:bg-[#224634]'
              }`}
            >
              <span>Book a Lesson</span>
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className={`lg:hidden w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
              isLightOnHero
                ? 'bg-white/15 text-white'
                : 'bg-[#E8F0EB] text-[#2D5A43]'
            }`}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[140] bg-[#FAF6EE] pt-20 px-5 pb-20 sm:pb-10 flex flex-col justify-between lg:hidden overflow-y-auto">
          <nav aria-label="Mobile" className="space-y-1">
            {[
              { name: 'Home', path: '/demo/equestrian' },
              ...navLinks
            ].map((link, idx) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl font-serif text-lg sm:text-2xl transition-colors ${
                    active ? 'bg-[#2D5A43] text-[#FAF6EE]' : 'text-[#1E2822] hover:bg-[#E8F0EB]'
                  }`}
                >
                  <span>{link.name}</span>
                  <span
                    className={`text-[10px] font-sans uppercase tracking-[0.28em] ${
                      active ? 'text-white/75' : 'text-[#2D5A43]'
                    }`}
                  >
                    0{idx + 1}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="pt-5 space-y-3.5">
            <div className="p-4 rounded-2xl bg-[#E8F0EB]">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#2D5A43] mb-1">Ring the Tack Room</p>
              <a href={`tel:${academy.phoneHref}`} className="font-serif text-lg sm:text-2xl text-[#1E2822]">
                {academy.phoneDisplay}
              </a>
            </div>
            <Link
              to="/demo/equestrian/book"
              onClick={() => setOpen(false)}
              className="w-full inline-flex items-center justify-center gap-3 py-3.5 sm:py-4 rounded-full bg-[#2D5A43] text-[#FAF6EE] text-[10px] uppercase tracking-[0.3em]"
            >
              <span>Book a Lesson</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      )}
    </>
  );

  return typeof document !== 'undefined' ? createPortal(navContent, document.body) : navContent;
};

export default EquestrianNav;
