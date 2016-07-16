import { combineReducers } from 'redux'
import 'lodash'

import {
  REQUEST_LOCATIONS, RECEIVE_LOCATIONS
} from '../actions'

function locationsReducer(state = { isFetching: false, locations: [] }, action) {
  switch (action.type) {
    case REQUEST_LOCATIONS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_LOCATIONS:
    return Object.assign({}, state, {
      isFetching: false,
      locations: _.uniq(state.locations.concat(action.locations))
    })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  locationsReducer
})

export default rootReducer
