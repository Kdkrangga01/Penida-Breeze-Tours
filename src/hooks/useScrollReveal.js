import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Enhanced Scroll Reveal Hook
 * Delivers clean, proportional, aesthetic scroll entrance animations.
 * Triggers when elements scroll into view with natural deceleration.
 */
export default function useScrollReveal() {
  const location = useLocation();

  useEffect(() => {
    // Respect user's reduced motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-rotate, [class*="reveal-"]').forEach((el) => {
        el.classList.add('revealed');
      });
      return;
    }

    const revealSelector = '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-rotate, [class*="reveal-"]';

    const revealElement = (el) => {
      if (el.classList.contains('revealed')) return;
      const delay = parseInt(el.dataset.delay || '0', 10);
      if (delay > 0) {
        el.style.transitionDelay = `${delay}ms`;
      }
      // Use requestAnimationFrame for silky smooth frame timing
      requestAnimationFrame(() => {
        el.classList.add('revealed');
      });
    };

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealElement(entry.target);
            intersectionObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -50px 0px', // Triggers 50px into view so user visibly sees the aesthetic motion
      }
    );

    const scanAndObserve = () => {
      const elements = document.querySelectorAll(`${revealSelector}:not(.revealed)`);
      const vh = window.innerHeight;

      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // Immediately reveal only elements that are comfortably visible on initial screen load
        const isInitiallyVisible = rect.top < vh * 0.75 && rect.bottom > 0;

        if (isInitiallyVisible) {
          revealElement(el);
        } else {
          intersectionObserver.observe(el);
        }
      });

      // Also process any .reveal-stagger parent containers
      document.querySelectorAll('.reveal-stagger').forEach((container) => {
        const children = container.querySelectorAll(':scope > *');
        children.forEach((child, idx) => {
          if (!child.dataset.delay && !child.classList.contains('revealed')) {
            child.dataset.delay = String(idx * 90);
            if (!child.matches(revealSelector)) {
              child.classList.add('reveal');
            }
          }
        });
      });
    };

    // Initial scan
    scanAndObserve();

    // Re-scans for late loaded images / content
    const timer1 = setTimeout(scanAndObserve, 80);
    const timer2 = setTimeout(scanAndObserve, 300);

    // MutationObserver to auto-catch dynamically rendered content
    const mutationObserver = new MutationObserver(() => {
      scanAndObserve();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false,
    });

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      intersectionObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [location.pathname]);
}
