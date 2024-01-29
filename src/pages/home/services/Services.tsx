import React, { useLayoutEffect, useRef } from 'react';
import style from './services.module.scss';
import spiner_onPageSEO from '@image/Spiner_onPageSEO.svg';
import spiner_linkBuilding from '@image/Spiner_linkBuilding.svg';
import spiner_articleCreation from '@image/Spiner_articleCreation.svg';

type AllowTextId = 'text_onPageSEO' | 'text_linkBuilding' | 'text_articleCreation';
type ImgRef = React.MutableRefObject<HTMLImageElement | null>;

interface TextPictureAssociationProps {
  text_onPageSEO: ImgRef;
  text_linkBuilding: ImgRef;
  text_articleCreation: ImgRef;
}

const Services: React.FC = () => {
  const img_onPageSEO = useRef<HTMLImageElement | null>(null);
  const img_linkBuilding = useRef<HTMLImageElement | null>(null);
  const img_articleCreation = useRef<HTMLImageElement | null>(null);
  const img_active = `${style.spinerImg} ${style.spinerImg_active}`;
  const img_disable = `${style.spinerImg}`;

  const textPictureAssociation: TextPictureAssociationProps = {
    text_onPageSEO: img_onPageSEO,
    text_linkBuilding: img_linkBuilding,
    text_articleCreation: img_articleCreation,
  };

  //initial highlight spiner sector
  useLayoutEffect(() => {
    if (img_onPageSEO.current) {
      img_onPageSEO.current.className = img_active;
    }
  }, [img_active]);

  //Activate image after hover
  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    const blockId = event.currentTarget.id as AllowTextId;

    Object.values(textPictureAssociation).forEach((imgRef: ImgRef) => {
      if (!imgRef.current) return;
      imgRef.current.className = img_disable;
    });
    const activeImg = textPictureAssociation[blockId];

    if (activeImg.current) {
      activeImg.current.className = img_active;
    }
  };

  const handleMouseLeave = () => {
    console.log('leave');
  };

  return (
    <section className="services">
      <div className={style.container}>
        <div className={style.servicesDescription}>
          <div
            id="text_onPageSEO"
            className={style.servicesElem}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <p>
              Discover a comprehensive suite of SEO services, including competitor site analysis,
              full website audits, page-specific audits, content and keyword optimization, SEO
              health checks, strategic linking, and meta tag optimization, ensuring your website is
              finely tuned for optimal performance.
            </p>
          </div>
          <div
            id="text_linkBuilding"
            className={style.servicesElem}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <p>
              Forge a robust online presence with our Link Building Services, offering tailored
              strategies like backlink strategy development, outreach backlinks, guest and sponsored
              posts, crowd placements in blog comments and forums, competitor analysis, and
              customized placements for diverse niches and budgets.
            </p>
          </div>
          <div
            id="text_articleCreation"
            className={style.servicesElem}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <p>
              Craft a compelling digital narrative with our Custom Article Creation services. We
              specialize in writing SEO-optimized articles for internal blogs and sponsored articles
              for link building, tailoring each piece to niche specifics, analyzing keywords for
              relevance, and offering client-centric content that resonates with target audiences.
            </p>
          </div>
        </div>
        <div className={style.spiner}>
          <img
            ref={img_onPageSEO}
            className={style.spinerImg}
            src={spiner_onPageSEO}
            alt="circle with enumerate of our services: on page SEO"
          />
          <img
            ref={img_linkBuilding}
            className={style.spinerImg}
            src={spiner_linkBuilding}
            alt="circle with enumerate of our services: link building"
          />
          <img
            ref={img_articleCreation}
            className={style.spinerImg}
            src={spiner_articleCreation}
            alt="circle with enumerate of our services: article creation"
          />
        </div>
      </div>
    </section>
  );
};

export default Services;
