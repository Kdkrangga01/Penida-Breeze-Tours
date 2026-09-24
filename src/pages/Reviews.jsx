import React, { useEffect } from 'react';
import PageHero from '../components/PageHero';
import ReviewsSection from '../components/ReviewsSection';
import BookingCTA from '../components/BookingCTA';
import { useLanguage } from '../context/LanguageContext';

export default function Reviews() {
  const { lang, t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = lang === 'id' 
      ? 'Ulasan Wisatawan & Testimoni | Penida Breeze Tours'
      : 'Traveler Reviews & Testimonials | Penida Breeze Tours';
  }, [lang]);

  return (
    <>
      <PageHero
        title={lang === 'id' ? 'Ulasan & Pengalaman Wisatawan' : 'Traveler Reviews & Stories'}
        subtitle={
          lang === 'id'
            ? 'Testimoni nyata dan pengalaman otentik dari para traveler yang telah menjelajahi keindahan Nusa Penida bersama Penida Breeze Tours.'
            : 'Real stories and verified experiences from adventurers around the world who explored Nusa Penida with Penida Breeze Tours.'
        }
        breadcrumbs={[
          { label: lang === 'id' ? 'Ulasan' : 'Reviews' }
        ]}
        image="/images/destinations/kelingking-beach.jpg"
      />

      <ReviewsSection />

      <BookingCTA />
    </>
  );
}
