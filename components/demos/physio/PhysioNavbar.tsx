import React, { useState, useEffect } from 'react';
// Fix react-router-dom missing exports
import * as RouterDOM from 'react-router-dom';
const { Link, useLocation } = RouterDOM as any;
import { Menu, X, Phone } from 'lucide-react';
import { motion as framerMotion, AnimatePresence } from 'framer-motion';
import { clinic, navLinks } from './physioData';

// Fix motion types by casting to any
const motion = framerMotion as any;

const PhysioNavbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-500 ${
          scrolled ? 'bg-[#FBFAF7]/95 backdrop-blur-md border-b border-[#E2DDD3] py-4' : 'bg-transparent py-7'
        }`}
      >
        <div className="max-w-[1500px] mx-auto px-6 md:px-10 flex items-center justify-between gap-8">

          <Link to="/demo/physio" className="flex flex-col leading-none group">
            <span className="font-serif text-[1.35rem] md:text-[1.6rem] text-[#1D1C19] tracking-tight">
              {clinic.name}
            </span>
            <span className="mt-1.5 text-[8px] md:text-[9px] uppercase tracking-[0.42em] text-[#4A5D4E]">
              Bath &middot; Est. {clinic.established}
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:flex items-center gap-11">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative text-[10px] uppercase tracking-[0.32em] transition-colors ${
                    active ? 'text-[#1D1C19]' : 'text-[#6E6A62] hover:text-[#1D1C19]'
                  }`}
                >
                  {link.name}
                  {active && <span className="absolute -bottom-2 left-0 w-full h-px bg-[#4A5D4E]" />}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${clinic.phoneHref}`}
              className="hidden md:flex items-center gap-2 text-[11px] tracking-[0.14em] text-[#6E6A62] hover:text-[#1D1C19] transition-colors"
            >
              <Phone size={13} />
              {clinic.phoneDisplay}
            </a>
            <Link
              to="/demo/physio/contact"
              className="hidden sm:inline-flex items-center px-7 py-3.5 bg-[#1D1C19] text-[#F3F0EA] text-[9px] uppercase tracking-[0.32em] hover:bg-[#4A5D4E] transition-colors duration-300"
            >
              Book an assessment
            </Link>
            <button
              aria-label="Open menu"
              className="lg:hidden w-11 h-11 flex items-center justify-center text-[#1D1C19] border border-[#E2DDD3] bg-[#FBFAF7]"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[300] bg-[#F3F0EA] flex flex-col px-7 py-8 lg:hidden"
          >
            <div className="flex justify-between items-start mb-16">
              <div className="flex flex-col leading-none">
                <span className="font-serif text-2xl text-[#1D1C19]">{clinic.name}</span>
                <span className="mt-2 text-[9px] uppercase tracking-[0.42em] text-[#4A5D4E]">Bath</span>
              </div>
              <button
                aria-label="Close menu"
                onClick={() => setMobileMenuOpen(false)}
                className="w-11 h-11 flex items-center justify-center border border-[#E2DDD3] text-[#1D1C19]"
              >
                <X size={20} />
              </button>
            </div>

            <nav aria-label="Mobile" className="flex flex-col divide-y divide-[#E2DDD3] border-y border-[#E2DDD3]">
              <Link
                to="/demo/physio"
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-3xl text-[#1D1C19] py-6"
              >
                Home
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif text-3xl text-[#1D1C19] py-6"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="mt-auto pt-10 space-y-4">
              <a
                href={`tel:${clinic.phoneHref}`}
                className="block text-center py-5 border border-[#1D1C19] text-[#1D1C19] text-[10px] uppercase tracking-[0.32em]"
              >
                Call {clinic.phoneDisplay}
              </a>
              <Link
                to="/demo/physio/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center py-5 bg-[#1D1C19] text-[#F3F0EA] text-[10px] uppercase tracking-[0.32em]"
              >
                Book an assessment
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PhysioNavbar;
