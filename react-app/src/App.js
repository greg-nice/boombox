import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar/SideBar.js';
import ProtectedRoute from './components/auth/ProtectedRoute';
// import UsersList from './components/UsersList';
// import User from './components/User';
import HomePage from './components/HomePage/HomePage.js';
import OnePlaylist from './components/OnePlaylist/';
import OneAlbum from './components/OneAlbum/OneAlbum.js';
import OneArtist from './components/OneArtist/OneArtist';
import OneUser from './components/OneUser/OneUser.js';
import NowPlaying from './components/NowPlaying/NowPlaying.js';
import SearchPage from './components/SearchPage/SearchPage.js';
import { authenticate } from './store/session';
import { getSuserPlaylists } from './store/playlists';
import { getSuserFollowedPlaylists } from './store/followedPlaylists';
import './App.css';
import Collections from './components/Collections';
import TeaserBar from './components/TeaserBar/TeaserBar';
import PlaylistsCollection from './components/PlaylistsCollection/PlaylistsCollection';

function App() {
  const sessionUser = useSelector(state => state.session.user);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  if (sessionUser) {
    // console.log(sessionUser);
    (async () => {
      await dispatch(getSuserPlaylists());
      await dispatch(getSuserFollowedPlaylists());
    })();
  }

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>

      <div className="top-container">
        <Route path='/login' exact>
          <LoginForm />
        </Route>
        <Route path='/signup' exact>
          <SignUpForm />
        </Route>
        <NavBar />
        <SideBar />
        {sessionUser && <NowPlaying />}
        {!sessionUser && <TeaserBar />}
        <div className="main-view">
          <Switch>
            {/* <ProtectedRoute path='/users' exact >
              <UsersList/>
            </ProtectedRoute> */}
            {/* <ProtectedRoute path='/users/:userId' exact >
              <User />
            </ProtectedRoute> */}
            <Route path='/' exact >
              <HomePage />
            </Route>
            <Route path='/search' exact>
              <SearchPage />
            </Route>
            <Route path='/playlists/:playlistId' exact>
              <OnePlaylist />
            </Route>
            <Route path='/artists/:artistId' exact>
              <OneArtist />
            </Route>
            <Route path='/albums/:albumId' exact>
              <OneAlbum />
            </Route>
            <Route path='/users/:userId' exact>
              <OneUser />
            </Route>
            <ProtectedRoute path='/collections' exact>
              <Collections />
            </ProtectedRoute>
            <Route path='/collections/playlists' exact>
              <PlaylistsCollection />
            </Route>
            <Route path="/">
              <div>Page Not Found, 404</div>
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
