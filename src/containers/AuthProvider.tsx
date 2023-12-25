import React, { ReactNode, useEffect, useState } from 'react';
import firebaseAuth from '@/services/fireAuth';
import fireStore, {
  FirestoreUserProfile,
  UserProfile,
  serializeUserProfile,
} from '@/services/fireStore';
import { db } from '@/services/config/firebase';
import { Timestamp, doc, onSnapshot } from 'firebase/firestore';
import AuthError from '@/utils/errorHandlers/authError';
import locStorage, { locKeys } from '@/utils/localStorage';
import { UserInfo } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { deleteUserProfl, setUserProfl } from '../containers/reducers/userSlice';
import { AuthContext, AuthenticationArg } from './AuthContext';
import { removeInputData } from './reducers/inputDataSlice';
import { AppDispatch } from './storeRedux';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useDispatch() as AppDispatch;
  const [authentication, setAuthentication] = useState<UserProfile | undefined>(undefined);

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
    const FirestoreUserProfile = await fireStore.getUserProfl(user.uid);

    if (!FirestoreUserProfile) {
      alert('Authorization error');
      return;
    }
    const userProfl = serializeUserProfile(FirestoreUserProfile);

    if (isCustomer) {
      modifyUserLogin(userProfl.uid);
    }

    setAuthentication(userProfl);
    return userProfl;
  }

  //
  const deleteUser = async () => {
    dispatch(deleteUserProfl());
    dispatch(await removeInputData());
    setAuthentication(undefined);
    return await firebaseAuth.logOut();
  };

  //
  useEffect(() => {
    //get user Profile from Local Storage
    let savedUserProfile;

    if (!authentication) {
      savedUserProfile = locStorage.get(locKeys.userProfl);
    }

    if (authentication || savedUserProfile) {
      /* 
      Subscribe to user profile for realtime update
      Will be called each time after using 'modifyUserProfl' function 
      */

      const userId = authentication?.uid || savedUserProfile?.uid;
      const userProflRef = doc(db, 'users', userId);
      const unsubscribe = onSnapshot(userProflRef, querySnapshot => {
        const modifiedUserProfile = querySnapshot.data() as FirestoreUserProfile;
        if (!modifiedUserProfile) {
          console.error('onSnapshot returns unexpected value');
          return;
        }

        /**
         * in same situation, 'onSnapshot' return data 2 times, in 1 time serverTimestamp return 'null'! Why?
         */
        if (!modifiedUserProfile.lastLogIn) {
          //du to 2 renders
          console.log('too many request on Firebase');
          return;
        }

        const userProfile = serializeUserProfile(modifiedUserProfile);
        dispatch(setUserProfl(userProfile));
      });

      if (savedUserProfile) {
        modifyUserLogin(savedUserProfile.uid);
      }

      return () => {
        unsubscribe();
      };
    }
  }, [authentication, dispatch]);

  //Modify login time and set free request
  async function modifyUserLogin(uid: string) {
    const FirestoreUserProfile = await fireStore.getUserProfl(uid);

    if (!FirestoreUserProfile) {
      alert('Authorization error');
      return;
    }
    const userProfl = serializeUserProfile(FirestoreUserProfile);
    const dayInMillSec = 86400000;
    const lastLogIn = Timestamp.now();

    //take user additional free request
    if (Date.now() - userProfl.whenFreebies >= dayInMillSec) {
      return fireStore.modifyUser(userProfl.uid, {
        lastLogIn,
        freeRequest: 20,
        whenFreebies: Timestamp.now(),
      });
    }

    //Update lastLogIn every time user interact with site
    return fireStore.modifyUser(userProfl.uid, { lastLogIn });
  }

  return <AuthContext.Provider value={{ setUser, deleteUser }}>{children}</AuthContext.Provider>;
};
