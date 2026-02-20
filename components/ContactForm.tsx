import React, { useState, useEffect } from 'react';
import { Send, Instagram, Mail, CheckCircle, Zap } from 'lucide-react';

const ContactForm: React.FC = () => {
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
  };

  return (
    <section className="bg-[#fdfbf7] pt-48 pb-64 overflow-hidden px-6 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section - MATCHING PROJECTS PAGE EXACTLY */}
        <div className="mb-64">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-[2px] w-20 bg-blue-600"></div>
            <span className="text-blue-600 font-black text-[13px] uppercase tracking-[1em]">GET IN TOUCH</span>
          </div>
          
          <h2 className="font-syne text-5xl md:text-7xl font-black text-slate-950 tracking-tighter uppercase leading-tight mb-12">
            LET'S <br />
            <span className="text-shimmer-blue italic">IGNITE.</span>
          </h2>
          
          <div className="max-w-4xl border-l-[8px] border-blue-100 pl-16">
            <p className="text-xl md:text-3xl text-slate-400 font-medium italic leading-relaxed">
              Get in touch with us. Tell us about your project and we'll help you grow your business through elite architectural engineering.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div className="space-y-10">
             <div className="p-12 bg-white rounded-[3rem] border border-slate-100 shadow-xl group hover:border-blue-400 transition-all">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-10"><Mail size={28} /></div>
                <p className="text-[11px] uppercase tracking-[0.4em] text-slate-300 font-black mb-3">Email Us</p>
                <p className="text-slate-950 font-black text-2xl break-all">studio@sabrdigital.com</p>
             </div>
             <div className="p-12 bg-white rounded-[3rem] border border-slate-100 shadow-xl group hover:border-blue-400 transition-all">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-10"><Instagram size={28} /></div>
                <p className="text-[11px] uppercase tracking-[0.4em] text-slate-300 font-black mb-3">Our Socials</p>
                <p className="text-slate-950 font-black text-2xl">@sabrdigital</p>
             </div>
          </div>

          <div className="p-14 md:p-20 rounded-[4rem] border border-white shadow-[0_50px_100px_rgba(0,0,0,0.08)] bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none"><Zap size={300} /></div>
            <form onSubmit={handleSubmit} className="space-y-12 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-[0.6em] text-slate-400 font-black block pl-4">Full Name</label>
                  <input required type="text" placeholder="Your Name" className="w-full bg-slate-50 border border-slate-100 rounded-3xl p-8 text-slate-900 focus:outline-none focus:border-blue-500 transition-all font-bold text-lg" />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-[0.6em] text-slate-400 font-black block pl-4">Email Address</label>
                  <input required type="email" placeholder="you@example.com" className="w-full bg-slate-50 border border-slate-100 rounded-3xl p-8 text-slate-900 focus:outline-none focus:border-blue-500 transition-all font-bold text-lg" />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-[0.6em] text-slate-400 font-black block pl-4">Your Message</label>
                <textarea rows={4} placeholder="What are your goals?" className="w-full bg-slate-50 border border-slate-100 rounded-3xl p-8 text-slate-900 focus:outline-none focus:border-blue-500 transition-all font-bold text-lg resize-none" />
              </div>
              <button 
                type="submit"
                className={`w-full py-10 rounded-[2.5rem] font-black uppercase tracking-[0.8em] text-[15px] flex items-center justify-center gap-6 transition-all transform active:scale-95 shadow-2xl ${isSent ? 'bg-green-500 text-white' : 'bg-slate-950 text-white hover:bg-blue-600'}`}
              >
                {isSent ? <CheckCircle size={30} /> : <>SEND MESSAGE <Send size={24} /></>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;