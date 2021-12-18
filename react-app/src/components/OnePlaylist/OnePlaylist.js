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
            <div className="playlist-table">
                {playlist.playlist_songs.length > 0 && (
                    <div className="playlist-row">
                        <div className="row-element header"><div>#</div></div>
                        <div className="row-element header"><div>Title</div></div>
                        <div className="row-element header"><div>Artist</div></div>
                        <div className="row-element header"><div>Album</div></div>
                        <div className="row-element header"><div>Date Added</div></div>
                        <div className="row-element header"><div>Length</div></div>
                        <div className="row-element header"><div>Options</div></div>
                    </div>
                )}
                {playlist.playlist_songs.map(playlist_song => {
                    return (
                        <div className="playlist-row" key={playlist_song.id}>
                            <div className="row-element"><div>{playlist_song.order}</div></div>
                            <div className="row-element"><div>{playlist_song.song.title}</div></div>
                            <div className="row-element"><div>{playlist_song.song.artist}</div></div>
                            <div className="row-element"><div>{playlist_song.song.album}</div></div>
                            <div className="row-element"><div>{playlist_song.created_at}</div></div>
                            <div className="row-element"><div>{playlist_song.song.length}</div></div>
                            <div className="row-element"><div>[Button]</div></div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default OnePlaylistView;