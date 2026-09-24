import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, ShieldCheck } from 'lucide-react';
import { getWhatsAppUrl } from '../config/site';
import { useLanguage } from '../context/LanguageContext';

export default function BookingCTA({ packageSlug, packageTitle }) {
  const { t, isEn } = useLanguage();

  const waMsg = packageTitle
    ? isEn
      ? `Hello Penida Breeze Tours, I would like to inquire and book the ${packageTitle} package. Is the schedule available?`
      : `Halo Penida Breeze Tours, saya ingin konsultasi dan booking paket ${packageTitle}. Apakah jadwal masih tersedia?`
    : isEn
      ? 'Hello Penida Breeze Tours, I would like to inquire about tour packages and schedule to Nusa Penida.'
      : 'Halo Penida Breeze Tours, saya ingin konsultasi paket wisata dan jadwal ke Nusa Penida.';

  return (
    <section className="final-cta-section" aria-label="Booking Adventure Nusa Penida">
      <div className="final-cta-backdrop">
        <img
          src="/images/destinations/diamond-beach.jpg"
          alt="Diamond Beach Nusa Penida"
          loading="lazy"
          className="final-cta-img"
        />
        <div className="final-cta-vignette" />
      </div>

      <div className="container">
        <div className="final-cta-card reveal">
          <h2 className="final-cta-heading">
            {t('cta.heading')}
          </h2>

          <p className="final-cta-desc">
            {t('cta.desc')}
          </p>

          <div className="final-cta-buttons">
            <Link
              to={packageSlug ? `/booking?paket=${packageSlug}` : '/booking'}
              className="btn btn-cta-primary"
            >
              <span>{t('cta.btnBook')}</span>
              <ArrowRight size={17} strokeWidth={2} aria-hidden="true" />
            </Link>

            <a
              href={getWhatsAppUrl(waMsg)}
              className="btn btn-cta-whatsapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Phone size={17} strokeWidth={2} aria-hidden="true" />
              <span>{t('cta.btnWa')}</span>
            </a>
          </div>

          <div className="final-cta-trust-note">
            <ShieldCheck size={14} className="text-ocean" aria-hidden="true" />
            <span>{t('cta.trust')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
