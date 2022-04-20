import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { Context, initialValue } from './context';

import Register from './pages/RegisterPage';
import Login from './pages/LoginPage';
import Home from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import EditQuiz from './pages/EditQuizPage';
import EditQuestion from './pages/EditQuestionPage';
import SessionResult from './pages/SessionResult';
import JoinGame from './pages/JoinGamePage';
import PlayerGame from './pages/PlayerGamePage';

function App () {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/edit/quiz/:quizId" element={<EditQuiz />} />
          <Route path="/edit/quiz/:quizId/:questionId" element={<EditQuestion />} />
          <Route path="/session/:sessionId/results" element={<SessionResult />} />
          <Route path="/play/join/:sessionId" element={<JoinGame />} />
          <Route path="/play/join/" element={<JoinGame />} />
          <Route path="/play/:playerId" element={<PlayerGame />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
