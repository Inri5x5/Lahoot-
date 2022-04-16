import { Box, } from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardNavBar from '../components/DashboardNav';
import { APICall } from '../helper-func.js';
import EditQuestionDialog from '../components/ModifyQuestionDialog';
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
      console.log(data.questions)
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
      setQuestions(data.questions)
      setModifiedQuestion(data.questions[i])
      setLoading(false);
    } catch (err) {
      alert(err);
      console.log(err);
      setLoading(false);
      navigate('/dashboard');
    }
  }

  React.useEffect(() => {
    if (!token) {
      navigate('/')
    }
    getQuestion();
  }, []);

  const updateQuestion = async (body) => {
    try {
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

  const addQuestion = (newQuestion) => {
    const updateQuizInfo = {
      questions: questions,
      name: quizName,
      thumbnail: quizThumbnail,
    }
    updateQuizInfo.questions.push(newQuestion);
    updateQuestion(updateQuizInfo);
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <DashboardNavBar></DashboardNavBar>
      {loading && <Loading></Loading>}
      {!loading &&
        <EditQuestionDialog
          open={true}
          addingQuestion={addQuestion}
          modifiedQuestion={modifiedQuestion}
          />
      }
    </Box>
  );
}
