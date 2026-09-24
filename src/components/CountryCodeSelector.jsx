import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, Search, Check } from 'lucide-react';

export const COUNTRY_CODES = [
  { iso: 'ID', code: '+62', flag: '🇮🇩', name: 'Indonesia' },
  { iso: 'AU', code: '+61', flag: '🇦🇺', name: 'Australia' },
  { iso: 'SG', code: '+65', flag: '🇸🇬', name: 'Singapore' },
  { iso: 'MY', code: '+60', flag: '🇲🇾', name: 'Malaysia' },
  { iso: 'US', code: '+1', flag: '🇺🇸', name: 'United States' },
  { iso: 'GB', code: '+44', flag: '🇬🇧', name: 'United Kingdom' },
  { iso: 'DE', code: '+49', flag: '🇩🇪', name: 'Germany' },
  { iso: 'FR', code: '+33', flag: '🇫🇷', name: 'France' },
  { iso: 'NL', code: '+31', flag: '🇳🇱', name: 'Netherlands' },
  { iso: 'IN', code: '+91', flag: '🇮🇳', name: 'India' },
  { iso: 'JP', code: '+81', flag: '🇯🇵', name: 'Japan' },
  { iso: 'KR', code: '+82', flag: '🇰🇷', name: 'South Korea' },
  { iso: 'CN', code: '+86', flag: '🇨🇳', name: 'China' },
  { iso: 'RU', code: '+7', flag: '🇷🇺', name: 'Russia' },
  { iso: 'NZ', code: '+64', flag: '🇳🇿', name: 'New Zealand' },
  { iso: 'CA', code: '+1', flag: '🇨🇦', name: 'Canada' },
  { iso: 'IT', code: '+39', flag: '🇮🇹', name: 'Italy' },
  { iso: 'ES', code: '+34', flag: '🇪🇸', name: 'Spain' },
  { iso: 'CH', code: '+41', flag: '🇨🇭', name: 'Switzerland' },
  { iso: 'SE', code: '+46', flag: '🇸🇪', name: 'Sweden' },
  { iso: 'TH', code: '+66', flag: '🇹🇭', name: 'Thailand' },
  { iso: 'PH', code: '+63', flag: '🇵🇭', name: 'Philippines' },
  { iso: 'VN', code: '+84', flag: '🇻🇳', name: 'Vietnam' },
  { iso: 'AE', code: '+971', flag: '🇦🇪', name: 'United Arab Emirates' },
  { iso: 'SA', code: '+966', flag: '🇸🇦', name: 'Saudi Arabia' },
  { iso: 'BR', code: '+55', flag: '🇧🇷', name: 'Brazil' },
];

export default function CountryCodeSelector({ selected, onChange, isEn = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef(null);
  const searchInputRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
      // Auto focus search input when opened
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const filteredCountries = useMemo(() => {
    if (!search.trim()) return COUNTRY_CODES;
    const q = search.toLowerCase().trim();
    return COUNTRY_CODES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.iso.toLowerCase().includes(q) ||
        c.code.includes(q)
    );
  }, [search]);

  return (
    <div className="phone-country-picker-wrap" ref={containerRef}>
      <button
        type="button"
        className={`phone-country-btn ${isOpen ? 'active' : ''}`}
        onClick={() => {
          setIsOpen(!isOpen);
          setSearch('');
        }}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Pilih Kode Negara"
      >
        <img
          src={`https://flagcdn.com/w40/${selected.iso.toLowerCase()}.png`}
          srcSet={`https://flagcdn.com/w80/${selected.iso.toLowerCase()}.png 2x`}
          alt={`${selected.name} flag`}
          className="country-flag-img"
          width="20"
          height="14"
        />
        <strong className="country-iso-tag">{selected.iso}</strong>
        <span className="country-dial-code">{selected.code}</span>
        <ChevronDown size={13} strokeWidth={2.5} className={`country-chevron ${isOpen ? 'open' : ''}`} />
      </button>

      {isOpen && (
        <div className="phone-country-dropdown-menu" role="listbox">
          <div className="country-search-header">
            <Search size={13} className="country-search-icon" />
            <input
              ref={searchInputRef}
              type="text"
              className="country-search-field"
              placeholder={isEn ? 'Search country / code...' : 'Cari negara / kode...'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <div className="country-options-scroll">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((c) => {
                const isCurrent = c.iso === selected.iso;
                return (
                  <button
                    key={c.iso}
                    type="button"
                    className={`country-option-item ${isCurrent ? 'selected' : ''}`}
                    onClick={() => {
                      onChange(c);
                      setIsOpen(false);
                      setSearch('');
                    }}
                    role="option"
                    aria-selected={isCurrent}
                  >
                    <img
                      src={`https://flagcdn.com/w40/${c.iso.toLowerCase()}.png`}
                      srcSet={`https://flagcdn.com/w80/${c.iso.toLowerCase()}.png 2x`}
                      alt={`${c.name} flag`}
                      className="country-flag-img"
                      width="20"
                      height="14"
                      loading="lazy"
                    />
                    <strong className="opt-iso">{c.iso}</strong>
                    <span className="opt-name">{c.name}</span>
                    <span className="opt-code">{c.code}</span>
                    {isCurrent && <Check size={14} strokeWidth={2.5} className="opt-check" />}
                  </button>
                );
              })
            ) : (
              <div className="country-no-results">
                {isEn ? 'No country found' : 'Negara tidak ditemukan'}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
