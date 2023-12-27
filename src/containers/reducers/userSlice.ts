import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserProfile } from '@/services/fireStore';
import { AppGetState, AppRootState } from '../storeRedux';
import locStorage, { locKeys } from '@/utils/localStorage';

interface InitialState {
  profile: UserProfile | undefined;
  informMessage: string | undefined;
}

export interface ModifyProfileProps {
  displayName?: string;
  email?: string;
  phoneNumber?: string | null;
  photoURL?: string;
  freeRequest?: number;
  walletBalance?: number;
  allIndexCalculation?: number;
  lastLogIn?: number;
  whenFreebies?: number;
}

const initialState: InitialState = {
  profile: undefined,
  informMessage: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setInformMessage(state, action) {
      state.informMessage = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(setUserProfl.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
    builder.addCase(modifyUserProfl.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
    builder.addCase(deleteUserProfl.fulfilled, state => {
      state.profile = undefined;
    });
  },
});

export const { setInformMessage } = userSlice.actions;
export default userSlice.reducer;

/** Selectors */
export const selectUser = (state: AppRootState) => state.user.profile;
export const selectInformMessage = (state: AppRootState) => state.user.informMessage;

/** Thunk functions */

export const setUserProfl = createAsyncThunk('user/setUserProfl', async (profile: UserProfile) => {
  await locStorage.set(locKeys.userProfl, profile);
  return profile;
});

export const modifyUserProfl = createAsyncThunk(
  'user/modifyUserProfl',
  async (modifyProfile: ModifyProfileProps, thunkAPI) => {
    console.log('Modify User Profile', modifyProfile);
    const getState = thunkAPI.getState as AppGetState;
    const state = getState();
    const userProfile = { ...state.user.profile }; //clone user

    if (!userProfile) {
      console.error('Unexpected Error: modifyUserProfl get undefined from AppState');
      return undefined;
    }

    const modifiedUserProfile = Object.assign({}, userProfile, modifyProfile);

    return modifiedUserProfile as UserProfile;
  }
);

//
export const deleteUserProfl = createAsyncThunk('user/deleteUserProfl', async () => {
  await localStorage.removeItem(locKeys.userProfl);
});
