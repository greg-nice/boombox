import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPlaylist } from '../../store/playlist';
import OnePlaylistView from './OnePlaylist';
import { useParams } from 'react-router-dom';

const OnePlaylist = () => {
    const dispatch = useDispatch();
    const [listLoaded, setListLoaded] = useState(false);
    const {playlistId} = useParams();

    useEffect(() => {
        (async () => {
            await dispatch(getPlaylist(playlistId));
            setListLoaded(true);
        })();
    }, [dispatch, playlistId]);

    if (listLoaded) {
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