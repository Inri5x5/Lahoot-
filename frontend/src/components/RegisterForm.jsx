import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/AuthForm.module.css';

function RegisterForm ({ submit }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');

  const onSubmit = () => {
    submit(email, password, name);
  }

  return (<>
    <div className={styles.auth}>
      <h2>Register</h2>
      <h3>Cant beat them, then join them</h3>
      <label>Email:</label>
      <input
        type="email"
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
      <label>Name:</label>
      <input
        type="text"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={onSubmit}> Register</button>
    </div>
  </>)
}

RegisterForm.propTypes = {
  submit: PropTypes.func
}

export default RegisterForm;
