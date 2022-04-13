import RegisterForm from '../components/RegisterForm';
import AuthNavBar from '../components/AuthNavBar'
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { APICall } from '../apiCall';
import Loading from '../components/Loading'

function Register () {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const register = async (email, password, name) => {
    try {
      setLoading(true);
      const requestBody = {
        email: email,
        password: password,
        name: name,
      };
      const headers = {
        'Content-Type': 'application/json',
      };
      const data = await APICall(requestBody, '/admin/auth/register', 'POST', headers);
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Loading />;
  }

  return <>
    <AuthNavBar></AuthNavBar>
    <RegisterForm submit={register} />
  </>;
}

export default Register;
