import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Breadcrumbs({ items }) {
  const { t } = useLanguage();

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        <li>
          <Link to="/">{t('nav.home')}</Link>
        </li>
        {items.map((item, i) => (
          <li key={i}>
            <ChevronRight size={14} strokeWidth={1.5} aria-hidden="true" />
            {item.to ? (
              <Link to={item.to}>{item.label}</Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
