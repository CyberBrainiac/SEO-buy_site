import React from 'react';
import style from './home.module.scss';
import Hero from './hero/Hero';
import Tools from './tools/Tools';

const Home: React.FC = () => {
  return (
    <section className="home">
      <div className={style.container}>
        <div className={style.content}>
          <Hero />
          <Tools />
        </div>
      </div>
    </section>
  );
};

export default Home;
