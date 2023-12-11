import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import toolsReducer from './reducers/toolsSlice';
import locStorage, { locKeys } from '@/utils/localStorage';

const preloadedState = {
  user: {
    profile: locStorage.get(locKeys.user),
    urls: [],
  },
};

const storeRedux = configureStore({
  reducer: {
    user: userReducer,
    tools: toolsReducer,
  },
  preloadedState,
});

export default storeRedux;
export type RootState = ReturnType<typeof storeRedux.getState>;
