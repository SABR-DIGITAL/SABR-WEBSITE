import React, { useEffect, useState } from 'react';
import * as RouterDOM from 'react-router-dom';
import { ArrowRight, X, CheckCircle2 } from 'lucide-react';
import TraditionalNavbar from './TraditionalNavbar';
import TraditionalFooter from './TraditionalFooter';
import { GALLERY_PROJECTS } from '../landscaping/landscapingData';

const Link = (RouterDOM as any).Link || (RouterDOM as any).default?.Link;

export const TraditionalGallery: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [selectedGarden, setSelectedGarden] = useState<typeof GALLERY_PROJECTS[0] | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    <div className="min-h-screen bg-[#F5F9F6] text-[#112A1B] font-sans overflow-x-hidden">
      <TraditionalNavbar />

      {/* Header */}
      <section className="pt-28 sm:pt-36 pb-12 sm:pb-16 px-5 sm:px-6 md:px-10 bg-[#14532D] text-white">
        <div className="max-w-[1380px] mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-[#86EFAC] block mb-3">
            Selected Commissions · Portfolio
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4">
            Gardens Built to <span className="text-[#4ADE80]">Stand the Test of Time.</span>
          </h1>
          <p className="text-emerald-100/90 text-base sm:text-lg max-w-2xl leading-relaxed">
            Explore a curated selection of our residential gardens across Wiltshire, the Cotswolds, Surrey, and London, alongside our medal-winning RHS Show Gardens.
          </p>

          {/* Filter Tabs */}
          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((cat) => {
              const active = filter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                    active
                      ? 'bg-white text-[#14532D] shadow-sm'
                      : 'bg-emerald-900/50 text-emerald-100 hover:bg-emerald-800'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 sm:py-24 px-5 sm:px-6 md:px-10 max-w-[1380px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedGarden(project)}
              className="group bg-white rounded-xl overflow-hidden border border-emerald-900/15 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col"
            >
              <div className="aspect-[4/3] overflow-hidden bg-emerald-100">
                <img
                  src={project.img}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-[#15803D] mb-2">
                    <span>{project.index}. {project.location}</span>
                    <span>{project.award || project.category}</span>
                  </div>
                  <h2 className="text-xl font-bold text-[#112A1B] group-hover:text-[#15803D] transition-colors mb-2">
                    {project.title}
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {project.summary}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#14532D]">
                  <span>View Specification</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {selectedGarden && (
        <div
          className="fixed inset-0 z-[260] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 overflow-y-auto"
          onClick={() => setSelectedGarden(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-2xl my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="lg:col-span-6 aspect-[4/3] lg:aspect-auto bg-emerald-50 relative">
              <img
                src={selectedGarden.img}
                alt={selectedGarden.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4 pb-4 mb-4 border-b border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#15803D]">
                    {selectedGarden.category} · {selectedGarden.location}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedGarden(null)}
                    aria-label="Close"
                    className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#112A1B] mb-3">
                  {selectedGarden.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {selectedGarden.summary}
                </p>

                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Specification &amp; Craftsmanship
                </p>
                <div className="space-y-2.5 mb-8">
                  {selectedGarden.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-slate-800">
                      <CheckCircle2 size={16} className="text-[#16A34A] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to="/demo/landscaping-traditional/contact"
                onClick={() => setSelectedGarden(null)}
                className="inline-flex items-center justify-center gap-2.5 w-full py-3.5 px-6 rounded-lg bg-[#15803D] hover:bg-[#14532D] text-white text-sm font-bold transition-colors"
              >
                <span>Request a Similar Garden Quote</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      )}

      <TraditionalFooter />
    </div>
  );
};

export default TraditionalGallery;
