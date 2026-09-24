import React from 'react';
import Breadcrumbs from './Breadcrumbs';

export default function PageHero({ title, subtitle, breadcrumbs, image }) {
  return (
    <section className="page-hero">
      {image && (
        <div className="page-hero-bg">
          <img src={image} alt="" loading="eager" aria-hidden="true" />
          <div className="page-hero-overlay" />
        </div>
      )}
      <div className="page-hero-content container">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <h1 className="page-hero-title">{title}</h1>
        {subtitle && <p className="page-hero-subtitle">{subtitle}</p>}
      </div>
    </section>
  );
}
