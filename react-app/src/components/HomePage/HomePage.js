import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
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
    const sessionUser = useSelector(state => state.session.user);
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
    if (user && shuffled && playlists.length !== 0) {
        return (
            <div className="homepage-container">
                <h1 className="homepage-h1">Hello, {user.username}!</h1>
                {true && (
                    <section className="homepage-row-container">
                        <div className="homepage-heading-container">
                            <div className="homepage-heading-second-container">
                                <div className="homepage-heading-third-container">
                                    <h2 className="homepage-h2">Jump back in</h2>
                                </div>
                            </div>
                        </div>
                        <div className="library-grid-container homepage-grid">
                            {shuffled.map((playlist, i) => {
                                return (
                                    <div className="library-item-container" key={playlist.id} onClick={() => handlePlaylistClick(playlist.id)}>
                                        <div className="library-item-content-container">
                                            <div className="library-item-cover-pic-container">
                                                <div className="library-item-cover-pic-wrapper">
                                                    <div>
                                                        <img className="library-playlist-cover" src={playlist.pic} alt=""></img>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="library-playlist-title-container">
                                                <Link className="library-playlist-title-link" to={`/playlists/${playlist.id}`}>
                                                    <div className="library-playlist-title-text">{playlist.name}</div>
                                                </Link>
                                                <div className="homepage-session-user-name">By {sessionUser.username}</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                )}
                {featuredPlaylistsLoaded && featuredPlaylists && (
                    <section className="homepage-row-container">
                        <div className="homepage-heading-container">
                            <div className="homepage-heading-second-container">
                                <div className="homepage-heading-third-container">
                                    <h2 className="homepage-h2">Featured Playlists</h2>
                                </div>
                            </div>
                        </div>
                        <div className="library-grid-container homepage-grid">
                            {featuredPlaylists.map(playlist => {
                                return (
                                    <div className="library-item-container" key={playlist.id} onClick={() => handlePlaylistClick(playlist.id)}>
                                        <div className="library-item-content-container">
                                            <div className="library-item-cover-pic-container">
                                                <div className="library-item-cover-pic-wrapper">
                                                    <div>
                                                        <img className="library-playlist-cover" src={playlist.pic} alt=""></img>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="library-playlist-title-container">
                                                <Link className="library-playlist-title-link" to={`/playlists/${playlist.id}`}>
                                                    <div className="library-playlist-title-text">{playlist.name}</div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                )}
            </div>
        )
    } else if (!user && featuredPlaylistsLoaded) {
        return (
            <div className="homepage-container">
                {featuredPlaylists && (
                    <section className="homepage-row-container">
                        <div className="homepage-heading-container">
                            <div className="homepage-heading-second-container">
                                <div className="homepage-heading-third-container">
                                    <h2 className="homepage-h2">Featured Playlists</h2>
                                </div>
                            </div>
                        </div>
                        <div className="library-grid-container homepage-grid">
                            {featuredPlaylists.map(playlist => {
                                return (
                                    <div className="library-item-container" key={playlist.id} onClick={() => handlePlaylistClick(playlist.id)}>
                                        <div className="library-item-content-container">
                                            <div className="library-item-cover-pic-container">
                                                <div className="library-item-cover-pic-wrapper">
                                                    <div>
                                                        <img className="library-playlist-cover" src={playlist.pic} alt=""></img>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="library-playlist-title-container">
                                                <Link className="library-playlist-title-link" to={`/playlists/${playlist.id}`}>
                                                    <div className="library-playlist-title-text">{playlist.name}</div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                )}
            </div>
        );
    } else {
        return null;
    }


}

export default HomePage;