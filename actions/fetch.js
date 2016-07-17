export const FETCH_STARTED = 'FETCH_STARTED'
export const FETCH_SUCCEEDED = 'FETCH_SUCCEEDED'
export const FETCH_FAILED = 'FETCH_FAILED'

export function fetchStarted() {
  return { type: FETCH_STARTED }
}

export function fetchSucceeded() {
  return { type: FETCH_SUCCEEDED }
}

export function fetchFailed(exception) {
  console.error(`fetchFailed: ${exception}`)
  return { type: FETCH_FAILED, exception: exception }
}
