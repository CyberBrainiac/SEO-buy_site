import React from 'react';
import style from './articleCreaction.module.scss';

const ArticleCreation: React.FC = () => {
  return (
    <section className="articleCreation">
      <div className={style.container}>
        <h2>Custom Article Creation</h2>
        <p>
          Need compelling content tailored to your niche? Our professional writers craft engaging
          articles that resonate with your audience, bolstering your brand`s online visibility.
        </p>
        <p>
          Craft a compelling digital narrative with our Custom Article Creation services. We
          specialize in writing SEO-optimized articles for internal blogs and sponsored articles for
          link building, tailoring each piece to niche specifics, analyzing keywords for relevance,
          and offering client-centric content that resonates with target audiences.
        </p>
      </div>
    </section>
  );
};

export default ArticleCreation;
