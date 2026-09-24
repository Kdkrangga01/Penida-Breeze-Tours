import React, { createContext, useContext, useState, useEffect } from 'react';

// Comprehensive translations dictionary covering every single text on the website
const translations = {
  id: {
    // ── NAVIGATION ──
    'nav.home': 'Beranda',
    'nav.destinations': 'Destinasi',
    'nav.packages': 'Paket Tour',
    'nav.gallery': 'Galeri',
    'nav.reviews': 'Ulasan',
    'nav.about': 'Tentang Kami',
    'nav.contact': 'Kontak',
    'nav.bookNow': 'Pesan Sekarang',
    'nav.language': 'Bahasa',

    // ── HERO ──
    'hero.badge': 'BALI · NUSA PENIDA TOUR & TRANSPORT',
    'hero.title1': 'Explore Nusa Penida',
    'hero.title2': 'Like Never Before',
    'hero.desc': 'Jelajahi keindahan tebing karang ikonik, laguna alami tersembunyi, dan birunya samudra tropis bersama driver lokal berlisensi dan armada mobil privat ber-AC prima.',
    'hero.chip1': '100% Mobil Privat AC',
    'hero.chip2': 'Fast Boat PP Sanur',
    'hero.chip3': 'Spot Foto Ikonik Dunia',
    'hero.ctaPrimary': 'Pesan Trip Sekarang',
    'hero.ctaSecondary': 'Lihat Paket Wisata',

    // Hero Slides Bottom Bar
    'hero.slide.1.region': 'NUSA PENIDA BARAT',
    'hero.slide.1.tagline': 'Panorama Megah Tebing T-Rex Samudra Hindia',
    'hero.slide.2.region': 'NUSA PENIDA TIMUR',
    'hero.slide.2.tagline': 'Surga Pasir Putih & Tangga Tebing Karang Ikonik',
    'hero.slide.3.region': 'NUSA PENIDA BARAT',
    'hero.slide.3.tagline': 'Keajaiban Jembatan Karang Alami & Laguna Biru',
    'hero.slide.4.region': 'NUSA PENIDA BARAT',
    'hero.slide.4.tagline': 'Air Sebening Kristal & Panorama Sunset Terindah',
    'hero.slide.5.region': 'NUSA PENIDA TIMUR',
    'hero.slide.5.tagline': 'Teluk Damai Diapit Formasi Pulau Karang Eksotis',

    // ── TRUST STRIP ──
    'trust.1.title': 'Driver Lokal Berlisensi',
    'trust.1.desc': 'Lahir asli di Nusa Penida, ramah, memahami ritme pulau, dan merangkap fotografer pribadi.',
    'trust.2.title': 'Mobil Privat Ber-AC',
    'trust.2.desc': 'Armada mobil bersih dan terawat prima khusus medan jalan pulau tanpa digabung rombongan lain.',
    'trust.3.title': 'Booking Mudah & Fleksibel',
    'trust.3.desc': 'Konfirmasi instan langsung WhatsApp tanpa biaya tersembunyi dengan opsi reschedule fleksibel.',
    'trust.4.title': 'Rute Wisata Terlengkap',
    'trust.4.desc': 'Jangkauan seluruh spot spektakuler ikonik barat dan timur dengan waktu kunjungan optimal.',

    // ── PACKAGES SECTION ──
    'pkg.sectionEyebrow': 'PILIHAN PAKET TOUR',
    'pkg.sectionTitle': 'Pilih Rute Petualangan Terbaik',
    'pkg.sectionSubtitle': 'Pilihan lengkap Paket All-Inclusive (Car, Lunch, Fast Boat PP, Tiket Retribusi) & Paket Sewa Transport Tour (Mobil + Driver + BBM, maks. 5 pax) sesuai kebutuhan liburan Anda.',
    'pkg.startFrom': 'Mulai dari',
    'pkg.perPax': '/ Pax',
    'pkg.perCar': '/ Mobil',
    'pkg.selectPkg': 'Pilih Paket',
    'pkg.detailPkg': 'Lihat Detail',
    'pkg.mainDestinations': 'Destinasi Utama:',
    'pkg.included': 'Sudah Termasuk:',
    'pkg.duration': '10–12 Jam',
    'pkg.customHint': 'Ingin rute kombinasi barat & timur atau private charter khusus keluarga?',
    'pkg.customBtn': 'Konsultasi Custom Trip',

    // ── DESTINATIONS SECTION ──
    'dest.sectionEyebrow': 'DESTINASI IKONIK',
    'dest.sectionTitle': 'Jelajahi Surga Nusa Penida',
    'dest.sectionSubtitle': 'Dari tebing T-Rex Kelingking yang menantang samudra hingga teluk berpasir putih kristal, nikmati keajaiban alam terpopuler di Nusa Penida.',
    'dest.explore': 'Explore',
    'dest.viewAll': 'Lihat Semua Destinasi',
    'dest.mustVisit': 'Wajib Dikunjungi',
    'dest.west': 'Trip Barat',
    'dest.east': 'Trip Timur',

    // ── ABOUT SECTION ──
    'about.sectionEyebrow': 'TENTANG KAMI',
    'about.headline': 'Liburan Nusa Penida Lebih Praktis & Menyenangkan',
    'about.lead': 'Penida Breeze Tours membantu wisatawan menikmati keindahan Nusa Penida dengan pengalaman perjalanan yang nyaman, aman, dan berkesan.',
    'about.body': 'Kami memahami bahwa menjelajahi pulau dengan kontur tebing spektakuler membutuhkan armada yang terawat prima dan driver lokal yang memahami ritme jalanan pulau, waktu terbaik bebas keramaian, serta spot foto paling eksotis.',
    'about.badge': '100% Pemandu Lokal Asli',
    'about.badgeSub': 'Ramah, berpengalaman & berlisensi resmi',
    'about.item1.title': 'Armada Mobil Ber-AC',
    'about.item1.desc': 'Mobil privat prima khusus medan jalan pulau',
    'about.item2.title': 'Rute Paling Efisien',
    'about.item2.desc': 'Waktu kunjungan optimal spot barat & timur',
    'about.item3.title': 'Trip Privat Eksklusif',
    'about.item3.desc': 'Tanpa digabung tamu lain, ritme santai',
    'about.item4.title': 'Kearifan Lokal Asli',
    'about.item4.desc': 'Driver sabar, sigap, dan siap jadi fotografer',
    'about.btnProfile': 'Profil Lengkap',
    'about.btnAsk': 'Tanya Tim Kami',

    // ── TIMELINE / HOW IT WORKS ──
    'timeline.sectionEyebrow': 'CARA PEMESANAN',
    'timeline.sectionTitle': '4 Langkah Mudah Menuju Nusa Penida',
    'timeline.sectionSubtitle': 'Rencanakan liburan impian Anda hanya dalam beberapa menit secara terorganisir tanpa ribet.',
    'timeline.step1.title': 'Pilih Paket Wisata',
    'timeline.step1.desc': 'Tentukan rute petualangan: West Trip dengan tebing T-Rex Kelingking atau East Trip dengan Diamond Beach yang memukau.',
    'timeline.step2.title': 'Tentukan Tanggal & Pax',
    'timeline.step2.desc': 'Pilih tanggal keberangkatan dan jumlah peserta rombongan Anda melalui form pemesanan praktis kami.',
    'timeline.step3.title': 'Konfirmasi WhatsApp',
    'timeline.step3.desc': 'Tim kami segera memproses tiket fast boat PP, menyiapkan armada mobil, dan mengirimkan voucher reservasi resmi.',
    'timeline.step4.title': 'Nikmati Liburan',
    'timeline.step4.desc': 'Driver lokal kami siap menyambut Anda langsung di pelabuhan Nusa Penida dan memandu petualangan tak terlupakan!',

    // ── FAQ SECTION ──
    'faq.sectionEyebrow': 'PERTANYAAN UMUM',
    'faq.sectionTitle': 'Hal yang Sering Ditanyakan',
    'faq.sectionSubtitle': 'Semua yang perlu Anda ketahui tentang tiket boat, transportasi pulau, rute tour, dan persiapan perjalanan.',

    // ── BOOKING CTA ──
    'cta.pill': 'START YOUR ISLAND ADVENTURE',
    'cta.heading': 'Siap Menjelajahi Nusa Penida?',
    'cta.desc': 'Amankan jadwal trip Anda sekarang untuk mendapatkan armada terbaik dan penjemputan tepat waktu. Konsultasikan rencana liburan Anda bersama tim lokal kami.',
    'cta.btnBook': 'Pesan Petualangan Anda',
    'cta.btnWa': 'Chat via WhatsApp',
    'cta.trust': 'Tanpa Biaya Tersembunyi · Driver Berlisensi · Tiket Fast Boat PP',

    // ── FOOTER ──
    'footer.tagline': 'Official transport & travel agent di Nusa Penida, Bali. Menemani setiap langkah petualangan tropis Anda dengan aman, nyaman, dan berkesan.',
    'footer.quickLinks': 'Navigasi',
    'footer.tourPackages': 'Paket Wisata',
    'footer.contactUs': 'Hubungi Kami',
    'footer.contactPrompt': 'Siap merencanakan liburan? Hubungi tim kami langsung via WhatsApp atau Email:',
    'footer.rights': 'Hak cipta dilindungi undang-undang. Clean Tropical Premium Travel.',

    // ── BOOKING PAGE ──
    'booking.heroBadge': 'RESERVASI CEPAT & AMAN',
    'booking.heroTitle': 'Booking Trip Nusa Penida',
    'booking.heroDesc': 'Pemesanan paket tour privat ber-AC dan tiket fast boat Sanur PP praktis langsung konfirmasi WhatsApp.',
    'booking.step1': 'PILIH PAKET WISATA',
    'booking.step2': 'PILIH TANGGAL & PESERTA',
    'booking.step3': 'INFORMASI PEMESAN',
    'booking.inputName': 'Nama Lengkap',
    'booking.namePlaceholder': 'Contoh: Budi Santoso',
    'booking.inputPhone': 'Nomor WhatsApp',
    'booking.phonePlaceholder': '81234567890',
    'booking.inputDate': 'Tanggal Tour',
    'booking.inputNotes': 'Catatan Tambahan (Opsional)',
    'booking.notesPlaceholder': 'Contoh: Request penjemputan khusus, makanan vegetarian, dsb.',
    'booking.paxLabel': 'Jumlah Tamu / Peserta',
    'booking.paxPerson': 'Orang',
    'booking.paxMinNote': 'Minimal {min} orang untuk paket ini',
    'booking.quickPax': 'Rekomendasi Cepat:',
    'booking.receiptTitle': 'Ringkasan Booking',
    'booking.receiptItinerary': 'Rute Perjalanan',
    'booking.receiptDuration': 'Durasi Trip',
    'booking.receiptDate': 'Tanggal Berangkat',
    'booking.receiptGuests': 'Peserta',
    'booking.receiptPricePerPax': 'Harga per Pax',
    'booking.receiptTotal': 'Estimasi Total Biaya',
    'booking.receiptIncluded': 'Termasuk fast boat PP, mobil ber-AC, bbm, driver, dan tiket destinasi.',
    'booking.btnSendWa': 'Kirim Booking via WhatsApp',
    'booking.btnPreviewVoucher': 'Lihat Voucher Sementara',
    'booking.trustNote': 'Pembayaran aman & konfirmasi jadwal langsung dari operator resmi.',

    // ── VOUCHER MODAL ──
    'voucher.title': 'Preview Tiket Reservasi',
    'voucher.official': 'OFFICIAL BOARDING VOUCHER',
    'voucher.status': 'Menunggu Konfirmasi WhatsApp',
    'voucher.pkgLabel': 'PAKET TOUR',
    'voucher.dateLabel': 'TANGGAL TRIP',
    'voucher.paxLabel': 'JUMLAH PESERTA',
    'voucher.nameLabel': 'NAMA PEMESAN',
    'voucher.totalLabel': 'TOTAL BIAYA',
    'voucher.btnSend': 'Lanjutkan Kirim ke WhatsApp',
    'voucher.btnClose': 'Tutup',

    // ── ABOUT PAGE ──
    'about.heroTitle': 'Tentang Penida Breeze Tours',
    'about.heroSubtitle': 'Mengenal lebih dekat tim pemandu dan driver lokal berlisensi di balik pengalaman wisata Nusa Penida Anda.',
    'about.ourStory': 'Cerita Kami',
    'about.storyP1': 'Penida Breeze Tours lahir dari kecintaan kami terhadap Nusa Penida — pulau yang telah menjadi tanah kelahiran dan rumah bagi kami. Sebagai warga lokal, kami melihat potensi besar pulau ini sebagai destinasi wisata kelas dunia, namun banyak wisatawan yang kesulitan menemukan transportasi dan guide yang terpercaya.',
    'about.storyP2': 'Dari situlah kami memulai. Dengan armada mobil prima ber-AC dan pengetahuan mendalam tentang setiap rute dan spot rahasia Nusa Penida, kami berkomitmen memberikan pengalaman perjalanan yang aman, nyaman, dan tak terlupakan untuk setiap tamu kami.',
    'about.valuesEyebrow': 'OUR CORE VALUES',
    'about.valuesTitle': 'Nilai Pelayanan Kami',
    'about.valuesSubtitle': 'Komitmen kami demi kenyamanan, keselamatan, dan kebahagiaan liburan Anda di Nusa Penida.',
    'about.val1Title': 'Keselamatan Prioritas',
    'about.val1Desc': 'Kendaraan terawat rutin setiap hari, driver berpengalaman di medan pulau, serta pemantauan cuaca dan gelombang laut secara ketat.',
    'about.val2Title': 'Keramahan Autentik',
    'about.val2Desc': 'Keramahan tulus khas masyarakat Bali. Pemandu kami siap menjadi fotografer pribadi dan membantu segala kebutuhan Anda di perjalanan.',
    'about.val3Title': 'Harga Jujur & Transparan',
    'about.val3Desc': 'Nol biaya tersembunyi. Harga paket jelas dan transparan sesuai rincian fasilitas yang Anda pilih.',
    'about.val4Title': 'Pengetahuan Lokal Asli',
    'about.val4Desc': 'Sebagai warga asli, kami tahu waktu terbaik menghindari keramaian, spot foto paling menawan, dan kuliner pulau paling lezat.',
    'about.statDest': 'Destinasi Ikonik',
    'about.statPkg': 'Paket Tour Pilihan',
    'about.statGuide': 'Pemandu Lokal Asli',

    // ── CONTACT PAGE ──
    'contact.heroTitle': 'Hubungi Kami',
    'contact.heroSubtitle': 'Hubungi kami untuk pertanyaan, konsultasi, atau booking paket tour.',
    'contact.title': 'Hubungi Kami',
    'contact.intro': 'Tim kami siap membantu merencanakan perjalanan Nusa Penida yang sempurna untuk Anda. Jangan ragu untuk menghubungi kami.',
    'contact.cardFormTitle': 'Kirim Pesan & Konsultasi',
    'contact.cardFormSubtitle': 'Isi data singkat di bawah untuk konsultasi rute & booking langsung via WhatsApp resmi.',
    'contact.formName': 'Nama Lengkap',
    'contact.formPhone': 'Nomor WhatsApp',
    'contact.formPackage': 'Pilihan Paket Wisata',
    'contact.formDate': 'Rencana Tanggal Tour',
    'contact.formMessage': 'Pesan atau Pertanyaan Khusus',
    'contact.formMessagePlaceholder': 'Contoh: Mau tanya rute sunrise Rumah Pohon dan penjemputan di Banjar Nyuh...',
    'contact.formBtnSubmit': 'Kirim Pesan via WhatsApp',
    'contact.badgeOnline': 'Layanan CS & Driver Online',
    'contact.responseBadge': 'Respon < 5 Menit',
    'contact.officeDesk': 'Pos Sambut Pelabuhan',
    'contact.officeDesc': 'Pelabuhan Banjar Nyuh & Toyapakeh, Nusa Penida',
    'contact.officeDetail': 'Driver siap menyambut di dermaga fast boat dengan papan nama Anda.',
    'contact.faqShortcutTitle': 'Pertanyaan Cepat Seputar Tour',
    'contact.waTitle': 'WhatsApp',
    'contact.waDesc': 'Respon cepat, booking langsung',
    'contact.emailTitle': 'Email',
    'contact.emailDesc': 'Untuk pertanyaan detail & kerjasama',
    'contact.locationTitle': 'Lokasi Layanan',
    'contact.locationDesc': 'Melayani tour privat di seluruh Nusa Penida',
    'contact.hoursTitle': 'Jam Operasional',
    'contact.hoursVal': 'Setiap hari, 06.00 – 21.00 WITA',
    'contact.hoursNote': 'WhatsApp aktif 24 jam',
    'contact.ctaTitle': 'Chat Langsung via WhatsApp',
    'contact.ctaDesc': 'Cara tercepat untuk booking atau bertanya tentang paket tour kami.',
    'contact.ctaBtn': 'Buka WhatsApp',

    // ── FAQ PAGE ──
    'faq.heroTitle': 'Pertanyaan Umum',
    'faq.heroSubtitle': 'Jawaban untuk pertanyaan yang sering ditanyakan tentang tour Nusa Penida.',
    'faq.btnAll': 'Lihat Semua Tanya Jawab',

    // ── NOT FOUND PAGE ──
    'notFound.title': 'Halaman Tidak Ditemukan',
    'notFound.desc': 'Sepertinya Anda tersesat di lautan Nusa Penida. Halaman yang Anda cari tidak ada atau telah dipindahkan.',
    'notFound.btnHome': 'Kembali ke Beranda',

    // ── GALLERY PAGE ──
    'gallery.heroTitle': 'Galeri Foto Destinasi',
    'gallery.heroSubtitle': 'Koleksi dokumentasi visual berkualitas tinggi mengabadikan pesona tebing megah, pantai eksotis, dan keindahan pulau Nusa Penida.',
    'gallery.filterAll': 'Semua Foto',
    'gallery.filterWest': 'Trip Barat',
    'gallery.filterEast': 'Trip Timur',
    'gallery.badge': 'Dokumentasi Asli Pulau',
    'gallery.viewHd': 'Lihat HD',
    'gallery.close': 'Tutup',
    'gallery.exploreDest': 'Eksplor Destinasi',
    'gallery.bookThis': 'Booking Paket Ini',
    'gallery.photoCount': 'foto',
    'gallery.ctaTitle': 'Tertarik Mengabadikan Momen di Sini?',
    'gallery.ctaSubtitle': 'Driver lokal kami siap mendampingi perjalanan Anda dan mengambil foto terbaik di setiap spot ikonik.',
    'gallery.ctaBtn': 'Pesan Paket Wisata Sekarang',

    // ── MOBILE BAR ──
    'mobileBar.startFrom': 'Mulai',
    'mobileBar.book': 'Booking',
  },

  en: {
    // ── NAVIGATION ──
    'nav.home': 'Home',
    'nav.destinations': 'Destinations',
    'nav.packages': 'Tour Packages',
    'nav.gallery': 'Gallery',
    'nav.reviews': 'Reviews',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    'nav.bookNow': 'Book Now',
    'nav.language': 'Language',

    // ── HERO ──
    'hero.badge': 'BALI · NUSA PENIDA TOUR & TRANSPORT',
    'hero.title1': 'Explore Nusa Penida',
    'hero.title2': 'Like Never Before',
    'hero.desc': 'Discover breathtaking cliff panoramas, hidden natural lagoons, and crystal-clear tropical oceans with licensed local drivers and private AC cars.',
    'hero.chip1': '100% Private AC Car',
    'hero.chip2': 'Round-trip Fast Boat Sanur',
    'hero.chip3': 'World-class Photo Spots',
    'hero.ctaPrimary': 'Book Your Trip Now',
    'hero.ctaSecondary': 'Explore Tour Packages',

    // Hero Slides Bottom Bar
    'hero.slide.1.region': 'WEST NUSA PENIDA',
    'hero.slide.1.tagline': 'Majestic T-Rex Cliff & Indian Ocean Panorama',
    'hero.slide.2.region': 'EAST NUSA PENIDA',
    'hero.slide.2.tagline': 'Pristine White Sands & Iconic Cliff Staircase',
    'hero.slide.3.region': 'WEST NUSA PENIDA',
    'hero.slide.3.tagline': 'Natural Archway Wonder & Circular Blue Lagoon',
    'hero.slide.4.region': 'WEST NUSA PENIDA',
    'hero.slide.4.tagline': 'Crystal Clear Waters & Spectacular Sunset Views',
    'hero.slide.5.region': 'EAST NUSA PENIDA',
    'hero.slide.5.tagline': 'Peaceful Cove Sheltered by Exotic Rock Islets',

    // ── TRUST STRIP ──
    'trust.1.title': 'Licensed Local Drivers',
    'trust.1.desc': 'Born in Nusa Penida, friendly, expert island navigators, and skilled personal photographers.',
    'trust.2.title': 'Private AC Vehicles',
    'trust.2.desc': 'Clean, well-maintained private fleet tailored for island terrain, never mixed with other groups.',
    'trust.3.title': 'Easy & Flexible Booking',
    'trust.3.desc': 'Instant WhatsApp confirmation, zero hidden fees, and flexible rescheduling options.',
    'trust.4.title': 'Complete Tour Routes',
    'trust.4.desc': 'Covers all iconic western and eastern spots with optimal, crowd-free visiting schedules.',

    // ── PACKAGES SECTION ──
    'pkg.sectionEyebrow': 'FEATURED TOUR PACKAGES',
    'pkg.sectionTitle': 'Choose Your Best Island Adventure',
    'pkg.sectionSubtitle': 'Choose between complete All-Inclusive tour (Car, Lunch, Fast Boat, Retribution Tickets) or Private Transport Charter (AC Car + Driver + Fuel, max 5 pax).',
    'pkg.startFrom': 'Starting from',
    'pkg.perPax': '/ Pax',
    'pkg.perCar': '/ Car',
    'pkg.selectPkg': 'Select Package',
    'pkg.detailPkg': 'View Details',
    'pkg.mainDestinations': 'Main Destinations:',
    'pkg.included': 'All-Inclusive Facilities:',
    'pkg.duration': '10–12 Hours',
    'pkg.customHint': 'Looking for a custom combined West & East route or private family charter?',
    'pkg.customBtn': 'Consult Custom Trip',

    // ── DESTINATIONS SECTION ──
    'dest.sectionEyebrow': 'ICONIC DESTINATIONS',
    'dest.sectionTitle': 'Explore Nusa Penida Paradise',
    'dest.sectionSubtitle': 'From the ocean-defying T-Rex cliff of Kelingking to pristine crystal-sand bays, experience the most sought-after natural wonders of Nusa Penida.',
    'dest.explore': 'Explore',
    'dest.viewAll': 'View All Destinations',
    'dest.mustVisit': 'Must Visit',
    'dest.west': 'West Trip',
    'dest.east': 'East Trip',

    // ── ABOUT SECTION ──
    'about.sectionEyebrow': 'ABOUT US',
    'about.headline': 'Nusa Penida Vacations Made Seamless & Memorable',
    'about.lead': 'Penida Breeze Tours helps travelers experience the untamed beauty of Nusa Penida with first-class comfort, safety, and authenticity.',
    'about.body': 'We understand that navigating dramatic island terrain requires a pristine, well-maintained fleet and native drivers who know island roads, crowd-free optimal timing, and the most photogenic vantage points.',
    'about.badge': '100% Native Local Guides',
    'about.badgeSub': 'Warm, experienced & officially certified',
    'about.item1.title': 'Private AC Fleet',
    'about.item1.desc': 'Pristine private cars customized for island topography',
    'about.item2.title': 'Optimized Route Flow',
    'about.item2.desc': 'Avoid traffic & crowd peaks across West and East spots',
    'about.item3.title': 'Exclusive Private Tours',
    'about.item3.desc': 'Never mixed with strangers, travel at your own pace',
    'about.item4.title': 'Warm Local Expertise',
    'about.item4.desc': 'Attentive, patient guides ready to capture your best memories',
    'about.btnProfile': 'Full Profile',
    'about.btnAsk': 'Chat With Team',

    // ── TIMELINE / HOW IT WORKS ──
    'timeline.sectionEyebrow': 'HOW TO BOOK',
    'timeline.sectionTitle': '4 Simple Steps to Your Nusa Penida Vacation',
    'timeline.sectionSubtitle': 'Plan your dream island getaway in just minutes with a smooth, hassle-free booking experience.',
    'timeline.step1.title': 'Choose Tour Package',
    'timeline.step1.desc': 'Select your preferred route: West Trip with the world-famous T-Rex cliff or East Trip with breathtaking Diamond Beach.',
    'timeline.step2.title': 'Select Date & Guests',
    'timeline.step2.desc': 'Choose your departure date and total number of travelers in our convenient booking form.',
    'timeline.step3.title': 'WhatsApp Confirmation',
    'timeline.step3.desc': 'Our team instantly arranges roundtrip fast boat tickets, reserves your private car, and sends an official confirmation voucher.',
    'timeline.step4.title': 'Enjoy Your Holiday',
    'timeline.step4.desc': 'Our friendly local driver welcomes you upon arrival at Nusa Penida harbor, ready to guide your unforgettable island journey!',

    // ── FAQ SECTION ──
    'faq.sectionEyebrow': 'FREQUENTLY ASKED QUESTIONS',
    'faq.sectionTitle': 'Everything You Need to Know',
    'faq.sectionSubtitle': 'All details regarding boat transfers, island transport, tour itineraries, and travel preparation.',

    // ── BOOKING CTA ──
    'cta.pill': 'START YOUR ISLAND ADVENTURE',
    'cta.heading': 'Ready to Explore Nusa Penida?',
    'cta.desc': 'Secure your trip date today for the best private vehicle and punctual harbor pick-up. Plan your dream vacation with our local experts.',
    'cta.btnBook': 'Book Your Adventure',
    'cta.btnWa': 'Chat via WhatsApp',
    'cta.trust': 'No Hidden Fees · Licensed Local Driver · Round-trip Fast Boat Tickets',

    // ── FOOTER ──
    'footer.tagline': 'Official transport & travel agent in Nusa Penida, Bali. Accompanying every step of your tropical adventure with safety, comfort, and memorable hospitality.',
    'footer.quickLinks': 'Navigation',
    'footer.tourPackages': 'Top Packages',
    'footer.contactUs': 'Contact & Help',
    'footer.contactPrompt': 'Ready to plan your holiday? Contact our local team directly via WhatsApp or Email:',
    'footer.rights': 'All rights reserved. Clean Tropical Premium Travel.',

    // ── BOOKING PAGE ──
    'booking.heroBadge': 'QUICK & SECURE RESERVATION',
    'booking.heroTitle': 'Book Your Nusa Penida Tour',
    'booking.heroDesc': 'Instant booking for private AC car tours and roundtrip Sanur fast boat tickets with immediate WhatsApp confirmation.',
    'booking.step1': 'SELECT TOUR PACKAGE',
    'booking.step2': 'SELECT DATE & GUESTS',
    'booking.step3': 'LEAD TRAVELER DETAILS',
    'booking.inputName': 'Full Name',
    'booking.namePlaceholder': 'e.g. John Smith',
    'booking.inputPhone': 'WhatsApp Number',
    'booking.phonePlaceholder': '81234567890',
    'booking.inputDate': 'Tour Date',
    'booking.inputNotes': 'Special Requests (Optional)',
    'booking.notesPlaceholder': 'e.g. Special pick-up request, vegetarian food, etc.',
    'booking.paxLabel': 'Number of Guests / Travelers',
    'booking.paxPerson': 'Guests',
    'booking.paxMinNote': 'Minimum {min} guests for this package',
    'booking.quickPax': 'Quick Select:',
    'booking.receiptTitle': 'Booking Summary',
    'booking.receiptItinerary': 'Selected Route',
    'booking.receiptDuration': 'Tour Duration',
    'booking.receiptDate': 'Departure Date',
    'booking.receiptGuests': 'Guests',
    'booking.receiptPricePerPax': 'Price per Pax',
    'booking.receiptTotal': 'Estimated Total Price',
    'booking.receiptIncluded': 'Includes roundtrip fast boat, private AC car, fuel, driver, and destination tickets.',
    'booking.btnSendWa': 'Confirm Booking via WhatsApp',
    'booking.btnPreviewVoucher': 'Preview Boarding Voucher',
    'booking.trustNote': 'Secure payment & schedule confirmation directly from official operator.',

    // ── VOUCHER MODAL ──
    'voucher.title': 'Reservation Ticket Preview',
    'voucher.official': 'OFFICIAL BOARDING VOUCHER',
    'voucher.status': 'Awaiting WhatsApp Confirmation',
    'voucher.pkgLabel': 'TOUR PACKAGE',
    'voucher.dateLabel': 'TRIP DATE',
    'voucher.paxLabel': 'TOTAL GUESTS',
    'voucher.nameLabel': 'LEAD TRAVELER',
    'voucher.totalLabel': 'TOTAL PRICE',
    'voucher.btnSend': 'Proceed to WhatsApp',
    'voucher.btnClose': 'Close',

    // ── ABOUT PAGE ──
    'about.heroTitle': 'About Penida Breeze Tours',
    'about.heroSubtitle': 'Get to know our licensed native drivers and guides behind your seamless Nusa Penida vacation.',
    'about.ourStory': 'Our Story',
    'about.storyP1': 'Penida Breeze Tours was founded from our deep love for Nusa Penida — an island that is our birthplace and home. As island locals, we recognized this magnificent island as a world-class travel wonder, yet noticed that international visitors frequently faced unreliable transport and chaotic routing.',
    'about.storyP2': 'That is why we established Penida Breeze Tours. Equipped with a pristine, air-conditioned private vehicle fleet and intimate knowledge of every winding road and secret vantage point, we are committed to delivering safe, comfortable, and unforgettable adventures for every traveler.',
    'about.valuesEyebrow': 'OUR CORE VALUES',
    'about.valuesTitle': 'Our Service Principles',
    'about.valuesSubtitle': 'Our steadfast commitment to your safety, convenience, and complete travel happiness across Nusa Penida.',
    'about.val1Title': 'Safety as Top Priority',
    'about.val1Desc': 'Meticulously inspected daily vehicle fleet, experienced island drivers, and vigilant monitoring of weather and sea conditions.',
    'about.val2Title': 'Authentic Island Warmth',
    'about.val2Desc': 'Genuine Balinese hospitality. Our friendly drivers double as personal photographers to capture your greatest vacation moments.',
    'about.val3Title': 'Honest & Clear Pricing',
    'about.val3Desc': 'Zero hidden surprises. Upfront, transparent rates matching your selected service and inclusions.',
    'about.val4Title': 'True Local Knowledge',
    'about.val4Desc': 'Born on the island, we navigate timing to bypass crowds, reveal secret photography spots, and introduce the finest local culinary stops.',
    'about.statDest': 'Iconic Destinations',
    'about.statPkg': 'Curated Tour Packages',
    'about.statGuide': '100% Native Island Guides',

    // ── CONTACT PAGE ──
    'contact.heroTitle': 'Contact & Support',
    'contact.heroSubtitle': 'Reach out to our team for questions, custom island itineraries, or instant tour reservations.',
    'contact.title': 'Get in Touch',
    'contact.intro': 'Our dedicated team is on hand to help plan your ultimate Nusa Penida adventure. Feel free to reach out anytime.',
    'contact.cardFormTitle': 'Send Instant Inquiry',
    'contact.cardFormSubtitle': 'Complete the short form below for itinerary advice and instant WhatsApp booking confirmation.',
    'contact.formName': 'Full Name',
    'contact.formPhone': 'WhatsApp Number',
    'contact.formPackage': 'Selected Tour Package',
    'contact.formDate': 'Planned Tour Date',
    'contact.formMessage': 'Message or Special Requests',
    'contact.formMessagePlaceholder': 'Example: Inquiring about sunrise at Molenteng Treehouse and harbor pick-up...',
    'contact.formBtnSubmit': 'Send Inquiry via WhatsApp',
    'contact.badgeOnline': 'Drivers & Support Online',
    'contact.responseBadge': 'Fast Response < 5 Mins',
    'contact.officeDesk': 'Harbor Greeting Desk',
    'contact.officeDesc': 'Banjar Nyuh & Toyapakeh Harbors, Nusa Penida',
    'contact.officeDetail': 'Our local driver will greet you at the boat arrival dock holding a personalized name sign.',
    'contact.faqShortcutTitle': 'Quick Tour Inquiries',
    'contact.waTitle': 'WhatsApp Hotline',
    'contact.waDesc': 'Instant response & direct booking',
    'contact.emailTitle': 'Email Support',
    'contact.emailDesc': 'For detailed inquiries & partnerships',
    'contact.locationTitle': 'Service Coverage',
    'contact.locationDesc': 'Private AC car charters across all of Nusa Penida',
    'contact.hoursTitle': 'Service Hours',
    'contact.hoursVal': 'Daily, 06:00 AM – 09:00 PM (WITA / GMT+8)',
    'contact.hoursNote': 'WhatsApp support online 24/7',
    'contact.ctaTitle': 'Direct WhatsApp Chat',
    'contact.ctaDesc': 'The quickest way to book or ask questions about our island tour packages.',
    'contact.ctaBtn': 'Open WhatsApp',

    // ── FAQ PAGE ──
    'faq.heroTitle': 'Frequently Asked Questions',
    'faq.heroSubtitle': 'Answers to the most common questions regarding boat transfers, island transport, and tour preparation.',
    'faq.btnAll': 'View All FAQs',

    // ── NOT FOUND PAGE ──
    'notFound.title': 'Page Not Found',
    'notFound.desc': 'It seems you drifted off course in the waters of Nusa Penida. The page you are looking for does not exist or has moved.',
    'notFound.btnHome': 'Back to Home',

    // ── GALLERY PAGE ──
    'gallery.heroTitle': 'Destination Photo Gallery',
    'gallery.heroSubtitle': 'High-definition visual showcase capturing the most iconic cliffs, beaches, and coastal wonders of Nusa Penida.',
    'gallery.filterAll': 'All Photos',
    'gallery.filterWest': 'West Trip',
    'gallery.filterEast': 'East Trip',
    'gallery.badge': 'Authentic Island Captures',
    'gallery.viewHd': 'View HD',
    'gallery.close': 'Close',
    'gallery.exploreDest': 'Explore Destination',
    'gallery.bookThis': 'Book This Tour',
    'gallery.photoCount': 'photos',
    'gallery.ctaTitle': 'Ready to Capture Moments Like These?',
    'gallery.ctaSubtitle': 'Our local driver-guides know the finest angles and lighting to photograph your memories.',
    'gallery.ctaBtn': 'Book Your Tour Package Now',

    // ── MOBILE BAR ──
    'mobileBar.startFrom': 'From',
    'mobileBar.book': 'Book Now',
  },
};

