import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, MoveRight } from 'lucide-react';
// Fix react-router-dom missing exports
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Warming a demo means two things: its route chunk and the photograph that
// fills its first screen. Both are pulled in before the visitor clicks, so the
// demo paints immediately instead of loading in front of them.
const demoChunks: Record<string, () => Promise<unknown>> = {
  landscaping: () => import('../components/demos/landscaping/Home'),
  equestrian: () => import('../components/demos/equestrian/EquestrianHome'),
  physio: () => import('../components/demos/physio/PhysioHome'),
  cafe: () => import('../components/demos/cafe/CafeHome')
};

const warmedChunks = new Set<string>();
const warmedImages = new Set<string>();

const warmDemo = (id: string, heroImage?: string) => {
  if (!warmedChunks.has(id) && demoChunks[id]) {
    warmedChunks.add(id);
    demoChunks[id]().catch(() => warmedChunks.delete(id));
  }
  if (heroImage && !warmedImages.has(heroImage)) {
    warmedImages.add(heroImage);
    const img = new Image();
    img.decoding = 'async';
    img.src = heroImage;
  }
};

interface Project {
  id: string;
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
  description: string;
  /* Real pages and features inside each build. */
  features: string[];
}

const projects: Project[] = [
  {
    id: 'landscaping',
    wordmark: 'Oak & Ash',
    industry: 'Landscaping',
    headline: ['Work won', 'from the van.'],
    path: '/demo/landscaping',
    heroImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=65&w=1600',
    accent: '#BC4B26',
    description:
      'Enquiries for this trade arrive while nobody is near a desk. The site answers the usual questions, shows the standard of the work and takes the details without a phone call.',
    features: ['Services breakdown', 'Photo gallery', 'Enquiry form']
  },
  {
    id: 'equestrian',
    wordmark: 'Bramble & Bay',
    industry: 'Riding academy',
    headline: ['Ten lessons,', 'one clear price.'],
    path: '/demo/equestrian',
    heroImage: 'https://images.unsplash.com/photo-1511746687876-42cb762f6ac1?auto=format&fit=crop&q=65&w=1600',
    accent: '#E4577A',
    description:
      'A riding school gets asked the same four questions every week: what does it cost, how old does she need to be, what do we wear, and can we watch. Six pages answer all of it, and the booking takes three steps.',
    features: ['Every lesson priced', 'Profiles of the horses', 'Three-step booking']
  },
  {
    id: 'physio',
    wordmark: 'Pulteney Physiotherapy',
    industry: 'Physiotherapy',
    headline: ['Two answers,', 'above the fold.'],
    path: '/demo/physio',
    heroImage: 'https://images.unsplash.com/photo-1591343395902-1adcb454c4e2?auto=format&fit=crop&q=65&w=1200',
    accent: '#4A5D4E',
    description:
      'People arrive in pain and want to know two things: who will see them, and what it costs. Every fee, every physiotherapist and the next free slot sit on the first screen.',
    features: ['Fees up front', 'Team profiles', 'Questions answered']
  },
  {
    id: 'cafe',
    wordmark: 'The Hearth',
    industry: 'Cafe',
    headline: ['One tap', 'to a table.'],
    path: '/demo/cafe',
    heroImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=65&w=1600',
    accent: '#A4715E',
    description:
      'The menu, the opening hours and a table booking are each one tap from the top of the page, on both sites, for people deciding where to go in the next ten minutes.',
    features: ['Full menu', 'Table booking', 'Locations and maps']
  }
];

