import React, { useContext, useRef } from 'react';
import {
  createHashRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import ErrorPage from './pages/errorPage/ErrorPage';
import RootLayout from './components/layout/RootLayout';
import Home from './pages/home/Home';
import ThematicityIndex from './pages/thematIndex/ThematicityIndex';
import locStorage, { locKeys } from './utils/localStorage';
import { addInputData, InputData, setFileName } from './containers/reducers/inputDataSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './containers/storeRedux';
import {
  ExcelColumnInfoType,
  setExcelColumnInfo,
  setRequestIndexThematicity,
  setRequestLinkInsertion,
} from './containers/reducers/toolsSlice';
import LinkInsertion from './pages/linkInsert/LinkInsertion';
import fireStore, { UserProfile } from './services/fireStore';
import { AuthContext } from './containers/AuthContext';
import Profile from './pages/profile/Profile';
import ContactUs from './pages/contactUs/ContactUs';

const App: React.FC = () => {
  const dispatch = useDispatch() as AppDispatch;
  const { setAuthentication } = useContext(AuthContext);
  const firstLoad = useRef(true);

  //Layout preloader
  async function loadSavedData() {
    /** This error handler is VERY! IMPORTANT!
     *  If error occurs in this loader, the application crashed without any information
     * */
    try {
      const savedUserProfile = (await locStorage.get(locKeys.userProfl)) as UserProfile;

      if (savedUserProfile) {
        setAuthentication(savedUserProfile);
        fireStore.modifyFreeRequest(savedUserProfile.uid);
      }

      const promiseTuple = [
        locStorage.get(locKeys.inputData),
        locStorage.get(locKeys.fileName),
        locStorage.get(locKeys.excelColumnInfo),
        locStorage.get(locKeys.indexThematicityRequest),
        locStorage.get(locKeys.linkInsertionRequest),
      ];

      Promise.all(promiseTuple)
        .then(resArr => {
          const [urls, fileName, excelColumnInfo, requestIndxT, requestLinkIns] = resArr;

          if (urls) dispatch(addInputData(urls as InputData[]));
          if (fileName) dispatch(setFileName(fileName as string));
          if (excelColumnInfo) dispatch(setExcelColumnInfo(excelColumnInfo as ExcelColumnInfoType));
          if (requestIndxT) dispatch(setRequestIndexThematicity(requestIndxT as string));
          if (requestLinkIns) dispatch(setRequestLinkInsertion(requestLinkIns as string));
        })
        .catch(err => console.error(err));
    } catch (error) {
      console.error(error);
    }
    return true;
  }

  //
  const router = createHashRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={<RootLayout />}
        errorElement={<ErrorPage />}
        loader={() => {
          if (firstLoad.current) {
            firstLoad.current = false;
            loadSavedData();
          }
          return false;
        }}
      >
        <Route index element={<Home />} />
        <Route path="/tools/thematicity-index" element={<ThematicityIndex />} />
        <Route path="/tools/link-insertion" element={<LinkInsertion />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
