import RegisterForm from '../components/RegisterForm';
import AuthNavBar from '../components/AuthNavBar'
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { APICall } from '../apiCall';

function Register () {
  const navigate = useNavigate();

  const register = async (email, password, name) => {
    try {
      const requestBody = {
        email: email,
        password: password,
        name: name,
      };
      const headers = {
        'Content-Type': 'application/json',
      };
      const data = await APICall(requestBody, '/admin/auth/register', 'POST', headers);
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
    <RegisterForm submit={register} />
  </>;
}

export default Register;
