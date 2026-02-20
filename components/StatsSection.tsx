
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const StatBubble: React.FC<{ percentage: number; label: string; sub: string; color: string; glow: string }> = ({ percentage, label, sub, color, glow }) => {
  const [count, setCount] = useState(0);
  const bubbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: bubbleRef.current,
      start: "top 85%",
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: percentage,
          duration: 3,
          ease: "power4.out",
          onUpdate: function() { setCount(Math.floor(this.targets()[0].val)); }
        });
        gsap.fromTo(bubbleRef.current, 
          { scale: 0.8, opacity: 0, y: 50 }, 
          { scale: 1, opacity: 1, y: 0, duration: 1.5, ease: "expo.out" }
        );
      }
    });
  }, [percentage]);

  return (
    <div ref={bubbleRef} className="flex flex-col items-center gap-10 opacity-0 group">
      <div className="relative w-56 h-56 md:w-60 md:h-60 flex items-center justify-center transition-all duration-700">
        <div className={`absolute inset-0 rounded-full ${glow} blur-[40px] opacity-0 group-hover:opacity-40 transition-all duration-1000 scale-125`}></div>
        <div className="w-full h-full rounded-full bg-white border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] flex items-center justify-center relative z-10 overflow-hidden group-hover:border-blue-200 transition-all duration-500">
          <div className="text-center relative z-20">
            <div className={`text-5xl md:text-6xl font-syne font-black tracking-tighter transition-all duration-500 ${color}`}>
              {count}<span className="text-xl ml-1 font-bold opacity-40">%</span>
            </div>
            <div className={`mt-3 h-[3px] w-8 ${color.split(' ')[0].replace('text-', 'bg-')} mx-auto rounded-full group-hover:w-14 transition-all duration-500`}></div>
          </div>
        </div>
        <div className={`absolute inset-[-15px] rounded-full border border-dashed border-slate-200 group-hover:border-blue-400 group-hover:scale-105 transition-all duration-1000 animate-spin-slow`}></div>
      </div>
      <div className="text-center max-w-[280px]">
        {/* INCREASED FONT SIZE: 16px label, 13px sub */}
        <h4 className="text-slate-950 font-black text-[16px] uppercase tracking-[0.5em] mb-5 group-hover:text-blue-600 transition-colors duration-300">{label}</h4>
        <p className="text-slate-400 font-bold text-[13px] leading-relaxed tracking-tight italic opacity-80 group-hover:opacity-100 transition-opacity">"{sub}"</p>
      </div>
    </div>
  );
};

const StatsSection: React.FC = () => {
  return (
    <section className="py-20 px-6 bg-[#fdfbf7] border-y border-slate-100 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center flex flex-col items-center">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[2px] w-10 bg-blue-600"></div>
            <span className="text-blue-600 font-black text-[11px] uppercase tracking-[0.8em]">USER PSYCHOLOGY</span>
            <div className="h-[2px] w-10 bg-blue-600"></div>
          </div>
          <h2 className="font-syne text-4xl md:text-6xl font-black text-slate-950 tracking-tighter uppercase leading-[0.9] mb-4">
            THE RISK OF <br /><span className="text-blue-600 italic">SILENCE.</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20 lg:gap-28 justify-items-center">
          <StatBubble 
            percentage={38} 
            label="TRUST" 
            sub="of people judge your business credibility based on your website at a glance." 
            color="text-blue-600"
            glow="bg-blue-600"
          />
          <StatBubble 
            percentage={70} 
            label="RESEARCH" 
            sub="of customers check a website before visiting, even if they found you on social media." 
            color="text-cyan-500"
            glow="bg-cyan-500"
          />
          <StatBubble 
            percentage={88} 
            label="EXPERIENCE" 
            sub="won't return after a bad website experience—even if your physical craft is great." 
            color="text-indigo-600"
            glow="bg-indigo-600"
          />
        </div>
      </div>
      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } 
        .animate-spin-slow { animation: spin-slow 40s linear infinite; }
      `}</style>
    </section>
  );
};

export default StatsSection;
