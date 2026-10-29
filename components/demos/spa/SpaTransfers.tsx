import React, { useState, useEffect } from 'react';
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { 
  Compass, 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  Check, 
  Plane, 
  Car, 
  ShieldCheck, 
  ArrowUpRight 
} from 'lucide-react';
import SpaNavbar from './SpaNavbar';
import SpaFooter from './SpaFooter';
import SpaBookingModal from './SpaBookingModal';
import { SPA_DATA } from './spaData';

export const SpaTransfers: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    arrivalType: 'Helicopter Transfer',
    date: '',
    departureCity: 'London',
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
      <section className="relative pt-48 pb-32 px-6 md:px-14 border-b border-white/10 overflow-hidden bg-[#070908]">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-[10px] uppercase tracking-[0.55em] text-emerald-400 font-mono font-bold block">
            PRIVATE ARRIVAL & LOGISTICS
          </span>
          <h1 className="font-cinzel text-5xl sm:text-7xl md:text-8xl font-bold uppercase tracking-tight text-white leading-none">
            TRANSFERS & HELIPAD
          </h1>
          <p className="max-w-xl mx-auto text-xs sm:text-sm text-white/60 font-light tracking-wide leading-relaxed pt-2">
            Discreet, tailored transit arranged directly into our secluded pine reserve from central London, Heathrow, Farnborough, or private jet terminals.
          </p>
        </div>
      </section>

      {/* CONTENT & FORM (SPACIOUS EDITORIAL SPLIT) */}
      <section className="py-36 md:py-48 px-6 md:px-14 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* LEFT: TRANSFER SERVICES (CLEAN EDITORIAL TYPOGRAPHY, NO BULKY CARDS) */}
          <div className="lg:col-span-6 space-y-16">
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.45em] text-emerald-400 font-mono block font-bold">
                TRANSIT CAPABILITIES
              </span>
              <h2 className="font-cinzel text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white leading-tight">
                FLIGHT & CHAUFFEUR SERVICES
              </h2>
            </div>

            <div className="space-y-12">
              {/* HELIPAD */}
              <div className="space-y-4 pb-10 border-b border-white/10">
                <div className="flex items-center gap-3 text-emerald-400 font-mono text-xs uppercase tracking-widest font-bold">
                  <Plane size={16} />
                  <span>01 · PRIVATE HELIPAD (ICAO: EG-VP)</span>
                </div>
                <h3 className="font-cinzel text-2xl font-bold text-white uppercase tracking-wide">
                  32 Minutes Direct Flight from Battersea
                </h3>
                <p className="text-xs sm:text-sm text-white/65 font-light leading-relaxed">
                  Our private lit helipad accommodates twin-engine helicopters up to 6.5 tonnes. Night landing beacons, refuel services, and dedicated golf-buggy escort directly to your residence.
                </p>
                <div className="flex items-center gap-6 pt-2 text-xs font-mono text-white/40">
                  <span>· Max Weight: 6.5T</span>
                  <span>· Night Rating: Full IFR</span>
                  <span>· Pilot Lounge: On Site</span>
                </div>
              </div>

              {/* CHAUFFEUR FLEET */}
              <div className="space-y-4 pb-10 border-b border-white/10">
                <div className="flex items-center gap-3 text-emerald-400 font-mono text-xs uppercase tracking-widest font-bold">
                  <Car size={16} />
                  <span>02 · BESPOKE CHAUFFEUR FLEET</span>
                </div>
                <h3 className="font-cinzel text-2xl font-bold text-white uppercase tracking-wide">
                  Door-to-Door Private Transit
                </h3>
                <p className="text-xs sm:text-sm text-white/65 font-light leading-relaxed">
                  Fleet of Maybach S-Class and Range Rover SV vehicles equipped with onboard Wi-Fi, chilled mineral water, and discreet executive drivers connecting Mayfair, Heathrow, and Bristol.
                </p>
                <div className="flex items-center gap-6 pt-2 text-xs font-mono text-white/40">
                  <span>· London Mayfair: 90 Min</span>
                  <span>· Heathrow T5: 65 Min</span>
                  <span>· Bristol Jet Centre: 45 Min</span>
                </div>
              </div>

              {/* UNDERSTATED LOCATION COORDINATES */}
              <div className="pt-2 flex items-center justify-between text-xs font-mono text-white/40">
                <span>COORDINATES: 51.1342° N, 1.7892° W</span>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-white transition-colors uppercase tracking-widest text-[11px]"
                >
                  <span>SATELLITE MAP</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT: REFINED TRANSFER BOOKING FORM */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3 pb-6 border-b border-white/10">
              <span className="text-[10px] uppercase tracking-[0.45em] text-emerald-400 font-mono block font-bold">
                TRANSFER RESERVATION
              </span>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
                REQUEST ARRIVAL LOGISTICS
              </h3>
            </div>

            {isSent ? (
              <div className="py-16 text-center space-y-4 border border-white/10 p-8">
                <div className="w-12 h-12 bg-emerald-400/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-400/30">
                  <Check size={20} />
                </div>
                <h4 className="font-cinzel text-xl font-bold uppercase text-white">Request Dispatched</h4>
                <p className="text-xs text-white/60 max-w-sm mx-auto leading-relaxed">
                  Our private aviation and chauffeur coordination desk will confirm flight slots and arrival coordination via email within 2 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[10px] uppercase font-mono tracking-widest text-white/50 mb-2">
                    Guest Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Lord / Lady / Mr. / Ms. Alexander Wright"
                    className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-xs text-white focus:outline-none focus:border-emerald-400 transition-colors placeholder:text-white/25"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-widest text-white/50 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alexander@domain.com"
                      className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-xs text-white focus:outline-none focus:border-emerald-400 transition-colors placeholder:text-white/25"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-widest text-white/50 mb-2">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+44 7900 123456"
                      className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-xs text-white focus:outline-none focus:border-emerald-400 transition-colors placeholder:text-white/25"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-widest text-white/50 mb-2">
                      Transfer Mode
                    </label>
                    <select
                      value={formData.arrivalType}
                      onChange={(e) => setFormData({ ...formData, arrivalType: e.target.value })}
                      className="w-full bg-[#070908] border-b border-white/20 px-0 py-3 text-xs font-mono text-white focus:outline-none focus:border-emerald-400 transition-colors"
                    >
                      <option value="Helicopter Transfer">Helicopter (London Battersea)</option>
                      <option value="Private Jet Coordination">Private Jet (Farnborough / Bristol)</option>
                      <option value="Maybach Chauffeur">Maybach S-Class Chauffeur</option>
                      <option value="Range Rover Chauffeur">Range Rover SV Chauffeur</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-widest text-white/50 mb-2">
                      Desired Date & Time
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
                    Luggage Count & Tail / Flight Number
                  </label>
                  <textarea
                    rows={2}
                    value={formData.specialNotes}
                    onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                    placeholder="Number of bags, tail number if flying private, refreshment requests..."
                    className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-xs text-white placeholder:text-white/25 focus:outline-none focus:border-emerald-400 transition-colors"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-4 bg-white hover:bg-emerald-400 hover:text-slate-950 text-slate-950 font-bold text-xs uppercase tracking-[0.25em] transition-all cursor-pointer shadow-xl border border-white/20"
                  >
                    DISPATCH TRANSFER ENQUIRY
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <SpaFooter />

      <SpaBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
};

export default SpaTransfers;
