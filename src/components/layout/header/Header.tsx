import React, { useContext } from 'react';
import style from './header.module.scss';
import { ButtonCommon, ButtonLink } from '@/components/buttons/Buttons';
import { Link } from 'react-router-dom';
import { AuthContext } from '@/containers/AuthContext';
// import { LiaUserCircle } from 'react-icons/lia';

const Header: React.FC = () => {
  const { isAuth, googleProf, setUser, deleteUser } = useContext(AuthContext);

  return (
    <header className={style.container}>
      <div className={style.logo}>
        <Link to="/">SP</Link>
      </div>

      <div className={style.nav}>
        <div className={style.navServices}>Services</div>
        <div className={style.navTools}>Tools</div>
      </div>

      <ButtonLink href="/" text="Home page" />

      <div className={style.auth}>
        {isAuth ? (
          <div className={style.authProfile}>
            <img
              className={style.authImg}
              src={(() => {
                const url = googleProf?.photoURL;
                if (!url) return undefined;
                return url;
              })()}
              alt="user avatar"
              referrerPolicy="no-referrer"
            />
            {/* <div onClick={deleteUser}>Sign OUT</div> */}
            <ButtonCommon onClick={deleteUser} text="Sign Out" />
          </div>
        ) : (
          <div onClick={setUser} className={style.authBtn}>
            <p>Sign In</p>
            <div className={style.authBtn_highlight}>
              <p>Sign Up</p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
