// Konfigurasi global website — satu sumber kebenaran
export const SITE = {
  name: 'Penida Breeze Tours',
  tagline: 'Nusa Penida Tour & Transport',
  description: 'Penyedia jasa tour dan transport terpercaya di Nusa Penida, Bali.',
  whatsapp: '6282329073409',
  whatsappDisplay: '+62 823-2907-3409',
  email: 'penidabreezetours@gmail.com',
  instagram: '@penida_breeze_tour',
  instagramUrl: 'https://www.instagram.com/penida_breeze_tour?utm_source=qr&stkn=MXE0OXFrcTMwOXVyNQ==',
  location: 'Nusa Penida, Bali, Indonesia',
  year: new Date().getFullYear(),
};

/**
 * Buat URL WhatsApp dengan pesan otomatis
 * @param {string} message - Pesan yang dikirim
 * @returns {string} URL WhatsApp
 */
export function getWhatsAppUrl(message = '') {
  const defaultMsg = `Halo ${SITE.name}, saya ingin tanya tentang paket tour Nusa Penida.`;
  const text = message || defaultMsg;
  return `https://api.whatsapp.com/send?phone=${SITE.whatsapp}&text=${encodeURIComponent(text)}`;
}

/**
 * Format harga ke Rupiah
 * @param {number} amount
 * @returns {string}
 */
export function formatPrice(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
