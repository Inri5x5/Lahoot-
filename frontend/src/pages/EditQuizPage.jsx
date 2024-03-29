import { Box, Grid, Button, Card, CardMedia, IconButton, Typography, } from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardNavBar from '../components/DashboardNav';
import QuestionCard from '../components/QuestionCard';
import { APICall } from '../helper-func.js';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import AddQuestionDialog from '../components/AddQuestionDialog';
import EditQuizDialog from '../components/EditQuizDialog';
import defaultQuiz from '../assets/defaultQuiz.jpg'

export default function EditQuizPage () {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [quizInfo, setQuizInfo] = React.useState({});
  const [openEdit, setEditDialog] = React.useState(false);
  const [openAdd, setAddDialog] = React.useState(false);

  React.useEffect(() => {
    if (!token) {
      navigate('/')
    }
  }, []);

  const editDialogOpen = () => {
    setEditDialog(true);
  };
  const addDialogOpen = () => {
    setAddDialog(true);
  };
  const dialogClose = () => {
    setAddDialog(false);
    setEditDialog(false);
  };

  const addQuestion = (updatedQuestions) => {
    setQuizInfo({
      questions: updatedQuestions,
      name: quizInfo.name,
      thumbnail: quizInfo.thumbnail,
    })
  }

  const quizInfoUpdate = (updateName, quizThumbnail) => {
    const body = {
      questions: quizInfo.questions,
      name: (!updateName.trim()) ? quizInfo.name : updateName,
      thumbnail: quizThumbnail
    }
    console.log(body)
    updateQuiz(body);
    dialogClose();
  }

  const getQuiz = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token').toString()}`,
      };
      const data = await APICall(null, `/admin/quiz/${quizId}`, 'GET', headers);
      if (data.error) {
        throw new Error(data.error);
      }
      setQuizInfo(data);
    } catch (err) {
      alert(err);
      navigate('/dashboard');
    }
  }

  const updateQuiz = async (q) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token').toString()}`,
      };
      const data = await APICall(q, `/admin/quiz/${quizId}`, 'PUT', headers);
      if (data.error) {
        throw new Error(data.error);
      }
      getQuiz();
    } catch (err) {
      console.log(err);
    }
  }

  // Get the initial questions from database
  React.useEffect(() => {
    getQuiz();
  }, []);

  const constructQuestion = () => {
    if (quizInfo.questions === undefined) return;
    if (quizInfo.questions.length === 0) {
      return (<>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', }}>
        <Typography variant="h5" gutterBottom component="div" sx={{ color: 'text.disabled', my: 1 }}>
          Add new question by clicking
        </Typography>
        <AddBoxOutlinedIcon sx={{ color: 'text.disabled', mx: 1 }}/>
        <Typography variant="h5" gutterBottom component="div" sx={{ color: 'text.disabled', my: 1 }}>
          below
        </Typography>
      </Box>
      </>)
    }
    const cards = quizInfo.questions.sort((a, b) => a.question > b.question ? 1 : -1).map((question, i) => {
      return (<QuestionCard
        question={question}
        key={i}
        quizUpdate={updateQuiz}
        quiz={quizInfo}
        updateQuestion={() => { navigate(`/edit/quiz/${quizId}/${question.id}`) }}
        />)
    })
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid>
          {cards}
        </Grid>
      </Box>
    )
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <DashboardNavBar></DashboardNavBar>
      <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 10 }}>
        <Box>
          <Card>
            <CardMedia
              component="img"
              image={(quizInfo.thumbnail === null || quizInfo.thumbnail === 'empty') ? defaultQuiz : quizInfo.thumbnail}
              alt={quizInfo.name + ' thumbnail'}
              height="150"
              maxwidth="150"
            />
          </Card>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <h1>{quizInfo.name}</h1>
            <Button onClick={editDialogOpen}>
              <ModeEditOutlineIcon />Edit Quiz
            </Button>
          </Box>

          <Box>
            {constructQuestion()}
            <Box sx={{ display: 'flex', justifyContent: 'center', height: '15%' }}>
              <IconButton
                component="span"
                color="primary"
                aria-label="add question"
                onClick={addDialogOpen}
                >
                <AddBoxOutlinedIcon sx={{ mx: 1, fontSize: '125%' }}/>
              </IconButton>
            </Box>
          </Box>
          <EditQuizDialog
            openEdit={openEdit}
            onClose={dialogClose}
            quizInfoUpdate={quizInfoUpdate}
            />
          <AddQuestionDialog
            open={openAdd}
            onClose={dialogClose}
            allQuestions={quizInfo.questions}
            modifyQuiz={addQuestion}
            quizId={quizId}
            />
        </Box>
      </Box>
    </Box>
  );
}
