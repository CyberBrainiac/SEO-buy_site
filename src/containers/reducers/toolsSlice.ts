import { createAsyncThunk, createSlice } from '@reduxjs/toolkit/react';
import { AppRootState } from '../storeRedux';
import locStorage, { locKeys } from '@/utils/localStorage';

type ToolStatusValues = 'idle' | 'working' | 'succeeded' | 'failed';
export type ToolsName = 'LinkInsertion' | 'IndexThematicity';

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
interface LinkInsertionProps {
  status: ToolStatusValues;
  request?: string;
}
interface IndexThematicityProps {
  status: ToolStatusValues;
  request?: string;
  excelColumnInfo?: ExcelColumnInfoType;
}
interface InitialStateProps {
  linkInsertion: LinkInsertionProps;
  indexThematicity: IndexThematicityProps;
}

const initialState: InitialStateProps = {
  linkInsertion: {
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
    setStatusLinkInsertion(state, action) {
      state.linkInsertion.status = action.payload;
    },
    setStatusIndexThematicity(state, action) {
      state.indexThematicity.status = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(setRequestLinkInsertion.fulfilled, (state, action) => {
        state.linkInsertion.request = action.payload;
      })
      .addCase(deleteRequestLinkInsertion.fulfilled, state => {
        state.linkInsertion.request = undefined;
      })
      .addCase(setExcelColumnInfo.fulfilled, (state, action) => {
        state.indexThematicity.excelColumnInfo = action.payload;
      })
      .addCase(setRequestIndexThematicity.fulfilled, (state, action) => {
        state.indexThematicity.request = action.payload;
      })
      .addCase(deleteRequestIndexThematicity.fulfilled, state => {
        state.indexThematicity.request = undefined;
      })
      .addCase(deleteExcelColumnInfo.fulfilled, state => {
        state.indexThematicity.excelColumnInfo = undefined;
      });
  },
});

export const { setStatusLinkInsertion, setStatusIndexThematicity } = toolsSlice.actions;
export default toolsSlice.reducer;

/** Selectors */

export const selectLinkInsertionStatus = (state: AppRootState) => state.tools.linkInsertion.status;
export const selectLinkInsertionRequest = (state: AppRootState) =>
  state.tools.linkInsertion.request;
export const selectExcelColumnInfo = (state: AppRootState) =>
  state.tools.indexThematicity.excelColumnInfo;
export const selectIndexThematicityRequest = (state: AppRootState) =>
  state.tools.indexThematicity.request;
export const selectIndexThematicityStatus = (state: AppRootState) =>
  state.tools.indexThematicity.status;

/** Thunk functions */

export const setRequestLinkInsertion = createAsyncThunk(
  'tools/linkInsertion/setRequest',
  async (data: string) => {
    await locStorage.set(locKeys.linkInsertionRequest, data);
    return data;
  }
);
export const deleteRequestLinkInsertion = createAsyncThunk(
  'deleteRequestLinkInsertion',
  async () => {
    await locStorage.remove(locKeys.linkInsertionRequest);
  }
);

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
    await locStorage.set(locKeys.indexThematicityRequest, data);
    return data;
  }
);
export const deleteRequestIndexThematicity = createAsyncThunk(
  'deleteRequestIndexThematicity',
  async () => {
    await locStorage.remove(locKeys.indexThematicityRequest);
  }
);
export const deleteExcelColumnInfo = createAsyncThunk('deleteExcelColumnInfo', async () => {
  await locStorage.remove(locKeys.excelColumnInfo);
});
