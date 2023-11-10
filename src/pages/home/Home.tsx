import React from 'react';
import { Link } from 'react-router-dom';
import style from './home.module.scss';

const Home: React.FC = () => {
  return (
    <section className="home">
      <div className={style.container}>
        <div className={style.styleContainer}>
          <div className={style.blok1}>
            <div className={style.blok1_item}></div>
          </div>
          <div className={style.blok2}></div>
          <div className={style.styleContainer_smallGreen}></div>
          <div className={style.blok3}></div>
        </div>
        <div className={style.content}>
          <h1>HOME PAGE - H1</h1>
          <h2>H2</h2>
          <h3>H3</h3>
          <h4>H4</h4>
          <h5>H5</h5>
          <h6>H6</h6>
          <p className={style.content_highlight}>This is highlighted text</p>
          <p>This is common text</p>
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
      </div>
    </section>
  );
};

export default Home;
