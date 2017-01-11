import { SET_ROUTE_STATUS } from '../actions/actionTypes';

const initial = {
  status: location.pathname
}

export default ( state = initial, action = {} ) => {
  switch (action.type) {
    case SET_ROUTE_STATUS:
      return {
        status: action.status
      }
    default:
      return state

  }

}
