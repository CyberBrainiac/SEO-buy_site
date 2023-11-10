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
  const [googleProf, setGoogleProf] = useState<UserInfo | null>(null);
  const [projProf, setProjProf] = useState<null>(null);

  //
  const setUser = async () => {
    const user = await firebaseAuth.logIn();

    if (!user) {
      alert('Authorization error, open the developer console for more details');
      return;
    }
    setGoogleProf(user);

    setProjProf(null);
    setIsAuth(true);

    const isCustomer = await fireStore.isUserExist(user.uid);
    if (!isCustomer) {
      fireStore.createUser(user);
    }
  };

  //
  const deleteUser = async () => {
    setGoogleProf(null);
    setProjProf(null);
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, googleProf, projProf, setUser, deleteUser }}>
      {children}
    </AuthContext.Provider>
  );
};
