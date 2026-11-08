import React, { useEffect, useState, useRef } from 'react';
import * as RouterDOM from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, X } from 'lucide-react';
import LuxuryNavbar from './LuxuryNavbar';
import LuxuryFooter from './LuxuryFooter';
import { markLuxuryInternalNav } from './LuxuryHome';
import LuxuryCountUp from './LuxuryCountUp';
import { GALLERY_PROJECTS } from '../landscaping/landscapingData';

gsap.registerPlugin(ScrollTrigger);
const Link = (RouterDOM as any).Link || (RouterDOM as any).default?.Link;

export const LuxuryGallery: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState('All');
  const [selectedGarden, setSelectedGarden] = useState<typeof GALLERY_PROJECTS[0] | null>(null);

  useEffect(() => {
    markLuxuryInternalNav();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;
    const reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.prestige-glide').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              once: true,
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>('.prestige-stat-group').forEach((group) => {
        const items = group.querySelectorAll('.prestige-stat-item');
        const bars = group.querySelectorAll('.prestige-stat-bar');

        gsap.fromTo(
          items,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.14,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: group,
              start: 'top 90%',
              once: true,
            },
          }
        );

        gsap.fromTo(
          bars,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 1.5,
            stagger: 0.16,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: group,
              start: 'top 90%',
              once: true,
            },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, [filter]);

  const categories = [
    'All',
    'Country Gardens',
    'Town Gardens',
    'Courtyard & Roof',
    'RHS Show Gardens',
  ];

  const filteredProjects =
    filter === 'All'
      ? GALLERY_PROJECTS
      : GALLERY_PROJECTS.filter((p) => p.category === filter);

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-[#0C0A08] text-[#F4F1EA] font-sans overflow-x-hidden"
    >
      <LuxuryNavbar />

      <section className="pt-32 sm:pt-44 pb-14 sm:pb-24 px-5 sm:px-6 md:px-14 border-b border-[#C8B88A]/15">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-5 prestige-glide">
              <span className="block text-[10px] font-mono uppercase tracking-[0.45em] text-[#C8B88A]">
                SELECTED COMMISSIONS · ARCHIVE
              </span>
              <h1 className="font-cinzel text-4xl sm:text-6xl font-bold text-[#F4F1EA] uppercase leading-[1.06]">
                GARDENS BUILT TO <br />
                <span className="font-cormorant italic font-normal text-[#C8B88A]">
                  STAND THE TEST OF TIME.
                </span>
              </h1>
            </div>
            <div className="lg:col-span-4 prestige-glide">
              <p className="text-white/60 text-sm sm:text-base font-light leading-[1.85]">
                Explore a curated selection of our residential estates across Wiltshire, the Cotswolds, Surrey, and London, alongside our medal-winning RHS Show Gardens.
              </p>
            </div>
          </div>

          {/* Animated Counting Archive Metrics */}
          <div className="prestige-stat-group mt-12 pt-8 border-t border-[#C8B88A]/20 grid grid-cols-3 gap-6 sm:gap-10 max-w-2xl">
            <div className="prestige-stat-item">
              <div className="font-cinzel text-3xl sm:text-4xl font-bold text-[#C8B88A]">
                <LuxuryCountUp end={GALLERY_PROJECTS.length} padZero duration={1700} />
              </div>
              <div className="h-[1px] w-full bg-[#C8B88A]/15 my-2 overflow-hidden">
                <div className="prestige-stat-bar h-full w-full bg-[#C8B88A]" />
              </div>
              <div className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#F4F1EA]/55">
                Featured Estates
              </div>
            </div>
            <div className="prestige-stat-item">
              <div className="font-cinzel text-3xl sm:text-4xl font-bold text-[#C8B88A]">
                <LuxuryCountUp end={22} duration={1900} />
              </div>
              <div className="h-[1px] w-full bg-[#C8B88A]/15 my-2 overflow-hidden">
                <div className="prestige-stat-bar h-full w-full bg-[#C8B88A]" />
              </div>
              <div className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#F4F1EA]/55">
                RHS &amp; BALI Medals
              </div>
            </div>
            <div className="prestige-stat-item">
              <div className="font-cinzel text-3xl sm:text-4xl font-bold text-[#C8B88A]">
                <LuxuryCountUp end={28} suffix="+" duration={2100} />
              </div>
              <div className="h-[1px] w-full bg-[#C8B88A]/15 my-2 overflow-hidden">
                <div className="prestige-stat-bar h-full w-full bg-[#C8B88A]" />
              </div>
              <div className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#F4F1EA]/55">
                Years of Craft
              </div>
            </div>
          </div>

          <div className="prestige-glide mt-10 pt-6 border-t border-white/10 flex flex-wrap gap-6 sm:gap-10">
            {categories.map((cat) => {
              const active = filter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilter(cat)}
                  className={`text-xs font-mono uppercase tracking-[0.25em] pb-2 border-b transition-all cursor-pointer ${
                    active
                      ? 'text-[#C8B88A] border-[#C8B88A] font-bold'
                      : 'text-white/45 border-transparent hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-28 px-5 sm:px-6 md:px-14 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              onClick={() => setSelectedGarden(project)}
              className="prestige-glide group cursor-pointer flex flex-col"
            >
              <div className="w-full aspect-[4/5] overflow-hidden bg-[#16130E] border border-[#C8B88A]/20 group-hover:border-[#C8B88A] transition-colors">
                <img
                  src={project.img}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <div className="pt-4 pb-3 border-b border-white/10 flex items-baseline justify-between gap-3">
                <div className="flex items-baseline gap-2.5 min-w-0">
                  <span className="font-mono text-xs text-[#C8B88A] shrink-0">
                    <LuxuryCountUp end={idx + 1} padZero duration={1300 + idx * 120} />
                  </span>
                  <h2 className="font-cinzel text-base sm:text-lg font-bold text-white group-hover:text-[#C8B88A] transition-colors truncate uppercase">
                    {project.title}
                  </h2>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/50 shrink-0">
                  {project.location}
                </span>
              </div>
              <p className="pt-3 text-white/60 text-xs leading-[1.8] font-light line-clamp-3">
                {project.summary}
              </p>
            </div>
          ))}
        </div>
      </section>

      {selectedGarden && (
        <div
          className="fixed inset-0 z-[260] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 overflow-y-auto"
          onClick={() => setSelectedGarden(null)}
        >
          <div
            className="bg-[#120F0B] border border-[#C8B88A]/35 max-w-5xl w-full overflow-hidden grid grid-cols-1 lg:grid-cols-12 my-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="lg:col-span-6 aspect-[4/3] lg:aspect-auto bg-[#16130E]">
              <img
                src={selectedGarden.img}
                alt={selectedGarden.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:col-span-6 p-6 sm:p-10 md:p-12 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4 pb-4 mb-6 border-b border-white/10">
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C8B88A]">
                    {selectedGarden.category} · {selectedGarden.location}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedGarden(null)}
                    aria-label="Close"
                    className="text-white/70 hover:text-[#C8B88A] cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                </div>

                <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white uppercase mb-4">
                  {selectedGarden.title}
                </h3>
                <p className="text-white/65 text-sm leading-[1.85] font-light mb-6">
                  {selectedGarden.summary}
                </p>

                <div className="divide-y divide-white/10 border-y border-white/10 mb-8">
                  {selectedGarden.features.map((feat, i) => (
                    <div
                      key={i}
                      className="py-2.5 text-xs text-white/80 font-light flex items-center justify-between gap-4"
                    >
                      <span>{feat}</span>
                      <span className="font-mono text-[10px] text-[#C8B88A] shrink-0">
                        0{i + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to="/demo/landscaping-luxury/contact"
                onClick={() => setSelectedGarden(null)}
                className="inline-flex items-center justify-center gap-3 py-4 px-7 bg-[#C8B88A] hover:bg-[#D8CBA3] text-[#0C0A08] font-bold text-xs uppercase tracking-[0.24em] transition-all"
              >
                <span>COMMISSION A SIMILAR ESTATE</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      )}

      <LuxuryFooter />
    </div>
  );
};

export default LuxuryGallery;
