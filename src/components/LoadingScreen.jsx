import React, { useState, useEffect } from 'react';
import { Compass } from 'lucide-react';

export default function LoadingScreen({ onFinish }) {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setVisible(false);
      if (onFinish) onFinish();
      return;
    }

    // Clean up any legacy session flag so refresh always triggers loading
    sessionStorage.removeItem('pbt_seen_loader');

    // Smooth progress animation over ~1000ms
    const startTime = performance.now();
    const duration = 1000;

    const updateProgress = (now) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (elapsed < duration) {
        requestAnimationFrame(updateProgress);
      } else {
        // Start fade-out transition
        setTimeout(() => {
          setFading(true);
          setTimeout(() => {
            setVisible(false);
            if (onFinish) onFinish();
          }, 450);
        }, 120);
      }
    };

    const animFrame = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animFrame);
  }, [onFinish]);

  if (!visible) return null;

  return (
    <div
      className={`premium-loading-screen ${fading ? 'loading-fade-out' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading Penida Breeze Tours"
    >
      <div className="loading-screen-inner">
        <div className="loading-logo-wrap">
          <div className="loading-logo-badge">
            <img
              src="/images/logo.png"
              alt="Penida Breeze Tours"
              className="loading-logo-img"
              width="80"
              height="80"
            />
          </div>
          <div className="loading-brand-text">
            <span className="loading-brand-title">Penida<strong>Breeze</strong> Tours</span>
            <span className="loading-brand-sub">NUSA PENIDA • BALI</span>
          </div>
        </div>

        {/* Minimal Progress Line */}
        <div className="loading-bar-track">
          <div
            className="loading-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="loading-pct-row">
          <span className="loading-pct-label">Preparing your island escape</span>
          <span className="loading-pct-num">{progress}%</span>
        </div>
      </div>
    </div>
  );
}
