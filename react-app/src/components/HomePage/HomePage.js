import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSuserPlaylists } from '../../store/playlists';

const HomePage = () => {
    const dispatch = useDispatch();
    const [playlistsLoaded, setPlaylistsLoaded] = useState(false);
    const user = useSelector(state => state.session.user);
    const playlists = useSelector(state => state.playlists);

    useEffect(() => {
        (async () => {
            await dispatch(getSuserPlaylists());
            setPlaylistsLoaded(true);
        })();
    }, [dispatch]);

    if (user && playlistsLoaded) {
        return (
            <>
                <h1>Hello, {user.username}!</h1>
            </>
        )
    } else {
        return null;
    }


}

export default HomePage;