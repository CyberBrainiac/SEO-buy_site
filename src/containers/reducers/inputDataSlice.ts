import locStorage, { locKeys } from '@/utils/localStorage';
import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AppRootState } from '../storeRedux';

export type UrlArr = string[];

export interface InputData {
  id: number;
  url: string;
  totalPage?: number;
  targetPage?: number;
  thematicityIndex?: number;
  links?: string[];
}

const inputDataAdapter = createEntityAdapter();
const initialState = inputDataAdapter.getInitialState({
  fileName: '',
});

const inputDataSlice = createSlice({
  name: 'inputData',
  initialState: initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(addInputData.fulfilled, (state, action) => {
        inputDataAdapter.removeAll(state);
        inputDataAdapter.addMany(state, action.payload);
      })
      .addCase(removeInputData.fulfilled, state => {
        inputDataAdapter.removeAll(state);
      })
      .addCase(setFileName.fulfilled, (state, action) => {
        state.fileName = action.payload;
      })
      .addCase(removeFileName.fulfilled, state => {
        state.fileName = '';
      });
  },
});

export default inputDataSlice.reducer;

/** Selectors */
//selectAll automatically converts 'object' to 'arr' then returns state value
export const { selectAll: selectInputData, selectById: selectInputDataById } =
  inputDataAdapter.getSelectors<AppRootState>(state => state.inputData);
export const selectFileName = (state: AppRootState) => state.inputData.fileName;

/** Thunk functions */
export const addInputData = createAsyncThunk(
  'inputData/addInputData',
  async (inputData: InputData[] | UrlArr) => {
    const convertedInputData: InputData[] = [];

    for (let i = 0; i < inputData.length; i++) {
      const entity = inputData[i];

      if (typeof entity === 'string') {
        convertedInputData.push({
          id: i,
          url: entity,
        });
      }

      if (typeof entity === 'object') {
        convertedInputData.push(entity);
      }
      continue;
    }

    await locStorage.set(locKeys.inputData, convertedInputData);
    return convertedInputData;
  }
);
export const removeInputData = createAsyncThunk('inputData/removeInputData', async () => {
  await locStorage.remove(locKeys.inputData);
});

export const setFileName = createAsyncThunk('inputData/setFileName', async (name: string) => {
  await locStorage.set(locKeys.fileName, name);
  return name;
});
export const removeFileName = createAsyncThunk('inputData/removeFileName', async () => {
  await locStorage.remove(locKeys.fileName);
});
