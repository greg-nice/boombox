import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar/SideBar.js';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import HomePage from './components/HomePage/HomePage.js';
import OnePlaylist from './components/OnePlaylist/';
import OneAlbum from './components/OneAlbum/OneAlbum.js'
import NowPlaying from './components/NowPlaying/NowPlaying.js';
import { authenticate } from './store/session';
import { getSuserPlaylists } from './store/playlists';
import './App.css';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      await dispatch(getSuserPlaylists());
      setLoaded(true);
    })();
  }, [dispatch]);


  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <div className="top-container">
        <SideBar className="side-bar"/>
        <NowPlaying className="now-playing-bar"/>
        <div className="main-view">
          <NavBar className="top-bar"/>
          <Switch>
            <Route path='/login' exact={true}>
              <LoginForm />
            </Route>
            <Route path='/sign-up' exact={true}>
              <SignUpForm />
            </Route>
            <ProtectedRoute path='/users' exact={true} >
              <UsersList/>
            </ProtectedRoute>
            <ProtectedRoute path='/users/:userId' exact={true} >
              <User />
            </ProtectedRoute>
            <ProtectedRoute path='/' exact={true} >
              <HomePage />
            </ProtectedRoute>
            <ProtectedRoute path='/playlists/:playlistId' exact={true}>
              <OnePlaylist />
            </ProtectedRoute>
            <ProtectedRoute path='/albums/:albumId' exact={true}>
              <OneAlbum />
            </ProtectedRoute>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
