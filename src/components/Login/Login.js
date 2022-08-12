import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api';
import { storeLocalStorage } from '../utils/utils';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const loginInfo = await loginUser(email, password);

    if (!loginInfo) {
      setErrorMessage('Email or Password is incorrect');
      setError(true);
      return;
    }

    const token = loginInfo.token;
    storeLocalStorage('token', token);
    storeLocalStorage('email', email);
    setEmail('');
    setPassword('');
    setErrorMessage('');
    // navigate ('/') Navigate to Homepage
  }

  return (
    <div >
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(false);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(false);
          }}
        />
        <input type="submit" value="Login" />
        {errorMessage && error ? <h1>{errorMessage}</h1> : null}
      </form>
    </div>
  );
};

export default Login;
