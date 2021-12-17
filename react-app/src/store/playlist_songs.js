// // ACTIONS

// const LOAD_PLAYLIST_SONGS = 'playlist_songs/LOAD_PLAYLIST_SONGS';

// // ACTION CREATORS

// const load = (playlist_songs) => ({
//     type: LOAD_PLAYLIST_SONGS,
//     playlist_songs
// });

// // THUNK ACTION CREATORS

// // get playlist_songs for playlist

// export const getPlaylistSongs = (playlistId) => async (dispatch) => {
//     const response = await fetch(`/api/playlists/${playlistId}/playlists_songs`)

//     if (response.ok) {
//         const playlist_songs = await response.json();
//         dispatch(load(playlist_songs));
//         return //stuff;
//     } else {
//         return ["An error occurred. Please try again"];
//     }
// }

// // PLAYLIST_SONGS REDUCER

// const initialState = {}

// export default function playlist_songsReducer(state = initialState, action) {
//     switch (action.type) {
//         case LOAD_PLAYLIST_SONGS:
//             return {...action.playlist_songs}
//         default:
//             return state;
//     }
// }