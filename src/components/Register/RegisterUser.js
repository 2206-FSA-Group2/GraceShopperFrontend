import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../api';

const RegisterUser = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState ('');
    const [firstName, setFirstName] = useState ('');
    const [lastName, setLastName] = useState ('');
    const [errorMessage, setErrorMessage] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    async function registerUserSubmit(event){
        event.preventDefault();
        if (password.length < 8) {
          setErrorMessage('');
          setPasswordError('Password must be 8 characters or longer');
          setError(true);
          return;
        }
        if (!firstName || !lastName || !password || !email){
          setPassword('');
          setErrorMessage('One or more fields are incomplete');
          setError(true);
          return;
        }
        const isActive = true;
        const isAdmin = false;
        console.log(isActive)
        console.log(isAdmin)
        console.log(email)
        console.log(password)
        console.log(firstName)
        console.log(lastName)
        const {user, token, error} = await registerUser(email, password, firstName, lastName, isActive, isAdmin);
        console.log(user)
        
        if (!registrationInfo) {
          setPasswordError('');
          setErrorMessage('That e-mail has been taken');
          setError(true);
          return;
        }
        setEmail('');
        setPassword('');
        setFirstName('');
        setLastName('');
        navigate('/login');
    }
    
    


    return (
        <div>
            <form onSubmit={registerUserSubmit}>
        <input
          type="text"
          placeholder="E-mail"
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
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
            setError(false);
          }}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
            setError(false);
          }}
        />
        <button type = "submit">Register</button>
        {errorMessage && error ? <h1>{errorMessage}</h1> : null}
      </form>
        </div>
    )
}

export default RegisterUser