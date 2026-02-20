import React, { useState } from 'react';
import { 
  DollarSign, 
  Clock, 
  ShieldCheck, 
  Smartphone, 
  Search, 
  ChevronRight, 
  Zap, 
  Globe,
  RefreshCw,
  Trophy,
  MousePointer2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
// Add import for Page type from App.tsx
import { Page } from '../App';

const faqs = [
  { 
    icon: <DollarSign size={32} />, 
    q: "How much does it cost?", 
    a: "Elite engineering for your business. We provide fixed, upfront quotes after our discovery call. No hidden fees or surprises." 
  },
  { 
    icon: <ShieldCheck size={32} />, 
    q: "Do I pay a deposit?", 
    a: "A 25% deposit secures your build slot. This initiates the project immediately with the balance due upon final site approval." 
  },
  { 
    icon: <Clock size={32} />, 
    q: "How fast is the build?", 
    a: "Launch in just 2 to 3 weeks. We move at the high velocity your business demands for instant, measurable digital growth." 
  },
  { 
    icon: <Smartphone size={32} />, 
    q: "Is it mobile ready?", 
    a: "Flawless performance on every device. Your site is hand-optimized for mobile speed and desktop clarity from day one. Guaranteed." 
  },
  { 
    icon: <RefreshCw size={32} />, 
    q: "Can I edit the site?", 
    a: "Simple management through a clean dashboard. Take full control of your content or let our experts handle every single update." 
  },
  { 
    icon: <Zap size={32} />, 
    q: "Do you offer hosting?", 
    a: "Secure hosting on world-class edge networks. We handle the technical infrastructure so you can focus on running your craft daily." 
  },
  { 
    icon: <Globe size={32} />, 
    q: "What about domains?", 
    a: "Complete technical setup for your domain. We connect existing keys or source the perfect name for your digital business asset." 
  },
  { 
    icon: <Search size={32} />, 
    q: "Will Google find me?", 
    a: "Search power is baked into our code. We ensure Google finds you first with built-in SEO and performance foundations as standard." 
  },
  { 
    icon: <Trophy size={32} />, 
    q: "What happens next?", 
    a: "Total digital sovereignty. Choose full ownership with training provided or a managed care plan for never-stop business growth. Simple." 
  }
];

// Add FAQSectionProps interface to fix type mismatch in App.tsx
interface FAQSectionProps {
  navigateTo: (page: Page) => void;
}

// Update component to accept navigateTo prop
const FAQSection: React.FC<FAQSectionProps> = ({ navigateTo }) => {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const toggleFlip = (index: number) => {
    setFlippedIndex(prev => prev === index ? null : index);
  };

  return (
    <section className="bg-[#fdfbf7] pt-12 md:pt-24 pb-64 overflow-hidden px-6">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="mb-32">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12 mb-20">
            <div>
              <div className="flex items-center gap-4 mb-10">
                <div className="h-[2px] w-20 bg-blue-600"></div>
                <span className="text-blue-600 font-black text-[13px] uppercase tracking-[1em]">COMMON QUESTIONS</span>
              </div>
              <h2 className="font-syne text-4xl md:text-5xl lg:text-7xl font-black text-slate-950 tracking-tighter uppercase leading-tight">
                YOUR QUESTIONS, <br />
                <span className="text-shimmer-blue italic">ANSWERED.</span>
              </h2>
            </div>

            {/* Interaction Hint Bubble */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 px-6 py-4 bg-white rounded-2xl shadow-xl border border-blue-50 self-start md:self-center"
            >
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center animate-pulse">
                <MousePointer2 size={18} />
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-950">Interface Protocol</p>
                <p className="text-[11px] font-bold text-slate-400 italic">"Click any tile to reveal technical intel."</p>
              </div>
            </motion.div>
          </div>
          
          <div className="max-w-4xl border-l-[8px] border-blue-100 pl-8 md:pl-16">
            <p className="text-lg md:text-xl lg:text-3xl text-slate-400 font-medium italic leading-relaxed">
              Everything you need to know about getting your business online, explained in plain English for busy professionals.
            </p>
          </div>
        </div>

        {/* 3x3 Grid of 3D Flip Cards - CLICK TRIGGERED */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {faqs.map((faq, i) => {
            const isFlipped = flippedIndex === i;
            return (
              <div 
                key={i} 
                className="relative h-[480px] w-full [perspective:2500px] cursor-pointer group"
                onClick={() => toggleFlip(i)}
              >
                <div className={`relative w-full h-full transition-all duration-[0.8s] [transform-style:preserve-3d] shadow-2xl rounded-[4rem] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
                  
                  {/* Front Face - Minimalist White */}
                  <div className="absolute inset-0 [backface-visibility:hidden] rounded-[4rem] bg-white border border-slate-100 flex flex-col justify-between p-14">
                    <div className="w-20 h-20 rounded-2xl bg-slate-50 flex items-center justify-center text-blue-600 border border-slate-100 group-hover:border-blue-600 group-hover:scale-105 transition-all duration-500">
                      {faq.icon}
                    </div>
                    <div className="space-y-6">
                      <h3 className="font-syne font-black text-slate-950 text-3xl leading-[1.1] tracking-tight uppercase">
                        {faq.q}
                      </h3>
                      <div className="flex items-center gap-4 text-blue-600 text-[11px] font-black uppercase tracking-[0.5em]">
                        ACCESS ANSWER <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>

                  {/* Back Face - Pure Minimalist Blue */}
                  <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-[4rem] bg-blue-600 flex flex-col justify-center items-center p-14 shadow-2xl text-center">
                    <div className="relative z-10 w-full">
                      <p className="font-syne font-black text-white text-xl md:text-[22px] leading-[1.4] italic mb-10 max-w-[280px] mx-auto">
                        "{faq.a}"
                      </p>
                      <div className="pt-8 border-t border-white/10 w-full max-w-[80px] mx-auto">
                        <span className="text-white/30 font-black text-[9px] uppercase tracking-[0.4em]">SABR DIGITAL</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-64 text-center">
          {/* Use navigateTo prop to go to contact section */}
          <button 
            onClick={() => navigateTo('contact')}
            className="px-14 md:px-20 py-8 md:py-10 bg-blue-600 text-white font-black rounded-full uppercase text-[13px] md:text-[15px] tracking-[0.6em] shadow-xl hover:bg-slate-950 transition-all transform hover:scale-110 active:scale-95 duration-500"
          >
            STILL HAVE QUESTIONS? JUST CALL US.
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;