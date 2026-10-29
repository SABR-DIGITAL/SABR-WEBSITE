import React, { useState, useEffect } from 'react';
import { Page, PAGE_PATHS } from '../App';
// Fix react-router-dom missing exports
import * as RouterDOM from 'react-router-dom';
const { Link, useLocation } = RouterDOM as any;
import { Menu, X } from 'lucide-react';
import { motion as framerMotion, AnimatePresence } from 'framer-motion';

// Fix motion types by casting to any
const motion = framerMotion as any;

interface NavbarProps {
  navigateTo: (page: Page) => void;
  currentPage: Page;
  startAnimation?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, startAnimation = true }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isProjects = location.pathname === '/projects';
  const isHomeUnscrolled = currentPage === 'home' && !scrolled;

  const links: { name: string, id: Page }[] = [
    { name: 'Projects', id: 'work' },
    { name: 'Process', id: 'process' },
    { name: 'FAQ', id: 'faq' }
  ];

  const handleNav = (_id: Page) => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-[100] px-4 md:px-8 py-4 pointer-events-none transition-opacity duration-700 ${startAnimation ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className={`max-w-7xl mx-auto flex items-center justify-between pointer-events-auto transition-all duration-500 lg:px-8 lg:py-3.5 lg:rounded-full lg:border ${
          scrolled 
            ? 'lg:bg-white/95 lg:border-stone-200/80 lg:shadow-md' 
            : isHomeUnscrolled 
            ? 'bg-transparent border-transparent lg:bg-black/20 lg:border-white/15 lg:backdrop-blur-md' 
            : 'bg-transparent border-transparent lg:bg-white/70 lg:border-stone-200/60 lg:backdrop-blur-md'
        } ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'} lg:opacity-100 shadow-none`}>
          
          {/* BRAND LOGO WITH WILTSHIRE WEB DESIGN STUDIO */}
          <Link
            to="/"
            onClick={() => handleNav('home')}
            aria-label="SABR Digital home"
            className="hidden lg:flex flex-col text-left group focus:outline-none focus:ring-0 appearance-none"
          >
            <span className={`font-syne text-xl tracking-[0.05em] font-black flex items-center ${isHomeUnscrolled ? 'text-white' : 'text-slate-900'}`}>
              SABR<span className="text-shimmer-blue ml-1.5">DIGITAL</span>
            </span>
            <span className={`text-[7px] uppercase font-bold tracking-[0.35em] ${isHomeUnscrolled ? 'text-emerald-300' : 'text-emerald-700'}`}>
              Wiltshire Web Design Studio
            </span>
          </Link>

          {/* SLEEK NAVIGATION LINKS */}
          <nav aria-label="Primary" className="hidden lg:flex items-center gap-10">
            {links.map((item) => (
              <Link
                key={item.id}
                to={PAGE_PATHS[item.id]}
                onClick={() => handleNav(item.id)}
                className={`relative text-[11px] uppercase tracking-[0.3em] transition-colors font-semibold focus:outline-none ${
                  (currentPage === item.id && !isProjects) || (isProjects && item.id === 'work')
                    ? 'text-emerald-600' 
                    : isHomeUnscrolled 
                    ? 'text-stone-200 hover:text-white' 
                    : 'text-stone-600 hover:text-emerald-700'
                }`}
              >
                {item.name}
                {((currentPage === item.id && !isProjects) || (isProjects && item.id === 'work')) && (
                  <div className="absolute -bottom-1.5 left-0 w-full h-0.5 bg-emerald-600 rounded-full" />
                )}
              </Link>
            ))}

            <Link
              to={PAGE_PATHS.contact}
              onClick={() => handleNav('contact')}
              className={`px-7 py-2.5 rounded-full text-[11px] uppercase tracking-[0.2em] font-semibold transition-all focus:outline-none ${
                scrolled 
                  ? 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-sm' 
                  : 'bg-[#f5f2eb] text-stone-900 hover:bg-white shadow-md'
              } hover:scale-105 active:scale-95`}
            >
              Contact
            </Link>
          </nav>

          {/* MOBILE TOGGLE BUTTON */}
          <button 
            className="lg:hidden ml-auto p-3.5 bg-white/90 backdrop-blur-md rounded-full shadow-md text-slate-900 hover:text-emerald-600 transition-colors border border-stone-200/80 focus:outline-none"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {/* MOBILE MENU DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[200] bg-[#fcfaf7] flex flex-col p-8 sm:p-14 lg:hidden overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-16">
              <div className="flex flex-col">
                <span className="font-syne text-2xl font-black text-slate-900">SABR DIGITAL</span>
                <span className="text-[9px] uppercase font-bold tracking-[0.3em] text-emerald-700">Wiltshire Web Design Studio</span>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)} 
                className="w-12 h-12 rounded-full bg-white shadow-md border border-stone-200/60 flex items-center justify-center text-slate-900 hover:text-emerald-600 transition-colors"
                aria-label="Close navigation menu"
              >
                <X size={24} />
              </button>
            </div>
            
            <nav aria-label="Mobile" className="flex flex-col gap-8">
              {[{name: 'Home', id: 'home' as Page}, ...links, {name: 'Contact', id: 'contact' as Page}].map((link) => (
                <Link
                  key={link.id}
                  to={PAGE_PATHS[link.id]}
                  onClick={() => handleNav(link.id)}
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

export default Navbar;