import React from 'react';
import style from './header.module.scss';
import { ButtonLink } from '@/components/buttons/Buttons';

const Header: React.FC = () => {
  return (
    <header className={style.container}>
      <div className={style.blok1}>
        <div className={style.blok1_item}></div>
      </div>
      <div className={style.blok2}></div>
      <div className={style.container_smallGreen}></div>
      <div className={style.blok3}></div>
      <ButtonLink href="/" text="Home page" />
    </header>
  );
};

export default Header;
