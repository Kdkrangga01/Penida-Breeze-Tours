import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import HeroSlider from '../components/HeroSlider';
import TrustStrip from '../components/TrustStrip';
import PackageCard from '../components/PackageCard';
import DestinationCard from '../components/DestinationCard';
import BookingCTA from '../components/BookingCTA';
import FAQAccordion from '../components/FAQAccordion';
import ReviewsSection from '../components/ReviewsSection';
import { packages } from '../data/packages';
import { destinations } from '../data/destinations';
import { faqs } from '../data/faq';
import { getWhatsAppUrl } from '../config/site';

export default function Home() {
  const { t, getTranslatedPackage, getTranslatedFaq, getTranslatedDestination } = useLanguage();

  // 7 destinations for showcase
  const allDestinations = destinations.slice(0, 7);
  const featuredDest = allDestinations[0]; // Kelingking Beach
  const secondaryDests = allDestinations.slice(1, 3); // Broken Beach, Angel Bilabong
  const gridDests = allDestinations.slice(3, 7); // Crystal Beach, Diamond Beach, Atuh Beach, Tree House

  return (
    <>
      {/* ─── 01. HERO SECTION WITH IMAGE SLIDER ─── */}
      <HeroSlider />

      {/* ─── 02. TRUST SECTION ─── */}
      <TrustStrip />

      {/* ─── 03. TOUR PACKAGES ─── */}
      <section className="section-packages section" id="paket-tour">
        <div className="container">
          <div className="editorial-section-header reveal">
            <div className="section-eyebrow">
              <span>{t('pkg.sectionEyebrow')}</span>
            </div>
            <h2 className="section-heading-h2">
              {t('pkg.sectionTitle')}
            </h2>
            <p className="section-subtext">
              {t('pkg.sectionSubtitle')}
            </p>
          </div>

          <div className="packages-editorial-grid">
            {packages.map((pkg, idx) => (
              <PackageCard key={pkg.id} pkg={getTranslatedPackage(pkg)} index={idx} />
            ))}
          </div>

          <div className="section-footer-cta reveal" data-delay={150}>
            <p className="custom-trip-hint">
              {t('pkg.customHint')}
            </p>
            <Link to="/booking" className="btn btn-outline-pill">
              <span>{t('pkg.customBtn')}</span>
              <ArrowRight size={15} strokeWidth={2} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 04. DESTINATION SHOWCASE ─── */}
      <section className="section-destinations section section-alt" id="destinasi">
        <div className="container">
          <div className="editorial-section-header reveal">
            <div className="section-eyebrow">
              <span>{t('dest.sectionEyebrow')}</span>
            </div>
            <h2 className="section-heading-h2">
              {t('dest.sectionTitle')}
            </h2>
            <p className="section-subtext">
              {t('dest.sectionSubtitle')}
            </p>
          </div>

          {/* Controlled Asymmetric Editorial Layout */}
          <div className="destinations-asymmetric-grid">
            {/* Top Row: 1 Large Featured (Kelingking) + 2 Medium (Broken Beach & Angel Bilabong) */}
            <div className="dest-row-hero">
              {featuredDest && (
                <div className="dest-col-featured">
                  <DestinationCard dest={getTranslatedDestination(featuredDest)} variant="featured" index={0} />
                </div>
              )}
              <div className="dest-col-duo">
                {secondaryDests.map((dest, idx) => (
                  <DestinationCard key={dest.id} dest={getTranslatedDestination(dest)} variant="medium" index={idx + 1} />
                ))}
              </div>
            </div>

            {/* Bottom Row: 4 Balanced Cards */}
            <div className="dest-row-quad">
              {gridDests.map((dest, idx) => (
                <DestinationCard key={dest.id} dest={getTranslatedDestination(dest)} variant="compact" index={idx + 3} />
              ))}
            </div>
          </div>

          <div className="section-footer-cta reveal" data-delay={150}>
            <Link to="/destinasi" className="btn btn-outline-pill">
              <span>{t('dest.viewAll')}</span>
              <ArrowRight size={15} strokeWidth={2} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 05. ABOUT SECTION ─── */}
      <section className="section-about section" id="tentang-kami">
        <div className="container">
          <div className="about-editorial-split">
            {/* Visual Image Reveal */}
            <div className="about-visual-column reveal-left">
              <div className="about-image-frame">
                <img
                  src="/images/destinations/atuh-beach.jpg"
                  alt="Panorama Pantai Atuh Nusa Penida"
                  loading="lazy"
                  className="about-primary-img"
                />
                <div className="about-image-gradient" />
              </div>
            </div>

            {/* Content Story Column */}
            <div className="about-content-column reveal-right">
              <div className="section-eyebrow">
                <span>{t('about.sectionEyebrow')}</span>
              </div>
              <h2 className="section-heading-h2">
                {t('about.headline')}
              </h2>
              <p className="about-lead-text">
                {t('about.lead')}
              </p>
              <p className="about-body-text">
                {t('about.body')}
              </p>

              {/* 4 Highlights with Clean Numbering & Staggered Reveal */}
              <div className="about-highlights-grid">
                <div className="about-highlight-item reveal" data-delay={180}>
                  <span className="about-num-accent">01</span>
                  <div className="about-highlight-text">
                    <h4>{t('about.item1.title')}</h4>
                    <p>{t('about.item1.desc')}</p>
                  </div>
                </div>

                <div className="about-highlight-item reveal" data-delay={260}>
                  <span className="about-num-accent">02</span>
                  <div className="about-highlight-text">
                    <h4>{t('about.item2.title')}</h4>
                    <p>{t('about.item2.desc')}</p>
                  </div>
                </div>

                <div className="about-highlight-item reveal" data-delay={340}>
                  <span className="about-num-accent">03</span>
                  <div className="about-highlight-text">
                    <h4>{t('about.item3.title')}</h4>
                    <p>{t('about.item3.desc')}</p>
                  </div>
                </div>

                <div className="about-highlight-item reveal" data-delay={420}>
                  <span className="about-num-accent">04</span>
                  <div className="about-highlight-text">
                    <h4>{t('about.item4.title')}</h4>
                    <p>{t('about.item4.desc')}</p>
                  </div>
                </div>
              </div>

              <div className="about-actions reveal" data-delay={480}>
                <Link to="/tentang-kami" className="btn btn-outline-pill">
                  <span>{t('about.btnProfile')}</span>
                  <ArrowRight size={15} strokeWidth={2} aria-hidden="true" />
                </Link>
                <a
                  href={getWhatsAppUrl('Halo Penida Breeze Tours, saya ingin konsultasi perjalanan ke Nusa Penida.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-wa-link"
                >
                  <Phone size={14} strokeWidth={2} aria-hidden="true" />
                  <span>{t('about.btnAsk')}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 06. HOW IT WORKS ─── */}
      <section className="section-timeline section section-alt" id="cara-booking">
        <div className="container">
          <div className="editorial-section-header reveal">
            <div className="section-eyebrow">
              <span>{t('timeline.sectionEyebrow')}</span>
            </div>
            <h2 className="section-heading-h2">
              {t('timeline.sectionTitle')}
            </h2>
            <p className="section-subtext">
              {t('timeline.sectionSubtitle')}
            </p>
          </div>

          {/* Timeline Process with Progress Line */}
          <div className="timeline-process-wrap">
            <div className="timeline-connecting-rail reveal" aria-hidden="true">
              <div className="timeline-rail-progress" />
            </div>

            <div className="timeline-steps-grid">
              {/* Step 01 */}
              <div className="timeline-step-card reveal" data-delay={0}>
                <div className="timeline-step-badge">
                  <span className="step-num">01</span>
                </div>
                <div className="timeline-step-content">
                  <h3 className="timeline-step-title">{t('timeline.step1.title')}</h3>
                  <p className="timeline-step-desc">
                    {t('timeline.step1.desc')}
                  </p>
                </div>
              </div>

              {/* Step 02 */}
              <div className="timeline-step-card reveal" data-delay={100}>
                <div className="timeline-step-badge">
                  <span className="step-num">02</span>
                </div>
                <div className="timeline-step-content">
                  <h3 className="timeline-step-title">{t('timeline.step2.title')}</h3>
                  <p className="timeline-step-desc">
                    {t('timeline.step2.desc')}
                  </p>
                </div>
              </div>

              {/* Step 03 */}
              <div className="timeline-step-card reveal" data-delay={200}>
                <div className="timeline-step-badge">
                  <span className="step-num">03</span>
                </div>
                <div className="timeline-step-content">
                  <h3 className="timeline-step-title">{t('timeline.step3.title')}</h3>
                  <p className="timeline-step-desc">
                    {t('timeline.step3.desc')}
                  </p>
                </div>
              </div>

              {/* Step 04 */}
              <div className="timeline-step-card reveal" data-delay={300}>
                <div className="timeline-step-badge">
                  <span className="step-num">04</span>
                </div>
                <div className="timeline-step-content">
                  <h3 className="timeline-step-title">{t('timeline.step4.title')}</h3>
                  <p className="timeline-step-desc">
                    {t('timeline.step4.desc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 07. VERIFIED REVIEWS & TESTIMONIALS ─── */}
      <ReviewsSection />

      {/* ─── 08. FAQ SECTION ─── */}
      <section className="section" id="faq-section">
        <div className="container container-narrow">
          <div className="editorial-section-header reveal">
            <div className="section-eyebrow">
              <span>{t('faq.sectionEyebrow')}</span>
            </div>
            <h2 className="section-heading-h2">
              {t('faq.sectionTitle')}
            </h2>
            <p className="section-subtext">
              {t('faq.sectionSubtitle')}
            </p>
          </div>

          <div className="reveal" data-delay={100}>
            <FAQAccordion items={faqs.map(getTranslatedFaq)} limit={5} />
          </div>

          <div className="section-footer-cta reveal" data-delay={200}>
            <Link to="/faq" className="btn btn-outline-pill">
              <span>{t('faq.sectionEyebrow')}</span>
              <ArrowRight size={15} strokeWidth={2} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 08. FINAL CTA ─── */}
      <BookingCTA />
    </>
  );
}
