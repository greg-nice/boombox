import React, { useState, useEffect } from 'react';
// import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, NavLink, Link } from 'react-router-dom';
// import { getSuserPlaylists } from '../../store/playlists';
import { createSimplePlaylist } from '../../store/playlists';
// import { clearPlaylist } from "../../store/playlist";
// import { getSuserFollowedPlaylists } from '../../store/followedPlaylists';
import './SideBar.css'

const SideBar = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    // const [playlistsLoaded, setPlaylistsLoaded] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    const playlists = useSelector(state => state.userPlaylists);
    const followedPlaylists = useSelector(state => state.followedPlaylists)
    const followedPlaylistsArr = Object.values(followedPlaylists);
    // const [followedPlaylistsLoaded, setFollowedPlaylistsLoaded] = useState(false);
    const [showLibraryModal, setShowLibraryModal] = useState(false);
    const [showCreatePlaylistModal, setShowCreatePlaylistModal] = useState(false)

    const handleLibraryModal = () => {
        setShowLibraryModal(!showLibraryModal);
    }

    useEffect(() => {
        if (showLibraryModal) {
            document.addEventListener('click', handleLibraryModal);
            return () => document.removeEventListener('click', handleLibraryModal);
        } else {
            return;
        }
    }, [showLibraryModal])

    const handleCreatePlaylistModal = () => {
        setShowCreatePlaylistModal(!showCreatePlaylistModal);
    }

    useEffect(() => {
        if (showCreatePlaylistModal) {
            document.addEventListener('click', handleCreatePlaylistModal);
            return () => document.removeEventListener('click', handleCreatePlaylistModal)
        } else {
            return;
        }
    }, [showCreatePlaylistModal])

    // useEffect(() => {
    //     (async () => {
    //         await dispatch(getSuserPlaylists());
    //         setPlaylistsLoaded(true);
    //     })();
    // }, [dispatch]);

    // useEffect(() => {
    //     (async () => {
    //         await dispatch(getSuserFollowedPlaylists());
    //         setFollowedPlaylistsLoaded(true)
    //     })();
    // }, [dispatch])

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
                        <li className="sidebar-item"><Link className="sidebar-link" to="/"><div className="sidebar-link-icon"><span class="material-icons-outlined">
                            home
                        </span></div><span className="sidebar-link-text-span">Home</span></Link></li>
                        {/* <div className="sidebar-item"><Link className="sidebar-link" to="/search">Search</Link></div> */}
                        <li className="sidebar-item"><Link className="sidebar-link" to="/collections"><div className="sidebar-link-icon"><span class="material-icons-outlined">
                            stacked_bar_chart
                        </span></div><span className="sidebar-link-text-span">Your Library</span></Link></li>
                    </ul>
                    <div className="rootlist-container">
                        <div className="rootlist-container-inner">
                            <button className="rootlist-item"><div className="rootlist-button-icon-container"><span class="material-icons-outlined">
                                add_circle_outline
                            </span></div><span className="rootlist-button-text-span" onClick={() => handleCreatePlaylistClick()}>Create Playlist</span></button>
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
                                {followedPlaylistsArr && followedPlaylistsArr.length > 0 && followedPlaylistsArr.map(playlist => {
                                        return (
                                            <div className="playlist-item" key={playlist.id} onClick={() => handlePlaylistClick(playlist.id)}>{playlist.name}</div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
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
                        {/* <li className="sidebar-item"><Link className="sidebar-link" to="/search">Search</Link></li> */}
                        <li className="sidebar-item">
                            <div className="sidebar-link" onClick={handleLibraryModal}>
                                <div className="sidebar-link-icon">XXXXX</div>
                                <span className="sidebar-link-text-span">Your Library</span>
                            </div>
                            {showLibraryModal && (
                                <div className="library-modal-top-div">
                                    <div className="library-modal-content-container">
                                        <div className="library-modal-content">
                                            <div>
                                                <div className="library-modal-content-inner-wrapper">
                                                    <div className="library-modal-heading-container">
                                                        <p className="libary-modal-heading">Enjoy Your Library</p>
                                                    </div>
                                                    <p className="library-modal-text-body">Log in to see saved songs and playlists in Your Library.</p>
                                                    <div className="library-modal-button-section">
                                                        <button class="not-now-button" onClick={handleLibraryModal}>Not now</button>
                                                        <button class="login-button-from-library-modal" onClick={() => history.push("/login")}>Log in</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="library-modal-arrow"></div>
                                    </div>
                                </div>
                            )}
                        </li>
                    </ul>
                    <div className="rootlist-container">
                        <div className="rootlist-container-inner">
                            <button className="rootlist-item" onClick={handleCreatePlaylistModal}><div className="rootlist-button-icon-container">XXXXX</div><span className="rootlist-button-text-span">Create Playlist</span></button>
                            {showCreatePlaylistModal && (
                                <div className="library-modal-top-div">
                                    <div className="create-playlist-modal-content-container">
                                        <div className="library-modal-content">
                                            <div>
                                                <div className="library-modal-content-inner-wrapper">
                                                    <div className="library-modal-heading-container">
                                                        <p className="libary-modal-heading">Create a playlist</p>
                                                    </div>
                                                    <p className="library-modal-text-body">Log in to share and create playlists.</p>
                                                    <div className="library-modal-button-section">
                                                        <button class="not-now-button" onClick={handleCreatePlaylistModal}>Not now</button>
                                                        <button class="login-button-from-library-modal" onClick={() => history.push("/login")}>Log in</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="library-modal-arrow"></div>
                                    </div>
                                </div>
                            )}
                            {/* <div className="sidebar-item">Liked Songs</div> */}
                            <div className="border-container">
                                <hr id="hr"></hr>
                                <div id="border-div"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SideBar;