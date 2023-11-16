import React, { useState, ReactNode, useEffect } from 'react';
import firebaseAuth from '@/services/fireAuth';
import { AuthContext } from './AuthContext';
import fireStore, { UserProfl } from '@/services/fireStore';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/services/config/firebase';
import { UserInfo } from 'firebase/auth';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userProfl, setUserProfl] = useState<UserProfl | null>(null);
  const [acc, setAcc] = useState<UserInfo | null>(null);

  //
  const setUser = async () => {
    const user = await firebaseAuth.logIn();
    if (!user) {
      alert('Authorization error, open the developer console for more details');
      setAcc(null);
      return;
    }

    setAcc(user);
    const isCustomer = await fireStore.isUserExist(user.uid);

    if (!isCustomer) {
      fireStore.createUser(user);
    }

    const userProfl = await fireStore.getUserProfl(user.uid);
    setUserProfl(userProfl);
  };

  //
  const deleteUser = async () => {
    setUserProfl(null);
    firebaseAuth.logOut();
  };

  // Subscribe to user profile for realtime update
  useEffect(() => {
    if (acc) {
      const userProflRef = doc(db, 'users', acc.uid);
      const unsubscribe = onSnapshot(userProflRef, querySnapshot => {
        const updateUserProfl = querySnapshot.data();

        if (!updateUserProfl) {
          setUserProfl(null);
          return;
        }
        setUserProfl(updateUserProfl as UserProfl);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [acc]);

  return (
    <AuthContext.Provider value={{ userProfl, setUser, deleteUser }}>
      {children}
    </AuthContext.Provider>
  );
};
