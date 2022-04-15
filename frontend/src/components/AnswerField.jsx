import {
  Checkbox,
  TextField,
  Button,
} from '@mui/material';
import React from 'react';
import ClearIcon from '@mui/icons-material/ClearRounded';

export default function answerField (props) {
  const updateAnswers = props.updateHandler;
  const deleteAnswer = props.deleteHandler;
  const answerData = props.answer;
  console.log(answerData)

  const checkedUpdate = (e) => {
    updateAnswers(props.index, answerData.answer, e.target.checked);
  }

  const answerUpdate = (e) => {
    updateAnswers(props.index, e.target.value, answerData.correct);
  }

  const deleteAns = () => {
    console.log('this ' + props.index)
    deleteAnswer(props.index);
  }

  return (
    <div key={props.key}>
      <Checkbox sx= {{ mt: 3 }}
        checked={answerData.correct}
        onChange={checkedUpdate}
      />
      <TextField
        autoFocus
        defaultValue={answerData.answer}
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
