import React from 'react';
import { Link } from 'react-router-dom';
import style from './home.module.scss';

const Home: React.FC = () => {
  return (
    <section className={style.container}>
      <div className={style.content}>
        <h1>HOME PAGE</h1>
      </div>
      <div>
        <Link className={style.button} to="/tools/thematicity-index">
          <h3>Thematicity-index page</h3>
        </Link>
      </div>
      <div>
        <Link className={style.button} to="/tools/unknown">
          <h3>Unknown page</h3>
        </Link>
      </div>
    </section>
  );
};

export default Home;
