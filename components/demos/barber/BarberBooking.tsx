import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Calendar, Clock, Scissors, User, ChevronRight, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ExitPreviewButton from '../../ExitPreviewButton';
import BarberNavbar from './BarberNavbar';

const BarberBooking: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: '',
    date: '',
    time: '',
    name: '',
    email: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    { id: 1, name: "Skin Fade", price: "£30", duration: "45m" },
    { id: 2, name: "Beard Sculpt", price: "£25", duration: "30m" },
    { id: 3, name: "Full Service", price: "£50", duration: "75m" },
    { id: 4, name: "Buzz Cut", price: "£20", duration: "20m" }
  ];

  const timeSlots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-[#00D95F] selection:text-black flex flex-col">
      <ExitPreviewButton />
      <BarberNavbar />

      <section className="pt-32 pb-24 px-6 max-w-3xl mx-auto w-full flex-grow">
        <div className="text-center mb-16">
          <span className="inline-block py-2 px-4 bg-neutral-100 text-neutral-900 font-bold text-[10px] uppercase tracking-[0.2em] mb-6 border-l-4 border-[#00D95F]">
            Appointments
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-black uppercase">
            Reserve <span className="text-[#00D95F]">Your Seat.</span>
          </h1>
        </div>

        {/* Progress Bar */}
        <div className="flex justify-between items-center mb-12 px-4 relative">
          <div className="absolute top-1/2 left-0 w-full h-px bg-neutral-200 -z-10"></div>
          {[1, 2, 3].map((num) => (
            <div 
              key={num}
              className={`w-10 h-10 flex items-center justify-center font-black text-sm transition-all duration-300 ${
                step >= num ? 'bg-black text-white' : 'bg-white border-2 border-neutral-200 text-neutral-400'
              }`}
            >
              {num}
            </div>
          ))}
        </div>

        <div className="bg-white border border-neutral-200 p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h3 className="text-xl font-black tracking-tight flex items-center gap-3 border-b border-neutral-100 pb-4 uppercase">
                  <Scissors size={20} className="text-[#00D95F]" /> Select Experience
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map(service => (
                    <button
                      key={service.id}
                      onClick={() => setFormData({...formData, service: service.name})}
                      className={`p-6 text-left border-2 transition-all duration-300 hover:shadow-md ${
                        formData.service === service.name 
                          ? 'border-[#00D95F] bg-neutral-50' 
                          : 'border-neutral-100 bg-white hover:border-[#00D95F]/30'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold tracking-wide text-sm uppercase">{service.name}</span>
                        <span className="font-black text-[#00D95F]">{service.price}</span>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">{service.duration}</span>
                    </button>
                  ))}
                </div>
                <div className="flex justify-end pt-4">
                  <button 
                    disabled={!formData.service}
                    onClick={nextStep}
                    className="px-8 py-4 bg-black text-white font-black uppercase tracking-widest hover:bg-[#00D95F] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 rounded-none"
                  >
                    Next Step <ChevronRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h3 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
                  <Calendar size={24} className="text-[#00D95F]" /> Date & Time
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-neutral-400 mb-3 ml-2">Select Date</label>
                    <input 
                      type="date" 
                      className="w-full p-4 border-2 border-neutral-200 font-bold outline-none focus:border-[#00D95F] transition-colors"
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-neutral-400 mb-3 ml-2">Select Time</label>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                      {timeSlots.map(time => (
                        <button
                          key={time}
                          onClick={() => setFormData({...formData, time})}
                          className={`py-3 text-sm font-bold border-2 transition-all ${
                            formData.time === time 
                              ? 'bg-black text-white border-black' 
                              : 'bg-white text-neutral-600 border-neutral-100 hover:border-[#00D95F]'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-8">
                  <button onClick={prevStep} className="px-6 py-4 text-neutral-500 font-bold uppercase tracking-widest text-xs hover:text-black">
                    Back
                  </button>
                  <button 
                    disabled={!formData.date || !formData.time}
                    onClick={nextStep}
                    className="px-8 py-4 bg-black text-white font-black uppercase tracking-widest hover:bg-[#00D95F] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 rounded-none"
                  >
                    Next Step <ChevronRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h3 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
                  <User size={24} className="text-[#00D95F]" /> Your Details
                </h3>

                <div className="space-y-6">
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    className="w-full p-5 border-2 border-neutral-200 bg-white font-bold outline-none focus:border-[#00D95F] placeholder:text-neutral-300 transition-colors"
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    className="w-full p-5 border-2 border-neutral-200 bg-white font-bold outline-none focus:border-[#00D95F] placeholder:text-neutral-300 transition-colors"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div className="flex justify-between pt-8">
                  <button onClick={prevStep} className="px-6 py-4 text-neutral-500 font-bold uppercase tracking-widest text-xs hover:text-black">
                    Back
                  </button>
                  <button 
                    disabled={!formData.name || !formData.email}
                    onClick={nextStep}
                    className="px-8 py-4 bg-[#00D95F] text-black font-black uppercase tracking-widest hover:bg-black hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-xl rounded-none"
                  >
                    Confirm Booking <CheckCircle size={18} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div 
                key="step4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-8"
              >
                <div className="w-24 h-24 bg-[#00D95F] rounded-full flex items-center justify-center text-black mx-auto shadow-2xl animate-bounce">
                  <CheckCircle size={48} />
                </div>
                <div>
                  <h3 className="text-3xl font-black uppercase tracking-tight mb-2">You're Booked!</h3>
                  <p className="text-neutral-500 max-w-xs mx-auto font-medium">Confirmation sent to {formData.email}. We'll see you on {formData.date} at {formData.time}.</p>
                </div>
                <Link to="/demo/barber" className="inline-block px-10 py-4 bg-neutral-200 text-neutral-900 font-bold uppercase tracking-widest hover:bg-neutral-300 transition-colors text-xs rounded-none">
                  Return Home
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default BarberBooking;
