import React from 'react';
// Fix react-router-dom missing exports
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { clinic, navLinks, openingHours } from './physioData';

const PhysioFooter: React.FC = () => {
  return (
    <footer className="bg-[#1D1C19] text-[#F3F0EA] pt-24 md:pt-32 pb-12">
      <div className="max-w-[1500px] mx-auto px-6 md:px-10">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-14 md:gap-10 pb-20 border-b border-white/10">

          <div className="md:col-span-4">
            <p className="font-serif text-3xl md:text-4xl leading-tight mb-6">{clinic.name}</p>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Chartered physiotherapists working from one consulting room and a small rehab studio just off Pulteney
              Bridge. Independent since {clinic.established}.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="text-[9px] uppercase tracking-[0.42em] text-white/40 mb-7">Find us</p>
            <address className="not-italic text-white/70 text-sm leading-loose">
              {clinic.addressLine1}<br />
              {clinic.addressLine2}<br />
              {clinic.postcode}
            </address>
            <div className="mt-6 space-y-2 text-sm">
              <a href={`tel:${clinic.phoneHref}`} className="block text-white/70 hover:text-white transition-colors">
                {clinic.phoneDisplay}
              </a>
              <a href={`mailto:${clinic.email}`} className="block text-white/70 hover:text-white transition-colors">
                {clinic.email}
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <p className="text-[9px] uppercase tracking-[0.42em] text-white/40 mb-7">Opening hours</p>
            <ul className="space-y-3 text-sm">
              {openingHours.map((row) => (
                <li key={row.days} className="flex justify-between gap-6 text-white/70">
                  <span>{row.days}</span>
                  <span className="text-white/50 whitespace-nowrap">{row.hours}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="text-[9px] uppercase tracking-[0.42em] text-white/40 mb-7">Pages</p>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/demo/physio" className="text-white/70 hover:text-white transition-colors">Home</Link>
              </li>
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-white/70 hover:text-white transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-10 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
            &copy; {clinic.established}&ndash;2026 {clinic.name}
          </p>
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
            Registered with the HCPC &middot; Members of the CSP
          </p>
        </div>
      </div>
    </footer>
  );
};

export default PhysioFooter;
