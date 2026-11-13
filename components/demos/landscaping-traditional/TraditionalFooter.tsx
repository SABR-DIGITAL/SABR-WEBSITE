import React from 'react';
import * as RouterDOM from 'react-router-dom';
import { MoveLeft, Phone, Mail, MapPin } from 'lucide-react';
import { OAK_ASH_BRAND } from '../landscaping/landscapingData';

const Link = (RouterDOM as any).Link || (RouterDOM as any).default?.Link;

export const TraditionalFooter: React.FC = () => {
  const portfolioLinks = [
    'Family Gardens',
    'Contemporary Gardens',
    'Courtyard Gardens',
    'Roof Terraces',
    'Award-Winning Gardens',
    'Water & Reflection',
  ];

  const studioLinks = [
    { name: 'Home', path: '/demo/landscaping-traditional' },
    { name: 'Our Services', path: '/demo/landscaping-traditional/services' },
    { name: 'Garden Gallery', path: '/demo/landscaping-traditional/gallery' },
    { name: 'About Our Team', path: '/demo/landscaping-traditional/about' },
    { name: 'Request a Quote', path: '/demo/landscaping-traditional/contact' },
  ];

  return (
    <footer className="bg-[#14532D] text-white pt-16 sm:pt-20 pb-12 px-5 sm:px-6 md:px-10 border-t border-white/15 font-sans">
      <div className="max-w-[1380px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/15">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-4">
            <span className="text-2xl font-extrabold tracking-tight text-white block">
              {OAK_ASH_BRAND.name}
            </span>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/75">
              Garden Design &amp; Landscaping · Est. {OAK_ASH_BRAND.established}
            </p>
            <p className="text-white/75 text-sm leading-relaxed max-w-sm">
              Twenty-eight years of friendly, reliable garden design, stone paving, planting, and complete landscape construction across Wiltshire, Surrey, and London.
            </p>
          </div>

          {/* Services / Portfolios */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white/75">
              Garden Portfolios
            </h3>
            <ul className="space-y-2.5 text-sm">
              {portfolioLinks.map((item) => (
                <li key={item}>
                  <Link
                    to="/demo/landscaping-traditional/gallery"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white/75">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              {studioLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact */}
          <div className="sm:col-span-2 lg:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white/75">
              Get In Touch
            </h3>
            <div className="space-y-2.5 text-sm text-white/80">
              <a
                href={`tel:${OAK_ASH_BRAND.phoneHref}`}
                className="flex items-center gap-2.5 text-white font-semibold hover:text-[#16A34A] transition-colors tabular-nums"
              >
                <Phone size={15} className="text-[#16A34A] shrink-0" />
                <span>{OAK_ASH_BRAND.phoneDisplay}</span>
              </a>
              <a
                href={`mailto:${OAK_ASH_BRAND.email}`}
                className="flex items-center gap-2.5 hover:text-white transition-colors break-all"
              >
                <Mail size={15} className="text-[#16A34A] shrink-0" />
                <span>{OAK_ASH_BRAND.email}</span>
              </a>
              <p className="flex items-start gap-2.5 pt-1 text-white/75">
                <MapPin size={15} className="text-[#16A34A] shrink-0 mt-0.5" />
                <span>
                  {OAK_ASH_BRAND.studioName}, {OAK_ASH_BRAND.address}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/65">
          <p>© 1998–2026 {OAK_ASH_BRAND.name} · RHS &amp; BALI Award-Winning Landscapers</p>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-white hover:text-[#16A34A] font-medium transition-colors group"
          >
            <MoveLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span>Return to SABR Digital</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default TraditionalFooter;
