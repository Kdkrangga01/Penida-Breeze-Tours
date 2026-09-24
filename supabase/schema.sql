-- ==============================================================================
-- SKRIP DATABASE SUPABASE: TABEL BOOKINGS + OTOMATISASI WHATSAPP VIA FONNTE
-- ==============================================================================
-- Jalankan skrip ini langsung di menu SQL Editor di Supabase Dashboard Anda:
-- https://supabase.com/dashboard/project/jfdxqxveutualpunhpya/sql
-- ==============================================================================

-- 1. AKTIFKAN EKSTENSI PG_NET (Untuk HTTP Request langsung ke API Fonnte)
create extension if not exists pg_net with schema extensions;

-- 2. BUAT TABEL BOOKINGS
create table if not exists public.bookings (
    id uuid default gen_random_uuid() primary key,
    customer_name text not null,
    customer_phone text not null,
    tour_date date not null,
    package_id text not null,
    package_name text not null,
    pax_count integer not null default 1,
    estimated_total numeric not null default 0,
    notes text,
    status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Buat index agar pencarian dan sorting cepat
create index if not exists idx_bookings_created_at on public.bookings(created_at desc);
create index if not exists idx_bookings_tour_date on public.bookings(tour_date);

-- 3. KONFIGURASI ROW LEVEL SECURITY (RLS)
-- Supaya pengunjung website (publik) bisa submit form booking, tapi data pelanggan aman
alter table public.bookings enable row level security;

-- Drop policy lama jika sudah ada (agar re-run aman)
drop policy if exists "Izinkan publik memasukkan data booking" on public.bookings;
drop policy if exists "Hanya admin terautentikasi yang bisa melihat booking" on public.bookings;
drop policy if exists "Hanya admin terautentikasi yang bisa update status booking" on public.bookings;

-- Kebijakan: Pengunjung website (anon) boleh INSERT booking baru
create policy "Izinkan publik memasukkan data booking"
    on public.bookings
    for insert
    to anon, authenticated
    with check (true);

-- Kebijakan: Hanya Admin (login Supabase) yang dapat membaca dan memperbarui data
create policy "Hanya admin terautentikasi yang bisa melihat booking"
    on public.bookings
    for select
    to authenticated
    using (true);

create policy "Hanya admin terautentikasi yang bisa update status booking"
    on public.bookings
    for update
    to authenticated
    using (true);

-- 4. FUNGSI OTOMATIS PENGIRIMAN WHATSAPP VIA FONNTE API
create or replace function public.notify_fonnte_on_booking()
returns trigger
security definer
language plpgsql
as $$
declare
    fonnte_token text := 'tSSiA5ZTBf7LNouqpvWM'; -- API Token Fonnte Terbaru (Device 082329073409)
    admin_phone  text := '082329073409';         -- Nomor WhatsApp Bisnis Anda
    admin_message text;
    customer_message text;
    formatted_total text;
begin
    -- Format angka estimasi harga menjadi Rupiah (contoh: Rp 800.000)
    formatted_total := to_char(coalesce(new.estimated_total, 0), 'FM999G999G999');

    -- Format Pesan Notifikasi untuk ADMIN (English, Aesthetic, Unbolded)
    admin_message := 'NEW RESERVATION RECEIVED' || chr(10) ||
                     'Penida Breeze Tours Website' || chr(10) ||
                     '──────────────────────────' || chr(10) || chr(10) ||
                     'Hello Admin, a new tour booking has been placed via the website:' || chr(10) || chr(10) ||
                     'CUSTOMER DETAILS' || chr(10) ||
                     'Lead Traveler: ' || new.customer_name || chr(10) ||
                     'WhatsApp: ' || new.customer_phone || chr(10) ||
                     'Tour Date: ' || to_char(new.tour_date, 'DD Month YYYY') || chr(10) || chr(10) ||
                     'PACKAGE & SERVICE' || chr(10) ||
                     'Selected Package: ' || new.package_name || chr(10) ||
                     'Number of Guests: ' || new.pax_count || ' Person(s)' || chr(10) ||
                     'Total Estimated: IDR ' || formatted_total;

    -- Tambahkan catatan khusus HANYA jika diisi oleh customer
    if new.notes is not null and length(trim(new.notes)) > 0 then
        admin_message := admin_message || chr(10) || chr(10) ||
                         'SPECIAL NOTES' || chr(10) ||
                         trim(new.notes);
    end if;

    admin_message := admin_message || chr(10) || chr(10) ||
                     '──────────────────────────' || chr(10) ||
                     'Please contact the customer promptly to confirm availability and schedule. 😊🙏';

    -- Format Pesan Konfirmasi Otomatis untuk CUSTOMER (English)
    customer_message := 'NUSA PENIDA TOUR RESERVATION' || chr(10) ||
                        'Penida Breeze Tours' || chr(10) ||
                        '──────────────────────────' || chr(10) || chr(10) ||
                        'Hello ' || new.customer_name || ', thank you for choosing Penida Breeze Tours!' || chr(10) || chr(10) ||
                        'Here are your reservation details:' || chr(10) || chr(10) ||
                        'TOUR DETAILS' || chr(10) ||
                        'Package: ' || new.package_name || chr(10) ||
                        'Tour Date: ' || to_char(new.tour_date, 'DD Month YYYY') || chr(10) ||
                        'Number of Guests: ' || new.pax_count || ' Person(s)' || chr(10) ||
                        'Total Estimated: IDR ' || formatted_total;

    -- Tambahkan catatan ke customer HANYA jika ada
    if new.notes is not null and length(trim(new.notes)) > 0 then
        customer_message := customer_message || chr(10) || chr(10) ||
                            'SPECIAL NOTES' || chr(10) ||
                            trim(new.notes);
    end if;

    customer_message := customer_message || chr(10) || chr(10) ||
                        'Our team will contact you shortly via this WhatsApp number to confirm pickup details and schedule.' || chr(10) || chr(10) ||
                        'If you have any questions, feel free to reply directly to this message.' || chr(10) || chr(10) ||
                        '──────────────────────────' || chr(10) ||
                        'Thank you very much! 😊🙏';

    -- 1. KIRIM NOTIFIKASI KE ADMIN VIA FONNTE
    perform extensions.net.http_post(
        url := 'https://api.fonnte.com/send',
        headers := jsonb_build_object(
            'Authorization', fonnte_token,
            'Content-Type', 'application/json'
        ),
        body := jsonb_build_object(
            'target', admin_phone,
            'message', admin_message,
            'countryCode', '62'
        )
    );

    -- 2. KIRIM KONFIRMASI KE CUSTOMER VIA FONNTE (Jika nomor diisi valid)
    if new.customer_phone is not null and length(trim(new.customer_phone)) >= 9 then
        perform extensions.net.http_post(
            url := 'https://api.fonnte.com/send',
            headers := jsonb_build_object(
                'Authorization', fonnte_token,
                'Content-Type', 'application/json'
            ),
            body := jsonb_build_object(
                'target', trim(new.customer_phone),
                'message', customer_message,
                'countryCode', '62'
            )
        );
    end if;

    return new;
exception
    when others then
        -- Jika pengiriman HTTP gagal, data booking di database tetap tersimpan dengan aman
        raise warning 'Gagal mengirim pesan Fonnte: %', SQLERRM;
        return new;
end;
$$;

-- 5. BUAT TRIGGER UNTUK MEMANGGIL FUNGSI SAAT BOOKING BARU MASUK
drop trigger if exists trigger_notify_fonnte_on_booking on public.bookings;

create trigger trigger_notify_fonnte_on_booking
    after insert on public.bookings
    for each row
    execute function public.notify_fonnte_on_booking();

-- ==============================================================================
-- SELESAI! Skrip siap dijalankan.
-- ==============================================================================
