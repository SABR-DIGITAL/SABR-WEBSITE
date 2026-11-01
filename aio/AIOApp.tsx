import React, { useState } from 'react';
import * as RouterDOM from 'react-router-dom';
const { BrowserRouter, Routes, Route, Navigate } = RouterDOM as any;
import IntroPortal from '../components/IntroPortal';
import { cameFromOtherSite } from '../components/introSkip';
import AIONavbar from './components/AIONavbar';
import AIOFooter from './components/AIOFooter';
import AIOHome from './pages/AIOHome';
import WhatIsAIO from './pages/WhatIsAIO';
import AIOServices from './pages/AIOServices';
import FreeAIAudit from './pages/FreeAIAudit';
import AIOFaqs from './pages/AIOFaqs';
import AIOContact from './pages/AIOContact';

const AIOLayout: React.FC = () => (
  <div className="flex min-h-screen flex-col bg-[#fdfbf7]">
    <AIONavbar />
    <div className="flex-1">
      <Routes>
        <Route path="/" element={<AIOHome />} />
        <Route path="/what-is-aio" element={<WhatIsAIO />} />
        <Route path="/services" element={<AIOServices />} />
        <Route path="/free-ai-audit" element={<FreeAIAudit />} />
        <Route path="/faqs" element={<AIOFaqs />} />
        <Route path="/contact" element={<AIOContact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
    <AIOFooter />
  </div>
);

// Its own, single Router (with its own basename) — never nested inside the
// web design site's or the gateway's. See index.tsx for how exactly one of
// the three site roots gets mounted per page load.
const AIOApp: React.FC = () => {
  // Same title card as the web design studio, captioned for this site. It
  // plays on arrival from the gateway, not when switching over from the studio.
  const [showIntro, setShowIntro] = useState(() => !cameFromOtherSite('ai-optimisation'));
  return (
    <BrowserRouter basename="/ai-optimisation">
      {showIntro && <IntroPortal caption="AI Optimisation" onComplete={() => setShowIntro(false)} />}
      <AIOLayout />
    </BrowserRouter>
  );
};

export default AIOApp;
