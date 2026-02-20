
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface IntroPortalProps {
  onComplete: () => void;
}

const IntroPortal: React.FC<IntroPortalProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    const ignitionLine = document.getElementById('ignition');

    if (!ignitionLine || !textRef.current || !containerRef.current) {
      onComplete();
      return;
    }

    // Smoother entrance with bounce
    tl.fromTo(textRef.current, 
      { opacity: 0, y: 50, scale: 0.9, filter: 'blur(20px)' },
      { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1.4, ease: 'back.out(2)' }
    );

    // Data streams reveal
    tl.fromTo(".intro-detail", 
      { opacity: 0, scaleX: 0 },
      { opacity: 1, scaleX: 1, stagger: 0.03, duration: 1.2, ease: 'expo.out' },
      "-=1.0"
    );

    tl.to(textRef.current, { opacity: 0, scale: 1.1, filter: 'blur(15px)', duration: 0.4, ease: 'power2.in' }, "+=0.6");

    // High velocity ignition
    tl.set(ignitionLine, { 
      display: 'block', 
      scaleX: 0, 
      height: '4px', 
      opacity: 1, 
      top: '50%',
      background: '#2563eb'
    });
    
    tl.to(ignitionLine, { scaleX: 1, duration: 0.3, ease: "expo.inOut" });
    tl.to(ignitionLine, { height: "100vh", top: 0, duration: 0.4, ease: "expo.inOut" });
    
    tl.to(containerRef.current, { opacity: 0, duration: 0.2 }, "-=0.1");
    
    tl.to(ignitionLine, { 
      opacity: 0, 
      duration: 0.2, 
      onComplete: () => {
        ignitionLine.style.display = 'none';
        onComplete();
      }
    });

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#fdfbf7] overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-0 w-full h-[1px] bg-blue-600/30 intro-detail origin-left"></div>
        <div className="absolute top-3/4 left-0 w-full h-[1px] bg-blue-600/30 intro-detail origin-left"></div>
        <div className="absolute left-1/4 top-0 h-full w-[1px] bg-blue-600/30 intro-detail origin-top"></div>
        <div className="absolute left-3/4 top-0 h-full w-[1px] bg-blue-600/30 intro-detail origin-top"></div>
        <div className="absolute top-5 left-5 font-mono text-[8px] intro-detail origin-left">SABR DIGITAL 2025</div>
        <div className="absolute bottom-5 right-5 font-mono text-[8px] intro-detail origin-right">PREMIUM DIGITAL STUDIO</div>
      </div>

      <div ref={textRef} className="text-center z-10 px-6">
        <h1 className="font-syne text-5xl md:text-[10vw] text-slate-900 font-black uppercase tracking-[0.2em] leading-none mb-6">
          SABR DIGITAL
        </h1>
        <div className="flex items-center justify-center gap-8">
          <div className="intro-detail h-[2px] w-24 bg-blue-600 origin-right"></div>
          <p className="text-[10px] text-blue-600 font-black tracking-[1em] uppercase whitespace-nowrap">Digital Performance</p>
          <div className="intro-detail h-[2px] w-24 bg-blue-600 origin-left"></div>
        </div>
      </div>
    </div>
  );
};

export default IntroPortal;
