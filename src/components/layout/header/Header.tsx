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
              <span className={style.navName}>Services</span>
            </div>
            <div className={style.navTools}>
              <span className={style.navName}>Tools</span>
              <div className={`${style.navList} ${style.navTools_active}`}>
                <div>
                  <Link to={'/tools/link-insertion'}>Link Insertion</Link>
                </div>
                <div>
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
