import React, { useState, useEffect } from 'react';
// Fix react-router-dom missing exports
import * as RouterDOM from 'react-router-dom';
const { Link, useLocation } = RouterDOM as any;
import { Menu, X, Phone } from 'lucide-react';
import { motion as framerMotion, AnimatePresence } from 'framer-motion';
import { academy, navLinks, palette } from './equestrianData';
import { HorseMark, Bloom } from './EquestrianUI';

// Fix motion types by casting to any
const motion = framerMotion as any;

const EquestrianNav: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // The menu must not stay open behind a page change.
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-500 ${
          scrolled
            ? 'bg-[#FFFAF3]/95 backdrop-blur-md border-b border-[#EADFD1] py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-[1500px] mx-auto px-6 md:px-10 flex items-center justify-between gap-8">
          <Link to="/demo/equestrian" className="flex items-center gap-3 group shrink-0">
            <HorseMark size={42} color={palette.ink} className="transition-transform duration-500 group-hover:-translate-y-0.5" />
            <span className="flex flex-col leading-none">
              <span className="font-serif text-[1.25rem] md:text-[1.5rem] text-[#1E2A22] tracking-[-0.01em]">
                {academy.name}
              </span>
              <span className="mt-1 text-[7.5px] md:text-[8.5px] uppercase tracking-[0.4em] text-[#6B7A6F]">
                Riding Academy
              </span>
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:flex items-center gap-6 xl:gap-9">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative text-[10px] uppercase tracking-[0.26em] whitespace-nowrap transition-colors duration-300 ${
                    active ? 'text-[#1E2A22]' : 'text-[#6B7A6F] hover:text-[#1E2A22]'
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-2 left-0 h-px bg-[#E4577A] transition-all duration-300 ${
                      active ? 'w-full' : 'w-0'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${academy.phoneHref}`}
              className="hidden xl:flex items-center gap-2 text-[11px] tracking-[0.1em] text-[#6B7A6F] hover:text-[#1E2A22] transition-colors"
            >
              <Phone size={13} />
              {academy.phoneDisplay}
            </a>
            <Link
              to="/demo/equestrian/book"
              className="hidden sm:inline-flex items-center gap-2 px-6 py-3 bg-[#1E2A22] text-[#FFFAF3] text-[9px] uppercase tracking-[0.3em] rounded-full hover:bg-[#E4577A] transition-colors duration-300"
            >
              Book a lesson
            </Link>
            <button
              aria-label="Open menu"
              className="lg:hidden w-11 h-11 flex items-center justify-center rounded-full text-[#1E2A22] border border-[#EADFD1] bg-[#FFFAF3]"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={19} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[300] bg-[#FFFAF3] flex flex-col px-7 py-6 lg:hidden overflow-y-auto"
          >
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-3">
                <HorseMark size={40} color={palette.ink} />
                <span className="flex flex-col leading-none">
                  <span className="font-serif text-2xl text-[#1E2A22]">{academy.name}</span>
                  <span className="mt-1 text-[8px] uppercase tracking-[0.4em] text-[#6B7A6F]">
                    Riding Academy
                  </span>
                </span>
              </div>
              <button
                aria-label="Close menu"
                onClick={() => setMobileMenuOpen(false)}
                className="w-11 h-11 flex items-center justify-center rounded-full border border-[#EADFD1] text-[#1E2A22]"
              >
                <X size={19} />
              </button>
            </div>

            <nav aria-label="Mobile" className="flex flex-col divide-y divide-[#EADFD1] border-y border-[#EADFD1]">
              <Link to="/demo/equestrian" className="font-serif text-[1.75rem] text-[#1E2A22] py-4">
                Home
              </Link>
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} className="font-serif text-[1.75rem] text-[#1E2A22] py-4">
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="mt-auto pt-8 space-y-3">
              <a
                href={`tel:${academy.phoneHref}`}
                className="flex items-center justify-center gap-3 py-4 rounded-full border border-[#1E2A22] text-[#1E2A22] text-[10px] uppercase tracking-[0.3em]"
              >
                <Phone size={14} /> {academy.phoneDisplay}
              </a>
              <Link
                to="/demo/equestrian/book"
                className="flex items-center justify-center gap-3 py-4 rounded-full bg-[#1E2A22] text-[#FFFAF3] text-[10px] uppercase tracking-[0.3em]"
              >
                <Bloom size={14} /> Book a lesson
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EquestrianNav;
