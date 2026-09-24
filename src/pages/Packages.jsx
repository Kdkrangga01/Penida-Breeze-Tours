import React, { useState } from 'react';
import { packages } from '../data/packages';
import PackageCard from '../components/PackageCard';
import BookingCTA from '../components/BookingCTA';
import TrustStrip from '../components/TrustStrip';
import Breadcrumbs from '../components/Breadcrumbs';
import { useLanguage } from '../context/LanguageContext';

export default function Packages() {
  const { t, isEn, getTranslatedPackage } = useLanguage();
  const [filter, setFilter] = useState('all');

  const filterOptions = [
    { value: 'all', label: isEn ? 'All Tour Packages' : 'Semua Paket Tour' },
    { value: 'west', label: isEn ? 'West Trip' : 'Trip Barat' },
    { value: 'east', label: isEn ? 'East Trip' : 'Trip Timur' },
    { value: 'mix', label: isEn ? 'Mix / Combination' : 'Trip Kombinasi' },
  ];

  const filteredPackages = packages.filter((pkg) => {
    if (filter === 'all') return true;
    if (filter === 'west') return pkg.id.includes('barat');
    if (filter === 'east') return pkg.id.includes('timur');
    if (filter === 'mix') return pkg.id.includes('mix') || pkg.id.includes('kombinasi');
    return true;
  });

  return (
    <div className="packages-page-root" style={{ background: '#FFFFFF', minHeight: '100vh' }}>
      {/* ─── 01. CINEMATIC PACKAGES HERO BANNER ─── */}
      <section className="detail-hero-editorial">
        <div className="container">
          <div className="detail-hero-banner reveal">
            <img
              src="/images/destinations/kelingking-beach.jpg"
              alt="Nusa Penida Tour Packages"
              className="detail-hero-img"
              loading="eager"
            />
            <div className="detail-hero-gradient" />

            <div className="detail-hero-caption">
              <div className="detail-hero-top-meta">
                <Breadcrumbs
                  items={[
                    { label: t('nav.packages') },
                  ]}
                />
              </div>

              <h1 className="detail-hero-title">
                {isEn ? 'Nusa Penida Tour Packages' : 'Pilihan Paket Tour Nusa Penida'}
              </h1>
              <p className="detail-hero-tagline">
                {isEn
                  ? 'Agent Transport in Nusa Penida. Choose between our complete All-Inclusive tour (Car, Lunch, Fast Boat, Retribution) or Private Transport Charter (AC Car + Driver + Fuel, max 5 pax).'
                  : 'Agent Transport destinasi wisata di Nusa Penida. Tersedia Paket All-Inclusive lengkap (Car, Lunch, Boat PP, Retribusi) dan Paket Sewa Transport Tour (Mobil + Driver + BBM, maks. 5 pax).'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 02. TRUST STRIP ─── */}
      <TrustStrip />

      {/* ─── 03. FILTER & PACKAGES GRID ─── */}
      <section className="section" style={{ background: '#FFFFFF', paddingTop: '10px' }}>
        <div className="container">
          {/* Animated Category Filter Pills */}
          <div
            className="packages-filter-bar reveal"
            style={{
              display: 'flex',
              gap: '10px',
              justifyContent: 'center',
              marginBottom: '36px',
              flexWrap: 'wrap',
            }}
          >
            {filterOptions.map((opt) => {
              const isActive = filter === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  className={`btn ${isActive ? 'btn-primary' : 'btn-outline-pill'}`}
                  style={{
                    padding: '9px 22px',
                    borderRadius: '99px',
                    fontSize: '13px',
                    fontWeight: 700,
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onClick={() => setFilter(opt.value)}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          {/* 3-Column Equal Height Grid */}
          <div className="packages-editorial-grid">
            {filteredPackages.map((rawPkg, idx) => {
              const pkg = getTranslatedPackage(rawPkg);
              return <PackageCard key={pkg.id} pkg={pkg} index={idx} />;
            })}
          </div>

          {filteredPackages.length === 0 && (
            <p className="empty-state">
              {isEn ? 'No packages found for this category.' : 'Tidak ada paket untuk kategori ini.'}
            </p>
          )}
        </div>
      </section>

      {/* ─── 04. BOOKING CTA ─── */}
      <BookingCTA />
    </div>
  );
}
