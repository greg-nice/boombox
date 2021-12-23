import React from 'react';
// import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, NavLink } from 'react-router-dom';
// import { getSuserPlaylists } from '../../store/playlists';
import { createSimplePlaylist } from '../../store/playlists';
// import { clearPlaylist } from "../../store/playlist";
import './SideBar.css'

const SideBar = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    // const [playlistsLoaded, setPlaylistsLoaded] = useState(false);
    const user = useSelector(state => state.session.user);
    const playlists = useSelector(state => state.userPlaylists);

    // useEffect(() => {
    //     (async () => {
    //         await dispatch(getSuserPlaylists());
    //         setPlaylistsLoaded(true);
    //     })();
    // }, [dispatch]);

    const handlePlaylistClick = (playlistId) => {
        history.push(`/playlists/${playlistId}`)
    }

    const handleCreatePlaylistClick = () => {
        dispatch(createSimplePlaylist());
        history.push(`/`);
    }

    // if (user && playlistsLoaded) {
    if (user) {
        return (
            <div className="sidebar-container">
                <div id="home-button-container">
                    <NavLink id="boombox-logo-link" className="nav-link" to='/' exact={true}>
                        {"BOOMBOX"}
                    </NavLink>
                </div>
                <div className="sidebar-subcontainer">
                    <div className="sidebar-item">Home</div>
                    <div className="sidebar-item">Search</div>
                    <div className="sidebar-item">Your Library</div>
                </div>
                <div className="sidebar-subcontainer">
                    <div className="sidebar-item"><span onClick={() => handleCreatePlaylistClick()}>Create Playlist</span></div>
                    <div className="sidebar-item">Liked Songs</div>
                </div>
                {<div className="sidebar-subcontainer" id="playlists-subcontainer">
                    {playlists.map(playlist => {
                        return (
                            <div className="sidebar-item" key={playlist.id} onClick={() => handlePlaylistClick(playlist.id)}>{playlist.name}</div>
                        )
                    })}
                </div>}
            </div>
        )
    } else {
        return (
            null
        )
    }
}

export default SideBar;