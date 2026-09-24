import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowRight, Phone, ShieldCheck } from 'lucide-react';
import { getDestinationBySlug, destinations } from '../data/destinations';
import { packages } from '../data/packages';
import Breadcrumbs from '../components/Breadcrumbs';
import BookingCTA from '../components/BookingCTA';
import { formatPrice, getWhatsAppUrl } from '../config/site';
import { useLanguage } from '../context/LanguageContext';

export default function DestinationDetail() {
  const { slug } = useParams();
  const { t, isEn, getTranslatedDestination, getTranslatedPackage } = useLanguage();

  const rawDest = getDestinationBySlug(slug);
  if (!rawDest) return <Navigate to="/destinasi" replace />;

  const dest = getTranslatedDestination(rawDest);

  // Find related packages that visit this destination
  const rawRelatedPackages = packages.filter(
    (p) => p.destinationSlugs && (p.destinationSlugs.includes(slug) || p.destinationSlugs.includes(dest.slug))
  );

  // Fallback to category packages if none matched specifically
  const finalPackages = rawRelatedPackages.length > 0
    ? rawRelatedPackages
    : packages.filter((p) => (dest.category === 'west' ? p.id.includes('barat') : p.id.includes('timur')));

  // Nearby destinations in same region (excluding current)
  const nearbyDests = destinations
    .filter((d) => d.category === dest.category && d.slug !== slug)
    .slice(0, 3)
    .map(getTranslatedDestination);

  const regionLabel = dest.category === 'west' ? (isEn ? 'West Nusa Penida' : 'Nusa Penida Barat') : (isEn ? 'East Nusa Penida' : 'Nusa Penida Timur');

  const waBookingMessage = isEn
    ? `Hello Penida Breeze Tours, I am interested in visiting ${dest.name} in Nusa Penida. Could you provide package details and available schedules?`
    : `Halo Penida Breeze Tours, saya tertarik ingin berkunjung ke ${dest.name} di Nusa Penida. Boleh info paket tour dan jadwal yang tersedia?`;

  return (
    <div className="dest-detail-page">
      {/* ─── 01. CINEMATIC EDITORIAL HERO ─── */}
      <section className="detail-hero-editorial">
        <div className="container">
          <div className="detail-hero-banner reveal">
            <img
              src={dest.image}
              alt={`${dest.name} Nusa Penida`}
              className="detail-hero-img"
              loading="eager"
            />
            <div className="detail-hero-gradient" />

            <div className="detail-hero-caption">
              <div className="detail-hero-top-meta">
                <Breadcrumbs
                  items={[
                    { to: '/destinasi', label: t('nav.destinations') },
                    { label: dest.name },
                  ]}
                />
                <span className="detail-region-pill">{regionLabel}</span>
                <span className="detail-highlight-pill">{isEn ? 'Must Visit Spot' : 'Spot Ikonik Pilihan'}</span>
              </div>

              <h1 className="detail-hero-title">{dest.name}</h1>
              <p className="detail-hero-tagline">{dest.tagline}</p>
            </div>
          </div>

          {/* Quick Informational Strip */}
          <div className="detail-quick-strip reveal" data-delay={80}>
            <div className="detail-quick-item">
              <span className="quick-item-label">{isEn ? 'Location' : 'Lokasi'}</span>
              <span className="quick-item-val">{dest.location}</span>
            </div>
            <div className="detail-quick-sep" aria-hidden="true" />
            <div className="detail-quick-item">
              <span className="quick-item-label">{isEn ? 'Tour Region' : 'Wilayah Tour'}</span>
              <span className="quick-item-val">{regionLabel}</span>
            </div>
            <div className="detail-quick-sep" aria-hidden="true" />
            <div className="detail-quick-item">
              <span className="quick-item-label">{isEn ? 'Best Visiting Time' : 'Waktu Kunjungan Terbaik'}</span>
              <span className="quick-item-val">{dest.bestTime || (isEn ? 'Morning / Sunset' : 'Pagi Hari / Sunset')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 02. MAIN 2-COLUMN PROPORTIONAL CONTENT ─── */}
      <section className="dest-detail-content-section">
        <div className="container">
          <div className="dest-detail-layout">
            {/* Left Column: Story & Highlights */}
            <div className="dest-story-panel">
              {/* Destination Overview Story */}
              <div className="dest-story-card reveal">
                <span className="dest-story-eyebrow">
                  {isEn ? 'Destination Story & Overview' : 'Cerita & Overview Destinasi'}
                </span>
                <h2 className="dest-story-heading">
                  {isEn
                    ? `The Natural Wonder & Charm of ${dest.name}`
                    : `Pesona & Keajaiban Alam ${dest.name}`}
                </h2>
                <p className="dest-story-body">
                  {dest.fullDescription || dest.description}
                </p>
              </div>

              {/* Curated Minimalist 4 Highlights (No Icon Overload) */}
              <div className="dest-curated-highlights-wrap reveal" data-delay={100}>
                <h3 className="dest-section-title-clean">
                  {isEn ? 'Essential Destination Highlights' : 'Informasi & Panduan Berkunjung'}
                </h3>

                <div className="dest-highlights-2x2-grid">
                  {/* Highlight 01: Attraction */}
                  <div className="dest-highlight-box">
                    <div className="dest-hl-top-row">
                      <span className="dest-hl-num">01</span>
                      <span className="dest-hl-category">{isEn ? 'Main Attraction' : 'Daya Tarik'}</span>
                    </div>
                    <h4 className="dest-hl-title">{isEn ? 'Iconic Natural Viewpoint' : 'Daya Tarik Utama'}</h4>
                    <p className="dest-hl-desc">{dest.attraction}</p>
                  </div>

                  {/* Highlight 02: Activities */}
                  <div className="dest-highlight-box">
                    <div className="dest-hl-top-row">
                      <span className="dest-hl-num">02</span>
                      <span className="dest-hl-category">{isEn ? 'Activities' : 'Aktivitas'}</span>
                    </div>
                    <h4 className="dest-hl-title">{isEn ? 'Popular Things to Do' : 'Aktivitas Populer'}</h4>
                    <p className="dest-hl-desc">{dest.activities}</p>
                  </div>

                  {/* Highlight 03: Facilities */}
                  <div className="dest-highlight-box">
                    <div className="dest-hl-top-row">
                      <span className="dest-hl-num">03</span>
                      <span className="dest-hl-category">{isEn ? 'Amenities' : 'Fasilitas'}</span>
                    </div>
                    <h4 className="dest-hl-title">{isEn ? 'Available Facilities' : 'Fasilitas Tersedia'}</h4>
                    <p className="dest-hl-desc">{dest.facilities}</p>
                  </div>

                  {/* Highlight 04: Best Timing */}
                  <div className="dest-highlight-box">
                    <div className="dest-hl-top-row">
                      <span className="dest-hl-num">04</span>
                      <span className="dest-hl-category">{isEn ? 'Optimal Timing' : 'Waktu Kunjungan'}</span>
                    </div>
                    <h4 className="dest-hl-title">{isEn ? 'Ideal Hours & Season' : 'Waktu Terbaik'}</h4>
                    <p className="dest-hl-desc">{dest.bestTime}</p>
                  </div>
                </div>
              </div>

              {/* Safety & Island Advice Card */}
              {dest.safetyNote && (
                <div className="dest-safety-card reveal" data-delay={150}>
                  <div className="dest-safety-icon-wrap" aria-hidden="true">
                    <ShieldCheck size={20} strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="dest-safety-title">
                      {isEn ? 'Visitor Safety & Island Guidance' : 'Catatan Keselamatan & Tips Berkunjung'}
                    </h4>
                    <p className="dest-safety-text">{dest.safetyNote}</p>
                  </div>
                </div>
              )}

              {/* Related Packages that visit this destination */}
              {finalPackages.length > 0 && (
                <div className="dest-related-packages-block reveal" data-delay={180}>
                  <div className="dest-story-header">
                    <span className="dest-story-eyebrow">{t('nav.packages')}</span>
                    <h3 className="dest-section-title-clean">
                      {isEn
                        ? `Tour Packages Visiting ${dest.name}`
                        : `Paket Tour yang Mengunjungi ${dest.name}`}
                    </h3>
                  </div>

                  <div className="dest-related-pkgs-list">
                    {finalPackages.map((rawPkg) => {
                      const pkg = getTranslatedPackage(rawPkg);
                      return (
                        <Link
                          to={`/paket/${pkg.slug}`}
                          key={pkg.id}
                          className="dest-pkg-item-row"
                        >
                          <div className="dest-pkg-item-left">
                            <div className="dest-pkg-item-thumb">
                              <img src={pkg.image} alt={pkg.title} loading="lazy" />
                            </div>
                            <div className="dest-pkg-item-info">
                              <h4 className="dest-pkg-item-name">{pkg.title}</h4>
                              <div className="dest-pkg-item-sub">
                                <span>{pkg.duration}</span>
                                <span>·</span>
                                <span>{pkg.minPax}</span>
                              </div>
                            </div>
                          </div>

                          <div className="dest-pkg-item-right">
                            <div className="dest-pkg-price-text">
                              {formatPrice(pkg.price)}
                            </div>
                            <div className="dest-pkg-arrow" aria-hidden="true">
                              <ArrowRight size={15} strokeWidth={2.5} />
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Sticky Booking & Exploration Sidebar */}
            <aside className="dest-sidebar-sticky">
              {/* Sidebar Action Card */}
              <div className="sidebar-dest-booking-card reveal-right">
                <div className="sidebar-booking-header">
                  <h3 className="sidebar-booking-title">
                    {isEn ? `Visit ${dest.name}` : `Kunjungi ${dest.name}`}
                  </h3>
                </div>

                <div className="sidebar-booking-actions">
                  <Link
                    to={finalPackages[0] ? `/booking?paket=${finalPackages[0].slug}` : '/booking'}
                    className="btn-sidebar-book"
                  >
                    <span>{isEn ? 'Book Tour Package' : 'Pesan Paket Wisata'}</span>
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
              </div>

              {/* Sidebar Nearby Destinations */}
              {nearbyDests.length > 0 && (
                <div className="sidebar-explore-card reveal-right" data-delay={100}>
                  <h4 className="sidebar-explore-title">
                    {isEn
                      ? `Other Spots in ${regionLabel}`
                      : `Destinasi Lain di ${regionLabel}`}
                  </h4>

                  <div className="sidebar-explore-list">
                    {nearbyDests.map((nd) => (
                      <Link
                        to={`/destinasi/${nd.slug}`}
                        key={nd.id}
                        className="sidebar-explore-item"
                      >
                        <div className="sidebar-explore-thumb">
                          <img src={nd.image} alt={nd.name} loading="lazy" />
                        </div>
                        <div className="sidebar-explore-info">
                          <strong className="sidebar-explore-name">{nd.name}</strong>
                          <span className="sidebar-explore-tag">{nd.tagline}</span>
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
      <BookingCTA packageTitle={dest.name} />
    </div>
  );
}
