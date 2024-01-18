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
            <a href="https://seo-buy.com/#/tools/thematicity-index">thematic domain indexing</a> and
            pinpointing ideal locations for{' '}
            <a href="https://seo-buy.com/#/tools/link-insertion">link insertions</a>.
          </p>

          <Tools />

          <h2>Comprehensive On-page SEO Services</h2>
          <p>
            Discover a comprehensive suite of SEO services tailored to meet the diverse needs of
            digital marketers and businesses. From keyword analysis to performance tracking, we`ve
            got your SEO endeavors covered.
          </p>
          <p>
            Navigate the intricacies of SEO with our comprehensive services, including competitor
            site analysis, full website audits, page-specific audits, content and keyword
            optimization, SEO health checks, strategic linking, and meta tag optimization, ensuring
            your website is finely tuned for optimal performance.
          </p>

          <h2>Custom Article Creation</h2>
          <p>
            Need compelling content tailored to your niche? Our professional writers craft engaging
            articles that resonate with your audience, bolstering your brand`s online visibility.
          </p>
          <p>
            Craft a compelling digital narrative with our Custom Article Creation services. We
            specialize in writing SEO-optimized articles for internal blogs and sponsored articles
            for link building, tailoring each piece to niche specifics, analyzing keywords for
            relevance, and offering client-centric content that resonates with target audiences.
          </p>

          <h3>About Us</h3>
          <p>
            At <a href="https://seo-buy.com/">SEO-Buy</a>, we`re not just a service; we`re your
            strategic partner in the digital landscape. With a passion for innovation and a
            commitment to excellence, our team is dedicated to empowering businesses like yours to
            thrive in the competitive online world. Trust us to be your guide as you navigate the
            complexities of SEO and link building.
          </p>
          <p>
            Since 2019, <a href="https://seo-buy.com/">SEO-Buy</a> has been at the forefront of
            digital innovation, boasting an experienced team of SEO and content experts. Our
            client-centric approach prioritizes transparency, and we`re dedicated to crafting
            bespoke strategies, ensuring your digital success with cutting-edge solutions.
          </p>
          <p>
            Elevate your online presence with <a href="https://seo-buy.com/">SEO-Buy</a>. Let`s
            build a digital legacy together!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Home;
