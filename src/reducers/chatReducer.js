import { ADD_MESSAGE, CHAT_HISTORY } from '../actions/actionTypes'

const initial = [];

export default (state = initial, action = {}) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return state.concat(action.message)
      // return [
      //   ...state,
      //   action.message
      // ]

    case CHAT_HISTORY:
      return action.history


    default:
      return state

  }
}
