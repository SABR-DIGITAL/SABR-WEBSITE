import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronDown, MoveRight, Check } from 'lucide-react';
// Fix react-router-dom missing exports
import * as RouterDOM from 'react-router-dom';
const { Link, useNavigate } = RouterDOM as any;
import { motion as framerMotion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { demoChunks, warmDemoChunk, type DemoId } from '../components/demos/demoChunks';
import { HERO_SLIDES } from '../components/demos/landscaping/landscapingData';

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

export type LandscapingTierKey = 'traditional' | 'minimalistic' | 'luxury';

interface LandscapingTierConfig {
  key: LandscapingTierKey;
  id: DemoId;
  tierName: string;
  shortLabel: string;
  styleLabel: string;
  cardIndex: string;
  path: string;
  accent: string;
  badgeBg: string;
  badgeText: string;
  features: string[];
}

const LANDSCAPING_TIERS: Record<LandscapingTierKey, LandscapingTierConfig> = {
  traditional: {
    key: 'traditional',
    id: 'landscaping-traditional',
    tierName: 'Essential (Traditional)',
    shortLabel: 'Essential',
    styleLabel: 'Traditional & easy to scroll',
    cardIndex: '01',
    path: '/demo/landscaping-traditional',
    accent: '#15803D',
    badgeBg: '#ECFDF5',
    badgeText: '#15803D',
    features: [
      'Traditional & easy-to-scroll layout inspired by trusted local trades',
      'Standard high-contrast green palette with clear service breakdowns',
      'Direct phone bar & simple quote form built for budget-friendly clarity'
    ]
  },
  minimalistic: {
    key: 'minimalistic',
    id: 'landscaping',
    tierName: 'Premier (Minimalistic)',
    shortLabel: 'Premier',
    styleLabel: 'Minimalistic & formal',
    cardIndex: '02',
    path: '/demo/landscaping',
    accent: '#5B6450',
    badgeBg: '#F4F1EA',
    badgeText: '#44503B',
    features: [
      'Minimalistic & formal layout that lets the gardens speak first',
      'Spacious architectural typography across desktop and mobile',
      'Frictionless enquiry flow tailored for discerning estate clients'
    ]
  },
  luxury: {
    key: 'luxury',
    id: 'landscaping-luxury',
    tierName: 'Prestige (Luxury)',
    shortLabel: 'Prestige',
    styleLabel: 'Luxury & heavier animations',
    cardIndex: '03',
    path: '/demo/landscaping-luxury',
    accent: '#C8B88A',
    badgeBg: '#18140F',
    badgeText: '#C8B88A',
    features: [
      'Direct-to-canvas full-bleed architectural showcase with zero intro delay',
      'Warm obsidian & champagne-tan palette with smooth, glide-heavy motion',
      'Bespoke 5-pillar architectural index drawer and private commission dossier'
    ]
  }
};

const LANDSCAPING_TIER_ORDER: LandscapingTierKey[] = ['traditional', 'minimalistic', 'luxury'];

// Always sync the Landscaping preview photo with the primary homepage slide in landscapingData.ts / Home.tsx
const SHARED_LANDSCAPING_HERO_IMAGE =
  HERO_SLIDES[0]?.image || '/images/projects/landscaping-preview.webp';

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
    industry: 'Garden Design & Build · 3 Tiers',
    headline: ['28 years of', 'award-winning gardens.'],
    path: '/demo/landscaping',
    heroImage: SHARED_LANDSCAPING_HERO_IMAGE,
    accent: '#5B6450',
    features: [
      'Minimalist luxury layout that lets the work speak first',
      'Smooth, glide-like animations across desktop and mobile',
      'Frictionless enquiry flow built for high-value clients'
    ]
  },
  {
    id: 'equestrian',
    wordmark: 'Bramble & Bay',
    industry: 'Riding Academy',
    headline: ['Classical equitation,', 'four hundred private acres.'],
    path: '/demo/equestrian',
    heroImage: '/images/projects/equestrian-preview.webp',
    accent: '#3E4B41',
    features: [
      'Spacious, gallery-grade layout that elevates brand perception',
      'Clean single-line lesson directory and paired horse profiles',
      'Seamless three-step booking flow that converts visitors into riders'
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

// A browser window holding the demo's own first screen. Chrome, caption strip
// and hairlines are all solid — the only soft edge in the whole card is the
// photograph itself.
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

/**
 * Clean, unobstructed Hero Screen for each of the 3 Oak & Ash tiers.
 * Uses the exact shared homepage photo (`HERO_SLIDES[0].image`) so changing
 * the homepage photo updates all 3 preview cards automatically.
 */
const TierHeroScreen: React.FC<{
  tierKey: LandscapingTierKey;
  heroImage: string;
}> = ({ tierKey, heroImage }) => {
  if (tierKey === 'traditional') {
    // Tier 1: Essential — Traditional & Easy to Scroll (Standard Green Landscaper)
    return (
      <div className="relative w-full h-full overflow-hidden select-none">
        <img
          src={heroImage}
          alt="Oak & Ash Essential Traditional tier preview"
          loading="eager"
          decoding="async"
          className="preview-shot absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover/card:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#052e16]/80 via-[#052e16]/20 to-black/35" />

        {/* Clean Top Traditional Green Strip */}
        <div className="relative z-10 flex items-center justify-between px-3.5 py-2 bg-[#15803d]/95 text-white border-b border-emerald-500/30">
          <span className="text-[7.5px] sm:text-[8.5px] font-extrabold uppercase tracking-[0.16em]">
            OAK &amp; ASH LANDSCAPING
          </span>
          <span className="px-2 py-0.5 rounded bg-white text-[#15803d] text-[6.5px] sm:text-[7.5px] font-extrabold uppercase tracking-wider">
            Free Quote
          </span>
        </div>

        {/* Clean Bottom Traditional Caption */}
        <div className="absolute bottom-3 left-3.5 right-3.5 z-10 flex items-end justify-between gap-2 text-white">
          <div>
            <span className="inline-block px-2 py-0.5 rounded bg-[#15803d] text-[6px] sm:text-[7px] font-bold uppercase tracking-wider text-white mb-1">
              ✓ Trusted Local Landscapers
            </span>
            <p className="font-serif text-[11px] sm:text-[14px] font-bold leading-tight drop-shadow-xs">
              28 Years of Award-Winning Gardens.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (tierKey === 'luxury') {
    // Tier 3: Prestige — Luxury & Heavier Animations (Obsidian & Tan — Zero Green)
    return (
      <div className="relative w-full h-full overflow-hidden select-none">
        <img
          src={heroImage}
          alt="Oak & Ash Prestige Luxury tier preview"
          loading="eager"
          decoding="async"
          className="preview-shot absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover/card:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0A08]/90 via-[#0C0A08]/25 to-[#0C0A08]/70" />

        {/* Top Luxury Tan & Obsidian Bar */}
        <div className="relative z-10 flex items-center justify-between px-3.5 py-2 border-b border-[#C8B88A]/30 bg-[#0C0A08]/70 backdrop-blur-xs">
          <span className="text-[6.5px] sm:text-[7.5px] font-mono uppercase tracking-[0.26em] text-[#C8B88A]">
            INDEX
          </span>
          <span className="font-cinzel text-[8.5px] sm:text-[10px] font-bold uppercase tracking-[0.3em] text-[#F4F1EA]">
            OAK &amp; ASH
          </span>
          <span className="px-2 py-0.5 bg-[#C8B88A] text-[#0C0A08] text-[6px] sm:text-[7px] font-bold uppercase tracking-[0.2em]">
            Commission
          </span>
        </div>

        {/* Bottom Clean Luxury Hero Typography */}
        <div className="absolute bottom-3 left-3.5 right-3.5 z-10">
          <span className="block text-[5.5px] sm:text-[6.5px] font-mono uppercase tracking-[0.3em] text-[#C8B88A] mb-0.5">
            EST. 1998 · WILTSHIRE, SURREY &amp; LONDON
          </span>
          <p className="font-cinzel text-[10px] sm:text-[13px] font-bold uppercase tracking-wider text-[#F4F1EA] leading-[1.05]">
            TWENTY-EIGHT <br />
            YEARS OF RARE <br />
            <span className="font-cormorant italic font-normal capitalize text-[#C8B88A]">
              Award-Winning Gardens.
            </span>
          </p>
        </div>
      </div>
    );
  }

  // Tier 2: Premier — Minimalistic & Formal (Clean unobstructed full-bleed photo)
  return (
    <div className="relative w-full h-full overflow-hidden select-none">
      <img
        src={heroImage}
        alt="Oak & Ash Premier Minimalistic tier preview"
        loading="eager"
        decoding="async"
        className="preview-shot absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover/card:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25" />

      {/* Minimalist Top Bar */}
      <div className="relative z-10 flex items-center justify-between px-3.5 py-2 text-white border-b border-white/15">
        <span className="font-serif text-[8.5px] sm:text-[10px] tracking-[0.26em] uppercase font-semibold">
          OAK &amp; ASH
        </span>
        <span className="px-2 py-0.5 border border-white/45 text-[6.5px] sm:text-[7.5px] uppercase tracking-[0.22em]">
          Enquire
        </span>
      </div>

      {/* Minimalist Bottom Caption */}
      <div className="absolute bottom-3 left-3.5 right-3.5 z-10 flex items-end justify-between gap-2 text-white">
        <div>
          <span className="block text-[6px] sm:text-[7px] uppercase tracking-[0.3em] text-white/80 mb-0.5">
            01 / 04 — Surrey &amp; Wiltshire
          </span>
          <p className="font-serif text-[11px] sm:text-[14px] leading-tight">
            28 years of <span className="italic">award-winning gardens.</span>
          </p>
        </div>
        <span className="px-2.5 py-1 bg-white text-stone-900 text-[6.5px] sm:text-[7.5px] font-bold uppercase tracking-[0.22em] shrink-0">
          Explore
        </span>
      </div>
    </div>
  );
};

/**
 * Clean 3-Card Fanned Spread for Oak & Ash Landscaping.
 * - All 4 corners of all 3 cards are completely visible with generous breathing room.
 * - Zero grey filler blocks or clipped shadows.
 * - Uses smooth cross-fade + gentle micro-glide transitions when switching tiers.
 */
const LandscapingSpreadPreview: React.FC<{
  heroImage: string;
  activeTier: LandscapingTierKey;
  onSelectTier: (tier: LandscapingTierKey) => void;
  onOpenDemo: (tier: LandscapingTierKey) => void;
}> = ({ heroImage, activeTier, onSelectTier, onOpenDemo }) => {
  // Put activeTier in Slot 0 (Front-Right), and the other two tiers in Slot 1 (Middle) and Slot 2 (Back-Left)
  const orderedTiers: LandscapingTierKey[] = React.useMemo(() => {
    const others = LANDSCAPING_TIER_ORDER.filter((k) => k !== activeTier);
    return [activeTier, others[0], others[1]];
  }, [activeTier]);

  // Fixed geometry for the 3 fan slots so every corner of every card stays inside the frame
  const SLOTS = [
    {
      // Slot 0: Front-right card (active)
      transform: 'translate3d(6%, 3%, 0) rotate(3deg) scale(1)',
      zIndex: 30,
    },
    {
      // Slot 1: Middle card
      transform: 'translate3d(-1.5%, -0.5%, 0) rotate(-2.5deg) scale(0.96)',
      zIndex: 20,
    },
    {
      // Slot 2: Back-left card
      transform: 'translate3d(-9%, 1.5%, 0) rotate(-8deg) scale(0.92)',
      zIndex: 10,
    },
  ];

  return (
    <div className="relative w-full py-3 sm:py-8 px-2 sm:px-8 flex items-center justify-center select-none overflow-visible">
      {/* Stage sized with generous margin around all 4 corners so rotated cards are never clipped */}
      <div className="relative w-[88%] sm:w-[84%] aspect-[16/11.5]">
        {SLOTS.map((slot, slotIdx) => {
          const tierKey = orderedTiers[slotIdx];
          const tier = LANDSCAPING_TIERS[tierKey];
          const isFront = slotIdx === 0;
          const isLuxury = tierKey === 'luxury';

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
                  aria-label={
                    isFront
                      ? `Open ${tier.tierName} — ${tier.styleLabel} live demo`
                      : `Bring ${tier.tierName} (${tier.styleLabel}) card to the front`
                  }
                  onMouseEnter={() => warmDemo(tier.id, heroImage)}
                  onFocus={() => warmDemo(tier.id, heroImage)}
                  onTouchStart={() => warmDemo(tier.id, heroImage)}
                  onClick={() => {
                    if (isFront) {
                      onOpenDemo(tier.key);
                    } else {
                      onSelectTier(tier.key);
                    }
                  }}
                  onKeyDown={(e: React.KeyboardEvent) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      if (isFront) onOpenDemo(tier.key);
                      else onSelectTier(tier.key);
                    }
                  }}
                  className={`
                    group/card absolute inset-0 flex flex-col rounded-[1.15rem] sm:rounded-[1.35rem] overflow-hidden cursor-pointer border
                    ${
                      isLuxury
                        ? 'bg-[#120F0B] border-[#C8B88A]/65'
                        : 'bg-white border-slate-200'
                    }
                    ${
                      isFront
                        ? 'shadow-[0_28px_65px_-22px_rgba(15,23,42,0.45)]'
                        : 'shadow-[0_18px_40px_-20px_rgba(15,23,42,0.32)] hover:brightness-105'
                    }
                  `}
                >
                  {/* TOP CHROME BAR (Clean integrated index pill — no overlapping floating boxes or grey dots) */}
                  <div
                    className={`
                      shrink-0 flex items-center gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 border-b
                      ${
                        isLuxury
                          ? 'bg-[#16130E] border-[#C8B88A]/25'
                          : 'bg-white border-slate-200'
                      }
                    `}
                  >
                    <span
                      className="inline-flex items-center justify-center px-2 py-0.5 rounded-md text-[8px] sm:text-[9px] font-syne font-black tracking-wider shrink-0"
                      style={{
                        backgroundColor: tier.badgeBg,
                        color: tier.badgeText,
                      }}
                    >
                      {tier.cardIndex} · {tier.shortLabel.toUpperCase()}
                    </span>

                    <span
                      className={`
                        flex-1 min-w-0 h-5 sm:h-6 px-2.5 rounded-md flex items-center justify-between gap-2 border
                        ${
                          isLuxury
                            ? 'bg-[#0C0A08] border-[#C8B88A]/30 text-[#C8B88A]'
                            : 'bg-slate-50 border-slate-200/90 text-slate-500'
                        }
                      `}
                    >
                      <span className="truncate text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-[0.15em]">
                        sabrdigital.co.uk{tier.path}
                      </span>
                    </span>
                  </div>

                  {/* MIDDLE SCREEN (flex-1 so there is NEVER any gap or grey bleed) */}
                  <div className="relative flex-1 min-h-0 w-full overflow-hidden">
                    <TierHeroScreen tierKey={tier.key} heroImage={heroImage} />
                  </div>

                  {/* BOTTOM CAPTION STRIP */}
                  <div
                    className={`
                      shrink-0 flex items-center justify-between gap-2 px-3.5 sm:px-5 py-2.5 sm:py-3 border-t
                      ${
                        isLuxury
                          ? 'bg-[#120F0B] border-[#C8B88A]/25 text-[#F4F1EA]'
                          : 'bg-white border-slate-200 text-slate-950'
                      }
                    `}
                  >
                    <span className="flex items-center gap-2.5 min-w-0">
                      <span
                        className="block w-1.5 h-4 sm:h-5 rounded-full shrink-0"
                        style={{ backgroundColor: tier.accent }}
                      />
                      <span className="font-syne text-xs sm:text-sm font-black uppercase tracking-tight truncate">
                        Oak &amp; Ash
                      </span>
                      <span
                        className={`text-[7.5px] sm:text-[8.5px] font-extrabold uppercase tracking-[0.16em] truncate ${
                          isLuxury ? 'text-[#C8B88A]' : 'text-slate-500'
                        }`}
                      >
                        · {tier.styleLabel}
                      </span>
                    </span>

                    <span
                      className={`
                        inline-flex items-center gap-1 text-[7.5px] sm:text-[8.5px] font-black uppercase tracking-[0.24em] shrink-0
                        ${isLuxury ? 'text-[#C8B88A]' : 'text-emerald-700'}
                      `}
                    >
                      {isFront ? 'Open demo ↗' : 'Select card'}
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

const ProjectRow: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const isLandscaping = project.id === 'landscaping';
  const [activeTier, setActiveTier] = useState<LandscapingTierKey>('minimalistic');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isEven = index % 2 === 0;

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!dropdownOpen) return;
    const handleOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [dropdownOpen]);

  // Smooth cross-fade switch to the selected tier
  const handleSelectLandscapingTier = (nextTier: LandscapingTierKey) => {
    warmDemo(LANDSCAPING_TIERS[nextTier].id, project.heroImage);
    setDropdownOpen(false);
    setActiveTier(nextTier);
  };

  const handleOpenLandscapingDemo = (tierKey: LandscapingTierKey) => {
    const tier = LANDSCAPING_TIERS[tierKey];
    if (tierKey === 'luxury' && typeof window !== 'undefined') {
      // Ensure the lawn-mowing intro plays fresh when entering from ProjectsGallery
      (window as any).__oakAshLuxuryInternalNav = false;
    }
    warmDemo(tier.id, project.heroImage);
    navigate(tier.path);
  };

  useEffect(() => {
    const row = rowRef.current;
    const card = cardRef.current;
    const text = textRef.current;
    if (!row || !card || !text) return;

    const reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    // Only run heavy clip-path scroll-scrub animations on desktop so mobile scrolls at 60fps
    const canAnimate =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px)').matches;
    if (!canAnimate) return;

    const ctx = gsap.context(() => {
      const shot = card.querySelectorAll('.preview-shot');
      const items = text.querySelectorAll('.reveal-item');

      if (isLandscaping) {
        gsap.set(card, { y: -36, opacity: 0 });
      } else {
        gsap.set(card, { clipPath: 'inset(0% 0% 100% 0%)', y: -56, opacity: 0.25 });
      }
      gsap.set(items, { y: -42, opacity: 0 });
      if (shot.length && !isLandscaping) gsap.set(shot, { scale: 1.12, y: -24 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: row,
          start: 'top 95%',
          end: 'top 38%',
          scrub: 0.65
        }
      });

      if (isLandscaping) {
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

      if (shot.length && !isLandscaping) {
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
  }, [isEven, isLandscaping]);

  const currentTier = LANDSCAPING_TIERS[activeTier];
  const displayedFeatures = isLandscaping ? currentTier.features : project.features;

  return (
    <div
      ref={rowRef}
      className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-14 lg:gap-20 items-center"
    >
      <div
        ref={cardRef}
        className={`lg:col-span-7 overflow-visible ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
      >
        {isLandscaping ? (
          <LandscapingSpreadPreview
            heroImage={SHARED_LANDSCAPING_HERO_IMAGE}
            activeTier={activeTier}
            onSelectTier={handleSelectLandscapingTier}
            onOpenDemo={handleOpenLandscapingDemo}
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
          {isLandscaping && (
            <span
              className="px-2.5 py-0.5 md:py-1 rounded-full text-[7.5px] md:text-[8px] font-black uppercase tracking-[0.22em] md:tracking-[0.25em] transition-colors duration-300"
              style={{
                backgroundColor: currentTier.badgeBg,
                color: currentTier.badgeText
              }}
            >
              {currentTier.styleLabel}
            </span>
          )}
        </div>

        <h3 className="reveal-item font-syne text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-black text-slate-950 uppercase tracking-tighter leading-[0.95] mb-4 md:mb-7">
          {project.headline[0]} <br />
          <span className="text-shimmer-blue italic">{project.headline[1]}</span>
        </h3>

        <ul className="reveal-item flex flex-col w-full max-w-lg mb-5 md:mb-10 border-t border-slate-200">
          {displayedFeatures.map((f) => (
            <li
              key={f}
              className="flex items-center gap-2.5 md:gap-3 py-2 md:py-3 border-b border-slate-200 text-[9px] md:text-[11px] font-black uppercase tracking-[0.22em] md:tracking-[0.28em] text-slate-600"
            >
              <span className="block w-1 h-1 rounded-full bg-emerald-600 shrink-0" />
              {f}
            </li>
          ))}
        </ul>

        {isLandscaping ? (
          <div ref={dropdownRef} className="reveal-item relative z-30 flex flex-wrap items-center gap-2.5 md:gap-3">
            {/* MINIMALISTIC, CONDENSED VIEW DEMO DROPDOWN BUTTON */}
            <button
              type="button"
              onClick={() => {
                LANDSCAPING_TIER_ORDER.forEach((k) =>
                  warmDemo(LANDSCAPING_TIERS[k].id, SHARED_LANDSCAPING_HERO_IMAGE)
                );
                setDropdownOpen((prev) => !prev);
              }}
              aria-expanded={dropdownOpen}
              aria-haspopup="listbox"
              className="group/btn inline-flex items-center gap-3 pl-5 pr-1.5 py-1.5 rounded-full bg-slate-950 hover:bg-emerald-700 transition-colors duration-300 cursor-pointer shadow-sm"
            >
              <span className="flex items-center gap-2">
                <span className="text-[8.5px] md:text-[9px] font-bold uppercase tracking-[0.24em] text-emerald-400">
                  Tier:
                </span>
                <span className="text-[9.5px] md:text-[10px] font-black uppercase tracking-[0.22em] text-white">
                  {currentTier.shortLabel}
                </span>
              </span>
              <span className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white flex items-center justify-center text-slate-950 transition-transform duration-300">
                <ChevronDown
                  size={14}
                  strokeWidth={2.5}
                  className={`transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`}
                />
              </span>
            </button>

            {/* DIRECT LAUNCH BUTTON FOR THE CURRENT FRONT CARD */}
            <button
              type="button"
              onClick={() => handleOpenLandscapingDemo(activeTier)}
              onMouseEnter={() => warmDemo(currentTier.id, SHARED_LANDSCAPING_HERO_IMAGE)}
              className="group/launch inline-flex items-center gap-2.5 pl-4 pr-1.5 py-1.5 rounded-full bg-white border border-slate-300 hover:border-emerald-600 text-slate-950 hover:text-emerald-700 transition-all duration-300 cursor-pointer shadow-xs"
            >
              <span className="text-[9px] md:text-[9.5px] font-black uppercase tracking-[0.24em]">
                Open {currentTier.shortLabel}
              </span>
              <span className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-slate-950 group-hover/launch:bg-emerald-600 text-white flex items-center justify-center transition-colors">
                <ArrowUpRight size={13} strokeWidth={2.5} />
              </span>
            </button>

            {/* MINIMALISTIC CONDENSED DROPDOWN MENU: Opens upwards on mobile so it never overlaps the next project */}
            {dropdownOpen && (
              <div
                role="listbox"
                aria-label="Select Oak & Ash Landscaping website tier"
                className="absolute left-0 bottom-[calc(100%+8px)] md:bottom-auto md:top-[calc(100%+8px)] w-[min(86vw,290px)] rounded-xl bg-white/98 backdrop-blur-md border border-slate-200/90 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.32)] p-1.5 z-50"
              >
                <div className="divide-y divide-slate-100">
                  {LANDSCAPING_TIER_ORDER.map((tierKey, idx) => {
                    const tier = LANDSCAPING_TIERS[tierKey];
                    const isSelected = activeTier === tierKey;
                    return (
                      <div
                        key={tier.key}
                        className={`flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg transition-colors ${
                          isSelected ? 'bg-emerald-50/80' : 'hover:bg-slate-50'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => handleSelectLandscapingTier(tier.key)}
                          onMouseEnter={() => warmDemo(tier.id, SHARED_LANDSCAPING_HERO_IMAGE)}
                          className="flex-1 flex items-center gap-2.5 text-left cursor-pointer min-w-0 py-0.5"
                        >
                          <span
                            className="w-5 h-5 rounded-md flex items-center justify-center text-[9px] font-black shrink-0"
                            style={{
                              backgroundColor: tier.badgeBg,
                              color: tier.badgeText
                            }}
                          >
                            0{idx + 1}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="flex items-center gap-1.5">
                              <span className="font-syne text-[11px] font-black uppercase tracking-tight text-slate-950 truncate">
                                {tier.shortLabel}
                              </span>
                              <span className="text-[8.5px] font-bold uppercase tracking-wider text-slate-400 truncate">
                                · {tier.key === 'traditional' ? 'Traditional' : tier.key === 'minimalistic' ? 'Minimalistic' : 'Luxury'}
                              </span>
                              {isSelected && (
                                <Check size={11} className="text-emerald-600 shrink-0" strokeWidth={3} />
                              )}
                            </span>
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleOpenLandscapingDemo(tier.key)}
                          onMouseEnter={() => warmDemo(tier.id, SHARED_LANDSCAPING_HERO_IMAGE)}
                          className="px-2.5 py-1 rounded-md bg-slate-950 hover:bg-emerald-600 text-white text-[8px] font-black uppercase tracking-[0.2em] inline-flex items-center gap-1 shrink-0 transition-colors cursor-pointer"
                        >
                          <span>Open</span>
                          <ArrowUpRight size={10} strokeWidth={2.5} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link
            to={project.path}
            onMouseEnter={() => warmDemo(project.id, project.heroImage)}
            onFocus={() => warmDemo(project.id, project.heroImage)}
            onTouchStart={() => warmDemo(project.id, project.heroImage)}
            className="reveal-item group/btn inline-flex items-center gap-4 md:gap-5 pl-6 md:pl-8 pr-1.5 md:pr-2 py-1.5 md:py-2 rounded-full bg-slate-950 hover:bg-emerald-600 transition-colors duration-500"
          >
            <span className="text-[9.5px] md:text-[10px] font-black uppercase tracking-[0.32em] md:tracking-[0.35em] text-white">View demo</span>
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
  useEffect(() => {
    window.scrollTo(0, 0);
    // Reset luxury internal nav flag when on Projects page so opening Prestige plays its lawn-mowing intro
    if (typeof window !== 'undefined') {
      (window as any).__oakAshLuxuryInternalNav = false;
    }
  }, []);

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
            className="pg-rise font-syne text-[clamp(2.25rem,10vw,5rem)] font-black text-slate-950 tracking-tighter uppercase leading-[0.9] mb-6 md:mb-12"
            style={{ animationDelay: '80ms' }}
          >
            SITES THAT <br />
            <span className="text-shimmer-blue italic">GET RESULTS.</span>
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
            <ProjectRow key={project.id} project={project} index={idx} />
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
