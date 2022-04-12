import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Register from './pages/RegisterPage';
import Login from './pages/LoginPage';
import Home from './pages/HomePage';
import QuizNew from './pages/QuizNewPage';

function App () {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/quiz/new" element={<QuizNew />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
