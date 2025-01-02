// src/components/Footer.js
import React from 'react';
import { Box } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        padding: '15px',
        boxShadow: '0 -4px 10px rgba(0, 0, 0, 0.1)',
        borderTop: '1px solid #ddd',
        textAlign: 'center',
        marginLeft: '20px',
        marginRight: '20px',
      }}
    >
      <p>Footer Content</p>
    </Box>
  );
};

export default Footer;
