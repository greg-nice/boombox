import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import { getSuserFollowedPlaylists } from '../../store/followedPlaylists';
import './PlaylistsCollection.css';

const FollowedPlaylists = () => {
    // const sessionUser = useSelector(state => state.session.user);
    const followedPlaylists = useSelector(state => state.followedPlaylists)
    const followedPlaylistsArr = Object.values(followedPlaylists);
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

    return (
        <div>
            <h1>Playlists You Follow</h1>
            {followedPlaylists && followedPlaylistsArr && followedPlaylistsArr.length > 0 && followedPlaylistsArr.map(playlist => {
                return (
                    <Link key={playlist.id} to={`/playlists/${playlist.id}`}><div>{playlist.name}</div></Link>
                )
            })}
        </div>
    )
}

export default FollowedPlaylists;