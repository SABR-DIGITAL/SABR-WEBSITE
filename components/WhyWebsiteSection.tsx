import React, { useState } from 'react';
import { createPortal } from 'react-dom';
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

export interface SabrPro {
  id: number;
  title: string;
  icon: React.ReactNode;
  color: string;
  bg: string;
  meaning: string;
  matters: string;
  outcomes: string[];
}

const defaultPros: SabrPro[] = [
  {
    id: 1,
    title: "Local Conversion",
    icon: <Users size={16} />,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
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
    color: "text-emerald-50",
    bg: "bg-emerald-600",
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

interface WhyWebsiteSectionProps {
  /** Overrides for reusing this section on the AI Optimisation site. */
  items?: SabrPro[];
  eyebrow?: string;
  headline?: React.ReactNode;
  blurb?: string;
  /** Second word of the modal's "SABR ___" wordmark. */
  modalBrand?: string;
}

const WhyWebsiteSection: React.FC<WhyWebsiteSectionProps> = ({
  items = defaultPros,
  eyebrow = "SABR PRO'S",
  headline,
  blurb = '"Explore our architectural pillars. Tap any PRO item to review its technical blueprint."',
  modalBrand = 'PRO'
}) => {
  const sabrPros = items;
  const [selectedPro, setSelectedPro] = useState<SabrPro | null>(null);

  // Lock background scroll cleanly when blueprint modal is open
  React.useEffect(() => {
    if (!selectedPro) return;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPro(null);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
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
    <section className="relative bg-white pt-14 pb-16 sm:pt-20 md:pt-28 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-20 flex flex-col-reverse lg:flex-row items-start justify-between gap-8 lg:gap-16">
        
        {/* LEFT STACK: COMPACT 2-COL GRID ON MOBILE FOR INSTANT 60FPS SCROLL, 1-COL ON DESKTOP */}
        <div className="w-full lg:w-[320px] shrink-0">
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-2.5 sm:gap-3.5 lg:gap-4">
            {sabrPros.map((item, idx) => (
              <button 
                key={idx}
                type="button"
                onClick={() => setSelectedPro(item)}
                className="w-full flex items-center gap-2.5 sm:gap-3 p-3.5 sm:p-4 lg:p-5 bg-white border border-slate-150 rounded-2xl lg:rounded-[1.8rem] shadow-xs hover:border-emerald-600 md:hover:shadow-md transition-colors duration-150 group focus:outline-none text-left cursor-pointer active:bg-slate-50"
              >
                <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${item.bg} ${item.color} flex items-center justify-center shrink-0`}>
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-syne text-[9.5px] sm:text-[11px] font-black uppercase tracking-tight text-slate-900 group-hover:text-emerald-600 transition-colors duration-150 flex flex-col leading-[1.08] gap-0.5">
                    {item.title.split(' ').map((word, wIdx) => (
                      <span key={wIdx} className="block truncate">{word}</span>
                    ))}
                  </h3>
                </div>
                <ArrowRight size={12} className="text-slate-300 group-hover:text-emerald-600 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5" />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE: MAIN HEADINGS AND BIOS */}
        <div className="flex-1 w-full flex flex-col justify-start lg:justify-center py-0 lg:py-8 lg:sticky lg:top-32">
          <div className="space-y-5 md:space-y-8">
            <div className="space-y-3.5 md:space-y-4">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-8 md:w-10 h-[2px] bg-emerald-600"></div>
                <span className="text-emerald-600 font-black text-[10px] md:text-[11px] uppercase tracking-[0.5em] md:tracking-[0.8em]">{eyebrow}</span>
              </div>
              
              {/* CLAMPED FONT SIZES */}
              <h2 className="font-syne text-[clamp(2.1rem,8vw,5rem)] font-black tracking-tighter uppercase leading-[0.9] text-slate-950">
                {headline ?? <>WHAT WE <br /> <span className="text-emerald-600 italic">DO WELL!</span></>}
              </h2>
              
              <div className="max-w-md border-l-4 border-emerald-100 pl-4 sm:pl-8">
                <p className="text-slate-400 font-bold text-[11px] sm:text-[13px] uppercase tracking-[0.25em] sm:tracking-[0.4em] italic leading-relaxed">
                  {blurb}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DETAIL MODAL: Pure CSS hardware-accelerated animation, only mounted when open */}
      {selectedPro && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 h-[100dvh] z-[1000] flex items-center justify-center p-3 sm:p-6 md:p-10 overflow-hidden overscroll-none">
          <div
            onClick={() => setSelectedPro(null)}
            className="sabr-modal-backdrop absolute inset-0 bg-slate-950/90"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label={selectedPro.title}
            className="sabr-modal-panel relative w-full max-w-5xl max-h-[90dvh] sm:max-h-full bg-white rounded-3xl md:rounded-[3.5rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col z-20"
          >
            {/* MODAL HEADER */}
            <div className="px-5 sm:px-10 md:px-12 py-4 sm:py-7 flex items-center justify-between border-b border-slate-100 bg-white shrink-0 z-30">
              <div className="flex flex-col text-left shrink-0">
                <span className="font-syne text-base sm:text-2xl tracking-[0.05em] font-black text-slate-950 flex items-center leading-none uppercase">
                  SABR<span className="text-emerald-600 ml-1.5">{modalBrand}</span>
                </span>
                <span className="text-[7px] sm:text-[8px] uppercase font-black tracking-[0.45em] sm:tracking-[0.6em] text-emerald-600 mt-1">Technical Blueprint</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-5">
                <div className="flex items-center gap-1.5 sm:gap-4 px-2.5 sm:px-5 py-1.5 sm:py-2.5 bg-slate-50 border border-slate-100 rounded-full">
                  <button type="button" onClick={handlePrev} aria-label="Previous item" className="p-1 hover:text-emerald-600 focus:outline-none transition-colors cursor-pointer"><ChevronLeft size={14} className="sm:w-4 sm:h-4" /></button>
                  <span className="text-[9px] sm:text-[10px] font-black text-slate-950 uppercase tracking-[0.1em] sm:tracking-[0.2em] min-w-[34px] sm:min-w-[45px] text-center tabular-nums">{activeIndex + 1} / {sabrPros.length}</span>
                  <button type="button" onClick={handleNext} aria-label="Next item" className="p-1 hover:text-emerald-600 focus:outline-none transition-colors cursor-pointer"><ChevronRight size={14} className="sm:w-4 sm:h-4" /></button>
                </div>
                <button 
                  type="button"
                  onClick={() => setSelectedPro(null)} 
                  aria-label="Close blueprint"
                  className="h-8 sm:h-10 px-3.5 sm:px-0 sm:w-10 rounded-full bg-slate-950 text-white flex items-center justify-center hover:bg-emerald-600 transition-colors active:scale-95 gap-1.5 cursor-pointer"
                >
                  <span className="sm:hidden text-[9px] font-black uppercase tracking-widest">Exit</span>
                  <X size={15} className="hidden sm:block sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* MODAL CONTENT - SCROLLABLE REGION */}
            <div className="flex-1 min-h-0 p-5 sm:p-10 md:p-16 overflow-y-auto overscroll-contain custom-scrollbar bg-white">
              <div 
                key={selectedPro.id}
                className="sabr-modal-body flex flex-col lg:flex-row gap-6 sm:gap-12 md:gap-16 lg:gap-24 items-start"
              >
                {/* LEFT SIDE: ICON & TITLE */}
                <div className="w-full lg:w-[260px] flex flex-row lg:flex-col items-center lg:items-start gap-4 lg:gap-8 shrink-0">
                  <div className={`w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-2xl lg:rounded-[2rem] ${selectedPro.bg} ${selectedPro.color} flex items-center justify-center shadow-md shrink-0`}>
                    {React.cloneElement(selectedPro.icon as React.ReactElement<{ size?: number }>, { size: 28 })}
                  </div>
                  <div className="space-y-1.5 lg:space-y-3 min-w-0">
                    <span className="text-emerald-600 font-black text-[9px] sm:text-[10px] uppercase tracking-[0.45em] lg:tracking-[0.6em] block">PRO Item</span>
                    <h2 className="font-syne text-xl sm:text-3xl md:text-4xl font-black text-slate-950 uppercase tracking-tighter leading-[0.9] flex flex-wrap lg:flex-col gap-x-2">
                      {selectedPro.title.split(' ').map((word, wIdx) => (
                        <span key={wIdx} className="block">{word}</span>
                      ))}
                    </h2>
                  </div>
                </div>

                {/* RIGHT SIDE: BIOS / DETAIL INFO */}
                <div className="flex-1 space-y-6 sm:space-y-10 md:space-y-14 w-full">
                  <section className="space-y-2.5 sm:space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-6 sm:w-8 h-[2px] bg-emerald-600/30"></div>
                      <h4 className="text-[9px] sm:text-[10px] font-black text-emerald-600 uppercase tracking-[0.4em] sm:tracking-[0.5em]">What it means</h4>
                    </div>
                    <p className="text-base sm:text-xl md:text-3xl font-bold text-slate-800 italic leading-snug tracking-tight">"{selectedPro.meaning}"</p>
                  </section>

                  <section className="space-y-2.5 sm:space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-6 sm:w-8 h-[2px] bg-emerald-600/30"></div>
                      <h4 className="text-[9px] sm:text-[10px] font-black text-emerald-600 uppercase tracking-[0.4em] sm:tracking-[0.5em]">Why it matters</h4>
                    </div>
                    <p className="text-sm sm:text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">{selectedPro.matters}</p>
                  </section>

                  <section className="space-y-4 sm:space-y-6 pt-5 sm:pt-10 border-t border-slate-100">
                    <h4 className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] sm:tracking-[0.5em]">Expected Outcomes</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
                      {selectedPro.outcomes.map((outcome, i) => (
                        <div key={i} className="flex items-center gap-3 p-3.5 sm:p-5 bg-slate-50 rounded-xl sm:rounded-2xl border border-slate-100">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white flex items-center justify-center text-emerald-600 shadow-xs shrink-0"><CheckCircle2 size={13} /></div>
                          <span className="font-black text-[11px] sm:text-[12px] uppercase tracking-wider text-slate-700">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        @keyframes sabrModalFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes sabrModalPop {
          from { opacity: 0; transform: translate3d(0, 12px, 0) scale(0.98); }
          to { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
        }
        .sabr-modal-backdrop {
          animation: sabrModalFade 0.16s ease-out both;
        }
        .sabr-modal-panel {
          animation: sabrModalPop 0.18s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .sabr-modal-body {
          animation: sabrModalFade 0.15s ease-out both;
        }
      `}</style>
    </section>
  );
};

export default WhyWebsiteSection;
