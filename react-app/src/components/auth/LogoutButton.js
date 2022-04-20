import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { clearSuserPlaylists } from "../../store/playlists";
import { eagerClearQueueThunk } from '../../store/queue';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(clearSuserPlaylists());
    await dispatch(eagerClearQueueThunk());
    await dispatch(logout());
  };

  return <button className="logout-button" onClick={onLogout}><span className="dropdown-span">Logout</span></button>;
};

export default LogoutButton;
