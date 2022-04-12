import { Box } from '@mui/system';
import React from 'react';
import DashboardNav from '../components/DashboardNav';
import ActionAreaCard from '../components/GameCardList';
import { useNavigate } from 'react-router-dom';

function Dashboard () {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  React.useEffect(() => {
    if (!token) {
      navigate('/');
    }
  });
  return (<>
    <Box sx={{ display: 'flex' }}>
      <DashboardNav></DashboardNav>
      <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 10 }}>
        <ActionAreaCard></ActionAreaCard>
      </Box>
    </Box>
  </>
  );
}

export default Dashboard;
