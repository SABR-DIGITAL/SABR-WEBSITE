import React, { useEffect, useState, useRef } from 'react';
import * as RouterDOM from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, X } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

gsap.registerPlugin(ScrollTrigger);

const Link = (RouterDOM as any).Link || (RouterDOM as any).default?.Link;

interface GardenProject {
  id: number;
  index: string;
  title: string;
  location: string;
  category: string;
  award?: string;
  summary: string;
  img: string;
  features: string[];
}

export const Gallery: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState('All');
  const [selectedGarden, setSelectedGarden] = useState<GardenProject | null>(null);

  useEffect(() => {
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
      gsap.utils.toArray<HTMLElement>('.lux-glide').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 36, opacity: 0 },
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

  const projects: GardenProject[] = [
    {
      id: 1,
      index: '01',
      title: 'Petworth Reflection Courtyard',
      location: 'Petworth, Sussex',
      category: 'Country Gardens',
      award: 'BALI Principal Award',
      summary:
        'A serene country estate garden anchored by a black-bottom reflection pool, hand-dressed Yorkstone paving, clipped yew buttresses, and drifted herbaceous perennial borders.',
      img: 'https://dmhdaawgg48dl.cloudfront.net/wp-content/uploads/2025/02/reflection-pool-york-stone-courtyard-country-garden-petworth-760x760.jpg',
      features: [
        'Bespoke black-lined reflection pool with submerged coping',
        'Reclaimed riven Yorkstone terrace and step risers',
        'Multi-stem Amelanchier lamarckii and Taxus baccata hedging',
        'Automated rainwater-fed drip irrigation and brass uplighting',
      ],
    },
    {
      id: 2,
      index: '02',
      title: 'Notting Hill Yorkstone Terrace',
      location: 'Notting Hill, W11',
      category: 'Town Gardens',
      award: 'SGD Shortlisted',
      summary:
        'An architectural town garden designed for year-round entertaining, featuring sawn Yorkstone terraces, clipped evergreen structure, and classic conservatory views.',
      img: 'https://dmhdaawgg48dl.cloudfront.net/wp-content/uploads/2024/10/york-stone-patio-conservatory-hedges-classic-notting-hill-960x960.jpg',
      features: [
        'Sawn buff Yorkstone dining terrace with recessed drainage',
        'Pleached Hornbeam & clipped yew structure for privacy',
        'Shade-tolerant woodland underplanting with ferns & hostas',
        'Warm 2700K architectural garden lighting',
      ],
    },
    {
      id: 3,
      index: '03',
      title: 'Oxshott Contemporary Estate',
      location: 'Oxshott, Surrey',
      category: 'Country Gardens',
      summary:
        'A sheltered contemporary family garden uniting bespoke architectural metalwork, porcelain dining terraces, palm and perennial borders, and an expansive fine lawn.',
      img: 'https://dmhdaawgg48dl.cloudfront.net/wp-content/uploads/2024/10/pool-patio-palm-trees-putting-green-modern-oxshott-surrey-760x760.jpg',
      features: [
        'Bespoke powder-coated architectural pergola',
        'Vitrified Italian limestone paving laid on reinforced screed',
        'Pollinator-rich herbaceous borders with alliums & salvias',
        'Integrated pool terrace & outdoor lounge',
      ],
    },
    {
      id: 4,
      index: '04',
      title: 'Hampstead Plunge Pool Sanctuary',
      location: 'Hampstead, NW3',
      category: 'Courtyard & Roof',
      award: 'BALI National Winner',
      summary:
        'A tranquil subterranean sanctuary carved behind a period residence, pairing cantilevered floating stone steps with a heated plunge pool and lush evergreen foliage.',
      img: 'https://dmhdaawgg48dl.cloudfront.net/wp-content/uploads/2024/11/plunge-pool-stone-patio-floating-stairs-modern-hampstead-760x760.jpg',
      features: [
        'Flamed stone paving & cantilevered floating steps',
        'Heated architectural plunge pool with concealed cover',
        'Specimen Japanese maples & evergreen textural foliage',
        'Concealed LED step and water illumination',
      ],
    },
    {
      id: 5,
      index: '05',
      title: 'RHS Chelsea Sanctuary Garden',
      location: 'Chelsea, London',
      category: 'RHS Show Gardens',
      award: 'RHS Gold Medal',
      summary:
        'Built under intense showground timelines to RHS Gold standard, showcasing a Corten steel pavilion, riven stone pathways, and naturalistic woodland Salvia planting.',
      img: 'https://dmhdaawgg48dl.cloudfront.net/wp-content/uploads/2024/12/corten-steel-pavilion-stone-path-salvia-woodland-960x960.jpg',
      features: [
        'Bespoke weathered Corten steel garden pavilion',
        'Hand-dressed natural stone pathway & boulders',
        'Over 2,400 peat-free herbaceous perennials & grasses',
        'Zero-cement sustainable sub-base construction',
      ],
    },
    {
      id: 6,
      index: '06',
      title: 'Esher Topiary & Dining Garden',
      location: 'Esher, Surrey',
      category: 'Town Gardens',
      summary:
        'Clipped boxwood topiary spheres and hand-laid natural stone combine with scented climbing jasmine, deep cottage borders, and a generous central lawn.',
      img: 'https://dmhdaawgg48dl.cloudfront.net/wp-content/uploads/2024/11/metal-dining-set-boxwood-topiary-cottage-esher-surrey-960x960.jpg',
      features: [
        'Hand-selected natural stone terrace & pathways',
        'Mature cloud-pruned & clipped Buxus/Ilex spheres',
        'Rye/fescue luxury turf lawn with concealed steel edging',
        'Full seasonal maintenance & irrigation programme',
      ],
    },
    {
      id: 7,
      index: '07',
      title: 'Belgravia Sky & Roof Terrace',
      location: 'Belgravia, SW1',
      category: 'Courtyard & Roof',
      summary:
        'Engineered for weight-loading precision, featuring bespoke slate troughs, composite architectural decking, specimen multi-stem trees, and sheltered dining.',
      img: 'https://dmhdaawgg48dl.cloudfront.net/wp-content/uploads/2024/11/rooftop-terrace-dining-table-composite-decking-slate-planters-760x760.jpg',
      features: [
        'Structural weight-verified lightweight substrate system',
        'Custom architectural slate planters',
        'Wind-tolerant Mediterranean & evergreen planting palette',
        'Concealed acoustic speakers & dimmable perimeter lighting',
      ],
    },
    {
      id: 8,
      index: '08',
      title: 'Kingston Floating Water Garden',
      location: 'Kingston, Surrey',
      category: 'Country Gardens',
      award: 'BALI Award Winner',
      summary:
        'A contemporary water garden featuring tiered slate walling, floating stone walkways across a still reflection pool, and naturalistic marginal planting.',
      img: 'https://dmhdaawgg48dl.cloudfront.net/wp-content/uploads/2024/11/slate-wall-floating-walkway-water-feature-contemporary-kingston-760x760.jpg',
      features: [
        'Tiered natural slate feature wall & water blade',
        'Cantilevered stone stepping pavers over water',
        'Aquatic & marginal planting for natural filtration',
        'Dedicated fortnightly horticultural estate care',
      ],
    },
    {
      id: 9,
      index: '09',
      title: 'RHS Naturalistic Crescent Pool',
      location: 'Chelsea, London',
      category: 'RHS Show Gardens',
      award: 'RHS Gold Medal',
      summary:
        'A contemplative woodland water garden celebrating British craft, curved stone stepping paths, still water reflections, ferns, and bearded irises.',
      img: 'https://dmhdaawgg48dl.cloudfront.net/wp-content/uploads/2024/12/stone-path-crescent-pool-fern-iris-naturalistic-960x960.jpg',
      features: [
        'Curved hand-dressed natural stone crescent pathway',
        'Still black-water reflection pool & marginal flora',
        'Native woodland ferns, irises, and epimediums',
        'Rebuilt permanently at a private estate in Wiltshire',
      ],
    },
  ];

  const filteredProjects =
    filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <div
      ref={pageRef}
      className="bg-[#FAF9F5] text-[#1C211D] min-h-screen font-sans selection:bg-[#5B6450] selection:text-white overflow-x-hidden"
    >
      <Navbar />

      {/* 1. MINIMALIST EDITORIAL HEADER */}
      <section className="pt-24 sm:pt-36 md:pt-48 pb-12 sm:pb-24 px-5 sm:px-10 md:px-14 lg:px-24 border-b border-[#E4E0D7]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12 items-end">
            <div className="lg:col-span-8 space-y-4 sm:space-y-6">
              <p className="lux-glide text-[9px] sm:text-[10px] uppercase tracking-[0.34em] sm:tracking-[0.38em] text-[#5B6450]">
                Selected Commissions · Portfolio
              </p>
              <h1 className="lux-glide font-cormorant text-4xl sm:text-6xl lg:text-7xl font-light text-[#1C211D] leading-[1.06] tracking-tight">
                Gardens Built to <br />
                <span className="italic text-[#5B6450]">Stand the Test of Time.</span>
              </h1>
            </div>
            <div className="lg:col-span-4">
              <p className="lux-glide text-[#5A5953] text-sm sm:text-base leading-[1.85] font-light">
                Explore a curated selection of our residential gardens across Wiltshire, the Cotswolds, Surrey, and London, alongside our medal-winning RHS Show Gardens.
              </p>
            </div>
          </div>

          {/* Minimalist Hairline Filter Row */}
          <div className="lux-glide mt-8 sm:mt-16 pt-5 sm:pt-8 border-t border-[#E4E0D7] flex flex-wrap gap-x-5 sm:gap-x-10 gap-y-2.5 sm:gap-y-3">
            {categories.map((cat) => {
              const active = filter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilter(cat)}
                  className={`text-[10px] sm:text-[11px] uppercase tracking-[0.22em] sm:tracking-[0.28em] pb-2 border-b transition-all duration-300 cursor-pointer ${
                    active
                      ? 'text-[#1C211D] border-[#1C211D] font-medium'
                      : 'text-[#848982] border-transparent hover:text-[#1C211D]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. SYMMETRICAL UNBOXED PORTFOLIO GRID (ZERO BADGES INSIDE IMAGES) */}
      <section className="py-16 sm:py-28 md:py-36 px-5 sm:px-10 md:px-14 lg:px-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-10 gap-y-12 sm:gap-y-20 items-stretch">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedGarden(project)}
              className="lux-glide group cursor-pointer flex flex-col h-full overflow-hidden"
            >
              {/* Uniform 4:5 Aspect Ratio Image */}
              <div className="w-full aspect-[4/5] overflow-hidden bg-[#EBE7DF] shrink-0">
                <img
                  src={project.img}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />
              </div>

              {/* Symmetrical Hairline Header */}
              <div className="pt-4 sm:pt-5 pb-3.5 border-b border-[#D8D4CA] flex items-baseline justify-between gap-3 min-w-0">
                <div className="flex items-baseline gap-2.5 min-w-0">
                  <span className="font-cormorant italic text-base sm:text-lg text-[#7A7E72] shrink-0">
                    {project.index}
                  </span>
                  <h2 className="font-cormorant text-xl sm:text-2xl font-normal text-[#1C211D] group-hover:text-[#5B6450] transition-colors truncate">
                    {project.title}
                  </h2>
                </div>
                <span className="text-[9px] xl:text-[10px] uppercase tracking-[0.2em] text-[#5B6450] shrink-0 text-right">
                  {project.location}
                </span>
              </div>

              {/* Concise Summary Below Hairline */}
              <div className="pt-3.5 flex flex-col justify-between flex-grow gap-3">
                <p className="text-[#5A5953] text-xs sm:text-[13px] leading-[1.8] font-light line-clamp-3">
                  {project.summary}
                </p>
                <div className="flex items-center justify-between pt-1 text-[9px] uppercase tracking-[0.24em] text-[#848982]">
                  <span>{project.award || project.category}</span>
                  <span className="text-[#1C211D] group-hover:text-[#5B6450] transition-colors">
                    View Details →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CASE STUDY LIGHTBOX MODAL */}
      {selectedGarden && (
        <div
          className="fixed inset-0 z-[260] bg-[#1C211D]/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 md:p-10 overflow-y-auto"
          onClick={() => setSelectedGarden(null)}
        >
          <div
            className="bg-[#FAF9F5] max-w-5xl w-full max-h-[90dvh] lg:max-h-none overflow-y-auto lg:overflow-hidden grid grid-cols-1 lg:grid-cols-12 my-auto shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="lg:col-span-6 relative aspect-[16/11] sm:aspect-[4/3] lg:aspect-auto bg-[#EBE7DF]">
              <img
                src={selectedGarden.img}
                alt={selectedGarden.title}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedGarden(null)}
                aria-label="Close"
                className="lg:hidden absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 text-[#1C211D] flex items-center justify-center shadow-md cursor-pointer"
              >
                <X size={18} strokeWidth={1.4} />
              </button>
            </div>

            <div className="lg:col-span-6 p-5 sm:p-10 md:p-14 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4 pb-4 sm:pb-5 mb-5 sm:mb-8 border-b border-[#E4E0D7]">
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.26em] sm:tracking-[0.28em] text-[#5B6450]">
                    {selectedGarden.category} · {selectedGarden.location}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedGarden(null)}
                    aria-label="Close"
                    className="hidden lg:inline-flex text-[#1C211D] hover:text-[#5B6450] transition-colors cursor-pointer p-1"
                  >
                    <X size={20} strokeWidth={1.2} />
                  </button>
                </div>

                <h3 className="font-cormorant text-2xl sm:text-4xl text-[#1C211D] leading-[1.12] mb-3.5 sm:mb-5">
                  {selectedGarden.title}
                </h3>

                <p className="text-[#5A5953] text-sm sm:text-[15px] leading-[1.8] sm:leading-[1.85] font-light mb-6 sm:mb-8">
                  {selectedGarden.summary}
                </p>

                <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.28em] text-[#848982] mb-3">
                  Specification &amp; Craftsmanship
                </p>
                <div className="divide-y divide-[#E4E0D7] border-t border-b border-[#E4E0D7] mb-6 sm:mb-8">
                  {selectedGarden.features.map((feat, i) => (
                    <div
                      key={i}
                      className="py-2.5 sm:py-3 text-xs sm:text-[13px] text-[#1C211D] font-light flex items-center justify-between gap-4"
                    >
                      <span>{feat}</span>
                      <span className="font-cormorant italic text-sm text-[#848982] shrink-0">
                        0{i + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <Link
                  to="/demo/landscaping/contact"
                  onClick={() => setSelectedGarden(null)}
                  className="inline-flex items-center gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-[#1C211D] pb-2 border-b border-[#1C211D] hover:text-[#5B6450] hover:border-[#5B6450] transition-colors"
                >
                  <span>Commission a Similar Garden</span>
                  <ArrowUpRight size={14} />
                </Link>
                {selectedGarden.award && (
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.24em] text-[#5B6450]">
                    {selectedGarden.award}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. QUIET EDITORIAL CALLOUT */}
      <section className="py-16 sm:py-28 md:py-36 px-5 sm:px-10 md:px-14 lg:px-24 bg-[#F3F1EB] border-t border-[#E4E0D7]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-8 sm:gap-12">
          <div className="max-w-2xl space-y-3 sm:space-y-4">
            <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.34em] text-[#5B6450]">
              Private Commissions
            </p>
            <h2 className="font-cormorant text-3xl sm:text-5xl lg:text-6xl font-light text-[#1C211D] leading-[1.08]">
              Ready to Transform Your <br />
              <span className="italic text-[#5B6450]">Own Outdoor Space?</span>
            </h2>
          </div>
          <Link
            to="/demo/landscaping/contact"
            className="inline-flex items-center gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-[#1C211D] pb-2 border-b border-[#1C211D] hover:text-[#5B6450] hover:border-[#5B6450] transition-colors self-start lg:self-auto"
          >
            <span>Arrange a Private Site Visit</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;