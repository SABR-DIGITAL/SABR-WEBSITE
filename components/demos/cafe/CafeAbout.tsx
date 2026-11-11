import React, { useEffect } from 'react';
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { Flower2, Heart, Award, ShieldCheck, Sparkles, Map, ArrowRight } from 'lucide-react';
import CafeNavbar from './CafeNavbar';
import CafeFooter from './CafeFooter';
import { useCafeGlide, CAFE_GLIDE_STYLES } from './useCafeGlide';

const CafeAbout: React.FC = () => {
  useCafeGlide();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF9F5] font-sans selection:bg-[#A4715E] selection:text-white overflow-x-hidden">
      <CafeNavbar />

      <section className="pt-28 sm:pt-36 md:pt-48 pb-12 sm:pb-20 px-5 sm:px-6 text-center cafe-glide-up">
        <p className="text-[#A4715E] font-black text-[10px] sm:text-[11px] uppercase tracking-[0.5em] sm:tracking-[0.8em] mb-4 sm:mb-6">
          Our Heritage
        </p>
        <h1 className="font-serif text-4xl sm:text-6xl md:text-[8.5vw] font-black uppercase tracking-tighter text-[#4A403A] leading-none">
          TRUE <span className="text-[#A4715E] italic">CRAFT.</span>
        </h1>
      </section>

      <section className="max-w-7xl mx-auto px-5 sm:px-6 pb-20 sm:pb-36">
        {/* BORN ON THE HIGH STREET — TEXT & IMAGE SLIDE IN TOWARDS EACH OTHER */}
        <div className="flex flex-col lg:flex-row gap-12 sm:gap-16 lg:gap-20 items-center mb-20 sm:mb-36">
          <div className="w-full lg:w-3/5 space-y-6 sm:space-y-10 cafe-glide-left">
            <div className="w-16 h-1.5 bg-[#A4715E]" />
            <h2 className="font-serif text-4xl sm:text-5xl md:text-7xl font-black text-[#4A403A] uppercase tracking-tighter leading-none">
              Born on the <br /> <span className="text-[#A4715E] italic">High Street.</span>
            </h2>
            <p className="text-[#A4715E]/80 text-lg sm:text-xl md:text-2xl font-medium italic border-l-4 border-[#FDE2E4] pl-5 sm:pl-8 leading-relaxed">
              &ldquo;The Hearth started as a single coffee cart in a rainy public park. We believed that even in the rain, a perfect roast could bring people together.&rdquo;
            </p>
            <p className="text-[#4A403A]/70 leading-relaxed text-base sm:text-lg max-w-2xl">
              Our journey has been fueled by a simple obsession: find the best beans, bake the best bread, and build a space where time feels like it&apos;s standing still. We don&apos;t just serve coffee; we host your morning ritual.
            </p>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
              <div className="flex items-center gap-3.5 sm:gap-4">
                <div className="w-11 h-11 sm:w-12 sm:h-12 bg-[#FDE2E4] rounded-full flex items-center justify-center text-[#A4715E]">
                  <Sparkles size={19} />
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#4A403A]/60">
                  Est. 2012 by Julianne Vance
                </p>
              </div>
              <Link
                to="/demo/cafe/locations"
                className="inline-flex items-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 bg-[#A4715E] text-white rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:bg-[#4A403A] transition-colors shadow-md"
              >
                <span>Visit Our Houses</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-2/5 relative cafe-glide-right">
            <div className="relative aspect-[16/11] sm:aspect-[4/5] rounded-[2rem] sm:rounded-[3.5rem] overflow-hidden shadow-2xl border-4 sm:border-[10px] border-white group bg-[#F2E8DF]">
              <img
                src="/images/projects/cafe-interior.webp"
                alt="Cafe Ambiance"
                className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4A403A]/45 to-transparent" />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-white p-10 rounded-[2.5rem] shadow-2xl border-4 border-[#FDE2E4] hidden md:block">
              <Heart size={28} className="text-[#A4715E] mb-3" />
              <p className="font-serif text-2xl font-bold text-[#4A403A]">
                Founder <br /> Led.
              </p>
            </div>
          </div>
        </div>

        {/* Philosophy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10 mb-20 sm:mb-36">
          <div
            style={{ transitionDelay: '0ms' }}
            className="cafe-glide-up p-7 sm:p-12 bg-white rounded-[2rem] sm:rounded-[3.5rem] border border-[#A4715E]/10 shadow-xl text-center space-y-5 sm:space-y-6 hover:-translate-y-2 transition-transform duration-500"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#FDE2E4] text-[#A4715E] flex items-center justify-center rounded-2xl mx-auto">
              <Flower2 size={25} />
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A403A]">Pure Sourcing</h3>
            <p className="text-sm sm:text-base text-[#A4715E]/75 italic leading-relaxed">
              &ldquo;We work exclusively with farmers who share our vision for organic, sustainable harvesting.&rdquo;
            </p>
          </div>
          <div
            style={{ transitionDelay: '120ms' }}
            className="cafe-glide-up p-7 sm:p-12 bg-white rounded-[2rem] sm:rounded-[3.5rem] border border-[#A4715E]/10 shadow-xl text-center space-y-5 sm:space-y-6 hover:-translate-y-2 transition-transform duration-500"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#FDE2E4] text-[#A4715E] flex items-center justify-center rounded-2xl mx-auto">
              <Award size={25} />
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A403A]">Master Roast</h3>
            <p className="text-sm sm:text-base text-[#A4715E]/75 italic leading-relaxed">
              &ldquo;Our baristas undergo a rigorous 6-month certification before they touch the house espresso machine.&rdquo;
            </p>
          </div>
          <div
            style={{ transitionDelay: '240ms' }}
            className="cafe-glide-up p-7 sm:p-12 bg-white rounded-[2rem] sm:rounded-[3.5rem] border border-[#A4715E]/10 shadow-xl text-center space-y-5 sm:space-y-6 hover:-translate-y-2 transition-transform duration-500"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#FDE2E4] text-[#A4715E] flex items-center justify-center rounded-2xl mx-auto">
              <ShieldCheck size={25} />
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A403A]">Safe Haven</h3>
            <p className="text-sm sm:text-base text-[#A4715E]/75 italic leading-relaxed">
              &ldquo;The Hearth is a space for everyone. No laptops after 5 PM, just conversation and community.&rdquo;
            </p>
          </div>
        </div>

        {/* Visual Storytelling — Text & Image Slide In Towards Each Other */}
        <div className="flex flex-col lg:flex-row gap-10 sm:gap-16 items-center">
          <div className="w-full lg:w-2/5 space-y-5 sm:space-y-6 cafe-glide-left">
            <span className="text-[#A4715E] font-black text-[10px] uppercase tracking-[0.5em] block">
              Environment
            </span>
            <h3 className="font-serif text-4xl sm:text-5xl font-black text-[#4A403A] uppercase tracking-tighter">
              THE <br /> <span className="text-[#A4715E] italic">SANCTUARY.</span>
            </h3>
            <p className="text-[#4A403A]/70 text-base sm:text-lg leading-relaxed italic">
              &ldquo;Our furniture is hand-carved from local ash, and our walls are finished with raw lime plaster. Every element breathes.&rdquo;
            </p>
            <div className="pt-1 sm:pt-2">
              <Link
                to="/demo/cafe/menu"
                className="inline-flex items-center gap-3 text-[#A4715E] font-black text-[11px] uppercase tracking-[0.3em] hover:text-[#4A403A] transition-colors"
              >
                <span>Explore Seasonal Menu</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <div className="w-full lg:w-3/5 cafe-glide-right">
            <div className="aspect-[16/10] sm:aspect-video rounded-[2rem] sm:rounded-[3.5rem] overflow-hidden shadow-2xl border-4 sm:border-[10px] border-white relative group bg-[#F2E8DF]">
              <img
                src="/images/projects/cafe-hero.webp"
                className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                alt="Interior Architecture"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-36 bg-[#FDE2E4] relative overflow-hidden text-center">
        <div className="max-w-4xl mx-auto px-6 space-y-10 relative z-10 cafe-glide-up">
          <h2 className="font-serif text-4xl md:text-7xl font-black text-[#A4715E] uppercase tracking-tighter leading-none">
            JOIN OUR <br /> <span className="text-[#4A403A] italic">COMMUNITY.</span>
          </h2>
          <p className="text-[#A4715E] text-xl md:text-2xl font-medium italic">
            &ldquo;Become part of our village ritual. We&apos;re always looking for kind souls to join the team.&rdquo;
          </p>
          <div className="pt-6 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/demo/cafe/contact"
              className="px-14 py-6 bg-[#4A403A] text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.35em] shadow-xl hover:bg-[#A4715E] transition-colors"
            >
              Work With Us
            </Link>
            <Link
              to="/demo/cafe/book"
              className="px-14 py-6 bg-white text-[#4A403A] rounded-2xl font-black text-[11px] uppercase tracking-[0.35em] shadow-lg hover:bg-[#4A403A] hover:text-white transition-colors"
            >
              Reserve A Table
            </Link>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none flex items-center justify-center">
          <Map size={700} />
        </div>
      </section>

      <CafeFooter />
      <style>{CAFE_GLIDE_STYLES}</style>
    </div>
  );
};

export default CafeAbout;
