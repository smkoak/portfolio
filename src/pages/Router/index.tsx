import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../Home';
import SignIn from 'pages/SignIn';
import PortfolioWrite from 'pages/Portfolio/Write';

function Router(): JSX.Element {
  //   const [isAuth, setIsAuth] = useState<boolean>(false);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="*" element={<Home />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/portfolio/write" element={<PortfolioWrite />}></Route>
      </Routes>
    </>
  );
}

export default Router;