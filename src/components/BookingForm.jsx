import React, { useState } from 'react';
import { MessageSquare, Send, CheckCircle2, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import { SITE } from '../config/site';
import { supabase } from '../config/supabase';

const packagesConfig = {
  barat_std: {
    id: 'barat_std',
    title: 'Trip Barat / West (All-Inclusive)',
    price: 400000,
    unit: '/ Pax',
    isTransportOnly: false,
    minPax: 1,
    maxPax: 5,
    subtitle: 'Include: Car, Lunch, Boat PP, Tiket Retribusi (Rp 400.000 / orang, maks. 5 orang)',
  },
  barat_premium: {
    id: 'barat_premium',
    title: 'Trip Barat / West Destinasi (Transport Only)',
    price: 650000,
    unit: '/ Mobil',
    isTransportOnly: true,
    minPax: 1,
    maxPax: 5,
    subtitle: 'Include: Car + Driver + BBM (Rp 650.000 / mobil, flat 1–5 orang)',
  },
  timur: {
    id: 'timur',
    title: 'Trip Timur / East Destinasi (Transport Only)',
    price: 700000,
    unit: '/ Mobil',
    isTransportOnly: true,
    minPax: 1,
    maxPax: 5,
    subtitle: 'Include: Car + Driver + BBM (Rp 700.000 / mobil, flat 1–5 orang)',
  },
  mix_trip: {
    id: 'mix_trip',
    title: 'Trip Kombinasi / Mix Destinasi (Transport Only)',
    price: 1000000,
    unit: '/ Mobil',
    isTransportOnly: true,
    minPax: 1,
    maxPax: 5,
    subtitle: 'Include: Car + BBM + Parkir + Driver (Rp 1.000.000 / mobil, flat 1–5 orang)',
  },
};

export default function BookingForm({ selectedPackage }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [pkg, setPkg] = useState(selectedPackage || 'barat_std');
  const [qty, setQty] = useState('2');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedBooking, setSubmittedBooking] = useState(null);

  React.useEffect(() => {
    if (selectedPackage && packagesConfig[selectedPackage]) {
      setPkg(selectedPackage);
      if (packagesConfig[selectedPackage].maxPax && parseInt(qty, 10) > packagesConfig[selectedPackage].maxPax) {
        setQty(String(packagesConfig[selectedPackage].maxPax));
      }
    }
  }, [selectedPackage]);

  const currentPkg = packagesConfig[pkg] || packagesConfig.barat_std;
  const qtyNum = parseInt(qty, 10) || 1;
  const total = currentPkg.isTransportOnly ? currentPkg.price : currentPkg.price * qtyNum;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const bookingPayload = {
      customer_name: name.trim(),
      customer_phone: phone.trim(),
      tour_date: date,
      package_id: pkg,
      package_name: currentPkg.title,
      pax_count: qtyNum,
      estimated_total: total,
      notes: message.trim() || null,
      status: 'pending',
    };

    try {
      const { error } = await supabase.from('bookings').insert([bookingPayload]);

      if (error) {
        throw error;
      }

      setSubmittedBooking(bookingPayload);
      setIsSuccess(true);
    } catch (err) {
      console.error('Error saat submit booking ke Supabase:', err);
      setErrorMessage(
        'Belum dapat terhubung ke database Supabase. Pastikan tabel "bookings" sudah dibuat di SQL Editor Supabase, atau klik tombol di bawah untuk kirim manual ke WhatsApp.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const openWhatsAppDirectly = () => {
    const targetData = submittedBooking || {
      customer_name: name,
      customer_phone: phone,
      package_name: currentPkg.title,
      tour_date: date,
      pax_count: qtyNum,
      estimated_total: total,
      notes: message,
    };

    const formattedTotal = Number(targetData.estimated_total).toLocaleString('id-ID');
    const serviceType = currentPkg.isTransportOnly
      ? 'Private Tour Transport (AC Car + Local Driver + Fuel)'
      : 'All-Inclusive Tour Package (Car + Driver + Lunch + Return Fast Boat + Retribution)';

    const lines = [
      `NUSA PENIDA TOUR RESERVATION`,
      `${SITE.name}`,
      `──────────────────────────`,
      '',
      `Hello Admin ${SITE.name},`,
      `I would like to make a tour reservation with the following details:`,
      '',
      `CUSTOMER DETAILS`,
      `Lead Traveler: ${targetData.customer_name}`,
      `WhatsApp: ${targetData.customer_phone}`,
      `Tour Date: ${targetData.tour_date}`,
      '',
      `PACKAGE & SERVICE`,
      `Selected Package: ${targetData.package_name}`,
      `Service Type: ${serviceType}`,
      `Capacity: Maximum 5 Guests / Car`,
      '',
      `GUESTS & PRICING`,
      `Number of Guests: ${targetData.pax_count} Person${targetData.pax_count > 1 ? 's' : ''}`,
      `Total Estimated: IDR ${formattedTotal}`,
    ];

    if (targetData.notes && targetData.notes.trim()) {
      lines.push('', `SPECIAL NOTES`, targetData.notes.trim());
    }

    lines.push(
      '',
      `──────────────────────────`,
      `Please confirm vehicle availability and schedule. Thank you very much! \u{1F60A}\u{1F64F}`
    );

    const url = `https://api.whatsapp.com/send?phone=${SITE.whatsapp}&text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(url, '_blank');
  };

  const handleResetForm = () => {
    setName('');
    setPhone('');
    setDate('');
    setMessage('');
    setIsSuccess(false);
    setErrorMessage('');
    setSubmittedBooking(null);
  };

  return (
    <section className="section" id="kontak">
      <div className="section-container">
        <div className="section-header reveal">
          <span className="section-badge">
            <MessageSquare size={16} /> Booking & Reservasi
          </span>
          <h2 className="section-title">Pesan Paket Wisata Anda</h2>
          <p className="section-subtitle">
            Isi formulir di bawah ini. Data akan otomatis tercatat dan notifikasi instan langsung terkirim ke WhatsApp kami.
          </p>
        </div>

        <div className="booking-wrapper reveal">
          {isSuccess ? (
            <div
              className="booking-form glass-card"
              style={{ textAlign: 'center', padding: '40px 24px', animation: 'fadeIn 0.4s ease' }}
            >
              <div
                style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '50%',
                  background: 'rgba(34, 197, 94, 0.15)',
                  color: '#22c55e',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                }}
              >
                <CheckCircle2 size={40} />
              </div>
              <h3 style={{ fontSize: '24px', marginBottom: '10px', color: 'var(--text-main)' }}>
                Booking Berhasil Terkirim!
              </h3>
              <p style={{ color: 'var(--muted)', fontSize: '15px', maxWidth: '520px', margin: '0 auto 24px', lineHeight: '1.6' }}>
                Terima kasih, <strong>{submittedBooking?.customer_name}</strong>! Data pesanan Anda telah tersimpan secara otomatis di sistem kami. Notifikasi instan telah diteruskan ke WhatsApp tim kami.
              </p>

              <div
                className="booking-estimate"
                style={{ display: 'block', textAlign: 'left', maxWidth: '460px', margin: '0 auto 28px' }}
              >
                <div className="estimate-row">
                  <span>Paket Tour:</span>
                  <strong>{submittedBooking?.package_name}</strong>
                </div>
                <div className="estimate-row">
                  <span>Tanggal Tour:</span>
                  <strong>{submittedBooking?.tour_date}</strong>
                </div>
                <div className="estimate-row">
                  <span>Peserta:</span>
                  <strong>{submittedBooking?.pax_count} Orang</strong>
                </div>
                <div className="estimate-total-row">
                  <span>Estimasi Total:</span>
                  <span className="total-val">
                    Rp {Number(submittedBooking?.estimated_total).toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="btn-booking-wa"
                  style={{ width: 'auto', padding: '12px 24px', minWidth: '220px' }}
                  onClick={openWhatsAppDirectly}
                >
                  <Send size={18} /> Chat Langsung di WhatsApp
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  style={{
                    padding: '12px 20px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    background: 'rgba(255,255,255,0.05)',
                    color: 'var(--text-main)',
                    cursor: 'pointer',
                    fontSize: '14px',
                  }}
                  onClick={handleResetForm}
                >
                  Pesan Paket Lain
                </button>
              </div>
            </div>
          ) : (
            <form className="booking-form glass-card" onSubmit={handleSubmit}>
              {errorMessage && (
                <div
                  style={{
                    background: 'rgba(239, 68, 68, 0.12)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    color: '#f87171',
                    fontSize: '13.5px',
                    lineHeight: '1.5',
                  }}
                >
                  <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div style={{ flex: 1 }}>
                    <div>{errorMessage}</div>
                    <button
                      type="button"
                      onClick={openWhatsAppDirectly}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#38bdf8',
                        cursor: 'pointer',
                        padding: '4px 0 0',
                        fontSize: '13px',
                        textDecoration: 'underline',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      Kirim cadangan via WhatsApp langsung <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label>Nama Lengkap *</label>
                  <input
                    type="text"
                    placeholder="Contoh: Wayan Sudarma"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Nomor WhatsApp *</label>
                  <input
                    type="tel"
                    placeholder="08123456789"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Tanggal Tour *</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Pilihan Paket Tour *</label>
                  <select
                    value={pkg}
                    onChange={(e) => {
                      const newPkgKey = e.target.value;
                      setPkg(newPkgKey);
                      const targetPkg = packagesConfig[newPkgKey];
                      if (targetPkg?.maxPax && parseInt(qty, 10) > targetPkg.maxPax) {
                        setQty(String(targetPkg.maxPax));
                      }
                    }}
                    required
                  >
                    <option value="barat_std">
                      Trip Barat (West) — All-Inclusive (Maks. 5 Orang) - Rp 400K/pax
                    </option>
                    <option value="barat_premium">
                      Trip Barat (West) — Transport Only (Maks. 5 Orang) - Rp 650K/Mobil
                    </option>
                    <option value="timur">
                      Trip Timur (East) — Transport Only (Maks. 5 Orang) - Rp 700K/Mobil
                    </option>
                    <option value="mix_trip">
                      Trip Kombinasi / Mix (Diamond, Atuh, Treehouse - tidak include tiket foto, Kelingking) - Rp 1 Juta/Mobil
                    </option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Jumlah Peserta *</label>
                <select value={qty} onChange={(e) => setQty(e.target.value)} required>
                  {currentPkg.isTransportOnly ? (
                    <>
                      <option value="1">1 Orang — Rp {currentPkg.price.toLocaleString('id-ID')} (Tarif Normal)</option>
                      <option value="2">2 Orang — Rp {currentPkg.price.toLocaleString('id-ID')} (Tarif Normal)</option>
                      <option value="3">3 Orang — Rp {currentPkg.price.toLocaleString('id-ID')} (Tarif Normal)</option>
                      <option value="4">4 Orang — Rp {currentPkg.price.toLocaleString('id-ID')} (Tarif Normal)</option>
                      <option value="5">5 Orang — Rp {currentPkg.price.toLocaleString('id-ID')} (Maks. 5 Orang)</option>
                    </>
                  ) : (
                    <>
                      <option value="1">1 Orang — Rp 400.000</option>
                      <option value="2">2 Orang — Rp 800.000</option>
                      <option value="3">3 Orang — Rp 1.200.000</option>
                      <option value="4">4 Orang — Rp 1.600.000</option>
                      <option value="5">5 Orang — Rp 2.000.000 (Maks. 5 Orang)</option>
                    </>
                  )}
                </select>
                <span style={{ fontSize: '11.5px', color: 'var(--muted)', marginTop: '4px', display: 'block' }}>
                  {currentPkg.subtitle}
                </span>
              </div>

              <div className="form-group">
                <label>Pesan / Permintaan Khusus</label>
                <textarea
                  rows="3"
                  placeholder="Tulis pesan atau catatan tambahan (lokasi jemput, waktu tiba, dll)..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              {/* Price Estimate Card */}
              <div className="booking-estimate" style={{ display: 'block' }}>
                <div className="estimate-row">
                  <span>Paket Dipilih:</span>
                  <strong>{currentPkg.title}</strong>
                </div>
                <div className="estimate-row">
                  <span>Harga per Orang/Unit:</span>
                  <strong>
                    Rp {(currentPkg.price / 1000).toFixed(0)}K {currentPkg.unit}
                  </strong>
                </div>
                <div className="estimate-row">
                  <span>Jumlah Peserta:</span>
                  <strong>
                    {qtyNum} Orang {currentPkg.maxPax ? `(Maks. ${currentPkg.maxPax} Pax)` : ''}
                  </strong>
                </div>
                <div className="estimate-total-row">
                  <span>Total Estimasi:</span>
                  <span className="total-val">Rp {total.toLocaleString('id-ID')}</span>
                </div>
              </div>

              <button
                type="submit"
                className="btn-booking-wa"
                disabled={isSubmitting}
                style={{ opacity: isSubmitting ? 0.75 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="spin-icon" style={{ animation: 'spin 1s linear infinite' }} /> Memproses Booking...
                  </>
                ) : (
                  <>
                    <Send size={18} /> Kirim Booking Sekarang
                  </>
                )}
              </button>
              <p className="form-note">
                Data otomatis tercatat di sistem kami & terhubung ke WhatsApp bisnis kami secara instan.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
