import { DATA_LOADED, DATA_LOADING } from './actionTypes'

export function dataLoading() {
  return {
    type: DATA_LOADING
  }
}

export function dataLoaded() {
  return {
    type: DATA_LOADED
  }
}
