import { DATA_LOADING, DATA_LOADED } from '../actions/actionTypes'

const initial = {
  loading: true
}

export default (state = initial, action = {}) => {
  switch (action.type) {
    case DATA_LOADING:
      return {
        loading: true
      }

    case DATA_LOADED:
      return {
        loading: false
      }

    default:
      return state
  }
}
