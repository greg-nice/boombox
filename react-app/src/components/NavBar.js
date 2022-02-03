
import React, { useContext, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import LogoutButton from './auth/LogoutButton';
import './NavBar.css';
import { login } from '../store/session';
import ProfileButton from './ProfileButton';
import AboutButton from './AboutButton';
import { getSuserPlaylists } from '../store/playlists';
import { SearchContext } from '../context/SearchContext';

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const { searchOn, setSearchOn, query, setQuery } = useContext(SearchContext);
  const history = useHistory();
  // const { query, setQuery } = useContext(SearchContext);

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

  // const currentPage = window.location.pathname

  // const checkPage = () => {
  //   if (window.location.pathname === "/search") {
  //     setSearchOn(true);
  //   } else {
  //     setSearchOn(false)
  //   }
  // }

  // useEffect(() => {
  //   checkPage();
  // }, [history]);

  useEffect(() => {
    history.listen(location => {
      if (location.pathname === "/search") {
        setSearchOn(true);
        return
      } else {
        setQuery("");
        setSearchOn(false);
        return;
      }
    });
    if (window.location.pathname === "/search") {
      setSearchOn(true);
      return;
    }
  }, [history]);

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
          <AboutButton />
          <button id="demo-button"><span id="demo-span" onClick={(e) => handleDemoClick(e)}>Demo</span></button>
          <button id="signup-button">
            <NavLink id="signup-link" to='/signup' exact={true}>
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
        {/* <div></div>
        <div></div> */}
        {/* <div>
          <NavLink className='nav-link' id="users-link" to='/users' exact={true}>
            Users
          </NavLink>
        </div> */}
        {!searchOn  && (
          <div></div>
        )}
        {searchOn && (
          <div className='searchbar-container'>
            <div className="searchbar-content">
              <div className="searchbar-content-2">
                <form className="searchbar-form">
                  <input
                  maxLength="80"
                  className="searchbar-input"
                  type="text"
                  placeholder="Artists, songs, or playlists"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  />
                </form>
                <div className="searchbar-icons-container">
                  <span className="search-icon-span">
                    <span className="material-icons">
                      search
                    </span>
                  </span>
                  {query && (
                    <button className="clear-search-button" onClick={() => setQuery("")}>
                      <span className="material-icons">
                        clear
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        {sessionLinks}
      </header>
    </div>
  );
}

export default NavBar;
