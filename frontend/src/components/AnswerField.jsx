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

  const checkedUpdate = (e) => {
    console.log(answerData.id)
    console.log(answerData)
    updateAnswers(answerData.id, answerData.answer, e.target.checked);
  }

  const answerUpdate = (e) => {
    console.log(answerData.id)
    console.log(answerData)
    updateAnswers(answerData.id, e.target.value, answerData.correct);
  }

  const deleteAns = () => {
    console.log(answerData.id)
    console.log(answerData)
    deleteAnswer(answerData.id);
  }

  return (
    <div key={props.key}>
      <Checkbox sx= {{ mt: 3 }}
        checked={answerData.correct}
        onBlur={checkedUpdate}
      />
      <TextField
        defaultValue={answerData.answer}
        margin="dense"
        id="answers"
        label="Answer"
        type="text"
        variant="standard"
        onBlur={answerUpdate}
      />
      <Button sx= {{ mt: 3 }} onClick={deleteAns}>
        <ClearIcon />
      </Button>
    </div>
  )
}
