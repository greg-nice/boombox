// ACTIONS

const LOAD_SUSER_PLAYLISTS = "playlists/LOAD_SUSER_PLAYLISTS";
const ADD_ONE_SUSER_PLAYLIST = "playlists/ADD_ONE_SUSER_PLAYLIST";
const REMOVE_SUSER_PLAYLIST = "playlists/REMOVE_SUSER_PLAYLIST";
const UPDATE_ONE_SUSER_PLAYLIST = "playlists/UPDATE_ONE_SUSER_PLAYLIST";
const CLEAR_SUSER_PLAYLISTS = "playlists/CLEAR_SUSER_PLAYLISTS";
// const ADD_SUSER_PLAYLIST_SONG = "playlists/ADD_SUSER_PLAYLIST_SONG";

// ACTION CREATORS

const load = (playlists) => ({
    type: LOAD_SUSER_PLAYLISTS,
    playlists
})

const add = (playlist) => ({
    type: ADD_ONE_SUSER_PLAYLIST,
    playlist
})

const remove = (playlistId) => ({
    type: REMOVE_SUSER_PLAYLIST,
    playlistId 
})

const update = (playlist) => ({
    type: UPDATE_ONE_SUSER_PLAYLIST,
    playlist
})

const clear = () => ({
    type: CLEAR_SUSER_PLAYLISTS
})

// THUNK ACTION CREATORS

// GET all of the session user's playlists

export const getSuserPlaylists = () => async (dispatch) => {
    const response = await fetch("/api/playlists/");

    if (response.ok) {
        const playlists = await response.json();
        dispatch(load(playlists));
        return //stuff
    } else {
        return ["An error occurred. Please try again."];
    }
}

// CREATE a new session user playlist using the create playlist button

export const createSimplePlaylist = () => async (dispatch) => {
    const response = await fetch("/api/playlists/simple", {
        method: 'POST',
    });

    if (response.ok) {
        const playlist = await response.json();
        await dispatch(add(playlist));
        return playlist.id //is this what I want to return??
    }
}

// DELETE a session user playlist

export const deleteSuserPlaylist = (playlistId) => async (dispatch) => {
    const response = await fetch(`/api/playlists/${playlistId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        dispatch(remove(playlistId));
    } //do I want to return antyhing or handle errors?
};

// EDIT a session user playlist to add a song

export const addSuserPlaylistSong = (playlistId, songId) => async (dispatch) => {
    console.log("********", playlistId, songId);
    const response = await fetch(`/api/playlists/${playlistId}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({songId})
    });

    if (response.ok) {
        const playlist = await response.json();
        dispatch(update(playlist));
    } // return anything or handle errors?
}

// EDIT a session user playlist to delete a song

export const deleteSuserPlaylistSong = (playlistId, playlistSongId) => async (dispatch) => {
    const response = await fetch(`/api/playlists/${playlistId}/playlist_songs/${playlistSongId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const playlist = await response.json();
        dispatch(update(playlist));
    } // return anything or handle errors?
}

// EDIT a session user playlist to update the name and description

export const updateSuserPlaylist = (playlistData) => async (dispatch) => {
    const response = await fetch(`/api/playlists/${playlistData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify( playlistData )
    });

    if (response.ok) {
        const playlist = await response.json();
        dispatch(update(playlist));
    }
}

// EDIT a session user playlist to make Public

export const makePlaylistPublic = (playlistId) => async (dispatch) => {
    const response = await fetch(`/api/playlists/${playlistId}/public`, {
        method: 'PUT'
    });

    if (response.ok) {
        const playlist = await response.json();
        dispatch(update(playlist));
    }
}

// EDIT a session user playlist to make Private

export const makePlaylistPrivate = (playlistId) => async (dispatch) => {
    const response = await fetch(`/api/playlists/${playlistId}/private`, {
        method: 'PUT'
    });

    if (response.ok) {
        const playlist = await response.json();
        dispatch(update(playlist));
    }
}

// REMOVE all playlists from store

export const clearSuserPlaylists = () => async (dispatch) => {
    dispatch(clear());
}

export 


// SESSION USER PLAYLISTS REDUCER

const initialState = []

export default function userPlaylistsReducer(state=initialState, action) {
    switch (action.type) {
        case LOAD_SUSER_PLAYLISTS:
            let playlists = Object.values(action.playlists);
            return [ ...playlists ];
        case ADD_ONE_SUSER_PLAYLIST: {
            const newState = [...state];
            newState.push(action.playlist);
            return newState;
        }
        case REMOVE_SUSER_PLAYLIST: {
            let newState = [...state];
            newState = newState.filter(playlist => playlist["id"] !== action.playlistId);
            // const index = newState.indexOf(deleted_playlist_Arr[0])
            // if (index > -1) {
            //     newState.splice(index, 1);
            return newState;
        }
        case UPDATE_ONE_SUSER_PLAYLIST: {
            const newState = state.reduce((accum, playlist) => {
                return {...accum, [playlist.id]: playlist}
            }, {});
            // console.log(state);
            // console.log(newState);
            newState[action.playlist.id] = action.playlist;
            let playlists = Object.values(newState);
            return [ ...playlists ]
        }
        case CLEAR_SUSER_PLAYLISTS:
            return [];
        default:
            return state;
    }
}