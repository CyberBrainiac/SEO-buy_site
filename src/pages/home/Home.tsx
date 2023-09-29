import { Link } from 'react-router-dom';
import style from './home.module.scss';

const Home: React.FC = () => {
  return (
    <section className={style.container}>
      <div className={style.content}>HOME PAGE</div>
      <div>
        <Link className={style.button} to="/tools/thematicity-index">
          Thematicity-index page
        </Link>
      </div>
      <div>
        <Link className={style.button} to="/tools/unknown">
          Unknown page
        </Link>
      </div>
    </section>
  );
};

export default Home;
