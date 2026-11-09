import React, { useState, useEffect } from 'react';
import * as RouterDOM from 'react-router-dom';
const { Link, useLocation } = RouterDOM as any;
import { Coffee, Menu, X, Calendar } from 'lucide-react';

const CafeNavbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.search]);

  const navLinks = [
    { name: 'Home', path: '/demo/cafe' },
    { name: 'Menu', path: '/demo/cafe/menu' },
    { name: 'Locations', path: '/demo/cafe/locations' },
    { name: 'About', path: '/demo/cafe/about' },
    { name: 'Contact', path: '/demo/cafe/contact' },
  ];

  return (
    <>
      <nav
        aria-label="The Hearth Navigation"
        className={`fixed top-0 left-0 right-0 z-[150] transition-all duration-500 px-4 sm:px-6 pointer-events-none ${
          scrolled ? 'py-3.5' : 'py-5 md:py-7'
        }`}
      >
        <div
          className={`pointer-events-auto max-w-6xl mx-auto flex items-center justify-between rounded-full px-5 sm:px-8 py-3.5 transition-all duration-500 bg-[#FFF9F5]/95 backdrop-blur-2xl border border-[#A4715E]/25 ${
            scrolled
              ? 'shadow-[0_20px_50px_rgba(74,64,58,0.18)]'
              : 'shadow-[0_16px_40px_rgba(0,0,0,0.22)]'
          }`}
        >
          <Link to="/demo/cafe" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 bg-[#A4715E] rounded-full flex items-center justify-center text-[#FFF9F5] shadow-sm group-hover:rotate-[15deg] transition-transform duration-500">
              <Coffee size={20} />
            </div>
            <span className="font-serif text-xl sm:text-2xl font-bold text-[#4A403A] tracking-tighter group-hover:text-[#A4715E] transition-colors">
              The Hearth
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-4 py-2 rounded-full text-[11px] uppercase font-black tracking-[0.26em] transition-all duration-300 ${
                    isActive
                      ? 'bg-[#A4715E] text-white shadow-sm'
                      : 'text-[#4A403A] hover:text-[#A4715E] hover:bg-[#FDE2E4]/60'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              to="/demo/cafe/book"
              className="hidden sm:inline-flex items-center gap-2 px-6 sm:px-7 py-3 bg-[#4A403A] text-[#FFF9F5] rounded-full text-[10px] font-black uppercase tracking-[0.25em] hover:bg-[#A4715E] transition-all shadow-md active:scale-95"
            >
              <Calendar size={13} />
              <span>Reserve</span>
            </Link>
            <button
              type="button"
              aria-label="Open navigation menu"
              className="lg:hidden text-[#4A403A] hover:text-[#A4715E] transition-colors p-2.5 bg-[#FDE2E4]/70 hover:bg-[#FDE2E4] rounded-full border border-[#A4715E]/20"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[300] bg-[#FFF9F5] flex flex-col p-6 sm:p-10 pb-20 sm:pb-12 lg:hidden overflow-y-auto animate-fadeIn">
          <div className="flex justify-between items-center mb-8 sm:mb-14">
            <Link
              to="/demo/cafe"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-[#A4715E] rounded-full flex items-center justify-center text-[#FFF9F5]">
                <Coffee size={20} />
              </div>
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#4A403A]">The Hearth</span>
            </Link>
            <button
              type="button"
              aria-label="Close navigation menu"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-full bg-[#FDE2E4] text-[#4A403A] hover:bg-[#A4715E] hover:text-white transition-colors"
            >
              <X size={22} />
            </button>
          </div>

          <div className="flex flex-col gap-4 sm:gap-7 my-auto">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-serif text-3xl sm:text-5xl font-black tracking-tighter transition-colors ${
                    isActive ? 'text-[#A4715E] italic' : 'text-[#4A403A] hover:text-[#A4715E]'
                  }`}
                >
                  {link.name}.
                </Link>
              );
            })}
          </div>

          <div className="mt-auto pt-6 sm:pt-8 border-t border-[#A4715E]/15 flex flex-col gap-4">
            <Link
              to="/demo/cafe/book"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full py-4 sm:py-5 bg-[#4A403A] hover:bg-[#A4715E] text-white text-center rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-colors shadow-lg"
            >
              Book a Table
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default CafeNavbar;
