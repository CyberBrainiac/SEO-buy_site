import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserProfile } from '@/services/fireStore';
import { RootState } from '../storeRedux';
import locStorage, { locKeys } from '@/utils/localStorage';

interface InitialState {
  profile: UserProfile | undefined;
}

const initialState: InitialState = {
  profile: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    deleteUserProfl(state) {
      state.profile = undefined;
    },
    modifyUserProfl(state, action) {
      if (!state.profile) return;
      state.profile = Object.assign(state.profile, action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(setUserProfl.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
  },
});

export const { modifyUserProfl } = userSlice.actions;
export default userSlice.reducer;

/** Selectors */
export const selectUser = (state: RootState) => state.user.profile;

/** Thunk functions */
export const setUserProfl = createAsyncThunk('user/setUserProfl', async profile => {
  if (typeof profile !== 'object') {
    console.error('only object can be sent to local storage');
    return;
  }
  await locStorage.set(locKeys.userProfl, profile);
  return profile;
});

export const deleteUserProfl = () => {
  const { deleteUserProfl: actionCreatorDeleteUserProfl } = userSlice.actions;

  localStorage.removeItem(locKeys.userProfl);
  return actionCreatorDeleteUserProfl();
};
