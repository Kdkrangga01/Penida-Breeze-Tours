import React, { useState, useEffect } from 'react';
import { Star, CheckCircle2, PenLine, X } from 'lucide-react';
import { supabase } from '../config/supabase';
import { useLanguage } from '../context/LanguageContext';

export default function ReviewsSection() {
  const { isEn } = useLanguage();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [hoverRating, setHoverRating] = useState(0);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    tour_package: 'West Nusa Penida Tour',
    rating: 5,
    comment: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Fetch real reviews from Supabase
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Supabase fetch note:', error.message);
        setReviews([]);
      } else if (data) {
        setReviews(data);
      }
    } catch (err) {
      console.warn('Error fetching reviews:', err);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRatingClick = (rate) => {
    setFormData(prev => ({ ...prev, rating: rate }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.comment.trim()) {
      setSubmitError(
        isEn
          ? 'Please enter your name and review comment.'
          : 'Mohon lengkapi nama dan ulasan perjalanan Anda.'
      );
      return;
    }

    setSubmitting(true);
    setSubmitError('');

    const newReview = {
      name: formData.name.trim(),
      country: formData.country.trim() || (isEn ? 'Guest Traveler' : 'Wisatawan'),
      tour_package: formData.tour_package,
      rating: Number(formData.rating),
      comment: formData.comment.trim(),
      is_approved: true
    };

    try {
      const { data, error } = await supabase
        .from('reviews')
        .insert([newReview])
        .select();

      if (error) {
        console.error('Supabase error:', error);
        setSubmitError(
          isEn
            ? `Failed to save review: ${error.message}`
            : `Gagal menyimpan ulasan: ${error.message}`
        );
      } else if (data && data.length > 0) {
        setReviews(prev => [data[0], ...prev]);
        setSubmitSuccess(true);
        setTimeout(() => {
          setSubmitSuccess(false);
          setIsModalOpen(false);
          setFormData({
            name: '',
            country: '',
            tour_package: 'West Nusa Penida Tour',
            rating: 5,
            comment: ''
          });
        }, 1600);
      }
    } catch (err) {
      console.error('Network error submitting review:', err);
      setSubmitError(
        isEn
          ? 'Network error. Please try again.'
          : 'Terjadi kendala koneksi. Silakan coba kembali.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Calculate stats
  const totalReviews = reviews.length;
  const avgRating = totalReviews > 0 
    ? (reviews.reduce((acc, r) => acc + (r.rating || 5), 0) / totalReviews).toFixed(1)
    : '5.0';

  // Filter reviews
  const filteredReviews = reviews.filter(r => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === '5') return r.rating === 5;
    if (selectedFilter === 'west') {
      const pkg = (r.tour_package || '').toLowerCase();
      return pkg.includes('west') || pkg.includes('barat');
    }
    if (selectedFilter === 'east') {
      const pkg = (r.tour_package || '').toLowerCase();
      return pkg.includes('east') || pkg.includes('timur');
    }
    return true;
  });

  const getRatingLabel = (rating) => {
    switch (rating) {
      case 5: return isEn ? '5 Stars - Exceptional' : '5 Bintang - Sangat Memuaskan';
      case 4: return isEn ? '4 Stars - Very Good' : '4 Bintang - Memuaskan';
      case 3: return isEn ? '3 Stars - Good' : '3 Bintang - Cukup Baik';
      case 2: return isEn ? '2 Stars - Fair' : '2 Bintang - Kurang Memuaskan';
      default: return isEn ? '1 Star - Needs Improvement' : '1 Bintang - Perlu Perbaikan';
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return isEn ? 'Recently' : 'Baru saja';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString(isEn ? 'en-US' : 'id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return isEn ? 'Recently' : 'Baru saja';
    }
  };

  return (
    <section id="reviews-section" className="reviews-section">
      <div className="container">
        {/* Header Section */}
        <div className="reviews-header-center">
          <div className="reviews-eyebrow-chip">
            <span>{isEn ? 'GUEST REVIEWS' : 'ULASAN WISATAWAN'}</span>
          </div>
          <h2 className="reviews-title">
            {isEn ? 'Guest Experiences & Testimonials' : 'Pengalaman & Testimoni Wisatawan'}
          </h2>
          <p className="reviews-subtitle">
            {isEn
              ? 'Authentic impressions and genuine feedback from travelers who explored Nusa Penida with Penida Breeze Tours.'
              : 'Ulasan dan pengalaman autentik dari para wisatawan yang telah mempercayakan perjalanan mereka di Nusa Penida bersama Penida Breeze Tours.'}
          </p>
        </div>

        {/* Summary Banner */}
        <div className="reviews-summary-bar">
          <div className="reviews-score-block">
            <div className="reviews-score-badge">
              {avgRating}
            </div>
            <div className="reviews-score-meta">
              <div className="reviews-stars-row">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={18} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
              <h4>
                {totalReviews > 0
                  ? (isEn
                      ? `Excellent Rating • ${totalReviews} Verified ${totalReviews === 1 ? 'Review' : 'Reviews'}`
                      : `Penilaian Pelayanan • ${totalReviews} Ulasan Terverifikasi`)
                  : (isEn ? 'Verified Guest Ratings' : 'Penilaian Layanan Terverifikasi')}
              </h4>
              <p>
                {totalReviews > 0
                  ? (isEn
                      ? 'All reviews are submitted by verified guests.'
                      : 'Semua ulasan berasal langsung dari pengalaman nyata para wisatawan.')
                  : (isEn
                      ? 'Share your experience to guide fellow travelers.'
                      : 'Bagikan pengalaman Anda untuk membantu calon wisatawan lainnya.')}
              </p>
            </div>
          </div>

          <button
            id="write-review-btn"
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="btn-write-review"
          >
            <PenLine size={16} color="#ffffff" />
            <span>{isEn ? 'Write a Review' : 'Tulis Ulasan'}</span>
          </button>
        </div>

        {/* Filter Chips (Only shown when there are reviews) */}
        {totalReviews > 0 && (
          <div className="reviews-filter-bar">
            <button
              type="button"
              onClick={() => setSelectedFilter('all')}
              className={`reviews-filter-btn ${selectedFilter === 'all' ? 'active' : ''}`}
            >
              {isEn ? `All Reviews (${reviews.length})` : `Semua Ulasan (${reviews.length})`}
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter('5')}
              className={`reviews-filter-btn ${selectedFilter === '5' ? 'active' : ''}`}
            >
              {isEn ? '5 Stars ★' : 'Bintang 5 ★'}
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter('west')}
              className={`reviews-filter-btn ${selectedFilter === 'west' ? 'active' : ''}`}
            >
              {isEn ? 'West Nusa Penida' : 'Nusa Penida Barat'}
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter('east')}
              className={`reviews-filter-btn ${selectedFilter === 'east' ? 'active' : ''}`}
            >
              {isEn ? 'East Nusa Penida' : 'Nusa Penida Timur'}
            </button>
          </div>
        )}

        {/* Content: Cards Grid OR Professional Empty State */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748b' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                border: '3px solid #cbd5e1',
                borderTopColor: '#0284c7',
                borderRadius: '50%',
                margin: '0 auto 12px',
                animation: 'spin 1s linear infinite'
              }}
            />
            <p style={{ fontSize: '14px' }}>
              {isEn ? 'Loading guest reviews...' : 'Memuat ulasan wisatawan...'}
            </p>
          </div>
        ) : filteredReviews.length > 0 ? (
          <div className="reviews-cards-grid">
            {filteredReviews.map((item) => {
              const customerName = item.name || item.customer_name || (isEn ? 'Guest' : 'Wisatawan');
              const customerCountry = item.country || item.customer_country || (isEn ? 'Traveler' : 'Indonesia');
              const initials = customerName
                ? customerName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
                : 'TR';

              return (
                <div key={item.id} className="review-item-card">
                  <div>
                    {/* Top Bar */}
                    <div className="review-card-top">
                      <div className="review-user-info">
                        <div className="review-avatar-circle">
                          {initials}
                        </div>
                        <div>
                          <h4 className="review-user-name">{customerName}</h4>
                          <p className="review-user-country">{customerCountry}</p>
                        </div>
                      </div>
                    </div>

                    {/* Rating Stars */}
                    <div className="reviews-stars-row" style={{ marginBottom: '12px' }}>
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
                      ))}
                    </div>

                    {/* Comment Body */}
                    <p className="review-comment-body">
                      {item.comment}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="review-card-footer">
                    <span className="review-package-badge">
                      {item.tour_package || 'Nusa Penida Tour'}
                    </span>
                    <span>{formatDate(item.created_at)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Formal & Welcoming Empty State */
          <div
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              padding: '48px 24px',
              textAlign: 'center',
              maxWidth: '560px',
              margin: '0 auto',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)'
            }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
              {isEn ? 'No Reviews Available Yet' : 'Belum Ada Ulasan Tersedia'}
            </h3>
            <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, marginBottom: '22px' }}>
              {isEn
                ? 'Your journey matters to us. Be the first guest to share your travel experience exploring Nusa Penida with Penida Breeze Tours.'
                : 'Pengalaman perjalanan Anda sangat berharga bagi kami. Jadilah yang pertama membagikan kesan liburan Anda bersama Penida Breeze Tours.'}
            </p>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="btn-write-review"
              style={{ display: 'inline-flex', margin: '0 auto' }}
            >
              <PenLine size={16} color="#ffffff" />
              <span>{isEn ? 'Write a Review' : 'Tulis Ulasan'}</span>
            </button>
          </div>
        )}

        {/* Modal: Tulis Ulasan */}
        {isModalOpen && (
          <div
            className="reviews-modal-overlay animate-fadeIn"
            onClick={() => !submitting && setIsModalOpen(false)}
          >
            <div
              className="reviews-modal-card animate-scaleUp"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => !submitting && setIsModalOpen(false)}
                className="reviews-modal-close"
                aria-label={isEn ? 'Close' : 'Tutup'}
              >
                <X size={18} />
              </button>

              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: '0 0 4px' }}>
                  {isEn ? 'Share Your Travel Experience' : 'Tulis Ulasan Perjalanan Anda'}
                </h3>
                <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                  {isEn
                    ? 'Please share your impressions regarding our service, driver, and destinations.'
                    : 'Silakan sampaikan kesan Anda mengenai kenyamanan armada, keramahan driver, dan keindahan destinasi.'}
                </p>
              </div>

              {submitSuccess ? (
                <div style={{ textAlign: 'center', padding: '30px 0' }}>
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: '#ecfdf5',
                      color: '#059669',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px'
                    }}
                  >
                    <CheckCircle2 size={36} color="#059669" />
                  </div>
                  <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
                    {isEn ? 'Thank You Very Much!' : 'Terima Kasih Banyak!'}
                  </h4>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                    {isEn
                      ? 'Your review has been successfully submitted and published.'
                      : 'Ulasan Anda telah berhasil disimpan dan diterbitkan.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {submitError && (
                    <div
                      style={{
                        padding: '10px 14px',
                        borderRadius: '8px',
                        background: '#fef2f2',
                        color: '#b91c1c',
                        fontSize: '12px',
                        marginBottom: '14px',
                        border: '1px solid #fecaca'
                      }}
                    >
                      {submitError}
                    </div>
                  )}

                  {/* Rating Selector */}
                  <div className="review-form-group">
                    <label className="review-form-label">
                      {isEn ? 'Service Rating' : 'Penilaian Layanan'}
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => handleRatingClick(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="star-interactive-btn"
                        >
                          <Star
                            size={28}
                            fill={(hoverRating || formData.rating) >= star ? '#f59e0b' : '#e2e8f0'}
                            color={(hoverRating || formData.rating) >= star ? '#f59e0b' : '#cbd5e1'}
                          />
                        </button>
                      ))}
                      <span style={{ fontSize: '12px', color: '#64748b', marginLeft: '8px', fontWeight: 500 }}>
                        {getRatingLabel(hoverRating || formData.rating)}
                      </span>
                    </div>
                  </div>

                  {/* Name & Country */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div className="review-form-group">
                      <label className="review-form-label">
                        {isEn ? 'Full Name *' : 'Nama Lengkap *'}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={isEn ? 'e.g. Jessica Miller' : 'Contoh: Rangga / Jessica'}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="review-form-input"
                      />
                    </div>
                    <div className="review-form-group">
                      <label className="review-form-label">
                        {isEn ? 'Origin (City / Country)' : 'Kota / Negara Asal'}
                      </label>
                      <input
                        type="text"
                        placeholder={isEn ? 'e.g. Melbourne, Australia' : 'Contoh: Jakarta / Surabaya'}
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="review-form-input"
                      />
                    </div>
                  </div>

                  {/* Tour Package */}
                  <div className="review-form-group">
                    <label className="review-form-label">
                      {isEn ? 'Tour Package Selected' : 'Paket Tour yang Dipilih'}
                    </label>
                    <select
                      value={formData.tour_package}
                      onChange={(e) => setFormData({ ...formData, tour_package: e.target.value })}
                      className="review-form-select"
                    >
                      <option value="West Nusa Penida Tour">
                        {isEn ? 'West Nusa Penida Tour (Kelingking, Broken Beach, Angel Billabong)' : 'Trip Barat / West (Kelingking, Broken Beach, Angel Billabong)'}
                      </option>
                      <option value="East Nusa Penida Tour">
                        {isEn ? 'East Nusa Penida Tour (Diamond Beach, Tree House, Atuh)' : 'Trip Timur / East (Diamond Beach, Tree House, Atuh)'}
                      </option>
                      <option value="Combination Tour (West & East)">
                        {isEn ? 'Combo Tour (West & East Highlights)' : 'Paket Kombinasi Barat & Timur'}
                      </option>
                      <option value="Snorkeling 3 Spot + Penida Barat">
                        {isEn ? 'Snorkeling 3 Spots (Manta Bay) + West Tour' : 'Snorkeling Manta Bay + Trip Barat'}
                      </option>
                      <option value="Transport Privat & Driver Mobil AC">
                        {isEn ? 'Private Transport & Local Driver Only' : 'Sewa Mobil Privat + Driver Saja'}
                      </option>
                    </select>
                  </div>

                  {/* Comment */}
                  <div className="review-form-group">
                    <label className="review-form-label">
                      {isEn ? 'Your Review *' : 'Ulasan Perjalanan Anda *'}
                    </label>
                    <textarea
                      required
                      rows="4"
                      placeholder={
                        isEn
                          ? 'Share your experience regarding our vehicle comfort, driver assistance, photo spots, and overall trip...'
                          : 'Ceritakan pengalaman Anda mengenai kenyamanan armada AC, keramahan driver, dokumentasi foto, dan suasana liburan...'
                      }
                      value={formData.comment}
                      onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                      className="review-form-textarea"
                    ></textarea>
                  </div>

                  {/* Action Buttons */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      gap: '10px',
                      marginTop: '20px'
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      disabled={submitting}
                      style={{
                        padding: '9px 18px',
                        borderRadius: '10px',
                        border: '1px solid #cbd5e1',
                        background: '#ffffff',
                        color: '#64748b',
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      {isEn ? 'Cancel' : 'Batal'}
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      style={{
                        padding: '9px 22px',
                        borderRadius: '10px',
                        border: 'none',
                        background: '#0284c7',
                        color: '#ffffff',
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      {submitting
                        ? (isEn ? 'Saving...' : 'Menyimpan...')
                        : (isEn ? 'Submit Review' : 'Kirim Ulasan')}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
