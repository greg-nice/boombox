import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateSuserPlaylist } from '../../store/playlists';
import { getPlaylist } from '../../store/playlist';
import './PlaylistEditModal.css';


const PlaylistEditModal = ({playlist, handlePlaylistEditClick}) => {
    const [name, setName] = useState(playlist.name);
    const [description, setDescription] = useState(playlist.description ? playlist.description : "");
    const [validationErrors, setValidationErrors] = useState([]);
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
                await dispatch(getPlaylist(playlist.id));
                setValidationErrors([]);
                handlePlaylistEditClick();
            }
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
                        <div className="playlist-pic-wrapper">
                            <img className="playlist-pic" src={playlist.pic} alt=""></img>
                        </div>
                        <div className="playlist-pic-options-button-container">
                            <button className="playlist-pic-options-button">
                                <div className="playlist-pic-options-icon">
                                    <span className="material-icons">
                                        more_horiz
                                    </span>
                                </div>
                            </button>
                        </div>
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