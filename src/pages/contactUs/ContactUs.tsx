import React, { useEffect } from 'react';
import style from './contactUs.module.scss';

const ContactUs: React.FC = () => {
  useEffect(() => {
    document.title = 'Connect with SEO-Buy for Digital Excellence';
    const newMetaDescription = document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement;
    newMetaDescription.content = `Have questions or ready to embark on a digital journey? Reach out to our dedicated team. Let's connect for tailored SEO solutions, link-building strategies, and custom content creation.`;
  }, []);

  return (
    <section className="contactUs">
      <div className={style.container}>
        <h1>Let`s Connect for Digital Excellence</h1>
        <p>
          Have questions or ready to embark on a digital journey with us? Reach out to{' '}
          <a href="https://seo-buy.com/">SEO-Buy`s</a> dedicated team of experts. Whether you`re
          seeking tailored SEO solutions, link-building strategies, or custom content creation,
          we`re here to guide you.
        </p>

        <h2>Contact Information:</h2>
        <div className={style.img}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/thematicity-index.appspot.com/o/assets%2FSEOb_logo.jpg?alt=media&token=1805af8b-7173-4072-b2e9-b6f589907850"
            alt="Company avatar"
          />
        </div>
        <div className={style.contactWrap}>
          <div className={style.contactName}>Email:</div>
          <div className={style.contactLink}>contact.seobuy@gmail.com</div>
          <div className={style.contactName}>WhatsApp:</div>
          <div className={style.contactLink}>what`s up bro?</div>
          <div className={style.contactName}>Telegram:</div>
          <div className={style.contactLink}>--link to telega id--</div>
        </div>
        <div id="googleContactForm" className={style.googleFormContainer}>
          <h2>Get in Touch:</h2>
          <p>
            Complete the form below, and our team will promptly respond to your inquiry. Let`s
            collaborate to amplify your online presence and shape your digital success story.
          </p>
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSfzWUep1_3B6U0-VYZ4mYK1-1hbhDtS9tdA3-49tLj45pxOaQ/viewform?embedded=true"
            width="640"
            height="940"
          >
            Download…
          </iframe>
          <p>
            Thank you for considering <a href="https://seo-buy.com/">SEO-Buy</a> as your digital
            partner. We look forward to connecting with you and exploring the endless possibilities
            for your brand in the digital landscape.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
