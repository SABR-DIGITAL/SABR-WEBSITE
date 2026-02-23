
import React from 'react';
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { MoveLeft } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1A3C28] py-24 md:py-32 px-6 md:px-12 text-white border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-20">
        <div className="space-y-10">
          <div className="flex flex-col">
            <span className="font-oswald font-bold text-3xl uppercase tracking-tighter leading-none">OAK & ASH</span>
            <span className="font-black text-[10px] uppercase tracking-[0.4em] text-[#BC4B26]">LANDSCAPING</span>
          </div>
          <p className="text-white/40 text-sm font-medium leading-relaxed max-w-xs">Providing expert forestry and land management solutions across the UK since 1976.</p>
        </div>
        <div className="space-y-8">
          <h4 className="font-oswald font-bold text-xl uppercase tracking-tight">Our Location</h4>
          <p className="text-white/60 text-sm font-medium leading-relaxed border-l border-white/10 pl-6">The Old Timber Yard <br /> Wiltshire Forest, SN1 <br /> United Kingdom</p>
        </div>
        <div className="space-y-8">
          <h4 className="font-oswald font-bold text-xl uppercase tracking-tight">Contact</h4>
          <div className="space-y-2">
            <p className="text-white/60 text-sm font-medium">studio@oakandash.demo</p>
            <p className="text-[#BC4B26] font-bold text-lg">123-456-7890</p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">© 2025 OAK & ASH LANDSCAPING | BUILT BY SABR DIGITAL</p>
        <Link to="/projects" className="text-[9px] font-black uppercase tracking-[0.4em] text-white flex items-center gap-3 hover:text-[#BC4B26] transition-colors group">
          <MoveLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Exit Demo
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
