// ACTIONS

const LAZY_LOAD_PLAYLIST_SONG = "queue/LAZY_LOAD_PLAYLIST_SONG";
// const LAZY_LOAD_ALBUM_SONG = "queue/LAZY_LOAD_ALBUM_SONG";
// const LAZY_LOAD_PLAYLIST_SONGS = "queue/LAZY_LOAD_PLAYLIST_SONGS";
// const LAZY_LOAD_ALBUM_SONGS = "queue/LAZY_LOAD_ALBUM_SONGS";
// const LAZY_CLEAR_QUEUE = "queue/LAZY_CLEAR_QUEUE";
const EAGER_LOAD_PLAYLIST_FROM_SONG = "queue/EAGER_LOAD_PLAYLIST_FROM_SONG";
const EAGER_LOAD_PLAYLIST = "queue/EAGER_LOAD_PLAYLIST"
// const EAGER_CLEAR_QUEUE = "queue/EAGER_CLEAR_QUEUE";

// ACTION CREATORS

const lazyLoadPlaylistSong = (playlistName, playlistSong) => ({
    type: LAZY_LOAD_PLAYLIST_SONG,
    playlistName,
    playlistSong
})

// const lazyLoadAlbumSong = (song) => ({
//     type: LAZY_LOAD_ALBUM_SONG,
//     song
// })

// const lazyLoadPlaylistSongs = (playlist_songs) => ({
//     type: LAZY_LOAD_PLAYLIST_SONGS,
//     playlist_songs
// })

// const lazyLoadAlbumSongs = (album_songs) => ({
//     type: LAZY_LOAD_ALBUM_SONGS,
//     album_songs
// })

const eagerLoadPlaylistFromSong = (playlist, playlistSongOrder) => ({
    type: EAGER_LOAD_PLAYLIST_FROM_SONG,
    playlist,
    playlistSongOrder
})

const eagerLoadPlaylist = (playlist) => ({
    type: EAGER_LOAD_PLAYLIST,
    playlist
})

// const eagerLoadAlbumSong

// const eagerLoadAlbum

// const eagerLoadPlaylist

// const lazyClear = () => ({
//     type: LAZY_CLEAR_QUEUE
// })

// THUNK ACTION CREATORS

export const lazyLoadPlaylistSongThunk = (playlistName, playlistSong) => async (dispatch) => {
    dispatch(lazyLoadPlaylistSong(playlistName, playlistSong))
}

export const eagerLoadPlaylistFromSongThunk = (playlist, playlistSongOrder) => async (dispatch) => {
    dispatch(eagerLoadPlaylistFromSong(playlist, playlistSongOrder))
}
// try eager loading the whole playlist and returning the playlistsong order and in the component setting the current song to that number - 1
// the above won't work because the now-playing component won't have access to the return value, which goes to the OnePlaylist component

export const eagerLoadPlaylistThunk = (playlist) => async (dispatch) => {
    dispatch(eagerLoadPlaylist(playlist))
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
        case EAGER_LOAD_PLAYLIST_FROM_SONG: {
            let newState = [];
            const filteredPlaylistSongs = action.playlist.playlist_songs.filter(playlist_song => playlist_song.order >= action.playlistSongOrder)
            filteredPlaylistSongs.sort((a, b) => a.order - b.order);
            filteredPlaylistSongs.forEach(playlist_song => {
                playlist_song.type = "playlist_song";
                playlist_song.playlistName = action.playlist.name;
                newState.push(playlist_song)
            })
            return newState;
        }
        case EAGER_LOAD_PLAYLIST: {
            let newState = [];
            action.playlist.playlist_songs.forEach(playlist_song => {
                playlist_song.type = "playlist_song";
                playlist_song.playlistName = action.playlist.name;
                newState.push(playlist_song)
            })
            return newState;
        }
        default:
            return state;
    }
}