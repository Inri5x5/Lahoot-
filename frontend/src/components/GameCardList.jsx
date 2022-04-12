import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Loading from './Loading';
import DeleteIcon from '@mui/icons-material/Delete';
import { APICall } from '../apiCall.js';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

let quizzes = null;

export default function ActionAreaCard () {
  const [loading, setLoading] = React.useState(false);

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
    } catch (err) {
      console.log(err);
    }
  }

  const getMetaQuestions = async () => {
    setLoading(true);
    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token').toString()}`,
      };
      const data = await APICall(null, '/admin/quiz', 'GET', headers);
      if (data.error) {
        throw new Error(data.error);
      }
      quizzes = data.quizzes;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    getMetaQuestions();
  }, []);

  if (loading) return <Loading></Loading>;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {quizzes != null && quizzes.map((quiz, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Item>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={quiz.thumbnail}
                    alt={quiz.name + ' thumbnail'}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {quiz.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Number of Qs and Total Time
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <DeleteIcon onClick={() => deleteQuiz(quiz.id)}/>
                </CardActions>
              </Card>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
