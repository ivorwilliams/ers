export const SET_LOCATION = 'SET_LOCATION'
export const SET_REGION = 'SET_REGION'
export const SET_DISTANCE = 'SET_DISTANCE'
export const SET_BACK = 'SET_BACK'

export function setLocation(lat, lng) {
  return {
    type: SET_LOCATION,
    lat: lat,
    lng: lng
  }
}

export function setRegion(region) {
  return {
    type: SET_REGION,
    region: region
  }
}

export function setDistance(dist) {
  return {
    type: SET_DISTANCE,
    dist: dist
  }
}

export function setBack(back) {
  return {
    type: SET_BACK,
    back: back
  }
}
