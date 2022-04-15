import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { Context, initialValue } from './context';

import Register from './pages/RegisterPage';
import Login from './pages/LoginPage';
import Home from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import EditQuiz from './pages/EditQuizPage';

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
          <Route path="/edit/quiz/:quizId/:questionId" element={<EditQuiz />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
