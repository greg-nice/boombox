import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const validate = () => {
    const validationErrors = [];

    // console.log("validating!")
    if (username.length < 4 || username.length > 20) validationErrors.push("username : Username must be between 4 and 20 characters.");
    if (email.length < 6 || email.length > 255) validationErrors.push("email : Email address must be between 6 and 255 characters.");
    if (password.length < 8 || password.length > 25) validationErrors.push("password : Password must be between 8 and 25 characters.");
    if (password !== repeatPassword) validationErrors.push("password : Passwords must match.");

    // console.log(validationErrors)
    return validationErrors;
  }

  const onSignUp = async (e) => {
    e.preventDefault();

    const errors = validate();

    if (errors.length > 0) {
      setErrors(errors);
    } else {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      } else {
        setErrors([])
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className="login-top-container">
      <div className='login-second-top-container'>
        <div className="login-header-container">
          <div className="head">
            <Link className="signup-homelink" to="/">BOOMBOX</Link>
            <br></br>
            <br></br>
            <span className="marketing-text">Sign up to start listening.</span>
            <br></br>
          </div>
        </div>
        <div className="login-main-container">
          <div className="login-content-container">
            <div className="login-errors-container">
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <form className="login-form" onSubmit={onSignUp}>
              <div>
                <label>User Name</label>
                <input
                  type='text'
                  name='username'
                  onChange={updateUsername}
                  value={username}
                ></input>
              </div>
              <div>
                <label>Email</label>
                <input
                  type='text'
                  name='email'
                  onChange={updateEmail}
                  value={email}
                ></input>
              </div>
              <div>
                <label>Password</label>
                <input
                  type='password'
                  name='password'
                  onChange={updatePassword}
                  value={password}
                ></input>
              </div>
              <div>
                <label>Repeat Password</label>
                <input
                  type='password'
                  name='repeat_password'
                  onChange={updateRepeatPassword}
                  value={repeatPassword}
                  required={true}
                ></input>
              </div>
              <div className="signup-button-from-signup-container">
                <button className="signup-button-from-signup" type='submit'><div className="signup-button-inner-div">Sign Up</div></button>
              </div>
            </form>
            <div className="sign-up-section">
              <div className='h2-wrapper'><h2 className="sign-up-h2">Have an account? <Link to="/login">Log in</Link></h2></div>
              {/* <div className="sign-up-button-container"></div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
