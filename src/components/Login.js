import React, { useState } from 'react';
import { loginUser } from '../api';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tokenUser, setTokenUser] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const loginInfo = await loginUser(email, password);

    if (!loginInfo) {
      setErrorMessage('Email or Password is incorrect');
      setError(true);
      return;
    }

    const token = loginInfo.token;
    setTokenUser(token);
    const user = loginInfo.user.email;
    storeCurrentUser('token', token);
    storeCurrentUser('email', user);
    setEmail('');
    setPassword('');
    setErrorMessage('');
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

        <input type="submit" value="LOGIN" />
        {errorMessage && error ? <h1>{errorMessage}</h1> : null}
      </form>
    </div>
  );
};
export default Login;
