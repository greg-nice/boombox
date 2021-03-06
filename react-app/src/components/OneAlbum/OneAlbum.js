import React, { useEffect, useState } from 'react';
import { useParams, Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import './OneAlbum.css';
import { addSuserPlaylistSong } from '../../store/playlists';
import { eagerLoadAlbumThunk, eagerClearQueueThunk, eagerLoadAlbumFromSongThunk, lazyLoadAlbumSongThunk } from '../../store/queue';



const OneAlbum = () => {
    const { albumId } = useParams();
    const [album, setAlbum] = useState("");
    const [albumLoaded, setAlbumLoaded] = useState(false);
    const [showDummyPlayModal, setShowDummyPlayModal] = useState(false);
    const playlists = useSelector(state => state.userPlaylists);
    const [songId, setSongId] = useState(null);
    const [showSongMenu, setShowSongMenu] = useState(false);
    const [showPlaylistMenuFloatFromSongMenu, setShowPlaylistMenuFloatFromSongMenu] = useState(false);
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();

    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/albums/${albumId}`)

            if (response.ok) {
                const album = await response.json();
                album.songs.sort((a, b) => a.song_num - b.song_num)
                setAlbum(album);
                setAlbumLoaded(true);
            }
        })();
    }, []);

    const handleAlbumPlayClick = (album) => {
        (async () => {
            await dispatch(eagerClearQueueThunk());
            await dispatch(eagerLoadAlbumThunk(album));
        })();
    }

    const handleAlbumSongPlayClick = (album, songIndex) => {
        (async () => {
            await dispatch(eagerClearQueueThunk());
            await dispatch(eagerLoadAlbumFromSongThunk(album, songIndex));
        })();
    }

    const handleDummyPlayModal = () => {
        setShowDummyPlayModal(!showDummyPlayModal);
    }

    useEffect(() => {
        if (showDummyPlayModal) {
            document.addEventListener('click', handleDummyPlayModal);
            return () => document.removeEventListener('click', handleDummyPlayModal);
        } else {
            return;
        }
    }, [showDummyPlayModal]);

    const openSongMenuClick = (songId) => {
        setSongId(songId);
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
        })();
    }

    const handleAddAlbumSongToQueueClick = (song) => {
        (async () => {
            await dispatch(lazyLoadAlbumSongThunk(song));
        })();
    }

    useEffect(() => {
        if (showSongMenu) {
            document.addEventListener('click', closeSongMenuClick);
            const albumSongButton = document.getElementById("album-song-button");
            albumSongButton.addEventListener('mouseover', handlePlaylistMenuFloatFromSongMenu);
            return () => {
                setShowPlaylistMenuFloatFromSongMenu(false);
                document.removeEventListener('click', closeSongMenuClick);
                albumSongButton.removeEventListener('mouseover', handlePlaylistMenuFloatFromSongMenu);
            }
        } else {
            return;
        }
    }, [showSongMenu]);

    const albumDuration = (album) => {
        const duration = album.songs.reduce((accum, song) => {
            return accum += song.length;
        }, 0)
        if (Math.floor(duration / 60 / 60) >= 1) {
            return `${Math.floor(duration / 60 / 60)} hr, ${Math.floor(duration / 60 % 60)} min, ${duration % 60} sec`
        } else {
            return `${Math.floor(duration / 60)} min, ${duration % 60} sec`;
        }
    };



    if (!albumLoaded || !album) {
        return null;
    }

    return (
        <div>
            <div className="os-content">
                <div className="scroll-child">
                    <div className="presentation">
                        <div className="content-spacing">
                            <div className="background-color"></div>
                            <div className="background-gradient"></div>
                            <div className="album-art-container">
                                <div className="album-art-wrapper">
                                    <img className="album-art" src={album.pic} alt=""></img>
                                </div>
                            </div>
                            <div className="album-info-container">
                                <h2 className="h2-type">Album</h2>
                                <span className="album-title-container"><h1 className="album-title-text">{album.title}</h1></span>
                                <div className="album-data-container">
                                    <div className="artist-info-container">
                                        <Link className="artist-name" to={`/artists/${album.artist.id}`}>{album.artist.name}</Link>
                                    </div>
                                    <span className="album-length-info dot-before">{album.songs.length} {album.songs.length === 1 ? "song" : "songs"}, <span>{albumDuration(album)}</span></span>
                                </div>
                            </div>
                        </div>
                        <div className="second-background-color"></div>
                        <div className="playlist-playbutton-section-container">
                            {sessionUser && <div className="playbutton-container" onClick={() => handleAlbumPlayClick(album)}><span className="material-icons-outlined md-48" id="album-play-button-from-one-album">
                                play_circle_filled
                            </span></div>}
                            {!sessionUser && <div className="playbutton-container" onClick={handleDummyPlayModal}><span className="material-icons-outlined md-48" id="playlist-play-button-from-one-playlist">
                                play_circle_filled
                            </span></div>}
                            {showDummyPlayModal && (
                                <div className="dummy-play-modal-top-div">
                                    <div className="dummy-play-modal-second-div">
                                        <div className="dummy-play-content-container">
                                            <div className="dummy-play-album-cover-container">
                                                <img className="dummy-play-cover" src={album.pic} alt=''></img>
                                            </div>
                                            <div className="dummy-play-modal-text-container">
                                                <h2 className="dummy-play-heading">Start listening with a free Boombox account</h2>
                                                <button className="dummy-play-signin-button" onClick={() => history.push("/signup")}>SIGN UP FREE</button>
                                                <p className="dummy-play-login-prompt">Already have an account? <Link className="dummy-play-login-link" to="/login">Log in</Link></p>
                                            </div>
                                        </div>
                                        <div className="dummy-play-close-box">
                                            <button className="dummy-play-close-button">Close</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        {showSongMenu && (
                            <div className='song-nav-dropdown-wrapper'>
                                <div className='song-nav-dropdown'>
                                    <ul className='song-nav-menu-options-list'>
                                        {sessionUser && <li className="menu-list-item"><button className="menu-list-button" onClick={() => handleAddAlbumSongToQueueClick(album.songs.filter(song => song.id === songId)[0])}><span className="menu-button-span">Add to queue</span></button></li>}
                                        <li className="menu-list-item"><Link className="menu-link" to={`/artists/${album.artist_id}`}><button className="menu-list-button"><span className="menu-button-span">Go to artist</span></button></Link></li>
                                        {sessionUser && playlists.length !== 0 && <li className="menu-list-item"><button className="menu-list-button" id="album-song-button"><span className="menu-button-span">Add to playlist</span></button></li>}
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
                            </div>
                        }
                        <div className="playlist-table">
                            {album.songs.length > 0 && (
                                <div className="playlist-row">
                                    <div className="row-element header first-column"><div>#</div><div>Title</div></div>
                                    {/* <div className="row-element header"><div>Album</div></div>
                                    <div className="row-element header"><div>Date Added</div></div> */}
                                    <div className="row-element header"><div>Length</div></div>
                                    {/* <div className="row-element header"><div>Options</div></div> */}
                                </div>
                            )}
                            {sessionUser && album.songs.map(song => {
                                return (
                                    <div className="playlist-row playlist-song-row" key={song.id} onDoubleClick={() => handleAlbumSongPlayClick(album, album.songs.indexOf(song))}>
                                        <div className="row-element first-column">
                                            <div><span className="song-number-span" onClick={() => handleAlbumSongPlayClick(album, album.songs.indexOf(song))}>{song.song_num}</span></div>
                                            {/* <div className="album-cover-container"><img className="table-album-cover" src={song.albumDetails.pic} alt=""></img></div> */}
                                            <div>
                                                <div id="title-in-row">{song.title}</div>
                                                <div><Link className="song-nav-link" to={`/artists/${song.artist_id}`}>{song.artist}</Link></div>
                                            </div>
                                        </div>
                                        {/* <div className="row-element"><div><Link className="song-nav-link" to={`/albums/${song.album_id}`}>{song.album}</Link></div></div> */}
                                        {/* <div className="row-element"><div>{dateAdded(playlist_song.created_at)}</div></div> */}
                                        <div className="row-element">
                                            <div className="song-length-text">{Math.floor(song.length / 60)}:{song.length % 60 >= 10 ? song.length % 60 : "0" + song.length % 60}</div>
                                            {sessionUser && <div>
                                                <button className="song-nav-dropdown-button" onClick={() => openSongMenuClick(song.id)}><span className="material-icons-outlined">
                                                    more_horiz
                                                </span>
                                                </button>
                                            </div>}
                                            {/* {showSongMenu && <SongMenu key={playlist_song.id} playlist={playlist} playlistSongId={playlistSongId} />} */}
                                        </div>
                                        {/* <div className="row-element">
                                            
                                        </div> */}
                                    </div>
                                )
                            })}
                            {!sessionUser && album.songs.map(song => {
                                return (
                                    <div className="playlist-row playlist-song-row" key={song.id} onDoubleClick={handleDummyPlayModal}>
                                        <div className="row-element first-column">
                                            <div><span className="song-number-span" onClick={handleDummyPlayModal}>{song.song_num}</span></div>
                                            {/* <div className="album-cover-container"><img className="table-album-cover" src={song.albumDetails.pic} alt=""></img></div> */}
                                            <div>
                                                <div id="title-in-row">{song.title}</div>
                                                <div><Link className="song-nav-link" to={`/artists/${song.artist_id}`}>{song.artist}</Link></div>
                                            </div>
                                        </div>
                                        {/* <div className="row-element"><div><Link className="song-nav-link" to={`/albums/${playlist_song.song.album_id}`}>{playlist_song.song.album}</Link></div></div> */}
                                        {/* <div className="row-element"><div>{dateAdded(playlist_song.created_at)}</div></div> */}
                                        <div className="row-element">
                                            <div className="song-length-text">{Math.floor(song.length / 60)}:{song.length % 60 >= 10 ? song.length % 60 : "0" + song.length % 60}</div>
                                        </div>
                                        {/* <div className="row-element">
                                            
                                        </div> */}
                                    </div>
                                )
                            })}
    
                            {/* <div className="album-tracks-table-container"></div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OneAlbum;