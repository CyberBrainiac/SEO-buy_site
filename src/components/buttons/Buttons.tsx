import { Link } from 'react-router-dom';
import { ButtonLinkProps } from './buttonTypes';
import { BsArrowRightShort } from 'react-icons/bs';
import './buttons.scss';

const ButtonLink: React.FC<ButtonLinkProps> = ({ href, className, id, text }) => {
  return (
    <Link to={href} className={className ? className + ' buttonLink' : 'buttonLink'} id={id}>
      {text}
      <div className="buttonLink__arrow">
        <BsArrowRightShort />
      </div>
    </Link>
  );
};

const Button: React.FC = () => {
  return <button className="button">View more</button>;
};

export { ButtonLink, Button };
