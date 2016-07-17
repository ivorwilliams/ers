import { combineReducers } from 'redux'
import uniq from 'lodash/uniq'

import {
  REQUEST_LOCATIONS, RECEIVE_LOCATIONS,
  REQUEST_OBSERVATIONS, RECEIVE_OBSERVATIONS
} from '../actions'

function observationsReducer(state = { isFetching: false, observations: [] }, action) {
  switch (action.type) {
    case REQUEST_OBSERVATIONS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_OBSERVATIONS:
      return Object.assign({}, state, {
        isFetching: false,
        // TODO: Misnomer alert!  For now, just storing comName, not entire observation
        observations: uniq(state.observations.concat(action.observations.map(x => x.comName)))
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  observationsReducer
})

export default rootReducer
