import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import { getSuserPlaylists } from '../../store/playlists';
import './HomePage.css';

const HomePage = ( ) => {
    // const dispatch = useDispatch();
    const history = useHistory();
    // const [playlistsLoaded, setPlaylistsLoaded] = useState(false);
    const user = useSelector(state => state.session.user);
    const playlists = useSelector(state => state.userPlaylists);
    const [featuredPlaylistsLoaded, setFeaturedPlaylistsLoaded] = useState(false);
    const [featuredPlaylists, setFeaturedPlaylists] = useState("");
    const [shuffled, setShuffled] = useState([])
    // const [loadedCount, setLoadedCount] = useState(0);
    // const [loaded, setLoaded] = useState(false);
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

    // useEffect(() => {
    //     (async () => {
    //         console.log("before", loadedCount);
    //         await setLoadedCount(loadedCount + 1);
    //     })();
    // }, [playlists])

    useEffect(() => {
        let unshuffled = [...playlists];

        let shuffled = unshuffled
            .map((playlist) => ({ playlist, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ playlist }) => playlist)

        setShuffled(shuffled);
        console.log("changed")
    }, [playlists.length]) 

    // if (user && playlistsLoaded) {
    if (user && shuffled) {
        return (
            <div className="homepage-container">
                <h1 className="homepage-h1">Hello, {user.username}!</h1>
                {playlists.length === 0 && "<== Click 'Create Playlist' to start a new playlist"}
                {true && (
                    <div className="row-container">
                        <h2 className="homepage-h2">Jump back in</h2>
                        <div className="grid-container">
                            {shuffled.map((playlist, i) => {
                                if (i < 4) {
                                    return (
                                        <li className="grid-item" key={playlist.id}>
                                            <div className="cover-pic-container" onClick={() => handlePlaylistClick(playlist.id)}><img className="playlist-cover" src={playlist.pic}></img></div>
                                            <div className="playlist-link" onClick={() => handlePlaylistClick(playlist.id)}>{playlist.name}</div>
                                        </li>
                                    )
                                }
                            })}
                        </div>
                    </div>
                )}
                {featuredPlaylistsLoaded && featuredPlaylists && (
                    <div className="row-container">
                        <h2 className="homepage-h2">Featured Playlists</h2>
                        <div className="grid-container">
                            {featuredPlaylists.map(playlist => {
                                return (
                                    <div className="grid-item" key={playlist.id}>
                                        <div className="cover-pic-container" onClick={() => handlePlaylistClick(playlist.id)}>
                                            <img className="playlist-cover" src={playlist.pic} alt=""></img>
                                        </div>
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
                    <div className="row-container">
                        <h2 className="homepage-h2">Featured Playlists</h2>
                        <div className="grid-container">
                            {featuredPlaylists.map(playlist => {
                                return (
                                    <div className="grid-item" key={playlist.id}>
                                        <div className="cover-pic-container" onClick={() => handlePlaylistClick(playlist.id)}>
                                            <img className="playlist-cover" src={playlist.pic} alt=""></img>
                                        </div>
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