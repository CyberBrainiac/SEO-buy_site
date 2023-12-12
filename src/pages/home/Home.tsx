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
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h2 id="target1">
            This is target <br /> This is target
          </h2>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h2 id="target2">
            This is target <br /> This is target
          </h2>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
          <h3>1</h3>
        </div>
      </div>
    </section>
  );
};

export default Home;
