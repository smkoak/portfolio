import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../Home';
import SignIn from 'pages/SignIn';
import PortfolioWrite from 'pages/Portfolio/Write';

interface Props {
  isAuthenticated: boolean;
}

function Router({ isAuthenticated }: Props): JSX.Element {
  return (
    <>
      {!isAuthenticated ? (
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="*" element={<Home />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="*" element={<Home />}></Route>
          <Route path="/portfolio/write" element={<PortfolioWrite />}></Route>
        </Routes>
      )}
    </>
  );
}

export default Router;
