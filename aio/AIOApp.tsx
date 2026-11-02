import React, { useEffect, useState } from 'react';
import * as RouterDOM from 'react-router-dom';
const { BrowserRouter, Routes, Route, Navigate } = RouterDOM as any;
import IntroPortal from '../components/IntroPortal';
import { arrivedFromWithinSite } from '../components/introSkip';
import AIONavbar from './components/AIONavbar';
import AIOFooter from './components/AIOFooter';
import AIOHome from './pages/AIOHome';
import WhatIsAIO from './pages/WhatIsAIO';
import AIOServices from './pages/AIOServices';
import FreeAIAudit from './pages/FreeAIAudit';
import AIOFaqs from './pages/AIOFaqs';
import AIOContact from './pages/AIOContact';

interface AIOLayoutProps {
  startAnimation: boolean;
}

const AIOLayout: React.FC<AIOLayoutProps> = ({ startAnimation }) => (
  <div className="flex min-h-screen flex-col bg-[#fdfbf7]">
    <AIONavbar startAnimation={startAnimation} />
    <div className="flex-1">
      <Routes>
        <Route path="/" element={<AIOHome startAnimation={startAnimation} />} />
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
  // plays only on a fresh arrival — the gateway's panel-fill animation (and a
  // same-site hop from the studio) already is the transition, so this would
  // otherwise just be a second intro stacked on top of the first.
  const [showIntro, setShowIntro] = useState(() => !arrivedFromWithinSite('ai-optimisation'));
  // The hero photo is already on screen (it's the same image the gateway
  // panel just grew to fill), so only the navbar and hero text need to ease
  // in — a beat after mount, once there is no intro curtain sitting on top
  // of them to lift instead.
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    if (showIntro) return;
    // Two frames in, so the hidden state has definitely been painted and the
    // fade actually runs rather than snapping straight to visible.
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setIsRevealed(true));
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [showIntro]);

  return (
    <BrowserRouter basename="/ai-optimisation">
      {showIntro && <IntroPortal caption="AI Optimisation" onComplete={() => setShowIntro(false)} />}
      <AIOLayout startAnimation={isRevealed} />
    </BrowserRouter>
  );
};

export default AIOApp;
