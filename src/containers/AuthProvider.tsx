import React, { ReactNode, useEffect, useState } from 'react';
import firebaseAuth from '@/services/fireAuth';
import fireStore, {
  FirestoreUserProfile,
  UserProfile,
  serializeUserProfile,
} from '@/services/fireStore';
import { db } from '@/services/config/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import AuthError from '@/utils/errorHandlers/authError';
import { UserInfo } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { deleteUserProfl, setUserProfl } from '../containers/reducers/userSlice';
import { AuthContext, AuthenticationArg } from './AuthContext';
import { removeFileName, removeInputData } from './reducers/inputDataSlice';
import { AppDispatch } from './storeRedux';
import {
  deleteExcelColumnInfo,
  deleteRequestIndexThematicity,
  deleteRequestLinkInsertion,
} from './reducers/toolsSlice';

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
      await fireStore.modifyFreeRequest(userProfl.uid);
    }

    setAuthentication(userProfl);
    return userProfl;
  }

  //
  const deleteUser = async () => {
    const promiseTuple = [
      dispatch(deleteUserProfl()),
      dispatch(removeInputData()),
      dispatch(removeFileName()),
      dispatch(deleteRequestLinkInsertion()),
      dispatch(deleteRequestIndexThematicity()),
      dispatch(deleteExcelColumnInfo()),
    ];

    await Promise.all(promiseTuple);
    setAuthentication(undefined);
    return await firebaseAuth.logOut();
  };

  //
  useEffect(() => {
    //get user Profile from Local Storage
    if (authentication) {
      /* 
      Subscribe to user profile for realtime update
      Will be called each time after using 'modifyUserProfl' function 
      */

      const userId = authentication.uid;
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

      return () => {
        unsubscribe();
      };
    }
  }, [authentication, dispatch]);

  return (
    <AuthContext.Provider value={{ setUser, deleteUser, setAuthentication }}>
      {children}
    </AuthContext.Provider>
  );
};
