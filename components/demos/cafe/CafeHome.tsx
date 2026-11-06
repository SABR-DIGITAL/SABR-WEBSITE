import React, { useEffect, useState } from 'react';
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import {
  Coffee,
  ArrowRight,
  Star,
  Utensils,
  Calendar,
  Sparkles,
  Quote,
  Instagram,
  Heart,
  Users,
  MapPin,
  Clock,
  Navigation
} from 'lucide-react';
import CafeNavbar from './CafeNavbar';
import CafeFooter from './CafeFooter';
import { useCafeGlide, CAFE_GLIDE_STYLES } from './useCafeGlide';

export interface CafeLocationItem {
  id: number;
  name: string;
  badge: string;
  address: string;
  city: string;
  hours: string;
  phone: string;
  description: string;
  embedUrl: string;
  directionsUrl: string;
  img: string;
}

export const CAFE_LOCATIONS: CafeLocationItem[] = [
  {
    id: 1,
    name: 'Hearth Bath City',
    badge: 'Flagship Sanctuary',
    address: '24 Milsom Street',
    city: 'Bath, BA1 1DG',
    hours: 'Mon–Sun: 8am – 6pm',
    phone: '01225 482 910',
    description: 'Set inside a Grade II Georgian townhouse with sun-drenched sash windows and a quiet courtyard terrace.',
    embedUrl: 'https://www.google.com/maps?q=Milsom+Street+Bath&output=embed',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Milsom+Street+Bath+BA1',
    img: '/images/projects/cafe-interior.webp'
  },
  {
    id: 2,
    name: 'Cotswold Sanctuary',
    badge: 'Market Square House',
    address: '12 Market Square',
    city: 'Chipping Campden, GL55 6AL',
    hours: 'Mon–Sat: 8am – 5pm',
    phone: '01386 840 312',
    description: 'Honey-hued Cotswold stone walls, an open wood-fired bakery hearth, and dog-friendly garden seating.',
    embedUrl: 'https://www.google.com/maps?q=Market+Square+Chipping+Campden&output=embed',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Market+Square+Chipping+Campden+GL55',
    img: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=75&w=900'
  },
  {
    id: 3,
    name: 'Clifton Village',
    badge: 'Botanical Conservatory',
    address: '8 Princess Victoria Street',
    city: 'Bristol, BS8 4BP',
    hours: 'Mon–Sun: 8am – 6:30pm',
    phone: '0117 973 4420',
    description: 'An airy glass-roofed patisserie and espresso bar steps from the Suspension Bridge.',
    embedUrl: 'https://www.google.com/maps?q=Princess+Victoria+Street+Clifton+Bristol&output=embed',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Princess+Victoria+Street+Clifton+Bristol+BS8',
    img: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&q=75&w=900'
  }
];

const testimonials = [
  {
    text: 'The best avocado toast for miles, hands down. The atmosphere is like a warm hug.',
    author: 'Elena R.',
    role: 'Local Creative',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=75&w=200'
  },
  {
    text: 'A slice of Paris in our little village. Their flat white is perfection.',
    author: 'James T.',
    role: 'Coffee Enthusiast',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=75&w=200'
  },
  {
    text: 'We hosted our engagement brunch here. The team made every detail magic.',
    author: 'Sarah L.',
    role: 'Loyal Patron',
    img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=75&w=200'
  }
];

const instagramPhotos = [
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=75&w=500',
  '/images/projects/cafe-hero.webp',
  'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=75&w=500',
  'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&q=75&w=500',
  'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=75&w=500',
  '/images/projects/cafe-interior.webp',
  'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=75&w=500',
  'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=75&w=500',
  'https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&q=75&w=500'
];

// Preload and pre-decode the Cafe Hero and Crafted Spaces interior image immediately on module load
// so they are already in GPU/RAM before the user scrolls or opens the page.
const predecodedCafeCritical: HTMLImageElement[] = [];
if (typeof window !== 'undefined') {
  ['/images/projects/cafe-interior.webp', '/images/projects/cafe-hero.webp'].forEach((src) => {
    const img = new Image();
    img.decoding = 'sync';
    (img as any).fetchPriority = 'high';
    img.src = src;
    img.decode?.().catch(() => {});
    predecodedCafeCritical.push(img);
  });
}

