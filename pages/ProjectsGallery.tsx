import React, { useEffect, useRef } from 'react';
import { Sprout, Coffee, Droplet, Flower2, MoveRight, Activity } from 'lucide-react';
// Fix react-router-dom missing exports
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 'landscaping',
    title: 'Helping Gardeners Grow',
    industry: 'Landscaping',
    tagline: 'Terrain Architecture',
    bio: "A beautiful, easy-to-use site designed for landscaping experts to showcase their outdoor craft and capture local phone calls effortlessly.",
    icon: <Sprout className="text-white" size={100} strokeWidth={1} />,
    glowColor: 'rgba(34, 197, 94, 0.4)', // Emerald
    path: '/demo/landscaping',
    description: "We understand that your business happens on-site. We built this to help you capture leads while you're busy creating beautiful spaces."
  },
  {
    id: 'cafe',
    title: 'Brewing Local Connection',
    industry: 'Cafe & Bistro',
    tagline: 'Sensory Engineering',
    bio: "A welcoming digital storefront for cafes that makes it simple for customers to find your location, browse your menu, and visit your shop.",
    icon: <Coffee className="text-white" size={100} strokeWidth={1} />,
    glowColor: 'rgba(245, 158, 11, 0.4)', // Amber
    path: '/demo/cafe',
    description: "Your cafe is the heart of the community. This site brings that same warm, welcoming feeling to the digital world."
  },
  {
    id: 'physio',
    title: 'Active Recovery',
    industry: 'Physiotherapy',
    tagline: 'Recovery Protocol',
    bio: "A clinical yet luxury digital experience for family-run physiotherapy studios. Built to establish deep clinical trust and drive instant bookings.",
    icon: <Activity className="text-white" size={100} strokeWidth={1} />,
    glowColor: 'rgba(37, 99, 235, 0.4)', // Bright Blue
    path: '/demo/physio',
    description: "In the world of health, trust is everything. We engineered a platform that mirrors the precision of expert medical care with a high-end feel."
  },
  {
    id: 'plumber',
    title: 'Reliable Trade Engines',
    industry: 'Plumbing',
    tagline: 'Flow Dynamics',
    bio: "A fast, reliable emergency site for trade professionals that works perfectly on mobile for customers who need your help right now.",
    icon: <Droplet className="text-white" size={100} strokeWidth={1} />,
    glowColor: 'rgba(6, 182, 212, 0.4)', // Cyan
    path: '/demo/plumber',
    description: "When emergencies happen, speed is everything. We engineered this for instant response and client trust."
  },
  {
    id: 'florist',
    title: 'The Artisanal Bloom',
    industry: 'Bespoke Florist',
    tagline: 'Aesthetic Assembly',
    bio: "A cinematic floral experience for boutique florists that showcases high-end arrangements and captures seasonal bouquet orders with ease.",
    icon: <Flower2 className="text-white" size={100} strokeWidth={1} />,
    glowColor: 'rgba(164, 120, 100, 0.4)', // Mocha
    path: '/demo/florist',
    description: "Every bloom has a story. We created a cinematic experience that makes potential customers fall in love at first click."
  }
];

const FloatingPair: React.FC<{ project: any }> = ({ project }) => {
  const isPhysio = project.id === 'physio';
  const isLandscaping = project.id === 'landscaping';

  return (
    <div className="relative flex items-center gap-5 md:gap-8 group/visual animate-float-slow transform-gpu">
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 rounded-full blur-[40px] md:blur-[80px] opacity-40 mix-blend-screen animate-pulse-glow"
        style={{ backgroundColor: project.glowColor }}
      ></div>

      <div className="relative z-10 p-5 md:p-8 rounded-full bg-slate-950/40 backdrop-blur-md border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] transition-transform duration-700 group-hover/visual:scale-110">
        <div 
          className="filter scale-50 md:scale-100 flex items-center justify-center"
          style={{ filter: `drop-shadow(0 0 15px ${project.glowColor})` }}
        >
          {project.icon}
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-start gap-0.5 md:gap-1">
        <div className="w-6 h-[1px] bg-white/20 mb-1.5 md:mb-2"></div>
        <span className="font-syne text-[8px] md:text-xs font-black text-slate-900 uppercase tracking-[0.3em] md:tracking-[0.8em] leading-[1.1] md:leading-none opacity-40">
          {isPhysio ? (
            <>
              <span className="md:hidden">PHYSIO<br />-THERAPY</span>
              <span className="hidden md:inline">Physiotherapy</span>
            </>
          ) : isLandscaping ? (
            <>
              <span className="md:hidden">LAND<br />-SCAPING</span>
              <span className="hidden md:inline">Landscaping</span>
            </>
          ) : (
            project.industry
          )}
        </span>
        <span className="font-syne text-xl md:text-3xl font-black text-slate-950 uppercase tracking-tighter leading-none group-hover/visual:text-blue-600 transition-colors">
          DEMO
        </span>
      </div>

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(1deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.2); }
        }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

