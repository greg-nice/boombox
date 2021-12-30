import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link, useParams } from 'react-router-dom';
import { deleteSuserPlaylist, addSuserPlaylistSong, deleteSuserPlaylistSong } from '../../store/playlists';
import { unfollowPlaylist, addPlaylistFollow, getPlaylist } from '../../store/playlist';
import { eagerLoadPlaylistThunk, eagerLoadPlaylistFromSongThunk, lazyLoadPlaylistSongThunk , eagerClearQueueThunk} from '../../store/queue';
import './OnePlaylist.css'
import PlaylistEditModal from '../PlaylistEditModal/PlaylistEditModal';
import { getSuserFollowedPlaylists } from '../../store/followedPlaylists';


const OnePlaylistView = () => {
    const playlist = useSelector(state => state.playlist);
    playlist.playlist_songs.sort((a, b) => a.order - b.order);
    const playlists = useSelector(state => state.userPlaylists);
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();
    const dispatch = useDispatch();
    const { playlistId } = useParams();
    const [showSongMenu, setShowSongMenu] = useState(false);
    const [showPlaylistMenuFloatFromSongMenu, setShowPlaylistMenuFloatFromSongMenu] = useState(false)
    const [showPlaylistEditModal, setShowPlaylistEditModal] = useState(false);
    const [songId, setSongId] = useState(null);
    const [playlistSongId, setPlaylistSongId] = useState(null);
    // const [isLoaded, setIsLoaded] = useState(true);

    const handlePlaylistPlayClick = (playlist) => {
        (async () => {
            await dispatch(eagerClearQueueThunk());
            await dispatch(eagerLoadPlaylistThunk(playlist))
        })();
    }

    const handleDummyPlaylistPlayClick = () => {
        // displays popup message to non-logged in user suggesting login/signup
    }

    const handleLikePlaylistClick = () => {
        (async () => {
            await dispatch(addPlaylistFollow(playlist.id));
            await dispatch(getSuserFollowedPlaylists());
        })();
    }

    const handleUnlikePlaylistClick = () => {
        (async () => {
            await dispatch(unfollowPlaylist(playlist.id));
            await dispatch(getSuserFollowedPlaylists());
        })();
    }

    const handlePlaylistEditClick = () => {
        setShowPlaylistEditModal(!showPlaylistEditModal);
    }

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

    const handleSongPlayClick = (playlist, playlistSongOrder) => {
        (async () => {
            await dispatch(eagerClearQueueThunk());
            await dispatch(eagerLoadPlaylistFromSongThunk(playlist, playlistSongOrder));
        })();
    }

    const handleAddPlaylistSongToQueueClick = (playlistName, playlistSongArr) => {
        (async () => {
            await dispatch(lazyLoadPlaylistSongThunk(playlistName, playlistSongArr[0]))
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
    //     if (showPlaylistEditModal) {
    //         document.addEventListener('click', handlePlaylistEditClick);
    //         return () => {
    //             document.removeEventListener('click', handlePlaylistEditClick)
    //         }
    //     } else {
    //         return;
    //     }
    // }, [showPlaylistEditModal, handlePlaylistEditClick])

    const playlistDuration = (playlist) => {
        const duration = playlist.playlist_songs.reduce((accum, playlist_song) => {
            return accum += playlist_song.song.length;
        }, 0)
        if (Math.floor(duration / 60 / 60) >= 1) {
            return `${Math.floor(duration / 60 / 60)} hr, ${Math.floor(duration / 60 % 60)} min, ${duration % 60} sec`
        } else {
            return `${Math.floor(duration / 60)} min, ${duration % 60} sec`;
        }
    };

    const dateAdded = (datetimeObj) => {
        // const now = new Date();
        return datetimeObj;
    }

        //     duration += playlist_song.length;
        //     console.log(playlist_song.song);
        // }
        // return `${Math.floor(duration / 60)} hours, ${duration % 60} seconds`
    // }
    // useEffect(() => {
    //     if (!isLoaded) {
    //         (async () => {
    //             await dispatch(getPlaylist(playlistId));
    //             setIsLoaded(true);

    //         })();
    //     }
    // }, [dispatch, playlistId, isLoaded]);

    if (!playlist) {
        (async () => { await getPlaylist(playlistId)})();
    }

    return (
        <div className="one-playlist-view">
            {/* {playlist.id} */}
            <div className="playlist-title-tile-container">
                <div className="playlist-image-container">
                    {playlist.pic && <img className="playlist-image" src={playlist.pic} alt=""></img>}
                    {/* {!playlist.pic && <img className="playlist-image" src="https://media.discordapp.net/attachments/920418592820957228/921562711932948530/Picture1.jpg" alt=""></img>} */}
                </div>
                <div>
                    <div className="playlist-name-container"><h1>{playlist.name}</h1></div>
                    <div>{playlist.description}</div>
                    <div className="playlist-stats">
                        <Link className="username-link" to={`/users/${playlist.user.id}`}><span id="username-span">{playlist.user.username}</span></Link>{playlist.playlist_songs.length > 0 && <span id="playlist-stats"> • {playlist.playlist_songs.length} {playlist.playlist_songs.length === 1 ? "song" : "songs"}, {playlistDuration(playlist)}</span>}
                        {/* {playlist.playlist_songs.length && playlist.playlist_songs.reduce()} */}
                    </div>
                </div>
            </div>
            {/* {playlist.public} */}
            {/* <div>{playlist.playlist_songs}</div> */}
            <div className="playlist-playbutton-section-container">
                {sessionUser && <div><button onClick={() => handlePlaylistPlayClick(playlist)}>Play</button></div>}
                {!sessionUser && <div><button onClick={() => handleDummyPlaylistPlayClick(playlist)}>Play</button></div>}
                {sessionUser && sessionUser.id !== playlist.user_id && !playlist.list_followers[sessionUser.id] && <div><button onClick={() => handleLikePlaylistClick()}>Follow</button></div>}
                {sessionUser && sessionUser.id !== playlist.user_id && playlist.list_followers[sessionUser.id] && <div><button onClick={() => handleUnlikePlaylistClick()}>Following</button></div>}
                {/* {sessionUser && sessionUser.id === playlist.user_id && <div><button>[Make public]</button></div>} */}
                {sessionUser && sessionUser.id === playlist.user_id && <div><button onClick ={() => handlePlaylistEditClick(setShowPlaylistEditModal)}>Edit details</button></div>}
                {sessionUser && sessionUser.id === playlist.user_id && <div><button onClick={() => handleDeletePlaylistClick(playlist.id)}>Delete</button></div>}
            </div>
            {showPlaylistEditModal && (
                <PlaylistEditModal playlist={playlist} handlePlaylistEditClick={handlePlaylistEditClick}/>
                )
            }
            <div className="playlist-table">
                {playlist.playlist_songs.length > 0 && (
                    <div className="playlist-row">
                        <div className="row-element header first-column"><div>#</div><div>Title</div></div>
                        <div className="row-element header"><div>Album</div></div>
                        <div className="row-element header"><div>Date Added</div></div>
                        <div className="row-element header"><div>Length</div></div>
                        {/* <div className="row-element header"><div>Options</div></div> */}
                    </div>
                )}
                {playlist.playlist_songs.map(playlist_song => {
                    return (
                        <div className="playlist-row playlist-song-row" key={playlist_song.id} onDoubleClick={() => handleSongPlayClick(playlist, playlist_song.order)}>
                            <div className="row-element first-column">
                                <div><span onClick={() => handleSongPlayClick(playlist, playlist_song.order)}>{playlist_song.order}</span></div>
                                <div className="album-cover-container"><img className="table-album-cover" src={playlist_song.song.albumDetails.pic} alt=""></img></div>
                                <div>
                                    <div id="title-in-row">{playlist_song.song.title}</div>
                                    <div><Link className="song-nav-link" to={`/artists/${playlist_song.song.artist_id}`}>{playlist_song.song.artist}</Link></div>
                                </div>
                            </div>
                            <div className="row-element"><div><Link className="song-nav-link" to={`/albums/${playlist_song.song.album_id}`}>{playlist_song.song.album}</Link></div></div>
                            <div className="row-element"><div>{dateAdded(playlist_song.created_at)}</div></div>
                            <div className="row-element">
                                <div className="song-length-text">{Math.floor(playlist_song.song.length / 60)}:{playlist_song.song.length % 60 >= 10 ? playlist_song.song.length % 60 : "0" + playlist_song.song.length % 60}</div>
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
                                <li className="menu-list-item"><button className="menu-list-button" onClick={() => handleAddPlaylistSongToQueueClick(playlist.name, playlist.playlist_songs.filter(playlist_song => {return playlist_song.id === playlistSongId}))}><span className="menu-button-span">Add to queue</span></button></li>
                                <li className="menu-list-item"><Link className="menu-link" to={`/artists/${playlist.playlist_songs.filter(playlist_song => {return playlist_song.id === playlistSongId})[0].song.artist_id}`}><button className="menu-list-button"><span className="menu-button-span">Go to artist</span></button></Link></li>
                                <li className="menu-list-item"><Link className="menu-link" to={`/albums/${playlist.playlist_songs.filter(playlist_song => { return playlist_song.id === playlistSongId })[0].song.album_id}`}><button className="menu-list-button"><span className="menu-button-span">Go to album</span></button></Link></li>
                                {/* <li className="menu-list-item"><button className="menu-list-button"><span className="menu-button-span">Save to your liked songs</span></button></li> */}
                                {sessionUser && sessionUser.id === playlist.user_id && <li className="menu-list-item"><button className="menu-list-button" onClick={() => handleDeletePlaylistSongClick(playlist.id, playlistSongId)}><span className="menu-button-span">Remove from this playlist</span></button></li>}
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