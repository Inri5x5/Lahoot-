import * as React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import Apihelp from '../config.json';
import { APICall } from '../apiCall.js';

function DashboardTopNavBar () {
  const navigate = useNavigate();

  const userLogout = async () => {
    try {
      // console.log(localStorage.getItem('token'))
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token').toString()}`,
      }
      const data = await APICall(null, '/admin/auth/logout', 'POST', headers);
      if (data.error) {
        throw new Error(data.error)
      }
      localStorage.removeItem('token')
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ background: '#2E3B55' }} position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BigBrain
          </Typography>
          <Button color="inherit" onClick={userLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default DashboardTopNavBar;
