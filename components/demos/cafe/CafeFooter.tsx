
import React from 'react';
import { Coffee, Instagram, Facebook, Mail } from 'lucide-react';

const CafeFooter: React.FC = () => {
  return (
    <footer className="py-32 bg-[#FDF4F5] border-t border-[#A4715E]/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-16 mb-24">
          <div className="text-center md:text-left space-y-6">
            <h2 className="font-serif text-4xl font-bold text-[#4A403A] tracking-tight">Stay in the Loop.</h2>
            <p className="text-[#A4715E]/60 font-medium italic max-w-sm">"Join our community of coffee lovers for exclusive treats and news from the bakery."</p>
            <div className="flex gap-4">
               <input type="email" placeholder="Your email address" className="bg-white border border-[#A4715E]/10 px-8 py-4 rounded-2xl focus:outline-none focus:border-[#A4715E] transition-all text-sm w-full" />
               <button className="bg-[#4A403A] text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#A4715E] transition-all">Join</button>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end space-y-6">
             <div className="flex gap-8">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <Instagram className="text-[#A4715E]/40 hover:text-[#A4715E] cursor-pointer transition-colors" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <Facebook className="text-[#A4715E]/40 hover:text-[#A4715E] cursor-pointer transition-colors" />
                </a>
                <a href="mailto:hello@thehearth.cafe">
                  <Mail className="text-[#A4715E]/40 hover:text-[#A4715E] cursor-pointer transition-colors" />
                </a>
             </div>
             <div className="text-right flex flex-col gap-2">
                <p className="text-[10px] font-black uppercase tracking-[0.6em] text-[#A4715E]/30">Contact</p>
                <p className="text-lg font-bold text-[#4A403A]">hello@thehearth.cafe</p>
             </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-16 border-t border-[#A4715E]/10">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-[#A4715E] rounded-full flex items-center justify-center text-white">
              <Coffee size={14} />
            </div>
            <span className="font-serif text-lg font-bold text-[#4A403A]">The Hearth</span>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.8em] text-[#A4715E]/20">© 2025 THE HEARTH CAFE | BUILT BY SABR STUDIO</p>
        </div>
      </div>
    </footer>
  );
};

export default CafeFooter;
