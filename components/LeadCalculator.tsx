
import React, { useState, useMemo } from 'react';
import { Zap, TrendingUp, Users } from 'lucide-react';

const LeadCalculator: React.FC = () => {
  const [traffic, setTraffic] = useState(300);

  const newCalls = useMemo(() => Math.floor(traffic * 0.08), [traffic]);

  return (
    <section className="py-16 px-6 bg-white overflow-hidden border-b border-slate-100">
      <div className="max-w-4xl mx-auto"> 
        <div className="text-center mb-12">
          <h2 className="font-syne text-3xl md:text-5xl font-black text-slate-950 tracking-tighter uppercase leading-tight mb-4">
            THE GROWTH <span className="text-blue-600">PREDICTOR.</span>
          </h2>
          <p className="text-slate-500 text-lg md:text-xl font-medium max-w-lg mx-auto leading-relaxed">
            See how many <span className="text-blue-600 font-bold">new phone calls</span> our high-performance sites bring you every month.
          </p>
        </div>

        <div className="bg-[#fdfbf7] p-8 md:p-12 rounded-[2.5rem] border border-slate-100 mb-8 shadow-sm">
           <div className="space-y-8">
              <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-10">
                <div className="space-y-2 text-center md:text-left flex-1">
                   <label className="text-slate-500 font-black uppercase text-[10px] tracking-[0.4em] flex items-center justify-center md:justify-start gap-3">
                     <Users size={12} /> People Visiting Your Site
                   </label>
                   <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Average monthly views</p>
                </div>
                {/* Fixed size to prevent layout shifting or overlap */}
                <div className="min-w-[180px] md:min-w-[240px] flex justify-center md:justify-end min-h-[120px] items-center">
                   <span className="text-blue-600 font-black tracking-tighter text-6xl md:text-7xl lg:text-8xl transition-all duration-300 transform-gpu">
                    {traffic}
                   </span>
                </div>
              </div>
              
              <div className="relative pt-4">
                <input 
                  type="range" 
                  min="50" 
                  max="2500" 
                  step="50" 
                  value={traffic} 
                  onChange={(e) => setTraffic(Number(e.target.value))} 
                  className="w-full h-3 bg-blue-100 rounded-full appearance-none cursor-pointer accent-blue-600 transform-gpu" 
                />
                <div className="flex justify-between mt-6 text-[10px] text-slate-300 font-black uppercase tracking-[0.3em] px-2">
                  <span>Small Business</span>
                  <span>Scaling High</span>
                </div>
              </div>
           </div>
        </div>

        {/* ROI Result Container - Fixed Overlap Issues */}
        <div className="bg-[#050608] min-h-[220px] p-8 md:p-14 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16 shadow-2xl relative overflow-hidden group flex-wrap">
           <div className="absolute top-0 right-0 p-10 text-blue-600/5 pointer-events-none group-hover:scale-105 transition-transform duration-1000 transform-gpu"><TrendingUp size={150} /></div>
           
           <div className="relative z-10 text-center md:text-left flex-1 min-w-[280px]">
              <span className="block text-[10px] text-blue-400 uppercase font-black tracking-[0.5em] mb-6">Predicted New Calls / Enquiries</span>
              <div className="flex flex-col md:flex-row items-center gap-10 md:gap-12">
                 <div className="min-w-[120px] md:min-w-[180px] text-center flex items-center justify-center min-h-[100px]">
                    <div className="font-syne font-black text-white leading-none text-6xl md:text-7xl lg:text-8xl transition-all duration-300 transform-gpu">+{newCalls}</div>
                 </div>
                 <div className="text-white space-y-1">
                    <p className="text-xl md:text-2xl font-black uppercase tracking-tight">Per Month</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Estimated Result</p>
                 </div>
              </div>
           </div>

           <div className="relative z-10 w-full md:w-auto flex justify-center md:justify-end">
             <button className="px-12 py-7 bg-blue-600 text-white font-black uppercase tracking-[0.5em] text-[12px] rounded-2xl transition-all shadow-xl hover:bg-white hover:text-slate-950 duration-500 transform-gpu active:scale-95 whitespace-nowrap">
               Get Started <Zap size={18} className="fill-current inline-block ml-2" />
             </button>
           </div>
        </div>
      </div>
    </section>
  );
};

export default LeadCalculator;
