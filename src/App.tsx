import React, { useEffect, useState } from 'react';
import Router from 'pages/Router';
import Layout from 'components/Layout';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from 'firebaseApp';
import Loader from 'components/Loader';
import 'style/common.scss';

function App(): JSX.Element {
  const auth = getAuth(app);
  const [init, setInit] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !(auth?.currentUser == null),
  );

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user != null) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setInit(true);
    });
  }, [auth]);

  return (
    <>
      <Layout>
        {init ? <Router isAuthenticated={isAuthenticated} /> : <Loader />}
      </Layout>
    </>
  );
}

export default App;
