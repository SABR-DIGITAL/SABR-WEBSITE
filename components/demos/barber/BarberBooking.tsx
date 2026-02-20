
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Scissors, CheckCircle, ArrowRight, User, Clock, Calendar, Database, Zap, Cpu, Activity, CircleDashed } from 'lucide-react';
import ExitPreviewButton from '../../ExitPreviewButton';
import BarberNavbar from './BarberNavbar';

const BarberBooking: React.FC = () => {
  const [isSent, setIsSent] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    system: '',
    architect: '',
    epoch: '',
    time: '09:00'
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const systems = [
    { id: 'S1', name: "ARCHITECTURAL CUT", price: "£32", time: "45m" },
    { id: 'S2', name: "SCULPTED BEARD", price: "£20", time: "30m" },
    { id: 'S3', name: "STRUCTURAL FADE", price: "£38", time: "50m" },
    { id: 'S4', name: "NANO-ALIGNMENT", price: "£15", time: "15m" }
  ];

  const architects = ["Julian Vance", "Marcus Stone", "Sarah Thorne"];
  const times = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => setIsSent(true), 1500);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#E0E0E0] font-inter selection:bg-[#7F00FF] selection:text-white">
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-[100] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      <ExitPreviewButton />
      <BarberNavbar />

      <section className="pt-56 pb-48 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-24 items-start">
          
          {/* LEFT: SYNTHESIZER CONTROL PANEL */}
          <div className="lg:col-span-1 space-y-12">
            <div className="space-y-6">
              <span className="text-[#7F00FF] font-black text-[10px] uppercase tracking-[1em]">SYSTEM INITIALIZATION</span>
              <h1 className="font-syne text-6xl md:text-7xl font-black uppercase tracking-tighter leading-none">THE <br /> <span className="text-white/20 italic">DASHBOARD.</span></h1>
            </div>

            <div className="p-10 border border-white/5 bg-white/[0.02] backdrop-blur-3xl space-y-10 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#7F00FF] to-transparent opacity-30"></div>
               <div className="flex items-center justify-between opacity-40">
                  <span className="text-[9px] font-black uppercase tracking-widest">Active Link</span>
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-[#7F00FF] rounded-full"></div>
                    <div className="w-1 h-1 bg-[#7F00FF] rounded-full animate-pulse"></div>
                  </div>
               </div>

               <div className="space-y-8">
                  <div className="space-y-4">
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/30">System Load</p>
                    <div className="w-full h-1 bg-white/5 relative">
                       <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 0.72 }} className="absolute inset-0 bg-[#7F00FF] origin-left"></motion.div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/30">Kernel Status</p>
                    <p className="text-xs font-bold uppercase text-[#7F00FF]">Ready for Deployment</p>
                  </div>
               </div>

               <div className="pt-8 border-t border-white/5 grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <p className="text-[8px] font-black uppercase tracking-widest text-white/20">Latency</p>
                     <p className="text-sm font-mono">14ms</p>
                  </div>
                  <div className="space-y-2">
                     <p className="text-[8px] font-black uppercase tracking-widest text-white/20">Node</p>
                     <p className="text-sm font-mono">SN1_V04</p>
                  </div>
               </div>
            </div>
          </div>

          {/* MAIN MODULE */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {isSent ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/[0.02] border border-[#7F00FF]/40 p-12 md:p-24 text-center space-y-12 backdrop-blur-3xl relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(127,0,255,0.1),transparent)]"></div>
                  <div className="w-24 h-24 border-2 border-[#7F00FF] flex items-center justify-center mx-auto relative group">
                     <CheckCircle size={40} className="text-[#7F00FF] group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="space-y-6 relative z-10">
                    <h3 className="font-syne text-5xl font-black uppercase tracking-tighter leading-none">BUILD LOCKED.</h3>
                    <p className="text-xl text-white/40 italic font-medium max-w-md mx-auto leading-relaxed">
                      "Calibration confirmed. Your session has been written to the master ledger."
                    </p>
                  </div>
                  <Link to="/demo/barber" className="relative inline-block px-16 py-6 border border-[#7F00FF] text-[#F1E6FF] font-black text-[10px] uppercase tracking-[0.8em] hover:bg-[#7F00FF] hover:text-white transition-all z-10">Return to Hub</Link>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-12">
                  
                  {/* Step 1: System Selection */}
                  <div className="space-y-8">
                     <div className="flex items-center gap-6">
                        <div className="w-8 h-8 border border-[#7F00FF] flex items-center justify-center text-[10px] font-black">01</div>
                        <h4 className="font-syne text-3xl font-black uppercase tracking-tight">SERVICE LOADOUT.</h4>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {systems.map(s => (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => setFormData({...formData, system: s.name})}
                            className={`p-10 border transition-all duration-700 text-left relative overflow-hidden group ${formData.system === s.name ? 'bg-[#7F00FF] border-[#7F00FF] text-white shadow-[0_0_30px_rgba(127,0,255,0.3)]' : 'bg-white/5 border-white/5 hover:border-[#7F00FF]/50'}`}
                          >
                             <span className="absolute top-4 right-4 text-[10px] font-mono opacity-20">{s.id}</span>
                             <h5 className="font-syne text-xl font-black uppercase tracking-tight mb-2">{s.name}</h5>
                             <div className="flex justify-between items-center opacity-40 group-hover:opacity-100">
                                <p className="text-[10px] font-black uppercase tracking-widest">{s.time} Protocol</p>
                                <p className="text-sm font-bold">{s.price}</p>
                             </div>
                          </button>
                        ))}
                     </div>
                  </div>

                  {/* Step 2: Epoch & Node */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-24 pt-12 border-t border-white/5">
                    <div className="space-y-10">
                       <div className="flex items-center gap-6">
                          <div className="w-8 h-8 border border-[#7F00FF] flex items-center justify-center text-[10px] font-black">02</div>
                          <h4 className="font-syne text-2xl font-black uppercase tracking-tight">TEMPORAL WINDOW.</h4>
                       </div>
                       <div className="space-y-6">
                          <label className="text-[9px] font-black uppercase tracking-widest text-white/30 ml-2">Select Epoch</label>
                          <input type="date" required onChange={(e) => setFormData({...formData, epoch: e.target.value})} className="w-full bg-white/5 border border-white/10 p-6 text-[#E0E0E0] focus:outline-none focus:border-[#7F00FF] transition-all font-bold text-lg rounded-none uppercase" />
                       </div>
                    </div>

                    <div className="space-y-10">
                       <div className="flex items-center gap-6">
                          <div className="w-8 h-8 border border-[#7F00FF] flex items-center justify-center text-[10px] font-black">03</div>
                          <h4 className="font-syne text-2xl font-black uppercase tracking-tight">TIME SLICE.</h4>
                       </div>
                       <div className="grid grid-cols-3 gap-3">
                          {times.map(t => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => setFormData({...formData, time: t})}
                              className={`py-4 text-[10px] font-black uppercase tracking-widest transition-all border ${formData.time === t ? 'bg-[#7F00FF] border-[#7F00FF] text-white shadow-xl' : 'bg-transparent text-white/20 border-white/10 hover:border-white/30'}`}
                            >
                              {t}
                            </button>
                          ))}
                       </div>
                    </div>
                  </div>

                  {/* Step 3: Identity & Execution */}
                  <div className="pt-12 border-t border-white/5 space-y-12">
                     <div className="flex items-center gap-6">
                        <div className="w-8 h-8 border border-[#7F00FF] flex items-center justify-center text-[10px] font-black">04</div>
                        <h4 className="font-syne text-2xl font-black uppercase tracking-tight">IDENTITY VERIFICATION.</h4>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <input required type="text" placeholder="Unit Name" className="w-full bg-white/5 border-b border-white/10 p-6 text-[#E0E0E0] focus:outline-none focus:border-[#7F00FF] transition-all font-bold text-lg focus:bg-white/10" />
                        <input required type="email" placeholder="Communication Point" className="w-full bg-white/5 border-b border-white/10 p-6 text-[#E0E0E0] focus:outline-none focus:border-[#7F00FF] transition-all font-bold text-lg focus:bg-white/10" />
                     </div>
                     
                     <button type="submit" className="w-full py-12 bg-white/[0.02] border border-[#7F00FF] text-[#F1E6FF] font-black uppercase tracking-[1em] text-[15px] hover:bg-[#7F00FF] hover:text-[#050505] transition-all duration-700 shadow-[0_0_50px_rgba(127,0,255,0.2)] active:scale-[0.98]">
                        INITIALIZE SESSION
                     </button>
                  </div>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* METADATA STRIP */}
      <div className="max-w-7xl mx-auto px-6 py-12 border-t border-white/5 flex flex-wrap justify-between items-center gap-12 opacity-20">
         {['SECURE_ENCRYPTION_v2', 'NANO_PRECISION_UNIT', 'VERTEX_CLOUD_LINK', 'ZERO_TOLERANCE_POLICY'].map(tag => (
           <span key={tag} className="text-[8px] font-black uppercase tracking-[0.8em]">{tag}</span>
         ))}
      </div>
    </div>
  );
};

export default BarberBooking;
