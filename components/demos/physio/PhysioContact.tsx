
import React, { useState, useEffect } from 'react';
import { motion as framerMotion, AnimatePresence } from 'framer-motion';
import { CheckCircle, MoveRight, Mail, Phone, MapPin, Send, Leaf, Clock, Heart, ShieldCheck, User, Calendar, Info, Search } from 'lucide-react';
import ExitPreviewButton from '../../ExitPreviewButton';
import PhysioNavbar from './PhysioNavbar';
import PhysioFooter from './PhysioFooter';
// Fix react-router-dom missing exports
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;

// Fix motion types by casting to any
const motion = framerMotion as any;

const PhysioContact: React.FC = () => {
  const [isSent, setIsSent] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    contactPref: 'Email',
    focus: '',
    date: '',
    timeSlot: 'Morning',
    urgency: 'Standard',
    referral: ''
  });

  useEffect(() => window.scrollTo(0, 0), []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => setIsSent(true), 1500);
  };

  const triageOptions = [
    { id: 'spinal', label: 'SPINAL & BACK', desc: 'Lumbar, thoracic or cervical care' },
    { id: 'sports', label: 'SPORTS MEDICINE', desc: 'Acute injury or performance gains' },
    { id: 'postop', label: 'POST-SURGICAL', desc: 'Rehab following clinical operation' },
    { id: 'chronic', label: 'CHRONIC PAIN', desc: 'Long-term discomfort management' },
    { id: 'gait', label: 'GAIT & RUNNING', desc: 'Biomechanical analysis and form' },
    { id: 'women', label: "WOMEN'S HEALTH", desc: 'Specialist pelvic and pre/post-natal' },
    { id: 'neuro', label: 'NEUROLOGICAL', desc: 'Nerve path and mobility calibration' },
    { id: 'wellness', label: 'WELLNESS & RESET', desc: 'Maintenance and postural audit' }
  ];

  const timeSlots = [
    { label: 'Early Morning', range: '08:00 - 10:00' },
    { label: 'Midday', range: '11:00 - 14:00' },
    { label: 'Late Afternoon', range: '15:00 - 17:00' },
    { label: 'Evening', range: '18:00 - 20:00' }
  ];

  return (
    <div className="min-h-screen bg-[#f8faf9] font-inter selection:bg-emerald-200">
      <ExitPreviewButton />
      <PhysioNavbar />

      <section className="pt-48 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
            
            {/* INTAKE INTEL */}
            <div className="lg:col-span-4 space-y-16 lg:sticky lg:top-48">
              <div className="space-y-8">
                <span className="text-emerald-600 font-bold text-xs uppercase tracking-[0.4em]">Clinical Intake</span>
                <h1 className="font-serif text-5xl md:text-7xl text-emerald-950 font-bold tracking-tight leading-[0.9]">
                  Sync <br /><span className="text-emerald-600 italic">Protocols.</span>
                </h1>
                <p className="text-xl text-emerald-800/60 font-medium italic border-l-4 border-emerald-100 pl-8 leading-relaxed">
                  "Our advanced intake module ensures we match your unit with the optimal clinician before you even step into the hub."
                </p>
              </div>

              <div className="space-y-6">
                 <div className="flex gap-6 items-center p-6 bg-white rounded-3xl shadow-sm border border-emerald-50">
                    <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
                       <ShieldCheck size={20} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-900/60">Data Encrypted & Secure</span>
                 </div>
                 <div className="flex gap-6 items-center p-6 bg-white rounded-3xl shadow-sm border border-emerald-50">
                    <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
                       <Clock size={20} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-900/60">Response: &lt; 01 Business Hour</span>
                 </div>
              </div>
            </div>

            {/* INTAKE MODULE */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                {isSent ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    className="bg-white p-16 md:p-24 rounded-[4rem] shadow-2xl border border-emerald-100 text-center space-y-12"
                  >
                    <div className="w-24 h-24 bg-emerald-600 text-white flex items-center justify-center rounded-3xl mx-auto shadow-xl group">
                       <CheckCircle size={48} className="group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="space-y-6">
                      <h3 className="font-serif text-5xl font-bold text-emerald-950 tracking-tight">Sync Established.</h3>
                      <p className="text-2xl text-emerald-800/60 italic font-medium leading-tight max-w-md mx-auto">"Clinical data has been written to the ledger. Our team will contact you via {formData.contactPref} shortly."</p>
                    </div>
                    <Link to="/demo/physio" className="inline-block px-14 py-6 bg-emerald-950 text-white rounded-2xl font-bold text-sm hover:bg-emerald-700 transition-all">RETURN TO HUB</Link>
                  </motion.div>
                ) : (
                  <div className="bg-white rounded-[4rem] border border-emerald-100 shadow-2xl overflow-hidden">
                    
                    {/* Module Progress Bar */}
                    <div className="bg-emerald-50/50 px-12 py-8 flex items-center justify-between border-b border-emerald-100">
                       <div className="flex items-center gap-6">
                          {[1, 2, 3].map((s) => (
                            <div key={s} className="flex items-center gap-3">
                              <div className={`w-3 h-3 rounded-full transition-all duration-500 ${activeStep >= s ? 'bg-emerald-600 scale-125' : 'bg-emerald-200'}`}></div>
                              {activeStep === s && <span className="text-[9px] font-black text-emerald-800 uppercase tracking-widest hidden sm:inline">Active</span>}
                            </div>
                          ))}
                       </div>
                       <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-800/40 italic">Unit Calibration: Stage 0{activeStep}</span>
                    </div>

                    <form onSubmit={handleSubmit} className="p-10 md:p-16 lg:p-20 space-y-16">
                       
                       {activeStep === 1 && (
                         <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-12">
                            <div className="space-y-4">
                               <h3 className="font-serif text-4xl font-bold text-emerald-950 tracking-tight">Identity & Contact.</h3>
                               <p className="text-emerald-800/60 font-medium italic">"Establish your communication bridge and verify identity details."</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                               <div className="space-y-3">
                                  <label className="text-[10px] font-bold uppercase tracking-widest text-emerald-900/40 ml-4">Full Name</label>
                                  <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Patient legal name" className="w-full bg-emerald-50/30 border border-emerald-100 rounded-2xl p-6 text-emerald-950 font-bold focus:outline-none focus:border-emerald-600 shadow-sm" />
                               </div>
                               <div className="space-y-3">
                                  <label className="text-[10px] font-bold uppercase tracking-widest text-emerald-900/40 ml-4">Direct Phone</label>
                                  <input required type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="07XXX XXXXXX" className="w-full bg-emerald-50/30 border border-emerald-100 rounded-2xl p-6 text-emerald-950 font-bold focus:outline-none focus:border-emerald-600 shadow-sm" />
                               </div>
                               <div className="space-y-3">
                                  <label className="text-[10px] font-bold uppercase tracking-widest text-emerald-900/40 ml-4">Email Address</label>
                                  <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="secure@email.com" className="w-full bg-emerald-50/30 border border-emerald-100 rounded-2xl p-6 text-emerald-950 font-bold focus:outline-none focus:border-emerald-600 shadow-sm" />
                               </div>
                               <div className="space-y-3">
                                  <label className="text-[10px] font-bold uppercase tracking-widest text-emerald-900/40 ml-4">Contact Preference</label>
                                  <select value={formData.contactPref} onChange={(e) => setFormData({...formData, contactPref: e.target.value})} className="w-full bg-emerald-50/30 border border-emerald-100 rounded-2xl p-6 text-emerald-950 font-bold focus:outline-none focus:border-emerald-600 shadow-sm appearance-none cursor-pointer">
                                     <option>Email</option>
                                     <option>Phone Call</option>
                                     <option>WhatsApp</option>
                                  </select>
                               </div>
                            </div>
                            <button type="button" onClick={() => setActiveStep(2)} className="w-full py-8 bg-emerald-700 text-white rounded-2xl font-bold text-sm tracking-widest flex items-center justify-center gap-4 hover:bg-emerald-900 transition-all shadow-lg group">
                               CALIBRATE TRIAGE <MoveRight size={20} className="group-hover:translate-x-2 transition-transform" />
                            </button>
                         </motion.div>
                       )}

                       {activeStep === 2 && (
                         <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-12">
                            <div className="space-y-4">
                               <h3 className="font-serif text-4xl font-bold text-emerald-950 tracking-tight">Clinical Focus.</h3>
                               <p className="text-emerald-800/60 font-medium italic">"Select the relevant anatomical sector or clinical requirement."</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                               {triageOptions.map(option => (
                                 <button 
                                   key={option.id} 
                                   type="button" 
                                   onClick={() => {
                                     setFormData({...formData, focus: option.label});
                                     setActiveStep(3);
                                   }} 
                                   className={`p-8 rounded-[2rem] border text-left transition-all group ${formData.focus === option.label ? 'bg-emerald-950 border-emerald-950' : 'bg-emerald-50/50 border-emerald-100 hover:border-emerald-600'}`}
                                 >
                                    <h4 className={`font-serif text-xl font-bold transition-colors ${formData.focus === option.label ? 'text-white' : 'text-emerald-950'}`}>{option.label}</h4>
                                    <p className={`text-[10px] font-medium italic mt-1 transition-colors ${formData.focus === option.label ? 'text-emerald-300' : 'text-emerald-800/40'}`}>"{option.desc}"</p>
                                 </button>
                               ))}
                            </div>
                            <button type="button" onClick={() => setActiveStep(1)} className="w-full py-4 text-emerald-900/40 font-bold text-[10px] uppercase tracking-[0.5em] hover:text-emerald-900 transition-colors">Recalibrate Identity</button>
                         </motion.div>
                       )}

                       {activeStep === 3 && (
                         <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-12">
                            <div className="space-y-4">
                               <h3 className="font-serif text-4xl font-bold text-emerald-950 tracking-tight">Scheduling & Logic.</h3>
                               <p className="text-emerald-800/60 font-medium italic">"Choose your availability and intake requirements."</p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                               <div className="space-y-6">
                                  <div className="space-y-3">
                                     <label className="text-[10px] font-bold uppercase tracking-widest text-emerald-900/40 ml-4">Target Epoch (Date)</label>
                                     <input required type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full bg-emerald-50/30 border border-emerald-100 rounded-2xl p-6 text-emerald-950 font-bold focus:outline-none focus:border-emerald-600 shadow-sm" />
                                  </div>
                                  <div className="space-y-3">
                                     <label className="text-[10px] font-bold uppercase tracking-widest text-emerald-900/40 ml-4">Urgency Level</label>
                                     <div className="flex flex-wrap gap-2">
                                        {['Routine', 'Acute / Painful', 'Priority Rehab'].map(u => (
                                          <button key={u} type="button" onClick={() => setFormData({...formData, urgency: u})} className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${formData.urgency === u ? 'bg-emerald-700 text-white shadow-md' : 'bg-emerald-50 text-emerald-800/40 hover:bg-emerald-100'}`}>{u}</button>
                                        ))}
                                     </div>
                                  </div>
                               </div>

                               <div className="space-y-6">
                                  <div className="space-y-3">
                                     <label className="text-[10px] font-bold uppercase tracking-widest text-emerald-900/40 ml-4">Preferred Window</label>
                                     <div className="grid grid-cols-2 gap-3">
                                        {timeSlots.map(slot => (
                                          <button 
                                            key={slot.label} 
                                            type="button" 
                                            onClick={() => setFormData({...formData, timeSlot: slot.label})}
                                            className={`p-4 rounded-xl border text-center transition-all ${formData.timeSlot === slot.label ? 'bg-emerald-950 border-emerald-950 text-white' : 'bg-white border-emerald-100 hover:border-emerald-400'}`}
                                          >
                                             <p className="text-[10px] font-black uppercase tracking-tight">{slot.label}</p>
                                             <p className={`text-[8px] font-mono mt-1 ${formData.timeSlot === slot.label ? 'text-emerald-400' : 'text-emerald-800/20'}`}>{slot.range}</p>
                                          </button>
                                        ))}
                                     </div>
                                  </div>
                                  <div className="space-y-3">
                                     <label className="text-[10px] font-bold uppercase tracking-widest text-emerald-900/40 ml-4">Referral Source</label>
                                     <select value={formData.referral} onChange={(e) => setFormData({...formData, referral: e.target.value})} className="w-full bg-emerald-50/30 border border-emerald-100 rounded-2xl p-6 text-emerald-950 font-bold focus:outline-none focus:border-emerald-600 shadow-sm appearance-none cursor-pointer">
                                        <option value="">How did you hear about us?</option>
                                        <option>Google Search</option>
                                        <option>GP Recommendation</option>
                                        <option>Insurance Panel</option>
                                        <option>Word of Mouth</option>
                                        <option>Social Media</option>
                                     </select>
                                  </div>
                               </div>
                            </div>

                            <button type="submit" className="w-full py-10 bg-emerald-700 text-white rounded-3xl font-bold text-sm tracking-[0.3em] shadow-2xl flex items-center justify-center gap-6 hover:bg-emerald-950 transition-all group overflow-hidden relative">
                               <span className="relative z-10 flex items-center gap-4">INITIALIZE CLINICAL UPLINK <Send size={20} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" /></span>
                               <div className="absolute inset-0 bg-emerald-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                            </button>
                            <button type="button" onClick={() => setActiveStep(2)} className="w-full py-4 text-emerald-900/40 font-bold text-[10px] uppercase tracking-[0.5em] hover:text-emerald-900 transition-colors">Adjust Clinical Sector</button>
                         </motion.div>
                       )}

                    </form>
                    
                    <div className="px-12 py-10 border-t border-emerald-50 flex items-center justify-between opacity-30">
                       <div className="flex items-center gap-4">
                          <Heart size={16} className="text-emerald-600" />
                          <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-950">HIPAA compliant Intake Node</span>
                       </div>
                       <div className="flex items-center gap-4">
                          <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-950">Encryption: AES-256</span>
                       </div>
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <PhysioFooter />
    </div>
  );
};

export default PhysioContact;
