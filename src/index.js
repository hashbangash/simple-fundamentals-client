import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'

import App from './components/App/App'
import { BrowserRouter } from 'react-router-dom'

const appJsx = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

ReactDOM.render(appJsx, document.getElementById('root'))
