import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import configureStore from './store'
import { fetchLocations } from './actions'

const store = configureStore()
store.dispatch(fetchLocations(43.6504268, -79.4595838))

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
