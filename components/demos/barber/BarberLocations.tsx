
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Clock, Navigation, Calendar, ArrowRight, Share2, Scissors, Target, Radio, Database } from 'lucide-react';
import { Link } from 'react-router-dom';
import ExitPreviewButton from '../../ExitPreviewButton';
import BarberNavbar from './BarberNavbar';

const BarberLocations: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeNode, setActiveNode] = useState(0);

  const nodes = [
    { name: "APEX STUDIO 0x01", city: "London, UK", coords: "51.5074° N", site: "Milsom Street", status: "Nominal" },
    { name: "NEXUS POINT 0x02", city: "Swindon, UK", coords: "51.5609° N", site: "12 High Street", status: "Active" }
  ];

  return (
    <div className="h-screen bg-[#050505] text-[#E0E0E0] font-inter selection:bg-[#7F00FF] selection:text-white flex flex-col overflow-hidden relative">
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-[100] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      <ExitPreviewButton />
      <BarberNavbar />

      <div className="flex-1 flex flex-col lg:flex-row pt-24 lg:pt-0 relative z-10">
        
        {/* LEFT PANEL: DATA GRID */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "circOut" }}
          className="w-full lg:w-[500px] xl:w-[650px] bg-[#080808] p-12 md:p-24 flex flex-col justify-center border-r border-white/5 overflow-y-auto custom-scrollbar"
        >
          <div className="space-y-16">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#7F00FF]/10 rounded-full border border-[#7F00FF]/20">
                <Radio size={12} className="text-[#7F00FF] animate-pulse" />
                <span className="text-[#7F00FF] font-black text-[9px] uppercase tracking-[0.5em]">Network Scan Complete</span>
              </div>
              <h1 className="font-syne text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85]">GLOBAL <br /><span className="text-white/10 italic">NODES.</span></h1>
            </div>

            <div className="space-y-6">
              {nodes.map((node, i) => (
                <button
                  key={i}
                  onClick={() => setActiveNode(i)}
                  className={`w-full p-8 border text-left transition-all duration-700 group relative overflow-hidden ${activeNode === i ? 'bg-white/[0.02] border-[#7F00FF] shadow-[0_0_30px_rgba(127,0,255,0.1)]' : 'bg-transparent border-white/5 hover:border-white/20'}`}
                >
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                     <Target size={100} />
                  </div>
                  <div className="flex justify-between items-start mb-6">
                    <h3 className={`font-syne text-2xl font-black uppercase tracking-tight transition-colors ${activeNode === i ? 'text-[#7F00FF]' : 'text-white/40'}`}>{node.name}</h3>
                    <span className="text-[10px] font-mono text-white/20">{node.status}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-1">
                      <p className="text-[8px] font-black uppercase tracking-widest text-white/20">Coordinate</p>
                      <p className="text-xs font-bold">{node.coords}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[8px] font-black uppercase tracking-widest text-white/20">Sector</p>
                      <p className="text-xs font-bold uppercase">{node.city}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-10 flex flex-col gap-4">
               <button className="w-full py-8 bg-[#7F00FF] text-[#050505] font-black uppercase tracking-[1em] text-[11px] shadow-[0_0_40px_rgba(127,0,255,0.3)] hover:bg-white transition-all">
                  INITIALIZE NAVIGATION
               </button>
               <Link to="/demo/barber/book" className="w-full py-8 border border-white/5 text-white/40 font-black uppercase tracking-[1em] text-[11px] hover:text-white hover:border-white/20 transition-all text-center">
                  RESERVE UNIT_0{activeNode + 1}
               </Link>
            </div>
          </div>
        </motion.div>

        {/* RIGHT PANEL: IMMERSIVE STREET VIEW MAP */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="flex-1 relative bg-slate-900 overflow-hidden"
        >
          {/* DIGITAL OVERLAY UI */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            <div className="absolute top-10 right-10 p-8 bg-black/80 backdrop-blur-3xl border border-white/10 space-y-6 max-w-xs shadow-3xl pointer-events-auto">
               <div className="flex items-center gap-4 text-[#7F00FF]">
                  <Database size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Metadata_Feed</span>
               </div>
               <div className="space-y-4">
                  <p className="text-[11px] text-white/40 font-medium italic">"Node {nodes[activeNode].name} is currently processing at optimal precision levels. Zero-latency scheduling available."</p>
                  <div className="flex justify-between items-center text-[10px] font-mono text-[#7F00FF]">
                     <span>TEMP: 18°C</span>
                     <span>LOAD: 72%</span>
                  </div>
               </div>
            </div>
            
            {/* CROSSHAIRS */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-[#7F00FF]/20 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-64 bg-[#7F00FF]/10"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-[1px] bg-[#7F00FF]/10"></div>
          </div>

          <iframe
            key={activeNode}
            src={`https://www.google.com/maps?q=${nodes[activeNode].site}+${nodes[activeNode].city}&layer=c&cbll=51.5609,-1.7800&cbp=11,0,0,0,0&output=svembed`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            className="grayscale brightness-[0.7] contrast-[1.2] transition-all duration-[2s]"
          ></iframe>
          
          <div className="absolute bottom-10 left-10 z-30 flex items-center gap-6">
             <div className="w-12 h-12 border border-[#7F00FF] flex items-center justify-center text-[#7F00FF] bg-black/50 backdrop-blur-xl">
                <Navigation size={20} />
             </div>
             <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/40">Visual Tracking Active</p>
          </div>
        </motion.div>

      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #7F00FF; }
      `}</style>
    </div>
  );
};

export default BarberLocations;
