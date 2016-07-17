import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import configureStore from './store'
import { fetchLocations } from './actions'

const store = configureStore()
store.subscribe(() => console.log(store.getState()))
store.dispatch(fetchLocations(43.6276706, -79.3315839))
store.dispatch(fetchLocations(43.6504268, -79.4595838))

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
)
