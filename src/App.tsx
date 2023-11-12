import React, { useEffect, useState } from 'react';
import Router from 'pages/Router';
import Layout from 'components/Layout';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from 'firebaseApp';

function App(): JSX.Element {
  const auth = getAuth(app);
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
    });
  }, [auth]);

  return (
    <>
      <Layout>
        <Router isAuthenticated={isAuthenticated} />
      </Layout>
    </>
  );
}

export default App;
