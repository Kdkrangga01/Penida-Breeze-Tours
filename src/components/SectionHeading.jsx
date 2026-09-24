import React from 'react';

export default function SectionHeading({ title, subtitle, tag, align = 'center' }) {
  return (
    <div className={`section-heading ${align}`}>
      {tag && (
        <div className="section-badge">
          <span className="section-badge-dot" />
          <span className="section-badge-text">{tag}</span>
        </div>
      )}
      <h2 className="section-heading-title">{title}</h2>
      {subtitle && <p className="section-heading-sub">{subtitle}</p>}
    </div>
  );
}