// Packages translated data matching EXACT IDs from src/data/packages.js
const packagesTranslations = {
  barat_std: {
    en: {
      title: 'Trip Barat / West (All-Inclusive)',
      subtitle: 'Complete all-inclusive package exploring legendary icons of West Nusa Penida',
      badge: 'All-Inclusive',
      minPax: 'Max. 5 Persons',
      duration: '10–12 Hours',
      unit: '/ Pax',
      destinations: ['Broken Beach', 'Angel Bilabong', 'Kelingking Beach', 'Crystal Beach'],
      facilities: ['Private AC Car', 'Local Lunch', 'Fast Boat Return', 'All Admissions'],
      highlights: [
        'World-famous T-Rex shaped cliff at Kelingking Beach',
        'Natural limestone archway and circular lagoon at Broken Beach',
        'Natural oceanfront emerald tidal infinity pool at Angel Bilabong',
        'Exotic sunset views and sparkling crystal waters at Crystal Beach',
      ],
      included: [
        'Car (Private AC Vehicle + Driver + Fuel)',
        'Lunch (Authentic Meal at Local Restaurant)',
        'Boat (Sanur - Penida Roundtrip Fast Boat Tickets)',
        'All Destination Admission & Retribution Tickets',
        'Experienced Native Local Driver & Photographer',
        'Complimentary Mineral Water During the Trip',
      ],
      excluded: [
        'Personal expenses and souvenirs',
        'Optional snorkeling rental gear on-site',
        'Driver gratuities / tipping (voluntary)',
      ],
      itinerary: [
        { time: '06:45 AM', activity: 'Meeting point at Sanur Harbor, Bali & fast boat boarding pass collection' },
        { time: '07:30 AM', activity: 'Fast boat departure towards Nusa Penida (~40 minutes crossing)' },
        { time: '08:15 AM', activity: 'Arrival at Nusa Penida harbor, warmly welcomed by our private driver' },
        { time: '09:00 AM', activity: 'Explore iconic Broken Beach (Pasih Uug) & Angel Bilabong natural lagoon' },
        { time: '11:30 AM', activity: 'Relaxing lunch at a selected island restaurant (included)' },
        { time: '12:45 PM', activity: 'Head to Kelingking Beach — photo session with panoramic T-Rex cliff' },
        { time: '02:45 PM', activity: 'Chill at Crystal Beach — swim in crystal waters or enjoy fresh coconut' },
        { time: '04:15 PM', activity: 'Transfer back to the harbor for return fast boat check-in' },
        { time: '05:00 PM', activity: 'Fast boat departure back to Sanur, Bali. Trip completed with unforgettable memories!' },
      ],
      importantInfo: [
        'Rate IDR 400,000 is calculated per person (1 person pays 400k, 2 pay 800k, etc.).',
        'Maximum capacity 5 guests per car / booking (strictly max 5 pax).',
        'Complete All-Inclusive package includes: Car, Lunch, Roundtrip Fast Boat, and Retribution Tickets.',
        'Comfortable casual wear, walking shoes, sun hat, and sunscreen are recommended.',
      ],
    },
    id: {
      title: 'Trip Barat / West (All-Inclusive)',
      subtitle: 'Paket lengkap All-Inclusive mengunjungi ikon legendaris Nusa Penida Barat',
      badge: 'All-Inclusive',
      minPax: 'Maks. 5 Orang',
      duration: '10–12 Jam',
      unit: '/ Pax',
      destinations: ['Broken Beach', 'Angel Bilabong', 'Kelingking Beach', 'Crystal Beach'],
      facilities: ['Mobil Ber-AC', 'Makan Siang', 'Fast Boat PP', 'Tiket Destinasi'],
    }
  },
  timur: {
    en: {
      title: 'Trip Timur / East Destinasi',
      subtitle: 'Private charter transport exploring pristine cliffs and beaches of East Nusa Penida',
      badge: 'Transport Only',
      minPax: 'Max. 5 People',
      duration: '10–12 Hours',
      unit: '/ Car',
      destinations: ['Diamond Beach', 'Atuh Beach', 'TREEHOUSE / Rumah Pohon'],
      facilities: ['Private AC Car + Fuel', 'Local Driver / Guide', 'Max. 5 Guests'],
      highlights: [
        'Grand cliffside limestone staircase at Diamond Beach',
        'Pristine white sand cove sheltered by rock islets at Atuh Beach',
        'Iconic panoramic viewpoint at Tree House (Rumah Pohon) Molenteng',
        'Private AC vehicle exclusively for your party (max. 5 guests)',
      ],
      included: [
        'Car (Private AC Vehicle + Driver + Fuel)',
        'Experienced Native Driver & Personal Photographer',
        'Complimentary Mineral Water During the Journey',
        'All Parking Fees at Visiting Destinations',
      ],
      excluded: [
        'Boat (Sanur - Nusa Penida Roundtrip Fast Boat Tickets)',
        'Lunch (Meals during tour)',
        'Retribution & Destination Admission Tickets',
        'Optional photo spot fee at Tree House & personal expenses',
      ],
      itinerary: [
        { time: '08:15 AM', activity: 'Pick-up upon arrival at Nusa Penida harbor by your private driver' },
        { time: '09:30 AM', activity: 'Explore Diamond Beach — admire the limestone staircase and crystal sands' },
        { time: '11:30 AM', activity: 'Visit Atuh Beach — relax in a sheltered natural white sand cove' },
        { time: '01:00 PM', activity: 'Lunch break (driver escorts you to a recommended local restaurant, at own cost)' },
        { time: '02:15 PM', activity: 'Visit Tree House (Rumah Pohon Molenteng) & Raja Lima thousand islands view' },
        { time: '04:00 PM', activity: 'Scenic return drive towards the main harbor of Nusa Penida' },
        { time: '04:45 PM', activity: 'Arrive at the harbor in time for your return boat crossing to Bali' },
      ],
      importantInfo: [
        'Rate IDR 700,000 is a flat rate per car (booking for 1 person up to 5 people pays the normal rate of IDR 700,000).',
        'Maximum party size is strictly 5 guests (no extra passengers accommodated).',
        'Transport Only package: covers private AC vehicle + driver + fuel.',
        'Excludes: fast boat tickets, lunch, and destination admission tickets.',
      ],
    },
    id: {
      title: 'Trip Timur / East Destinasi',
      subtitle: 'Sewa transport privat menjelajahi pesona pantai eksotis Nusa Penida Timur',
      badge: 'Transport Only',
      minPax: 'Maks. 5 Orang',
      duration: '10–12 Jam',
      unit: '/ Mobil',
      destinations: ['Diamond Beach', 'Atuh Beach', 'TREEHOUSE / Rumah Pohon'],
      facilities: ['Mobil Privat AC + BBM', 'Driver Lokal Berpengalaman', 'Maks. 5 Orang'],
      importantInfo: [
        'Harga normal tetap Rp 700.000 flat per mobil (booking 1 orang maupun hingga 5 orang tetap dihitung harga normal Rp 700.000).',
        'Kapasitas rombongan maksimal 5 orang (tidak ada penambahan pax lebih).',
        'Paket Transport Only: harga mencakup Car (Mobil privat ber-AC) + Driver + BBM.',
        'Tanpa include: tiket fast boat, makan siang, dan tiket retribusi destinasi.',
      ],
    }
  },
  barat_premium: {
    en: {
      title: 'Trip Barat / West Destinasi',
      subtitle: 'Private charter transport exploring iconic western highlights at your own pace',
      badge: 'Transport Only',
      minPax: 'Max. 5 People',
      duration: '10–12 Hours',
      unit: '/ Car',
      destinations: ['Broken Beach', 'Angel Bilabong', 'Kelingking Beach', 'Crystal Beach'],
      facilities: ['Private AC Car + Fuel', 'Local Driver / Guide', 'Max. 5 Guests'],
      highlights: [
        'Spectacular Indian Ocean panorama from the T-Rex cliff of Kelingking Beach',
        'Circular natural limestone sea bridge at Broken Beach',
        'Crystal-clear natural emerald lagoon at Angel Bilabong',
        'Relaxing tropical beach vibes and sunset at Crystal Beach',
        'Private AC vehicle exclusively for your party (max. 5 guests)',
      ],
      included: [
        'Car (Private AC Vehicle + Driver + Fuel)',
        'Experienced Native Driver & Personal Photographer',
        'Complimentary Mineral Water During the Journey',
        'All Parking Fees at Visiting Destinations',
      ],
      excluded: [
        'Boat (Sanur - Nusa Penida Roundtrip Fast Boat Tickets)',
        'Lunch (Meals during tour)',
        'Retribution & Destination Admission Tickets',
        'Snorkeling activities & personal shopping expenses',
      ],
      itinerary: [
        { time: '08:15 AM', activity: 'Harbor pick-up in Nusa Penida by your dedicated private driver' },
        { time: '09:00 AM', activity: 'Explore Broken Beach & Angel Bilabong natural formations' },
        { time: '11:45 AM', activity: 'Lunch break at a scenic restaurant of your choice (at own cost)' },
        { time: '01:00 PM', activity: 'Iconic photo session at Kelingking Beach T-Rex viewpoint' },
        { time: '03:00 PM', activity: 'Chill and relax by the turquoise waves of Crystal Beach' },
        { time: '04:15 PM', activity: 'Scenic drive back to the harbor' },
        { time: '05:00 PM', activity: 'Arrive at Nusa Penida harbor for fast boat boarding' },
      ],
      importantInfo: [
        'Rate IDR 650,000 is a flat rate per car (booking for 1 person up to 5 people pays the normal rate of IDR 650,000).',
        'Maximum party size is strictly 5 guests (no extra passengers accommodated).',
        'Transport Only package: covers private AC vehicle + driver + fuel.',
        'Excludes: fast boat tickets, lunch, and destination admission tickets.',
      ],
    },
    id: {
      title: 'Trip Barat / West Destinasi',
      subtitle: 'Sewa transport privat menjelajahi seluruh destinasi favorit Nusa Penida Barat',
      badge: 'Transport Only',
      minPax: 'Maks. 5 Orang',
      duration: '10–12 Jam',
      unit: '/ Mobil',
      destinations: ['Broken Beach', 'Angel Bilabong', 'Kelingking Beach', 'Crystal Beach'],
      facilities: ['Mobil Privat AC + BBM', 'Driver Lokal Berpengalaman', 'Maks. 5 Orang'],
      importantInfo: [
        'Harga normal tetap Rp 650.000 flat per mobil (booking 1 orang maupun hingga 5 orang tetap dihitung harga normal Rp 650.000).',
        'Kapasitas rombongan maksimal 5 orang (tidak ada penambahan pax lebih).',
        'Paket Transport Only: harga mencakup Car (Mobil privat ber-AC) + Driver + BBM.',
        'Tanpa include: tiket fast boat, makan siang, dan tiket retribusi destinasi.',
      ],
    },
  },
  mix_trip: {
    en: {
      title: 'Trip Kombinasi / Mix Destinasi',
      subtitle: 'Private transport charter exploring the best combined highlights of East & West Nusa Penida',
      badge: 'Transport Only',
      minPax: 'Max. 5 People',
      duration: '10–12 Hours',
      unit: '/ Car',
      destinations: ['Diamond Beach', 'Atuh Beach', 'Treehouse (photo spot ticket not included)', 'Kelingking Beach'],
      facilities: ['Private AC Car + Fuel', 'Parking Included', 'Local Driver / Guide', 'Max. 5 Guests'],
      highlights: [
        'Best of both worlds: explore top highlights of East and West Nusa Penida in a single day',
        'Spectacular limestone staircase and azure ocean views at Diamond Beach',
        'Peaceful white sand cove sheltered by dramatic coastal cliffs at Atuh Beach',
        'Iconic panoramic viewpoint at Tree House (Rumah Pohon) Molenteng overlooking Raja Lima',
        'World-famous T-Rex shaped cliff and dramatic headland at Kelingking Beach',
        'Private air-conditioned vehicle exclusively for your group (max. 5 guests)',
      ],
      included: [
        'Car (Private AC Vehicle + Driver + Fuel)',
        'Fuel (BBM) Included Throughout the Tour',
        'All Parking Fees at Visiting Destinations',
        'Experienced Native Driver & Personal Photographer',
        'Complimentary Mineral Water During the Journey',
      ],
      excluded: [
        'Treehouse: Photo spot ticket not included (optional on-site fee)',
        'Boat (Sanur - Nusa Penida Roundtrip Fast Boat Tickets)',
        'Lunch (Meals during tour)',
        'Retribution & Destination Admission Tickets',
        'Personal expenses and souvenirs',
      ],
      itinerary: [
        { time: '08:00 AM', activity: 'Harbor pick-up upon arrival in Nusa Penida by your private driver' },
        { time: '09:15 AM', activity: 'Explore East Nusa Penida: Diamond Beach & Atuh Beach coastal vistas' },
        { time: '11:30 AM', activity: 'Visit Tree House (Rumah Pohon Molenteng) & Thousand Islands view (photo ticket on-site)' },
        { time: '12:45 PM', activity: 'Lunch break (driver escorts you to a recommended local restaurant, at own cost)' },
        { time: '02:15 PM', activity: 'Drive across to West Nusa Penida: Kelingking Beach T-Rex cliff viewpoint' },
        { time: '04:15 PM', activity: 'Scenic return drive towards the main harbor of Nusa Penida' },
        { time: '05:00 PM', activity: 'Arrive at the harbor for your return boat crossing to Bali' },
      ],
      importantInfo: [
        'Rate IDR 1,000,000 is a flat rate per car (booking for 1 person up to 5 people pays IDR 1,000,000 normal rate).',
        'Maximum party size is strictly 5 guests per car (no extra passengers accommodated).',
        'Package includes: private AC car, driver, fuel (BBM), and all parking fees.',
        'Please note: Tree House (Rumah Pohon) photography ticket is NOT included (paid directly on-site if you wish to climb the photo steps).',
        'Excludes: roundtrip fast boat tickets, lunch, and destination retribution tickets.',
      ],
    },
    id: {
      title: 'Trip Kombinasi / Mix Destinasi',
      subtitle: 'Sewa transport privat mengunjungi kombinasi ikon terbaik Nusa Penida Timur & Barat',
      badge: 'Transport Only',
      minPax: 'Maks. 5 Orang',
      duration: '10–12 Jam',
      unit: '/ Mobil',
      destinations: ['Diamond Beach', 'Atuh Beach', 'Treehouse (tidak include tiket untuk ber foto)', 'Kelingking Beach'],
      facilities: ['Mobil Privat AC + BBM', 'Termasuk Parkir', 'Driver Lokal & Foto', 'Maks. 5 Orang'],
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
    },
  },
};

