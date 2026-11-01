import React from 'react';
import { useAIOSeo } from '../useAIOSeo';

const STEPS = [
  {
    title: 'AI tools read differently to Google',
    body: "Google mostly matches keywords and ranks links. AI tools like ChatGPT, Gemini and Perplexity read whole pages, pull out facts, and summarise them in their own words. If your site's information is vague, scattered or hard to parse, the AI has little to work with."
  },
  {
    title: 'Clear, structured facts help',
    body: 'What you do, who you serve, where you are, and what makes you different — stated plainly, backed up with structured data (schema markup) that tags those facts for machines as well as people.'
  },
  {
    title: 'Consistency across the web matters',
    body: "AI tools often cross-check a business against directories, reviews and other pages. If your name, services or location are written differently in different places, that's a harder business to describe confidently."
  },
  {
    title: "Answer-ready content gets reused",
    body: "Pages written like clear answers to real questions (a well-written FAQ, a plainly worded services page) are easier for an AI tool to lift from and quote accurately."
  }
];

const WhatIsAIO: React.FC = () => {
  useAIOSeo({
    title: 'What is AI Optimisation (AIO)? | SABR Digital',
    description: 'A plain-language explanation of AI Optimisation — what it is, how it differs from SEO, and what we can and cannot promise.',
    path: '/what-is-aio'
  });

  return (
    <main className="bg-[#fdfbf7] px-6 pb-24 pt-36 md:px-10 md:pb-32">
      <div className="mx-auto max-w-3xl">
        <p className="mb-5 text-[11px] font-black uppercase tracking-[0.4em] text-emerald-700">What is AIO</p>
        <h1 className="font-syne mb-8 text-[clamp(2rem,6vw,3.25rem)] font-black leading-[1.05] tracking-tight text-slate-950">
          AI Optimisation, explained in plain English
        </h1>
        <p className="mb-6 text-lg leading-relaxed text-slate-600">
          People used to search Google and click a link. Increasingly, they ask ChatGPT, Gemini, Perplexity or
          Google's AI Overview a question instead, and get a summarised answer with a handful of businesses
          mentioned by name. AI Optimisation (sometimes called AIO, or GEO — generative engine optimisation) is
          the work of making it easier for those tools to find, understand and accurately describe your business.
        </p>
        <p className="mb-14 text-lg leading-relaxed text-slate-600">
          We do not promise rankings or guaranteed AI recommendations — nobody can control what a model decides to
          say. What we do is improve how clearly AI tools understand and recommend your business, by working on
          the things that are actually within our control.
        </p>

        <div className="space-y-10">
          {STEPS.map((step, i) => (
            <div key={step.title} className="border-t border-slate-200 pt-8">
              <p className="mb-2 text-[11px] font-black uppercase tracking-[0.35em] text-emerald-700">Step {i + 1}</p>
              <h2 className="font-syne mb-3 text-xl font-bold text-slate-950 md:text-2xl">{step.title}</h2>
              <p className="leading-relaxed text-slate-600">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default WhatIsAIO;
