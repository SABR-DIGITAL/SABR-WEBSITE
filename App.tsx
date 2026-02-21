import React, { useState, useEffect, useRef, Suspense, lazy, useLayoutEffect } from 'react';
// Fix react-router-dom missing exports
import * as RouterDOM from 'react-router-dom';
const { HashRouter, Routes, Route, useLocation } = RouterDOM as any;
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import IntroPortal from './components/IntroPortal';
import Navbar from './components/Navbar';

// Home components
import Hero from './components/Hero';
import StatsSection from './components/StatsSection';
import TestimonialCarousel from './components/TestimonialCarousel';
import DigitalForge from './components/DigitalForge';
import WhyWebsiteSection from './components/WhyWebsiteSection';

// Lazy Loaded Pages
const ProjectsGallery = lazy(() => import('./pages/ProjectsGallery'));
const LandscaperHome = lazy(() => import('./components/demos/landscaping/Home'));
const LandscaperContact = lazy(() => import('./components/demos/landscaping/Contact'));
const LandscaperServices = lazy(() => import('./components/demos/landscaping/Services'));
const LandscaperAbout = lazy(() => import('./components/demos/landscaping/About'));
const LandscaperGallery = lazy(() => import('./components/demos/landscaping/Gallery'));

// Cafe Demo Pages
const CafeHome = lazy(() => import('./components/demos/cafe/CafeHome'));
const CafeMenu = lazy(() => import('./components/demos/cafe/CafeMenu'));
const CafeLocations = lazy(() => import('./components/demos/cafe/CafeLocations'));
const CafeAbout = lazy(() => import('./components/demos/cafe/CafeAbout'));
const CafeContact = lazy(() => import('./components/demos/cafe/CafeContact'));
const CafeBooking = lazy(() => import('./components/demos/cafe/CafeBooking'));

const PlumberDemo = lazy(() => import('./components/demos/PlumberDemo'));

// Physio Demo (New)
const PhysioHome = lazy(() => import('./components/demos/physio/PhysioHome'));
const PhysioPrices = lazy(() => import('./components/demos/physio/PhysioPrices'));
const PhysioTeam = lazy(() => import('./components/demos/physio/PhysioTeam'));
const PhysioFAQ = lazy(() => import('./components/demos/physio/PhysioFAQ'));
const PhysioContact = lazy(() => import('./components/demos/physio/PhysioContact'));

// Traditional Sections
const SnakeTimeline = lazy(() => import('./components/SnakeTimeline'));
const FAQSection = lazy(() => import('./components/FAQSection'));
const ContactForm = lazy(() => import('./components/ContactForm'));

gsap.registerPlugin(ScrollTrigger);

export type Page = 'home' | 'work' | 'process' | 'faq' | 'contact';

const ScrollToTop = () => {
  const { pathname, hash, key } = useLocation();
  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname, hash, key]);
  return null;
};

const LoadingFallback = () => (
  <div className="min-h-screen bg-slate-950 flex items-center justify-center">
    <div className="flex flex-col items-center gap-6">
      <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
      <p className="text-blue-600 font-black text-[10px] uppercase tracking-[0.5em] animate-pulse">Loading Experience...</p>
    </div>
  </div>
);

