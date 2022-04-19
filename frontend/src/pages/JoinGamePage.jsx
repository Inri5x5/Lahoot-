import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import logoJoin from '../assets/logoJoin.png'
import TextField from '@mui/material/TextField';
import { APICall } from '../helper-func.js';

const styleLogo = {
  margin: '0 20px',
  minWidth: '350px',
  minHeight: '200px',
  width: '40%',
  height: '20%',
};

function Home () {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const [id, setId] = React.useState(sessionId);
  const [profileName, setProfileName] = React.useState('');

  React.useEffect(() => {
    if (sessionId) {
      setId(sessionId);
    }
  }, [])

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
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  }
  console.log(id)
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
    </div>
  </>
}
export default Home;
