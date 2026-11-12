import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
// Fix react-router-dom missing exports
import * as RouterDOM from 'react-router-dom';
const { Link, useLocation, useNavigate } = RouterDOM as any;
import { Menu, X, Phone } from 'lucide-react';
import { motion as framerMotion, AnimatePresence } from 'framer-motion';
import { clinic, navLinks } from './physioData';

// Fix motion types by casting to any
const motion = framerMotion as any;

export const triggerPhysioModal = (detail?: { clinicId?: string; service?: string }) => {
  window.dispatchEvent(new CustomEvent('pulteney-navigate-book', { detail: detail || {} }));
};

const PhysioNavbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 1024) return;
      const next = window.scrollY > 20;
      setScrolled((prev) => (prev !== next ? next : prev));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleNavigateBook = (e: Event) => {
      const customEvent = e as CustomEvent<{ clinicId?: string; service?: string }>;
      navigate('/demo/physio/contact', { state: customEvent.detail || {} });
    };
    window.addEventListener('pulteney-navigate-book', handleNavigateBook);
    return () => window.removeEventListener('pulteney-navigate-book', handleNavigateBook);
  }, [navigate]);

  const navContent = (
    <>
      <header
        style={{ transform: 'translate3d(0, 0, 0)', WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' }}
        className={`fixed top-0 left-0 right-0 z-[200] py-3.5 sm:py-4 bg-white lg:bg-white/95 lg:backdrop-blur-md border-b border-slate-200/80 lg:transition-shadow lg:duration-300 ${
          scrolled
            ? 'shadow-[0_8px_30px_rgb(15,41,66,0.05)]'
            : 'shadow-none'
        }`}
      >
        <div className="max-w-[1380px] mx-auto px-5 sm:px-6 md:px-10 flex items-center justify-between gap-4 sm:gap-8">
          {/* Zone 1: Single text element wordmark */}
          <Link
            to="/demo/physio"
            className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-[#0F2942] hover:text-[#0D9488] transition-colors whitespace-nowrap shrink-0"
          >
            {clinic.name}
          </Link>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav aria-label="Primary" className="hidden lg:flex items-center gap-9">
            <Link
              to="/demo/physio"
              className={`relative py-1 text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                location.pathname === '/demo/physio'
                  ? 'text-[#0D9488]'
                  : 'text-slate-600 hover:text-[#0F2942]'
              }`}
            >
              Home
              {location.pathname === '/demo/physio' && (
                <motion.span
                  layoutId="physio-nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0D9488] rounded-full"
                />
              )}
            </Link>
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative py-1 text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                    active ? 'text-[#0D9488]' : 'text-slate-600 hover:text-[#0F2942]'
                  }`}
                >
                  {link.name}
                  {active && (
                    <motion.span
                      layoutId="physio-nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0D9488] rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action — navigates directly to Locations & Book */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/demo/physio/contact"
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 bg-[#0D9488] hover:bg-[#0F2942] text-white text-sm font-semibold rounded-lg shadow-sm transition-colors duration-200 whitespace-nowrap shrink-0"
            >
              Request Appointment
            </Link>
            <button
              type="button"
              aria-label="Open menu"
              className="lg:hidden w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-lg text-[#0F2942] border border-slate-200 bg-white hover:bg-slate-50 transition-colors"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[300] bg-white flex flex-col px-6 pt-5 pb-20 sm:pb-8 lg:hidden overflow-y-auto"
          >
            <div className="flex justify-between items-center pb-5 border-b border-slate-200">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-[#0F2942]">{clinic.name}</span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 text-[#0F2942]"
              >
                <X size={20} />
              </button>
            </div>

            <nav aria-label="Mobile" className="flex flex-col divide-y divide-slate-100 py-3">
              <Link
                to="/demo/physio"
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg sm:text-xl font-semibold text-[#0F2942] py-3.5 hover:text-[#0D9488] transition-colors"
              >
                Home
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg sm:text-xl font-semibold text-[#0F2942] py-3.5 hover:text-[#0D9488] transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="mt-auto pt-5 border-t border-slate-200 space-y-3">
              <p className="text-xs font-medium text-slate-500">
                3 UK Clinics: Bath · Bristol · Cheltenham
              </p>
              <a
                href={`tel:${clinic.phoneHref}`}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-lg border border-slate-300 text-[#0F2942] text-sm font-semibold"
              >
                <Phone size={15} />
                Call Central Reception: {clinic.phoneDisplay}
              </a>
              <Link
                to="/demo/physio/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center w-full py-3.5 rounded-lg bg-[#0D9488] text-white text-sm font-semibold shadow-sm"
              >
                Request Appointment
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  return typeof document !== 'undefined' ? createPortal(navContent, document.body) : navContent;
};

export default PhysioNavbar;