const ProjectRow: React.FC<{ project: any, index: number }> = ({ project, index }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  useEffect(() => {
    const el = rowRef.current;
    const visual = visualRef.current;
    const text = textRef.current;
    if (!el || !visual || !text) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 70%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(visual, 
      { opacity: 0, x: isEven ? 50 : -50 },
      { opacity: 1, x: 0, duration: 1.5, ease: "expo.out" }
    );

    tl.fromTo(text.querySelectorAll('.reveal-item'), 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power4.out" },
      "-=1.0"
    );
  }, [isEven]);

  return (
    <div 
      ref={rowRef}
      className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 md:gap-20 lg:gap-32 mb-48 md:mb-72 last:mb-0 relative transform-gpu will-change-transform`}
    >
      <div 
        ref={visualRef}
        className="w-full lg:w-1/2 relative py-10 md:py-20 flex justify-center"
      >
        <FloatingPair project={project} />
      </div>

      <div 
        ref={textRef}
        className="w-full lg:w-1/2 flex flex-col items-start lg:pr-12"
      >
        <div className="reveal-item flex items-center gap-4 mb-6 md:mb-10">
          <div className="w-12 h-[2px] bg-blue-600"></div>
          <span className="text-blue-600 font-black text-[10px] md:text-[11px] uppercase tracking-[0.4em] md:tracking-[0.6em]">{project.tagline}</span>
        </div>

        {/* Rescaled mobile font size from text-4xl to text-3xl (-15% approx) to prevent word clipping */}
        <h3 className="reveal-item font-syne text-3xl md:text-4xl lg:text-5xl font-black text-slate-950 uppercase tracking-tighter leading-tight mb-6 md:mb-8">
          {project.title.split(' ')[0]} <br />
          <span className="text-shimmer-blue italic">{project.title.split(' ').slice(1).join(' ')}</span>
        </h3>

        <div className="reveal-item mb-8 md:mb-10 p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-white border border-slate-100 shadow-sm relative overflow-hidden">
          <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed italic relative z-10">
            "{project.bio}"
          </p>
        </div>

        <p className="reveal-item text-slate-400 font-medium leading-relaxed mb-10 md:mb-14 max-w-xl text-base md:text-lg">
          {project.description}
        </p>

        <Link 
          to={project.path}
          className="reveal-item group/btn relative w-full sm:w-auto px-10 md:px-14 py-6 md:py-8 bg-slate-950 text-white font-black text-[10px] md:text-[12px] uppercase tracking-[0.4em] md:tracking-[0.5em] rounded-2xl md:rounded-2.5xl overflow-hidden flex items-center justify-center gap-6 md:gap-8 transition-all hover:bg-blue-600 hover:scale-105 active:scale-95 shadow-2xl"
        >
          <span className="relative z-10">Preview Demo Site</span>
          <MoveRight className="relative z-10 group-hover/btn:translate-x-3 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
        </Link>
      </div>
    </div>
  );
};

const ProjectsGallery: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#fdfbf7] min-h-screen pt-12 md:pt-24 pb-64 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-40 md:mb-64">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-[2px] w-12 md:w-20 bg-blue-600"></div>
            <span className="text-blue-600 font-black text-[11px] md:text-[13px] uppercase tracking-[0.6em] md:tracking-[1em]">OUR COLLECTION</span>
          </div>
          <h2 className="font-syne text-4xl md:text-5xl lg:text-7xl font-black text-slate-950 tracking-tighter uppercase leading-tight mb-12">
            SITES THAT <br />
            <span className="text-shimmer-blue italic">GET RESULTS.</span>
          </h2>
          <div className="max-w-4xl border-l-[6px] md:border-l-[8px] border-blue-100 pl-8 md:pl-16">
            <p className="text-lg md:text-xl lg:text-3xl text-slate-400 font-medium italic leading-relaxed">
              We build professional websites for local businesses that need to stand out. Simple, effective, and optimized for your growth.
            </p>
          </div>
        </div>
        <div className="space-y-40 md:space-y-64">
          {projects.map((project, idx) => (
            <ProjectRow key={project.id} project={project} index={idx} />
          ))}
        </div>
        <div className="mt-64 md:mt-80 text-center relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-blue-500/5 blur-[100px] md:blur-[150px] rounded-full pointer-events-none"></div>
          <div className="w-px h-32 md:h-48 bg-gradient-to-b from-blue-600 to-transparent mx-auto mb-16 md:mb-20"></div>
          <h4 className="relative z-10 text-slate-950 font-syne text-4xl md:text-8xl font-black uppercase tracking-tighter mb-12 md:mb-16 leading-none">
            READY TO <br /><span className="text-blue-600 italic">DOMINATE?</span>
          </h4>
          <Link 
            to="/#contact"
            className="relative z-10 inline-flex items-center gap-6 md:gap-8 px-12 md:px-20 py-8 md:py-12 bg-blue-600 text-white font-black text-[12px] md:text-[16px] uppercase tracking-[0.5em] md:tracking-[0.8em] rounded-full hover:scale-110 hover:bg-slate-950 transition-all shadow-[0_40px_80px_-15px_rgba(37,99,235,0.4)] active:scale-95 group"
          >
            Start Your Build
            <MoveRight className="group-hover:translate-x-4 transition-transform" size={28} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectsGallery;