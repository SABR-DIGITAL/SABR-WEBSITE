import React, { useState, useEffect, useRef, Suspense, lazy, useLayoutEffect } from 'react';
// Fix react-router-dom missing exports
import * as RouterDOM from 'react-router-dom';
const { BrowserRouter, Routes, Route, Navigate, Link, useLocation, useNavigate } = RouterDOM as any;
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import IntroPortal from './components/IntroPortal';
import Navbar from './components/Navbar';
import ExitPreviewButton from './components/ExitPreviewButton';

// Home components
import Hero from './components/Hero';
import StatsSection from './components/StatsSection';
import DigitalForge from './components/DigitalForge';
import WhyWebsiteSection from './components/WhyWebsiteSection';

// Lazy Loaded Pages
const ProjectsGallery = lazy(() => import('./pages/ProjectsGallery'));
const EquestrianHome = lazy(() => import('./components/demos/equestrian/EquestrianHome'));
const EquestrianLessons = lazy(() => import('./components/demos/equestrian/EquestrianLessons'));
const EquestrianHorses = lazy(() => import('./components/demos/equestrian/EquestrianHorses'));
const EquestrianFacilities = lazy(() => import('./components/demos/equestrian/EquestrianFacilities'));
const EquestrianFaqs = lazy(() => import('./components/demos/equestrian/EquestrianFaqs'));
const EquestrianContact = lazy(() => import('./components/demos/equestrian/EquestrianContact'));
const EquestrianBooking = lazy(() => import('./components/demos/equestrian/EquestrianBooking'));
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

// The inner pages of a demo are the ones a visitor clicks through next, so once
// a demo's landing page is on screen we quietly fetch the rest of that demo.
// Same import specifiers as above, which means the same chunks — no extra work.
const DEMO_SIBLING_CHUNKS: Record<string, Array<() => Promise<unknown>>> = {
  equestrian: [
    () => import('./components/demos/equestrian/EquestrianLessons'),
    () => import('./components/demos/equestrian/EquestrianHorses'),
    () => import('./components/demos/equestrian/EquestrianFacilities'),
    () => import('./components/demos/equestrian/EquestrianFaqs'),
    () => import('./components/demos/equestrian/EquestrianContact'),
    () => import('./components/demos/equestrian/EquestrianBooking')
  ],
  landscaping: [
    () => import('./components/demos/landscaping/Services'),
    () => import('./components/demos/landscaping/Gallery'),
    () => import('./components/demos/landscaping/About'),
    () => import('./components/demos/landscaping/Contact')
  ],
  cafe: [
    () => import('./components/demos/cafe/CafeMenu'),
    () => import('./components/demos/cafe/CafeLocations'),
    () => import('./components/demos/cafe/CafeAbout'),
    () => import('./components/demos/cafe/CafeContact'),
    () => import('./components/demos/cafe/CafeBooking')
  ],
  physio: [
    () => import('./components/demos/physio/PhysioPrices'),
    () => import('./components/demos/physio/PhysioTeam'),
    () => import('./components/demos/physio/PhysioFAQ'),
    () => import('./components/demos/physio/PhysioContact')
  ]
};

const warmedDemos = new Set<string>();

const warmDemoSiblings = (slug: string) => {
  if (warmedDemos.has(slug)) return;
  const loaders = DEMO_SIBLING_CHUNKS[slug];
  if (!loaders) return;
  warmedDemos.add(slug);
  loaders.forEach((load) => load().catch(() => undefined));
};

gsap.registerPlugin(ScrollTrigger);

export type Page = 'home' | 'work' | 'process' | 'faq' | 'contact';

// Real, crawlable URLs — one per section, so every page can be indexed,
// shared and shown as a sitelink under the search result.
export const PAGE_PATHS: Record<Page, string> = {
  home: '/',
  work: '/projects',
  process: '/process',
  faq: '/faq',
  contact: '/contact'
};

