import 'whatwg-fetch'
import uniq from 'lodash/uniq'
import chunk from 'lodash/chunk'

import { fetchStarted, fetchSucceeded, fetchFailed } from './fetch.js'

export const RECEIVE_OBSERVATIONS = 'RECEIVE_OBSERVATIONS'

const ROOT_URL = 'http://ebird.org/ws1.1/data'
// TODO: move to state?
const DIST = 25
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
  let extra = { notable: notable }
  return {
    type: RECEIVE_OBSERVATIONS,
    observations: observations.map(obs => Object.assign({}, obs, extra))
  }
}
