import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { APICall } from '../helper-func.js';
import PlayerQuestionCard from '../components/PlayerQuestionCard'
import PlayerAnswerButton from '../components/PlayerAnswerButton'
import Timer from '../components/timer'
import CorrectAnswers from '../components/correctAnswers'

function PlayerGame () {
  const { playerId } = useParams();
  const [questionName, setQuestionName] = React.useState('');
  const [questionId, setQuestionId] = React.useState('');
  const [timeLimit, setTimeLimit] = React.useState(-1);
  const [pointWorth, setPointWorth] = React.useState(0);
  const [questionType, setQuestType] = React.useState('');
  const [mediaType, setMediaType] = React.useState('');
  const [attachment, setQuestionAttachment] = React.useState('');
  const [answers, setAnswers] = React.useState([]);

  const [correctAnswers, setCorrectAnswers] = React.useState([]);

  const navigate = useNavigate();

  React.useEffect(() => {
    getQuestion();
  }, [])

  const submitAPI = async (answers) => {
    try {
      const body = {
        answerIds: answers,
      }
      const headers = {
        'Content-Type': 'application/json',
      };
      const data = await APICall(body, `/play/${playerId}/answer`, 'PUT', headers);
      if (data.error) {
        throw new Error(data.error);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const buttonSubmit = (buttonId) => {
    const updatedAnswers = [...answers];
    if (questionType === 'singleChoice') {
      for (let i = 0; i < updatedAnswers.length; i++) {
        updatedAnswers[i].selected = false
      }
    }
    updatedAnswers[buttonId].selected = (!answers[buttonId].selected)
    setAnswers(updatedAnswers);

    const selectedAnswer = [];
    for (let i = 0; i < updatedAnswers.length; i++) {
      if (updatedAnswers[i].selected) {
        selectedAnswer.push(updatedAnswers[i].id);
      }
    }
    submitAPI(selectedAnswer);
  }

  const createAnswers = () => {
    if (answers === []) return;
    const answerButtons = answers.map((answer, index) => {
      return (
        <PlayerAnswerButton
          submit={buttonSubmit}
          selectedAnswer={answer}
          isSelected={answer.selected}
          key={index}></PlayerAnswerButton>
      )
    })
    return (<>
      { answerButtons }
    </>
    )
  }

  const getCorrectAnswer = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
      };
      const data = await APICall(undefined, `/play/${playerId}/answer`, 'GET', headers);
      if (data.error) {
        throw new Error(data.error);
      }
      setCorrectAnswers(data.answerIds)
      setTimeLimit(0);
    } catch (err) {
      console.log(err);
    }
  }

  const getQuestion = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
      };
      const data = await APICall(undefined, `/play/${playerId}/question`, 'GET', headers);
      if (data.error) {
        throw new Error(data.error);
      }
      if (data.question.questionId === questionId) {
        return;
      }
      const questionInfo = data.question;
      const lastQuestionStarted = new Date(data.question.isoTimeLastQuestionStarted)
      const now = new Date();
      const diff = (now.getTime() - lastQuestionStarted.getTime()) / 1000;
      setQuestionId(questionInfo.questionId)
      setTimeLimit((questionInfo.timeLimit - Math.floor(diff) < 0) ? 0 : questionInfo.timeLimit - Math.floor(diff));
      setQuestionName(questionInfo.question);
      setPointWorth(questionInfo.points);
      setQuestType(questionInfo.questionType);
      setMediaType(questionInfo.mediaType);
      setQuestionAttachment(questionInfo.questionAttachment);
      setAnswers(questionInfo.answers)
    } catch (err) {
      console.log(err);
      navigate('/');
    }
  }

  return <>
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', position: 'relative' }}>
      {(timeLimit > 0) && <Timer timeLimit={timeLimit} updateTimeLimit={setTimeLimit} showCorrectDialog={() => getCorrectAnswer()}></Timer>}
      <PlayerQuestionCard questionName={questionName} points={pointWorth} mediaType={mediaType} attachment={attachment} questionType={questionType}></PlayerQuestionCard>
      {createAnswers()}
    </div>
    {(timeLimit === 0) && <CorrectAnswers correctAnswers={correctAnswers} allAnswers={answers} afterCorrect={() => getQuestion()}></CorrectAnswers>}
  </>
}
export default PlayerGame;
