import React, { useState } from 'react';
import { destinations, getDestinationsByCategory } from '../data/destinations';
import PageHero from '../components/PageHero';
import DestinationCard from '../components/DestinationCard';
import BookingCTA from '../components/BookingCTA';
import TrustStrip from '../components/TrustStrip';
import { useLanguage } from '../context/LanguageContext';

export default function Destinations() {
  const { t, isEn, getTranslatedDestination } = useLanguage();
  const [filter, setFilter] = useState('all');
  const rawFiltered = getDestinationsByCategory(filter);
  const filtered = rawFiltered.map(getTranslatedDestination);

  const filterOptions = [
    { value: 'all', label: isEn ? 'All Destinations' : 'Semua Destinasi' },
    { value: 'west', label: isEn ? 'West Nusa Penida' : 'Nusa Penida Barat' },
    { value: 'east', label: isEn ? 'East Nusa Penida' : 'Nusa Penida Timur' },
  ];

  return (
    <>
      <PageHero
        title={isEn ? 'Iconic Nusa Penida Destinations' : 'Destinasi Ikonik Nusa Penida'}
        subtitle={
          isEn
            ? 'Discover breathtaking cliff formations, hidden lagoons, and turquoise tropical waters across Nusa Penida.'
            : 'Jelajahi pantai eksotis, tebing karang dramatis, dan laguna alami tersembunyi di Nusa Penida.'
        }
        breadcrumbs={[{ label: t('nav.destinations') }]}
        image="/images/destinations/diamond-beach.jpg"
      />

      <TrustStrip />

      <section className="section" style={{ background: '#FFFFFF', minHeight: '600px' }}>
        <div className="container">
          {/* Animated Minimal Filter Tabs */}
          <div
            className="filter-bar reveal"
            style={{
              display: 'flex',
              gap: '10px',
              justifyContent: 'center',
              marginBottom: '40px',
              flexWrap: 'wrap',
            }}
          >
            {filterOptions.map((f) => {
              const isActive = filter === f.value;
              return (
                <button
                  key={f.value}
                  className={`btn ${isActive ? 'btn-primary' : 'btn-outline-pill'}`}
                  style={{
                    padding: '9px 22px',
                    borderRadius: '99px',
                    fontSize: '13px',
                    fontWeight: 700,
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onClick={() => setFilter(f.value)}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          <div className="dest-row-quad">
            {filtered.map((dest, i) => (
              <DestinationCard
                key={dest.id}
                dest={dest}
                variant={i === 0 && filter === 'all' ? 'featured' : 'compact'}
                index={i}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="empty-state">
              {isEn ? 'No destinations found for this filter.' : 'Tidak ada destinasi untuk filter ini.'}
            </p>
          )}
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
