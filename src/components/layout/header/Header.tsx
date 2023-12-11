import React, { useContext } from 'react';
import style from './header.module.scss';
import { ButtonCommon, ButtonLink } from '@/components/buttons/Buttons';
import { Link } from 'react-router-dom';
import { AuthContext } from '@/containers/AuthContext';
import { useSelector } from 'react-redux';
import { selectUser } from '@/containers/reducers/userSlice';

const Header: React.FC = () => {
  const { setUser, deleteUser } = useContext(AuthContext);
  const userProfile = useSelector(selectUser);

  const handleAuthBtnClick = () => {
    setUser('Google');
  };

  return (
    <header className="header">
      <div className={style.container}>
        <div className={style.logoWrap}>
          <div className={style.logo}>
            <Link to="/">SP</Link>
          </div>
        </div>

        <div className={style.nav}>
          <div className={style.navServices}>Services</div>
          <div className={style.navTools}>Tools</div>
        </div>

        <ButtonLink href="/" text="Home page" />

        <div className={style.auth}>
          {userProfile ? (
            <div className={style.authProfile}>
              <img
                className={style.authImg}
                src={userProfile.photoURL}
                alt="user avatar"
                referrerPolicy="no-referrer"
              />
              {/* <div onClick={deleteUser}>Sign OUT</div> */}
              <ButtonCommon onClick={deleteUser} text="Sign Out" />
            </div>
          ) : (
            <div onClick={handleAuthBtnClick} className={style.authBtn}>
              <p>Sign In</p>
              <div className={style.authBtn_highlight}>
                <p>Sign Up</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={style.background}></div>
    </header>
  );
};

export default Header;
