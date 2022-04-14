import { Grid, Button, Card, CardMedia, Dialog, DialogTitle, DialogContent, TextField, DialogActions, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardNavBar from '../components/DashboardNav';
import QuestionCard from '../components/QuestionCard';
import { APICall, fileToDataUrl } from '../helper-func.js';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { v4 as uuid } from 'uuid';

export default function EditQuizCard () {
  const params = useParams();
  const qId = params.qId;
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [quizInfo, setQuizinfo] = React.useState({ questions: [] });
  const [openDialog, setOpenDialog] = React.useState(false);
  const [updateName, setNewName] = React.useState('');
  const [quizThumbnail, setQuizThumbnail] = React.useState('');

  React.useEffect(() => {
    if (!token) {
      navigate('/')
    }
  }, []);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setNewName('');
    setQuizThumbnail('')
  };

  const updateQuizThumbnail = (e) => {
    const file = e.target.files[0];
    fileToDataUrl(file)
      .then((res) => {
        setQuizThumbnail(res);
      })
  }

  const quizInfoUpdate = () => {
    const body = {
      question: quizInfo.questions,
      name: updateName,
      thumbnail: quizThumbnail
    }
    updateQuiz(body);
    handleDialogClose();
  }

  const getQuiz = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token').toString()}`,
      };
      const data = await APICall(null, `/admin/quiz/${qId}`, 'GET', headers);
      if (data.error) {
        throw new Error(data.error);
      }
      setQuizinfo(data);
    } catch (err) {
      console.log(err);
    }
  }

  const updateQuiz = async (q) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token').toString()}`,
      };
      const data = await APICall(q, `/admin/quiz/${qId}`, 'PUT', headers);
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

  // Temporary Adding Question && Soon have a own Modal and page
  const addQuestion = () => {
    const updateQuizInfo = {
      questions: quizInfo.questions,
      name: quizInfo.name,
      thumbnail: quizInfo.thumbnail,
    }

    const uId = uuid();
    const newQuestion = {
      id: uId.slice(0, 8),
      question: 'What is my name 2?',
    }

    updateQuizInfo.questions.push(newQuestion);
    updateQuiz(updateQuizInfo);
  }

  const constructQuestion = () => {
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
    const cards = quizInfo.questions.map((question, i) => {
      return (<QuestionCard
        questions={question}
        key={i}
        quizUpdate={updateQuiz}
        quiz={quizInfo}
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
        <Card>
          <CardMedia
            component="img"
            image={quizInfo.thumbnail}
            alt={quizInfo.name + ' thumbnail'}
            height="150"
            maxwidth="150"
          />
        </Card>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <h1>{quizInfo.name}</h1>
          <Button onClick={handleDialogOpen}>
            <ModeEditOutlineIcon />Edit Quiz
          </Button>
        </Box>

        <Box >
          {constructQuestion()}
          <Box sx={{ display: 'flex', justifyContent: 'center', height: '15%' }}>
            <IconButton
              component="span"
              color="primary"
              aria-label="add question"
              onClick={addQuestion}
              >
              <AddBoxOutlinedIcon sx={{ mx: 1, fontSize: '125%' }}/>
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Dialog PaperProps={{ sx: { width: '45%', height: '35%' } }}
        open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Give Your Quiz a Name!</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setNewName(e.target.value) }
          />
          <div>
            <Button
              variant= "contained"
              component= "label"
            >
              Upload Thumbnail
              <input
                type= "file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={updateQuizThumbnail}
              />
            </Button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={quizInfoUpdate}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
