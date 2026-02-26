import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layout, Calendar, Droplet, Flower2, ArrowUpRight, ChevronRight, Activity, Scissors } from 'lucide-react';
// Fix react-router-dom missing exports
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;

const projects = [
  {
    id: 'barber',
    title: 'Vertex Architectural',
    industry: 'Barber Shop',
    icon: <Scissors className="text-white" size={40} />,
    color: 'bg-[#7F00FF]',
    problem: 'Generic booking lost premium clients.',
    solution: 'High-end silhouettes & calculated cuts.',
    path: '/demo/barber'
  },
  {
    id: 'landscaping',
    title: 'The Booking System',
    industry: 'Landscaping',
    icon: <Layout className="text-white" size={40} />,
    color: 'bg-green-600',
    problem: 'Lost 5 hours weekly on calls.',
    solution: 'Built automated booking & SMS grid.',
    path: '/demo/landscaping'
  },
  {
    id: 'cafe',
    title: 'The Digital Menu',
    industry: 'Cafe & Bistro',
    icon: <Calendar className="text-white" size={40} />,
    color: 'bg-amber-700',
    problem: 'Missing takeaway revenue online.',
    solution: 'High-speed, 1-tap menu grid.',
    path: '/demo/cafe'
  },
  {
    id: 'physio',
    title: 'The Clinic Board',
    industry: 'Physiotherapy',
    icon: <Activity className="text-white" size={40} />,
    color: 'bg-blue-600',
    problem: 'Clinical trust wasn’t digital.',
    solution: 'Luxury patient portal & trust grid.',
    path: '/demo/physio'
  },
  {
    id: 'plumber',
    title: 'The Emergency Grid',
    industry: 'Plumbing',
    icon: <Droplet className="text-white" size={40} />,
    color: 'bg-blue-600',
    problem: 'Slow site lost emergency leads.',
    solution: '99+ speed "Instant Call" board.',
    path: '/demo/plumber'
  },
  {
    id: 'florist',
    title: 'The Artisanal Bloom',
    industry: 'Bespoke Florist',
    icon: <Flower2 className="text-white" size={40} />,
    color: 'bg-[#A47864]',
    problem: 'Luxury flowers looked generic.',
    solution: 'Cinematic viewing & high-end UI.',
    path: '/demo/florist'
  }
];

const ProjectShowcase: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.showcase-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        x: 100,
        opacity: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: 'back.out(1.4)'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#fdfbf7] py-24 px-6 overflow-hidden max-h-[90vh] md:max-h-[80vh] flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full mb-12">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-[2px] w-8 bg-blue-600"></div>
              <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.6em]">Build Ecosystem</span>
            </div>
            <h2 className="font-syne text-4xl md:text-6xl font-black text-slate-950 tracking-tighter uppercase">
              LIVE <span className="text-shimmer-blue italic">DEMOS.</span>
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-4 text-slate-400 text-[10px] font-black uppercase tracking-widest">
            Swipe to explore <ChevronRight size={16} />
          </div>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-12 px-[10vw] md:px-[calc(50vw-640px)] w-full"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {projects.map((project, idx) => (
          <div 
            key={project.id} 
            className="showcase-card snap-center shrink-0 w-[85vw] md:w-[450px] aspect-[4/5] md:aspect-[3/4] rounded-[2.5rem] overflow-hidden flex flex-col bg-white border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] group transform-gpu"
          >
            <div className={`relative h-[60%] w-full ${project.color} flex items-center justify-center overflow-hidden`}>
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
              <div className="relative z-10 transition-transform duration-700 group-hover:scale-110">
                {project.icon}
              </div>
              <div className="absolute bottom-6 left-8">
                <p className="text-white/40 uppercase font-black text-[9px] tracking-[0.8em] mb-1">Sector</p>
                <h3 className="text-white font-syne text-xl font-black uppercase tracking-tighter leading-none">{project.industry}</h3>
              </div>
            </div>

            <div className="h-[40%] w-full p-8 md:p-10 flex flex-col justify-between bg-white/40 backdrop-blur-xl border-t border-slate-100">
              <div>
                <h4 className="font-syne text-xl font-black text-slate-950 uppercase tracking-tight mb-4 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h4>
                <p className="text-slate-500 text-sm font-medium leading-relaxed line-clamp-2 italic">
                  "{project.solution}"
                </p>
              </div>

              <div className="mt-4">
                <Link 
                  to={project.path}
                  className="inline-flex items-center gap-4 px-6 py-4 bg-slate-950 text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-blue-600 hover:scale-105 transition-all shadow-lg active:scale-95"
                >
                  Inspect Build <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default ProjectShowcase;