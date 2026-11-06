import React from 'react';
import * as RouterDOM from 'react-router-dom';
import { MoveLeft, ArrowUpRight } from 'lucide-react';
import { GardenEmblem } from './Navbar';

const Link = (RouterDOM as any).Link || (RouterDOM as any).default?.Link;

export const Footer: React.FC = () => {
  const portfolioLinks = [
    'Family Gardens',
    'Contemporary Gardens',
    'Small Courtyards',
    'Roof Terraces',
    'Water Gardens',
    'Award-Winning Gardens',
  ];

  const studioLinks = [
    { name: 'Home', path: '/demo/landscaping' },
    { name: 'About', path: '/demo/landscaping/about' },
    { name: 'Gardens', path: '/demo/landscaping/gallery' },
    { name: 'Design & Build', path: '/demo/landscaping/services' },
    { name: 'Contact', path: '/demo/landscaping/contact' },
  ];

  return (
    <footer className="bg-[#1C211D] text-[#D8D5CC] pt-16 sm:pt-24 pb-12 sm:pb-16 px-5 sm:px-6 md:px-14 lg:px-24 border-t border-white/10 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Top Row: Minimal Brand Mark & Quiet Statement */}
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-16 pb-12 sm:pb-20 border-b border-white/10">
          <div className="col-span-2 lg:col-span-5 space-y-5 sm:space-y-6">
            <div className="flex items-center gap-4">
              <GardenEmblem className="w-10 h-10 text-white shrink-0" />
              <div>
                <span className="font-cormorant text-2xl sm:text-3xl font-light tracking-[0.14em] text-white uppercase block leading-none">
                  Oak &amp; Ash
                </span>
                <span className="text-[9px] uppercase tracking-[0.34em] text-[#9AA08E] mt-1.5 block">
                  Landscape Architecture · Est. 1998
                </span>
              </div>
            </div>
            <p className="text-[#9E9D95] text-sm font-light leading-[1.85] max-w-sm">
              Twenty-eight years of private garden consultancy, architectural design, and master landscape construction across Wiltshire, Surrey, and London.
            </p>
          </div>

          {/* Portfolios */}
          <div className="col-span-1 lg:col-span-3 space-y-4 sm:space-y-5">
            <div className="text-[10px] uppercase tracking-[0.32em] text-[#9AA08E]">
              Portfolios
            </div>
            <ul className="space-y-2.5 sm:space-y-3 text-xs font-light tracking-[0.12em] sm:tracking-[0.14em] uppercase">
              {portfolioLinks.map((item) => (
                <li key={item}>
                  <Link
                    to="/demo/landscaping/gallery"
                    className="text-[#C8C5BC] hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div className="col-span-1 lg:col-span-2 space-y-4 sm:space-y-5">
            <div className="text-[10px] uppercase tracking-[0.32em] text-[#9AA08E]">
              Studio
            </div>
            <ul className="space-y-2.5 sm:space-y-3 text-xs font-light tracking-[0.12em] sm:tracking-[0.14em] uppercase">
              {studioLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-[#C8C5BC] hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Enquiries */}
          <div className="col-span-2 lg:col-span-2 space-y-4 sm:space-y-5">
            <div className="text-[10px] uppercase tracking-[0.32em] text-[#9AA08E]">
              Enquiries
            </div>
            <div className="space-y-2.5 sm:space-y-3 text-xs font-light leading-relaxed text-[#C8C5BC]">
              <a
                href="tel:01672552140"
                className="block text-white hover:text-[#9AA08E] transition-colors tracking-[0.12em] tabular-nums"
              >
                01672 552 140
              </a>
              <a
                href="mailto:enquiries@oakandashgardens.co.uk"
                className="block hover:text-white transition-colors break-all"
              >
                enquiries@oakandashgardens.co.uk
              </a>
              <p className="text-[#8E8D85] pt-1">
                259 High Street, Marlborough,
                <br />
                Wiltshire, SN8 1AA
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Hairline Row */}
        <div className="pt-8 sm:pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 text-[10px] sm:text-[11px] font-light tracking-[0.14em] sm:tracking-[0.16em] uppercase text-[#8E8D85] text-center sm:text-left">
          <p>© 1998–2026 Oak &amp; Ash · Landscape Architecture</p>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2.5 text-[#C8C5BC] hover:text-white transition-colors group"
          >
            <MoveLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span>Return to SABR Digital</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
