import React, { useState, useEffect } from 'react';
import { 
  MoveRight, 
  Cpu, 
  Zap, 
  Sparkles, 
  MessageSquare, 
  FileText, 
  CreditCard, 
  PenTool, 
  Eye, 
  Rocket, 
  CheckCircle2,
  MousePointer2,
  Search
} from 'lucide-react';
import { Page } from '../App';
import { motion as framerMotion, AnimatePresence } from 'framer-motion';

// Fix motion types by casting to any
const motion = framerMotion as any;

const BuildJourney = [
  { 
    id: "01", 
    icon: <Search size={100} />, 
    title: "The Discovery & Planning", 
    color: "#FF006E", 
    glow: "rgba(255, 0, 110, 0.4)",
    bullets: [
      "We learn about your business, services, and target audience.",
      "We review competitors to see what’s working in your market.",
      "You receive a clear project plan and full price breakdown."
    ]
  },
  { 
    id: "02", 
    icon: <PenTool size={100} />, 
    title: "The Project Lock-In", 
    color: "#FFBE0B", 
    glow: "rgba(255, 190, 11, 0.4)",
    bullets: [
      "Contracts are signed to confirm deliverables, timelines, and ownership.",
      "We collect the necessary details like images, brand colours, pricing ETC.",
      "A 25% deposit secures your build slot in our schedule."
    ]
  },
  { 
    id: "03", 
    icon: <Cpu size={100} />, 
    title: "The Design & Build", 
    color: "#3A86FF", 
    glow: "rgba(58, 134, 255, 0.4)",
    bullets: [
      "We start to create your custom site tailored to your brand's vision and style.",
      "Mobile optimisation and technical integrations are built in.",
      "You’ll receive live previews to track progress during development."
    ]
  },
  { 
    id: "04", 
    icon: <Eye size={100} />, 
    title: "The Review & Refinement", 
    color: "#38B000", 
    glow: "rgba(56, 176, 0, 0.4)",
    bullets: [
      "You review the build and request revisions within scope of the contract.",
      "We polish visuals, layout, and performance details.",
      "Once approved by you, the final 75% invoice is issued."
    ]
  },
  { 
    id: "05", 
    icon: <Rocket size={100} />, 
    title: "The Launch & Handover", 
    color: "#8338EC", 
    glow: "rgba(131, 56, 236, 0.4)",
    bullets: [
      "Final payment clears before final deployment begins.",
      "You choose your preferred hosting and deployment path.",
      "You reap the rewards of your custom 1:1 digital asset."
    ]
  }
];

const DeploymentOptions = {
  managed: [
    { id: 1, title: "ALL BUILT", desc: "Your site is finished and ready for customers." },
    { id: 2, title: "FAST HOSTING", desc: "We host it on the best servers for speed." },
    { id: 3, title: "WE UPDATE IT", desc: "We handle all the technical bits and security." },
    { id: 4, title: "EASY CHANGES", desc: "Just tell us what to change and we do it." },
    { id: 5, title: "GROW WITH YOU", desc: "Your site stays fresh and works on every phone." }
  ],
  ownership: [
    { id: 1, title: "ALL BUILT", desc: "The site is finished and ready for transfer." },
    { id: 2, title: "FINAL BILL", desc: "Once settled, we start the handover process." },
    { id: 3, title: "FULL ACCESS", desc: "We give you all the passwords and logins." },
    { id: 4, title: "YOUR HOSTING", desc: "You pay for your own hosting (we set it up)." },
    { id: 5, title: "100% YOURS", desc: "You own every part of the site forever." }
  ]
};

