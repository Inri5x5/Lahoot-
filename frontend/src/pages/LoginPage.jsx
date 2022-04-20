import LoginForm from '../components/LoginForm';
import AuthNavBar from '../components/AuthNavBar'
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { APICall } from '../helper-func';
import Loading from '../components/Loading'

function Login () {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const login = async (email, password) => {
    let data = null;
    try {
      setLoading(true);
      const requestBody = {
        email: email,
        password: password,
      };
      const headers = {
        'Content-Type': 'application/json',
      };
      data = await APICall(requestBody, '/admin/auth/login', 'POST', headers);
      localStorage.setItem('token', data.token);
      setLoading(false);
      navigate('/dashboard');
    } catch (err) {
      alert(err);
      setLoading(false);
    }
  }

  if (loading) {
    return <Loading />;
  }

  return <>
    <AuthNavBar></AuthNavBar>
    <LoginForm submit={login}/>
  </>;
}

export default Login;
