import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Packages from './pages/Packages';
import PackageDetail from './pages/PackageDetail';
import Destinations from './pages/Destinations';
import DestinationDetail from './pages/DestinationDetail';
import Gallery from './pages/Gallery';
import Booking from './pages/Booking';
import About from './pages/About';
import Reviews from './pages/Reviews';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/destinasi" element={<Destinations />} />
          <Route path="/destinasi/:slug" element={<DestinationDetail />} />
          <Route path="/paket" element={<Packages />} />
          <Route path="/paket/:slug" element={<PackageDetail />} />
          <Route path="/galeri" element={<Gallery />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/ulasan" element={<Reviews />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/tentang-kami" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/kontak" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </LanguageProvider>
  );
}
