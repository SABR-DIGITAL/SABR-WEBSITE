import React, { useState, useEffect } from 'react';
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { MapPin, Phone, Mail, Clock, Send, Check, ShieldCheck, Compass, Plane } from 'lucide-react';
import SpaNavbar from './SpaNavbar';
import SpaFooter from './SpaFooter';
import SpaBookingModal from './SpaBookingModal';
import { SPA_DATA } from './spaData';

export const SpaContact: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'General Inquiries & Bookings',
    message: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        interest: 'General Inquiries & Bookings',
        message: ''
      });
    }, 4000);
  };

  return (
    <div className="bg-[#070908] text-[#ECE7DF] min-h-screen font-sans selection:bg-emerald-500 selection:text-slate-950">
      <SpaNavbar onOpenBooking={() => setIsBookingOpen(true)} />

      {/* HERO BANNER */}
      <div className="relative pt-44 pb-24 px-6 md:px-14 bg-[#0A0D0C] border-b border-white/10">
        <div className="max-w-6xl mx-auto text-center space-y-6">
          <span className="text-[10px] uppercase tracking-[0.45em] text-emerald-400 font-mono font-bold block">
            CONCIERGE & ACCESS
          </span>
          <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-bold uppercase text-white tracking-wider">
            CONTACT & LOCATION
          </h1>
          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-white/60 font-light leading-relaxed">
            Our VIP Concierge team is available 24/7 to coordinate private airport transfers, 
            helicopter landing slots, bespoke spa itineraries and custom forest retreats.
          </p>
        </div>
      </div>

      {/* MAIN CONTACT SECTION */}
      <div className="max-w-6xl mx-auto px-6 md:px-14 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* LEFT: INFO & TRANSFERS */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 sm:p-10 bg-[#0C100E] border border-white/10 space-y-6 shadow-xl">
              <h3 className="font-cinzel text-2xl font-bold uppercase text-white">
                RESERVE SANCTUARY
              </h3>

              <div className="space-y-5 text-xs">
                <div className="flex items-start gap-4">
                  <MapPin className="text-emerald-400 shrink-0 mt-1" size={18} />
                  <div>
                    <span className="font-bold text-white block font-mono">Estate Address</span>
                    <p className="text-white/70 leading-relaxed">{SPA_DATA.brand.address}</p>
                    <span className="font-mono text-emerald-400 text-[11px] block mt-0.5">
                      GPS: {SPA_DATA.brand.coordinates}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="text-emerald-400 shrink-0 mt-1" size={18} />
                  <div>
                    <span className="font-bold text-white block font-mono">Direct Concierge Telephone</span>
                    <a href={`tel:${SPA_DATA.brand.phone}`} className="text-white/70 hover:text-emerald-400 transition-colors font-mono">
                      {SPA_DATA.brand.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="text-emerald-400 shrink-0 mt-1" size={18} />
                  <div>
                    <span className="font-bold text-white block font-mono">Inquiries Email</span>
                    <a href={`mailto:${SPA_DATA.brand.email}`} className="text-white/70 hover:text-emerald-400 transition-colors">
                      {SPA_DATA.brand.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="text-emerald-400 shrink-0 mt-1" size={18} />
                  <div>
                    <span className="font-bold text-white block font-mono">Reception & Gate Access</span>
                    <p className="text-white/70 leading-relaxed">24 Hours / 7 Days · Gated Security Barrier</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <Link
                  to="/demo/spa/transfers"
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 hover:text-white transition-colors"
                >
                  <Plane size={14} />
                  <span>VIEW HELIPAD & FLIGHT COORDINATION →</span>
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT: CONTACT FORM (SHARP SQUARES) */}
          <div className="lg:col-span-7 bg-[#0C100E] border border-white/15 p-8 sm:p-12 shadow-2xl">
            <div className="space-y-3 mb-8">
              <span className="text-[10px] uppercase tracking-[0.35em] text-emerald-400 font-mono block font-bold">
                DIRECT INQUIRY
              </span>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold uppercase text-white">
                MESSAGE THE CONCIERGE
              </h3>
            </div>

            {isSent ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <Check size={24} />
                </div>
                <h4 className="font-cinzel text-xl font-bold uppercase text-white">Message Dispatched</h4>
                <p className="text-xs text-white/60 max-w-sm mx-auto leading-relaxed">
                  Thank you. Our VIP Concierge team will review your inquiry and reply within 4 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-widest text-white/50 mb-2">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Lady / Mr. Jonathan Hayes"
                      className="w-full bg-[#141B18] border border-white/20 px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-widest text-white/50 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jonathan@domain.co.uk"
                      className="w-full bg-[#141B18] border border-white/20 px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-widest text-white/50 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+44 7900 000000"
                      className="w-full bg-[#141B18] border border-white/20 px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-widest text-white/50 mb-2">
                      Subject Matter
                    </label>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full bg-[#141B18] border border-white/20 px-4 py-3 text-xs font-mono text-white focus:outline-none focus:border-emerald-400"
                    >
                      <option value="General Inquiries & Bookings">General Inquiries & Bookings</option>
                      <option value="Presidential Villa Buyout">Presidential Villa Buyout</option>
                      <option value="Thermal Spa Membership">Thermal Spa Membership</option>
                      <option value="Private Dining & Events">Private Dining & Events</option>
                      <option value="Helipad & Flight Logistics">Helipad & Flight Logistics</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-mono tracking-widest text-white/50 mb-2">
                    Message / Special Requirements
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How may our concierge assist your stay?"
                    className="w-full bg-[#141B18] border border-white/20 px-4 py-3 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-white hover:bg-emerald-400 hover:text-slate-950 text-slate-950 font-bold text-xs uppercase tracking-[0.25em] transition-all cursor-pointer shadow-xl border border-white/20 mt-4"
                >
                  DISPATCH INQUIRY
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <SpaFooter />

      <SpaBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
};

export default SpaContact;
