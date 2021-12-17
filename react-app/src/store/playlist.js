// ACTIONS

const LOAD_PLAYLIST = 'playlist/GET_PLAYLIST';
const REMOVE_PLAYLIST = 'playlist/REMOVE_PLAYLIST'

// ACTION CREATORS

const load = (playlistId) => ({
    type: LOAD_PLAYLIST,
    playlistId
});

const clear = () => ({
    type: REMOVE_PLAYLIST
});


// THUNK ACTION CREATORS

// get one playlist
export const getPlaylist = (playlistId) => async (dispatch) => {
    const response = await fetch(`api/playlists/${playlistId}`)

    if (response.ok) {
        const playlist = await response.json();
        dispatch(load(playlist));
        return //stuff?
    } else {
        return ['An error occurred. Please try again.']
    }
};

// clear playlist
export const clearPlaylist = (playlistId) => async (dispatch) => {
    dispatch(clear());
    return;
}


// PLAYLIST REDUCER

const initialState = { playlist: null };

export default function playlistReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_PLAYLIST:
            return { playlist: action.playlist }
        case REMOVE_PLAYLIST:
            return { playlist: null}
        default:
            return state;
    }
}