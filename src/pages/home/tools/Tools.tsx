import React from 'react';
import style from './tools.module.scss';
import ServiceCard from '@/components/serviceCard/ServiceCard';
import Spreadsheet from '@image/spreadsheetIcon.svg';

const Tools: React.FC = () => {
  return (
    <section className="tools">
      <div className={style.container}>
        <h2 className={style.heading}>Our Cutting-Edge Features</h2>
        <div className={style.cardWrap}>
          <div className={style.card}>
            <h3>Link Insertion Locator</h3>
            <p>
              Precisely calculate thematic indices for domains, ensuring targeted and relevant link
              placements. Enhance your SEO strategy with data-driven insights that drive organic
              growth.
            </p>
            <ServiceCard
              backgroundImage={Spreadsheet}
              serviceLink="/tools/link-insertion"
              additionalInfo="Elevate your SEO strategy with Thematic Domain Indexing, our advanced tool that
              calculates thematic indices for domains, ensuring precise alignment with user queries
              and strategic link placements, ultimately enhancing organic growth."
            >
              <h4 className={style.cardHeading}>Link Insertion Locator</h4>
            </ServiceCard>
          </div>

          <div className={style.card}>
            <h3>Thematic Domain Indexing</h3>
            <p>
              Streamline your link building efforts with our advanced tool that identifies optimal
              spaces for link insertions. Save time and resources by focusing on high-impact
              opportunities tailored to your niche.
            </p>
            <ServiceCard
              backgroundImage={Spreadsheet}
              serviceLink="/tools/thematicity-index"
              additionalInfo="Effortlessly discover optimal spaces for your links with our Link Insertion Locator.
              Upload your website database, input keywords, and receive curated lists of websites,
              saving valuable time in identifying ideal locations for link insertions through a
              seamless integration with Google`s Search Engine Results Pages."
              // onPageInformationLink="#target1"
            >
              <h4 className={style.cardHeading}>Thematic Domain Indexing</h4>
            </ServiceCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tools;
