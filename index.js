import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import configureStore from './store'
import { setLocation, setRegion, setDistance, setBack } from './actions/settings.js'
import { fetchLocations } from './actions/ebird.js'

const store = configureStore()
store.dispatch(setLocation(43.653525, -79.383905))
store.dispatch(setDistance(48))
store.dispatch(setBack(7))
store.dispatch(fetchLocations(store.getState().settings))

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
)
