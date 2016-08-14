export const SELECT_SPECIES = 'SELECT_SPECIES'
export const SELECT_LOCATION = 'SELECT_LOCATION'

export function selectSpecies(sciName) {
  return {
    type: SELECT_SPECIES,
    sciName: sciName
  }
}

export function selectLocation(locID) {
  return {
    type: SELECT_LOCATION,
    locID: locID
  }
}

export function deselectLocation() {
  return selectLocation(null)
}
