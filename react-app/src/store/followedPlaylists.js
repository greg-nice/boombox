// ACTIONS

const LOAD_SUSER_PLAYLIST_FOLLOWS = 'followedPlaylists/LOAD_SUSER_PLAYLIST_FOLLOWS';
const ADD_SUSER_PLAYLIST_FOLLOW = 'followedPlaylists/ADD_SUSER_PLAYLIST_FOLLOW';
const REMOVE_SUSER_PLAYLIST_FOLLOW = 'followedPlaylists/REMOVE_SUSER_PLAYLIST_FOLLOW';

// ACTION CREATORS

const load = (followedPlaylists) => ({
    type: LOAD_SUSER_PLAYLIST_FOLLOWS,
    followedPlaylists
})

const addPlaylistFollow = (followedPlaylist) => ({
    type: ADD_SUSER_PLAYLIST_FOLLOW,
    followedPlaylist
})

const removePlaylistFollow = (followedPlaylistId) => ({
    type: REMOVE_SUSER_PLAYLIST_FOLLOW,
    followedPlaylistId
})

// THUNK ACTION CREATORS

// get all of Session user's playlist follows

export const getSuserFollowedPlaylists = () => async (dispatch) => {
    const response = await fetch(`/api/followed-playlists/`)

    if (response.ok) {
        const playlistFollows = await response.json();
        dispatch(load(playlistFollows));
    }
}

// add a playlist to Session user's list of followed playlists

export const addSuserPlaylistFollow = (followedPlaylistId) => async (dispatch) => {
    const response = await fetch(`/api/followed-playlists/${followedPlaylistId}`, {
        method: 'POST'
    });

    if (response.ok) {
        const followedPlaylist = await response.json();
        dispatch(addPlaylistFollow(followedPlaylist));
    }
}

// delete a playlist from Session user's list of followed playlists

export const deleteSuserPlaylistFollow = (followedPlaylistId) => async (dispatch) => {
    const response = await fetch(`/api/followed-playlists/${followedPlaylistId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const followedPlaylistId = await response.json();
        dispatch(removePlaylistFollow(followedPlaylistId));
    }
}

// FOLLOWS REDUCER

const initialState = {};

export default function followedPlaylistsReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_SUSER_PLAYLIST_FOLLOWS:
            return { ...action.followedPlaylists }
        case ADD_SUSER_PLAYLIST_FOLLOW: {
            const newState = { ...state }
            newState[action.followedPlaylist.id] = action.followedPlaylist
            return newState
        }
        case REMOVE_SUSER_PLAYLIST_FOLLOW: {
            const newState = { ...state }
            delete newState[action.followedPlaylistId];
            return newState;
        }
        default:
            return state;
    }
}