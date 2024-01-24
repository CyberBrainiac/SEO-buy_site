import React, { useEffect, useRef, useState } from 'react';
import style from './hero.module.scss';
import throttling from '@/utils/throttling';
import LazyBackgroundImage from '@/components/lazyBackgroundImage/LazyBackgroundImage';
import HeroImg from '@image/skyscraper.jpg';

const Hero: React.FC = () => {
  const [renderHeading, setRenderHeading] = useState<string | null>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const headings = ['Elevate Your SEO Game!', 'With SEO-buy'];

  /**Heading animation*/
  useEffect(() => {
    const currentHead = headRef.current;

    if (!renderHeading || !currentHead) {
      setRenderHeading(headings[0]);
      return;
    }

    let nextHeadingIndex = headings.indexOf(renderHeading) + 1;
    if (nextHeadingIndex >= headings.length) nextHeadingIndex = 0;

    currentHead.style.opacity = '0';

    (async () => {
      await throttling(4);

      currentHead.ontransitionend = async () => {
        currentHead.ontransitionend = null;
        await throttling(1500);

        currentHead.ontransitionend = async () => {
          currentHead.ontransitionend = null;
          setRenderHeading(headings[nextHeadingIndex]);
        };
        currentHead.style.opacity = '0';
      };
      currentHead.style.transition = 'opacity 0.6s ease-in';
      currentHead.style.opacity = '1';
    })();
    //I off eslint rule because headings will not modufy during component lifecycle;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderHeading]);

  return (
    <section className="hero">
      <div className={style.heading}>
        <h1 className={style.headingElem} ref={headRef}>
          {renderHeading}
        </h1>
      </div>
      <div className={style.container}>
        <div className={style.content}>
          <h5>Unlock the power</h5>
          <p>
            Of seamless link building and elevate your website`s performance with our innovative
            online service.
          </p>
          <p>
            At <a href="https://seo-buy.com/">SEO-Buy</a>, we redefine the standards of link
            building, offering unique features designed specifically for link builders like you.
            Explore a world of possibilities as we introduce groundbreaking tools such as{' '}
            <a href="https://seo-buy.com/#/tools/thematicity-index">thematic domain indexing</a> and
            pinpointing ideal locations for{' '}
            <a href="https://seo-buy.com/#/tools/link-insertion">link insertions</a>.
          </p>
        </div>
        <LazyBackgroundImage
          imgStyle={{
            width: '640px',
            height: '308px',
            backgroundSize: 'cover',
            boxShadow: '0 0 20px 2px rgba(106, 135, 202, 1)',
          }}
          imgUrl={HeroImg}
        />
      </div>
    </section>
  );
};

export default Hero;
