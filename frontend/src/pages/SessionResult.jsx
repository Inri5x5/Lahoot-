import React from 'react';
import DashboardNav from '../components/DashboardNav';
import {
  Box,
  TableContainer
} from '@mui/material';
import { APICall } from '../helper-func.js';
import { useParams } from 'react-router-dom';

export default function SessionResult () {
  const [res, setResult] = React.useState([]);
  const { sessionId } = useParams();

  const getResult = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token').toString()}`,
      };
      const data = await APICall(null, `/admin/session/${sessionId}/results`, 'GET', headers);
      if (data.error) {
        throw new Error(data.error);
      }
      // console.log(data)
      setResult(data.results);
    } catch (err) {
      console.log(err);
    }
  }

  React.useEffect(() => {
    getResult();
    console.log(res)
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <DashboardNav></DashboardNav>
      <div>
        <TableContainer>
        </TableContainer>
      </div>
    </Box>
  )
}
