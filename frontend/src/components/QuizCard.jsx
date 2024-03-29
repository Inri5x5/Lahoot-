import * as React from 'react';
import {
  CardActionArea,
  CardActions,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Paper,
  Grid,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import { APICall } from '../helper-func.js';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import StartIcon from '@mui/icons-material/PlayArrowRounded';
import StopIcon from '@mui/icons-material/StopRounded';
import defaultQuiz from '../assets/defaultQuiz.jpg'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  textAlign: 'center',
  color: 'theme.palette.text.secondary',
}));

export default function QuizCard (props) {
  const navigate = useNavigate();
  const [startQuiz, setStartDialog] = React.useState(props.quiz.active !== null);
  const [endQuiz, setEndDialog] = React.useState(false);
  const [sessionId, setSessionId] = React.useState('');
  const [buttonText, setButtonText] = React.useState('Start Quiz');

  const handleStartQuiz = () => {
    updateQuiz('start');
    openStartQuiz();
  }

  const openStartQuiz = () => {
    setStartDialog(true);
  }

  const dialogClose = (e, r) => {
    setStartDialog(false);
    setEndDialog(false);
    updateQuiz('end');
    // navigate(`/session/${props.quiz.id}/results`)
  }

  const resultPage = () => {
    setStartDialog(false);
    setEndDialog(false);
    updateQuiz('end');
    navigate(`/session/${sessionId}/${props.quiz.id}/results`)
  }

  const openEndQuiz = () => {
    setButtonText('Start Quiz')
    setEndDialog(true);
  }

  const updateQuiz = async (status) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token').toString()}`,
      };
      const data = await APICall(props.quiz, `/admin/quiz/${props.quiz.id}/${status}`, 'POST', headers);
      if (status === 'start') {
        const quizData = await APICall(null, `/admin/quiz/${props.quiz.id}`, 'GET', headers);
        setSessionId(quizData.active);
      }
      if (data.error) {
        throw new Error(data.error);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const deleteQuiz = async (id) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token').toString()}`,
      };
      const data = await APICall(null, `/admin/quiz/${id}`, 'DELETE', headers);
      if (data.error) {
        throw new Error(data.error);
      }
      props.modifyQuizzes()
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <Grid item xs={2} sm={4} md={4} key={props.index}>
        <Item>
          <Card>
            <CardActionArea onClick={() => navigate(`/edit/quiz/${props.quiz.id}`)} >
              <CardMedia
                component="img"
                height="140"
                image={(props.quiz.thumbnail === null || props.quiz.thumbnail === 'empty') ? defaultQuiz : props.quiz.thumbnail}
                alt={props.quiz.name + ' thumbnail'}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" label="title">
                  {props.quiz.name}
                </Typography>
                <Divider textAlign="center">Total Time</Divider>
                <Typography variant="body2" color="text.secondary" label="totalTime">
                  {props.quiz.totalTime} seconds
                </Typography>
                <Divider textAlign="center">Number of Questions</Divider>
                <Typography variant="body2" color="text.secondary" label="questionNum">
                  {props.quiz.totalQuestions}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button id="deleteButton" onClick={() => deleteQuiz(props.quiz.id)}>
                <DeleteIcon />
              </Button>
              <Button id="startButton"onClick={handleStartQuiz}>
                <StartIcon /> Start Quiz
              </Button>
            </CardActions>
          </Card>
        </Item>
      </Grid>

      <Dialog id="startSession" PaperProps={{ sx: { width: '45%' } }}
        open={startQuiz}>
        <DialogTitle>Session {sessionId} is now Active!</DialogTitle>
        <DialogContent>
          <div>
            <Button
              variant= "contained"
              component= "label"
              onClick={ () => { navigator.clipboard.writeText(`${window.location.hostname}:${window.location.port}/play/join/${sessionId}`) }}
            >
              Copy Link!
            </Button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { updateQuiz('advance'); setButtonText('Next Question') }}> {buttonText} </Button>
          <Button id="endButton" onClick={openEndQuiz}> <StopIcon/> Stop Quiz </Button>
        </DialogActions>
      </Dialog>

      <Dialog id="stopSession" PaperProps={{ sx: { width: '45%' } }}
        open={endQuiz}>
        <DialogTitle>Session is now Ended!</DialogTitle>
        <DialogContent>
          Would you like to view the results?
          <div>
            <Button onClick={resultPage}>
              Yes
            </Button>
            <Button id="closeDialog" onClick={dialogClose}>
              No
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

QuizCard.propTypes = {
  quiz: PropTypes.object,
  index: PropTypes.number,
  modifyQuizzes: PropTypes.func,
}
