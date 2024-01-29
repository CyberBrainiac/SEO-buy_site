import React from 'react';
import style from './linkBuilding.module.scss';

const LinkBuilding: React.FC = () => {
  return (
    <section className="linkBuilding">
      <div className={style.container}>
        <h2>Link Building Services</h2>
        <p>
          Elevate your online presence with our bespoke link building services. Our team of experts
          is dedicated to curating high-quality backlinks that strengthen your website`s authority
          and drive organic traffic.
        </p>
        <p>
          Forge a robust online presence with our Link Building Services, offering tailored
          strategies like backlink strategy development, outreach backlinks, guest and sponsored
          posts, crowd placements in blog comments and forums, competitor analysis, and customized
          placements for diverse niches and budgets.
        </p>
        <p>
          Elevate your online presence with <a href="https://seo-buy.com/">SEO-Buy</a>. Let`s build
          a digital legacy together!
        </p>
      </div>
    </section>
  );
};

export default LinkBuilding;
