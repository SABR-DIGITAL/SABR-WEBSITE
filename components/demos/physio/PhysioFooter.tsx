
import React from 'react';
import { Leaf, Instagram, Facebook, Mail, ShieldCheck, Heart } from 'lucide-react';

const PhysioFooter: React.FC = () => {
  return (
    <footer className="py-32 md:py-48 bg-white border-t border-emerald-50 relative overflow-hidden">
      {/* Intrinsic Backdrop Typography */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[45vw] font-bold text-emerald-600/[0.02] leading-none pointer-events-none select-none">BATH</div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-end">
          
          <div className="md:col-span-5 space-y-10">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-emerald-700 rounded-full flex items-center justify-center text-white shadow-lg">
                <Leaf size={20} />
              </div>
              <h4 className="font-serif text-3xl font-bold tracking-tight text-emerald-950">Bath Physio.</h4>
            </div>
            <div className="space-y-2">
              <p className="text-emerald-800/40 text-xs font-bold uppercase tracking-widest leading-loose">
                MARKET CHAMBERS, MARKET STREET <br />
                BATH, SOMERSET, BA1 1AB <br />
                UNITED KINGDOM
              </p>
            </div>
            <div className="flex gap-6">
               <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all cursor-pointer shadow-sm"><Instagram size={18} /></div>
               <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all cursor-pointer shadow-sm"><Facebook size={18} /></div>
               <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all cursor-pointer shadow-sm"><Mail size={18} /></div>
            </div>
          </div>

          <div className="md:col-span-4 p-10 bg-emerald-50/50 rounded-[2.5rem] border border-emerald-100 space-y-6 shadow-sm">
             <div className="flex items-center gap-3">
                <ShieldCheck className="text-emerald-600" size={20} />
                <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-950">Clinic Status</span>
             </div>
             <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] font-bold text-emerald-950/40">
                   <span>HUB_CAPACITY:</span>
                   <span className="text-emerald-600">88% NOMINAL</span>
                </div>
                <div className="w-full h-1.5 bg-emerald-200/30 rounded-full overflow-hidden">
                   <div className="w-[88%] h-full bg-emerald-600"></div>
                </div>
                <p className="text-[11px] font-medium text-emerald-900/60 italic leading-snug">"Accepting intake for new units in the Bath sector. Final windows closing."</p>
             </div>
          </div>

          <div className="md:col-span-3 text-center md:text-right space-y-12">
            <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="text-emerald-700 font-bold text-[11px] uppercase tracking-widest hover:text-emerald-950 transition-colors focus:outline-none">BACK TO APEX</button>
            <div className="space-y-2">
               <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-950/20">© 2025 BATH PHYSIO STUDIO</p>
               <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-emerald-600/40 flex items-center justify-center md:justify-end gap-2">
                 CRAFTED FOR HEALING <Heart size={10} fill="currentColor" />
               </p>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default PhysioFooter;
