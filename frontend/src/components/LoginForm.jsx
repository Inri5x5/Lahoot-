import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/AuthForm.module.css';

function LoginForm ({ submit }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const toSubmit = () => {
    submit(email, password);
  }

  return (<>
    <div className={styles.auth}>
      <h2>Login</h2>
      <h3>Welcome Back Master</h3>
      <label>Email:</label>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        name="email"
      />
      <label>Password:</label>
      <input
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        name="password"
      />
      <button onClick={toSubmit}>Login</button>
    </div>
  </>)
}

LoginForm.propTypes = {
  submit: PropTypes.func
}

export default LoginForm;
