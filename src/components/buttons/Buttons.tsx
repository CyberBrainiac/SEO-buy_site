import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonCommonProps, ButtonLinkProps } from './buttonTypes';
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

const ButtonCommon: React.FC<ButtonCommonProps> = ({
  onClick,
  className,
  id,
  text,
  type,
  disabled,
}) => {
  return (
    <button
      className={className ? className + ' buttonCommon' : 'buttonCommon'}
      id={id}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export { ButtonLink, ButtonCommon };
