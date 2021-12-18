import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getSuserPlaylists } from '../../store/playlists';
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

    // if (user && playlistsLoaded) {
    if (user) {
        return (
            <div className="sidebar-container">
                <div className="sidebar-subcontainer">
                    <div className="sidebar-item">Home</div>
                    <div className="sidebar-item">Search</div>
                    <div className="sidebar-item">Your Library</div>
                </div>
                <div className="sidebar-subcontainer">
                    <div className="sidebar-item">Create Playlist</div>
                    <div className="sidebar-item">Liked Songs</div>
                </div>
                {<div className="sidebar-subcontainer">
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