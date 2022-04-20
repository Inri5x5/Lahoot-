import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';

export default function timer (props) {
  const [intervalId, setIntervalId] = React.useState(-1);
  const [timeLimit, setTimeLimit] = React.useState(props.timeLimit)

  React.useEffect(() => {
    if (props.timeLimit === '') return;
    setTimeLimit(props.timeLimit);
    const interval = setInterval(() => {
      setTimeLimit(t => t - 1);
    }, 1000);
    setIntervalId(interval);
    return () => clearInterval(intervalId);
  }, [props.timeLimit]);

  React.useEffect(() => {
    if (timeLimit === 0) {
      clearInterval(intervalId);
      props.showCorrectDialog()
    }
  }, [timeLimit])

  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab variant="extended" style={{ position: 'absolute', top: 16, right: 16, }}>
        {timeLimit}
      </Fab>
    </Box>
  );
}
