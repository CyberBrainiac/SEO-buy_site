import { createSlice } from '@reduxjs/toolkit/react';

type ToolsStatusesValues = 'idle' | 'working' | 'succeeded' | 'failed';

interface LinkInsertionsProps {
  status: ToolsStatusesValues;
  request: string | undefined;
}
interface indexThematicityProps {
  status: ToolsStatusesValues;
  request: string | undefined;
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
    setRequestIndexThematicity(state, action) {
      state.indexThematicity.request = action.payload;
    },
  },
});

export const {
  setStatusLinkInsertions,
  setRequestLinkInsertions,
  setStatusIndexThematicity,
  setRequestIndexThematicity,
} = toolsSlice.actions;
export default toolsSlice.reducer;
