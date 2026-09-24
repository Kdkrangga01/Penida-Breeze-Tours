import React from 'react';
import { faqs } from '../data/faq';
import PageHero from '../components/PageHero';
import FAQAccordion from '../components/FAQAccordion';
import BookingCTA from '../components/BookingCTA';
import { useLanguage } from '../context/LanguageContext';

export default function FAQ() {
  const { t, getTranslatedFaq } = useLanguage();

  return (
    <>
      <PageHero
        title={t('faq.heroTitle')}
        subtitle={t('faq.heroSubtitle')}
        breadcrumbs={[{ label: 'FAQ' }]}
        image="/images/destinations/angels-bilabong.jpg"
      />

      <section className="section">
        <div className="container container-narrow">
          <FAQAccordion items={faqs.map(getTranslatedFaq)} />
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