// Destination Card translations
const destinationTranslations = {
  'kelingking-beach': {
    en: {
      tagline: 'Iconic T-Rex Cliff',
      description: 'The most iconic destination in Nusa Penida featuring a world-famous T-Rex shaped cliff towering over crystal turquoise waters.',
      fullDescription: 'Kelingking Beach is a must-visit wonder in West Nusa Penida. Famous for its dramatic cliff resembling the head of a Tyrannosaurus Rex, it offers jaw-dropping views of turquoise ocean waters and an untouched white-sand cove below. From the panoramic cliff vantage point above, travelers enjoy one of the most celebrated coastal formations in the world.',
      attraction: 'Iconic T-Rex shaped cliff, panoramic turquoise ocean vista, world-renowned viewpoint',
      facilities: 'Parking area, local food stalls, restrooms, fenced panoramic photography platforms',
      activities: 'Landscape photography, sightseeing, refreshing coastal breeze, sunset viewing',
      bestTime: 'April – October (morning 08:00–10:00 AM or late afternoon for golden hour)',
      safetyNote: 'Cliff edges are equipped with safety fencing; always remain behind boundaries and heed guide advice.'
    },
    id: {
      tagline: 'Panorama Megah Tebing T-Rex',
      description: 'Destinasi paling ikonik di Nusa Penida dengan tebing berbentuk T-Rex yang spektakuler dan panorama samudra biru toska.'
    }
  },
  'broken-beach': {
    en: {
      tagline: 'Natural Archway & Ocean Basin',
      description: 'Unique circular cliff formation with a natural limestone bridge where ocean waves surge into an enclosed turquoise cove.',
      fullDescription: 'Broken Beach (locally known as Pasih Uug) is a geological marvel featuring a circular limestone cliff basin with a massive natural stone tunnel. Azure ocean waves surge into the tranquil central lagoon, creating an amphitheater of natural beauty. From the natural bridge above, visitors can frequently spot manta rays and sea turtles gliding in the transparent waters below.',
      attraction: 'Natural stone bridge arch, circular ocean lagoon, manta ray observation spot',
      facilities: 'Spacious parking, fresh coconut stalls, restrooms, paved walking path',
      activities: 'Photography, cliff perimeter walk, marine wildlife spotting from the clifftop',
      bestTime: 'Morning when sunlight illuminates the entire turquoise cove',
      safetyNote: 'Wear comfortable footwear and exercise care when walking along natural limestone trails.'
    },
    id: {
      tagline: 'Keajaiban Jembatan Karang Alami',
      description: 'Formasi tebing melingkar unik dengan terowongan batu karang alami tempat ombak samudra mengalir masuk.'
    }
  },
  'angels-billabong': {
    en: {
      tagline: 'Natural Emerald Infinity Pool',
      description: 'Stunning natural tidal pool carved into coastal limestone with crystalline emerald waters overlooking the wild open sea.',
      fullDescription: 'Angel Bilabong is a prehistoric tidal river mouth meeting the edge of the limestone cliffs before opening into the open ocean. Textured rock ridges form a serene natural infinity pool with intricate floor patterns visible through emerald-clear water. The striking contrast between emerald algae and deep blue ocean makes it a photographer’s paradise.',
      attraction: 'Natural tidal infinity pool, crystal emerald water, surging coastal surf panorama',
      facilities: 'Adjacent to Broken Beach amenities (food stalls, restrooms, parking)',
      activities: 'Panoramic photography, appreciating cliff geology, ocean breeze relaxation',
      bestTime: 'Low tide during morning to mid-day for the clearest pool clarity',
      safetyNote: 'Strictly no jumping or descending into the tidal pool during high waves. Prioritize safety from designated viewing areas.'
    },
    id: {
      tagline: 'Kolam Alami Air Sebening Zamrud',
      description: 'Kolam renang alami di tepi tebing kapur dengan air jernih hijau zamrud menghadap langsung samudra luas.'
    }
  },
  'crystal-bay': {
    en: {
      tagline: 'Pristine Waters & Golden Sunset',
      description: 'Tranquil palm-fringed bay renowned for sparkling waters, snorkeling reefs, and the most spectacular sunset on the island.',
      fullDescription: 'Crystal Beach (Crystal Bay) is a tranquil white sand cove flanked by lush green hills on the west coast of Nusa Penida. Unlike the elevated clifftops, here you can directly dip your toes into clear, calm crystal waters. It is the perfect place to unwind after a day of island exploring, sip fresh young coconut water, and watch the sun dip below the horizon.',
      attraction: 'Soft white sand, tropical palm groves, vibrant coral reefs, golden hour sunset',
      facilities: 'Beachside cafes, sun loungers, restrooms & rinse showers, snorkel gear rentals',
      activities: 'Leisure swimming, snorkeling, sunset viewing, relaxing coastal photography',
      bestTime: 'Late afternoon 03:00 PM – 06:30 PM for the golden hour sunset experience',
      safetyNote: 'Swim only in designated calm zones and observe wave boundary advice provided by your guide.'
    },
    id: {
      tagline: 'Air Sebening Kristal & Sunset Emas',
      description: 'Pantai berpasir putih dengan air laut sebening kristal, terumbu karang indah untuk snorkeling, dan pemandangan sunset terbaik.'
    }
  },
  'diamond-beach': {
    en: {
      tagline: 'Pristine White Sands & Cliff Staircase',
      description: 'Jaw-dropping white sand paradise reached via a cliff-carved staircase with dramatic diamond-shaped karst formations.',
      fullDescription: 'Diamond Beach is the crowned jewel of East Nusa Penida, recognized globally for its breathtaking beauty. Named for the diamond-shaped limestone karst islets standing proudly off its pure white shore, it features an iconic staircase hand-carved into the cliff face, framing a dazzling gradient of turquoise and deep sapphire waters.',
      attraction: 'Iconic cliff-carved staircase, diamond karst formations, vivid turquoise surf',
      facilities: 'Rope-railed cliff staircase, parking lot, drink warungs, cliffside photo swing',
      activities: 'Cliff exploration, landscape photography, sunbathing, scenic cliffside swings',
      bestTime: 'Morning 07:30–11:00 AM when the sun illuminates the white cliff face directly',
      safetyNote: 'Wear sturdy shoes or hiking sandals with good grip when descending the cliff steps.'
    },
    id: {
      tagline: 'Surga Pasir Putih & Tangga Tebing',
      description: 'Pantai tersembunyi berpasir putih halus dengan tebing kapur menjulang dan formasi batu karang berbentuk berlian.'
    }
  },
  'atuh-beach': {
    en: {
      tagline: 'Sheltered Cove & Exotic Rock Islets',
      description: 'A secluded turquoise bay framed by majestic natural archways and dramatic offshore rock pinnacles.',
      fullDescription: 'Atuh Beach is a secluded paradise nestled in a quiet bay on the eastern tip of Nusa Penida. Framed by emerald green cliffs and striking natural sea arches, its calm turquoise waters and fine white sand offer a peaceful sanctuary away from the hustle of mainland Bali.',
      attraction: 'Natural rock arch islets, peaceful white sand bay, scenic coastal amphitheater',
      facilities: 'Beach loungers, food stalls with fresh seafood, parking area, restrooms',
      activities: 'Relaxing, beach photography, sunbathing, refreshing coastal walk',
      bestTime: 'Morning to mid-day when the bay is illuminated and the sea is calm',
      safetyNote: 'Take your time ascending and descending the stair paths; stay hydrated.'
    },
    id: {
      tagline: 'Teluk Damai Diapit Karang Alami',
      description: 'Pantai pasir putih eksotis di teluk terpencil yang diapit oleh tebing hijau dan pulau karang alami.'
    }
  },
  'treehouse-rumah-pohon': {
    en: {
      tagline: 'Thousand Islands Viewpoint',
      description: 'Iconic rustic treehouse perched high on a scenic ridge overlooking the breathtaking Raja Lima islet seascape.',
      fullDescription: 'The Molenteng Tree House (Rumah Pohon) is an iconic wooden cabin built on the boughs of an ancient tree on a scenic mountain ridge. It offers an unrivaled panoramic view of the Raja Lima thousand island karst formations rising out of the turquoise sea, making it one of the most photographed viewpoints in Southeast Asia.',
      attraction: 'Rustic wooden treehouse, panoramic Raja Lima thousand islands view, sunrise vista',
      facilities: 'Viewing platforms, safety railings, local drink stalls, parking area',
      activities: 'Scenic photography, breathtaking sunrise viewing, landscape appreciation',
      bestTime: 'Early morning 06:00–08:30 AM for magical sunrise lighting',
      safetyNote: 'Stairs can be steep; hold onto safety ropes and watch your step.'
    },
    id: {
      tagline: 'Spot Foto Panorama Raja Lima',
      description: 'Rumah pohon kayu di tepi tebing dengan pemandangan spektakuler gugusan pulau karang Raja Lima.'
    }
  }
};

