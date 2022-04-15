// import { Box } from '@mui/material';
// import React from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import DashboardNavBar from '../components/DashboardNav';
// import { APICall } from '../helper-func.js';
// import Loading from '../components/Loading';

// export default function EditQuestionPage () {
//   const { quizId, questionId } = useParams();
//   const [answers, setAnswers] = React.useState([]);
//   const [id, setId] = React.useState('');
//   const [points, setPoints] = React.useState(0);
//   const [question, setQuestion] = React.useState('');
//   const [questionThumbnail, setQuestionThumbnail] = React.useState('');
//   const [questionType, setQuestionType] = React.useState('');
//   const [questionVideo, setQuestionVideo] = React.useState('');
//   const [timeLimit, setTimeLimit] = React.useState(0);
//   const [loading, setLoading] = React.useState(false);
//   const navigate = useNavigate();
//   const token = localStorage.getItem('token');

//   React.useEffect(() => {
//     if (!token) {
//       navigate('/')
//     }
//   }, []);

//   const getQuestion = async () => {
//     try {
//       setLoading(true);
//       const headers = {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${localStorage.getItem('token').toString()}`,
//       };
//       const data = await APICall(null, `/admin/quiz/${quizId}`, 'GET', headers);
//       if (data.error) {
//         throw new Error(data.error);
//       }
//       console.log(data);
//       for (let i = 0; i < data.questions.length; i++) {
//         if (data.questions[i].id === questionId) {
//           console.log(data.questions[i]);
//           setAnswers([...data.questions[i].answers]);
//           setId(data.questions[i].id);
//           setPoints(data.questions[i].points);
//           setQuestion(data.questions[i].question)
//           setQuestionThumbnail(data.questions[i].questionThumbnail);
//           setQuestionType(data.questions[i].questionType);
//           setQuestionVideo(data.questions[i].questionVideo);
//           setTimeLimit(data.questions[i].timeLimit);
//           console.log(question);
//         }
//       }
//       if (question === '') {
//         throw new Error('Invalid Question Id');
//       }
//       setLoading(false);
//     } catch (err) {
//       alert(err);
//       setLoading(false);
//       navigate('/dashboard');
//     }
//   }

//   React.useEffect(() => {
//     getQuestion();
//   }, []);

//   return (<>
//     <Box sx={{ display: 'flex' }}>
//       <DashboardNavBar></DashboardNavBar>
//       <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 10 }}>
//         {loading && <Loading></Loading>}
//       </Box>
//     </Box>
//   </>
//   );
// }
