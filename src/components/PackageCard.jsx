import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { formatPrice } from '../config/site';
import { useLanguage } from '../context/LanguageContext';

export default function PackageCard({ pkg, index = 0 }) {
  const { t, isEn } = useLanguage();

  const isTransportOnly = pkg.packageType === 'transport_only' || pkg.id !== 'barat_std';

  // Curated clean facilities matching language and package type
  const displayFacilities = isTransportOnly
    ? (pkg.id === 'mix_trip'
        ? (isEn
            ? ['Private AC Car + Fuel', 'All Parking Fees Included', 'Local Driver & Photographer', 'Max. 5 Guests / Car']
            : ['Mobil Privat Ber-AC + BBM', 'Parkir Destinasi Termasuk', 'Driver Lokal & Fotografer', 'Kapasitas Maks. 5 Pax/Mobil'])
        : (isEn
            ? ['Private AC Car + Fuel', 'Local Driver & Photographer', 'Max. 5 Guests / Car']
            : ['Mobil Privat Ber-AC + BBM', 'Driver Lokal & Fotografer', 'Kapasitas Maks. 5 Pax/Mobil']))
    : (isEn
        ? ['Private AC Car + Fuel', 'Fast Boat Return Sanur', 'Local Lunch Included', 'All Admission Tickets']
        : ['Mobil Privat Ber-AC + BBM', 'Fast Boat Sanur PP', 'Makan Siang Resto', 'Tiket Retribusi & Destinasi']);

  return (
    <article className="pkg-editorial-card reveal" data-delay={index * 100}>
      {/* Visual Image Header with Smooth Hover Zoom */}
      <div className="pkg-card-media">
        <img
          src={pkg.image}
          alt={`Tour ${pkg.title} Nusa Penida`}
          loading="lazy"
          className="pkg-card-media-img"
        />
        <div className="pkg-card-media-gradient" />

        {/* Top Badges */}
        <div className="pkg-card-top-bar">
          {pkg.badge && (
            <span className={`pkg-pill-badge ${isTransportOnly ? 'pkg-transport-badge' : ''}`}>{pkg.badge}</span>
          )}
          <span className="pkg-pax-pill">{pkg.minPax}</span>
        </div>

        {/* Bottom Duration Chip */}
        <div className="pkg-card-media-footer">
          <span className="pkg-duration-chip">{pkg.duration || (isEn ? '10–12 Hours' : '10–12 Jam')}</span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="pkg-card-content">
        <div className="pkg-card-titles">
          <h3 className="pkg-card-name">
            <Link to={`/paket/${pkg.slug}`}>{pkg.title}</Link>
          </h3>
          <p className="pkg-card-summary">{pkg.subtitle}</p>
        </div>

        {/* Destination Route - Clean, Aligned Sequence */}
        <div className="pkg-card-destinations-block">
          <span className="pkg-section-label">{t('pkg.mainDestinations')}</span>
          <div className="pkg-dest-tags-wrap">
            {pkg.destinations?.map((dest, i) => (
              <span key={i} className="pkg-dest-tag">
                {dest}
              </span>
            ))}
          </div>
        </div>

        {/* Included Amenities - Clean checkmarks without clutter */}
        <div className="pkg-card-includes-block">
          <span className="pkg-section-label">
            {isTransportOnly ? (isEn ? 'Included (Transport):' : 'Fasilitas Transport:') : t('pkg.included')}
          </span>
          <ul className="pkg-include-list">
            {displayFacilities.map((facilityName, i) => (
              <li key={i} className="pkg-include-item">
                <Check size={13} strokeWidth={2.5} className="pkg-check-icon" aria-hidden="true" />
                <span>{facilityName}</span>
              </li>
            ))}
          </ul>
          {isTransportOnly && (
            <div className="pkg-card-exclude-hint">
              {isEn
                ? '✕ Fast boat, lunch & admission tickets excluded'
                : '✕ Tanpa include boat, makan siang, & tiket retribusi'}
            </div>
          )}
        </div>

        {/* Pricing & CTA Bar */}
        <div className="pkg-card-bottom-bar">
          <div className="pkg-price-group">
            <span className="pkg-price-caption">{t('pkg.startFrom')}</span>
            <div className="pkg-price-row">
              <span className="pkg-price-num">{formatPrice(pkg.price)}</span>
              <span className="pkg-price-unit">{pkg.unit || t('pkg.perPax')}</span>
            </div>
          </div>

          <div className="pkg-card-actions">
            <Link
              to={`/booking?paket=${pkg.slug}`}
              className="btn btn-pkg-primary"
              aria-label={`Booking ${pkg.title}`}
            >
              <span>{t('pkg.selectPkg')}</span>
              <ArrowRight size={14} strokeWidth={2.2} className="pkg-btn-arrow" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
