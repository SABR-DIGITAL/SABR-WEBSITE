import React, { useEffect } from 'react';
import * as RouterDOM from 'react-router-dom';
import { 
  ArrowRight, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  Compass, 
  Hammer, 
  Users 
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const Link = (RouterDOM as any).Link || (RouterDOM as any).default?.Link;

export const About: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const team = [
    {
      name: "David Henderson",
      role: "Founder & Master Stonemason",
      experience: "35+ Years on Site",
      bio: "Trained in traditional Cotswold dry-stone masonry and modern porcelain engineering. David personally oversees quality standards on every high-end build."
    },
    {
      name: "Claire Sutton (RHS)",
      role: "Lead Landscape Architect",
      experience: "15 Years Experience",
      bio: "RHS Silver-Gilt medalist. Specialises in architectural perennial planting palettes, 3D CAD masterplans, and seamless indoor-outdoor residential flow."
    },
    {
      name: "James Bailey",
      role: "Construction Director",
      experience: "18 Years Experience",
      bio: "Expert in deep sub-base structural stabilization, laser-graded drainage networks, and high-specification porcelain installation."
    }
  ];

  const standards = [
    {
      title: "British Standard Compliance",
      desc: "Every sub-base, mortar bed, and drainage run is installed strictly to BS 7533 standards for paved surfaces."
    },
    {
      title: "Zero Subcontracting Policy",
      desc: "Our permanent, uniformed team carries out the work. No third-party hand-offs or unaccountable contractors."
    },
    {
      title: "Direct Sourced Materials",
      desc: "We import our 20mm outdoor porcelain direct from certified Italian factories and hand-select British stone from local quarries."
    },
    {
      title: "Fixed-Price Binding Estimates",
      desc: "Your contract specifies exact materials, timelines, and payment milestones. Zero budget drift."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-stone-900 font-sans selection:bg-[#C86A3D] selection:text-white">
      <Navbar />

      {/* HEADER BANNER */}
      <section className="bg-[#162E20] text-white py-20 px-6 md:px-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#E08A5B] font-bold">
            <span>Our Heritage &amp; Ethos</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            Craftsmanship Rooted in Wiltshire.
          </h1>
          <p className="text-stone-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Founded in 1988, Oak &amp; Ash combines time-honoured masonry traditions with modern architectural garden engineering.
          </p>
        </div>
      </section>

      {/* STORY & MISSION */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C86A3D] font-bold">
              The Oak &amp; Ash Story
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#162E20] tracking-tight leading-tight">
              An Outdoor Space Should Be Built with the Precision of an Interior.
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              For more than three decades, our crews have worked across Wiltshire, Bath, Somerset, and the Cotswolds. What started as a dedicated stone walling practice has grown into one of the region’s premier architectural landscaping studios.
            </p>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              We reject short-cuts. While lesser contractors lay paving on sand or dot-and-dab mortar, our foundations are built to commercial civil engineering tolerances. That is why our terraces remain level, pristine, and structurally sound through decades of British frost and rain.
            </p>

            <div className="pt-2 flex items-center gap-6">
              <div className="p-4 bg-white rounded-xl border border-stone-200">
                <div className="font-serif text-3xl font-bold text-[#162E20]">35+</div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-stone-500 mt-1">Years in Practice</div>
              </div>
              <div className="p-4 bg-white rounded-xl border border-stone-200">
                <div className="font-serif text-3xl font-bold text-[#162E20]">850+</div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-stone-500 mt-1">Gardens Built</div>
              </div>
              <div className="p-4 bg-white rounded-xl border border-stone-200">
                <div className="font-serif text-3xl font-bold text-[#162E20]">100%</div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-stone-500 mt-1">In-House Staff</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-stone-200 bg-stone-900">
              <img
                src="https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&q=80&w=1200"
                alt="Crafting a stone patio terrace"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <div className="font-serif text-lg font-bold">Marlborough Workshop &amp; Yard</div>
                <div className="text-xs text-stone-300">Natural stone dressing &amp; sample library</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* STANDARDS & ACCREDITATIONS */}
      <section className="py-20 px-6 md:px-12 bg-[#F5F2EB] border-y border-stone-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C86A3D] font-bold">
              Uncompromising Quality
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#162E20]">
              The Core Principles of Every Build.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {standards.map((std, idx) => (
              <div key={idx} className="p-6 bg-white rounded-xl border border-stone-200 shadow-sm space-y-3">
                <div className="w-8 h-8 rounded-full bg-[#162E20] text-white flex items-center justify-center font-mono text-xs font-bold">
                  0{idx + 1}
                </div>
                <h3 className="font-serif text-lg font-bold text-[#162E20]">
                  {std.title}
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  {std.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP & KEY TRADESMEN */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C86A3D] font-bold">
            The Craft Team
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#162E20]">
            The Hands Behind the Work.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <div key={idx} className="bg-white p-7 rounded-xl border border-stone-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#162E20]/5 text-[#C86A3D] flex items-center justify-center font-serif text-xl font-bold">
                {member.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-[#162E20]">
                  {member.name}
                </h3>
                <p className="text-xs font-mono uppercase tracking-wider text-[#C86A3D] font-bold mt-0.5">
                  {member.role}
                </p>
                <div className="text-[11px] text-stone-500 mt-1">
                  {member.experience}
                </div>
              </div>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed pt-2 border-t border-stone-100">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 md:px-12 bg-[#162E20] text-white text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold">
            Work with Our Senior Stonemasons &amp; Designers.
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Every client works directly with our founding directors from initial concept to completion.
          </p>
          <div className="pt-2">
            <Link
              to="/demo/landscaping/contact"
              className="px-8 py-4 bg-[#C86A3D] hover:bg-[#b5582c] text-white font-semibold text-xs uppercase tracking-wider rounded-lg transition-all shadow-lg inline-flex items-center gap-2"
            >
              <span>Schedule Your Property Survey</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;