import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Compass, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Indonesian Flag SVG
function FlagIndonesia({ className = 'lang-flag-svg' }) {
  return (
    <svg
      width="16"
      height="11"
      viewBox="0 0 16 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="16" height="11" rx="2" fill="#F8FAFC" />
      <path d="M0 2C0 0.895431 0.895431 0 2 0H14C15.1046 0 16 0.895431 16 2V5.5H0V2Z" fill="#E11D48" />
      <path d="M0 5.5H16V9C16 10.1046 15.1046 11 14 11H2C0.895431 11 0 10.1046 0 9V5.5Z" fill="#FFFFFF" />
      <rect x="0.5" y="0.5" width="15" height="10" rx="1.5" stroke="rgba(0,0,0,0.15)" strokeWidth="0.8" />
    </svg>
  );
}

// United Kingdom / English Flag SVG
function FlagEnglish({ className = 'lang-flag-svg' }) {
  return (
    <svg
      width="16"
      height="11"
      viewBox="0 0 16 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="16" height="11" rx="2" fill="#012169" />
      <path d="M0 0L16 11M16 0L0 11" stroke="#FFFFFF" strokeWidth="2.2" />
      <path d="M0 0L16 11M16 0L0 11" stroke="#C8102E" strokeWidth="1.1" />
      <path d="M8 0V11M0 5.5H16" stroke="#FFFFFF" strokeWidth="3.2" />
      <path d="M8 0V11M0 5.5H16" stroke="#C8102E" strokeWidth="1.8" />
      <rect x="0.5" y="0.5" width="15" height="10" rx="1.5" stroke="rgba(0,0,0,0.15)" strokeWidth="0.8" />
    </svg>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const toggleRef = useRef(null);

  const { setLang, t, isId } = useLanguage();

  // Monitor scroll for navbar transition
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Lock scroll on mobile menu open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      const onKey = (e) => {
        if (e.key === 'Escape') {
          setMenuOpen(false);
          toggleRef.current?.focus();
        }
      };
      document.addEventListener('keydown', onKey);
      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', onKey);
      };
    }
  }, [menuOpen]);

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/destinasi', label: t('nav.destinations') },
    { to: '/paket', label: t('nav.packages') },
    { to: '/galeri', label: t('nav.gallery') },
    { to: '/ulasan', label: t('nav.reviews') },
    { to: '/tentang-kami', label: t('nav.about') },
    { to: '/kontak', label: t('nav.contact') },
  ];

  return (
    <>
      <header
        className={`site-navbar-header ${scrolled ? 'is-scrolled' : ''} ${menuOpen ? 'menu-active' : ''}`}
        role="banner"
      >
        <div className="nav-container container">
          {/* Brand Logo */}
          <Link to="/" className="nav-brand-logo" aria-label="Penida Breeze Tours - Home">
            <img
              src="/images/logo.png"
              alt="Penida Breeze Tours Logo"
              className="nav-brand-logo-img"
              width="42"
              height="42"
            />
            <span className="brand-logo-name">
              Penida<strong>Breeze</strong>
            </span>
          </Link>

          {/* Desktop Horizontal Menu - Centered */}
          <nav className="nav-desktop-menu" aria-label="Main Navigation">
            <ul className="nav-desktop-list">
              {navLinks.map(({ to, label }) => (
                <li key={to} className="nav-desktop-item">
                  <NavLink
                    to={to}
                    end={to === '/'}
                    className={({ isActive }) => `nav-desktop-link ${isActive ? 'active' : ''}`}
                  >
                    <span className="nav-link-text">{label}</span>
                    <span className="nav-link-underline" aria-hidden="true" />
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop Actions: Language Toggle with Flag Icons + CTA */}
          <div className="nav-desktop-action">
            {/* Language Switcher */}
            <div className="nav-lang-toggle" role="group" aria-label={t('nav.language')}>
              <button
                type="button"
                className={`lang-btn ${isId ? 'active' : ''}`}
                onClick={() => setLang('id')}
                aria-label="Bahasa Indonesia"
              >
                <FlagIndonesia />
                <span>ID</span>
              </button>
              <span className="lang-sep">|</span>
              <button
                type="button"
                className={`lang-btn ${!isId ? 'active' : ''}`}
                onClick={() => setLang('en')}
                aria-label="English"
              >
                <FlagEnglish />
                <span>EN</span>
              </button>
            </div>

            {/* Book Now Button */}
            <Link to="/booking" className="btn btn-nav-cta">
              <span className="btn-cta-shine" />
              <span className="btn-cta-text">{t('nav.bookNow')}</span>
              <ArrowRight size={14} strokeWidth={2.2} className="nav-cta-arrow" aria-hidden="true" />
            </Link>
          </div>

          {/* Mobile Controls Right: Language + Hamburger */}
          <div className="nav-mobile-right-group">
            <div className="nav-lang-toggle mobile-header-lang" role="group" aria-label={t('nav.language')}>
              <button
                type="button"
                className={`lang-btn ${isId ? 'active' : ''}`}
                onClick={() => setLang('id')}
                aria-label="Bahasa Indonesia"
              >
                <FlagIndonesia />
                <span>ID</span>
              </button>
              <span className="lang-sep">|</span>
              <button
                type="button"
                className={`lang-btn ${!isId ? 'active' : ''}`}
                onClick={() => setLang('en')}
                aria-label="English"
              >
                <FlagEnglish />
                <span>EN</span>
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              ref={toggleRef}
              type="button"
              className={`nav-mobile-toggle ${menuOpen ? 'active' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? (isId ? 'Tutup menu navigasi' : 'Close navigation menu') : (isId ? 'Buka menu navigasi' : 'Open navigation menu')}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-drawer"
            >
              <span className="hamburger-box" aria-hidden="true">
                <span className="hamburger-line line-1" />
                <span className="hamburger-line line-2" />
                <span className="hamburger-line line-3" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Backdrop Overlay ── */}
      <div
        className={`mobile-drawer-backdrop ${menuOpen ? 'active' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* ── Mobile Slide Drawer ── */}
      <aside
        id="mobile-nav-drawer"
        className={`mobile-drawer-panel ${menuOpen ? 'active' : ''}`}
        aria-hidden={!menuOpen}
        aria-label="Mobile Navigation"
      >
        <div className="mobile-drawer-header">
          <Link to="/" className="nav-brand-logo" onClick={() => setMenuOpen(false)}>
            <img
              src="/images/logo.png"
              alt="Penida Breeze Tours Logo"
              className="nav-brand-logo-img"
              width="38"
              height="38"
            />
            <span className="brand-logo-name">
              Penida<strong>Breeze</strong>
            </span>
          </Link>
          <button
            type="button"
            className="mobile-drawer-close"
            onClick={() => setMenuOpen(false)}
            aria-label={isId ? 'Tutup menu' : 'Close menu'}
          >
            ✕
          </button>
        </div>

        {/* Mobile Language bar */}
        <div className="mobile-drawer-utilities">
          <div className="mobile-lang-row">
            <span className="drawer-util-label">
              {t('nav.language')}:
            </span>
            <div className="nav-lang-toggle mobile-lang-toggle">
              <button
                type="button"
                className={`lang-btn ${isId ? 'active' : ''}`}
                onClick={() => setLang('id')}
                aria-label="Bahasa Indonesia"
              >
                <FlagIndonesia />
                <span>ID</span>
              </button>
              <span className="lang-sep">|</span>
              <button
                type="button"
                className={`lang-btn ${!isId ? 'active' : ''}`}
                onClick={() => setLang('en')}
                aria-label="English"
              >
                <FlagEnglish />
                <span>EN</span>
              </button>
            </div>
          </div>
        </div>

        <nav className="mobile-drawer-nav">
          <ul className="mobile-nav-list">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  <span>{label}</span>
                  <ArrowRight size={15} strokeWidth={2} className="mobile-link-arrow" aria-hidden="true" />
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mobile-drawer-footer">
          <Link
            to="/booking"
            className="btn btn-primary btn-block btn-mobile-cta"
            onClick={() => setMenuOpen(false)}
          >
            <span>{t('nav.bookNow')}</span>
            <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
          </Link>
        </div>
      </aside>
    </>
  );
}
