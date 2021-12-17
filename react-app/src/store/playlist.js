// ACTIONS

const LOAD_PLAYLIST = 'playlist/GET_PLAYLIST';
const REMOVE_PLAYLIST = 'playlist/REMOVE_PLAYLIST'

// ACTION CREATORS

const load = (playlist) => ({
    type: LOAD_PLAYLIST,
    playlist
});

const clear = () => ({
    type: REMOVE_PLAYLIST
});


// THUNK ACTION CREATORS

// get one playlist
export const getPlaylist = (playlistId) => async (dispatch) => {
    const response = await fetch(`/api/playlists/${playlistId}`);

    if (response.ok) {
        const playlist = await response.json();
        dispatch(load(playlist));
        return //stuff?
    } else {
        return ['An error occurred. Please try again.'];
    }
};

// clear playlist
export const clearPlaylist = (playlistId) => async (dispatch) => {
    dispatch(clear());
    return;
}


// PLAYLIST REDUCER

const initialState = {};

export default function playlistReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_PLAYLIST:
            return { ...action.playlist }
        case REMOVE_PLAYLIST:
            return {}
        default:
            return state;
    }
}