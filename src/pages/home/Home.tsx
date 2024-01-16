import React, { useEffect } from 'react';
import style from './home.module.scss';
import Tools from './tools/Tools';

const Home: React.FC = () => {
  useEffect(() => {
    document.title = 'SEO-Buy: link building and SEO services';

    const newMetaDescription = document.createElement('meta');
    newMetaDescription.name = 'description';
    newMetaDescription.content = `Explore innovative SEO solutions, strategic link building, and captivating custom content creation. Welcome to SEO-Buy – where digital excellence begins and your brand's success story unfolds.`;
    document.head.appendChild(newMetaDescription);

    /* Open Graph meta tags for Facebook and other platforms */
    const newOgTitle = document.createElement('meta');
    newOgTitle.setAttribute('property', 'og:title');
    newOgTitle.setAttribute('content', 'SEO-Buy: link building and SEO services');
    document.head.appendChild(newOgTitle);

    const newOgDescription = document.createElement('meta');
    newOgDescription.setAttribute('property', 'og:description');
    newOgDescription.setAttribute(
      'content',
      `Explore innovative SEO solutions, strategic link building, and captivating custom content creation. Welcome to SEO-Buy – where digital excellence begins and your brand's success story unfolds.`
    );
    document.head.appendChild(newOgDescription);
    // {/* <meta property="og:image" content="http://mysite.com/og-image.jpg" /> */}

    const newOgUrl = document.createElement('meta');
    newOgUrl.setAttribute('property', 'og:url');
    newOgUrl.setAttribute('content', `https://seo-buy.com/`);
    document.head.appendChild(newOgUrl);

    const newOgType = document.createElement('meta');
    newOgType.setAttribute('property', 'og:type');
    newOgType.setAttribute('content', `website`);
    document.head.appendChild(newOgType);

    /* Twitter card meta tags */
    const newTwitterTitle = document.createElement('meta');
    newTwitterTitle.setAttribute('name', 'twitter:title');
    newTwitterTitle.setAttribute('content', `SEO-Buy: link building and SEO services`);
    document.head.appendChild(newTwitterTitle);

    const newTwitterDescription = document.createElement('meta');
    newTwitterDescription.setAttribute('name', 'twitter:description');
    newTwitterDescription.setAttribute(
      'content',
      `Explore innovative SEO solutions, strategic link building, and captivating custom content creation. Welcome to SEO-Buy – where digital excellence begins and your brand's success story unfolds.`
    );
    document.head.appendChild(newTwitterDescription);
  }, []);

  return (
    <section className="home">
      <div className={style.container}>
        <div className={style.content}>
          <h1>Welcome to SEO-Buy - Elevate Your SEO Game!</h1>
          <p>
            Unlock the power of seamless link building and elevate your website`s performance with
            our innovative online service. At <a href="https://seo-buy.com/">SEO-Buy</a>, we
            redefine the standards of link building, offering unique features designed specifically
            for link builders like you. Explore a world of possibilities as we introduce
            groundbreaking tools such as{' '}
            <a href="https://seo-buy.com/tools/thematicity-index">thematic domain indexing</a> and
            pinpointing ideal locations for{' '}
            <a href="https://seo-buy.com/tools/link-insertion">link insertions</a>.
          </p>

          <Tools />
        </div>
      </div>
    </section>
  );
};

export default Home;
