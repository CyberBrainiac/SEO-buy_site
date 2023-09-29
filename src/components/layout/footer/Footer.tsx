import style from './footer.module.scss';

const Footer: React.FC = () => {
  const developerEmail = 'arsenij.arxipov.1998@gmail.com';
  return (
    <footer className={style.container}>
      <div className={style.content}>Footer content</div>
      <div className={style.copyright}>
        <p>
          Created by{' '}
          <a className={style.copyright_link} href={`mailto:${developerEmail}`}>
            {developerEmail}
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
