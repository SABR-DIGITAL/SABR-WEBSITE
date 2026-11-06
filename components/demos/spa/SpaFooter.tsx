import React from 'react';
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { ArrowUpRight } from 'lucide-react';
import { SPA_DATA } from './spaData';

const SpaFooter: React.FC = () => {
  return (
    <footer className="bg-[#070908] text-[#ECE7DF] pt-16 sm:pt-24 md:pt-36 pb-14 sm:pb-20 px-5 sm:px-6 md:px-14 border-t border-white/10 relative z-20 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* TOP EDITORIAL BANNER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-16 pb-14 sm:pb-24 border-b border-white/10">
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            <span className="text-[10px] uppercase tracking-[0.45em] text-emerald-400 font-mono font-bold block">
              SANCTUARY IN THE ANCIENT PINES
            </span>
            <h2 className="font-cinzel text-3xl md:text-5xl font-bold uppercase tracking-tight text-white leading-[1.12]">
              RESTORE STILLNESS <br />
              <span className="italic font-cormorant font-normal text-emerald-400">IN THE WOODS.</span>
            </h2>
            <p className="text-sm text-white/60 max-w-md font-light leading-relaxed">
              A private thermal spa and woodland retreat set across 180 acres of Wiltshire pine reserve.
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between gap-8 sm:gap-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
              <div className="space-y-2.5 sm:space-y-3">
                <h4 className="text-[10px] uppercase tracking-[0.3em] text-emerald-400 font-mono font-bold">
                  ESTATE LOCATION
                </h4>
                <p className="text-sm text-white/70 font-light leading-relaxed">
                  {SPA_DATA.brand.address}
                </p>
              </div>
              <div className="space-y-2.5 sm:space-y-3">
                <h4 className="text-[10px] uppercase tracking-[0.3em] text-emerald-400 font-mono font-bold">
                  DIRECT CONCIERGE
                </h4>
                <a
                  href={`tel:${SPA_DATA.brand.phone}`}
                  className="text-sm text-white/80 hover:text-emerald-400 block transition-colors font-mono"
                >
                  {SPA_DATA.brand.phone}
                </a>
                <a
                  href={`mailto:${SPA_DATA.brand.email}`}
                  className="text-sm text-white/70 hover:text-emerald-400 block transition-colors font-light break-all"
                >
                  {SPA_DATA.brand.email}
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-4 sm:gap-6 pt-6 border-t border-white/10">
              <Link
                to="/demo/spa/book"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-none bg-white hover:bg-emerald-400 hover:text-slate-950 text-slate-950 font-bold text-xs uppercase tracking-[0.25em] transition-all cursor-pointer"
              >
                <span>RESERVE YOUR STAY</span>
                <ArrowUpRight size={14} />
              </Link>
              <Link
                to="/demo/spa/suites"
                className="text-xs font-mono uppercase tracking-[0.25em] text-white/60 hover:text-white transition-colors text-center sm:text-left py-2 sm:py-0"
              >
                EXPLORE RESIDENCES →
              </Link>
            </div>
          </div>
        </div>

        {/* NAVIGATION DIRECTORY */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12 py-12 sm:py-20 border-b border-white/10 text-xs">
          <div>
            <h5 className="text-[10px] uppercase tracking-[0.22em] sm:tracking-[0.3em] text-emerald-400 font-mono font-bold mb-4 sm:mb-5">
              ACCOMMODATION
            </h5>
            <ul className="space-y-2.5 sm:space-y-3 text-white/60 font-light">
              <li><Link to="/demo/spa/suites" className="hover:text-white transition-colors">All Suites & Villas</Link></li>
              <li><Link to="/demo/spa/suites?cat=cottages" className="hover:text-white transition-colors">Pine Glass Cottages</Link></li>
              <li><Link to="/demo/spa/suites?cat=chalet" className="hover:text-white transition-colors">Lakeside Chalets</Link></li>
              <li><Link to="/demo/spa/suites?cat=villas" className="hover:text-white transition-colors">Presidential Villas</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-[10px] uppercase tracking-[0.22em] sm:tracking-[0.3em] text-emerald-400 font-mono font-bold mb-4 sm:mb-5">
              DINING & LOUNGES
            </h5>
            <ul className="space-y-2.5 sm:space-y-3 text-white/60 font-light">
              <li><Link to="/demo/spa/dining?venue=food-forest" className="hover:text-white transition-colors">Food & Forest</Link></li>
              <li><Link to="/demo/spa/dining?venue=pich-fire" className="hover:text-white transition-colors">The Hearth Kitchen</Link></li>
              <li><Link to="/demo/spa/dining?venue=pool-bar" className="hover:text-white transition-colors">Thermal Pool Terrace</Link></li>
              <li><Link to="/demo/spa/dining?venue=phyto-bar" className="hover:text-white transition-colors">Botanical Tea Lounge</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-[10px] uppercase tracking-[0.22em] sm:tracking-[0.3em] text-emerald-400 font-mono font-bold mb-4 sm:mb-5">
              SPA & WELLNESS
            </h5>
            <ul className="space-y-2.5 sm:space-y-3 text-white/60 font-light">
              <li><Link to="/demo/spa/treatments?cat=Hydrotherapy" className="hover:text-white transition-colors">Thermal Mineral Pools</Link></li>
              <li><Link to="/demo/spa/treatments?cat=Rituals" className="hover:text-white transition-colors">Nordic Stone Rituals</Link></li>
              <li><Link to="/demo/spa/treatments?cat=Massages" className="hover:text-white transition-colors">Woodland Massages</Link></li>
              <li><Link to="/demo/spa/treatments?cat=Facials" className="hover:text-white transition-colors">Botanical Facials</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-[10px] uppercase tracking-[0.22em] sm:tracking-[0.3em] text-emerald-400 font-mono font-bold mb-4 sm:mb-5">
              THE SANCTUARY
            </h5>
            <ul className="space-y-2.5 sm:space-y-3 text-white/60 font-light">
              <li><Link to="/demo/spa/activities" className="hover:text-white transition-colors">Reserve Activities</Link></li>
              <li><Link to="/demo/spa/philosophy" className="hover:text-white transition-colors">Our Philosophy</Link></li>
              <li><Link to="/demo/spa/transfers" className="hover:text-white transition-colors">Transfers & Helipad</Link></li>
              <li><Link to="/demo/spa/contact" className="hover:text-white transition-colors">Contact Concierge</Link></li>
            </ul>
          </div>
        </div>

        {/* BOTTOM STRIP */}
        <div className="pt-8 sm:pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40 font-mono text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-4">
            <span className="font-cinzel text-white font-bold tracking-widest">
              {SPA_DATA.brand.name}
            </span>
            <span className="hidden sm:inline">·</span>
            <span>© {new Date().getFullYear()} VERDANT RELAX PARK.</span>
          </div>
          <div className="text-emerald-400 font-mono text-[10px] tracking-widest uppercase">
            WILTSHIRE PINE RESERVE · UNITED KINGDOM
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SpaFooter;
