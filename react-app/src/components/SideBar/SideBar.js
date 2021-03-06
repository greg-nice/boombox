import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, NavLink, Link } from 'react-router-dom';
import { createSimplePlaylist } from '../../store/playlists';
import './SideBar.css'

const SideBar = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const playlists = useSelector(state => state.userPlaylists);
    const followedPlaylists = useSelector(state => state.followedPlaylists)
    const followedPlaylistsArr = Object.values(followedPlaylists);
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

    // const handlePlaylistClick = (playlistId) => {
    //     history.push(`/playlists/${playlistId}`)
    // }

    const handleCreatePlaylistClick = () => {
        (async () => {
            const newId = await dispatch(createSimplePlaylist());
            history.push(`/playlists/${newId}`);
        })();
    }

    if (sessionUser) {
        return (
            <div className="side-bar">
                <div className="sidebar-container">
                    <div className="logo-button-container">
                        <Link className="boombox-logo-link" to='/' exact>
                            {"BOOMBOX"}
                        </Link>
                    </div>
                    <ul className="sidebar-buttons-container">
                        <li className="sidebar-item"><NavLink className="sidebar-link" activeStyle={{fontWeight: "bold", color: "white" }} exact to="/"><div className="sidebar-link-icon"><span className="material-icons-outlined">
                            home
                        </span></div><span className="sidebar-link-text-span">Home</span></NavLink></li>
                        <li className="sidebar-item"><NavLink className="sidebar-link" activeStyle={{ fontWeight: "bold", color: "white" }} exact to="/search"><div className="sidebar-link-icon"><span className="material-icons">
                            search
                        </span></div><span className="sidebar-link-text-span">Search</span></NavLink></li>
                        <li className="sidebar-item"><NavLink className="sidebar-link" activeStyle={{ fontWeight: "bold", color: "white" }} to="/collections"><div className="sidebar-link-icon"><span className="material-icons-outlined">
                            stacked_bar_chart
                        </span></div><span className="sidebar-link-text-span">Your Library</span></NavLink></li>
                    </ul>
                    <div className="rootlist-container">
                        <div className="rootlist-container-inner">
                            <button className="rootlist-item" onClick={() => handleCreatePlaylistClick()}><div className="rootlist-button-icon-container"><span className="material-icons-outlined">
                                add_circle_outline
                            </span></div><span className="rootlist-button-text-span">Create Playlist</span></button>
                            <div className="border-container">
                                <hr id="hr"></hr>
                                <div id="border-div"></div>
                            </div>
                            <div id="playlists-container">
                                {playlists.map(playlist => {
                                    return (
                                        <NavLink className="playlist-item" key={playlist.id} activeStyle={{ color: "white" }} exact to={`/playlists/${playlist.id}`}>{playlist.name}</NavLink>
                                    )
                                })}
                                {followedPlaylistsArr && followedPlaylistsArr.length > 0 && followedPlaylistsArr.map(playlist => {
                                        return (
                                            <NavLink className="playlist-item" key={playlist.id} activeStyle={{ color: "white" }} exact to={`/playlists/${playlist.id}`}>{playlist.name}</NavLink>
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
                        <Link className="boombox-logo-link" to='/' exact>
                            {"BOOMBOX"}
                        </Link>
                    </div>
                    <ul className="sidebar-buttons-container">
                        <li className="sidebar-item"><NavLink className="sidebar-link" activeStyle={{ fontWeight: "bold", color: "white" }} exact to="/"><div className="sidebar-link-icon"><span className="material-icons-outlined">
                            home
                        </span></div><span className="sidebar-link-text-span">Home</span></NavLink></li>
                        <li className="sidebar-item"><NavLink className="sidebar-link" activeStyle={{ fontWeight: "bold", color: "white" }} exact to="/search"><div className="sidebar-link-icon"><span className="material-icons">
                            search
                        </span></div><span className="sidebar-link-text-span">Search</span></NavLink></li>
                        <li className="sidebar-item">
                            <div className="sidebar-link" onClick={handleLibraryModal}>
                                <div className="sidebar-link-icon">
                                    <span className="material-icons-outlined">
                                        stacked_bar_chart
                                    </span>
                                </div>
                                <span className="sidebar-link-text-span">
                                    Your Library
                                </span>
                            </div>
                        </li>
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
                                                        <button className="not-now-button" onClick={handleLibraryModal}>Not now</button>
                                                        <button className="login-button-from-library-modal" onClick={() => history.push("/login")}>Log in</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="library-modal-arrow"></div>
                                    </div>
                                </div>
                            )}
                        
                    </ul>
                    <div className="rootlist-container">
                        <div className="rootlist-container-inner">
                            <button className="rootlist-item" onClick={handleCreatePlaylistModal}>
                                <div className="rootlist-button-icon-container">
                                    <span className="material-icons-outlined">
                                        add_circle_outline
                                    </span>
                                </div>
                                <span className="rootlist-button-text-span">
                                    Create Playlist
                                </span>
                            </button>
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
                                                        <button className="not-now-button" onClick={handleCreatePlaylistModal}>Not now</button>
                                                        <button className="login-button-from-library-modal" onClick={() => history.push("/login")}>Log in</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="library-modal-arrow"></div>
                                    </div>
                                </div>
                            )}
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