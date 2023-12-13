import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { UserProfile } from '@/services/fireStore';
import { RootState } from '../storeRedux';
import locStorage, { locKeys } from '@/utils/localStorage';
import { ExcelDataType } from '@/pages/thematIndex/fileExcel';

interface InitialState {
  profile: UserProfile | undefined;
  excelData: ExcelDataType | undefined;
}

const userAdapter = createEntityAdapter();

const initialState: InitialState = userAdapter.getInitialState({
  profile: undefined,
  excelData: undefined,
});

// const initialState: InitialState = {
//   profile: undefined,
//   urls: [],
// };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    deleteUserProfl(state) {
      state.profile = undefined;
      state.entities = [];
    },
    setUrls(state, action) {
      state.urls = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(setUserProfl.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
  },
});

export const { setUrls } = userSlice.actions;
export default userSlice.reducer;

/** Selectors */
export const selectUser = (state: RootState) => state.user.profile;
export const selectUrls = (state: RootState) => state.user.urls;

/** Thunk functions */
export const setUserProfl = createAsyncThunk('user/setUserProfl', async profile => {
  if (typeof profile !== "object") {
    console.error("only object can be sent to local storage")
    return;
  }
  await locStorage.set(locKeys.userProfl, profile);
  return profile;
});

export const deleteUserProfl = () => {
  const { deleteUserProfl: actionCreatorDeleteUserProfl } = userSlice.actions;

  //delete user information from localStorage
  localStorage.clear();
  return actionCreatorDeleteUserProfl;
};