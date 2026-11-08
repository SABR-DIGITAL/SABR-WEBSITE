import React, { Suspense, lazy, useState, useEffect, useRef, useLayoutEffect, Component } from 'react';
// Fix react-router-dom missing exports
import * as RouterDOM from 'react-router-dom';
const { BrowserRouter, Routes, Route, Navigate, Link, useLocation, useNavigate } = RouterDOM as any;
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUp } from 'lucide-react';
import IntroPortal from './components/IntroPortal';
import { arrivedFromWithinSite } from './components/introSkip';
import Navbar from './components/Navbar';
import ExitPreviewButton from './components/ExitPreviewButton';

// Home components
import Hero from './components/Hero';
import StatsSection from './components/StatsSection';
import WebsiteScoreScanner from './components/WebsiteScoreScanner';
import WhyWebsiteSection from './components/WhyWebsiteSection';
import AboutFounderSection from './components/AboutFounderSection';

// The studio's own pages stay in this chunk so moving between them never waits on the network.
import ProjectsGallery from './pages/ProjectsGallery';
import SnakeTimeline from './components/SnakeTimeline';
import FAQSection from './components/FAQSection';
import ContactForm from './components/ContactForm';
import NotFound from './components/NotFound';

// Demo websites. Each is its own route chunk, so a visitor only downloads a
// demo when they are about to look at it. The gallery warms every demo chunk
// while the browser is idle (and again on hover of a "View demo" link), the
// router keeps the current page on screen until a chunk has arrived, and a
// direct /demo/... link starts the chunk download alongside this file (see
// index.tsx) — so in practice nobody sees a loading state.
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

const LandscaperTraditionalHome = lazy(() => import('./components/demos/landscaping-traditional/TraditionalHome'));
const LandscaperTraditionalServices = lazy(() => import('./components/demos/landscaping-traditional/TraditionalServices'));
const LandscaperTraditionalAbout = lazy(() => import('./components/demos/landscaping-traditional/TraditionalAbout'));
const LandscaperTraditionalGallery = lazy(() => import('./components/demos/landscaping-traditional/TraditionalGallery'));
const LandscaperTraditionalContact = lazy(() => import('./components/demos/landscaping-traditional/TraditionalContact'));

const LandscaperLuxuryHome = lazy(() => import('./components/demos/landscaping-luxury/LuxuryHome'));
const LandscaperLuxuryServices = lazy(() => import('./components/demos/landscaping-luxury/LuxuryServices'));
const LandscaperLuxuryAbout = lazy(() => import('./components/demos/landscaping-luxury/LuxuryAbout'));
const LandscaperLuxuryGallery = lazy(() => import('./components/demos/landscaping-luxury/LuxuryGallery'));
const LandscaperLuxuryContact = lazy(() => import('./components/demos/landscaping-luxury/LuxuryContact'));

const CafeHome = lazy(() => import('./components/demos/cafe/CafeHome'));
const CafeMenu = lazy(() => import('./components/demos/cafe/CafeMenu'));
const CafeLocations = lazy(() => import('./components/demos/cafe/CafeLocations'));
const CafeAbout = lazy(() => import('./components/demos/cafe/CafeAbout'));
const CafeContact = lazy(() => import('./components/demos/cafe/CafeContact'));
const CafeBooking = lazy(() => import('./components/demos/cafe/CafeBooking'));

const PhysioHome = lazy(() => import('./components/demos/physio/PhysioHome'));
const PhysioPrices = lazy(() => import('./components/demos/physio/PhysioPrices'));
const PhysioTeam = lazy(() => import('./components/demos/physio/PhysioTeam'));
const PhysioFAQ = lazy(() => import('./components/demos/physio/PhysioFAQ'));
const PhysioContact = lazy(() => import('./components/demos/physio/PhysioContact'));

