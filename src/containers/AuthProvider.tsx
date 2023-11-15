import React, { useState, ReactNode, useEffect } from 'react';
import { UserInfo } from 'firebase/auth/cordova';
import firebaseAuth from '@/services/fireAuth';
import { AuthContext } from './AuthContext';
import fireStore, { UserProjProfl } from '@/services/fireStore';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/services/config/firebase';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [googleProfl, setGoogleProfl] = useState<UserInfo | null>(null);
  const [projProfl, setProjProfl] = useState<UserProjProfl | null>(null);

  //
  const setUser = async () => {
    const user = await firebaseAuth.logIn();

    if (!user) {
      alert('Authorization error, open the developer console for more details');
      return;
    }

    setGoogleProfl(user);
    setIsAuth(true);

    const isCustomer = await fireStore.isUserExist(user.uid);
    if (!isCustomer) {
      fireStore.createUser(user);
    }

    const profl = await fireStore.getProjProfl(user.uid);
    if (!user) {
      alert('Get profile error, open the developer console for more details');
      return;
    }
    setProjProfl(profl);
  };

  //
  const deleteUser = async () => {
    setGoogleProfl(null);
    setProjProfl(null);
    setIsAuth(false);
  };

  //Subscribe to user profile for realtime update
  useEffect(() => {
    if (googleProfl) {
      const userProjRef = collection(db, 'users', googleProfl.uid, 'projProfl');
      const unsubscribe = onSnapshot(userProjRef, querySnapshot => {
        const userProjProfls: UserProjProfl[] = [];

        querySnapshot.forEach(doc => {
          const data = doc.data() as UserProjProfl;
          userProjProfls.push(data);
        });
        setProjProfl(userProjProfls[0]);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [googleProfl]);

  return (
    <AuthContext.Provider value={{ isAuth, googleProfl, projProfl, setUser, deleteUser }}>
      {children}
    </AuthContext.Provider>
  );
};
