import React, { useEffect } from 'react';
import * as RouterDOM from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  Phone, 
  ShieldCheck, 
  Award, 
  Layers, 
  Sparkles, 
  Ruler, 
  Compass, 
  Quote 
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const Link = (RouterDOM as any).Link || (RouterDOM as any).default?.Link;

export const Home: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const featuredProjects = [
    {
      title: "Marlborough Estate Terrace",
      category: "Porcelain Paving & Ambient Lighting",
      location: "Marlborough, Wiltshire",
      img: "https://images.unsplash.com/photo-1558904541-efa8c1965f1e?auto=format&fit=crop&q=80&w=1200",
      description: "140m² large-format Italian porcelain patio with flush threshold transitions, integrated LED step lighting, and architectural ornamental grasses."
    },
    {
      title: "Cotswold Sunken Terrace & Fire Pit",
      category: "Dry-Stone Masonry & Outdoor Living",
      location: "Cirencester, Cotswolds",
      img: "https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&q=80&w=1200",
      description: "Hand-dressed Cotswold stone retaining walls, sunken fire pit seating terrace, and bespoke charcoal aluminum louvered pergola."
    },
    {
      title: "Salisbury Architectural Garden",
      category: "Complete Garden Transformation",
      location: "Salisbury, Wiltshire",
      img: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=1200",
      description: "Complete garden overhaul with raised western red cedar planters, multi-seasonal structural planting, and precision Rolawn turfing."
    }
  ];

  const coreServices = [
    {
      number: "01",
      title: "Porcelain & Stone Paving",
      desc: "Ultra-durable Italian porcelain and hand-selected natural sandstone terraces engineered with laser-level sub-bases and frost-proof resin jointing.",
      img: "https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&q=80&w=800"
    },
    {
      number: "02",
      title: "Architectural Garden Design",
      desc: "Comprehensive 3D concept masterplans, structural evergreen planting palettes, and specimen trees designed for year-round beauty and low maintenance.",
      img: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=800"
    },
    {
      number: "03",
      title: "Outdoor Living & Pergolas",
      desc: "Bioclimatic louvered pergolas, bespoke outdoor kitchens, integrated fire pits, and ambient architectural lighting for year-round entertaining.",
      img: "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&q=80&w=800"
    },
    {
      number: "04",
      title: "Stone Masonry & Walling",
      desc: "Traditional dry-stone fieldstone retaining walls, rendered brick planters, and acoustic slatted timber boundary screening built with artisan care.",
      img: "https://images.unsplash.com/photo-1584479898061-15742e14f50d?auto=format&fit=crop&q=80&w=800"
    }
  ];

  const trustPoints = [
    {
      icon: Ruler,
      title: "3D CAD Masterplanning",
      desc: "Visualise every angle of your new garden with precision 3D CAD renders before breaking ground."
    },
    {
      icon: Award,
      title: "In-House Master Craftsmen",
      desc: "Zero casual subcontractors. Every patio, wall, and lawn is built by our permanent, qualified trades team."
    },
    {
      icon: ShieldCheck,
      title: "10-Year Structural Guarantee",
      desc: "We build to strict British Standards (BS 7533), ensuring your terrace never sinks, cracks, or moves."
    },
    {
      icon: Compass,
      title: "Fixed-Price Certainty",
      desc: "Comprehensive itemised quotes with no hidden surprises, delivered on schedule with dedicated project management."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-stone-900 font-sans selection:bg-[#C86A3D] selection:text-white">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center bg-[#162E20] text-white px-6 md:px-12 py-20 overflow-hidden">
        {/* Ambient Dark Image Backdrop */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1558904541-efa8c1965f1e?auto=format&fit=crop&q=80&w=1600"
            alt="Modern luxury landscaped garden terrace"
            className="w-full h-full object-cover opacity-35 object-center"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#162E20]/95 via-[#162E20]/85 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Hero Copy (Left 7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#E08A5B] text-xs font-mono uppercase tracking-[0.2em] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E08A5B]" />
              <span>WILTSHIRE &amp; COTSWOLD GARDEN ARCHITECTURE</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08]">
              Architectural Gardens. <br />
              <span className="italic text-[#E08A5B] font-normal">Built to Endure.</span>
            </h1>

            <p className="text-stone-300 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
              Specialists in luxury porcelain terraces, Cotswold stone masonry, and complete garden transformations. We turn uninspiring outdoor spaces into functional, timeless extensions of your home.
            </p>

            {/* Value Indicators */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs text-stone-300 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-[#E08A5B]" />
                <span>Fixed-Price Quotes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-[#E08A5B]" />
                <span>10-Year Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-[#E08A5B]" />
                <span>RHS Qualified Team</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <Link
                to="/demo/landscaping/contact"
                className="px-8 py-4 bg-[#C86A3D] hover:bg-[#b5582c] text-white font-semibold text-xs uppercase tracking-wider rounded-lg transition-all duration-300 shadow-xl flex items-center justify-center gap-3 hover:scale-105 active:scale-95"
              >
                <span>Request Free Consultation</span>
                <ArrowRight size={15} />
              </Link>
              <Link
                to="/demo/landscaping/gallery"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
              >
                <span>View Recent Projects</span>
              </Link>
            </div>
          </div>

          {/* Hero Quick Card (Right 5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-md bg-white p-7 sm:p-9 rounded-2xl shadow-2xl border border-stone-200 text-stone-900 relative">
              <div className="w-10 h-1 bg-[#C86A3D] mb-5 rounded-full" />
              <h3 className="font-serif text-2xl font-bold text-[#162E20] mb-2">
                Book a Free Site Visit
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-6">
                We assess your site levels, soil conditions, and spatial orientation to provide a fixed-price design and build estimate within 48 hours.
              </p>

              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 mb-6 space-y-2">
                <div className="text-[10px] font-mono uppercase tracking-wider text-stone-500 font-semibold">
                  Direct Estimator Line
                </div>
                <a
                  href="tel:01672552140"
                  className="font-serif text-2xl font-bold text-[#162E20] hover:text-[#C86A3D] transition-colors block"
                >
                  01672 552 140
                </a>
                <div className="text-[11px] text-stone-500">
                  Monday – Friday · 07:30 – 17:30
                </div>
              </div>

              <Link
                to="/demo/landscaping/contact"
                className="w-full py-3.5 bg-[#162E20] hover:bg-[#C86A3D] text-white font-semibold text-xs uppercase tracking-wider rounded-lg transition-all duration-300 shadow-md flex items-center justify-center gap-2.5 text-center"
              >
                <span>Get Started Online</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* FEATURED WORK SHOWCASE */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C86A3D] font-bold">
              Portfolio
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#162E20] tracking-tight">
              Recent Transformations.
            </h2>
          </div>
          <Link
            to="/demo/landscaping/gallery"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#C86A3D] hover:text-[#162E20] font-bold transition-colors"
          >
            <span>View All Completed Projects</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProjects.map((project, idx) => (
            <div 
              key={idx}
              className="group bg-white rounded-xl border border-stone-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-800">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-md text-[10px] font-mono uppercase text-white tracking-wider">
                  {project.location}
                </div>
              </div>
              <div className="p-6 sm:p-7 flex-grow flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#C86A3D] font-bold block mb-1">
                    {project.category}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#162E20] group-hover:text-[#C86A3D] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mt-2.5">
                    {project.description}
                  </p>
                </div>
                <Link
                  to="/demo/landscaping/contact"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#162E20] group-hover:text-[#C86A3D] transition-colors pt-3 border-t border-stone-100"
                >
                  <span>Discuss Similar Project</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CORE CAPABILITIES GRID */}
      <section className="py-24 px-6 md:px-12 bg-[#F5F2EB] border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C86A3D] font-bold">
              Disciplines
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#162E20] tracking-tight">
              Master Landscaping Services.
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Every detail engineered from deep groundwork and proper drainage to precision cutting and finishing masonry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreServices.map((service, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                <div className="aspect-[16/10] bg-stone-800 overflow-hidden relative">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-[#162E20] text-white flex items-center justify-center font-mono text-xs font-bold shadow-md">
                    {service.number}
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#162E20]">
                      {service.title}
                    </h3>
                    <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mt-2">
                      {service.desc}
                    </p>
                  </div>
                  <Link
                    to="/demo/landscaping/services"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C86A3D] hover:text-[#162E20] transition-colors pt-2"
                  >
                    <span>View Specifications</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* WHY OAK & ASH (THE STANDARD OF EXCELLENCE) */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C86A3D] font-bold">
              The Oak &amp; Ash Standard
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#162E20] tracking-tight leading-tight">
              Why Discerning Homeowners Choose Our Tradesmen.
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              We treat outdoor construction with the exact same architectural rigor as an interior extension. From calculating fall gradients to diamond-blade mitering, our focus on precision is uncompromising.
            </p>
            <div className="pt-2">
              <Link
                to="/demo/landscaping/about"
                className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#162E20] hover:bg-[#C86A3D] text-white text-xs uppercase tracking-wider font-semibold rounded-lg transition-all shadow-md"
              >
                <span>Read Our Heritage &amp; Standards</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {trustPoints.map((point, idx) => {
              const Icon = point.icon;
              return (
                <div key={idx} className="p-6 sm:p-7 bg-white rounded-xl border border-stone-200/90 shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-[#162E20]/5 text-[#C86A3D] flex items-center justify-center">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-serif text-base font-bold text-[#162E20]">
                    {point.title}
                  </h3>
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                    {point.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* CLIENT TESTIMONIALS */}
      <section className="py-20 px-6 md:px-12 bg-[#162E20] text-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="w-12 h-12 bg-[#C86A3D] rounded-full mx-auto flex items-center justify-center text-white shadow-lg">
            <Quote size={22} />
          </div>
          
          <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl font-normal italic leading-relaxed text-stone-100">
            &ldquo;Oak &amp; Ash completely transformed our sloping Marlborough garden. The porcelain terrace, integrated steps, and sunken seating area have become our favourite part of the house. Clean, polite, and finished exactly on budget.&rdquo;
          </blockquote>

          <div className="space-y-1">
            <p className="font-serif text-lg font-bold text-[#E08A5B]">
              Robert &amp; Charlotte Hayes
            </p>
            <p className="text-xs font-mono uppercase tracking-widest text-stone-400">
              Private Residential Estate · Marlborough, Wiltshire
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-20 px-6 md:px-12 bg-[#FBF9F5] text-center border-t border-stone-200">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#162E20]">
            Ready to Plan Your Garden Transformation?
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Book a complimentary on-site survey. We inspect your grounds, discuss your requirements, and provide a fixed-price itemised quotation.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/demo/landscaping/contact"
              className="w-full sm:w-auto px-8 py-4 bg-[#C86A3D] hover:bg-[#b5582c] text-white font-semibold text-xs uppercase tracking-wider rounded-lg transition-all shadow-lg hover:scale-105 active:scale-95"
            >
              <span>Book Your Consultation</span>
            </Link>
            <a
              href="tel:01672552140"
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-stone-50 text-[#162E20] border border-stone-300 font-semibold text-xs uppercase tracking-wider rounded-lg transition-all shadow-sm flex items-center justify-center gap-2"
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

export default Home;