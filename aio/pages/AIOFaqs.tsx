import React from 'react';
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { useAIOSeo } from '../useAIOSeo';
import { AIO_PAGE_PATHS } from '../components/AIONavbar';

const FAQS = [
  {
    q: 'What is AI Optimisation (AIO)?',
    a: "AIO is the work of making your business's information clear, accurate and structured enough for AI tools like ChatGPT, Gemini, Perplexity and Google's AI Overviews to read, understand and accurately describe."
  },
  {
    q: 'How is this different from SEO?',
    a: 'SEO is about ranking links on a search results page. AIO is about how AI tools summarise and recommend businesses inside a conversational answer. The two overlap — clean, well-structured content helps both — but they are not the same thing.'
  },
  {
    q: 'Can you guarantee ChatGPT or Google AI Overviews will recommend my business?',
    a: 'No. No one can guarantee what an AI model says, including us. What we can do is improve how clearly AI tools understand and recommend your business, which improves your chances of being described accurately.'
  },
  {
    q: 'How long does it take to see a difference?',
    a: 'It varies — AI tools update what they know on their own schedules, not ours. Structural changes (schema markup, clearer content) can take effect within weeks, but there is no fixed timeline we can promise.'
  },
  {
    q: 'Do I need a new website for this?',
    a: "Not necessarily. Often the biggest gains come from restructuring and clarifying what's already there. If your site does need rebuilding, that's a web design project — we can point you to the SABR Digital web design studio for that."
  },
  {
    q: 'Is this part of the web design studio?',
    a: 'No — AI Optimisation is a separate service and website, run by the same small studio. Visiting one does not change or affect the other.'
  }
];

const AIOFaqs: React.FC = () => {
  useAIOSeo({
    title: 'AI Optimisation FAQs | SABR Digital',
    description: 'Straight answers about AI Optimisation: what it is, how it differs from SEO, timelines, and what we do and do not promise.',
    path: '/faqs'
  });

  return (
    <main className="bg-[#fdfbf7] px-6 pb-24 pt-36 md:px-10 md:pb-32">
      <div className="mx-auto max-w-3xl">
        <p className="mb-5 text-center text-[11px] font-black uppercase tracking-[0.4em] text-emerald-700">FAQs</p>
        <h1 className="font-syne mb-14 text-center text-[clamp(2rem,6vw,3.25rem)] font-black leading-[1.05] tracking-tight text-slate-950">
          AI Optimisation, straight answers
        </h1>

        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {FAQS.map((item) => (
            <div key={item.q} className="py-8">
              <h2 className="font-syne mb-3 text-xl font-bold text-slate-950">{item.q}</h2>
              <p className="leading-relaxed text-slate-600">{item.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            to={AIO_PAGE_PATHS.contact}
            className="text-sm font-black uppercase tracking-[0.3em] text-emerald-700 hover:text-emerald-900"
          >
            Still have a question? Get in touch
          </Link>
        </div>
      </div>
    </main>
  );
};

export default AIOFaqs;
