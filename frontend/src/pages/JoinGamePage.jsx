import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import logoJoin from '../assets/logoJoin.png'
import TextField from '@mui/material/TextField';
import { APICall } from '../helper-func.js';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const styleLogo = {
  margin: '0 20px',
  minWidth: '350px',
  minHeight: '200px',
  width: '40%',
  height: '20%',
};

function JoinGame () {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const [id, setId] = React.useState(sessionId);
  const [playerId, setPlayerId] = React.useState('');
  const [profileName, setProfileName] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  let interval;

  React.useEffect(() => {
    if (sessionId) {
      setId(sessionId);
    }
  }, []);

  React.useEffect(() => {
    if (playerId !== '') {
      handleToggle();
      interval = window.setInterval(() => {
        checkGameStatus();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [playerId]);

  const checkGameStatus = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
      };
      const gameStatus = await APICall(undefined, `/play/${playerId}/status`, 'GET', headers);
      if (gameStatus.error) {
        throw new Error(gameStatus.error);
      }
      if (gameStatus.started === true) {
        handleToggle();
        navigate(`/play/${playerId}`);
      }
    } catch (err) {
      console.log(err);
      alert(err);
      clearInterval(interval);
    }
  }

  const joinGame = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
      };
      const body = {
        name: profileName,
      }
      const data = await APICall(body, `/play/join/${id}`, 'POST', headers);
      if (data.error) {
        throw new Error(data.error);
      }
      setPlayerId(data.playerId);
    } catch (err) {
      console.log(err);
    }
  }
  return <>
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <img style={styleLogo} src={logoJoin} alt="logo" />
      <h1 className="title">BigBrain</h1>
      <div className="descContainer">
        <h3 className="description">Ready for a Challenge ?</h3>
        <div className="buttonContainer">
          <TextField size="small" id="outlined-basic" label="Session Id" variant="outlined" defaultValue={id} required onChange={ (e) => setId(e.target.value) }/>
        </div>
        <div className="buttonContainer">
          <TextField size="small" id="outlined-basic" label="Name" variant="outlined" required onChange={ (e) => setProfileName(e.target.value) }/>
        </div>
          <Button variant="outlined" onClick={ () => { joinGame() }}>Join Game</Button>
        <div>
        </div>
      </div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  </>
}
export default JoinGame;
