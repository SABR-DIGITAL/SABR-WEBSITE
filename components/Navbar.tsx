import React, { useState, useEffect } from 'react';
import { Page } from '../App';
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

const navVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] // "Confident" ease matching IntroPortal/Hero feel
    }
  }
};

const Navbar: React.FC<NavbarProps> = ({ navigateTo, currentPage, startAnimation = true }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isProjects = location.pathname === '/projects';

  const links: { name: string, id: Page }[] = [
    { name: 'Projects', id: 'work' },
    { name: 'Process', id: 'process' },
    { name: 'FAQ', id: 'faq' }
  ];

  const handleNav = (id: Page) => {
    setMobileMenuOpen(false);
    navigateTo(id);
  };

  return (
    <>
      <motion.nav 
        variants={navVariants}
        initial="hidden"
        animate={startAnimation ? "visible" : "hidden"}
        className={`fixed top-0 left-0 right-0 z-[100] transition-[padding] duration-700 px-4 md:px-8 ${scrolled ? 'py-4' : 'py-8'} block transform-gpu will-change-[padding, transform, opacity]`}
      >
        <div className={`max-w-7xl mx-auto flex items-center justify-between transition-[background-color,border-color,padding,border-radius,box-shadow] duration-700 ${scrolled ? 'lg:bg-white/95 lg:border-slate-100 lg:shadow-2xl lg:rounded-full lg:px-8 lg:py-5 lg:border' : 'bg-transparent border-transparent lg:bg-white/10 lg:border-white/20 lg:backdrop-blur-3xl lg:rounded-full lg:px-8 lg:py-5 lg:border'} ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'} lg:opacity-100 transform-gpu will-change-[background-color,border-color,padding,border-radius] bg-transparent border-transparent shadow-none`}>
          <button 
            onClick={() => handleNav('home')}
            className="hidden lg:flex flex-col text-left group focus:outline-none focus:ring-0 appearance-none"
          >
            <span className="font-syne text-xl md:text-2xl tracking-[0.05em] font-black text-slate-950 flex items-center">
              SABR<span className="text-shimmer-blue ml-1.5">DIGITAL</span>
            </span>
            <span className="text-[7px] uppercase font-black tracking-[0.8em] text-blue-400">Digital Studio</span>
          </button>
          
          <div className="hidden lg:flex items-center gap-12">
            {links.map((item) => (
              <button 
                key={item.id} 
                onClick={() => handleNav(item.id)}
                className={`relative text-[10px] uppercase tracking-[0.5em] transition-all font-black focus:outline-none ${(currentPage === item.id && !isProjects) || (isProjects && item.id === 'work') ? 'text-blue-600' : 'text-blue-500/60 hover:text-blue-600'}`}
              >
                {item.name}
                {((currentPage === item.id && !isProjects) || (isProjects && item.id === 'work')) && <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-blue-600 rounded-full"></div>}
              </button>
            ))}
            <button 
              onClick={() => handleNav('contact')}
              className={`px-10 py-4 rounded-full text-[10px] uppercase tracking-[0.4em] font-black transition-all focus:outline-none ${scrolled ? 'bg-blue-600 text-white' : 'bg-slate-950 text-white shadow-xl'} hover:bg-blue-500 hover:scale-105 active:scale-95`}
            >
              Contact
            </button>
          </div>

          <button 
            className="lg:hidden ml-auto p-4 bg-white/90 backdrop-blur-md rounded-full shadow-xl text-slate-950 hover:text-blue-600 transition-all border border-slate-100 focus:outline-none"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[200] bg-[#fdfbf7] flex flex-col p-10 md:p-20 lg:hidden overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-20 md:mb-32">
              <div className="flex flex-col">
                <span className="font-syne text-3xl md:text-4xl font-black text-slate-950">SABR DIGITAL</span>
                <span className="text-[9px] md:text-[11px] uppercase font-black tracking-[0.6em] text-blue-600">PRO Hub</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-white shadow-lg flex items-center justify-center text-slate-950 hover:text-blue-600 transition-colors"><X size={32} /></button>
            </div>
            
            <div className="flex flex-col gap-10 md:gap-16">
              {[{name: 'Home', id: 'home' as Page}, ...links, {name: 'Contact', id: 'contact' as Page}].map((link) => (
                <button 
                  key={link.id} 
                  onClick={() => handleNav(link.id)}
                  className="text-left font-syne text-[clamp(1.5rem,8vw,3.5rem)] font-black text-slate-950 tracking-tighter uppercase hover:text-blue-600 transition-colors leading-none pr-10"
                >
                  {link.name}.
                </button>
              ))}
            </div>

            <div className="mt-auto pt-10 border-t border-slate-100 flex items-center justify-between">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">© 2025 SABR STUDIO</p>
              <div className="flex gap-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full opacity-20"></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;