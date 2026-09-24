# Penida Breeze Tours

Platform web pemesanan paket wisata dan transportasi privat di Nusa Penida, Bali. Dibangun sebagai Single Page Application (SPA) menggunakan React 18 dan Vite, dengan integrasi database Supabase dan notifikasi reservasi WhatsApp.

[![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-purple?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-emerald?style=flat-square&logo=supabase)](https://supabase.com/)
[![React Router](https://img.shields.io/badge/Router-v7-red?style=flat-square&logo=react-router)](https://reactrouter.com/)

---

## Gambaran Proyek

Aplikasi ini melayani calon wisatawan domestik maupun mancanegara yang membutuhkan informasi rute tour pulau Nusa Penida (wilayah Barat, Timur, dan kombinasi), rincian harga sewa mobil, serta sistem reservasi langsung.

Sistem dilengkapi formulir pemesanan dengan validasi input, pemilihan kode telepon negara otomatis, penyimpanan data transaksi ke Supabase PostgreSQL, serta pembuatan pesan konfirmasi terstruktur ke nomor WhatsApp operasional.

---

## Fungsionalitas Utama

- **Bilingual Interface (ID / EN)**: Manajemen konteks bahasa global via `LanguageContext` tanpa reload halaman.
- **Katalog Destinasi & Paket**: Data terstruktur di `src/data/` untuk rute populer (Kelingking Beach, Diamond Beach, Broken Beach, Crystal Bay, Atuh Beach).
- **Formulir Pemesanan Dinamis**:
  - Validasi data pemesan (nama, kontak, tanggal tour, jumlah peserta).
  - Selector kode negara internasional dengan prefix nomor telepon.
  - Opsi simpan ke tabel Supabase dan redirect langsung ke WhatsApp dengan pesan terformat rapi.
- **Sistem Ulasan (Reviews)**: Input rating bintang dan testimoni tersimpan di database dengan kebijakan Row Level Security (RLS).
- **Responsivitas Layar**:
  - Layout fluid berbasis custom CSS tokens (`src/styles/index.css`).
  - Pencegahan horizontal overflow pada browser mobile.
  - Sticky bottom booking bar khusus viewport smartphone.
- **SEO & Metadata**: Tag Open Graph, canonical link, dan Twitter card terpasang statis untuk kebutuhan preview link sosial media.

---

## Spesifikasi Teknis

- **Frontend Core**: React 18.3, Vite 6.1
- **Navigasi**: React Router DOM v7
- **Database**: Supabase (PostgreSQL 15)
- **Komponen Icon**: Lucide React
- **Tipografi**: Inter (body text), Outfit (headings) via Google Fonts
- **Styling**: Vanilla CSS modular dengan CSS Custom Properties (tanpa framework CSS eksternal)

---

## Struktur Direktori

```text
├── public/                 # File publik statis (robots.txt, sitemap, favicon)
├── images/                 # Aset foto destinasi lokal
├── src/
│   ├── components/         # Komponen UI modular (Header, Footer, BookingForm, dll.)
│   ├── config/             # Kredensial Supabase dan metadata aplikasi
│   ├── context/            # LanguageContext dan ThemeContext
│   ├── data/               # Dataset destinasi, paket tour, dan FAQ
│   ├── hooks/              # Custom hooks logika frontend
│   ├── pages/              # Komponen halaman rute
│   ├── styles/             # index.css (desain token, reset, layout, breakpoint)
│   ├── App.jsx             # Definisi routing utama
│   └── main.jsx            # Entry point ReactDOM
├── supabase/               # Skrip migrasi DDL PostgreSQL
├── index.html              # Template root HTML
├── package.json            # Manifest dependensi
└── vite.config.js          # Konfigurasi build Vite

