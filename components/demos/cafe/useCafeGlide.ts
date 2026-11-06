import { useEffect } from 'react';

export const CAFE_GLIDE_STYLES = `
  .cafe-glide-left,
  .cafe-glide-right,
  .cafe-glide-up {
    opacity: 0;
    will-change: transform, opacity;
    transition:
      transform 1.05s cubic-bezier(0.22, 1, 0.36, 1),
      opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .cafe-glide-left {
    transform: translate3d(-56px, 0, 0);
  }
  .cafe-glide-right {
    transform: translate3d(56px, 0, 0);
  }
  .cafe-glide-up {
    transform: translate3d(0, 40px, 0);
  }
  .cafe-glide-left.is-visible,
  .cafe-glide-right.is-visible,
  .cafe-glide-up.is-visible {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
  @media (prefers-reduced-motion: reduce) {
    .cafe-glide-left,
    .cafe-glide-right,
    .cafe-glide-up {
      opacity: 1 !important;
      transform: none !important;
      transition: none !important;
    }
  }
`;

/**
 * Lightweight, zero-crash scroll reveal hook for The Hearth cafe demo.
 * Animates elements with .cafe-glide-left, .cafe-glide-right, and .cafe-glide-up
 * smoothly into place (including text and images sliding towards each other) as the user scrolls.
 */
export const useCafeGlide = (dep?: unknown) => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>('.cafe-glide-left, .cafe-glide-right, .cafe-glide-up')
    );

    if (elements.length === 0) return;

    if (typeof IntersectionObserver === 'undefined') {
      elements.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
        requestAnimationFrame(() => {
          el.classList.add('is-visible');
        });
      } else {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [dep]);
};
