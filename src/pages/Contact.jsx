import React from 'react';
import { Phone, Mail, Instagram, MapPin, Clock, MessageCircle } from 'lucide-react';
import { SITE, getWhatsAppUrl } from '../config/site';
import PageHero from '../components/PageHero';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  const { t, isEn } = useLanguage();

  const waMsg = isEn
    ? 'Hello Penida Breeze Tours, I would like to inquire about tour packages to Nusa Penida.'
    : 'Halo Penida Breeze Tours, saya ingin konsultasi paket wisata ke Nusa Penida.';

  return (
    <>
      <PageHero
        title={t('contact.heroTitle')}
        subtitle={t('contact.heroSubtitle')}
        breadcrumbs={[{ label: t('nav.contact') }]}
        image="/images/destinations/crystal-bay.jpg"
      />

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>{t('contact.title')}</h2>
              <p className="contact-intro">
                {t('contact.intro')}
              </p>

              <div className="contact-items">
                <div className="contact-item">
                  <div className="contact-icon">
                    <Phone size={22} strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <div>
                    <h3>{t('contact.waTitle')}</h3>
                    <a href={getWhatsAppUrl(waMsg)} target="_blank" rel="noopener noreferrer">
                      {SITE.whatsappDisplay}
                    </a>
                    <p>{t('contact.waDesc')}</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <Mail size={22} strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <div>
                    <h3>{t('contact.emailTitle')}</h3>
                    <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                    <p>{t('contact.emailDesc')}</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <Instagram size={22} strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <div>
                    <h3>Instagram</h3>
                    <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer">
                      {SITE.instagram}
                    </a>
                    <p>{isEn ? 'Follow latest updates & photo highlights' : 'Follow dokumentasi & update trip terbaru'}</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <MapPin size={22} strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <div>
                    <h3>{t('contact.locationTitle')}</h3>
                    <p>{SITE.location}</p>
                    <p>{t('contact.locationDesc')}</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <Clock size={22} strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <div>
                    <h3>{t('contact.hoursTitle')}</h3>
                    <p>{t('contact.hoursVal')}</p>
                    <p>{t('contact.hoursNote')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-cta-card">
              <MessageCircle size={32} strokeWidth={1.5} aria-hidden="true" />
              <h3>{t('contact.ctaTitle')}</h3>
              <p>{t('contact.ctaDesc')}</p>
              <a
                href={getWhatsAppUrl(waMsg)}
                className="btn btn-primary btn-lg btn-block"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone size={18} strokeWidth={1.5} aria-hidden="true" /> {t('contact.ctaBtn')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
