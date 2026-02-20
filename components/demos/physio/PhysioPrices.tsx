
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle2, MoveRight, Leaf, ShieldPlus, Activity, Target, Zap, Clock, Heart, Star } from 'lucide-react';
import PhysioNavbar from './PhysioNavbar';
import PhysioFooter from './PhysioFooter';
import ExitPreviewButton from '../../ExitPreviewButton';

const sessions = [
  {
    name: "Diagnostic Consultation",
    price: "£75",
    duration: "60 MINUTES",
    desc: "A deep dive into your physical history, diagnostic mapping, and your first precision treatment.",
    features: ["Biomechanical Screening", "Initial Realignment", "Recovery Roadmap", "Digital Guide"],
    icon: <Target size={24} className="text-emerald-600" />
  },
  {
    name: "Recovery Calibration",
    price: "£65",
    duration: "45 MINUTES",
    desc: "Targeted follow-up session focused on intensive manual therapy and progress review.",
    features: ["Manual Therapy", "Exercise Refinement", "Goal Recalibration", "Soft Tissue Work"],
    icon: <Activity size={24} className="text-emerald-600" />
  },
  {
    name: "Sports Performance Screen",
    price: "£90",
    duration: "75 MINUTES",
    desc: "Elite-level movement analysis for athletes looking to find marginal gains and prevent injury.",
    features: ["Gait Analysis", "Strength Deficit Test", "Power Calibration", "Sport-Specific Plan"],
    icon: <Zap size={24} className="text-emerald-600" />
  },
  {
    name: "Acupuncture Integration",
    price: "£55",
    duration: "30 MINUTES",
    desc: "Targeted dry-needling to release deep muscle tension and reset neural pathways.",
    features: ["Neural Calibration", "Myofascial Release", "Chronic Pain Focus", "Tension Reboot"],
    icon: <Leaf size={24} className="text-emerald-600" />
  },
  {
    name: "Post-Op Recovery Plan",
    price: "£70",
    duration: "50 MINUTES",
    desc: "Specialist post-surgical rehabilitation to ensure optimal healing and range of motion.",
    features: ["Scar Management", "Joint Mobilization", "Staged Loading", "Surgeon Comms"],
    icon: <ShieldPlus size={24} className="text-emerald-600" />
  },
  {
    name: "Spinal Health Audit",
    price: "£80",
    duration: "60 MINUTES",
    desc: "Deep structural analysis of the back and neck to correct long-term postural issues.",
    features: ["Postural Mapping", "Spinal Tuning", "Workplace Ergonomics", "Core Foundations"],
    icon: <Star size={24} className="text-emerald-600" />
  }
];

const PhysioPrices: React.FC = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="min-h-screen bg-[#f8faf9] font-inter selection:bg-emerald-200">
      <ExitPreviewButton />
      <PhysioNavbar />

      <section className="pt-48 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 space-y-6">
            <span className="text-emerald-600 font-bold text-xs uppercase tracking-[0.4em]">Investment In Self</span>
            <h1 className="font-serif text-5xl md:text-7xl text-emerald-950 font-bold tracking-tight leading-none">Session <span className="text-emerald-600 italic">Structure.</span></h1>
            <p className="text-emerald-800/60 text-lg md:text-xl font-medium max-w-xl mx-auto italic">"Transparent pricing for world-class clinical care."</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sessions.map((tier, i) => (
              <motion.div 
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-emerald-100 flex flex-col justify-between hover:border-emerald-300 hover:shadow-2xl transition-all duration-500 group"
              >
                <div className="space-y-8">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      {tier.icon}
                    </div>
                    <p className="font-serif text-4xl font-bold text-emerald-900">{tier.price}</p>
                  </div>
                  
                  <div className="space-y-2">
                     <h3 className="font-serif text-2xl font-bold text-emerald-950 leading-tight">{tier.name}</h3>
                     <p className="text-emerald-600 font-bold text-[10px] uppercase tracking-widest">{tier.duration}</p>
                  </div>
                  
                  <p className="text-base text-emerald-800/60 font-medium italic leading-relaxed">"{tier.desc}"</p>
                  
                  <div className="space-y-4 pt-6 border-t border-emerald-50">
                    {tier.features.map((f, j) => (
                      <div key={j} className="flex items-center gap-4">
                        <CheckCircle2 size={16} className="text-emerald-500" />
                        <span className="text-[12px] font-semibold text-emerald-900/80">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-10">
                   <Link to="/demo/physio/contact" className="w-full py-5 bg-emerald-700 text-white rounded-2xl font-bold text-sm tracking-wide shadow-lg hover:bg-emerald-900 transition-all flex items-center justify-center gap-3 group">
                     SYNC SESSION <MoveRight size={18} className="group-hover:translate-x-2 transition-transform" />
                   </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Insurance Banner */}
          <div className="mt-32 p-12 md:p-16 bg-emerald-900 rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-10 opacity-5"><ShieldPlus size={300} /></div>
             <div className="relative z-10 max-w-xl text-center md:text-left space-y-4">
                <h3 className="font-serif text-3xl font-bold">Insurance Compatible.</h3>
                <p className="text-emerald-100/60 text-lg italic">We are registered providers for BUPA, AXA, and Vitality. Simply provide your auth code during checkout.</p>
             </div>
             <div className="flex flex-wrap justify-center gap-6 relative z-10">
                {['BUPA', 'AXA', 'VITALITY'].map(item => (
                  <span key={item} className="px-8 py-3 bg-white/10 rounded-full border border-white/20 text-xs font-bold tracking-widest">{item}</span>
                ))}
             </div>
          </div>
        </div>
      </section>

      <PhysioFooter />
    </div>
  );
};

export default PhysioPrices;
