import React from 'react';
import { useParams } from 'react-router-dom';
// import { APICall } from '../helper-func.js';
import PlayerQuestionCard from '../components/PlayerQuestionCard'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Fab from '@mui/material/Fab';

const buttons = [
  <Button key="one">One</Button>,
  <Button key="two">Two</Button>,
  <Button key="three">Three</Button>,
  <Button key="one">One</Button>,
  <Button key="two">Two</Button>,
  <Button key="three">Three</Button>,
];

function PlayerGame () {
  // const navigate = useNavigate();
  const { playerId } = useParams();
  const [id, setId] = React.useState(playerId);
  // const [profileName, setProfileName] = React.useState('');
  console.log(id)

  React.useEffect(() => {
    if (playerId) {
      setId(playerId);
    }
  }, [])

  return <>
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', position: 'relative' }}>
      <Fab variant="extended" style={{ position: 'absolute', top: 16, right: 16, }}>
        Navigate
      </Fab>
      <PlayerQuestionCard ></PlayerQuestionCard>
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical outlined button group"
        style={{ width: '80%' }} sx={{ m: 2 }}
      >
        {buttons}
      </ButtonGroup>
    </div>
  </>
}
export default PlayerGame;
