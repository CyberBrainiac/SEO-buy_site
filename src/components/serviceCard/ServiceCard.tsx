import React, { useState } from 'react';
import style from './serviceCard.module.scss';

interface ServiceCardArgum {
  backgroundImage?: string;
  children: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardArgum> = ({ backgroundImage: imgUrl, children }) => {
  const [isModalActive, setModalActive] = useState(false);
  const altImgMessage = imgUrl ? imgUrl.slice(imgUrl.lastIndexOf('/') + 1) : '';

  const handleMouseOver = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return; //current target - element which have listener
    setModalActive(true);
  };

  const handleMouseLeave = () => {
    setModalActive(false);
  };

  const Modal = isModalActive ? (
    <div className={style.modal}>
      <p>Click To Use</p>
    </div>
  ) : undefined;

  return (
    <div className="serviceCard">
      <div className={style.container}>
        <div className={style.background}>
          <img src={imgUrl} alt={altImgMessage} />
        </div>

        {children}

        <div
          className={style.modalWrap}
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
        >
          {Modal}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
