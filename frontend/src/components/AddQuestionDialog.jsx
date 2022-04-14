import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormLabel,
  FormGroup,
  Checkbox,
  FormControlLabel,
  Typography,
} from '@mui/material';
import { v4 as uuid } from 'uuid';
import { fileToDataUrl } from '../helper-func.js';
import AnswerField from './AnswerField.jsx';

export default function addQuestionDialog (props) {
  const [questionName, setQuestName] = React.useState('');
  const [timeLimit, setTimeLimit] = React.useState(0);
  const [pointsWorth, setPointWorth] = React.useState(0);
  const [questionType, setQuestType] = React.useState('');
  const [openType, setQType] = React.useState(false);
  const [selectMediaType, setSelectMediaType] = React.useState({
    image: false,
    video: false,
  });
  const [mediaType, setMediaType] = React.useState('');
  const [questionThumbnail, setQuestionThumbnail] = React.useState('');
  const [questionVideo, setQuestionVideo] = React.useState('');
  const [answers, setAnswers] = React.useState([]);
  const [answersNum, setAnswersNum] = React.useState(0);

  const { image, video } = selectMediaType;

  const handleCheckBoxChange1 = (event) => {
    setSelectMediaType({
      ...selectMediaType,
      [event.target.name]: event.target.checked,
      video: false,
    });
    setMediaType(event.target.checked ? event.target.name : null);
  };

  const handleCheckBoxChange2 = (event) => {
    setSelectMediaType({
      ...selectMediaType,
      [event.target.name]: event.target.checked,
      image: false,
    });
    setMediaType(event.target.checked ? event.target.name : null);
  };

  const handleChange = (event) => {
    setQuestType(event.target.value);
  };

  const handleClose = () => {
    setQType(false);
  };

  const handleOpen = () => {
    setQType(true);
  };

  const passQuestion = () => {
    const uId = uuid();
    const newQuestion = {
      id: uId.slice(0, 8),
      question: questionName,
      timeLimit: timeLimit,
      points: pointsWorth,
      questionType: questionType,
      questionThumbnail: questionThumbnail,
      questionVideo: questionVideo,
      answers: answers,
    }
    props.addingQuestion(newQuestion)
  }

  const updateQuestionThumbnail = (e) => {
    const file = e.target.files[0];
    fileToDataUrl(file)
      .then((res) => {
        setQuestionThumbnail(res);
      })
  }

  const updateAnswers = (ansNum, answerIn, selected) => {
    let updatedAnswers = [...answers];
    updatedAnswers = updatedAnswers.filter((answer) => answer.id !== ansNum)
    const newAnswers = {
      id: ansNum,
      answer: answerIn,
      correct: selected,
    }
    updatedAnswers.push(newAnswers);
    setAnswers(updatedAnswers);
  }

  const deleteAnswer = (ansNum) => {
    let updatedAnswers = [...answers];
    updatedAnswers = updatedAnswers.filter((answer) => answer.id !== ansNum)
    setAnswersNum(answersNum - 1);
    setAnswers(updatedAnswers);
  }

  return (
    <Dialog PaperProps={{ sx: { width: '60%', height: '60%' } }}
      open={props.open} onClose={props.onClose}>
      <DialogTitle>Adding Question</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="questName"
          label="Question"
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) => setQuestName(e.target.value) }
        />
        <TextField
          autoFocus
          margin="dense"
          id="timeLimit"
          label="Time Limit"
          type="number"
          fullWidth
          variant="standard"
          onChange={(e) => setTimeLimit(e.target.value) }
        />
        <TextField
          autoFocus
          margin="dense"
          id="pointsWorth"
          label="Points Worth"
          type="number"
          fullWidth
          variant="standard"
          onChange={(e) => setPointWorth(e.target.value) }
        />
        <FormControl sx={{ mt: 3, width: '50%' }}>
          <InputLabel id="questTypeForm">Question Type</InputLabel>
          <Select
            labelId="questTypeForm"
            id="demo-controlled-open-select"
            open={openType}
            onClose={handleClose}
            onOpen={handleOpen}
            value={questionType}
            label="Question Type"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="singleChoice">Single Choice</MenuItem>
            <MenuItem value="multiChoice">Multiple Choice</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormLabel component="legend">Select Media Upload</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox checked={image} onChange={handleCheckBoxChange1} name="image" />
                }
                label="Image"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={video} onChange={handleCheckBoxChange2} name="video" />
                }
                label="Video Url"
              />
            </FormGroup>
        </FormControl>
        {(mediaType === 'image') && (
          <div>
            <InputLabel htmlFor="questionImage">Select image</InputLabel>
            <input type="file" id="questionImage" name="questionImage" accept=".png,.jpeg,.jpg" onChange={updateQuestionThumbnail} />
          </div>
        )}
        {(mediaType === 'video') && (
          <TextField
          autoFocus
          margin="dense"
          id="videoUrl"
          label="Video URL"
          type="link"
          placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
          fullWidth
          variant="standard"
          onChange={(e) => setQuestionVideo(e.target.value) }
        />
        )}
        <Typography>
          Add your answers!
        </Typography>
        {
          [...Array(answersNum).keys()].map((i, index) => (
            <AnswerField
              ansNum={i}
              updateHandler={updateAnswers}
              deleteHandler={deleteAnswer}
              key={index}
              qType={questionType}
            />
          ))
        }
        {(answersNum < 6) &&
          (<Button onClick={() => setAnswersNum(answersNum + 1)}>
            Add
          </Button>)
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button onClick={passQuestion}>Add</Button>
      </DialogActions>
    </Dialog>
  )
}