let cafeAssetsWarmed = false;
const warmCafeAssets = () => {
  if (cafeAssetsWarmed || typeof window === 'undefined') return;
  cafeAssetsWarmed = true;
  const urls = [
    ...CAFE_LOCATIONS.map((l) => l.img),
    ...instagramPhotos.slice(0, 5)
  ];
  urls.forEach((src) => {
    const img = new Image();
    img.decoding = 'async';
    img.src = src;
  });
};

const CafeHome: React.FC = () => {
  const [testiIndex, setTestiIndex] = useState(0);
  useCafeGlide();

  useEffect(() => {
    window.scrollTo(0, 0);
    warmCafeAssets();

    const interval = window.setInterval(() => {
      setTestiIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF9F5] font-sans selection:bg-[#A4715E] selection:text-white overflow-x-hidden">
      <CafeNavbar />

      {/* FLOATING BOOKING TAB */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[100] hidden lg:block">
        <Link
          to="/demo/cafe/book"
          className="bg-[#A4715E] text-white py-10 px-4 rounded-l-3xl flex flex-col items-center gap-6 shadow-2xl hover:bg-[#4A403A] transition-all group"
        >
          <Calendar size={20} className="group-hover:scale-110 transition-transform" />
          <span className="[writing-mode:vertical-lr] text-[10px] font-black uppercase tracking-[0.4em]">
            Book A Table
          </span>
        </Link>
      </div>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-28 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/projects/cafe-hero.webp"
            className="w-full h-full object-cover brightness-[0.72]"
            alt="High-end brunch table setting"
            loading="eager"
            fetchPriority="high"
            decoding="sync"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-[#FFF9F5]" />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 text-center lg:text-left">
          <div className="max-w-4xl space-y-10 cafe-hero-rise">
            <h1 className="font-serif text-6xl md:text-[clamp(4rem,9vw,8rem)] leading-[0.85] text-white font-black tracking-tighter drop-shadow-sm">
              SAVOUR THE <br /> <span className="text-[#FDE2E4] italic">MOMENT.</span>
            </h1>
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start pt-4">
              <Link
                to="/demo/cafe/menu"
                className="px-14 py-7 bg-[#A4715E] text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] shadow-[0_20px_50px_rgba(164,113,94,0.35)] hover:bg-white hover:text-[#4A403A] transition-all duration-300 text-center"
              >
                View Our Menu
              </Link>
              <Link
                to="/demo/cafe/book"
                className="px-14 py-7 bg-[#FFF9F5]/95 backdrop-blur-xl border border-white text-[#4A403A] rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] hover:bg-[#4A403A] hover:text-white transition-all duration-300 text-center shadow-lg"
              >
                Reservations
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* LOCATIONS SECTION */}
      <section id="cafe-locations" className="py-36 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-20">
          <div className="space-y-4 cafe-glide-left">
            <span className="text-[#A4715E] font-black text-[11px] uppercase tracking-[0.6em] block">
              Our Flagship Houses
            </span>
            <h2 className="font-serif text-5xl md:text-6xl font-black text-[#4A403A] tracking-tighter uppercase leading-none">
              OUR <br />
              <span className="text-[#A4715E] italic">LOCATIONS.</span>
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 cafe-glide-right">
            <p className="text-[#A4715E]/80 text-base md:text-lg italic max-w-sm border-l-2 border-[#FDE2E4] pl-6">
              "Three sunlit sanctuaries across Bath, the Cotswolds, and Clifton — each pouring house-roasted espresso from morning till dusk."
            </p>
            <Link
              to="/demo/cafe/locations"
              className="inline-flex items-center gap-3 px-7 py-4 bg-[#4A403A] text-white rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:bg-[#A4715E] transition-colors shrink-0 shadow-md"
            >
              <span>Interactive Map</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {CAFE_LOCATIONS.map((loc, idx) => (
            <div
              key={loc.id}
              style={{ transitionDelay: `${idx * 110}ms` }}
              className="cafe-glide-up group bg-white rounded-[3rem] overflow-hidden shadow-[0_25px_60px_rgba(74,64,58,0.08)] border border-[#A4715E]/15 flex flex-col justify-between transition-transform duration-500 hover:-translate-y-3"
            >
              <div>
                <Link to={`/demo/cafe/locations?loc=${loc.id}`} className="block relative aspect-[4/3] overflow-hidden">
                  <img
                    src={loc.img}
                    alt={loc.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="eager"
                    fetchPriority="high"
                    decoding="sync"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#4A403A]/70 via-transparent to-transparent" />
                  <div className="absolute top-5 left-5 inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFF9F5]/95 backdrop-blur-md rounded-full">
                    <MapPin size={12} className="text-[#A4715E]" />
                    <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#4A403A]">
                      {loc.badge}
                    </span>
                  </div>
                </Link>

                <div className="p-8 sm:p-9 space-y-5">
                  <div>
                    <Link to={`/demo/cafe/locations?loc=${loc.id}`}>
                      <h3 className="font-serif text-3xl font-bold text-[#4A403A] group-hover:text-[#A4715E] transition-colors tracking-tight">
                        {loc.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-[#4A403A]/65 italic mt-2 leading-relaxed">{loc.description}</p>
                  </div>

                  <div className="space-y-2.5 pt-2 border-t border-[#A4715E]/10 text-sm">
                    <div className="flex items-center gap-3 text-[#4A403A]">
                      <Navigation size={15} className="text-[#A4715E] shrink-0" />
                      <span className="font-bold">
                        {loc.address}, {loc.city}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[#4A403A]/75">
                      <Clock size={15} className="text-[#A4715E] shrink-0" />
                      <span className="text-[11px] font-black uppercase tracking-widest">{loc.hours}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-8 sm:px-9 pb-8 pt-2 flex items-center gap-3">
                <Link
                  to={`/demo/cafe/locations?loc=${loc.id}`}
                  className="flex-1 py-3.5 px-4 bg-[#FFF9F5] border border-[#A4715E]/25 text-[#4A403A] hover:bg-[#A4715E] hover:text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.25em] text-center transition-colors"
                >
                  View House
                </Link>
                <Link
                  to="/demo/cafe/book"
                  className="flex-1 py-3.5 px-4 bg-[#A4715E] text-white hover:bg-[#4A403A] rounded-2xl font-black text-[10px] uppercase tracking-[0.25em] text-center transition-colors"
                >
                  Book Table
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SEASONAL BANNER */}
      <section className="relative h-[65vh] flex items-center justify-center overflow-hidden">
        <img
          src="/images/projects/cafe-interior.webp"
          alt="The Rose Patisserie"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="sync"
        />
        <div className="absolute inset-0 bg-[#4A403A]/65" />
        <div className="relative z-10 text-center space-y-8 px-6 cafe-glide-up">
          <span className="text-white font-black text-[11px] uppercase tracking-[0.8em] block">
            Seasonal Highlight
          </span>
          <h2 className="font-serif text-5xl md:text-7xl text-[#FDE2E4] font-black uppercase tracking-tighter leading-none">
            THE ROSE <br /> <span className="text-white italic">PATISSERIE.</span>
          </h2>
          <div className="pt-4">
            <Link
              to="/demo/cafe/menu"
              className="inline-block px-12 py-6 bg-white text-[#4A403A] hover:bg-[#A4715E] hover:text-white rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              Discover The Menu
            </Link>
          </div>
        </div>
      </section>

      {/* EXPERIENCE — TEXT & IMAGE SLIDING IN TOWARDS EACH OTHER ON SCROLL */}
      <section className="py-40 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="w-full lg:w-1/2 space-y-10 cafe-glide-left">
              <h2 className="font-serif text-5xl md:text-7xl font-black text-[#4A403A] tracking-tighter uppercase leading-[0.85]">
                CRAFTED <br /> <span className="text-[#A4715E] italic">SPACES.</span>
              </h2>
              <p className="text-xl text-[#A4715E]/80 font-medium italic border-l-4 border-[#FDE2E4] pl-8 leading-relaxed max-w-lg">
                Our flagship cafe is an ode to architectural warmth. Think honed marble counters, natural linens, and the soft scent of freshly ground beans.
              </p>
              <div className="space-y-6 pt-2">
                {[
                  { icon: <Utensils size={18} />, text: 'Artisanal Local Sourcing', to: '/demo/cafe/menu' },
                  { icon: <Coffee size={18} />, text: 'Direct Trade Speciality Brews', to: '/demo/cafe/menu' },
                  { icon: <Sparkles size={18} />, text: 'Hand-Crafted Patisserie', to: '/demo/cafe/about' }
                ].map((item, j) => (
                  <Link key={j} to={item.to} className="flex items-center gap-6 group">
                    <div className="w-14 h-14 bg-[#FDE2E4] text-[#A4715E] flex items-center justify-center rounded-2xl group-hover:scale-110 group-hover:bg-[#A4715E] group-hover:text-white transition-all duration-300 shadow-sm">
                      {item.icon}
                    </div>
                    <span className="text-[12px] font-black uppercase tracking-widest text-[#4A403A] group-hover:text-[#A4715E] transition-colors">
                      {item.text}
                    </span>
                  </Link>
                ))}
              </div>
              <div className="pt-4">
                <Link
                  to="/demo/cafe/about"
                  className="inline-flex items-center gap-4 px-10 py-5 bg-[#4A403A] text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.35em] hover:bg-[#A4715E] transition-colors shadow-lg"
                >
                  <span>Explore Our Story</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            <div className="w-full lg:w-1/2 relative cafe-glide-right">
              <div className="relative aspect-square rounded-[4rem] overflow-hidden shadow-2xl group bg-[#F5EBE4]">
                <img
                  src="/images/projects/cafe-interior.webp"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  alt="Cafe Interior Ambiance"
                  loading="eager"
                  fetchPriority="high"
                  decoding="sync"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-[#FDE2E4] p-10 rounded-[3rem] shadow-2xl border-[8px] border-white hidden md:block">
                <div className="flex items-center gap-3 mb-3">
                  <Star size={18} className="text-[#A4715E] fill-current" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#A4715E]">
                    Atmosphere
                  </span>
                </div>
                <p className="font-serif text-3xl font-bold text-[#4A403A] tracking-tighter">
                  Curated <br /> Tranquility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRIVATE HIRE SECTION — TEXT & IMAGE SLIDING IN TOWARDS EACH OTHER */}
      <section className="py-40 bg-[#0D0D0D] text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10 cafe-glide-left">
            <div className="w-20 h-1 bg-[#A4715E]" />
            <h2 className="font-serif text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">
              THE <br /> <span className="text-[#FDE2E4] italic">PRIVATE</span> CLUB.
            </h2>
            <p className="text-white/60 text-xl font-medium italic leading-relaxed max-w-xl">
              "Available for private events, editorial shoots, and intimate celebrations. Our space becomes your canvas for unforgettable memories."
            </p>
            <div className="flex flex-wrap gap-3">
              {['Weddings', 'Brand Launches', 'Private Dinners', 'Film Shoots'].map((tag) => (
                <Link
                  key={tag}
                  to="/demo/cafe/contact"
                  className="px-7 py-3.5 border border-white/15 rounded-full text-[10px] font-black uppercase tracking-widest hover:border-[#A4715E] hover:bg-[#A4715E] hover:text-white transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
            <Link
              to="/demo/cafe/contact"
              className="inline-flex items-center gap-6 px-12 py-7 bg-[#A4715E] text-white font-black rounded-3xl text-[11px] uppercase tracking-[0.4em] hover:bg-white hover:text-[#4A403A] transition-all duration-300 shadow-2xl group"
            >
              <span>Enquire Now</span>
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
          <div className="relative cafe-glide-right">
            <div className="rounded-[4rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)] group border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=75&w=1000"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                alt="Private Dining Event Space"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-white p-10 rounded-[3rem] shadow-2xl hidden md:block">
              <div className="flex items-center gap-3 mb-2">
                <Users size={14} className="text-[#A4715E]" />
                <p className="text-[#A4715E] font-black text-[10px] uppercase tracking-widest">Capacity</p>
              </div>
              <p className="text-[#4A403A] font-serif text-3xl font-bold tracking-tighter uppercase leading-none">
                Up to 60 <br />
                Guests.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL SLIDER */}
      <section className="py-36 bg-[#FFF9F5] border-y border-[#A4715E]/10">
        <div className="max-w-5xl mx-auto px-6 text-center cafe-glide-up">
          <div className="w-16 h-16 bg-[#FDE2E4] text-[#A4715E] flex items-center justify-center rounded-full mx-auto mb-12 shadow-md">
            <Quote size={28} />
          </div>
          <div className="relative min-h-[260px] flex items-center justify-center mb-10">
            <div key={testiIndex} className="space-y-10 animate-fadeIn">
              <p className="font-serif text-3xl md:text-5xl text-[#4A403A] italic leading-tight tracking-tight">
                "{testimonials[testiIndex].text}"
              </p>
              <div className="flex flex-col items-center gap-4">
                <img
                  src={testimonials[testiIndex].img}
                  className="w-16 h-16 rounded-full border-4 border-white shadow-lg object-cover"
                  alt={testimonials[testiIndex].author}
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <p className="text-[#A4715E] font-black text-xs uppercase tracking-[0.45em] mb-1">
                    {testimonials[testiIndex].author}
                  </p>
                  <p className="text-[#4A403A]/45 text-[10px] font-black uppercase tracking-widest">
                    {testimonials[testiIndex].role}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Show testimonial ${i + 1}`}
                onClick={() => setTestiIndex(i)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  testiIndex === i ? 'bg-[#A4715E] w-12' : 'bg-[#A4715E]/25 w-3 hover:bg-[#A4715E]/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* INSTAGRAM STRIP — 60% SMALLER PICTURES, FULL COLOR OFF THE BAT, EXPANDING IMAGE ON HOVER */}
      <section className="py-24 bg-[#FFF9F5] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-10 flex items-center justify-between">
          <div className="cafe-glide-left">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="block group">
              <h2 className="font-serif text-4xl font-bold text-[#4A403A] tracking-tighter group-hover:text-[#A4715E] transition-colors">
                Follow The Hearth.
              </h2>
              <p className="text-[#A4715E] font-bold text-xs uppercase tracking-widest">@TheHearthCafe</p>
            </a>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="cafe-glide-right flex items-center gap-3 px-6 py-3 rounded-full bg-white border border-[#A4715E]/20 text-[#A4715E] font-black text-[10px] uppercase tracking-widest hover:bg-[#A4715E] hover:text-white transition-all shadow-sm"
          >
            <span>Our Feed</span>
            <Instagram size={18} />
          </a>
        </div>
        <div className="flex gap-4 animate-shimmer-scroll py-2">
          {[...instagramPhotos, ...instagramPhotos, ...instagramPhotos, ...instagramPhotos].map((img, i) => (
            <a
              key={i}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[130px] sm:w-[140px] min-w-[130px] sm:min-w-[140px] aspect-square rounded-2xl overflow-hidden transition-transform duration-500 hover:scale-[1.06] shadow-lg border-[3px] border-white group relative"
            >
              <img
                src={img}
                alt={`The Hearth Instagram ${(i % instagramPhotos.length) + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-[#A4715E]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Heart size={20} className="text-white fill-current drop-shadow" />
              </div>
            </a>
          ))}
        </div>
      </section>

      <CafeFooter />

      <style>{`
        ${CAFE_GLIDE_STYLES}
        @keyframes shimmer-scroll {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .animate-shimmer-scroll {
          animation: shimmer-scroll 52s linear infinite;
          width: max-content;
          display: flex;
          will-change: transform;
        }
        .animate-shimmer-scroll:hover {
          animation-play-state: paused;
        }
        @keyframes cafe-hero-rise {
          from { opacity: 0; transform: translate3d(0, 20px, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        .cafe-hero-rise {
          animation: cafe-hero-rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>
    </div>
  );
};

export default CafeHome;