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
}

const inputDataAdapter = createEntityAdapter();
const initialState = inputDataAdapter.getInitialState();

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
    });
  },
});

export default inputDataSlice.reducer;

/** Selectors */
// export const selectEntity = (state: AppRootState) => state.inputData.entities;

export const { selectAll: selectInputData, selectById: selectInputDataById } = inputDataAdapter.getSelectors<AppRootState>(state => state.inputData)

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
  await localStorage.removeItem(locKeys.inputData);
});