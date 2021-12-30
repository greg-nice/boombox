import React from 'react';
// import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, NavLink, Link } from 'react-router-dom';
// import { getSuserPlaylists } from '../../store/playlists';
import { createSimplePlaylist } from '../../store/playlists';
// import { clearPlaylist } from "../../store/playlist";
import './SideBar.css'

const SideBar = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    // const [playlistsLoaded, setPlaylistsLoaded] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
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
    if (sessionUser) {
        return (
            <div className="side-bar">
                <div className="sidebar-container">
                    <div className="logo-button-container">
                        <NavLink className="boombox-logo-link" to='/' exact={true}>
                            {"BOOMBOX"}
                        </NavLink>
                    </div>
                    <ul className="sidebar-buttons-container">
                        <li className="sidebar-item"><Link className="sidebar-link" to="/"><div className="sidebar-link-icon">XXXXX</div><span className="sidebar-link-text-span">Home</span></Link></li>
                        {/* <div className="sidebar-item"><Link className="sidebar-link" to="/search">Search</Link></div> */}
                        <li className="sidebar-item"><Link className="sidebar-link" to="/collections"><div className="sidebar-link-icon">XXXXX</div><span className="sidebar-link-text-span">Your Library</span></Link></li>
                    </ul>
                    <div className="rootlist-container">
                        <div className="rootlist-container-inner">
                            <button className="rootlist-item"><div className="rootlist-button-icon-container">XXXXX</div><span className="rootlist-button-text-span" onClick={() => handleCreatePlaylistClick()}>Create Playlist</span></button>
                            {/* <div className="sidebar-item"><Link className="sidebar-link" to='/collections/songs'>Liked Songs</Link></div> */}
                            <div className="border-container">
                                <hr id="hr"></hr>
                                <div id="border-div"></div>
                            </div>
                            <div id="playlists-container">
                                {playlists.map(playlist => {
                                    return (
                                        <div className="playlist-item" key={playlist.id} onClick={() => handlePlaylistClick(playlist.id)}>{playlist.name}</div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="sidebar-container">
                <div id="home-button-container">
                    <NavLink id="boombox-logo-link" className="nav-link" to='/' exact={true}>
                        {"BOOMBOX"}
                    </NavLink>
                </div>
                <div className="sidebar-subcontainer">
                    <div className="sidebar-item"><Link className="sidebar-link" to="/">Home</Link></div>
                    <div className="sidebar-item"><Link className="sidebar-link" to="/search">Search</Link></div>
                    <div className="sidebar-item">Your Library</div>
                </div>
                <div className="sidebar-subcontainer">
                    <div className="sidebar-item"><span>Create Playlist</span></div>
                    <div className="sidebar-item">Liked Songs</div>
                </div>
                <div className="sidebar-subcontainer" id="playlists-subcontainer">
                </div>
            </div>
        )
    }
}

export default SideBar;