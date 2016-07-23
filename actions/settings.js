import { fetchLocations } from './ebird.js'
import { setNotableOnly } from './controls.js'

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

/*
 * TODO: not sure about this.  For one thing, as it stands I don't think it
 * will be possible to have more than one instance on a page.
 */
export function setSettingsFromScriptTag() {

  let scriptNodeList = document.getElementsByTagName('script')
  let scripts = Array.prototype.slice.call(scriptNodeList)
  let elem = scripts.find(n => n.getAttribute('data-ers') != null)
  if (typeof elem === "undefined") {
    console.error('Cannot find ers attributes in script tag')
  }

  // Operations on data- attributes
  const asString = name => elem.getAttribute(`data-${name}`)
  const asFloat = name => parseFloat(asString(name))
  const asInt = name => parseInt(asString(name))
  const asBoolean = name => asString(name) == 'true'
  const isDefined = name => asString(name) !== null

  return (dispatch, getState) => {
    if (isDefined('lat') && isDefined('lng')) {
      dispatch(setLocation(asFloat('lat'), asFloat('lng')))
    } else if (isDefined('r')) {
      dispatch(setRegion(asString('r')))
    }

    if (isDefined('dist')) {
      dispatch(setDistance(asInt('dist')))
    }
    if (isDefined('back')) {
      dispatch(setBack(asInt('back')))
    }

    dispatch(setNotableOnly(asBoolean('notable-only')))

    dispatch(fetchLocations(getState().settings))
  }
}
