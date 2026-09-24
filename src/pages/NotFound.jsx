import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <section className="not-found">
      <div className="container">
        <div className="not-found-content">
          <Compass size={64} strokeWidth={1} aria-hidden="true" className="not-found-icon" />
          <h1>404</h1>
          <h2>{t('notFound.title')}</h2>
          <p>
            {t('notFound.desc')}
          </p>
          <Link to="/" className="btn btn-primary">
            <ArrowLeft size={16} strokeWidth={1.5} aria-hidden="true" /> {t('notFound.btnHome')}
          </Link>
        </div>
      </div>
    </section>
  );
}
