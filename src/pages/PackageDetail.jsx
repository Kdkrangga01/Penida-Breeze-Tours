import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Clock, Users, ArrowRight, Phone, Check, X, ShieldCheck } from 'lucide-react';
import { getPackageBySlug, packages } from '../data/packages';
import { getDestinationBySlug } from '../data/destinations';
import { formatPrice, getWhatsAppUrl } from '../config/site';
import Breadcrumbs from '../components/Breadcrumbs';
import BookingCTA from '../components/BookingCTA';
import { useLanguage } from '../context/LanguageContext';

export default function PackageDetail() {
  const { slug } = useParams();
  const { t, isEn, getTranslatedPackage, getTranslatedDestination } = useLanguage();

  const rawPkg = getPackageBySlug(slug);
  if (!rawPkg) return <Navigate to="/paket" replace />;

  const pkg = getTranslatedPackage(rawPkg);
  const otherPackages = packages.filter((p) => p.slug !== slug).map(getTranslatedPackage);

  const regionLabel = pkg.id.includes('barat')
    ? (isEn ? 'West Nusa Penida' : 'Nusa Penida Barat')
    : pkg.id.includes('timur')
    ? (isEn ? 'East Nusa Penida' : 'Nusa Penida Timur')
    : (isEn ? 'Mix East & West Nusa Penida' : 'Kombinasi Timur & Barat');

  const waBookingMessage = isEn
    ? `Hello Penida Breeze Tours, I would like to book the ${pkg.title} package (${formatPrice(pkg.price)} ${pkg.unit}, ${pkg.minPax}). Could you please confirm schedule and vehicle availability?`
    : `Halo Penida Breeze Tours, saya ingin booking paket ${pkg.title} (${formatPrice(pkg.price)} ${pkg.unit}, ${pkg.minPax}). Boleh info ketersediaan armada dan jadwalnya?`;

  return (
    <div className="dest-detail-page" style={{ background: '#FFFFFF', minHeight: '100vh' }}>
      {/* ─── 01. CINEMATIC EDITORIAL HERO ─── */}
      <section className="detail-hero-editorial">
        <div className="container">
          <div className="detail-hero-banner reveal">
            <img
              src={pkg.image}
              alt={`Tour ${pkg.title} Nusa Penida`}
              className="detail-hero-img"
              loading="eager"
            />
            <div className="detail-hero-gradient" />

            <div className="detail-hero-caption">
              <div className="detail-hero-top-meta">
                <Breadcrumbs
                  items={[
                    { to: '/paket', label: t('nav.packages') },
                    { label: pkg.title },
                  ]}
                />
                <span className="detail-region-pill">{regionLabel}</span>
                {pkg.badge && (
                  <span className="detail-highlight-pill">{pkg.badge}</span>
                )}
              </div>

              <h1 className="detail-hero-title">{pkg.title}</h1>
              <p className="detail-hero-tagline">{pkg.subtitle}</p>
            </div>
          </div>

          {/* Quick Floating Meta Bar */}
          <div className="detail-quick-strip reveal" data-delay={80}>
            <div className="detail-quick-item">
              <span className="quick-item-label">{isEn ? 'Duration' : 'Durasi Trip'}</span>
              <span className="quick-item-val">{pkg.duration || (isEn ? '10–12 Hours' : '10–12 Jam')}</span>
            </div>
            <div className="detail-quick-sep" aria-hidden="true" />
            <div className="detail-quick-item">
              <span className="quick-item-label">{isEn ? 'Group Size' : 'Kapasitas'}</span>
              <span className="quick-item-val">{pkg.minPax}</span>
            </div>
            <div className="detail-quick-sep" aria-hidden="true" />
            <div className="detail-quick-item">
              <span className="quick-item-label">{isEn ? 'Package Type' : 'Jenis Layanan'}</span>
              <span className="quick-item-val">
                {pkg.packageType === 'transport_only'
                  ? (isEn ? 'Transport Charter' : 'Sewa Transport')
                  : (isEn ? 'All-Inclusive Tour' : 'Paket All-Inclusive')}
              </span>
            </div>
            <div className="detail-quick-sep" aria-hidden="true" />
            <div className="detail-quick-item">
              <span className="quick-item-label">{isEn ? 'Tariff' : 'Tarif'}</span>
              <span className="quick-item-val" style={{ color: 'var(--ocean)', fontWeight: 800 }}>
                {formatPrice(pkg.price)} <small style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 500 }}>{pkg.unit}</small>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 02. MAIN CONTENT & STICKY SIDEBAR ─── */}
      <section className="dest-detail-content-section" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <div className="dest-detail-layout">
            {/* Left Column: Itinerary, Highlights & Inclusions */}
            <div className="dest-story-panel">
              {/* Highlights Box */}
              {pkg.highlights && (
                <div className="dest-story-card reveal">
                  <span className="dest-story-eyebrow">
                    {isEn ? 'Trip Highlights' : 'Highlight Pengalaman Wisata'}
                  </span>
                  <h2 className="dest-story-heading">
                    {isEn ? 'What Makes This Journey Unforgettable' : 'Keistimewaan Perjalanan Ini'}
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                    {pkg.highlights.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14.5px', color: 'var(--ink-soft)' }}>
                        <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--ocean-surface)', color: 'var(--ocean)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                          <Check size={14} strokeWidth={2.5} />
                        </div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Visited Destinations */}
              {pkg.destinationSlugs && pkg.destinationSlugs.length > 0 && (
                <div className="dest-story-card reveal" data-delay={100}>
                  <span className="dest-story-eyebrow">
                    {isEn ? 'Destinations Included' : 'Destinasi yang Dikunjungi'}
                  </span>
                  <h3 className="dest-section-title-clean" style={{ marginBottom: '18px' }}>
                    {isEn ? 'Iconic Landmarks on This Route' : 'Spot Wisata dalam Paket Ini'}
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {pkg.destinationSlugs.map((dSlug) => {
                      const rawDest = getDestinationBySlug(dSlug);
                      if (!rawDest) return null;
                      const dest = getTranslatedDestination(rawDest);
                      return (
                        <Link
                          to={`/destinasi/${dest.slug}`}
                          key={dest.id}
                          className="dest-pkg-item-row"
                        >
                          <div className="dest-pkg-item-left">
                            <div className="dest-pkg-item-thumb">
                              <img src={dest.image} alt={dest.name} loading="lazy" />
                            </div>
                            <div className="dest-pkg-item-info">
                              <h4 className="dest-pkg-item-name" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                                {dest.name}
                                {pkg.id === 'mix_trip' && dest.slug === 'treehouse-rumah-pohon' && (
                                  <span
                                    style={{
                                      fontSize: '11px',
                                      fontWeight: 600,
                                      color: '#B91C1C',
                                      background: '#FEE2E2',
                                      padding: '2px 8px',
                                      borderRadius: '99px',
                                      display: 'inline-block',
                                    }}
                                  >
                                    {isEn ? 'Photo ticket not included' : 'Tidak include tiket foto'}
                                  </span>
                                )}
                              </h4>
                              <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--muted)' }}>
                                {dest.tagline}
                              </p>
                            </div>
                          </div>
                          <div className="dest-pkg-arrow" aria-hidden="true">
                            <ArrowRight size={15} strokeWidth={2.5} />
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Detailed Itinerary Timeline */}
              {pkg.itinerary && (
                <div className="dest-story-card reveal" data-delay={120}>
                  <span className="dest-story-eyebrow">
                    {isEn ? 'Daily Schedule' : 'Rangkaian Jadwal & Itinerary'}
                  </span>
                  <h3 className="dest-section-title-clean" style={{ marginBottom: '20px' }}>
                    {isEn ? 'Complete Trip Timeline' : 'Jadwal Perjalanan Lengkap'}
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
                    {pkg.itinerary.map((step, i) => (
                      <div
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '16px',
                          padding: '14px 18px',
                          background: '#FFFFFF',
                          borderRadius: '12px',
                          border: '1px solid #EAEFEF',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: '13px',
                            fontWeight: 800,
                            color: 'var(--ocean)',
                            background: 'var(--ocean-surface)',
                            padding: '4px 10px',
                            borderRadius: '99px',
                            flexShrink: 0,
                          }}
                        >
                          {step.time}
                        </span>
                        <span style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--ink)' }}>
                          {step.activity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Inclusions & Exclusions 2-Column Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                {/* Included */}
                <div className="dest-story-card reveal" style={{ padding: '24px' }}>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 800, color: '#0F766E', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#E6FFFA', color: '#0F766E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Check size={14} strokeWidth={2.5} />
                    </div>
                    {isEn ? 'Package Inclusions' : 'Sudah Termasuk'}
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {pkg.included.map((item, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: 'var(--ink-soft)' }}>
                        <Check size={14} strokeWidth={2.5} color="#059669" style={{ flexShrink: 0, marginTop: '3px' }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Excluded */}
                <div className="dest-story-card reveal" style={{ padding: '24px' }}>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 800, color: 'var(--ink)', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#FEE2E2', color: '#DC2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <X size={14} strokeWidth={2.5} />
                    </div>
                    {isEn ? 'Exclusions' : 'Belum Termasuk'}
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {pkg.excluded.map((item, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: 'var(--muted)' }}>
                        <X size={14} strokeWidth={2} color="#9CA3AF" style={{ flexShrink: 0, marginTop: '3px' }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Safety & Important Notes */}
              {pkg.importantInfo && (
                <div className="dest-safety-card reveal">
                  <div className="dest-safety-icon-wrap" aria-hidden="true">
                    <ShieldCheck size={20} strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="dest-safety-title">
                      {isEn ? 'Important Trip Information' : 'Informasi & Catatan Perjalanan'}
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' }}>
                      {pkg.importantInfo.map((info, i) => (
                        <p key={i} className="dest-safety-text">· {info}</p>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Sticky Booking Card */}
            <aside className="dest-sidebar-sticky">
              <div className="sidebar-dest-booking-card reveal-right">
                <div className="sidebar-booking-header">
                  <span className="sidebar-booking-badge">
                    {isEn ? 'Direct Island Booking' : 'Booking Resmi & Cepat'}
                  </span>
                  <h3 className="sidebar-booking-title">{pkg.title}</h3>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '4px 0 10px 0' }}>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.65rem', fontWeight: 800, color: 'var(--ocean)' }}>
                      {formatPrice(pkg.price)}
                    </span>
                    <span style={{ fontSize: '13px', color: 'var(--muted)' }}>{pkg.unit}</span>
                  </div>
                  <p className="sidebar-booking-desc">
                    {pkg.packageType === 'transport_only'
                      ? (isEn
                          ? 'Private AC car, licensed native guide, and fuel included for up to 5 guests.'
                          : 'Armada mobil privat ber-AC, driver lokal berlisensi, dan BBM untuk kapasitas maks. 5 orang.')
                      : (isEn
                          ? 'Private AC car, licensed native guide, round-trip fast boat tickets, and restaurant lunch.'
                          : 'Armada mobil privat ber-AC, driver lokal berlisensi, tiket fast boat PP Sanur, dan makan siang.')}
                  </p>
                </div>

                {/* Minimal Inclusions Checklist */}
                <div className="sidebar-inclusions-mini">
                  {pkg.included.slice(0, 4).map((inc, i) => (
                    <div key={i} className="sidebar-inc-row">
                      <Check size={14} strokeWidth={2.5} aria-hidden="true" />
                      <span>{inc}</span>
                    </div>
                  ))}
                  {pkg.packageType === 'transport_only' && (
                    <div className="sidebar-inc-row" style={{ color: '#DC2626', fontSize: '11.5px', marginTop: '6px' }}>
                      <span style={{ fontWeight: 700 }}>✕</span>
                      <span>{isEn ? 'Boat, lunch & tickets excluded' : 'Tanpa include boat, makan, & tiket retribusi'}</span>
                    </div>
                  )}
                </div>

                <div className="sidebar-booking-actions">
                  <Link
                    to={`/booking?paket=${pkg.slug}`}
                    className="btn-sidebar-book"
                  >
                    <span>{isEn ? 'Book This Tour' : 'Pesan Paket Ini'}</span>
                    <ArrowRight size={15} strokeWidth={2} aria-hidden="true" />
                  </Link>

                  <a
                    href={getWhatsAppUrl(waBookingMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-sidebar-whatsapp"
                  >
                    <Phone size={15} strokeWidth={2} aria-hidden="true" />
                    <span>{isEn ? 'Chat via WhatsApp' : 'Konsultasi WhatsApp'}</span>
                  </a>
                </div>

                <p className="sidebar-trust-reassurance">
                  {isEn
                    ? '⚡ Instant confirmation · Zero hidden fees · Flexible reschedule'
                    : '⚡ Konfirmasi instan · Bebas biaya tersembunyi · Reschedule fleksibel'}
                </p>
              </div>

              {/* Other Packages Sidebar */}
              {otherPackages.length > 0 && (
                <div className="sidebar-explore-card reveal-right" data-delay={100}>
                  <h4 className="sidebar-explore-title">
                    {isEn ? 'Other Tour Packages' : 'Pilihan Paket Lainnya'}
                  </h4>

                  <div className="sidebar-explore-list">
                    {otherPackages.map((op) => (
                      <Link
                        to={`/paket/${op.slug}`}
                        key={op.id}
                        className="sidebar-explore-item"
                      >
                        <div className="sidebar-explore-thumb">
                          <img src={op.image} alt={op.title} loading="lazy" />
                        </div>
                        <div className="sidebar-explore-info">
                          <strong className="sidebar-explore-name">{op.title}</strong>
                          <span className="sidebar-explore-tag">{formatPrice(op.price)} {op.unit}</span>
                        </div>
                        <ArrowRight size={14} strokeWidth={2} className="sidebar-explore-arrow" aria-hidden="true" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* ─── 03. FOOTER BOOKING CTA ─── */}
      <BookingCTA packageTitle={pkg.title} />
    </div>
  );
}
