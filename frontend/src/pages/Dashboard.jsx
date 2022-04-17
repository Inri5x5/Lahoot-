import { Box } from '@mui/system';
import React from 'react';
import DashboardNav from '../components/DashboardNav';
import QuizCard from '../components/QuizCard';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import { APICall } from '../helper-func.js';
import Typography from '@mui/material/Typography';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function Dashboard () {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  React.useEffect(() => {
    if (!token) {
      navigate('/');
    }
  });

  const [quizzes, setQuizzes] = React.useState([]);

  const getQuizzes = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token').toString()}`,
      };
      const data = await APICall(null, '/admin/quiz', 'GET', headers);
      const newQuizzes = [...data.quizzes]
      for (let i = 0; i < newQuizzes.length; i++) {
        const quizId = newQuizzes[i].id;
        const quizData = await APICall(null, `/admin/quiz/${quizId}`, 'GET', headers);
        let totalTime = 0;
        for (let i = 0; i < quizData.questions.length; i++) {
          totalTime += quizData.questions[i].timeLimit;
        }
        newQuizzes[i].totalQuestions = quizData.questions.length;
        newQuizzes[i].totalTime = totalTime
      }
      setQuizzes(newQuizzes);
    } catch (err) {
      alert(err);
    }
  }

  // Get the initial quizzes from database
  React.useEffect(() => {
    getQuizzes();
  }, []);

  // Render the quizzes
  const constructQuiz = () => {
    if (quizzes.length === 0) {
      return (<>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', }}>
        <Typography variant="h5" gutterBottom component="div" sx={{ color: 'text.disabled', my: 1 }}>
          Add new quiz by clicking
        </Typography>
        <AddCircleOutlineIcon sx={{ color: 'text.disabled', mx: 1 }}/>
        <Typography variant="h5" gutterBottom component="div" sx={{ color: 'text.disabled', my: 1 }}>
          on the left
        </Typography>
      </Box>
      </>)
    }
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 8, md: 12 }}>
          {quizzes.sort((a, b) => a.name > b.name ? 1 : -1).map((quiz, i) => {
            return (
              <QuizCard
                quiz={quiz}
                key={i}
                modifyQuizzes={getQuizzes}
              />);
          })}
        </Grid>
      </Box>
    );
  }

  return (<>
    <Box sx={{ display: 'flex' }}>
      <DashboardNav modifyQuizzes={getQuizzes}></DashboardNav>
      <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 10 }}>
        {constructQuiz()}
      </Box>
    </Box>
  </>
  );
}

export default Dashboard;
