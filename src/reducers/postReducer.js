import { ADD_POST, SET_POST } from '../actions/actionTypes'
import _ from 'lodash'

const initial = []

export default (state = initial, action = {}) => {
  switch (action.type) {
    case SET_POST:
      return _.sortBy(action.data, ['created_at'])

    case ADD_POST:
      // return [
      //   ...state,
      //   action.data
      // ]
      return _.sortBy(state.concat(action.data), ['created_at'])
      // return state.concat(action.data)

    default:
      return state;

  }
}
