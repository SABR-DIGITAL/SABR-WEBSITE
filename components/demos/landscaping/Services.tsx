import React, { useEffect, useRef } from 'react';
import * as RouterDOM from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

gsap.registerPlugin(ScrollTrigger);

const Link = (RouterDOM as any).Link || (RouterDOM as any).default?.Link;

export const Services: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);

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
              start: 'top 88%',
              once: true,
            },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      index: '01',
      id: 'design',
      kicker: 'Consultancy & Masterplanning',
      title: 'Garden Design & 3D Architecture',
      prose:
        'Every commission begins with a thorough topographical survey, soil assessment, and architectural study of how light moves across your plot. Our studio develops spatial masterplans, 3D visualisations, and setting-out drawings that unite house and garden.',
      deliverables: [
        'Topographical survey & aspect study',
        'Spatial masterplans & 3D visualisations',
        'Natural stone & material curation',
        'Lighting & drainage schematics',
      ],
      img: 'https://dmhdaawgg48dl.cloudfront.net/wp-content/uploads/2024/11/metal-dining-set-boxwood-topiary-cottage-esher-surrey-960x960.jpg',
    },
    {
      index: '02',
      id: 'build',
      kicker: 'Master Landscape Construction',
      title: 'Hard Landscaping, Terraces & Stonework',
      prose:
        'Constructed entirely by our permanent in-house stonemasons and landscape engineers. From hand-selected Yorkstone and large-format Italian porcelain terraces to bespoke metalwork pergolas, outdoor kitchens, and dry-stone retaining walls.',
      deliverables: [
        'Yorkstone, limestone & porcelain terraces',
        'Bespoke louvred pergolas & outdoor kitchens',
        'Dry-stone walling & cantilevered steps',
        'Engineered sub-bases to BS 7533',
      ],
      img: 'https://dmhdaawgg48dl.cloudfront.net/wp-content/uploads/2024/10/york-stone-patio-conservatory-hedges-classic-notting-hill-960x960.jpg',
    },
    {
      index: '03',
      id: 'planting',
      kicker: 'Botanical Composition',
      title: 'Soft Landscaping, Water & Lighting',
      prose:
        'Our RHS-qualified horticulturists compose layered planting palettes that bring movement, scent, and structure across all four seasons—paired with tranquil reflection pools, natural stone rills, automated irrigation, and warm night lighting.',
      deliverables: [
        'Specimen multi-stem trees & pleached screening',
        'Multi-seasonal perennial borders',
        'Reflection pools & natural stone rills',
        'Low-voltage lighting & automated irrigation',
      ],
      img: 'https://dmhdaawgg48dl.cloudfront.net/wp-content/uploads/2024/12/curved-stone-pathway-iris-fern-modern-woodland-960x960.jpg',
    },
    {
      index: '04',
      id: 'aftercare',
      kicker: 'Seasonal Stewardship',
      title: 'Fine Garden Maintenance & Aftercare',
      prose:
        'A newly built landscape evolves year by year. Our specialist maintenance teams provide scheduled seasonal visits for formative tree pruning, topiary clipping, organic soil conditioning, and herbaceous border care.',
      deliverables: [
        'Formative tree & topiary shaping',
        'Seasonal border & bulb stewardship',
        'Organic soil enrichment & fine turf care',
        'Irrigation & lighting system servicing',
      ],
      img: 'https://dmhdaawgg48dl.cloudfront.net/wp-content/uploads/2024/10/tiered-slate-retaining-wall-cherry-blossom-japanese-putney-760x760.jpg',
    },
  ];

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-[#FAF9F5] text-[#1C211D] font-sans selection:bg-[#5B6450] selection:text-white overflow-x-hidden"
    >
      <Navbar />

      {/* MINIMALIST EDITORIAL HEADER */}
      <section className="pt-24 sm:pt-36 md:pt-48 pb-12 sm:pb-24 md:pb-32 px-5 sm:px-10 md:px-14 lg:px-24 border-b border-[#E4E0D7]">
        <div className="max-w-5xl mx-auto space-y-5 sm:space-y-8 lux-glide">
          <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.34em] sm:tracking-[0.38em] text-[#5B6450]">
            Design &amp; Construction
          </span>
          <h1 className="font-cormorant text-4xl sm:text-6xl md:text-7xl font-light text-[#1C211D] tracking-tight leading-[1.06]">
            Every discipline,{' '}
            <span className="italic text-[#5B6450]">under one roof.</span>
          </h1>
          <p className="text-[#5A5953] text-sm sm:text-base md:text-lg font-light leading-[1.8] sm:leading-[1.9] max-w-2xl">
            From initial spatial drawings through to structural stonework, planting, and seasonal stewardship, every stage is delivered by our permanent in-house specialists.
          </p>
        </div>
      </section>

      {/* UNBOXED EDITORIAL SERVICE SECTIONS */}
      <section className="py-16 sm:py-28 md:py-40 px-5 sm:px-10 md:px-14 lg:px-24 max-w-7xl mx-auto space-y-16 sm:space-y-32 md:space-y-44">
        {services.map((service, idx) => (
          <div
            key={service.id}
            id={service.id}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-14 lg:gap-24 items-center"
          >
            {/* Pure Photograph — Zero Floating Boxes or Tags Inside */}
            <div className={`lux-glide lg:col-span-6 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
              <div className="overflow-hidden aspect-[4/3] bg-[#E5E2D9]">
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            {/* Clean Unboxed Content Column */}
            <div className={`lux-glide lg:col-span-6 space-y-5 sm:space-y-8 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
              <div className="space-y-2 sm:space-y-3">
                <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.34em] sm:tracking-[0.36em] text-[#5B6450]">
                  {service.index} &nbsp;/&nbsp; {service.kicker}
                </span>
                <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-light text-[#1C211D] leading-[1.15]">
                  {service.title}
                </h2>
              </div>

              <p className="text-[#5A5953] text-sm sm:text-base font-light leading-[1.8] sm:leading-[1.9]">
                {service.prose}
              </p>

              {/* Hairline-Divided Deliverables */}
              <div className="border-t border-[#D8D4CA] pt-4 sm:pt-6 grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 sm:gap-y-3 gap-x-8">
                {service.deliverables.map((item) => (
                  <div
                    key={item}
                    className="text-xs font-light tracking-[0.06em] text-[#3B3E38] py-1.5 border-b border-[#ECE9E1]"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="pt-1 sm:pt-2">
                <Link
                  to="/demo/landscaping/contact"
                  className="inline-flex items-center gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.28em] sm:tracking-[0.3em] text-[#1C211D] hover:text-[#5B6450] pb-2 border-b border-[#1C211D] hover:border-[#5B6450] transition-colors"
                >
                  <span>Enquire About {service.kicker}</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
};

export default Services;