import React, { useEffect } from 'react';
import * as RouterDOM from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Ruler, 
  ShieldCheck, 
  Sparkles, 
  Phone 
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const Link = (RouterDOM as any).Link || (RouterDOM as any).default?.Link;

export const Services: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      id: "patios",
      title: "Porcelain & Natural Stone Terraces",
      subtitle: "Precision-laid outdoor living surfaces engineered for zero movement and decades of beauty.",
      img: "https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&q=80&w=1200",
      details: [
        "Full wet mortar bed with polymer slurry bond coat (BS 7533 standard)",
        "Italian & Spanish 20mm rectified porcelain, Indian sandstone & limestone",
        "Discreet slot drainage channels and precision fall gradients",
        "Frost-proof, mould-resistant epoxy and resin jointing systems"
      ],
      specs: {
        base: "150mm compacted MOT Type 1",
        finish: "R11 Anti-Slip Rated",
        guarantee: "10-Year Structural Guarantee"
      }
    },
    {
      id: "outdoor-living",
      title: "Outdoor Living Spaces & Pergolas",
      subtitle: "Bespoke al fresco dining, integrated kitchens, and sheltered living terraces for all seasons.",
      img: "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&q=80&w=1200",
      details: [
        "Bioclimatic motorized louvered aluminum & western red cedar pergolas",
        "Custom outdoor kitchen builds with granite counters and built-in BBQs",
        "Sunken fire pit lounges with custom upholstered masonry seating",
        "Integrated warm LED step, bench and canopy ambient lighting systems"
      ],
      specs: {
        electrics: "IP65 Weatherproof Certified",
        framing: "Marine-Grade Powder Coating",
        guarantee: "5-Year Fixture Warranty"
      }
    },
    {
      id: "planting",
      title: "Architectural Garden Design & Planting",
      subtitle: "Structural evergreen palettes and specimen trees tailored to your soil, aspect, and architecture.",
      img: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=1200",
      details: [
        "Full 3D CAD visualization with walk-through daylight simulations",
        "Specimen architectural trees (cloud-pruned pines, multi-stem birches, pleached hornbeams)",
        "Multi-seasonal perennial borders with year-round architectural interest",
        "App-controlled automated micro-drip irrigation and root fertilization"
      ],
      specs: {
        soil: "Imported British BS3882 Topsoil",
        establishment: "12-Month Plant Warranty",
        planning: "RHS Master Horticulturists"
      }
    },
    {
      id: "masonry",
      title: "Stone Masonry, Walling & Screening",
      subtitle: "Dry-stone fieldstone walls, rendered planters, and contemporary acoustic timber boundaries.",
      img: "https://images.unsplash.com/photo-1584479898061-15742e14f50d?auto=format&fit=crop&q=80&w=1200",
      details: [
        "Traditional Cotswold stone and Bath stone dry-walling and mortar-set retaining",
        "Reinforced concrete block retaining walls with smooth monocouche render",
        "Contemporary horizontal slatted cedar & Siberian larch acoustic fencing",
        "Integrated garden steps, bullnose stone copings, and retaining terraces"
      ],
      specs: {
        reinforcement: "Steel rebar & poured concrete footings",
        drainage: "Perforated French drain backfill",
        guarantee: "10-Year Structural Guarantee"
      }
    },
    {
      id: "lawns",
      title: "Precision Turfing & Sub-Surface Drainage",
      subtitle: "Fine estate lawn establishment, laser-level grading, and waterlogged garden remediation.",
      img: "https://images.unsplash.com/photo-1558904541-efa8c1965f1e?auto=format&fit=crop&q=80&w=1200",
      details: [
        "Laser-guided rotary cultivation and rootzone soil conditioning",
        "Premium Rolawn Medallion certified weed-free stadium-grade turf",
        "Herringbone land drainage systems connected to engineered soakaways",
        "Precision aluminium and corten steel garden edging"
      ],
      specs: {
        grading: "Laser-levelled sub-grade",
        rootzone: "70/30 Sandy Loam Mix",
        aftercare: "Complimentary 30-Day First Cut & Feed"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-stone-900 font-sans selection:bg-[#C86A3D] selection:text-white">
      <Navbar />

      {/* HEADER BANNER */}
      <section className="bg-[#162E20] text-white py-20 px-6 md:px-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#E08A5B] font-bold">
            <span>Specialist Disciplines</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            Comprehensive Landscaping Services.
          </h1>
          <p className="text-stone-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            From single terrace installations to complete multi-acre estate redesigns, every contract is delivered by our dedicated in-house tradesmen to strict British Standards.
          </p>
        </div>
      </section>

      {/* SERVICES LIST */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto space-y-24">
        {services.map((service, idx) => (
          <div
            key={service.id}
            id={service.id}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center ${
              idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Visual Column (6 cols) */}
            <div className={`lg:col-span-6 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-stone-200 bg-stone-900">
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-md text-[10px] font-mono uppercase text-white tracking-wider">
                  Discipline 0{idx + 1}
                </div>
              </div>
            </div>

            {/* Content Column (6 cols) */}
            <div className={`lg:col-span-6 space-y-6 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#C86A3D] font-bold block mb-1">
                  Oak &amp; Ash Specification
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#162E20] tracking-tight">
                  {service.title}
                </h2>
                <p className="text-stone-600 text-sm sm:text-base leading-relaxed mt-2.5 font-normal">
                  {service.subtitle}
                </p>
              </div>

              {/* Bullet Features */}
              <div className="space-y-3 pt-2 border-t border-stone-200">
                {service.details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-[#C86A3D] shrink-0 mt-0.5" />
                    <span className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                      {detail}
                    </span>
                  </div>
                ))}
              </div>

              {/* Technical Badges */}
              <div className="grid grid-cols-3 gap-3 p-4 bg-white rounded-xl border border-stone-200 text-center">
                {Object.entries(service.specs).map(([key, val], sIdx) => (
                  <div key={sIdx} className="space-y-1">
                    <div className="text-[9px] font-mono uppercase tracking-wider text-stone-400">
                      {key}
                    </div>
                    <div className="text-[11px] font-bold text-[#162E20] leading-tight">
                      {val}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="pt-2">
                <Link
                  to="/demo/landscaping/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#162E20] hover:bg-[#C86A3D] text-white text-xs uppercase tracking-wider font-semibold rounded-lg transition-all shadow-md"
                >
                  <span>Request Quote For This Service</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

          </div>
        ))}
      </section>

      {/* CONSULTATION BANNER */}
      <section className="bg-[#F5F2EB] py-20 px-6 md:px-12 border-t border-stone-200 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#162E20]">
            Need Advice on Material Choice or Ground Levels?
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Our lead estimator visits your property with stone and porcelain samples, assesses drainage requirements, and explains the construction methodology in plain English.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/demo/landscaping/contact"
              className="px-8 py-3.5 bg-[#C86A3D] text-white text-xs uppercase tracking-wider font-semibold rounded-lg hover:bg-[#b5582c] transition-all shadow-md"
            >
              <span>Book An On-Site Consultation</span>
            </Link>
            <a
              href="tel:01672552140"
              className="px-8 py-3.5 bg-white text-[#162E20] border border-stone-300 text-xs uppercase tracking-wider font-semibold rounded-lg hover:bg-stone-50 transition-all shadow-sm flex items-center gap-2"
            >
              <Phone size={14} className="text-[#C86A3D]" />
              <span>Call 01672 552 140</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;