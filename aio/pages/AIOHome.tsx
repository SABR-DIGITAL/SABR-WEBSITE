import React, { useEffect, useRef } from 'react';
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { gsap } from 'gsap';
import {
  ArrowRight,
  Search,
  Braces,
  MessageSquare,
  Network,
  Bot,
  MapPin,
  ShieldCheck,
  Activity
} from 'lucide-react';
import { useAIOSeo } from '../useAIOSeo';
import { AIO_PAGE_PATHS } from '../components/AIONavbar';
import WebsiteScoreScanner from '../../components/WebsiteScoreScanner';
import AboutFounderSection from '../../components/AboutFounderSection';
import WhyWebsiteSection, { SabrPro } from '../../components/WhyWebsiteSection';

const AIO_PILLARS: SabrPro[] = [
  {
    id: 1,
    title: 'AI Readability Audit',
    icon: <Search size={16} />,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    meaning: 'A plain-English review of how AI tools currently read — and misread — your website and listings.',
    matters: "You can't fix what you can't see. Most businesses have never checked what ChatGPT or Gemini actually say about them.",
    outcomes: ['Clear starting point', 'Errors spotted early', 'Prioritised next steps', 'No jargon', 'No obligation']
  },
  {
    id: 2,
    title: 'Structured Data',
    icon: <Braces size={16} />,
    color: 'text-cyan-600',
    bg: 'bg-cyan-50',
    meaning: 'Schema.org markup that spells out your services, location, hours and reviews in a format machines read reliably.',
    matters: 'AI systems and search engines lean on structured facts when they summarise a business.',
    outcomes: ['Facts read correctly', 'Richer search results', 'Services clearly labelled', 'Opening hours understood', 'Fewer AI mix-ups']
  },
  {
    id: 3,
    title: 'Answer-Ready Content',
    icon: <MessageSquare size={16} />,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    meaning: 'Key pages rewritten as clear, direct answers to the questions your customers actually ask.',
    matters: 'Answer engines quote content that answers a question plainly. Vague marketing copy gets skipped.',
    outcomes: ['Quotable answers', 'Clearer service pages', 'Better FAQ coverage', 'Helps human visitors too', 'Stronger topical relevance']
  },
  {
    id: 4,
    title: 'Consistent Details',
    icon: <Network size={16} />,
    color: 'text-slate-800',
    bg: 'bg-slate-50',
    meaning: 'Your name, address, phone and services matching everywhere AI tools draw information from.',
    matters: 'Conflicting details across directories and review sites make AI tools less confident about your business.',
    outcomes: ['One consistent identity', 'Outdated listings fixed', 'Fewer wrong phone numbers', 'Stronger local signals', 'More confident AI answers']
  },
  {
    id: 5,
    title: 'AI Crawler Access',
    icon: <Bot size={16} />,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    meaning: 'Making sure AI crawlers are allowed in and can find what matters — robots.txt, sitemaps and llms.txt.',
    matters: 'Some sites block AI crawlers by accident, so the tools never see the content at all.',
    outcomes: ['Crawlers not blocked', 'llms.txt in place', 'Clean sitemap', 'Key pages discoverable', 'Nothing important hidden']
  },
  {
    id: 6,
    title: 'Local Entity Clarity',
    icon: <MapPin size={16} />,
    color: 'text-amber-500',
    bg: 'bg-amber-50',
    meaning: 'Making it unmistakable who you are, what you do and exactly which areas you serve.',
    matters: '"Near me" questions are answered by matching a business to a place. Unclear service areas get left out.',
    outcomes: ['Service areas defined', 'Location pages clarified', 'Better "near me" relevance', 'Clear business category', 'Less confusion with namesakes']
  },
  {
    id: 7,
    title: 'Trust & Reviews',
    icon: <ShieldCheck size={16} />,
    color: 'text-emerald-50',
    bg: 'bg-emerald-600',
    meaning: 'Surfacing genuine reviews, credentials and proof in places AI tools can see and understand.',
    matters: 'AI tools favour businesses with clear, consistent evidence that real customers trust them.',
    outcomes: ['Reviews made visible', 'Credentials highlighted', 'Proof in context', 'Stronger reputation signals', 'Warmer enquiries']
  },
  {
    id: 8,
    title: 'Ongoing Monitoring',
    icon: <Activity size={16} />,
    color: 'text-blue-50',
    bg: 'bg-blue-500',
    meaning: 'Periodic checks on how AI tools describe your business, with adjustments as they change.',
    matters: 'AI models and the sources they draw from change constantly. What is accurate today can drift.',
    outcomes: ['Regular check-ins', 'Changes spotted early', 'Plain-English updates', 'Adjustments as models evolve', 'Peace of mind']
  }
];

interface AIOHeroProps {
  startAnimation: boolean;
}

