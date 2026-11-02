import React from 'react';
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { ArrowRight } from 'lucide-react';
import { useAIOSeo } from '../useAIOSeo';
import { AIO_PAGE_PATHS } from '../components/AIONavbar';

const PREVIEW_FAQS = [
  {
    q: 'Can you guarantee ChatGPT will recommend my business?',
    a: 'No — no one can guarantee what an AI model says, including us. We improve how clearly AI tools can read and understand your business, which improves your chances of being described accurately.'
  },
  {
    q: 'Is this the same as SEO?',
    a: 'Related, but different. SEO targets ranked links on a search results page. AI Optimisation targets how answer engines summarise and recommend a business inside a conversation.'
  }
];

interface AIOHomeProps {
  startAnimation?: boolean;
}

const AIOHome: React.FC<AIOHomeProps> = ({ startAnimation = true }) => {
  useAIOSeo({
    title: 'SABR Digital AI Optimisation | Get Found by AI, Not Just Google',
    description: 'We help businesses improve how clearly AI tools like ChatGPT, Gemini, Perplexity and Google AI Overviews understand and recommend them.',
    path: '/'
  });

  // The hero photo is already in frame from the moment this page paints —
  // it is the exact file the gateway's split-screen panel just grew to fill,
  // with the same overlay, so there is nothing for the image itself to
  // animate. Only the text and buttons ease in afterwards, staggered the
  // same way the web design studio's Hero.tsx reveals its own.
  const reveal = (delayMs: number): React.CSSProperties => ({
    transitionDelay: `${delayMs}ms`
  });
  const revealClass = `transition-[opacity,transform] duration-700 ease-out ${
    startAnimation ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
  }`;

  return (
    <main className="bg-[#fdfbf7]">
      <section className="relative flex h-[100dvh] flex-col items-center justify-center overflow-hidden bg-[#0f241d] px-6 pb-20 pt-36 text-center md:px-10">
        {/* Same photo and overlay as the gateway's AI Optimisation panel
            (gateway/GatewayPage.tsx), so arriving from there hands off to an
            identical frame instead of a visible jump. */}
        <img
          src="/images/aio-panel-1735.jpg"
          srcSet="/images/aio-panel-1100.jpg 1100w, /images/aio-panel-1735.jpg 1735w"
          sizes="100vw"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(7,19,15,0.55) 0%, rgba(7,19,15,0.72) 55%, rgba(7,19,15,0.88) 100%)'
          }}
        />

        <div className="relative z-10 flex flex-col items-center">
          <p
            style={reveal(0)}
            className={`${revealClass} mb-6 text-[11px] font-black uppercase tracking-[0.5em] text-emerald-300`}
          >
            SABR Digital AI Optimisation
          </p>
          <h1
            style={reveal(90)}
            className={`${revealClass} font-syne max-w-4xl text-[clamp(2.2rem,8vw,4.5rem)] font-black uppercase leading-[0.95] tracking-tight text-white`}
          >
            Get found by AI,<br />not just Google.
          </h1>
          <p
            style={reveal(180)}
            className={`${revealClass} mt-8 max-w-2xl text-lg leading-relaxed text-emerald-50/80 md:text-xl`}
          >
            ChatGPT, Gemini, Perplexity and Google's AI Overviews are answering the questions your customers used to
            type into Google. We help your business show up in those answers — written and structured so AI tools
            can understand what you do, who you serve, and why you're worth recommending.
          </p>
          <div style={reveal(270)} className={`${revealClass} mt-10 flex flex-wrap items-center justify-center gap-4`}>
            <Link
              to={AIO_PAGE_PATHS.audit}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-4 text-[12px] font-black uppercase tracking-[0.25em] text-[#0f241d] shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              Get a free AI audit <ArrowRight size={16} />
            </Link>
            <Link
              to={AIO_PAGE_PATHS['what-is-aio']}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-4 text-[12px] font-black uppercase tracking-[0.25em] text-white transition-colors hover:bg-white/10"
            >
              What is AIO?
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-24 text-center md:py-32">
        <p className="mb-5 text-[11px] font-black uppercase tracking-[0.4em] text-emerald-700">In plain English</p>
        <h2 className="font-syne mb-8 text-[clamp(1.6rem,5vw,2.75rem)] font-black leading-tight tracking-tight text-slate-950">
          What is AI Optimisation?
        </h2>
        <p className="text-lg leading-relaxed text-slate-600">
          When someone asks ChatGPT or Google's AI Overview "who's a good &lt;your trade&gt; near me?", the answer
          is pulled together from whatever the AI can find and understand about businesses like yours. AI
          Optimisation (AIO) is the practice of making your business's information clear, accurate and easy for
          those tools to read — so you have a fair chance of being part of the answer.
        </p>
        <Link
          to={AIO_PAGE_PATHS['what-is-aio']}
          className="mt-8 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.3em] text-emerald-700 hover:text-emerald-900"
        >
          Read the full explanation <ArrowRight size={14} />
        </Link>
      </section>

      <section className="bg-white px-6 py-24 md:py-32">
        <div className="mx-auto max-w-3xl">
          <p className="mb-5 text-center text-[11px] font-black uppercase tracking-[0.4em] text-emerald-700">A couple of honest answers</p>
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {PREVIEW_FAQS.map((item) => (
              <div key={item.q} className="py-7">
                <h3 className="font-syne mb-2 text-lg font-bold text-slate-950">{item.q}</h3>
                <p className="text-slate-600">{item.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              to={AIO_PAGE_PATHS.faqs}
              className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.3em] text-emerald-700 hover:text-emerald-900"
            >
              See all FAQs <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p className="text-slate-600">
          AI Optimisation is a separate website and service from the SABR Digital web design studio, built and run
          by the same small team.{' '}
          <a href="/web-design/" className="font-semibold text-emerald-700 underline underline-offset-4 hover:text-emerald-900">
            Need a new website instead? Visit the web design studio.
          </a>
        </p>
      </section>
    </main>
  );
};

export default AIOHome;
