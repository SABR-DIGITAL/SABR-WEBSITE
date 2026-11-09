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
  MapPin,
  FileText,
  Sparkles
} from 'lucide-react';
import { Page } from '../App';

const faqs = [
  { 
    icon: <DollarSign size={28} />, 
    q: "How much does a website cost?", 
    a: "Every site is priced on its own. After a short chat about what you need, you get one fixed price in writing covering design, build and launch. Nothing gets added on later." 
  },
  { 
    icon: <ShieldCheck size={28} />, 
    q: "Do I pay a deposit?", 
    a: "Yes, 25% up front to book your slot in the diary. The rest is due once you have seen the finished site and you are happy for it to go live." 
  },
  { 
    icon: <Clock size={28} />, 
    q: "How long does it take?", 
    a: "Most websites go live in up to 10 days after our first call. Larger builds take longer, and we will give you an honest date before you commit to anything." 
  },
  { 
    icon: <Smartphone size={28} />, 
    q: "Will it work on phones?", 
    a: "It is designed on a phone screen first, because that is where most of your customers will find you. We test on real phones, tablets and laptops before launch." 
  },
  { 
    icon: <RefreshCw size={28} />, 
    q: "Can I edit it myself?", 
    a: "Yes. You get a simple editor for text, photos and prices, plus a walkthrough. If you would rather not touch it, send us the changes and we will make them for you." 
  },
  { 
    icon: <Zap size={28} />, 
    q: "Do you offer hosting?", 
    a: "We can host it for you on a fast, secure network with backups included, for a small monthly fee. If you would rather host it somewhere else, that is fine too." 
  },
  { 
    icon: <Globe size={28} />, 
    q: "What about my domain?", 
    a: "We will register a new domain name for you or connect one you already own, email records included, so nothing goes offline while we make the switch." 
  },
  { 
    icon: <Search size={28} />, 
    q: "Will Google find me?", 
    a: "Every site is built with clean code, fast loading, proper page titles and local business markup, so you have a real chance of showing up when someone nearby searches for what you do." 
  },
  {
    icon: <Trophy size={28} />,
    q: "Who owns the website?",
    a: "You do, along with the domain and everything on it. Run it yourself using the training we give you, or put it on a care plan and we will look after the updates."
  },
  {
    icon: <MapPin size={28} />,
    q: "Which areas do you cover?",
    a: "We work with businesses wherever they are based. Everything happens by call, email and WhatsApp, so where you are makes no difference to how the site gets built."
  },
  {
    icon: <FileText size={28} />,
    q: "What if I don’t have text or photos?",
    a: "No problem at all. We write clear, persuasive website copy for you and can source high-resolution photography that fits your trade until you have your own project photos ready."
  },
  {
    icon: <Sparkles size={28} />,
    q: "Can you redesign my current website?",
    a: "Yes. We can rebuild your existing site from scratch so it looks modern and loads in under a second, while keeping your current domain name, business emails, and Google rankings intact."
  }
];

interface FAQSectionProps {
  navigateTo: (page: Page) => void;
}

