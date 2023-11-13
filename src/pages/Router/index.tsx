import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
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
          <Route path="/signin" element={<SignIn />}></Route>
          <Route
            path="/portfolio/write"
            element={<Navigate replace to="/signin" />}
          ></Route>
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="*" element={<Home />}></Route>
          <Route path="/signin" element={<Navigate replace to="/" />}></Route>
          <Route path="/portfolio/write" element={<PortfolioWrite />}></Route>
        </Routes>
      )}
    </>
  );
}

export default Router;
