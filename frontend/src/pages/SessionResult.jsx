import React from 'react';
import DashboardNav from '../components/DashboardNav';
import {
  Box
} from '@mui/material';
import { APICall } from '../helper-func.js';
import { useParams } from 'react-router-dom';

export default function SessionResult () {
  const [res, setResult] = React.useState({});
  const { sessionId } = useParams();

  const getResult = async () => {
    console.log(sessionId);
    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token').toString()}`,
      };
      const data = await APICall(null, `/admin/session/${sessionId}/results`, 'GET', headers);
      if (data.error) {
        throw new Error(data.error);
      }
      console.log(data)
      setResult(res);
    } catch (err) {
      console.log(err);
    }
  }

  React.useEffect(() => {
    getResult();
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <DashboardNav></DashboardNav>
    </Box>
  )
}
