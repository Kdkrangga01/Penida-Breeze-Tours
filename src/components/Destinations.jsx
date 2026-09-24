import React, { useState } from 'react';
import { destinations } from '../data/destinations';
import { Eye, MapPin, ArrowRight, X, Star, Building, Hiking, Calendar } from 'lucide-react';

export default function Destinations() {
  const [filter, setFilter] = useState('all');
  const [activeModal, setActiveModal] = useState(null);

  const filtered = filter === 'all' 
    ? destinations
    : destinations.filter((d) => d.category === filter);

  return (
    <section className="section section-dark" id="virtual-tour">
      <div className="section-container">
        <div className="section-header reveal">
          <span className="section-badge">
            <Eye size={16} /> Destinasi Wisata
          </span>
          <h2 className="section-title">Jelajahi Destinasi Nusa Penida</h2>
          <p className="section-subtitle">
            Klik pada setiap destinasi untuk melihat detail lengkap, panorama alam, dan daya tarik wisata.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="filter-buttons reveal">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Semua Destinasi
          </button>
          <button
            className={`filter-btn ${filter === 'west' ? 'active' : ''}`}
            onClick={() => setFilter('west')}
          >
            Trip Barat (West)
          </button>
          <button
            className={`filter-btn ${filter === 'east' ? 'active' : ''}`}
            onClick={() => setFilter('east')}
          >
            Trip Timur (East)
          </button>
        </div>

        {/* Destination Grid */}
        <div className="dest-grid">
          {filtered.map((dest, index) => (
            <div
              key={dest.id}
              className="dest-card reveal"
              style={{ transitionDelay: `${index * 0.08}s` }}
              onClick={() => setActiveModal(dest)}
            >
              <div className="dest-card-img">
                <img src={dest.image} alt={dest.name} loading="lazy" />
                <div className="dest-card-overlay"></div>
                <span className="dest-card-badge">{dest.categoryLabel}</span>
              </div>
              <div className="dest-card-body"> 
                <h3>{dest.name}</h3>
                <p>{dest.description}</p>
              </div>
              <div className="dest-card-footer">
                <span className="dest-card-tag">
                  <MapPin size={14} /> {dest.location}
                </span>
                <span className="dest-card-btn">
                  Explore <ArrowRight size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Detail */}
        {activeModal && (
          <div className="modal-overlay active" onClick={() => setActiveModal(null)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-img">
                <img src={activeModal.image} alt={activeModal.name} />
                <button className="modal-close" onClick={() => setActiveModal(null)}>
                  <X size={20} />
                </button>
              </div>
              <div className="modal-body">
                <h2>{activeModal.name}</h2>
                <div className="modal-location">
                  <MapPin size={16} /> {activeModal.location}
                </div>
                <p className="modal-desc">{activeModal.fullDescription}</p>

                <div className="modal-info-grid">
                  <div className="modal-info-item">
                    <h4><Star size={16} /> Daya Tarik</h4>
                    <p>{activeModal.attraction}</p>
                  </div>
                  <div className="modal-info-item">
                    <h4><Building size={16} /> Fasilitas</h4>
                    <p>{activeModal.facilities}</p>
                  </div>
                  <div className="modal-info-item">
                    <h4><Hiking size={16} /> Aktivitas</h4>
                    <p>{activeModal.activities}</p>
                  </div>
                  <div className="modal-info-item">
                    <h4><Calendar size={16} /> Waktu Terbaik</h4>
                    <p>{activeModal.bestTime}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
