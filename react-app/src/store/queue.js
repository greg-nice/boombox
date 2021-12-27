// ACTIONS

const LAZY_LOAD_PLAYLIST_SONG = "queue/LAZY_LOAD_PLAYLIST_SONG";
const LAZY_LOAD_ALBUM_SONG = "queue/LAZY_LOAD_ALBUM_SONG";
const LAZY_LOAD_PLAYLIST_SONGS = "queue/LAZY_LOAD_PLAYLIST_SONGS";
const LAZY_LOAD_ALBUM_SONGS = "queue/LAZY_LOAD_ALBUM_SONGS";
const LAZY_CLEAR_QUEUE = "queue/LAZY_CLEAR_QUEUE";
// const EAGER_CLEAR_QUEUE = "queue/EAGER_CLEAR_QUEUE";

// ACTION CREATORS

const lazyLoadPlaylistSong = (playlistName, playlistSong) => ({
    type: LAZY_LOAD_PLAYLIST_SONG,
    playlistName,
    playlistSong
})

const lazyLoadAlbumSong = (song) => ({
    type: LAZY_LOAD_ALBUM_SONG,
    song
})

const lazyLoadPlaylistSongs = (playlist_songs) => ({
    type: LAZY_LOAD_PLAYLIST_SONGS,
    playlist_songs
})

const lazyLoadAlbumSongs = (album_songs) => ({
    type: LAZY_LOAD_ALBUM_SONGS,
    album_songs
})

// const eagerLoadPlaylistSong

// const eagerLoadAlbumSong

// const eagerLoadAlbum

// const eagerLoadPlaylist

const lazyClear = () => ({
    type: LAZY_CLEAR_QUEUE
})

// THUNK ACTION CREATORS

export const lazyLoadPlaylistSongThunk = (playlistName, playlistSong) => async (dispatch) => {
    dispatch(lazyLoadPlaylistSong(playlistName, playlistSong))
}

// QUEUE REDUCER

const initialState = [];

export default function queueReducer(state = initialState, action) {
    switch (action.type) {
        case LAZY_LOAD_PLAYLIST_SONG: {
            let newState = [...state];
            action.playlistSong.type = "playlist_song";
            action.playlistSong.playlistName = action.playlistName;
            newState.push(action.playlistSong);
            return newState;
        }
        default:
            return state;
    }
}