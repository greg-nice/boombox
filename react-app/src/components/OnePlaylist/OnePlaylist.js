import React from 'react';
import { useSelector } from 'react-redux';

const OnePlaylistView = () => {
    const playlist = useSelector(state => state.playlist);

    return (
        <>
            {playlist.id}
            {playlist.name}
            {playlist.pic}
            {playlist.description}
            {playlist.public}
            {playlist.created_at}
            {playlist.list_songs}
        </>
    )
}

export default OnePlaylistView;