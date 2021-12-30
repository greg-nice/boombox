
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import LogoutButton from './auth/LogoutButton';
import './NavBar.css';
import { login } from '../store/session';
import ProfileButton from './ProfileButton';
import { getSuserPlaylists } from '../store/playlists';

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const handleDemoClick = (e) => {
    (async () => {
      e.preventDefault();

      const email = "demo@aa.io";
      const password = 'password';

      await dispatch(login(email, password));
      await dispatch(getSuserPlaylists());
      // REDIRECT TO HOME PAGE IF ON LOGIN OR SIGNUP PAGES
    })();
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <ProfileButton user={sessionUser}/>
        {/* <LogoutButton /> */}
      </>
    )
  } else {
    sessionLinks = (
      <>
        <div id="login-buttons-group">
          <button id="demo-button"><span id="demo-span" onClick={(e) => handleDemoClick(e)}>Demo</span></button>
          <button id="signup-button">
            <NavLink id="signup-link" to='/sign-up' exact={true}>
              Sign Up
            </NavLink>
          </button>
          <button id="login-button">
            <NavLink id="login-link" to='/login' exact={true}>
              Log In
            </NavLink>
          </button>
        </div>
      </>
    );
  }

  return (
    <div className="top-bar">
      <header className="top-bar-and-user-menu">
        <div className="style-setting-div"><div className="inner-style-setting-div"></div></div>
        <div></div>
        <div></div>
        {/* <div>
          <NavLink className='nav-link' id="users-link" to='/users' exact={true}>
            Users
          </NavLink>
        </div> */}
        {sessionLinks}
      </header>
    </div>
  );
}

export default NavBar;
