import React from 'react';
import style from './contactUs.module.scss';

const ContactUs: React.FC = () => {
  return (
    <section className="contactUs">
      <div className={style.container}>
        <div className={style.img}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/thematicity-index.appspot.com/o/assets%2FSEOb_logo.jpg?alt=media&token=1805af8b-7173-4072-b2e9-b6f589907850"
            alt="Company avatar"
          />
        </div>
        <div className={style.contactWrap}>
          <div className={style.contactName}>Email:</div>
          <div className={style.contactLink}>template email @.com</div>
          <div className={style.contactName}>WhatsApp:</div>
          <div className={style.contactLink}>what`s up bro?</div>
          <div className={style.contactName}>Telegram:</div>
          <div className={style.contactLink}>--link to telega id--</div>
        </div>
        <div id="googleContactForm" className={style.googleFormContainer}>
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSfzWUep1_3B6U0-VYZ4mYK1-1hbhDtS9tdA3-49tLj45pxOaQ/viewform?embedded=true"
            width="640"
            height="700"
          >
            Завантаження…
          </iframe>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
