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
  const [startQuiz, setStartDialog] = React.useState(false);
  const [endQuiz, setEndDialog] = React.useState(false);

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
    navigate(`/session/${props.quiz.id}/results`)
  }

  const openEndQuiz = () => {
    setEndDialog(true);
  }

  const updateQuiz = async (status) => {
    console.log(`/admin/quiz/${props.quiz.id}/${status}`)
    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token').toString()}`,
      };
      const data = await APICall(props.quiz, `/admin/quiz/${props.quiz.id}/${status}`, 'POST', headers);
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
                <Typography gutterBottom variant="h5" component="div">
                  {props.quiz.name}
                </Typography>
                <Divider textAlign="center">Total Time</Divider>
                <Typography variant="body2" color="text.secondary">
                  {props.quiz.totalTime} seconds
                </Typography>
                <Divider textAlign="center">Number of Questions</Divider>
                <Typography variant="body2" color="text.secondary">
                  {props.quiz.totalQuestions}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button onClick={() => deleteQuiz(props.quiz.id)}>
                <DeleteIcon />
              </Button>
              <Button onClick={handleStartQuiz}>
                <StartIcon /> Start Quiz
              </Button>
            </CardActions>
          </Card>
        </Item>
      </Grid>

      <Dialog PaperProps={{ sx: { width: '45%' } }}
        open={startQuiz}>
        <DialogTitle>Session {props.quiz.id} is now Active!</DialogTitle>
        <DialogContent>
          <div>
            <Button
              variant= "contained"
              component= "label"
              onClick={ () => { navigator.clipboard.writeText(`${window.location.hostname}/${window.location.port}/play/join/${props.quiz.id}`) }}
            >
              Copy Link!
            </Button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => updateQuiz('advance')}> Next Question </Button>
          <Button onClick={openEndQuiz}> <StopIcon/> Stop Quiz </Button>
        </DialogActions>
      </Dialog>

      <Dialog PaperProps={{ sx: { width: '45%' } }}
        open={endQuiz}>
        <DialogTitle>Session is now Ended!</DialogTitle>
        <DialogContent>
          Would you like to view the results?
          <div>
            <Button onClick={resultPage}>
              Yes
            </Button>
            <Button onClick={dialogClose}>
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
