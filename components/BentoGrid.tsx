
import React from 'react';
import { Zap, Search, Smartphone, Code2, ArrowRight } from 'lucide-react';

const pillars = [
  { 
    title: "SABR Speed", 
    desc: "We skip clunky builders. Our hand-coded architecture ensures your visitors never wait and never bounce.",
    icon: <Code2 size={40} className="text-blue-600" />,
    stat: "99+ Speed Score",
    tag: "THE ENGINE"
  },
  { 
    title: "SABR Layouts", 
    desc: "Built for people on the move. Clear interfaces and 1-tap booking tailored for your local leads.",
    icon: <Smartphone size={40} className="text-blue-400" />,
    stat: "Mobile First",
    tag: "THE INTERFACE"
  },
  { 
    title: "SABR Search", 
    desc: "Visibility is baked into our code. We ensure Google loves your site as much as your customers do.",
    icon: <Search size={40} className="text-blue-800" />,
    stat: "SEO Powered",
    tag: "THE VISIBILITY"
  }
];

const BentoGrid: React.FC<{ navigateTo?: (page: any) => void }> = ({ navigateTo }) => {
  return (
    <section className="relative bg-[#fdfbf7] py-32 overflow-hidden border-y border-slate-100">
      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[2px] w-12 bg-blue-600"></div>
            <span className="text-blue-600 font-black text-[12px] uppercase tracking-[0.6em]">Digital Showcase</span>
          </div>
          <h2 className="font-syne text-5xl md:text-8xl font-black text-slate-950 tracking-tighter leading-none uppercase">
            SABR <br /><span className="text-shimmer-blue italic">PROJECTS.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((item, idx) => (
            <div 
              key={idx} 
              className="group relative bg-white border border-slate-100 p-12 rounded-[2.5rem] hover:border-blue-200 transition-all duration-700 hover:-translate-y-4 shadow-[0_10px_40px_rgba(0,0,0,0.02)] flex flex-col justify-between min-h-[440px] transform-gpu will-change-transform"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-100 group-hover:text-blue-600 transition-all">
                 <Zap size={32} />
              </div>
              
              <div>
                <div className="mb-12 w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center border border-blue-100 group-hover:scale-110 transition-all duration-500 group-hover:shadow-[0_10px_30px_rgba(37,99,235,0.1)]">
                  {item.icon}
                </div>

                <div className="space-y-6">
                  <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{item.tag}</span>
                  <h3 className="font-syne text-3xl font-black text-slate-950 uppercase tracking-tight">{item.title}</h3>
                  <p className="text-slate-500 text-lg leading-relaxed font-medium">{item.desc}</p>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-slate-50 flex items-center justify-between">
                 <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">{item.stat}</span>
                 <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-blue-600 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-1000"></div>
                 </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Banner */}
        <div className="mt-24 p-12 md:p-24 bg-white border border-slate-100 rounded-[3rem] shadow-[0_50px_100px_rgba(37,99,235,0.05)] flex flex-col md:flex-row items-center justify-between gap-12 group relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.03),transparent)]"></div>
          <div className="relative z-10 max-w-xl">
            <h4 className="font-syne text-5xl md:text-7xl text-slate-950 font-black tracking-tighter uppercase leading-none mb-6">
              READY TO <br /><span className="text-blue-600 italic">DOMINATE?</span>
            </h4>
            <p className="text-slate-500 text-lg font-bold">Stop losing leads to slow, outdated technology. Let's fix your business today.</p>
          </div>
          <button 
            onClick={() => navigateTo && navigateTo('contact')} 
            className="relative z-10 px-16 py-8 bg-blue-600 text-white font-black uppercase tracking-[0.4em] text-[13px] rounded-2xl hover:scale-110 transition-all shadow-xl active:scale-95 flex items-center gap-4"
          >
            Start Project <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <style>{`
        .text-shimmer-blue {
          background: linear-gradient(90deg, #2563eb, #38bdf8, #2563eb);
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer-text 5s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default BentoGrid;
