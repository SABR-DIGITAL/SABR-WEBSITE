import React from 'react';
// Fix react-router-dom missing exports
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { academy, navLinks, openingHours } from './equestrianData';
import { HorseMark, Bloom } from './EquestrianUI';

const EquestrianFooter: React.FC = () => {
  return (
    <footer className="bg-[#1E2A22] text-[#FFFAF3] pt-20 md:pt-28 pb-10">
      <div className="max-w-[1500px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-10 pb-16 border-b border-white/10">
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <HorseMark size={46} color="#FFFAF3" />
              <span className="font-serif text-2xl md:text-3xl leading-none">{academy.name}</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Twenty-two horses, three arenas, four hundred acres. Same family since{' '}
              {academy.established}.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="text-[9px] uppercase tracking-[0.42em] text-white/40 mb-6">Find the yard</p>
            <address className="not-italic text-white/70 text-sm leading-loose">
              {academy.addressLine1}
              <br />
              {academy.addressLine2}
              <br />
              {academy.postcode}
            </address>
            <div className="mt-5 space-y-2 text-sm">
              <a
                href={`tel:${academy.phoneHref}`}
                className="block text-white/70 hover:text-white transition-colors"
              >
                {academy.phoneDisplay}
              </a>
              <a
                href={`mailto:${academy.email}`}
                className="block text-white/70 hover:text-white transition-colors break-words"
              >
                {academy.email}
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <p className="text-[9px] uppercase tracking-[0.42em] text-white/40 mb-6">Yard hours</p>
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
            <p className="text-[9px] uppercase tracking-[0.42em] text-white/40 mb-6">Pages</p>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/demo/equestrian" className="text-white/70 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-white/70 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/demo/equestrian/book"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Book a lesson
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row gap-5 justify-between items-start md:items-center">
          <p className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/30">
            <Bloom size={14} />
            &copy; {academy.established}&ndash;2026 {academy.fullName}
          </p>
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
            Designed by SABR Digital
          </p>
        </div>
      </div>
    </footer>
  );
};

export default EquestrianFooter;
