import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const HERO_SLIDES = [
  {
    id: 1,
    name: 'Kelingking Beach',
    region: 'Nusa Penida Barat',
    tagline: 'Panorama Megah Tebing T-Rex Samudra Hindia',
    image: '/images/destinations/kelingking-beach.jpg',
    alt: 'Kelingking Beach Nusa Penida Bali',
  },
  {
    id: 2,
    name: 'Diamond Beach',
    region: 'Nusa Penida Timur',
    tagline: 'Surga Pasir Putih & Tangga Tebing Karang Ikonik',
    image: '/images/destinations/diamond-beach.jpg',
    alt: 'Diamond Beach Nusa Penida Bali',
  },
  {
    id: 3,
    name: 'Broken Beach',
    region: 'Nusa Penida Barat',
    tagline: 'Keajaiban Jembatan Karang Alami & Laguna Biru',
    image: '/images/destinations/broken-beach.jpg',
    alt: 'Broken Beach Pasih Uug Nusa Penida',
  },
  {
    id: 4,
    name: 'Crystal Beach',
    region: 'Nusa Penida Barat',
    tagline: 'Air Sebening Kristal & Panorama Sunset Terindah',
    image: '/images/destinations/crystal-bay.jpg',
    alt: 'Crystal Beach Bay Nusa Penida',
  },
  {
    id: 5,
    name: 'Atuh Beach',
    region: 'Nusa Penida Timur',
    tagline: 'Teluk Damai Diapit Formasi Pulau Karang Eksotis',
    image: '/images/destinations/atuh-beach.jpg',
    alt: 'Atuh Beach Nusa Penida Bali',
  },
];

export default function HeroSlider() {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = HERO_SLIDES.length;

  const goToNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const goToPrev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Autoplay 5 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      goToNext();
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused, goToNext]);

  const activeSlide = HERO_SLIDES[current];

  return (
    <section
      className="hero-cinematic"
      aria-label="Penida Breeze Tours Hero Slider"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Images Slider with Smooth Ken Burns */}
      <div className="hero-slider-track">
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === current;
          return (
            <div
              key={slide.id}
              className={`hero-slide-item ${isActive ? 'active' : ''}`}
              aria-hidden={!isActive}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className="hero-slide-img"
                loading={idx === 0 ? 'eager' : 'lazy'}
              />
              <div className="hero-slide-vignette" />
            </div>
          );
        })}
      </div>

      {/* Main Content Layer */}
      <div className="hero-content-container container">
        {/* Proportional Main Title */}
        <h1 className="hero-main-title">
          Explore Nusa Penida<br />
          <span className="hero-title-gradient">Like Never Before</span>
        </h1>

        <p className="hero-main-desc">
          {t('hero.desc')}
        </p>

        {/* Proportional CTAs */}
        <div className="hero-actions-row">
          <Link to="/booking" className="btn btn-hero-primary">
            <span>{t('hero.ctaPrimary')}</span>
            <ArrowRight size={16} strokeWidth={2} className="btn-arrow-motion" aria-hidden="true" />
          </Link>
          <a href="#paket-tour" className="btn btn-hero-secondary">
            <span>{t('hero.ctaSecondary')}</span>
          </a>
        </div>

        {/* Unified Bottom Island Bar */}
        <div className="hero-bottom-bar">
          {/* Active Destination Info */}
          <div className="hero-spot-info">
            <span className="hero-spot-region">{t(`hero.slide.${activeSlide.id}.region`, activeSlide.region)}</span>
            <span className="hero-spot-sep">·</span>
            <strong className="hero-spot-title">{activeSlide.name}</strong>
            <span className="hero-spot-tagline">{t(`hero.slide.${activeSlide.id}.tagline`, activeSlide.tagline)}</span>
          </div>

          {/* Slider Pagination & Controls */}
          <div className="hero-controls-wrap">
            <div className="hero-slider-counter">
              <span className="counter-current">{String(current + 1).padStart(2, '0')}</span>
              <span className="counter-sep">/</span>
              <span className="counter-total">{String(total).padStart(2, '0')}</span>
            </div>

            <div className="hero-progress-track">
              {HERO_SLIDES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrent(i)}
                  className={`hero-progress-step ${i === current ? 'active' : ''}`}
                  aria-label={`Slide ${i + 1}`}
                >
                  <span className="step-bar" />
                </button>
              ))}
            </div>

            <div className="hero-nav-buttons">
              <button
                type="button"
                onClick={goToPrev}
                className="hero-nav-btn"
                aria-label="Slide sebelumnya"
              >
                <ChevronLeft size={16} strokeWidth={2.5} />
              </button>
              <button
                type="button"
                onClick={goToNext}
                className="hero-nav-btn"
                aria-label="Slide selanjutnya"
              >
                <ChevronRight size={16} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
