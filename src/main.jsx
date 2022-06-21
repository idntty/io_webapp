import React from 'react'
import ReactDOM from 'react-dom'
import {Buffer} from "buffer";
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'

globalThis.Buffer = Buffer

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
