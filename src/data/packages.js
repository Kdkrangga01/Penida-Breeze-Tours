export const packages = [
  {
    id: 'barat_std',
    slug: 'trip-barat-standard',
    altSlug: 'west-nusa-penida-trip',
    title: 'Trip Barat / West (All-Inclusive)',
    packageType: 'all_inclusive',
    subtitle: 'Paket lengkap All-Inclusive mengunjungi ikon legendaris Nusa Penida Barat',
    badge: 'All-Inclusive',
    price: 400000,
    unit: '/ Pax',
    unitEn: '/ Person',
    pricingType: 'per_pax',
    minPax: 'Maks. 5 Orang',
    minPaxEn: 'Max. 5 Persons',
    minPaxNumber: 1,
    maxPaxNumber: 5,
    duration: '10–12 Jam',
    image: '/images/destinations/kelingking-beach.jpg',
    destinationSlugs: ['broken-beach', 'angels-billabong', 'kelingking-beach', 'crystal-bay'],
    destinations: [
      'Broken Beach',
      'Angel Bilabong',
      'Kelingking Beach',
      'Crystal Beach',
    ],
    highlights: [
      'Tebing T-Rex Kelingking Beach yang ikonik dunia',
      'Jembatan batu alami & laguna laut Broken Beach',
      'Kolam infinity pool alami tepi laut Angel Bilabong',
      'Pantai Crystal Beach dengan sunset eksotis & air bening',
    ],
    included: [
      'Car (Mobil Privat Ber-AC + Driver + BBM)',
      'Lunch (Makan Siang di Restoran Lokal)',
      'Boat (Tiket Fast Boat Sanur - Penida PP)',
      'Tiket Retribusi & Tiket Semua Destinasi',
      'Driver & Pemandu Lokal Berpengalaman',
      'Air Mineral Selama Perjalanan',
    ],
    excluded: [
      'Pengeluaran pribadi & belanja oleh-oleh',
      'Aktivitas opsional snorkeling (sewa di lokasi)',
      'Tipping driver (sukarela)',
    ],
    itinerary: [
      { time: '06.45', activity: 'Meeting point di Pelabuhan Sanur, Bali & pembagian boarding pass fast boat' },
      { time: '07.30', activity: 'Keberangkatan Fast Boat menuju Nusa Penida (estimasi 40 menit penyeberangan)' },
      { time: '08.15', activity: 'Tiba di Pelabuhan Nusa Penida, disambut langsung oleh Driver lokal kami' },
      { time: '09.00', activity: 'Eksplorasi Broken Beach (Pasih Uug) & Angel Bilabong alami' },
      { time: '11.30', activity: 'Makan siang santai di restoran lokal pulau (sudah termasuk)' },
      { time: '12.45', activity: 'Menuju Kelingking Beach — sesi foto panorama tebing T-Rex' },
      { time: '14.45', activity: 'Bersantai di Crystal Beach — berenang atau menikmati kelapa muda' },
      { time: '16.15', activity: 'Diantar kembali ke pelabuhan untuk check-in fast boat' },
      { time: '17.00', activity: 'Fast boat kembali ke Sanur, Bali. Trip selesai dengan kenangan indah!' },
    ],
    importantInfo: [
      'Harga Rp 400.000 dihitung per orang (1 orang bayar 400k, 2 orang bayar 800k, dst).',
      'Maksimal 5 pax per mobil / pemesanan, tidak melayani lebih dari 5 pax.',
      'Paket All-Inclusive lengkap sudah include: Car, Lunch, Boat PP, dan Tiket Retribusi.',
      'Disarankan memakai pakaian santai, alas kaki nyaman untuk jalan, topi, dan sunscreen.',
    ],
    facilities: [
      { name: 'Car', icon: 'Car' },
      { name: 'Lunch', icon: 'Utensils' },
      { name: 'Boat', icon: 'Ship' },
      { name: 'Tiket Retribusi', icon: 'Ticket' },
    ],
  },
  {
    id: 'timur',
    slug: 'trip-timur',
    altSlug: 'east-nusa-penida-trip',
    title: 'Trip Timur / East Destinasi',
    packageType: 'transport_only',
    subtitle: 'Sewa transport privat menjelajahi pesona pantai eksotis Nusa Penida Timur',
    badge: 'Transport Only',
    price: 700000,
    unit: '/ Mobil',
    unitEn: '/ Car',
    pricingType: 'per_car',
    minPax: 'Maks. 5 Orang',
    minPaxEn: 'Max. 5 People',
    minPaxNumber: 1,
    maxPaxNumber: 5,
    duration: '10–12 Jam',
    image: '/images/destinations/diamond-beach.jpg',
    destinationSlugs: ['diamond-beach', 'atuh-beach', 'treehouse-rumah-pohon'],
    destinations: [
      'Diamond Beach',
      'Atuh Beach',
      'TREEHOUSE / Rumah Pohon',
    ],
    highlights: [
      'Tangga tebing batu kapur Diamond Beach yang megah',
      'Teluk pasir putih Atuh Beach diapit pulau karang alami',
      'Viewpoint ikonik Tree House (Rumah Pohon) Molenteng',
      'Armada mobil privat ber-AC khusus rombongan Anda (maks. 5 pax)',
    ],
    included: [
      'Car (Mobil Privat Ber-AC + Driver + BBM)',
      'Driver Lokal Berpengalaman & Fotografer Pribadi',
      'Air Mineral Selama Perjalanan',
      'Parkir di Seluruh Destinasi Wisata',
    ],
    excluded: [
      'Boat (Tiket Fast Boat Penyeberangan Sanur - Penida PP)',
      'Lunch (Makan Siang)',
      'Tiket Retribusi & Tiket Masuk Destinasi',
      'Tiket foto opsional di Rumah Pohon & pengeluaran pribadi',
    ],
    itinerary: [
      { time: '08.15', activity: 'Penjemputan langsung di Pelabuhan Nusa Penida oleh Driver lokal kami' },
      { time: '09.30', activity: 'Eksplorasi Diamond Beach — menikmati tangga tebing kapur dan pasir putih kristal' },
      { time: '11.30', activity: 'Menuju Atuh Beach — bersantai di teluk alami berpasir putih' },
      { time: '13.00', activity: 'Istirahat makan siang (driver mengantar ke resto lokal rekomendasi, biaya mandiri)' },
      { time: '14.15', activity: 'Kunjungan Tree House (Rumah Pohon Molenteng) & panorama Raja Lima' },
      { time: '16.00', activity: 'Perjalanan kembali menuju pelabuhan utama Nusa Penida' },
      { time: '16.45', activity: 'Tiba di pelabuhan untuk jadwal penyeberangan kembali ke Bali' },
    ],
    importantInfo: [
      'Harga normal tetap Rp 700.000 flat per mobil (booking 1 orang maupun hingga 5 orang tetap dihitung harga normal Rp 700.000).',
      'Kapasitas rombongan maksimal 5 orang (tidak ada penambahan pax lebih).',
      'Paket Transport Only: harga mencakup Car (Mobil privat ber-AC) + Driver + BBM.',
      'Tanpa include: tiket fast boat, makan siang, dan tiket retribusi destinasi.',
    ],
    facilities: [
      { name: 'Car (Mobil + BBM)', icon: 'Car' },
      { name: 'Driver Lokal', icon: 'Users' },
      { name: 'Maks. 5 Pax', icon: 'Users' },
    ],
  },
  {
    id: 'barat_premium',
    slug: 'trip-barat-premium',
    altSlug: 'west-nusa-penida-private',
    title: 'Trip Barat / West Destinasi',
    packageType: 'transport_only',
    subtitle: 'Sewa transport privat menjelajahi seluruh destinasi favorit Nusa Penida Barat',
    badge: 'Transport Only',
    price: 650000,
    unit: '/ Mobil',
    unitEn: '/ Car',
    pricingType: 'per_car',
    minPax: 'Maks. 5 Orang',
    minPaxEn: 'Max. 5 People',
    minPaxNumber: 1,
    maxPaxNumber: 5,
    duration: '10–12 Jam',
    image: '/images/destinations/broken-beach.jpg',
    destinationSlugs: ['broken-beach', 'angels-billabong', 'kelingking-beach', 'crystal-bay'],
    destinations: [
      'Broken Beach',
      'Angel Bilabong',
      'Kelingking Beach',
      'Crystal Beach',
    ],
    highlights: [
      'Tebing T-Rex Kelingking Beach dengan view samudra spektakuler',
      'Jembatan karang alami melingkar Broken Beach',
      'Laguna air jernih alami Angel Bilabong',
      'Bersantai menikmati suasana tropis Crystal Beach',
      'Armada mobil privat ber-AC khusus rombongan Anda (maks. 5 pax)',
    ],
    included: [
      'Car (Mobil Privat Ber-AC + Driver + BBM)',
      'Driver Lokal Berpengalaman & Fotografer Pribadi',
      'Air Mineral Selama Perjalanan',
      'Parkir di Seluruh Destinasi Wisata',
    ],
    excluded: [
      'Boat (Tiket Fast Boat Penyeberangan Sanur - Penida PP)',
      'Lunch (Makan Siang)',
      'Tiket Retribusi & Tiket Masuk Destinasi',
      'Aktivitas snorkeling & pengeluaran pribadi',
    ],
    itinerary: [
      { time: '08.15', activity: 'Penjemputan langsung di Pelabuhan Nusa Penida oleh Driver privat ber-AC' },
      { time: '09.00', activity: 'Kunjungan Broken Beach & Angel Bilabong' },
      { time: '11.45', activity: 'Istirahat makan siang (driver mengantar ke resto pilihan, biaya mandiri)' },
      { time: '13.00', activity: 'Spot foto spektakuler viewpoint tebing T-Rex Kelingking Beach' },
      { time: '15.00', activity: 'Chill dan santai di pantai Crystal Beach' },
      { time: '16.15', activity: 'Perjalanan kembali diantar ke pelabuhan penyeberangan' },
      { time: '17.00', activity: 'Tiba di pelabuhan Nusa Penida' },
    ],
    importantInfo: [
      'Harga normal tetap Rp 650.000 flat per mobil (booking 1 orang maupun hingga 5 orang tetap dihitung harga normal Rp 650.000).',
      'Kapasitas rombongan maksimal 5 orang (tidak ada penambahan pax lebih).',
      'Paket Transport Only: harga mencakup Car (Mobil privat ber-AC) + Driver + BBM.',
      'Tanpa include: tiket fast boat, makan siang, dan tiket retribusi destinasi.',
    ],
    facilities: [
      { name: 'Car (Mobil + BBM)', icon: 'Car' },
      { name: 'Driver Lokal', icon: 'Users' },
      { name: 'Maks. 5 Pax', icon: 'Users' },
    ],
  },
  {
    id: 'mix_trip',
    slug: 'trip-kombinasi',
    altSlug: 'mix-trip-nusa-penida',
    title: 'Trip Kombinasi / Mix Destinasi',
    packageType: 'transport_only',
    subtitle: 'Sewa transport privat mengunjungi kombinasi ikon terbaik Nusa Penida Timur & Barat',
    badge: 'Transport Only',
    price: 1000000,
    unit: '/ Mobil',
    unitEn: '/ Car',
    pricingType: 'per_car',
    minPax: 'Maks. 5 Orang',
    minPaxEn: 'Max. 5 People',
    minPaxNumber: 1,
    maxPaxNumber: 5,
    duration: '10–12 Jam',
    image: '/images/destinations/treehouse.jpg',
    destinationSlugs: ['diamond-beach', 'atuh-beach', 'treehouse-rumah-pohon', 'kelingking-beach'],
    destinations: [
      'Diamond Beach',
      'Atuh Beach',
      'Treehouse (tidak include tiket untuk ber foto)',
      'Kelingking Beach',
    ],
    highlights: [
      'Kombinasi rute favorit Nusa Penida Timur & Barat dalam satu hari',
      'Tangga tebing kapur spektakuler & pasir putih bersih Diamond Beach',
      'Teluk tenang eksotis diapit tebing alami di Atuh Beach',
      'Spot foto viral Tree House (Rumah Pohon Molenteng) dengan view Raja Lima',
      'Panorama tebing T-Rex legendaris Kelingking Beach yang mendunia',
      'Armada mobil privat ber-AC khusus rombongan Anda (maks. 5 pax)',
    ],
    included: [
      'Car (Mobil Privat Ber-AC + Driver + BBM)',
      'Sudah Include BBM Selama Tour',
      'Parkir di Seluruh Destinasi Wisata',
      'Driver Lokal Berpengalaman & Fotografer Pribadi',
      'Air Mineral Selama Perjalanan',
    ],
    excluded: [
      'Treehouse: Tidak include tiket untuk berfoto (tiket foto opsional bayar mandiri di lokasi)',
      'Boat (Tiket Fast Boat Penyeberangan Sanur - Penida PP)',
      'Lunch (Makan Siang)',
      'Tiket Retribusi & Tiket Masuk Destinasi',
      'Pengeluaran pribadi & belanja oleh-oleh',
    ],
    itinerary: [
      { time: '08.00', activity: 'Penjemputan langsung di Pelabuhan Nusa Penida oleh Driver lokal privat ber-AC' },
      { time: '09.15', activity: 'Eksplorasi Nusa Penida Timur: Diamond Beach & Atuh Beach' },
      { time: '11.30', activity: 'Kunjungan Tree House (Rumah Pohon Molenteng) & view Raja Lima (tiket foto mandiri)' },
      { time: '12.45', activity: 'Istirahat makan siang (driver mengantar ke resto lokal rekomendasi, biaya mandiri)' },
      { time: '14.15', activity: 'Melanjutkan perjalanan menuju Nusa Penida Barat: Kelingking Beach (Tebing T-Rex)' },
      { time: '16.15', activity: 'Perjalanan kembali diantar ke pelabuhan penyeberangan' },
      { time: '17.00', activity: 'Tiba di pelabuhan Nusa Penida untuk jadwal penyeberangan kembali ke Bali' },
    ],
    importantInfo: [
      'Harga normal tetap Rp 1.000.000 flat per mobil (booking 1 orang maupun hingga 5 orang tetap dihitung harga normal Rp 1.000.000).',
      'Kapasitas rombongan maksimal 5 orang (tidak ada penambahan pax lebih).',
      'Paket Kombinasi / Mix Trip sudah include BBM, Mobil privat ber-AC, Driver lokal, dan Parkir di seluruh destinasi.',
      'Perhatian: Tidak include tiket untuk berfoto di spot Tree House / Rumah Pohon (biaya foto bayar mandiri di lokasi jika ingin naik ke tangga rumah pohon).',
      'Tanpa include: tiket fast boat penyeberangan Sanur - Penida PP, makan siang, dan tiket retribusi destinasi.',
    ],
    facilities: [
      { name: 'Car (Mobil + BBM)', icon: 'Car' },
      { name: 'Include Parkir', icon: 'Ticket' },
      { name: 'Driver Lokal', icon: 'Users' },
      { name: 'Maks. 5 Pax', icon: 'Users' },
    ],
  },
];

/**
 * Cari paket berdasarkan slug (mendukung slug utama & alias)
 * @param {string} slug
 * @returns {object|undefined}
 */
export function getPackageBySlug(slug) {
  if (!slug) return undefined;
  return packages.find(
    (p) =>
      p.slug === slug ||
      p.altSlug === slug ||
      p.id === slug ||
      (slug === 'trip-barat-transport' && p.id === 'barat_premium') ||
      (slug === 'trip-timur-transport' && p.id === 'timur') ||
      (slug === 'trip-mix' && p.id === 'mix_trip') ||
      (slug === 'trip-kombinasi' && p.id === 'mix_trip')
  );
}

/**
 * Cari paket berdasarkan ID
 * @param {string} id
 * @returns {object|undefined}
 */
export function getPackageById(id) {
  return packages.find((p) => p.id === id);
}
