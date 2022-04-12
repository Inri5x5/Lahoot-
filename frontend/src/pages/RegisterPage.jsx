import RegisterForm from '../components/RegisterForm';
import AuthNavBar from '../components/AuthNavBar'
import { useNavigate } from 'react-router-dom';
import React from 'react';

function Register () {
  const navigate = useNavigate();

  return <>
    <AuthNavBar></AuthNavBar>
    <RegisterForm submit={async (email, password, name) => {
      const response = await fetch('http://localhost:5005/admin/auth/register', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          name,
        })
      });
      const data = await response.json();
      localStorage.setItem('token', data.token);
      navigate('/quiz/new');
    }} />
  </>;
}

export default Register;
