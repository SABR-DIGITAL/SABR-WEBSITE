import React, { useState } from 'react';
import * as RouterDOM from 'react-router-dom';
const { Link, useLocation } = RouterDOM as any;
import { Menu, X } from 'lucide-react';
import SiteSwitcher from '../../components/SiteSwitcher';
import { motion as framerMotion, AnimatePresence } from 'framer-motion';

const motion = framerMotion as any;

export const AIO_PAGE_PATHS: Record<string, string> = {
  home: '/',
  'what-is-aio': '/what-is-aio',
  services: '/services',
  audit: '/free-ai-audit',
  faqs: '/faqs',
  contact: '/contact'
};

const links = [
  { name: 'What is AIO', to: AIO_PAGE_PATHS['what-is-aio'] },
  { name: 'Services', to: AIO_PAGE_PATHS.services },
  { name: 'FAQs', to: AIO_PAGE_PATHS.faqs }
];

interface AIONavbarProps {
  startAnimation?: boolean;
}

const AIONavbar: React.FC<AIONavbarProps> = ({ startAnimation = true }) => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] px-4 md:px-8 py-4 pointer-events-none transition-opacity duration-700 ${
          startAnimation ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div
          className={`max-w-7xl mx-auto flex items-center justify-between pointer-events-auto transition-all duration-500 bg-transparent border-transparent shadow-none lg:rounded-full lg:border lg:border-stone-200/70 lg:bg-white/90 lg:px-7 lg:py-3.5 lg:shadow-sm lg:backdrop-blur-md ${
            open ? 'opacity-0' : 'opacity-100'
          } lg:opacity-100`}
        >
          {/* BRAND LOGO WITH AI OPTIMISATION (DESKTOP ONLY, MATCHING WEB DESIGN NAVBAR) */}
          <div className="relative hidden lg:flex flex-col items-start">
            <div className="flex items-center gap-1">
              <Link
                to="/"
                onClick={() => setOpen(false)}
                aria-label="SABR Digital AI Optimisation home"
                className="flex items-center text-left focus:outline-none"
              >
                <span className="font-syne text-xl font-black tracking-[0.04em] text-slate-950 whitespace-nowrap">
                  SABR <span className="text-emerald-600">DIGITAL</span>
                </span>
              </Link>
              <SiteSwitcher current="ai-optimisation" />
            </div>
            <Link
              to="/"
              onClick={() => setOpen(false)}
              tabIndex={-1}
              className="text-[7px] font-bold uppercase tracking-[0.35em] text-emerald-700 -mt-0.5"
            >
              AI Optimisation
            </Link>
          </div>

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-[11px] font-semibold uppercase tracking-[0.25em] transition-colors focus:outline-none ${
                  pathname === link.to ? 'text-emerald-600' : 'text-slate-600 hover:text-emerald-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to={AIO_PAGE_PATHS.audit}
              className="rounded-full bg-emerald-600 px-6 py-2.5 text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-sm transition-all hover:scale-105 hover:bg-emerald-500 active:scale-95 focus:outline-none"
            >
              Free AI Audit
            </Link>
          </nav>

          {/* MOBILE TOGGLE BUTTON (FLOATING HAMBURGER BUTTON MATCHING WEB DESIGN SECTION) */}
          <button
            className="lg:hidden ml-auto p-3.5 bg-white/90 backdrop-blur-md rounded-full shadow-md text-slate-900 hover:text-emerald-600 transition-colors border border-stone-200/80 focus:outline-none"
            onClick={() => setOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {/* MOBILE MENU DRAWER */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[200] bg-[#fcfaf7] flex flex-col p-8 sm:p-14 lg:hidden overflow-y-auto"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex justify-between items-center gap-4 mb-16">
              <div className="relative flex flex-col items-start">
                <SiteSwitcher current="ai-optimisation">
                  <span className="font-syne text-xl sm:text-2xl font-black text-slate-900 whitespace-nowrap leading-none">
                    SABR <span className="text-emerald-600">DIGITAL</span>
                  </span>
                </SiteSwitcher>
                <span className="text-[8px] sm:text-[9px] uppercase font-bold tracking-[0.28em] text-emerald-700 mt-1">
                  AI Optimisation
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="shrink-0 w-12 h-12 rounded-full bg-white shadow-md border border-stone-200/60 flex items-center justify-center text-slate-900 hover:text-emerald-600 transition-colors focus:outline-none"
                aria-label="Close navigation menu"
              >
                <X size={24} />
              </button>
            </div>

            <nav aria-label="Mobile" className="flex flex-col gap-8">
              {[
                { name: 'Home', to: AIO_PAGE_PATHS.home },
                ...links,
                { name: 'Free AI Audit', to: AIO_PAGE_PATHS.audit },
                { name: 'Contact', to: AIO_PAGE_PATHS.contact }
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="text-left font-serif text-3xl sm:text-4xl font-normal text-slate-900 tracking-tight hover:text-emerald-600 transition-colors leading-none"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="mt-auto pt-10 border-t border-stone-200 flex items-center justify-between">
              <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">© 2025 SABR DIGITAL · WILTSHIRE</p>
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-emerald-600 rounded-full opacity-30" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIONavbar;
