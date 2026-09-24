import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function TrustStrip() {
  const { t } = useLanguage();

  const trustItems = [
    {
      num: '01',
      title: t('trust.1.title'),
      desc: t('trust.1.desc'),
    },
    {
      num: '02',
      title: t('trust.2.title'),
      desc: t('trust.2.desc'),
    },
    {
      num: '03',
      title: t('trust.3.title'),
      desc: t('trust.3.desc'),
    },
    {
      num: '04',
      title: t('trust.4.title'),
      desc: t('trust.4.desc'),
    },
  ];

  return (
    <section className="trust-strip-clean" aria-label="Keunggulan Penida Breeze Tours">
      <div className="container">
        <div className="trust-strip-grid">
          {trustItems.map((item, idx) => (
            <div key={idx} className="trust-strip-card reveal" data-delay={idx * 100}>
              <div className="trust-strip-num">{item.num}</div>
              <div className="trust-strip-content">
                <h3 className="trust-strip-title">{item.title}</h3>
                <p className="trust-strip-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
