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

  const deleteAns = (e) => {
    let updatedAnswers = [...props.allAnswers];
    for (let i = 0; i < updatedAnswers.length; i++) {
      if (i === props.id && i++ < updatedAnswers.length) {
        setText(updatedAnswers[i].answer);
        break;
      }
    }
    updatedAnswers = updatedAnswers.filter((answer) => answer.id !== props.id)
    console.log(updatedAnswers)
    props.updateAnswers(updatedAnswers);
  }

  return (
    <div key={props.id}>
      <Checkbox sx= {{ mt: 3 }}
        checked={props.isCorrect}
        onChange={checkedUpdate}
      />
      <TextField
        // defaultValue={text}
        value={text}
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
