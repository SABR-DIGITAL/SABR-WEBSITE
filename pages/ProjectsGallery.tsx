import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowUpRight, MoveRight } from 'lucide-react';
// Fix react-router-dom missing exports
import * as RouterDOM from 'react-router-dom';
const { Link, useNavigate, useLocation } = RouterDOM as any;
import { motion as framerMotion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { demoChunks, warmDemoChunk, type DemoId } from '../components/demos/demoChunks';
import { HERO_SLIDES } from '../components/demos/landscaping/landscapingData';
import { images as equestrianImages } from '../components/demos/equestrian/equestrianData';

const motion = framerMotion as any;
gsap.registerPlugin(ScrollTrigger);

// Warming a demo means two things: its route chunk and the photograph that
// fills its first screen. Both are pulled in before the visitor clicks, so the
// demo paints immediately instead of loading in front of them.
const warmedImages = new Set<string>();

const warmDemo = (id: DemoId, heroImage?: string) => {
  warmDemoChunk(id);
  if (heroImage && !warmedImages.has(heroImage)) {
    warmedImages.add(heroImage);
    const img = new Image();
    img.decoding = 'async';
    img.src = heroImage;
  }
};

export type TierKey = 'traditional' | 'minimalistic' | 'luxury';
export type LandscapingTierKey = TierKey;

interface TierConfig {
  key: TierKey;
  id: DemoId;
  tierName: string;
  shortLabel: string;
  styleLabel: string;
  cardIndex: string;
  path: string;
  previewImage: string;
  accent: string;
  badgeBg: string;
  badgeText: string;
  features: string[];
}

// Always sync the Landscaping preview photo with the primary homepage slide in landscapingData.ts / Home.tsx
const SHARED_LANDSCAPING_HERO_IMAGE =
  HERO_SLIDES[0]?.image || '/images/projects/landscaping-preview.webp';

const LANDSCAPING_TIERS: Record<TierKey, TierConfig> = {
  luxury: {
    key: 'luxury',
    id: 'landscaping-luxury',
    tierName: 'Luxury',
    shortLabel: 'Luxury',
    styleLabel: 'Luxury & Bespoke Motion',
    cardIndex: '01',
    path: '/demo/landscaping-luxury',
    previewImage: SHARED_LANDSCAPING_HERO_IMAGE,
    accent: '#8C7A5B',
    badgeBg: '#F4F1EA',
    badgeText: '#4A4031',
    features: [
      'Full-bleed dark obsidian & champagne-gold architectural showcase',
      'Five-column interactive index drawer with smooth motion transitions',
      'Private commission desk crafted for flagship country estates'
    ]
  },
  minimalistic: {
    key: 'minimalistic',
    id: 'landscaping',
    tierName: 'Minimalistic',
    shortLabel: 'Minimalistic',
    styleLabel: 'Minimalistic & Formal',
    cardIndex: '02',
    path: '/demo/landscaping',
    previewImage: '/images/projects/landscaping-minimal-video-poster.jpg',
    accent: '#5B6450',
    badgeBg: '#F4F1EA',
    badgeText: '#44503B',
    features: [
      'Minimalistic architectural layout that lets the gardens lead',
      '50/50 split hamburger navigation and calm editorial spacing',
      'Tailored consultation flow for high-value residential estates'
    ]
  },
  traditional: {
    key: 'traditional',
    id: 'landscaping-traditional',
    tierName: 'Traditional',
    shortLabel: 'Traditional',
    styleLabel: 'Traditional & Easy to Scroll',
    cardIndex: '03',
    path: '/demo/landscaping-traditional',
    previewImage:
      'https://dmhdaawgg48dl.cloudfront.net/wp-content/uploads/2024/10/yorkstone-rill-water-feature-english-country-petworth-sussex-1920x1280.jpg',
    accent: '#14532D',
    badgeBg: '#F4F4F5',
    badgeText: '#14532D',
    features: [
      'Traditional, familiar structure built for immediate local trust',
      'Clean two-tone heritage green palette with open editorial spacing',
      'Direct telephone bar & fast quote form for instant enquiries'
    ]
  }
};

const EQUESTRIAN_TIERS: Record<TierKey, TierConfig> = {
  luxury: {
    key: 'luxury',
    id: 'equestrian-luxury',
    tierName: 'Luxury',
    shortLabel: 'Luxury',
    styleLabel: 'Minimalist Luxury & Video Hero',
    cardIndex: '01',
    path: '/demo/equestrian-luxury',
    previewImage: equestrianImages.hacking,
    accent: '#7A6B53',
    badgeBg: '#F4F1EA',
    badgeText: '#3D3529',
    features: [
      'Full-frame silent riding video hero optimized for phone, tablet & desktop',
      'White crest emblem, self-writing luxury script & 50/50 split menu',
      'Symmetrical tuition & schoolmaster ledgers with SABR-style contact'
    ]
  },
  minimalistic: {
    key: 'minimalistic',
    id: 'equestrian-vibrant',
    tierName: 'Vibrant',
    shortLabel: 'Vibrant',
    styleLabel: 'Vibrant, Minimalist & Modern',
    cardIndex: '02',
    path: '/demo/equestrian-vibrant',
    previewImage: '/assets/aistudio/Gemini_Generated_Image_sma90vsma90vsma9_300587b3.jpg',
    accent: '#0D82DF',
    badgeBg: '#EBF6FF',
    badgeText: '#0D82DF',
    features: [
      '4K full-viewport showjumping hero with vibrant blue, cream & white palette',
      'Five-column architectural photo menu & vector equestrian brand logo marquee',
      'Curated discipline showcase and spacious resident schoolmaster gallery'
    ]
  },
  traditional: {
    key: 'traditional',
    id: 'equestrian',
    tierName: 'Country',
    shortLabel: 'Country',
    styleLabel: 'Warm Country & Approachable',
    cardIndex: '03',
    path: '/demo/equestrian',
    previewImage: equestrianImages.stables,
    accent: '#2D5A43',
    badgeBg: '#E8F0EB',
    badgeText: '#2D5A43',
    features: [
      'Warm English country yard palette with interactive horse matcher',
      'Brass loosebox stall nameplates and compact lesson cards',
      'Three-step booking request wired directly to the tack room'
    ]
  }
};

const TIER_ORDER: TierKey[] = ['luxury', 'minimalistic', 'traditional'];

interface Project {
  id: DemoId;
  /* The trading name the demo actually uses. */
  wordmark: string;
  industry: string;
  /* Two-line headline: black first line, shimmering italic second. */
  headline: [string, string];
  path: string;
  /* Same URL the demo's own hero uses, so warming it fills the browser cache. */
  heroImage: string;
  /* Accent lifted from the demo's own palette. */
  accent: string;
  /* Real pages and features inside each build. */
  features: string[];
}

const projects: Project[] = [
  {
    id: 'landscaping',
    wordmark: 'Oak & Ash',
    industry: 'Garden Design & Build · 3 Demos',
    headline: ['28 years of', 'award-winning gardens.'],
    path: '/demo/landscaping-luxury',
    heroImage: SHARED_LANDSCAPING_HERO_IMAGE,
    accent: '#5B6450',
    features: [
      'Three complete website styles: Luxury, Minimalistic & Traditional',
      'Smooth, glide-like animations across desktop, tablet, and mobile',
      'Frictionless enquiry flow built for high-value clients'
    ]
  },
  {
    id: 'equestrian',
    wordmark: 'Bramble & Bay',
    industry: 'Riding Academy · 3 Demos',
    headline: ['Classical equitation,', 'four hundred private acres.'],
    path: '/demo/equestrian-luxury',
    heroImage: '/images/projects/equestrian-preview.webp',
    accent: '#3E4B41',
    features: [
      'Three distinct designs: Video Luxury, Vibrant Showjumping & Country',
      'Symmetrical tuition directories, brand logo marquee & schoolmaster ledgers',
      'Direct tack room booking and instant contact channels'
    ]
  },
  {
    id: 'physio',
    wordmark: 'Pulteney Physiotherapy',
    industry: 'Chartered Physiotherapy · UK',
    headline: ['Come heal', 'with us.'],
    path: '/demo/physio',
    heroImage: '/images/projects/physio-preview.webp',
    accent: '#0D9488',
    features: [
      'Light, uplifting palette that builds instant patient trust',
      'Interactive pain-relief guide and three UK clinic directories',
      'Seamless appointment request flow across Bath, Bristol & Cheltenham'
    ]
  },
  {
    id: 'spa',
    wordmark: 'Verdant Relax Park',
    industry: 'Luxury Spa & Resort',
    headline: ['Mineral baths,', 'quiet pines.'],
    path: '/demo/spa',
    heroImage: '/images/projects/spa-preview.webp',
    accent: '#10B981',
    features: [
      'Refined visual pacing that mirrors the calm of the resort',
      'Intuitive browsing that keeps guests engaged longer',
      'Direct reservation path woven seamlessly into every page'
    ]
  },
  {
    id: 'cafe',
    wordmark: 'The Hearth',
    industry: 'Cafe',
    headline: ['One tap', 'to a table.'],
    path: '/demo/cafe',
    heroImage: '/images/projects/cafe-preview.webp',
    accent: '#A4715E',
    features: [
      'Built for speed so on-the-go customers never bounce',
      'One-tap access to menus, hours, and table reservations',
      'Clean, modern presentation that drives daily walk-ins'
    ]
  }
];

// Pull the five preview photos into the browser cache ahead of time, so they
// are already local by the time anyone opens the Projects page.
const predecodedProjectImages: HTMLImageElement[] = [];
if (typeof window !== 'undefined') {
  const warmPreviews = () => {
    projects.forEach((p) => {
      if (warmedImages.has(p.heroImage)) return;
      warmedImages.add(p.heroImage);
      const img = new Image();
      img.decoding = 'async';
      (img as any).fetchPriority = 'low';
      img.src = p.heroImage;
      predecodedProjectImages.push(img);
    });
  };
  const whenIdle = () => {
    const idle = (window as any).requestIdleCallback;
    if (typeof idle === 'function') idle(warmPreviews, { timeout: 4000 });
    else window.setTimeout(warmPreviews, 1500);
  };
  if (document.readyState === 'complete') whenIdle();
  else window.addEventListener('load', whenIdle, { once: true });
}

// A browser window holding the demo's own first screen.
const PreviewWindow: React.FC<{ project: Project; priority?: boolean }> = ({ project }) => (
  <div className="group/card relative w-full rounded-[1.4rem] overflow-hidden bg-white border border-slate-200 shadow-[0_30px_70px_-40px_rgba(15,23,42,0.4)] hover:shadow-[0_45px_100px_-40px_rgba(15,23,42,0.5)] transition-shadow duration-700">
    {/* CHROME */}
    <div className="flex items-center gap-3 px-4 md:px-5 py-3 md:py-3.5 bg-[#F6F7F9] border-b border-slate-200">
      <span className="flex items-center gap-1.5 shrink-0">
        <span className="block w-2.5 h-2.5 rounded-full bg-[#DFE3E9]" />
        <span className="block w-2.5 h-2.5 rounded-full bg-[#DFE3E9]" />
        <span className="block w-2.5 h-2.5 rounded-full bg-[#DFE3E9]" />
      </span>
      <span className="flex-1 min-w-0 h-7 px-3 rounded-md bg-white border border-slate-200 flex items-center">
        <span className="truncate text-[9px] md:text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
          sabrdigital.co.uk{project.path}
        </span>
      </span>
    </div>

    {/* SCREEN */}
    <div className="relative overflow-hidden aspect-[16/10] bg-slate-100">
      <img
        src={project.heroImage}
        alt={`${project.wordmark} demo website`}
        width="1600"
        height="1000"
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="preview-shot absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover/card:scale-[1.05]"
      />
    </div>

    {/* CAPTION STRIP */}
    <div className="flex items-center justify-between gap-4 px-5 md:px-7 py-4 md:py-5 bg-white border-t border-slate-200">
      <span className="flex items-center gap-3 min-w-0">
        <span className="block w-1.5 h-6 rounded-full shrink-0" style={{ backgroundColor: project.accent }} />
        <span className="font-syne text-sm md:text-base font-black uppercase tracking-tight text-slate-950 truncate">
          {project.wordmark}
        </span>
      </span>
      <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.35em] text-slate-400 shrink-0">
        Live demo
      </span>
    </div>
  </div>
);

