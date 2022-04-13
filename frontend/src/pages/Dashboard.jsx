import { Box } from '@mui/system';
import React from 'react';
import DashboardNav from '../components/DashboardNav';
import QuizCard from '../components/QuizCard';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import { APICall } from '../apiCall.js';
import Loading from '../components/Loading';

function Dashboard () {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  React.useEffect(() => {
    if (!token) {
      navigate('/');
    }
  });

  const userLogout = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token').toString()}`,
      }
      const data = await APICall(null, '/admin/auth/logout', 'POST', headers);
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.removeItem('token');
      navigate('/');
    } catch (error) {
      console.log(error)
    }
  }

  const [loading, setLoading] = React.useState(false);
  const [quizzes, setQuizzes] = React.useState([]);

  const getQuestions = async () => {
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
      const newQuizzes = [...data.quizzes]
      setQuizzes(newQuizzes);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  // Get the initial questions from database
  React.useEffect(() => {
    getQuestions();
  }, []);

  // Render the questions
  const constructQuiz = () => {
    const cards = quizzes.map((quiz, i) => {
      return (<QuizCard quiz={quiz} key={i} modifyQuizzes={getQuestions}/>);
    });
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {cards}
        </Grid>
      </Box>
    );
  }

  return (<>
    <Box sx={{ display: 'flex' }}>
      <DashboardNav logout={userLogout} modifyQuizzes={getQuestions}></DashboardNav>
      <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 10 }}>
        {loading && <Loading></Loading>}
        {!loading && constructQuiz()}
      </Box>
    </Box>
  </>
  );
}

export default Dashboard;
