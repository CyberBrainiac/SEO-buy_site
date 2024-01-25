import React from 'react';
import style from './header.module.scss';
import { Link } from 'react-router-dom';
import UserNav from '@/components/userNav/UserNav';
import Messages from '@/components/messages/Messages';

const Header: React.FC = () => {
  return (
    <>
      <header className="header">
        <div className={style.container}>
          <div className={style.logoWrap}>
            <div className={style.logo}>
              <Link to="/">
                S<span className={style.logoSepar}>-</span>B
              </Link>
            </div>
          </div>

          <div className={style.nav}>
            <div className={style.navServices}>
              <span className={`${style.navName} ${style.serviceName_active}`}>Services</span>
              <div className={`${style.navList} ${style.navService_active}`}>
                <div className={style.navItem}>
                  <Link to={'/service/custom-article-creation'}>Custom Article Creation</Link>
                </div>
                <div className={style.navItem}>
                  <Link to={'/service/link-building'}>Link Building Services</Link>
                </div>
                <div className={style.navItem}>
                  <Link to={'/service/on-page-seo'}>On Page SEO</Link>
                </div>
              </div>
            </div>

            <div className={style.navTools}>
              <span id={style.tools} className={`${style.navName} ${style.toolsName_active}`}>
                Tools
              </span>
              <div className={`${style.navList} ${style.navTools_active}`}>
                <div className={style.navItem}>
                  <Link to={'/tools/link-insertion'}>Link Insertion</Link>
                </div>
                <div className={style.navItem}>
                  <Link to={'/tools/thematicity-index'}>Thematicity Index</Link>
                </div>
              </div>
            </div>
          </div>

          <UserNav />
          <Messages />
        </div>
        <div className={style.background}></div>
      </header>
      <div className={style.blankHeaderLayout}></div>
    </>
  );
};

export default Header;
