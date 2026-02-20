
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Coffee, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CafeNavbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/demo/cafe' },
    { name: 'Menu', path: '/demo/cafe/menu' },
    { name: 'Locations', path: '/demo/cafe/locations' },
    { name: 'About', path: '/demo/cafe/about' },
    { name: 'Contact', path: '/demo/cafe/contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[150] transition-all duration-700 px-6 ${scrolled ? 'py-4' : 'py-8'}`}>
        <div className={`max-w-6xl mx-auto flex items-center justify-between rounded-full px-8 py-4 border transition-all duration-700 ${scrolled ? 'bg-white/80 backdrop-blur-2xl border-white shadow-[0_20px_50px_rgba(164,113,94,0.1)]' : 'bg-white/10 backdrop-blur-md border-white/20 shadow-none'}`}>
          <Link to="/demo/cafe" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[#A4715E] rounded-full flex items-center justify-center text-[#FFF9F5] shadow-sm group-hover:rotate-[15deg] transition-transform duration-500">
              <Coffee size={20} />
            </div>
            <span className="font-serif text-2xl font-bold text-[#4A403A] tracking-tighter group-hover:text-[#A4715E] transition-colors">The Hearth</span>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className="relative group"
              >
                <span className={`text-[10px] uppercase font-black tracking-[0.3em] transition-colors ${location.pathname === link.path ? 'text-[#A4715E]' : 'text-[#4A403A]/60 hover:text-[#A4715E]'}`}>
                  {link.name}
                </span>
                <motion.div 
                  className="absolute -bottom-1 left-0 right-0 h-[1px] bg-[#A4715E]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: location.pathname === link.path ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <Link to="/demo/cafe/book" className="hidden sm:block px-8 py-3 bg-[#4A403A] text-[#FFF9F5] rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#A4715E] transition-all shadow-lg active:scale-95">
              Reserve
            </Link>
            <button 
              className="md:hidden text-[#4A403A] hover:text-[#A4715E] transition-colors"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[200] bg-[#FFF9F5] flex flex-col p-10 md:hidden"
          >
            <div className="flex justify-between items-center mb-20">
              <span className="font-serif text-2xl font-bold text-[#4A403A]">The Hearth</span>
              <button onClick={() => setMobileMenuOpen(false)} className="text-[#4A403A]"><X size={32} /></button>
            </div>
            <div className="flex flex-col gap-12">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif text-5xl font-black text-[#4A403A] tracking-tighter"
                >
                  {link.name}.
                </Link>
              ))}
            </div>
            <div className="mt-auto">
              <Link 
                to="/demo/cafe/book" 
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full py-6 bg-[#4A403A] text-white text-center rounded-2xl font-black uppercase tracking-widest"
              >
                Book a Table
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CafeNavbar;
