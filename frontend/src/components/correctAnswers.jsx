import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

export default function correctAnswer (props) {
  const [correctTexts, setCorrectTexts] = React.useState([]);

  React.useEffect(() => {
    const interval2 = setInterval(() => {
      props.afterCorrect();
    }, 1000);
    return () => {
      clearInterval(interval2);
    }
  }, []);

  React.useEffect(() => {
    if (props.correctAnswers === [] || props.allAnswers === undefined) return;
    const texts = props.correctAnswers.map((answerId, index) => {
      return (
        <Typography variant="caption" display="block" gutterBottom key={index}>
          {props.allAnswers[answerId].answer}
        </Typography>
      )
    })
    setCorrectTexts(texts)
  }, [props.correctAnswers, props.allAnswers])

  return (
    <Dialog
    open={true}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Correct Answer
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {correctTexts}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
