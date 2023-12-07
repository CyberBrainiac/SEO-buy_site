import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux';
import storeRedux from './containers/storeRedux.ts';
import { AuthProvider } from './containers/AuthProvider.tsx';
import './assets/style/myReset.css';
import './assets/style/global.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={storeRedux}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
