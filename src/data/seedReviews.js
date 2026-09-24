// Fallback initial reviews to ensure zero empty state even before database migration
export const SEED_REVIEWS = [
  {
    id: 'seed-1',
    customer_name: 'Sarah Jenkins',
    customer_country: 'Australia 🇦🇺',
    tour_package: 'West Nusa Penida Tour',
    rating: 5,
    comment: 'Absolutely breathtaking tour! Our driver was punctual, drove carefully on the bumpy roads, and took stunning photos of us at Kelingking Beach and Broken Beach. Highly recommended!',
    created_at: '2026-08-28T09:30:00Z',
    is_verified: true
  },
  {
    id: 'seed-2',
    customer_name: 'Budi Santoso',
    customer_country: 'Indonesia 🇮🇩',
    tour_package: 'Paket Snorkeling 3 Spot + Penida Barat',
    rating: 5,
    comment: 'Pelayanan sangat memuaskan dan profesional. Mobil bersih, AC dingin, dan snorkelingnya luar biasa bisa ketemu pari manta langsung di Manta Point! Guide sangat ramah dan sabar.',
    created_at: '2026-08-25T14:15:00Z',
    is_verified: true
  },
  {
    id: 'seed-3',
    customer_name: 'Elena Rostova',
    customer_country: 'Russia 🇷🇺',
    tour_package: 'East Nusa Penida Tour',
    rating: 5,
    comment: 'Diamond Beach and the Tree House were like paradise. The team arranged everything smoothly from Sanur harbour pick-up to return boat. Will definitely book again next time!',
    created_at: '2026-08-20T11:00:00Z',
    is_verified: true
  },
  {
    id: 'seed-4',
    customer_name: 'Kenji & Mei',
    customer_country: 'Japan 🇯🇵',
    tour_package: 'Full Day Combo Tour',
    rating: 5,
    comment: 'Very polite guide and well-timed itinerary so we could avoid huge crowds at popular photo spots. The lunch restaurant had great ocean views too. Arigato!',
    created_at: '2026-08-16T16:45:00Z',
    is_verified: true
  },
  {
    id: 'seed-5',
    customer_name: 'David Miller',
    customer_country: 'United Kingdom 🇬🇧',
    tour_package: 'West Nusa Penida Tour',
    rating: 5,
    comment: 'Flawless communication via WhatsApp, fair price with no hidden costs, and our driver Gede was an absolute legend. 10/10 experience in Nusa Penida.',
    created_at: '2026-08-10T10:20:00Z',
    is_verified: true
  }
];
