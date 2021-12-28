import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session';
import playlistReducer from './playlist';
import userPlaylistsReducer from './playlists';
import playlist_songsReducer from './playlist_songs';
import queueReducer from './queue';
import userReducer from './user';


const rootReducer = combineReducers({
  session,
  playlist: playlistReducer,
  playlist_songs: playlist_songsReducer,
  userPlaylists: userPlaylistsReducer,
  queue: queueReducer,
  user: userReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
