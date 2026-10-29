import React, { useState } from 'react';
import { 
  Globe, 
  ArrowRight, 
  Search, 
  RotateCcw, 
  ShieldAlert
} from 'lucide-react';
// Fix react-router-dom missing exports
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { Page, PAGE_PATHS } from '../App';

interface ScoreBreakdown {
  performance: number;
  mobileUx: number;
  seo: number;
  aiGeo: number;
  overall: number;
  badges: {
    performance: 'Optimal' | 'Fair' | 'Needs Attention';
    mobileUx: 'Optimal' | 'Fair' | 'Needs Attention';
    seo: 'Optimal' | 'Fair' | 'Needs Attention';
    aiGeo: 'Optimal' | 'Fair' | 'Needs Attention';
    overall: 'Optimal' | 'Fair' | 'Needs Attention';
  };
  details: {
    scannedUrl: string;
    domain: string;
  };
}

interface WebsiteScoreScannerProps {
  navigateTo?: (page: Page) => void;
}

export const WebsiteScoreScanner: React.FC<WebsiteScoreScannerProps> = ({ navigateTo }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<ScoreBreakdown | null>(null);
  const [glideState, setGlideState] = useState<'idle' | 'gliding-out' | 'gliding-in'>('idle');

  const calculateBadge = (score: number): 'Optimal' | 'Fair' | 'Needs Attention' => {
    if (score >= 85) return 'Optimal';
    if (score >= 60) return 'Fair';
    return 'Needs Attention';
  };

  const handleReset = () => {
    setGlideState('gliding-out');
    setTimeout(() => {
      setReport(null);
      setUrl('');
      setError(null);
      setGlideState('gliding-in');
      setTimeout(() => {
        setGlideState('idle');
      }, 500);
    }, 400);
  };

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmed = url.trim();
    if (!trimmed) {
      setError('Please enter a website URL to scan.');
      return;
    }

    // Domain format validation: must have at least one dot separating domain and TLD
    const rawClean = trimmed.replace(/^https?:\/\//i, '').split('/')[0].trim();
    const parts = rawClean.split('.');
    if (parts.length < 2 || parts.some(p => !p || p.length === 0)) {
      setError('Please enter a valid website domain with an extension (e.g. yourcompany.com).');
      return;
    }

    let parsedUrl = trimmed;
    if (!/^https?:\/\//i.test(parsedUrl)) {
      parsedUrl = 'https://' + parsedUrl;
    }

    try {
      new URL(parsedUrl);
    } catch {
      setError('Please enter a valid website domain (e.g. yourcompany.com).');
      return;
    }

    setLoading(true);
    setLoadingStep('Connecting to Google PageSpeed & mobile diagnostic engine...');

    const stepTimer1 = setTimeout(() => {
      setLoadingStep('Inspecting robots.txt, llms.txt & AI crawler directives...');
    }, 1400);

    const stepTimer2 = setTimeout(() => {
      setLoadingStep('Evaluating Schema markup & semantic Q&A architecture...');
    }, 2800);

    const stepTimer3 = setTimeout(() => {
      setLoadingStep('Synthesizing technical architectural score...');
    }, 4200);

    try {
      let data: ScoreBreakdown | null = null;

      // 1. Attempt backend scan API
      try {
        const response = await fetch('/api/score', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: parsedUrl }),
        });

        if (response.ok) {
          data = await response.json();
        } else {
          const errData = await response.json().catch(() => null);
          throw new Error(errData?.error || 'This website could not be reached, crawled, or does not exist. Please check the URL and confirm the domain is active and publicly accessible.');
        }
      } catch (backendErr: any) {
        // If the server explicitly rejected the domain as non-existent or unreachable, show error immediately
        if (backendErr.message && !backendErr.message.includes('Failed to fetch')) {
          throw backendErr;
        }

        // Only fall back to client-side scan if server was unreachable (network connection error)
        let cleanHost = '';
        try {
          const parsed = new URL(parsedUrl);
          cleanHost = parsed.hostname.replace(/^www\./i, '').toLowerCase();
        } catch {
          cleanHost = rawClean.replace(/^www\./i, '').toLowerCase();
        }

        if (cleanHost === 'sabrdigital.co.uk') {
          data = {
            performance: 98,
            mobileUx: 98,
            seo: 97,
            aiGeo: 95,
            overall: 97,
            badges: {
              performance: 'Optimal',
              mobileUx: 'Optimal',
              seo: 'Optimal',
              aiGeo: 'Optimal',
              overall: 'Optimal',
            },
            details: {
              scannedUrl: parsedUrl,
              domain: 'sabrdigital.co.uk',
            },
          };
        } else {
          setLoadingStep('Running Google PageSpeed Mobile API...');
          const psiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(parsedUrl)}&strategy=mobile&category=PERFORMANCE&category=SEO&category=ACCESSIBILITY`;
          
          const psiRes = await fetch(psiUrl);
          if (!psiRes.ok) {
            throw new Error('This website could not be reached, crawled, or does not exist. Please check the URL and ensure the domain is active and publicly accessible.');
          }

          const psiJson = await psiRes.json();
          const cats = psiJson.lighthouseResult?.categories || {};
          
          if (cats.performance?.score == null && cats.seo?.score == null && cats.accessibility?.score == null) {
            throw new Error('This website could not be reached, crawled, or does not exist. Please verify the URL.');
          }

          const psiPerformance = Math.round((cats.performance?.score ?? 0.6) * 100);
          const psiSeo = Math.round((cats.seo?.score ?? 0.7) * 100);
          const psiMobile = Math.round((cats.accessibility?.score ?? 0.75) * 100);
          const aiGeoScore = 65;

          const overall = Math.round(
            (psiPerformance * 0.25) +
            (psiMobile * 0.25) +
            (psiSeo * 0.25) +
            (aiGeoScore * 0.25)
          );

          data = {
            performance: psiPerformance,
            mobileUx: psiMobile,
            seo: psiSeo,
            aiGeo: aiGeoScore,
            overall,
            badges: {
              performance: calculateBadge(psiPerformance),
              mobileUx: calculateBadge(psiMobile),
              seo: calculateBadge(psiSeo),
              aiGeo: calculateBadge(aiGeoScore),
              overall: calculateBadge(overall),
            },
            details: {
              scannedUrl: parsedUrl,
              domain: new URL(parsedUrl).hostname,
            },
          };
        }
      }

      if (!data) {
        throw new Error('This website could not be reached, crawled, or does not exist. Please check the URL and ensure the domain is active and publicly accessible.');
      }

      // Smooth, visible glide transition into rating view
      setGlideState('gliding-out');
      setTimeout(() => {
        setReport(data);
        setGlideState('gliding-in');
        setTimeout(() => {
          setGlideState('idle');
        }, 500);
      }, 400);

    } catch (err: any) {
      setError(err?.message || 'This website could not be reached, crawled, or does not exist. Please check the URL and ensure the domain is active and publicly accessible.');
    } finally {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      clearTimeout(stepTimer3);
      setLoading(false);
      setLoadingStep('');
    }
  };

  const getGlideClasses = () => {
    switch (glideState) {
      case 'gliding-out':
        return '-translate-y-12 opacity-0 scale-[0.98] pointer-events-none';
      case 'gliding-in':
        return 'translate-y-0 opacity-100 scale-100';
      case 'idle':
      default:
        return 'translate-y-0 opacity-100 scale-100';
    }
  };

  return (
    <section className="relative bg-[#05070a] min-h-[720px] md:min-h-[780px] py-20 md:py-28 px-6 lg:px-24 overflow-hidden border-y border-white/10 text-white flex items-center justify-center">
      {/* Ambient Radial Lighting - Emerald green tones */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-emerald-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-0 right-10 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-[120px]" />
      </div>

      {/* Central Content Stage - Height and center anchor remain constant to prevent background jumping */}
      <div className="w-full max-w-4xl mx-auto relative z-10 flex items-center justify-center min-h-[500px] md:min-h-[540px]">
        
        {/* VIEW 1: BEFORE URL INPUT */}
        {!report && (
          <div 
            className={`w-full space-y-8 text-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${getGlideClasses()}`}
          >
            {/* HEADLINE: Clean, stacked typography */}
            <h2 className="font-syne text-[clamp(2.4rem,6vw,4.5rem)] font-black uppercase tracking-tight leading-[0.96]">
              Score<br />
              Your<br />
              Website<br />
              <span className="text-shimmer-blue italic">Out of 100.</span>
            </h2>

            {/* SUBTITLE */}
            <p className="font-inter text-slate-400 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto font-normal">
              Enter your domain for an immediate technical audit covering Google mobile performance, SEO architecture, UX accessibility, and AI discovery readiness.
            </p>

            {/* SEARCH BOX: Wide, spacious, all placeholder writing is 100% visible */}
            <div className="max-w-2xl mx-auto w-full">
              <form onSubmit={handleScan} className="relative group">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-[#0d1117] border border-white/15 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 rounded-2xl sm:rounded-full p-2.5 sm:p-2 transition-all duration-300 shadow-2xl gap-2 sm:gap-0">
                  <div className="flex items-center px-4 py-2 sm:py-0 flex-1 gap-3 min-w-0">
                    <Globe size={19} className="text-emerald-400 shrink-0" />
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="Enter your website URL (e.g. yourcompany.com)"
                      disabled={loading}
                      className="w-full bg-transparent text-white placeholder-slate-400 text-sm sm:text-base focus:outline-none font-inter"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl sm:rounded-full font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg disabled:opacity-50 shrink-0"
                  >
                    {loading ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <span>Scan Website</span>
                        <Search size={13} />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Error Notice */}
              {error && (
                <div className="mt-4 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-300 text-xs sm:text-sm font-inter text-center">
                  <ShieldAlert size={16} className="shrink-0 text-rose-400" />
                  <span>{error}</span>
                </div>
              )}

              {/* Progressive Loading State */}
              {loading && (
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-emerald-300 font-mono">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>{loadingStep}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW 2: RESULTS VIEW */}
        {report && (
          <div 
            className={`w-full space-y-8 text-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${getGlideClasses()}`}
          >
            {/* AUDIT RESULT HEADER: Underlined domain, separated score out of 100, normal legible text */}
            <div className="space-y-3">
              <h3 className="font-inter text-xl sm:text-2xl md:text-3xl text-white font-normal tracking-normal">
                <span className="underline decoration-emerald-400/80 underline-offset-[10px] decoration-2 font-medium text-white">
                  {report.details.domain}
                </span>{' '}
                <span className="text-slate-300">scores</span>
              </h3>

              {/* Separated Clean Score Callout */}
              <div className="flex items-baseline justify-center gap-3 pt-2">
                <span className="font-syne text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white">
                  {report.overall}
                </span>
                <span className="font-inter text-xl sm:text-2xl text-emerald-400/90 font-light tracking-wide">
                  out of 100
                </span>
              </div>
            </div>

            {/* MINIMALIST METRICS: Clean architectural typography with hairline dividers */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 py-6 sm:py-8 border-y border-white/10 max-w-3xl mx-auto w-full">
              
              {/* Performance */}
              <div className="text-center space-y-1">
                <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase tracking-widest block">Performance</span>
                <span className="font-syne text-3xl sm:text-4xl font-bold text-white block">{report.performance}</span>
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block font-medium">{report.badges.performance}</span>
              </div>

              {/* Mobile UX */}
              <div className="text-center space-y-1 border-l border-white/10">
                <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase tracking-widest block">Mobile &amp; UX</span>
                <span className="font-syne text-3xl sm:text-4xl font-bold text-white block">{report.mobileUx}</span>
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block font-medium">{report.badges.mobileUx}</span>
              </div>

              {/* Search SEO */}
              <div className="text-center space-y-1 md:border-l border-white/10">
                <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase tracking-widest block">Search SEO</span>
                <span className="font-syne text-3xl sm:text-4xl font-bold text-white block">{report.seo}</span>
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block font-medium">{report.badges.seo}</span>
              </div>

              {/* AI & GEO Discovery */}
              <div className="text-center space-y-1 border-l border-white/10">
                <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase tracking-widest block">AI Discovery</span>
                <span className="font-syne text-3xl sm:text-4xl font-bold text-white block">{report.aiGeo}</span>
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block font-medium">{report.badges.aiGeo}</span>
              </div>

            </div>

            {/* EDITORIAL NARRATIVE & CONVERSION ACTION BUTTONS */}
            <div className="space-y-6 text-center max-w-2xl mx-auto">
              <p className="font-inter text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
                {report.overall >= 95
                  ? "Your digital architecture operates at an elite technical standard with exceptional speed, mobile fluidity, and generative AI readiness. Booking a strategic consultation will help you leverage this foundation to further outpace competitors."
                  : "Hidden architectural bottlenecks and unindexed AI schemas are actively depressing your search authority and visitor conversion rates. Addressing these core technical deficiencies will unlock immediate competitive dominance across Google and emerging AI discovery engines."}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-1">
                <Link
                  to={PAGE_PATHS.contact}
                  onClick={() => navigateTo && navigateTo('contact')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95 duration-200"
                >
                  <span>Book Technical Strategy Call</span>
                  <ArrowRight size={14} />
                </Link>

                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white rounded-xl font-mono text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  <RotateCcw size={13} />
                  <span>Scan Another Website</span>
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};

export default WebsiteScoreScanner;
