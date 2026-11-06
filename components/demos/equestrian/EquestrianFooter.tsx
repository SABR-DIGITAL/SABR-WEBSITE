import React from 'react';
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { ArrowUpRight } from 'lucide-react';
import { academy, navLinks, openingHours } from './equestrianData';
import { HorseMark } from './EquestrianUI';

const EquestrianFooter: React.FC = () => {
  return (
    <footer className="relative z-10 bg-[#1F3A2C] text-[#FAF6EE]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-6 md:px-12 py-14 sm:py-20 md:py-24">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 sm:gap-12 pb-12 sm:pb-16 border-b border-white/15">
          <div className="col-span-2 md:col-span-5">
            <Link to="/demo/equestrian" className="inline-flex items-center gap-4 mb-5 sm:mb-6">
              <span className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <HorseMark size={32} color="#FAF6EE" />
              </span>
              <div>
                <p className="font-serif text-2xl leading-none text-[#FAF6EE]">{academy.name}</p>
                <p className="text-[9px] uppercase tracking-[0.34em] text-[#B8D0C2] mt-1.5">
                  Riding Academy &middot; Wiltshire
                </p>
              </div>
            </Link>
            <p className="text-white/75 text-[14px] sm:text-[15px] leading-relaxed max-w-sm mb-6 sm:mb-8">
              Four hundred acres of private Wiltshire chalk downland, twenty-two schoolmasters, and never more than four riders in a lesson.
            </p>
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#B8D0C2]">
              {academy.accreditation}
            </p>
          </div>

          <div className="col-span-1 md:col-span-2">
            <p className="text-[10px] uppercase tracking-[0.32em] text-[#B8D0C2] mb-4 sm:mb-5">Explore</p>
            <ul className="space-y-2.5 sm:space-y-3">
              <li>
                <Link
                  to="/demo/equestrian"
                  className="text-[14px] text-white/80 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-[14px] text-white/80 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/demo/equestrian/book"
                  className="inline-flex items-center gap-1.5 text-[14px] text-[#B8D0C2] hover:text-white transition-colors pt-1"
                >
                  <span>Book a Lesson</span>
                  <ArrowUpRight size={13} />
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2">
            <p className="text-[10px] uppercase tracking-[0.32em] text-[#B8D0C2] mb-4 sm:mb-5">The Yard</p>
            <address className="not-italic text-[13px] sm:text-[14px] text-white/80 leading-relaxed mb-4 sm:mb-5">
              {academy.addressLine1}
              <br />
              {academy.addressLine2}
              <br />
              {academy.postcode}
            </address>
            <div className="space-y-1.5 text-[13px] sm:text-[14px]">
              <a
                href={`tel:${academy.phoneHref}`}
                className="block text-white hover:text-[#B8D0C2] transition-colors"
              >
                {academy.phoneDisplay}
              </a>
              <a
                href={`mailto:${academy.email}`}
                className="block text-white/75 hover:text-white transition-colors break-all"
              >
                {academy.email}
              </a>
            </div>
          </div>

          <div className="col-span-2 md:col-span-3">
            <p className="text-[10px] uppercase tracking-[0.32em] text-[#B8D0C2] mb-4 sm:mb-5">Yard Hours</p>
            <ul className="space-y-2.5 text-[13px]">
              {openingHours.map((row) => (
                <li key={row.days} className="flex justify-between gap-4">
                  <span className="text-white/65">{row.days}</span>
                  <span className="text-white/95 text-right">{row.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-white/55">
          <p>
            &copy; {new Date().getFullYear()} {academy.fullName}. Established {academy.established}.
          </p>
          <div className="flex items-center gap-6">
            <a
              href={academy.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors uppercase tracking-[0.24em] text-[10px]"
            >
              Instagram
            </a>
            <a
              href={academy.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors uppercase tracking-[0.24em] text-[10px]"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default EquestrianFooter;
