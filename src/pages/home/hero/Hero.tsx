import React from 'react';
import style from './hero.module.scss';
import AbstractBackground from '@image/heroAbstrractBackground.svg';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="hero">
      <div className={style.container}>
        <div className={style.content}>
          <div className={style.tegline}>
            <p>We will save your time</p>
          </div>
          <div className={style.heading}>
            <h2>About Us</h2>
          </div>
          <div className={style.textContent}>
            <p>
              Vestibulum ullamcorper consequat mauris, eget pellentesque lectus vestibulum eu. Ut
              auctor quam a risus faucibus, vel consectetur nunc tempus. Maecenas aliquet arcu eu
              tortor gravida, nec feugiat orci cursus. Quisque vel odio eu lacus sollicitudin
              tristique. Integer sed lectus eu nunc bibendum aliquet.
            </p>
          </div>
        </div>
        <div className={style.imgWrap}>
          <img src={AbstractBackground} alt="AbstractBackground" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
