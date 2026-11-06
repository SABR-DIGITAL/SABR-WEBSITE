import React, { useState, useEffect } from 'react';
import { motion as framerMotion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Phone } from 'lucide-react';
import PhysioNavbar from './PhysioNavbar';
import PhysioFooter from './PhysioFooter';
import { ukLocations, coreServices, team } from './physioData';

// Fix motion types by casting to any
const motion = framerMotion as any;

const inputClass =
  'w-full bg-transparent border-b border-slate-300 py-4 text-base text-[#0F2942] placeholder:text-slate-400 focus:outline-none focus:border-[#0D9488] transition-colors';

const PhysioContact: React.FC = () => {
  const [selectedLocationId, setSelectedLocationId] = useState(ukLocations[0].id);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
  }, []);

  const activeClinic = ukLocations.find((l) => l.id === selectedLocationId) || ukLocations[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#0F2942] selection:bg-[#0D9488] selection:text-white overflow-x-hidden">
      <PhysioNavbar />

      {/* 1. SIGNATURE HEADER */}
      <section className="pt-24 sm:pt-32 md:pt-44 pb-12 sm:pb-16 md:pb-28 px-5 sm:px-6 md:px-10 bg-gradient-to-br from-[#F0FDFA] via-[#F8FAFC] to-[#EFF6FF]">
        <div className="max-w-[1380px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-end">
          <div className="lg:col-span-8">
            <p className="text-xs font-bold tracking-wider uppercase text-[#0D9488] mb-3">
              Our 3 UK Clinic Locations &amp; Booking
            </p>
            <h1
              className="text-[clamp(2.1rem,5vw,4.25rem)] font-extrabold tracking-tight text-[#0F2942] leading-[1.06]"
              style={{ textWrap: 'balance' } as React.CSSProperties}
            >
              Find your nearest UK clinic <span className="text-[#0D9488]">and book in.</span>
            </h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="origin-left h-1 w-24 rounded-full bg-gradient-to-r from-[#0D9488] to-[#0284C7] mt-5 sm:mt-6"
            />
          </div>
          <p className="lg:col-span-4 text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed">
            Three welcoming, ground-floor physiotherapy clinics in Bath, Bristol, and Cheltenham. Select your preferred location below or ring directly for same-week appointments.
          </p>
        </div>
      </section>

      {/* 2. THREE UK CLINICS — Unboxed, sharp square-edged layout */}
      <section className="py-16 sm:py-24 md:py-36 px-5 sm:px-6 md:px-10 bg-white">
        <div className="max-w-[1380px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 sm:gap-14 lg:gap-16">
            {ukLocations.map((loc, idx) => {
              const isSelected = loc.id === selectedLocationId;
              return (
                <motion.div
                  key={loc.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.7, delay: idx * 0.1 }}
                  onClick={() => setSelectedLocationId(loc.id)}
                  className="group flex flex-col cursor-pointer"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 rounded-none mb-5 sm:mb-7">
                    <img
                      src={loc.image}
                      alt={loc.clinicName}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                    />
                    {isSelected && (
                      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0D9488] to-[#0284C7]" />
                    )}
                  </div>

                  <p className="text-xs font-bold tracking-wider uppercase text-[#0D9488] mb-2">
                    {loc.city} &mdash; {loc.postcode}
                  </p>
                  <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0F2942] mb-2">
                    {loc.clinicName}
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 mb-3">
                    {loc.address}, {loc.postcode}
                  </p>
                  <p className="text-xs font-medium text-slate-500 mb-5 sm:mb-6">
                    {loc.hours} &middot; {loc.saturdayHours}
                  </p>

                  <div className="mt-auto pt-4 sm:pt-5 border-t border-slate-200 flex items-center justify-between gap-4">
                    <a
                      href={`tel:${loc.phoneHref}`}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 text-xs font-bold text-[#0F2942] hover:text-[#0D9488]"
                    >
                      <Phone size={14} className="text-[#0D9488]" />
                      {loc.phoneDisplay}
                    </a>
                    <span
                      className={`text-xs font-bold ${
                        isSelected ? 'text-[#0D9488]' : 'text-slate-400 group-hover:text-[#0F2942]'
                      }`}
                    >
                      {isSelected ? 'Selected Clinic' : 'Select Clinic →'}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. OPEN MINIMALIST APPOINTMENT FORM — Zero card boxes */}
      <section className="py-16 sm:py-24 md:py-36 px-5 sm:px-6 md:px-10 bg-gradient-to-br from-[#F0FDFA] via-[#F8FAFC] to-[#EFF6FF]">
        <div className="max-w-[1380px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 lg:gap-24 items-start">
          {/* Left Narrative & Selected Clinic Direct Line */}
          <div className="lg:col-span-5">
            <p className="text-xs font-bold tracking-wider uppercase text-[#0D9488] mb-3">
              Request an Appointment
            </p>
            <h2
              className="text-[clamp(2.25rem,4vw,3.5rem)] font-extrabold tracking-tight text-[#0F2942] leading-[1.08]"
              style={{ textWrap: 'balance' } as React.CSSProperties}
            >
              Book your visit at <span className="text-[#0D9488]">{activeClinic.city}.</span>
            </h2>
            <div className="h-1 w-24 rounded-full bg-gradient-to-r from-[#0D9488] to-[#0284C7] mt-5 mb-6 sm:mb-8" />

            <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed mb-8 sm:mb-10">
              Tell us briefly what is bothering you and which days suit you best. Our practice coordinator at {activeClinic.clinicName} will respond within two working hours.
            </p>

            <div className="space-y-4 pt-6 sm:pt-8 border-t border-slate-300/80 text-sm">
              <p className="text-slate-600">
                <strong className="text-[#0F2942]">Clinic Address:</strong> {activeClinic.address},{' '}
                {activeClinic.postcode}
              </p>
              <p className="text-slate-600">
                <strong className="text-[#0F2942]">Direct Telephone:</strong>{' '}
                <a href={`tel:${activeClinic.phoneHref}`} className="font-bold text-[#0D9488] hover:underline">
                  {activeClinic.phoneDisplay}
                </a>
              </p>
              <p className="text-slate-600">
                <strong className="text-[#0F2942]">Email:</strong>{' '}
                <a href={`mailto:${activeClinic.email}`} className="font-bold text-[#0284C7] hover:underline break-all">
                  {activeClinic.email}
                </a>
              </p>
              <p className="text-slate-600">
                <strong className="text-[#0F2942]">Lead Physiotherapist:</strong> {activeClinic.leadPhysio}
              </p>
            </div>
          </div>

          {/* Right Unboxed Underline Form */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pt-8 border-t border-slate-300"
                >
                  <div className="w-12 h-12 bg-[#0D9488] text-white flex items-center justify-center mb-6">
                    <Check size={22} />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F2942] mb-3">
                    Thank you &mdash; your request is with our {activeClinic.city} clinic.
                  </h3>
                  <p className="text-base text-slate-600 leading-relaxed max-w-lg mb-8">
                    Our coordinator at {activeClinic.clinicName} will be in touch shortly with available appointment times.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="text-xs font-bold uppercase tracking-wider text-[#0D9488] hover:text-[#0F2942] transition-colors cursor-pointer"
                  >
                    Send another enquiry &rarr;
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  className="space-y-6 sm:space-y-8"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-[#0D9488] mb-1">
                        Your Name
                      </label>
                      <input id="name" name="name" type="text" required placeholder="Jane Marshall" className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-[#0D9488] mb-1">
                        UK Telephone
                      </label>
                      <input id="phone" name="phone" type="tel" required placeholder="07700 900123" className={inputClass} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                    <div>
                      <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-[#0D9488] mb-1">
                        Email Address
                      </label>
                      <input id="email" name="email" type="email" required placeholder="jane@example.co.uk" className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="location" className="block text-xs font-bold uppercase tracking-wider text-[#0D9488] mb-1">
                        UK Clinic Location
                      </label>
                      <select
                        id="location"
                        name="location"
                        value={selectedLocationId}
                        onChange={(e) => setSelectedLocationId(e.target.value)}
                        className={`${inputClass} cursor-pointer`}
                      >
                        {ukLocations.map((loc) => (
                          <option key={loc.id} value={loc.id}>
                            {loc.clinicName} ({loc.postcode})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                    <div>
                      <label htmlFor="service" className="block text-xs font-bold uppercase tracking-wider text-[#0D9488] mb-1">
                        Treatment Needed
                      </label>
                      <select id="service" name="service" className={`${inputClass} cursor-pointer`}>
                        {coreServices.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title} &mdash; {s.price}
                          </option>
                        ))}
                        <option value="Complimentary 15-Min Injury Screen">
                          Complimentary 15-Min Injury Screen &mdash; Free
                        </option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="physio" className="block text-xs font-bold uppercase tracking-wider text-[#0D9488] mb-1">
                        Preferred Physiotherapist
                      </label>
                      <select id="physio" name="physio" className={`${inputClass} cursor-pointer`} defaultValue="No preference">
                        <option value="No preference">First Available Specialist</option>
                        {team.map((person) => (
                          <option key={person.name} value={person.name}>
                            {person.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-[#0D9488] mb-1">
                      How Can We Help?
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      required
                      placeholder="Where it hurts and which days suit you best."
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <div className="pt-2 sm:pt-4">
                    <button
                      type="submit"
                      className="group inline-flex items-center justify-center w-full sm:w-auto gap-3 px-9 py-4 bg-[#0D9488] hover:bg-[#0F2942] text-white text-sm font-semibold transition-colors cursor-pointer"
                    >
                      Send Appointment Request
                      <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <PhysioFooter />
    </div>
  );
};

export default PhysioContact;
