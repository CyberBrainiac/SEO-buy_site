import React, { useEffect } from 'react';
import style from './privacyPolicy.module.scss';

const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    document.title = 'Privacy Policy';
    const newMetaDescription = document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement;
    newMetaDescription.content = `Explore our privacy policy for better user experience`;
  }, []);

  return (
    <section className="privacyPolicy">
      <div className={style.container}>
        <h1>Privacy Policy of seo-buy.com</h1>
        <div className={style.otherInfoTop}>
          <p className={style.updateTime}>Last Updated: 25.01.2024</p>
          <p>
            Thank you for using SEO-Buy! This Privacy Policy outlines how we collect, use, disclose,
            and protect the information you provide when using our site. By using our application,
            you agree to the terms outlined in this policy.
          </p>
        </div>

        <div className={style.list}>
          <h4>Information We Collect:</h4>
          <ol>
            <li>
              <h5>Google Authentication Information:</h5>
              <ul>
                <li>google name;</li>
                <li>google surname;</li>
                <li>google email address;</li>
                <li>google profile photo.</li>
              </ul>
            </li>
            <li>
              <h5>Usage Information:</h5>
              <ul>
                <li>Time of usage.</li>
              </ul>
            </li>
          </ol>

          <h4>How We Collect Information:</h4>
          <ol>
            <li>
              <h5>Google Authentication:</h5>
              <ul>
                <li>
                  We collect your name, surname, email address, and profile photo when you log in
                  through Google Authentication.
                </li>
              </ul>
            </li>
            <li>
              <h5>Usage Tracking:</h5>
              <ul>
                <li>We automatically track the time you spend using our application.</li>
              </ul>
            </li>
          </ol>

          <h4>How We Use Your Information:</h4>
          <ol>
            <li>
              <h5>Google Authentication Information:</h5>
              <ul>
                <li>
                  Your name, surname, email address, and profile photo are used to personalize your
                  experience within the application.
                </li>
              </ul>
            </li>
            <li>
              <h5>Usage Information:</h5>
              <ul>
                <li>
                  The time of usage is collected to understand user behavior and improve the
                  application`s performance.
                </li>
              </ul>
            </li>
          </ol>

          <h4>Data Security:</h4>
          <p>
            We prioritize the security of your information and employ industry-standard measures to
            protect it from unauthorized access, disclosure, alteration, or destruction.{' '}
            <a href="https://firebase.google.com" target="_blank" rel="noreferrer">
              Firebase.google.com
            </a>{' '}
            keeps your information safe.
          </p>

          <h4>Data Sharing:</h4>
          <ol>
            <li>
              <h5>Third-Party Services:</h5>
              <ul>
                <li>
                  We may use third-party services for analytics or to enhance user experience. These
                  services are governed by their respective privacy policies.
                </li>
              </ul>
            </li>
            <li>
              <h5>Legal Compliance:</h5>
              <ul>
                <li>
                  We may disclose your information if required to do so by law or in response to
                  valid requests from public authorities.
                </li>
              </ul>
            </li>
          </ol>

          <h4>Changes to Privacy Policy:</h4>
          <p>
            We may update this Privacy Policy to reflect changes in our practices. We encourage you
            to review this policy periodically.
          </p>

          <h4>Contact Us:</h4>
          <p>
            If you have any questions or concerns regarding this Privacy Policy, please{' '}
            <a href="https://seo-buy.com/#/contactUs">contact us</a>.
          </p>
          <p>
            By continuing to use SEO-Buy, you acknowledge that you have read and agree to this
            Privacy Policy.
          </p>
          <p>Thank you for trusting us with your information!</p>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
