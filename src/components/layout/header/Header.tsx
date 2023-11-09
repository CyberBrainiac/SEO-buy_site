import React from 'react';
import style from './header.module.scss';
import { ButtonLink } from '@/components/buttons/Buttons';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className={style.container}>
      <div className={style.logo}>
        <Link to="/">SP</Link>
      </div>
      <div className={style.nav}>
        <div className={style.navServices}>Services</div>
        <div className={style.navTools}>Tools</div>
      </div>
      <ButtonLink href="/" text="Home page" />
      <div className={style.auth}>
        <div className={style.authBtn}>
          <p>Sign In</p>
          <div className={style.authBtn_highlight}>
            <p>Sign Up</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
