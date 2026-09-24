import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Camera,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Compass,
  ArrowRight,
  Send
} from 'lucide-react';
import PageHero from '../components/PageHero';
import { useLanguage } from '../context/LanguageContext';
import { SITE } from '../config/site';

export const GALLERY_ITEMS = [
  {
    id: 1,
    slug: 'kelingking-beach',
    titleId: 'Kelingking Beach',
    titleEn: 'Kelingking Beach',
    subtitleId: 'Tebing T-Rex Samudra Hindia',
    subtitleEn: 'Iconic T-Rex Cliff Panorama',
    descId: 'Tebing berbentuk dinosaurus T-Rex yang menjulang tinggi di atas pasir putih dan air laut biru toska berombak dramatis.',
    descEn: 'Towering world-famous cliff resembling a Tyrannosaurus Rex overlooking pristine white sands and dramatic turquoise waves.',
    category: 'west',
    regionId: 'Nusa Penida Barat',
    regionEn: 'West Nusa Penida',
    tagId: 'Tebing T-Rex',
    tagEn: 'T-Rex Cliff',
    image: '/images/destinations/kelingking-beach.jpg',
    featured: true,
    packageSlug: 'trip-barat-standard',
  },
  {
    id: 2,
    slug: 'diamond-beach',
    titleId: 'Diamond Beach',
    titleEn: 'Diamond Beach',
    subtitleId: 'Tangga Tebing Batu Kapur',
    subtitleEn: 'Grand Limestone Cliff Staircase',
    descId: 'Pantai pasir putih kristal dengan tangga tebing batu kapur yang dipahat manual di dinding bukit karang terjal.',
    descEn: 'Pristine white sand beach sheltered by towering limestone cliffs, accessible via an iconic hand-carved cliffside staircase.',
    category: 'east',
    regionId: 'Nusa Penida Timur',
    regionEn: 'East Nusa Penida',
    tagId: 'Pasir Putih',
    tagEn: 'White Sand Beach',
    image: '/images/destinations/diamond-beach.jpg',
    featured: false,
    packageSlug: 'trip-timur',
  },
  {
    id: 3,
    slug: 'treehouse-rumah-pohon',
    titleId: 'Rumah Pohon Molenteng',
    titleEn: 'Molenteng Tree House',
    subtitleId: 'Spot Sunrise & Panorama Raja Lima',
    subtitleEn: 'Sunrise & Thousand Islands Viewpoint',
    descId: 'Rumah pohon kayu di bibir tebing dengan pemandangan terbuka gugusan tebing karang Raja Lima (Thousand Islands).',
    descEn: 'Charming rustic treehouse perched on a scenic clifftop ridge offering majestic views of the Thousand Islands (Raja Lima).',
    category: 'east',
    regionId: 'Nusa Penida Timur',
    regionEn: 'East Nusa Penida',
    tagId: 'Sunrise Viewpoint',
    tagEn: 'Sunrise Spot',
    image: '/images/destinations/treehouse.jpg',
    featured: true,
    packageSlug: 'trip-timur',
  },
  {
    id: 4,
    slug: 'broken-beach',
    titleId: 'Broken Beach (Pasih Uug)',
    titleEn: 'Broken Beach (Pasih Uug)',
    subtitleId: 'Jembatan Karang Melingkar Alami',
    subtitleEn: 'Natural Circular Limestone Sea Bridge',
    descId: 'Fenomena laguna laut melingkar raksasa dengan terowongan tebing batu alami tempat ombak samudra mengalir masuk.',
    descEn: 'A breathtaking circular coastal cove featuring a massive natural limestone sea arch where open ocean swells flow inside.',
    category: 'west',
    regionId: 'Nusa Penida Barat',
    regionEn: 'West Nusa Penida',
    tagId: 'Jembatan Karang',
    tagEn: 'Natural Sea Arch',
    image: '/images/destinations/broken-beach.jpg',
    featured: false,
    packageSlug: 'trip-barat-standard',
  },
  {
    id: 5,
    slug: 'angels-billabong',
    titleId: "Angel's Billabong",
    titleEn: "Angel's Billabong",
    subtitleId: 'Kolam Infinity Samudra Zamrud',
    subtitleEn: 'Emerald Oceanfront Tidal Pool',
    descId: 'Kolam pasang surut alami dengan air bening berwarna zamrud bertingkat diapit dinding karang kapur kokoh.',
    descEn: 'A natural tidal infinity pool with crystal-clear emerald waters nestled between dramatic coastal limestone walls.',
    category: 'west',
    regionId: 'Nusa Penida Barat',
    regionEn: 'West Nusa Penida',
    tagId: 'Infinity Pool Alami',
    tagEn: 'Natural Tidal Pool',
    image: '/images/destinations/angels-bilabong.jpg',
    featured: false,
    packageSlug: 'trip-barat-standard',
  },
  {
    id: 6,
    slug: 'atuh-beach',
    titleId: 'Atuh Beach',
    titleEn: 'Atuh Beach',
    subtitleId: 'Teluk Pasir Putih Berkarang',
    subtitleEn: 'Sheltered White Sand Cove',
    descId: 'Teluk pantai pasir putih tersembunyi yang diapit pulau karang alami dan air laut tenang sebening kristal.',
    descEn: 'A sheltered white sand beach framed by dramatic rock formations, natural archways, and tranquil azure waters.',
    category: 'east',
    regionId: 'Nusa Penida Timur',
    regionEn: 'East Nusa Penida',
    tagId: 'Teluk Pasir Putih',
    tagEn: 'Quiet Cove',
    image: '/images/destinations/atuh-beach.jpg',
    featured: false,
    packageSlug: 'trip-timur',
  },
  {
    id: 7,
    slug: 'crystal-bay',
    titleId: 'Crystal Beach (Crystal Bay)',
    titleEn: 'Crystal Beach (Crystal Bay)',
    subtitleId: 'Pohon Kelapa Tropis & Golden Sunset',
    subtitleEn: 'Palm Fringed Golden Sunset Haven',
    descId: 'Pantai pasir berkilau dengan deretan pohon kelapa tropis rindang, air tenang untuk berenang, dan spot sunset terbaik.',
    descEn: 'A palm-fringed tropical beach renowned for calm crystal waters, vibrant marine life, and spectacular sunset views.',
    category: 'west',
    regionId: 'Nusa Penida Barat',
    regionEn: 'West Nusa Penida',
    tagId: 'Golden Sunset',
    tagEn: 'Sunset Beach',
    image: '/images/destinations/crystal-bay.jpg',
    featured: false,
    packageSlug: 'trip-barat-standard',
  },
];

