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
  MousePointer2,
  MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
// Add import for Page type from App.tsx
import { Page } from '../App';

const faqs = [
  { 
    icon: <DollarSign size={32} />, 
    q: "How much does a website cost?", 
    a: "Every site is priced on its own. After a short chat about what you need, you get one fixed price in writing covering design, build and launch. Nothing gets added on later." 
  },
  { 
    icon: <ShieldCheck size={32} />, 
    q: "Do I pay a deposit?", 
    a: "Yes, 25% up front to book your slot in the diary. The rest is due once you have seen the finished site and you are happy for it to go live." 
  },
  { 
    icon: <Clock size={32} />, 
    q: "How long does it take?", 
    a: "Most websites go live two to three weeks after our first call. Larger builds take longer, and we will give you an honest date before you commit to anything." 
  },
  { 
    icon: <Smartphone size={32} />, 
    q: "Will it work on phones?", 
    a: "It is designed on a phone screen first, because that is where most of your customers will find you. We test on real phones, tablets and laptops before launch." 
  },
  { 
    icon: <RefreshCw size={32} />, 
    q: "Can I edit it myself?", 
    a: "Yes. You get a simple editor for text, photos and prices, plus a walkthrough. If you would rather not touch it, send us the changes and we will make them for you." 
  },
  { 
    icon: <Zap size={32} />, 
    q: "Do you offer hosting?", 
    a: "We can host it for you on a fast, secure network with backups included, for a small monthly fee. If you would rather host it somewhere else, that is fine too." 
  },
  { 
    icon: <Globe size={32} />, 
    q: "What about my domain?", 
    a: "We will register a new domain name for you or connect one you already own, email records included, so nothing goes offline while we make the switch." 
  },
  { 
    icon: <Search size={32} />, 
    q: "Will Google find me?", 
    a: "Every site is built with clean code, fast loading, proper page titles and local business markup, so you have a real chance of showing up when someone nearby searches for what you do." 
  },
  {
    icon: <Trophy size={32} />,
    q: "Who owns the website?",
    a: "You do, along with the domain and everything on it. Run it yourself using the training we give you, or put it on a care plan and we will look after the updates."
  },
  {
    icon: <MapPin size={32} />,
    q: "Which areas do you cover?",
    a: "We work with businesses wherever they are based. Everything happens by call, email and WhatsApp, so where you are makes no difference to how the site gets built."
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
    <section className="bg-[#fdfbf7] pt-32 md:pt-48 pb-64 overflow-hidden px-6">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="mb-32">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 mb-20">
            <div>
              <h2 className="font-syne text-[clamp(1.8rem,9vw,5rem)] font-black text-slate-950 tracking-tighter uppercase leading-[0.9] max-w-[90vw]">
                COMMON <br />
                <span className="text-shimmer-blue italic">QUESTIONS.</span>
              </h2>
            </div>

            {/* Interaction Hint Bubble */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 px-6 py-4 bg-white rounded-2xl shadow-xl border border-blue-50 self-start lg:self-center shrink-0"
            >
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center animate-pulse">
                <MousePointer2 size={18} />
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-950">Tip</p>
                <p className="text-[11px] font-bold text-slate-400 italic">Tap any card to read the answer.</p>
              </div>
            </motion.div>
          </div>
          
          <div className="max-w-4xl border-l-[8px] border-blue-100 pl-8 md:pl-16">
            <p className="text-lg md:text-xl lg:text-3xl text-slate-400 font-medium italic leading-relaxed">
              The questions we get asked most often, answered in plain English. If yours is not here, send us a message and we will answer it properly.
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
                className="relative h-[480px] w-full [perspective:2500px] cursor-pointer group transform-gpu will-change-transform"
                onClick={() => toggleFlip(i)}
              >
                <div className={`relative w-full h-full transition-all duration-[0.8s] [transform-style:preserve-3d] shadow-2xl rounded-[4rem] ${isFlipped ? '[transform:rotateY(180deg)]' : ''} transform-gpu will-change-transform`}>
                  
                  {/* Front Face - Minimalist White */}
                  <div className="absolute inset-0 [backface-visibility:hidden] rounded-[4rem] bg-white border border-slate-100 flex flex-col justify-center md:justify-between items-center md:items-start p-10 md:p-14 text-center md:text-left">
                    <div className="w-20 h-20 rounded-2xl bg-slate-50 flex items-center justify-center text-blue-600 border border-slate-100 transition-all duration-500 mb-8 md:mb-0">
                      {faq.icon}
                    </div>
                    <div className="space-y-6">
                      <h3 className="font-syne font-black text-slate-950 text-2xl md:text-3xl leading-[1.1] tracking-tight uppercase">
                        {faq.q}
                      </h3>
                      <div className="flex items-center justify-center md:justify-start gap-4 text-blue-600 text-[11px] font-black uppercase tracking-[0.5em]">
                        READ THE ANSWER <ChevronRight size={18} className="transition-transform" />
                      </div>
                    </div>
                  </div>

                  {/* Back Face - Pure Minimalist Blue */}
                  <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-[4rem] bg-blue-600 flex flex-col justify-center items-center p-14 shadow-2xl text-center">
                    <div className="relative z-10 w-full">
                      <p className="font-syne font-black text-white text-lg md:text-[19px] leading-[1.45] mb-10 max-w-[330px] mx-auto">
                        {faq.a}
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
            STILL HAVE A QUESTION? MESSAGE US.
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;