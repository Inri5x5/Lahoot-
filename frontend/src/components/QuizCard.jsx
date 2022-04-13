import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, Button } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { APICall } from '../apiCall.js';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  textAlign: 'center',
  color: 'theme.palette.text.secondary',
}));

export default function QuizCard (props) {
  const navigate = useNavigate();

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
      props.modifyQuizzes();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Grid item xs={2} sm={4} md={4} key={props.key}>
      <Item>
        <Card>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={props.quiz.thumbnail}
              alt={props.quiz.name + ' thumbnail'}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {props.quiz.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Number of Qs and Total Time
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button>
              <DeleteIcon onClick={() => deleteQuiz(props.quiz.id)}/>
            </Button>
            <Button>
              <EditIcon onClick={() => navigate(`/edit/quiz/${props.quiz.id}`)} />
            </Button>
          </CardActions>
        </Card>
      </Item>
    </Grid>
  );
}

QuizCard.propTypes = {
  quiz: PropTypes.object,
  key: PropTypes.number,
  modifyQuizzes: PropTypes.func,
}
