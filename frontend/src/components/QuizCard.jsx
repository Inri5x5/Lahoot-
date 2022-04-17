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
import StopIcon from '@mui/icons-material/StopRounded';
import StartIcon from '@mui/icons-material/PlayArrowRounded';
import defaultQuiz from '../assets/defaultQuiz.jpg'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  textAlign: 'center',
  color: 'theme.palette.text.secondary',
}));

export default function QuizCard (props) {
  const navigate = useNavigate();
  const [quizActive, setQuizActive] = React.useState(false);
  const [openNotif, setOpenNotif] = React.useState(false);

  const startQuiz = () => {
    setQuizActive(true);
    updateQuiz();
    notifOpen();
  }

  const stopQuiz = () => {
    setQuizActive(false);
    updateQuiz();
  }

  const notifOpen = () => {
    setOpenNotif(true);
  }

  const notifClose = () => {
    setOpenNotif(false);
  }

  const updateQuiz = async () => {
    const updatedQuiz = props.quiz;
    updatedQuiz.active = quizActive;
    console.log(updatedQuiz);
    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token').toString()}`,
      };
      const data = await APICall(updatedQuiz, `/admin/quiz/${props.quiz.id}`, 'PUT', headers);
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
              { !quizActive &&
              <Button onClick={startQuiz}>
                <StartIcon /> Start Quiz
              </Button>
              }
              { quizActive &&
              <Button onClick={stopQuiz}>
                <StopIcon /> Stop Quiz
              </Button>
              }
            </CardActions>
          </Card>
        </Item>
      </Grid>

      <Dialog PaperProps={{ sx: { width: '45%' } }}
        open={openNotif} onClose={notifClose}>
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
          <Button onClick={notifClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

QuizCard.propTypes = {
  quiz: PropTypes.object,
  index: PropTypes.number,
  modifyQuizzes: PropTypes.func,
}
