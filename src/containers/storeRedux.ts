import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import toolsReducer from './reducers/toolsSlice';

const storeRedux = configureStore({
  reducer: {
    user: userReducer,
    tools: toolsReducer,
  },
});

export default storeRedux;
export type RootState = ReturnType<typeof storeRedux.getState>;
