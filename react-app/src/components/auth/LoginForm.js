import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { getSuserPlaylists } from '../../store/playlists';
import { login } from '../../store/session';
import './LoginForm.css';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
      e.preventDefault();
      const data = await dispatch(login(email, password));
      if (data) {
        setErrors(data);
      }
      await dispatch(getSuserPlaylists());
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className="login-top-container">
      <div className="login-second-top-container">
        <div className="login-header-container">
          <div className="head">
            <Link className="homelink" to="/">BOOMBOX</Link>
          </div>
        </div>
        <div className="login-main-container">
          <div className="login-content-container">
            <div className="login-content-container-2">
              <p className="login-continue-message-p">To continue, log in to Boombox.</p>
              <div className='login-errors-container'>
                {errors.map((error, ind) => (
                  <div key={ind}>{error}</div>
                ))}
              </div>
              <form className="login-form" onSubmit={onLogin}>
                <div className="login-form-input-row-container">
                  <div className="login-form-label-container">
                    <label className="login-form-label">Email address</label>
                  </div>
                  <input
                    className='login-form-input'
                    name='email'
                    type='text'
                    placeholder='Enter address'
                    value={email}
                    onChange={updateEmail}
                  />
                </div>
                <div className="login-form-input-row-container">
                  <div className="login-form-label-container">
                    <label className="login-form-label">Password</label>
                  </div>
                  <input
                    className="login-form-input"
                    name='password'
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={updatePassword}
                  />
                </div>
                <div className='login-button-container'>
                  <button className="login-button" type='submit'>
                    <div className="login-button-inner-div">
                      <p className='login-button-inner-p'>
                        Log In
                      </p>
                    </div>
                  </button>
                </div>
              </form>
              <div className="sign-up-section">
                <div className='h2-wrapper'><h2 className="sign-up-h2">Don't have an account?</h2></div>
                <div className="sign-up-button-container"><Link className="sign-up-link-from-login" to="/signup">Sign up for BOOMBOX</Link></div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
  );
};

export default LoginForm;
