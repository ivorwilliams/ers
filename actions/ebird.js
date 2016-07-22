import 'whatwg-fetch'
import uniq from 'lodash/uniq'
import chunk from 'lodash/chunk'
import omit from 'lodash/omit'
import reduce from 'lodash/reduce'

import { fetchStarted, fetchSucceeded, fetchFailed } from './fetch.js'

export const RECEIVE_OBSERVATIONS = 'RECEIVE_OBSERVATIONS'

/*
 * These apply to all eBird URLs
 */
const ROOT_URL = 'http://ebird.org/ws1.1/data'
const DEFAULT_PARAMS = {
  fmt: 'json'
}

export function fetchLocations(settings) {
  return dispatch => {
    dispatch(fetchStarted())
    fetch(locationsUrlFor(settings))
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

function fetchObservations(settings, locIDs, notable) {
  return dispatch => {
    dispatch(fetchStarted())
    fetch(observationsUrlFor(settings, notable, locIDs))
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

function locationsUrlFor(settings) {
  let path = settings.byRegion
    ? '/obs/region/recent' : '/obs/geo/recent'
  let locationParams = settings.byRegion
    ? { r: settings.r } : { lat: settings.lat, lng: settings.lng }
  return urlFor(path, locationParams)
}

function observationsUrlFor(settings, notable, locIDs) {
  let path = notable ? '/notable/loc/recent' : '/obs/loc/recent'
  return urlFor(path, { r: locIDs.join(','), detail: 'full' })
}

function urlFor(path, extraParams) {
  let params = { ...DEFAULT_PARAMS, ...extraParams }
  let paramString = paramsToString(params)
  return `${ROOT_URL}${path}?${paramString}`
}

function paramsToString(params) {
  return reduce(params, (acc, v, k) => acc.concat(`${k}=${v}`), []).join('&')
}
