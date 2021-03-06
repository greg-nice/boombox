import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session';
import playlistReducer from './playlist';
import userPlaylistsReducer from './playlists';
import queueReducer from './queue';
import userReducer from './user';
import followsReducer from './follows';
import followedPlaylistsReducer from './followedPlaylists';


const rootReducer = combineReducers({
  session,
  playlist: playlistReducer,
  userPlaylists: userPlaylistsReducer,
  queue: queueReducer,
  user: userReducer,
  follows: followsReducer,
  followedPlaylists: followedPlaylistsReducer
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
