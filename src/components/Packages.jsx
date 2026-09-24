import React from 'react';
import { packages } from '../data/packages';
import { formatPrice } from '../config/site';
import { Clock, Users, Car, Utensils, Ship, Ticket, CheckCircle2, Suitcase } from 'lucide-react';

const iconMap = {
  Car: Car,
  Utensils: Utensils,
  Ship: Ship,
  Ticket: Ticket,
  Users: Users,
};

export default function Packages({ onSelectPackage }) {
  return (
    <section className="section section-dark" id="paket">
      <div className="section-container">
        <div className="section-header reveal">
          <span className="section-badge">
            <Suitcase size={16} /> Paket Tour
          </span>
          <h2 className="section-title">Pilihan Paket Wisata</h2>
          <p className="section-subtitle">
            Pilih paket tour yang sesuai dengan kebutuhan Anda. Tersedia Paket All-Inclusive lengkap (Car, Lunch, Fast Boat, Retribusi) dan Paket Sewa Transport Tour (Mobil privat ber-AC + BBM, maks. 5 pax).
          </p>
        </div>

        <div className="packages-grid">
          {packages.map((pkg, idx) => (
            <div
              key={pkg.id}
              className={`package-card reveal glass-card ${pkg.featured ? 'featured' : ''}`}
              style={{ transitionDelay: `${(idx + 1) * 0.1}s` }}
            >
              {pkg.badge && (
                <span className="package-featured-badge">{pkg.badge}</span>
              )}
              <div className="package-img">
                <img src={pkg.image} alt={pkg.title} loading="lazy" />
              </div>
              <div className="package-body">
                <h3>{pkg.title}</h3>
                <div className="package-meta">
                  <span><Clock size={15} /> {pkg.duration}</span>
                  <span><Users size={15} /> {pkg.minPax}</span>
                </div>

                <div className="package-destinations">
                  <h4>Destinasi yang Dikunjungi</h4>
                  <ul className="package-destination-list">
                    {pkg.destinations.map((dest, i) => (
                      <li key={i}>
                        <CheckCircle2 size={14} style={{ color: 'var(--primary-light)', flexShrink: 0 }} /> {dest}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="package-facilities">
                  {pkg.facilities.map((fac, i) => {
                    const IconComp = iconMap[fac.icon] || CheckCircle2;
                    return (
                      <span key={i} className="package-facility-tag">
                        <IconComp size={13} /> {fac.name}
                      </span>
                    );
                  })}
                </div>

                <div className="package-footer">
                  <div className="package-price">
                    <span className="price-label">Mulai dari</span>
                    <div>
                      <span className="price-value">{formatPrice(pkg.price)}</span>
                      <span className="price-unit">{pkg.unit}</span>
                    </div>
                  </div>
                  <a
                    href="#kontak"
                    className="btn-book"
                    onClick={() => onSelectPackage && onSelectPackage(pkg.id)}
                  >
                    Booking
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
