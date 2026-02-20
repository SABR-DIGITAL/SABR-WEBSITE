import React, { useState, useEffect } from 'react';
// Fix react-router-dom missing exports
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { 
  Leaf, Phone, Calendar, ArrowLeft, CheckCircle, ShieldCheck, 
  Clock, Star, ArrowRight, Hammer, Users, Camera, Sparkles, X 
} from 'lucide-react';

const team = [
  { name: "Mark S.", role: "Lead Landscaper", bio: "15 years experience. Specialist in natural stone patios and drainage.", img: "https://i.pravatar.cc/150?u=mark" },
  { name: "Sarah J.", role: "Garden Designer", bio: "RHS Silver winner. Expert in structural planting and multi-seasonal styles.", img: "https://i.pravatar.cc/150?u=sarah" },
  { name: "Tom B.", role: "Hardscaping", bio: "The brickwork master. Dedicated to precision walling and outdoor masonry.", img: "https://i.pravatar.cc/150?u=tom" }
];

const portfolio = [
  { id: 1, title: "Modern Estate", category: "Full Build", img: "https://images.unsplash.com/photo-1558904541-efa8c1965f1e?auto=format&fit=crop&q=80&w=800" },
  { id: 2, title: "Cotswold Patio", category: "Hardscaping", img: "https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&q=80&w=800" },
  { id: 3, title: "Secret Garden", category: "Softscaping", img: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=800" },
  { id: 4, title: "Modern Driveway", category: "Groundwork", img: "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&q=80&w=800" },
  { id: 5, title: "Alpine Feature", category: "Design", img: "https://images.unsplash.com/photo-1584479898061-15742e14f50d?auto=format&fit=crop&q=80&w=800" },
  { id: 6, title: "Eco Terrace", category: "Urban", img: "https://images.unsplash.com/photo-1591115765373-520b7a2d7a59?auto=format&fit=crop&q=80&w=800" }
];

const services = [
  { title: "Paving & Patios", desc: "Porcelain & Natural Stone experts.", icon: <Hammer />, features: ["Natural Stone", "Porcelain"] },
  { title: "Turfing", desc: "Grade A luxury turf installation.", icon: <Leaf />, features: ["Rolawn Turf", "Seeding"] },
  { title: "3D Design", desc: "CAD drawings for your space.", icon: <Camera />, features: ["3D Planning", "Surveys"] },
  { title: "Fencing", desc: "Durable carpentry for every boundary.", icon: <ShieldCheck />, features: ["Slatted", "Closeboard"] }
];

const LandscaperDemo: React.FC = () => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white text-[#1b4332] font-sans selection:bg-[#2d6a4f] selection:text-white">
      {selectedImg && (
        <div className="fixed inset-0 z-[200] bg-[#1b4332]/95 backdrop-blur-xl flex items-center justify-center p-6 cursor-zoom-out" onClick={() => setSelectedImg(null)}>
          <button className="absolute top-10 right-10 text-white"><X size={40} /></button>
          <img src={selectedImg} alt="Enlarged" className="max-w-full max-h-full rounded-3xl animate-scale-in" width="1200" height="800" />
        </div>
      )}

      <Link to="/projects" className="fixed bottom-8 right-8 z-[100] bg-white border border-slate-200 px-8 py-4 rounded-full shadow-2xl flex items-center gap-3 font-black text-xs text-[#1b4332] hover:bg-[#2d6a4f] hover:text-white transition-all transform hover:scale-110 active:scale-95 group">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Return To Studio
      </Link>

      <nav className="px-8 py-6 flex items-center justify-between border-b border-slate-100 max-w-7xl mx-auto sticky top-0 bg-white/95 backdrop-blur-xl z-[90]">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="w-12 h-12 bg-[#2d6a4f] rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:rotate-12 transition-transform">
            <Leaf size={28} />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xl uppercase tracking-tighter leading-none">Premier</span>
            <span className="font-bold text-xs uppercase tracking-[0.3em] text-[#2d6a4f]">Landscapes</span>
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-10 font-black text-[10px] uppercase tracking-widest text-slate-400">
          <a href="#services" className="hover:text-[#2d6a4f]">Services</a>
          <a href="#portfolio" className="hover:text-[#2d6a4f]">Work</a>
          <a href="#team" className="hover:text-[#2d6a4f]">Team</a>
        </div>
        <button className="px-8 py-4 bg-[#2d6a4f] text-white font-black rounded-xl text-[10px] uppercase tracking-widest hover:bg-[#1b4332] transition-all shadow-lg">
          <Phone size={16} /> 0800 123 456
        </button>
      </nav>

      <section className="pt-32 pb-24 px-8 max-w-7xl mx-auto text-left">
        <div className="inline-flex items-center gap-3 px-6 py-2 bg-green-50 rounded-full mb-10 border border-green-100">
          <CheckCircle size={14} className="text-[#2d6a4f]" />
          <span className="text-[#2d6a4f] font-black text-[10px] uppercase tracking-widest">Quality Architecture Guarantee</span>
        </div>
        <h1 className="text-6xl md:text-[9vw] font-black tracking-tight text-[#1b4332] mb-10 max-w-6xl leading-[0.82] uppercase">
          WE CREATE <br /><span className="text-[#2d6a4f] italic">GARDENS</span> YOU <br />ACTUALLY USE.
        </h1>
        <p className="text-2xl text-slate-500 max-w-2xl mb-14 leading-relaxed font-medium">Bespoke outdoor environments built to last. Wiltshire's premier tradesmen for high-end homeowners.</p>
        <button className="px-14 py-8 bg-[#2d6a4f] text-white font-black rounded-2xl shadow-xl flex items-center justify-center gap-6 text-sm uppercase tracking-widest hover:bg-[#1b4332] hover:scale-105 transition-all">GET A FREE QUOTE <ArrowRight size={20} /></button>
      </section>

      <section id="services" className="bg-slate-50 py-32 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((s, i) => (
            <div key={i} className="perspective-1000 group h-[400px]">
              <div className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="absolute inset-0 [backface-visibility:hidden] bg-white p-12 rounded-[3rem] border border-slate-100 flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-green-50 text-[#2d6a4f] rounded-3xl flex items-center justify-center mb-10">{s.icon}</div>
                  <h3 className="text-2xl font-black uppercase tracking-tight">{s.title}</h3>
                </div>
                <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#2d6a4f] p-12 rounded-[3rem] text-white flex flex-col justify-center">
                   <h3 className="text-xl font-black mb-6 uppercase tracking-tight text-[#b7e4c7]">Details</h3>
                   <p className="text-sm font-medium italic mb-8">"{s.desc}"</p>
                   <ul className="space-y-3">{s.features.map((f, j) => <li key={j} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest"><CheckCircle size={14} /> {f}</li>)}</ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="team" className="py-32 px-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-24 items-center">
           <div className="lg:w-1/2">
              <span className="text-[#2d6a4f] font-black text-[10px] uppercase tracking-[0.8em] mb-8 block">Meet The Experts</span>
              <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-12">THE <span className="text-[#2d6a4f] italic">HANDS</span> BEHIND THE BUILD.</h2>
              <div className="grid grid-cols-2 gap-10">
                 <div className="p-8 bg-slate-50 rounded-3xl text-center"><Award size={32} className="text-[#2d6a4f] mx-auto mb-4" /><h4 className="text-2xl font-black">Award Winning</h4></div>
                 <div className="p-8 bg-slate-50 rounded-3xl text-center"><Users size={32} className="text-[#2d6a4f] mx-auto mb-4" /><h4 className="text-2xl font-black">Family Run</h4></div>
              </div>
           </div>
           <div className="lg:w-1/2 grid grid-cols-1 gap-8">
              {team.map((m, i) => (
                <div key={i} className="flex items-center gap-10 p-10 bg-slate-50 rounded-[4rem] border border-transparent hover:border-green-100 transition-colors">
                   <img src={m.img} alt={m.name} className="w-28 h-28 rounded-full border-8 border-white shadow-xl" loading="lazy" />
                   <div><h4 className="text-2xl font-black uppercase tracking-tight">{m.name}</h4><p className="text-[#2d6a4f] font-black text-[10px] uppercase mb-3 tracking-widest">{m.role}</p><p className="text-sm text-slate-500 font-medium">{m.bio}</p></div>
                </div>
              ))}
           </div>
        </div>
      </section>

      <section id="portfolio" className="py-32 px-8 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-12">
             <div className="max-w-2xl"><h2 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-[0.85]">GALLERY OF <br /><span className="text-[#2d6a4f]">EXCELLENCE.</span></h2></div>
             <button className="px-12 py-6 border border-white/20 rounded-2xl font-black text-[10px] uppercase hover:bg-white hover:text-slate-950 transition-all">View All Work <Sparkles size={16} /></button>
          </div>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
             {portfolio.map((item) => <div key={item.id} className="relative break-inside-avoid rounded-[2.5rem] overflow-hidden group cursor-zoom-in" onClick={() => setSelectedImg(item.img)}><img src={item.img} alt={item.title} className="w-full transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0" loading="lazy" width="600" height="800" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-10 flex flex-col justify-end"><h4 className="text-3xl font-black uppercase">{item.title}</h4></div></div>)}
          </div>
        </div>
      </section>

      <footer className="py-24 px-8 text-center"><div className="flex items-center justify-center gap-3 mb-4"><Leaf className="text-[#2d6a4f]" /><span className="font-black uppercase tracking-widest text-xl">Premier Landscapes</span></div><p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">© 2025 ALL RIGHTS RESERVED | WILTSHIRE TRADES HUB</p></footer>
      <style>{`.perspective-1000 { perspective: 1000px; } @keyframes scale-in { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } } .animate-scale-in { animation: scale-in 0.4s ease-out; }`}</style>
    </div>
  );
};

const Award = ({ size, className, ...props }: any) => <Star size={size} className={className} {...props} />;

export default LandscaperDemo;