const MainApp: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [isRevealed, setIsRevealed] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const contentRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const isDemo = location.pathname.startsWith('/demo');

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    ScrollTrigger.refresh();
  }, [currentPage, location.pathname, location.key]);

  useEffect(() => {
    if (!showIntro && !isDemo && contentRef.current) {
      const tl = gsap.timeline({
        onStart: () => setIsRevealed(true)
      });
      
      tl.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power4.out',
        clearProps: 'opacity,transform'
      });
      
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
    }
  }, [showIntro, isDemo]);

  const navigateTo = (page: Page) => {
    if (page === 'work') {
      window.location.hash = '/projects';
      return;
    }
    
    gsap.to(contentRef.current, {
      opacity: 0,
      y: 10,
      duration: 0.2,
      ease: 'power3.in',
      onComplete: () => {
        setCurrentPage(page);
        if (window.location.hash !== '#/') {
          window.location.hash = '/';
        }
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
        setTimeout(() => {
          ScrollTrigger.refresh();
          gsap.fromTo(contentRef.current, 
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power4.out' }
          );
        }, 10);
      }
    });
  };

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  const renderHomeContent = () => (
    <>
      <Hero navigateTo={navigateTo} />
      <StatsSection />
      <TestimonialCarousel />
      <DigitalForge navigateTo={navigateTo} />
      <WhyWebsiteSection />
    </>
  );

  const renderPageContent = () => {
    switch (currentPage) {
      case 'home': return renderHomeContent();
      case 'process': return <Suspense fallback={<LoadingFallback />}><SnakeTimeline navigateTo={navigateTo} /></Suspense>;
      case 'faq': return <Suspense fallback={<LoadingFallback />}><FAQSection navigateTo={navigateTo} /></Suspense>;
      case 'contact': return <Suspense fallback={<LoadingFallback />}><ContactForm /></Suspense>;
      default: return renderHomeContent();
    }
  };

  if (showIntro) return <IntroPortal onComplete={handleIntroComplete} />;

  return (
    <div className="relative min-h-screen bg-[#fdfbf7]">
      <ScrollToTop />
      <div className="flex flex-col min-h-screen relative z-10">
        {!isDemo && <Navbar navigateTo={navigateTo} currentPage={currentPage} />}
        <main className="relative flex-grow">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={
                <div 
                  ref={contentRef} 
                  className="w-full" 
                  style={{ opacity: isRevealed ? 1 : 0, transform: isRevealed ? 'none' : 'translateY(30px)' }}
                >
                  {renderPageContent()}
                </div>
              } />
              <Route path="/projects" element={<ProjectsGallery />} />
              <Route path="/demo/landscaping" element={<LandscaperHome />} />
              <Route path="/demo/landscaping/services" element={<LandscaperServices />} />
              <Route path="/demo/landscaping/about" element={<LandscaperAbout />} />
              <Route path="/demo/landscaping/gallery" element={<LandscaperGallery />} />
              <Route path="/demo/landscaping/contact" element={<LandscaperContact />} />
              <Route path="/demo/cafe" element={<CafeHome />} />
              <Route path="/demo/cafe/menu" element={<CafeMenu />} />
              <Route path="/demo/cafe/locations" element={<CafeLocations />} />
              <Route path="/demo/cafe/about" element={<CafeAbout />} />
              <Route path="/demo/cafe/contact" element={<CafeContact />} />
              <Route path="/demo/cafe/book" element={<CafeBooking />} />
              <Route path="/demo/plumber" element={<PlumberDemo />} />
              <Route path="/demo/physio" element={<PhysioHome />} />
              <Route path="/demo/physio/prices" element={<PhysioPrices />} />
              <Route path="/demo/physio/team" element={<PhysioTeam />} />
              <Route path="/demo/physio/faq" element={<PhysioFAQ />} />
              <Route path="/demo/physio/contact" element={<PhysioContact />} />
            </Routes>
          </Suspense>
          
          {!isDemo && (
            <footer className="py-56 text-center bg-white border-t border-slate-100 relative z-20">
              <div className="max-w-7xl mx-auto px-6">
                <button 
                  onClick={() => navigateTo('home')}
                  className="font-syne text-4xl sm:text-6xl md:text-7xl tracking-tighter font-black mb-16 text-slate-950 uppercase hover:opacity-70 transition-opacity focus:outline-none leading-none"
                >
                  SABR <span className="text-blue-600 italic">DIGITAL</span>
                </button>
                <div className="flex flex-wrap justify-center gap-16 mb-24">
                   {['work', 'process', 'faq', 'contact'].map(p => (
                     <button 
                       key={p} 
                       onClick={() => navigateTo(p as Page)} 
                       className="text-[12px] uppercase tracking-[0.6em] text-slate-400 hover:text-blue-600 transition-all font-black"
                     >
                       {p === 'work' ? 'Projects' : p === 'process' ? 'Process' : p === 'faq' ? 'FAQ' : 'Contact'}
                     </button>
                   ))}
                </div>
                <p className="text-slate-400 text-3xl font-black mb-12 tracking-tight">Built for Growth. Optimized for Success.</p>
                <div className="flex flex-col gap-2 items-center">
                  <p className="text-[12px] text-slate-300 uppercase tracking-[0.6em] font-black">© 2025 SABR DIGITAL STUDIO | WILTSHIRE, UK</p>
                  <div className="w-24 h-1.5 bg-blue-600 rounded-full mt-10"></div>
                </div>
              </div>
            </footer>
          )}
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => (
  <HashRouter>
    <MainApp />
  </HashRouter>
);

export default App;