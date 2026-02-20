
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Scissors, Menu, X, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BarberNavbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '51.5074° N', path: '/demo/barber', label: 'HUB' },
    { name: '0.1278° W', path: '/demo/barber/cuts', label: 'ARCHIVE' },
    { name: '40.7128° N', path: '/demo/barber/locations', label: 'SITES' },
    { name: '74.0060° W', path: '/demo/barber/contact', label: 'SIGNAL' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[150] transition-all duration-1000 px-6 ${scrolled ? 'py-4' : 'py-10'}`}>
        <div className={`max-w-7xl mx-auto flex items-center justify-between rounded-none px-8 py-4 border-b transition-all duration-1000 ${scrolled ? 'bg-[#050505]/90 backdrop-blur-3xl border-[#7F00FF]/30 shadow-[0_10px_40px_rgba(127,0,255,0.15)]' : 'bg-transparent border-white/5 shadow-none'}`}>
          <Link to="/demo/barber" className="flex items-center gap-6 group">
            <div className="relative">
              <div className="w-10 h-10 border border-[#7F00FF]/50 flex items-center justify-center group-hover:rotate-90 transition-transform duration-700">
                <div className="w-2 h-2 bg-[#7F00FF] animate-pulse"></div>
              </div>
              <div className="absolute inset-0 bg-[#7F00FF]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <span className="font-syne text-2xl font-black text-[#E0E0E0] tracking-[0.3em] uppercase">VERTEX</span>
          </Link>

          <div className="hidden lg:flex items-center gap-16">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className="relative group py-2"
              >
                <div className="flex flex-col items-start overflow-hidden h-5">
                   <span className={`text-[10px] font-black tracking-[0.2em] transition-all duration-500 transform group-hover:-translate-y-full ${location.pathname === link.path ? 'text-[#7F00FF]' : 'text-white/30'}`}>
                    {link.name}
                  </span>
                  <span className="text-[10px] font-black tracking-[0.4em] text-[#7F00FF] transition-all duration-500 transform">
                    {link.label}
                  </span>
                </div>
                {location.pathname === link.path && (
                  <motion.div 
                    layoutId="vertexNavActive"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#7F00FF] shadow-[0_0_15px_#7F00FF]"
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-8">
            <Link to="/demo/barber/book" className="hidden sm:block group relative px-10 py-3 overflow-hidden">
               <div className="absolute inset-0 border border-[#7F00FF] group-hover:scale-105 transition-transform duration-500"></div>
               <div className="absolute inset-0 bg-[#7F00FF] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
               <span className="relative z-10 text-[#E0E0E0] group-hover:text-[#050505] font-black text-[9px] uppercase tracking-[0.5em] transition-colors">ACCESS STUDIO</span>
            </Link>
            <button 
              className="lg:hidden text-white/40 hover:text-[#7F00FF] transition-colors"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(40px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 z-[200] bg-[#050505]/95 flex flex-col p-12 lg:hidden"
          >
            <div className="flex justify-between items-center mb-24">
              <span className="font-syne text-2xl font-black text-[#E0E0E0] tracking-widest">VERTEX</span>
              <button onClick={() => setMobileMenuOpen(false)} className="text-white/40 hover:text-[#7F00FF]"><X size={40} /></button>
            </div>
            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="group flex items-end gap-6"
                >
                  <span className="font-syne text-5xl font-black text-white group-hover:text-[#7F00FF] transition-colors uppercase tracking-tighter">{link.label}</span>
                  <span className="text-[12px] font-black text-white/20 mb-3 tracking-widest">{link.name}</span>
                </Link>
              ))}
            </div>
            <div className="mt-auto">
              <Link 
                to="/demo/barber/book" 
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full py-8 border border-[#7F00FF] text-[#7F00FF] text-center font-black uppercase tracking-[0.8em] text-xs hover:bg-[#7F00FF] hover:text-white transition-all"
              >
                INITIALIZE SESSION
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BarberNavbar;