// FAQ Translations
const faqTranslations = {
  1: {
    id: {
      q: 'Bagaimana cara booking paket tour?',
      a: 'Anda bisa booking melalui halaman Booking di website kami atau langsung menghubungi kami via WhatsApp. Isi formulir dengan data lengkap (nama, tanggal tour, paket pilihan, jumlah peserta), lalu kami akan mengkonfirmasi ketersediaan jadwal.'
    },
    en: {
      q: 'How do I book a tour package?',
      a: 'You can book through our online Booking page or directly contact us via WhatsApp. Fill in your details (name, tour date, selected package, number of guests), and our team will immediately confirm schedule availability.'
    }
  },
  2: {
    id: {
      q: 'Apa saja yang termasuk dalam paket tour?',
      a: '1) Paket All-Inclusive West Trip (Rp 400.000/pax) sudah termasuk Car (Mobil ber-AC + BBM), Lunch (Makan Siang), Boat (Fast Boat PP Sanur), dan Tiket Retribusi destinasi. 2) Paket Transport Wisata (Rp 650.000 Trip Barat & Rp 700.000 Trip Timur, maks. 5 pax) sudah termasuk Car (Mobil privat ber-AC) + Driver + BBM, tanpa tiket boat, makan, dan tiket retribusi.'
    },
    en: {
      q: 'What is included in the tour packages?',
      a: '1) West All-Inclusive Package (IDR 400K/pax) includes private AC car + fuel, lunch, roundtrip Sanur fast boat, and retribution tickets. 2) Transport Only Packages (IDR 650K West Trip & IDR 700K East Trip, max 5 pax) include private AC car + driver + fuel, without boat tickets, lunch, or admission fees.'
    }
  },
  3: {
    id: {
      q: 'Bagaimana sistem perhitungan harga paketnya?',
      a: '1) Paket All-Inclusive Trip Barat (Rp 400.000/pax): Dihitung per orang (1 orang 400k, 2 orang 800k, dst). 2) Paket Transport Trip Barat (Rp 650.000/mobil, maks. 5 orang): Tarif normal tetap Rp 650.000 flat per mobil, booking 1 orang maupun hingga 5 orang dihitung harga normal Rp 650.000. 3) Paket Transport Trip Timur (Rp 700.000/mobil, maks. 5 orang): Tarif normal tetap Rp 700.000 flat per mobil, booking 1 orang maupun hingga 5 orang dihitung harga normal Rp 700.000.'
    },
    en: {
      q: 'How does the pricing calculation work?',
      a: '1) West All-Inclusive Package (IDR 400K/pax): Calculated per person (1 guest pays 400K, 2 pay 800K, etc.). 2) West Transport Only (IDR 650K/car, max 5 guests): Flat normal rate of IDR 650,000 per car; whether 1 person or up to 5 people book, the price remains IDR 650,000. 3) East Transport Only (IDR 700K/car, max 5 guests): Flat normal rate of IDR 700,000 per car; whether 1 person or up to 5 people book, the price remains IDR 700,000.'
    }
  },
  4: {
    id: {
      q: 'Kapan waktu terbaik mengunjungi Nusa Penida?',
      a: 'Waktu terbaik adalah April hingga Oktober saat cuaca cerah dan laut tenang. Namun, Nusa Penida memiliki keindahan yang menakjubkan dan dapat dikunjungi sepanjang tahun.'
    },
    en: {
      q: 'When is the best time to visit Nusa Penida?',
      a: 'The best season is between April and October during dry weather and calm ocean conditions. However, Nusa Penida is a magnificent year-round tropical destination.'
    }
  },
  5: {
    id: {
      q: 'Apa yang perlu dibawa saat tour?',
      a: 'Disarankan membawa pakaian santai, alas kaki nyaman untuk jalan, topi, kacamata hitam, sunscreen, pakaian ganti jika ingin berenang, dan kamera untuk mengabadikan momen.'
    },
    en: {
      q: 'What should I bring on the tour?',
      a: 'We recommend bringing comfortable lightweight clothing, walking shoes or sandals, a hat, sunglasses, sunscreen, a change of clothes for swimming, and a camera/smartphone.'
    }
  },
  6: {
    id: {
      q: 'Apakah aman untuk anak-anak dan lansia?',
      a: 'Sebagian besar destinasi sangat aman. Rute viewpoint atas tebing dapat dinikmati tanpa perlu menuruni tebing curam. Driver kami akan menyesuaikan ritme demi kenyamanan seluruh keluarga.'
    },
    en: {
      q: 'Is the tour safe for children and seniors?',
      a: 'Yes, most destinations are completely safe. Clifftop panoramic viewpoints are easily accessible without descending steep trails. Our driver adapts the pacing for your family’s comfort.'
    }
  },
  7: {
    id: {
      q: 'Bagaimana cara menuju Nusa Penida dari Bali?',
      a: 'Nusa Penida dicapai dengan fast boat dari Pelabuhan Sanur, Denpasar dengan waktu tempuh sekitar 40 menit. Tiket fast boat pergi-pulang sudah termasuk di dalam paket kami.'
    },
    en: {
      q: 'How do we travel to Nusa Penida from Bali?',
      a: 'Nusa Penida is reached via high-speed fast boat from Sanur Harbor in Denpasar, taking approximately 40 minutes. Round-trip boat tickets are fully included in all our tour packages.'
    }
  },
  8: {
    id: {
      q: 'Apakah bisa request rute atau destinasi custom?',
      a: 'Tentu bisa! Kami menyediakan opsi private charter dan rute custom sesuai keinginan Anda. Hubungi kami via WhatsApp untuk konsultasi rute dan penyesuaian jadwal.'
    },
    en: {
      q: 'Can we request a custom itinerary or destinations?',
      a: 'Absolutely! We offer flexible private charters and tailored itineraries. Contact our team via WhatsApp to discuss your customized schedule.'
    }
  },
  9: {
    id: {
      q: 'Bagaimana kebijakan pembatalan dan reschedule?',
      a: 'Perubahan jadwal atau pembatalan dapat dilakukan dengan menghubungi tim kami maksimal 24 jam sebelum keberangkatan dengan fleksibilitas tinggi.'
    },
    en: {
      q: 'What is the cancellation and rescheduling policy?',
      a: 'Schedule changes or cancellations can be arranged with high flexibility by contacting our team at least 24 hours prior to departure.'
    }
  },
  10: {
    id: {
      q: 'Apakah driver merangkap fotografer?',
      a: 'Ya! Driver lokal kami terlatih untuk mengambil foto dan video dengan sudut terbaik di setiap spot ikonik tanpa biaya tambahan.'
    },
    en: {
      q: 'Does the driver take photos for us?',
      a: 'Yes! Our native drivers know the best photo angles and lighting at every iconic spot and are delighted to take your photos at no extra charge.'
    }
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('penida_lang') || 'id';
  });

  useEffect(() => {
    localStorage.setItem('penida_lang', lang);
    document.documentElement.setAttribute('lang', lang);
    // Ensure dark theme is permanently reset/removed
    document.documentElement.removeAttribute('data-theme');
    localStorage.removeItem('penida_theme');
  }, [lang]);

  const toggleLang = () => {
    setLang((prev) => (prev === 'id' ? 'en' : 'id'));
  };

  const t = (key, fallback = '') => {
    return translations[lang]?.[key] || translations['id']?.[key] || fallback || key;
  };

  // Helper to get translated package fields
  const getTranslatedPackage = (pkg) => {
    if (!pkg) return pkg;
    const override = packagesTranslations[pkg.id]?.[lang] || {};
    const iconMap = {
      0: 'Car',
      1: 'Utensils',
      2: 'Ship',
      3: 'Ticket',
    };

    return {
      ...pkg,
      title: override.title || pkg.title,
      subtitle: override.subtitle || pkg.subtitle,
      badge: override.badge || pkg.badge,
      minPax: override.minPax || pkg.minPax,
      unit: override.unit || (lang === 'en' ? (pkg.unitEn || pkg.unit) : pkg.unit),
      duration: override.duration || (lang === 'en' ? '10–12 Hours' : '10–12 Jam'),
      destinations: override.destinations || pkg.destinations,
      highlights: override.highlights || pkg.highlights,
      included: override.included || pkg.included,
      excluded: override.excluded || pkg.excluded,
      itinerary: override.itinerary || pkg.itinerary,
      importantInfo: override.importantInfo || pkg.importantInfo,
      facilities: override.facilities
        ? override.facilities.map((fName, i) => ({
            name: fName,
            icon: pkg.facilities?.[i]?.icon || iconMap[i] || 'Check',
          }))
        : pkg.facilities,
    };
  };

  // Helper to get translated destination fields
  const getTranslatedDestination = (dest) => {
    if (!dest) return dest;
    const override = destinationTranslations[dest.slug]?.[lang];
    if (override) {
      return {
        ...dest,
        tagline: override.tagline || dest.tagline,
        description: override.description || dest.description,
        fullDescription: override.fullDescription || dest.fullDescription,
        attraction: override.attraction || dest.attraction,
        facilities: override.facilities || dest.facilities,
        activities: override.activities || dest.activities,
        bestTime: override.bestTime || dest.bestTime,
        safetyNote: override.safetyNote || dest.safetyNote,
        categoryLabel: dest.category === 'west' ? (lang === 'en' ? 'West Trip' : 'Trip Barat') : (lang === 'en' ? 'East Trip' : 'Trip Timur'),
      };
    }
    return {
      ...dest,
      categoryLabel: dest.category === 'west' ? (lang === 'en' ? 'West Trip' : 'Trip Barat') : (lang === 'en' ? 'East Trip' : 'Trip Timur'),
    };
  };

  // Helper to get translated FAQ
  const getTranslatedFaq = (faq) => {
    const override = faqTranslations[faq.id]?.[lang];
    if (override) {
      return {
        ...faq,
        question: override.q,
        answer: override.a,
      };
    }
    return faq;
  };

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        toggleLang,
        t,
        isId: lang === 'id',
        isEn: lang === 'en',
        getTranslatedPackage,
        getTranslatedDestination,
        getTranslatedFaq,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
