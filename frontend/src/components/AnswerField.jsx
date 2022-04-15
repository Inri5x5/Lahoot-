import {
  Checkbox,
  TextField,
  Button,
} from '@mui/material';
import React from 'react';
import ClearIcon from '@mui/icons-material/ClearRounded';
import PropTypes from 'prop-types';

export default function answerField (props) {
  const updateAnswers = props.updateHandler;
  const deleteAnswer = props.deleteHandler;
  const answerData = props.answer;
  const isDelete = props.isDelete;
  const checkedUpdate = (e) => {
    updateAnswers(answerData.id, answerData.answer, e.target.checked);
  }
  const answerUpdate = (e) => {
    updateAnswers(answerData.id, e.target.value, answerData.correct);
  }
  const deleteAns = () => {
    deleteAnswer(answerData.id);
  }

  return (
    <div key={props.answer.id}>
      <Checkbox sx= {{ mt: 3 }}
        checked={answerData.correct}
        onChange={checkedUpdate}
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
      { isDelete &&
      <Button sx= {{ mt: 3 }} onClick={deleteAns}>
        <ClearIcon />
      </Button>
      }
    </div>
  )
}

answerField.propTypes = {
  key: PropTypes.number,
  isDelete: PropTypes.bool,
  updateHandler: PropTypes.func,
  deleteHandler: PropTypes.func,
  answerField: PropTypes.object,
}
