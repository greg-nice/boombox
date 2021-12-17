import React from 'react';
import { useSelector } from 'react-redux';
import './OnePlaylist.css'

const OnePlaylistView = () => {
    const playlist = useSelector(state => state.playlist);


    return (
        <div className="one-playlist-view">
            {/* {playlist.id} */}
            <div>{playlist.pic}<h1>{playlist.name}</h1>{playlist.description}</div>
            {/* {playlist.public} */}
            {/* <div>{playlist.playlist_songs}</div> */}
            {playlist.playlist_songs.length > 0 && (
                <div className="playlist-row">
                    <div>#</div>
                    <div>Title</div>
                    <div>Artist</div>
                    <div>Date Added</div>
                    <div>Length</div>
                    <div></div>
                    <div></div>
                </div>
            )}
            {playlist.playlist_songs?.map(playlist_song => {
                return (
                    <div className="playlist-row" key={playlist_song.id}>
                        <div>{playlist_song.order}</div>
                        <div>{playlist_song.song.title}</div>
                        <div>{playlist_song.song.artist}</div>
                        <div>{playlist_song.song.album}</div>
                        <div>{playlist_song.created_at}</div>
                        <div>{playlist_song.song.length}</div>
                        <div>Del</div>
                    </div>
                )
            })}
        </div>
    )
}

export default OnePlaylistView;