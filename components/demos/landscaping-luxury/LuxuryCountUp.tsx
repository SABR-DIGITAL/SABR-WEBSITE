import React, { useEffect, useRef, useState } from 'react';

interface LuxuryCountUpProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  padZero?: boolean;
  className?: string;
}

export const LuxuryCountUp: React.FC<LuxuryCountUpProps> = ({
  end,
  suffix = '',
  prefix = '',
  duration = 1800,
  padZero = false,
  className = '',
}) => {
  const [value, setValue] = useState(0);
  const elRef = useRef<HTMLSpanElement | null>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const reduceMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      setValue(end);
      return;
    }

    let rafId = 0;

    const startCounting = () => {
      if (hasAnimatedRef.current) return;
      hasAnimatedRef.current = true;
      const startTime = performance.now();

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Smooth easeOutQuart curve
        const eased = 1 - Math.pow(1 - progress, 4);
        const current = Math.round(eased * end);
        setValue(current);

        if (progress < 1) {
          rafId = requestAnimationFrame(tick);
        } else {
          setValue(end);
        }
      };

      rafId = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startCounting();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [end, duration]);

  const formatted =
    padZero && value < 10 && end < 100 ? `0${value}` : String(value);

  return (
    <span ref={elRef} className={`tabular-nums inline-block ${className}`}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};

export default LuxuryCountUp;
