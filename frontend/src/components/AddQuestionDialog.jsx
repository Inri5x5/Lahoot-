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
  Box,
} from '@mui/material';
import { v4 as uuid } from 'uuid';
import { fileToDataUrl } from '../helper-func.js';
import AnswerField from './AnswerField.jsx';

export default function addQuestionDialog (props) {
  const [questionName, setQuestionName] = React.useState('');
  const [timeLimit, setTimeLimit] = React.useState(0);
  const [pointsWorth, setPointWorth] = React.useState(0);
  const [questionType, setQuestType] = React.useState('singleChoice');
  const [openQType, setQType] = React.useState(false);
  const [selectMediaType, setSelectMediaType] = React.useState({
    image: false,
    video: false,
  });
  const [mediaType, setMediaType] = React.useState('');
  const [questionThumbnail, setQuestionThumbnail] = React.useState('');
  const [questionVideo, setQuestionVideo] = React.useState('');
  const [answers, setAnswers] = React.useState([]);
  const { image, video } = selectMediaType;

  React.useEffect(() => {
    if (props.open === false) {
      setAnswers([]);
      setQuestionVideo('');
      setQuestionThumbnail('');
      setMediaType('');
      setSelectMediaType({
        image: false,
        video: false,
      });
      setQType(false);
      setQuestType('singleChoice');
      setPointWorth(0);
      setTimeLimit(0);
      setQuestionName('');
    }
  }, [props.open])

  const handleImageCheckbox = (event) => {
    setSelectMediaType({
      ...selectMediaType,
      [event.target.name]: event.target.checked,
      video: false,
    });
    setMediaType(event.target.checked ? event.target.name : null);
  };

  const handleVideoCheckbox = (event) => {
    setSelectMediaType({
      ...selectMediaType,
      [event.target.name]: event.target.checked,
      image: false,
    });
    setMediaType(event.target.checked ? event.target.name : null);
  };

  const handleTypeChange = (event) => {
    setQuestType(event.target.value);
  };

  const handleClose = () => {
    setQType(false);
  };
  const handleOpen = () => {
    setQType(true);
  };

  const createQuestion = () => {
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
    props.addingQuestion(newQuestion);
  }

  const updateQuestionThumbnail = (e) => {
    const file = e.target.files[0];
    fileToDataUrl(file)
      .then((res) => {
        setQuestionThumbnail(res);
      })
  }

  const checkCorrectAnswer = () => {
    let numCorrect = 0;
    for (let i = 0; i < answers.length; i++) {
      if (answers[i].correct === true) numCorrect++;
    }
    if (questionType === 'singleChoice' && numCorrect !== 1) {
      return true;
    } else if (questionType === 'multiChoice' && numCorrect < 1) {
      return true;
    }
    return false;
  }

  // const checkValidDialog = () => {

  // }

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
    setAnswers(updatedAnswers);
  }

  return (
    <Dialog PaperProps={{ sx: { width: '60%', height: '60%' } }}
      open={props.open} onClose={props.onClose}>
      <DialogTitle>Adding Question</DialogTitle>

      <DialogContent>

        <TextField
          required
          error={questionName === ''}
          helperText="Please enter your question"
          margin="dense"
          id="questName"
          label="Question"
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) => setQuestionName(e.target.value) }
        />
        <TextField
          required
          defaultValue={0}
          error={timeLimit === 0}
          helperText="Time limit should be greater than zero"
          margin="dense"
          id="timeLimit"
          label="Time Limit (seconds)"
          type="number"
          fullWidth
          variant="standard"
          onBlur={(e) => {
            if (e.target.value < 0) {
              e.target.value = 0;
            }
            setTimeLimit(parseInt(e.target.value))
          }}
        />
        <TextField
          defaultValue={0}
          margin="dense"
          id="pointsWorth"
          label="Points Worth"
          type="number"
          fullWidth
          variant="standard"
          onBlur={(e) => {
            if (e.target.value < 0) {
              e.target.value = 0;
            }
            setPointWorth(parseInt(e.target.value))
          }}
        />
        <FormControl sx={{ mt: 3, width: '50%' }}>
          <InputLabel id="questTypeForm">Question Type</InputLabel>
          <Select

            labelId="questTypeForm"
            id="demo-controlled-open-select"
            open={openQType}loc
            onClose={handleClose}
            onOpen={handleOpen}
            value={questionType}
            label="Question Type"
            onChange={handleTypeChange}
          >
            <MenuItem value="singleChoice">Single Choice</MenuItem>
            <MenuItem value="multiChoice">Multiple Choice</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormLabel component="legend">Select Media Upload</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox checked={image} onChange={handleImageCheckbox} name="image" />
                }
                label="Image"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={video} onChange={handleVideoCheckbox} name="video" />
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

        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography>
            Add your answers!
          </Typography>

          <FormControl
            required
            error={checkCorrectAnswer()}
            component="fieldset"
            variant="standard"
          >
            <FormLabel component="legend"> {(questionType === 'singleChoice') ? 'Please check 1 of the answers ' : 'Please check 2 or more of the answers '} as the correct answer(s)</FormLabel>
            <FormGroup>
              {
                answers.map((answer, index) => (
                  <AnswerField
                    key={index}
                    updateHandler={updateAnswers}
                    deleteHandler={deleteAnswer}
                    answer={answer}
                  />
                ))
              }
            </FormGroup>
          </FormControl>
          {(answers.length < 6) &&
            (<Button onClick={() => {
              const newAnswers = [...answers];
              const uId = uuid();
              console.log('test ' + uId);
              newAnswers.push({
                id: uId.slice(0, 8),
                answer: '',
                correct: false,
              });
              setAnswers(newAnswers);
            }}>
              Add
            </Button>)
          }
        </Box>

      </DialogContent>

      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button onClick={createQuestion}>Add</Button>
      </DialogActions>
    </Dialog>
  )
}
