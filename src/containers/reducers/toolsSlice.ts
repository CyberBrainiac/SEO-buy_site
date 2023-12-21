import { createAsyncThunk, createSlice } from '@reduxjs/toolkit/react';
import { AppRootState } from '../storeRedux';
import locStorage, { locKeys } from '@/utils/localStorage';

type ToolStatusValues = 'idle' | 'working' | 'succeeded' | 'failed';
export const toolStatusValues = {
  Idle: 'idle',
  Working: 'working',
  Succeeded: 'succeeded',
  Failed: 'failed',
};

export interface ExcelColumnInfoType {
  urlColumnIndex: number;
  thematicityColumnIndex: number;
  totalPageColumnIndex?: number;
}
interface LinkInsertionsProps {
  status: ToolStatusValues;
  request?: string;
}
interface indexThematicityProps {
  status: ToolStatusValues;
  request?: string;
  excelColumnInfo?: ExcelColumnInfoType;
}
interface InitialStateProps {
  linkInsertions: LinkInsertionsProps;
  indexThematicity: indexThematicityProps;
}

const initialState: InitialStateProps = {
  linkInsertions: {
    status: 'idle',
    request: undefined,
  },
  indexThematicity: {
    status: 'idle',
    request: undefined,
    excelColumnInfo: undefined,
  },
};

const toolsSlice = createSlice({
  name: 'tools',
  initialState,
  reducers: {
    setStatusLinkInsertions(state, action) {
      state.linkInsertions.status = action.payload;
    },
    setRequestLinkInsertions(state, action) {
      state.linkInsertions.request = action.payload;
    },
    setStatusIndexThematicity(state, action) {
      state.indexThematicity.status = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(setExcelColumnInfo.fulfilled, (state, action) => {
        state.indexThematicity.excelColumnInfo = action.payload;
      })
      .addCase(setRequestIndexThematicity.fulfilled, (state, action) => {
        state.indexThematicity.request = action.payload;
      });
  },
});

export const { setStatusLinkInsertions, setRequestLinkInsertions, setStatusIndexThematicity } =
  toolsSlice.actions;
export default toolsSlice.reducer;

/** Selectors */

export const selectExcelColumnInfo = (state: AppRootState) =>
  state.tools.indexThematicity.excelColumnInfo;
export const selectIndexThematicityRequest = (state: AppRootState) =>
  state.tools.indexThematicity.request;
export const selectIndexThematicityStatus = (state: AppRootState) =>
  state.tools.indexThematicity.status;

/** Thunk functions */

export const setExcelColumnInfo = createAsyncThunk(
  'tools/indexThematicity/setExcelColumnInfo',
  async (data: ExcelColumnInfoType) => {
    await locStorage.set(locKeys.excelColumnInfo, data);
    return data;
  }
);

export const setRequestIndexThematicity = createAsyncThunk(
  'tools/indexThematicity/setRequest',
  async (data: string) => {
    await locStorage.set(locKeys.indexThematicityRequest, { request: data });
    return data;
  }
);
