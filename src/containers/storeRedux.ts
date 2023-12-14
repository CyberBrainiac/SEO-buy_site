import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import toolsReducer from './reducers/toolsSlice';
import inputDataReducer from './reducers/inputDataSlice';

const storeRedux = configureStore({
  reducer: {
    user: userReducer,
    tools: toolsReducer,
    inputData: inputDataReducer,
  },
});

export default storeRedux;
export type RootState = ReturnType<typeof storeRedux.getState>;
