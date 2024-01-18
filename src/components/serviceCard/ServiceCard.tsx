import React, { useRef, useState } from 'react';
import style from './serviceCard.module.scss';
import { Link } from 'react-router-dom';

interface ServiceCardArgum {
  backgroundImage?: string;
  onPageInformationLink?: string;
  additionalInfo?: string;
  serviceLink: string;
  children: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardArgum> = ({
  onPageInformationLink: informLink,
  backgroundImage: imgUrl,
  additionalInfo,
  serviceLink,
  children,
}) => {
  const [isModalActive, setModalActive] = useState(false);
  const infoRef = useRef<HTMLDivElement | null>(null);
  const fixMultipleInterval = useRef<NodeJS.Timeout | null>(null);
  const altImgMessage = imgUrl ? imgUrl.slice(imgUrl.lastIndexOf('/') + 1) : '';

  //
  const handleMouseOver = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return; //current target - element which have listener
    setModalActive(true);

    //style MoreInfo
    const MoreInfo = infoRef.current;
    if (!MoreInfo) return;
    MoreInfo.style.opacity = '1';
    MoreInfo.style.bottom = '-20px';

    if (fixMultipleInterval.current) {
      clearTimeout(fixMultipleInterval.current);
    }
  };

  //
  // const handleMouseLeave = () => {
  //   setModalActive(false);

  //   //style MoreInfo
  //   const MoreInfo = infoRef.current;
  //   if (!MoreInfo) return;

  //   fixMultipleInterval.current = setTimeout(() => {
  //     MoreInfo.style.opacity = '0';
  //     MoreInfo.style.bottom = '0';
  //     fixMultipleInterval.current = null;
  //   }, 700);
  // };

  const MoreInfo = () => {
    if (!additionalInfo && !informLink) return;

    return (
      <div ref={infoRef} className={style.info}>
        <p>{additionalInfo}</p>
        <div className={style.infoMore}>
          {informLink ? <a href={informLink}>Read More</a> : undefined}
        </div>
      </div>
    );
  };

  const Modal = isModalActive ? (
    <Link className={style.modal} to={serviceLink}>
      <div className={style.modalCTA}>
        <p>Click To Use</p>
      </div>
      <div className={style.modalBG}></div>
    </Link>
  ) : undefined;

  return (
    <div className="serviceCard">
      <div className={style.container}>
        <div className={style.background}>
          <img src={imgUrl} alt={altImgMessage} />
        </div>
        {children}
        {MoreInfo()}
        <div
          className={style.modalWrap}
          onMouseOver={handleMouseOver}
          // onMouseLeave={handleMouseLeave}
        >
          {Modal}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
