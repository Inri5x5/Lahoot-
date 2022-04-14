import * as React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { experimentalStyled as styled } from '@mui/material/styles';
import { Button, Card, CardActions, CardActionArea, CardContent, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';

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
      return (value.id !== props.questions.id)
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
          <CardActionArea>
            <CardContent>
              <Typography>
                {props.questions.question}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button>
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
  questions: PropTypes.object,
  quiz: PropTypes.object,
  index: PropTypes.number,
  quizUpdate: PropTypes.func,
}
