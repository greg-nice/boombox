// ACTIONS

const LOAD_SUSER_PLAYLISTS = "playlists/LOAD_SUSER_PLAYLISTS";
const ADD_ONE_SUSER_PLAYLIST = "playlists/ADD_ONE_SUSER_PLAYLIST";

// ACTION CREATORS

const load = (playlists) => ({
    type: LOAD_SUSER_PLAYLISTS,
    playlists
})

const add = (playlist) => ({
    type: ADD_ONE_SUSER_PLAYLIST,
    playlist
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

// CREATE a new playlist

export const createSimplePlaylist = () => async (dispatch) => {
    const response = await fetch("/api/playlists/simple", {
        method: 'POST',
    });

    if (response.ok) {
        const playlist = await response.json();
        dispatch(add(playlist));
        return playlist //is this what I want to return??
    }
}

// SESSION USER PLAYLISTS REDUCER

const initialState = {}

export default function userPlaylistsReducer(state=initialState, action) {
    switch (action.type) {
        case LOAD_SUSER_PLAYLISTS:
            let playlists = Object.values(action.playlists);
            return [ ...playlists ];
        case ADD_ONE_SUSER_PLAYLIST:
            const newState = [...state];
            newState.push(action.playlist);
            return newState;
        default:
            return state;
    }
}