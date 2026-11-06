import React, { useState, useEffect } from 'react';
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import {
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Heart,
  CalendarCheck,
  Info,
  MapPin
} from 'lucide-react';
import CafeNavbar from './CafeNavbar';
import CafeFooter from './CafeFooter';
import { CAFE_LOCATIONS } from './CafeHome';
import { useCafeGlide, CAFE_GLIDE_STYLES } from './useCafeGlide';

const CafeBooking: React.FC = () => {
  const [isSent, setIsSent] = useState(false);
  const [formData, setFormData] = useState({
    location: CAFE_LOCATIONS[0].name,
    name: '',
    email: '',
    guests: '2',
    date: '',
    time: '10:00 AM'
  });

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

      <div className="flex flex-col lg:flex-row min-h-screen pt-24">
        <div className="w-full lg:w-[42%] bg-[#4A403A] p-10 md:p-20 flex flex-col justify-between text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-25">
            <img
              src="/images/projects/cafe-interior.webp"
              className="w-full h-full object-cover"
              alt="Cafe Interior"
              loading="eager"
              fetchPriority="high"
              decoding="sync"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#4A403A]/85 via-[#4A403A]/90 to-[#4A403A]" />

          <div className="relative z-10 space-y-12 my-auto cafe-glide-left">
            <Link
              to="/demo/cafe"
              className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.45em] text-[#FDE2E4] hover:text-white transition-colors"
            >
              <ArrowLeft size={16} /> Back to Home
            </Link>

            <div className="space-y-6">
              <h1 className="font-serif text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                Find Your <br />
                <span className="text-[#FDE2E4] italic">Hearth.</span>
              </h1>
              <p className="text-lg text-white/75 font-medium italic leading-relaxed max-w-sm">
                &ldquo;We hold space for quiet mornings, celebratory brunches, and everything in between.&rdquo;
              </p>
            </div>

            <div className="space-y-8 pt-6">
              <div className="flex gap-5 items-start">
                <div className="w-12 h-12 bg-[#A4715E] flex items-center justify-center rounded-2xl text-white shadow-xl shrink-0">
                  <CalendarCheck size={22} />
                </div>
                <div>
                  <h2 className="font-bold text-base uppercase tracking-tight">Instant Confirmation</h2>
                  <p className="text-sm text-white/65 italic">Secure your table at any of our three houses.</p>
                </div>
              </div>
              <div className="flex gap-5 items-start">
                <div className="w-12 h-12 bg-white/10 flex items-center justify-center rounded-2xl text-[#FDE2E4] shrink-0">
                  <Heart size={22} />
                </div>
                <div>
                  <h2 className="font-bold text-base uppercase tracking-tight">Special Requests?</h2>
                  <p className="text-sm text-white/65 italic">
                    For parties over 8,{' '}
                    <Link to="/demo/cafe/contact" className="underline text-[#FDE2E4] hover:text-white">
                      contact our events team
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-[#FFF9F5] flex flex-col items-center justify-center p-8 md:p-20">
          <div className="max-w-xl w-full cafe-glide-right">
            {isSent ? (
              <div className="bg-white p-12 md:p-16 rounded-[3rem] shadow-2xl text-center space-y-8 border border-[#A4715E]/15">
                <div className="w-20 h-20 bg-[#A4715E] text-white flex items-center justify-center rounded-full mx-auto shadow-xl">
                  <CheckCircle size={40} />
                </div>
                <h2 className="font-serif text-4xl font-black text-[#4A403A] uppercase tracking-tighter">
                  Table Reserved!
                </h2>
                <p className="text-lg text-[#A4715E] italic">
                  &ldquo;We&apos;ve got you, {formData.name}. Table for {formData.guests} at{' '}
                  <strong>{formData.location}</strong> on {formData.date} at {formData.time}.&rdquo;
                </p>
                <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                  <Link
                    to="/demo/cafe"
                    className="px-10 py-5 bg-[#4A403A] text-white font-black text-[11px] uppercase tracking-widest rounded-2xl hover:bg-[#A4715E] transition-all shadow-lg"
                  >
                    Back To Home
                  </Link>
                  <Link
                    to="/demo/cafe/menu"
                    className="px-10 py-5 bg-[#FFF9F5] border border-[#A4715E]/25 text-[#4A403A] font-black text-[11px] uppercase tracking-widest rounded-2xl hover:bg-[#FDE2E4] transition-all"
                  >
                    Preview Menu
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 sm:p-12 rounded-[3rem] shadow-xl border border-[#A4715E]/10">
                <div className="space-y-2">
                  <h2 className="font-serif text-4xl font-black text-[#4A403A] tracking-tighter uppercase">
                    Reserve A Table.
                  </h2>
                  <p className="text-sm text-[#A4715E]/80 font-medium italic">
                    &ldquo;Join us for a moment of peace and the perfect roast.&rdquo;
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.4em] text-[#A4715E] font-black flex items-center gap-2 pl-2">
                    <MapPin size={12} />
                    <span>Select Location</span>
                  </label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-[#FFF9F5] border border-[#A4715E]/15 rounded-2xl p-5 text-[#4A403A] focus:outline-none focus:border-[#A4715E] transition-all font-bold cursor-pointer"
                  >
                    {CAFE_LOCATIONS.map((loc) => (
                      <option key={loc.id} value={loc.name}>
                        {loc.name} — {loc.address}, {loc.city}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.4em] text-[#A4715E] font-black block pl-2">
                      Date
                    </label>
                    <input
                      required
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-[#FFF9F5] border border-[#A4715E]/15 rounded-2xl p-5 text-[#4A403A] focus:outline-none focus:border-[#A4715E] transition-all font-bold"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.4em] text-[#A4715E] font-black block pl-2">
                      Time
                    </label>
                    <select
                      required
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full bg-[#FFF9F5] border border-[#A4715E]/15 rounded-2xl p-5 text-[#4A403A] focus:outline-none focus:border-[#A4715E] transition-all font-bold cursor-pointer"
                    >
                      <option>09:00 AM</option>
                      <option>10:00 AM</option>
                      <option>11:00 AM</option>
                      <option>12:00 PM</option>
                      <option>01:00 PM</option>
                      <option>02:00 PM</option>
                      <option>03:00 PM</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.4em] text-[#A4715E] font-black block pl-2">
                    Guests
                  </label>
                  <div className="flex gap-3">
                    {['1', '2', '4', '6'].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setFormData({ ...formData, guests: num })}
                        className={`flex-1 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all cursor-pointer ${
                          formData.guests === num
                            ? 'bg-[#4A403A] text-white shadow-lg'
                            : 'bg-[#FFF9F5] border border-[#A4715E]/15 text-[#4A403A] hover:border-[#A4715E]'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-[#A4715E]/10 pt-6">
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.4em] text-[#A4715E] font-black block pl-2">
                      Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#FFF9F5] border border-[#A4715E]/15 rounded-2xl p-5 text-[#4A403A] focus:outline-none focus:border-[#A4715E] transition-all font-bold"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.4em] text-[#A4715E] font-black block pl-2">
                      Email
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="you@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#FFF9F5] border border-[#A4715E]/15 rounded-2xl p-5 text-[#4A403A] focus:outline-none focus:border-[#A4715E] transition-all font-bold"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-6 bg-[#A4715E] text-white font-black uppercase tracking-[0.5em] text-xs rounded-2xl flex items-center justify-center gap-4 shadow-xl hover:bg-[#4A403A] transition-all duration-300 cursor-pointer group"
                >
                  <span>Confirm Booking</span>
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </button>

                <div className="flex items-center justify-center gap-2.5 text-[#A4715E]/60">
                  <Info size={14} />
                  <span className="text-[9px] font-black uppercase tracking-[0.4em]">
                    Confirmation email sent instantly
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <CafeFooter />
      <style>{CAFE_GLIDE_STYLES}</style>
    </div>
  );
};

export default CafeBooking;