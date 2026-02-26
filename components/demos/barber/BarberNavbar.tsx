
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Scissors } from 'lucide-react';
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
    { path: '/demo/barber', label: 'Studio' },
    { path: '/demo/barber/cuts', label: 'Styles' },
    { path: '/demo/barber/locations', label: 'Locations' },
    { path: '/demo/barber/contact', label: 'Contact' },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-[150] transition-all duration-300 ${
          scrolled ? 'py-4 bg-white/95 backdrop-blur-md shadow-sm border-b border-neutral-100' : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/demo/barber" className="flex items-center gap-2 group z-50">
            <div className="w-10 h-10 bg-black text-white rounded-none flex items-center justify-center group-hover:bg-[#00D95F] transition-colors duration-300">
              <Scissors size={20} className="transform -rotate-45" />
            </div>
            <span className={`text-xl font-black tracking-tighter uppercase ${scrolled ? 'text-black' : 'text-black'}`}>
              Fresh<span className="text-[#00D95F]">Cuts</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className="relative group"
              >
                <span className={`text-sm font-bold uppercase tracking-wider transition-colors duration-300 ${
                  location.pathname === link.path ? 'text-[#00D95F]' : 'text-neutral-500 hover:text-black'
                }`}>
                  {link.label}
                </span>
                {location.pathname === link.path && (
                  <motion.div 
                    layoutId="activeNav"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[#00D95F]"
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link 
              to="/demo/barber/book" 
              className="hidden sm:flex px-8 py-3 bg-black text-white font-bold text-xs uppercase tracking-widest hover:bg-[#00D95F] transition-colors duration-300 rounded-none"
            >
              Book Now
            </Link>
            
            <button 
              className="lg:hidden text-black z-50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[140] bg-white flex flex-col justify-center px-10 lg:hidden"
          >
            <div className="flex flex-col gap-8">
              {navLinks.map((link, idx) => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="text-4xl font-black uppercase tracking-tight text-neutral-900 hover:text-[#00D95F] transition-colors"
                  >
                    {link.label}
                  </motion.div>
                </Link>
              ))}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8"
              >
                <Link 
                  to="/demo/barber/book" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-block px-10 py-4 bg-[#00D95F] text-white font-black uppercase tracking-widest rounded-none"
                >
                  Book Appointment
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BarberNavbar;
