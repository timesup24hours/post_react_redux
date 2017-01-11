import { SHOW_USER_DETAIL, HIDE_USER_DETAIL } from './actionTypes'

export function showUserDetail(data) {
  return {
    type: SHOW_USER_DETAIL,
    data
  }
}

export function hideUserDetail() {
  return {
    type: HIDE_USER_DETAIL
  }
}
