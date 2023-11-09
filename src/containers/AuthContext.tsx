import React, { createContext, useState, ReactNode } from 'react';
import firebaseAuth from '@/services/firebaseAuth';
import { UserInfo } from 'firebase/auth/cordova';

interface AuthContextProps {
  isAuth: boolean;
  profile: UserInfo | null;
  setUser: () => void;
  deleteUser: () => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [profile, setProfile] = useState<UserInfo | null>(null);

  const setUser = async () => {
    const user = await firebaseAuth.logIn();

    if (!user) {
      alert("Authorization error, open the developer console for more details");
      return;
    }
    setProfile(user);
    setIsAuth(true);
  };

  const deleteUser = async () => {
    setProfile(null);
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, profile, setUser, deleteUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;