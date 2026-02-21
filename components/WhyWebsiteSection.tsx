import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Smartphone, 
  Users, 
  Layers, 
  Trophy,
  ShieldCheck,
  Mic,
  Cpu,
  X,
  CheckCircle2,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SabrPro {
  id: number;
  title: string;
  icon: React.ReactNode;
  color: string;
  bg: string;
  meaning: string;
  matters: string;
  outcomes: string[];
}

const sabrPros: SabrPro[] = [
  {
    id: 1,
    title: "Local Conversion",
    icon: <Users size={16} />,
    color: "text-blue-600",
    bg: "bg-blue-50",
    meaning: "Your website is built to turn nearby visitors into real enquiries — not just traffic.",
    matters: "Most local customers choose from the first few businesses they trust online.",
    outcomes: ["More phone calls", "Higher Google visibility", "Visitors find services faster", "Less reliance on ads", "Stronger local trust"]
  },
  {
    id: 2,
    title: "Voice Search Visibility",
    icon: <Mic size={16} />,
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    meaning: "Your site is structured for how people speak into their phones — not just how they type.",
    matters: "Voice searches are usually high-intent, ready-to-book customers.",
    outcomes: ["Show up in 'near me' searches", "Capture ready-to-book traffic", "Increased mobile discovery", "Less missed enquiries", "Future-proofed presence"]
  },
  {
    id: 8,
    title: "AI Client Assistant",
    icon: <Cpu size={16} />,
    color: "text-purple-600",
    bg: "bg-purple-50",
    meaning: "Personalised AI chatbot that understands your business and answers customer questions instantly.",
    matters: "Many visitors have questions but don’t want to call straight away.",
    outcomes: ["24/7 customer support", "Reduces reply time", "Pre-qualifies leads", "Guides visitors", "Captures enquiries"]
  },
  {
    id: 3,
    title: "High Street Structure",
    icon: <Layers size={16} />,
    color: "text-slate-800",
    bg: "bg-slate-50",
    meaning: "We design your website like a physical storefront — clear, guided, and easy to navigate.",
    matters: "Visitors decide whether to stay or leave within seconds.",
    outcomes: ["Instant service clarity", "Faster decision-making", "Lower bounce rates", "More enquiries", "Frustration-free experience"]
  },
  {
    id: 4,
    title: "Premium Brand Perception",
    icon: <Trophy size={16} />,
    color: "text-purple-600",
    bg: "bg-purple-50",
    meaning: "Your business looks top-tier online — regardless of size or years trading.",
    matters: "People judge quality before they judge price.",
    outcomes: ["Higher perceived value", "Pricing confidence", "Stronger first impressions", "Stand out vs competitors", "Better-quality clients"]
  },
  {
    id: 5,
    title: "Trust & Proof Layering",
    icon: <ShieldCheck size={16} />,
    color: "text-amber-500",
    bg: "bg-amber-50",
    meaning: "Your website builds credibility before you ever speak to a client.",
    matters: "Customers check legitimacy before making contact.",
    outcomes: ["Warmer inbound leads", "Less convincing needed", "Increased enquiry confidence", "Stronger reputation", "Faster decision-making"]
  },
  {
    id: 6,
    title: "24/7 Lead Capture",
    icon: <Zap size={16} />,
    color: "text-blue-50",
    bg: "bg-blue-500",
    meaning: "Your website works as a full-time sales tool — capturing enquiries day and night.",
    matters: "A large percentage of leads happen outside working hours.",
    outcomes: ["Enquiries while you sleep", "Automated quote requests", "Booking capture", "No missed opportunities", "Time saved on messaging"]
  },
  {
    id: 7,
    title: "Mobile Conversion Focus",
    icon: <Smartphone size={16} />,
    color: "text-blue-50",
    bg: "bg-blue-500",
    meaning: "Your website is designed for mobile first — where most customers visit from.",
    matters: "If mobile feels slow or clunky, visitors leave instantly.",
    outcomes: ["More tap-to-call", "Faster mobile speeds", "Easier phone navigation", "Higher conversion rates", "Better on-the-go experience"]
  }
];

