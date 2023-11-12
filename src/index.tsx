import React from 'react';
import ReactDOM from 'react-dom/client';
import 'style/common.scss';
import { BrowserRouter } from 'react-router-dom';
import { Reset } from 'styled-reset';
import App from './App';
import { AuthContextProvider } from 'context/AuthContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <AuthContextProvider>
    <BrowserRouter>
      <Reset />
      <App />
    </BrowserRouter>
  </AuthContextProvider>,
);
