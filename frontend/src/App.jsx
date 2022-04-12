import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Context, initialValue } from './context';

import Register from './pages/RegisterPage';
import Login from './pages/LoginPage';
import Home from './pages/HomePage';
import QuizNew from './pages/QuizNewPage';

function App () {
  const [isError, setIsError] = React.useState(initialValue.isError);
  const [errorMessage, setErrorMessage] = React.useState(initialValue.errorMessage);
  const getters = {
    isError,
    errorMessage,
  };
  const setters = {
    setIsError,
    setErrorMessage,
  }
  return (
    <>
      <Context.Provider value={{ getters, setters, }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/quiz/new" element={<QuizNew />} />
          </Routes>
        </BrowserRouter>
      </Context.Provider>
    </>
  );
}

export default App;
