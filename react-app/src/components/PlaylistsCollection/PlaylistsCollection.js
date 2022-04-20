import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, Link, Redirect} from 'react-router-dom';
import './PlaylistsCollection.css';

const PlaylistsCollection = () => {
    const sessionUser = useSelector(state => state.session.user)
    const followedPlaylists = useSelector(state => state.followedPlaylists);
    const followedPlaylistsArr = Object.values(followedPlaylists);
    const userPlaylists = useSelector(state => state.userPlaylists);
    const history = useHistory();
    const [sorted, setSorted] = useState([]);

    useEffect(() => {
        let unsorted = [...userPlaylists];


        let sorted = unsorted
            .sort((a, b) => b.id - a.id)

        setSorted(sorted);
    }, [userPlaylists])    

    const handlePlaylistClick = (playlistId) => {
        history.push(`/playlists/${playlistId}`)
    }

    if (!sessionUser) {
        return <Redirect to="/"/>
    }

    return (
        <div className='homepage-top-container'>
            <div className='searchpage-spacer'></div>
            <div className="homepage-container">
                {userPlaylists && userPlaylists.length > 0 &&
                    <div className="playlist-collection-your-playlists-shelf">
                        <h2 className="homepage-h2">Your Playlists</h2>
                        <div className="library-grid-container">
                            {sorted && sorted.map(playlist => {
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
                        <h2 className="homepage-h2">Playlists You Follow</h2>
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
        </div>
    )
}

export default PlaylistsCollection;