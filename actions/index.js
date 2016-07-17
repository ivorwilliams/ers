import 'whatwg-fetch'
import 'lodash'

export const REQUEST_LOCATIONS = 'REQUEST_LOCATIONS'
export const RECEIVE_LOCATIONS = 'RECEIVE_LOCATIONS'
export const REQUEST_OBSERVATIONS = 'REQUEST_OBSERVATIONS'
export const RECEIVE_OBSERVATIONS = 'RECEIVE_OBSERVATIONS'

const ROOT_URL = 'http://ebird.org/ws1.1/data'
// TODO: move to state?
const DIST = 1
const BACK = 7

export function fetchLocations(lat, lng) {
  return dispatch => {
    dispatch(requestLocations(lat, lng))
    fetch(`${ROOT_URL}/obs/geo/recent?fmt=json&lat=${lat}&lng=${lng}&dist=${DIST}&back=${BACK}`)
      .then(response => response.json())
      .then(observations => {
        let locIDs = _.uniq(observations.map(x => x.locID))
        // TODO: we don't need to store this: instead just fetch obs/notables for each loc
        // TODO: or do we notify to indicate that fetch is done?
        dispatch(receiveLocations(lat, lng))
        _.chunk(locIDs, 10).forEach(chunk => {
          dispatch(fetchObservations(chunk, true))
          dispatch(fetchObservations(chunk, false))
        })
      })
  }
}

function requestLocations(lat, lng) {
  return {
    type: REQUEST_LOCATIONS,
    lat: lat,
    lng: lng
  }
}

function receiveLocations(lat, lng) {
  return {
    type: RECEIVE_LOCATIONS,
    lat: lat,
    lng: lng
  }
}

function fetchObservations(locIDs, notable) {
  console.log(`fetchObservations, notable=${notable}`)
  return dispatch => {
    dispatch(requestObservations(locIDs, notable))
    let type = notable ? 'notable' : 'obs'
    fetch(`${ROOT_URL}/${type}/region/recent?fmt=json&r=${locIDs.join(',')}&dist=${DIST}&back=${BACK}`)
      .then(response => response.json() )
      .then(observations => dispatch(receiveObservations(observations, notable)))
      .catch(ex => console.log('error', ex))
  }
}

function requestObservations(locIDs, notable) {
  console.log('1')
  return {
    type: REQUEST_OBSERVATIONS,
    locIDs: locIDs,
    notable: notable
  }
}

function receiveObservations(observations, notable) {
  console.log('receive')
  return {
    type: RECEIVE_OBSERVATIONS,
    observations: observations,
    notable: notable
  }
}
