import React from 'react';
import ReactDOM from 'react-dom';
import { Buffer } from 'buffer';
import { HashRouter as Router } from 'react-router-dom';
import App from './App';
import { store } from './store/store';
import { fetchWrapper } from './shared/fetchWrapper';

globalThis.Buffer = Buffer;

window.store = store;

BigInt.prototype.toJSON = function () {
  return this.toString();
};

fetch('settings.json')
  .then((e) => e.json())
  .then((data) => (fetchWrapper.baseUrl = data.API_URL))
  .then((data) => store.fetchNodeInfo())
  .then(() =>
    ReactDOM.render(
      <React.StrictMode>
        <Router>
          <App />
        </Router>
      </React.StrictMode>,
      document.getElementById('root')
    )
  );