const TierHeroScreen: React.FC<{
  tierKey: TierKey;
  heroImage: string;
  wordmark: string;
}> = ({ tierKey, heroImage, wordmark }) => {
  return (
    <div className="relative w-full h-full overflow-hidden select-none bg-[#121613]">
      <img
        src={heroImage}
        alt={`${wordmark} ${tierKey} tier preview`}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="preview-shot absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover/card:scale-[1.03]"
      />
    </div>
  );
};

/**
 * Clean 3-Card Fanned Spread for Multi-Tier Projects (Oak & Ash and Bramble & Bay).
 * Clicking the spread opens the scrollable 3-Demo Preview Page.
 */
const TierSpreadPreview: React.FC<{
  wordmark: string;
  tiersMap: Record<TierKey, TierConfig>;
  heroImage: string;
  activeTier: TierKey;
  onOpenDemosPage: () => void;
}> = ({ wordmark, tiersMap, heroImage, onOpenDemosPage }) => {
  // Order cards 1 -> 2 -> 3 (01 Luxury in front Slot 0, 02 Minimalistic/Vibrant in middle Slot 1, 03 Traditional/Country in back Slot 2)
  const orderedTiers: TierKey[] = ['luxury', 'minimalistic', 'traditional'];

  const SLOTS = [
    {
      transform: 'translate3d(6%, 3%, 0) rotate(3deg) scale(1)',
      zIndex: 30,
    },
    {
      transform: 'translate3d(-1.5%, -0.5%, 0) rotate(-2.5deg) scale(0.96)',
      zIndex: 20,
    },
    {
      transform: 'translate3d(-9%, 1.5%, 0) rotate(-8deg) scale(0.92)',
      zIndex: 10,
    },
  ];

  return (
    <div className="relative w-full py-3 sm:py-8 px-2 sm:px-8 flex items-center justify-center select-none overflow-visible">
      <div className="relative w-[88%] sm:w-[84%] aspect-[16/11.5]">
        {SLOTS.map((slot, slotIdx) => {
          const tierKey = orderedTiers[slotIdx];
          const tier = tiersMap[tierKey];
          const isFront = slotIdx === 0;

          return (
            <div
              key={slotIdx}
              style={{
                transform: slot.transform,
                zIndex: slot.zIndex,
                transformOrigin: '35% 90%',
              }}
              className="absolute inset-0 transition-transform duration-700 ease-out"
            >
              <AnimatePresence mode="sync">
                <motion.div
                  key={tier.key}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  role="button"
                  tabIndex={0}
                  aria-label={`View all 3 ${wordmark} demos`}
                  onMouseEnter={() => warmDemo(tier.id, heroImage)}
                  onFocus={() => warmDemo(tier.id, heroImage)}
                  onTouchStart={() => warmDemo(tier.id, heroImage)}
                  onClick={onOpenDemosPage}
                  onKeyDown={(e: React.KeyboardEvent) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onOpenDemosPage();
                    }
                  }}
                  className={`
                    group/card absolute inset-0 flex flex-col rounded-[1.15rem] sm:rounded-[1.35rem] overflow-hidden cursor-pointer border bg-white border-slate-200
                    ${
                      isFront
                        ? 'shadow-[0_28px_65px_-22px_rgba(15,23,42,0.45)]'
                        : 'shadow-[0_18px_40px_-20px_rgba(15,23,42,0.32)] hover:brightness-105'
                    }
                  `}
                >
                  {/* TOP CHROME BAR (Uniform crisp white border & bar across all 3 cards) */}
                  <div className="shrink-0 flex items-center gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 border-b bg-white border-slate-200">
                    <span
                      className="inline-flex items-center justify-center px-2 py-0.5 rounded-md text-[8px] sm:text-[9px] font-syne font-black tracking-wider shrink-0"
                      style={{
                        backgroundColor: tier.badgeBg,
                        color: tier.badgeText,
                      }}
                    >
                      {tier.cardIndex} · {tier.shortLabel.toUpperCase()}
                    </span>

                    <span className="flex-1 min-w-0 h-5 sm:h-6 px-2.5 rounded-md flex items-center justify-between gap-2 border bg-slate-50 border-slate-200/90 text-slate-500">
                      <span className="truncate text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-[0.15em]">
                        sabrdigital.co.uk{tier.path}
                      </span>
                    </span>
                  </div>

                  {/* MIDDLE SCREEN — Each card shows its own distinct previewImage */}
                  <div className="relative flex-1 min-h-0 w-full overflow-hidden">
                    <TierHeroScreen tierKey={tier.key} heroImage={tier.previewImage} wordmark={wordmark} />
                  </div>

                  {/* BOTTOM CAPTION STRIP */}
                  <div className="shrink-0 flex items-center justify-between gap-2 px-3.5 sm:px-5 py-2.5 sm:py-3 border-t bg-white border-slate-200 text-slate-950">
                    <span className="flex items-center gap-2.5 min-w-0">
                      <span
                        className="block w-1.5 h-4 sm:h-5 rounded-full shrink-0"
                        style={{ backgroundColor: tier.accent }}
                      />
                      <span className="font-syne text-xs sm:text-sm font-black uppercase tracking-tight truncate">
                        {wordmark}
                      </span>
                      <span className="text-[7.5px] sm:text-[8.5px] font-extrabold uppercase tracking-[0.16em] truncate text-slate-500">
                        · 3 Demos
                      </span>
                    </span>

                    <span className="inline-flex items-center gap-1 text-[7.5px] sm:text-[8.5px] font-black uppercase tracking-[0.24em] shrink-0 text-emerald-700">
                      View demos ↗
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/**
 * Scrollable 3-Tier Preview Page (Formatted like Screenshot 3:
 * Alternating Left/Right, Right/Left, Left/Right rows down the page,
 * showing ONLY Aesthetic of the site, Title, the 3 points about it, and a clickable CTA for each of the 3 sites).
 */
const MultiDemoPreviewPage: React.FC<{
  projectKey: 'landscaping' | 'equestrian';
  onBack: () => void;
}> = ({ projectKey, onBack }) => {
  const navigate = useNavigate();
  const isEquestrian = projectKey === 'equestrian';
  const wordmark = isEquestrian ? 'Bramble & Bay' : 'Oak & Ash';
  const categoryLabel = isEquestrian
    ? 'Riding Academy · 3 Website Editions'
    : 'Garden Design & Build · 3 Website Editions';
  const tiersMap = isEquestrian ? EQUESTRIAN_TIERS : LANDSCAPING_TIERS;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
    TIER_ORDER.forEach((k) => {
      warmDemo(tiersMap[k].id, tiersMap[k].previewImage);
    });
  }, [projectKey, tiersMap]);

  const handleLaunchTier = (tier: TierConfig) => {
    if (!isEquestrian && tier.key === 'luxury' && typeof window !== 'undefined') {
      (window as any).__oakAshLuxuryInternalNav = false;
    }
    warmDemo(tier.id, tier.previewImage);
    navigate(tier.path);
  };

  return (
    <div className="bg-[#FAF8F3] min-h-screen pt-24 sm:pt-32 md:pt-40 pb-20 sm:pb-32 px-5 sm:px-8 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Top Back Navigation & Compact Collection Header */}
        <div className="pb-10 sm:pb-14 md:pb-20 border-b border-slate-200/80">
          <button
            type="button"
            onClick={onBack}
            className="group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-none bg-white border border-slate-300 hover:border-slate-950 text-slate-800 hover:text-slate-950 text-[10px] font-black uppercase tracking-[0.26em] transition-all cursor-pointer shadow-2xs mb-6 sm:mb-8"
          >
            <ArrowLeft
              size={14}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            <span>Back to all projects</span>
          </button>

          <p className="text-[9.5px] sm:text-[11px] font-black uppercase tracking-[0.42em] text-emerald-700 mb-2.5 sm:mb-3">
            {categoryLabel}
          </p>
          <h1 className="font-syne text-[clamp(1.85rem,5.5vw,3.75rem)] font-black text-slate-950 uppercase tracking-tighter leading-[0.95]">
            {wordmark}{' '}
            <span className="text-shimmer-blue italic inline-block pr-2">
              Demos.
            </span>
          </h1>
        </div>

        {/* 3 Alternating Left/Right -> Right/Left -> Left/Right Rows (Formatted like Screenshot 3) */}
        <div className="divide-y divide-slate-200/80">
          {TIER_ORDER.map((tierKey, idx) => {
            const tier = tiersMap[tierKey];
            // Row 0: Text Left, Photo Right (isTextLeft = true)
            // Row 1: Photo Left, Text Right (isTextLeft = false)
            // Row 2: Text Left, Photo Right (isTextLeft = true)
            const isTextLeft = idx % 2 === 0;

            return (
              <section
                key={tier.key}
                className="py-12 sm:py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16 items-center"
              >
                {/* TEXT COLUMN: Resized Number + Aesthetic as Main Heading, 3 concise points, and Clickable CTA */}
                <div
                  className={`lg:col-span-5 flex flex-col items-start ${
                    isTextLeft ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  {/* 1. Resized Number + Aesthetic of the site replacing the title */}
                  <h2 className="font-cormorant text-[clamp(2rem,4.2vw,3.35rem)] font-normal text-[#1C211D] leading-[1.08] tracking-[-0.01em] mb-6 sm:mb-8">
                    {tier.cardIndex} &mdash; {tier.styleLabel}
                  </h2>

                  {/* 2. The 3 concise bullet points about it */}
                  <ul className="w-full space-y-3 sm:space-y-3.5 pb-6 sm:pb-8 mb-6 sm:mb-8 border-b border-slate-200/90">
                    {tier.features.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 text-[13px] sm:text-[14px] text-[#5A6058] font-light leading-relaxed"
                      >
                        <span
                          className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: tier.accent }}
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  {/* 4. Clickable CTA for this specific demo site */}
                  <button
                    type="button"
                    onClick={() => handleLaunchTier(tier)}
                    onMouseEnter={() => warmDemo(tier.id, tier.previewImage)}
                    className="group/btn inline-flex items-center gap-4 pl-6 pr-1.5 py-1.5 rounded-full bg-slate-950 hover:bg-emerald-700 text-white transition-colors duration-300 cursor-pointer shadow-sm"
                  >
                    <span className="text-[9.5px] sm:text-[10px] font-black uppercase tracking-[0.28em]">
                      View {tier.shortLabel} Demo
                    </span>
                    <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-slate-950 flex items-center justify-center transition-transform duration-300 group-hover/btn:rotate-45">
                      <ArrowUpRight size={15} strokeWidth={2.5} />
                    </span>
                  </button>
                </div>

                {/* PHOTO COLUMN: Clean uncropped 16:10 photograph like Screenshot 3 */}
                <div
                  className={`lg:col-span-7 ${
                    isTextLeft ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div
                    role="button"
                    tabIndex={0}
                    aria-label={`Open ${wordmark} ${tier.tierName} demo`}
                    onClick={() => handleLaunchTier(tier)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleLaunchTier(tier);
                      }
                    }}
                    onMouseEnter={() => warmDemo(tier.id, tier.previewImage)}
                    className="group relative overflow-hidden aspect-[16/10] bg-[#E8E5DC] cursor-pointer shadow-[0_24px_60px_-28px_rgba(15,23,42,0.28)]"
                  >
                    <img
                      src={tier.previewImage}
                      alt={`${wordmark} ${tier.tierName} preview`}
                      loading="eager"
                      decoding="async"
                      className="w-full h-full object-cover object-center block transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                    />
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const ProjectRow: React.FC<{
  project: Project;
  index: number;
  onOpenDemosPage: (projectKey: 'landscaping' | 'equestrian') => void;
}> = ({ project, index, onOpenDemosPage }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const isLandscaping = project.id === 'landscaping';
  const isEquestrian = project.id === 'equestrian';
  const hasTiers = isLandscaping || isEquestrian;
  const tiersMap = isEquestrian ? EQUESTRIAN_TIERS : LANDSCAPING_TIERS;
  const defaultFrontTier: TierKey = isEquestrian ? 'luxury' : 'minimalistic';

  const isEven = index % 2 === 0;

  useEffect(() => {
    const row = rowRef.current;
    const card = cardRef.current;
    const text = textRef.current;
    if (!row || !card || !text) return;

    const reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const canAnimate =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px)').matches;
    if (!canAnimate) return;

    const ctx = gsap.context(() => {
      const shot = card.querySelectorAll('.preview-shot');
      const items = text.querySelectorAll('.reveal-item');

      if (hasTiers) {
        gsap.set(card, { y: -36, opacity: 0 });
      } else {
        gsap.set(card, { clipPath: 'inset(0% 0% 100% 0%)', y: -56, opacity: 0.25 });
      }
      gsap.set(items, { y: -42, opacity: 0 });
      if (shot.length && !hasTiers) gsap.set(shot, { scale: 1.12, y: -24 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: row,
          start: 'top 95%',
          end: 'top 38%',
          scrub: 0.65
        }
      });

      if (hasTiers) {
        tl.to(
          card,
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            force3D: true
          },
          0
        );
      } else {
        tl.to(
          card,
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            force3D: true
          },
          0
        );
      }

      if (shot.length && !hasTiers) {
        tl.to(
          shot,
          {
            scale: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            force3D: true
          },
          0
        );
      }

      tl.to(
        items,
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.08,
          ease: 'power2.out',
          force3D: true
        },
        0.1
      );
    }, row);

    return () => ctx.revert();
  }, [isEven, hasTiers]);

  return (
    <div
      ref={rowRef}
      className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-14 lg:gap-20 items-center"
    >
      <div
        ref={cardRef}
        className={`lg:col-span-7 overflow-visible ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
      >
        {hasTiers ? (
          <TierSpreadPreview
            wordmark={project.wordmark}
            tiersMap={tiersMap}
            heroImage={project.heroImage}
            activeTier={defaultFrontTier}
            onOpenDemosPage={() =>
              onOpenDemosPage(isEquestrian ? 'equestrian' : 'landscaping')
            }
          />
        ) : (
          <PreviewWindow project={project} priority />
        )}
      </div>

      <div
        ref={textRef}
        className={`lg:col-span-5 flex flex-col items-start ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
      >
        <div className="reveal-item flex flex-wrap items-center gap-3 md:gap-4 mb-3.5 md:mb-7">
          <span className="font-syne text-sm md:text-base font-black text-slate-300 tabular-nums">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="w-6 md:w-8 h-px bg-slate-300" />
          <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.45em] text-emerald-700">
            {project.industry}
          </span>
        </div>

        <h3 className="reveal-item font-syne text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-black text-slate-950 uppercase tracking-tighter leading-[0.95] mb-4 md:mb-7">
          {project.headline[0]} <br />
          <span className="text-shimmer-blue italic">{project.headline[1]}</span>
        </h3>

        <ul className="reveal-item flex flex-col w-full max-w-lg mb-5 md:mb-10 border-t border-slate-200">
          {project.features.map((f) => (
            <li
              key={f}
              className="flex items-center gap-2.5 md:gap-3 py-2 md:py-3 border-b border-slate-200 text-[9px] md:text-[11px] font-black uppercase tracking-[0.22em] md:tracking-[0.28em] text-slate-600"
            >
              <span className="block w-1 h-1 rounded-full bg-emerald-600 shrink-0" />
              {f}
            </li>
          ))}
        </ul>

        {hasTiers ? (
          <button
            type="button"
            onClick={() =>
              onOpenDemosPage(isEquestrian ? 'equestrian' : 'landscaping')
            }
            onMouseEnter={() => {
              TIER_ORDER.forEach((k) =>
                warmDemo(tiersMap[k].id, tiersMap[k].previewImage)
              );
            }}
            className="reveal-item group/btn inline-flex items-center gap-4 md:gap-5 pl-6 md:pl-8 pr-1.5 md:pr-2 py-1.5 md:py-2 rounded-full bg-slate-950 hover:bg-emerald-600 transition-colors duration-500 cursor-pointer"
          >
            <span className="text-[9.5px] md:text-[10px] font-black uppercase tracking-[0.32em] md:tracking-[0.35em] text-white">
              View demos
            </span>
            <span className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-white flex items-center justify-center text-slate-950 transition-transform duration-500 group-hover/btn:rotate-45">
              <ArrowUpRight size={16} strokeWidth={2.5} />
            </span>
          </button>
        ) : (
          <Link
            to={project.path}
            onMouseEnter={() => warmDemo(project.id, project.heroImage)}
            onFocus={() => warmDemo(project.id, project.heroImage)}
            onTouchStart={() => warmDemo(project.id, project.heroImage)}
            className="reveal-item group/btn inline-flex items-center gap-4 md:gap-5 pl-6 md:pl-8 pr-1.5 md:pr-2 py-1.5 md:py-2 rounded-full bg-slate-950 hover:bg-emerald-600 transition-colors duration-500"
          >
            <span className="text-[9.5px] md:text-[10px] font-black uppercase tracking-[0.32em] md:tracking-[0.35em] text-white">
              View demo
            </span>
            <span className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-white flex items-center justify-center text-slate-950 transition-transform duration-500 group-hover/btn:rotate-45">
              <ArrowUpRight size={16} strokeWidth={2.5} />
            </span>
          </Link>
        )}
      </div>
    </div>
  );
};

const ProjectsGallery: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Read `?demos=landscaping` or `?demos=equestrian` so browser back/forward works seamlessly
  const selectedCollection = React.useMemo<'landscaping' | 'equestrian' | null>(() => {
    const params = new URLSearchParams(location.search || '');
    const d = params.get('demos');
    if (d === 'landscaping' || d === 'equestrian') return d;
    return null;
  }, [location.search]);

  const handleOpenDemosPage = (projectKey: 'landscaping' | 'equestrian') => {
    navigate(`/projects?demos=${projectKey}`);
  };

  const handleBackToProjects = () => {
    navigate('/projects');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (typeof window !== 'undefined') {
      (window as any).__oakAshLuxuryInternalNav = false;
    }
  }, [selectedCollection]);

  // Once the gallery itself is settled, pull every demo's route chunk down in
  // the background. By the time anyone picks one, the code is already here.
  useEffect(() => {
    const warmAll = () => (Object.keys(demoChunks) as DemoId[]).forEach((id) => warmDemo(id));
    const idle = (window as any).requestIdleCallback;
    if (typeof idle === 'function') {
      const handle = idle(warmAll, { timeout: 2500 });
      return () => (window as any).cancelIdleCallback?.(handle);
    }
    const timer = window.setTimeout(warmAll, 1200);
    return () => window.clearTimeout(timer);
  }, []);

  if (selectedCollection) {
    return (
      <MultiDemoPreviewPage
        projectKey={selectedCollection}
        onBack={handleBackToProjects}
      />
    );
  }

  return (
    <div className="bg-[#fdfbf7] min-h-screen pt-24 md:pt-48 pb-20 md:pb-56 px-5 md:px-10 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* HERO */}
        <div className="mb-14 md:mb-40">
          <p
            className="pg-rise mb-3.5 md:mb-6 text-[9px] md:text-[11px] font-black uppercase tracking-[0.45em] text-emerald-700"
            style={{ animationDelay: '0ms' }}
          >
            Web design demos
          </p>
          <h1
            className="pg-rise font-syne text-[clamp(1.65rem,7vw,5rem)] sm:text-[clamp(2.5rem,8vw,5rem)] font-black text-slate-950 tracking-tighter uppercase leading-[0.92] mb-6 md:mb-12"
            style={{ animationDelay: '80ms' }}
          >
            SITES THAT <br />
            <span className="text-shimmer-blue italic inline-block pr-2">GET RESULTS.</span>
          </h1>
          <div
            className="pg-rise max-w-3xl border-l-[4px] md:border-l-[8px] border-emerald-100 pl-5 md:pl-14"
            style={{ animationDelay: '160ms' }}
          >
            <p className="text-base md:text-xl lg:text-2xl text-slate-500 font-medium italic leading-relaxed">
              Five working websites, built the way we build for clients. Open any one of them and use it as a
              customer would.
            </p>
          </div>
        </div>

        {/* PROJECTS */}
        <div className="space-y-16 md:space-y-40">
          {projects.map((project, idx) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={idx}
              onOpenDemosPage={handleOpenDemosPage}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 md:mt-48 pt-12 md:pt-28 border-t border-slate-200 text-center">
          <p className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.45em] text-emerald-700 mb-4 md:mb-8">
            Next step
          </p>
          <h2 className="font-syne text-[clamp(2.25rem,10vw,5rem)] font-black text-slate-950 tracking-tighter uppercase leading-[0.9] mb-8 md:mb-14">
            READY WHEN <br />
            <span className="text-shimmer-blue italic">YOU ARE.</span>
          </h2>
          <Link
            to="/contact"
            className="group/cta inline-flex items-center gap-5 pl-9 pr-2 py-2 rounded-full bg-emerald-600 hover:bg-slate-950 transition-colors duration-500 shadow-[0_25px_60px_-25px_rgba(5,150,105,0.45)]"
          >
            <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.35em] text-white">
              Start your build
            </span>
            <span className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-slate-950 transition-transform duration-500 group-hover/cta:translate-x-1">
              <MoveRight size={20} strokeWidth={2.5} />
            </span>
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes pg-rise {
          from { opacity: 0; transform: translate3d(0, 22px, 0); }
          to   { opacity: 1; transform: none; }
        }
        .pg-rise {
          animation: pg-rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .pg-rise { animation: none; }
        }
      `}</style>
    </div>
  );
};

export default ProjectsGallery;
