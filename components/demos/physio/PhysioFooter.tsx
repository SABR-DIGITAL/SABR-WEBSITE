import React from 'react';
// Fix react-router-dom missing exports
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { clinic, navLinks, ukLocations, openingHours } from './physioData';
import { triggerPhysioModal } from './PhysioNavbar';

const PhysioFooter: React.FC = () => {
  return (
    <footer className="bg-[#0F2942] text-white">
      {/* Top UK Clinic Locator Banner (Inspired by ApexNetwork Footer Locator Strip) */}
      <div className="bg-gradient-to-r from-[#0D9488] via-[#0284C7] to-[#0F2942] border-b border-white/10">
        <div className="max-w-[1380px] mx-auto px-6 md:px-10 py-12 md:py-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wider text-teal-100 mb-2">
              Find a Pulteney Physiotherapy Clinic Near You
            </p>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">
              Three Dedicated Clinics Across Bath, Bristol &amp; Cheltenham
            </h3>
            <p className="text-white/85 text-sm md:text-base leading-relaxed">
              Conveniently located across the South West and Cotswolds with step-free consulting rooms, rehabilitation gyms, and same-week appointments.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 w-full sm:w-auto shrink-0">
            <Link
              to="/demo/physio/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white text-[#0F2942] hover:bg-teal-50 text-sm font-semibold shadow-sm transition-colors whitespace-nowrap shrink-0"
            >
              <MapPin size={16} className="text-[#0D9488]" />
              Explore Our 3 UK Clinics
            </Link>
            <button
              type="button"
              onClick={() => triggerPhysioModal()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#0F2942]/80 hover:bg-[#0F2942] border border-white/25 text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Request Appointment
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-[1380px] mx-auto px-5 sm:px-6 md:px-10 pt-12 sm:pt-16 md:pt-20 pb-10 sm:pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 pb-12 sm:pb-16 border-b border-white/10">
          {/* Column 1: Brand & UK Practice Summary */}
          <div className="lg:col-span-4">
            <Link to="/demo/physio" className="inline-block text-2xl font-bold tracking-tight text-white mb-4">
              {clinic.name}
            </Link>
            <p className="text-slate-300 text-sm leading-relaxed max-w-sm mb-6">
              Independent Chartered Physiotherapy &amp; Sports Rehabilitation clinics serving Bath, Bristol, and Cheltenham since {clinic.established}. Registered with the HCPC and recognised by all major UK private health insurers.
            </p>
            <div className="space-y-2 text-sm text-slate-300">
              <a
                href={`tel:${clinic.phoneHref}`}
                className="flex items-center gap-2.5 hover:text-[#2DD4BF] transition-colors"
              >
                <Phone size={15} className="text-[#2DD4BF] shrink-0" />
                <span>Central UK Booking Desk: {clinic.phoneDisplay}</span>
              </a>
              <a
                href={`mailto:${clinic.email}`}
                className="flex items-center gap-2.5 hover:text-[#2DD4BF] transition-colors"
              >
                <Mail size={15} className="text-[#2DD4BF] shrink-0" />
                <span>{clinic.email}</span>
              </a>
            </div>
          </div>

          {/* Column 2: Our 3 UK Locations */}
          <div className="lg:col-span-4">
            <p className="text-xs font-semibold text-[#2DD4BF] mb-5">
              Our 3 UK Clinic Locations
            </p>
            <div className="space-y-4">
              {ukLocations.map((loc) => (
                <div key={loc.id} className="pb-3.5 border-b border-white/10 last:border-b-0 last:pb-0">
                  <div className="flex items-center justify-between gap-2">
                    <Link
                      to="/demo/physio/contact"
                      className="text-sm font-semibold text-white hover:text-[#2DD4BF] transition-colors"
                    >
                      {loc.clinicName}
                    </Link>
                    <a
                      href={`tel:${loc.phoneHref}`}
                      className="text-xs font-medium text-[#2DD4BF] hover:underline whitespace-nowrap"
                    >
                      {loc.phoneDisplay}
                    </a>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {loc.address}, {loc.postcode}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Columns 3 & 4: 2-Column Sub-grid on Mobile for Compact Vertical Rhythm */}
          <div className="grid grid-cols-2 gap-8 md:col-span-2 lg:col-span-4">
            {/* Column 3: Standard Clinic Hours */}
            <div>
              <p className="text-xs font-semibold text-[#2DD4BF] mb-5">
                Clinic Hours
              </p>
              <ul className="space-y-2.5 text-sm">
                {openingHours.map((row) => (
                  <li key={row.days} className="flex flex-col">
                    <span className="text-white font-medium text-xs">{row.days}</span>
                    <span className="text-slate-400 text-xs">{row.hours}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Get Started Navigation */}
            <div>
              <p className="text-xs font-semibold text-[#2DD4BF] mb-5">
                Get Started
              </p>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link to="/demo/physio" className="text-slate-300 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-slate-300 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    onClick={() => triggerPhysioModal()}
                    className="text-[#2DD4BF] hover:text-white font-medium transition-colors cursor-pointer text-left"
                  >
                    Request Appointment
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Legal & UK Accreditations Bar */}
        <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center text-xs text-slate-400">
          <p>
            &copy; {clinic.established}&ndash;2026 {clinic.name} Ltd. Registered in England &amp; Wales.
          </p>
          <div className="flex flex-wrap items-center gap-2 text-slate-400">
            <span>HCPC Registered</span>
            <span aria-hidden="true">&middot;</span>
            <span>Chartered Society of Physiotherapy (CSP)</span>
            <span aria-hidden="true">&middot;</span>
            <span>Bupa, AXA Health &amp; Aviva Recognised</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PhysioFooter;
