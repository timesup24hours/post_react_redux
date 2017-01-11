import { SET_CONTENT, NOTIFICATION_SHOW, NOTIFICATION_HIDE } from '../actions/actionTypes'

const initial = {
  content: '',
  show: false
}

export default (state = initial, action = {}) => {
  switch (action.type) {
    case SET_CONTENT:
      return {
        ...state,
        content: action.content
      }

    case NOTIFICATION_SHOW: {
      return {
        ...state,
        show: true
      }
    }

    case NOTIFICATION_HIDE: {
      return {
        ...state,
        show: false
      }
    }

    default:
      return state

  }
}
