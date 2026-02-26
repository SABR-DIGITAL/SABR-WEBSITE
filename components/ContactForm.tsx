import React, { useState, useEffect, useRef } from 'react';
import { Send, Instagram, Mail, CheckCircle, Zap, Phone, Briefcase, User } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ContactForm: React.FC = () => {
  const [isSent, setIsSent] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-info-box", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "expo.out"
      });

      gsap.from(".contact-form-box", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
        },
        scale: 0.98,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const myForm = e.currentTarget;
    const formData = new FormData(myForm);
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData as any).toString(),
    })
      .then(() => setIsSent(true))
      .catch((error) => alert(error));
  };

  return (
    <section ref={sectionRef} className="bg-[#fdfbf7] min-h-[100dvh] flex items-center justify-center py-20 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT SIDE: COMPACT INFO */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-4 mb-10">
              <h2 className="font-syne text-5xl md:text-7xl font-black text-slate-950 tracking-tighter uppercase leading-none">
                LET'S <br />
                <span className="text-shimmer-blue italic">IGNITE.</span>
              </h2>
              <p className="text-lg text-slate-400 font-medium italic border-l-4 border-blue-100 pl-6">
                Elite engineering starts here.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <a 
                href="mailto:SABRDIGITALWILTS@GMAIL.COM"
                className="contact-info-box flex items-center gap-5 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:border-blue-400 transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform"><Mail size={20} /></div>
                <div>
                  <p className="text-[8px] uppercase tracking-[0.3em] text-slate-300 font-black mb-0.5">Email</p>
                  <p className="text-slate-950 font-black text-xs md:text-sm break-all">SABRDIGITALWILTS@GMAIL.COM</p>
                </div>
              </a>

              <a 
                href="https://instagram.com/sabrdigital" 
                target="_blank" 
                rel="noopener noreferrer"
                className="contact-info-box flex items-center gap-5 p-6 bg-white rounded-3xl border border-slate-200 shadow-md hover:border-blue-400 transition-all group !opacity-100"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform"><Instagram size={20} /></div>
                <div>
                  <p className="text-[8px] uppercase tracking-[0.3em] text-slate-300 font-black mb-0.5">Instagram</p>
                  <p className="text-slate-950 font-black text-sm">@sabrdigital</p>
                </div>
              </a>

              <div className="contact-info-box p-6 bg-blue-600 rounded-3xl text-white shadow-xl flex items-center gap-4">
                 <Zap size={24} className="animate-pulse" />
                 <p className="font-black text-[10px] uppercase tracking-[0.2em]">WE RESPOND WITHIN 12 HOURS!</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: COMPACT FORM */}
          <div className="contact-form-box lg:col-span-8 p-8 md:p-12 bg-white rounded-[3rem] border border-white shadow-2xl relative overflow-hidden">
            {isSent ? (
              <div className="text-center py-12 space-y-6">
                <CheckCircle size={60} className="mx-auto text-green-500 animate-bounce" />
                <h3 className="font-syne font-black text-3xl text-slate-950 uppercase">SYNC INITIATED</h3>
                <p className="text-slate-400 italic">"We'll be in touch shortly."</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10" name="contact" method="POST" data-netlify="true">
                <input type="hidden" name="form-name" value="contact" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-[0.4em] text-slate-400 font-black block pl-2">Full Name *</label>
                    <input required type="text" name="name" placeholder="Your Name" className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-5 text-slate-900 focus:outline-none focus:border-blue-500 transition-all font-bold text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-[0.4em] text-slate-400 font-black block pl-2">Email Address *</label>
                    <input required type="email" name="email" placeholder="you@example.com" className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-5 text-slate-900 focus:outline-none focus:border-blue-500 transition-all font-bold text-sm" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-[0.4em] text-slate-400 font-black block pl-2">Phone Number</label>
                    <input type="tel" name="phone" placeholder="Optional" className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-5 text-slate-900 focus:outline-none focus:border-blue-500 transition-all font-bold text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-[0.4em] text-slate-400 font-black block pl-2">Industry *</label>
                    <input required type="text" name="sector" placeholder="Your Sector" className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-5 text-slate-900 focus:outline-none focus:border-blue-500 transition-all font-bold text-sm" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-[0.4em] text-slate-400 font-black block pl-2">Your Message *</label>
                  <textarea required name="message" rows={4} placeholder="Project requirements..." className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-5 text-slate-900 focus:outline-none focus:border-blue-500 transition-all font-bold text-sm resize-none" />
                </div>

                <button 
                  type="submit"
                  className="w-full py-6 bg-slate-950 text-white rounded-2xl font-black uppercase tracking-[0.6em] text-[12px] flex items-center justify-center gap-4 hover:bg-blue-600 transition-all transform active:scale-95 shadow-xl"
                >
                  SEND MESSAGE <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;