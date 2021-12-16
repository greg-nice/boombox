
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css';
import { login } from '../store/session';

const NavBar = ({loaded}) => {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();

    const email = "demo@aa.io";
    const password = 'password';

    return dispatch(login(email, password));
  }



  // swap this out for a real react component
  let ProfileButton 

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        {ProfileButton && <ProfileButton />}
        <LogoutButton />
      </>
    )
  } else {
    sessionLinks = (
      <>
        <div id="login-buttons-group">
          <button id="demo-button" onClick={handleClick}>Demo</button>
          <button id="signup-button">
            <NavLink id="sign-up-link" to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </button>
          <button id="login-button">
            <NavLink to='/login' exact={true} activeClassName='active'>
              Log In
            </NavLink>
          </button>
        </div>
      </>
    );
  }

  return (
    <nav className="nav-container">
      <div id="home-button-container">
        <NavLink to='/' exact={true} activeClassName='active'>
          BOOMBOX
        </NavLink>
      </div>
      <div>
        <NavLink to='/users' exact={true} activeClassName='active'>
          Users
        </NavLink>
      </div>
      <div>
        {loaded && sessionLinks}
      </div>
    </nav>
  );
}

export default NavBar;
