import React from 'react';
import { AIO_PAGE_PATHS } from './AIONavbar';
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { triggerSiteSwitch } from '../../components/introSkip';

const EMAIL = 'Sabrdigitalwilts@gmail.com';

const AIOFooter: React.FC = () => (
  <footer className="border-t border-emerald-900/40 bg-[#0f241d] py-20 text-center">
    <div className="mx-auto max-w-5xl px-6">
      <Link to="/" className="font-syne text-3xl font-black uppercase tracking-tight text-white hover:opacity-80 focus:outline-none">
        SABR <span className="text-emerald-300 italic">DIGITAL</span>
      </Link>
      <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.4em] text-emerald-300">AI Optimisation</p>

      <nav aria-label="Footer" className="mt-10 flex flex-wrap justify-center gap-x-10 gap-y-4">
        {[
          { name: 'Home', to: AIO_PAGE_PATHS.home },
          { name: 'What is AIO', to: AIO_PAGE_PATHS['what-is-aio'] },
          { name: 'Services', to: AIO_PAGE_PATHS.services },
          { name: 'Free AI Audit', to: AIO_PAGE_PATHS.audit },
          { name: 'FAQs', to: AIO_PAGE_PATHS.faqs },
          { name: 'Contact', to: AIO_PAGE_PATHS.contact }
        ].map((l) => (
          <Link key={l.to} to={l.to} className="text-[11px] font-black uppercase tracking-[0.3em] text-emerald-100/70 hover:text-white">
            {l.name}
          </Link>
        ))}
      </nav>

      <p className="mx-auto mt-10 max-w-xl text-sm leading-relaxed text-emerald-100/60">
        AI Optimisation is a separate service from the SABR Digital web design studio, run by the same team.
        Need a new website instead?{' '}
        <a
          href="/web-design/"
          onClick={(e) => triggerSiteSwitch('web-design', '/web-design/', e)}
          className="font-semibold text-emerald-200 underline underline-offset-4 hover:text-white"
        >
          Visit the web design studio
        </a>.
      </p>

      <p className="mt-10 text-sm text-emerald-100/50">
        <a href={`mailto:${EMAIL}`} className="hover:text-white">{EMAIL}</a>
      </p>

      <p className="mt-8 text-[11px] uppercase tracking-[0.4em] text-emerald-100/40">© 2026 SABR Digital</p>
    </div>
  </footer>
);

export default AIOFooter;
