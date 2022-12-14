import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api';
import UnauthorizedRoute from '../ErrorPages/UnauthorizedRoute';


const Login = (props) => {
  const {stateRefresh, setStateRefresh, setIsUserAdmin, isUserAdmin} = props
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate();

  async function loginUserSubmit(event) {
    event.preventDefault();
    const loginInfo = await loginUser(email, password);
    if (loginInfo.name) {
      setErrorMessage("Username or password does not match!")
      setError(true);
      return;
    }

    if (!loginInfo.user.isActive){
      setErrorMessage("Your account has been deactivated. Please contact us")
      setError(true);
      return;
    }


    const cartItems = localStorage.getItem("cartItems")

    const token = loginInfo.token
    const user = JSON.stringify(loginInfo.user)
    localStorage.setItem("token", token);
    localStorage.setItem("user", user);
    setIsUserAdmin(loginInfo.user.isAdmin)
    setEmail('');
    setPassword('');
    navigate('/')
    setStateRefresh(stateRefresh + 1)
  }

  return (
<section className="vh-100">
  <div className="container-fluid">
    <div className="row ">
      <div className="col-sm-6 text-black my-5 pt-5">
        {error && (
                  <div
                    className="alert alert-danger text-center w-50 mx-auto"
                    role="alert"
                  >
                    {errorMessage}
                    <button
                      type="button"
                      className="btn-close ms-5"
                      aria-label="Close"
                      onClick={()=>{setError(false)}}
                    ></button>
                  </div>
                )}
        
        <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">


          <form onSubmit={loginUserSubmit} style={{width: '23rem'}}>

            <h3 className="fw-normal mb-3 pb-3" style={{letterSpacing: "1px"}}>Log in</h3>

            <div className="form-outline mb-4">
              <input type="text" value={email} onChange={(e) => {
             setEmail(e.target.value);
             setError(false);
           }} id="form2Example18" className="form-control form-control-lg" />
              <label className="form-label" htmlFor="form2Example18">Email address</label>
            </div>

            <div className="form-outline mb-4">
              <input type="password" value={password} onChange={(e) => {
             setPassword(e.target.value)
              setError(false)}} id="form2Example28" className="form-control form-control-lg" />
              <label className="form-label" htmlFor="form2Example28">Password</label>
            </div>

            <div className="pt-1 mb-4">
              <button className="btn btn-info btn-lg btn-block" type="submit">Login</button>
            </div>

            <p className="small mb-5 pb-lg-2"><a className="text-muted" href="#!">Forgot password?</a></p>
          </form>

        </div>

      </div>
      <div className="col-sm-6 px-0 d-none d-sm-block">
        <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt="Login image" className="w-100 vh-100" style={{objectFit: "cover", objectPosition: "left"}}></img>
      </div>
    </div>
  </div>
</section>
  )
}

export default Login;