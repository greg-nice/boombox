import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
// import { clearPlaylist } from "../../store/playlist";
import { clearSuserPlaylists } from "../../store/playlists";

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(clearSuserPlaylists())
    await dispatch(logout());
    //clear Queue?
  };

  return <button className="logout-button" onClick={onLogout}><span className="dropdown-span">Logout</span></button>;
};

export default LogoutButton;
