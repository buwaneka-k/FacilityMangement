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
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import { grey } from '@mui/material/colors';
import { Link } from 'react-router-dom';

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
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Box sx={{ color: 'white', marginBottom: '30px', textAlign: 'center' }}>
            <h3>Menu</h3>
          </Box>
        </Link>

        <Divider sx={{
          flexShrink: '0',
          borderTop: '0px solid rgba(0, 0, 0, 0.08)',
          borderRight: '0px solid rgba(0, 0, 0, 0.08)',
          borderLeft: '0px solid rgba(0, 0, 0, 0.08)',
          height: '0.0625rem',
          margin: '1rem 0px',
          borderBottom: 'none',
          opacity: '0.25',
          backgroundColor: 'transparent',
          backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0), rgb(255, 255, 255), rgba(255, 255, 255, 0)) !important'
        }}></Divider>
        <Link to="/facilities" style={{ textDecoration: 'none' }}>
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
        </Link>
        <Link to="/spaces" style={{ textDecoration: 'none' }}>
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
        </Link>
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
            <BedroomParentIcon />
          </ListItemIcon>
          <ListItemText primary="Asset" />
        </MenuItem>
      </List>
    </Box>
  );
};

export default Menu;
