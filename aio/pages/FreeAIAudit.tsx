import React from 'react';
import { useAIOSeo } from '../useAIOSeo';

const EMAIL = 'Sabrdigitalwilts@gmail.com';
const WHATSAPP_INTL = '447398103339';
const WHATSAPP_DISPLAY = '07398 103339';
const SUBJECT = encodeURIComponent('Free AI Audit request');
const BODY = encodeURIComponent('Hi SABR Digital,\n\nI would like a free AI audit for my business.\n\nBusiness name:\nWebsite (if any):\n\nThanks,');

const INCLUDES = [
  'How ChatGPT, Gemini, Perplexity and Google AI Overviews currently describe your business — or whether they can find it at all',
  'The clearest, highest-impact first steps to improve that, in plain English',
  'No cost, no obligation, and no pressure to buy anything afterwards'
];

const FreeAIAudit: React.FC = () => {
  useAIOSeo({
    title: 'Free AI Audit | SABR Digital AI Optimisation',
    description: 'Request a free, no-obligation audit of how AI tools like ChatGPT and Google AI Overviews currently find and describe your business.',
    path: '/free-ai-audit'
  });

  return (
    <main className="bg-[#fdfbf7] px-6 pb-24 pt-36 md:px-10 md:pb-32">
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-5 text-[11px] font-black uppercase tracking-[0.4em] text-emerald-700">Free AI Audit</p>
        <h1 className="font-syne mb-8 text-[clamp(2rem,6vw,3.25rem)] font-black leading-[1.05] tracking-tight text-slate-950">
          See how AI currently talks about your business
        </h1>
        <p className="mb-12 text-lg leading-relaxed text-slate-600">
          Send us your business name and website, and we'll check how AI tools currently find — or fail to find —
          your business, then send back a short, plain-English report with the clearest first steps.
        </p>

        <ul className="mb-14 space-y-4 text-left">
          {INCLUDES.map((item) => (
            <li key={item} className="flex gap-3 text-slate-700">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={`mailto:${EMAIL}?subject=${SUBJECT}&body=${BODY}`}
            className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-8 py-4 text-[12px] font-black uppercase tracking-[0.25em] text-white shadow-sm transition-transform hover:scale-105 active:scale-95"
          >
            Request by email
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_INTL}?text=${SUBJECT}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-emerald-600 px-8 py-4 text-[12px] font-black uppercase tracking-[0.25em] text-emerald-700 transition-colors hover:bg-emerald-50"
          >
            WhatsApp {WHATSAPP_DISPLAY}
          </a>
        </div>

        <p className="mt-10 text-sm text-slate-500">We typically reply within 12 hours.</p>
      </div>
    </main>
  );
};

export default FreeAIAudit;
