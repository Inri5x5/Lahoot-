import { Box } from '@mui/system';
import React from 'react';
import DashboardNav from '../components/DashboardNav';

function Dashboard () {
  return (<>
    <Box sx={{ display: 'flex' }}>
      <DashboardNav></DashboardNav>
      <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 10 }}>
        <div>game game</div>
      </Box>
    </Box>
  </>
  );
}

export default Dashboard;
