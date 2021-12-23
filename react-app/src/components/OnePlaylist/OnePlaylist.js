import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteSuserPlaylist, addSuserPlaylistSong, deleteSuserPlaylistSong } from '../../store/playlists';
import { getPlaylist } from '../../store/playlist';
import './OnePlaylist.css'

const OnePlaylistView = () => {
    const playlist = useSelector(state => state.playlist);
    const playlists = useSelector(state => state.userPlaylists);
    const history = useHistory();
    const dispatch = useDispatch();
    // const { playlistId } = useParams();
    const [showSongMenu, setShowSongMenu] = useState(false);
    const [showPlaylistMenuFloatFromSongMenu, setShowPlaylistMenuFloatFromSongMenu] = useState(false)
    const [songId, setSongId] = useState(null);
    const [playlistSongId, setPlaylistSongId] = useState(null);
    // const [isLoaded, setIsLoaded] = useState(true);

    const handleDeletePlaylistClick = (playlistId) => {
        dispatch(deleteSuserPlaylist(playlistId));
        history.push("/"); // have store return a confirmation?
        }

    const openSongMenuClick = (songId, playlistSongId) => {
        setSongId(songId);
        setPlaylistSongId(playlistSongId);
        setShowSongMenu(true);
    }

    const closeSongMenuClick = () => {
        setShowSongMenu(false)
    }

    const handlePlaylistMenuFloatFromSongMenu = () => {
        setShowPlaylistMenuFloatFromSongMenu(true);
    }

    const handleAddSongClick = (playlistId, songId) => {
        (async () => {
            await dispatch(addSuserPlaylistSong(playlistId, songId));
            if (Number(playlistId) === Number(playlist.id)) {
                await dispatch(getPlaylist(playlistId));
            }
        })();
    }
        // dispatch(addSuserPlaylistSong(playlistId, songId));
        // if (Number(playlistId) === Number(playlist.id)) {
            // setIsLoaded(false);
        // }
        // if (playlistId = playlist.id) {
        //     dispatch(addPlaylistSong);
        // } else {
        //     dispatch(addSuserPlaylistSong(playlistId, songId));
        // }
        // DO MORE HERE??

    const handleDeletePlaylistSongClick = (playlistId, playlistSongId) => {
        (async () => {
            await dispatch(deleteSuserPlaylistSong(playlistId, playlistSongId));
            await dispatch(getPlaylist(playlistId));
        })();
    }

    useEffect(() => {
        if (showSongMenu) {
            document.addEventListener('click', closeSongMenuClick);
            const playlistSongButton = document.getElementById("playlist-song-button");
            playlistSongButton.addEventListener('mouseover', handlePlaylistMenuFloatFromSongMenu);
            return () => {
                setShowPlaylistMenuFloatFromSongMenu(false);
                document.removeEventListener('click', closeSongMenuClick);
                playlistSongButton.removeEventListener('mouseover', handlePlaylistMenuFloatFromSongMenu);
            }
        } else {
            return;
        }
    }, [showSongMenu]);

    // useEffect(() => {
    //     if (!isLoaded) {
    //         (async () => {
    //             await dispatch(getPlaylist(playlistId));
    //             setIsLoaded(true);

    //         })();
    //     }
    // }, [dispatch, playlistId, isLoaded]);

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
                        {/* <div className="row-element header"><div>Options</div></div> */}
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
                            <div className="row-element">
                                <div>{Math.floor(playlist_song.song.length/60)}:{playlist_song.song.length % 60}</div>
                                <div>
                                    <button className="song-nav-dropdown-button" onClick={() => openSongMenuClick(playlist_song.song.id, playlist_song.id)}>. . .
                                    </button>

                                </div>
                            </div>
                            {/* <div className="row-element">
                                
                            </div> */}
                        </div>
                    )
                })}
                {showSongMenu && (
                    <div className='song-nav-dropdown-wrapper'>
                        <div className='song-nav-dropdown'>
                            <ul className='song-nav-menu-options-list'>
                                <li className="menu-list-item"><button className="menu-list-button"><span className="menu-button-span">Add to queue</span></button></li>
                                <li className="menu-list-item"><button className="menu-list-button"><span className="menu-button-span">Go to artist</span></button></li>
                                <li className="menu-list-item"><button className="menu-list-button"><span className="menu-button-span">Go to album</span></button></li>
                                <li className="menu-list-item"><button className="menu-list-button"><span className="menu-button-span">Save to your liked songs</span></button></li>
                                <li className="menu-list-item"><button className="menu-list-button" onClick={() => handleDeletePlaylistSongClick(playlist.id, playlistSongId)}><span className="menu-button-span">Remove from this playlist</span></button></li>
                                <li className="menu-list-item"><button className="menu-list-button" id="playlist-song-button"><span className="menu-button-span">Add to playlist</span></button></li>
                            </ul>
                        </div>
                    </div>
                )}
                {showSongMenu && showPlaylistMenuFloatFromSongMenu &&
                    <div className="playlist-song-dropdown-wrapper">
                        <div className='playlist-song-nav-dropdown'>
                            <ul className='playlist-song-options-list'>
                                {playlists.length > 0 && playlists.map(playlist => {
                                    return (
                                        <li className="menu-list-item" key={playlist.id}>
                                            <button className="menu-list-button" onClick={() => handleAddSongClick(playlist.id, songId)}><span className="menu-button-span">{playlist.name}</span></button>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>}
            </div>
        </div>
    )
}

export default OnePlaylistView;