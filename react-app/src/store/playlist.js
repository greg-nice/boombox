// ACTIONS

const LOAD_PLAYLIST = 'playlist/LOAD_PLAYLIST';
const REMOVE_PLAYLIST = 'playlist/REMOVE_PLAYLIST';
const ADD_LIST_FOLLOW = 'playlist/ADD_LIST_FOLLOW';
const UNFOLLOW_PLAYLIST = 'playlist/UNFOLLOW_PLAYLIST';

// ACTION CREATORS

const load = (playlist) => ({
    type: LOAD_PLAYLIST,
    playlist
});

const addListFollow = (follower) => ({
    type: ADD_LIST_FOLLOW,
    follower
})

const removePlaylistFollow = (followerId) => ({
    type: UNFOLLOW_PLAYLIST,
    followerId
})

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
        return
    }
};

// clear playlist
export const clearPlaylist = (playlistId) => async (dispatch) => {
    dispatch(clear());
    return;
}


// add session user follow to one playlist
export const addPlaylistFollow = (playlistId) => async (dispatch) => {
    const response = await fetch(`/api/playlists/${playlistId}/follow`, {
        method: "POST"
    });

    if (response.ok) {
        const follower = await response.json();
        dispatch(addListFollow(follower))
    }
}

// delete session user from list of playlist followers (i.e. unfollow)
export const unfollowPlaylist = (playlistId) => async (dispatch) => {
    const response = await fetch(`/api/playlists/${playlistId}/follow`, {
        method: "DELETE"
    });

    if (response.ok) {
        const followerId = await response.json();
        dispatch(removePlaylistFollow(followerId))
    }
}

// PLAYLIST REDUCER

const initialState = {};

export default function playlistReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_PLAYLIST:
            return { ...action.playlist }
        case REMOVE_PLAYLIST:
            return {}
        case ADD_LIST_FOLLOW: {
            const newState = { ...state };
            newState.list_followers[action.follower.id] = action.follower
            return newState;
        }
        case UNFOLLOW_PLAYLIST: {
            const newState = { ...state };
            delete newState.list_followers[action.followerId];
            return newState;
        }
        default:
            return state;
    }
}