// A browser window holding the demo's own first screen. Chrome, caption strip
// and hairlines are all solid — the only soft edge in the whole card is the
// photograph itself.
const PreviewWindow: React.FC<{ project: Project; priority?: boolean }> = ({ project, priority }) => (
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
        loading={priority ? 'eager' : 'lazy'}
        {...(priority ? { fetchPriority: 'high' as const } : {})}
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

const ProjectRow: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
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

    const ctx = gsap.context(() => {
      const shot = card.querySelector('.preview-shot');
      const items = text.querySelectorAll('.reveal-item');

      // The hidden state is applied here rather than in the markup, so if this
      // script never runs the page still reads perfectly.
      gsap.set(card, { clipPath: 'inset(0% 0% 100% 0%)' });
      gsap.set(items, { y: 26, opacity: 0 });
      if (shot) gsap.set(shot, { scale: 1.18 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: row,
          start: 'top 82%',
          once: true,
          fastScrollEnd: true
        }
      });

      // The window uncovers itself downwards while the photograph settles back
      // to its true size — a camera coming to rest. The clip is dropped the
      // moment it finishes, otherwise it would keep cropping the card's shadow.
      tl.to(
        card,
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.15,
          ease: 'expo.out',
          onComplete: () => gsap.set(card, { clearProps: 'clipPath' })
        },
        0
      );
      if (shot) tl.to(shot, { scale: 1, duration: 1.7, ease: 'expo.out', force3D: true }, 0);
      tl.to(
        items,
        { y: 0, opacity: 1, duration: 0.85, stagger: 0.08, ease: 'power3.out', force3D: true },
        0.25
      );

      // A few pixels of drift as the row crosses the screen. Enough to feel
      // engineered, not enough to notice as an effect.
      gsap.fromTo(
        card,
        { yPercent: 3.5 },
        {
          yPercent: -3.5,
          ease: 'none',
          scrollTrigger: { trigger: row, start: 'top bottom', end: 'bottom top', scrub: 1 }
        }
      );
    }, row);

    return () => ctx.revert();
  }, [isEven]);

  return (
    <div
      ref={rowRef}
      className={`grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 lg:gap-20 items-center`}
    >
      <div
        ref={cardRef}
        className={`lg:col-span-7 will-change-transform ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
      >
        <PreviewWindow project={project} priority={index === 0} />
      </div>

      <div
        ref={textRef}
        className={`lg:col-span-5 flex flex-col items-start ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
      >
        <div className="reveal-item flex items-center gap-4 mb-7">
          <span className="font-syne text-base font-black text-slate-300 tabular-nums">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="w-8 h-px bg-slate-300" />
          <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.45em] text-blue-600">
            {project.industry}
          </span>
        </div>

        <h3 className="reveal-item font-syne text-3xl md:text-4xl lg:text-[2.75rem] font-black text-slate-950 uppercase tracking-tighter leading-[0.95] mb-6">
          {project.headline[0]} <br />
          <span className="text-shimmer-blue italic">{project.headline[1]}</span>
        </h3>

        <p className="reveal-item text-base md:text-lg text-slate-500 font-medium leading-relaxed max-w-lg mb-8">
          {project.description}
        </p>

        <ul className="reveal-item flex flex-col w-full max-w-lg mb-10 border-t border-slate-200">
          {project.features.map((f) => (
            <li
              key={f}
              className="flex items-center gap-3 py-3 border-b border-slate-200 text-[10px] md:text-[11px] font-black uppercase tracking-[0.28em] text-slate-600"
            >
              <span className="block w-1 h-1 rounded-full bg-blue-600 shrink-0" />
              {f}
            </li>
          ))}
        </ul>

        <Link
          to={project.path}
          onMouseEnter={() => warmDemo(project.id, project.heroImage)}
          onFocus={() => warmDemo(project.id, project.heroImage)}
          onTouchStart={() => warmDemo(project.id, project.heroImage)}
          className="reveal-item group/btn inline-flex items-center gap-5 pl-8 pr-2 py-2 rounded-full bg-slate-950 hover:bg-blue-600 transition-colors duration-500"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.35em] text-white">View demo</span>
          <span className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-slate-950 transition-transform duration-500 group-hover/btn:rotate-45">
            <ArrowUpRight size={18} strokeWidth={2.5} />
          </span>
        </Link>
      </div>
    </div>
  );
};

const ProjectsGallery: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Once the gallery itself is settled, pull every demo's route chunk down in
  // the background. By the time anyone picks one, the code is already here.
  useEffect(() => {
    const warmAll = () => Object.keys(demoChunks).forEach((id) => warmDemo(id));
    const idle = (window as any).requestIdleCallback;
    if (typeof idle === 'function') {
      const handle = idle(warmAll, { timeout: 2500 });
      return () => (window as any).cancelIdleCallback?.(handle);
    }
    const timer = window.setTimeout(warmAll, 1200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="bg-[#fdfbf7] min-h-screen pt-32 md:pt-48 pb-40 md:pb-56 px-6 md:px-10 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* HERO */}
        <div className="mb-28 md:mb-40">
          <p
            className="pg-rise mb-6 text-[9px] md:text-[11px] font-black uppercase tracking-[0.45em] text-blue-600"
            style={{ animationDelay: '0ms' }}
          >
            Web Design Portfolio
          </p>
          <h1
            className="pg-rise font-syne text-[clamp(2.5rem,10vw,5rem)] font-black text-slate-950 tracking-tighter uppercase leading-[0.9] mb-12"
            style={{ animationDelay: '80ms' }}
          >
            SITES THAT <br />
            <span className="text-shimmer-blue italic">GET RESULTS.</span>
          </h1>
          <div
            className="pg-rise max-w-3xl border-l-[6px] md:border-l-[8px] border-blue-100 pl-8 md:pl-14"
            style={{ animationDelay: '160ms' }}
          >
            <p className="text-lg md:text-xl lg:text-2xl text-slate-500 font-medium italic leading-relaxed">
              Four working websites, built the way we build for clients. Open any one of them and use it as a
              customer would.
            </p>
          </div>
        </div>

        {/* PROJECTS */}
        <div className="space-y-28 md:space-y-40">
          {projects.map((project, idx) => (
            <ProjectRow key={project.id} project={project} index={idx} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-32 md:mt-48 pt-20 md:pt-28 border-t border-slate-200 text-center">
          <p className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.45em] text-blue-600 mb-8">
            Next step
          </p>
          <h2 className="font-syne text-[clamp(2.5rem,10vw,5rem)] font-black text-slate-950 tracking-tighter uppercase leading-[0.9] mb-12 md:mb-14">
            READY WHEN <br />
            <span className="text-shimmer-blue italic">YOU ARE.</span>
          </h2>
          <Link
            to="/contact"
            className="group/cta inline-flex items-center gap-5 pl-9 pr-2 py-2 rounded-full bg-blue-600 hover:bg-slate-950 transition-colors duration-500 shadow-[0_25px_60px_-25px_rgba(37,99,235,0.55)]"
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
