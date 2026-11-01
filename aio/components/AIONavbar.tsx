import React, { useState } from 'react';
import * as RouterDOM from 'react-router-dom';
const { Link, useLocation } = RouterDOM as any;
import { Menu, X } from 'lucide-react';
import SiteSwitcher from '../../components/SiteSwitcher';

export const AIO_PAGE_PATHS: Record<string, string> = {
  home: '/',
  'what-is-aio': '/what-is-aio',
  services: '/services',
  audit: '/free-ai-audit',
  faqs: '/faqs',
  contact: '/contact'
};

const links = [
  { name: 'What is AIO', to: AIO_PAGE_PATHS['what-is-aio'] },
  { name: 'Services', to: AIO_PAGE_PATHS.services },
  { name: 'FAQs', to: AIO_PAGE_PATHS.faqs }
];

const AIONavbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] px-4 py-4 md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-stone-200/70 bg-white/90 px-5 py-3 shadow-sm backdrop-blur-md md:px-7">
          <div className="relative flex items-center gap-1.5">
          <Link to="/" onClick={() => setOpen(false)} aria-label="SABR Digital AI Optimisation home" className="flex flex-col text-left focus:outline-none">
            <span className="font-syne text-lg font-black tracking-[0.04em] text-slate-950">
              SABR <span className="text-emerald-600">DIGITAL</span>
            </span>
            <span className="text-[7px] font-bold uppercase tracking-[0.35em] text-emerald-700">
              AI Optimisation
            </span>
          </Link>
          <SiteSwitcher current="ai-optimisation" />
          </div>

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-[11px] font-semibold uppercase tracking-[0.25em] transition-colors focus:outline-none ${
                  pathname === link.to ? 'text-emerald-600' : 'text-slate-600 hover:text-emerald-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to={AIO_PAGE_PATHS.audit}
              className="rounded-full bg-emerald-600 px-6 py-2.5 text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-sm transition-all hover:scale-105 hover:bg-emerald-500 active:scale-95 focus:outline-none"
            >
              Free AI Audit
            </Link>
          </nav>

          <button
            className="rounded-full border border-stone-200 bg-white p-3 text-slate-900 shadow-sm focus:outline-none lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[200] flex flex-col bg-[#fdfbf7] p-8 transition-transform duration-300 lg:hidden ${
          open ? 'visible translate-x-0' : 'invisible translate-x-full pointer-events-none'
        }`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
      >
        <div className="mb-12 flex items-center justify-between">
          <span className="font-syne text-xl font-black text-slate-950">SABR DIGITAL</span>
          <button
            onClick={() => setOpen(false)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-white text-slate-900 shadow-sm focus:outline-none"
            aria-label="Close navigation menu"
          >
            <X size={22} />
          </button>
        </div>
        <nav aria-label="Mobile" className="flex flex-col gap-7">
          <Link to="/" onClick={() => setOpen(false)} className="text-2xl font-bold text-slate-900">Home</Link>
          {links.map((link) => (
            <Link key={link.to} to={link.to} onClick={() => setOpen(false)} className="text-2xl font-bold text-slate-900">
              {link.name}
            </Link>
          ))}
          <Link to={AIO_PAGE_PATHS.contact} onClick={() => setOpen(false)} className="text-2xl font-bold text-slate-900">Contact</Link>
        </nav>
      </div>
    </>
  );
};

export default AIONavbar;
