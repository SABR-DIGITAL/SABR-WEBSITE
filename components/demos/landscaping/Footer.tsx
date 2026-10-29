import React from 'react';
import * as RouterDOM from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowRight, MoveLeft, ShieldCheck, Award } from 'lucide-react';

const Link = (RouterDOM as any).Link || (RouterDOM as any).default?.Link;

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#122419] text-stone-300 pt-20 pb-16 px-6 md:px-12 border-t border-white/10 relative z-10 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-14">
        
        {/* Brand & Mission */}
        <div className="space-y-5">
          <div className="flex flex-col">
            <span className="font-serif font-extrabold text-2xl text-white tracking-tight">
              OAK &amp; ASH
            </span>
            <span className="text-[9px] uppercase font-bold tracking-[0.35em] text-[#E08A5B]">
              ARCHITECTURAL LANDSCAPES
            </span>
          </div>
          <p className="text-stone-400 text-sm leading-relaxed">
            Crafting luxury porcelain terraces, bespoke Cotswold dry-stone masonry, and multi-seasonal garden transformations across Wiltshire, Bath, and the South West since 1988.
          </p>
          <div className="flex items-center gap-4 text-xs text-stone-400 pt-2">
            <div className="flex items-center gap-1.5 text-stone-300 font-medium">
              <Award size={15} className="text-[#E08A5B]" />
              <span>RHS Silver Medalists</span>
            </div>
            <div className="flex items-center gap-1.5 text-stone-300 font-medium">
              <ShieldCheck size={15} className="text-[#E08A5B]" />
              <span>£10m Insured</span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="space-y-4">
          <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-[#E08A5B] font-bold">
            Navigation
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link to="/demo/landscaping" className="hover:text-white transition-colors">
                Home Overview
              </Link>
            </li>
            <li>
              <Link to="/demo/landscaping/services" className="hover:text-white transition-colors">
                Landscaping Services
              </Link>
            </li>
            <li>
              <Link to="/demo/landscaping/about" className="hover:text-white transition-colors">
                Our Craft &amp; Team
              </Link>
            </li>
            <li>
              <Link to="/demo/landscaping/gallery" className="hover:text-white transition-colors">
                Project Showcase
              </Link>
            </li>
            <li>
              <Link to="/demo/landscaping/contact" className="hover:text-white transition-colors">
                Request Free Quote
              </Link>
            </li>
          </ul>
        </div>

        {/* Core Services */}
        <div className="space-y-4">
          <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-[#E08A5B] font-bold">
            Specialisms
          </h4>
          <ul className="space-y-2.5 text-sm text-stone-400">
            <li>Porcelain &amp; Natural Stone Patios</li>
            <li>Bespoke Outdoor Kitchens &amp; Pergolas</li>
            <li>Dry-Stone Walling &amp; Masonry</li>
            <li>Architectural Garden Planting</li>
            <li>Groundwork &amp; Sub-Surface Drainage</li>
          </ul>
        </div>

        {/* Contact & Workshop */}
        <div className="space-y-4">
          <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-[#E08A5B] font-bold">
            Get In Touch
          </h4>
          <div className="space-y-3 text-sm">
            <a 
              href="tel:01672552140" 
              className="flex items-center gap-3 text-white font-semibold hover:text-[#E08A5B] transition-colors"
            >
              <Phone size={15} className="text-[#E08A5B] shrink-0" />
              <span>01672 552 140</span>
            </a>
            <div className="flex items-center gap-3 text-stone-300">
              <Mail size={15} className="text-[#E08A5B] shrink-0" />
              <span className="text-xs">enquiries@oakandashlandscapes.co.uk</span>
            </div>
            <div className="flex items-start gap-3 text-stone-400 text-xs leading-relaxed">
              <MapPin size={15} className="text-[#E08A5B] shrink-0 mt-0.5" />
              <span>The Old Stone Mill, Marlborough, Wiltshire, SN8 1AA</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-stone-400">
        <p>© 2025 Oak &amp; Ash Landscapes. Engineered by SABR Digital.</p>
        <div className="flex items-center gap-6">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-stone-300 hover:text-white transition-colors group"
          >
            <MoveLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span>Return to Portfolio</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
