import React, { useState, useEffect } from 'react';
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { CheckCircle, ArrowRight, Instagram, Sparkles, Send } from 'lucide-react';
import CafeNavbar from './CafeNavbar';
import CafeFooter from './CafeFooter';
import { useCafeGlide, CAFE_GLIDE_STYLES } from './useCafeGlide';

const CafeContact: React.FC = () => {
  const [isSent, setIsSent] = useState(false);
  useCafeGlide(isSent);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
  };

  return (
    <div className="min-h-screen bg-[#FFF9F5] font-sans selection:bg-[#A4715E] selection:text-white overflow-x-hidden">
      <CafeNavbar />

      <section className="pt-44 md:pt-52 pb-24 px-6 text-center cafe-glide-up">
        <p className="text-[#A4715E] font-black text-[11px] uppercase tracking-[0.8em] mb-6">
          Establish A Connection
        </p>
        <h1 className="font-serif text-6xl md:text-[10vw] font-black uppercase tracking-tighter text-[#4A403A] leading-none">
          SAY <span className="text-[#A4715E] italic">HELLO.</span>
        </h1>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* LEFT STORY & PHOTO SLIDING IN FROM LEFT */}
          <div className="space-y-16 cafe-glide-left">
            <div className="space-y-8">
              <div className="w-20 h-1 bg-[#A4715E]" />
              <h2 className="font-serif text-5xl md:text-6xl font-bold text-[#4A403A] uppercase tracking-tighter leading-none">
                We&apos;d love to <br /> host you.
              </h2>
              <p className="text-[#A4715E]/80 text-xl md:text-2xl font-medium italic border-l-4 border-[#FDE2E4] pl-8 leading-relaxed max-w-lg">
                &ldquo;Whether you&apos;re planning an event, inquiring about our beans, or just sharing the love—our inbox is open.&rdquo;
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#A4715E]/60">Email Studio</p>
                <a
                  href="mailto:hello@thehearth.cafe"
                  className="block text-2xl font-bold text-[#4A403A] hover:text-[#A4715E] transition-colors break-words"
                >
                  hello@thehearth.cafe
                </a>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#A4715E]/60">Direct Line</p>
                <a
                  href="tel:01225482910"
                  className="block text-2xl font-bold text-[#4A403A] hover:text-[#A4715E] transition-colors"
                >
                  01225 482 910
                </a>
              </div>
            </div>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block relative aspect-video rounded-[3.5rem] overflow-hidden shadow-2xl border-[10px] border-white group"
            >
              <img
                src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&q=75&w=1000"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                alt="Cafe exterior window view"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4A403A]/65 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30">
                  <Instagram size={22} />
                </div>
                <span className="font-bold tracking-widest uppercase text-xs">@TheHearthCafe</span>
              </div>
            </a>
          </div>

          {/* RIGHT INQUIRY FORM SLIDING IN FROM RIGHT TOWARDS THE LEFT COLUMN */}
          <div className="cafe-glide-right bg-white p-10 md:p-16 rounded-[4rem] shadow-[0_40px_120px_rgba(164,113,94,0.12)] border border-[#A4715E]/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none rotate-12">
              <Send size={340} strokeWidth={1} />
            </div>

            {isSent ? (
              <div className="text-center py-20 space-y-10">
                <div className="w-20 h-20 bg-[#A4715E] text-white flex items-center justify-center rounded-full mx-auto shadow-xl">
                  <CheckCircle size={42} />
                </div>
                <div className="space-y-3">
                  <h3 className="font-serif text-4xl font-bold text-[#4A403A]">Message Sent.</h3>
                  <p className="text-[#A4715E]/80 italic font-medium text-lg leading-relaxed max-w-md mx-auto">
                    &ldquo;We&apos;ve caught your note. One of our team will be in touch within a few hours.&rdquo;
                  </p>
                </div>
                <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                  <Link
                    to="/demo/cafe"
                    className="px-10 py-5 bg-[#4A403A] text-white rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-[#A4715E] transition-all"
                  >
                    Back to Home
                  </Link>
                  <button
                    type="button"
                    onClick={() => setIsSent(false)}
                    className="px-10 py-5 bg-[#FFF9F5] border border-[#A4715E]/25 text-[#4A403A] rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-[#FDE2E4] transition-all cursor-pointer"
                  >
                    Send Another Note
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                <div className="space-y-3">
                  <h3 className="font-serif text-4xl font-bold text-[#4A403A] tracking-tighter">Inquiry Form</h3>
                  <div className="w-12 h-1 bg-[#FDE2E4]" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.4em] text-[#A4715E] font-black block pl-2">
                      Your Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Full name"
                      className="w-full bg-[#FFF9F5] border border-[#A4715E]/15 rounded-2xl p-5 text-[#4A403A] focus:outline-none focus:border-[#A4715E] focus:bg-white transition-all font-bold text-base shadow-sm"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.4em] text-[#A4715E] font-black block pl-2">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="you@example.com"
                      className="w-full bg-[#FFF9F5] border border-[#A4715E]/15 rounded-2xl p-5 text-[#4A403A] focus:outline-none focus:border-[#A4715E] focus:bg-white transition-all font-bold text-base shadow-sm"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.4em] text-[#A4715E] font-black block pl-2">
                    Subject
                  </label>
                  <select
                    required
                    className="w-full bg-[#FFF9F5] border border-[#A4715E]/15 rounded-2xl p-5 text-[#4A403A] focus:outline-none focus:border-[#A4715E] focus:bg-white transition-all font-bold text-base shadow-sm cursor-pointer"
                  >
                    <option>General Inquiry</option>
                    <option>Private Hire / Events</option>
                    <option>Special Orders &amp; Cakes</option>
                    <option>Wholesale Partnerships</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.4em] text-[#A4715E] font-black block pl-2">
                    Your Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="How can we help?"
                    className="w-full bg-[#FFF9F5] border border-[#A4715E]/15 rounded-2xl p-5 text-[#4A403A] focus:outline-none focus:border-[#A4715E] focus:bg-white transition-all font-bold text-base shadow-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-7 bg-[#4A403A] text-white font-black uppercase tracking-[0.5em] text-xs rounded-2xl flex items-center justify-center gap-4 shadow-xl hover:bg-[#A4715E] transition-all duration-300 cursor-pointer group"
                >
                  <span>Send Message</span>
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </button>

                <div className="flex items-center justify-center gap-3 text-[#A4715E]/60">
                  <Sparkles size={14} />
                  <span className="text-[9px] font-black uppercase tracking-[0.4em]">
                    Response within 24 business hours
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <CafeFooter />
      <style>{CAFE_GLIDE_STYLES}</style>
    </div>
  );
};

export default CafeContact;
