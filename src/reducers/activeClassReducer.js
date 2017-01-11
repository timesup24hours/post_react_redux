import { NAV_ACTIVE_CLASS, NAV_DEACTIVE_CLASS } from '../actions/actionTypes'

const initial = {
  active: false
}

export default (state = initial, action = {}) => {
  switch (action.type) {
    case NAV_ACTIVE_CLASS:
      return {
        active: true
      }

    case NAV_DEACTIVE_CLASS:
      return {
        active: false
      }

    default:
      return state

  }
}
