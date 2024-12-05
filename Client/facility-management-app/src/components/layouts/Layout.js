// src/components/Layout.js
import React from 'react';
import { Box, Container } from '@mui/material';
import Menu from '../common/Menu';
import Header from '../common/Header';
import Footer from '../common/Footer';

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* Menu on the left */}
      <Menu />

      {/* Main content section */}
      <Box
        sx={{
          marginLeft: '250px', // To make room for the fixed menu
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh', // Ensures full height of the viewport
        }}
      >
        {/* Scrollable container for header, content, and footer */}
        <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
          {/* Header */}
          <Header />

          {/* Main Content */}
          <Box
            sx={{
              backgroundColor: '#fff',
              padding: '15px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              borderBottom: '1px solid #ddd',
              marginLeft: '20px',
              marginRight: '20px',
              marginTop:'20px',
              borderRadius: '0.75rem',
            }}
          >
            {children}
          </Box>
          <Footer />
        </Box>

        {/* Footer */}
      </Box>
    </Box>
  );
};

export default Layout;
