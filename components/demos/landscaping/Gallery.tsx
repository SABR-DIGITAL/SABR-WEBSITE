import React, { useState, useEffect } from 'react';
import * as RouterDOM from 'react-router-dom';
import { 
  ArrowRight, 
  ZoomIn, 
  X, 
  MapPin, 
  CheckCircle2, 
  Layers 
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const Link = (RouterDOM as any).Link || (RouterDOM as any).default?.Link;

interface ProjectItem {
  id: number;
  title: string;
  category: 'patios' | 'transformations' | 'outdoor' | 'stonework';
  categoryLabel: string;
  location: string;
  img: string;
  materials: string;
  scope: string;
}

export const Gallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'patios' | 'transformations' | 'outdoor' | 'stonework'>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const projects: ProjectItem[] = [
    {
      id: 1,
      title: "Marlborough Country Estate Terrace",
      category: "patios",
      categoryLabel: "Porcelain & Steps",
      location: "Marlborough, Wiltshire",
      img: "https://images.unsplash.com/photo-1558904541-efa8c1965f1e?auto=format&fit=crop&q=80&w=1400",
      materials: "20mm Italian Anthracite Porcelain, Bullnose Step Copings, LED Riser Strip Lights",
      scope: "140m² elevated terrace with sunken level transitions, flush thresholds, and slot drainage."
    },
    {
      id: 2,
      title: "Cirencester Cotswold Sunken Lounge",
      category: "outdoor",
      categoryLabel: "Outdoor Living & Fire Pit",
      location: "Cirencester, Gloucestershire",
      img: "https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&q=80&w=1400",
      materials: "Hand-Dressed Cotswold Stone, Honed Sandstone Paving, Cedar Timber Louvers",
      scope: "Sunken fire lounge with built-in perimeter seating and cantilevered timber pergola."
    },
    {
      id: 3,
      title: "Salisbury Contemporary Garden Overhaul",
      category: "transformations",
      categoryLabel: "Full Garden Build",
      location: "Salisbury, Wiltshire",
      img: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=1400",
      materials: "Western Red Cedar Planters, Rolawn Medallion Turf, Architectural Boxwood Hedges",
      scope: "Sloping neglected site graded into three stepped functional tiers with multi-season planting."
    },
    {
      id: 4,
      title: "Bath Al Fresco Kitchen & Canopy",
      category: "outdoor",
      categoryLabel: "Outdoor Kitchen & Pergola",
      location: "Bath, Somerset",
      img: "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&q=80&w=1400",
      materials: "Polished Granite Worktops, Powder-Coated Aluminum Pergola, Grey Basalt Flagstones",
      scope: "Covered outdoor kitchen installation with integrated gas grill, drinks fridge, and dining patio."
    },
    {
      id: 5,
      title: "Devizes Dry-Stone Retaining Terraces",
      category: "stonework",
      categoryLabel: "Masonry & Retaining",
      location: "Devizes, Wiltshire",
      img: "https://images.unsplash.com/photo-1584479898061-15742e14f50d?auto=format&fit=crop&q=80&w=1400",
      materials: "Local Fieldstone, Lime Mortar Core, Granite Cobble Edging",
      scope: "50-meter structural dry-stone retaining wall supporting upper lawn and rose garden."
    },
    {
      id: 6,
      title: "Bradford-on-Avon Courtyard Sanctuary",
      category: "transformations",
      categoryLabel: "Urban Garden Sanctuary",
      location: "Bradford-on-Avon, Wiltshire",
      img: "https://images.unsplash.com/photo-1591115765373-520b7a2d7a59?auto=format&fit=crop&q=80&w=1400",
      materials: "Warm Limestone Flags, Slat Acoustic Screening, Pleached Hornbeam Screening",
      scope: "Enclosed town courtyard transformed into private haven with bespoke water rill feature."
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-stone-900 font-sans selection:bg-[#C86A3D] selection:text-white">
      <Navbar />

      {/* HEADER BANNER */}
      <section className="bg-[#162E20] text-white py-20 px-6 md:px-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#E08A5B] font-bold">
            <span>Portfolio of Work</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            Completed Garden Transformations.
          </h1>
          <p className="text-stone-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Explore recent residential garden builds across Wiltshire, Bath, and the Cotswolds. Every project designed and constructed entirely by Oak &amp; Ash.
          </p>
        </div>
      </section>

      {/* FILTER BUTTONS */}
      <section className="py-10 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 p-1.5 bg-white rounded-xl border border-stone-200/80 shadow-sm w-fit">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'patios', label: 'Patios & Terraces' },
            { id: 'transformations', label: 'Full Garden Builds' },
            { id: 'outdoor', label: 'Outdoor Living' },
            { id: 'stonework', label: 'Stone Masonry' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-[#162E20] text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-950 hover:bg-stone-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* GALLERY GRID */}
      <section className="pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group bg-white rounded-xl border border-stone-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-900">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-stone-900 text-xs font-semibold flex items-center gap-2 shadow-lg">
                    <ZoomIn size={14} className="text-[#C86A3D]" />
                    <span>View Specifications</span>
                  </div>
                </div>
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded text-[10px] font-mono uppercase text-white tracking-wider">
                  {project.categoryLabel}
                </div>
              </div>

              <div className="p-6 flex-grow flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-1.5 text-stone-500 text-xs mb-1">
                    <MapPin size={12} className="text-[#C86A3D]" />
                    <span>{project.location}</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#162E20] group-hover:text-[#C86A3D] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-stone-600 text-xs leading-relaxed mt-2 line-clamp-2">
                    {project.scope}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-[#162E20] group-hover:text-[#C86A3D]">
                  <span>Project Details</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative aspect-video bg-stone-900">
              <img
                src={selectedProject.img}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
                aria-label="Close project view"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#C86A3D] font-bold">
                  {selectedProject.categoryLabel} · {selectedProject.location}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#162E20] mt-1">
                  {selectedProject.title}
                </h2>
              </div>

              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3 text-sm">
                <div>
                  <span className="font-bold text-[#162E20] block text-xs uppercase tracking-wider font-mono">Materials Used:</span>
                  <p className="text-stone-700 mt-0.5">{selectedProject.materials}</p>
                </div>
                <div className="pt-2 border-t border-stone-200">
                  <span className="font-bold text-[#162E20] block text-xs uppercase tracking-wider font-mono">Scope of Works:</span>
                  <p className="text-stone-700 mt-0.5">{selectedProject.scope}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <Link
                  to="/demo/landscaping/contact"
                  onClick={() => setSelectedProject(null)}
                  className="w-full sm:w-auto px-6 py-3 bg-[#C86A3D] hover:bg-[#b5582c] text-white text-xs uppercase tracking-wider font-semibold rounded-lg transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>Request Quote For Similar Build</span>
                  <ArrowRight size={14} />
                </Link>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-full sm:w-auto px-5 py-3 text-stone-600 hover:text-stone-900 text-xs font-semibold uppercase tracking-wider"
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA BANNER */}
      <section className="bg-[#162E20] text-white py-20 px-6 md:px-12 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold">
            Discuss Your Garden Ambition With Us.
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Every garden transformation begins with a free property survey and design discussion.
          </p>
          <div className="pt-2">
            <Link
              to="/demo/landscaping/contact"
              className="px-8 py-4 bg-[#C86A3D] hover:bg-[#b5582c] text-white font-semibold text-xs uppercase tracking-wider rounded-lg transition-all shadow-lg inline-flex items-center gap-2"
            >
              <span>Book An On-Site Consultation</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;