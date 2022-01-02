import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
// import { getSuserFollowedPlaylists } from '../../store/followedPlaylists';
import './PlaylistsCollection.css';

const PlaylistsCollection = () => {
    // const sessionUser = useSelector(state => state.session.user);
    const followedPlaylists = useSelector(state => state.followedPlaylists);
    const followedPlaylistsArr = Object.values(followedPlaylists);
    const userPlaylists = useSelector(state => state.userPlaylists);
    const history = useHistory();
    // const [playlistsLoaded, setPlaylistsLoaded] = useState(false);
    // const dispatch = useDispatch();
    const [sorted, setSorted] = useState([]);
    // const [go, setGo] = useState(false);

    // useEffect(() => {
    //     (async () => {
    //         await dispatch(getSuserFollowedPlaylists());
    //         setPlaylistsLoaded(true)
    //     })();
    // }, [dispatch])

    // if (!playlistsLoaded)
    //     return null;

    // useEffect(() => {
    //     setTimeout(() => setGo(true), 100);
    // }, []);

    useEffect(() => {
        console.log("hi", userPlaylists)
        let unsorted = [...userPlaylists];


        let sorted = unsorted
            .sort((a, b) => b.id - a.id)

        setSorted(sorted);
    }, [userPlaylists])    

    const handlePlaylistClick = (playlistId) => {
        history.push(`/playlists/${playlistId}`)
    }

    return (
        <div className="homepage-container">
            {userPlaylists && userPlaylists.length > 0 && sorted &&
                <div>
                    <h2>Your Playlists</h2>
                    <div className="library-grid-container">
                        {sorted.map(playlist => {
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
                </div>
            }
            {followedPlaylists && followedPlaylistsArr && followedPlaylistsArr.length > 0 &&
                <div>
                    <h2>Playlists You Follow</h2>
                    <div className="library-grid-container">
                        {followedPlaylists && followedPlaylistsArr && followedPlaylistsArr.length > 0 && followedPlaylistsArr.map(playlist => {
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
                </div>
            }
        </div>
    )
}

export default PlaylistsCollection;