const FAQSection: React.FC<FAQSectionProps> = ({ navigateTo }) => {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const toggleFlip = (index: number) => {
    setFlippedIndex(prev => prev === index ? null : index);
  };

  return (
    <section className="bg-[#fdfbf7] pt-24 md:pt-48 pb-28 md:pb-64 overflow-hidden px-5 md:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="mb-12 md:mb-40">
          <p className="mb-3.5 md:mb-6 text-[9px] md:text-[11px] font-black uppercase tracking-[0.45em] text-emerald-700">
            FAQ&rsquo;s
          </p>
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 md:gap-12 mb-6 md:mb-12">
            <div className="w-full overflow-hidden">
              <h2 className="font-syne text-[clamp(1.65rem,7vw,5rem)] sm:text-[clamp(2.5rem,8vw,5rem)] font-black text-slate-950 tracking-tighter uppercase leading-[0.92]">
                COMMON <br />
                <span className="text-shimmer-blue italic inline-block pr-2">QUESTIONS.</span>
              </h2>
            </div>

            {/* Interaction Hint Bubble */}
            <div className="flex items-center gap-3 md:gap-4 px-4 md:px-6 py-2.5 md:py-4 bg-white rounded-xl md:rounded-2xl shadow-lg md:shadow-xl border border-emerald-50 self-start lg:self-center shrink-0">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                <MousePointer2 size={15} />
              </div>
              <div className="space-y-0.5">
                <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-950">Tip</p>
                <p className="text-[10.5px] md:text-[11px] font-bold text-slate-400 italic">Tap any card to read the answer.</p>
              </div>
            </div>
          </div>
          
          <div className="max-w-3xl border-l-[4px] md:border-l-[8px] border-emerald-100 pl-5 md:pl-14">
            <p className="text-base md:text-xl lg:text-2xl text-slate-500 font-medium italic leading-relaxed">
              The questions we get asked most often, answered in plain English. If yours is not here, send us a message and we will answer it properly.
            </p>
          </div>
        </div>

        {/* Symmetrical 12-Card Grid (4x3 on Desktop, 6x2 on Tablet, Compact 2-per-scroll on Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-10">
          {faqs.map((faq, i) => {
            const isFlipped = flippedIndex === i;
            return (
              <div 
                key={i} 
                className="relative h-[210px] sm:h-[225px] md:h-[460px] w-full [perspective:2500px] cursor-pointer group"
                onClick={() => toggleFlip(i)}
              >
                <div className={`relative w-full h-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d] shadow-md md:shadow-2xl rounded-3xl md:rounded-[4rem] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
                  
                  {/* Front Face - Minimalist White with proper inner padding so icons and text never touch card edges */}
                  <div className="absolute inset-0 [backface-visibility:hidden] rounded-3xl md:rounded-[4rem] bg-white border border-slate-100 flex flex-col justify-between items-start p-6 sm:p-7 md:p-14 text-left overflow-hidden">
                    <div className="w-10 h-10 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-slate-50 flex items-center justify-center text-emerald-600 border border-slate-100 transition-colors duration-300 shrink-0 [&>svg]:w-[18px] [&>svg]:h-[18px] md:[&>svg]:w-7 md:[&>svg]:h-7">
                      {faq.icon}
                    </div>
                    <div className="space-y-2 md:space-y-5 w-full">
                      <h3 className="font-syne font-bold text-slate-900 text-[15px] sm:text-[17px] md:text-2xl leading-snug tracking-tight">
                        {faq.q}
                      </h3>
                      <div className="flex items-center justify-start gap-1.5 md:gap-3 text-emerald-600 text-[9px] md:text-[11px] font-bold uppercase tracking-[0.22em] md:tracking-[0.35em]">
                        <span>Read the answer</span>
                        <ChevronRight size={13} className="transition-transform group-hover:translate-x-1 shrink-0" />
                      </div>
                    </div>
                  </div>

                  {/* Back Face - Pure Minimalist Emerald with Clean Legible Typography */}
                  <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-3xl md:rounded-[4rem] bg-emerald-600 flex flex-col justify-center items-center p-6 sm:p-7 md:p-14 shadow-2xl text-center overflow-hidden">
                    <div className="relative z-10 w-full">
                      <div className="text-[8.5px] md:text-[10px] font-mono uppercase tracking-[0.28em] md:tracking-[0.35em] text-emerald-100 mb-1.5 md:mb-4 font-semibold">
                        Answer
                      </div>
                      <p className="font-inter font-normal text-white text-[12.5px] sm:text-[14px] md:text-[16.5px] leading-relaxed tracking-normal max-w-[340px] mx-auto md:mb-8">
                        {faq.a}
                      </p>
                      <div className="hidden md:block pt-6 border-t border-white/15 w-full max-w-[80px] mx-auto">
                        <span className="text-white/40 font-mono text-[9px] uppercase tracking-[0.3em]">SABR DIGITAL</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 md:mt-48 text-center">
          <button 
            onClick={() => navigateTo('contact')}
            className="px-8 md:px-20 py-4 md:py-10 bg-emerald-600 text-white font-black rounded-full uppercase text-[10.5px] md:text-[15px] tracking-[0.32em] md:tracking-[0.6em] shadow-xl hover:bg-slate-950 transition-all transform hover:scale-105 active:scale-95 duration-500"
          >
            STILL HAVE A QUESTION? MESSAGE US.
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;