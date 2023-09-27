import { Link } from 'react-router-dom';
import style from './home.module.scss';

const Home: React.FC = () => {
  return (
    <section className={style.container}>
      <div className={style.content}>HOME PAGE</div>
      <div>
        <Link to="/tools/thematicity-index">thematicity-index</Link>
      </div>
      <div>
        <Link to="/tools/unknown">unknown</Link>
      </div>
    </section>
  );
};

export default Home;
