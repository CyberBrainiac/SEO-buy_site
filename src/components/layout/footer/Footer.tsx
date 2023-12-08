import React from 'react';
import style from './footer.module.scss';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const developerEmail = 'arsenij.arxipov.1998@gmail.com';
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
          <Link className={style.content_link} to="/userDataPolicy">
            <p>User Data Policy</p>
          </Link>
          <Link className={style.content_link} to="/prices">
            <p>Prices</p>
          </Link>
        </div>
        <div className={style.copyright}>
          <p>
            Created by:{' '}
            <a className={style.copyright_text} href={`mailto:${developerEmail}`}>
              {developerEmail}
            </a>
          </p>
        </div>
        <div className={style.background}></div>
      </div>
    </footer>
  );
};

export default Footer;
