import React from 'react'
import ReactDOM from 'react-dom'
import {Buffer} from "buffer";
import { HashRouter as Router } from 'react-router-dom'
import App from './App'
import {store} from './store/store';

import './utils/messagesApi'

globalThis.Buffer = Buffer

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