const SpaHome = lazy(() => import('./components/demos/spa/SpaHome'));
const SpaSuites = lazy(() => import('./components/demos/spa/SpaSuites'));
const SpaTreatments = lazy(() => import('./components/demos/spa/SpaTreatments'));
const SpaDining = lazy(() => import('./components/demos/spa/SpaDining'));
const SpaActivities = lazy(() => import('./components/demos/spa/SpaActivities'));
const SpaPhilosophy = lazy(() => import('./components/demos/spa/SpaPhilosophy'));
const SpaTransfers = lazy(() => import('./components/demos/spa/SpaTransfers'));
const SpaContact = lazy(() => import('./components/demos/spa/SpaContact'));
const SpaBooking = lazy(() => import('./components/demos/spa/SpaBooking'));

gsap.registerPlugin(ScrollTrigger);

export type Page = 'home' | 'work' | 'about' | 'process' | 'faq' | 'contact';

// Real, crawlable URLs — one per section, so every page can be indexed,
// shared and shown as a sitelink under the search result.
export const PAGE_PATHS: Record<Page, string> = {
  home: '/',
  work: '/projects',
  about: '/#about',
  process: '/process',
  faq: '/faq',
  contact: '/contact'
};

const PATH_PAGES: Record<string, Page> = {
  '/': 'home',
  '/projects': 'work',
  '/about': 'home',
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
    if (hash === '#about') {
      setTimeout(() => {
        const el = document.getElementById('about');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }, 150);
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
  }, [pathname, hash, key]);
  return null;
};

const ComponentBase: any = Component;

class ErrorBoundary extends ComponentBase {
  state = { hasError: false, error: null, retryCount: 0, lastResetKey: '' };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  static getDerivedStateFromProps(_props: any, state: any) {
    const currentPath = typeof window !== 'undefined' ? window.location.pathname + window.location.search : '';
    if (currentPath && currentPath !== state.lastResetKey) {
      return {
        hasError: false,
        error: null,
        retryCount: 0,
        lastResetKey: currentPath
      };
    }
    return null;
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Captured by ErrorBoundary:', error, errorInfo);
    if (this.state.retryCount < 3) {
      this.setState((prev: any) => ({
        hasError: false,
        error: null,
        retryCount: (prev.retryCount || 0) + 1
      }));
    }
  }

  render() {
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : 'root';
    if (this.state.hasError && this.state.retryCount >= 3) {
      return (
        <div className="min-h-screen bg-[#F4F1EA] flex flex-col items-center justify-center p-8 text-center">
          <div className="max-w-md bg-white p-8 rounded-2xl shadow-xl border border-stone-200">
            <h2 className="text-xl font-bold text-stone-900 mb-2">Notice</h2>
            <p className="text-sm text-stone-600 mb-6">A page component encountered an issue. Click below to continue.</p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null, retryCount: 0 });
              }}
              className="px-6 py-2.5 bg-emerald-600 text-white rounded-full text-xs uppercase font-bold tracking-wider hover:bg-emerald-500 transition-colors"
            >
              Refresh View
            </button>
          </div>
        </div>
      );
    }
    return (
      <div key={`${currentPath}-${this.state.retryCount}`}>
        {this.props.children}
      </div>
    );
  }
}

const SITE_URL = 'https://sabrdigital.co.uk/web-design';

