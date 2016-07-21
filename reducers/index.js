import { combineReducers } from 'redux'

import { SET_NAME_FILTER, SET_NOTABLE_ONLY } from '../actions/controls.js'
import { FETCH_STARTED, FETCH_SUCCEEDED, FETCH_FAILED } from '../actions/fetch.js'
import { RECEIVE_OBSERVATIONS } from '../actions/ebird.js'

function filters(state = { re: new RegExp(''), notableOnly: true }, action) {
  switch (action.type) {
    case SET_NAME_FILTER:
      return { ...state, re: textToRegExp(action.text) }
    case SET_NOTABLE_ONLY:
      return { ...state, notableOnly: action.value }
    default:
      return state
  }
}

/*
 * Convert the filter text into a regular expression
 *
 * 1. Split filter text into word part, using space or dash
 * 2. Join the words with "anything"
 */
function textToRegExp(text) {
  let reText = text.split(/[ -]/).join('.*')
  return new RegExp(reText, 'i')
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
