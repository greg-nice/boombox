import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link, useHistory} from 'react-router-dom';
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
  const history = useHistory();

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

  const handleClick = () => {
    history.push("/login")
  }

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className="signup-top-container">
      <div className='signup-second-top-container'>
        <div className="signup-header-container">
            <Link className="signup-homelink" to="/">BOOMBOX</Link>
            <span className="marketing-text">Sign up for free to start listening.</span>
        </div>
        <div className="signup-main-container">
        
          <h2 className="signup-with-email-text">Sign up with your email address</h2>
          <div className="login-errors-container">
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <form className="login-form" onSubmit={onSignUp}>
            <div className="signup-form-input-row-container">
              <div className="signup-form-label-container">
                <label className="signup-form-label">What's your email?</label>
              </div>
              <input
                className="signup-form-input"
                type='text'
                name='email'
                onChange={updateEmail}
                value={email}
                placeholder='Enter your email.'
              ></input>
            </div>
            <div className="signup-form-input-row-container">
              <div className="signup-form-label-container">
                <label className="signup-form-label">Create a password</label>
              </div>
              <input
                className="signup-form-input"
                type='password'
                name='password'
                onChange={updatePassword}
                value={password}
                placeholder='Create a password.'
              ></input>
            </div>
            <div className="signup-form-input-row-container">
              <div className="signup-form-label-container">
                <label className="signup-form-label">Confirm your password</label>
              </div>
              <input
                className="signup-form-input"
                type='password'
                name='repeat_password'
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
                placeholder='Enter your password again.'
              ></input>
            </div>
            <div className="signup-form-input-row-container">
              <div className="signup-form-label-container">
                <label className="signup-form-label">What should we call you?</label>
              </div>
              <input
                className="signup-form-input"
                type='text'
                name='username'
                onChange={updateUsername}
                value={username}
                placeholder='Enter a profile name.'
              ></input>
              <div className='signup-form-profile-input-message'>This appears on your profile.</div>
            </div>
            <div className="signup-button-from-signup-container">
              <button className="signup-button-from-signup" type='submit'><div className="signup-button-inner-div">Sign Up</div></button>
            </div>
          </form>
          <p id="login-link-container-p">
              <span>Have an account? <span className="login-link-span" onClick={handleClick}>Log in</span>.</span>
            {/* <div className="sign-up-button-container"></div> */}
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
