import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../api';

const RegisterUser = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState ('');
    const [firstName, setFirstName] = useState ('');
    const [lastName, setLastName] = useState ('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [isActive, setIsActive] = useState(true);
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
      <section
      style = {{
    backgroundImage:"url('https://images.unsplash.com/photo-1585163218097-43d81b016202?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1167&q=80')",
    backgroundSize: "cover",
    backgroundRepeat: 'no-repeat'
  }}>

  <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5" >
    <div className="row gx-lg-5 align-items-center mb-5">
      <div className="col-lg-6 mb-5 mb-lg-0">
        <h1 className="my-5 display-5 fw-bold ls-tight" >
          The best vintages <br />
          <span>for your experience</span>
        </h1>
        <h3 className="mb-4 opacity-70">
          Bringing the technology of Yesterday to you Tomorrow!
        </h3>
      </div>

      <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

        <div className="card bg-glass">
          <div className="card-body px-4 py-5 px-md-5">
            <form onSubmit={registerUserSubmit}>
              <div className="row">
                <div className="col-md-6 mb-4">
                  <div className="form-outline">
                    <input type="text" id="form3Example1" value={firstName} onChange ={(e)=>{
                      setFirstName(e.target.value);
                      setError(false);
                    }} className="form-control" />
                    <label className="form-label" htmlFor="form3Example1">First name</label>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="form-outline">
                    <input type="text" id="form3Example2" value={lastName} onChange ={(e)=>{
                      setLastName(e.target.value);
                      setError(false);
                    }} className="form-control" />
                    <label className="form-label" htmlFor="form3Example2">Last name</label>
                  </div>
                </div>
              </div>

              <div className="form-outline mb-4">
                <input type="email" value={email} onChange={(e) => {
                setEmail(e.target.value);
                setError(false);
           }} id="form3Example3" className="form-control" />
                <label className="form-label" htmlFor="form3Example3">Email address</label>
              </div>

              <div className="form-outline mb-4">
                <input type="password" value = {password} onChange={(e)=>{
                  setPassword(e.target.value);
                  setError(false);
                }} id="form3Example4" className="form-control" />
                <label className="form-label" htmlFor="form3Example4">Password</label>
              </div>

              <button type="submit" className="btn btn-primary btn-block mb-4" >
                Sign up
              </button>
              {errorMessage && error ? <h1>{errorMessage}</h1> : null}
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    )
              }
export default RegisterUser