const PATH_PAGES: Record<string, Page> = {
  '/': 'home',
  '/projects': 'work',
  '/process': 'process',
  '/faq': 'faq',
  '/contact': 'contact'
};

// Old links used the hash router (/#/contact). Send anyone arriving on one
// to the matching real URL instead of dropping them on the homepage.
const LegacyHashRedirect = () => {
  const navigate = useNavigate();
  useLayoutEffect(() => {
    const hash = window.location.hash;
    if (!hash.startsWith('#/')) return;
    const path = hash.slice(1).split('?')[0];
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
    if (path !== '/') navigate(path, { replace: true });
  }, [navigate]);
  return null;
};

const ScrollToTop = () => {
  const { pathname, hash, key } = useLocation();
  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
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

// Keeps the document title, description and canonical URL aligned with the
// active page so shared links and search snippets read like a person wrote them.
const SITE_URL = 'https://sabrdigital.co.uk';

const SEO_META: Record<Page, { title: string; description: string }> = {
  home: {
    title: 'SABR Digital | Web Design for Small Businesses',
    description: 'We design and build fast, easy-to-find websites for small businesses. Most sites go live in two to three weeks.'
  },
  work: {
    title: 'Our Work | Website Projects & Live Demos | SABR Digital',
    description: 'Click through websites we have designed for trades, salons, clinics and cafes, then picture the same care applied to your own business.'
  },
  process: {
    title: 'How We Work | The Web Design Process | SABR Digital',
    description: 'First chat, design, build, review, launch, aftercare. Here is exactly what happens when you ask us for a website, and how long each part takes.'
  },
  faq: {
    title: 'Web Design FAQs | Prices, Timings & Hosting | SABR Digital',
    description: 'What a website costs, how long it takes, who owns it, how hosting works and how we help you get found on Google. Straight answers, no jargon.'
  },
  contact: {
    title: 'Contact SABR Digital | Start Your Website',
    description: 'Send a WhatsApp or an email and we will reply within 12 hours. A free, no-pressure chat about your website.'
  }
};

const useSeoMeta = (page: Page, pathname: string) => {
  useEffect(() => {
    if (pathname.startsWith('/demo')) return;
    const meta = SEO_META[page] || SEO_META.home;
    document.title = meta.title;

    const setMeta = (selector: string, attr: string, name: string, content: string) => {
      let tag = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    const url = SITE_URL + (PAGE_PATHS[page] === '/' ? '/' : PAGE_PATHS[page]);

    setMeta('meta[name="description"]', 'name', 'description', meta.description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', meta.title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', meta.description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', url);
    setMeta('meta[property="twitter:title"]', 'property', 'twitter:title', meta.title);
    setMeta('meta[property="twitter:description"]', 'property', 'twitter:description', meta.description);

    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
  }, [page, pathname]);
};

const MainApp: React.FC = () => {
  // Deep links straight into a demo skip the agency intro — the demo has its own
  // opening sequence and two title cards stacked on top of each other reads as a bug.
  const [showIntro, setShowIntro] = useState(
    () => !window.location.pathname.startsWith('/demo')
  );
  const [isRevealed, setIsRevealed] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const isDemo = location.pathname.startsWith('/demo');
  const currentPage: Page = PATH_PAGES[location.pathname] || 'home';

  useSeoMeta(currentPage, location.pathname);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });

    // Debounce refresh to avoid layout thrashing
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname, location.key]);

  useEffect(() => {
    if (!showIntro && !isDemo) {
      // Trigger internal animations immediately after intro is gone
      setIsRevealed(true);

      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [showIntro, isDemo]);

  // Soft cross-fade between pages now that each one is a real route.
  useEffect(() => {
    if (!contentRef.current) return;

    // A leftover GSAP transform on this wrapper would become the containing
    // block for the fixed Exit Preview button, so demos start from a clean slate.
    if (isDemo) {
      gsap.set(contentRef.current, { clearProps: 'all' });
      return;
    }

    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power4.out', force3D: true, clearProps: 'transform' }
    );
  }, [location.pathname, isDemo]);

  // Inside a demo, fetch its remaining pages while the visitor reads the first
  // one, so moving around the demo site feels instant.
  useEffect(() => {
    if (!isDemo) return;
    const slug = location.pathname.split('/')[2];
    if (!slug) return;
    const warm = () => warmDemoSiblings(slug);
    const idle = (window as any).requestIdleCallback;
    if (typeof idle === 'function') {
      const handle = idle(warm, { timeout: 2500 });
      return () => (window as any).cancelIdleCallback?.(handle);
    }
    const timer = window.setTimeout(warm, 1200);
    return () => window.clearTimeout(timer);
  }, [isDemo, location.pathname]);

  const navigateTo = (page: Page) => {
    const path = PAGE_PATHS[page];
    if (path === location.pathname) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      return;
    }
    navigate(path);
  };

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  const renderHomeContent = () => (
    <>
      <Hero navigateTo={navigateTo} startAnimation={isRevealed} />
      <StatsSection />
      <DigitalForge navigateTo={navigateTo} />
      <WhyWebsiteSection />
    </>
  );

  return (
    <div className="relative min-h-screen bg-[#fdfbf7]">
      <ScrollToTop />
      <LegacyHashRedirect />
      {showIntro && <IntroPortal onComplete={handleIntroComplete} />}
      {/* Fixed site navigation bar mounted directly at root viewport level */}
      {!isDemo && <Navbar navigateTo={navigateTo} currentPage={currentPage} startAnimation={isRevealed} />}
      {/* One instance for every demo, mounted outside the animated page wrapper
          so it stays pinned to the viewport wherever the visitor scrolls. */}
      {isDemo && <ExitPreviewButton />}
      <div className="flex flex-col min-h-screen relative z-10">
        <main className="relative flex-grow">
          <div ref={contentRef} className="w-full">
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={renderHomeContent()} />
                <Route path="/process" element={<SnakeTimeline navigateTo={navigateTo} />} />
                <Route path="/faq" element={<FAQSection navigateTo={navigateTo} />} />
                <Route path="/contact" element={<ContactForm />} />
                <Route path="/projects" element={<ProjectsGallery />} />
                <Route path="/demo/equestrian" element={<EquestrianHome />} />
                <Route path="/demo/equestrian/lessons" element={<EquestrianLessons />} />
                <Route path="/demo/equestrian/horses" element={<EquestrianHorses />} />
                <Route path="/demo/equestrian/facilities" element={<EquestrianFacilities />} />
                <Route path="/demo/equestrian/faqs" element={<EquestrianFaqs />} />
                <Route path="/demo/equestrian/contact" element={<EquestrianContact />} />
                <Route path="/demo/equestrian/book" element={<EquestrianBooking />} />
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
                <Route path="/demo/physio" element={<PhysioHome />} />
                <Route path="/demo/physio/prices" element={<PhysioPrices />} />
                <Route path="/demo/physio/team" element={<PhysioTeam />} />
                <Route path="/demo/physio/faq" element={<PhysioFAQ />} />
                <Route path="/demo/physio/contact" element={<PhysioContact />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </div>

          {!isDemo && (
            <footer className="py-56 text-center bg-white border-t border-slate-100 relative z-20">
              <div className="max-w-7xl mx-auto px-6">
                <Link
                  to="/"
                  className="inline-block font-syne text-4xl sm:text-6xl md:text-7xl tracking-tighter font-black mb-16 text-slate-950 uppercase hover:opacity-70 transition-opacity focus:outline-none leading-none"
                >
                  SABR <span className="text-blue-600 italic">DIGITAL</span>
                </Link>
                <nav aria-label="Footer" className="flex flex-wrap justify-center gap-16 mb-24">
                   {(['work', 'process', 'faq', 'contact'] as Page[]).map(p => (
                     <Link
                       key={p}
                       to={PAGE_PATHS[p]}
                       className="text-[12px] uppercase tracking-[0.6em] text-slate-400 hover:text-blue-600 transition-all font-black"
                     >
                       {p === 'work' ? 'Projects' : p === 'process' ? 'Process' : p === 'faq' ? 'FAQ' : 'Contact'}
                     </Link>
                   ))}
                </nav>
                <p className="text-slate-400 text-3xl font-black mb-12 tracking-tight">Built for Growth. Optimized for Success.</p>

                {/* LOCAL SEO: services, coverage and direct contact routes */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-10 text-left max-w-5xl mx-auto mb-20 border-t border-slate-100 pt-20">
                  <div>
                    <h2 className="text-[10px] uppercase tracking-[0.5em] text-blue-600 font-black mb-6">Web Design Services</h2>
                    <ul className="space-y-3 text-slate-400 text-sm font-medium">
                      <li>Small business web design</li>
                      <li>Website redesign &amp; rebuilds</li>
                      <li>SEO &amp; local search optimisation</li>
                      <li>Hosting, domains &amp; care plans</li>
                    </ul>
                  </div>
                  <div>
                    <h2 className="text-[10px] uppercase tracking-[0.5em] text-blue-600 font-black mb-6">Areas We Cover</h2>
                    <p className="text-slate-400 text-sm font-medium leading-relaxed">
                      We work with tradespeople, salons, clinics, cafes and other small businesses,
                      wherever they are based. Everything is handled remotely, by call and email.
                    </p>
                  </div>
                  <div>
                    <h2 className="text-[10px] uppercase tracking-[0.5em] text-blue-600 font-black mb-6">Talk To Us</h2>
                    <ul className="space-y-3 text-sm font-medium">
                      <li>
                        <a href="mailto:Sabrdigitalwilts@gmail.com" className="text-slate-400 hover:text-blue-600 transition-colors break-words">
                          Sabrdigitalwilts@gmail.com
                        </a>
                      </li>
                      <li>
                        <a href="https://wa.me/447398103339" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-600 transition-colors">
                          WhatsApp 07398 103339
                        </a>
                      </li>
                      <li className="text-slate-400">Replies within 12 hours</li>
                    </ul>
                  </div>
                </div>

                {/* LEGAL / COMPLIANCE POLICIES */}
                <div className="border-t border-slate-100 pt-10 mt-12 flex flex-col items-center">
                  <nav aria-label="Legal policies" className="flex flex-wrap justify-center items-center gap-x-6 sm:gap-x-10 gap-y-3 mb-8">
                    <a
                      href="/documents/privacy-policy.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] uppercase tracking-[0.3em] font-bold text-slate-400 hover:text-blue-600 transition-colors py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-600/30 rounded"
                    >
                      Privacy Policy
                    </a>
                    <span className="text-slate-200 hidden sm:inline" aria-hidden="true">•</span>
                    <a
                      href="/documents/terms-of-service.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] uppercase tracking-[0.3em] font-bold text-slate-400 hover:text-blue-600 transition-colors py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-600/30 rounded"
                    >
                      Terms of Service
                    </a>
                    <span className="text-slate-200 hidden sm:inline" aria-hidden="true">•</span>
                    <a
                      href="/documents/cookie-policy.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] uppercase tracking-[0.3em] font-bold text-slate-400 hover:text-blue-600 transition-colors py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-600/30 rounded"
                    >
                      Cookie Policy
                    </a>
                  </nav>

                  <div className="flex flex-col gap-2 items-center">
                    <p className="text-[12px] text-slate-300 uppercase tracking-[0.6em] font-black">© 2025 SABR DIGITAL STUDIO</p>
                    <div className="w-24 h-1.5 bg-blue-600 rounded-full mt-8"></div>
                  </div>
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
  <BrowserRouter>
    <MainApp />
  </BrowserRouter>
);

export default App;