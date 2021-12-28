import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { clearPlaylist } from "../../store/playlist";

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(clearPlaylist());
    await dispatch(logout());
  };

  return <button className="logout-button" onClick={onLogout}><span className="dropdown-span">Logout</span></button>;
};

export default LogoutButton;
