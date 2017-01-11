import { NAV_OPEN, NAV_CLOSE, NAV_TOGGLE } from '../actions/actionTypes';

const initial = {
  isOpen: false
}

export default ( state = initial, action = {} ) => {
  switch (action.type) {
    case NAV_OPEN:
      return {
        isOpen: true
      }
    case NAV_CLOSE:
      return {
        isOpen: false
      }
    case NAV_TOGGLE:
      return {
        isOpen: !state.isOpen
      }

    default:
      return state;
  }
}
