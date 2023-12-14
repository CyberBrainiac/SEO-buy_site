import React, { ReactNode, useEffect, useState } from 'react';
import firebaseAuth from '@/services/fireAuth';
import fireStore, { UserProfile } from '@/services/fireStore';
import { db } from '@/services/config/firebase';
import { doc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import AuthError from '@/utils/errorHandlers/authError';
import locStorage, { locKeys } from '@/utils/localStorage';
import { UserInfo } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { deleteUserProfl, setUserProfl, modifyUserProfl } from '../containers/reducers/userSlice';
import { AuthContext, AuthenticationArg } from './AuthContext';
import { removeInputData } from './reducers/inputDataSlice';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useDispatch();
  const [acc, setAcc] = useState<UserProfile | undefined>(undefined);

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

  async function handleAuth(user: UserInfo | undefined): Promise<UserProfile | undefined> {
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

    if (isCustomer) {
      modifyUserLogin(userProfl);
    }

    dispatch(setUserProfl(userProfl));
    setAcc(userProfl);
    return userProfl;
  }

  //
  const deleteUser = async () => {
    await dispatch(deleteUserProfl()); //if delete User Profl is async function
    await dispatch(removeInputData());
    setAcc(undefined);
    return await firebaseAuth.logOut();
  };

  //Modify login time and set free request
  function modifyUserLogin(userProfile: UserProfile) {
    const lastLoginDate = new Date(userProfile.lastLogIn.seconds * 1000); //*1000 because new Date() create timestamp from millisecond value
    const dayInMillSec = 86400000;
    let freeRequest = userProfile.freeRequest;

    //take user additional free request
    if (Date.now() - lastLoginDate.getTime() >= dayInMillSec) {
      freeRequest = 20;
    }

    //Update lastLogIn every time user interact with site
    fireStore.modifyUser(userProfile.uid, {
      freeRequest: freeRequest,
      lastLogIn: serverTimestamp(),
    });
  }

  useEffect(() => {
    //get user Profile from Local Storage
    const savedUserProfile = locStorage.get(locKeys.userProfl);
    console.log('TRIGGER USE-EFFECT');

    if (acc || savedUserProfile) {
      if (savedUserProfile) {
        dispatch(setUserProfl(savedUserProfile));
      }

      // Subscribe to user profile for realtime update
      const userId = acc?.uid || savedUserProfile?.uid;
      const userProflRef = doc(db, 'users', userId);
      const unsubscribe = onSnapshot(userProflRef, querySnapshot => {
        const updateUserProfl = querySnapshot.data();
        if (!updateUserProfl) return;
        dispatch(modifyUserProfl(updateUserProfl));
      });

      return () => {
        unsubscribe();
      };
    }
  }, [acc, dispatch]);

  return <AuthContext.Provider value={{ setUser, deleteUser }}>{children}</AuthContext.Provider>;
};
