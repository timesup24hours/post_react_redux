import { SET_ROUTE_STATUS } from './actionTypes'

export function setRouteStatus(status) {
  return {
    type: SET_ROUTE_STATUS,
    status
  }
}
