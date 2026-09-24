import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function DestinationCard({ dest, variant = 'default', index = 0 }) {
  const { t } = useLanguage();
  const regionLabel = dest.category === 'west' ? t('dest.west') : t('dest.east');

  return (
    <article
      className={`dest-editorial-card dest-card-${variant} ${variant === 'featured' ? 'reveal-scale' : 'reveal'}`}
      data-delay={index * 90}
    >
      <Link
        to={`/destinasi/${dest.slug}`}
        className="dest-card-hitbox"
        aria-label={`Explore ${dest.name}`}
      >
        <div className="dest-card-media-wrapper">
          <img
            src={dest.image}
            alt={`${dest.name} Nusa Penida`}
            loading="lazy"
            className="dest-card-photo"
          />
          <div className="dest-card-overlay-scrim" />
        </div>

        {/* Badges on top - Clean & minimal */}
        <div className="dest-card-meta-top">
          <span className="dest-badge-region">
            {regionLabel}
          </span>
          {variant === 'featured' && (
            <span className="dest-badge-highlight">
              {t('dest.mustVisit')}
            </span>
          )}
        </div>

        {/* Content bottom */}
        <div className="dest-card-meta-bottom">
          <div className="dest-card-text-group">
            <span className="dest-card-tagline-micro">{dest.tagline}</span>
            <h3 className="dest-card-headline">{dest.name}</h3>
            {variant === 'featured' && (
              <p className="dest-card-teaser">{dest.description}</p>
            )}
          </div>

          <div className="dest-card-action-pill">
            <span className="dest-action-label">{t('dest.explore')}</span>
            <ArrowRight size={13} strokeWidth={2} className="dest-action-arrow" aria-hidden="true" />
          </div>
        </div>
      </Link>
    </article>
  );
}
