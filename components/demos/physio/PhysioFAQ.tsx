
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Plus, Minus, MoveRight, Leaf } from 'lucide-react';
import PhysioNavbar from './PhysioNavbar';
import PhysioFooter from './PhysioFooter';
import ExitPreviewButton from '../../ExitPreviewButton';
import { Link } from 'react-router-dom';

const faqs = [
  { q: "What should I wear?", a: "Comfort is key. We suggest loose clothing or gym wear. Shorts are best for leg assessments, and a vest top for shoulder work." },
  { q: "How long are sessions?", a: "Initial assessments are 60 minutes. Follow-up treatments are 45 minutes of focused clinical care." },
  { q: "Do I need a referral?", a: "No. You can book with us directly. We'll only need your GP's details if requested by your insurance provider." },
  { q: "Can I use insurance?", a: "Yes. We work with all major UK providers including BUPA and AXA. Bring your policy details and auth code." },
  { q: "Is there parking?", a: "Yes, we have dedicated patient spaces right outside our Bath studio entrance for easy access." }
];

const PhysioFAQ: React.FC = () => {
  useEffect(() => window.scrollTo(0, 0), []);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[#f8faf9] font-inter selection:bg-emerald-200">
      <ExitPreviewButton />
      <PhysioNavbar />

      <section className="pt-48 pb-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-24 space-y-6">
            <span className="text-emerald-600 font-bold text-xs uppercase tracking-[0.4em]">Patient Support</span>
            <h1 className="font-serif text-5xl md:text-7xl text-emerald-950 font-bold tracking-tight leading-none">Guidance & <span className="text-emerald-600 italic">Intel.</span></h1>
            <p className="text-emerald-800/60 text-lg md:text-xl font-medium max-w-xl mx-auto italic">"Clear answers for a friction-free recovery."</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div 
                key={faq.q} 
                className={`rounded-[2rem] border transition-all duration-500 overflow-hidden ${openIndex === i ? 'bg-emerald-900 border-emerald-900 shadow-2xl p-10 md:p-12' : 'bg-white border-emerald-100 hover:border-emerald-300 p-8 md:p-10'}`}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <button className="w-full flex items-center justify-between text-left group">
                  <div className="flex items-center gap-6">
                     <span className={`font-serif text-lg font-bold transition-colors ${openIndex === i ? 'text-emerald-300' : 'text-emerald-600'}`}>0{i + 1}.</span>
                     <h3 className={`font-serif text-xl md:text-2xl font-bold tracking-tight transition-colors ${openIndex === i ? 'text-white' : 'text-emerald-950'}`}>{faq.q}</h3>
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${openIndex === i ? 'bg-white/10 text-white border-white/20 rotate-180' : 'bg-emerald-50 text-emerald-600 border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white'}`}>
                    {openIndex === i ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="pt-8"
                    >
                      <p className="text-xl text-emerald-100/60 font-medium italic leading-relaxed border-l-2 border-emerald-500/30 pl-10">"{faq.a}"</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="mt-32 text-center space-y-10">
             <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <HelpCircle size={32} />
             </div>
             <h4 className="font-serif text-3xl font-bold text-emerald-950">Still curious about your recovery?</h4>
             <Link to="/demo/physio/contact" className="inline-flex items-center gap-4 px-12 py-6 bg-emerald-700 text-white rounded-2xl font-bold text-sm tracking-wide shadow-xl hover:bg-emerald-900 transition-all group">
                MESSAGE RECEPTION <MoveRight size={20} className="group-hover:translate-x-2 transition-transform" />
             </Link>
          </div>
        </div>
      </section>

      <PhysioFooter />
    </div>
  );
};

export default PhysioFAQ;
