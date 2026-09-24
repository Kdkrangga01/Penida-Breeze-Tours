import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Calendar,
  User,
  Phone,
  Users,
  Check,
  Clock,
  Plus,
  Minus,
  X,
  Send,
  Car,
  Ship,
  Utensils,
  Ticket
} from 'lucide-react';
import { packages } from '../data/packages';
import { SITE, formatPrice, getWhatsAppUrl } from '../config/site';
import PageHero from '../components/PageHero';
import TrustStrip from '../components/TrustStrip';
import { useLanguage } from '../context/LanguageContext';
import CountryCodeSelector, { COUNTRY_CODES } from '../components/CountryCodeSelector';
import { supabase } from '../config/supabase';

export default function Booking() {
  const { t, isEn, getTranslatedPackage } = useLanguage();
  const [searchParams] = useSearchParams();
  const preselectedSlug = searchParams.get('paket');
  const preselectedDate = searchParams.get('date') || '';
  const preselectedPax = searchParams.get('pax') || '';

  const matchedPkg = preselectedSlug
    ? packages.find((p) => p.slug === preselectedSlug || p.altSlug === preselectedSlug || p.id === preselectedSlug)
    : null;

  const [name, setName] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]); // Default ID +62 Indonesia
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(preselectedDate);
  const [pkgId, setPkgId] = useState(matchedPkg?.id || packages[0]?.id || '');
  const [qty, setQty] = useState(preselectedPax || '');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [showSummary, setShowSummary] = useState(false);
  const [isPriceAnimating, setIsPriceAnimating] = useState(false);

  const rawSelectedPkg = packages.find((p) => p.id === pkgId) || packages[0];
  const selectedPkg = getTranslatedPackage(rawSelectedPkg);
  const isTransportOnly = rawSelectedPkg?.packageType === 'transport_only';
  const isPerCar = rawSelectedPkg?.pricingType === 'per_car' || isTransportOnly;
  const maxPax = rawSelectedPkg?.maxPaxNumber || null;
  const minPax = rawSelectedPkg?.minPaxNumber || 1;
  const qtyNum = parseInt(qty, 10) || minPax;

  // Calculation logic:
  // - 400k (Trip Barat All-Inclusive): Per pax (1 pax = 400k, 2 pax = 800k, dst)
  // - 650k & 700k (Transport Only): Flat normal rate per car (1-5 pax tetap harga normal 650k / 700k)
  const total = isPerCar ? (selectedPkg?.price || 0) : ((selectedPkg?.price || 0) * qtyNum);

  // Today's date for min validation (YYYY-MM-DD)
  const today = new Date().toISOString().split('T')[0];

  // Set default quantity when package changes or initial load, respect maxPax
  useEffect(() => {
    if (!qty) {
      setQty('2');
    } else if (rawSelectedPkg?.maxPaxNumber && parseInt(qty, 10) > rawSelectedPkg.maxPaxNumber) {
      setQty(String(rawSelectedPkg.maxPaxNumber));
    }
  }, [pkgId, rawSelectedPkg]);

  // Trigger brief price pulse animation when total changes
  useEffect(() => {
    setIsPriceAnimating(true);
    const timer = setTimeout(() => setIsPriceAnimating(false), 400);
    return () => clearTimeout(timer);
  }, [total]);

  // Quick pax options based on current package
  const quickPaxOptions = useMemo(() => {
    if (rawSelectedPkg?.maxPaxNumber) {
      return [1, 2, 3, 4, 5];
    }
    return [1, 2, 3, 4, 5, 6];
  }, [rawSelectedPkg]);

  const handlePaxChange = (newCount) => {
    const minP = rawSelectedPkg?.minPaxNumber || 1;
    let validCount = Math.max(minP, newCount);
    if (rawSelectedPkg?.maxPaxNumber) {
      validCount = Math.min(rawSelectedPkg.maxPaxNumber, validCount);
    }
    setQty(String(validCount));
    if (errors.qty) {
      setErrors((prev) => ({ ...prev, qty: undefined }));
    }
  };

  const handlePhoneChange = (e) => {
    let val = e.target.value.replace(/[^0-9]/g, '');
    const dialDigits = selectedCountry.code.replace('+', '');
    if (val.startsWith(dialDigits)) {
      val = val.slice(dialDigits.length);
    }
    if (val.startsWith('0')) {
      val = val.slice(1);
    }
    setPhone(val);
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: undefined }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = isEn ? 'Full name is required' : 'Nama lengkap wajib diisi';
    if (!phone.trim()) {
      errs.phone = isEn ? 'WhatsApp number is required' : 'Nomor WhatsApp wajib diisi';
    } else if (phone.trim().length < 6 || phone.trim().length > 15) {
      errs.phone = isEn ? 'Phone number must be 6-15 digits' : 'Nomor telepon minimal 6-15 digit angka';
    }
    if (!date) {
      errs.date = isEn ? 'Tour date is required' : 'Tanggal tour wajib dipilih';
    } else if (date < today) {
      errs.date = isEn ? 'Date cannot be in the past' : 'Tanggal tidak boleh di masa lalu';
    }
    if (!pkgId) {
      errs.pkgId = isEn ? 'Please select a tour package' : 'Pilih salah satu paket tour';
    }
    if (!qty || qtyNum < minPax) {
      errs.qty = isEn ? `Minimum ${minPax} guests for this package` : `Minimal ${minPax} peserta untuk paket ini`;
    } else if (maxPax && qtyNum > maxPax) {
      errs.qty = isEn ? `Maximum ${maxPax} guests for this package` : `Maksimal ${maxPax} peserta untuk paket ini`;
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePreview = (e) => {
    e.preventDefault();
    if (validate()) {
      setShowSummary(true);
    }
  };

  const formattedPhone = phone ? `${selectedCountry.flag} ${selectedCountry.iso} (${selectedCountry.code}) ${phone}` : '';

  const formatHumanDate = (dateStr) => {
    if (!dateStr) return '-';
    try {
      const [y, m, d] = dateStr.split('-');
      const dt = new Date(Number(y), Number(m) - 1, Number(d));
      return dt.toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const generateWhatsAppMessage = () => {
    const formattedDateStr = formatHumanDate(date);
    const cleanNote = message ? message.trim() : '';

    const serviceDesc = isTransportOnly
      ? 'Private Tour Transport (AC Car + Local Driver + Fuel)'
      : 'All-Inclusive Tour Package (Car + Driver + Lunch + Return Fast Boat + Retribution Tickets)';
    const capacityDesc = 'Maximum 5 Guests / Car';
    const rateDesc = isPerCar
      ? `${formatPrice(selectedPkg?.price)} / Car (Flat 1–5 guests)`
      : `${formatPrice(selectedPkg?.price)} / Person`;

    const lines = [
      `NUSA PENIDA TOUR RESERVATION`,
      `${SITE.name}`,
      `──────────────────────────`,
      '',
      `Hello Admin ${SITE.name},`,
      `I would like to make a tour reservation with the following details:`,
      '',
      `CUSTOMER DETAILS`,
      `Lead Traveler: ${name}`,
      `WhatsApp: ${selectedCountry.code} ${phone} (${selectedCountry.name})`,
      `Tour Date: ${formattedDateStr}`,
      '',
      `PACKAGE & SERVICE`,
      `Selected Package: ${selectedPkg?.title}`,
      `Service Type: ${serviceDesc}`,
      `Capacity: ${capacityDesc}`,
      '',
      `GUESTS & PRICING`,
      `Number of Guests: ${qtyNum} Person${qtyNum > 1 ? 's' : ''}`,
      `Package Rate: ${rateDesc}`,
      `Total Estimated: ${formatPrice(total)}`,
    ];

    if (cleanNote) {
      lines.push('', `SPECIAL NOTES`, cleanNote);
    }

    lines.push(
      '',
      `──────────────────────────`,
      `Please confirm vehicle availability and schedule. Thank you very much! \u{1F60A}\u{1F64F}`
    );

    return lines.join('\n');
  };

  const handleSendWhatsApp = async () => {
    // Simpan juga ke Supabase otomatis di latar belakang
    try {
      await supabase.from('bookings').insert([
        {
          customer_name: name.trim(),
          customer_phone: `${selectedCountry.code}${phone.trim()}`,
          tour_date: date,
          package_id: pkgId,
          package_name: selectedPkg?.title || 'Tour Nusa Penida',
          pax_count: qtyNum,
          estimated_total: total,
          notes: message.trim() || null,
          status: 'pending',
        },
      ]);
    } catch (e) {
      console.warn('Supabase auto-save background:', e);
    }

    const waText = generateWhatsAppMessage();
    window.open(getWhatsAppUrl(waText), '_blank');
    setShowSummary(false);
  };

  // Determine current active step in UI
  const currentStep = useMemo(() => {
    if (!date || !qtyNum) return 2;
    if (!name || !phone) return 3;
    return 3;
  }, [date, qtyNum, name, phone]);

  return (
    <>
      <PageHero
        title={t('booking.heroTitle')}
        subtitle={t('booking.heroDesc')}
        breadcrumbs={[{ label: t('nav.bookNow') }]}
        image="/images/destinations/crystal-bay.jpg"
      />

      <TrustStrip />

      <section className="booking-section booking-page-section">
        <div className="container">
          <div className="booking-layout-grid">
            {/* Left Column: Multi-Step Interactive Form */}
            <div className="booking-form-main-col">
              <form onSubmit={handlePreview} noValidate>
                {/* Step 1: Choose Tour Package */}
                <div className="booking-card">
                  <div className="booking-card-header">
                    <div className="booking-card-header-left">
                      <div className="booking-step-badge">1</div>
                      <div>
                        <h2 className="booking-card-title">{t('booking.step1')}</h2>
                        <p className="booking-card-subtitle">{t('pkg.sectionSubtitle')}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pkg-select-grid">
                    {packages.map((rawP) => {
                      const p = getTranslatedPackage(rawP);
                      const isSelected = p.id === pkgId;
                      return (
                        <div
                          key={p.id}
                          className={`pkg-select-card ${isSelected ? 'active' : ''}`}
                          onClick={() => {
                            setPkgId(p.id);
                            if (parseInt(qty, 10) < rawP.minPaxNumber) {
                              setQty(String(rawP.minPaxNumber));
                            }
                            if (rawP.maxPaxNumber && parseInt(qty, 10) > rawP.maxPaxNumber) {
                              setQty(String(rawP.maxPaxNumber));
                            }
                            if (errors.pkgId) {
                              setErrors((prev) => ({ ...prev, pkgId: undefined }));
                            }
                          }}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              setPkgId(p.id);
                            }
                          }}
                        >
                          <div className="pkg-select-thumb">
                            <img src={p.image} alt={p.title} loading="lazy" />
                          </div>

                          <div className="pkg-select-info">
                            <div className="pkg-select-top-meta">
                              {p.badge && <span className="pkg-badge-pill">{p.badge}</span>}
                              <span className="pkg-duration-pill">
                                <Clock size={12} strokeWidth={1.5} /> {p.duration}
                              </span>
                              <span className="pkg-min-pax">({p.minPax})</span>
                            </div>

                            <div className="pkg-select-title">{p.title}</div>
                            <div style={{ fontSize: '12px', color: p.packageType === 'transport_only' ? '#0F766E' : '#0284C7', fontWeight: 600, marginTop: '2px' }}>
                              {p.packageType === 'transport_only'
                                ? (isEn ? '• Car + Driver + Fuel (Without boat/lunch/tickets)' : '• Car + Driver + BBM (Tanpa boat/lunch/tiket)')
                                : (isEn ? '• Includes Car, Lunch, Fast Boat, Retribution' : '• Include Car, Lunch, Boat PP, Tiket Retribusi')}
                            </div>

                            <div className="pkg-select-highlights">
                              {p.destinations?.slice(0, 4).map((dest, idx) => (
                                <span key={idx} className="pkg-select-highlight-item">
                                  • {dest}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="pkg-select-price-wrap">
                            <div className="pkg-price-amount">{formatPrice(p.price)}</div>
                            <div className="pkg-price-unit">{p.unit}</div>
                            <div className="pkg-radio-indicator">
                              {isSelected && <Check size={12} strokeWidth={3} />}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {errors.pkgId && <span className="booking-field-error">{errors.pkgId}</span>}
                </div>

                {/* Step 2: Schedule & Guests */}
                <div className="booking-card" style={{ marginTop: '24px' }}>
                  <div className="booking-card-header">
                    <div className="booking-card-header-left">
                      <div className="booking-step-badge">2</div>
                      <div>
                        <h2 className="booking-card-title">{t('booking.step2')}</h2>
                        <p className="booking-card-subtitle">{isEn ? 'Select your preferred date and traveling party size' : 'Pilih tanggal dan jumlah rombongan wisata Anda'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="schedule-pax-grid">
                    {/* Tour Date Picker */}
                    <div className="booking-form-group">
                      <label htmlFor="booking-date-input" className="booking-field-label">
                        <Calendar size={16} strokeWidth={1.75} /> {t('booking.inputDate')}
                      </label>
                      <input
                        id="booking-date-input"
                        type="date"
                        min={today}
                        value={date}
                        className={`booking-input-control ${errors.date ? 'has-error' : ''}`}
                        onChange={(e) => {
                          setDate(e.target.value);
                          if (errors.date) setErrors((prev) => ({ ...prev, date: undefined }));
                        }}
                        required
                      />
                      {errors.date && (
                        <span className="booking-field-error">{errors.date}</span>
                      )}
                    </div>

                    {/* Interactive Guest Counter */}
                    <div className="booking-form-group">
                      <label className="booking-field-label">
                        <Users size={16} strokeWidth={1.75} /> {t('booking.paxLabel')}
                      </label>
                      <div className="pax-counter-box">
                        <div className="pax-counter-row">
                          <div className="pax-counter-label-wrap">
                            <span className="pax-counter-title">{isEn ? 'Party Size' : 'Atur Jumlah Tamu'}</span>
                            <span className="pax-counter-subtitle">{isEn ? 'Private vehicle capacity' : 'Sesuai rombongan Anda'}</span>
                          </div>

                          <div className="pax-stepper-controls">
                            <button
                              type="button"
                              className="btn-stepper"
                              disabled={qtyNum <= minPax}
                              onClick={() => handlePaxChange(qtyNum - 1)}
                              aria-label="Decrease guests"
                            >
                              <Minus size={15} strokeWidth={2.5} />
                            </button>

                            <span className="pax-count-display">{qtyNum}</span>

                            <button
                              type="button"
                              className="btn-stepper"
                              disabled={maxPax ? qtyNum >= maxPax : false}
                              onClick={() => handlePaxChange(qtyNum + 1)}
                              aria-label="Increase guests"
                            >
                              <Plus size={15} strokeWidth={2.5} />
                            </button>
                          </div>
                        </div>

                        {/* Quick Pax Chips */}
                        <div className="pax-quick-chips">
                          {quickPaxOptions.map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              className={`pax-chip ${qtyNum === opt ? 'active' : ''}`}
                              onClick={() => handlePaxChange(opt)}
                            >
                              {opt} {isEn ? 'Pax' : 'Orang'}
                            </button>
                          ))}
                        </div>

                        <div className="pax-min-hint">
                          {isPerCar
                            ? (isEn
                                ? `Flat normal rate per car (Max. 5 guests): ${qtyNum} guests = ${formatPrice(selectedPkg?.price)}`
                                : `Tarif normal flat per mobil (Maks. 5 orang): ${qtyNum} orang = tetap ${formatPrice(selectedPkg?.price)}`)
                            : (isEn
                                ? `Calculated per person (Max. 5 guests): ${qtyNum} guests × ${formatPrice(selectedPkg?.price)} = ${formatPrice(total)}`
                                : `Dihitung per orang (Maks. 5 orang): ${qtyNum} orang × ${formatPrice(selectedPkg?.price)} = ${formatPrice(total)}`)}
                        </div>
                      </div>
                      {errors.qty && <span className="booking-field-error">{errors.qty}</span>}
                    </div>
                  </div>
                </div>

                {/* Step 3: Lead Passenger Information */}
                <div className="booking-card" style={{ marginTop: '24px' }}>
                  <div className="booking-card-header">
                    <div className="booking-card-header-left">
                      <div className="booking-step-badge">3</div>
                      <div>
                        <h2 className="booking-card-title">{t('booking.step3')}</h2>
                        <p className="booking-card-subtitle">{isEn ? 'For booking confirmation voucher and driver pick-up coordination' : 'Untuk konfirmasi booking dan penjemputan driver'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="schedule-pax-grid">
                    {/* Full Name */}
                    <div className="booking-form-group">
                      <label htmlFor="booking-name-input" className="booking-field-label">
                        <User size={16} strokeWidth={1.75} /> {t('booking.inputName')}
                      </label>
                      <input
                        id="booking-name-input"
                        type="text"
                        value={name}
                        className={`booking-input-control ${errors.name ? 'has-error' : ''}`}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                        }}
                        required
                      />
                      {errors.name && <span className="booking-field-error">{errors.name}</span>}
                    </div>

                    {/* WhatsApp Phone */}
                    <div className="booking-form-group">
                      <label htmlFor="booking-phone-input" className="booking-field-label">
                        <Phone size={16} strokeWidth={1.75} /> {t('booking.inputPhone')}
                      </label>
                      <div className={`phone-input-group ${errors.phone ? 'has-error' : ''}`}>
                        <CountryCodeSelector
                          selected={selectedCountry}
                          onChange={(c) => {
                            setSelectedCountry(c);
                            if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                          }}
                          isEn={isEn}
                        />
                        <input
                          id="booking-phone-input"
                          type="tel"
                          value={phone}
                          className="phone-raw-input"
                          onChange={handlePhoneChange}
                          required
                        />
                      </div>
                      {errors.phone && <span className="booking-field-error">{errors.phone}</span>}
                    </div>
                  </div>
                </div>

                {/* Bottom Form Action CTA with generous breathing room */}
                <div className="booking-bottom-action-wrap" style={{ marginTop: '36px', marginBottom: '60px' }}>
                  <button type="submit" className="btn-booking-wa">
                    <Send size={18} /> {t('booking.btnPreviewVoucher')}
                  </button>
                </div>
              </form>
            </div>

            {/* Right Column: Sticky Live Booking Receipt */}
            <aside className="booking-summary-sticky-wrap">
              <div className="booking-receipt-card">
                {/* Visual Header */}
                <div className="booking-receipt-media">
                  <img src={selectedPkg?.image} alt={selectedPkg?.title} />
                  <div className="booking-receipt-overlay">
                    {selectedPkg?.badge && (
                      <span className="booking-receipt-pkg-badge">{selectedPkg?.badge}</span>
                    )}
                    <h3 className="booking-receipt-pkg-title">{selectedPkg?.title}</h3>
                  </div>
                </div>

                <div className="booking-receipt-body">
                  {/* Key Inclusions / Exclusions */}
                  {isTransportOnly ? (
                    <div className="receipt-inclusions-list">
                      <div className="receipt-inc-item">
                        <Car size={14} /> {isEn ? 'Private AC Car + Fuel' : 'Mobil Privat AC + BBM'}
                      </div>
                      <div className="receipt-inc-item">
                        <Users size={14} /> {isEn ? 'Local Driver / Guide' : 'Driver Lokal Berpengalaman'}
                      </div>
                      <div className="receipt-inc-item" style={{ gridColumn: '1 / -1', color: '#DC2626', fontSize: '11px', background: '#FEE2E2', padding: '6px 10px', borderRadius: '6px' }}>
                        ✕ {isEn ? 'Transport only: boat, lunch & tickets not included (Max. 5 pax)' : 'Tanpa include fast boat, makan, & tiket retribusi (Maks. 5 pax)'}
                      </div>
                    </div>
                  ) : (
                    <div className="receipt-inclusions-list">
                      <div className="receipt-inc-item">
                        <Car size={14} /> {isEn ? 'Private AC Car' : 'Mobil Privat AC'}
                      </div>
                      <div className="receipt-inc-item">
                        <Ship size={14} /> {isEn ? 'Roundtrip Fast Boat' : 'Fast Boat PP'}
                      </div>
                      <div className="receipt-inc-item">
                        <Utensils size={14} /> {isEn ? 'Lunch Included' : 'Makan Siang'}
                      </div>
                      <div className="receipt-inc-item">
                        <Ticket size={14} /> {isEn ? 'Tickets & Retribution' : 'Tiket & Retribusi'}
                      </div>
                    </div>
                  )}

                  {/* Dynamic Calculation Table */}
                  <div className="receipt-calc-table">
                    <div className="receipt-calc-row">
                      <span>{t('booking.receiptDate')}</span>
                      <strong>{date || (isEn ? 'Not selected' : 'Belum dipilih')}</strong>
                    </div>
                    <div className="receipt-calc-row">
                      <span>{t('booking.receiptGuests')}</span>
                      <strong>
                        {qtyNum} {isEn ? 'Guests' : 'Orang'} {maxPax ? (isEn ? '(Max. 5 pax)' : '(Maks. 5 pax)') : ''}
                      </strong>
                    </div>
                    <div className="receipt-calc-row">
                      <span>{isPerCar ? (isEn ? 'Car Charter Rate' : 'Tarif Sewa Mobil') : t('booking.receiptPricePerPax')}</span>
                      <strong>{formatPrice(selectedPkg?.price || 0)} {isPerCar ? (isEn ? '/ Car' : '/ Mobil') : (isEn ? '/ Pax' : '/ Pax')}</strong>
                    </div>
                  </div>

                  {/* Highlighted Total Box */}
                  <div className="receipt-total-box">
                    <div className="receipt-total-label">
                      <span className="receipt-total-label-text">{t('booking.receiptTotal')}</span>
                      <span className="receipt-total-hint">
                        {isPerCar
                          ? (isEn ? `Flat normal rate (${qtyNum} guests)` : `Tarif normal flat (${qtyNum} orang)`)
                          : `${qtyNum} × ${formatPrice(selectedPkg?.price || 0)}`}
                      </span>
                    </div>
                    <div className={`receipt-total-amount ${isPriceAnimating ? 'price-animating' : ''}`}>
                      {formatPrice(total)}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handlePreview}
                    className="btn-booking-wa"
                  >
                    <Send size={18} /> {t('booking.btnSendWa')}
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Boarding Pass / Ticket Summary Modal */}
      {showSummary && (
        <div className="modal-overlay-blur" onClick={() => setShowSummary(false)}>
          <div className="booking-modal-ticket" onClick={(e) => e.stopPropagation()}>
            {/* Ticket Header */}
            <div className="modal-ticket-header">
              <div className="modal-ticket-top">
                <div className="modal-ticket-brand">
                  {SITE.name}
                </div>
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => setShowSummary(false)}
                  aria-label="Close modal"
                >
                  <X size={16} />
                </button>
              </div>

              <h3 className="modal-ticket-title">{t('voucher.title')}</h3>
              <p className="modal-ticket-sub">
                {isEn ? 'Review your itinerary and traveler details before connecting to WhatsApp' : 'Periksa kembali rincian perjalanan Anda sebelum terhubung ke WhatsApp'}
              </p>
            </div>

            {/* Perforated Divider */}
            <div className="modal-perforated-line">
              <div className="modal-perforated-dots" />
            </div>

            {/* Ticket Content */}
            <div className="modal-ticket-content">
              <div className="ticket-data-grid">
                <div className="ticket-data-item">
                  <span className="ticket-data-label">{t('voucher.nameLabel')}</span>
                  <span className="ticket-data-value">{name}</span>
                </div>

                <div className="ticket-data-item">
                  <span className="ticket-data-label">WhatsApp</span>
                  <span className="ticket-data-value" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <img
                      src={`https://flagcdn.com/w40/${selectedCountry.iso.toLowerCase()}.png`}
                      alt={selectedCountry.name}
                      width="18"
                      height="12"
                      style={{ borderRadius: '2px', objectFit: 'cover', boxShadow: '0 1px 2px rgba(0,0,0,0.15)' }}
                    />
                    <strong>{selectedCountry.iso}</strong> {selectedCountry.code} {phone}
                  </span>
                </div>

                <div className="ticket-data-item">
                  <span className="ticket-data-label">{t('voucher.pkgLabel')}</span>
                  <span className="ticket-data-value">{selectedPkg?.title}</span>
                </div>

                <div className="ticket-data-item">
                  <span className="ticket-data-label">{isEn ? 'TYPE' : 'TIPE PAKET'}</span>
                  <span className="ticket-data-value" style={{ fontWeight: 600, color: isTransportOnly ? '#0F766E' : '#0284C7' }}>
                    {isTransportOnly
                      ? (isEn ? 'Transport Only (Car+Driver+Fuel, Max 5 Pax)' : 'Transport Only (Mobil+Driver+BBM, Maks. 5 Pax)')
                      : (isEn ? 'All-Inclusive (Car+Boat+Lunch+Tickets)' : 'All-Inclusive (Mobil+Boat+Lunch+Tiket)')}
                  </span>
                </div>

                <div className="ticket-data-item">
                  <span className="ticket-data-label">{t('voucher.dateLabel')}</span>
                  <span className="ticket-data-value">{date}</span>
                </div>

                <div className="ticket-data-item">
                  <span className="ticket-data-label">{t('voucher.paxLabel')}</span>
                  <span className="ticket-data-value">{qtyNum} {isEn ? 'Guests' : 'Orang'}</span>
                </div>

                <div className="ticket-data-item">
                  <span className="ticket-data-label">{t('voucher.totalLabel')}</span>
                  <span className="ticket-data-value" style={{ color: 'var(--ocean)', fontSize: '15px' }}>
                    {formatPrice(total)} {isPerCar ? (isEn ? '(Flat Rate 1–5 Guests)' : '(Tarif Normal Flat 1–5 Orang)') : ''}
                  </span>
                </div>
              </div>

              {message && (
                <div className="ticket-data-item" style={{ borderTop: '1px dashed var(--border)', paddingTop: '10px' }}>
                  <span className="ticket-data-label">{t('booking.inputNotes')}</span>
                  <span style={{ fontSize: '13px', color: 'var(--ink-soft)' }}>{message}</span>
                </div>
              )}

              {/* WhatsApp Message Preview Alert */}
              <div className="ticket-wa-preview-box">
                <Send size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  {isEn
                    ? <>Reservation format is ready and will open directly in official WhatsApp <strong>{SITE.whatsappDisplay}</strong>.</>
                    : <>Pesan reservasi telah diformat otomatis dan akan terbuka di WhatsApp <strong>{SITE.whatsappDisplay}</strong>.</>}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="modal-ticket-actions">
                <button
                  type="button"
                  onClick={() => setShowSummary(false)}
                  className="btn btn-outline-pill"
                  style={{ flex: 1 }}
                >
                  {isEn ? 'Edit Details' : 'Ubah Data'}
                </button>
                <button
                  type="button"
                  onClick={handleSendWhatsApp}
                  className="btn-booking-wa"
                  style={{ flex: 1.5 }}
                >
                  <Send size={16} /> {isEn ? 'Send Now' : 'Kirim Sekarang'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
