// ACTIONS

const LOAD_SUSER_PLAYLISTS = "playlists/LOAD_SUSER_PLAYLISTS";

// ACTION CREATORS

const load = (playlists) => ({
    type: LOAD_SUSER_PLAYLISTS,
    playlists
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

// SESSION USER PLAYLISTS REDUCER

const initialState = {}

export default function userPlaylistsReducer(state=initialState, action) {
    switch (action.type) {
        case LOAD_SUSER_PLAYLISTS:
            let playlists = Object.values(action.playlists);
            return [ ...playlists ];
        default:
            return state;
    }
}