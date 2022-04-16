import {
  Checkbox,
  TextField,
  Button,
} from '@mui/material';
import React from 'react';
import ClearIcon from '@mui/icons-material/ClearRounded';
import PropTypes from 'prop-types';

export default function answerField (props) {
  const [text, setText] = React.useState(props.answerText);
  const checkedUpdate = () => {
    let updatedAnswers = [...props.allAnswers];
    updatedAnswers = updatedAnswers.filter((answer) => answer.id !== props.id)
    const newAnswers = {
      id: props.id,
      answer: props.answerText,
      correct: !props.isCorrect,
    }
    updatedAnswers.push(newAnswers);
    updatedAnswers.sort((a, b) => a.id - b.id)
    props.updateAnswers(updatedAnswers);
  }
  const answerUpdate = (e) => {
    let updatedAnswers = [...props.allAnswers];
    setText(e.target.value);
    updatedAnswers = updatedAnswers.filter((answer) => answer.id !== props.id)
    const newAnswers = {
      id: props.id,
      answer: e.target.value,
      correct: props.isCorrect,
    }
    updatedAnswers.push(newAnswers);
    updatedAnswers.sort((a, b) => a.id - b.id)
    props.updateAnswers(updatedAnswers);
  }

  const deleteAns = () => {
    let updatedAnswers = [...props.allAnswers];
    updatedAnswers = updatedAnswers.filter((answer) => answer.id !== props.id)
    props.updateAnswers([]);
    setTimeout(() => { props.updateAnswers(updatedAnswers) }, 500);
  }

  return (
    <div>
      <Checkbox sx= {{ mt: 3 }}
        checked={props.isCorrect}
        onChange={checkedUpdate}
      />
      <TextField
        defaultValue={text}
        margin="dense"
        id="answers"
        label="Answer"
        type="text"
        variant="standard"
        onChange={answerUpdate}
      />
      { props.isDelete &&
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
  isCorrect: PropTypes.bool,
  updateAnswers: PropTypes.func,
  allAnswers: PropTypes.array,
  answerText: PropTypes.string,
  id: PropTypes.number,
}
