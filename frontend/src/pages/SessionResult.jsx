import React from 'react';
import DashboardNav from '../components/DashboardNav';
import {
  Box,
} from '@mui/material';
import { APICall } from '../helper-func.js';
import { useParams } from 'react-router-dom';
import ResultTable from '../components/ResultTable';
// import { Bar } from 'react-chartjs-2';

export default function SessionResult () {
  const [result, setResult] = React.useState([]);
  // const [quiz, setQuiz] = React.useState({});
  const [userScores, setUserScore] = React.useState({});
  const { sessionId, quizId } = useParams();
  const [barGraphData, setBarData] = React.useState({});

  const getResult = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token').toString()}`,
      };
      let data = await APICall(null, `/admin/session/${sessionId}/results`, 'GET', headers);
      if (data.error) {
        throw new Error(data.error);
      }
      const res = data.results;
      setResult(res);
      data = await APICall(null, `/admin/quiz/${quizId}`, 'GET', headers);
      if (data.error) {
        throw new Error(data.error);
      }
      // setQuiz(data);
      setData(res, data);
    } catch (err) {
      console.log(err);
    }
  }

  React.useEffect(() => {
    getResult();
  }, []);

  const timeDiff = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end)
    return (endDate.getTime() - startDate.getTime()) / 1000;
  }

  const dataGraph = (array) => {
    const numQuestion = []
    for (let i; i < array.length; i++) {
      numQuestion.push(`Q${i + 1}`)
    }
    const data = {
      labels: numQuestion,
      datasets: [
        {
          label: 'Percentage of Correct Answers',
          data: array,
          borderwidth: 1,
        }
      ]
    }
    setBarData(data);
  }

  const setData = (res, quiz) => {
    const numQuestion = res[0].answers.length;
    const numUsers = res.length
    const avgResponseTime = [];
    const correctPercentage = [];
    const userScore = {};
    for (let i = 0; i < numQuestion; i++) {
      let timePerUser = 0;
      let correctPerUser = 0;
      for (let j = 0; j < numUsers; j++) {
        const question = res[j].answers[i];
        const timeResponse = timeDiff(question.questionStartedAt, question.answeredAt)
        if (question.correct) {
          if (userScore[res[j].name] === undefined) userScore[res[j].name] = 0;
          userScore[res[j].name] = (userScore[res[j].name]) + quiz.questions[j].points;
          correctPerUser += 1;
        } else {
          correctPerUser += 0;
        }
        timePerUser += timeResponse
      }
      const avgTime = timePerUser / numUsers;
      avgResponseTime.push(avgTime)
      const percent = (correctPerUser / numUsers) * 100;
      correctPercentage.push(percent)
    }
    setUserScore(userScore)
    dataGraph(correctPercentage)
    // console.log(barGraphData)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <DashboardNav></DashboardNav>
      { result.length === 0 &&
      <div>
        <h1> No results! Go get a friend! :)</h1>
      </div>
      }
      {result.length !== 0 &&
      <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 10 }}>
        <ResultTable uScores={userScores} sessionId={sessionId} barData={barGraphData}/>
      </Box>
      }
    </Box>
  )
}
