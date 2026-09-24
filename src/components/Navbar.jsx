import React, { useState, useEffect } from 'react';
import { Menu, X, Compass, Phone } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#home" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/images/logo.png" alt="Penida Breeze Tours" style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
          Penida<span>Breeze</span> Tours
        </a>

        <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          <a href="#home" onClick={() => setMobileMenuOpen(false)}>Beranda</a>
          <a href="#virtual-tour" onClick={() => setMobileMenuOpen(false)}>Destinasi</a>
          <a href="#paket" onClick={() => setMobileMenuOpen(false)}>Paket Tour</a>
          <a href="#kontak" onClick={() => setMobileMenuOpen(false)}>Kontak</a>
          <a href="#kontak" className="nav-btn" onClick={() => setMobileMenuOpen(false)}>
            <Phone size={15} /> Booking Sekarang
          </a>
        </div>

        <button
          className="nav-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
}
