import React from 'react'
import ReactDOM from 'react-dom'
import App from './container/App'
import configureStore from './store/config'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'
import './style/index.scss'

import { BrowserRouter } from 'react-router-dom'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
serviceWorker.unregister()
