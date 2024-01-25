import React from 'react';
import style from './footer.module.scss';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const developerEmail = 'arsenij.arxipov.1998@gmail.com';
  const date = new Date();
  const currentYear = date.getFullYear();

  return (
    <footer className="footer">
      <div className={style.container}>
        <div className={style.content}>
          <Link className={style.content_link} to="/aboutUs">
            <p>About Us</p>
          </Link>
          <Link className={style.content_link} to="/contactUs">
            <p>Contact Us</p>
          </Link>
          <Link className={style.content_link} to="/termsOfUse">
            <p>Terms Of Use</p>
          </Link>
          <Link className={style.content_link} to="/privacyPolicy">
            <p>Privacy Policy</p>
          </Link>
        </div>
        <div className={style.separator}></div>
      </div>
      <div className={style.copyright}>
        <div className={style.copyrightLegal}>
          {' '}
          © <span className={style.copyrightYear}>{currentYear}</span> SEO-buy
        </div>
        <p className={style.copyrightCreator}>
          Created by{' '}
          <a className={style.copyrightCreator_mail} href={`mailto:${developerEmail}`}>
            {developerEmail}
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
