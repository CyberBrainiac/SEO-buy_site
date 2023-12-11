import React from 'react';
import style from './home.module.scss';
import Hero from './hero/Hero';
import Tools from './tools/Tools';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <section className="home">
      <div className={style.container}>
        <div className={style.content}>
          <Hero />
          <Tools />
          <Link to={'/tools/thematicity-index'}>Thematicity-index LINK</Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
