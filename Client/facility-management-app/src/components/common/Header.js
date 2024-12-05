// src/components/Header.js
import React from 'react';
import { Box } from '@mui/material';

const Header = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        padding: '15px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        borderBottom: '1px solid #ddd',
        marginLeft: '20px',
        marginRight: '20px',
        borderRadius: '20px 20px 20px 20px',
      }}
    >
      <h1>Facility Management</h1>
    </Box>
  );
};

export default Header;
