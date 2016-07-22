import 'whatwg-fetch'
import uniq from 'lodash/uniq'
import chunk from 'lodash/chunk'

import { fetchStarted, fetchSucceeded, fetchFailed } from './fetch.js'

export const RECEIVE_OBSERVATIONS = 'RECEIVE_OBSERVATIONS'

const ROOT_URL = 'http://ebird.org/ws1.1/data'

export function fetchLocations(settings) {
  console.log('settings', settings)
  return dispatch => {
    dispatch(fetchStarted())
    fetch(`${ROOT_URL}/obs/geo/recent?fmt=json&lat=${settings.lat}&lng=${settings.lng}&dist=${settings.dist}&back=${settings.back}`)
      .then(response => response.json())
      .then(observations => {
        let locIDs = uniq(observations.map(x => x.locID))
        dispatch(fetchSucceeded())
        chunk(locIDs, 10).forEach(chunk => {
          dispatch(fetchObservations(settings, chunk, true))
          dispatch(fetchObservations(settings, chunk, false))
        })
      })
      .catch(ex => dispatch(fetchFailed(ex)))
  }
}

function fetchObservations(locIDs, notable) {
  return dispatch => {
    dispatch(fetchStarted())
    let type = notable ? 'notable' : 'obs'
    fetch(`${ROOT_URL}/${type}/loc/recent?fmt=json&r=${locIDs.join(',')}&dist=${settings.dist}&back=${settings.back}&detail=full`)
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
