import LoginForm from '../components/LoginForm';
import AuthNavBar from '../components/AuthNavBar'
import ErrorModal from '../components/ErrorModal'
import { useNavigate } from 'react-router-dom';
import React from 'react';

function Login () {
  const navigate = useNavigate();
  const ref = React.useRef();

  const [isError, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  React.useEffect(() => {
    const checkIfClickedOutside = e => {
      if (isError && ref.current && !ref.current.contains(e.target)) {
        setError(false)
      }
    }
    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [isError])

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5005/admin/auth/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        })
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (err) {
      setErrorMessage('Something is wrong');
      setError(true);
    }
  }

  return <>
    <div ref={ref}>
      <AuthNavBar></AuthNavBar>
      <LoginForm submit={login}/>
      { isError && <ErrorModal error={errorMessage}></ErrorModal> }
    </div>
  </>;
}

export default Login;