export default function Gallery() {
  const { t, isEn } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

  // Filter gallery items
  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const activePhoto = selectedPhotoIndex !== null ? filteredItems[selectedPhotoIndex] : null;

  // Handle keyboard navigation in lightbox
  useEffect(() => {
    if (selectedPhotoIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedPhotoIndex(null);
      } else if (e.key === 'ArrowRight') {
        setSelectedPhotoIndex((prev) => (prev + 1) % filteredItems.length);
      } else if (e.key === 'ArrowLeft') {
        setSelectedPhotoIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedPhotoIndex, filteredItems.length]);

  const categories = [
    { key: 'all', label: t('gallery.filterAll'), count: GALLERY_ITEMS.length },
    { key: 'west', label: t('gallery.filterWest'), count: GALLERY_ITEMS.filter((i) => i.category === 'west').length },
    { key: 'east', label: t('gallery.filterEast'), count: GALLERY_ITEMS.filter((i) => i.category === 'east').length },
  ];

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedPhotoIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedPhotoIndex((prev) => (prev + 1) % filteredItems.length);
  };

  return (
    <div className="gallery-page">
      <PageHero
        title={t('gallery.heroTitle')}
        subtitle={t('gallery.heroSubtitle')}
        breadcrumbs={[{ label: t('nav.gallery') }]}
        image="/images/destinations/treehouse.jpg"
      />

      <section className="gallery-section">
        <div className="container">
          {/* Header Bar with Filter Tabs */}
          <div className="gallery-toolbar-wrap">
            <div className="gallery-toolbar-left">
              <span className="gallery-badge-pill">
                <Camera size={14} /> {t('gallery.badge')}
              </span>
              <span className="gallery-count-chip">
                {filteredItems.length} {t('gallery.photoCount')}
              </span>
            </div>

            {/* Filter Navigation Tabs */}
            <div className="gallery-filter-tabs" role="tablist" aria-label="Gallery category filters">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`gallery-tab-btn ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      setActiveCategory(cat.key);
                      setSelectedPhotoIndex(null);
                    }}
                  >
                    <span>{cat.label}</span>
                    <span className="tab-count-badge">{cat.count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bento / Masonry Gallery Grid */}
          <div className="gallery-bento-grid">
            {filteredItems.map((item, idx) => {
              const title = isEn ? item.titleEn : item.titleId;
              const subtitle = isEn ? item.subtitleEn : item.subtitleId;
              const region = isEn ? item.regionEn : item.regionId;
              const tag = isEn ? item.tagEn : item.tagId;

              return (
                <div
                  key={item.id}
                  className={`gallery-card-item ${item.featured ? 'is-featured' : ''}`}
                  onClick={() => setSelectedPhotoIndex(idx)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setSelectedPhotoIndex(idx);
                    }
                  }}
                  aria-label={`View ${title} HD Photo`}
                >
                  <div className="gallery-card-media">
                    <img
                      src={item.image}
                      alt={`${title} Nusa Penida`}
                      loading={idx < 4 ? 'eager' : 'lazy'}
                      className="gallery-card-img"
                    />
                    <div className="gallery-card-gradient" />

                    {/* Top Meta Chips */}
                    <div className="gallery-card-top">
                      <span className="gallery-region-pill">
                        <MapPin size={11} /> {region}
                      </span>
                      <span className="gallery-tag-pill">{tag}</span>
                    </div>

                    {/* Center Hover Action Indicator */}
                    <div className="gallery-hover-action">
                      <div className="gallery-zoom-circle">
                        <Maximize2 size={16} strokeWidth={2.2} />
                      </div>
                      <span className="gallery-zoom-text">{t('gallery.viewHd')}</span>
                    </div>

                    {/* Bottom Caption Overlay */}
                    <div className="gallery-card-bottom">
                      <h3 className="gallery-card-title">{title}</h3>
                      <p className="gallery-card-subtitle">{subtitle}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── FLOATING CINEMATIC LIGHTBOX MODAL ─── */}
      {activePhoto && (
        <div
          className="gallery-lightbox-overlay"
          onClick={() => setSelectedPhotoIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label="High Definition Photo Lightbox"
        >
          {/* Top Floating Control Bar */}
          <div className="lightbox-floating-top" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-floating-badge">
              <MapPin size={12} />
              <span>{isEn ? activePhoto.regionEn : activePhoto.regionId}</span>
              <span className="lightbox-badge-dot">•</span>
              <span className="lightbox-counter-text">
                {selectedPhotoIndex + 1} / {filteredItems.length}
              </span>
            </div>

            <button
              type="button"
              className="lightbox-floating-close"
              onClick={() => setSelectedPhotoIndex(null)}
              aria-label={t('gallery.close')}
            >
              <X size={18} strokeWidth={2.5} />
            </button>
          </div>

          {/* Floating Navigation Arrows */}
          <button
            type="button"
            className="lightbox-nav-btn prev"
            onClick={handlePrev}
            aria-label="Previous photo"
          >
            <ChevronLeft size={24} strokeWidth={2.2} />
          </button>

          <button
            type="button"
            className="lightbox-nav-btn next"
            onClick={handleNext}
            aria-label="Next photo"
          >
            <ChevronRight size={24} strokeWidth={2.2} />
          </button>

          {/* Main Photo Center Stage */}
          <div className="lightbox-center-wrap" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-image-frame">
              <img
                key={activePhoto.id}
                src={activePhoto.image}
                alt={isEn ? activePhoto.titleEn : activePhoto.titleId}
                className="lightbox-floating-img"
              />
            </div>

            {/* Bottom Glass Pill Info Bar */}
            <div className="lightbox-floating-bottom">
              <div className="lightbox-bottom-info">
                <h4 className="lightbox-bottom-title">
                  {isEn ? activePhoto.titleEn : activePhoto.titleId}
                </h4>
                <p className="lightbox-bottom-desc">
                  {isEn ? activePhoto.descEn : activePhoto.descId}
                </p>
              </div>

              <div className="lightbox-bottom-actions">
                <Link
                  to={`/destinasi/${activePhoto.slug}`}
                  className="lightbox-action-btn outline"
                  onClick={() => setSelectedPhotoIndex(null)}
                >
                  <Compass size={13} /> {t('gallery.exploreDest')}
                </Link>
                <Link
                  to={`/booking?paket=${activePhoto.packageSlug}`}
                  className="lightbox-action-btn primary"
                  onClick={() => setSelectedPhotoIndex(null)}
                >
                  <ArrowRight size={13} /> {t('gallery.bookThis')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
