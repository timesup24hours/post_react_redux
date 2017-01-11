import axios from 'axios'

export function requestForgetPassword(email) {
  return dispatch => {
    return axios.post('/api/forget_password', email)
  }
}
