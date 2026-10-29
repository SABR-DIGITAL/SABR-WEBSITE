import React from 'react';
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { MapPin, Phone, Mail, Instagram, ArrowUpRight, Sparkles } from 'lucide-react';
import { SPA_DATA } from './spaData';

const SpaFooter: React.FC = () => {
  return (
    <footer className="bg-[#070908] text-[#ECE7DF] pt-32 pb-20 px-6 md:px-14 border-t border-white/10 relative z-20 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* TOP EDITORIAL BANNER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20 border-b border-white/10">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.45em] text-emerald-400 font-mono font-bold block">
              SANCTUARY IN THE ANCIENT PINES
            </span>
            <h2 className="font-cinzel text-3xl md:text-5xl font-bold uppercase tracking-tight text-white leading-[1.08]">
              SPEND YOUR REST <br />
              <span className="italic font-cormorant font-normal text-emerald-400">WITH US.</span>
            </h2>
            <p className="text-xs md:text-sm text-white/60 max-w-lg font-light leading-relaxed">
              Verdant Relax Park is the genuine thermal spa-hotel retreat in the middle of 180 acres of private pine woods.
              An authentic private living space where every breath restores calm.
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.3em] text-emerald-400 font-mono font-bold mb-3">
                  LOCATION & GPS
                </h4>
                <p className="text-xs text-white/70 leading-relaxed">
                  {SPA_DATA.brand.address}
                  <br />
                  <span className="text-white/40 font-mono text-[11px] block mt-1">
                    GPS: {SPA_DATA.brand.coordinates}
                  </span>
                </p>
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.3em] text-emerald-400 font-mono font-bold mb-3">
                  RESERVATIONS
                </h4>
                <a
                  href={`tel:${SPA_DATA.brand.phone}`}
                  className="text-xs text-white/80 hover:text-emerald-400 block transition-colors font-mono"
                >
                  {SPA_DATA.brand.phone}
                </a>
                <a
                  href={`mailto:${SPA_DATA.brand.email}`}
                  className="text-xs text-white/80 hover:text-emerald-400 block transition-colors mt-1"
                >
                  {SPA_DATA.brand.email}
                </a>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
              <Link
                to="/demo/spa/book"
                className="inline-flex items-center gap-3 px-8 py-3.5 rounded-none bg-white hover:bg-emerald-400 hover:text-slate-950 text-slate-950 font-bold text-xs uppercase tracking-[0.25em] transition-all shadow-md cursor-pointer border border-white/20"
              >
                <span>RESERVE ONLINE</span>
                <ArrowUpRight size={14} />
              </Link>
              <Link
                to="/demo/spa/suites"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-none bg-white/5 hover:bg-white/10 text-white font-semibold text-xs uppercase tracking-[0.2em] transition-all border border-white/10 cursor-pointer"
              >
                <span>EXPLORE ALL SUITES</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 20 SECTIONS COLUMN LINKS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 py-16 border-b border-white/10 text-xs">
          <div>
            <h5 className="text-[9.5px] uppercase tracking-[0.3em] text-emerald-400 font-mono font-bold mb-4">
              ACCOMMODATION
            </h5>
            <ul className="space-y-2.5 text-white/60">
              <li><Link to="/demo/spa/suites" className="hover:text-white transition-colors">All Suites & Villas</Link></li>
              <li><Link to="/demo/spa/suites?cat=cottages" className="hover:text-white transition-colors">Pine Cottages</Link></li>
              <li><Link to="/demo/spa/suites?cat=chalet" className="hover:text-white transition-colors">Lakeside Chalet</Link></li>
              <li><Link to="/demo/spa/suites?cat=villas" className="hover:text-white transition-colors">Presidential Villas</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-[9.5px] uppercase tracking-[0.3em] text-emerald-400 font-mono font-bold mb-4">
              FOOD & DRINK
            </h5>
            <ul className="space-y-2.5 text-white/60">
              <li><Link to="/demo/spa/dining?venue=food-forest" className="hover:text-white transition-colors">Food & Forest</Link></li>
              <li><Link to="/demo/spa/dining?venue=pich-fire" className="hover:text-white transition-colors">Pich Wood-Fire</Link></li>
              <li><Link to="/demo/spa/dining?venue=pool-bar" className="hover:text-white transition-colors">Thermal Pool Bar</Link></li>
              <li><Link to="/demo/spa/dining?venue=phyto-bar" className="hover:text-white transition-colors">Phyto Herb Lounge</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-[9.5px] uppercase tracking-[0.3em] text-emerald-400 font-mono font-bold mb-4">
              SPA & WELLNESS
            </h5>
            <ul className="space-y-2.5 text-white/60">
              <li><Link to="/demo/spa/treatments?cat=Hydrotherapy" className="hover:text-white transition-colors">Thermal Pools</Link></li>
              <li><Link to="/demo/spa/treatments?cat=Rituals" className="hover:text-white transition-colors">Nordic Rituals</Link></li>
              <li><Link to="/demo/spa/treatments?cat=banya" className="hover:text-white transition-colors">Finnish Banya</Link></li>
              <li><Link to="/demo/spa/treatments?cat=Facials" className="hover:text-white transition-colors">Phyto Facials</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-[9.5px] uppercase tracking-[0.3em] text-emerald-400 font-mono font-bold mb-4">
              ACTIVITIES
            </h5>
            <ul className="space-y-2.5 text-white/60">
              <li><Link to="/demo/spa/activities?act=equestrian" className="hover:text-white transition-colors">Equestrian Trail</Link></li>
              <li><Link to="/demo/spa/activities?act=ebikes" className="hover:text-white transition-colors">Forest E-Bikes</Link></li>
              <li><Link to="/demo/spa/activities?act=yoga" className="hover:text-white transition-colors">Yoga Glasshouse</Link></li>
              <li><Link to="/demo/spa/activities?act=tennis" className="hover:text-white transition-colors">Tennis Courts</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-[9.5px] uppercase tracking-[0.3em] text-emerald-400 font-mono font-bold mb-4">
              EXPERIENCE
            </h5>
            <ul className="space-y-2.5 text-white/60">
              <li><Link to="/demo/spa/philosophy" className="hover:text-white transition-colors">Our Philosophy</Link></li>
              <li><Link to="/demo/spa/transfers" className="hover:text-white transition-colors">Private Transfers</Link></li>
              <li><Link to="/demo/spa/transfers" className="hover:text-white transition-colors">Helipad Inquiries</Link></li>
              <li><Link to="/demo/spa/contact" className="hover:text-white transition-colors">VIP Concierge</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-[9.5px] uppercase tracking-[0.3em] text-emerald-400 font-mono font-bold mb-4">
              ACCOLADES
            </h5>
            <p className="text-[11px] text-white/50 leading-relaxed font-light">
              Winner of European Luxury Hotel Spa Awards 2024 & Sustainable Architectural Sanctuary of the Year.
            </p>
          </div>
        </div>

        {/* BOTTOM STRIP */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40 font-mono">
          <div className="flex items-center gap-4">
            <span className="font-cinzel text-white font-bold tracking-widest">
              {SPA_DATA.brand.name}
            </span>
            <span>·</span>
            <span>© {new Date().getFullYear()} ALL RIGHTS RESERVED.</span>
          </div>
          <div className="text-emerald-400 font-mono text-[10px] tracking-widest uppercase">
            WILTSHIRE PINE RESERVE
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SpaFooter;
