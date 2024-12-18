import React from 'react';
import Layout from './components/layouts/Layout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Facilities from './pages/Facilities';
import Spaces from './pages/Spaces';

const App = () => {
  return (
    
      <Routes>
        {/* Layout component will wrap all pages */}
        <Route path="/" element={<Layout />}>
          {/* Define routes for different sections */}
          <Route path="facilities" element={<Facilities />} />
          <Route path="spaces" element={<Spaces />} />
        </Route>
      </Routes>
  );
};

export default App;
