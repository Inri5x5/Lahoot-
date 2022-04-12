import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/HomePage.module.css'
import logo from '../assets/logo.jpg'

function Home () {
  const navigate = useNavigate();

  return <>
    <div className={styles.homeContainer}>
      <img className={styles.logo} src={logo} alt="logo" />
      <h1 className="title">BigBrain</h1>
      <div className="descContainer">
        <h3 className="description">Need to get smarter? COMP6080 here for you !</h3>
        <div className="buttonContainer">
          <Button variant="contained" onClick={ () => { navigate('/login') }}>Login</Button>
          <Button variant="outlined" onClick={ () => { navigate('/register') }}>Register</Button>
        </div>
      </div>
    </div>
  </>
}
export default Home;
