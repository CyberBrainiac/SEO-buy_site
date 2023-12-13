import React, { useContext } from 'react';
import style from './userNav.module.scss';
import { AuthContext } from '@/containers/AuthContext';
import { useSelector } from 'react-redux';
import { selectUser } from '@/containers/reducers/userSlice';
import { BiUser } from 'react-icons/bi';
import { IconContext } from 'react-icons';

const UserNav: React.FC = () => {
  const { setUser, deleteUser } = useContext(AuthContext);
  const userProfile = useSelector(selectUser);

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

  return (
    <div className={style.userNav}>
      <IconContext.Provider value={{ color: '#fffc62', size: '3em' }}>
        <div>
          <BiUser />
        </div>
      </IconContext.Provider>
    </div>

    // <div className="userNav">
    //   <div className={style.auth}>
    //     {userProfile ? (
    //       <div className={style.authProfile}>
    //         <img
    //           className={style.authImg}
    //           src={userProfile.photoURL}
    //           alt="user avatar"
    //           referrerPolicy="no-referrer"
    //         />
    //         {/* <div onClick={deleteUser}>Sign OUT</div> */}
    //         <button onClick={deleteUser}>Sign Out</button>
    //       </div>
    //     ) : (
    //       <div onClick={handleAuthBtnClick} className={style.authBtn}>
    //         <p>Sign In</p>
    //         <div className={style.authBtn_highlight}>
    //           <p>Sign Up</p>
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // </div>
  );
};

export default UserNav;
