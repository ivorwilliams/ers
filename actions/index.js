import 'whatwg-fetch'

export const REQUEST_LOCATIONS = 'REQUEST_LOCATIONS'
export const RECEIVE_LOCATIONS = 'RECEIVE_LOCATIONS'

const ROOT_URL = 'http://ebird.org/ws1.1/data'

export function fetchLocations(lat, lng) {
  return dispatch => {
    dispatch(requestLocations(lat, lng))
    return fetch(`${ROOT_URL}/obs/geo/recent?fmt=json&lat=${lat}&lng=${lng}&dist=1&back=10`)
      .then(response => response.json())
      .then(observations => {
        let locIDs = observations.map(x => x.locID)
        dispatch(receiveLocations(lat, lng, locIDs))
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

function receiveLocations(lat, lng, locations) {
  return {
    type: RECEIVE_LOCATIONS,
    lat: lat,
    lng: lng,
    locations: locations
  }
}
