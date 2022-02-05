import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link, useParams } from 'react-router-dom';
import { deleteSuserPlaylist, addSuserPlaylistSong, deleteSuserPlaylistSong, makePlaylistPublic, makePlaylistPrivate, getSuserPlaylists } from '../../store/playlists';
import { unfollowPlaylist, addPlaylistFollow, getPlaylist } from '../../store/playlist';
import { eagerLoadPlaylistThunk, eagerLoadPlaylistFromSongThunk, lazyLoadPlaylistSongThunk, eagerLoadSearchSongThunk, eagerClearQueueThunk} from '../../store/queue';
import './OnePlaylist.css';
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
    const [showPlaylistButtonsModal, setShowPlaylistButtonsModal] = useState(false);
    const [showSongMenu, setShowSongMenu] = useState(false);
    const [showPlaylistMenuFloatFromSongMenu, setShowPlaylistMenuFloatFromSongMenu] = useState(false)
    const [showPlaylistEditModal, setShowPlaylistEditModal] = useState(false);
    const [songId, setSongId] = useState(null);
    const [playlistSongId, setPlaylistSongId] = useState(null);
    const [showDummyPlayModal, setShowDummyPlayModal] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const [query, setQuery] = useState("");
    const [results, setResults] = useState("");
    const [photoEdit, setPhotoEdit] = useState(false);
    // const [isLoaded, setIsLoaded] = useState(true);

    const handlePlaylistPlayClick = (playlist) => {
        (async () => {
            await dispatch(eagerClearQueueThunk());
            await dispatch(eagerLoadPlaylistThunk(playlist))
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

    const handlePlaylistMenuClick = () => {
        setShowPlaylistButtonsModal(!showPlaylistButtonsModal);
    }

    useEffect(() => {
        if (showPlaylistButtonsModal) {
            document.addEventListener('click', handlePlaylistMenuClick);
            return () => document.removeEventListener('click', handlePlaylistMenuClick);
        } else {
            return;
        }
    }, [showPlaylistButtonsModal]);

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
        (async () => {
            await dispatch(deleteSuserPlaylist(playlistId));
            await dispatch(getSuserPlaylists());
            history.push("/collections/playlists"); // have store return a confirmation?
        })();
    };
   

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

    useEffect(() => {
        if (playlist) {
            setQuery("");
            setResults("");
            if (sessionUser && playlist.playlist_songs.length === 0 && playlist.user_id === sessionUser.id) {
                setShowSearch(true);
            } else {
                setShowSearch(false);
            }
        }
    }, [playlist.id, sessionUser]);

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
        const newObj = datetimeObj.split(" ").slice(1, 4);
        if (newObj[0][0] === "0") {
            newObj[0] = newObj[0].slice(1);
        }
        return newObj[1] + " " + newObj[0] + ", " + newObj[2];
    }

    const handlePlaylistPublicClick = () => {
        (async () => {
            await dispatch(makePlaylistPublic(playlistId));
            await dispatch(getPlaylist(playlistId))
        })();
    }

    const handlePlaylistPrivateClick = () => {
        (async () => {
            await dispatch(makePlaylistPrivate(playlistId));
            await dispatch(getPlaylist(playlistId))
        })();
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

    function gotoBottom(id) {
        var element = document.getElementById(id);
        element.scrollTop = element.scrollHeight - element.clientHeight;
    }

    const handleSearchClick = () => {
        (async () => {
            await setShowSearch(!showSearch);
            gotoBottom("one-playlist-os-padding");
        })();
    }

    const handleCloseSearchClick = () => {
        setResults("");
        setQuery("");
        handleSearchClick();
    }

    useEffect(() => {
        if (query) {
            (async () => {
                const response = await fetch('/api/search/from_playlist', {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ "query": query })
                })

                if (response.ok) {
                    const searchResults = await response.json();
                    console.log(searchResults);
                    setResults(searchResults);
                }
            })();
        } else {
            setResults("");
            return;
        }
    }, [query])

    const checkPlaylistHasSong = (song) => {
        for (let i = 0; i < playlist.playlist_songs.length; i++) {
            let playlist_song = playlist.playlist_songs[i];
            if (playlist_song.song.id === song.id) {
                return true;
            }
        }
        return false;
    }

    const handleAddClick = (songId) => {
        (async () => {
            await dispatch(addSuserPlaylistSong(playlist.id, songId));
            dispatch(getPlaylist(playlist.id));
        })();
    }

    const handleSearchSongPlayClick = (song) => {
        (async () => {
            await dispatch(eagerClearQueueThunk());
            await dispatch(eagerLoadSearchSongThunk(song));
        })();
    }

    const handleEditPlaylistClickFromName = () => {
        setShowPlaylistEditModal(true);
    }

    const handleEditPlaylistClickFromDescription = () => {
        setShowPlaylistEditModal(true);
    }

    const handleEditPhotoClick = () => {
        setPhotoEdit(true);
        setShowPlaylistEditModal(true);
    }

    if (!playlist) {
        (async () => { await getPlaylist(playlistId)})();
    }

    return (
        <div id="one-playlist-view">
            <div id="one-playlist-os-padding">
                <div id="one-playlist-os-content">

            
                    <div className='searchpage-spacer'></div>
                    <div id="one-playlist-main-view-container">
                        <section id="one-playlist-main-section">


                            <div className="playlist-title-tile-container">
                                <div className="playlist-image-container">
                                    <div className="playlist-image-container-2">
                                        <div className="playlist-image-container-3">

                                            {playlist.pic && <img className="playlist-image" src={playlist.pic} alt=""></img>}
                                            {/* {!playlist.pic && <img className="playlist-image" src="https://media.discordapp.net/attachments/920418592820957228/921562711932948530/Picture1.jpg" alt=""></img>} */}
                                            {playlist.pic && sessionUser && sessionUser.id === playlist.user_id &&
                                                <div className="edit-playlist-image-screen">
                                                    <div className="edit-playlist-image-screen-2" onClick={handleEditPhotoClick}>
                                                        <button className="edit-playlist-image-screen-button">
                                                            <div className='edit-playlist-image-screen-button-inner-div'>
                                                                <span class="material-icons-outlined md-48">
                                                                    edit
                                                                </span>
                                                                <span className='edit-playlist-image-screen-button-span'>
                                                                    Choose photo
                                                                </span>
                                                            </div>
                                                        </button>
                                                    </div>
                                                </div>
                                            }

                                        </div>
                                    </div>
                                </div>
                                <div className="playlist-title-container">
                                    <h2 className="h2-type">Playlist</h2>
                                    {sessionUser && sessionUser.id === playlist.user_id &&
                                        <span className="playlist-name-span">
                                            <button className="playlist-name-button editable" onClick={handleEditPlaylistClickFromName}>
                                                <span className="playlist-name-button-inner-span">
                                                    <h1 className="playlist-name-button-h1">
                                                        {playlist.name}
                                                    </h1>
                                                </span>
                                            </button>
                                        </span>
                                    }
                                    {(!sessionUser || sessionUser.id !== playlist.user_id) && 
                                        <span className="playlist-name-span">
                                            <button className="playlist-name-button">
                                                <span className="playlist-name-button-inner-span">
                                                    <h1 className="playlist-name-button-h1">
                                                        {playlist.name}
                                                    </h1>
                                                </span>
                                            </button>
                                        </span>
                                    }
                                    <div>
                                        <h2 className='playlist-description-h2'>
                                            {sessionUser && sessionUser.id === playlist.user_id && 
                                                <button className='playlist-description-button editable' onClick={handleEditPlaylistClickFromDescription}>
                                                    <p className='playlist-description-p editable'>
                                                        {playlist.description}
                                                    </p>
                                                </button>
                                            }
                                            {(!sessionUser || sessionUser.id !== playlist.user_id) &&
                                                <button className='playlist-description-button'>
                                                    <p className='playlist-description-p'>
                                                        {playlist.description}
                                                    </p>
                                                </button>
                                            }
                                        </h2>
                                        <div className="playlist-stats">
                                            <Link className="username-link" to={`/users/${playlist.user.id}`}><span id="username-span">{playlist.user.username}</span></Link>{Object.keys(playlist.list_followers).length !== 0 && <span id="playlist-stats"> • {Object.keys(playlist.list_followers).length} {Object.keys(playlist.list_followers).length === 1 ? "like" : "likes"}</span>}{playlist.playlist_songs.length > 0 && <span id="playlist-stats"> • {playlist.playlist_songs.length} {playlist.playlist_songs.length === 1 ? "song" : "songs"}, {playlistDuration(playlist)}</span>}
                                            {/* {playlist.playlist_songs.length && playlist.playlist_songs.reduce()} */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* {playlist.public} */}
                            {/* <div>{playlist.playlist_songs}</div> */}
                            <div className="playlist-playbutton-section-container">
                                <div className="action-bar-row">
                                    {sessionUser && <div className="playbutton-container" onClick={() => handlePlaylistPlayClick(playlist)}><span className="material-icons-outlined md-48" id="playlist-play-button-from-one-playlist">
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
                                                        <img className="dummy-play-cover" src={playlist.pic} alt=''></img>
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
                                    {sessionUser && sessionUser.id !== playlist.user_id && !playlist.list_followers[sessionUser.id] && <div><button className="following-button" onClick={() => handleLikePlaylistClick()}>Follow</button></div>}
                                    {sessionUser && sessionUser.id !== playlist.user_id && playlist.list_followers[sessionUser.id] && <div><button className="following-button" onClick={() => handleUnlikePlaylistClick()}>Following</button></div>}
                                    {/* {sessionUser && sessionUser.id === playlist.user_id && <div><button>[Make public]</button></div>} */}
                                    {sessionUser && sessionUser.id === playlist.user_id &&
                                        <div className="playlist-dropdown-button-container">
                                            <button className="playlist-dropdown-button" onClick={() => handlePlaylistMenuClick()}>
                                                <span className="material-icons-outlined md-36">
                                                    more_horiz
                                                </span>
                                            </button>
                                        </div>
                                    }
                                </div>
                            </div>
                            {showPlaylistButtonsModal && (
                                <div className="playlist-dropdown-wrapper">
                                    <div className="song-nav-dropdown">
                                        <ul className="song-nav-menu-options-list">
                                            {playlist.public === false && <li className="menu-list-item"><button className="menu-list-button" onClick={() => handlePlaylistPublicClick()}><span className="menu-button-span">Make playlist Public</span></button></li>}
                                            {playlist.public === true && <li className="menu-list-item"><button className="menu-list-button" onClick={() => handlePlaylistPrivateClick()}><span className="menu-button-span">Make playlist Private</span></button></li>}
                                            <li className="menu-list-item"><button className="menu-list-button" onClick={() => handlePlaylistEditClick(setShowPlaylistEditModal)}><span className="menu-button-span">Edit details</span></button></li>
                                            <li className="menu-list-item"><button className="menu-list-button" onClick={() => handleDeletePlaylistClick(playlist.id)}><span className="menu-button-span">Delete</span></button></li>
                                        </ul>
                                    </div>
                                </div>
                            )}
                            {showPlaylistEditModal && (
                                <PlaylistEditModal playlist={playlist} handlePlaylistEditClick={handlePlaylistEditClick} photoEdit={photoEdit}/>
                                )
                            }
                            {showSongMenu && (
                                <div className='song-nav-dropdown-wrapper'>
                                    <div className='song-nav-dropdown'>
                                        <ul className='song-nav-menu-options-list'>
                                            {sessionUser && <li className="menu-list-item"><button className="menu-list-button" onClick={() => handleAddPlaylistSongToQueueClick(playlist.name, playlist.playlist_songs.filter(playlist_song => { return playlist_song.id === playlistSongId }))}><span className="menu-button-span">Add to queue</span></button></li>}
                                            <li className="menu-list-item"><Link className="menu-link" to={`/artists/${playlist.playlist_songs.filter(playlist_song => { return playlist_song.id === playlistSongId })[0].song.artist_id}`}><button className="menu-list-button"><span className="menu-button-span">Go to artist</span></button></Link></li>
                                            <li className="menu-list-item"><Link className="menu-link" to={`/albums/${playlist.playlist_songs.filter(playlist_song => { return playlist_song.id === playlistSongId })[0].song.album_id}`}><button className="menu-list-button"><span className="menu-button-span">Go to album</span></button></Link></li>
                                            {/* <li className="menu-list-item"><button className="menu-list-button"><span className="menu-button-span">Save to your liked songs</span></button></li> */}
                                            {sessionUser && sessionUser.id === playlist.user_id && <li className="menu-list-item"><button className="menu-list-button" onClick={() => handleDeletePlaylistSongClick(playlist.id, playlistSongId)}><span className="menu-button-span">Remove from this playlist</span></button></li>}
                                            {sessionUser && <li className="menu-list-item"><button className="menu-list-button" id="playlist-song-button"><span className="menu-button-span">Add to playlist</span></button></li>}
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
                                {playlist.playlist_songs.length > 0 && (
                                    <div className="playlist-row">
                                        <div className="row-element header first-column"><div>#</div><div>Title</div></div>
                                        <div className="row-element header"><div>Album</div></div>
                                        <div className="row-element header"><div>Date Added</div></div>
                                        <div className="row-element header"><div><span className="material-icons md-18">
                                            schedule
                                        </span></div></div>
                                        {/* <div className="row-element header"><div>Options</div></div> */}
                                    </div>
                                )}
                                {sessionUser && playlist.playlist_songs.map(playlist_song => {
                                    return (
                                        <div className="playlist-row playlist-song-row" key={playlist_song.id} onDoubleClick={() => handleSongPlayClick(playlist, playlist_song.order)}>
                                            <div className="row-element first-column">
                                                <div><span className="song-number-span" onClick={() => handleSongPlayClick(playlist, playlist_song.order)}>{playlist_song.order}</span></div>
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
                                                {sessionUser && <div>
                                                    <button className="song-nav-dropdown-button" onClick={() => openSongMenuClick(playlist_song.song.id, playlist_song.id)}><span className="material-icons-outlined">
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
                                {!sessionUser && playlist.playlist_songs.map(playlist_song => {
                                    return (
                                        <div className="playlist-row playlist-song-row" key={playlist_song.id} onDoubleClick={handleDummyPlayModal}>
                                            <div className="row-element first-column">
                                                <div><span className="song-number-span" onClick={handleDummyPlayModal}>{playlist_song.order}</span></div>
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
                                            </div>
                                            {/* <div className="row-element">
                                                
                                            </div> */}
                                        </div>
                                    )
                                })}
                                {playlist && sessionUser && playlist.user_id === sessionUser.id && !showSearch && (
                                    <button className="findmore-button">
                                        <div className="findmore-inner-div" onClick={handleSearchClick}>Find more</div>
                                    </button>
                                )}
                                {showSearch && sessionUser && (
                                    <section className="playlist-searchbox-container">
                                        <div className="playlist-searchbox-content-container">
                                            <h1 className="playlist-searchbox-h1">Let's find something for your playlist</h1>
                                            <div className="playlist-searchbox-wrapper">
                                                <input
                                                    className="playlist-searchbox-input"
                                                    placeholder='Search for songs'
                                                    maxLength="80"
                                                    value={query}
                                                    onChange={(e) => setQuery(e.target.value)}
                                                />
                                                <div className="playlist-searchbox-inner-div">
                                                    <span className="playlist-searchbox-span">
                                                        <span className="material-icons md-18">
                                                            search
                                                        </span>
                                                    </span>
                                                    {query && (
                                                        <button className="playlist-searchbox-clear-search-button" onClick={() => setQuery("")}>
                                                            <span className="material-icons md-18">
                                                                clear
                                                            </span>
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <button className="searchbox-close-button" onClick={handleCloseSearchClick}>
                                            <span className="material-icons">
                                                close
                                            </span>
                                        </button>
                                    </section>
                                )}
                                {showSearch && sessionUser && !results && (
                                    <div className="playlist-inline-search-results">
                                        <div className="playlist-inline-search-noresults"></div>
                                    </div>
                                )}
                                {sessionUser && results && (
                                    <div className="playlist-inline-search-results">
                                        {results.songs.length > 0 && results.songs.map(song => {
                                            if (!checkPlaylistHasSong(song)) {
                                                return (
                                                    <div className="playlist-search-result-row" key={song.id}>
                                                        <div className="playlist-search-result-row-2" onDoubleClick={() => handleSearchSongPlayClick(song)}>
                                                            <div className="playlist-search-result-cell">
                                                                <div className="playlist-search-result-pic-container">
                                                                    <img className='playlist-search-result-pic-img' src={song.albumDetails.pic} alt=""></img>
                                                                </div>
                                                                <div className="playlist-search-result-titleartist-container">
                                                                    <div className='playlist-search-result-title'>
                                                                        <Link className="playlist-search-result-title-link" to={`/albums/${song.album_id}`}>{song.title}</Link>
                                                                    </div>
                                                                    <span className='playlist-search-result-artist'>
                                                                        <Link className="playlist-search-result-artist-link" to={`/artists/${song.artist_id}`}>{song.artist}</Link>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="playlist-search-result-cell">
                                                                <span className="playlist-search-result-album">
                                                                    <Link className="playlist-search-result-album-link" to={`/albums/${song.album_id}`}>{song.album}</Link>
                                                                </span>
                                                            </div>
                                                            <div className="playlist-search-result-cell-last">
                                                                <button className='playlist-search-result-add-button' onClick={() => handleAddClick(song.id)}>
                                                                    <span className='playlist-search-result-add-button-inner-span'>Add</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })}
                                    </div>
                                )}
                            </div>

                        </section>
                    </div>


                </div>
            </div>
        </div>
    )
}

//                 <div className='song-nav-dropdown-wrapper'>
                    //     <div className='song-nav-dropdown'>
                    //         <ul className='song-nav-menu-options-list'>
                    //             {sessionUser && <li className="menu-list-item"><button className="menu-list-button" onClick={() => handleAddPlaylistSongToQueueClick(playlist.name, playlist.playlist_songs.filter(playlist_song => {return playlist_song.id === playlistSongId}))}><span className="menu-button-span">Add to queue</span></button></li>}
                    //             <li className="menu-list-item"><Link className="menu-link" to={`/artists/${playlist.playlist_songs.filter(playlist_song => {return playlist_song.id === playlistSongId})[0].song.artist_id}`}><button className="menu-list-button"><span className="menu-button-span">Go to artist</span></button></Link></li>
                    //             <li className="menu-list-item"><Link className="menu-link" to={`/albums/${playlist.playlist_songs.filter(playlist_song => { return playlist_song.id === playlistSongId })[0].song.album_id}`}><button className="menu-list-button"><span className="menu-button-span">Go to album</span></button></Link></li>
                    //             <li className="menu-list-item"><button className="menu-list-button"><span className="menu-button-span">Save to your liked songs</span></button></li>
                    //             {sessionUser && sessionUser.id === playlist.user_id && <li className="menu-list-item"><button className="menu-list-button" onClick={() => handleDeletePlaylistSongClick(playlist.id, playlistSongId)}><span className="menu-button-span">Remove from this playlist</span></button></li>}
                    //             {sessionUser && <li className="menu-list-item"><button className="menu-list-button" id="playlist-song-button"><span className="menu-button-span">Add to playlist</span></button></li>}
                    //         </ul>
                    //     </div>
                    // </div>

export default OnePlaylistView;