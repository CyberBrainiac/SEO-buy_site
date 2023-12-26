import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import ErrorPage from './pages/errorPage/ErrorPage';
import RootLayout from './components/layout/RootLayout';
import Home from './pages/home/Home';
import ThematicityIndex from './pages/thematIndex/ThematicityIndex';
import locStorage, { locKeys } from './utils/localStorage';
import { addInputData } from './containers/reducers/inputDataSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './containers/storeRedux';
import {
  setExcelColumnInfo,
  setRequestIndexThematicity,
  setRequestLinkInsertion,
} from './containers/reducers/toolsSlice';
import LinkInsertion from './pages/linkInsert/LinkInsertion';

const App: React.FC = () => {
  const dispatch = useDispatch() as AppDispatch;

  //
  async function loadSavedData() {
    const urls = await locStorage.get(locKeys.inputData);

    if (urls) dispatch(addInputData(urls));
    const excelColumnInfo = await locStorage.get(locKeys.excelColumnInfo);

    if (excelColumnInfo) dispatch(setExcelColumnInfo(excelColumnInfo));
    const requestIndxT = await locStorage.get(locKeys.indexThematicityRequest);
    const unpackReqestIndxT = requestIndxT?.request;

    if (unpackReqestIndxT) dispatch(setRequestIndexThematicity(unpackReqestIndxT));
    const requestLinkIns = await locStorage.get(locKeys.linkInsertionRequest);
    const unpackRequestLinkIns = requestLinkIns?.request;

    if (unpackRequestLinkIns) dispatch(setRequestLinkInsertion(unpackRequestLinkIns));

    return { urls, excelColumnInfo, unpackReqestIndxT };
  }

  //
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />} loader={loadSavedData}>
        <Route index element={<Home />} />
        <Route path="/tools/thematicity-index" element={<ThematicityIndex />} />
        <Route path="/tools/link-insertion" element={<LinkInsertion />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
