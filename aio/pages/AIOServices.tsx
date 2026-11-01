import React from 'react';
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { ArrowRight } from 'lucide-react';
import { useAIOSeo } from '../useAIOSeo';
import { AIO_PAGE_PATHS } from '../components/AIONavbar';

const SERVICES = [
  {
    name: 'AI readability audit',
    body: 'A plain-English review of how AI tools currently read, and currently misread, your existing website and listings.'
  },
  {
    name: 'Structured data & schema markup',
    body: 'Adding schema.org markup so AI systems — and search engines — can reliably pick out facts like your services, location and hours.'
  },
  {
    name: 'Answer-ready content',
    body: 'Rewriting key pages as clear, direct answers to the questions your customers actually ask, so AI tools have something accurate to quote.'
  },
  {
    name: 'Consistency across the web',
    body: "Checking your business details match across your site, directories and review platforms that AI tools draw from."
  },
  {
    name: 'Ongoing monitoring',
    body: 'Periodic checks on how AI tools describe your business, with adjustments as models and their sources change over time.'
  }
];

const AIOServices: React.FC = () => {
  useAIOSeo({
    title: 'AI Optimisation Services | SABR Digital',
    description: 'AI readability audits, schema markup, answer-ready content and ongoing monitoring — helping AI tools understand and recommend your business.',
    path: '/services'
  });

  return (
    <main className="bg-[#fdfbf7] px-6 pb-24 pt-36 md:px-10 md:pb-32">
      <div className="mx-auto max-w-4xl">
        <p className="mb-5 text-center text-[11px] font-black uppercase tracking-[0.4em] text-emerald-700">Services</p>
        <h1 className="font-syne mb-6 text-center text-[clamp(2rem,6vw,3.25rem)] font-black leading-[1.05] tracking-tight text-slate-950">
          How we improve your AI visibility
        </h1>
        <p className="mx-auto mb-16 max-w-2xl text-center text-lg leading-relaxed text-slate-600">
          Every service here is about clarity and structure, not guarantees. We cannot promise a ranking or a
          guaranteed AI recommendation — what we can do is improve how clearly AI tools understand and recommend
          your business.
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          {SERVICES.map((s) => (
            <div key={s.name} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="font-syne mb-3 text-xl font-bold text-slate-950">{s.name}</h2>
              <p className="leading-relaxed text-slate-600">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            to={AIO_PAGE_PATHS.audit}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-8 py-4 text-[12px] font-black uppercase tracking-[0.25em] text-white shadow-sm transition-transform hover:scale-105 active:scale-95"
          >
            Get a free AI audit <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
};

export default AIOServices;
