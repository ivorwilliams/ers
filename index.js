import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import configureStore from './store'
import { fetchLocations } from './actions/ebird.js'

const store = configureStore()
store.dispatch(fetchLocations(43.653525, -79.383905))

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
)
