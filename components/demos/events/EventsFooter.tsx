
import React from 'react';

const EventsFooter: React.FC = () => {
  return (
    <footer className="py-64 relative overflow-hidden bg-[#050505]">
      {/* Massive Background V */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 font-syne text-[60vw] font-black text-[#D4AF37]/5 leading-none pointer-events-none select-none">V</div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-3 gap-24 items-end">
        <div className="space-y-10">
          <h4 className="font-syne text-2xl font-black text-white tracking-[0.4em] uppercase">VANTAGE</h4>
          <p className="text-white/20 text-xs font-bold uppercase tracking-[0.2em] leading-loose">
            LND: 51.5074° N <br />
            NYC: 40.7128° N <br />
            PAR: 48.8566° N
          </p>
        </div>
        
        <div className="text-center space-y-8">
          <div className="flex justify-center gap-10">
             <div className="w-1 h-1 bg-[#D4AF37] rounded-full"></div>
             <div className="w-1 h-1 bg-white/10 rounded-full"></div>
             <div className="w-1 h-1 bg-white/10 rounded-full"></div>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[1em] text-white/5">Engineering Memories Since 2012</p>
        </div>

        <div className="text-center md:text-right space-y-10">
          <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="text-[#D4AF37] font-black text-[9px] uppercase tracking-[0.8em] hover:text-white transition-colors">Return to Apex</button>
          <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/5">© 2025 VANTAGE ELITE | SABR DIGITAL STUDIO</p>
        </div>
      </div>
    </footer>
  );
};

export default EventsFooter;
