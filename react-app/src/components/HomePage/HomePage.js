import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getSuserPlaylists } from '../../store/playlists';

const HomePage = () => {
    // const dispatch = useDispatch();
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
    if (user && playlists) {
        return (
            <>
                <h1>Hello, {user.username}!</h1>
                {playlists.map(playlist => {
                    return (
                        <div key={playlist.id} onClick={() => handlePlaylistClick(playlist.id)}>{playlist.name}</div>
                    )
                })}
            </>
        )
    } else {
        return null;
    }


}

export default HomePage;