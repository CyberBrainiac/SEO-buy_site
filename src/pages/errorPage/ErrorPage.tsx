import React from 'react';
import style from './errorPage.module.scss';
import { ButtonLink } from '@/components/buttons/Buttons';

const ErrorPage: React.FC = () => {
  return (
    <section className="errorPage">
      <div className={style.container}>
        <h1>404 page not found :(</h1>
        <ButtonLink href="/" text="To home page" />
      </div>
    </section>
  );
};

export default ErrorPage;
