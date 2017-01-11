import axios from 'axios'

export function submitSignup(data) {
  return dispatch => {
    return axios.post('/api/signup', data)
  }
}

export function isUserExist(data) {
  return dispatch => {
    return axios.post('/api/isUserExist', data)
  }
}
