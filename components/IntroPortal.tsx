
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface IntroPortalProps {
  onComplete: () => void;
}

const IntroPortal: React.FC<IntroPortalProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const scanLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    const ignitionLine = document.getElementById('ignition');

    if (!ignitionLine || !containerRef.current) {
      onComplete();
      return;
    }

    // 6. High velocity ignition (The Blue Spread) - START IMMEDIATELY
    tl.set(ignitionLine, { 
      display: 'block', 
      scaleX: 0, 
      height: '4px', 
      opacity: 1, 
      top: '50%',
      background: '#2563eb',
      zIndex: 2000
    });
    
    tl.to(ignitionLine, { scaleX: 1, duration: 0.5, ease: "expo.inOut" });
    tl.to(ignitionLine, { height: "100vh", top: 0, duration: 0.6, ease: "expo.inOut" });
    
    tl.to(containerRef.current, { opacity: 0, duration: 0.2 }, "-=0.1");
    
    tl.to(ignitionLine, { 
      opacity: 0, 
      duration: 0.4, 
      onComplete: () => {
        ignitionLine.style.display = 'none';
        onComplete();
      }
    });

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#050608] overflow-hidden">
      {/* Background Grid/Details - Keep subtle for the split second it's visible */}
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-blue-600/30"></div>
        <div className="absolute left-1/2 top-0 h-full w-[1px] bg-blue-600/30"></div>
      </div>
      
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

export default IntroPortal;
