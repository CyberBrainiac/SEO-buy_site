import { createSlice } from '@reduxjs/toolkit/react';
import { UserProfl } from '@/services/fireStore';

interface InitialState {
  user: UserProfl | undefined;
  urls: object[]; //entities??
}

const initialState: InitialState = {
  user: undefined,
  urls: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    deleteUser(state) {
      state.user = undefined;
    },
    setUrls(state, action) {
      state.urls = action.payload;
    },
  },
});

export const { setUser, deleteUser, setUrls } = userSlice.actions;
export default userSlice.reducer;
