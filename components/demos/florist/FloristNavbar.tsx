import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Flower2, Phone } from 'lucide-react';

const FloristNavbar: React.FC = () => {
  const location = useLocation();
  const scrolled = false; // Simple state for demo

  const navLinks = [
    { name: 'Home', path: '/demo/florist' },
    { name: 'Bouquets', path: '/demo/florist/bouquets' },
    { name: 'About', path: '/demo/florist/about' },
    { name: 'Contact', path: '/demo/florist/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[150] p-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between bg-white/70 backdrop-blur-2xl border border-white rounded-full px-8 py-4 shadow-lg transition-all">
        <Link to="/demo/florist" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-[#A47864] rounded-full flex items-center justify-center text-[#F7EBA5] shadow-sm group-hover:rotate-12 transition-transform">
            <Flower2 size={20} />
          </div>
          <span className="font-serif text-xl font-bold text-[#1A1A1A] tracking-tight">Bloom & Stem</span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={`text-[10px] uppercase font-black tracking-[0.3em] transition-colors ${location.pathname === link.path ? 'text-[#A47864]' : 'text-[#1A1A1A]/60 hover:text-[#A47864]'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <Link to="/demo/florist/contact" className="px-8 py-3 bg-[#1A1A1A] text-[#F7EBA5] rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#A47864] transition-all shadow-md flex items-center gap-2">
          <Phone size={12} /> Call Us
        </Link>
      </div>
    </nav>
  );
};

export default FloristNavbar;