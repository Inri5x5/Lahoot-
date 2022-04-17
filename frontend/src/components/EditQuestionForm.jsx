import React from 'react';
import {
  Button,
  TextField,
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
import PropTypes from 'prop-types';

export default function EditQuestionForm (props) {
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

  // React.useEffect(() => {
  //   console.log('yyyy')
  //   const initialAnswers = []
  //   for (let i = 0; i < props.modifiedQuestion.answers.length; i++) {
  //     initialAnswers.push({
  //       id: props.modifiedQuestion.answers[i].id,
  //       answer: props.modifiedQuestion.answers[i].answer,
  //       correct: props.modifiedQuestion.answers[i].correct,
  //     });
  //   }
  //   setAnswers(initialAnswers);
  //   setQuestionVideo(props.modifiedQuestion.questionVideo);
  //   setQuestionThumbnail(props.modifiedQuestion.questionThumbnail);
  //   let imageStat = true;
  //   if (props.modifiedQuestion.questionThumbnail === '') imageStat = false;
  //   let videoStat = true;
  //   if (props.modifiedQuestion.questionVideo === '') videoStat = false;
  //   setSelectMediaType({
  //     image: imageStat,
  //     video: videoStat,
  //   });
  //   setMediaType(() => {
  //     if (videoStat) return 'video';
  //     if (imageStat) return 'image';
  //     return ''
  //   });
  //   setQType(false);
  //   setQuestType(props.modifiedQuestion.questionType);
  //   console.log(props.modifiedQuestion.points);
  //   setPointWorth(props.modifiedQuestion.points);
  //   setTimeLimit(props.modifiedQuestion.timeLimit);
  //   setQuestionName(props.modifiedQuestion.question);
  // }, [])

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
    if (checkValidDialog(newQuestion)) props.addingQuestion(newQuestion);
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
    } else if (questionType === 'multiChoice' && numCorrect < 2) {
      return true;
    }
    return false;
  }

  const checkValidDialog = (newQuestion) => {
    if (newQuestion.question === '') return false;
    if (newQuestion.timeLimit === 0) return false;
    return !checkCorrectAnswer();
  }

  const constructAnswers = () => {
    const answerFields = answers.map((answer, index) => {
      answer.id = index;
      let possibleDelete = false;
      if (index > 1) {
        possibleDelete = true;
      }
      return (
        <AnswerField
        key={index}
        id={answer.id}
        answerText={answer.answer}
        isCorrect={answer.correct}
        updateAnswers={setAnswers}
        allAnswers={answers}
        isDelete={possibleDelete}
        />
      )
    })
    return (
      <FormGroup>
        {answerFields}
      </FormGroup>
    )
  }

  return (
    <Box PaperProps={{ sx: { width: '60%', height: '60%' } }}>
      <Typography> Edit Question </Typography>
      <TextField
        required
        defaultValue={questionName}
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
        defaultValue={timeLimit}
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
        defaultValue={pointsWorth}
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
          open={openQType}
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
          {constructAnswers()}
        </FormControl>
        {(answers.length < 6) &&
          (<Button onClick={() => {
            const newAnswers = [...answers];
            newAnswers.push({
              id: -1,
              answer: 'Sample Answer',
              correct: false,
            });
            setAnswers(newAnswers);
          }}>
            Add
          </Button>)
        }
      </Box>
      <Box>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button onClick={createQuestion}>Add</Button>
      </Box>
    </Box>
  )
}

EditQuestionForm.propTypes = {
  onClose: PropTypes.func,
  addingQuestion: PropTypes.func,
  modifiedQuestion: PropTypes.object,
}
