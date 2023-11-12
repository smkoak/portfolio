import React from 'react';
import Router from 'pages/Router';
import Layout from 'components/Layout';

function App(): JSX.Element {
  return (
    <>
      <Layout>
        <Router />
      </Layout>
    </>
  );
}

export default App;
