
import React, { useState, useEffect } from 'react';
// Fix react-router-dom missing exports
import * as RouterDOM from 'react-router-dom';
const { Link, useLocation } = RouterDOM as any;
import { Leaf, Menu, X, CalendarDays } from 'lucide-react';
import { motion as framerMotion, AnimatePresence } from 'framer-motion';

// Fix motion types by casting to any
const motion = framerMotion as any;

const PhysioNavbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', path: '/demo/physio' },
    { name: 'Sessions', path: '/demo/physio/prices' },
    { name: 'Clinicians', path: '/demo/physio/team' },
    { name: 'Guidance', path: '/demo/physio/faq' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-500 px-6 py-4 md:py-6`}>
        <div className={`max-w-7xl mx-auto flex items-center justify-between rounded-2xl px-6 md:px-10 py-4 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-xl shadow-lg' : 'bg-transparent'}`}>
          
          <Link to="/demo/physio" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-sm transition-transform group-hover:rotate-12">
              <Leaf size={20} />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold text-emerald-950 tracking-tight leading-none">Bath Physio</span>
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-600/70 mt-1">Holistic Recovery</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`text-[13px] font-bold tracking-widest transition-colors ${location.pathname === link.path ? 'text-emerald-700' : 'text-emerald-950/60 hover:text-emerald-700'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link to="/demo/physio/contact" className="hidden sm:flex items-center gap-2 px-6 py-3 bg-emerald-700 text-white rounded-full text-[12px] font-bold hover:bg-emerald-800 transition-all shadow-md active:scale-95">
              <CalendarDays size={14} />
              SYNC APPOINTMENT
            </Link>
            <button 
              className="lg:hidden text-emerald-950"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[300] bg-emerald-50 flex flex-col p-8 lg:hidden"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="font-serif text-2xl font-bold text-emerald-950">Bath Physio</span>
              <button onClick={() => setMobileMenuOpen(false)} className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-emerald-950 shadow-sm"><X size={28} /></button>
            </div>
            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif text-5xl font-bold text-emerald-950 hover:text-emerald-600 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="mt-auto">
              <Link 
                to="/demo/physio/contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full py-6 bg-emerald-700 text-white text-center rounded-2xl font-bold text-lg shadow-xl"
              >
                Sync Session Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PhysioNavbar;
