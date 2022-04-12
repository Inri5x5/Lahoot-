import { Box } from '@mui/system';
import React from 'react';
import DasboardNavBar from '../components/DashboardTopNavBar';
import DashLeftNavBar from '../components/DashLeftNavBar';
// import { APICall } from '../apiCall.js';

function Dashboard () {
  return (
    <Box>
      <DasboardNavBar></DasboardNavBar>
      <DashLeftNavBar></DashLeftNavBar>
    </Box>
  );
}

export default Dashboard;
