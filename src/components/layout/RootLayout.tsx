import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './footer/Footer';
import Header from './header/Header';
import './rootLayout.scss';

const RootLayout: React.FC = () => {
  return (
    <section className="page">
      <Header />
      <Outlet />
      <Footer />
    </section>
  );
};

export default RootLayout;
