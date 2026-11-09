import React, { useState, useEffect } from 'react';
import * as RouterDOM from 'react-router-dom';
const { Link, useLocation } = RouterDOM as any;
import { Menu, X, Phone } from 'lucide-react';
import { motion as framerMotion, AnimatePresence } from 'framer-motion';
import { OAK_ASH_BRAND } from '../landscaping/landscapingData';

const motion = framerMotion as any;

const NAV_LINKS = [
  { name: 'Home', path: '/demo/landscaping-traditional' },
  { name: 'Services', path: '/demo/landscaping-traditional/services' },
  { name: 'Gardens', path: '/demo/landscaping-traditional/gallery' },
  { name: 'About Us', path: '/demo/landscaping-traditional/about' },
  { name: 'Contact', path: '/demo/landscaping-traditional/contact' },
];

export const TraditionalNavbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-emerald-900/15 py-3.5 shadow-[0_8px_30px_rgb(20,83,45,0.08)]'
            : 'bg-white/95 backdrop-blur-sm border-b border-emerald-900/10 py-4.5'
        }`}
      >
        <div className="max-w-[1380px] mx-auto px-6 md:px-10 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <Link
            to="/demo/landscaping-traditional"
            className="text-xl md:text-2xl font-extrabold tracking-tight text-[#14532D] hover:text-[#15803D] transition-colors whitespace-nowrap shrink-0"
          >
            {OAK_ASH_BRAND.name}
          </Link>

          {/* Zone 2: 5 clean single-line text navigation links */}
          <nav aria-label="Primary" className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative py-1 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
                    active ? 'text-[#15803D]' : 'text-slate-700 hover:text-[#14532D]'
                  }`}
                >
                  {link.name}
                  {active && (
                    <motion.span
                      layoutId="trad-landscaping-nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#15803D] rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/demo/landscaping-traditional/contact"
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 bg-[#15803D] hover:bg-[#14532D] text-white text-sm font-semibold rounded-lg shadow-sm transition-colors duration-200 whitespace-nowrap shrink-0"
            >
              Get a Free Quote
            </Link>
            <button
              type="button"
              aria-label="Open menu"
              className="lg:hidden w-11 h-11 flex items-center justify-center rounded-lg text-[#14532D] border border-emerald-900/15 bg-white hover:bg-emerald-50 transition-colors cursor-pointer"
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
            className="fixed inset-0 z-[300] bg-white flex flex-col px-5 sm:px-6 pt-5 pb-16 lg:hidden overflow-y-auto"
          >
            <div className="flex justify-between items-center pb-5 border-b border-slate-200">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-[#14532D]">
                {OAK_ASH_BRAND.name}
              </span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 text-[#14532D] cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <nav aria-label="Mobile" className="flex flex-col divide-y divide-slate-100 py-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg sm:text-xl font-semibold text-[#14532D] py-3.5 hover:text-[#15803D] transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="mt-auto pt-5 border-t border-slate-200 space-y-2.5">
              <p className="text-xs font-medium text-slate-500">
                Wiltshire · Surrey · Cotswolds · London
              </p>
              <a
                href={`tel:${OAK_ASH_BRAND.phoneHref}`}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-lg border border-emerald-800/25 text-[#14532D] text-sm font-semibold tabular-nums"
              >
                <Phone size={15} />
                Call Us: {OAK_ASH_BRAND.phoneDisplay}
              </a>
              <Link
                to="/demo/landscaping-traditional/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center w-full py-3 rounded-lg bg-[#15803D] text-white text-sm font-semibold shadow-sm"
              >
                Get a Free Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TraditionalNavbar;
