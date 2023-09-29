import style from './errorPage.module.scss';
import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <section className={style.container}>
      <div className={style.message}>
        <p>404 page not found (</p>
      </div>
      <Link to="/">
        <div className={style.linkButton}>Go back</div>
      </Link>
    </section>
  );
}

export default ErrorPage;
