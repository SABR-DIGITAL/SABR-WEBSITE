import React from 'react';
import * as RouterDOM from 'react-router-dom';
import { MoveLeft } from 'lucide-react';
import { OAK_ASH_BRAND } from '../landscaping/landscapingData';

const Link = (RouterDOM as any).Link || (RouterDOM as any).default?.Link;

export const LuxuryFooter: React.FC = () => {
  const portfolioLinks = [
    'Family Gardens',
    'Contemporary Gardens',
    'Courtyard Sanctuaries',
    'Roof Terraces',
    'Water & Reflection',
    'Award-Winning Gardens',
  ];

  const studioLinks = [
    { name: 'Estate Overview', path: '/demo/landscaping-luxury' },
    { name: 'Practice & Heritage', path: '/demo/landscaping-luxury/about' },
    { name: 'Garden Portfolios', path: '/demo/landscaping-luxury/gallery' },
    { name: 'Design & Construction', path: '/demo/landscaping-luxury/services' },
    { name: 'Private Commissions', path: '/demo/landscaping-luxury/contact' },
  ];

  return (
    <footer className="bg-[#090705] text-[#D8D5CC] pt-20 sm:pt-28 pb-14 sm:pb-16 px-5 sm:px-6 md:px-14 lg:px-24 border-t border-[#C8B88A]/20 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-16 pb-16 border-b border-[#C8B88A]/15">
          <div className="sm:col-span-2 lg:col-span-5 space-y-5">
            <div>
              <span className="font-cinzel text-2xl sm:text-3xl font-bold tracking-[0.22em] text-[#F4F1EA] uppercase block">
                {OAK_ASH_BRAND.name}
              </span>
              <span className="text-[9px] font-mono uppercase tracking-[0.42em] text-[#C8B88A] mt-2 block">
                PRIVATE ESTATE ARCHITECTURE · EST. {OAK_ASH_BRAND.established}
              </span>
            </div>
            <p className="text-white/55 text-sm font-light leading-[1.85] max-w-sm">
              Twenty-eight years of private garden consultancy, architectural design, and master landscape construction across Wiltshire, Surrey, and London.
            </p>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#C8B88A]">
              Portfolios
            </div>
            <ul className="space-y-3 text-xs font-light tracking-[0.14em] uppercase">
              {portfolioLinks.map((item) => (
                <li key={item}>
                  <Link
                    to="/demo/landscaping-luxury/gallery"
                    className="text-white/65 hover:text-[#C8B88A] transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#C8B88A]">
              Studio
            </div>
            <ul className="space-y-3 text-xs font-light tracking-[0.14em] uppercase">
              {studioLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-white/65 hover:text-[#C8B88A] transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-2 space-y-4">
            <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#C8B88A]">
              Private Desk
            </div>
            <div className="space-y-3 text-xs font-light leading-relaxed text-white/70">
              <a
                href={`tel:${OAK_ASH_BRAND.phoneHref}`}
                className="block text-[#F4F1EA] hover:text-[#C8B88A] transition-colors tracking-[0.12em] tabular-nums"
              >
                {OAK_ASH_BRAND.phoneDisplay}
              </a>
              <a
                href={`mailto:${OAK_ASH_BRAND.email}`}
                className="block hover:text-white transition-colors break-all"
              >
                {OAK_ASH_BRAND.email}
              </a>
              <p className="text-white/45 pt-1">
                {OAK_ASH_BRAND.address}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-[11px] font-mono tracking-[0.18em] uppercase text-white/45">
          <p>© 1998–2026 {OAK_ASH_BRAND.name} · PRESTIGE ESTATE ARCHITECTURE</p>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2.5 text-[#C8B88A] hover:text-white transition-colors group"
          >
            <MoveLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span>Return to SABR Digital</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default LuxuryFooter;
