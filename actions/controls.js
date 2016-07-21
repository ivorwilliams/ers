export const SET_NAME_FILTER = 'SET_NAME_FILTER'
export const SET_NOTABLE_ONLY = 'SET_NOTABLE_ONLY'

export function setNameFilter(text) {
  return {
    type: SET_NAME_FILTER,
    text: text
  }
}

export function setNotableOnly(value) {
  return {
    type: SET_NOTABLE_ONLY,
    value: value
  }
}
