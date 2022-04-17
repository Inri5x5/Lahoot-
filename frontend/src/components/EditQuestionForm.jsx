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
import { fileToDataUrl, APICall } from '../helper-func.js';
import AnswerField from './AnswerField.jsx';
import PropTypes from 'prop-types';

export default function EditQuestionForm (props) {
  const [questionName, setQuestionName] = React.useState(props.selectedQuestion.question);
  const [timeLimit, setTimeLimit] = React.useState(props.selectedQuestion.timeLimit);
  const [pointsWorth, setPointWorth] = React.useState(props.selectedQuestion.points);
  const [questionType, setQuestType] = React.useState(props.selectedQuestion.questionType);
  const [mediaType, setMediaType] = React.useState(props.selectedQuestion.mediaType);
  const [questionThumbnail, setQuestionThumbnail] = React.useState('');
  const [questionVideo, setQuestionVideo] = React.useState((mediaType === 'video') ? props.selectedQuestion.questionAttachment : '');
  const [answers, setAnswers] = React.useState(props.selectedQuestion.answers);

  const [openQType, setQType] = React.useState(false);
  const imageStat = (mediaType === 'image');
  const videoStat = (mediaType === 'video');
  const [selectMediaType, setSelectMediaType] = React.useState({
    image: imageStat,
    video: videoStat,
  });

  const modifyQuestion = async (newQuestion) => {
    try {
      let updatedQuestions = [...props.allQuestions]
      updatedQuestions = updatedQuestions.filter((question) => question.id !== newQuestion.id)
      updatedQuestions.push(newQuestion)
      const body = {
        questions: updatedQuestions,
      }
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token').toString()}`,
      };
      const data = await APICall(body, `/admin/quiz/${props.quizId}`, 'PUT', headers);
      if (data.error) {
        throw new Error(data.error);
      }
      props.afterModified(updatedQuestions)
    } catch (err) {
      alert(err);
    }
  }

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
    let attachment = '';
    if (mediaType === 'video') attachment = questionVideo;
    if (mediaType === 'image') attachment = questionThumbnail;
    const newQuestion = {
      id: props.selectedQuestion.id,
      question: questionName,
      timeLimit: timeLimit,
      points: pointsWorth,
      questionType: questionType,
      mediaType: mediaType,
      questionAttachment: attachment,
      answers: answers,
    }
    if (checkValidDialog(newQuestion)) {
      modifyQuestion(newQuestion);
    }
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
    if (answers === undefined) return
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
    if (answers === undefined) return;
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
    <Box>
      <Typography> {(props.isAdd) ? 'Add Question' : 'Edit Question'} </Typography>
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
                <Checkbox checked={selectMediaType.image} onChange={handleImageCheckbox} name="image" />
              }
              label="Image"
            />
            <FormControlLabel
              control={
                <Checkbox checked={selectMediaType.video} onChange={handleVideoCheckbox} name="video" />
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
        defaultValue={ (mediaType === 'video') ? questionVideo : '' }
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
        {(answers !== undefined && answers.length < 6) &&
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
        <Button onClick={props.cancelModified}>Cancel</Button>
        <Button onClick={createQuestion}>{(props.isAdd) ? 'Create' : 'Edit'}</Button>
      </Box>
    </Box>
  )
}

EditQuestionForm.propTypes = {
  onClose: PropTypes.func,
  selectedQuestion: PropTypes.object,
  allQuestions: PropTypes.array,
  quizId: PropTypes.string,
  afterModified: PropTypes.func,
  cancelModified: PropTypes.func,
  isAdd: PropTypes.bool,
}
