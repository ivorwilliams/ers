import 'whatwg-fetch'
import uniq from 'lodash/uniq'
import chunk from 'lodash/chunk'

export const FETCH_STARTED = 'FETCH_STARTED'
export const FETCH_SUCCEEDED = 'FETCH_SUCCEEDED'
export const FETCH_FAILED = 'FETCH_FAILED'

export const RECEIVE_OBSERVATIONS = 'RECEIVE_OBSERVATIONS'

const ROOT_URL = 'http://ebird.org/ws1.1/data'
// TODO: move to state?
const DIST = 1
const BACK = 7

export function fetchLocations(lat, lng) {
  return dispatch => {
    dispatch(fetchStarted())
    fetch(`${ROOT_URL}/obs/geo/recent?fmt=json&lat=${lat}&lng=${lng}&dist=${DIST}&back=${BACK}`)
      .then(response => response.json())
      .then(observations => {
        let locIDs = uniq(observations.map(x => x.locID))
        dispatch(fetchSucceeded())
        chunk(locIDs, 10).forEach(chunk => {
          dispatch(fetchObservations(chunk, true))
          dispatch(fetchObservations(chunk, false))
        })
      })
      .catch(ex => dispatch(fetchFailed(ex)))
  }
}

function fetchStarted() {
  return { type: FETCH_STARTED }
}

function fetchSucceeded() {
  return { type: FETCH_SUCCEEDED }
}

function fetchFailed(exception) {
  console.error(`fetchFailed: ${exception}`)
  return { type: FETCH_FAILED, exception: exception }
}

function fetchObservations(locIDs, notable) {
  return dispatch => {
    dispatch(fetchStarted())
    let type = notable ? 'notable' : 'obs'
    fetch(`${ROOT_URL}/${type}/loc/recent?fmt=json&r=${locIDs.join(',')}&dist=${DIST}&back=${BACK}&detail=full`)
      .then(response => response.json() )
      .then(observations => {
        dispatch(fetchSucceeded())
        dispatch(receiveObservations(observations, notable))
      })
      .catch(ex => fetchFailed(ex))
  }
}

function receiveObservations(observations, notable) {
  return {
    type: RECEIVE_OBSERVATIONS,
    observations: observations,
    notable: notable
  }
}
