import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/AuthForm.module.css';

function LoginForm ({ submit }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onSubmit = () => {
    submit(email, password);
  }

  return (<>
    <div className={styles.auth}>
      <h2>Login</h2>
      <h3>Welcome Back Master</h3>
      <label>Email:</label>
      <input
        type="text"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Password:</label>
      <input
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={onSubmit}>Login</button>
    </div>
  </>)
}

LoginForm.propTypes = {
  submit: PropTypes.func
}

export default LoginForm;
