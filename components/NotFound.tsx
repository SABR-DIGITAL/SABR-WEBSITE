import React from 'react';
import { ArrowLeft, Home, MessageSquare } from 'lucide-react';
// Fix react-router-dom missing exports
import * as RouterDOM from 'react-router-dom';
const { Link } = RouterDOM as any;
import { Page, PAGE_PATHS } from '../App';

interface NotFoundProps {
  navigateTo: (page: Page) => void;
}

const NotFound: React.FC<NotFoundProps> = ({ navigateTo }) => {
  return (
    <main 
      id="main-content"
      role="main" 
      className="min-h-[85vh] flex items-center justify-center bg-[#fdfbf7] px-6 py-24 sm:py-32"
    >
      <div className="max-w-2xl mx-auto text-center space-y-8">
        
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-[11px] font-mono uppercase tracking-[0.25em] font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
          <span>Error 404 &middot; Page Not Found</span>
        </div>

        {/* Headline matching SABR Digital typography */}
        <div className="space-y-4">
          <h1 className="font-syne text-4xl sm:text-6xl md:text-7xl font-black text-slate-950 tracking-tight leading-[1.02] uppercase">
            Lost in the <br />
            <span className="text-shimmer-blue italic font-black">Countryside?</span>
          </h1>
          <p className="font-inter text-slate-600 text-sm sm:text-base md:text-lg max-w-lg mx-auto leading-relaxed">
            The page you are looking for does not exist, has been relocated, or is currently being engineered.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            to="/"
            onClick={() => navigateTo('home')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-slate-950 hover:bg-emerald-600 text-white rounded-full font-semibold text-xs uppercase tracking-wider transition-[transform,background-color] duration-200 ease-out shadow-md hover:scale-105 active:scale-95 transform-gpu"
          >
            <Home size={15} />
            <span>Return to Homepage</span>
          </Link>

          <Link
            to={PAGE_PATHS.contact}
            onClick={() => navigateTo('contact')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-white hover:bg-stone-100 text-slate-900 border border-stone-200 rounded-full font-semibold text-xs uppercase tracking-wider transition-[transform,background-color] duration-200 ease-out shadow-sm hover:scale-105 active:scale-95 transform-gpu"
          >
            <MessageSquare size={15} />
            <span>Contact Studio</span>
          </Link>
        </div>

        {/* Breadcrumb text hint */}
        <p className="text-xs font-mono text-slate-400 pt-8 uppercase tracking-widest">
          SABR DIGITAL &middot; WILTSHIRE WEB DESIGN &middot; UK
        </p>

      </div>
    </main>
  );
};

export default NotFound;
