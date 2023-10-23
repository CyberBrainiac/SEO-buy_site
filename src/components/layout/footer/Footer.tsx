import style from './footer.module.scss';
import React from 'react';

const Footer: React.FC = () => {
  const developerEmail = 'arsenij.arxipov.1998@gmail.com';
  return (
    <footer className={style.container}>
      <div className={style.content}>
        <div className={style.content_link}>About Us</div>
        <div className={style.content_link}>Contact Us</div>
        <div className={style.content_link}>User Data Policy</div>
        <div className={style.content_link}>Prices</div>
        <div className={style.content_link}>About Thematicity Index Tools</div>
      </div>
      <div className={style.copyright}>
        <p>
          Created by:{' '}
          <a className={style.copyright_text} href={`mailto:${developerEmail}`}>
            {developerEmail}
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
