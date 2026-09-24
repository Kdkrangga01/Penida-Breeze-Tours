import React from 'react';
import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { formatPrice, getWhatsAppUrl } from '../config/site';
import { useLanguage } from '../context/LanguageContext';

export default function MobileBookingBar({ pkg }) {
  const { t, isEn } = useLanguage();

  if (!pkg) return null;

  const waMessage = isEn
    ? `Hello Penida Breeze Tours, I would like to book the ${pkg.title} package. Could you provide more information?`
    : `Halo Penida Breeze Tours, saya ingin booking paket ${pkg.title}. Bisa info lebih lanjut?`;

  return (
    <div className="mobile-booking-bar">
      <div className="mobile-booking-price">
        <span className="mobile-booking-label">{t('mobileBar.startFrom')}</span>
        <span className="mobile-booking-amount">{formatPrice(pkg.price)}</span>
        <span className="mobile-booking-unit">{pkg.unit}</span>
      </div>
      <div className="mobile-booking-actions">
        <Link to={`/booking?paket=${pkg.slug}`} className="btn btn-primary btn-sm">
          {t('mobileBar.book')}
        </Link>
        <a
          href={getWhatsAppUrl(waMessage)}
          className="btn btn-outline btn-sm"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat WhatsApp"
        >
          <Phone size={15} strokeWidth={1.5} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
