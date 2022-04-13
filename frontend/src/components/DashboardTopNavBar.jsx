import * as React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function DashboardTopNavBar () {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ background: '#2E3B55' }} position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={ () => { navigate('/dashboard') }}>
            BigBrain
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default DashboardTopNavBar;
