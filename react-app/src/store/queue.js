// ACTIONS

const LAZY_LOAD_PLAYLIST_SONG = "queue/LAZY_LOAD_PLAYLIST_SONG";
const LAZY_LOAD_ALBUM_SONG = "queue/LAZY_LOAD_ALBUM_SONG";

const EAGER_LOAD_PLAYLIST_FROM_SONG = "queue/EAGER_LOAD_PLAYLIST_FROM_SONG";
const EAGER_LOAD_PLAYLIST = "queue/EAGER_LOAD_PLAYLIST";

const EAGER_LOAD_ALBUM_FROM_SONG = "queue/EAGER_LOAD_ALBUM_FROM_SONG";
const EAGER_LOAD_ALBUM = "queue/EAGER_LOAD_ALBUM";

const EAGER_LOAD_SEARCH_SONG = "queue/EAGER_LOAD_SEARCH_SONG";

const EAGER_CLEAR_QUEUE = "queue/EAGER_CLEAR_QUEUE";

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

const eagerLoadPlaylistFromSong = (playlist, playlistSongOrder) => ({
    type: EAGER_LOAD_PLAYLIST_FROM_SONG,
    playlist,
    playlistSongOrder
});

const eagerLoadPlaylist = (playlist) => ({
    type: EAGER_LOAD_PLAYLIST,
    playlist
});

const eagerLoadAlbum = (album) => ({
    type: EAGER_LOAD_ALBUM,
    album
});

const eagerLoadAlbumFromSong = (album, songIndex) => ({
    type: EAGER_LOAD_ALBUM_FROM_SONG,
    album,
    songIndex
});

const eagerLoadSearchSong = (song) => ({
    type: EAGER_LOAD_SEARCH_SONG,
    song
});

const eagerClearQueue = () => ({
    type: EAGER_CLEAR_QUEUE
});

// THUNK ACTION CREATORS

export const lazyLoadPlaylistSongThunk = (playlistName, playlistSong) => async (dispatch) => {
    dispatch(lazyLoadPlaylistSong(playlistName, playlistSong));
}

export const lazyLoadAlbumSongThunk = (song) => async (dispatch) => {
    dispatch(lazyLoadAlbumSong(song));
}

export const eagerLoadPlaylistFromSongThunk = (playlist, playlistSongOrder) => async (dispatch) => {
    dispatch(eagerLoadPlaylistFromSong(playlist, playlistSongOrder));
}

export const eagerLoadPlaylistThunk = (playlist) => async (dispatch) => {
    dispatch(eagerLoadPlaylist(playlist));
}

export const eagerLoadAlbumThunk = (album) => async (dispatch) => {
    dispatch(eagerLoadAlbum(album));
}

export const eagerLoadAlbumFromSongThunk = (album, songIndex) => async (dispatch) => {
    dispatch(eagerLoadAlbumFromSong(album, songIndex));
}

export const eagerLoadSearchSongThunk = (song) => async (dispatch) => {
    dispatch(eagerLoadSearchSong(song));
}

export const eagerClearQueueThunk = () => async (dispatch) => {
    dispatch(eagerClearQueue());
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
        case LAZY_LOAD_ALBUM_SONG: {
            let newState = [...state];
            action.song.type = "album_song";
            newState.push(action.song);
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
        case EAGER_LOAD_ALBUM: {
            let newState = [];
            action.album.songs.forEach(song => {
                song.type = "album_song";
                newState.push(song);
            })
            return newState;
        }
        case EAGER_LOAD_ALBUM_FROM_SONG: {
            let newState = [];
            const songs = action.album.songs.slice(action.songIndex);
            songs.forEach(song => {
                song.type = "album_song";
                newState.push(song);
            })
            return newState;
        }
        case EAGER_LOAD_SEARCH_SONG: {
            let newState = [];
            let songs = [action.song]
            songs.forEach(song => {
                song.type = "album_song";
                newState.push(song);
            })
            return newState;
        }
        case EAGER_CLEAR_QUEUE:
            return [];
        default:
            return state;
    }
}