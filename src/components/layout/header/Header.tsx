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
              <Link to="/">SP</Link>
            </div>
          </div>

          <div className={style.nav}>
            <div className={style.navServices}>Services</div>
            <div className={style.navTools}>Tools</div>
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
