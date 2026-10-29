import React, { useState } from 'react';
import { motion as framerMotion } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  Check, 
  Layers, 
  Zap, 
  Search, 
  Calendar, 
  ShieldCheck, 
  Smartphone, 
  Clock, 
  MousePointerClick,
  Code2,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { Page } from '../App';

const motion = framerMotion as any;

interface WhatWeOfferProps {
  navigateTo?: (page: Page) => void;
}

interface OfferCategory {
  id: string;
  badge: string;
  title: string;
  timeline: string;
  summary: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  deliverables: string[];
  metric: { value: string; label: string };
  gradient: string;
}

export const WhatWeOfferSection: React.FC<WhatWeOfferProps> = ({ navigateTo }) => {
  const [activeTab, setActiveTab] = useState<string>('bespoke-web');

  const offers: OfferCategory[] = [
    {
      id: 'bespoke-web',
      badge: 'CORE ARCHITECTURE',
      title: 'Bespoke Web Design & Engineering',
      timeline: '2–3 Week Delivery',
      summary: 'Handcrafted, high-converting digital storefronts built from scratch with modern TypeScript, React, and tailored aesthetic systems — completely free of bloated WordPress templates.',
      icon: Code2,
      deliverables: [
        'Custom interactive UX/UI designed for your brand',
        'Sub-second page load times with 98+ Google Lighthouse score',
        'Tailored motion graphics & smooth responsive micro-interactions',
        'Mobile-first responsive architecture across all screen sizes',
        'Full content management hand-off & clean codebase'
      ],
      metric: { value: '99.8%', label: 'Average Core Web Vitals Score' },
      gradient: 'from-blue-600 to-indigo-600'
    },
    {
      id: 'local-seo',
      badge: 'DISCOVERY ENGINE',
      title: 'Local SEO & Google Search Dominance',
      timeline: 'Built-in Day 1',
      summary: 'Structured semantic data, local citation architectures, and Google Maps Local Pack positioning that put your business at the top when high-intent local clients search for your services.',
      icon: Search,
      deliverables: [
        'Local keyword targeting & geo-targeted landing page structures',
        'Schema.org structured rich snippets for Google search cards',
        'Voice search & conversational AI readiness',
        'Automated XML sitemap & instant search console indexing',
        'Google Business Profile integration & review booster widgets'
      ],
      metric: { value: '3.4x', label: 'Average Organic Search Increase' },
      gradient: 'from-emerald-600 to-teal-600'
    },
    {
      id: 'booking-systems',
      badge: 'CONVERSION FLOWS',
      title: 'Direct Booking & Enquiry Engines',
      timeline: 'Turnkey Integration',
      summary: 'Frictionless customer reservation workflows, instant quote calculators, and automated lead dispatch systems that capture bookings 24/7 directly on your site without commission fees.',
      icon: Calendar,
      deliverables: [
        'Custom appointment schedulers & interactive live calendars',
        'Instant WhatsApp & SMS instant lead notification routing',
        'Bespoke quote & enquiry estimate builders',
        'Stripe & Apple Pay direct checkout capabilities',
        'Automated confirmation emails & calendar ICS sync'
      ],
      metric: { value: '42%', label: 'Higher Direct Booking Conversion' },
      gradient: 'from-purple-600 to-pink-600'
    },
    {
      id: 'managed-care',
      badge: 'ONGOING RELIABILITY',
      title: 'Managed Cloud Hosting & Care',
      timeline: '24/7 Continuous Monitoring',
      summary: 'Enterprise-grade edge hosting, automated daily backups, SSL security certificates, and direct WhatsApp priority support whenever you need to update copy, imagery, or campaigns.',
      icon: ShieldCheck,
      deliverables: [
        'Ultra-fast global CDN & edge caching deployment',
        'SSL encryption, DDoS defense & automated threat prevention',
        'Daily cloud backups with one-click restore points',
        'Priority content updates & seasonal promotion tweaks',
        'Dedicated UK-based engineering team on call'
      ],
      metric: { value: '99.99%', label: 'Guaranteed Server Uptime' },
      gradient: 'from-amber-600 to-orange-600'
    }
  ];

  const currentOffer = offers.find((o) => o.id === activeTab) || offers[0];
  const IconComponent = currentOffer.icon;

  return (
    <section id="what-we-offer" className="py-28 md:py-36 bg-[#fdfbf7] text-slate-950 border-t border-slate-200/70 relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* SECTION HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20 pb-8 border-b border-slate-200">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 border border-blue-200/60 rounded-full">
              <Sparkles size={13} className="text-blue-600" />
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-blue-700 font-bold">
                WHAT WE OFFER
              </span>
            </div>
            <h2 className="font-syne text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 uppercase leading-none">
              THIS IS WHAT <br />
              <span className="text-blue-600 italic">WE DELIVER.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            Everything your business needs to outperform local competitors online — engineered for speed, high conversion, and effortless customer discovery.
          </p>
        </div>

        {/* INTERACTIVE OFFERING SELECTOR */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {offers.map((offer) => {
            const isSelected = offer.id === activeTab;
            const TabIcon = offer.icon;
            return (
              <button
                key={offer.id}
                onClick={() => setActiveTab(offer.id)}
                className={`p-6 text-left border transition-all duration-300 cursor-pointer rounded-xl flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-950 text-white border-slate-950 shadow-xl ring-2 ring-blue-600/30 -translate-y-1'
                    : 'bg-white text-slate-800 border-slate-200/90 hover:border-slate-400/80 hover:bg-slate-50/80'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-blue-50 text-blue-600'
                      }`}
                    >
                      <TabIcon size={18} />
                    </div>
                    <span
                      className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        isSelected ? 'bg-white/10 text-slate-300' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {offer.badge}
                    </span>
                  </div>
                  <h4 className="font-syne text-base font-bold tracking-tight">
                    {offer.title}
                  </h4>
                </div>

                <div className="pt-4 mt-4 border-t border-current/10 flex items-center justify-between text-xs font-mono">
                  <span className={isSelected ? 'text-blue-400 font-bold' : 'text-slate-500'}>
                    {offer.timeline}
                  </span>
                  <ArrowRight
                    size={14}
                    className={`transition-transform ${isSelected ? 'translate-x-1 text-blue-400' : 'opacity-40'}`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* DETAILED ACTIVE OFFERING STAGE */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-8 sm:p-12 lg:p-14 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* LEFT: DESCRIPTIVE HIGHLIGHTS */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-mono uppercase tracking-widest font-bold rounded-md">
                  {currentOffer.badge}
                </span>
                <span className="text-xs font-mono text-slate-500 font-bold flex items-center gap-1.5">
                  <Clock size={13} className="text-blue-600" />
                  {currentOffer.timeline}
                </span>
              </div>

              <h3 className="font-syne text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
                {currentOffer.title}
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                {currentOffer.summary}
              </p>

              {/* DELIVERABLES CHECKLIST */}
              <div className="space-y-3 pt-2">
                <span className="text-[11px] uppercase tracking-[0.2em] font-mono text-slate-400 font-bold block">
                  KEY DELIVERABLES INCLUDED
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentOffer.deliverables.map((item) => (
                    <div key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <div className="w-4 h-4 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 border border-blue-200">
                        <Check size={10} strokeWidth={3} />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ACTION BUTTON */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => navigateTo ? navigateTo('contact') : window.location.assign('/contact')}
                  className="px-8 py-4 bg-blue-600 hover:bg-slate-950 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-xl transition-all shadow-lg hover:shadow-xl cursor-pointer flex items-center gap-2"
                >
                  <span>START YOUR PROJECT</span>
                  <ArrowRight size={14} />
                </button>
                <button
                  onClick={() => navigateTo ? navigateTo('work') : window.location.assign('/projects')}
                  className="px-7 py-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-[0.18em] rounded-xl transition-colors cursor-pointer"
                >
                  VIEW LIVE DEMOS
                </button>
              </div>
            </div>

            {/* RIGHT: IMPACT METRIC CARD */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 to-slate-900 text-white p-8 sm:p-10 rounded-2xl border border-slate-800 shadow-2xl flex flex-col justify-between space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-4 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <IconComponent size={24} />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-blue-400 font-bold block">
                  PROVEN CLIENT IMPACT
                </span>
                <div className="space-y-1">
                  <div className="font-syne text-5xl sm:text-6xl font-black text-white tracking-tight">
                    {currentOffer.metric.value}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 font-medium">
                    {currentOffer.metric.label}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 relative z-10">
                <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-bold flex items-center gap-1.5">
                  <ShieldCheck size={13} />
                  OUR GUARANTEE
                </span>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  100% bespoke design, zero template lock-in, and full source code ownership provided upon project completion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeOfferSection;
