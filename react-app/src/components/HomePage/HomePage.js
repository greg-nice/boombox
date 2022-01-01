import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
// import { getSuserPlaylists } from '../../store/playlists';
import './HomePage.css';

const HomePage = () => {
    // const dispatch = useDispatch();
    const history = useHistory();
    // const [playlistsLoaded, setPlaylistsLoaded] = useState(false);
    const user = useSelector(state => state.session.user);
    const playlists = useSelector(state => state.userPlaylists);
    const [featuredPlaylistsLoaded, setFeaturedPlaylistsLoaded] = useState(false);
    const [featuredPlaylists, setFeaturedPlaylists] = useState("");
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     (async () => {
    //         await dispatch(getSuserPlaylists());
    //         setPlaylistsLoaded(true);
    //     })();
    // }, [dispatch]);
    useEffect(() => {
        (async () => {
            const response = await fetch("/api/playlists/featured")

            if (response.ok) {
                const featuredlists = await response.json();
                setFeaturedPlaylists(Object.values(featuredlists))
                setFeaturedPlaylistsLoaded(true);
            }
        })();
    }, []);

    const handlePlaylistClick = (playlistId) => {
        history.push(`/playlists/${playlistId}`)
    }

    // if (user && playlistsLoaded) {
    if (user && playlists) {
        return (
            <div className="homepage-container">
                <h1>Hello, {user.username}!</h1>
                {playlists.length === 0 && "<== Click 'Create Playlist' to start a new playlist"}
                {true && <ul className="grid-container">
                    {playlists.map((playlist, i) => {
                        if (true) {
                            return (
                                <li className="grid-item" key={playlist.id}>
                                    <div className="cover-container" onClick={() => handlePlaylistClick(playlist.id)}><img className="playlist-cover" src={playlist.pic}></img></div>
                                    <div className="playlist-link" onClick={() => handlePlaylistClick(playlist.id)}>{playlist.name}</div>
                                </li>
                            )
                        }
                    })}
                </ul>}
                {featuredPlaylistsLoaded && featuredPlaylists && (
                    <div>
                        <h2>Featured Playlists</h2>
                        <div className="playlist-row">
                            {featuredPlaylists.map(playlist => {
                                return (
                                    <div className="playlist-container" key={playlist.id}>
                                        <div className="cover-container" onClick={() => handlePlaylistClick(playlist.id)}><img className="playlist-cover" src={playlist.pic}></img></div>
                                        <div className="playlist-link" onClick={() => handlePlaylistClick(playlist.id)}>{playlist.name}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>
        )
    } else if (!user && featuredPlaylistsLoaded) {
        return (
            <div className="homepage-container">
                {featuredPlaylists && (
                    <div>
                        <h1>Featured Playlists</h1>
                        <div className="playlist-row">
                            {featuredPlaylists.map(playlist => {
                                return (
                                    <div className="playlist-container">
                                        <div className="cover-container" onClick={() => handlePlaylistClick(playlist.id)}><img className="playlist-cover" src={playlist.pic}></img></div>
                                        <div className="playlist-link" onClick={() => handlePlaylistClick(playlist.id)}>{playlist.name}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>
        );
    } else {
        return null;
    }


}

export default HomePage;