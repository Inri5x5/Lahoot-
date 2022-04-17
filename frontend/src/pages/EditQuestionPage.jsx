import { Box, } from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardNavBar from '../components/DashboardNav';
import { APICall } from '../helper-func.js';
import EditQuestionForm from '../components/EditQuestionForm.jsx';
import Loading from '../components/Loading';

export default function EditQuestionPage () {
  const { quizId, questionId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [loading, setLoading] = React.useState(false);
  const [questions, setQuestions] = React.useState([]);
  const [modifiedQuestion, setModifiedQuestion] = React.useState({});
  const [quizName, setQuizName] = React.useState('');
  const [quizThumbnail, setQuizThumbnail] = React.useState('');

  React.useEffect(() => {
    if (!token) {
      navigate('/')
    }
  }, []);

  const getQuestion = async () => {
    try {
      setLoading(true);
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
      setQuizName(data.name)
      setQuizThumbnail(data.thumbnail)
      const newQuestions = [...data.questions]
      setQuestions(newQuestions)
      setModifiedQuestion(data.questions[i]);
      setLoading(false);
    } catch (err) {
      alert(err);
      console.log(err);
      setLoading(false);
      navigate('/dashboard');
    }
  }

  React.useEffect(() => {
    getQuestion();
  }, []);

  const updateQuestion = async (newQuestion) => {
    try {
      let updatedQuestions = [...questions]
      updatedQuestions = updatedQuestions.filter((question) => question.id !== newQuestion.id)
      updatedQuestions.push(newQuestion)
      setQuestions(updatedQuestions)
      const body = {
        questions: questions,
        name: quizName,
        thumbnail: quizThumbnail,
      }
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token').toString()}`,
      };
      const data = await APICall(body, `/admin/quiz/${quizId}`, 'PUT', headers);
      if (data.error) {
        throw new Error(data.error);
      }
      navigate(`/edit/quiz/${quizId}`)
    } catch (err) {
      alert(err);
    }
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <DashboardNavBar></DashboardNavBar>
      <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 10 }}>
        {loading && <Loading></Loading>}
        {!loading &&
          <EditQuestionForm
            updateQuestion={updateQuestion}
            allQuestions={questions}
            modifiedQuestion={modifiedQuestion}
            />
        }
      </Box>
    </Box>
  );
}
