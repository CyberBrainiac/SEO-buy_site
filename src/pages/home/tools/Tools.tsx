import React from 'react';
import style from './tools.module.scss';
import ServiceCard from '@/components/serviceCard/ServiceCard';
import Spreadsheet from '@image/spreadsheetIcon.svg';

const Tools: React.FC = () => {
  return (
    <section className="tools">
      <div className={style.container}>
        <h1 className={style.heading}>Tools</h1>
        <div className={style.cardWrap}>
          <ServiceCard
            backgroundImage={Spreadsheet}
            serviceLink="/tools/link-insertion"
            onPageInformationLink="#target2"
          >
            <h4 className={style.cardHeading}>Link Insertion</h4>
          </ServiceCard>

          <ServiceCard
            backgroundImage={Spreadsheet}
            serviceLink="/tools/thematicity-index"
            additionalInfo="This is very useful text.This is very useful text.This is very useful text.This is very useful text.This is very useful text."
            onPageInformationLink="#target1"
          >
            <h4 className={style.cardHeading}>Thematicity Index</h4>
          </ServiceCard>
        </div>
      </div>
    </section>
  );
};

export default Tools;
