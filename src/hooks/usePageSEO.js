import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEO_MAP = {
  '/': {
    title: 'Penida Breeze Tours | Nusa Penida Tours, Travel & Transport Bali',
    description: 'Penyedia tour dan sewa mobil terbaik di Nusa Penida, Bali. Paket West Trip, East Trip, dan transport private AC dengan driver lokal ramah.',
  },
  '/paket': {
    title: 'Paket Tour Nusa Penida Murah & Lengkap | Penida Breeze Tours',
    description: 'Pilihan paket wisata Nusa Penida Barat (West) dan Timur (East). Include mobil ber-AC, driver lokal, BBM, makan siang, dan fast boat PP.',
  },
  '/destinasi': {
    title: 'Destinasi Wisata Terbaik di Nusa Penida | Penida Breeze Tours',
    description: 'Jelajahi keindahan Pantai Kelingking, Broken Beach, Angel’s Billabong, Crystal Bay, dan Diamond Beach bersama Penida Breeze Tours.',
  },
  '/booking': {
    title: 'Booking & Reservasi Paket Wisata Nusa Penida | Penida Breeze Tours',
    description: 'Pesan paket tour Nusa Penida secara online dan instan. Konfirmasi cepat langsung terhubung ke WhatsApp bisnis resmi.',
  },
  '/galeri': {
    title: 'Galeri Foto & Dokumentasi Wisata Nusa Penida | Penida Breeze Tours',
    description: 'Koleksi foto eksklusif pemandangan alam, tebing karang, dan pantai pasir putih Nusa Penida dari para wisatawan.',
  },
  '/gallery': {
    title: 'Photo Gallery & Highlights | Penida Breeze Tours',
    description: 'Stunning photos and visual highlights of Nusa Penida island adventures with Penida Breeze Tours.',
  },
  '/tentang-kami': {
    title: 'Tentang Kami - Agen Tour Lokal Terpercaya | Penida Breeze Tours',
    description: 'Kenali lebih dekat Penida Breeze Tours, tim lokal berpengalaman yang siap memberikan liburan terbaik di Nusa Penida, Bali.',
  },
  '/faq': {
    title: 'FAQ - Pertanyaan Umum Wisata Nusa Penida | Penida Breeze Tours',
    description: 'Jawaban lengkap seputar jadwal fast boat, fasilitas mobil privat, pakaian yang disarankan, dan tips liburan ke Nusa Penida.',
  },
  '/kontak': {
    title: 'Kontak & Alamat Kantor | Penida Breeze Tours Nusa Penida',
    description: 'Hubungi tim customer service Penida Breeze Tours melalui WhatsApp, telepon, atau email untuk konsultasi liburan Anda.',
  },
};

export default function usePageSEO() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    let seo = SEO_MAP[path];

    if (!seo) {
      if (path.startsWith('/paket/')) {
        const slug = path.replace('/paket/', '').replace(/-/g, ' ');
        const capitalized = slug.replace(/\b\w/g, (c) => c.toUpperCase());
        seo = {
          title: `${capitalized} | Penida Breeze Tours`,
          description: `Detail itinerary dan tarif paket ${capitalized} di Nusa Penida bersama Penida Breeze Tours.`,
        };
      } else if (path.startsWith('/destinasi/')) {
        const slug = path.replace('/destinasi/', '').replace(/-/g, ' ');
        const capitalized = slug.replace(/\b\w/g, (c) => c.toUpperCase());
        seo = {
          title: `${capitalized} - Wisata Nusa Penida | Penida Breeze Tours`,
          description: `Panduan lengkap, daya tarik, dan tips berkunjung ke ${capitalized}, Nusa Penida, Bali.`,
        };
      } else {
        seo = {
          title: 'Penida Breeze Tours | Nusa Penida Tours, Travel & Transport Bali',
          description: 'Official local tour & transport agent di Nusa Penida, Bali.',
        };
      }
    }

    // Update document title
    document.title = seo.title;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', seo.description);
    }

    // Update Open Graph tags for social sharing
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', seo.title);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', seo.description);

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', `https://penidabreezetours.com${path}`);
  }, [location]);
}
