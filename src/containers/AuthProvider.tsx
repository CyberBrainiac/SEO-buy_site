import React, { ReactNode, useEffect, useState } from 'react';
import firebaseAuth from '@/services/fireAuth';
import { AuthContext } from './AuthContext';
import fireStore, { userProfile } from '@/services/fireStore';
import { doc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from '@/services/config/firebase';
import AuthError from '@/utils/errorHandlers/authError';
import { UserInfo } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, deleteUserProfl, setUserProfl } from '../containers/reducers/userSlice';
import { AuthenticationArg } from './AuthContext';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useDispatch();
  const userProfile = useSelector(selectUser);
  const [acc, setAcc] = useState(undefined);

  //
  const setUser = async (provider: AuthenticationArg) => {
    switch (provider) {
      case 'Google': {
        const user = await firebaseAuth.logIn();
        return await handleAuth(user);
      }
      default: {
        console.error(new AuthError('Unknown authentication provider'));
        return undefined;
      }
    }
  };

  async function handleAuth(user: UserInfo | undefined): Promise<userProfile | undefined> {
    if (!user) {
      alert('Authorization error');
      return;
    }
    const isCustomer = await fireStore.isUserExist(user.uid);

    if (!isCustomer) {
      await fireStore.createUser(user);
    }
    const userProfl = await fireStore.getUserProfl(user.uid);

    if (!userProfl) {
      alert('Authorization error');
      return;
    }

    dispatch(setUserProfl(userProfl));
    modifyUser(userProfl);
    return userProfl;
  }

  //
  const deleteUser = async () => {
    dispatch(deleteUserProfl());
    await firebaseAuth.logOut();
    return true;
  };

  //Modify login time and set free request
  function modifyUser(userProfile: userProfile) {
    const lastLoginDate = new Date(userProfile.lastLogIn.seconds * 1000); //*1000 because new Date() create timestamp from millisecond value
    const dayInMillSec = 86400000;
    let freeRequest = userProfile.freeRequest;

    if (Date.now() - lastLoginDate.getTime() >= dayInMillSec) {
      freeRequest = 20;
    }

    //Update lastLogIn every time user interact with site
    fireStore.modifyUser(userProfile, {
      freeRequest: freeRequest,
      lastLogIn: serverTimestamp(),
    });
  }

  // Subscribe to user profile for realtime update
  useEffect(() => {
    if (userProfile) {
      console.log('Effect!');
      const userProflRef = doc(db, 'users', userProfile.uid);
      const unsubscribe = onSnapshot(userProflRef, querySnapshot => {
        const updateUserProfl = querySnapshot.data();
        if (!updateUserProfl) return;
        dispatch(setUserProfl(updateUserProfl));
      });

      return () => {
        unsubscribe();
      };
    }
  }, [userProfile, dispatch]);

  return <AuthContext.Provider value={{ setUser, deleteUser }}>{children}</AuthContext.Provider>;
};
