 import React, { useState, useEffect } from 'react';

/**
 * Aesthetic Minimalist Top Scroll Progress Bar
 * Clean, lightweight, hardware-accelerated indicator that tracks scroll depth.
 */
export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) {
        setScrollProgress(0);
        return;
      }
      const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
      setScrollProgress(progress);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="scroll-progress-track"
      aria-hidden="true"
    >
      <div
        className="scroll-progress-fill"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />
    </div>
  );
}
