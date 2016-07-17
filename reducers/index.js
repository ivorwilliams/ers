import { combineReducers } from 'redux'
import uniq from 'lodash/uniq'

import {
  REQUEST_LOCATIONS, RECEIVE_LOCATIONS,
  REQUEST_OBSERVATIONS, RECEIVE_OBSERVATIONS
} from '../actions'

function observations(state = [], action) {
  switch (action.type) {
    case RECEIVE_OBSERVATIONS:
      // TODO: Misnomer alert!  For now, just storing comName, not entire observation
      return uniq(state.concat(action.observations.map(x => x.comName)))
    default:
      return state
  }
}

function fetching(state = false, action) {
  switch (action.type) {
    case REQUEST_OBSERVATIONS:
      return true
    case RECEIVE_OBSERVATIONS:
      return false
    default:
      return state
  }
}

const rootReducer = combineReducers({
  observations,
  fetching
})

export default rootReducer
