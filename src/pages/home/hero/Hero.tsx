import React, { useEffect, useRef, useState } from 'react';
import style from './hero.module.scss';

const Hero: React.FC = () => {
  const [renderHeading, setRenderHeading] = useState<string | null>(null);
  const headRef = useRef<HTMLHeadElement | null>(null);
  const headings = ['Elevate Your SEO Game!', 'With SEO-buy!'];

  /**Heading animation*/
  useEffect(() => {
    setRenderHeading(headings[0]);
    if (!renderHeading) return;

    const currentHead = headRef.current as HTMLHeadElement;
    currentHead.style.opacity = '0';

    setTimeout(() => {
      currentHead.style.opacity = '1';

      currentHead.ontransitionend = () => {
        currentHead.ontransitionend = null;

        setTimeout(() => {
          let nextHeadingIndex = headings.indexOf(renderHeading) + 1;

          if (nextHeadingIndex >= headings.length) nextHeadingIndex = 0;
          currentHead.style.opacity = '0';

          currentHead.ontransitionend = () => {
            currentHead.ontransitionend = null;
            setRenderHeading(headings[nextHeadingIndex]);
          };
        }, 1000);
      };
    }, 4);

    //I off eslint rule because headings will not modufy during component lifecycle;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderHeading]);

  return (
    <section className="hero">
      <div className={style.heading}>
        <h1 ref={headRef as React.RefObject<HTMLHeadingElement>}>{renderHeading}</h1>
      </div>
      <div className={style.container}>
        <p>
          Unlock the power of seamless link building and elevate your website`s performance with our
          innovative online service. At <a href="https://seo-buy.com/">SEO-Buy</a>, we redefine the
          standards of link building, offering unique features designed specifically for link
          builders like you. Explore a world of possibilities as we introduce groundbreaking tools
          such as{' '}
          <a href="https://seo-buy.com/#/tools/thematicity-index">thematic domain indexing</a> and
          pinpointing ideal locations for{' '}
          <a href="https://seo-buy.com/#/tools/link-insertion">link insertions</a>.
        </p>
      </div>
    </section>
  );
};

export default Hero;