const WhyWebsiteSection: React.FC = () => {
  const [selectedPro, setSelectedPro] = useState<SabrPro | null>(null);

  // Disable body scroll when modal is open
  React.useEffect(() => {
    if (selectedPro) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedPro]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedPro) return;
    const currentIndex = sabrPros.findIndex(p => p.id === selectedPro.id);
    const nextIndex = (currentIndex + 1) % sabrPros.length;
    setSelectedPro(sabrPros[nextIndex]);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedPro) return;
    const currentIndex = sabrPros.findIndex(p => p.id === selectedPro.id);
    const prevIndex = (currentIndex - 1 + sabrPros.length) % sabrPros.length;
    setSelectedPro(sabrPros[prevIndex]);
  };

  const activeIndex = selectedPro ? sabrPros.findIndex(p => p.id === selectedPro.id) : 0;

  return (
    <section className="relative bg-white py-16 md:py-24 overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 relative z-20 flex flex-col-reverse lg:flex-row items-start justify-between gap-8 lg:gap-16">
        
        {/* LEFT STACK: STATIC GRID FOR ALL DEVICES */}
        <div className="w-full lg:w-[320px] shrink-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {sabrPros.map((item, idx) => (
              <button 
                key={idx}
                onClick={() => setSelectedPro(item)}
                className="w-full flex items-center gap-3 p-5 bg-white border border-slate-100 rounded-[1.8rem] shadow-sm hover:border-blue-600 hover:shadow-md transition-all duration-300 group focus:outline-none text-left transform-gpu"
              >
                <div className={`w-10 h-10 rounded-xl ${item.bg} ${item.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-sm`}>
                  {item.icon}
                </div>
                <div className="flex-1 overflow-hidden">
                  <h3 className="font-syne text-[11px] font-black uppercase tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors flex flex-col leading-none gap-0.5">
                    {item.title.split(' ').map((word, wIdx) => (
                      <span key={wIdx} className="block whitespace-nowrap">{word}</span>
                    ))}
                  </h3>
                </div>
                <ArrowRight size={12} className="text-slate-200 group-hover:text-blue-600 transition-all group-hover:translate-x-1" />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE: MAIN HEADINGS AND BIOS */}
        <div className="flex-1 w-full flex flex-col justify-start lg:justify-center py-0 lg:py-8 lg:sticky lg:top-32">
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-[2px] bg-blue-600"></div>
                <span className="text-blue-600 font-black text-[11px] uppercase tracking-[0.8em]">SABR PRO'S</span>
              </div>
              
              {/* TABLET-READY CLAMPED FONT SIZES */}
              <h2 className="font-syne text-3xl sm:text-4xl md:text-[clamp(2.5rem,6vw,5rem)] font-black tracking-tighter uppercase leading-[0.9] text-slate-950">
                WHY <br /> <span className="text-blue-600 italic">DOMINATE</span> <br /> ONLINE?
              </h2>
              
              <div className="max-w-md border-l-4 border-blue-50 pl-8">
                <p className="text-slate-400 font-bold text-[13px] uppercase tracking-[0.4em] italic leading-relaxed">
                  "Explore our architectural pillars. Click a protocol item on the left to review its technical blueprint."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DETAIL MODAL */}
      <AnimatePresence>
        {selectedPro && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 md:p-10">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setSelectedPro(null)} 
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 30 }} 
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-5xl bg-white rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden flex flex-col max-h-[90vh] z-20 transform-gpu will-change-transform"
            >
              {/* MODAL HEADER - FIXED AND CLEAN */}
              <div className="px-8 sm:px-12 py-6 sm:py-8 flex items-center justify-between border-b border-slate-100 bg-white sticky top-0 z-30">
                <div className="flex flex-col text-left shrink-0">
                  <span className="font-syne text-lg sm:text-2xl tracking-[0.05em] font-black text-slate-950 flex items-center leading-none uppercase">
                    SABR<span className="text-blue-600 ml-1.5">PROTOCOL</span>
                  </span>
                  <span className="text-[7px] sm:text-[8px] uppercase font-black tracking-[0.6em] text-blue-400 mt-1.5">Technical Blueprint</span>
                </div>
                <div className="flex items-center gap-3 sm:gap-6">
                  <div className="hidden sm:flex items-center gap-4 px-5 py-2.5 bg-slate-50 border border-slate-100 rounded-full shadow-inner">
                    <button onClick={handlePrev} className="p-1 hover:text-blue-600 focus:outline-none transition-colors"><ChevronLeft size={16} /></button>
                    <span className="text-[10px] font-black text-slate-950 uppercase tracking-[0.2em] min-w-[45px] text-center">{activeIndex + 1} / {sabrPros.length}</span>
                    <button onClick={handleNext} className="p-1 hover:text-blue-600 focus:outline-none transition-colors"><ChevronRight size={16} /></button>
                  </div>
                  <button onClick={() => setSelectedPro(null)} className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-slate-950 text-white flex items-center justify-center hover:bg-blue-600 transition-all shadow-xl active:scale-90"><X size={24} /></button>
                </div>
              </div>

              {/* MODAL CONTENT - SCROLLABLE AREA */}
              <div className="p-8 sm:p-12 md:p-20 overflow-y-auto custom-scrollbar bg-white">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={selectedPro.id} 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -20 }} 
                    transition={{ duration: 0.4, ease: "circOut" }} 
                    className="flex flex-col lg:flex-row gap-12 md:gap-20 lg:gap-32 items-start"
                  >
                    {/* LEFT SIDE: ICON & STACKED TITLE */}
                    <div className="w-full lg:w-[280px] space-y-10 shrink-0">
                      <div className={`w-24 h-24 rounded-[2rem] ${selectedPro.bg} ${selectedPro.color} flex items-center justify-center shadow-2xl transform -rotate-3 group-hover:rotate-0 transition-transform duration-500`}>
                        {React.cloneElement(selectedPro.icon as React.ReactElement<{ size?: number }>, { size: 40 })}
                      </div>
                      <div className="space-y-4">
                        <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.6em] block">Protocol Item</span>
                        <h2 className="font-syne text-3xl md:text-4xl font-black text-slate-950 uppercase tracking-tighter leading-[0.85] flex flex-col">
                          {selectedPro.title.split(' ').map((word, wIdx) => (
                            <span key={wIdx} className="block whitespace-nowrap">{word}</span>
                          ))}
                        </h2>
                      </div>
                    </div>

                    {/* RIGHT SIDE: BIOS / DETAIL INFO */}
                    <div className="flex-1 space-y-16">
                      <section className="space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-[2px] bg-blue-600/30"></div>
                          <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.5em]">What it means</h4>
                        </div>
                        <p className="text-xl md:text-3xl font-bold text-slate-800 italic leading-tight tracking-tight">"{selectedPro.meaning}"</p>
                      </section>

                      <section className="space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-[2px] bg-blue-600/30"></div>
                          <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.5em]">Why it matters</h4>
                        </div>
                        <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">{selectedPro.matters}</p>
                      </section>

                      <section className="space-y-8 pt-12 border-t border-slate-100">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">Expected Outcomes</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {selectedPro.outcomes.map((outcome, i) => (
                            <div key={i} className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl border border-transparent hover:border-blue-100 hover:bg-white transition-all group shadow-sm hover:shadow-md">
                              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-blue-600 shadow-sm shrink-0 group-hover:scale-110 transition-transform"><CheckCircle2 size={14} /></div>
                              <span className="font-black text-[12px] uppercase tracking-wider text-slate-600 group-hover:text-slate-950 transition-colors">{outcome}</span>
                            </div>
                          ))}
                        </div>
                      </section>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}</style>
    </section>
  );
};

export default WhyWebsiteSection;
