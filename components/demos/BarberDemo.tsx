import React, { useState, useEffect, useRef } from 'react';
import { 
  Scissors, Calendar, Clock, MapPin, 
  Instagram, Facebook, Twitter, 
  ChevronRight, Star, User, Phone, Mail, 
  ArrowRight, X, Check
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const BarberDemo: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [activeService, setActiveService] = useState<string | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero Animation
    const ctx = gsap.context(() => {
      gsap.from('.hero-content', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.2
      });

      gsap.from('.service-card', {
        scrollTrigger: {
          trigger: servicesRef.current,
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out'
      });
      
      gsap.from('.review-card', {
        scrollTrigger: {
          trigger: reviewsRef.current,
          start: 'top 80%',
        },
        x: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out'
      });
    });

    return () => ctx.revert();
  }, []);

  const services = [
    { name: 'Signature Cut', price: '£35', duration: '45m', desc: 'Precision cut, wash, and style.' },
    { name: 'Skin Fade', price: '£40', duration: '60m', desc: 'Seamless fade with foil finish.' },
    { name: 'Beard Sculpt', price: '£25', duration: '30m', desc: 'Shape, trim, and hot towel.' },
    { name: 'Full Service', price: '£60', duration: '90m', desc: 'Cut, beard, and facial treatment.' },
    { name: 'Head Shave', price: '£30', duration: '30m', desc: 'Hot towel and straight razor.' },
    { name: 'Kids Cut', price: '£25', duration: '30m', desc: 'Under 12s. Style included.' },
  ];

  const barbers = [
    { name: 'James "The Blade"', role: 'Master Barber', image: 'bg-zinc-800' },
    { name: 'Marcus Sterling', role: 'Senior Stylist', image: 'bg-zinc-700' },
    { name: 'Elena Sharp', role: 'Color Specialist', image: 'bg-zinc-600' },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-[#d4af37] selection:text-black overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#d4af37] flex items-center justify-center rounded-sm">
              <Scissors className="text-black" size={24} />
            </div>
            <span className="text-xl font-black uppercase tracking-widest text-white">
              CROWN <span className="text-[#d4af37]">&</span> DAGGAR
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">
            <a href="#services" className="hover:text-[#d4af37] transition-colors">Services</a>
            <a href="#barbers" className="hover:text-[#d4af37] transition-colors">Team</a>
            <a href="#reviews" className="hover:text-[#d4af37] transition-colors">Reviews</a>
            <button 
              onClick={() => setIsBookingOpen(true)}
              className="px-6 py-3 bg-white text-black hover:bg-[#d4af37] transition-all rounded-sm"
            >
              Book Now
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent z-10"></div>
          {/* Abstract dark background pattern */}
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-zinc-950 to-black opacity-50"></div>
        </div>
        
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto hero-content">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-[#d4af37]/30 rounded-full bg-[#d4af37]/10 backdrop-blur-sm">
            <Star size={12} className="text-[#d4af37] fill-[#d4af37]" />
            <span className="text-[#d4af37] text-[10px] uppercase tracking-[0.2em] font-bold">Voted Best in London 2024</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black uppercase leading-[0.9] tracking-tighter mb-8 text-white">
            Refined <br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#f3e5ab]">Grooming</span> <br/>
            For Men.
          </h1>
          
          <p className="text-zinc-400 text-lg md:text-xl max-w-xl mx-auto mb-12 font-medium leading-relaxed">
            Experience the art of traditional barbering fused with modern precision. 
            More than a haircut—it's a ritual.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => setIsBookingOpen(true)}
              className="group relative px-10 py-5 bg-[#d4af37] text-black font-black uppercase text-xs tracking-[0.2em] overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3 group-hover:gap-6 transition-all">
                Book Appointment <ArrowRight size={16} />
              </span>
              <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0"></div>
            </button>
            
            <a href="#services" className="text-white text-xs font-bold uppercase tracking-[0.2em] hover:text-[#d4af37] transition-colors border-b border-transparent hover:border-[#d4af37] pb-1">
              View Service Menu
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" ref={servicesRef} className="py-32 px-6 bg-zinc-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div>
              <h2 className="text-[#d4af37] text-sm font-black uppercase tracking-[0.4em] mb-4">Our Craft</h2>
              <h3 className="text-4xl md:text-5xl font-black uppercase text-white tracking-tight">Service Menu</h3>
            </div>
            <p className="text-zinc-400 max-w-sm text-sm leading-relaxed">
              Each service includes a consultation, wash, hot towel finish, and premium product styling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {services.map((service, idx) => (
              <div 
                key={idx} 
                className="service-card group relative p-8 bg-zinc-900 border border-zinc-800 hover:border-[#d4af37]/50 transition-all duration-500 cursor-pointer"
                onClick={() => {
                  setActiveService(service.name);
                  setIsBookingOpen(true);
                }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#d4af37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-2xl font-bold text-white group-hover:text-[#d4af37] transition-colors uppercase tracking-tight">
                    {service.name}
                  </h4>
                  <span className="text-xl font-black text-[#d4af37]">{service.price}</span>
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500">
                    <Clock size={12} /> {service.duration}
                  </span>
                </div>
                
                <p className="text-zinc-400 text-sm leading-relaxed mb-6 group-hover:text-zinc-300 transition-colors">
                  {service.desc}
                </p>
                
                <div className="flex items-center gap-2 text-[#d4af37] text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  Book This <ArrowRight size={12} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team/Barbers */}
      <section id="barbers" className="py-32 px-6 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-4xl md:text-6xl font-black uppercase text-white tracking-tighter mb-24">
            The <span className="text-zinc-700">Masters</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {barbers.map((barber, idx) => (
              <div key={idx} className="group relative aspect-[3/4] overflow-hidden bg-zinc-900">
                <div className={`absolute inset-0 ${barber.image} opacity-80 group-hover:scale-105 transition-transform duration-700`}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 w-full p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-[#d4af37] text-[10px] font-black uppercase tracking-[0.2em] mb-2">{barber.role}</p>
                  <h3 className="text-3xl font-black uppercase text-white tracking-tight">{barber.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info / Footer */}
      <footer className="bg-[#050505] pt-32 pb-12 px-6 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 mb-24">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 bg-[#d4af37] flex items-center justify-center rounded-sm">
                <Scissors className="text-black" size={18} />
              </div>
              <span className="text-lg font-black uppercase tracking-widest text-white">
                CROWN <span className="text-[#d4af37]">&</span> DAGGAR
              </span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
              Defining modern masculinity through precision grooming and traditional techniques.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-8">Location</h4>
            <address className="not-italic text-zinc-400 text-sm space-y-2 mb-6">
              <p>42 Carnaby Street</p>
              <p>Soho, London</p>
              <p>W1F 7DP</p>
            </address>
            <a href="#" className="text-[#d4af37] text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all">
              Get Directions <ArrowRight size={12} />
            </a>
          </div>
          
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-8">Hours</h4>
            <ul className="text-zinc-400 text-sm space-y-2">
              <li className="flex justify-between max-w-[200px]"><span>Mon - Fri</span> <span className="text-white">10am - 8pm</span></li>
              <li className="flex justify-between max-w-[200px]"><span>Saturday</span> <span className="text-white">9am - 6pm</span></li>
              <li className="flex justify-between max-w-[200px]"><span>Sunday</span> <span className="text-zinc-600">Closed</span></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 pt-12 border-t border-zinc-900">
          <p className="text-zinc-600 text-[10px] uppercase tracking-widest">© 2024 Crown & Daggar. All rights reserved.</p>
          <div className="flex gap-6">
            <Instagram size={18} className="text-zinc-600 hover:text-white transition-colors cursor-pointer" />
            <Twitter size={18} className="text-zinc-600 hover:text-white transition-colors cursor-pointer" />
            <Facebook size={18} className="text-zinc-600 hover:text-white transition-colors cursor-pointer" />
          </div>
        </div>
      </footer>

      {/* Booking Modal */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-lg shadow-2xl relative animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setIsBookingOpen(false)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            
            <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-2">Book Appointment</h3>
            <p className="text-zinc-500 text-sm mb-8">Select your preferred time and barber.</p>
            
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2">Service</label>
                <select className="w-full bg-zinc-950 border border-zinc-800 text-white p-3 rounded-sm focus:border-[#d4af37] outline-none appearance-none">
                  <option>{activeService || 'Select Service'}</option>
                  {services.map(s => <option key={s.name} value={s.name}>{s.name} - {s.price}</option>)}
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2">Date</label>
                  <input type="date" className="w-full bg-zinc-950 border border-zinc-800 text-white p-3 rounded-sm focus:border-[#d4af37] outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2">Time</label>
                  <select className="w-full bg-zinc-950 border border-zinc-800 text-white p-3 rounded-sm focus:border-[#d4af37] outline-none appearance-none">
                    <option>10:00 AM</option>
                    <option>11:00 AM</option>
                    <option>1:00 PM</option>
                    <option>2:30 PM</option>
                    <option>4:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2">Barber</label>
                <div className="grid grid-cols-3 gap-2">
                  {barbers.map((b, i) => (
                    <button key={i} className="bg-zinc-950 border border-zinc-800 p-2 text-xs text-center hover:border-[#d4af37] hover:text-[#d4af37] transition-all rounded-sm">
                      {b.name.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              <button className="w-full py-4 mt-4 bg-[#d4af37] text-black font-black uppercase tracking-[0.2em] hover:bg-white transition-colors rounded-sm flex items-center justify-center gap-2">
                Confirm <Check size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BarberDemo;