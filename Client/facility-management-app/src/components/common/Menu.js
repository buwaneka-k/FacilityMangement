// src/components/Menu.js
import React from 'react';
import {
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  Box,
  List,
  ListItem,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TableChartIcon from '@mui/icons-material/TableChart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { grey } from '@mui/material/colors';

const Menu = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '250px',
        height: '100vh',
        backgroundColor: '#2C2C2C',
        borderRadius: '10px 10px 10px 10px', // Rounded corners
        boxShadow: 3,
        margin: 1,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        zIndex: 100, // Add shadow to make the menu look elevated
      }}
    >
      <List sx={{ paddingTop: '20px' }}>
        <Box sx={{ color: 'white', marginBottom: '30px', textAlign: 'center' }}>
          <h3>Menu</h3>
        </Box>
        <MenuItem
          sx={{
            margin: '10px',
            color: 'white',
            fontSize: '16px',
            height: '50px',
            '&:hover': {
              backgroundColor: grey[700], // Change background color on hover
              color: 'white',
              borderRadius: '10px 10px 10px 10px', // Change text color on hover
            },
          }}
        >
          <ListItemIcon sx={{ color: 'white' }}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Facility" />
        </MenuItem>
        <MenuItem
          sx={{
            margin: '10px',
            color: 'white',
            fontSize: '16px',
            height: '50px',
            '&:hover': {
              backgroundColor: grey[700], // Change background color on hover
              color: 'white',
              borderRadius: '10px 10px 10px 10px', // Change text color on hover
            },
          }}
        >
          <ListItemIcon sx={{ color: 'white' }}>
            <TableChartIcon />
          </ListItemIcon>
          <ListItemText primary="Space" />
        </MenuItem>
        <MenuItem
          sx={{
            margin: '10px',
            color: 'white',
            fontSize: '16px',
            height: '50px',
            '&:hover': {
              backgroundColor: grey[700], // Change background color on hover
              color: 'white',
              borderRadius: '10px 10px 10px 10px', // Change text color on hover
            },
          }}
        >
          <ListItemIcon sx={{ color: 'white' }}>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Asset" />
        </MenuItem>
      </List>
    </Box>
  );
};

export default Menu;
