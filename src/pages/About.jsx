import React from 'react';
import { Shield, Users, MapPin, Award, Heart, Compass } from 'lucide-react';
import PageHero from '../components/PageHero';
import BookingCTA from '../components/BookingCTA';
import TrustStrip from '../components/TrustStrip';
import { useLanguage } from '../context/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  return (
    <>
      <PageHero
        title={t('about.heroTitle')}
        subtitle={t('about.heroSubtitle')}
        breadcrumbs={[{ label: t('nav.about') }]}
        image="/images/destinations/atuh-beach.jpg"
      />

      <TrustStrip />

      {/* Story */}
      <section className="section">
        <div className="container container-narrow">
          <div className="about-story" style={{ textAlign: 'center' }}>
            <h2 className="section-heading-h2" style={{ marginBottom: '20px' }}>{t('about.ourStory')}</h2>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--ink-soft)', marginBottom: '20px' }}>
              {t('about.storyP1')}
            </p>
            <p style={{ fontSize: '1.02rem', lineHeight: '1.8', color: 'var(--muted)' }}>
              {t('about.storyP2')}
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section section-alt">
        <div className="container">
          <div className="editorial-section-header">
            <div className="section-eyebrow">{t('about.valuesEyebrow')}</div>
            <h2 className="section-heading-h2">{t('about.valuesTitle')}</h2>
            <p className="section-subtext">{t('about.valuesSubtitle')}</p>
          </div>

          <div className="about-values-grid">
            <div className="about-value">
              <div className="about-value-icon">
                <Shield size={24} strokeWidth={1.75} aria-hidden="true" />
              </div>
              <h3>{t('about.val1Title')}</h3>
              <p>{t('about.val1Desc')}</p>
            </div>
            <div className="about-value">
              <div className="about-value-icon">
                <Heart size={24} strokeWidth={1.75} aria-hidden="true" />
              </div>
              <h3>{t('about.val2Title')}</h3>
              <p>{t('about.val2Desc')}</p>
            </div>
            <div className="about-value">
              <div className="about-value-icon">
                <Award size={24} strokeWidth={1.75} aria-hidden="true" />
              </div>
              <h3>{t('about.val3Title')}</h3>
              <p>{t('about.val3Desc')}</p>
            </div>
            <div className="about-value">
              <div className="about-value-icon">
                <Compass size={24} strokeWidth={1.75} aria-hidden="true" />
              </div>
              <h3>{t('about.val4Title')}</h3>
              <p>{t('about.val4Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick stats */}
      <section className="section">
        <div className="container">
          <div className="about-stats">
            <div className="about-stat">
              <MapPin size={24} strokeWidth={1.75} aria-hidden="true" />
              <strong>7+</strong>
              <span>{t('about.statDest')}</span>
            </div>
            <div className="about-stat">
              <Users size={24} strokeWidth={1.75} aria-hidden="true" />
              <strong>3</strong>
              <span>{t('about.statPkg')}</span>
            </div>
            <div className="about-stat">
              <Compass size={24} strokeWidth={1.75} aria-hidden="true" />
              <strong>100%</strong>
              <span>{t('about.statGuide')}</span>
            </div>
          </div>
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
