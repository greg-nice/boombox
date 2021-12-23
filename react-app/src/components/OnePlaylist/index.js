import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPlaylist } from '../../store/playlist';
// import { getPlaylistSongs } from '../../store/playlist_songs'
import OnePlaylistView from './OnePlaylist';
import { useParams } from 'react-router-dom';

const OnePlaylist = () => {
    const dispatch = useDispatch();
    const [playlistLoaded, setPlaylistLoaded] = useState(false);
    // const [playlistSongsLoaded, setPlaylistSongsLoaded] = useState(false);
    const {playlistId} = useParams();

    useEffect(() => {
        (async () => {
            await dispatch(getPlaylist(playlistId));
            setPlaylistLoaded(true);

        })();
    }, [dispatch, playlistId]);

    // useEffect(() => {
    //     if (playlistLoaded) {
    //         (async () => {
    //             await dispatch(getPlaylistSongs(playlistId));
    //             setPlaylistSongsLoaded(true)
    //         })();
    //     }
    // }, [dispatch, playlistLoaded])

    // if (playlistLoaded && playlistSongsLoaded) {
    if (playlistLoaded) {
        return (
            <>
                <OnePlaylistView />
            </>
        )
    } else {
        return null;
    }


}

export default OnePlaylist;