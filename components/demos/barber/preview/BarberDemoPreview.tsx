import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  Scissors, Calendar, MapPin, Clock, Star, ChevronRight, X, 
  Menu, Phone, Instagram, Facebook, Twitter, Check, ArrowRight, 
  Zap, Shield, Heart, User, Sparkles
} from 'lucide-react';
import { gsap } from 'gsap';

// --- TYPES ---
type BookingStep = 'service' | 'barber' | 'time' | 'confirm';

// --- MOCK DATA ---
const SERVICES = [
  { id: 1, name: "The Executive Cut", price: "£35", duration: "45m", desc: "Precision cut, wash, style & hot towel." },
  { id: 2, name: "Beard Sculpting", price: "£25", duration: "30m", desc: "Razor lineup, trim, oil & shape." },
  { id: 3, name: "Full Service", price: "£55", duration: "75m", desc: "Haircut + Beard + Facial Treatment." },
  { id: 4, name: "Skin Fade", price: "£30", duration: "40m", desc: "Zero grade fade with foil finish." },
];

const BARBERS = [
  { id: 1, name: "Alex 'The Blade'", role: "Master Barber", img: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=400", tags: ["Fades", "Designs"] },
  { id: 2, name: "Sarah Sharp", role: "Senior Stylist", img: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&q=80&w=400", tags: ["Scissors", "Texture"] },
  { id: 3, name: "Mikey T", role: "Beard Specialist", img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=400", tags: ["Beards", "Shaves"] },
];

const REVIEWS = [
  { id: 1, name: "James D.", rating: 5, text: "Best fade in the city. The vibe is unmatched.", date: "2 days ago" },
  { id: 2, name: "Marcus L.", rating: 5, text: "Incredible attention to detail. Highly recommend Alex.", date: "1 week ago" },
  { id: 3, name: "Tom H.", rating: 4, text: "Great service, easy booking. A bit pricey but worth it.", date: "3 weeks ago" },
];

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1599351431247-f137afbacdf9?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1593702275677-f9147a4027b0?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1622286332618-f2802b9c54c3?auto=format&fit=crop&q=80&w=600",
];

const FAQS = [
  { q: "Do I need an appointment?", a: "Walk-ins are welcome, but bookings are prioritized to ensure zero wait time." },
  { q: "Is there parking available?", a: "Yes, we have free client parking at the rear of the shop." },
  { q: "Do you offer student discounts?", a: "15% off on Tuesdays and Wednesdays with valid ID." },
];

// --- COMPONENTS ---

const SectionTitle = ({ title, subtitle }: { title: string, subtitle: string }) => (
  <div className="mb-12 text-center">
    <motion.span 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-blue-500 font-bold text-xs uppercase tracking-[0.2em] mb-2 block"
    >
      {subtitle}
    </motion.span>
    <motion.h3 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="text-4xl font-black text-slate-900 uppercase tracking-tighter"
    >
      {title}
    </motion.h3>
    <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-red-500 mx-auto mt-6 rounded-full"></div>
  </div>
);

const BarberDemoPreview: React.FC = () => {
  const [introComplete, setIntroComplete] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState<BookingStep>('service');
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<number | null>(null);
  const [galleryOpen, setGalleryOpen] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Intro Animation Sequence
  useEffect(() => {
    if (!introComplete) {
      const timer = setTimeout(() => setIntroComplete(true), 3500); // Auto-skip after 3.5s
      return () => clearTimeout(timer);
    }
  }, [introComplete]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(`barber-demo-${id}`);
    if (el && containerRef.current) {
      containerRef.current.scrollTo({
        top: el.offsetTop - 80, // Offset for sticky nav
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto my-24 relative rounded-[2rem] overflow-hidden shadow-2xl border border-slate-200 bg-white h-[85vh] flex flex-col font-sans">
      
      {/* --- INTRO OVERLAY --- */}
      <AnimatePresence>
        {!introComplete && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="absolute inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Animated Stripes */}
            <motion.div 
              initial={{ rotate: 45, x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "loop", repeatDelay: 0.5 }}
              className="absolute w-[200%] h-64 bg-gradient-to-r from-transparent via-blue-600/20 to-transparent blur-3xl transform -rotate-45"
            />
            <motion.div 
              initial={{ rotate: 45, x: '100%' }}
              animate={{ x: '-100%' }}
              transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatType: "loop", repeatDelay: 0.2 }}
              className="absolute w-[200%] h-64 bg-gradient-to-r from-transparent via-red-600/20 to-transparent blur-3xl transform -rotate-45"
            />

            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-10 flex flex-col items-center"
            >
              <Scissors className="text-white w-24 h-24 mb-8 animate-pulse" strokeWidth={1} />
              <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter mb-4">
                CUT <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-red-500">ABOVE</span>
              </h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-slate-400 text-sm tracking-[0.5em] uppercase"
              >
                The Premium Experience
              </motion.p>
            </motion.div>

            <motion.button 
              onClick={() => setIntroComplete(true)}
              className="absolute bottom-10 text-white/50 text-xs uppercase tracking-widest hover:text-white transition-colors"
            >
              Skip Intro
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MAIN APP CONTENT --- */}
      <div className="flex-1 flex flex-col relative bg-slate-50">
        
        {/* Progress Bar */}
        <motion.div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-red-600 origin-left z-50" style={{ scaleX }} />

        {/* Sticky Nav */}
        <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <Scissors className="text-slate-900 w-6 h-6" />
            <span className="font-black text-slate-900 tracking-tighter text-xl">CUT<span className="text-blue-600">ABOVE</span></span>
          </div>
          
          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {['Services', 'Team', 'Reviews', 'Location'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-blue-600 transition-colors"
              >
                {item}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('booking')}
              className="px-6 py-2 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-blue-600 transition-colors shadow-lg"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </nav>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-[70px] left-0 right-0 bg-white z-30 border-b border-slate-100 p-6 flex flex-col gap-4 shadow-xl md:hidden"
            >
              {['Services', 'Team', 'Reviews', 'Location', 'Booking'].map((item) => (
                <button 
                  key={item} 
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-left text-sm font-bold uppercase tracking-wider text-slate-900 py-2 border-b border-slate-50 last:border-0"
                >
                  {item}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scrollable Container */}
        <div ref={containerRef} className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth relative">
          
          {/* HERO SECTION */}
          <section id="barber-demo-hero" className="relative min-h-[600px] flex items-center justify-center p-6 overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=2000" 
                className="w-full h-full object-cover brightness-[0.4] grayscale contrast-125"
                alt="Barber Shop"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/50"></div>
            </div>
            
            <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.2em]"
              >
                <Sparkles size={12} className="text-yellow-400" /> Premium Grooming Studio
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring" }}
                className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.9]"
              >
                Sharp.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-white to-red-500 italic">Timeless.</span>
              </motion.h2>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <button onClick={() => scrollToSection('booking')} className="px-10 py-4 bg-white text-slate-950 font-black uppercase tracking-[0.2em] text-sm hover:bg-blue-600 hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] w-full sm:w-auto">
                  Book Appointment
                </button>
                <button onClick={() => scrollToSection('services')} className="px-10 py-4 border border-white/30 text-white font-black uppercase tracking-[0.2em] text-sm hover:bg-white/10 transition-all w-full sm:w-auto">
                  View Services
                </button>
              </motion.div>
            </div>
          </section>

          {/* SERVICES SECTION */}
          <section id="barber-demo-services" className="py-24 px-6 bg-white relative">
            <div className="max-w-6xl mx-auto">
              <SectionTitle title="Our Rituals" subtitle="Refined Grooming" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {SERVICES.map((service, idx) => (
                  <motion.div 
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all cursor-pointer relative overflow-hidden"
                  >
                    <div className="absolute right-0 top-0 w-24 h-24 bg-blue-50 rounded-bl-[100px] -mr-4 -mt-4 transition-transform group-hover:scale-150 group-hover:bg-blue-100"></div>
                    <div className="relative z-10 flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-1">{service.name}</h4>
                        <p className="text-slate-500 text-sm font-medium">{service.duration}</p>
                      </div>
                      <span className="text-2xl font-black text-blue-600">{service.price}</span>
                    </div>
                    <p className="relative z-10 text-slate-600 text-sm leading-relaxed mb-6">{service.desc}</p>
                    <button 
                      onClick={() => { setSelectedService(service.id); scrollToSection('booking'); }}
                      className="relative z-10 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 group-hover:text-blue-600 transition-colors"
                    >
                      Select <ArrowRight size={14} />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* TEAM SECTION */}
          <section id="barber-demo-team" className="py-24 px-6 bg-slate-950 text-white">
            <div className="max-w-6xl mx-auto">
              <SectionTitle title="The Artisans" subtitle="Master Barbers" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {BARBERS.map((barber, idx) => (
                  <motion.div 
                    key={barber.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2 }}
                    className="group text-center"
                  >
                    <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden mb-6 border border-white/10 group-hover:border-blue-500 transition-colors">
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60 z-10"></div>
                      <img src={barber.img} alt={barber.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110" />
                      <div className="absolute bottom-4 left-4 z-20 flex flex-wrap gap-2">
                        {barber.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 bg-blue-600/90 text-white text-[8px] font-black uppercase tracking-widest rounded-md">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <h4 className="text-xl font-black uppercase tracking-tight mb-1">{barber.name}</h4>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{barber.role}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* GALLERY SECTION */}
          <section className="py-24 px-6 bg-slate-50">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[400px]">
                {GALLERY_IMAGES.map((img, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className={`relative rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all ${idx === 0 ? 'col-span-2 row-span-2' : ''}`}
                    onClick={() => setGalleryOpen(img)}
                  >
                    <img src={img} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Gallery" />
                    <div className="absolute inset-0 bg-black/20 hover:bg-black/0 transition-colors"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* BOOKING SECTION */}
          <section id="barber-demo-booking" className="py-24 px-6 bg-white relative overflow-hidden">
            <div className="absolute -right-20 top-20 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
            <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 p-8 md:p-12 relative z-10">
              <div className="text-center mb-10">
                <h3 className="text-3xl font-black uppercase tracking-tighter text-slate-900 mb-2">Secure Your Spot</h3>
                <p className="text-slate-400 text-sm font-medium">Select your preferences to book.</p>
              </div>

              {/* Progress Steps */}
              <div className="flex justify-between max-w-xs mx-auto mb-12 relative">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-100 -z-10"></div>
                {['service', 'barber', 'time', 'confirm'].map((step, idx) => (
                  <div 
                    key={step} 
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors ${
                      ['service', 'barber', 'time', 'confirm'].indexOf(bookingStep) >= idx 
                        ? 'bg-slate-900 text-white' 
                        : 'bg-slate-200 text-slate-400'
                    }`}
                  >
                    {idx + 1}
                  </div>
                ))}
              </div>

              {/* Step Content */}
              <div className="min-h-[300px]">
                {bookingStep === 'service' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {SERVICES.map(s => (
                      <button 
                        key={s.id} 
                        onClick={() => { setSelectedService(s.id); setBookingStep('barber'); }}
                        className={`p-6 rounded-2xl border text-left transition-all ${selectedService === s.id ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-600/20' : 'border-slate-200 hover:border-slate-300'}`}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-black uppercase text-sm">{s.name}</span>
                          <span className="font-bold text-blue-600">{s.price}</span>
                        </div>
                        <p className="text-xs text-slate-500">{s.duration}</p>
                      </button>
                    ))}
                  </div>
                )}

                {bookingStep === 'barber' && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {BARBERS.map(b => (
                      <button 
                        key={b.id} 
                        onClick={() => { setSelectedBarber(b.id); setBookingStep('time'); }}
                        className={`p-4 rounded-2xl border text-center transition-all ${selectedBarber === b.id ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-600/20' : 'border-slate-200 hover:border-slate-300'}`}
                      >
                        <img src={b.img} alt={b.name} className="w-16 h-16 rounded-full mx-auto mb-4 object-cover" />
                        <span className="font-black uppercase text-xs block mb-1">{b.name}</span>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider">{b.role}</span>
                      </button>
                    ))}
                  </div>
                )}

                {bookingStep === 'time' && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'].map(time => (
                      <button 
                        key={time} 
                        onClick={() => setBookingStep('confirm')}
                        className="py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-900 hover:text-white transition-colors"
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                )}

                {bookingStep === 'confirm' && (
                  <div className="text-center space-y-6 animate-fade-in">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
                      <Check size={40} />
                    </div>
                    <div>
                      <h4 className="text-2xl font-black uppercase text-slate-900 mb-2">All Set!</h4>
                      <p className="text-slate-500 max-w-xs mx-auto">Your appointment is confirmed. A calendar invite has been sent to your email.</p>
                    </div>
                    <button 
                      onClick={() => { setBookingStep('service'); setSelectedService(null); setSelectedBarber(null); }}
                      className="px-8 py-3 bg-slate-100 text-slate-900 font-bold uppercase tracking-wider text-xs rounded-full hover:bg-slate-200"
                    >
                      Book Another
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* REVIEWS & LOCATION */}
          <section id="barber-demo-reviews" className="py-24 px-6 bg-slate-900 text-white">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
              {/* Reviews */}
              <div>
                <h4 className="text-2xl font-black uppercase tracking-tighter mb-8">Client Talk</h4>
                <div className="space-y-6">
                  {REVIEWS.map((r) => (
                    <div key={r.id} className="bg-white/5 p-6 rounded-2xl border border-white/10">
                      <div className="flex gap-1 text-yellow-400 mb-2">
                        {[...Array(r.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                      </div>
                      <p className="text-lg italic font-medium text-slate-200 mb-4">"{r.text}"</p>
                      <div className="flex justify-between items-center text-xs text-slate-500 font-bold uppercase tracking-widest">
                        <span>{r.name}</span>
                        <span>{r.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ & Location */}
              <div className="space-y-12">
                <div>
                  <h4 className="text-2xl font-black uppercase tracking-tighter mb-8">FAQ</h4>
                  <div className="space-y-4">
                    {FAQS.map((faq, idx) => (
                      <div key={idx} className="border-b border-white/10 pb-4">
                        <p className="font-bold text-sm mb-2 text-white">{faq.q}</p>
                        <p className="text-xs text-slate-400 leading-relaxed">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div id="barber-demo-location" className="bg-white/10 rounded-3xl p-8 border border-white/10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white"><MapPin size={20} /></div>
                    <div>
                      <p className="font-black uppercase tracking-widest text-xs text-slate-400">Location</p>
                      <p className="font-bold text-lg">12 High Street, Wiltshire</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white"><Clock size={20} /></div>
                    <div>
                      <p className="font-black uppercase tracking-widest text-xs text-slate-400">Hours</p>
                      <p className="font-bold text-lg">Mon-Sat: 09:00 - 19:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="py-12 bg-black text-white text-center border-t border-white/10">
            <div className="flex justify-center gap-8 mb-8">
              <Instagram className="text-slate-500 hover:text-white transition-colors cursor-pointer" />
              <Facebook className="text-slate-500 hover:text-white transition-colors cursor-pointer" />
              <Twitter className="text-slate-500 hover:text-white transition-colors cursor-pointer" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600">© 2026 Cut Above Studio</p>
          </footer>
        </div>
      </div>

      {/* Gallery Modal */}
      <AnimatePresence>
        {galleryOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setGalleryOpen(null)}
            className="absolute inset-0 z-[60] bg-black/95 backdrop-blur-xl flex items-center justify-center p-10 cursor-zoom-out"
          >
            <img src={galleryOpen} className="max-w-full max-h-full rounded-lg shadow-2xl" alt="Zoomed" />
            <button className="absolute top-8 right-8 text-white hover:text-red-500 transition-colors">
              <X size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default BarberDemoPreview;