import React, { useState, ReactNode } from 'react';
import { UserInfo } from 'firebase/auth/cordova';
import firebaseAuth from '@/services/fireAuth';
import { AuthContext } from './AuthContext';
import fireStore from '@/services/fireStore';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [googleProfl, setGoogleProfl] = useState<UserInfo | null>(null);
  const [projProfl, setProjProfl] = useState<null>(null);

  //
  const setUser = async () => {
    const user = await firebaseAuth.logIn();

    if (!user) {
      alert('Authorization error, open the developer console for more details');
      return;
    }
    setGoogleProfl(user);

    setProjProfl(null);
    setIsAuth(true);

    const isCustomer = await fireStore.isUserExist(user.uid);
    if (!isCustomer) {
      fireStore.createUser(user);
    }
  };

  //
  const deleteUser = async () => {
    setGoogleProfl(null);
    setProjProfl(null);
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, googleProfl, projProfl, setUser, deleteUser }}>
      {children}
    </AuthContext.Provider>
  );
};
