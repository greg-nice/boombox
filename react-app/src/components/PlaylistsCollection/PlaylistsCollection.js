import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
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

    // useEffect(() => {
    //     (async () => {
    //         await dispatch(getSuserFollowedPlaylists());
    //         setPlaylistsLoaded(true)
    //     })();
    // }, [dispatch])

    // if (!playlistsLoaded)
    //     return null;

    const handlePlaylistClick = (playlistId) => {
        history.push(`/playlists/${playlistId}`)
    }

    return (
        <div className="homepage-container">
            {userPlaylists && userPlaylists.length > 0 &&
                <div>
                    <h2>Your Playlists</h2>
                    {userPlaylists.map(playlist => {
                        return (
                            <div key={playlist.id}>
                                <div onClick={() => handlePlaylistClick(playlist.id)}>{playlist.name}</div>
                            </div>
                        )
                    })}
                </div>
            }
            {followedPlaylists && followedPlaylistsArr && followedPlaylistsArr.length > 0 &&
                <div>
                    <h2>Playlists You Follow</h2>
                    {followedPlaylists && followedPlaylistsArr && followedPlaylistsArr.length > 0 && followedPlaylistsArr.map(playlist => {
                        return (
                            <div key={playlist.id}>
                                <div onClick={() => handlePlaylistClick(playlist.id)}>{playlist.name}</div>
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default PlaylistsCollection;