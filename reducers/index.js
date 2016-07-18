import { combineReducers } from 'redux'

import { SET_FILTER } from '../actions/controls.js'
import { FETCH_STARTED, FETCH_SUCCEEDED, FETCH_FAILED } from '../actions/fetch.js'
import { RECEIVE_OBSERVATIONS } from '../actions/ebird.js'

function filters(state = { text: '' }, action) {
  switch (action.type) {
    case SET_FILTER:
    console.log(action.text)
      return { ...state, text: action.text.toLowerCase() }
    default:
      return state
  }
}

function observations(state = [], action) {
  switch (action.type) {
    case RECEIVE_OBSERVATIONS:
      return state.concat(action.observations)
    default:
      return state
  }
}

function fetching(state = 0, action) {
  switch (action.type) {
    case FETCH_STARTED:
      return state + 1
    case FETCH_SUCCEEDED:
      return state - 1
    case FETCH_FAILED:
      return state - 1
    default:
      return state
  }
}

const rootReducer = combineReducers({
  filters,
  observations,
  fetching
})

export default rootReducer
