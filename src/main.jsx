import React from 'react'
import ReactDOM from 'react-dom'
import {Buffer} from "buffer";
import { HashRouter as Router } from 'react-router-dom'
import App from './App'
import {store} from './store/store';

import { allowMessages } from './utils/messagesApi'

globalThis.Buffer = Buffer

allowMessages();

window.store = store;

BigInt.prototype.toJSON = function() {
  return this.toString()
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
