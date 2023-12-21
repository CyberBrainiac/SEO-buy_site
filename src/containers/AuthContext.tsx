/**Vite HMR error with useContext */
/**Create Context is root of the problem*/
/**Solve issue https://github.com/vitejs/vite/issues/3301#issuecomment-1080030773*/

import { createContext } from 'react';
import { UserProfile } from '@/services/fireStore';

export type AuthenticationArg = 'Google' | 'Facebook';

interface AuthContextProps {
  setUser: (provider: AuthenticationArg) => Promise<UserProfile | undefined>;
  deleteUser: () => Promise<boolean>;
}

const initialProps = {
  setUser: async () => {
    return undefined;
  },
  deleteUser: async () => {
    return false;
  },
};

export const AuthContext = createContext<AuthContextProps>(initialProps);
