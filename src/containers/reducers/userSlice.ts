import { createSlice } from '@reduxjs/toolkit/react';
import { userProfile } from '@/services/fireStore';
import { RootState } from '../storeRedux';

interface InitialState {
  profile: userProfile | undefined;
  urls: object[];
}

const initialState: InitialState = {
  profile: undefined,
  urls: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserProfl(state, action) {
      state.profile = action.payload;
    },
    deleteUserProfl(state) {
      state.profile = undefined;
    },
    setUrls(state, action) {
      state.urls = action.payload;
    },
  },
});

export const { setUserProfl, deleteUserProfl, setUrls } = userSlice.actions;
export default userSlice.reducer;

/** Selectors */
export const selectUser = (state: RootState) => state.user.profile;
export const selectUrls = (state: RootState) => state.user.urls;
