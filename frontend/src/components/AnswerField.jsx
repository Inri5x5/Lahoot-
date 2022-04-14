import {
  Checkbox,
  TextField,
  Button,
} from '@mui/material';
import React from 'react';
import ClearIcon from '@mui/icons-material/ClearRounded';

export default function answerField (props) {
  const [correct, setCorrect] = React.useState(false);
  const [answer, setAnswer] = React.useState('');
  const updateAnswers = props.updateHandler;
  const deleteAnswer = props.deleteHandler;

  const checkUpdate = (e) => {
    setCorrect(e.target.checked)
    updateAnswers(props.ansNum, answer, e.target.checked);
  }

  const answerUpdate = (e) => {
    setAnswer(e.target.value);
    updateAnswers(props.ansNum, e.target.value, correct);
  }

  const deleteAns = () => {
    deleteAnswer(props.ansNum);
  }

  return (
    <div key={props.ansNum}>
      <Checkbox sx= {{ mt: 3 }}
      checked={correct}
      onChange={checkUpdate}
      />
      <TextField
        autoFocus
        margin="dense"
        id="answers"
        label="Answer"
        type="text"
        variant="standard"
        onChange={answerUpdate}
      />
      <Button sx= {{ mt: 3 }} onClick={deleteAns}>
        <ClearIcon />
      </Button>
    </div>
  )
}
