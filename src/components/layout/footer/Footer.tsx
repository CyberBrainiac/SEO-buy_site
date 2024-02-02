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
        <div className={style.contentWrap}>
          <div className={style.companyInformation}>
            <h4>Company Information</h4>
            <Link to="/aboutUs">
              <p>About Us</p>
            </Link>
            <Link to="/contactUs">
              <p>Contact Us</p>
            </Link>
            <Link to="/termsOfUse">
              <p>Terms Of Use</p>
            </Link>
            <Link to="/privacyPolicy">
              <p>Privacy Policy</p>
            </Link>
          </div>

          <div className={style.services}>
            <h4>Services</h4>
            <Link to={'/service/custom-article-creation'}>Custom Article Creation</Link>
            <Link to={'/service/link-building'}>Link Building</Link>
            <Link to={'/service/on-page-seo'}>On Page Seo</Link>
          </div>

          <div className={style.tools}>
            <h4>Tools</h4>
            <Link to={'/tools/thematicity-index'}>Thematicity Domain Index</Link>
            <Link to={'/tools/link-insertion'}>Link Insertion Locator</Link>
          </div>
        </div>
        <div className={style.separator}></div>
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
      </div>
    </footer>
  );
};

export default Footer;
