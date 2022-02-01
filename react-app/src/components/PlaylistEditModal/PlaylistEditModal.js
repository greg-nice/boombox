import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSuserPlaylistPic, updateSuserPlaylist } from '../../store/playlists';
import { getPlaylist } from '../../store/playlist';
import './PlaylistEditModal.css';


const PlaylistEditModal = ( { playlist, handlePlaylistEditClick }) => {
    const [showPicEditMenu, setShowPicEditMenu] = useState(false);
    const [name, setName] = useState(playlist.name);
    const [description, setDescription] = useState(playlist.description ? playlist.description : "");
    const [pic, setPic] = useState(playlist.pic)
    const [resetPic, setResetPic] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const validate = () => {
        const validationErrors = [];

        if (!name) validationErrors.push("Name can't be blank.");
        if (name.length > 100) validationErrors.push("Name can't be more than 100 characters.")
        if (description.length > 255) validationErrors.push("Description can't be more than 255 characters.")

        return validationErrors;
    }

    const handleSaveClick = () => {
        (async () => {
            const errors = validate()

            if (errors.length > 0) {
                setValidationErrors(errors);
            } else {
                // console.log("11111111", playlist);

                const playlistData = {
                    ...playlist,
                    name,
                    description,
                    submittedOn: new Date()
                }
                // console.log("22222222", playlistData);

                await dispatch(updateSuserPlaylist(playlistData));
                if (resetPic) {
                    await dispatch(deleteSuserPlaylistPic(playlist.id));
                }
                await dispatch(getPlaylist(playlist.id));
                setValidationErrors([]);
                setResetPic(false);
                handlePlaylistEditClick();
            }
        })();
    }

    useEffect(() => {
        const picwrap = document.getElementById("picwrap");
        const picbutton = document.getElementById("playlist-pic-options-button")

        picwrap.addEventListener("mouseenter", () => {
            picbutton.style.opacity = 1;
        });

        picwrap.addEventListener("mouseleave", () => {
            picbutton.style.opacity = 0;
        });

        picbutton.addEventListener("mouseover", (e) => {
            e.target.style.opacity = 1;
        });
    }, []);

    const handleEditPicClick = (e) => {
        e.preventDefault();

        setShowPicEditMenu(!showPicEditMenu);
    }

    useEffect(() => {
        if (showPicEditMenu) {
            document.addEventListener('click', handleEditPicClick);
            return () => {
                document.removeEventListener('click', handleEditPicClick);
            }
        } else {
            return;
        }
    }, [showPicEditMenu]);

    const handleRemovePhotoClick = (e) => {
        (async () => {
            e.preventDefault();
            setResetPic(true);
            setPic("https://media.discordapp.net/attachments/920418592820957228/926947291380736010/boombox_signature_square.jpgD39CCE35-F671-405A-A9D3-6DA2D2407DADLarge.jpg")
            // await dispatch(deleteSuserPlaylistPic(playlist.id));
            // await dispatch(getPlaylist(playlist.id));
        })();
    }


    return (
        <div className="edit-playlist-modal">
            <div className="modal-background" onClick={() => handlePlaylistEditClick()}></div>
            <div className="modal-content">
                <div className='heading-container'>
                    <h1 className='heading-text'>Edit details</h1>
                    <button className='close-button' onClick={() => handlePlaylistEditClick()}><span className="material-icons-outlined">
                        close
                    </span></button>
                </div>
                <div className='details-container'>
                    <div className="playlist-pic-container">
                        <div className="playlist-pic-wrapper" id="picwrap">
                            <img className="playlist-pic" src={pic} alt=""></img>
                        </div>
                        {sessionUser && (
                            <div className="playlist-pic-options-button-container">
                                <button id="playlist-pic-options-button" onClick={handleEditPicClick}>
                                    <div className="playlist-pic-options-icon">
                                        <span className="material-icons md-18">
                                            more_horiz
                                        </span>
                                    </div>
                                </button>
                                {showPicEditMenu && (
                                    <div className='song-nav-dropdown-wrapper'>
                                        <div className='song-nav-dropdown'>
                                            <ul className='song-nav-menu-options-list'>
                                                <li className="menu-list-item"><button className="menu-list-button"><span className="menu-button-span">Change photo</span></button></li>
                                                <li className="menu-list-item"><button className="menu-list-button" onClick={handleRemovePhotoClick}><span className="menu-button-span">Remove photo</span></button></li>
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="title-container">
                  
                        <label className="title-label" htmlFor="title-text">Name</label>
                        <input id="title-text" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="description-container">
                        <label className="description-label" htmlFor="description-text">Description</label>
                        <textarea id="description-text" placeholder="Add an optional description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                    <button className="save-button" onClick={() => handleSaveClick()}>Save</button>
                </div>
                {validationErrors.length > 0 && (
                    <div id="edit-playlist-errors">
                        <ul>
                            {validationErrors.map(error => <li key={error}>{error}</li>)}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PlaylistEditModal;