import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserProfile, FireTimestamp } from '@/services/fireStore';
import { RootState } from '../storeRedux';
import locStorage, { locKeys } from '@/utils/localStorage';

interface InitialState {
  profile: UserProfile | undefined;
}

interface ModifyProfileProps {
  displayName: string;
  email: string;
  phoneNumber: string | null;
  photoURL: string;
  freeRequest: number;
  walletBalance: number;
  allIndexCalculation: number;
  lastLogIn: FireTimestamp | number;
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
  },
  extraReducers: builder => {
    builder
      .addCase(setUserProfl.fulfilled, (state, action) => {
        state.profile = action.payload;
      });
  },
});

export default userSlice.reducer;

/** Selectors */
export const selectUser = (state: RootState) => state.user.profile;

/** Thunk functions */
export const setUserProfl = createAsyncThunk('user/setUserProfl', async profile => {
  if (typeof profile !== 'object') {
    console.error('only object can be sent to local storage');
    return;
  }


  
  profile.lastLogIn



  await locStorage.set(locKeys.userProfl, profile);
  return profile;
});

export function modifyUserProfl(modifyProfile: ModifyProfileProps) {
  //creates and returns the async thunk function:
  return async function saveNewTodoThunk(dispatch, getState: RootState) {
    const state = getState;
    const modifiedProfile = Object.assign({}, state.user.profile, modifyProfile);
    dispatch(setUserProfl(modifiedProfile))
  }
}

// export const modifyUserProfl = createAsyncThunk('user/modifyUserProfl', async modifyProfile => {
//   if (typeof modifyProfile !== 'object') {
//     console.error('only object can be sent to local storage');
//     return;
//   }
//   await locStorage.set(locKeys.userProfl, modifyProfile);
//   return modifyProfile;
// });

export const deleteUserProfl = () => {
  const { deleteUserProfl: actionCreatorDeleteUserProfl } = userSlice.actions;

  localStorage.removeItem(locKeys.userProfl);
  return actionCreatorDeleteUserProfl();
};