// Mirrors the web design studio's Hero.tsx layout and GSAP reveal. The photo
// and overlay stay identical to the gateway's AI Optimisation panel
// (gateway/GatewayPage.tsx), so arriving from there hands off to the same
// frame instead of a visible jump — only the text and buttons animate in.
const AIOHero: React.FC<AIOHeroProps> = ({ startAnimation }) => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!startAnimation) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out', force3D: true } });
      tl.fromTo('.aio-hero-title-top', { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 0.8 });
      tl.fromTo(
        '.aio-hero-reveal-bottom',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
        '-=0.5'
      );
    }, containerRef);

    return () => ctx.revert();
  }, [startAnimation]);

  return (
    <section ref={containerRef} className="relative h-[100dvh] flex items-center px-6 lg:px-24 overflow-hidden bg-[#0f241d]">
      <div className="absolute inset-0 z-0">
        <picture>
          <source
            type="image/webp"
            srcSet="/images/aio-panel-1100.webp 1100w, /images/aio-panel-1735.webp 1735w"
            sizes="100vw"
          />
          <img
            src="/images/aio-panel-1735.jpg"
            srcSet="/images/aio-panel-1100.jpg 1100w, /images/aio-panel-1735.jpg 1735w"
            sizes="100vw"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </picture>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(7,19,15,0.55) 0%, rgba(7,19,15,0.72) 55%, rgba(7,19,15,0.88) 100%)'
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto sm:mx-0 flex flex-col items-center sm:items-start text-center sm:text-left justify-center gap-6 md:gap-8 pt-8">
        <h1 className="font-syne text-[clamp(2.6rem,7vw,4.4rem)] font-black leading-[0.98] tracking-[-0.035em] text-white">
          <span className="aio-hero-title-top inline-block opacity-0 drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
            Get found by <span className="text-shimmer-blue italic font-black">AI.</span>
          </span>
        </h1>

        <div className="aio-hero-reveal-bottom opacity-0 max-w-2xl">
          <p className="font-inter text-lg sm:text-xl md:text-2xl text-stone-100 font-normal leading-relaxed tracking-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
            Show up in the answers ChatGPT, Gemini and Google AI give your customers.
          </p>
        </div>

        <div className="aio-hero-reveal-bottom opacity-0 flex flex-col sm:flex-row gap-4 items-center sm:items-start pt-2">
          <Link
            to={AIO_PAGE_PATHS.audit}
            className="w-full sm:w-auto px-7 py-3.5 bg-[#f5f2eb] hover:bg-white text-stone-900 rounded-xl font-semibold text-xs sm:text-sm tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2.5"
          >
            <span>Get a Free AI Audit</span>
            <ArrowRight size={15} />
          </Link>
          <Link
            to={AIO_PAGE_PATHS['what-is-aio']}
            className="w-full sm:w-auto px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white/95 border border-white/25 hover:border-white/40 rounded-xl font-medium text-xs sm:text-sm tracking-wide transition-all duration-300 backdrop-blur-sm hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
          >
            <span>What is AIO?</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

interface AIOHomeProps {
  startAnimation?: boolean;
}

const AIOHome: React.FC<AIOHomeProps> = ({ startAnimation = true }) => {
  useAIOSeo({
    title: 'SABR Digital AI Optimisation | Get Found by AI, Not Just Google',
    description: 'We help businesses improve how clearly AI tools like ChatGPT, Gemini, Perplexity and Google AI Overviews understand and recommend them.',
    path: '/'
  });

  return (
    <main className="bg-[#fdfbf7]">
      <AIOHero startAnimation={startAnimation} />

      <WebsiteScoreScanner
        headline={
          <>
            Score<br />
            Your<br />
            AI Readiness<br />
            <span className="text-shimmer-blue italic">Out of 100.</span>
          </>
        }
        subtitle="Enter your domain for an instant check of how ready your site is for AI tools — crawler access, llms.txt, schema markup and answer-friendly structure — alongside the speed, mobile and SEO basics they also rely on."
        ctaLabel="Get a Free AI Audit"
        ctaTo={AIO_PAGE_PATHS.audit}
        narrative={[
          'Your site is in strong technical shape for AI tools. A free AI audit checks the other half — how ChatGPT, Gemini and Google AI actually describe your business today.',
          'There are gaps that make it harder for AI tools to read and trust your site. A free AI audit shows how they currently describe your business and the clearest first steps to improve it.'
        ]}
      />

      <AboutFounderSection
        headline={
          <>
            My name is Raphael, and I run{' '}
            <span className="text-shimmer-blue italic font-black uppercase">SABR DIGITAL</span> AI Optimisation.
          </>
        }
        body="Customers are asking AI tools the questions they used to type into Google, and most local businesses have no idea what those tools say about them. I help Wiltshire businesses fix that — making your information clear, accurate and easy for AI to understand, explained in plain English. No hype and no guaranteed rankings, because no one can honestly promise what an AI will say."
        points={[
          'Face to face in Wiltshire',
          'Plain-English reports',
          'Honest — no guaranteed rankings',
          'Replies within 12 hours'
        ]}
        ctaLabel="Talk to Us About AIO"
        ctaTo={AIO_PAGE_PATHS.contact}
      />

      <WhyWebsiteSection
        items={AIO_PILLARS}
        eyebrow="SABR AIO"
        headline={
          <>
            WHY <br /> <span className="text-emerald-600 italic">GET FOUND</span> <br /> BY AI?
          </>
        }
        blurb='"Explore the pillars of AI Optimisation. Click an item on the left to see what it means and why it matters."'
        modalBrand="AIO"
      />
    </main>
  );
};

export default AIOHome;
