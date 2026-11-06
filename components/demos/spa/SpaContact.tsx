import React, { useState, useEffect } from 'react';
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { Check, ArrowUpRight } from 'lucide-react';
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
    interest: 'Residence Reservations',
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
        interest: 'Residence Reservations',
        message: ''
      });
    }, 4000);
  };

  return (
    <div className="bg-[#070908] text-[#ECE7DF] min-h-screen font-sans selection:bg-emerald-500 selection:text-slate-950">
      <SpaNavbar onOpenBooking={() => setIsBookingOpen(true)} />

      {/* HERO BANNER */}
      <section className="relative pt-28 pb-14 sm:pt-36 sm:pb-20 md:pt-48 md:pb-28 px-5 sm:px-6 md:px-14 bg-[#070908] border-b border-white/10">
        <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
          <span className="text-[10px] uppercase tracking-[0.45em] text-emerald-400 font-mono font-bold block">
            CONCIERGE & ACCESS
          </span>
          <h1 className="font-cinzel text-3xl sm:text-6xl md:text-7xl font-bold uppercase text-white tracking-wider">
            CONTACT & LOCATION
          </h1>
          <p className="max-w-xl mx-auto text-sm text-white/60 font-light leading-relaxed">
            Our resident concierge desk is available 24 hours a day to assist with suite reservations, private dining, spa rituals, and arrival logistics.
          </p>
        </div>
      </section>

      {/* OPEN EDITORIAL CONTACT SECTION (UNBOXED, SPACIOUS) */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 md:px-14 py-16 sm:py-28 md:py-48">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 lg:gap-24 items-start">
          {/* LEFT: SANCTUARY DETAILS */}
          <div className="lg:col-span-5 space-y-8 sm:space-y-12">
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-[0.45em] text-emerald-400 font-mono font-bold block">
                01 · THE ESTATE
              </span>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold uppercase text-white">
                SANCTUARY DIRECTORY
              </h2>
            </div>

            <div className="space-y-6 sm:space-y-8 text-sm">
              <div className="space-y-2 pb-5 sm:pb-6 border-b border-white/10">
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-mono block">
                  ESTATE ADDRESS
                </span>
                <p className="text-white/85 font-light leading-relaxed">{SPA_DATA.brand.address}</p>
                <span className="font-mono text-emerald-400 text-xs block pt-1">
                  {SPA_DATA.brand.coordinates}
                </span>
              </div>

              <div className="space-y-2 pb-5 sm:pb-6 border-b border-white/10">
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-mono block">
                  DIRECT CONCIERGE TELEPHONE
                </span>
                <a href={`tel:${SPA_DATA.brand.phone}`} className="text-white hover:text-emerald-400 transition-colors font-mono block">
                  {SPA_DATA.brand.phone}
                </a>
              </div>

              <div className="space-y-2 pb-5 sm:pb-6 border-b border-white/10">
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-mono block">
                  ELECTRONIC MAIL
                </span>
                <a href={`mailto:${SPA_DATA.brand.email}`} className="text-white hover:text-emerald-400 transition-colors font-light block break-all">
                  {SPA_DATA.brand.email}
                </a>
              </div>

              <div className="space-y-2 pb-5 sm:pb-6 border-b border-white/10">
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-mono block">
                  RECEPTION & ARRIVALS
                </span>
                <p className="text-white/75 font-light">24 Hours Daily · Private Gated Entrance</p>
              </div>
            </div>

            <div>
              <Link
                to="/demo/spa/transfers"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-emerald-400 hover:text-white transition-colors"
              >
                <span>HELIPAD & CHAUFFEUR TRANSFERS</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>

          {/* RIGHT: UNBOXED MINIMALIST FORM */}
          <div className="lg:col-span-7 space-y-8 sm:space-y-10">
            <div className="space-y-3 pb-5 sm:pb-6 border-b border-white/10">
              <span className="text-[10px] uppercase tracking-[0.45em] text-emerald-400 font-mono block font-bold">
                02 · DIRECT ENQUIRY
              </span>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold uppercase text-white">
                WRITE TO THE CONCIERGE
              </h3>
            </div>

            {isSent ? (
              <div className="py-12 sm:py-16 text-center space-y-4 border-b border-white/10">
                <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <Check size={24} />
                </div>
                <h4 className="font-cinzel text-xl font-bold uppercase text-white">Enquiry Sent</h4>
                <p className="text-sm text-white/60 max-w-sm mx-auto font-light leading-relaxed">
                  Thank you. Our concierge team will respond personally within two hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-widest text-white/50 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jonathan Hayes"
                      className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-sm text-white focus:outline-none focus:border-emerald-400 placeholder:text-white/25"
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
                      className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-sm text-white focus:outline-none focus:border-emerald-400 placeholder:text-white/25"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-widest text-white/50 mb-2">
                      Telephone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+44 7900 000000"
                      className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-sm text-white focus:outline-none focus:border-emerald-400 placeholder:text-white/25"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-widest text-white/50 mb-2">
                      Subject
                    </label>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full bg-[#070908] border-b border-white/20 px-0 py-3 text-xs font-mono text-white focus:outline-none focus:border-emerald-400"
                    >
                      <option value="Residence Reservations">Residence Reservations</option>
                      <option value="Presidential Villa Exclusive Use">Presidential Villa Exclusive Use</option>
                      <option value="Thermal Spa & Wellness">Thermal Spa & Wellness</option>
                      <option value="Private Dining">Private Dining</option>
                      <option value="Helipad & Chauffeur Transfers">Helipad & Chauffeur Transfers</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-mono tracking-widest text-white/50 mb-2">
                    Your Message
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How may our concierge team assist with your stay?"
                    className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center w-full sm:w-auto gap-3 px-10 py-4 bg-white hover:bg-emerald-400 hover:text-slate-950 text-slate-950 font-bold text-xs uppercase tracking-[0.25em] transition-all cursor-pointer"
                  >
                    <span>SEND ENQUIRY</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <SpaFooter />

      <SpaBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
};

export default SpaContact;
