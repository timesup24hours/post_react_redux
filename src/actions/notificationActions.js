import { SET_CONTENT, NOTIFICATION_SHOW, NOTIFICATION_HIDE } from './actionTypes'

export function setContent(content) {
  return {
    type: SET_CONTENT,
    content
  }
}

export function showNotification() {
  return {
    type: NOTIFICATION_SHOW
  }
}

export function hideNotification() {
  return {
    type: NOTIFICATION_HIDE
  }
}