const SEO_META: Record<Page, { title: string; description: string }> = {
  home: {
    title: 'Web Design Wiltshire & UK Website Creation | SABR Digital',
    description: 'Bespoke, high-speed websites for ambitious small businesses in Wiltshire and across the UK. Engineered for top Google rankings, conversions, and AI search.'
  },
  work: {
    title: 'Website Projects & Interactive Demos | SABR Digital Wiltshire',
    description: 'Explore custom websites built for trades, salons, clinics, and hospitality. Clean code, sub-second load times, and conversion-focused design across the UK.'
  },
  about: {
    title: 'About SABR Digital | Wiltshire Web Designer & AI Studio',
    description: 'Meet Raphael, founder of SABR Digital in Wiltshire. Custom web engineering with zero WordPress bloat, sub-second load times, and built-in AI search readiness.'
  },
  process: {
    title: 'Our Web Design Process | 5-Step Transparent Build | SABR',
    description: 'From first chat to live launch in 2 to 3 weeks. See our transparent web design process with fixed pricing, clear communication, and complete client ownership.'
  },
  faq: {
    title: 'Web Design FAQs | Pricing, Timelines & SEO | SABR Digital',
    description: 'Clear answers on website costs, deposit terms, 2-3 week build timelines, Google SEO, mobile responsiveness, and hosting for Wiltshire & UK businesses.'
  },
  contact: {
    title: 'Contact SABR Digital | Wiltshire Web Design & AI Optimisation',
    description: 'Get in touch with Raphael at SABR Digital. Fast WhatsApp and email responses within 12 hours. Free, honest website advice and fixed written quotes.'
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
  const [showIntro, setShowIntro] = useState(
    () => !window.location.pathname.includes('/demo') && !arrivedFromWithinSite('web-design')
  );
  const [isRevealed, setIsRevealed] = useState(() => !window.location.pathname.includes('/demo') && arrivedFromWithinSite('web-design'));
  const contentRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const isDemo = location.pathname.startsWith('/demo');
  const currentPage: Page = PATH_PAGES[location.pathname] || 'home';

  useSeoMeta(currentPage, location.pathname);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname, location.key]);

  useEffect(() => {
    if (!showIntro && !isDemo) {
      setIsRevealed(true);
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showIntro, isDemo]);

  const firstPath = useRef(location.pathname);
  const hasNavigated = useRef(false);
  if (location.pathname !== firstPath.current) hasNavigated.current = true;
  useEffect(() => {
    if (!contentRef.current) return;
    if (!hasNavigated.current) return;

    if (isDemo) {
      gsap.set(contentRef.current, { clearProps: 'all' });
      return;
    }

    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.42, ease: 'power3.out', force3D: true, clearProps: 'transform' }
    );
  }, [location.pathname, isDemo]);

  const navigateTo = (page: Page) => {
    if (page === 'about') {
      if (location.pathname === '/') {
        const el = document.getElementById('about');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      } else {
        navigate('/#about');
        return;
      }
    }
    const path = PAGE_PATHS[page];
    if (path === location.pathname) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      return;
    }
    navigate(path);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const handleIntroComplete = () => {
    setShowIntro(false);
    setIsRevealed(true);
  };

  // Swapped order per user request:
  // Hero -> About SABR -> WebsiteScoreScanner -> StatsSection (88/100 & 77%/100) -> WhyWebsiteSection (What we do well!)
  const renderHomeContent = () => (
    <>
      <Hero navigateTo={navigateTo} startAnimation={isRevealed} />
      <AboutFounderSection navigateTo={navigateTo} />
      <WebsiteScoreScanner navigateTo={navigateTo} />
      <StatsSection />
      <WhyWebsiteSection />
    </>
  );

  return (
    <div className="relative min-h-screen bg-[#fdfbf7]">
      <ScrollToTop />
      <LegacyHashRedirect />
      {showIntro && <IntroPortal onComplete={handleIntroComplete} />}
      {!isDemo && <Navbar navigateTo={navigateTo} currentPage={currentPage} startAnimation={isRevealed} />}
      {isDemo && <ExitPreviewButton />}
      <div className="flex flex-col min-h-screen relative z-10">
        <main className="relative flex-grow">
          <div ref={contentRef} className="w-full">
            <ErrorBoundary>
              {/* Only ever shown on a direct link straight into a demo, while its
                  chunk is still arriving: the same dark shell index.tsx paints
                  while this file loads, so the sequence reads as one wait, not
                  a flash of the studio's cream page in between. In-app
                  navigation never shows it (see the router's startTransition
                  flag below). */}
              <Suspense fallback={<div aria-hidden="true" className="fixed inset-0 z-[5000] bg-[#0A0D14]" />}>
              <Routes>
                <Route path="/" element={renderHomeContent()} />
                <Route path="/about" element={<Navigate to="/#about" replace />} />
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
                <Route path="/demo/landscaping-traditional" element={<LandscaperTraditionalHome />} />
                <Route path="/demo/landscaping-traditional/services" element={<LandscaperTraditionalServices />} />
                <Route path="/demo/landscaping-traditional/about" element={<LandscaperTraditionalAbout />} />
                <Route path="/demo/landscaping-traditional/gallery" element={<LandscaperTraditionalGallery />} />
                <Route path="/demo/landscaping-traditional/contact" element={<LandscaperTraditionalContact />} />
                <Route path="/demo/landscaping-luxury" element={<LandscaperLuxuryHome />} />
                <Route path="/demo/landscaping-luxury/services" element={<LandscaperLuxuryServices />} />
                <Route path="/demo/landscaping-luxury/about" element={<LandscaperLuxuryAbout />} />
                <Route path="/demo/landscaping-luxury/gallery" element={<LandscaperLuxuryGallery />} />
                <Route path="/demo/landscaping-luxury/contact" element={<LandscaperLuxuryContact />} />
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
                <Route path="/demo/spa" element={<SpaHome />} />
                <Route path="/demo/spa/suites" element={<SpaSuites />} />
                <Route path="/demo/spa/treatments" element={<SpaTreatments />} />
                <Route path="/demo/spa/dining" element={<SpaDining />} />
                <Route path="/demo/spa/activities" element={<SpaActivities />} />
                <Route path="/demo/spa/philosophy" element={<SpaPhilosophy />} />
                <Route path="/demo/spa/transfers" element={<SpaTransfers />} />
                <Route path="/demo/spa/contact" element={<SpaContact />} />
                <Route path="/demo/spa/book" element={<SpaBooking />} />
                <Route path="*" element={<NotFound navigateTo={navigateTo} />} />
              </Routes>
              </Suspense>
            </ErrorBoundary>
          </div>

          {!isDemo && (
            <footer className="py-56 text-center bg-white border-t border-slate-100 relative z-20">
              <div className="max-w-7xl mx-auto px-6">
                <Link
                  to="/"
                  className="inline-block font-syne text-4xl sm:text-6xl md:text-7xl tracking-tighter font-black mb-16 text-slate-950 uppercase hover:opacity-70 transition-opacity focus:outline-none leading-none"
                >
                  SABR <span className="text-emerald-600 italic">DIGITAL</span>
                </Link>
                <nav aria-label="Footer" className="flex flex-wrap justify-center gap-16 mb-24">
                   {(['work', 'about', 'process', 'faq', 'contact'] as Page[]).map(p => (
                     <Link
                       key={p}
                       to={PAGE_PATHS[p]}
                       className="text-[12px] uppercase tracking-[0.6em] text-slate-400 hover:text-emerald-600 transition-all font-black"
                     >
                       {p === 'work' ? 'Projects' : p === 'about' ? 'About' : p === 'process' ? 'Process' : p === 'faq' ? 'FAQ' : 'Contact'}
                     </Link>
                   ))}
                </nav>
                <p className="text-slate-400 text-3xl font-black mb-12 tracking-tight">Built for Growth. Optimized for Success.</p>

                {/* LOCAL SEO: services, coverage and direct contact routes */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-10 text-left max-w-5xl mx-auto mb-20 border-t border-slate-100 pt-20">
                  <div>
                    <h2 className="text-[10px] uppercase tracking-[0.5em] text-emerald-600 font-black mb-6">Web Design Services</h2>
                    <ul className="space-y-3 text-slate-400 text-sm font-medium">
                      <li>Small business web design</li>
                      <li>Website redesign &amp; rebuilds</li>
                      <li>SEO &amp; local search optimisation</li>
                      <li>Hosting, domains &amp; care plans</li>
                    </ul>
                  </div>
                  <div>
                    <h2 className="text-[10px] uppercase tracking-[0.5em] text-emerald-600 font-black mb-6">Areas We Cover</h2>
                    <p className="text-slate-400 text-sm font-medium leading-relaxed">
                      We work with tradespeople, salons, clinics, cafes and other small businesses,
                      wherever they are based. Everything is handled remotely, by call and email.
                    </p>
                  </div>
                  <div>
                    <h2 className="text-[10px] uppercase tracking-[0.5em] text-emerald-600 font-black mb-6">Talk To Us</h2>
                    <ul className="space-y-3 text-sm font-medium">
                      <li>
                        <a href="mailto:Sabrdigitalwilts@gmail.com" className="text-slate-400 hover:text-emerald-600 transition-colors break-words">
                          Sabrdigitalwilts@gmail.com
                        </a>
                      </li>
                      <li>
                        <a href="https://wa.me/447398103339" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-emerald-600 transition-colors">
                          WhatsApp 07398 103339
                        </a>
                      </li>
                      <li className="text-slate-400">Replies within 12 hours</li>
                    </ul>
                  </div>
                </div>

                {/* BACK TO TOP */}
                <div className="flex justify-center mb-16">
                  <button
                    type="button"
                    onClick={scrollToTop}
                    className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-slate-200 bg-slate-50 hover:bg-white hover:border-emerald-600 text-slate-600 hover:text-emerald-600 text-[11px] font-black uppercase tracking-[0.3em] transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1 active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 cursor-pointer"
                    aria-label="Take me to the top"
                  >
                    <span>Take me to the top</span>
                    <ArrowUp size={15} className="transition-transform duration-300 group-hover:-translate-y-1 text-emerald-600" />
                  </button>
                </div>

                {/* LEGAL / COMPLIANCE POLICIES */}
                <div className="border-t border-slate-100 pt-10 mt-12 flex flex-col items-center">
                  <nav aria-label="Legal policies" className="flex flex-wrap justify-center items-center gap-x-6 sm:gap-x-10 gap-y-3 mb-8">
                    <a
                      href="/documents/privacy-policy.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] uppercase tracking-[0.3em] font-bold text-slate-400 hover:text-emerald-600 transition-colors py-1 px-2 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 rounded"
                    >
                      Privacy Policy
                    </a>
                    <span className="text-slate-200 hidden sm:inline" aria-hidden="true">•</span>
                    <a
                      href="/documents/terms-of-service.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] uppercase tracking-[0.3em] font-bold text-slate-400 hover:text-emerald-600 transition-colors py-1 px-2 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 rounded"
                    >
                      Terms of Service
                    </a>
                    <span className="text-slate-200 hidden sm:inline" aria-hidden="true">•</span>
                    <a
                      href="/documents/cookie-policy.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] uppercase tracking-[0.3em] font-bold text-slate-400 hover:text-emerald-600 transition-colors py-1 px-2 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 rounded"
                    >
                      Cookie Policy
                    </a>
                  </nav>

                  <div className="flex flex-col gap-2 items-center">
                    <p className="text-[12px] text-slate-300 uppercase tracking-[0.6em] font-black">© 2025 SABR DIGITAL STUDIO</p>
                    <div className="w-24 h-1.5 bg-emerald-600 rounded-full mt-8"></div>
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
  // v7_startTransition wraps every navigation in React.startTransition, so
  // when a link leads to a demo whose chunk has not arrived yet, the page the
  // visitor is on stays put until it has — no fallback, no blank frame.
  <BrowserRouter basename="/web-design" future={{ v7_startTransition: true }}>
    <MainApp />
  </BrowserRouter>
);

export default App;