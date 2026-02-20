import React, { useState, useEffect } from 'react';
// Fix react-router-dom missing exports
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { motion as framerMotion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  Heart,
  CalendarCheck,
  Info
} from 'lucide-react';
import ExitPreviewButton from '../../ExitPreviewButton';
import CafeNavbar from './CafeNavbar';

// Fix motion types by casting to any
const motion = framerMotion as any;

const CafeBooking: React.FC = () => {
  const [isSent, setIsSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    guests: '2',
    date: '',
    time: '10:00 AM'
  });

  useEffect(() => window.scrollTo(0, 0), []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => setIsSent(true), 1200);
  };

  return (
    <div className="min-h-screen bg-[#FFF9F5] font-sans selection:bg-[#A4715E] selection:text-white">
      <ExitPreviewButton />
      <CafeNavbar />

      <div className="flex flex-col lg:flex-row min-h-screen pt-20">
        <div className="w-full lg:w-[40%] bg-[#4A403A] p-12 md:p-24 flex flex-col justify-between text-white relative overflow-hidden">
          {/* Added high-quality background image to side panel */}
          <div className="absolute inset-0 opacity-20 grayscale brightness-50">
             <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Cafe Interior" />
          </div>
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,#A4715E_0%,transparent_50%)] opacity-30"></div>
          
          <div className="relative z-10 space-y-12">
            <Link to="/demo/cafe" className="inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.5em] text-[#FDE2E4] hover:text-white transition-colors mb-12">
              <ArrowLeft size={16} /> Back to Home
            </Link>
            
            <div className="space-y-6">
              <h1 className="font-serif text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">Find Your <br /><span className="text-[#FDE2E4] italic">Hearth.</span></h1>
              <p className="text-xl text-white/40 font-medium italic leading-relaxed max-sm">
                "We hold space for quiet mornings, celebratory brunches, and everything in between."
              </p>
            </div>

            <div className="space-y-10 pt-12">
               <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-[#A4715E] flex items-center justify-center rounded-2xl text-white shadow-xl shrink-0">
                    <CalendarCheck size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg uppercase tracking-tight">Instant Confirmation</h4>
                    <p className="text-sm text-white/30 italic">Secure your spot in seconds.</p>
                  </div>
               </div>
               <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-2xl text-white/40 shrink-0">
                    <Heart size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg uppercase tracking-tight opacity-40">Special Requests?</h4>
                    <p className="text-sm text-white/20 italic">For parties over 8, please email us directly.</p>
                  </div>
               </div>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-[#FFF9F5] flex flex-col items-center justify-center p-8 md:p-24">
          <div className="max-w-xl w-full">
            <AnimatePresence mode="wait">
              {isSent ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-20 rounded-[3rem] shadow-3xl text-center space-y-10 border border-[#A4715E]/5">
                  <div className="w-20 h-20 bg-[#A4715E] text-white flex items-center justify-center rounded-full mx-auto shadow-2xl animate-bounce"><CheckCircle size={40} /></div>
                  <h3 className="font-serif text-4xl font-black text-[#4A403A] uppercase tracking-tighter">Table Reserved!</h3>
                  <p className="text-lg text-[#A4715E]/60 italic">"We've got you, {formData.name}. See you on {formData.date} at {formData.time}."</p>
                  <div className="pt-6">
                    <Link to="/demo/cafe" className="px-14 py-6 bg-[#4A403A] text-white font-black text-[11px] uppercase tracking-widest rounded-2xl hover:bg-[#A4715E] transition-all shadow-lg">Back To Home</Link>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-12">
                  <div className="space-y-4">
                    <h2 className="font-serif text-4xl font-black text-[#4A403A] tracking-tighter uppercase">Reserve A Table.</h2>
                    <p className="text-sm text-[#A4715E]/60 font-medium italic">"Join us for a moment of peace and the perfect roast."</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <label className="text-[10px] uppercase tracking-[0.6em] text-[#A4715E]/40 font-black block pl-4">Date</label>
                      <input required type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full bg-white border border-slate-100 rounded-2xl p-6 text-[#4A403A] focus:outline-none focus:border-[#A4715E] transition-all font-bold shadow-sm" />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] uppercase tracking-[0.6em] text-[#A4715E]/40 font-black block pl-4">Time</label>
                      <select required value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} className="w-full bg-white border border-slate-100 rounded-2xl p-6 text-[#4A403A] focus:outline-none focus:border-[#A4715E] transition-all font-bold shadow-sm appearance-none cursor-pointer">
                        <option>09:00 AM</option><option>10:00 AM</option><option>11:00 AM</option><option>12:00 PM</option><option>01:00 PM</option><option>02:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-[0.6em] text-[#A4715E]/40 font-black block pl-4">Guests</label>
                    <div className="flex gap-4">
                      {['1', '2', '4', '6'].map(num => (
                        <button key={num} type="button" onClick={() => setFormData({...formData, guests: num})} className={`flex-1 py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${formData.guests === num ? 'bg-[#4A403A] text-white shadow-xl' : 'bg-white border border-slate-100 text-[#A4715E]/30'}`}>{num}</button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-[#A4715E]/5 pt-12">
                    <div className="space-y-4">
                      <label className="text-[10px] uppercase tracking-[0.6em] text-[#A4715E]/40 font-black block pl-4">Name</label>
                      <input required type="text" placeholder="Full name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-white border border-slate-100 rounded-2xl p-6 text-[#4A403A] focus:outline-none focus:border-[#A4715E] transition-all font-bold shadow-sm" />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] uppercase tracking-[0.6em] text-[#A4715E]/40 font-black block pl-4">Email</label>
                      <input required type="email" placeholder="you@email.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-white border border-slate-100 rounded-2xl p-6 text-[#4A403A] focus:outline-none focus:border-[#A4715E] transition-all font-bold shadow-sm" />
                    </div>
                  </div>

                  <button type="submit" className="w-full py-10 bg-[#A4715E] text-white font-black uppercase tracking-[0.8em] text-[15px] rounded-3xl flex items-center justify-center gap-6 shadow-[0_25px_60px_rgba(164,113,94,0.3)] hover:bg-[#4A403A] transition-all duration-500 transform active:scale-95 group overflow-hidden relative">
                    <span className="relative z-10">Confirm Booking</span>
                    <ArrowRight size={24} className="relative z-10 group-hover:translate-x-3 transition-transform" />
                    <div className="absolute inset-0 bg-[#4A403A] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500"></div>
                  </button>
                  
                  <div className="flex items-center justify-center gap-3 text-[#A4715E]/30">
                    <Info size={14} />
                    <span className="text-[9px] font-black uppercase tracking-[0.4em]">Confirmation email sent instantly</span>
                  </div>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CafeBooking;