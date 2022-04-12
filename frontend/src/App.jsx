import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { Context, initialValue } from './context';

import Register from './pages/RegisterPage';
import Login from './pages/LoginPage';
import Home from './pages/HomePage';
import QuizNew from './pages/QuizNewPage';
import Dashboard from './pages/Dashboard';

function App () {
  // const [isError, setIsError] = React.useState(initialValue.isError);
  // const [errorMessage, setErrorMessage] = React.useState(initialValue.errorMessage);
  // const getters = {
  //   isError,
  //   errorMessage,
  // };
  // const setters = {
  //   setIsError,
  //   setErrorMessage,
  // }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/quiz/new" element={<QuizNew />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
