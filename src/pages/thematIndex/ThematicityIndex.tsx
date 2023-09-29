import { Link } from 'react-router-dom';
import style from './thematicityIndex.module.scss';

const ThematicityIndex: React.FC = () => {
  return (
    <section>
      INDEX THEMATICITY PAGE
      <div>Content</div>
      <Link to="/">
        <div className={style.linkButton}>Go back</div>
      </Link>
    </section>
  );
};

export default ThematicityIndex;
