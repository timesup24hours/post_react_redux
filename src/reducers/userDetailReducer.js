import { SHOW_USER_DETAIL, HIDE_USER_DETAIL } from '../actions/actionTypes'

const initial = {
  show: false,
  userDetailInfo: {}
}

export default (state = initial, action = {}) => {
  switch (action.type) {
    case SHOW_USER_DETAIL:
      return {
        show: true,
        userDetailInfo: action.data
      }

    case HIDE_USER_DETAIL:
      return {
        show: false
      }

    default:
      return state

  }
}
