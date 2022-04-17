import { Box, } from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardNavBar from '../components/DashboardNav';
import { APICall } from '../helper-func.js';
import EditQuestionForm from '../components/EditQuestionForm.jsx';

export default function EditQuestionPage () {
  const { quizId, questionId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [questions, setQuestions] = React.useState([]);
  const [selectedQuestion, setSelectedQuestion] = React.useState({});

  React.useEffect(() => {
    if (!token) {
      navigate('/')
    }
  }, []);

  const getQuestion = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token').toString()}`,
      };
      const data = await APICall(null, `/admin/quiz/${quizId}`, 'GET', headers);
      if (data.error) {
        throw new Error(data.error);
      }
      let found = false;
      let i = 0;
      for (; i < data.questions.length; i++) {
        if (data.questions[i].id === questionId) {
          found = true;
          break;
        }
      }
      if (!found) {
        throw new Error('Invalid Question Id')
      }
      const newQuestions = [...data.questions]
      setQuestions(newQuestions)
      setSelectedQuestion(data.questions[i]);
    } catch (err) {
      alert(err);
      console.log(err);
      navigate('/dashboard');
    }
  }

  React.useEffect(() => {
    getQuestion();
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <DashboardNavBar></DashboardNavBar>
      <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 10 }}>
        <EditQuestionForm
          isAdd={false}
          allQuestions={questions}
          selectedQuestion={selectedQuestion}
          quizId={quizId}
          afterModified={() => { navigate(`/edit/quiz/${quizId}`) }}
          cancelModified={() => { navigate(`/edit/quiz/${quizId}`) }}
        />
      </Box>
    </Box>
  );
}
