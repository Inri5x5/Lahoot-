import LoginForm from '../components/LoginForm';
import AuthNavBar from '../components/AuthNavBar'
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { APICall } from '../apiCall';

function Login () {
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const requestBody = {
        email: email,
        password: password,
      };
      const headers = {
        'Content-Type': 'application/json',
      };
      const data = await APICall(requestBody, '/admin/auth/login', 'POST', headers);
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (err) {
      console.log(err);
    }
  }
  return <>
    <AuthNavBar></AuthNavBar>
    <LoginForm submit={login}/>
  </>;
}

export default Login;
