import * as React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { experimentalStyled as styled } from '@mui/material/styles';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import defaultQuestion from '../assets/defaultQuestion.jpg'

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  maxWidth: '100%',
  color: theme.palette.text.primary,
}));

export default function QuestionCard (props) {
  const deleteQuestion = () => {
    const q = props.quiz.questions;
    const newQuestions = q.filter(function (value, index, arr) {
      return (value.id !== props.question.id)
    });

    const body = {
      questions: newQuestions,
      name: props.quiz.name,
      thumbnail: props.quiz.thumbnail
    }
    props.quizUpdate(body);
  }

  return (
    <Grid sx={{ width: '100%' }} key={props.index}>
      <StyledPaper sx={{ my: 1, mx: 'auto' }}>
        <Card>
          <CardMedia
            component="img"
            height="100"
            image={(props.question.mediaType === null || props.question.mediaType === 'video') ? defaultQuestion : props.question.questionAttachment}
            alt={'question' + props.question.id + ' thumbnail'}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.question.question}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Time: {props.question.timeLimit} seconds
            </Typography>
            <Divider />
            <Typography variant="body2" color="text.secondary">
              Point: {props.question.points}
            </Typography>
            <Divider />
            <Typography variant="body2" color="text.secondary">
              QuestionType: {(props.question.questionType === 'singleChoice') ? 'Single Choice' : 'Multiple Choice'}
            </Typography>
            <Divider />
          </CardContent>
          <CardActions>
            <Button onClick={props.updateQuestion}>
              <ModeEditOutlineIcon />
            </Button>
            <Button onClick={deleteQuestion}>
              <DeleteIcon />
            </Button>
          </CardActions>
        </Card>
      </StyledPaper>
    </Grid>
  )
}

QuestionCard.propTypes = {
  question: PropTypes.object,
  quiz: PropTypes.object,
  index: PropTypes.number,
  quizUpdate: PropTypes.func,
  updateQuestion: PropTypes.func,
}
