import { CHANGE_INFO_FIELD } from './actionTypes'
import axios from 'axios'

export function changeInfo(data) {
  return dispatch => {
    return axios.put('/api/profile/changeInfo', data)
  }
}

export function changeInfoField(data) {
  return {
    type: CHANGE_INFO_FIELD,
    data
  }
}

export function updateInfo(data) {
  return dispatch => {
    return axios.put('/api/profile/updateInfo', data)
  }
}
