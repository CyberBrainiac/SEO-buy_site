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

const App: React.FC = () => {
  const dispatch = useDispatch() as AppDispatch;

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />} loader={async () => {
        const data = await locStorage.get(locKeys.inputData);
        dispatch(addInputData(data));
        return data;
      }}>
        <Route index element={<Home />} />
        <Route path="/tools/thematicity-index" element={<ThematicityIndex />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
