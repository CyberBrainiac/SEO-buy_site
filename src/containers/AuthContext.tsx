/**Vite HMR error with useContext */
/**Create Context is root of the problem*/
/**Solve issue https://github.com/vitejs/vite/issues/3301#issuecomment-1080030773*/

import { createContext } from 'react';
import { UserProfl } from '@/services/fireStore';

interface AuthContextProps {
  userProfl: UserProfl | null;
  setUser: () => void;
  deleteUser: () => void;
}

const initialProps = {
  userProfl: null,
  setUser: () => {},
  deleteUser: () => {},
};

export const AuthContext = createContext<AuthContextProps>(initialProps);
