import * as React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
} from '@mui/material';
import styles from '../styles/AuthNavBar.module.css'
import { useNavigate } from 'react-router-dom';

export default function AuthNavBar () {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ background: '#2E3B55' }} position="static">
        <Toolbar>
          <Typography className={styles.title} variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={ () => { navigate('/') }}>
            BigBrain
          </Typography>
          <Button color="inherit" onClick={ () => { navigate('/login') }}>Login</Button>
          <Button color="inherit" onClick={ () => { navigate('/register') }}>Register</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
