import React, { useContext } from 'react';
import style from './userNav.module.scss';
import { AuthContext } from '@/containers/AuthContext';
import { useSelector } from 'react-redux';
import { selectUser } from '@/containers/reducers/userSlice';
import { BiUser } from 'react-icons/bi';
import { IconContext } from 'react-icons';
import { ButtonCommon } from '../buttons/Buttons';
import { Link } from 'react-router-dom';

const UserNav: React.FC = () => {
  const { setUser } = useContext(AuthContext);
  const userProfile = useSelector(selectUser);
  const { deleteUser } = useContext(AuthContext);

  const handleAuthBtnClick = () => {
    setUser('Google');
  };

  if (!userProfile) {
    return (
      <div onClick={handleAuthBtnClick} className={style.auth}>
        Sign In
      </div>
    );
  }

  function handleSignOut() {
    deleteUser();
  }

  return (
    <div className={style.container}>
      <IconContext.Provider value={{ color: '#fffc62', size: '3em' }}>
        <div>
          <BiUser />
        </div>
      </IconContext.Provider>

      <div className={`${style.menu} ${style.menu_active}`}>
        <div className={style.menu_topDecore}></div>
        <div className={style.menuItemWrap}>
          <div className={style.menuItem}>
            <Link to={'/user/profile'}>Profile</Link>
          </div>
          <div className={style.menuItem}>
            <Link to={'/user/payment'}>Payment Details</Link>
          </div>
          <ButtonCommon onClick={handleSignOut} className={style.signOutBtn} text="Sign out" />
        </div>
      </div>
    </div>
  );
};

export default UserNav;
