/**Vite HMR error with useContext */
/**Create Context is root of the problem*/
/**Solve issue https://github.com/vitejs/vite/issues/3301#issuecomment-1080030773*/

import { createContext } from 'react';
import { UserInfo } from 'firebase/auth/cordova';

interface AuthContextProps {
  isAuth: boolean;
  googleProf: UserInfo | null;
  projProf: null;
  setUser: () => void;
  deleteUser: () => void;
}

const initialProps = {
  isAuth: false,
  googleProf: null,
  projProf: null,
  setUser: () => {},
  deleteUser: () => {},
};

export const AuthContext = createContext<AuthContextProps>(initialProps);
