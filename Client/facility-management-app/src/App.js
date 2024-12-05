import React from 'react';
import Layout from './components/layouts/Layout';

const App = () => {
  return (
    <Layout>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h2>Welcome to My React App</h2>
        <p>This is the content of the home page.</p>
      </div>
    </Layout>
  );
};

export default App;
