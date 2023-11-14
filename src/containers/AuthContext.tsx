/**Vite HMR error with useContext */
/**Create Context is root of the problem*/
/**Solve issue https://github.com/vitejs/vite/issues/3301#issuecomment-1080030773*/

import { createContext } from 'react';
import { UserInfo } from 'firebase/auth/cordova';
import { UserProjProfl } from '@/services/fireStore';

interface AuthContextProps {
  isAuth: boolean;
  googleProfl: UserInfo | null;
  projProfl: UserProjProfl | null;
  setUser: () => void;
  deleteUser: () => void;
}

const initialProps = {
  isAuth: false,
  googleProfl: null,
  projProfl: null,
  setUser: () => {},
  deleteUser: () => {},
};

export const AuthContext = createContext<AuthContextProps>(initialProps);