const SnakeTimeline: React.FC<{ navigateTo: (page: Page) => void }> = ({ navigateTo }) => {
  const [deploymentMode, setDeploymentMode] = useState<'managed' | 'ownership'>('managed');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#fdfbf7] min-h-screen text-slate-950 overflow-x-hidden relative selection:bg-blue-600/30">
      
      {/* 1. STANDARDIZED HERO */}
      <section className="relative pt-32 md:pt-48 pb-16 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-32">
            <h2 className="font-syne text-[clamp(2.5rem,10vw,5rem)] font-black text-slate-950 tracking-tighter uppercase leading-[0.9] mb-12">
              THE <br />
              <span className="text-shimmer-blue italic pr-4">SYSTEM.</span>
            </h2>
            
            <div className="max-w-4xl border-l-[8px] border-blue-100 pl-10 md:pl-16">
              <p className="text-xl md:text-3xl text-slate-400 font-medium italic leading-relaxed">
                Experience our 5 simple steps to a better website. We build powerful sites designed to help your business win.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. AUTOMATIC REVEAL VERTICAL TIMELINE */}
      <section className="relative px-6 pb-32 z-10">
        <div className="max-w-7xl mx-auto space-y-32 md:space-y-48 lg:space-y-64">
          {BuildJourney.map((step, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div key={step.id} className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 md:gap-20">
                {/* Step Content Side */}
                <div className={`flex flex-col items-center ${isLeft ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="relative flex flex-col items-center text-center w-full bg-transparent">
                    {/* FIXED OVERSIZED ICON: Rescaled for tablet (md) to be more symmetrical */}
                    <div className="relative w-48 h-48 md:w-80 md:h-80 lg:w-80 lg:h-80 flex items-center justify-center mb-8 md:mb-16 pointer-events-none animate-icon-float transform-gpu will-change-transform">
                      <div className="absolute inset-2 md:inset-8 rounded-full blur-[30px] md:blur-[100px] opacity-40" style={{ backgroundColor: step.color }}></div>
                      <div className="relative z-10 scale-50 md:scale-90 lg:scale-100" style={{ color: '#000', filter: `drop-shadow(0 0 30px ${step.glow}) brightness(1.1)` }}>
                        {step.icon}
                      </div>
                    </div>
                    <div className="space-y-6 max-w-[500px] md:max-w-2xl flex flex-col items-center mx-auto pointer-events-none">
                      <h3 className="font-syne text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-slate-950 leading-[0.9]">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Info Card Side - Centered and Rescaled for Tablet */}
                <div className={`flex items-center justify-center relative ${isLeft ? 'lg:order-2' : 'lg:order-1'}`}>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ amount: 0.5, once: true }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-full max-w-[460px] md:max-w-2xl p-10 md:p-20 bg-white/60 backdrop-blur-[60px] border border-white/80 rounded-[3rem] shadow-[0_40px_120px_rgba(0,0,0,0.06)] relative z-50"
                  >
                    <div className="space-y-8 md:space-y-10">
                      {step.bullets.map((bullet, idx) => (
                        <div key={idx} className="flex gap-5 md:gap-6 items-start">
                          <CheckCircle2 size={24} style={{ color: step.color }} className="shrink-0 mt-1" />
                          <p className="text-base md:text-[17px] font-bold italic text-slate-900 opacity-90 leading-relaxed text-left">{bullet}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. FUTURISTIC DEPLOYMENT SELECTION */}
      <section className="bg-[#050608] py-32 md:py-48 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180vw] h-[1px] bg-blue-500 rotate-12"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180vw] h-[1px] bg-blue-500 -rotate-12"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24 md:mb-32 space-y-10">
            <h2 className="font-syne text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-none">
              PICK YOUR <br /> <span className="text-shimmer-blue italic">PATH.</span>
            </h2>
            <div className="inline-flex items-center gap-4">
               <div className="h-[1px] w-12 bg-white/20"></div>
               <p className="text-white/40 font-black text-[10px] uppercase tracking-[0.6em] md:tracking-[0.8em]">HOW DO YOU WANT TO RUN YOUR BUSINESS?</p>
               <div className="h-[1px] w-12 bg-white/20"></div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-16 md:gap-24 xl:gap-48 mb-32 md:mb-48">
            <div className="w-full lg:w-1/2 max-w-lg space-y-8 md:space-y-10">
              <button 
                onClick={() => setDeploymentMode('managed')}
                className={`w-full text-left p-10 md:p-14 rounded-[3.5rem] border-2 transition-all duration-700 relative overflow-hidden group focus:outline-none ${deploymentMode === 'managed' ? 'bg-blue-600 border-blue-600 shadow-[0_0_120px_rgba(37,99,235,0.2)] scale-105' : 'bg-transparent border-white/10 hover:border-blue-600/50'}`}
              >
                <div className="relative z-10 space-y-4">
                  <span className={`text-[10px] font-black uppercase tracking-[0.5em] ${deploymentMode === 'managed' ? 'text-white/60' : 'text-blue-600'}`}>OPTION 01</span>
                  <h3 className="font-syne text-2xl md:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight leading-tight">WE DO THE <br />WORK</h3>
                  <p className={`text-base md:text-lg font-medium italic leading-relaxed ${deploymentMode === 'managed' ? 'text-white/80' : 'text-white/30'}`}>
                    "We host, update, and manage your site so you can focus on your trade."
                  </p>
                </div>
              </button>

              <button 
                onClick={() => setDeploymentMode('ownership')}
                className={`w-full text-left p-10 md:p-14 rounded-[3.5rem] border-2 transition-all duration-700 relative overflow-hidden group focus:outline-none ${deploymentMode === 'ownership' ? 'bg-slate-900 border-slate-700 shadow-[0_0_120px_rgba(255,255,255,0.05)] scale-105' : 'bg-transparent border-white/10 hover:border-white/30'}`}
              >
                <div className="relative z-10 space-y-4">
                  <span className={`text-[10px] font-black uppercase tracking-[0.5em] ${deploymentMode === 'ownership' ? 'text-white/60' : 'text-white/30'}`}>OPTION 02</span>
                  <h3 className="font-syne text-2xl md:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight leading-tight">YOU TAKE <br />THE KEYS</h3>
                  <p className={`text-base md:text-lg font-medium italic leading-relaxed ${deploymentMode === 'ownership' ? 'text-white/80' : 'text-white/30'}`}>
                    "You own the site 100%. We give you the logins and you're in control."
                  </p>
                </div>
              </button>
            </div>

            <div className="w-full lg:w-1/2 max-w-lg">
              <div className="space-y-8">
                <AnimatePresence mode="wait">
                  {DeploymentOptions[deploymentMode].map((point: any, idx: number) => (
                    <motion.div 
                      key={`${deploymentMode}-${point.id}`}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ delay: idx * 0.08, duration: 0.4 }}
                      className="flex items-center gap-8 md:gap-10 group"
                    >
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/5 flex items-center justify-center font-oswald text-xl font-black text-blue-500 border border-white/10 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-500 shrink-0">
                        {point.id}
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-syne text-xl md:text-2xl font-black text-white uppercase tracking-tight group-hover:text-blue-500 transition-colors">
                          {point.title}
                        </h4>
                        <p className="text-white/30 text-base md:text-lg font-medium italic leading-tight group-hover:text-white/60 transition-colors">
                          {point.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.5 }}
              className="relative flex flex-col items-center w-full text-center"
            >
              <div className="relative w-40 h-40 md:w-48 md:h-48 mb-8 flex items-center justify-center mx-auto group cursor-pointer" onClick={() => navigateTo('contact')}>
                <div className="absolute inset-0 bg-blue-600 blur-[60px] opacity-20 animate-pulse group-hover:opacity-40 transition-opacity"></div>
                <div className="relative z-10 text-blue-600 transition-transform duration-500 group-hover:scale-110">
                  <Zap size={70} />
                </div>
              </div>
              <div className="space-y-6 max-w-2xl mx-auto px-4">
                <h3 className="font-syne text-4xl md:text-5xl font-black uppercase tracking-tight text-white">IGNITE YOUR ENGINE.</h3>
                <p className="text-lg md:text-xl text-white/40 font-medium italic opacity-70">
                  Stop losing leads to slow, old websites. Let's build a digital asset that works as hard as you do.
                </p>
                <button 
                  onClick={() => navigateTo('contact')} 
                  className="mt-8 px-10 md:px-14 py-6 md:py-7 bg-blue-600 text-white font-black rounded-full uppercase text-[12px] md:text-[14px] tracking-[0.5em] md:tracking-[0.7em] shadow-2xl flex items-center gap-4 md:gap-6 hover:bg-white hover:text-slate-950 transition-all active:scale-95 mx-auto focus:outline-none"
                >
                  START YOUR BUILD <MoveRight size={22} />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <style>{`
        .text-shimmer-blue {
          background: linear-gradient(90deg, #2563eb 0%, #38bdf8 25%, #2563eb 50%, #38bdf8 75%, #2563eb 100%);
          background-size: 200% auto;
          color: #2563eb;
          background-clip: text;
          text-fill-color: transparent;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: blue-shine 5s linear infinite;
        }
        @keyframes blue-shine { to { background-position: 200% center; } }
        @keyframes icon-float {
          0%, 100 { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
        }
        .animate-icon-float { animation: icon-float 6s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default SnakeTimeline;