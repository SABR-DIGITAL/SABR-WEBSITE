import React, { useState } from 'react';
// Fix react-router-dom missing exports
import * as RouterDOM from 'react-router-dom';
const { Link, useLocation } = RouterDOM as any;
import { Phone, Menu, X } from 'lucide-react';
import { motion as framerMotion, AnimatePresence } from 'framer-motion';

// Fix motion types by casting to any
const motion = framerMotion as any;

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/demo/landscaping' },
    { name: 'Services', path: '/demo/landscaping/services' },
    { name: 'About', path: '/demo/landscaping/about' },
    { name: 'Gallery', path: '/demo/landscaping/gallery' },
    { name: 'Contact', path: '/demo/landscaping/contact' },
  ];

  return (
    <div className="w-full relative z-[110] font-inter">
      {/* Top Strip */}
      <div className="bg-[#1A3C28] py-2.5 px-6 md:px-12 text-center md:text-left border-b border-white/5">
        <p className="text-white text-[9px] uppercase tracking-[0.5em] font-black flex items-center justify-center md:justify-start gap-4">
          <span className="opacity-50 tracking-[0.2em]">EST 1976</span>
          <span className="w-1 h-1 bg-[#BC4B26] rounded-full"></span>
          <span>CALL: 07123 456 789</span>
        </p>
      </div>

      <nav className="bg-[#F4F1EA] py-5 px-6 md:px-12 border-b border-[#1A3C28]/10 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/demo/landscaping" className="flex flex-col group shrink-0">
            <span className="font-oswald font-bold text-2xl md:text-3xl uppercase tracking-tighter leading-none text-[#1A3C28] group-hover:text-[#BC4B26] transition-colors">
              OAK & ASH
            </span>
            <span className="font-black text-[7px] md:text-[8px] uppercase tracking-[0.4em] text-[#BC4B26]">
              LANDSCAPING
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8 xl:gap-12">
            {navLinks.map((link: any) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`text-[#1A3C28] font-black text-[10px] uppercase tracking-[0.4em] hover:text-[#BC4B26] transition-colors ${location.pathname === link.path ? 'text-[#BC4B26]' : ''}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link 
              to="/demo/landscaping/contact" 
              className="hidden sm:flex px-6 md:px-10 py-4 bg-[#BC4B26] text-white font-black rounded-none text-[10px] uppercase tracking-[0.4em] hover:bg-[#1A3C28] transition-all shadow-xl items-center gap-3 shrink-0 whitespace-nowrap"
            >
              FREE QUOTE
            </Link>
            <button 
              className="lg:hidden text-[#1A3C28] p-2 hover:text-[#BC4B26] transition-colors"
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
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[200] bg-[#F4F1EA] flex flex-col p-10 lg:hidden"
          >
            <div className="flex justify-between items-center mb-16">
              <div className="flex flex-col">
                <span className="font-oswald text-2xl font-bold text-[#1A3C28] tracking-tighter">OAK & ASH</span>
                <span className="text-[8px] font-black text-[#BC4B26] uppercase tracking-[0.4em]">Navigation Hub</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="w-12 h-12 rounded-none bg-[#1A3C28] text-white flex items-center justify-center shadow-lg"><X size={28} /></button>
            </div>
            
            <div className="flex flex-col gap-8">
              {navLinks.map((link: any) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-oswald text-5xl font-bold text-[#1A3C28] tracking-tighter uppercase hover:text-[#BC4B26] transition-colors"
                >
                  {link.name}.
                </Link>
              ))}
            </div>

            <div className="mt-auto pt-10 border-t border-[#1A3C28]/10 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#BC4B26] text-white flex items-center justify-center">
                  <Phone size={18} />
                </div>
                <p className="font-black text-[12px] uppercase tracking-widest text-[#1A3C28]">07123 456 789</p>
              </div>
              <Link 
                to="/demo/landscaping/contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full py-6 bg-[#BC4B26] text-white text-center font-black uppercase tracking-[0.5em] text-[10px]"
              >
                REQUEST SITE VISIT
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;