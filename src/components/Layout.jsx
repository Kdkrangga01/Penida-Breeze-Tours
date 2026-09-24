import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import WhatsAppButton from './WhatsAppButton';
import LoadingScreen from './LoadingScreen';
import ScrollProgress from './ScrollProgress';
import useScrollReveal from '../hooks/useScrollReveal';
import usePageSEO from '../hooks/usePageSEO';

export default function Layout() {
  useScrollReveal();
  usePageSEO();

  return (
    <>
      <ScrollProgress />
      <LoadingScreen />
      <ScrollToTop />
      <Header />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
