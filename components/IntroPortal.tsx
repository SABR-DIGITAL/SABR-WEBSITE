import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

interface IntroPortalProps {
  onComplete: () => void;
}

const IntroPortal: React.FC<IntroPortalProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'initial' | 'title' | 'tagline' | 'exit'>('initial');
  const containerRef = useRef<HTMLDivElement>(null);

  // Start sequence on mount
  useEffect(() => {
    const timer = setTimeout(() => setPhase('title'), 100);
    return () => clearTimeout(timer);
  }, []);

  // Handle Tagline phase
  useEffect(() => {
    if (phase === 'title') {
      const timer = setTimeout(() => setPhase('tagline'), 1200); 
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // Handle Exit phase
  useEffect(() => {
    if (phase === 'tagline') {
      const timer = setTimeout(() => setPhase('exit'), 800); 
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // Execute GSAP Exit Animation
  useEffect(() => {
    if (phase === 'exit') {
      const ignitionLine = document.getElementById('ignition');
      const titleElement = document.querySelector('.intro-title');
      const taglineElement = document.querySelector('.intro-tagline');
      
      if (!ignitionLine) {
        onComplete();
        return;
      }

      const tl = gsap.timeline();

      // Ensure initial state for ignition line
      tl.set(ignitionLine, { 
        display: 'block', 
        width: '300px', // Start roughly the size of the "DIGITAL" text
        height: '60px', 
        opacity: 0, // Start invisible then flash in
        top: '50%',
        left: '50%',
        xPercent: -50,
        yPercent: -50,
        background: '#2563eb', // Electric Blue
        boxShadow: '0 0 30px 10px rgba(37, 99, 235, 0.9)', // Stronger Glow
        zIndex: 5000,
        borderRadius: '8px'
      });
      
      // The "Unraveling" Effect
      const exitDuration = 0.8;
      const ease = "power4.inOut";

      // 1. Text splits apart (Title UP, Tagline DOWN)
      if (titleElement) {
        tl.to(titleElement, { y: -150, opacity: 0, scale: 0.9, filter: 'blur(10px)', duration: exitDuration, ease: ease }, 0);
      }
      if (taglineElement) {
        tl.to(taglineElement, { y: 150, opacity: 0, scale: 0.9, filter: 'blur(10px)', duration: exitDuration, ease: ease }, 0);
      }

      // 2. The Blue "Fluid" Unravel
      // Flash in the blue block exactly where the text was
      tl.to(ignitionLine, {
        opacity: 1,
        duration: 0.1,
        ease: "power2.in",
        force3D: true
      }, 0);

      // Expand to horizon
      tl.to(ignitionLine, { 
        width: '120vw', 
        height: '20px', // Flatten
        borderRadius: '100%',
        duration: 0.5, 
        ease: "expo.in",
        force3D: true
      }, 0.1);

      // Engulf screen
      tl.to(ignitionLine, { 
        height: "150vh", // Then engulf the screen
        borderRadius: '0%',
        duration: 0.8, 
        ease: "expo.out",
        force3D: true,
        onComplete: () => {
           // KEY CHANGE: Once fully engulfed, make the portal transparent
           // This ensures that when the blue fades, we see the APP
           if (containerRef.current) {
             gsap.set(containerRef.current, { background: 'transparent' });
           }
        }
      }, ">-0.3"); // Overlap for fluidity
      
      // Fade out the blue screen to reveal the site
      tl.to(ignitionLine, { 
        opacity: 0, 
        duration: 0.8, 
        delay: 0.1,
        ease: "power2.out",
        force3D: true,
        onComplete: () => {
          ignitionLine.style.display = 'none';
          onComplete(); // Trigger app reveal AFTER fade is done
        }
      });
    }
  }, [phase, onComplete]);

  // Title Animation Variants (Cinematic Reveal)
  const titleContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.2
      }
    }
  };

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 80,
      scale: 0.9,
      filter: 'blur(10px)'
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: { 
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] // "Confident" ease (Expo.out feel)
      }
    }
  };

  // Tagline Glitch Variants (Snap in, no float)
  const taglineVariants = {
    hidden: { opacity: 0, scale: 1.1, filter: "blur(5px)" },
    visible: { 
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.1,
        ease: "steps(3)"
      }
    }
  };

  return (
    <div ref={containerRef} className="fixed inset-0 z-[4000] flex flex-col items-center justify-center bg-[#ffffff] overflow-hidden font-syne select-none">
      
      {/* The Blue Ignition Source */}
      <div id="ignition" className="absolute hidden will-change-[width,height,opacity,transform]"></div>

      <div className="flex flex-col items-center justify-center z-10 p-4 text-center relative w-full max-w-5xl">
        
        {/* Main Title - Rendered always but animated */}
        <AnimatePresence>
          {phase !== 'initial' && (
            <motion.h1
              className="intro-title text-[2.5rem] sm:text-[3.2rem] md:text-[5rem] lg:text-[6.8rem] font-black tracking-tighter mb-4 md:mb-8 flex flex-nowrap justify-center overflow-visible whitespace-nowrap"
              variants={titleContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* SABR - Dark Slate */}
              <motion.span 
                variants={letterVariants}
                className="inline-block text-slate-950 pb-2"
              >
                SABR
              </motion.span>

              {/* Spacing */}
              <motion.span variants={letterVariants} className="inline-block w-[0.2em] pb-2"></motion.span>

              {/* DIGITAL - Shimmer Blue */}
              <motion.span 
                variants={letterVariants}
                // Matching the Navbar color scheme exactly (gradient spans the whole word)
                className="inline-block text-shimmer-blue pb-2"
              >
                DIGITAL
              </motion.span>
            </motion.h1>
          )}
        </AnimatePresence>

        {/* Tagline - Always in DOM to preserve layout spacing, animate opacity */}
        <div className="mt-2 h-[40px] md:h-[60px] flex items-center justify-center overflow-visible w-full">
            <AnimatePresence>
                {(phase === 'tagline' || phase === 'exit') && (
                <motion.div
                    className="intro-tagline relative"
                    initial="hidden"
                    animate="visible"
                    variants={taglineVariants}
                >
                    <p 
                    className="text-lg md:text-2xl font-bold tracking-[0.3em] md:tracking-[0.6em] text-blue-600 uppercase glitch-text"
                    data-text="BUILT FOR THE AMBITIOUS"
                    >
                    Built for the Ambitious
                    </p>
                </motion.div>
                )}
            </AnimatePresence>
        </div>

      </div>
      
      {/* Glitch CSS Styles - Electric Blue Theme */}
      <style>{`
        .glitch-text {
          position: relative;
          animation: glitch-skew 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
          /* Ensure font matches */
          font-family: 'Syne', sans-serif;
        }
        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.8;
          background: #ffffff; /* Hide main text behind glitch layers if needed */
        }
        /* Electric Blue Layer 1 */
        .glitch-text::before {
          left: 2px;
          text-shadow: -2px 0 #3b82f6; /* Blue-500 */
          clip: rect(44px, 450px, 56px, 0);
          animation: glitch-anim 2s infinite linear alternate-reverse;
          z-index: -1;
        }
        /* Electric Cyan Layer 2 */
        .glitch-text::after {
          left: -2px;
          text-shadow: -2px 0 #06b6d4; /* Cyan-500 */
          clip: rect(44px, 450px, 56px, 0);
          animation: glitch-anim2 2s infinite linear alternate-reverse;
          z-index: -2;
        }
        
        @keyframes hyper-shimmer {
          0% { background-position: 200% center; }
          100% { background-position: 0% center; }
        }
        .animate-hyper-shimmer {
          animation: hyper-shimmer 4s linear infinite;
        }

        @keyframes glitch-anim {
          0% { clip: rect(42px, 9999px, 44px, 0); }
          5% { clip: rect(12px, 9999px, 59px, 0); }
          10% { clip: rect(48px, 9999px, 29px, 0); }
          15.0% { clip: rect(42px, 9999px, 73px, 0); }
          20% { clip: rect(63px, 9999px, 27px, 0); }
          25% { clip: rect(34px, 9999px, 55px, 0); }
          30.0% { clip: rect(86px, 9999px, 73px, 0); }
          35% { clip: rect(20px, 9999px, 20px, 0); }
          40% { clip: rect(26px, 9999px, 60px, 0); }
          45% { clip: rect(25px, 9999px, 66px, 0); }
          50% { clip: rect(57px, 9999px, 98px, 0); }
          55.0% { clip: rect(5px, 9999px, 46px, 0); }
          60.0% { clip: rect(82px, 9999px, 31px, 0); }
          65% { clip: rect(54px, 9999px, 27px, 0); }
          70% { clip: rect(28px, 9999px, 99px, 0); }
          75% { clip: rect(45px, 9999px, 69px, 0); }
          80% { clip: rect(23px, 9999px, 85px, 0); }
          85.0% { clip: rect(54px, 9999px, 84px, 0); }
          90% { clip: rect(45px, 9999px, 47px, 0); }
          95% { clip: rect(37px, 9999px, 20px, 0); }
          100% { clip: rect(4px, 9999px, 91px, 0); }
        }
        @keyframes glitch-anim2 {
          0% { clip: rect(65px, 9999px, 100px, 0); }
          5% { clip: rect(52px, 9999px, 74px, 0); }
          10% { clip: rect(79px, 9999px, 85px, 0); }
          15.0% { clip: rect(75px, 9999px, 5px, 0); }
          20% { clip: rect(67px, 9999px, 61px, 0); }
          25% { clip: rect(14px, 9999px, 79px, 0); }
          30.0% { clip: rect(1px, 9999px, 66px, 0); }
          35% { clip: rect(86px, 9999px, 30px, 0); }
          40% { clip: rect(23px, 9999px, 98px, 0); }
          45% { clip: rect(85px, 9999px, 72px, 0); }
          50% { clip: rect(71px, 9999px, 75px, 0); }
          55.0% { clip: rect(2px, 9999px, 48px, 0); }
          60.0% { clip: rect(30px, 9999px, 16px, 0); }
          65% { clip: rect(59px, 9999px, 50px, 0); }
          70% { clip: rect(41px, 9999px, 62px, 0); }
          75% { clip: rect(2px, 9999px, 82px, 0); }
          80% { clip: rect(47px, 9999px, 73px, 0); }
          85.0% { clip: rect(3px, 9999px, 27px, 0); }
          90% { clip: rect(26px, 9999px, 55px, 0); }
          95% { clip: rect(42px, 9999px, 97px, 0); }
          100% { clip: rect(38px, 9999px, 49px, 0); }
        }
        @keyframes glitch-skew {
          0% { transform: skew(0deg); }
          10% { transform: skew(-2deg); }
          20% { transform: skew(2deg); }
          30% { transform: skew(0deg); }
          40% { transform: skew(0deg); }
          50% { transform: skew(-0.5deg); }
          60% { transform: skew(1deg); }
          70% { transform: skew(0deg); }
          80% { transform: skew(0deg); }
          90% { transform: skew(0deg); }
          100% { transform: skew(0deg); }
        }
      `}</style>
    </div>
  );
};

export default IntroPortal;