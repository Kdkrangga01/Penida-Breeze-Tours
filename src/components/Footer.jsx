import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Phone, Mail, MapPin, Instagram, ArrowUpRight } from 'lucide-react';
import { SITE, getWhatsAppUrl } from '../config/site';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="editorial-footer" role="contentinfo">
      <div className="container">
        <div className="footer-main-grid">
          {/* Brand Col */}
          <div className="footer-col-brand">
            <Link to="/" className="footer-brand-logo">
              <img
                src="/images/logo.png"
                alt="Penida Breeze Tours Logo"
                className="footer-brand-logo-img"
                width="44"
                height="44"
              />
              <span className="footer-brand-name">
                Penida<strong>Breeze</strong> Tours
              </span>
            </Link>
            <p className="footer-tagline">
              {t('footer.tagline')}
            </p>
            <div className="footer-social-links">
              <a
                href={SITE.instagramUrl || "https://www.instagram.com/penida_breeze_tour?utm_source=qr&stkn=MXE0OXFrcTMwOXVyNQ=="}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-pill"
                aria-label="Instagram Penida Breeze Tours"
              >
                <Instagram size={14} />
                <span>{SITE.instagram || '@penida_breeze_tour'}</span>
                <ArrowUpRight size={12} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col-links">
            <h4 className="footer-col-title">{t('footer.quickLinks')}</h4>
            <ul className="footer-nav-list">
              <li><Link to="/">{t('nav.home')}</Link></li>
              <li><Link to="/destinasi">{t('nav.destinations')}</Link></li>
              <li><Link to="/paket">{t('nav.packages')}</Link></li>
              <li><Link to="/galeri">{t('nav.gallery')}</Link></li>
              <li><Link to="/ulasan">{t('nav.reviews')}</Link></li>
              <li><Link to="/tentang-kami">{t('nav.about')}</Link></li>
              <li><Link to="/kontak">{t('nav.contact')}</Link></li>
            </ul>
          </div>

          {/* Tour Routes */}
          <div className="footer-col-links">
            <h4 className="footer-col-title">{t('footer.tourPackages')}</h4>
            <ul className="footer-nav-list">
              <li><Link to="/paket/trip-barat-standard">West Nusa Penida Trip</Link></li>
              <li><Link to="/paket/trip-timur">East Nusa Penida Trip</Link></li>
              <li><Link to="/paket/trip-barat-premium">West Trip (Private)</Link></li>
              <li><Link to="/booking">Custom Island Tour</Link></li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="footer-col-contact">
            <h4 className="footer-col-title">{t('footer.contactUs')}</h4>
            <p className="footer-contact-desc">
              {t('footer.contactPrompt')}
            </p>
            <div className="footer-contact-actions">
              <a
                href={getWhatsAppUrl()}
                className="footer-contact-item"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone size={14} className="text-ocean" aria-hidden="true" />
                <span>{SITE.whatsappDisplay}</span>
              </a>
              <a href={`mailto:${SITE.email}`} className="footer-contact-item">
                <Mail size={14} className="text-ocean" aria-hidden="true" />
                <span>{SITE.email}</span>
              </a>
              <div className="footer-contact-item location">
                <MapPin size={14} className="text-ocean" aria-hidden="true" />
                <span>{SITE.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-sub-bar">
          <p className="footer-copy">
            &copy; {SITE.year} {SITE.name}. All rights reserved. Clean Tropical Premium Travel.
          </p>
          <div className="footer-badges">
            <span className="footer-badge-item">Nusa Penida, Bali, Indonesia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
