import { useSelector } from 'react-redux';
import style from './profile.module.scss';
import React from 'react';
import { selectUser } from '@/containers/reducers/userSlice';

const Profile: React.FC = () => {
  const userProfile = useSelector(selectUser);

  return (
    <section className="profile">
      {userProfile ? (
        <div className={style.container}>
          <div className={style.img}>
            <img src={userProfile.photoURL} alt="User avatar" crossOrigin="anonymous" />
          </div>
          <div className={style.name}>
            <h4>{userProfile.displayName}</h4>
          </div>
          <div className={style.mail}>
            <p>{userProfile.email}</p>
          </div>
          <div className={style.balance}>
            <span>Free Request:</span>
            <span>{userProfile.freeRequest}</span>
            <span>Wallet Balance:</span>
            <span>{userProfile.walletBalance}</span>
          </div>
        </div>
      ) : (
        <h3 className={style.layout}>Here will be profile information after Sign In</h3>
      )}
    </section>
  );
};

export default Profile;
