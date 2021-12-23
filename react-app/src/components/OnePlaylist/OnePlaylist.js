import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteSuserPlaylist } from '../../store/playlists';
import './OnePlaylist.css'

const OnePlaylistView = () => {
    const playlist = useSelector(state => state.playlist);
    const history = useHistory();
    const dispatch = useDispatch();

    const handleDeletePlaylistClick = (playlistId) => {
        dispatch(deleteSuserPlaylist(playlistId));
        history.push("/"); // have store return a confirmation?
        }


    return (
        <div className="one-playlist-view">
            {/* {playlist.id} */}
            <div className="playlist-title-tile-container">
                <div className="playlist-image-container">
                    {playlist.pic && <img className="playlist-image" src={playlist.pic} alt=""></img>}
                    {!playlist.pic && <img className="playlist-image" src="https://media.discordapp.net/attachments/920418592820957228/921562711932948530/Picture1.jpg" alt=""></img>}
                </div>
                <div>
                    <div><h1>{playlist.name}</h1></div>
                    <div>{playlist.description}</div>
                    <div className="playlist-stats">
                        {playlist.user.username}{playlist.playlist_songs.length > 0 && <span id="playlist-stats"> • {playlist.playlist_songs.length} {playlist.playlist_songs.length === 1 ? "song" : "songs"}, [playlist length calculation]</span>}
                        {/* {playlist.playlist_songs.length && playlist.playlist_songs.reduce()} */}
                    </div>
                </div>
            </div>
            {/* {playlist.public} */}
            {/* <div>{playlist.playlist_songs}</div> */}
            <div className="playlist-playbutton-section-container">
                <div><button>[Play]</button></div>
                <div><button>[Like]</button></div>
                <div><button>[Make public]</button></div>
                <div><button>[Edit details]</button></div>
                <div><button onClick={() => handleDeletePlaylistClick(playlist.id)}>Delete</button></div>
            </div>
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
                            <div className="row-element"><div id="title-in-row">{playlist_song.song.title}</div></div>
                            <div className="row-element"><div>{playlist_song.song.artist}</div></div>
                            <div className="row-element"><div>{playlist_song.song.album}</div></div>
                            <div className="row-element"><div>{playlist_song.created_at}</div></div>
                            <div className="row-element"><div>{Math.floor(playlist_song.song.length/60)}:{playlist_song.song.length % 60}</div></div>
                            <div className="row-element"><div>[Button]</div></div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default OnePlaylistView;