import React, { useLayoutEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from './footer/Footer';
import Header from './header/Header';
import style from './rootLayout.module.scss';

const RootLayout: React.FC = () => {
  const location = useLocation();
  // const lastPositionKey = 'S-B_lastPosition';
  const firstRender = useRef(true);

  const scrollTo = (y: number) => {
    window.scrollTo(0, y);
  };

  //in develop mode component renders 2 times, that occurs scrolling and glitch effect
  useLayoutEffect(() => {
    if (!firstRender.current) scrollTo(0);
    firstRender.current = false;
  }, [location]);

  return (
    <section className="page">
      <div className={style.container}>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </section>
  );
};

export default RootLayout;
