import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { SearchProvider } from './context/SearchContext';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <SearchProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </SearchProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
