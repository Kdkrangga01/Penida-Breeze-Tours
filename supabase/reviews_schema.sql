-- ==============================================================================
-- SKRIP SUPABASE: TABEL REVIEWS (ULASAN WISATAWAN NYATA)
-- ==============================================================================
-- Jalankan skrip ini di menu SQL Editor di Supabase Dashboard Anda:
-- https://supabase.com/dashboard/project/jfdxqxveutualpunhpya/sql
-- ==============================================================================

-- 1. BUAT TABEL REVIEWS (Murni tanpa data palsu/dummy)
create table if not exists public.reviews (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    country text default 'Indonesia',
    rating integer not null check (rating >= 1 and rating <= 5),
    tour_package text default 'West Nusa Penida Tour',
    comment text not null,
    is_approved boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index agar pencarian dan pengurutan ulasan cepat
create index if not exists idx_reviews_created_at on public.reviews(created_at desc);
create index if not exists idx_reviews_approved on public.reviews(is_approved);

-- 2. AKTIFKAN ROW LEVEL SECURITY (RLS)
alter table public.reviews enable row level security;

-- Hapus policy lama jika ada sebelumnya
drop policy if exists "Publik boleh melihat ulasan yang disetujui" on public.reviews;
drop policy if exists "Publik boleh mengirimkan ulasan baru" on public.reviews;

-- Kebijakan: Siapapun pengunjung web boleh membaca ulasan yang disetujui
create policy "Publik boleh melihat ulasan yang disetujui"
    on public.reviews
    for select
    to anon, authenticated
    using (is_approved = true);

-- Kebijakan: Siapapun pengunjung web boleh mengirimkan ulasan baru
create policy "Publik boleh mengirimkan ulasan baru"
    on public.reviews
    for insert
    to anon, authenticated
    with check (true); 
