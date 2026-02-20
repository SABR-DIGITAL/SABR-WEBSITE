
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Award, Linkedin, Leaf, MoveRight } from 'lucide-react';
import PhysioNavbar from './PhysioNavbar';
import PhysioFooter from './PhysioFooter';
import ExitPreviewButton from '../../ExitPreviewButton';

const team = [
  {
    name: "Jane Clarke",
    role: "Practice Principal",
    bio: "Lead Clinician with 20 years experience in elite sports rehabilitation. Specialist in spinal mechanics.",
    img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=600",
    tags: ["MCSP", "HCPC"]
  },
  {
    name: "Katie Mackford",
    role: "Specialist Physio",
    bio: "Expert in lower limb biomechanics and post-surgical recovery. Clinical perfectionist.",
    img: "https://images.unsplash.com/photo-1559839734-2b71f1536780?auto=format&fit=crop&q=80&w=600",
    tags: ["MCSP", "HCPC"]
  },
  {
    name: "Richie Mackford",
    role: "Specialist Physio",
    bio: "Specializing in shoulder pathologies and acupuncture for chronic pain management.",
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600",
    tags: ["MCSP", "HCPC"]
  },
  {
    name: "Laura Hughes",
    role: "Practice Director",
    bio: "Ensures the smooth digital and physical operation of our studio for a seamless journey.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
    tags: ["OPERATIONS"]
  }
];

const PhysioTeam: React.FC = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="min-h-screen bg-[#f8faf9] font-inter selection:bg-emerald-200">
      <ExitPreviewButton />
      <PhysioNavbar />

      <section className="pt-48 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-24">
            <div className="space-y-6">
              <span className="text-emerald-600 font-bold text-xs uppercase tracking-[0.4em]">The Faculty</span>
              <h1 className="font-serif text-5xl md:text-7xl text-emerald-950 font-bold tracking-tight leading-none">Clinical <span className="text-emerald-600 italic">Mastery.</span></h1>
            </div>
            <div className="max-w-md border-l-4 border-emerald-100 pl-8">
              <p className="text-emerald-800/60 text-xl font-medium italic leading-relaxed">
                "Our team is composed of board-certified clinicians dedicated to architectural human recovery."
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {team.map((member, i) => (
              <motion.div 
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group flex flex-col items-center text-center space-y-8"
              >
                <div className="relative w-full aspect-square rounded-[3rem] overflow-hidden shadow-xl border-4 border-white group-hover:border-emerald-400 transition-all duration-700">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-emerald-700 shadow-xl cursor-pointer hover:scale-110 transition-transform">
                      <Linkedin size={20} />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-center gap-2">
                     {member.tags.map(t => (
                       <span key={t} className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[9px] font-bold uppercase tracking-widest rounded-full">{t}</span>
                     ))}
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-emerald-950">{member.name}</h3>
                  <p className="text-emerald-600 font-bold text-[10px] uppercase tracking-widest">{member.role}</p>
                  <p className="text-emerald-800/60 text-sm font-medium italic leading-relaxed max-w-[240px]">"{member.bio}"</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-32 p-16 bg-emerald-50 rounded-[3rem] border border-emerald-100 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
             <div className="space-y-4 max-w-xl">
                <h4 className="font-serif text-3xl font-bold text-emerald-950">Join Our Movement Hub.</h4>
                <p className="text-emerald-800/60 text-lg italic">We are always scouting for high-level clinicians to join our Bath studio.</p>
             </div>
             <button className="px-12 py-6 bg-emerald-700 text-white rounded-2xl font-bold text-sm tracking-wide shadow-lg hover:bg-emerald-900 transition-all flex items-center gap-4 group">
               SUBMIT CV <MoveRight size={18} className="group-hover:translate-x-2 transition-transform" />
             </button>
          </div>
        </div>
      </section>

      <PhysioFooter />
    </div>
  );
};

export default PhysioTeam;
