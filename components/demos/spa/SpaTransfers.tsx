import React, { useState, useEffect } from 'react';
import { Check, ArrowUpRight } from 'lucide-react';
import SpaNavbar from './SpaNavbar';
import SpaFooter from './SpaFooter';
import SpaBookingModal from './SpaBookingModal';

export const SpaTransfers: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    arrivalType: 'Helicopter Transfer',
    date: '',
    specialNotes: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
  };

  return (
    <div className="bg-[#070908] text-[#ECE7DF] min-h-screen font-sans selection:bg-emerald-500 selection:text-slate-950">
      <SpaNavbar onOpenBooking={() => setIsBookingOpen(true)} />

      {/* HERO */}
      <section className="relative pt-28 pb-14 sm:pt-36 sm:pb-20 md:pt-48 md:pb-28 px-5 sm:px-6 md:px-14 border-b border-white/10 bg-[#070908]">
        <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
          <span className="text-[10px] uppercase tracking-[0.4em] sm:tracking-[0.55em] text-emerald-400 font-mono font-bold block">
            PRIVATE ARRIVAL & CONCIERGE
          </span>
          <h1 className="font-cinzel text-3xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight text-white leading-none">
            TRANSFERS & HELIPAD
          </h1>
          <p className="max-w-xl mx-auto text-sm text-white/60 font-light leading-relaxed pt-1 sm:pt-2">
            Seamless door-to-door chauffeur transfers and private helicopter arrivals directly into our Wiltshire pine reserve.
          </p>
        </div>
      </section>

      {/* CORRELATED 4K CHAUFFEUR & ARRIVAL SHOWCASE */}
      <section className="py-16 sm:py-28 md:py-48 px-5 sm:px-6 md:px-14 max-w-6xl mx-auto border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-16 lg:gap-24 items-center">
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden aspect-[16/10] bg-[#0C100E]">
              <img
                src="https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=90&w=2400"
                alt="Private Chauffeur Fleet Arrival"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-5 space-y-8 sm:space-y-12">
            <div className="space-y-3 sm:space-y-4 pb-8 sm:pb-10 border-b border-white/10">
              <span className="text-[10px] uppercase tracking-[0.35em] text-emerald-400 font-mono font-bold block">
                01 · PRIVATE HELIPAD
              </span>
              <h2 className="font-cinzel text-xl sm:text-3xl font-bold text-white uppercase">
                32 Minutes from London Battersea
              </h2>
              <p className="text-sm text-white/60 font-light leading-relaxed">
                Our secluded estate helipad welcomes private single and twin-engine helicopters, with electric buggy transfers waiting on arrival to take you straight to your residence.
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <span className="text-[10px] uppercase tracking-[0.35em] text-emerald-400 font-mono font-bold block">
                02 · CHAUFFEUR FLEET
              </span>
              <h2 className="font-cinzel text-xl sm:text-3xl font-bold text-white uppercase">
                Door-to-Door Chauffeur Service
              </h2>
              <p className="text-sm text-white/60 font-light leading-relaxed">
                Travel in quiet comfort in our Mercedes-Maybach S-Class or Range Rover Autobiography fleet from Central London (90 minutes), Heathrow (65 minutes), or Farnborough (50 minutes).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TRANSFER RESERVATION FORM */}
      <section className="py-16 sm:py-28 md:py-48 px-5 sm:px-6 md:px-14 max-w-3xl mx-auto">
        <div className="space-y-10 sm:space-y-12">
          <div className="space-y-3 text-center">
            <span className="text-[10px] uppercase tracking-[0.45em] text-emerald-400 font-mono block font-bold">
              ARRIVAL COORDINATION
            </span>
            <h3 className="font-cinzel text-2xl sm:text-4xl font-bold uppercase tracking-tight text-white">
              ARRANGE YOUR TRANSFER
            </h3>
          </div>

          {isSent ? (
            <div className="py-12 sm:py-16 text-center space-y-4 border-y border-white/10">
              <div className="w-12 h-12 bg-emerald-400/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-400/30">
                <Check size={20} />
              </div>
              <h4 className="font-cinzel text-xl font-bold uppercase text-white">Request Received</h4>
              <p className="text-sm text-white/60 max-w-md mx-auto font-light leading-relaxed">
                Our concierge team will confirm your chauffeur or helipad arrival details by email within two hours.
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
                    placeholder="Alexander Wright"
                    className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-sm text-white focus:outline-none focus:border-emerald-400 transition-colors placeholder:text-white/25"
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
                    placeholder="alexander@domain.co.uk"
                    className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-sm text-white focus:outline-none focus:border-emerald-400 transition-colors placeholder:text-white/25"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
                <div>
                  <label className="block text-[10px] uppercase font-mono tracking-widest text-white/50 mb-2">
                    Telephone
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+44 7900 123456"
                    className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-sm text-white focus:outline-none focus:border-emerald-400 transition-colors placeholder:text-white/25"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-mono tracking-widest text-white/50 mb-2">
                    Transfer Preference
                  </label>
                  <select
                    value={formData.arrivalType}
                    onChange={(e) => setFormData({ ...formData, arrivalType: e.target.value })}
                    className="w-full bg-[#070908] border-b border-white/20 px-0 py-3 text-xs font-mono text-white focus:outline-none focus:border-emerald-400 transition-colors"
                  >
                    <option value="Helicopter Transfer">Helicopter (London Battersea)</option>
                    <option value="Private Jet Coordination">Airport Collection (Heathrow / Farnborough)</option>
                    <option value="Maybach Chauffeur">Mercedes-Maybach Chauffeur</option>
                    <option value="Range Rover Chauffeur">Range Rover Autobiography Chauffeur</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-mono tracking-widest text-white/50 mb-2">
                    Arrival Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-xs font-mono text-white focus:outline-none focus:border-emerald-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono tracking-widest text-white/50 mb-2">
                  Departure Point & Notes
                </label>
                <textarea
                  rows={2}
                  value={formData.specialNotes}
                  onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                  placeholder="Collection address, flight number, or luggage requirements..."
                  className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-emerald-400 transition-colors"
                />
              </div>

              <div className="pt-2 sm:pt-4 text-center">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center w-full sm:w-auto gap-3 px-10 py-4 bg-white hover:bg-emerald-400 hover:text-slate-950 text-slate-950 font-bold text-xs uppercase tracking-[0.25em] transition-all cursor-pointer"
                >
                  <span>REQUEST TRANSFER</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </form>
          )}
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

export default SpaTransfers;
